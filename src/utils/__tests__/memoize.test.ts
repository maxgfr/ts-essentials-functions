import { memoize } from '../memoize';

describe('memoize', () => {
  describe('happy path', () => {
    it('should return the correct result on first call', () => {
      const double = memoize((x: number) => x * 2);

      expect(double(5)).toBe(10);
    });

    it('should return cached result on subsequent calls with same arguments', () => {
      const fn = jest.fn((x: number) => x * 2);
      const memoized = memoize(fn);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should compute new result for different arguments', () => {
      const fn = jest.fn((x: number) => x * 2);
      const memoized = memoize(fn);

      expect(memoized(5)).toBe(10);
      expect(memoized(10)).toBe(20);

      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should handle multiple arguments', () => {
      const fn = jest.fn((a: number, b: number) => a + b);
      const memoized = memoize(fn);

      expect(memoized(1, 2)).toBe(3);
      expect(memoized(1, 2)).toBe(3);
      expect(memoized(2, 1)).toBe(3);

      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should work with string arguments', () => {
      const fn = jest.fn((s: string) => s.toUpperCase());
      const memoized = memoize(fn);

      expect(memoized('hello')).toBe('HELLO');
      expect(memoized('hello')).toBe('HELLO');
      expect(memoized('world')).toBe('WORLD');

      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('cache behavior', () => {
    it('should cache based on JSON.stringify of arguments', () => {
      const fn = jest.fn((obj: { x: number }) => obj.x * 2);
      const memoized = memoize(fn);

      expect(memoized({ x: 5 })).toBe(10);
      expect(memoized({ x: 5 })).toBe(10);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should distinguish between different argument shapes', () => {
      const fn = jest.fn(
        (obj: { x: number; y?: number }) => obj.x + (obj.y ?? 0),
      );
      const memoized = memoize(fn);

      expect(memoized({ x: 1 })).toBe(1);
      expect(memoized({ x: 1, y: 2 })).toBe(3);

      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should cache falsy return values', () => {
      const fn = jest.fn(() => 0);
      const memoized = memoize(fn);

      expect(memoized()).toBe(0);
      expect(memoized()).toBe(0);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should cache null return values', () => {
      const fn = jest.fn(() => null);
      const memoized = memoize(fn);

      expect(memoized()).toBeNull();
      expect(memoized()).toBeNull();

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should cache undefined return values', () => {
      const fn = jest.fn(() => undefined);
      const memoized = memoize(fn);

      expect(memoized()).toBeUndefined();
      expect(memoized()).toBeUndefined();

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle functions with no arguments', () => {
      let counter = 0;
      const fn = jest.fn(() => ++counter);
      const memoized = memoize(fn);

      expect(memoized()).toBe(1);
      expect(memoized()).toBe(1);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should handle array arguments', () => {
      const fn = jest.fn((arr: number[]) => arr.reduce((a, b) => a + b, 0));
      const memoized = memoize(fn);

      expect(memoized([1, 2, 3])).toBe(6);
      expect(memoized([1, 2, 3])).toBe(6);
      expect(memoized([4, 5, 6])).toBe(15);

      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
