import { describe, it, expect } from 'vitest';
import { cn, formatDate, formatRelativeTime, truncate, getInitials, slugify, generateId } from '@/lib/utils';

describe('Utility Functions (Extended)', () => {
  describe('formatRelativeTime', () => {
    it('returns "just now" for very recent time', () => {
      const now = new Date();
      expect(formatRelativeTime(now.toISOString())).toBe('just now');
    });

    it('returns minutes ago', () => {
      const time = new Date(Date.now() - 5 * 60 * 1000);
      expect(formatRelativeTime(time.toISOString())).toBe('5m ago');
    });

    it('returns hours ago', () => {
      const time = new Date(Date.now() - 3 * 60 * 60 * 1000);
      expect(formatRelativeTime(time.toISOString())).toBe('3h ago');
    });

    it('returns days ago', () => {
      const time = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      expect(formatRelativeTime(time.toISOString())).toBe('2d ago');
    });

    it('returns formatted date for old dates', () => {
      const time = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(time.toISOString());
      // Should be a formatted date string, not relative
      expect(result).not.toContain('ago');
    });
  });

  describe('slugify', () => {
    it('converts to lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('handles multiple spaces', () => {
      expect(slugify('hello   world')).toBe('hello-world');
    });

    it('removes leading/trailing dashes', () => {
      expect(slugify(' -hello world- ')).toBe('hello-world');
    });

    it('handles already slugified strings', () => {
      expect(slugify('hello-world')).toBe('hello-world');
    });
  });

  describe('generateId', () => {
    it('generates a string ID', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    it('generates with prefix', () => {
      const id = generateId('usr');
      expect(id.startsWith('usr_')).toBe(true);
    });

    it('generates unique IDs', () => {
      const ids = new Set(Array.from({ length: 100 }, () => generateId()));
      expect(ids.size).toBe(100);
    });
  });

  describe('getInitials edge cases', () => {
    it('handles three-word names (max 2 initials)', () => {
      expect(getInitials('John Paul Smith')).toBe('JP');
    });

    it('handles single character name', () => {
      expect(getInitials('J')).toBe('J');
    });

    it('handles empty string', () => {
      expect(getInitials('')).toBe('');
    });
  });

  describe('cn edge cases', () => {
    it('handles undefined and null', () => {
      expect(cn('base', undefined, null, 'extra')).toBe('base extra');
    });

    it('handles arrays', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar');
    });

    it('handles objects', () => {
      expect(cn({ hidden: true, visible: false })).toBe('hidden');
    });
  });
});
