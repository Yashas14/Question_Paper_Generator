import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PaperBuilderStore {
  paperId: string | null;
  title: string;
  subjectId: string;
  examType: string;
  totalMarks: number;
  durationMinutes: number;
  selectedTemplate: string;
  sections: {
    id: string;
    title: string;
    questionIds: string[];
  }[];
  setPaperId: (id: string) => void;
  setTitle: (title: string) => void;
  setSubjectId: (id: string) => void;
  setExamType: (type: string) => void;
  setTotalMarks: (marks: number) => void;
  setDuration: (minutes: number) => void;
  setTemplate: (template: string) => void;
  addSection: (title: string) => void;
  removeSection: (sectionId: string) => void;
  addQuestionToSection: (sectionId: string, questionId: string) => void;
  removeQuestionFromSection: (sectionId: string, questionId: string) => void;
  reorderQuestions: (sectionId: string, questionIds: string[]) => void;
  reset: () => void;
}

const initialState = {
  paperId: null,
  title: "",
  subjectId: "",
  examType: "CIE",
  totalMarks: 50,
  durationMinutes: 90,
  selectedTemplate: "university-classic",
  sections: [
    { id: "default-a", title: "Part A", questionIds: [] },
    { id: "default-b", title: "Part B", questionIds: [] },
    { id: "default-c", title: "Part C", questionIds: [] },
  ],
};

export const usePaperBuilderStore = create<PaperBuilderStore>()(
  persist(
    (set) => ({
      ...initialState,
      setPaperId: (id) => set({ paperId: id }),
      setTitle: (title) => set({ title }),
      setSubjectId: (id) => set({ subjectId: id }),
      setExamType: (type) => set({ examType: type }),
      setTotalMarks: (marks) => set({ totalMarks: marks }),
      setDuration: (minutes) => set({ durationMinutes: minutes }),
      setTemplate: (template) => set({ selectedTemplate: template }),
      addSection: (title) =>
        set((state) => ({
          sections: [
            ...state.sections,
            { id: `section-${Date.now()}`, title, questionIds: [] },
          ],
        })),
      removeSection: (sectionId) =>
        set((state) => ({
          sections: state.sections.filter((s) => s.id !== sectionId),
        })),
      addQuestionToSection: (sectionId, questionId) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId
              ? { ...s, questionIds: [...s.questionIds, questionId] }
              : s
          ),
        })),
      removeQuestionFromSection: (sectionId, questionId) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId
              ? { ...s, questionIds: s.questionIds.filter((id) => id !== questionId) }
              : s
          ),
        })),
      reorderQuestions: (sectionId, questionIds) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId ? { ...s, questionIds } : s
          ),
        })),
      reset: () => set(initialState),
    }),
    { name: "paper-builder-store" }
  )
);

// ─── Notification Store ──────────────────────────────

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (n) =>
    set((state) => {
      const notification: Notification = {
        ...n,
        id: `notif-${Date.now()}`,
        read: false,
        createdAt: new Date().toISOString(),
      };
      return {
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
