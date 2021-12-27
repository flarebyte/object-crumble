/**
 * A primitive value for a field (string, number, ...)
 */
type CrumblePrimitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint
  | Function;

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

type MutateValueRule = (value: CrumbleValue) => CrumbleValue;

/**
 * A mutation rule that can be applied to a CrumbleValue
 */
export interface CrumbleFieldMutation {
  name: string;
  fieldKind: string;
  rule: MutateValueRule;
}

export type StringAbstractionRule = (value: string) => string;

export interface OakObjApplicableMutation {
  path: string;
  kind: string;
  mutationName: string;
}
