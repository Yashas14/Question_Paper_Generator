import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    institution: {
      create: vi.fn(),
    },
    analyticsEvent: {
      create: vi.fn(),
    },
  },
}));

// Mock bcryptjs
vi.mock('bcryptjs', () => ({
  hash: vi.fn().mockResolvedValue('hashed_password'),
}));

import prisma from '@/lib/prisma';

const { POST } = await import('@/app/api/auth/register/route');

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 if required fields are missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toContain('required');
  });

  it('returns 409 if user already exists', async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      id: 'existing-user',
      email: 'test@example.com',
    });

    const req = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'SecurePass123',
      }),
    });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.message).toContain('already exists');
  });

  it('creates user without institution', async () => {
    (prisma.user.findUnique as any).mockResolvedValue(null);
    (prisma.user.create as any).mockResolvedValue({
      id: 'new-user',
      name: 'Test User',
      email: 'test@example.com',
      role: 'TEACHER',
    });
    (prisma.analyticsEvent.create as any).mockResolvedValue({});

    const req = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'SecurePass123',
      }),
    });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe('Account created successfully');
    expect(data.user.email).toBe('test@example.com');
  });

  it('creates institution when institutionName is provided', async () => {
    (prisma.user.findUnique as any).mockResolvedValue(null);
    (prisma.institution.create as any).mockResolvedValue({
      id: 'inst-new',
      name: 'Test University',
    });
    (prisma.user.create as any).mockResolvedValue({
      id: 'new-user',
      name: 'Admin User',
      email: 'admin@test.edu',
      role: 'INSTITUTION_ADMIN',
    });
    (prisma.analyticsEvent.create as any).mockResolvedValue({});

    const req = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Admin User',
        email: 'admin@test.edu',
        password: 'SecurePass123',
        institutionName: 'Test University',
      }),
    });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(prisma.institution.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: 'Test University',
          subscriptionPlan: 'FREE',
        }),
      })
    );
  });
});
