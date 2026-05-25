import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

import { hasPermission, ROLE_PERMISSIONS } from '@/lib/permissions';

describe('Permissions System', () => {
  describe('ROLE_PERMISSIONS', () => {
    it('SUPER_ADMIN has all permissions', () => {
      const perms = ROLE_PERMISSIONS.SUPER_ADMIN;
      expect(perms).toContain('institution:manage');
      expect(perms).toContain('users:manage');
      expect(perms).toContain('questions:create');
      expect(perms).toContain('questions:delete');
    });

    it('TEACHER has question and paper permissions', () => {
      const perms = ROLE_PERMISSIONS.TEACHER;
      expect(perms).toContain('questions:create');
      expect(perms).toContain('papers:create');
      expect(perms).not.toContain('institution:manage');
    });

    it('STUDENT has view-only permissions', () => {
      const perms = ROLE_PERMISSIONS.STUDENT;
      expect(perms).toContain('subjects:read');
      expect(perms).not.toContain('questions:create');
      expect(perms).not.toContain('questions:delete');
    });
  });

  describe('hasPermission', () => {
    it('returns true for allowed permission', () => {
      expect(hasPermission('TEACHER', 'questions:create')).toBe(true);
    });

    it('returns false for disallowed permission', () => {
      expect(hasPermission('STUDENT', 'questions:create')).toBe(false);
    });

    it('SUPER_ADMIN always has permission', () => {
      expect(hasPermission('SUPER_ADMIN', 'institution:manage')).toBe(true);
      expect(hasPermission('SUPER_ADMIN', 'users:manage')).toBe(true);
    });
  });
});
