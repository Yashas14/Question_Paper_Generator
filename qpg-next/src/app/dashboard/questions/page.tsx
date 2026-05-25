"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Brain,
  Trash2,
  Edit,
  Eye,
  MoreHorizontal,
  Download,
  CheckCircle2,
  Tag,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DIFFICULTY_COLORS,
  QUESTION_TYPE_LABELS,
  BLOOM_LEVEL_COLORS,
} from "@/lib/utils";

// Sample data for UI demonstration
const sampleQuestions = [
  {
    id: "q1",
    text: "What is the time complexity of searching an element in a sorted array using binary search?",
    type: "MCQ" as const,
    difficulty: "EASY" as const,
    marks: 1,
    bloomLevel: "REMEMBER" as const,
    subject: { name: "Data Structures", code: "CS301" },
    topic: { name: "Arrays and Linked Lists" },
    tags: ["binary-search", "time-complexity"],
    isAIGenerated: false,
    isVerified: true,
    usageCount: 12,
    createdBy: { name: "Dr. Sarah Johnson" },
    createdAt: "2025-01-15",
  },
  {
    id: "q2",
    text: "Explain the difference between a stack and a queue. Provide real-world examples for each.",
    type: "SHORT" as const,
    difficulty: "MEDIUM" as const,
    marks: 5,
    bloomLevel: "UNDERSTAND" as const,
    subject: { name: "Data Structures", code: "CS301" },
    topic: { name: "Stacks and Queues" },
    tags: ["stack", "queue", "comparison"],
    isAIGenerated: false,
    isVerified: true,
    usageCount: 8,
    createdBy: { name: "Dr. Sarah Johnson" },
    createdAt: "2025-01-20",
  },
  {
    id: "q3",
    text: "Write an algorithm to perform an in-order traversal of a binary tree without using recursion.",
    type: "LONG" as const,
    difficulty: "HARD" as const,
    marks: 10,
    bloomLevel: "CREATE" as const,
    subject: { name: "Data Structures", code: "CS301" },
    topic: { name: "Trees and Graphs" },
    tags: ["binary-tree", "traversal"],
    isAIGenerated: true,
    isVerified: false,
    usageCount: 3,
    createdBy: { name: "AI Generated" },
    createdAt: "2025-02-10",
  },
  {
    id: "q4",
    text: "The worst-case time complexity of Quick Sort is O(n²).",
    type: "TRUE_FALSE" as const,
    difficulty: "EASY" as const,
    marks: 1,
    bloomLevel: "REMEMBER" as const,
    subject: { name: "Data Structures", code: "CS301" },
    topic: { name: "Sorting and Searching" },
    tags: ["quicksort", "time-complexity"],
    isAIGenerated: false,
    isVerified: true,
    usageCount: 15,
    createdBy: { name: "Dr. Sarah Johnson" },
    createdAt: "2025-01-10",
  },
  {
    id: "q5",
    text: "__________ is a technique used to resolve collisions in hash tables by finding the next available slot.",
    type: "FILL" as const,
    difficulty: "MEDIUM" as const,
    marks: 2,
    bloomLevel: "REMEMBER" as const,
    subject: { name: "Data Structures", code: "CS301" },
    topic: { name: "Hashing" },
    tags: ["hashing", "collision-resolution"],
    isAIGenerated: true,
    isVerified: true,
    usageCount: 6,
    createdBy: { name: "AI Generated" },
    createdAt: "2025-02-15",
  },
];

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export default function QuestionBankPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedBloom, setSelectedBloom] = useState<string>("all");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredQuestions = sampleQuestions.filter((q) => {
    if (search && !q.text.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedType !== "all" && q.type !== selectedType) return false;
    if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
    if (selectedBloom !== "all" && q.bloomLevel !== selectedBloom) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading sm:text-3xl">
            Question Bank
          </h1>
          <p className="text-muted-foreground mt-1">
            {sampleQuestions.length} questions across all subjects
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/generate">
              <Brain className="mr-2 h-4 w-4" />
              AI Generate
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link href="/dashboard/questions/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Link>
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search questions by text, tags, or answer..."
                icon={<Search className="h-4 w-4" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-muted/50 border-0"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t"
            >
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Question Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {Object.entries(QUESTION_TYPE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Difficulty
                </label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="EASY">Easy</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HARD">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Bloom&apos;s Level
                </label>
                <Select value={selectedBloom} onValueChange={setSelectedBloom}>
                  <SelectTrigger>
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {Object.keys(BLOOM_LEVEL_COLORS).map((level) => (
                      <SelectItem key={level} value={level}>
                        {level.charAt(0) + level.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Source
                </label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="ai">AI Generated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 px-4 py-3"
        >
          <span className="text-sm font-medium text-primary-700 dark:text-primary-400">
            {selectedQuestions.length} question{selectedQuestions.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="mr-1 h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" variant="destructive">
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Delete
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedQuestions([])}>
              Clear
            </Button>
          </div>
        </motion.div>
      )}

      {/* Question List */}
      <div className="space-y-3">
        {filteredQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-200 hover:border-primary-200 dark:hover:border-primary-800/30">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  {/* Checkbox */}
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(question.id)}
                      onChange={() => toggleSelect(question.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-relaxed line-clamp-2">
                          {stripHtml(question.text)}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Badge className={DIFFICULTY_COLORS[question.difficulty]}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            {QUESTION_TYPE_LABELS[question.type]}
                          </Badge>
                          {question.bloomLevel && (
                            <Badge className={BLOOM_LEVEL_COLORS[question.bloomLevel]}>
                              {question.bloomLevel}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {question.marks} marks
                          </span>
                          {question.isAIGenerated && (
                            <Badge variant="default" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                              <Brain className="mr-1 h-3 w-3" />
                              AI
                            </Badge>
                          )}
                          {question.isVerified && (
                            <CheckCircle2 className="h-4 w-4 text-secondary-500" />
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              <Tag className="mr-1 h-2.5 w-2.5" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Meta + Actions */}
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {question.subject.code} · {question.topic?.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Used {question.usageCount}x
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Question
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              Add to Paper
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Filter className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold">No questions found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters or add new questions.
            </p>
            <Button variant="gradient" className="mt-4" asChild>
              <Link href="/dashboard/questions/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
