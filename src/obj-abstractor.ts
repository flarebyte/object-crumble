import { CrumbleAbstractedObject, StringAbstractionRule, CrumbleValue, CrumbleObject } from './obj-tranf-model';

const someUrl: StringAbstractionRule = (value: string) =>
  value.startsWith('http://') || value.startsWith('https://') ? 'url' : '';
export const anyOfString =
  (name: string, options: string[]) => (value: string) =>
    options.includes(value) ? name : '';

export const abstractionRules = [someUrl];

const applyRulesToEntry =
  (prefix: string, rules: StringAbstractionRule[]) =>
  (keyValue: [string, CrumbleValue]): CrumbleAbstractedObject => {
    const [childPath, value] = keyValue;
    const path = `${prefix}${childPath}`;
    const defaultValue = { path, kind: typeof value };
    if (typeof value !== 'string') {
      return defaultValue;
    }
    const triggered = rules
      .map((rule) => rule(value))
      .filter((v) => v.length > 0);
    return triggered.length === 0 ? defaultValue : { path, kind: triggered[0] };
  };

const applyRulesToArrayEntry =
  (prefix: string, rules: StringAbstractionRule[]) =>
  (keyValue: [string, CrumbleValue[]]): CrumbleAbstractedObject => {
    const [childPath, values] = keyValue;
    const path = `${prefix}${childPath}`;
    if (values.length === 0) {
      return { path, kind: 'array/empty' };
    } else {
      const firstOne = values[0];
      const kindOfFirst = typeof firstOne;
      if (typeof firstOne === 'string') {
        const triggered = rules
          .map((rule) => rule(firstOne))
          .filter((v) => v.length > 0);
        return triggered.length === 0
          ? { path, kind: `array/${kindOfFirst}` }
          : { path, kind: `array/${triggered[0]}` };
      } else {
        return { path, kind: `array/${kindOfFirst}` };
      }
    }
  };

export const isObjectEntry = (keyValue: [string, CrumbleValue]): boolean =>
  !Array.isArray(keyValue[1]) && typeof keyValue[1] === 'object';

export const isArrayEntry = (keyValue: [string, CrumbleValue]): boolean =>
  Array.isArray(keyValue[1]);

const isBasicEntry = (keyValue: [string, CrumbleValue]): boolean =>
  !(isObjectEntry(keyValue) || isArrayEntry(keyValue));

export const abstractObject =
  (rules: StringAbstractionRule[], prefix = '') =>
  (value: CrumbleObject): CrumbleAbstractedObject[] => {
    const results = Object.entries(value)
      .filter(isBasicEntry)
      .map(applyRulesToEntry(prefix, rules));
    const arrayResults = Object.entries(value)
      .filter(isArrayEntry)
      .map(applyRulesToArrayEntry(prefix, rules));
    const objResults = Object.entries(value)
      .filter(isObjectEntry)
      .flatMap((keyValue) =>
        abstractObject(rules, `${prefix}${keyValue[0]}.`)(keyValue[1])
      );
    return [...results, ...arrayResults, ...objResults];
  };
