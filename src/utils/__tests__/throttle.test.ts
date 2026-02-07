import { throttle } from '../throttle';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('happy path', () => {
    it('should execute the function after the limit period', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 200);

      throttled();
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(200);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the throttled function', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);

      throttled('hello', 42);
      jest.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledWith('hello', 42);
    });

    it('should allow subsequent calls after the limit has elapsed', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);

      throttled();
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);

      throttled();
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('throttling behavior', () => {
    it('should ignore calls made during the limit period', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 200);

      throttled();
      throttled();
      throttled();

      jest.advanceTimersByTime(200);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should use the arguments from the first call in the throttle window', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 200);

      throttled('first');
      throttled('second');
      throttled('third');

      jest.advanceTimersByTime(200);
      expect(fn).toHaveBeenCalledWith('first');
    });

    it('should not call the function before the limit elapses', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 500);

      throttled();
      jest.advanceTimersByTime(499);
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle multiple throttle windows correctly', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);

      throttled();
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);

      throttled();
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(2);

      throttled();
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should accept new calls immediately after previous timer fires', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);

      throttled();
      jest.advanceTimersByTime(100);

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
