import { compose } from '../compose';

describe('compose', () => {
  describe('happy path', () => {
    it('should compose two functions right to left', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const add1ThenDouble = compose(double, add1);

      expect(add1ThenDouble(5)).toBe(12);
    });

    it('should compose three functions right to left', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const square = (x: number) => x * x;
      const composed = compose(square, double, add1);

      expect(composed(3)).toBe(64);
    });

    it('should work with string transformations', () => {
      const toUpper = (s: string) => s.toUpperCase();
      const addExclaim = (s: string) => s + '!';
      const composed = compose(addExclaim, toUpper);

      expect(composed('hello')).toBe('HELLO!');
    });

    it('should apply the rightmost function first', () => {
      const calls: string[] = [];
      const fnA = (x: number) => {
        calls.push('A');
        return x + 1;
      };
      const fnB = (x: number) => {
        calls.push('B');
        return x * 2;
      };
      const fnC = (x: number) => {
        calls.push('C');
        return x - 3;
      };
      const composed = compose(fnA, fnB, fnC);
      composed(10);

      expect(calls).toEqual(['C', 'B', 'A']);
    });
  });

  describe('edge cases', () => {
    it('should return a function that returns the argument when given no functions', () => {
      const composed = compose<number>();

      expect(composed(42)).toBe(42);
    });

    it('should return the same function when given a single function', () => {
      const double = (x: number) => x * 2;
      const composed = compose(double);

      expect(composed(5)).toBe(10);
    });

    it('should handle identity functions', () => {
      const identity = (x: number) => x;
      const add1 = (x: number) => x + 1;
      const composed = compose(identity, add1, identity);

      expect(composed(5)).toBe(6);
    });
  });
});
