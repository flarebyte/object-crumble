import { isCrumbleArray } from '../src/type-checker.js';

describe('Type Checker', () => {
  describe('isCrumbleArray', () => {
    it('should detect empty array', () => {
      expect(isCrumbleArray([])).toBeTruthy();
    });
    it('should detect array of string', () => {
      expect(isCrumbleArray(['a', 'b'])).toBeTruthy();
    });
    it('should ignore object', () => {
      expect(isCrumbleArray({ key1: 'value1' })).toBeFalsy();
    });
    it('should ignore primitive', () => {
      expect(isCrumbleArray('some string')).toBeFalsy();
    });
  });
});
