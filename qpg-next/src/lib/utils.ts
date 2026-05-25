import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateId(prefix: string = ""): string {
  const id = Math.random().toString(36).substring(2, 10);
  return prefix ? `${prefix}_${id}` : id;
}

export const DIFFICULTY_COLORS = {
  EASY: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  MEDIUM: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  HARD: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
} as const;

export const QUESTION_TYPE_LABELS = {
  MCQ: "Multiple Choice",
  SHORT: "Short Answer",
  LONG: "Long Answer",
  FILL: "Fill in the Blank",
  TRUE_FALSE: "True / False",
  MATCH: "Match the Following",
  CASE_STUDY: "Case Study",
} as const;

export const BLOOM_LEVEL_COLORS = {
  REMEMBER: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  UNDERSTAND: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
  APPLY: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  ANALYZE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  EVALUATE: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  CREATE: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
} as const;

export const PAPER_STATUS_CONFIG = {
  DRAFT: { label: "Draft", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
  IN_REVIEW: { label: "In Review", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  APPROVED: { label: "Approved", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  PUBLISHED: { label: "Published", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400" },
  ARCHIVED: { label: "Archived", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-500" },
} as const;
