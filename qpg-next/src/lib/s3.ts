import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
});

const BUCKET = process.env.AWS_S3_BUCKET ?? 'qpg-uploads';

// ─── Helpers ───────────────────────────────────────
function generateKey(folder: string, filename: string): string {
  const ext = filename.split('.').pop();
  const hash = crypto.randomBytes(8).toString('hex');
  return `${folder}/${Date.now()}-${hash}.${ext}`;
}

// ─── Upload ────────────────────────────────────────
export async function uploadFile(
  file: Buffer,
  filename: string,
  folder: string = 'uploads',
  contentType?: string,
): Promise<{ key: string; url: string }> {
  const key = generateKey(folder, filename);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: contentType ?? 'application/octet-stream',
      CacheControl: 'max-age=31536000',
    }),
  );

  const url = `https://${BUCKET}.s3.${process.env.AWS_REGION ?? 'us-east-1'}.amazonaws.com/${key}`;
  return { key, url };
}

// ─── Upload from base64 ───────────────────────────
export async function uploadBase64(
  base64: string,
  filename: string,
  folder: string = 'uploads',
): Promise<{ key: string; url: string }> {
  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid base64 string');

  const contentType = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  return uploadFile(buffer, filename, folder, contentType);
}

// ─── Get Signed URL (upload) ──────────────────────
export async function getPresignedUploadUrl(
  filename: string,
  folder: string = 'uploads',
  contentType: string = 'application/octet-stream',
  expiresIn: number = 3600,
): Promise<{ key: string; uploadUrl: string }> {
  const key = generateKey(folder, filename);

  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn },
  );

  return { key, uploadUrl };
}

// ─── Get Signed URL (download) ────────────────────
export async function getPresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600,
): Promise<string> {
  return getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }),
    { expiresIn },
  );
}

// ─── Delete ────────────────────────────────────────
export async function deleteFile(key: string): Promise<void> {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }),
  );
}

// ─── List files in folder ─────────────────────────
export async function listFiles(
  folder: string,
  maxResults: number = 100,
): Promise<{ key: string; size: number; lastModified: Date }[]> {
  const response = await s3.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: folder,
      MaxKeys: maxResults,
    }),
  );

  return (response.Contents ?? []).map((obj) => ({
    key: obj.Key!,
    size: obj.Size ?? 0,
    lastModified: obj.LastModified ?? new Date(),
  }));
}

// ─── Upload helpers for specific types ─────────────
export async function uploadQuestionImage(
  file: Buffer,
  filename: string,
  questionId: string,
): Promise<{ key: string; url: string }> {
  return uploadFile(file, filename, `questions/${questionId}/images`);
}

export async function uploadSyllabus(
  file: Buffer,
  filename: string,
  subjectId: string,
): Promise<{ key: string; url: string }> {
  return uploadFile(file, filename, `syllabi/${subjectId}`, 'application/pdf');
}

export async function uploadInstitutionLogo(
  file: Buffer,
  filename: string,
  institutionId: string,
): Promise<{ key: string; url: string }> {
  return uploadFile(file, filename, `institutions/${institutionId}/logo`);
}

export async function uploadGeneratedPdf(
  pdf: Buffer,
  paperId: string,
): Promise<{ key: string; url: string }> {
  return uploadFile(pdf, `${paperId}.pdf`, 'generated-papers', 'application/pdf');
}
