# Question Paper Generator (QPG)

An end-to-end platform for creating professional exam question papers — from a legacy PHP system to a full-stack AI-powered SaaS application.

This repository contains **two complete implementations** that demonstrate the evolution of the project:

| Version | Stack | Location |
|---------|-------|----------|
| **v1 — Legacy** | PHP + MySQL + FPDF | `/qpg-php` |
| **v2 — Modern (QPG Next)** | Next.js 14 + AI + Prisma + PostgreSQL | `/qpg-next` |

---

## 📋 Table of Contents

- [Overview](#overview)
- [v1 — Legacy PHP Implementation](#v1--legacy-php-implementation)
- [v2 — QPG Next (Modern SaaS)](#v2--qpg-next-modern-saas)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running Tests](#running-tests)
  - [API Reference](#api-reference)
- [Architecture](#architecture)
- [Security](#security)

---

## Overview

The **Question Paper Generator** automates the creation of diverse, syllabus-aligned exam papers. It handles question bank management, AI-assisted question generation, Bloom's Taxonomy mapping, and professional PDF export.

---

## v1 — Legacy PHP Implementation

The original implementation built with PHP, MySQL, and Bootstrap. It demonstrates core question-paper generation logic and PDF export using the FPDF library.

### How to Run

**Requirements:** PHP 7.4+, MySQL 5.7+, Apache/Nginx

1. Import the database schema (create a `qb` MySQL database)
2. Update `qpg-php/connection.php` with your MySQL credentials
3. Serve the `qpg-php/` folder through Apache/Nginx (e.g., `http://localhost/qpg-php/`)
4. Visit `login.php` to log in

### Key Files

| File (in `qpg-php/`) | Purpose |
|------|---------|
| `index.php` | Main application entry point and question display |
| `login.php` | User authentication |
| `register.php` | User registration |
| `add.php` | Add questions to the question bank |
| `retrieve.php` | Question retrieval logic |
| `retrieve3.php` | Filter questions by module |
| `retrieve4.php` | Select questions for a paper |
| `format.php` / `fdemo.php` | PDF generation using FPDF |
| `connection.php` | Database connection |
| `database.php` | Database utility functions |
| `about.php` | About page |

### Sample Outputs

The `qpg-php/` directory includes sample generated PDFs (`CIE 01.pdf`, `iat1.pdf`, etc.) demonstrating the output format.

---

## v2 — QPG Next (Modern SaaS)

A production-ready SaaS platform built with Next.js 14, Prisma ORM, OpenAI GPT-4o, and a rich component library. Located in the `/qpg-next` directory.

### Features

- **AI Question Generation** — Generate MCQ, Short, Long, Fill-in-the-blank, True/False questions from any syllabus topic using GPT-4o
- **Bloom's Taxonomy Mapping** — Every question is tagged to a Bloom's level (Remember → Create)
- **Smart Paper Builder** — Drag-and-drop questions into sections with auto-balance for difficulty and marks
- **PDF Export** — Three professional templates: University Classic, Modern Clean, Board Style
- **Review & Approval Workflow** — Submit papers for review; HODs/reviewers can comment, approve, or request changes
- **Role-Based Access Control** — Six roles: Super Admin, Institution Admin, HOD, Teacher, Reviewer, Student
- **Rich Analytics** — Track question usage, topic coverage, difficulty distribution, and AI generation costs
- **Multi-Tenant Architecture** — Each institution has isolated data with configurable limits
- **OAuth Authentication** — Sign in with Google, GitHub, or email/password
- **Dark/Light Theme** — Full dark mode support

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| ORM | Prisma with SQLite (dev) / PostgreSQL (prod) |
| Auth | NextAuth.js v5 |
| AI | OpenAI GPT-4o |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| PDF Generation | Puppeteer (production) |
| Email | Resend |
| Search | Meilisearch |
| Queue | BullMQ + Redis |
| File Storage | AWS S3 / Cloudflare R2 |
| Charts | Recharts |
| Testing | Vitest + Testing Library + Playwright |
| Deployment | Docker |

### Project Structure

```
qpg-next/
├── prisma/
│   ├── schema.prisma          # Database schema (SQLite/PostgreSQL)
│   └── seed.ts                # Demo data seeder
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── not-found.tsx      # 404 page
│   │   ├── global-error.tsx   # Global error boundary
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth routes + registration
│   │   │   ├── questions/     # CRUD for questions + [id] route
│   │   │   ├── papers/        # CRUD for papers + PDF generation
│   │   │   └── ai/            # AI question generation endpoint
│   │   ├── dashboard/
│   │   │   ├── page.tsx       # Dashboard overview with stats
│   │   │   ├── layout.tsx     # Dashboard shell (sidebar + header)
│   │   │   ├── questions/     # Question bank browser
│   │   │   ├── papers/        # Papers list + builder + preview
│   │   │   ├── generate/      # AI generation wizard (4-step)
│   │   │   ├── subjects/      # Subject & topic management
│   │   │   ├── analytics/     # Charts: usage, Bloom's, AI costs
│   │   │   ├── team/          # Team management & invitations
│   │   │   ├── settings/      # Profile, institution, appearance
│   │   │   └── admin/         # Super-admin panel
│   │   └── docs/api/          # Interactive API documentation
│   ├── components/
│   │   ├── ui/                # shadcn/ui component library
│   │   ├── layout/            # Header and collapsible sidebar
│   │   └── providers/         # Auth, Query, Theme providers
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma singleton client
│   │   ├── validations.ts     # Zod schemas for all entities
│   │   ├── permissions.ts     # RBAC permission system
│   │   ├── utils.ts           # Shared utilities and constants
│   │   ├── store.ts           # Zustand stores (paper builder, notifications)
│   │   ├── pdf-templates.ts   # HTML templates for PDF generation
│   │   ├── email.ts           # Transactional email templates (Resend)
│   │   ├── search.ts          # Meilisearch integration
│   │   ├── queue.ts           # BullMQ job queues
│   │   └── s3.ts              # S3/R2 file upload utilities
│   ├── middleware.ts           # Route protection
│   └── __tests__/             # Unit and integration tests
├── e2e/                       # Playwright end-to-end tests
├── docker-compose.yml         # Local dev stack (DB, Redis, Meilisearch)
├── Dockerfile                 # Production container
└── next.config.js             # Next.js configuration
```

### Getting Started

#### Prerequisites

- Node.js 18+
- npm / pnpm
- (Optional for full features) Docker, Redis, PostgreSQL, Meilisearch

#### Quick Start (SQLite — no Docker needed)

```bash
# 1. Navigate to the Next.js app
cd qpg-next

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env
# Edit .env and set NEXTAUTH_SECRET and OPENAI_API_KEY at minimum

# 4. Push the database schema
npm run db:push

# 5. Seed demo data
npm run db:seed

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Demo credentials (after seeding):**
- Email: `demo@qpg.app`
- Password: `Demo@1234`

#### Full Stack with Docker

```bash
cd qpg-next
docker-compose up -d          # Start PostgreSQL, Redis, Meilisearch
cp .env.example .env          # Configure .env for Docker services
npm install
npm run db:migrate            # Run Prisma migrations
npm run db:seed               # Seed demo data
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | SQLite (`file:./dev.db`) or PostgreSQL connection string |
| `NEXTAUTH_URL` | ✅ | App base URL (e.g. `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | ✅ | Random secret — generate with `openssl rand -base64 32` |
| `OPENAI_API_KEY` | For AI features | GPT-4o API key |
| `OPENAI_MODEL` | No | Model name (default: `gpt-4o`) |
| `GOOGLE_CLIENT_ID` | For Google OAuth | Google OAuth app credentials |
| `GOOGLE_CLIENT_SECRET` | For Google OAuth | |
| `GITHUB_CLIENT_ID` | For GitHub OAuth | GitHub OAuth app credentials |
| `GITHUB_CLIENT_SECRET` | For GitHub OAuth | |
| `REDIS_URL` | For queues | Redis connection URL |
| `RESEND_API_KEY` | For emails | Resend API key |
| `AWS_ACCESS_KEY_ID` | For file uploads | AWS / Cloudflare R2 credentials |
| `AWS_SECRET_ACCESS_KEY` | For file uploads | |
| `AWS_S3_BUCKET` | For file uploads | S3 bucket name |
| `MEILISEARCH_HOST` | For full-text search | Meilisearch server URL |
| `MEILISEARCH_API_KEY` | For full-text search | Meilisearch master key |

### Database Setup

The schema uses **SQLite** by default for development and **PostgreSQL** for production.

```bash
# Apply schema to development SQLite database
npm run db:push

# Generate Prisma client after schema changes
npm run db:generate

# Create a new migration (PostgreSQL)
npm run db:migrate

# Deploy migrations in production
npm run db:migrate:deploy

# Open Prisma Studio (visual DB browser)
npm run db:studio
```

**Key models:** `User`, `Institution`, `Department`, `Subject`, `Topic`, `Question`, `QuestionPaper`, `PaperSection`, `PaperQuestion`, `AIGenerationLog`, `AnalyticsEvent`, `Notification`, `ApiKey`

### Running Tests

```bash
cd qpg-next

# Run all unit tests (Vitest)
npm test

# Run tests in watch mode
npm test -- --watch

# Run end-to-end tests (Playwright)
npm run test:e2e

# TypeScript type check
npm run typecheck

# Lint
npm run lint
```

**Test coverage:** 13 test suites, 149 tests across:
- Utility functions (`utils.ts`, `store.ts`)
- Validation schemas (`validations.ts`)
- Permission system (`permissions.ts`)
- API routes (`/api/questions`, `/api/papers`, `/api/auth/register`)
- Middleware (route protection)
- UI components (`Button`, `Input`)

### API Reference

A full interactive API reference is available at `/docs/api` when the app is running.

#### Quick Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user + institution |
| `GET` | `/api/questions` | ✅ | List questions (paginated, filterable) |
| `POST` | `/api/questions` | ✅ | Create a question |
| `GET` | `/api/questions/[id]` | ✅ | Get a single question |
| `PUT` | `/api/questions/[id]` | ✅ | Update a question |
| `DELETE` | `/api/questions/[id]` | ✅ | Delete a question |
| `GET` | `/api/papers` | ✅ | List papers (role-filtered) |
| `POST` | `/api/papers` | ✅ | Create a paper |
| `POST` | `/api/papers/[id]/generate-pdf` | ✅ | Generate PDF for a paper |
| `POST` | `/api/ai/generate-questions` | ✅ | AI-generate questions via GPT-4o |

**Authentication:** All protected endpoints require a valid session cookie (set via NextAuth).

Query parameters for `/api/questions`:

```
page, limit, search, subjectId, topicId, type, difficulty, bloomLevel, isAIGenerated
```

---

## Architecture

```
┌─────────────────────────────────────────┐
│             Next.js App (Edge/Node)      │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │  Pages  │  │API Routes│  │Middleware│ │
│  └─────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────┘
         │              │
    ┌────▼───┐     ┌────▼────────┐
    │Prisma  │     │ NextAuth.js │
    │  ORM   │     │  Sessions  │
    └────┬───┘     └────────────┘
         │
    ┌────▼──────┐    ┌──────────┐    ┌──────────┐
    │ SQLite/   │    │  OpenAI  │    │  Redis / │
    │PostgreSQL │    │  GPT-4o  │    │  BullMQ  │
    └───────────┘    └──────────┘    └──────────┘
```

**Data Flow for AI Generation:**
1. User selects subject, topics, question types, and Bloom's levels
2. POST to `/api/ai/generate-questions`
3. Usage limit checked against `Institution.maxAIGenerations`
4. Prompt built and sent to OpenAI GPT-4o with JSON response format
5. Questions parsed, saved to `Question` table, and returned to client
6. Generation logged in `AIGenerationLog` for cost tracking

---

## Security

Both implementations address OWASP Top 10 concerns:

**PHP (v1):**
- SQL injection mitigated via `mysqli_real_escape_string()` and table name whitelisting
- Passwords hashed with `password_hash()` (bcrypt) and verified with `password_verify()`

**Next.js (v2):**
- All inputs validated with Zod schemas before hitting the database
- Authentication via NextAuth.js JWT sessions (no raw password comparison in session)
- Passwords hashed with bcrypt (12 rounds) on registration
- Role-based access control enforced at API route level
- Prisma ORM prevents SQL injection via parameterized queries
- No secrets in client-side code; all API keys in server-only environment variables

---

## 🔮 Future Enhancements

- Puppeteer-based server-side PDF rendering (stub already in `generate-pdf` route)
- LaTeX/KaTeX support for mathematical equations
- Bulk CSV/Excel import for question bank
- Mobile app via React Native
- Webhook integrations for LMS platforms

---

👥 **Connect:**  
Yashas D on [LinkedIn](https://www.linkedin.com/in/yashasd2004/)

