import { once } from '../once';

describe('once', () => {
  describe('happy path', () => {
    it('should execute the function only once', () => {
      const fn = jest.fn().mockReturnValue(42);
      const onceFn = once(fn);

      onceFn();
      onceFn();
      onceFn();

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should return the result of the first call', () => {
      const fn = jest.fn().mockReturnValue('first');
      const onceFn = once(fn);

      expect(onceFn()).toBe('first');
      expect(onceFn()).toBe('first');
    });

    it('should pass arguments to the first call', () => {
      const fn = jest.fn((a: number, b: number) => a + b);
      const onceFn = once(fn);

      expect(onceFn(1, 2)).toBe(3);
      expect(fn).toHaveBeenCalledWith(1, 2);
    });

    it('should ignore arguments on subsequent calls', () => {
      const fn = jest.fn((x: number) => x * 2);
      const onceFn = once(fn);

      expect(onceFn(5)).toBe(10);
      expect(onceFn(100)).toBe(10);
    });
  });

  describe('edge cases', () => {
    it('should handle functions that return undefined', () => {
      const fn = jest.fn();
      const onceFn = once(fn);

      expect(onceFn()).toBeUndefined();
      expect(onceFn()).toBeUndefined();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should handle functions that return null', () => {
      const fn = jest.fn().mockReturnValue(null);
      const onceFn = once(fn);

      expect(onceFn()).toBeNull();
      expect(onceFn()).toBeNull();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should handle functions that return objects', () => {
      const obj = { key: 'value' };
      const fn = jest.fn().mockReturnValue(obj);
      const onceFn = once(fn);

      expect(onceFn()).toBe(obj);
      expect(onceFn()).toBe(obj);
    });
  });
});
