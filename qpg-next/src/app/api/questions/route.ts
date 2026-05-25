import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { questionSchema } from "@/lib/validations";

// GET /api/questions — List questions with filters
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const subjectId = searchParams.get("subjectId");
    const topicId = searchParams.get("topicId");
    const type = searchParams.get("type");
    const difficulty = searchParams.get("difficulty");
    const bloomLevel = searchParams.get("bloomLevel");
    const isAIGenerated = searchParams.get("isAIGenerated");

    const where: any = {};

    // Filter by institution
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { institutionId: true, role: true },
    });

    if (user?.institutionId) {
      where.subject = { institutionId: user.institutionId };
    }

    if (search) {
      where.OR = [
        { text: { contains: search } },
        { tags: { contains: search.toLowerCase() } },
        { correctAnswer: { contains: search } },
      ];
    }

    if (subjectId) where.subjectId = subjectId;
    if (topicId) where.topicId = topicId;
    if (type) where.type = type;
    if (difficulty) where.difficulty = difficulty;
    if (bloomLevel) where.bloomLevel = bloomLevel;
    if (isAIGenerated !== null && isAIGenerated !== undefined) {
      where.isAIGenerated = isAIGenerated === "true";
    }

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where,
        include: {
          subject: { select: { id: true, name: true, code: true } },
          topic: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.question.count({ where }),
    ]);

    return NextResponse.json({
      questions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/questions error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST /api/questions — Create a new question
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = questionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data = validation.data;

    const question = await prisma.question.create({
      data: {
        text: data.text,
        type: data.type,
        difficulty: data.difficulty,
        marks: data.marks,
        timeEstimateMin: data.timeEstimateMin,
        subjectId: data.subjectId,
        topicId: data.topicId || null,
        bloomLevel: data.bloomLevel || null,
        options: data.options ? JSON.stringify(data.options) : undefined,
        correctAnswer: data.correctAnswer || null,
        explanation: data.explanation || null,
        tags: data.tags ? JSON.stringify(data.tags) : "[]",
        imageUrl: data.imageUrl || null,
        createdById: session.user.id!,
      },
      include: {
        subject: { select: { id: true, name: true, code: true } },
        topic: { select: { id: true, name: true } },
      },
    });

    // Track analytics
    await prisma.analyticsEvent.create({
      data: {
        userId: session.user.id!,
        eventType: "QUESTION_CREATED",
        metadata: JSON.stringify({ questionId: question.id, type: question.type }),
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("POST /api/questions error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
