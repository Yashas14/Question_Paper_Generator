import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

import { hasPermission, hasAnyPermission, ROLE_PERMISSIONS } from '@/lib/permissions';
import type { UserRole, Permission } from '@/lib/permissions';

describe('Permissions System (Extended)', () => {
  describe('hasAnyPermission', () => {
    it('returns true if user has at least one permission', () => {
      expect(hasAnyPermission('TEACHER', ['questions:create', 'institution:manage'])).toBe(true);
    });

    it('returns false if user has none of the permissions', () => {
      expect(hasAnyPermission('STUDENT', ['questions:create', 'papers:create'])).toBe(false);
    });

    it('returns true for SUPER_ADMIN with any permission list', () => {
      expect(hasAnyPermission('SUPER_ADMIN', ['institution:manage'])).toBe(true);
    });
  });

  describe('Role-Permission coverage', () => {
    const allRoles: UserRole[] = [
      'SUPER_ADMIN', 'INSTITUTION_ADMIN', 'HOD', 'TEACHER', 'REVIEWER', 'STUDENT',
    ];

    it('every role has at least subjects:read', () => {
      for (const role of allRoles) {
        expect(hasPermission(role, 'subjects:read')).toBe(true);
      }
    });

    it('only admin roles have institution:manage', () => {
      expect(hasPermission('SUPER_ADMIN', 'institution:manage')).toBe(true);
      expect(hasPermission('INSTITUTION_ADMIN', 'institution:manage')).toBe(true);
      expect(hasPermission('HOD', 'institution:manage')).toBe(false);
      expect(hasPermission('TEACHER', 'institution:manage')).toBe(false);
      expect(hasPermission('REVIEWER', 'institution:manage')).toBe(false);
      expect(hasPermission('STUDENT', 'institution:manage')).toBe(false);
    });

    it('REVIEWER can approve papers', () => {
      expect(hasPermission('REVIEWER', 'papers:approve')).toBe(true);
    });

    it('TEACHER cannot delete questions', () => {
      expect(hasPermission('TEACHER', 'questions:delete')).toBe(false);
    });

    it('HOD can verify questions', () => {
      expect(hasPermission('HOD', 'questions:verify')).toBe(true);
    });

    it('TEACHER has AI generate permission', () => {
      expect(hasPermission('TEACHER', 'ai:generate')).toBe(true);
    });

    it('STUDENT does not have AI generate permission', () => {
      expect(hasPermission('STUDENT', 'ai:generate')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('returns false for unknown role', () => {
      expect(hasPermission('UNKNOWN_ROLE' as UserRole, 'papers:create')).toBe(false);
    });

    it('returns false for unknown permission', () => {
      expect(hasPermission('TEACHER', 'unknown:permission' as Permission)).toBe(false);
    });
  });
});
