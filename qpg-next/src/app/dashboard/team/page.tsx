'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Plus, Search, MoreVertical, Mail, Shield, Edit3, Trash2,
  UserPlus, Crown, Eye, CheckCircle, XCircle, Clock, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const roleColors: Record<string, string> = {
  INSTITUTION_ADMIN: 'bg-purple-100 text-purple-700',
  HOD: 'bg-blue-100 text-blue-700',
  TEACHER: 'bg-green-100 text-green-700',
  REVIEWER: 'bg-amber-100 text-amber-700',
  STUDENT: 'bg-gray-100 text-gray-700',
};

const demoMembers = [
  {
    id: '1', name: 'Dr. Sarah Smith', email: 'sarah@demo.edu', role: 'INSTITUTION_ADMIN',
    avatar: null, department: 'Administration', status: 'active',
    questionsCreated: 234, papersCreated: 45, lastActive: '2024-01-20',
  },
  {
    id: '2', name: 'Prof. John Johnson', email: 'john@demo.edu', role: 'HOD',
    avatar: null, department: 'Computer Science', status: 'active',
    questionsCreated: 178, papersCreated: 32, lastActive: '2024-01-19',
  },
  {
    id: '3', name: 'Dr. Emily Williams', email: 'emily@demo.edu', role: 'TEACHER',
    avatar: null, department: 'Computer Science', status: 'active',
    questionsCreated: 145, papersCreated: 28, lastActive: '2024-01-20',
  },
  {
    id: '4', name: 'Mr. David Brown', email: 'david@demo.edu', role: 'TEACHER',
    avatar: null, department: 'Computer Science', status: 'active',
    questionsCreated: 89, papersCreated: 15, lastActive: '2024-01-18',
  },
  {
    id: '5', name: 'Dr. Lisa Davis', email: 'lisa@demo.edu', role: 'REVIEWER',
    avatar: null, department: 'Computer Science', status: 'active',
    questionsCreated: 12, papersCreated: 0, lastActive: '2024-01-17',
  },
];

const pendingInvites = [
  { email: 'newteacher@demo.edu', role: 'TEACHER', sentAt: '2024-01-19', expiresAt: '2024-01-26' },
  { email: 'reviewer2@demo.edu', role: 'REVIEWER', sentAt: '2024-01-18', expiresAt: '2024-01-25' },
];

export default function TeamPage() {
  const [search, setSearch] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  const filtered = demoMembers.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members and permissions
          </p>
        </div>
        <Dialog open={showInvite} onOpenChange={setShowInvite}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80">
              <UserPlus className="h-4 w-4 mr-2" /> Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="colleague@university.edu" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEACHER">Teacher</SelectItem>
                    <SelectItem value="REVIEWER">Reviewer</SelectItem>
                    <SelectItem value="HOD">Head of Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInvite(false)}>Cancel</Button>
              <Button onClick={() => setShowInvite(false)}>
                <Send className="h-4 w-4 mr-2" /> Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: demoMembers.length, icon: Users },
          { label: 'Admins', value: demoMembers.filter(m => m.role.includes('ADMIN')).length, icon: Crown },
          { label: 'Teachers', value: demoMembers.filter(m => m.role === 'TEACHER').length, icon: Shield },
          { label: 'Pending Invites', value: pendingInvites.length, icon: Clock },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-muted">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="pending">Pending Invites</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {filtered.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="hover:shadow-sm transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-sm">{member.name}</h3>
                            <Badge className={`text-[10px] ${roleColors[member.role]}`}>
                              {member.role.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-6 text-xs text-muted-foreground">
                          <div className="text-center">
                            <p className="font-semibold text-foreground">{member.questionsCreated}</p>
                            <p>Questions</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-foreground">{member.papersCreated}</p>
                            <p>Papers</p>
                          </div>
                          <div className="text-center">
                            <p>{new Date(member.lastActive).toLocaleDateString()}</p>
                            <p>Last Active</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Profile</DropdownMenuItem>
                            <DropdownMenuItem><Edit3 className="h-4 w-4 mr-2" /> Change Role</DropdownMenuItem>
                            <DropdownMenuItem><Mail className="h-4 w-4 mr-2" /> Send Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-4">
          {pendingInvites.map((invite, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-100">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{invite.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Sent {new Date(invite.sentAt).toLocaleDateString()} ·
                        Expires {new Date(invite.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={roleColors[invite.role]}>
                      {invite.role}
                    </Badge>
                    <Button variant="outline" size="sm">Resend</Button>
                    <Button variant="ghost" size="sm" className="text-red-600">Revoke</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
