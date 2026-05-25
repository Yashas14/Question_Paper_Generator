'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Plus, Search, MoreVertical, Copy, Trash2,
  Download, Share2, Eye, Clock, CheckCircle, AlertCircle, Edit3,
  Grid3X3, List, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  DRAFT: { label: 'Draft', color: 'bg-gray-100 text-gray-700', icon: Edit3 },
  IN_REVIEW: { label: 'In Review', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  APPROVED: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  PUBLISHED: { label: 'Published', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
  ARCHIVED: { label: 'Archived', color: 'bg-gray-100 text-gray-500', icon: AlertCircle },
};

const demoPapers = [
  {
    id: '1', title: 'Data Structures Mid-Term 2024', subject: 'Data Structures',
    status: 'PUBLISHED', totalMarks: 100, duration: 180, questionsCount: 25,
    createdAt: '2024-01-15', updatedAt: '2024-01-20', starred: true,
    template: 'University Classic', author: 'Dr. Smith',
  },
  {
    id: '2', title: 'DBMS Final Exam', subject: 'Database Management',
    status: 'APPROVED', totalMarks: 75, duration: 150, questionsCount: 20,
    createdAt: '2024-01-10', updatedAt: '2024-01-18', starred: false,
    template: 'Modern Clean', author: 'Prof. Johnson',
  },
  {
    id: '3', title: 'OS Unit Test 1', subject: 'Operating Systems',
    status: 'IN_REVIEW', totalMarks: 50, duration: 90, questionsCount: 15,
    createdAt: '2024-01-08', updatedAt: '2024-01-08', starred: false,
    template: 'Board Style', author: 'Dr. Williams',
  },
  {
    id: '4', title: 'Computer Networks Practice', subject: 'Computer Networks',
    status: 'DRAFT', totalMarks: 100, duration: 180, questionsCount: 30,
    createdAt: '2024-01-05', updatedAt: '2024-01-06', starred: true,
    template: 'University Classic', author: 'Dr. Smith',
  },
];

export default function PapersPage() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = demoPapers.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Question Papers</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your question papers
          </p>
        </div>
        <Link href="/dashboard/papers/new">
          <Button className="bg-gradient-to-r from-primary to-primary/80">
            <Plus className="h-4 w-4 mr-2" /> Create Paper
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search papers..."
            className="pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED'].map(s => (
            <Button
              key={s}
              variant={statusFilter === s ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className="text-xs"
            >
              {s === 'all' ? 'All' : statusConfig[s]?.label}
            </Button>
          ))}
        </div>
        <div className="flex gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Papers Grid/List */}
      <AnimatePresence mode="popLayout">
        <div className={viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
          : 'space-y-3'
        }>
          {filtered.map((paper, i) => {
            const status = statusConfig[paper.status];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group hover:shadow-md transition-all cursor-pointer border-border/50 hover:border-primary/30">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <Badge className={`${status.color} text-xs gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1 text-muted-foreground hover:text-yellow-500 transition-colors">
                          <Star className={`h-4 w-4 ${paper.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> Preview</DropdownMenuItem>
                            <DropdownMenuItem><Edit3 className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem><Copy className="h-4 w-4 mr-2" /> Duplicate</DropdownMenuItem>
                            <DropdownMenuItem><Download className="h-4 w-4 mr-2" /> Export PDF</DropdownMenuItem>
                            <DropdownMenuItem><Share2 className="h-4 w-4 mr-2" /> Share</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <Link href={`/dashboard/papers/${paper.id}/preview`}>
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {paper.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mb-3">{paper.subject}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span>{paper.totalMarks} marks</span>
                      <span>{paper.duration} min</span>
                      <span>{paper.questionsCount} questions</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-xs text-muted-foreground">
                        {paper.template}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(paper.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-1">No papers found</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Try adjusting your search or filters
          </p>
          <Link href="/dashboard/papers/new">
            <Button>Create your first paper</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
