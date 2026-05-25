"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  Brain,
  BarChart3,
  Settings,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  children?: { title: string; href: string }[];
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Question Bank", href: "/dashboard/questions", icon: HelpCircle },
  { title: "Papers", href: "/dashboard/papers", icon: FileText },
  { title: "AI Generate", href: "/dashboard/generate", icon: Brain, badge: "AI" },
  { title: "Subjects", href: "/dashboard/subjects", icon: BookOpen },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const bottomNavItems: NavItem[] = [
  { title: "Team", href: "/dashboard/team", icon: Users },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "relative flex h-screen flex-col border-r bg-card",
          "hidden lg:flex"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 shadow-glow">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="text-lg font-bold font-heading text-gradient whitespace-nowrap">
                  QPG
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-colors",
                          isActive
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="overflow-hidden whitespace-nowrap"
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {!collapsed && item.badge && (
                        <span className="ml-auto flex h-5 items-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-2 text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className="font-medium">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>

          <Separator className="my-4" />

          <div className="space-y-1">
            {bottomNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="overflow-hidden whitespace-nowrap"
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>
        </ScrollArea>

        {/* AI Generation Card */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mx-3 mb-3"
            >
              <div className="rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 p-4 text-white shadow-glow">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-semibold text-sm">AI Generation</span>
                </div>
                <p className="text-xs text-primary-100 mb-3">
                  Generate questions instantly using AI
                </p>
                <Link
                  href="/dashboard/generate"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-white/20 px-3 py-2 text-xs font-medium hover:bg-white/30 transition-colors"
                >
                  <Brain className="h-3.5 w-3.5" />
                  Generate Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md hover:bg-muted transition-colors z-10"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}
