import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { paperSchema } from "@/lib/validations";

// GET /api/papers — List papers
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const subjectId = searchParams.get("subjectId");

    const where: any = {};

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { institutionId: true, role: true },
    });

    if (user?.institutionId) {
      where.institutionId = user.institutionId;
    }

    // Teachers can only see their own papers unless they're admins
    if (user?.role === "TEACHER") {
      where.createdById = session.user.id;
    }

    if (status) where.status = status;
    if (subjectId) where.subjectId = subjectId;

    const [papers, total] = await Promise.all([
      prisma.questionPaper.findMany({
        where,
        include: {
          subject: { select: { id: true, name: true, code: true } },
          createdBy: { select: { id: true, name: true, image: true } },
          sections: { select: { id: true, title: true, orderIndex: true } },
          _count: { select: { paperQuestions: true } },
        },
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.questionPaper.count({ where }),
    ]);

    return NextResponse.json({
      papers,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("GET /api/papers error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST /api/papers — Create a new paper
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = paperSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data = validation.data;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { institutionId: true },
    });

    if (!user?.institutionId) {
      return NextResponse.json({ error: "User has no institution" }, { status: 400 });
    }

    const paper = await prisma.questionPaper.create({
      data: {
        title: data.title,
        subjectId: data.subjectId,
        examType: data.examType,
        totalMarks: data.totalMarks,
        durationMinutes: data.durationMinutes,
        instructions: data.instructions,
        headerConfig: data.headerConfig ? JSON.stringify(data.headerConfig) : "{}",
        createdById: session.user.id!,
        institutionId: user.institutionId,
        status: "DRAFT",
        sections: {
          create: [
            { title: "Part A", orderIndex: 0, marksPerQuestion: 1 },
            { title: "Part B", orderIndex: 1, marksPerQuestion: 5 },
            { title: "Part C", orderIndex: 2, marksPerQuestion: 10 },
          ],
        },
      },
      include: {
        subject: true,
        sections: true,
      },
    });

    await prisma.analyticsEvent.create({
      data: {
        userId: session.user.id!,
        paperId: paper.id,
        eventType: "PAPER_CREATED",
        metadata: JSON.stringify({ examType: data.examType }),
      },
    });

    return NextResponse.json(paper, { status: 201 });
  } catch (error) {
    console.error("POST /api/papers error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
