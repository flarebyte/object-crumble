import {
  CrumbleAbstractedValue,
  StringAbstractionRule,
  CrumbleValue,
  CrumbleObject,
} from './model';
import {
  isCrumbleArray,
  isCrumbleObject,
  isPrimitive,
  isString,
} from './type-checker';

const applyRulesToPrimitiveEntry =
  (prefix: string, rules: StringAbstractionRule[]) =>
  (keyValue: [string, CrumbleValue]): CrumbleAbstractedValue => {
    const [childPath, value] = keyValue;
    const path = `${prefix}${childPath}`;
    const defaultValue = { path, kind: typeof value };
    if (!isString(value)) {
      return defaultValue;
    }
    const triggered = rules.map((rule) => rule(value)).filter(Boolean);
    return triggered[0] ? { path, kind: triggered[0] } : defaultValue;
  };

const applyRulesToArrayEntry =
  (prefix: string, rules: StringAbstractionRule[]) =>
  ([childPath, values]: [string, CrumbleValue]): CrumbleAbstractedValue => {
    if (!isCrumbleArray(values)) {
      throw new Error(`values should be an array not a ${typeof values}`);
    }
    const path = `${prefix}${childPath}`;
    if (values.length === 0) {
      return { path, kind: 'array/empty' };
    } else {
      const firstOne = values[0];
      const kindOfFirst = typeof firstOne;
      if (typeof firstOne === 'string') {
        const triggered = rules.map((rule) => rule(firstOne)).filter(Boolean);
        return triggered.length === 0
          ? { path, kind: `array/${kindOfFirst}` }
          : { path, kind: `array/${triggered[0]}` };
      } else {
        return { path, kind: `array/${kindOfFirst}` };
      }
    }
  };
/**
 * Convert any object to an abstract representation of the object structure
 * ```
 * abstractObject({name: "Jane"})
 * ```
 * @param rules a list of rules used to infer the kind of value of each property in the object
 * @param prefix  path of the object in the enclosing object, or empty if none
 * @returns an array of `CrumbleAbstractedValue` representing each `path` `kind` pair.
 */
export const abstractObject =
  (rules: StringAbstractionRule[], prefix = '') =>
  (value: CrumbleObject): CrumbleAbstractedValue[] => {
    const results = Object.entries(value)
      .filter((kv) => isPrimitive(kv[1]))
      .map(applyRulesToPrimitiveEntry(prefix, rules));
    const arrayResults = Object.entries(value)
      .filter((kv) => isCrumbleArray(kv[1]))
      .map(applyRulesToArrayEntry(prefix, rules));
    const objResults = Object.entries(value)
      .filter((kv) => isCrumbleObject(kv[1]))
      .flatMap(([key, objValue]) =>
        abstractObject(rules, `${prefix}${key}.`)(objValue as CrumbleObject)
      );
    return [...results, ...arrayResults, ...objResults];
  };
