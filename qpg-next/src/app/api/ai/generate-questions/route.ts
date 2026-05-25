import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { aiGenerateSchema } from "@/lib/validations";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildPrompt(params: {
  subjectName: string;
  topicNames: string[];
  questionTypes: string[];
  difficulty: string;
  count: number;
  bloomLevels?: string[];
  includeExplanations: boolean;
  language: string;
}) {
  const languageMap: Record<string, string> = {
    en: "English",
    hi: "Hindi",
    kn: "Kannada",
    ta: "Tamil",
  };

  return `You are an expert educator and question paper designer. Generate ${params.count} high-quality exam questions for the subject "${params.subjectName}".

TOPICS TO COVER: ${params.topicNames.join(", ")}

QUESTION TYPES REQUIRED: ${params.questionTypes.join(", ")}

DIFFICULTY LEVEL: ${params.difficulty === "MIXED" ? "Mix of EASY (40%), MEDIUM (40%), HARD (20%)" : params.difficulty}

${params.bloomLevels?.length ? `BLOOM'S TAXONOMY LEVELS: ${params.bloomLevels.join(", ")}` : ""}

LANGUAGE: ${languageMap[params.language] || "English"}

IMPORTANT RULES:
1. Questions must be clear, unambiguous, and academically rigorous
2. For MCQ: Provide exactly 4 options with one correct answer
3. For TRUE_FALSE: Provide the statement and correct answer (True/False)
4. For FILL: Use __________ for the blank, answer should be a single word/phrase
5. For SHORT: Expected answer length is 3-5 sentences
6. For LONG: Expected answer length is 1-2 paragraphs
7. ${params.includeExplanations ? "Include a brief explanation for each correct answer" : "No explanations needed"}
8. Assign appropriate marks: MCQ/TRUE_FALSE = 1-2, FILL = 2, SHORT = 5, LONG = 10
9. Distribute questions across the given topics as evenly as possible
10. Each question should test a different concept — avoid repetitive questions

RESPOND IN THIS EXACT JSON FORMAT:
{
  "questions": [
    {
      "text": "<p>Question text here (HTML allowed for formatting)</p>",
      "type": "MCQ|SHORT|LONG|FILL|TRUE_FALSE",
      "difficulty": "EASY|MEDIUM|HARD",
      "marks": number,
      "bloomLevel": "REMEMBER|UNDERSTAND|APPLY|ANALYZE|EVALUATE|CREATE",
      "topicName": "topic name from the list above",
      "options": [
        {"id": "a", "text": "Option A", "isCorrect": false},
        {"id": "b", "text": "Option B", "isCorrect": true},
        {"id": "c", "text": "Option C", "isCorrect": false},
        {"id": "d", "text": "Option D", "isCorrect": false}
      ],
      "correctAnswer": "The correct answer text",
      "explanation": "Brief explanation of why this is correct",
      "tags": ["tag1", "tag2"]
    }
  ]
}

For non-MCQ questions, set "options" to null.
Generate exactly ${params.count} questions now.`;
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = aiGenerateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check usage limits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { institution: true },
    });

    if (!user?.institution) {
      return NextResponse.json({ error: "No institution found" }, { status: 400 });
    }

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const monthlyUsage = await prisma.aIGenerationLog.count({
      where: {
        userId: session.user.id!,
        createdAt: { gte: monthStart },
      },
    });

    if (monthlyUsage >= user.institution.maxAIGenerations) {
      return NextResponse.json(
        { error: "Monthly AI generation limit reached. Upgrade your plan." },
        { status: 429 }
      );
    }

    // Get subject and topic details
    const subject = await prisma.subject.findUnique({
      where: { id: data.subjectId },
    });

    const topics = await prisma.topic.findMany({
      where: { id: { in: data.topicIds } },
    });

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    const prompt = buildPrompt({
      subjectName: subject.name,
      topicNames: topics.map((t) => t.name),
      questionTypes: data.questionTypes,
      difficulty: data.difficulty,
      count: data.count,
      bloomLevels: data.bloomLevels,
      includeExplanations: data.includeExplanations,
      language: data.language,
    });

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert educator. Always respond with valid JSON matching the exact schema requested.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4000,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    const parsed = JSON.parse(responseText);
    const generatedQuestions = parsed.questions || [];

    // Map topic names to IDs
    const topicNameMap = new Map(topics.map((t) => [t.name.toLowerCase(), t.id]));

    // Save questions to database
    const savedQuestions = [];
    for (const q of generatedQuestions) {
      const topicId = topicNameMap.get(q.topicName?.toLowerCase()) || topics[0]?.id;

      const saved = await prisma.question.create({
        data: {
          text: q.text,
          type: q.type,
          difficulty: q.difficulty,
          marks: q.marks || 1,
          bloomLevel: q.bloomLevel || null,
          subjectId: data.subjectId,
          topicId: topicId || null,
          options: q.options ? JSON.stringify(q.options) : undefined,
          correctAnswer: q.correctAnswer || null,
          explanation: q.explanation || null,
          tags: q.tags ? JSON.stringify(q.tags) : "[]",
          isAIGenerated: true,
          createdById: session.user.id!,
        },
      });
      savedQuestions.push(saved);
    }

    // Log AI generation
    const tokensUsed = completion.usage?.total_tokens || 0;
    const costUsd = (tokensUsed / 1000) * 0.005; // approximate cost

    await prisma.aIGenerationLog.create({
      data: {
        userId: session.user.id!,
        subjectId: data.subjectId,
        promptUsed: prompt.substring(0, 500),
        questionsGenerated: savedQuestions.length,
        tokensUsed,
        costUsd,
        model: process.env.OPENAI_MODEL || "gpt-4o",
      },
    });

    // Track analytics
    await prisma.analyticsEvent.create({
      data: {
        userId: session.user.id!,
        eventType: "AI_GENERATION",
        metadata: JSON.stringify({
          count: savedQuestions.length,
          types: data.questionTypes,
          tokensUsed,
        }),
      },
    });

    return NextResponse.json({
      questions: savedQuestions,
      usage: {
        tokensUsed,
        costUsd: costUsd.toFixed(4),
        remaining: user.institution.maxAIGenerations - monthlyUsage - 1,
      },
    });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
