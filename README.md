<div align="center">

# 📝 Question Paper Generator

### AI-powered exam paper creation platform — from legacy PHP to modern SaaS

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?logo=openai&logoColor=white)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![Tests](https://img.shields.io/badge/Tests-149%20passing-22c55e?logo=vitest&logoColor=white)](#-running-tests)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<br/>

**[Quick Start](#-quick-start) · [Demo Credentials](#-demo-credentials) · [API Reference](#-api-reference) · [Architecture](#-architecture)**

</div>

---

## 📖 About

The **Question Paper Generator** automates the creation of professional, syllabus-aligned exam papers. This repository showcases **two complete implementations** demonstrating the full evolution of the project — from a functional PHP prototype to a production-ready AI SaaS platform.

This repository contains **two complete implementations** that demonstrate the evolution of the project:

| | Version | Stack | Location |
|--|---------|-------|----------|
| 🔴 | **v1 — Legacy** | PHP · MySQL · FPDF · Bootstrap | [`/qpg-php`](./qpg-php) |
| 🟢 | **v2 — Modern SaaS** | Next.js 14 · TypeScript · Prisma · OpenAI GPT-4o | [`/qpg-next`](./qpg-next) |

---

## 📋 Table of Contents

- [Features](#-features)
- [v1 — Legacy PHP](#v1--legacy-php-implementation)
- [v2 — QPG Next (SaaS)](#v2--qpg-next-modern-saas)
  - [Tech Stack](#-tech-stack)
  - [Project Structure](#-project-structure)
  - [Quick Start](#-quick-start)
  - [Demo Credentials](#-demo-credentials)
  - [Environment Variables](#-environment-variables)
  - [Database Setup](#-database-setup)
  - [Running Tests](#-running-tests)
  - [API Reference](#-api-reference)
- [Architecture](#-architecture)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## ✨ Features

### v2 — QPG Next (AI SaaS)

| Feature | Description |
|---------|-------------|
| 🤖 **AI Question Generation** | Generate MCQ, Short, Long, Fill-in-the-blank, and True/False questions from any syllabus topic using GPT-4o |
| 🧠 **Bloom's Taxonomy Mapping** | Every question tagged across 6 cognitive levels — Remember, Understand, Apply, Analyse, Evaluate, Create |
| 📄 **Smart Paper Builder** | Drag-and-drop sections with auto-balancing for difficulty distribution and total marks |
| 🎨 **PDF Export** | Three professional templates — University Classic, Modern Clean, Board Style |
| ✅ **Review & Approval Workflow** | Submit papers for review; HODs/reviewers can comment, approve, or request changes |
| 🔐 **Role-Based Access Control** | Six roles: Super Admin · Institution Admin · HOD · Teacher · Reviewer · Student |
| 📊 **Rich Analytics** | Question usage heatmaps, Bloom's distribution charts, AI generation cost tracking |
| 🏢 **Multi-Tenant Architecture** | Each institution has fully isolated data with configurable usage limits |
| 🔑 **OAuth + Credentials Auth** | Sign in with Google, GitHub, or email/password via NextAuth.js v5 |
| 🌙 **Dark / Light Theme** | Full dark mode support across all pages |
| 🐳 **Docker Ready** | One-command local stack with PostgreSQL, Redis, and Meilisearch |
| 🧪 **Fully Tested** | 149 unit & integration tests + Playwright e2e suite |

---

## v1 — Legacy PHP Implementation

The original PHP implementation demonstrating core question-bank management and PDF paper generation. Built with PHP 7.4+, MySQL, FPDF, and Bootstrap 5.

### How to Run

**Requirements:** PHP 7.4+, MySQL 5.7+, Apache or Nginx (e.g., XAMPP / WAMP)

```bash
# 1. Create a MySQL database
mysql -u root -p -e "CREATE DATABASE qb;"

# 2. Update credentials
#    Edit qpg-php/connection.php → set $server, $username, $password

# 3. Serve the folder via Apache/Nginx
#    Point document root to: qpg-php/
#    Then visit: http://localhost/login.php
```

### Key Files

| File | Purpose |
|------|---------|
| `index.php` | Main entry point — question bank display |
| `login.php` | User authentication (bcrypt + prepared statements) |
| `register.php` | User registration |
| `add.php` | Add questions to the bank |
| `retrieve.php` / `retrieve3.php` / `retrieve4.php` | Question retrieval and module filtering |
| `format.php` / `fdemo.php` | PDF generation via FPDF |
| `connection.php` | Database connection config |
| `database.php` | Database utility functions |

### Sample PDFs

The `qpg-php/` folder includes real generated papers — `CIE 01.pdf`, `iat1.pdf` — demonstrating the PDF output format.

---

## v2 — QPG Next (Modern SaaS)

A production-ready multi-tenant SaaS platform. Located in [`/qpg-next`](./qpg-next).

### 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5 |
| **Database** | SQLite (dev) · PostgreSQL (prod) via Prisma ORM |
| **Auth** | NextAuth.js v5 — JWT · Google · GitHub · Credentials |
| **AI** | OpenAI GPT-4o |
| **Styling** | Tailwind CSS · shadcn/ui |
| **Animations** | Framer Motion |
| **State** | Zustand |
| **Data Fetching** | TanStack Query v5 |
| **PDF Generation** | Puppeteer (production) |
| **Email** | Resend |
| **Search** | Meilisearch |
| **Queue** | BullMQ + Redis |
| **File Storage** | AWS S3 / Cloudflare R2 |
| **Charts** | Recharts |
| **Testing** | Vitest · Testing Library · Playwright |
| **Deployment** | Docker · docker-compose |

### 📁 Project Structure

```
qpg-next/
├── prisma/
│   ├── schema.prisma          # 14 models — User, Institution, Question, Paper...
│   ├── seed.ts                # Demo data seeder (3 users + subjects + questions)
│   └── add-demo-user.ts       # Upsert demo user utility
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth routes + user registration
│   │   │   ├── questions/     # CRUD — list, create, update, delete
│   │   │   ├── papers/        # CRUD + PDF generation trigger
│   │   │   └── ai/            # GPT-4o question generation endpoint
│   │   ├── dashboard/
│   │   │   ├── page.tsx       # Overview — stats cards + recent activity
│   │   │   ├── questions/     # Question bank browser with filters
│   │   │   ├── papers/        # Papers list · builder · preview
│   │   │   ├── generate/      # AI generation wizard (4-step)
│   │   │   ├── subjects/      # Subject & topic management
│   │   │   ├── analytics/     # Bloom's charts, usage heatmaps, AI costs
│   │   │   ├── team/          # Team management & role assignments
│   │   │   ├── settings/      # Profile, institution, appearance settings
│   │   │   └── admin/         # Super-admin panel
│   │   └── docs/api/          # Interactive API documentation page
│   ├── components/
│   │   ├── ui/                # Full shadcn/ui component library (15 components)
│   │   ├── layout/            # Collapsible sidebar + responsive header
│   │   └── providers/         # Auth, TanStack Query, and Theme providers
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config — providers, callbacks, RBAC
│   │   ├── prisma.ts          # Prisma singleton client
│   │   ├── validations.ts     # Zod schemas for all API inputs
│   │   ├── permissions.ts     # RBAC permission matrix (6 roles × actions)
│   │   ├── utils.ts           # Shared helpers and constants
│   │   ├── store.ts           # Zustand — paper builder + notification stores
│   │   ├── pdf-templates.ts   # HTML → PDF templates (3 styles)
│   │   ├── email.ts           # Transactional email templates (Resend)
│   │   ├── search.ts          # Meilisearch full-text indexing
│   │   ├── queue.ts           # BullMQ job definitions
│   │   └── s3.ts              # S3/R2 pre-signed upload utilities
│   ├── middleware.ts           # Route protection — redirects unauthenticated users
│   └── __tests__/             # 13 test suites · 149 tests
│       ├── api/               # Route handler tests
│       ├── components/        # UI component tests
│       ├── lib/               # Unit tests for all lib modules
│       └── middleware.test.ts
├── e2e/                       # Playwright end-to-end tests
├── docker-compose.yml         # Local stack — PostgreSQL, Redis, Meilisearch
├── Dockerfile                 # Production multi-stage build
└── next.config.js             # Next.js configuration
```

---

### 🚀 Quick Start

#### Option A — SQLite (No Docker, fastest)

```bash
# Clone and navigate
git clone https://github.com/Yashas14/Question_Paper_Generator.git
cd Question_Paper_Generator/qpg-next

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Minimum required: set NEXTAUTH_SECRET to any random string

# Set up database
npm run db:push      # Creates dev.db with all tables
npm run db:seed      # Seeds demo institution, users, and questions

# Start dev server
npm run dev
```

Open **http://localhost:3000**

#### Option B — Full Stack with Docker

```bash
cd qpg-next
cp .env.example .env          # Configure for Docker (see .env.example)
docker-compose up -d          # Starts PostgreSQL, Redis, Meilisearch
npm install
npm run db:migrate            # Run Prisma migrations
npm run db:seed               # Seed demo data
npm run dev
```

---

### 🔑 Demo Credentials

After running `npm run db:seed`, log in at **http://localhost:3000/login** with:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Institution Admin** | `admin@demo.edu` | `admin123` | Full access — manage users, settings, all papers |
| **Teacher** | `teacher@demo.edu` | `teacher123` | Create/edit questions & papers, run AI generation |
| **Demo User** | `demo@gmail.com` | `demo@123` | Same as Teacher — quick demo access |

> **Note:** Google and GitHub OAuth require client credentials in `.env`. Credentials login works out-of-the-box with just the SQLite setup.

---

### ⚙️ Environment Variables

| Variable | Required | Description |
|----------|:--------:|-------------|
| `DATABASE_URL` | ✅ | `file:./dev.db` for SQLite · PostgreSQL URL for prod |
| `NEXTAUTH_URL` | ✅ | App base URL — `http://localhost:3000` |
| `NEXTAUTH_SECRET` | ✅ | Random string — generate: `openssl rand -base64 32` |
| `OPENAI_API_KEY` | AI features | GPT-4o API key from platform.openai.com |
| `OPENAI_MODEL` | No | Model name (default: `gpt-4o`) |
| `GOOGLE_CLIENT_ID` / `SECRET` | Google OAuth | Google Cloud Console credentials |
| `GITHUB_CLIENT_ID` / `SECRET` | GitHub OAuth | GitHub OAuth App credentials |
| `REDIS_URL` | Queues | Redis connection (default: `redis://localhost:6379`) |
| `RESEND_API_KEY` | Emails | Resend API key |
| `AWS_ACCESS_KEY_ID` / `SECRET` | File uploads | AWS S3 or Cloudflare R2 credentials |
| `AWS_S3_BUCKET` | File uploads | Bucket name |
| `MEILISEARCH_HOST` / `API_KEY` | Full-text search | Meilisearch server URL + master key |

### 🗄️ Database Setup

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

**Key models:** `User` · `Institution` · `Department` · `Subject` · `Topic` · `Question` · `QuestionPaper` · `PaperSection` · `PaperQuestion` · `AIGenerationLog` · `AnalyticsEvent` · `Notification` · `ApiKey`

### 🧪 Running Tests

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

**Test Coverage — 13 suites · 149 tests · all passing ✅**

| Suite | File | Tests |
|-------|------|------:|
| Utility functions | `utils.test.ts` + `utils-extended.test.ts` | 28 |
| Validation schemas | `validations.test.ts` + `validations-extended.test.ts` | 30 |
| Permission system | `permissions.test.ts` + `permissions-extended.test.ts` | 24 |
| Zustand store | `store.test.ts` | 14 |
| API — Questions | `api/questions.test.ts` | 12 |
| API — Papers | `api/papers.test.ts` | 10 |
| API — Register | `api/register.test.ts` | 10 |
| Middleware | `middleware.test.ts` | 11 |
| UI components | `button.test.tsx` + `input.test.tsx` | 10 |

### 📡 API Reference

Interactive docs available at **http://localhost:3000/docs/api** when running.

#### Quick Reference

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user + institution |
| `GET` | `/api/questions` | ✅ | List questions — paginated, filterable |
| `POST` | `/api/questions` | ✅ | Create a question |
| `GET` | `/api/questions/[id]` | ✅ | Get a single question |
| `PUT` | `/api/questions/[id]` | ✅ | Update a question |
| `DELETE` | `/api/questions/[id]` | ✅ | Delete a question |
| `GET` | `/api/papers` | ✅ | List papers (role-filtered) |
| `POST` | `/api/papers` | ✅ | Create a paper |
| `POST` | `/api/papers/[id]/generate-pdf` | ✅ | Trigger PDF generation |
| `POST` | `/api/ai/generate-questions` | ✅ | AI-generate questions via GPT-4o |

**Auth:** All `✅` routes require a valid NextAuth session cookie.

**Query params for `GET /api/questions`:**
```
page, limit, search, subjectId, topicId, type, difficulty, bloomLevel, isAIGenerated
```

---

## 🏛 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Browser / Client                       │
│         Next.js App Router + TanStack Query              │
│         Zustand (paper builder) + Framer Motion          │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTPS
┌────────────────────────▼─────────────────────────────────┐
│                  Next.js Server (Node)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │  App Router  │  │  API Routes  │  │   Middleware   │ │
│  │  (RSC + SSR) │  │  (REST)      │  │  (Auth guard)  │ │
│  └──────────────┘  └──────┬───────┘  └────────────────┘ │
└─────────────────────────── │ ────────────────────────────┘
              ┌──────────────┼───────────────┐
              │              │               │
   ┌──────────▼──┐  ┌────────▼──────┐  ┌────▼──────────┐
   │  Prisma ORM │  │  NextAuth.js  │  │  OpenAI API   │
   │  SQLite/PG  │  │  JWT Sessions │  │  GPT-4o       │
   └─────────────┘  └───────────────┘  └───────────────┘
              │
   ┌──────────┴──────────────────────────┐
   │  Supporting Services (optional)     │
   │  Redis · BullMQ · Meilisearch · S3  │
   └─────────────────────────────────────┘
```

**AI Question Generation Flow:**
```
User selects topic + types + Bloom's levels
        ↓
POST /api/ai/generate-questions
        ↓
Check institution.maxAIGenerations limit
        ↓
Build structured prompt → GPT-4o (JSON mode)
        ↓
Parse + validate response → save to Question table
        ↓
Log in AIGenerationLog (cost tracking)
        ↓
Return questions to client
```

---

## 🔒 Security

Both implementations address **OWASP Top 10** concerns:

**PHP v1:**
- ✅ SQL injection prevented via `mysqli_real_escape_string()` + prepared statements
- ✅ Subject inputs validated against an explicit allowlist
- ✅ Passwords hashed with `password_hash()` (bcrypt) + `password_verify()`
- ✅ No raw user input in dynamic queries

**Next.js v2:**
- ✅ All API inputs validated with **Zod schemas** before touching the database
- ✅ **Prisma ORM** parameterized queries — no raw SQL with user input
- ✅ Passwords hashed with **bcrypt (12 rounds)** at registration
- ✅ **NextAuth.js JWT sessions** — no raw password in session tokens
- ✅ RBAC enforced at API route level — roles checked server-side
- ✅ All secrets in server-only environment variables — none in client bundles
- ✅ Database file (`dev.db`) excluded from version control via `.gitignore`

---

## 🔮 Roadmap

- [ ] Puppeteer-based server-side PDF rendering (stub in `generate-pdf` route)
- [ ] LaTeX / KaTeX support for mathematical equations
- [ ] Bulk import via CSV / Excel for question banks
- [ ] Mobile app via React Native
- [ ] Webhook integrations for LMS platforms (Moodle, Canvas)
- [ ] AI-powered question quality scoring

---

## 👤 Author

**Yashas D**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yashas%20D-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yashasd2004/)
[![GitHub](https://img.shields.io/badge/GitHub-Yashas14-181717?logo=github&logoColor=white)](https://github.com/Yashas14)

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

⭐ **If you found this useful, please star the repository!** ⭐

</div>

