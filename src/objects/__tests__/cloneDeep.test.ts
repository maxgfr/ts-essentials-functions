import { cloneDeep } from '../cloneDeep';

describe('cloneDeep', () => {
  describe('primitives', () => {
    it('should return numbers as-is', () => {
      expect(cloneDeep(42)).toBe(42);
      expect(cloneDeep(0)).toBe(0);
      expect(cloneDeep(-1)).toBe(-1);
      expect(cloneDeep(NaN)).toBeNaN();
      expect(cloneDeep(Infinity)).toBe(Infinity);
    });

    it('should return strings as-is', () => {
      expect(cloneDeep('hello')).toBe('hello');
      expect(cloneDeep('')).toBe('');
    });

    it('should return booleans as-is', () => {
      expect(cloneDeep(true)).toBe(true);
      expect(cloneDeep(false)).toBe(false);
    });

    it('should return null as-is', () => {
      expect(cloneDeep(null)).toBeNull();
    });

    it('should return undefined as-is', () => {
      expect(cloneDeep(undefined)).toBeUndefined();
    });
  });

  describe('plain objects', () => {
    it('should clone a simple object', () => {
      const original = { a: 1, b: 'hello', c: true };
      const clone = cloneDeep(original);
      expect(clone).toEqual(original);
      expect(clone).not.toBe(original);
    });

    it('should deep clone nested objects', () => {
      const original = { a: 1, nested: { b: 2, deep: { c: 3 } } };
      const clone = cloneDeep(original);
      expect(clone).toEqual(original);
      expect(clone.nested).not.toBe(original.nested);
      expect(clone.nested.deep).not.toBe(original.nested.deep);
    });

    it('should clone an empty object', () => {
      const clone = cloneDeep({});
      expect(clone).toEqual({});
    });

    it('should handle objects with null and undefined values', () => {
      const original = { a: null, b: undefined, c: 1 };
      const clone = cloneDeep(original);
      expect(clone).toEqual(original);
      expect(clone.a).toBeNull();
      expect(clone.b).toBeUndefined();
    });
  });

  describe('arrays', () => {
    it('should clone a simple array', () => {
      const original = [1, 2, 3];
      const clone = cloneDeep(original);
      expect(clone).toEqual(original);
      expect(clone).not.toBe(original);
    });

    it('should deep clone nested arrays', () => {
      const original = [
        [1, 2],
        [3, [4, 5]],
      ];
      const clone = cloneDeep(original);
      expect(clone).toEqual(original);
      expect(clone[0]).not.toBe(original[0]);
      expect(clone[1]).not.toBe(original[1]);
    });

    it('should clone arrays of objects', () => {
      const original = [{ a: 1 }, { b: 2 }];
      const clone = cloneDeep(original);
      expect(clone).toEqual(original);
      expect(clone[0]).not.toBe(original[0]);
    });

    it('should clone empty arrays', () => {
      const clone = cloneDeep([]);
      expect(clone).toEqual([]);
    });
  });

  describe('Date', () => {
    it('should clone Date objects', () => {
      const original = new Date('2024-01-01');
      const clone = cloneDeep(original);
      expect(clone).toEqual(original);
      expect(clone).not.toBe(original);
      expect(clone.getTime()).toBe(original.getTime());
    });

    it('should produce an independent Date clone', () => {
      const original = new Date('2024-06-15');
      const clone = cloneDeep(original);
      clone.setFullYear(2000);
      expect(original.getFullYear()).toBe(2024);
    });
  });

  describe('RegExp', () => {
    it('should clone RegExp objects', () => {
      const original = /test/gi;
      const clone = cloneDeep(original);
      expect(clone.source).toBe(original.source);
      expect(clone.flags).toBe(original.flags);
      expect(clone).not.toBe(original);
    });

    it('should clone RegExp with no flags', () => {
      const original = /pattern/;
      const clone = cloneDeep(original);
      expect(clone.source).toBe('pattern');
      expect(clone.flags).toBe('');
    });
  });

  describe('Map', () => {
    it('should clone Map objects', () => {
      const original = new Map([
        ['a', 1],
        ['b', 2],
      ]);
      const clone = cloneDeep(original);
      expect(clone).not.toBe(original);
      expect(clone.get('a')).toBe(1);
      expect(clone.get('b')).toBe(2);
      expect(clone.size).toBe(2);
    });

    it('should deep clone Map values', () => {
      const nested = { x: 1 };
      const original = new Map([['key', nested]]);
      const clone = cloneDeep(original);
      expect(clone.get('key')).toEqual(nested);
      expect(clone.get('key')).not.toBe(nested);
    });

    it('should deep clone Map keys that are objects', () => {
      const keyObj = { id: 1 };
      const original = new Map([[keyObj, 'value']]);
      const clone = cloneDeep(original);
      expect(clone).not.toBe(original);
      // The cloned map should have a cloned key
      const clonedKeys = Array.from(clone.keys());
      expect(clonedKeys[0]).toEqual(keyObj);
      expect(clonedKeys[0]).not.toBe(keyObj);
    });
  });

  describe('Set', () => {
    it('should clone Set objects', () => {
      const original = new Set([1, 2, 3]);
      const clone = cloneDeep(original);
      expect(clone).not.toBe(original);
      expect(clone.size).toBe(3);
      expect(clone.has(1)).toBe(true);
      expect(clone.has(2)).toBe(true);
      expect(clone.has(3)).toBe(true);
    });

    it('should deep clone Set values that are objects', () => {
      const obj = { a: 1 };
      const original = new Set([obj]);
      const clone = cloneDeep(original);
      const clonedValues = Array.from(clone);
      expect(clonedValues[0]).toEqual(obj);
      expect(clonedValues[0]).not.toBe(obj);
    });
  });

  describe('circular references', () => {
    it('should handle circular references in objects', () => {
      const original: Record<string, unknown> = { a: 1 };
      original.self = original;
      const clone = cloneDeep(original);
      expect(clone.a).toBe(1);
      expect(clone.self).toBe(clone);
      expect(clone).not.toBe(original);
    });

    it('should handle circular references in arrays', () => {
      const original: unknown[] = [1, 2];
      original.push(original);
      const clone = cloneDeep(original);
      expect(clone[0]).toBe(1);
      expect(clone[1]).toBe(2);
      expect(clone[2]).toBe(clone);
      expect(clone).not.toBe(original);
    });

    it('should handle circular references in Maps', () => {
      const original = new Map<string, unknown>();
      original.set('self', original);
      const clone = cloneDeep(original);
      expect(clone.get('self')).toBe(clone);
      expect(clone).not.toBe(original);
    });

    it('should handle circular references in Sets', () => {
      const original = new Set<unknown>();
      original.add(original);
      const clone = cloneDeep(original);
      const values = Array.from(clone);
      expect(values[0]).toBe(clone);
      expect(clone).not.toBe(original);
    });

    it('should handle mutual circular references', () => {
      const a: Record<string, unknown> = { name: 'a' };
      const b: Record<string, unknown> = { name: 'b' };
      a.ref = b;
      b.ref = a;
      const cloneA = cloneDeep(a);
      expect(cloneA.name).toBe('a');
      expect((cloneA.ref as Record<string, unknown>).name).toBe('b');
      expect((cloneA.ref as Record<string, unknown>).ref).toBe(cloneA);
    });
  });

  describe('immutability', () => {
    it('should produce a fully independent clone', () => {
      const original = { a: 1, nested: { b: 2 } };
      const clone = cloneDeep(original);
      clone.a = 99;
      clone.nested.b = 99;
      expect(original.a).toBe(1);
      expect(original.nested.b).toBe(2);
    });

    it('should not affect original when modifying cloned array', () => {
      const original = { items: [1, 2, 3] };
      const clone = cloneDeep(original);
      clone.items.push(4);
      expect(original.items).toEqual([1, 2, 3]);
    });
  });

  describe('type preservation', () => {
    it('should preserve Date type', () => {
      const clone = cloneDeep(new Date());
      expect(clone).toBeInstanceOf(Date);
    });

    it('should preserve RegExp type', () => {
      const clone = cloneDeep(/test/);
      expect(clone).toBeInstanceOf(RegExp);
    });

    it('should preserve Map type', () => {
      const clone = cloneDeep(new Map());
      expect(clone).toBeInstanceOf(Map);
    });

    it('should preserve Set type', () => {
      const clone = cloneDeep(new Set());
      expect(clone).toBeInstanceOf(Set);
    });

    it('should preserve Array type', () => {
      const clone = cloneDeep([1, 2]);
      expect(Array.isArray(clone)).toBe(true);
    });
  });
});
