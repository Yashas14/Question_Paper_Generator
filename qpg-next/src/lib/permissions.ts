import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export type UserRole = "SUPER_ADMIN" | "INSTITUTION_ADMIN" | "HOD" | "TEACHER" | "REVIEWER" | "STUDENT";

export type Permission =
  | "papers:create"
  | "papers:read"
  | "papers:update"
  | "papers:delete"
  | "papers:approve"
  | "papers:publish"
  | "questions:create"
  | "questions:read"
  | "questions:update"
  | "questions:delete"
  | "questions:verify"
  | "subjects:create"
  | "subjects:read"
  | "subjects:update"
  | "subjects:delete"
  | "users:manage"
  | "institution:manage"
  | "ai:generate"
  | "analytics:view"
  | "admin:access";

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    "papers:create", "papers:read", "papers:update", "papers:delete", "papers:approve", "papers:publish",
    "questions:create", "questions:read", "questions:update", "questions:delete", "questions:verify",
    "subjects:create", "subjects:read", "subjects:update", "subjects:delete",
    "users:manage", "institution:manage", "ai:generate", "analytics:view", "admin:access",
  ],
  INSTITUTION_ADMIN: [
    "papers:create", "papers:read", "papers:update", "papers:delete", "papers:approve", "papers:publish",
    "questions:create", "questions:read", "questions:update", "questions:delete", "questions:verify",
    "subjects:create", "subjects:read", "subjects:update", "subjects:delete",
    "users:manage", "institution:manage", "ai:generate", "analytics:view", "admin:access",
  ],
  HOD: [
    "papers:create", "papers:read", "papers:update", "papers:approve",
    "questions:create", "questions:read", "questions:update", "questions:verify",
    "subjects:create", "subjects:read", "subjects:update",
    "users:manage", "ai:generate", "analytics:view",
  ],
  TEACHER: [
    "papers:create", "papers:read", "papers:update",
    "questions:create", "questions:read", "questions:update",
    "subjects:read",
    "ai:generate", "analytics:view",
  ],
  REVIEWER: [
    "papers:read", "papers:approve",
    "questions:read", "questions:verify",
    "subjects:read",
    "analytics:view",
  ],
  STUDENT: [
    "papers:read",
    "subjects:read",
  ],
};

export { ROLE_PERMISSIONS };

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requirePermission(permission: Permission) {
  const session = await requireAuth();
  const role = (session.user as any).role as UserRole;
  if (!hasPermission(role, permission)) {
    throw new Error("Forbidden: Insufficient permissions");
  }
  return session;
}

export function apiAuthGuard(permission?: Permission) {
  return async function () {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (permission) {
      const role = (session.user as any).role as UserRole;
      if (!hasPermission(role, permission)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    return session;
  };
}
