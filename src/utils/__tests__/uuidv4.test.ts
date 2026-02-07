import { uuidv4 } from '../uuidv4';

describe('uuidv4', () => {
  const UUID_V4_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

  describe('happy path', () => {
    it('should return a string', () => {
      expect(typeof uuidv4()).toBe('string');
    });

    it('should match the UUID v4 format', () => {
      const uuid = uuidv4();
      expect(uuid).toMatch(UUID_V4_REGEX);
    });

    it('should have 36 characters (32 hex + 4 dashes)', () => {
      const uuid = uuidv4();
      expect(uuid).toHaveLength(36);
    });

    it('should have dashes at the correct positions', () => {
      const uuid = uuidv4();
      expect(uuid[8]).toBe('-');
      expect(uuid[13]).toBe('-');
      expect(uuid[18]).toBe('-');
      expect(uuid[23]).toBe('-');
    });

    it('should have 4 as the version digit (position 14)', () => {
      const uuid = uuidv4();
      expect(uuid[14]).toBe('4');
    });

    it('should have a valid variant digit (position 19 should be 8, 9, a, or b)', () => {
      const uuid = uuidv4();
      expect(['8', '9', 'a', 'b']).toContain(uuid[19]);
    });
  });

  describe('uniqueness', () => {
    it('should generate unique UUIDs across multiple calls', () => {
      const uuids = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        uuids.add(uuidv4());
      }
      expect(uuids.size).toBe(1000);
    });
  });

  describe('format consistency', () => {
    it('should always produce valid UUID v4 format across many generations', () => {
      for (let i = 0; i < 100; i++) {
        expect(uuidv4()).toMatch(UUID_V4_REGEX);
      }
    });

    it('should only contain lowercase hex characters and dashes', () => {
      const uuid = uuidv4();
      expect(uuid).toMatch(/^[0-9a-f-]+$/);
    });
  });
});
