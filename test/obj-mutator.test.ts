import { mutateObject, mutatorRules } from '../src/obj-mutator.js';

describe('Object Mutator', () => {
  describe('mutateObject', () => {
    it('mutate an object with one rule', () => {
      const mutation = {
        path: 'name',
        kind: 'string',
        mutationName: 'string => large',
      };
      const actual = mutateObject(mutatorRules)(mutation)({
        name: 'Picasso',
        firstName: 'Pablo',
      });
      expect(actual).toHaveProperty('name');
      expect(actual).toHaveProperty('firstName');
      expect(actual['name']).toHaveLength(35_000);
    });

    it('mutate an object with two rules with one level', () => {
      const mutation = {
        path: 'painter.name',
        kind: 'string',
        mutationName: 'string => large',
      };
      const mutation2 = {
        path: 'painter.firstName',
        kind: 'string',
        mutationName: 'string => empty',
      };
      const mutate1 = mutateObject(mutatorRules)(mutation);
      const mutate2 = mutateObject(mutatorRules)(mutation2);
      const actual = mutate2(
        mutate1({
          painter: {
            name: 'Picasso',
            firstName: 'Pablo',
          },
        })
      );
      expect(actual).toHaveProperty('painter.name');
      const painter = actual && actual['painter'];
      const name = painter && Object.values(painter)[0];
      expect(name).toHaveLength(35_000);
      expect(actual).toHaveProperty('painter.firstName', '');
    });
  });
});
