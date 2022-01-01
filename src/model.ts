/**
 * A primitive value for a field (string, number, ...)
 * This goes a bit beyond JSON by also supporting symbol, bigint and function.
 */
export type CrumblePrimitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint
  | Function; // eslint-disable-line @typescript-eslint/ban-types

/**
 * An javascript object made of key value pair
 */
export type CrumbleObject = { [Key in string]?: CrumbleValue };

type CrumbleArray = CrumbleValue[];

/**
 * Any of the values supported that can associated with a key
 */
export type CrumbleValue = CrumblePrimitive | CrumbleObject | CrumbleArray;

/**
 * Represents the `kind` of a value at a given path
 */
export interface CrumbleAbstractedValue {
  path: string;
  kind: string;
}

/**
 * A transformation applied to a value
 */
export type MutateValueRule = (value: CrumbleValue) => CrumbleValue;

/**
 * A transformation applied to a string
 */
export type MutateStringRule = (value: string) => string;

/**
 * A mutation rule that can be applied to a CrumbleValue
 */
export interface CrumbleFieldMutation {
  name: string;
  fieldKind: string;
  rule: MutateValueRule;
}

/**
 * Rule that scans a string and infers a custom type
 */
export type StringAbstractionRule = (value: string) => string | false;

/**
 * A mutation that can be applied to a path
 */
export interface OakObjApplicableMutation {
  path: string;
  kind: string;
  mutationName: string;
}
