"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  GripVertical,
  Plus,
  Trash2,
  Settings,
  Save,
  Eye,
  Download,
  FileText,
  ChevronRight,
  Brain,
  Sparkles,
  SendHorizonal,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DIFFICULTY_COLORS, QUESTION_TYPE_LABELS } from "@/lib/utils";

// Demo data
const questionBank = [
  { id: "q1", text: "What is the time complexity of binary search?", type: "MCQ" as const, difficulty: "EASY" as const, marks: 1, topic: "Arrays", bloom: "REMEMBER" },
  { id: "q2", text: "Explain the difference between stack and queue.", type: "SHORT" as const, difficulty: "MEDIUM" as const, marks: 5, topic: "Stacks & Queues", bloom: "UNDERSTAND" },
  { id: "q3", text: "Write iterative in-order traversal of a BST.", type: "LONG" as const, difficulty: "HARD" as const, marks: 10, topic: "Trees", bloom: "CREATE" },
  { id: "q4", text: "Quick Sort worst case is O(n²). True/False?", type: "TRUE_FALSE" as const, difficulty: "EASY" as const, marks: 1, topic: "Sorting", bloom: "REMEMBER" },
  { id: "q5", text: "__________ resolves hash collisions via open addressing.", type: "FILL" as const, difficulty: "MEDIUM" as const, marks: 2, topic: "Hashing", bloom: "REMEMBER" },
  { id: "q6", text: "Compare BFS and DFS. Give time complexity for each.", type: "SHORT" as const, difficulty: "MEDIUM" as const, marks: 5, topic: "Graphs", bloom: "ANALYZE" },
  { id: "q7", text: "Which data structure is used for LRU cache?", type: "MCQ" as const, difficulty: "MEDIUM" as const, marks: 1, topic: "Hashing", bloom: "APPLY" },
  { id: "q8", text: "Design a data structure for min-stack in O(1).", type: "LONG" as const, difficulty: "HARD" as const, marks: 10, topic: "Stacks & Queues", bloom: "CREATE" },
];

interface PaperSection {
  id: string;
  title: string;
  questions: typeof questionBank;
}

