"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  BookOpen,
  Settings,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Save,
  Wand2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DIFFICULTY_COLORS, QUESTION_TYPE_LABELS } from "@/lib/utils";

const steps = [
  { id: 1, title: "Select Subject", icon: BookOpen },
  { id: 2, title: "Configure", icon: Settings },
  { id: 3, title: "Generate", icon: Sparkles },
  { id: 4, title: "Review & Save", icon: CheckCircle2 },
];

const sampleTopics = [
  { id: "t1", name: "Arrays and Linked Lists", weightage: 20 },
  { id: "t2", name: "Stacks and Queues", weightage: 15 },
  { id: "t3", name: "Trees and Graphs", weightage: 25 },
  { id: "t4", name: "Sorting and Searching", weightage: 20 },
  { id: "t5", name: "Hashing", weightage: 20 },
];

const bloomLevels = ["REMEMBER", "UNDERSTAND", "APPLY", "ANALYZE", "EVALUATE", "CREATE"];
const questionTypes = ["MCQ", "SHORT", "LONG", "FILL", "TRUE_FALSE"];

export default function AIGeneratePage() {
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["MCQ", "SHORT"]);
  const [selectedBlooms, setSelectedBlooms] = useState<string[]>(["REMEMBER", "UNDERSTAND", "APPLY"]);
  const [difficulty, setDifficulty] = useState("MIXED");
  const [count, setCount] = useState(10);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleBloom = (level: string) => {
    setSelectedBlooms((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setStep(4);
    }, 3000);
  };

  const progress = (step / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-primary-500 flex items-center justify-center shadow-glow">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-heading">AI Question Generator</h1>
        </div>
        <p className="text-muted-foreground">
          Generate high-quality questions powered by GPT-4o
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                step >= s.id
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <s.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{s.title}</span>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            )}
          </div>
        ))}
      </div>

      <Progress value={progress} className="h-1" />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Select Subject & Topics */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Select Subject & Topics</CardTitle>
                <CardDescription>
                  Choose which topics to generate questions for
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select defaultValue="ds">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ds">CS301 — Data Structures</SelectItem>
                      <SelectItem value="dbms">CS401 — Database Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Topics (select one or more)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sampleTopics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => toggleTopic(topic.id)}
                        className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                          selectedTopics.includes(topic.id)
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500/20"
                            : "hover:border-muted-foreground/30"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-medium">{topic.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Weightage: {topic.weightage}%
                          </p>
                        </div>
                        {selectedTopics.includes(topic.id) && (
                          <CheckCircle2 className="h-5 w-5 text-primary-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Configure */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Configure Generation</CardTitle>
                <CardDescription>
                  Set question types, difficulty, and Bloom&apos;s levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Types */}
                <div className="space-y-2">
                  <Label>Question Types</Label>
                  <div className="flex flex-wrap gap-2">
                    {questionTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
                          selectedTypes.includes(type)
                            ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                            : "hover:bg-muted"
                        }`}
                      >
                        {QUESTION_TYPE_LABELS[type as keyof typeof QUESTION_TYPE_LABELS]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label>Difficulty Distribution</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MIXED">Mixed (40% Easy, 40% Medium, 20% Hard)</SelectItem>
                      <SelectItem value="EASY">Easy Only</SelectItem>
                      <SelectItem value="MEDIUM">Medium Only</SelectItem>
                      <SelectItem value="HARD">Hard Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bloom's Taxonomy */}
                <div className="space-y-2">
                  <Label>Bloom&apos;s Taxonomy Levels</Label>
                  <div className="flex flex-wrap gap-2">
                    {bloomLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => toggleBloom(level)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                          selectedBlooms.includes(level)
                            ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                            : "hover:bg-muted"
                        }`}
                      >
                        {level.charAt(0) + level.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Number of Questions</Label>
                    <Input
                      type="number"
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                      min={1}
                      max={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="kn">Kannada</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Generating */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-primary-500 flex items-center justify-center shadow-glow mb-6"
                >
                  <Brain className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold font-heading mb-2">
                  AI is generating questions...
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Analyzing topics, applying Bloom&apos;s Taxonomy, and crafting {count} unique questions
                </p>
                <div className="mt-8 w-full max-w-sm">
                  <Progress value={generating ? 65 : 100} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {generating ? "Processing with GPT-4o..." : "Complete!"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary-600" />
                      Generated Questions
                    </CardTitle>
                    <CardDescription>
                      Review and edit before saving to your question bank
                    </CardDescription>
                  </div>
                  <Badge variant="success" className="gap-1">
                    <Zap className="h-3 w-3" />
                    10 questions generated
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Sample generated questions */}
                {[
                  { text: "What is the time complexity of Merge Sort?", type: "MCQ", difficulty: "EASY", marks: 1 },
                  { text: "Explain the concept of AVL tree rotations.", type: "SHORT", difficulty: "MEDIUM", marks: 5 },
                  { text: "Implement Dijkstra's algorithm using a priority queue.", type: "LONG", difficulty: "HARD", marks: 10 },
                ].map((q, i) => (
                  <div key={i} className="rounded-xl border p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">{q.text}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className={DIFFICULTY_COLORS[q.difficulty as keyof typeof DIFFICULTY_COLORS]}>
                            {q.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            {QUESTION_TYPE_LABELS[q.type as keyof typeof QUESTION_TYPE_LABELS]}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{q.marks} marks</span>
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                            <Brain className="mr-1 h-3 w-3" />
                            AI
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-xs text-muted-foreground">
                    <Zap className="inline h-3 w-3 mr-1" />
                    ~1,250 tokens used · $0.006 estimated cost
                  </div>
                  <Button variant="gradient">
                    <Save className="mr-2 h-4 w-4" />
                    Save All to Question Bank
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={step === 1}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {step < 3 && (
          <Button
            variant="gradient"
            onClick={() => {
              if (step === 2) {
                setStep(3);
                handleGenerate();
              } else {
                setStep((s) => Math.min(4, s + 1));
              }
            }}
            disabled={step === 1 && selectedTopics.length === 0}
          >
            {step === 2 ? (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Questions
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
