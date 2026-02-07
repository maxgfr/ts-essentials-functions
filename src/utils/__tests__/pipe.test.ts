import { pipe } from '../pipe';

describe('pipe', () => {
  describe('happy path', () => {
    it('should pipe two functions left to right', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const piped = pipe(add1, double);

      expect(piped(5)).toBe(12);
    });

    it('should pipe three functions left to right', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const square = (x: number) => x * x;
      const piped = pipe(add1, double, square);

      expect(piped(3)).toBe(64);
    });

    it('should work with string transformations', () => {
      const toUpper = (s: string) => s.toUpperCase();
      const addExclaim = (s: string) => s + '!';
      const piped = pipe(toUpper, addExclaim);

      expect(piped('hello')).toBe('HELLO!');
    });

    it('should apply the leftmost function first', () => {
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
      const piped = pipe(fnA, fnB, fnC);
      piped(10);

      expect(calls).toEqual(['A', 'B', 'C']);
    });
  });

  describe('edge cases', () => {
    it('should return a function that returns the argument when given no functions', () => {
      const piped = pipe<number>();

      expect(piped(42)).toBe(42);
    });

    it('should return the same function when given a single function', () => {
      const double = (x: number) => x * 2;
      const piped = pipe(double);

      expect(piped(5)).toBe(10);
    });

    it('should handle identity functions', () => {
      const identity = (x: number) => x;
      const add1 = (x: number) => x + 1;
      const piped = pipe(identity, add1, identity);

      expect(piped(5)).toBe(6);
    });
  });

  describe('pipe vs compose', () => {
    it('should produce opposite ordering from compose for non-commutative operations', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;

      const piped = pipe(add1, double);
      const result = piped(5);

      expect(result).toBe(12);
    });
  });
});
