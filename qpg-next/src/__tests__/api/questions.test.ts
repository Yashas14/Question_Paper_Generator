import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
    },
    question: {
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

// Need to import the route handler dynamically after mocks
const { GET, POST } = await import('@/app/api/questions/route');

describe('GET /api/questions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 if not authenticated', async () => {
    (auth as any).mockResolvedValue(null);

    const req = new NextRequest('http://localhost:3000/api/questions');
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Unauthorized');
  });

  it('returns questions with pagination', async () => {
    (auth as any).mockResolvedValue({
      user: { id: 'user-1', name: 'Test User' },
    });
    (prisma.user.findUnique as any).mockResolvedValue({
      institutionId: 'inst-1',
      role: 'TEACHER',
    });
    (prisma.question.findMany as any).mockResolvedValue([
      { id: 'q1', text: 'Test question', type: 'MCQ' },
    ]);
    (prisma.question.count as any).mockResolvedValue(1);

    const req = new NextRequest('http://localhost:3000/api/questions?page=1&limit=20');
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.questions).toHaveLength(1);
    expect(data.pagination.page).toBe(1);
    expect(data.pagination.total).toBe(1);
  });

  it('applies search filter', async () => {
    (auth as any).mockResolvedValue({
      user: { id: 'user-1' },
    });
    (prisma.user.findUnique as any).mockResolvedValue({
      institutionId: 'inst-1',
      role: 'TEACHER',
    });
    (prisma.question.findMany as any).mockResolvedValue([]);
    (prisma.question.count as any).mockResolvedValue(0);

    const req = new NextRequest('http://localhost:3000/api/questions?search=binary');
    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(prisma.question.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.any(Array),
        }),
      })
    );
  });

  it('applies subject filter', async () => {
    (auth as any).mockResolvedValue({
      user: { id: 'user-1' },
    });
    (prisma.user.findUnique as any).mockResolvedValue({
      institutionId: 'inst-1',
      role: 'TEACHER',
    });
    (prisma.question.findMany as any).mockResolvedValue([]);
    (prisma.question.count as any).mockResolvedValue(0);

    const req = new NextRequest('http://localhost:3000/api/questions?subjectId=sub-1');
    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(prisma.question.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          subjectId: 'sub-1',
        }),
      })
    );
  });
});

describe('POST /api/questions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 if not authenticated', async () => {
    (auth as any).mockResolvedValue(null);

    const req = new NextRequest('http://localhost:3000/api/questions', {
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

    const req = new NextRequest('http://localhost:3000/api/questions', {
      method: 'POST',
      body: JSON.stringify({ text: 'too short', type: 'INVALID' }),
    });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Validation failed');
  });

  it('creates question with valid data', async () => {
    (auth as any).mockResolvedValue({
      user: { id: 'user-1' },
    });
    (prisma.question.create as any).mockResolvedValue({
      id: 'q-new',
      text: '<p>What is the time complexity of binary search?</p>',
      type: 'MCQ',
      difficulty: 'EASY',
      marks: 2,
    });

    const req = new NextRequest('http://localhost:3000/api/questions', {
      method: 'POST',
      body: JSON.stringify({
        text: '<p>What is the time complexity of binary search?</p>',
        type: 'MCQ',
        difficulty: 'EASY',
        marks: 2,
        subjectId: 'sub-1',
        tags: ['binary-search'],
      }),
    });
    const response = await POST(req);

    expect(response.status).toBe(201);
    expect(prisma.question.create).toHaveBeenCalled();
  });
});
