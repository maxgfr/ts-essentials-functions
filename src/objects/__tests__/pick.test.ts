import { pick } from '../pick';

describe('pick', () => {
  describe('happy path', () => {
    it('should pick a single key', () => {
      const result = pick({ a: 1, b: 2, c: 3 }, ['a']);
      expect(result).toEqual({ a: 1 });
    });

    it('should pick multiple keys', () => {
      const result = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should pick all keys', () => {
      const result = pick({ a: 1, b: 2 }, ['a', 'b']);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should return empty object when picking no keys', () => {
      const result = pick({ a: 1, b: 2 }, []);
      expect(result).toEqual({});
    });
  });

  describe('edge cases', () => {
    it('should handle empty object', () => {
      const result = pick({} as Record<string, unknown>, []);
      expect(result).toEqual({});
    });

    it('should ignore keys not present in object', () => {
      const result = pick({ a: 1, b: 2 } as Record<string, unknown>, [
        'a',
        'c' as keyof Record<string, unknown>,
      ]);
      expect(result).toEqual({ a: 1 });
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
      const result = pick(obj, ['str', 'arr', 'nested']);
      expect(result).toEqual({
        str: 'hello',
        arr: [1, 2],
        nested: { x: 1 },
      });
    });

    it('should handle picking undefined values', () => {
      const obj = { a: undefined, b: 2 };
      const result = pick(obj, ['a']);
      expect(result).toEqual({ a: undefined });
      expect('a' in result).toBe(true);
    });

    it('should handle picking null values', () => {
      const obj = { a: null, b: 2 };
      const result = pick(obj, ['a']);
      expect(result).toEqual({ a: null });
    });
  });

  describe('practical use cases', () => {
    it('should extract subset of user fields', () => {
      const user = {
        id: '123',
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret',
        token: 'abc123',
      };
      const result = pick(user, ['name', 'email']);
      expect(result).toEqual({
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
      pick(original, ['a']);
      expect(original).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should return a new object reference', () => {
      const original = { a: 1, b: 2 };
      const result = pick(original, ['a', 'b']);
      expect(result).not.toBe(original);
    });
  });

  describe('type preservation', () => {
    it('should preserve value types', () => {
      const obj = { name: 'test', count: 5, active: true };
      const result = pick(obj, ['name', 'count']);
      expect(typeof result.name).toBe('string');
      expect(typeof result.count).toBe('number');
    });

    it('should preserve nested object references (shallow pick)', () => {
      const nested = { x: 1 };
      const obj = { a: nested, b: 2 };
      const result = pick(obj, ['a']);
      expect(result.a).toBe(nested);
    });
  });
});
