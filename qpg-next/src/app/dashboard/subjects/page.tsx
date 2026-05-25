'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Plus, Search, MoreVertical, Edit3, Trash2, Users,
  FileText, ChevronRight, GraduationCap, Layers, FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const demoSubjects = [
  {
    id: '1', name: 'Data Structures & Algorithms', code: 'CS301',
    department: 'Computer Science', semester: 3,
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'Hashing'],
    questionsCount: 145, papersCount: 12, teachersCount: 3,
  },
  {
    id: '2', name: 'Database Management Systems', code: 'CS401',
    department: 'Computer Science', semester: 4,
    topics: ['ER Model', 'Normalization', 'SQL', 'Transactions', 'Indexing'],
    questionsCount: 98, papersCount: 8, teachersCount: 2,
  },
  {
    id: '3', name: 'Operating Systems', code: 'CS302',
    department: 'Computer Science', semester: 3,
    topics: ['Process Management', 'Memory Management', 'File Systems', 'Deadlock'],
    questionsCount: 67, papersCount: 5, teachersCount: 2,
  },
  {
    id: '4', name: 'Computer Networks', code: 'CS501',
    department: 'Computer Science', semester: 5,
    topics: ['OSI Model', 'TCP/IP', 'Routing', 'Network Security'],
    questionsCount: 52, papersCount: 4, teachersCount: 1,
  },
  {
    id: '5', name: 'Software Engineering', code: 'CS402',
    department: 'Computer Science', semester: 4,
    topics: ['SDLC', 'Agile', 'UML', 'Testing', 'Design Patterns'],
    questionsCount: 43, papersCount: 3, teachersCount: 2,
  },
];

export default function SubjectsPage() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = demoSubjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  const selected = demoSubjects.find(s => s.id === selectedSubject);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Subjects</h1>
          <p className="text-muted-foreground mt-1">
            Manage subjects and their topics
          </p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80">
              <Plus className="h-4 w-4 mr-2" /> Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Subject Name</Label>
                  <Input placeholder="e.g. Data Structures" />
                </div>
                <div className="space-y-2">
                  <Label>Subject Code</Label>
                  <Input placeholder="e.g. CS301" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input placeholder="e.g. Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label>Semester</Label>
                  <Input type="number" placeholder="e.g. 3" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Brief description of the subject..." />
              </div>
              <div className="space-y-2">
                <Label>Syllabus PDF</Label>
                <Input type="file" accept=".pdf" />
                <p className="text-xs text-muted-foreground">
                  Upload syllabus to auto-extract topics via AI
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button onClick={() => setShowAdd(false)}>Add Subject</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Subjects', value: demoSubjects.length, icon: BookOpen, color: 'text-primary' },
          { label: 'Total Topics', value: demoSubjects.reduce((a, s) => a + s.topics.length, 0), icon: Layers, color: 'text-emerald-600' },
          { label: 'Total Questions', value: demoSubjects.reduce((a, s) => a + s.questionsCount, 0), icon: FileText, color: 'text-amber-600' },
          { label: 'Active Teachers', value: 8, icon: Users, color: 'text-purple-600' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-muted">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              className="pl-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {filtered.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedSubject === subject.id
                      ? 'ring-2 ring-primary border-primary'
                      : 'hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2.5 rounded-xl bg-primary/10 mt-0.5">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm">{subject.name}</h3>
                            <Badge variant="secondary" className="text-xs">{subject.code}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {subject.department} · Semester {subject.semester}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {subject.topics.slice(0, 4).map(t => (
                              <Badge key={t} variant="outline" className="text-[10px] px-2 py-0">
                                {t}
                              </Badge>
                            ))}
                            {subject.topics.length > 4 && (
                              <Badge variant="outline" className="text-[10px] px-2 py-0">
                                +{subject.topics.length - 4} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{subject.questionsCount} questions</span>
                            <span>{subject.papersCount} papers</span>
                            <span>{subject.teachersCount} teachers</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => e.stopPropagation()}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Edit3 className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem><Plus className="h-4 w-4 mr-2" /> Add Topic</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="space-y-4">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selected.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selected.code} · Semester {selected.semester}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Layers className="h-4 w-4" /> Topics ({selected.topics.length})
                    </h4>
                    <div className="space-y-2">
                      {selected.topics.map((topic, i) => (
                        <div
                          key={topic}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <span className="text-sm">{topic}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Plus className="h-3 w-3 mr-1" /> Add Topic
                    </Button>
                  </div>

                  <div className="pt-3 border-t space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Questions</span>
                      <span className="font-medium">{selected.questionsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Papers Created</span>
                      <span className="font-medium">{selected.papersCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Assigned Teachers</span>
                      <span className="font-medium">{selected.teachersCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FolderOpen className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">
                  Select a subject to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
