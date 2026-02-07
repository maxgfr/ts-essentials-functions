import { preventMultipleExecution } from '../preventMultipleExecution';

describe('preventMultipleExecution', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('happy path', () => {
    it('should execute the function on the first call', () => {
      const fn = jest.fn(() => 'result');
      const guarded = preventMultipleExecution(fn);

      const result = guarded();

      expect(fn).toHaveBeenCalledTimes(1);
      expect(result).toBe('result');
    });

    it('should pass arguments to the wrapped function', () => {
      const fn = jest.fn((a: number, b: number) => a + b);
      const guarded = preventMultipleExecution(fn);

      const result = guarded(3, 7);

      expect(fn).toHaveBeenCalledWith(3, 7);
      expect(result).toBe(10);
    });

    it('should allow execution again after the default interval of 1000ms', () => {
      const fn = jest.fn(() => 'result');
      const guarded = preventMultipleExecution(fn);

      guarded();
      expect(fn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);

      const result = guarded();
      expect(fn).toHaveBeenCalledTimes(2);
      expect(result).toBe('result');
    });

    it('should allow execution again after a custom interval', () => {
      const fn = jest.fn(() => 'ok');
      const guarded = preventMultipleExecution(fn, 500);

      guarded();
      jest.advanceTimersByTime(500);

      const result = guarded();
      expect(fn).toHaveBeenCalledTimes(2);
      expect(result).toBe('ok');
    });
  });

  describe('blocking behavior', () => {
    it('should return undefined when called during cooldown', () => {
      const fn = jest.fn(() => 'result');
      const guarded = preventMultipleExecution(fn);

      const first = guarded();
      const second = guarded();

      expect(first).toBe('result');
      expect(second).toBeUndefined();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should block all calls within the cooldown period', () => {
      const fn = jest.fn(() => 42);
      const guarded = preventMultipleExecution(fn, 1000);

      guarded();
      jest.advanceTimersByTime(200);
      expect(guarded()).toBeUndefined();
      jest.advanceTimersByTime(200);
      expect(guarded()).toBeUndefined();
      jest.advanceTimersByTime(200);
      expect(guarded()).toBeUndefined();

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should not execute the function during cooldown even with different arguments', () => {
      const fn = jest.fn((x: string) => x);
      const guarded = preventMultipleExecution(fn, 500);

      expect(guarded('first')).toBe('first');
      expect(guarded('second')).toBeUndefined();

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('first');
    });
  });

  describe('independent instances', () => {
    it('should create independent instances for each call to preventMultipleExecution', () => {
      const fnA = jest.fn(() => 'A');
      const fnB = jest.fn(() => 'B');
      const guardedA = preventMultipleExecution(fnA, 1000);
      const guardedB = preventMultipleExecution(fnB, 1000);

      expect(guardedA()).toBe('A');
      expect(guardedB()).toBe('B');

      expect(fnA).toHaveBeenCalledTimes(1);
      expect(fnB).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle repeated cycles of cooldown and re-execution', () => {
      const fn = jest.fn(() => 'ok');
      const guarded = preventMultipleExecution(fn, 100);

      expect(guarded()).toBe('ok');
      expect(guarded()).toBeUndefined();

      jest.advanceTimersByTime(100);
      expect(guarded()).toBe('ok');
      expect(guarded()).toBeUndefined();

      jest.advanceTimersByTime(100);
      expect(guarded()).toBe('ok');

      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should not execute if called just before cooldown ends', () => {
      const fn = jest.fn(() => 'ok');
      const guarded = preventMultipleExecution(fn, 1000);

      guarded();
      jest.advanceTimersByTime(999);
      expect(guarded()).toBeUndefined();

      jest.advanceTimersByTime(1);
      expect(guarded()).toBe('ok');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
