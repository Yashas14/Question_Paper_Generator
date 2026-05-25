import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_URL ?? 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_MASTER_KEY ?? '',
});

// ─── Index Names ───────────────────────────────────
export const INDEXES = {
  QUESTIONS: 'questions',
  PAPERS: 'papers',
  SUBJECTS: 'subjects',
} as const;

// ─── Initialize Indexes ───────────────────────────
export async function initializeSearchIndexes(): Promise<void> {
  // Questions index
  const questionsIndex = client.index(INDEXES.QUESTIONS);
  await questionsIndex.updateSettings({
    searchableAttributes: ['text', 'subject', 'topic', 'tags', 'explanation'],
    filterableAttributes: [
      'type', 'difficulty', 'bloomLevel', 'subjectId', 'topicId',
      'institutionId', 'isAIGenerated', 'isVerified',
    ],
    sortableAttributes: ['createdAt', 'marks', 'usageCount'],
    rankingRules: [
      'words', 'typo', 'proximity', 'attribute', 'sort', 'exactness',
    ],
  });

  // Papers index
  const papersIndex = client.index(INDEXES.PAPERS);
  await papersIndex.updateSettings({
    searchableAttributes: ['title', 'subject', 'examType', 'author'],
    filterableAttributes: [
      'status', 'subjectId', 'institutionId', 'examType', 'createdById',
    ],
    sortableAttributes: ['createdAt', 'totalMarks', 'updatedAt'],
  });

  // Subjects index
  const subjectsIndex = client.index(INDEXES.SUBJECTS);
  await subjectsIndex.updateSettings({
    searchableAttributes: ['name', 'code', 'department'],
    filterableAttributes: ['departmentId', 'institutionId', 'semester'],
    sortableAttributes: ['name', 'createdAt'],
  });
}

// ─── Search Questions ─────────────────────────────
export async function searchQuestions(
  query: string,
  options?: {
    filters?: string;
    sort?: string[];
    limit?: number;
    offset?: number;
    institutionId?: string;
  },
) {
  const index = client.index(INDEXES.QUESTIONS);

  let filter = options?.institutionId
    ? `institutionId = "${options.institutionId}"`
    : '';

  if (options?.filters) {
    filter = filter ? `${filter} AND ${options.filters}` : options.filters;
  }

  return index.search(query, {
    filter: filter || undefined,
    sort: options?.sort,
    limit: options?.limit ?? 20,
    offset: options?.offset ?? 0,
    attributesToHighlight: ['text'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  });
}

// ─── Search Papers ────────────────────────────────
export async function searchPapers(
  query: string,
  options?: {
    filters?: string;
    sort?: string[];
    limit?: number;
    offset?: number;
    institutionId?: string;
  },
) {
  const index = client.index(INDEXES.PAPERS);

  let filter = options?.institutionId
    ? `institutionId = "${options.institutionId}"`
    : '';

  if (options?.filters) {
    filter = filter ? `${filter} AND ${options.filters}` : options.filters;
  }

  return index.search(query, {
    filter: filter || undefined,
    sort: options?.sort,
    limit: options?.limit ?? 20,
    offset: options?.offset ?? 0,
  });
}

// ─── Sync Helpers (call after DB changes) ──────────
export async function syncQuestion(question: {
  id: string;
  text: string;
  type: string;
  difficulty: string;
  bloomLevel: string;
  marks: number;
  tags: string[];
  explanation?: string | null;
  isAIGenerated: boolean;
  isVerified: boolean;
  subjectId: string;
  topicId: string;
  institutionId: string;
  createdAt: Date;
  subject?: string;
  topic?: string;
}) {
  const index = client.index(INDEXES.QUESTIONS);
  await index.addDocuments([{
    ...question,
    createdAt: question.createdAt.getTime(),
  }]);
}

export async function syncPaper(paper: {
  id: string;
  title: string;
  status: string;
  totalMarks: number;
  examType: string;
  subjectId: string;
  institutionId: string;
  createdById: string;
  createdAt: Date;
  subject?: string;
  author?: string;
}) {
  const index = client.index(INDEXES.PAPERS);
  await index.addDocuments([{
    ...paper,
    createdAt: paper.createdAt.getTime(),
  }]);
}

export async function deleteQuestionFromIndex(id: string) {
  const index = client.index(INDEXES.QUESTIONS);
  await index.deleteDocument(id);
}

export async function deletePaperFromIndex(id: string) {
  const index = client.index(INDEXES.PAPERS);
  await index.deleteDocument(id);
}

// ─── Bulk Sync (for initial indexing) ─────────────
export async function bulkSyncQuestions(questions: any[]) {
  const index = client.index(INDEXES.QUESTIONS);
  const docs = questions.map(q => ({
    ...q,
    createdAt: q.createdAt instanceof Date ? q.createdAt.getTime() : q.createdAt,
  }));
  
  // Meilisearch handles batching internally
  await index.addDocuments(docs);
}

export async function bulkSyncPapers(papers: any[]) {
  const index = client.index(INDEXES.PAPERS);
  const docs = papers.map(p => ({
    ...p,
    createdAt: p.createdAt instanceof Date ? p.createdAt.getTime() : p.createdAt,
  }));
  
  await index.addDocuments(docs);
}

export { client as meiliClient };
