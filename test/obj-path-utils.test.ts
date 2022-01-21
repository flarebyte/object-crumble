import { CrumbleValue, MutateValueRule } from '../src/model';
import {
  findFieldValue,
  pathsOfSelfOrAncestors,
  setFieldValue,
  transformFieldValue,
} from '../src/obj-path-utils';

const transfString: MutateValueRule = (value: CrumbleValue) =>
  typeof value === 'string' ? value + '_' : value;

const asset = {
  name: 'value-of-name',
  child: {
    name: 'child name',
    sizes: [12, 15],
    siblings: [{ name: 'paul' }, { name: 'joe' }],
    game: {
      description: 'fencing',
    },
  },
};

describe('Object Path Utils', () => {
  describe('findFieldValue', () => {
    it('read field at the root', () => {
      const actual = findFieldValue('name', asset);
      expect(actual).toEqual(asset.name);
    });
    it('read field at the first child', () => {
      const actual = findFieldValue('child.name', asset);
      expect(actual).toEqual(asset.child.name);
    });
    it('read field with several levels', () => {
      const actual = findFieldValue('child.game.description', asset);
      expect(actual).toEqual(asset.child.game.description);
    });
    it('read field with array of integer', () => {
      const actual = findFieldValue('child.sizes', asset);
      expect(actual).toEqual(asset.child.sizes);
    });
    it('read field with array of obj', () => {
      const actual = findFieldValue('child.siblings', asset);
      expect(actual).toEqual(asset.child.siblings);
    });
    it('read first number element of array', () => {
      const actual = findFieldValue('child.sizes.0', asset);
      expect(actual).toEqual(asset.child.sizes[0]);
    });
    it('read first object of array', () => {
      const actual = findFieldValue('child.siblings.0', asset);
      expect(actual).toEqual(asset.child.siblings[0]);
    });
  });
  describe('pathsOfSelfOrAncestors', () => {
    it('read field at the root', () => {
      const actual = pathsOfSelfOrAncestors('name');
      expect(actual).toEqual(['name']);
    });
    it('read field at the first child', () => {
      const actual = pathsOfSelfOrAncestors('child.name');
      expect(actual).toEqual(['child.name', 'child']);
    });
    it('read field with several levels', () => {
      const actual = pathsOfSelfOrAncestors('child.game.description');
      expect(actual).toEqual(['child.game.description', 'child.game', 'child']);
    });
  });
  describe('setFieldValue', () => {
    it('set field at the root', () => {
      const actual = setFieldValue(asset, 'name', 'new-name');
      expect(actual).toHaveProperty('name', 'new-name');
    });
    it('set field at the first child', () => {
      const actual = setFieldValue(asset, 'child.name', 'child-new-value');
      expect(actual).toHaveProperty('child.name', 'child-new-value');
    });
    it('set field with several levels', () => {
      const actual = setFieldValue(
        asset,
        'child.game.description',
        'new-description'
      );
      expect(actual).toHaveProperty(
        'child.game.description',
        'new-description'
      );
    });
  });
  describe('transformFieldValue', () => {
    it('transform field at the root', () => {
      const actual = transformFieldValue('name', transfString, asset);
      expect(actual).toHaveProperty('name', asset.name + '_');
    });
    it('transform field at the first child', () => {
      const actual = transformFieldValue('child.name', transfString, asset);
      expect(actual).toHaveProperty('child.name', asset.child.name + '_');
    });
    it('transform field with several levels', () => {
      const actual = transformFieldValue(
        'child.game.description',
        transfString,
        asset
      );
      expect(actual).toHaveProperty(
        'child.game.description',
        asset.child.game.description + '_'
      );
    });
  });
});
