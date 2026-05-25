import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

// ─── Queue Definitions ─────────────────────────────
export const pdfQueue = new Queue('pdf-generation', { connection });
export const emailQueue = new Queue('email-notifications', { connection });
export const searchSyncQueue = new Queue('search-sync', { connection });
export const aiQueue = new Queue('ai-generation', { connection });

// ─── Job Types ─────────────────────────────────────
export interface PdfJobData {
  paperId: string;
  template: string;
  userId: string;
}

export interface EmailJobData {
  type: 'welcome' | 'invite' | 'paper-shared' | 'review-request' | 'password-reset' | 'otp' | 'digest';
  to: string;
  data: Record<string, any>;
}

export interface SearchSyncJobData {
  action: 'sync' | 'delete';
  entity: 'question' | 'paper';
  data: Record<string, any>;
}

export interface AIJobData {
  subject: string;
  topics: string[];
  config: {
    types: string[];
    difficulty: string;
    bloomLevel: string;
    count: number;
    language: string;
  };
  userId: string;
  institutionId: string;
}

// ─── Add Jobs ──────────────────────────────────────
export async function addPdfJob(data: PdfJobData) {
  return pdfQueue.add('generate', data, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  });
}

export async function addEmailJob(data: EmailJobData) {
  return emailQueue.add('send', data, {
    attempts: 5,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: { count: 500 },
    removeOnFail: { count: 100 },
  });
}

export async function addSearchSyncJob(data: SearchSyncJobData) {
  return searchSyncQueue.add('sync', data, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 200 },
  });
}

export async function addAIJob(data: AIJobData) {
  return aiQueue.add('generate', data, {
    attempts: 2,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: { count: 50 },
    removeOnFail: { count: 25 },
  });
}

// ─── Worker Factory ────────────────────────────────
export function createWorker<T>(
  queueName: string,
  processor: (job: Job<T>) => Promise<any>,
  concurrency: number = 3,
): Worker<T> {
  const worker = new Worker<T>(queueName, processor, {
    connection,
    concurrency,
    limiter: {
      max: 10,
      duration: 1000,
    },
  });

  worker.on('completed', (job) => {
    console.log(`[${queueName}] Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`[${queueName}] Job ${job?.id} failed:`, err.message);
  });

  worker.on('error', (err) => {
    console.error(`[${queueName}] Worker error:`, err.message);
  });

  return worker;
}

// ─── Get Queue Stats ───────────────────────────────
export async function getQueueStats(queue: Queue) {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    queue.getWaitingCount(),
    queue.getActiveCount(),
    queue.getCompletedCount(),
    queue.getFailedCount(),
    queue.getDelayedCount(),
  ]);

  return { waiting, active, completed, failed, delayed };
}

export async function getAllQueueStats() {
  const [pdf, email, search, ai] = await Promise.all([
    getQueueStats(pdfQueue),
    getQueueStats(emailQueue),
    getQueueStats(searchSyncQueue),
    getQueueStats(aiQueue),
  ]);

  return { pdf, email, search, ai };
}
