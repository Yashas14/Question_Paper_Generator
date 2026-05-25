import { describe, it, expect } from 'vitest';
import { cn, formatDate, formatRelativeTime, truncate, getInitials, slugify, generateId } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles conditional classes', () => {
      expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
    });

    it('resolves tailwind conflicts', () => {
      const result = cn('text-red-500', 'text-blue-500');
      expect(result).toBe('text-blue-500');
    });
  });

  describe('formatDate', () => {
    it('formats date string', () => {
      const result = formatDate('2024-01-15');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('formats Date object', () => {
      const result = formatDate(new Date('2024-01-15'));
      expect(result).toBeTruthy();
    });
  });

  describe('truncate', () => {
    it('truncates long strings', () => {
      const result = truncate('This is a very long string that should be truncated', 20);
      expect(result.length).toBeLessThanOrEqual(23); // 20 chars + '...'
      expect(result).toContain('...');
    });

    it('does not truncate short strings', () => {
      expect(truncate('Short', 20)).toBe('Short');
    });
  });

  describe('getInitials', () => {
    it('returns initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('handles single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('handles empty string', () => {
      expect(getInitials('')).toBe('');
    });
  });

  describe('slugify', () => {
    it('converts string to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello! World @2024')).toBe('hello-world-2024');
    });

    it('handles multiple spaces', () => {
      expect(slugify('Hello   World')).toBe('hello-world');
    });
  });

  describe('generateId', () => {
    it('generates a string id', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    it('generates unique ids', () => {
      const ids = new Set(Array.from({ length: 100 }, () => generateId()));
      expect(ids.size).toBe(100);
    });
  });
});
