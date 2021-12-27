import { CrumbleValue, CrumbleObject } from './model';

export const findFieldValue = (path: string, value: CrumbleObject): CrumbleValue => {
  const [first, ...rest] = path.split('.');
  const objValue: { [name: string]: CrumbleValue } = value;
  const second = objValue[first];
  if (rest.length === 0 || typeof second !== 'object') {
    return second;
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
  return last;
};

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

const copyObjField = (
  path: string,
  newValue: CrumbleValue,
  content: { [key: string]: CrumbleValue }
): { [key: string]: CrumbleValue } => {
  const key = getKeyOfPath(path);
  return Object.fromEntries(
    Object.entries(content).map((keyValue) =>
      key === keyValue[0] ? [key, newValue] : keyValue
    )
  );
};

type TmpStackPath = { key: string; obj: CrumbleObject };

const splitAlongPath = (
  path: string,
  content: CrumbleObject
): TmpStackPath[] => {
  const paths = pathsOfSelfOrAncestors(path).reverse();
  return paths.map((p) => ({ key: p, obj: findFieldValue(p, content) }));
};

const mergeTwoPathStack = (a: TmpStackPath, b: TmpStackPath): TmpStackPath => ({
  key: b.key,
  obj: copyObjField(a.key, a.obj, b.obj),
});
const mergeAlongPath = (
  stack: { key: string; obj: CrumbleObject }[]
): { [key: string]: CrumbleValue } => stack.reduce(mergeTwoPathStack);

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
  return result.obj;
};

export const transformFieldValue = (
  path: string,
  transformer: (value: CrumbleValue) => CrumbleValue,
  content: CrumbleObject
): CrumbleObject => {
  const updated = transformer(findFieldValue(path, content));
  return setFieldValue(content, path, updated);
};
