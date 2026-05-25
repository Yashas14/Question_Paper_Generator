import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  universityClassicTemplate,
  modernCleanTemplate,
  boardStyleTemplate,
} from "@/lib/pdf-templates";

/**
 * POST /api/papers/[id]/generate-pdf
 * Generate a PDF for a specific paper using Puppeteer
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const templateId = body.template || "university-classic";

    // Fetch complete paper data
    const paper = await prisma.questionPaper.findUnique({
      where: { id: params.id },
      include: {
        subject: true,
        institution: true,
        createdBy: { select: { name: true } },
        sections: {
          orderBy: { orderIndex: "asc" },
          include: {
            paperQuestions: {
              orderBy: { orderIndex: "asc" },
              include: {
                question: true,
              },
            },
          },
        },
      },
    });

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    const headerConfig = typeof paper.headerConfig === 'string' 
      ? JSON.parse(paper.headerConfig || '{}') 
      : (paper.headerConfig || {}) as any;

    // Build template data
    const templateData = {
      institutionName: headerConfig.institutionName || paper.institution.name,
      departmentName: headerConfig.departmentName || "Department",
      courseName: headerConfig.courseName || paper.subject.name,
      courseCode: headerConfig.courseCode || paper.subject.code,
      semester: headerConfig.semester || paper.subject.semester || 1,
      examType: headerConfig.examType || paper.examType,
      date: headerConfig.date || new Date().toLocaleDateString("en-IN"),
      totalMarks: paper.totalMarks || 0,
      duration: paper.durationMinutes || 0,
      instructions: paper.instructions || "Answer all questions.",
      logoUrl: headerConfig.logoUrl,
      sections: paper.sections.map((section) => ({
        title: section.title,
        questions: section.paperQuestions.map((pq, index) => ({
          number: index + 1,
          text: pq.question.text,
          marks: pq.marksOverride || pq.question.marks,
          isCompulsory: pq.isCompulsory,
        })),
      })),
    };

    // Select template
    let html: string;
    switch (templateId) {
      case "modern-clean":
        html = modernCleanTemplate(templateData);
        break;
      case "board-style":
        html = boardStyleTemplate(templateData);
        break;
      default:
        html = universityClassicTemplate(templateData);
    }

    // In production, use Puppeteer to render HTML to PDF:
    // const browser = await puppeteer.launch({ headless: 'new' });
    // const page = await browser.newPage();
    // await page.setContent(html, { waitUntil: 'networkidle0' });
    // const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    // await browser.close();

    // For now, return the rendered HTML (can be used for preview)
    // In production, upload to S3 and return download URL

    await prisma.analyticsEvent.create({
      data: {
        userId: session.user.id!,
        paperId: paper.id,
        eventType: "EXPORT_PDF",
        metadata: JSON.stringify({ template: templateId }),
      },
    });

    return NextResponse.json({
      html,
      message: "PDF generated successfully",
      templateUsed: templateId,
      // In production:
      // pdfUrl: "https://s3.amazonaws.com/...",
      // answerKeyUrl: "https://s3.amazonaws.com/...",
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
