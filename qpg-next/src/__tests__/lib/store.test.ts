import { describe, it, expect, beforeEach } from 'vitest';
import { usePaperBuilderStore } from '@/lib/store';

describe('Paper Builder Store', () => {
  beforeEach(() => {
    usePaperBuilderStore.getState().reset();
  });

  it('has correct initial state', () => {
    const state = usePaperBuilderStore.getState();
    expect(state.paperId).toBeNull();
    expect(state.title).toBe('');
    expect(state.subjectId).toBe('');
    expect(state.examType).toBe('CIE');
    expect(state.totalMarks).toBe(50);
    expect(state.durationMinutes).toBe(90);
    expect(state.selectedTemplate).toBe('university-classic');
    expect(state.sections).toHaveLength(3);
  });

  it('sets paper ID', () => {
    usePaperBuilderStore.getState().setPaperId('paper-123');
    expect(usePaperBuilderStore.getState().paperId).toBe('paper-123');
  });

  it('sets title', () => {
    usePaperBuilderStore.getState().setTitle('Test Paper');
    expect(usePaperBuilderStore.getState().title).toBe('Test Paper');
  });

  it('sets subject ID', () => {
    usePaperBuilderStore.getState().setSubjectId('sub-123');
    expect(usePaperBuilderStore.getState().subjectId).toBe('sub-123');
  });

  it('sets exam type', () => {
    usePaperBuilderStore.getState().setExamType('SEE');
    expect(usePaperBuilderStore.getState().examType).toBe('SEE');
  });

  it('sets total marks', () => {
    usePaperBuilderStore.getState().setTotalMarks(100);
    expect(usePaperBuilderStore.getState().totalMarks).toBe(100);
  });

  it('sets duration', () => {
    usePaperBuilderStore.getState().setDuration(120);
    expect(usePaperBuilderStore.getState().durationMinutes).toBe(120);
  });

  it('sets template', () => {
    usePaperBuilderStore.getState().setTemplate('modern-clean');
    expect(usePaperBuilderStore.getState().selectedTemplate).toBe('modern-clean');
  });

  it('adds a section', () => {
    usePaperBuilderStore.getState().addSection('Part D');
    const sections = usePaperBuilderStore.getState().sections;
    expect(sections).toHaveLength(4);
    expect(sections[3].title).toBe('Part D');
    expect(sections[3].questionIds).toEqual([]);
  });

  it('removes a section', () => {
    const sectionId = usePaperBuilderStore.getState().sections[0].id;
    usePaperBuilderStore.getState().removeSection(sectionId);
    expect(usePaperBuilderStore.getState().sections).toHaveLength(2);
  });

  it('adds question to section', () => {
    const sectionId = usePaperBuilderStore.getState().sections[0].id;
    usePaperBuilderStore.getState().addQuestionToSection(sectionId, 'q-1');
    usePaperBuilderStore.getState().addQuestionToSection(sectionId, 'q-2');
    const section = usePaperBuilderStore.getState().sections[0];
    expect(section.questionIds).toEqual(['q-1', 'q-2']);
  });

  it('removes question from section', () => {
    const sectionId = usePaperBuilderStore.getState().sections[0].id;
    usePaperBuilderStore.getState().addQuestionToSection(sectionId, 'q-1');
    usePaperBuilderStore.getState().addQuestionToSection(sectionId, 'q-2');
    usePaperBuilderStore.getState().removeQuestionFromSection(sectionId, 'q-1');
    const section = usePaperBuilderStore.getState().sections[0];
    expect(section.questionIds).toEqual(['q-2']);
  });

  it('reorders questions in section', () => {
    const sectionId = usePaperBuilderStore.getState().sections[0].id;
    usePaperBuilderStore.getState().addQuestionToSection(sectionId, 'q-1');
    usePaperBuilderStore.getState().addQuestionToSection(sectionId, 'q-2');
    usePaperBuilderStore.getState().addQuestionToSection(sectionId, 'q-3');
    usePaperBuilderStore.getState().reorderQuestions(sectionId, ['q-3', 'q-1', 'q-2']);
    const section = usePaperBuilderStore.getState().sections[0];
    expect(section.questionIds).toEqual(['q-3', 'q-1', 'q-2']);
  });

  it('resets to initial state', () => {
    usePaperBuilderStore.getState().setTitle('Modified');
    usePaperBuilderStore.getState().setTotalMarks(200);
    usePaperBuilderStore.getState().reset();
    const state = usePaperBuilderStore.getState();
    expect(state.title).toBe('');
    expect(state.totalMarks).toBe(50);
  });
});
