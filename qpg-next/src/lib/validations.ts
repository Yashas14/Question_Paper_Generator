import { z } from "zod";

// ─── AUTH SCHEMAS ─────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string(),
  institutionName: z.string().min(2, "Institution name required").optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// ─── QUESTION SCHEMAS ─────────────────────────────────

export const questionSchema = z.object({
  text: z.string().min(10, "Question text must be at least 10 characters"),
  type: z.enum(["MCQ", "SHORT", "LONG", "FILL", "TRUE_FALSE", "MATCH", "CASE_STUDY"]),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  marks: z.number().min(0.5).max(100),
  timeEstimateMin: z.number().min(1).max(120).optional(),
  subjectId: z.string().min(1, "Subject is required"),
  topicId: z.string().optional(),
  bloomLevel: z.enum(["REMEMBER", "UNDERSTAND", "APPLY", "ANALYZE", "EVALUATE", "CREATE"]).optional(),
  options: z.array(z.object({
    id: z.string(),
    text: z.string().min(1),
    isCorrect: z.boolean(),
  })).optional(),
  correctAnswer: z.string().optional(),
  explanation: z.string().optional(),
  tags: z.array(z.string()).default([]),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

// ─── PAPER SCHEMAS ────────────────────────────────────

export const paperSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  subjectId: z.string().min(1, "Subject is required"),
  examType: z.enum(["CIE", "SEE", "QUIZ", "ASSIGNMENT", "MOCK"]),
  totalMarks: z.number().min(1).optional(),
  durationMinutes: z.number().min(1).optional(),
  instructions: z.string().optional(),
  headerConfig: z.object({
    institutionName: z.string().optional(),
    departmentName: z.string().optional(),
    courseName: z.string().optional(),
    courseCode: z.string().optional(),
    semester: z.number().optional(),
    examType: z.string().optional(),
    date: z.string().optional(),
    logoUrl: z.string().optional(),
  }).optional(),
});

export const paperSectionSchema = z.object({
  title: z.string().min(1, "Section title required"),
  description: z.string().optional(),
  marksPerQuestion: z.number().min(0.5).optional(),
  totalQuestionsToAttempt: z.number().min(1).optional(),
  orderIndex: z.number().default(0),
});

// ─── AI GENERATION SCHEMAS ────────────────────────────

export const aiGenerateSchema = z.object({
  subjectId: z.string().min(1),
  topicIds: z.array(z.string()).min(1, "Select at least one topic"),
  questionTypes: z.array(z.enum(["MCQ", "SHORT", "LONG", "FILL", "TRUE_FALSE"])).min(1),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD", "MIXED"]),
  count: z.number().min(1).max(50),
  bloomLevels: z.array(z.enum(["REMEMBER", "UNDERSTAND", "APPLY", "ANALYZE", "EVALUATE", "CREATE"])).optional(),
  includeExplanations: z.boolean().default(true),
  language: z.enum(["en", "hi", "kn", "ta"]).default("en"),
});

// ─── SUBJECT SCHEMAS ──────────────────────────────────

export const subjectSchema = z.object({
  name: z.string().min(2, "Subject name required"),
  code: z.string().min(2, "Subject code required"),
  semester: z.number().min(1).max(12).optional(),
  departmentId: z.string().optional(),
});

export const topicSchema = z.object({
  name: z.string().min(2, "Topic name required"),
  description: z.string().optional(),
  bloomLevel: z.enum(["REMEMBER", "UNDERSTAND", "APPLY", "ANALYZE", "EVALUATE", "CREATE"]).optional(),
  weightage: z.number().min(0).max(100).optional(),
});

// ─── INSTITUTION SCHEMAS ──────────────────────────────

export const institutionSchema = z.object({
  name: z.string().min(2, "Institution name required"),
  domain: z.string().optional(),
  type: z.enum(["School", "College", "University"]),
});

// ─── TYPE EXPORTS ─────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type QuestionInput = z.infer<typeof questionSchema>;
export type PaperInput = z.infer<typeof paperSchema>;
export type PaperSectionInput = z.infer<typeof paperSectionSchema>;
export type AIGenerateInput = z.infer<typeof aiGenerateSchema>;
export type SubjectInput = z.infer<typeof subjectSchema>;
export type TopicInput = z.infer<typeof topicSchema>;
