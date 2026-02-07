import { wait } from '../wait';

describe('wait', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('happy path', () => {
    it('should return a promise', () => {
      const result = wait(100);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve after the specified delay', async () => {
      let resolved = false;
      const promise = wait(500).then(() => {
        resolved = true;
      });

      expect(resolved).toBe(false);

      jest.advanceTimersByTime(500);
      await promise;

      expect(resolved).toBe(true);
    });

    it('should not resolve before the delay has passed', async () => {
      let resolved = false;
      wait(1000).then(() => {
        resolved = true;
      });

      jest.advanceTimersByTime(999);
      await Promise.resolve();

      expect(resolved).toBe(false);
    });

    it('should resolve with undefined', async () => {
      const promise = wait(100);
      jest.advanceTimersByTime(100);
      const result = await promise;

      expect(result).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should resolve immediately with a delay of 0', async () => {
      let resolved = false;
      const promise = wait(0).then(() => {
        resolved = true;
      });

      jest.advanceTimersByTime(0);
      await promise;

      expect(resolved).toBe(true);
    });

    it('should handle large delay values', async () => {
      let resolved = false;
      const promise = wait(60000).then(() => {
        resolved = true;
      });

      jest.advanceTimersByTime(59999);
      await Promise.resolve();
      expect(resolved).toBe(false);

      jest.advanceTimersByTime(1);
      await promise;
      expect(resolved).toBe(true);
    });
  });
});
