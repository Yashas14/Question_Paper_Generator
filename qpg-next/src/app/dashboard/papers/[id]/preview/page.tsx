'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Download, Share2, Edit3, Printer, Eye, MessageSquare,
  CheckCircle, Clock, Send, FileText, ChevronDown, X, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

const demoPaper = {
  title: 'Data Structures & Algorithms - Mid-Term Examination 2024',
  subject: 'Data Structures & Algorithms',
  code: 'CS301',
  totalMarks: 100,
  duration: 180,
  status: 'IN_REVIEW',
  template: 'University Classic',
  institution: 'Demo University',
  department: 'Computer Science',
  semester: 'III',
  examDate: '2024-02-15',
  author: 'Dr. Sarah Smith',
  createdAt: '2024-01-15',
  sections: [
    {
      title: 'Section A - Multiple Choice Questions',
      instructions: 'Choose the correct answer. Each question carries 2 marks.',
      marks: 20,
      questions: [
        { no: 1, text: 'Which data structure uses LIFO principle?', marks: 2, type: 'MCQ', options: ['Queue', 'Stack', 'Tree', 'Graph'] },
        { no: 2, text: 'Time complexity of binary search is:', marks: 2, type: 'MCQ', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'] },
        { no: 3, text: 'A full binary tree with n internal nodes has ___ leaf nodes.', marks: 2, type: 'MCQ', options: ['n', 'n+1', 'n-1', '2n'] },
        { no: 4, text: 'Which traversal of BST gives sorted order?', marks: 2, type: 'MCQ', options: ['Preorder', 'Inorder', 'Postorder', 'Level order'] },
        { no: 5, text: 'Minimum number of queues needed to implement a stack:', marks: 2, type: 'MCQ', options: ['1', '2', '3', '4'] },
      ],
    },
    {
      title: 'Section B - Short Answer Questions',
      instructions: 'Answer any FOUR out of five. Each question carries 10 marks.',
      marks: 40,
      questions: [
        { no: 6, text: 'Explain the working of QuickSort algorithm with an example. Analyze its time complexity in best, average, and worst cases.', marks: 10, type: 'SHORT' },
        { no: 7, text: 'Differentiate between singly linked list and doubly linked list. Write functions for insertion at the beginning for both.', marks: 10, type: 'SHORT' },
        { no: 8, text: 'What is a balanced binary search tree? Explain AVL tree rotations with examples.', marks: 10, type: 'SHORT' },
        { no: 9, text: 'Explain BFS and DFS graph traversal algorithms. Write pseudocode for both.', marks: 10, type: 'SHORT' },
        { no: 10, text: 'Define hashing. Explain different collision resolution techniques with examples.', marks: 10, type: 'SHORT' },
      ],
    },
    {
      title: 'Section C - Long Answer Questions',
      instructions: 'Answer any TWO out of three. Each question carries 20 marks.',
      marks: 40,
      questions: [
        { no: 11, text: 'a) Implement a priority queue using a min-heap. Write functions for insert, extractMin, and decreaseKey.\nb) Analyze the time complexity of heap operations and compare with other priority queue implementations.', marks: 20, type: 'LONG' },
        { no: 12, text: 'a) Explain Dijkstra\'s shortest path algorithm step by step.\nb) Apply the algorithm on the given graph and find shortest path from vertex A to all other vertices.\nc) What are the limitations of Dijkstra\'s algorithm?', marks: 20, type: 'LONG' },
        { no: 13, text: 'a) Write and explain the algorithm for detecting a cycle in a directed graph.\nb) Implement topological sorting using DFS.\nc) Give a real-world application where topological sorting is used.', marks: 20, type: 'LONG' },
      ],
    },
  ],
  comments: [
    {
      id: '1',
      author: 'Prof. Johnson',
      initials: 'PJ',
      text: 'Question 8 needs more clarity on what type of rotations to explain.',
      createdAt: '2024-01-18',
      resolved: false,
    },
    {
      id: '2',
      author: 'Dr. Williams',
      initials: 'DW',
      text: 'Section A looks good. Difficulty level is appropriate for mid-term.',
      createdAt: '2024-01-17',
      resolved: true,
    },
  ],
};

export default function PaperPreviewPage() {
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState('');

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/papers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold line-clamp-1">{demoPaper.title}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge className="bg-yellow-100 text-yellow-700 text-[10px]">
                <Clock className="h-3 w-3 mr-1" /> In Review
              </Badge>
              <span className="text-xs text-muted-foreground">
                by {demoPaper.author} · {new Date(demoPaper.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowComments(!showComments)}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Comments ({demoPaper.comments.length})
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Link href="/dashboard/papers/new">
            <Button size="sm">
              <Edit3 className="h-4 w-4 mr-2" /> Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Paper Preview */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Paper Header */}
              <div className="bg-white dark:bg-gray-950 p-8 text-center border-b">
                <h2 className="text-lg font-bold uppercase tracking-wide mb-1">
                  {demoPaper.institution}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Department of {demoPaper.department}
                </p>
                <Separator className="my-4" />
                <h3 className="font-bold text-base mb-2">
                  {demoPaper.subject} ({demoPaper.code})
                </h3>
                <p className="text-sm text-muted-foreground">
                  Semester: {demoPaper.semester} | Date: {demoPaper.examDate}
                </p>
                <div className="flex items-center justify-center gap-6 mt-3 text-sm">
                  <span>Max Marks: <strong>{demoPaper.totalMarks}</strong></span>
                  <span>Duration: <strong>{demoPaper.duration} min</strong></span>
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  Instructions: Answer all sections. Read instructions for each section carefully.
                </p>
              </div>

              {/* Paper Body */}
              <div className="p-8 space-y-8 bg-white dark:bg-gray-950">
                {demoPaper.sections.map((section, si) => (
                  <div key={si}>
                    <div className="mb-4">
                      <h4 className="font-bold text-sm border-b pb-2 mb-1">
                        {section.title}
                        <span className="float-right font-normal text-muted-foreground">
                          [{section.marks} marks]
                        </span>
                      </h4>
                      <p className="text-xs text-muted-foreground italic">
                        {section.instructions}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {section.questions.map((q) => (
                        <div key={q.no} className="group">
                          <div className="flex gap-3">
                            <span className="text-sm font-medium text-muted-foreground min-w-[2rem]">
                              Q{q.no}.
                            </span>
                            <div className="flex-1">
                              <p className="text-sm whitespace-pre-line">{q.text}</p>
                              {'options' in q && q.options && (
                                <div className="grid grid-cols-2 gap-1.5 mt-2">
                                  {q.options.map((opt: string, oi: number) => (
                                    <p key={oi} className="text-sm text-muted-foreground">
                                      {String.fromCharCode(97 + oi)}) {opt}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              [{q.marks}]
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground italic">*** End of Question Paper ***</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comments Panel */}
        {showComments && (
          <motion.div
            className="w-80 shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Review Comments</CardTitle>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowComments(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {demoPaper.comments.map(comment => (
                  <div
                    key={comment.id}
                    className={`p-3 rounded-lg border text-sm ${
                      comment.resolved ? 'bg-green-50 dark:bg-green-950/20 border-green-200' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                          {comment.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-xs">{comment.author}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs">{comment.text}</p>
                    {!comment.resolved && (
                      <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" /> Resolve
                      </Button>
                    )}
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    rows={3}
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="text-xs"
                  />
                  <Button size="sm" className="w-full" disabled={!newComment.trim()}>
                    <Send className="h-3 w-3 mr-1" /> Add Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
