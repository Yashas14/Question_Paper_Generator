import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
    },
    questionPaper: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
    },
    analyticsEvent: {
      create: vi.fn(),
    },
  },
}));

// Mock auth
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

const { GET, POST } = await import('@/app/api/papers/route');

describe('GET /api/papers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 if not authenticated', async () => {
    (auth as any).mockResolvedValue(null);

    const req = new NextRequest('http://localhost:3000/api/papers');
    const response = await GET(req);

    expect(response.status).toBe(401);
  });

  it('returns papers for teacher (only own papers)', async () => {
    (auth as any).mockResolvedValue({
      user: { id: 'user-1' },
    });
    (prisma.user.findUnique as any).mockResolvedValue({
      institutionId: 'inst-1',
      role: 'TEACHER',
    });
    (prisma.questionPaper.findMany as any).mockResolvedValue([
      { id: 'p1', title: 'Test Paper', status: 'DRAFT' },
    ]);
    (prisma.questionPaper.count as any).mockResolvedValue(1);

    const req = new NextRequest('http://localhost:3000/api/papers');
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.papers).toHaveLength(1);
    // Teacher should only see own papers
    expect(prisma.questionPaper.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          createdById: 'user-1',
        }),
      })
    );
  });

  it('applies status filter', async () => {
    (auth as any).mockResolvedValue({
      user: { id: 'user-1' },
    });
    (prisma.user.findUnique as any).mockResolvedValue({
      institutionId: 'inst-1',
      role: 'INSTITUTION_ADMIN',
    });
    (prisma.questionPaper.findMany as any).mockResolvedValue([]);
    (prisma.questionPaper.count as any).mockResolvedValue(0);

    const req = new NextRequest('http://localhost:3000/api/papers?status=DRAFT');
    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(prisma.questionPaper.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: 'DRAFT',
        }),
      })
    );
  });
});

describe('POST /api/papers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 if not authenticated', async () => {
    (auth as any).mockResolvedValue(null);

    const req = new NextRequest('http://localhost:3000/api/papers', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const response = await POST(req);

    expect(response.status).toBe(401);
  });

  it('returns 400 for invalid input', async () => {
    (auth as any).mockResolvedValue({
      user: { id: 'user-1' },
    });

    const req = new NextRequest('http://localhost:3000/api/papers', {
      method: 'POST',
      body: JSON.stringify({ title: '' }),
    });
    const response = await POST(req);

    expect(response.status).toBe(400);
  });

  it('returns 400 if user has no institution', async () => {
    (auth as any).mockResolvedValue({
      user: { id: 'user-1' },
    });
    (prisma.user.findUnique as any).mockResolvedValue({
      institutionId: null,
    });

    const req = new NextRequest('http://localhost:3000/api/papers', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Paper Title',
        subjectId: 'sub-1',
        examType: 'CIE',
      }),
    });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('User has no institution');
  });

  it('creates paper with valid data', async () => {
    (auth as any).mockResolvedValue({
      user: { id: 'user-1' },
    });
    (prisma.user.findUnique as any).mockResolvedValue({
      institutionId: 'inst-1',
    });
    (prisma.questionPaper.create as any).mockResolvedValue({
      id: 'paper-1',
      title: 'Test Paper',
      status: 'DRAFT',
      subject: { id: 'sub-1', name: 'DS' },
      sections: [],
    });
    (prisma.analyticsEvent.create as any).mockResolvedValue({});

    const req = new NextRequest('http://localhost:3000/api/papers', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Paper Title',
        subjectId: 'sub-1',
        examType: 'CIE',
        totalMarks: 50,
        durationMinutes: 90,
      }),
    });
    const response = await POST(req);

    expect(response.status).toBe(201);
    expect(prisma.questionPaper.create).toHaveBeenCalled();
    expect(prisma.analyticsEvent.create).toHaveBeenCalled();
  });
});
