'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen, Code, ChevronRight, Copy, Check, Search,
  ArrowLeft, Hash, Lock, Zap, Globe, Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const methodColors: Record<string, string> = {
  GET: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  POST: 'bg-blue-100 text-blue-700 border-blue-300',
  PUT: 'bg-amber-100 text-amber-700 border-amber-300',
  PATCH: 'bg-orange-100 text-orange-700 border-orange-300',
  DELETE: 'bg-red-100 text-red-700 border-red-300',
};

interface Endpoint {
  method: string;
  path: string;
  summary: string;
  description: string;
  auth: boolean;
  params?: { name: string; type: string; required: boolean; description: string }[];
  body?: { name: string; type: string; required: boolean; description: string }[];
  query?: { name: string; type: string; required: boolean; description: string }[];
  responseExample: string;
  requestExample?: string;
}

interface ApiSection {
  title: string;
  icon: React.ElementType;
  endpoints: Endpoint[];
}

const apiSections: ApiSection[] = [
  {
    title: 'Authentication',
    icon: Lock,
    endpoints: [
      {
        method: 'POST',
        path: '/api/auth/register',
        summary: 'Register a new user',
        description: 'Create a new user account with optional institution creation.',
        auth: false,
        body: [
          { name: 'name', type: 'string', required: true, description: 'Full name of the user' },
          { name: 'email', type: 'string', required: true, description: 'Email address' },
          { name: 'password', type: 'string', required: true, description: 'Password (min 6 chars)' },
          { name: 'institutionName', type: 'string', required: false, description: 'Name of institution to create' },
        ],
        requestExample: `{
  "name": "Dr. Sarah Smith",
  "email": "sarah@university.edu",
  "password": "SecurePass123",
  "institutionName": "Demo University"
}`,
        responseExample: `{
  "id": "clx1234567890",
  "name": "Dr. Sarah Smith",
  "email": "sarah@university.edu",
  "role": "INSTITUTION_ADMIN",
  "institutionId": "clx0987654321"
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/[...nextauth]',
        summary: 'Sign in',
        description: 'Authenticate using NextAuth.js. Supports credentials, Google, and GitHub providers.',
        auth: false,
        body: [
          { name: 'email', type: 'string', required: true, description: 'Email address' },
          { name: 'password', type: 'string', required: true, description: 'Password' },
        ],
        responseExample: `{
  "user": {
    "id": "clx1234567890",
    "name": "Dr. Sarah Smith",
    "email": "sarah@university.edu",
    "role": "INSTITUTION_ADMIN"
  },
  "expires": "2024-02-15T00:00:00.000Z"
}`,
      },
    ],
  },
  {
    title: 'Questions',
    icon: Hash,
    endpoints: [
      {
        method: 'GET',
        path: '/api/questions',
        summary: 'List questions',
        description: 'Retrieve a paginated list of questions with optional filters.',
        auth: true,
        query: [
          { name: 'page', type: 'number', required: false, description: 'Page number (default: 1)' },
          { name: 'limit', type: 'number', required: false, description: 'Items per page (default: 20, max: 100)' },
          { name: 'subjectId', type: 'string', required: false, description: 'Filter by subject' },
          { name: 'topicId', type: 'string', required: false, description: 'Filter by topic' },
          { name: 'type', type: 'QuestionType', required: false, description: 'MCQ | TRUE_FALSE | SHORT_ANSWER | LONG_ANSWER | FILL_BLANK | MATCH | NUMERICAL | DIAGRAM' },
          { name: 'difficulty', type: 'Difficulty', required: false, description: 'EASY | MEDIUM | HARD' },
          { name: 'bloomLevel', type: 'BloomLevel', required: false, description: 'REMEMBERING | UNDERSTANDING | APPLYING | ANALYZING | EVALUATING | CREATING' },
          { name: 'search', type: 'string', required: false, description: 'Search question text' },
          { name: 'isAIGenerated', type: 'boolean', required: false, description: 'Filter AI-generated questions' },
        ],
        responseExample: `{
  "questions": [
    {
      "id": "clx1234567890",
      "text": "What is a binary search tree?",
      "type": "SHORT_ANSWER",
      "difficulty": "MEDIUM",
      "bloomLevel": "UNDERSTANDING",
      "marks": 10,
      "tags": ["trees", "search"],
      "subject": { "name": "Data Structures" },
      "topic": { "name": "Trees" },
      "isAIGenerated": false,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 145,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}`,
      },
      {
        method: 'POST',
        path: '/api/questions',
        summary: 'Create a question',
        description: 'Create a new question in the question bank.',
        auth: true,
        body: [
          { name: 'text', type: 'string', required: true, description: 'Question text' },
          { name: 'type', type: 'QuestionType', required: true, description: 'Question type' },
          { name: 'difficulty', type: 'Difficulty', required: true, description: 'Difficulty level' },
          { name: 'marks', type: 'number', required: true, description: 'Marks (1-100)' },
          { name: 'bloomLevel', type: 'BloomLevel', required: true, description: "Bloom's level" },
          { name: 'subjectId', type: 'string', required: true, description: 'Subject ID' },
          { name: 'topicId', type: 'string', required: true, description: 'Topic ID' },
          { name: 'options', type: 'object', required: false, description: 'MCQ options (for MCQ type)' },
          { name: 'correctAnswer', type: 'string', required: false, description: 'Correct answer' },
          { name: 'explanation', type: 'string', required: false, description: 'Answer explanation' },
          { name: 'tags', type: 'string[]', required: false, description: 'Tags for categorization' },
        ],
        requestExample: `{
  "text": "Explain the difference between stack and queue.",
  "type": "SHORT_ANSWER",
  "difficulty": "EASY",
  "marks": 5,
  "bloomLevel": "UNDERSTANDING",
  "subjectId": "clx_subject_1",
  "topicId": "clx_topic_1",
  "tags": ["data-structures", "fundamentals"]
}`,
        responseExample: `{
  "id": "clx_new_question",
  "text": "Explain the difference between stack and queue.",
  "type": "SHORT_ANSWER",
  "difficulty": "EASY",
  "marks": 5,
  "createdAt": "2024-01-20T14:30:00Z"
}`,
      },
      {
        method: 'GET',
        path: '/api/questions/:id',
        summary: 'Get question details',
        description: 'Retrieve a single question by ID with all relations.',
        auth: true,
        params: [
          { name: 'id', type: 'string', required: true, description: 'Question ID' },
        ],
        responseExample: `{
  "id": "clx1234567890",
  "text": "What is a binary search tree?",
  "type": "SHORT_ANSWER",
  "difficulty": "MEDIUM",
  "marks": 10,
  "subject": { "id": "...", "name": "Data Structures" },
  "topic": { "id": "...", "name": "Trees" },
  "createdBy": { "name": "Dr. Smith" }
}`,
      },
      {
        method: 'PUT',
        path: '/api/questions/:id',
        summary: 'Update a question',
        description: 'Update an existing question. All fields are optional.',
        auth: true,
        params: [
          { name: 'id', type: 'string', required: true, description: 'Question ID' },
        ],
        responseExample: `{ "id": "clx1234567890", "text": "Updated question text", "updatedAt": "2024-01-20T15:00:00Z" }`,
      },
      {
        method: 'DELETE',
        path: '/api/questions/:id',
        summary: 'Delete a question',
        description: 'Permanently delete a question from the bank.',
        auth: true,
        params: [
          { name: 'id', type: 'string', required: true, description: 'Question ID' },
        ],
        responseExample: `{ "message": "Question deleted successfully" }`,
      },
    ],
  },
  {
    title: 'Papers',
    icon: BookOpen,
    endpoints: [
      {
        method: 'GET',
        path: '/api/papers',
        summary: 'List papers',
        description: 'Retrieve papers. HODs see all department papers, teachers see only their own.',
        auth: true,
        query: [
          { name: 'page', type: 'number', required: false, description: 'Page number' },
          { name: 'limit', type: 'number', required: false, description: 'Items per page' },
          { name: 'status', type: 'PaperStatus', required: false, description: 'Filter by status' },
        ],
        responseExample: `{
  "papers": [
    {
      "id": "clx_paper_1",
      "title": "Data Structures Mid-Term 2024",
      "status": "PUBLISHED",
      "totalMarks": 100,
      "duration": 180,
      "subject": { "name": "Data Structures" },
      "createdBy": { "name": "Dr. Smith" },
      "_count": { "sections": 3 }
    }
  ],
  "pagination": { "total": 12, "page": 1, "limit": 20, "totalPages": 1 }
}`,
      },
      {
        method: 'POST',
        path: '/api/papers',
        summary: 'Create a paper',
        description: 'Create a new question paper with default sections.',
        auth: true,
        body: [
          { name: 'title', type: 'string', required: true, description: 'Paper title' },
          { name: 'subjectId', type: 'string', required: true, description: 'Subject ID' },
          { name: 'totalMarks', type: 'number', required: false, description: 'Total marks' },
          { name: 'duration', type: 'number', required: false, description: 'Duration in minutes' },
          { name: 'examType', type: 'string', required: false, description: 'MID_TERM | END_TERM | UNIT_TEST | PRACTICE | ASSIGNMENT' },
        ],
        responseExample: `{
  "id": "clx_new_paper",
  "title": "OS Final Exam 2024",
  "status": "DRAFT",
  "totalMarks": 100,
  "sections": [
    { "title": "Section A", "order": 0 },
    { "title": "Section B", "order": 1 },
    { "title": "Section C", "order": 2 }
  ]
}`,
      },
      {
        method: 'POST',
        path: '/api/papers/:id/generate-pdf',
        summary: 'Generate PDF',
        description: 'Generate a PDF file for the question paper using a selected template.',
        auth: true,
        params: [
          { name: 'id', type: 'string', required: true, description: 'Paper ID' },
        ],
        body: [
          { name: 'template', type: 'string', required: false, description: 'university-classic | modern-clean | board-style' },
        ],
        responseExample: `{
  "url": "https://qpg-uploads.s3.amazonaws.com/generated-papers/clx_paper.pdf",
  "size": 245678,
  "template": "university-classic"
}`,
      },
    ],
  },
  {
    title: 'AI Generation',
    icon: Zap,
    endpoints: [
      {
        method: 'POST',
        path: '/api/ai/generate-questions',
        summary: 'Generate questions with AI',
        description: 'Use GPT-4o to generate questions based on subject, topics, and configuration. Rate limited to 50 generations per month on free plan.',
        auth: true,
        body: [
          { name: 'subjectId', type: 'string', required: true, description: 'Subject ID' },
          { name: 'topicIds', type: 'string[]', required: true, description: 'Array of topic IDs' },
          { name: 'count', type: 'number', required: true, description: 'Number of questions (1-20)' },
          { name: 'types', type: 'QuestionType[]', required: true, description: 'Question types to generate' },
          { name: 'difficulty', type: 'Difficulty', required: true, description: 'Difficulty level' },
          { name: 'bloomLevel', type: 'BloomLevel', required: true, description: "Bloom's taxonomy level" },
          { name: 'language', type: 'string', required: false, description: 'Language (default: English)' },
          { name: 'additionalInstructions', type: 'string', required: false, description: 'Custom instructions for AI' },
        ],
        requestExample: `{
  "subjectId": "clx_subject_1",
  "topicIds": ["clx_topic_1", "clx_topic_2"],
  "count": 5,
  "types": ["MCQ", "SHORT_ANSWER"],
  "difficulty": "MEDIUM",
  "bloomLevel": "ANALYZING",
  "language": "English"
}`,
        responseExample: `{
  "questions": [
    {
      "id": "clx_ai_q1",
      "text": "Compare and contrast the time complexities of insertion in an AVL tree versus a Red-Black tree.",
      "type": "SHORT_ANSWER",
      "difficulty": "MEDIUM",
      "bloomLevel": "ANALYZING",
      "marks": 10,
      "isAIGenerated": true,
      "explanation": "Both trees maintain balance..."
    }
  ],
  "usage": {
    "tokensUsed": 2450,
    "estimatedCost": 0.025,
    "remainingQuota": 45
  }
}`,
      },
    ],
  },
];

function CodeBlock({ code, language = 'json' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg bg-gray-950 text-gray-100 overflow-hidden text-xs">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <span className="text-gray-400 text-[10px] uppercase">{language}</span>
        <button
          onClick={copy}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ApiDocsPage() {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState(apiSections[0].title);
  const [activeEndpoint, setActiveEndpoint] = useState<string | null>(null);

  const filteredSections = apiSections.map(section => ({
    ...section,
    endpoints: section.endpoints.filter(ep =>
      ep.summary.toLowerCase().includes(search.toLowerCase()) ||
      ep.path.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.endpoints.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  API Reference
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  QPG REST API v1 Documentation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">v1.0</Badge>
              <Badge className="bg-emerald-100 text-emerald-700">Stable</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search endpoints..."
                className="pl-10 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <Card>
              <CardContent className="p-3">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                      Base URL
                    </p>
                    <code className="block px-2 py-1.5 rounded bg-muted text-xs font-mono">
                      https://your-domain.com
                    </code>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                      Authentication
                    </p>
                    <p className="text-xs text-muted-foreground px-2">
                      Bearer token via <code className="bg-muted px-1 rounded">Authorization</code> header or API key.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ScrollArea className="h-[calc(100vh-320px)]">
              <nav className="space-y-1">
                {filteredSections.map(section => (
                  <div key={section.title}>
                    <button
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === section.title
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                      onClick={() => setActiveSection(section.title)}
                    >
                      <section.icon className="h-4 w-4" />
                      {section.title}
                    </button>
                    {activeSection === section.title && (
                      <div className="ml-6 mt-1 space-y-0.5">
                        {section.endpoints.map(ep => (
                          <button
                            key={ep.path + ep.method}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            onClick={() => setActiveEndpoint(ep.path + ep.method)}
                          >
                            <Badge className={`${methodColors[ep.method]} text-[9px] px-1.5 py-0 border font-mono`}>
                              {ep.method}
                            </Badge>
                            <span className="truncate">{ep.summary}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Quick Start */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5" /> Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Authenticate with your API key and start making requests:
                </p>
                <CodeBlock
                  language="bash"
                  code={`curl -X GET https://your-domain.com/api/questions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                />
              </CardContent>
            </Card>

            {/* Endpoints */}
            {filteredSections.map(section => (
              <div key={section.title} id={section.title}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-primary" />
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.endpoints.map((ep, i) => (
                    <motion.div
                      key={ep.path + ep.method}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge className={`${methodColors[ep.method]} border font-mono text-xs`}>
                                {ep.method}
                              </Badge>
                              <code className="text-sm font-mono font-medium">{ep.path}</code>
                              {ep.auth && (
                                <Badge variant="outline" className="text-[10px] gap-1">
                                  <Lock className="h-2.5 w-2.5" /> Auth
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm font-medium mt-2">{ep.summary}</p>
                          <p className="text-xs text-muted-foreground">{ep.description}</p>
                        </CardHeader>
                        <CardContent>
                          <Tabs defaultValue="params" className="w-full">
                            <TabsList className="h-8">
                              {(ep.params || ep.query || ep.body) && (
                                <TabsTrigger value="params" className="text-xs h-7">Parameters</TabsTrigger>
                              )}
                              {ep.requestExample && (
                                <TabsTrigger value="request" className="text-xs h-7">Request</TabsTrigger>
                              )}
                              <TabsTrigger value="response" className="text-xs h-7">Response</TabsTrigger>
                            </TabsList>

                            <TabsContent value="params" className="mt-3">
                              <div className="space-y-4">
                                {ep.params && ep.params.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Path Parameters</p>
                                    <div className="space-y-2">
                                      {ep.params.map(p => (
                                        <div key={p.name} className="flex items-start gap-3 text-xs p-2 rounded bg-muted/50">
                                          <code className="font-mono font-medium text-primary min-w-[100px]">{p.name}</code>
                                          <Badge variant="outline" className="text-[10px]">{p.type}</Badge>
                                          {p.required && <Badge className="bg-red-100 text-red-700 text-[10px]">required</Badge>}
                                          <span className="text-muted-foreground">{p.description}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {ep.query && ep.query.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Query Parameters</p>
                                    <div className="space-y-2">
                                      {ep.query.map(q => (
                                        <div key={q.name} className="flex items-start gap-3 text-xs p-2 rounded bg-muted/50">
                                          <code className="font-mono font-medium text-primary min-w-[100px]">{q.name}</code>
                                          <Badge variant="outline" className="text-[10px]">{q.type}</Badge>
                                          {q.required && <Badge className="bg-red-100 text-red-700 text-[10px]">required</Badge>}
                                          <span className="text-muted-foreground">{q.description}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {ep.body && ep.body.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Body Parameters</p>
                                    <div className="space-y-2">
                                      {ep.body.map(b => (
                                        <div key={b.name} className="flex items-start gap-3 text-xs p-2 rounded bg-muted/50">
                                          <code className="font-mono font-medium text-primary min-w-[100px]">{b.name}</code>
                                          <Badge variant="outline" className="text-[10px]">{b.type}</Badge>
                                          {b.required && <Badge className="bg-red-100 text-red-700 text-[10px]">required</Badge>}
                                          <span className="text-muted-foreground">{b.description}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TabsContent>

                            {ep.requestExample && (
                              <TabsContent value="request" className="mt-3">
                                <CodeBlock code={ep.requestExample} />
                              </TabsContent>
                            )}

                            <TabsContent value="response" className="mt-3">
                              <CodeBlock code={ep.responseExample} />
                            </TabsContent>
                          </Tabs>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Rate Limits & Errors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rate Limits & Error Codes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Rate Limits</h4>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-muted text-center">
                      <p className="font-bold text-lg">100</p>
                      <p className="text-muted-foreground">requests/min (API)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted text-center">
                      <p className="font-bold text-lg">50</p>
                      <p className="text-muted-foreground">AI gen/month (Free)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted text-center">
                      <p className="font-bold text-lg">500</p>
                      <p className="text-muted-foreground">AI gen/month (Pro)</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold mb-2">Error Codes</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { code: 400, desc: 'Bad Request — Validation error or missing fields' },
                      { code: 401, desc: 'Unauthorized — Missing or invalid auth token' },
                      { code: 403, desc: 'Forbidden — Insufficient permissions' },
                      { code: 404, desc: 'Not Found — Resource does not exist' },
                      { code: 409, desc: 'Conflict — Resource already exists' },
                      { code: 429, desc: 'Too Many Requests — Rate limit exceeded' },
                      { code: 500, desc: 'Internal Server Error' },
                    ].map(err => (
                      <div key={err.code} className="flex items-center gap-3 p-2 rounded bg-muted/50">
                        <Badge variant="outline" className="font-mono">{err.code}</Badge>
                        <span className="text-muted-foreground">{err.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
