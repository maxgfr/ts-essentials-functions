import { debounce } from '../debouce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('happy path', () => {
    it('should call the function after the default delay of 300ms', () => {
      const fn = jest.fn();
      const debounced = debounce(fn);

      debounced();
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should call the function after the specified delay', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 500);

      debounced();
      jest.advanceTimersByTime(499);
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the debounced function', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);

      debounced('hello', 42);
      jest.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledWith('hello', 42);
    });

    it('should use the arguments from the last call', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);

      debounced('first');
      debounced('second');
      debounced('third');
      jest.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('third');
    });
  });

  describe('cancellation behavior', () => {
    it('should reset the timer on subsequent calls', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 200);

      debounced();
      jest.advanceTimersByTime(150);
      debounced();
      jest.advanceTimersByTime(150);

      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should only execute once when called multiple times within the delay', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      debounced();
      debounced();
      debounced();

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should work with a delay of 0', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 0);

      debounced();
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(0);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should allow subsequent calls after the delay has passed', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);

      debounced('first');
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('first');

      debounced('second');
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveBeenCalledWith('second');
    });
  });
});
