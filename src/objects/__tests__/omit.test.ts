import { omit } from '../omit';

describe('omit', () => {
  describe('happy path', () => {
    it('should omit a single key', () => {
      const result = omit({ a: 1, b: 2, c: 3 }, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should omit multiple keys', () => {
      const result = omit({ a: 1, b: 2, c: 3, d: 4 }, ['b', 'd']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should return full object when omitting no keys', () => {
      const result = omit({ a: 1, b: 2 }, []);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should return empty object when omitting all keys', () => {
      const result = omit({ a: 1, b: 2 }, ['a', 'b']);
      expect(result).toEqual({});
    });
  });

  describe('edge cases', () => {
    it('should handle empty object', () => {
      const result = omit({} as Record<string, unknown>, []);
      expect(result).toEqual({});
    });

    it('should handle keys not present in object', () => {
      const result = omit(
        { a: 1, b: 2 } as Record<string, unknown>,
        ['c' as keyof Record<string, unknown>],
      );
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should handle object with various value types', () => {
      const obj = {
        str: 'hello',
        num: 42,
        bool: true,
        nil: null,
        undef: undefined,
        arr: [1, 2],
        nested: { x: 1 },
      };
      const result = omit(obj, ['nil', 'undef']);
      expect(result).toEqual({
        str: 'hello',
        num: 42,
        bool: true,
        arr: [1, 2],
        nested: { x: 1 },
      });
    });

    it('should handle single key object', () => {
      const result = omit({ only: 1 }, ['only']);
      expect(result).toEqual({});
    });
  });

  describe('practical use cases', () => {
    it('should strip sensitive data from user object', () => {
      const user = {
        id: '123',
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret',
        token: 'abc123',
      };
      const result = omit(user, ['password', 'token']);
      expect(result).toEqual({
        id: '123',
        name: 'Alice',
        email: 'alice@example.com',
      });
      expect('password' in result).toBe(false);
      expect('token' in result).toBe(false);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original object', () => {
      const original = { a: 1, b: 2, c: 3 };
      omit(original, ['b']);
      expect(original).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should return a new object reference', () => {
      const original = { a: 1, b: 2 };
      const result = omit(original, ['b']);
      expect(result).not.toBe(original);
    });

    it('should return a new reference even when omitting nothing', () => {
      const original = { a: 1 };
      const result = omit(original, []);
      expect(result).not.toBe(original);
    });
  });

  describe('type preservation', () => {
    it('should preserve remaining key types', () => {
      const obj = { name: 'test', count: 5, active: true };
      const result = omit(obj, ['count']);
      expect(typeof result.name).toBe('string');
      expect(typeof result.active).toBe('boolean');
    });

    it('should preserve nested object references (shallow omit)', () => {
      const nested = { x: 1 };
      const obj = { a: nested, b: 2 };
      const result = omit(obj, ['b']);
      expect(result.a).toBe(nested);
    });
  });
});
