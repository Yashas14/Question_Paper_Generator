"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  FileText,
  Sparkles,
  Shield,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Brain,
    title: "AI Question Generation",
    description:
      "Generate high-quality questions from syllabus using GPT-4o. Supports MCQ, short answer, long answer, and more.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: FileText,
    title: "Professional PDF Export",
    description:
      "Beautiful, print-ready papers with multiple templates — university classic, modern clean, and board style.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Sparkles,
    title: "Bloom's Taxonomy Mapping",
    description:
      "Automatically map questions to Bloom's levels. Ensure proper CO-PO attainment with visual analytics.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Review & Approval Workflow",
    description:
      "Submit papers for review. HODs and reviewers can comment, approve, or request changes — like a PR process.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Zap,
    title: "Smart Paper Builder",
    description:
      "Drag-and-drop questions into sections. Auto-balance difficulty, marks, and topic coverage with one click.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: BarChart3,
    title: "Rich Analytics",
    description:
      "Track question usage, topic coverage, difficulty distribution, and AI generation costs across your institution.",
    color: "from-teal-500 to-cyan-600",
  },
];

const stats = [
  { value: "50K+", label: "Questions Generated" },
  { value: "10K+", label: "Papers Created" },
  { value: "500+", label: "Institutions" },
  { value: "99.9%", label: "Uptime" },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individual teachers getting started",
    features: [
      "3 papers per month",
      "100 questions in bank",
      "1 PDF template",
      "Basic analytics",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For departments and serious educators",
    features: [
      "Unlimited papers",
      "5,000 questions in bank",
      "500 AI generations/month",
      "All 3 PDF templates",
      "Review workflow",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per institution",
    description: "For universities and large institutions",
    features: [
      "Everything in Pro",
      "Unlimited AI generations",
      "Custom branding",
      "API access",
      "SSO integration",
      "Dedicated support",
      "On-premise option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 shadow-glow">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold font-heading text-gradient">
              QPG
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button variant="gradient" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge variant="default" className="mb-6 px-4 py-1.5 text-sm">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Powered by GPT-4o
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-heading">
              Create Perfect{" "}
              <span className="text-gradient">Question Papers</span>{" "}
              in Minutes
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto md:text-xl">
              AI-powered question generation, Bloom&apos;s Taxonomy mapping,
              drag-and-drop paper builder, and stunning PDF exports — all in one platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" variant="gradient" asChild className="w-full sm:w-auto">
                <Link href="/register">
                  Start Creating Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="#features">See How It Works</Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero Image / Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 mx-auto max-w-5xl"
          >
            <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
              <div className="aspect-video bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/20 dark:to-secondary-950/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center shadow-glow-lg">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">
                    Interactive Demo Preview
                  </p>
                  <p className="text-sm text-muted-foreground/60">
                    Paper Builder with drag-and-drop, live preview, and AI suggestions
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gradient md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="info" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold font-heading md:text-4xl">
              Everything You Need to Create
              <br />
              <span className="text-gradient">World-Class Assessments</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              From AI-powered question generation to beautiful PDF exports, QPG provides
              the complete toolkit for modern educators.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-6">
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold font-heading mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="info" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold font-heading md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start free, upgrade when you need more power.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto"
          >
            {pricingPlans.map((plan) => (
              <motion.div key={plan.name} variants={fadeInUp}>
                <Card
                  className={`relative h-full flex flex-col ${
                    plan.popular
                      ? "border-primary-500 shadow-glow ring-1 ring-primary-500/20 scale-105"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary-600 to-primary-500 text-white border-0 px-4">
                        <Star className="mr-1 h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="flex flex-col flex-1 p-6 pt-8">
                    <h3 className="text-xl font-bold font-heading">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                    <ul className="mt-6 space-y-3 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-secondary-500 shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-8 w-full"
                      variant={plan.popular ? "gradient" : "outline"}
                      size="lg"
                      asChild
                    >
                      <Link href="/register">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold font-heading md:text-4xl">
              Ready to Transform Your{" "}
              <span className="text-gradient">Assessment Process?</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join 500+ institutions creating better papers with AI.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" variant="gradient" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary-600" />
              <span className="font-bold font-heading">QPG</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Question Paper Generator. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/docs/api" className="text-sm text-muted-foreground hover:text-foreground">
                API
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
