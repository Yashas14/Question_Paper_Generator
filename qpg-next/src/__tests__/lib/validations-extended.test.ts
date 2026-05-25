import { describe, it, expect } from 'vitest';
import {
  loginSchema, registerSchema, questionSchema, paperSchema,
  aiGenerateSchema, subjectSchema, topicSchema,
} from '@/lib/validations';

describe('Validation Schemas (Extended)', () => {
  describe('questionSchema', () => {
    const validMCQ = {
      text: '<p>What is the time complexity of binary search?</p>',
      type: 'MCQ',
      difficulty: 'EASY',
      marks: 2,
      subjectId: 'sub-123',
      tags: ['arrays', 'search'],
    };

    it('validates a valid MCQ question', () => {
      const result = questionSchema.safeParse(validMCQ);
      expect(result.success).toBe(true);
    });

    it('rejects text shorter than 10 chars', () => {
      const result = questionSchema.safeParse({ ...validMCQ, text: 'short' });
      expect(result.success).toBe(false);
    });

    it('rejects invalid question type', () => {
      const result = questionSchema.safeParse({ ...validMCQ, type: 'ESSAY' });
      expect(result.success).toBe(false);
    });

    it('rejects invalid difficulty', () => {
      const result = questionSchema.safeParse({ ...validMCQ, difficulty: 'EXTREME' });
      expect(result.success).toBe(false);
    });

    it('rejects marks less than 0.5', () => {
      const result = questionSchema.safeParse({ ...validMCQ, marks: 0 });
      expect(result.success).toBe(false);
    });

    it('rejects marks greater than 100', () => {
      const result = questionSchema.safeParse({ ...validMCQ, marks: 101 });
      expect(result.success).toBe(false);
    });

    it('accepts optional bloom level', () => {
      const result = questionSchema.safeParse({ ...validMCQ, bloomLevel: 'APPLY' });
      expect(result.success).toBe(true);
    });

    it('rejects invalid bloom level', () => {
      const result = questionSchema.safeParse({ ...validMCQ, bloomLevel: 'GUESS' });
      expect(result.success).toBe(false);
    });

    it('validates MCQ options', () => {
      const result = questionSchema.safeParse({
        ...validMCQ,
        options: [
          { id: 'a', text: 'O(n)', isCorrect: false },
          { id: 'b', text: 'O(log n)', isCorrect: true },
          { id: 'c', text: 'O(n²)', isCorrect: false },
          { id: 'd', text: 'O(1)', isCorrect: false },
        ],
      });
      expect(result.success).toBe(true);
    });

    it('defaults tags to empty array', () => {
      const result = questionSchema.safeParse({
        text: '<p>What is the time complexity of binary search?</p>',
        type: 'MCQ',
        difficulty: 'EASY',
        marks: 2,
        subjectId: 'sub-123',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.tags).toEqual([]);
      }
    });
  });

  describe('paperSchema', () => {
    const validPaper = {
      title: 'DS Mid-Term Exam',
      subjectId: 'sub-1',
      examType: 'CIE',
    };

    it('validates valid paper data', () => {
      const result = paperSchema.safeParse(validPaper);
      expect(result.success).toBe(true);
    });

    it('rejects title shorter than 3 chars', () => {
      const result = paperSchema.safeParse({ ...validPaper, title: 'DS' });
      expect(result.success).toBe(false);
    });

    it('rejects empty subjectId', () => {
      const result = paperSchema.safeParse({ ...validPaper, subjectId: '' });
      expect(result.success).toBe(false);
    });

    it('rejects invalid exam type', () => {
      const result = paperSchema.safeParse({ ...validPaper, examType: 'FINAL' });
      expect(result.success).toBe(false);
    });

    it('accepts all valid exam types', () => {
      for (const type of ['CIE', 'SEE', 'QUIZ', 'ASSIGNMENT', 'MOCK']) {
        const result = paperSchema.safeParse({ ...validPaper, examType: type });
        expect(result.success).toBe(true);
      }
    });

    it('accepts optional header config', () => {
      const result = paperSchema.safeParse({
        ...validPaper,
        headerConfig: {
          institutionName: 'Test University',
          semester: 3,
        },
      });
      expect(result.success).toBe(true);
    });
  });

  describe('aiGenerateSchema', () => {
    const validAI = {
      subjectId: 'sub-1',
      topicIds: ['t-1', 't-2'],
      questionTypes: ['MCQ', 'SHORT'],
      difficulty: 'MIXED',
      count: 10,
      includeExplanations: true,
      language: 'en',
    };

    it('validates valid AI generation config', () => {
      const result = aiGenerateSchema.safeParse(validAI);
      expect(result.success).toBe(true);
    });

    it('rejects empty topicIds', () => {
      const result = aiGenerateSchema.safeParse({ ...validAI, topicIds: [] });
      expect(result.success).toBe(false);
    });

    it('rejects count greater than 50', () => {
      const result = aiGenerateSchema.safeParse({ ...validAI, count: 51 });
      expect(result.success).toBe(false);
    });

    it('rejects count less than 1', () => {
      const result = aiGenerateSchema.safeParse({ ...validAI, count: 0 });
      expect(result.success).toBe(false);
    });

    it('validates language options', () => {
      for (const lang of ['en', 'hi', 'kn', 'ta']) {
        const result = aiGenerateSchema.safeParse({ ...validAI, language: lang });
        expect(result.success).toBe(true);
      }
    });

    it('rejects invalid language', () => {
      const result = aiGenerateSchema.safeParse({ ...validAI, language: 'fr' });
      expect(result.success).toBe(false);
    });
  });

  describe('subjectSchema', () => {
    it('validates valid subject', () => {
      const result = subjectSchema.safeParse({ name: 'Data Structures', code: 'CS301' });
      expect(result.success).toBe(true);
    });

    it('rejects short name', () => {
      const result = subjectSchema.safeParse({ name: 'D', code: 'CS301' });
      expect(result.success).toBe(false);
    });

    it('rejects short code', () => {
      const result = subjectSchema.safeParse({ name: 'Data Structures', code: 'C' });
      expect(result.success).toBe(false);
    });

    it('accepts optional semester', () => {
      const result = subjectSchema.safeParse({ name: 'Data Structures', code: 'CS301', semester: 3 });
      expect(result.success).toBe(true);
    });
  });

  describe('topicSchema', () => {
    it('validates valid topic', () => {
      const result = topicSchema.safeParse({ name: 'Arrays and Linked Lists' });
      expect(result.success).toBe(true);
    });

    it('rejects short name', () => {
      const result = topicSchema.safeParse({ name: 'A' });
      expect(result.success).toBe(false);
    });

    it('accepts optional bloom level', () => {
      const result = topicSchema.safeParse({ name: 'Trees', bloomLevel: 'ANALYZE' });
      expect(result.success).toBe(true);
    });

    it('accepts optional weightage', () => {
      const result = topicSchema.safeParse({ name: 'Trees', weightage: 25 });
      expect(result.success).toBe(true);
    });

    it('rejects weightage over 100', () => {
      const result = topicSchema.safeParse({ name: 'Trees', weightage: 150 });
      expect(result.success).toBe(false);
    });
  });
});
