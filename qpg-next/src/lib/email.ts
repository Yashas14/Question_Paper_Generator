import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL ?? 'QPG <noreply@qpg.app>';
const APP_NAME = 'Question Paper Generator';
const APP_URL = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';

// ─── Base Template ─────────────────────────────────
function baseTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4f4f5; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .card { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          .logo { text-align: center; margin-bottom: 32px; }
          .logo h1 { font-size: 24px; color: #4F46E5; }
          .logo p { color: #71717A; font-size: 14px; }
          h2 { font-size: 20px; color: #18181B; margin-bottom: 16px; }
          p { color: #52525B; font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
          .btn { display: inline-block; background: #4F46E5; color: white !important; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
          .btn:hover { background: #4338CA; }
          .code { background: #F4F4F5; padding: 16px 24px; border-radius: 8px; text-align: center; font-size: 32px; letter-spacing: 8px; font-weight: 700; color: #4F46E5; margin: 24px 0; }
          .footer { text-align: center; padding: 24px; color: #A1A1AA; font-size: 12px; }
          .footer a { color: #71717A; }
          .meta { background: #F9FAFB; border-radius: 8px; padding: 16px; margin: 16px 0; }
          .meta-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; }
          .meta-label { color: #71717A; }
          .meta-value { color: #18181B; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="logo">
              <h1>📝 ${APP_NAME}</h1>
            </div>
            ${content}
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</p>
            <p><a href="${APP_URL}">Visit Website</a> · <a href="${APP_URL}/dashboard/settings">Manage Preferences</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// ─── Send OTP Email ────────────────────────────────
export async function sendOTP(email: string, otp: string, name: string): Promise<void> {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Your verification code: ${otp}`,
    html: baseTemplate(`
      <h2>Verify your email</h2>
      <p>Hi ${name},</p>
      <p>Use the following code to verify your email address:</p>
      <div class="code">${otp}</div>
      <p>This code expires in <strong>10 minutes</strong>. If you didn't request this, please ignore this email.</p>
    `),
  });
}

// ─── Team Invite Email ─────────────────────────────
export async function sendTeamInvite(
  email: string,
  inviterName: string,
  institutionName: string,
  role: string,
  inviteToken: string,
): Promise<void> {
  const inviteUrl = `${APP_URL}/invite/${inviteToken}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `${inviterName} invited you to ${institutionName}`,
    html: baseTemplate(`
      <h2>You're invited!</h2>
      <p><strong>${inviterName}</strong> has invited you to join <strong>${institutionName}</strong> on ${APP_NAME}.</p>
      <div class="meta">
        <div class="meta-row">
          <span class="meta-label">Institution</span>
          <span class="meta-value">${institutionName}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Role</span>
          <span class="meta-value">${role}</span>
        </div>
      </div>
      <p style="text-align: center; margin-top: 24px;">
        <a href="${inviteUrl}" class="btn">Accept Invitation</a>
      </p>
      <p style="margin-top: 24px; font-size: 12px; color: #A1A1AA;">
        This invitation expires in 7 days. If you didn't expect this, you can ignore this email.
      </p>
    `),
  });
}

// ─── Paper Shared Email ────────────────────────────
export async function sendPaperShared(
  email: string,
  sharerName: string,
  paperTitle: string,
  paperId: string,
  permission: string,
): Promise<void> {
  const paperUrl = `${APP_URL}/dashboard/papers/${paperId}/preview`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `${sharerName} shared a question paper with you`,
    html: baseTemplate(`
      <h2>Paper Shared With You</h2>
      <p><strong>${sharerName}</strong> has shared a question paper with you.</p>
      <div class="meta">
        <div class="meta-row">
          <span class="meta-label">Paper</span>
          <span class="meta-value">${paperTitle}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Permission</span>
          <span class="meta-value">${permission}</span>
        </div>
      </div>
      <p style="text-align: center; margin-top: 24px;">
        <a href="${paperUrl}" class="btn">View Paper</a>
      </p>
    `),
  });
}

// ─── Review Request Email ──────────────────────────
export async function sendReviewRequest(
  email: string,
  requesterName: string,
  paperTitle: string,
  paperId: string,
  deadline?: string,
): Promise<void> {
  const reviewUrl = `${APP_URL}/dashboard/papers/${paperId}/preview`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Review requested: ${paperTitle}`,
    html: baseTemplate(`
      <h2>Review Requested</h2>
      <p><strong>${requesterName}</strong> has requested your review on a question paper.</p>
      <div class="meta">
        <div class="meta-row">
          <span class="meta-label">Paper</span>
          <span class="meta-value">${paperTitle}</span>
        </div>
        ${deadline ? `
        <div class="meta-row">
          <span class="meta-label">Deadline</span>
          <span class="meta-value">${deadline}</span>
        </div>
        ` : ''}
      </div>
      <p style="text-align: center; margin-top: 24px;">
        <a href="${reviewUrl}" class="btn">Start Review</a>
      </p>
    `),
  });
}

// ─── Password Reset Email ──────────────────────────
export async function sendPasswordReset(
  email: string,
  name: string,
  resetToken: string,
): Promise<void> {
  const resetUrl = `${APP_URL}/reset-password/${resetToken}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Reset your password',
    html: baseTemplate(`
      <h2>Reset Your Password</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the button below to set a new one:</p>
      <p style="text-align: center; margin-top: 24px;">
        <a href="${resetUrl}" class="btn">Reset Password</a>
      </p>
      <p style="margin-top: 24px; font-size: 12px; color: #A1A1AA;">
        This link expires in 1 hour. If you didn't request this, your account is safe — no action needed.
      </p>
    `),
  });
}

// ─── Welcome Email ─────────────────────────────────
export async function sendWelcome(
  email: string,
  name: string,
): Promise<void> {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Welcome to ${APP_NAME}! 🎉`,
    html: baseTemplate(`
      <h2>Welcome aboard, ${name}! 🎉</h2>
      <p>We're excited to have you on ${APP_NAME}. Here's what you can do:</p>
      <ul style="color: #52525B; font-size: 14px; line-height: 2; padding-left: 20px;">
        <li>📚 Build a comprehensive question bank</li>
        <li>📝 Create professional question papers</li>
        <li>🤖 Generate questions using AI</li>
        <li>📊 Track analytics and coverage</li>
        <li>👥 Collaborate with your team</li>
      </ul>
      <p style="text-align: center; margin-top: 24px;">
        <a href="${APP_URL}/dashboard" class="btn">Go to Dashboard</a>
      </p>
    `),
  });
}

// ─── Weekly Digest Email ───────────────────────────
export async function sendWeeklyDigest(
  email: string,
  name: string,
  stats: {
    questionsCreated: number;
    papersCreated: number;
    aiGenerations: number;
    reviewsPending: number;
  },
): Promise<void> {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Your weekly summary — ${APP_NAME}`,
    html: baseTemplate(`
      <h2>Weekly Summary</h2>
      <p>Hi ${name}, here's your activity for the past week:</p>
      <div class="meta">
        <div class="meta-row">
          <span class="meta-label">Questions Created</span>
          <span class="meta-value">${stats.questionsCreated}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Papers Created</span>
          <span class="meta-value">${stats.papersCreated}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">AI Generations</span>
          <span class="meta-value">${stats.aiGenerations}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Reviews Pending</span>
          <span class="meta-value">${stats.reviewsPending}</span>
        </div>
      </div>
      <p style="text-align: center; margin-top: 24px;">
        <a href="${APP_URL}/dashboard" class="btn">View Dashboard</a>
      </p>
    `),
  });
}
