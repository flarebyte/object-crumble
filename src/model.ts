/**
 * A primitive value for a field (string, number, ...)
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
 * An javascript object
 */
export type CrumbleObject = { [Key in string]?: CrumbleValue };

type CrumbleArray = CrumbleValue[];

/**
 * Any of value supported by a field
 */
export type CrumbleValue = CrumblePrimitive | CrumbleObject | CrumbleArray;
export interface CrumbleAbstractedObject {
  path: string;
  kind: string;
}

export type MutateValueRule = (value: CrumbleValue) => CrumbleValue;

export type MutateStringRule = (value: string) => string;

/**
 * A mutation rule that can be applied to a CrumbleValue
 */
export interface CrumbleFieldMutation {
  name: string;
  fieldKind: string;
  rule: MutateValueRule;
}

export type StringAbstractionRule = (value: string) => string | false;

export interface OakObjApplicableMutation {
  path: string;
  kind: string;
  mutationName: string;
}
