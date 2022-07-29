import { CrumbleObject, CrumblePrimitive, CrumbleValue } from './model.js';

export const isPrimitive = (value: CrumbleValue): value is CrumblePrimitive =>
  value === null ||
  value === undefined ||
  ['string', 'number', 'boolean', 'bigint', 'symbol', 'function'].includes(
    typeof value
  );

export const isString = (value: CrumbleValue): value is string =>
  typeof value === 'string';

export const isCrumbleArray = (value: CrumbleValue): value is CrumbleValue[] =>
  Array.isArray(value);

export const isCrumbleObject = (value: CrumbleValue): value is CrumbleObject =>
  !Array.isArray(value) && typeof value === 'object';
