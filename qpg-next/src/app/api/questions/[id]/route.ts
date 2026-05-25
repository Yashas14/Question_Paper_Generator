import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/questions/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const question = await prisma.question.findUnique({
      where: { id: params.id },
      include: {
        subject: true,
        topic: true,
        createdBy: { select: { id: true, name: true, image: true } },
        paperQuestions: {
          include: { paper: { select: { id: true, title: true } } },
          take: 5,
          orderBy: { paper: { createdAt: "desc" } },
        },
      },
    });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error("GET /api/questions/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// PUT /api/questions/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const question = await prisma.question.update({
      where: { id: params.id },
      data: {
        text: body.text,
        type: body.type,
        difficulty: body.difficulty,
        marks: body.marks,
        timeEstimateMin: body.timeEstimateMin,
        topicId: body.topicId || null,
        bloomLevel: body.bloomLevel || null,
        options: body.options ? JSON.stringify(body.options) : undefined,
        correctAnswer: body.correctAnswer || null,
        explanation: body.explanation || null,
        tags: body.tags ? JSON.stringify(body.tags) : "[]",
        imageUrl: body.imageUrl || null,
      },
      include: {
        subject: { select: { id: true, name: true, code: true } },
        topic: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error("PUT /api/questions/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// DELETE /api/questions/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.question.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Question deleted" });
  } catch (error) {
    console.error("DELETE /api/questions/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
