"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  HelpCircle,
  Brain,
  TrendingUp,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const statCards = [
  {
    title: "Papers Created",
    value: "24",
    change: "+3 this month",
    icon: FileText,
    color: "from-primary-500 to-primary-600",
    bgColor: "bg-primary-50 dark:bg-primary-900/20",
  },
  {
    title: "Questions in Bank",
    value: "847",
    change: "+52 this week",
    icon: HelpCircle,
    color: "from-secondary-500 to-secondary-600",
    bgColor: "bg-secondary-50 dark:bg-secondary-900/20",
  },
  {
    title: "AI Generations",
    value: "156",
    change: "344 remaining",
    icon: Brain,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Subjects",
    value: "8",
    change: "3 departments",
    icon: TrendingUp,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
  },
];

const recentPapers = [
  {
    id: "1",
    title: "Data Structures — CIE 1",
    subject: "CS301",
    status: "DRAFT" as const,
    marks: 50,
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "DBMS — SEE Final Exam",
    subject: "CS401",
    status: "IN_REVIEW" as const,
    marks: 100,
    updatedAt: "1 day ago",
  },
  {
    id: "3",
    title: "Operating Systems — Quiz 3",
    subject: "CS501",
    status: "APPROVED" as const,
    marks: 20,
    updatedAt: "3 days ago",
  },
  {
    id: "4",
    title: "Computer Networks — CIE 2",
    subject: "CS601",
    status: "PUBLISHED" as const,
    marks: 50,
    updatedAt: "1 week ago",
  },
];

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  IN_REVIEW: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  APPROVED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  PUBLISHED: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading sm:text-3xl">
            Welcome back, Dr. Sarah
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your question papers.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/questions/new">
              <HelpCircle className="mr-2 h-4 w-4" />
              Add Question
            </Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link href="/dashboard/papers/new">
              <Plus className="mr-2 h-4 w-4" />
              New Paper
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.08 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statCards.map((stat) => (
          <motion.div key={stat.title} variants={fadeInUp} transition={{ duration: 0.4 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold font-heading mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Papers */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Papers</CardTitle>
                <CardDescription>Your latest question papers</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/papers">
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPapers.map((paper) => (
                  <Link
                    key={paper.id}
                    href={`/dashboard/papers/${paper.id}`}
                    className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20">
                        <FileText className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary-600 transition-colors">
                          {paper.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {paper.subject} · {paper.marks} marks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={statusColors[paper.status]}>
                        {paper.status.replace("_", " ")}
                      </Badge>
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {paper.updatedAt}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions + AI Usage */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/papers/new">
                  <FileText className="mr-2 h-4 w-4 text-primary-600" />
                  Create New Paper
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/generate">
                  <Brain className="mr-2 h-4 w-4 text-purple-600" />
                  Generate with AI
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/questions">
                  <HelpCircle className="mr-2 h-4 w-4 text-secondary-600" />
                  Browse Question Bank
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/analytics">
                  <BarChart3 className="mr-2 h-4 w-4 text-amber-600" />
                  View Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* AI Usage */}
          <Card className="bg-gradient-to-br from-purple-50 to-primary-50 dark:from-purple-900/10 dark:to-primary-900/10 border-purple-200/50 dark:border-purple-800/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-base">AI Usage This Month</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Generations Used</span>
                  <span className="font-medium">156 / 500</span>
                </div>
                <Progress value={31.2} />
                <p className="text-xs text-muted-foreground">
                  344 AI generations remaining. Resets on April 1.
                </p>
                <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                  <Link href="/dashboard/generate">
                    <Brain className="mr-2 h-3.5 w-3.5" />
                    Generate Questions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
