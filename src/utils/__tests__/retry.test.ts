import { retry } from '../retry';

describe('retry', () => {
  describe('happy path', () => {
    it('should return the result on first successful call', async () => {
      const fn = jest.fn().mockResolvedValue('success');

      const result = await retry(fn);

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should succeed after retrying on transient failures', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce(new Error('fail 1'))
        .mockResolvedValue('success');

      const result = await retry(fn, { delay: 1 });

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should succeed on the last attempt', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce(new Error('fail 1'))
        .mockRejectedValueOnce(new Error('fail 2'))
        .mockResolvedValue('success');

      const result = await retry(fn, { maxAttempts: 3, delay: 1 });

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  describe('failure behavior', () => {
    it('should throw the last error when all attempts fail', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('always fails'));

      await expect(retry(fn, { maxAttempts: 3, delay: 1 })).rejects.toThrow(
        'always fails',
      );
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should throw the error from the last attempt specifically', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce(new Error('error 1'))
        .mockRejectedValueOnce(new Error('error 2'))
        .mockRejectedValueOnce(new Error('error 3'));

      await expect(retry(fn, { maxAttempts: 3, delay: 1 })).rejects.toThrow(
        'error 3',
      );
    });

    it('should call the function exactly maxAttempts times on repeated failure', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('fail'));

      await expect(retry(fn, { maxAttempts: 5, delay: 1 })).rejects.toThrow(
        'fail',
      );
      expect(fn).toHaveBeenCalledTimes(5);
    });
  });

  describe('default options', () => {
    it('should use maxAttempts of 3 by default', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('fail'));

      await expect(retry(fn, { delay: 1 })).rejects.toThrow('fail');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should use a backoff multiplier of 1 by default (constant delay)', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success');

      const start = Date.now();
      const result = await retry(fn, { maxAttempts: 3, delay: 10 });
      const elapsed = Date.now() - start;

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
      // With backoff=1 and delay=10, two waits should be ~20ms total
      expect(elapsed).toBeGreaterThanOrEqual(15);
      expect(elapsed).toBeLessThan(100);
    });
  });

  describe('backoff', () => {
    it('should apply exponential backoff with the specified multiplier', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success');

      const start = Date.now();
      const result = await retry(fn, { maxAttempts: 3, delay: 10, backoff: 2 });
      const elapsed = Date.now() - start;

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
      // First delay: 10ms, second delay: 20ms => total ~30ms
      expect(elapsed).toBeGreaterThanOrEqual(25);
      expect(elapsed).toBeLessThan(200);
    });

    it('should increase delay with each retry when backoff > 1', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockRejectedValueOnce(new Error('fail'))
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success');

      const start = Date.now();
      const result = await retry(fn, { maxAttempts: 4, delay: 10, backoff: 2 });
      const elapsed = Date.now() - start;

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(4);
      // Delays: 10 + 20 + 40 = 70ms total
      expect(elapsed).toBeGreaterThanOrEqual(50);
    });
  });

  describe('edge cases', () => {
    it('should handle maxAttempts of 1 (no retries)', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('fail'));

      await expect(retry(fn, { maxAttempts: 1 })).rejects.toThrow('fail');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should work with no options provided', async () => {
      const fn = jest.fn().mockResolvedValue(42);

      const result = await retry(fn);

      expect(result).toBe(42);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should resolve with the value from the successful attempt', async () => {
      const fn = jest
        .fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('recovered');

      const result = await retry(fn, { delay: 1 });

      expect(result).toBe('recovered');
    });

    it('should not delay after the last failed attempt', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('fail'));

      const start = Date.now();
      await expect(retry(fn, { maxAttempts: 2, delay: 10 })).rejects.toThrow(
        'fail',
      );
      const elapsed = Date.now() - start;

      // Only 1 delay between attempt 1 and 2, no delay after attempt 2
      expect(elapsed).toBeGreaterThanOrEqual(8);
      expect(elapsed).toBeLessThan(50);
    });

    it('should rethrow non-Error values', async () => {
      const fn = jest.fn().mockRejectedValue('string error');

      await expect(retry(fn, { maxAttempts: 1 })).rejects.toBe('string error');
    });
  });
});
