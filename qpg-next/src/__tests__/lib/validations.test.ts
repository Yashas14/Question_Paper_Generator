import { describe, it, expect } from 'vitest';
import {
  loginSchema, registerSchema, questionSchema, paperSchema,
  aiGenerateSchema,
} from '@/lib/validations';

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'not-an-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects short password', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: '123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('validates correct registration data', () => {
      const result = registerSchema.safeParse({
        name: 'Test User',
        email: 'user@example.com',
        password: 'SecurePass123',
        confirmPassword: 'SecurePass123',
        institutionName: 'Test University',
      });
      expect(result.success).toBe(true);
    });

    it('rejects mismatched passwords', () => {
      const result = registerSchema.safeParse({
        name: 'Test User',
        email: 'user@example.com',
        password: 'SecurePass123',
        confirmPassword: 'DifferentPass',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('questionSchema', () => {
    it('validates correct question data', () => {
      const result = questionSchema.safeParse({
        text: 'What is a binary search tree and how does it work?',
        type: 'SHORT',
        difficulty: 'MEDIUM',
        marks: 10,
        bloomLevel: 'UNDERSTAND',
        subjectId: 'subject-1',
        topicId: 'topic-1',
      });
      expect(result.success).toBe(true);
    });

    it('rejects negative marks', () => {
      const result = questionSchema.safeParse({
        text: 'What is a binary search tree and how does it work?',
        type: 'SHORT',
        difficulty: 'MEDIUM',
        marks: -5,
        bloomLevel: 'UNDERSTAND',
        subjectId: 'subject-1',
        topicId: 'topic-1',
      });
      expect(result.success).toBe(false);
    });

    it('rejects invalid question type', () => {
      const result = questionSchema.safeParse({
        text: 'What is a binary search tree and how does it work?',
        type: 'INVALID_TYPE',
        difficulty: 'MEDIUM',
        marks: 10,
        bloomLevel: 'UNDERSTAND',
        subjectId: 'subject-1',
        topicId: 'topic-1',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('paperSchema', () => {
    it('validates correct paper data', () => {
      const result = paperSchema.safeParse({
        title: 'Mid-Term Exam 2024',
        subjectId: 'subject-1',
        totalMarks: 100,
        durationMinutes: 180,
        examType: 'CIE',
      });
      expect(result.success).toBe(true);
    });

    it('rejects empty title', () => {
      const result = paperSchema.safeParse({
        title: '',
        subjectId: 'subject-1',
        totalMarks: 100,
        durationMinutes: 180,
        examType: 'CIE',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('aiGenerateSchema', () => {
    it('validates correct AI generation data', () => {
      const result = aiGenerateSchema.safeParse({
        subjectId: 'subject-1',
        topicIds: ['topic-1', 'topic-2'],
        count: 5,
        questionTypes: ['MCQ', 'SHORT'],
        difficulty: 'MEDIUM',
        includeExplanations: true,
        language: 'en',
      });
      expect(result.success).toBe(true);
    });

    it('rejects count above max', () => {
      const result = aiGenerateSchema.safeParse({
        subjectId: 'subject-1',
        topicIds: ['topic-1'],
        count: 100,
        questionTypes: ['MCQ'],
        difficulty: 'MEDIUM',
        includeExplanations: true,
        language: 'en',
      });
      expect(result.success).toBe(false);
    });
  });
});
