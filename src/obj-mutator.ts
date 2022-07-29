import { transformFieldValue } from './obj-path-utils.js';
import {
  OakObjApplicableMutation,
  CrumbleFieldMutation,
  CrumbleValue,
  CrumbleObject,
  MutateStringRule,
} from './model.js';

const unusualChar = '🤢';

const identityRule: CrumbleFieldMutation = {
  name: 'identity',
  fieldKind: 'any',
  rule: (value: CrumbleValue) => value,
};

const stringToMutateValueRule =
  (stringMutate: MutateStringRule) =>
  (value: CrumbleValue): CrumbleValue => {
    if (typeof value !== 'string') {
      throw new TypeError('The value should have been a string');
    }
    return stringMutate(value);
  };
const booleanToMutateValueRule =
  (boolMutate: (b: boolean) => boolean) =>
  (value: CrumbleValue): CrumbleValue => {
    if (typeof value !== 'boolean') {
      throw new TypeError('The value should have been a boolean');
    }
    return boolMutate(value);
  };

/**
 * Basic mutator rules that can be used out of the box
 */
export const mutatorRules: CrumbleFieldMutation[] = [
  {
    name: 'string => empty',
    fieldKind: 'string',
    rule: () => '',
  },
  {
    name: 'string => large',
    fieldKind: 'string',
    rule: (value: CrumbleValue) =>
      stringToMutateValueRule((v) =>
        v.length === 0 ? 'z'.repeat(10_000) : v.repeat(5000)
      )(value),
  },
  {
    name: 'string => unusual char',
    fieldKind: 'string',
    rule: (value: CrumbleValue) =>
      stringToMutateValueRule((v) => `${v}${unusualChar}`)(value),
  },
  {
    name: 'boolean => flip',
    fieldKind: 'boolean',
    rule: (value: CrumbleValue) => booleanToMutateValueRule((v) => !v)(value),
  },
  {
    name: 'number => zero',
    fieldKind: 'number',
    rule: () => 0,
  },
  {
    name: 'number => big',
    fieldKind: 'number',
    rule: () => 1_007_199_254_740_991,
  },
  {
    name: 'number => negative',
    fieldKind: 'number',
    rule: () => -10,
  },
  {
    name: 'url => empty',
    fieldKind: 'url',
    rule: () => '',
  },
  {
    name: 'url => large',
    fieldKind: 'url',
    rule: (value: CrumbleValue) =>
      stringToMutateValueRule((v) => `${v}/${'/abc'.repeat(500)}`)(value),
  },
  {
    name: 'url => unusual char',
    fieldKind: 'url',
    rule: (value: CrumbleValue) =>
      stringToMutateValueRule((v) => `${v}/${unusualChar}`)(value),
  },
];

/**
 * Mutates an object applying a list of mutation.
 * We are using currying to provide the list of mutations rules.
 * Only a single mutation is applied to facilitate the studying of the impact.
 * @param rules a list of rules used to infer the kind of value of each property in the object
 * @returns a `CrumbleObject` representing most javascript objects
 */
export const mutateObject =
  (rules: CrumbleFieldMutation[]) =>
  (mutation: OakObjApplicableMutation) =>
  (content: CrumbleObject): CrumbleObject => {
    const rule = (
      rules.find((r) => r.name === mutation.mutationName) || identityRule
    ).rule;
    return transformFieldValue(mutation.path, rule, content);
  };