export default function PaperBuilderPage() {
  const [paperTitle, setPaperTitle] = useState("Data Structures — CIE 1");
  const [sections, setSections] = useState<PaperSection[]>([
    { id: "s1", title: "Part A — Multiple Choice", questions: [] },
    { id: "s2", title: "Part B — Short Answer", questions: [] },
    { id: "s3", title: "Part C — Long Answer", questions: [] },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("builder");

  const filteredBank = questionBank.filter(
    (q) => !sections.some((s) => s.questions.some((sq) => sq.id === q.id))
  ).filter(
    (q) => !searchQuery || q.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToSection = (question: typeof questionBank[0], sectionId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, questions: [...s.questions, question] }
          : s
      )
    );
  };

  const removeFromSection = (questionId: string, sectionId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, questions: s.questions.filter((q) => q.id !== questionId) }
          : s
      )
    );
  };

  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
  const totalMarks = sections.reduce(
    (sum, s) => sum + s.questions.reduce((qSum, q) => qSum + q.marks, 0),
    0
  );

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/papers" className="text-muted-foreground hover:text-foreground">
            Papers
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{paperTitle}</span>
          <Badge variant="outline">Draft</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="gradient" size="sm">
            <SendHorizonal className="mr-2 h-4 w-4" />
            Submit for Review
          </Button>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bank">Bank</TabsTrigger>
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Three-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100%-3.5rem)]">
        {/* LEFT: Question Bank Browser */}
        <div className={`lg:col-span-3 ${activeTab !== "bank" ? "hidden lg:block" : ""}`}>
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Question Bank
              </CardTitle>
              <Input
                placeholder="Search questions..."
                icon={<Search className="h-3.5 w-3.5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-2 h-8 text-xs"
              />
            </CardHeader>
            <ScrollArea className="flex-1 px-4 pb-4">
              <div className="space-y-2">
                {filteredBank.map((question) => (
                  <div
                    key={question.id}
                    className="group rounded-lg border p-3 hover:border-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all cursor-grab active:cursor-grabbing"
                  >
                    <p className="text-xs font-medium line-clamp-2 mb-2">
                      {question.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <Badge className={`text-[10px] px-1.5 py-0 ${DIFFICULTY_COLORS[question.difficulty]}`}>
                          {question.difficulty}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {question.marks}m
                        </span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {sections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => addToSection(question, section.id)}
                            className="h-5 w-5 rounded bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center hover:bg-primary-200 transition-colors"
                            title={`Add to ${section.title}`}
                          >
                            <Plus className="h-3 w-3 text-primary-700" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredBank.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-8">
                    All questions have been added to the paper.
                  </p>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* CENTER: Paper Canvas */}
        <div className={`lg:col-span-6 ${activeTab !== "builder" ? "hidden lg:block" : ""}`}>
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium">Paper Preview</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {totalQuestions} questions · {totalMarks} marks
                </p>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Sparkles className="mr-1 h-3 w-3" />
                Auto-Balance
              </Button>
            </CardHeader>
            <ScrollArea className="flex-1 px-4 pb-4">
              {/* Paper Header Preview */}
              <div className="rounded-lg border-2 border-dashed border-muted p-4 mb-4 text-center">
                <p className="font-bold text-sm">DEMO UNIVERSITY</p>
                <p className="text-xs text-muted-foreground">Department of Computer Science</p>
                <p className="text-xs font-medium mt-1">
                  Data Structures (CS301) — CIE 1
                </p>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Max Marks: {totalMarks}</span>
                  <span>Duration: 90 min</span>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-4">
                {sections.map((section) => (
                  <div key={section.id} className="rounded-lg border">
                    <div className="flex items-center justify-between bg-muted/50 px-4 py-2 rounded-t-lg">
                      <h3 className="text-sm font-semibold">{section.title}</h3>
                      <span className="text-xs text-muted-foreground">
                        {section.questions.length} Q · {section.questions.reduce((s, q) => s + q.marks, 0)} marks
                      </span>
                    </div>
                    <div className="p-3 space-y-2 min-h-[60px]">
                      {section.questions.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-4 border-2 border-dashed rounded-lg">
                          Drop questions here or click + from the bank
                        </p>
                      )}
                      <AnimatePresence>
                        {section.questions.map((question, qIndex) => (
                          <motion.div
                            key={question.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-start gap-2 rounded-lg border p-3 group hover:border-primary-200 dark:hover:border-primary-800/30 bg-background"
                          >
                            <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 cursor-grab shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs">
                                <span className="font-medium mr-1">
                                  {qIndex + 1}.
                                </span>
                                {question.text}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge className={`text-[10px] px-1 py-0 ${DIFFICULTY_COLORS[question.difficulty]}`}>
                                  {question.difficulty}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground">
                                  [{question.marks}m]
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromSection(question.id, section.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-3.5 w-3.5 text-red-500 hover:text-red-700" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* RIGHT: Paper Settings */}
        <div className={`lg:col-span-3 ${activeTab !== "settings" ? "hidden lg:block" : ""}`}>
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Paper Settings
              </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Paper Title</Label>
                  <Input
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Total Marks</Label>
                    <Input type="number" defaultValue={50} className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Duration (min)</Label>
                    <Input type="number" defaultValue={90} className="h-8 text-xs" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Exam Type</Label>
                  <Select defaultValue="CIE">
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CIE">CIE</SelectItem>
                      <SelectItem value="SEE">SEE</SelectItem>
                      <SelectItem value="QUIZ">Quiz</SelectItem>
                      <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                      <SelectItem value="MOCK">Mock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">PDF Template</Label>
                  <Select defaultValue="university-classic">
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="university-classic">University Classic</SelectItem>
                      <SelectItem value="modern-clean">Modern Clean</SelectItem>
                      <SelectItem value="board-style">Board Style</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <Label className="text-xs">Instructions</Label>
                  <Textarea
                    className="text-xs min-h-[60px]"
                    defaultValue="Answer all questions. Each question carries marks as indicated."
                  />
                </div>

                <Separator />

                {/* Header Config */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold">Header Configuration</Label>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Institution Name</Label>
                      <Input defaultValue="Demo University" className="h-7 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Department</Label>
                      <Input defaultValue="Computer Science" className="h-7 text-xs" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Course Code</Label>
                        <Input defaultValue="CS301" className="h-7 text-xs" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground">Semester</Label>
                        <Input type="number" defaultValue={3} className="h-7 text-xs" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Exam Date</Label>
                      <Input type="date" className="h-7 text-xs" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Options */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Options</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Shuffle questions</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Shuffle MCQ options</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Include answer key</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>

                <Separator />

                {/* Summary */}
                <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                  <p className="text-xs font-semibold">Paper Summary</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Questions:</span>
                      <span className="ml-1 font-medium">{totalQuestions}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Marks:</span>
                      <span className="ml-1 font-medium">{totalMarks}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sections:</span>
                      <span className="ml-1 font-medium">{sections.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span className="ml-1 font-medium">Draft</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
