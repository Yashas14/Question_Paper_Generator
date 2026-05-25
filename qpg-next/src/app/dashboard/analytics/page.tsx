"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Brain,
  FileText,
  HelpCircle,
  Zap,
  AlertTriangle,
  PieChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── CHART DATA ──────────────────────────────────────

const papersPerMonth = [
  { month: "Oct", papers: 3 },
  { month: "Nov", papers: 5 },
  { month: "Dec", papers: 2 },
  { month: "Jan", papers: 7 },
  { month: "Feb", papers: 4 },
  { month: "Mar", papers: 6 },
];

const questionsByType = [
  { name: "MCQ", value: 320, color: "#6366F1" },
  { name: "Short", value: 210, color: "#10B981" },
  { name: "Long", value: 120, color: "#F59E0B" },
  { name: "T/F", value: 95, color: "#EF4444" },
  { name: "Fill", value: 102, color: "#8B5CF6" },
];

const questionsByDifficulty = [
  { name: "Easy", value: 340, color: "#10B981" },
  { name: "Medium", value: 350, color: "#F59E0B" },
  { name: "Hard", value: 157, color: "#EF4444" },
];

const bloomsData = [
  { level: "Remember", count: 180, fullMark: 200 },
  { level: "Understand", count: 150, fullMark: 200 },
  { level: "Apply", count: 120, fullMark: 200 },
  { level: "Analyze", count: 90, fullMark: 200 },
  { level: "Evaluate", count: 60, fullMark: 200 },
  { level: "Create", count: 45, fullMark: 200 },
];

const aiUsageData = [
  { month: "Oct", generations: 20, cost: 0.12 },
  { month: "Nov", generations: 45, cost: 0.28 },
  { month: "Dec", generations: 30, cost: 0.18 },
  { month: "Jan", generations: 65, cost: 0.40 },
  { month: "Feb", generations: 40, cost: 0.24 },
  { month: "Mar", generations: 55, cost: 0.34 },
];

const topicCoverage = [
  { topic: "Arrays", easy: 25, medium: 20, hard: 10 },
  { topic: "Stacks", easy: 15, medium: 18, hard: 8 },
  { topic: "Trees", easy: 20, medium: 25, hard: 15 },
  { topic: "Sorting", easy: 18, medium: 22, hard: 12 },
  { topic: "Hashing", easy: 12, medium: 15, hard: 5 },
  { topic: "Graphs", easy: 10, medium: 20, hard: 18 },
];

const mostUsedQuestions = [
  { id: 1, text: "Time complexity of binary search?", usageCount: 15, topic: "Arrays", lastUsed: "2 weeks ago" },
  { id: 2, text: "Difference between stack and queue?", usageCount: 12, topic: "Stacks", lastUsed: "1 week ago" },
  { id: 3, text: "BFS vs DFS comparison", usageCount: 10, topic: "Graphs", lastUsed: "3 days ago" },
  { id: 4, text: "AVL tree rotation types", usageCount: 9, topic: "Trees", lastUsed: "1 month ago" },
  { id: 5, text: "Hash collision resolution methods", usageCount: 8, topic: "Hashing", lastUsed: "2 weeks ago" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading sm:text-3xl">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track question usage, paper metrics, and AI generation insights.
        </p>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.08 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { title: "Total Questions", value: "847", change: "+52 this month", icon: HelpCircle, color: "from-primary-500 to-primary-600" },
          { title: "Papers Created", value: "24", change: "+3 this month", icon: FileText, color: "from-secondary-500 to-secondary-600" },
          { title: "AI Generations", value: "255", change: "$1.56 total cost", icon: Brain, color: "from-purple-500 to-purple-600" },
          { title: "Avg Difficulty", value: "2.4/3", change: "Balanced distribution", icon: TrendingUp, color: "from-amber-500 to-amber-600" },
        ].map((stat) => (
          <motion.div key={stat.title} variants={fadeInUp} transition={{ duration: 0.4 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold font-heading mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="ai">AI Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Papers Per Month */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Papers Created per Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={papersPerMonth}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar dataKey="papers" fill="#6366F1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bloom's Coverage Radar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bloom&apos;s Taxonomy Coverage</CardTitle>
                <CardDescription>Distribution across cognitive levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={bloomsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="level" className="text-xs" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Questions"
                        dataKey="count"
                        stroke="#6366F1"
                        fill="#6366F1"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Topic Coverage Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Topic Coverage by Difficulty</CardTitle>
              <CardDescription>Questions per topic and difficulty level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topicCoverage} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="topic" type="category" width={80} className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="easy" fill="#10B981" stackId="a" name="Easy" />
                    <Bar dataKey="medium" fill="#F59E0B" stackId="a" name="Medium" />
                    <Bar dataKey="hard" fill="#EF4444" stackId="a" name="Hard" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Questions by Type */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Questions by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie
                        data={questionsByType}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {questionsByType.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Questions by Difficulty */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Difficulty Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questionsByDifficulty.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">{item.value} questions</span>
                      </div>
                      <Progress
                        value={(item.value / 847) * 100}
                        className="h-3"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Most Used Questions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Most Used Questions</CardTitle>
                  <CardDescription>Questions that appear most frequently in papers</CardDescription>
                </div>
                <Badge variant="warning" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  2 overused
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mostUsedQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                        {q.usageCount}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{q.text}</p>
                        <p className="text-xs text-muted-foreground">
                          {q.topic} · Last used {q.lastUsed}
                        </p>
                      </div>
                    </div>
                    {q.usageCount >= 10 && (
                      <Badge variant="warning" className="text-xs">
                        Consider retiring
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          {/* AI Generation Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI Generation Usage & Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aiUsageData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis yAxisId="left" className="text-xs" />
                    <YAxis yAxisId="right" orientation="right" className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="generations"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: "#8B5CF6" }}
                      name="Generations"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cost"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={{ fill: "#F59E0B" }}
                      name="Cost ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Usage Summary */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="bg-purple-50 dark:bg-purple-900/10 border-purple-200/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">This Month</span>
                </div>
                <p className="text-2xl font-bold">55 generations</p>
                <p className="text-xs text-muted-foreground mt-1">445 remaining</p>
                <Progress value={11} className="mt-3 h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Total Tokens Used</p>
                <p className="text-2xl font-bold mt-1">312,450</p>
                <p className="text-xs text-muted-foreground mt-1">Across 255 generations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold mt-1">$1.56</p>
                <p className="text-xs text-muted-foreground mt-1">Avg $0.006/generation</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
