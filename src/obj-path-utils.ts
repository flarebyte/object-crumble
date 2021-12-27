import { CrumbleValue, CrumbleObject, MutateValueRule } from './model';
import { isCrumbleArray, isCrumbleObject, isPrimitive } from './type-checker';

/**
 * Find a value in an object given the path
 * @param path
 * @param value
 * @returns
 */
export const findFieldValue = (
  path: string,
  value: CrumbleObject
): CrumbleValue => {
  const [first, ...rest] = path.split('.');
  if (first === undefined || first === '') {
    throw new Error('The path should never be empty');
  }
  const objValue: { [name: string]: CrumbleValue } = value;
  const second = objValue[first];
  if (rest.length === 0 || isPrimitive(second)) {
    return second;
  } else if (isCrumbleArray(second)) {
    const index = parseInt(rest.join('.')[0] || '0');
    return second[index];
  } else {
    return findFieldValue(rest.join('.'), second);
  }
};

const getParentPath = (path: string): string => {
  const rest = path.split('.').reverse().slice(1);
  return rest ? rest.reverse().join('.') : '';
};

const getKeyOfPath = (path: string): string => {
  const last = path.split('.').reverse()[0];
  if (last === undefined || last === '') {
    throw new Error('The path should never be empty');
  }
  return last;
};

/**
 * Paths or the current node and of all the ancestors
 * @param currentPath
 * @param found
 * @returns
 */
export const pathsOfSelfOrAncestors = (
  currentPath: string,
  found: string[] = []
): string[] =>
  currentPath.includes('.')
    ? pathsOfSelfOrAncestors(getParentPath(currentPath), [
        ...found,
        currentPath,
      ])
    : [...found, currentPath];

/**
 * Change the value at a specified path
 * @param path
 * @param newValue
 * @param content
 * @returns
 */
const copyObjField = (
  path: string,
  newValue: CrumbleValue,
  content: CrumbleObject
): { [key: string]: CrumbleValue } => {
  const key = getKeyOfPath(path);
  return Object.fromEntries(
    Object.entries(content).map((keyValue) =>
      key === keyValue[0] ? [key, newValue] : keyValue
    )
  );
};

type TmpStackPath = { key: string; obj: CrumbleValue };

/**
 * Gets all the values for a path and ancestors on that path
 * @param path
 * @param content
 * @returns
 */
const splitAlongPath = (
  path: string,
  content: CrumbleObject
): TmpStackPath[] => {
  const paths = pathsOfSelfOrAncestors(path).reverse();
  return paths.map((p) => ({ key: p, obj: findFieldValue(p, content) }));
};

const mergeTwoPathStack = (a: TmpStackPath, b: TmpStackPath): TmpStackPath => ({
  key: b.key,
  obj: isCrumbleObject(b.obj) ? copyObjField(a.key, a.obj, b.obj) : b.obj,
});
const mergeAlongPath = (stack: TmpStackPath[]): TmpStackPath =>
  stack.reduce(mergeTwoPathStack);

/**
 * Sets the value at a given path in an object
 * @param content
 * @param path
 * @param value
 * @returns
 */
export const setFieldValue = (
  content: CrumbleObject,
  path: string,
  value: CrumbleValue
): CrumbleObject => {
  const rest = splitAlongPath(path, content).reverse().slice(1);
  const updated = [
    { key: path, obj: value },
    ...rest,
    { key: '', obj: content },
  ];
  const result = mergeAlongPath(updated);
  if (!isCrumbleObject(result.obj)) {
    throw new Error("The result should be the root object");
    
  }
  return result.obj;
};

/**
 * Transform a value at a given path
 * @param path
 * @param transformer
 * @param content
 * @returns
 */
export const transformFieldValue = (
  path: string,
  transformer: MutateValueRule,
  content: CrumbleObject
): CrumbleObject => {
  const updated = transformer(findFieldValue(path, content));
  return setFieldValue(content, path, updated);
};
