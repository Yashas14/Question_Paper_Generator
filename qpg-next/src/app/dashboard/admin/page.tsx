'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Users, Building2, Activity, Key, AlertTriangle,
  Search, MoreVertical, Ban, CheckCircle, Eye, Edit3,
  TrendingUp, FileText, Brain, Server, Database, HardDrive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const demoInstitutions = [
  { id: '1', name: 'Demo University', plan: 'Pro', users: 24, questions: 1250, papers: 87, status: 'active' },
  { id: '2', name: 'Tech College', plan: 'Basic', users: 8, questions: 340, papers: 23, status: 'active' },
  { id: '3', name: 'Science Academy', plan: 'Enterprise', users: 56, questions: 3200, papers: 210, status: 'active' },
  { id: '4', name: 'Arts School', plan: 'Basic', users: 5, questions: 120, papers: 12, status: 'suspended' },
];

const recentActivity = [
  { action: 'New institution registered', detail: 'Tech College (Basic plan)', time: '2 hours ago', type: 'info' },
  { action: 'High AI usage alert', detail: 'Demo University exceeded 80% quota', time: '5 hours ago', type: 'warning' },
  { action: 'User reported', detail: 'Spam content flagged in Science Academy', time: '1 day ago', type: 'error' },
  { action: 'Plan upgrade', detail: 'Science Academy upgraded to Enterprise', time: '2 days ago', type: 'success' },
];

const systemHealth = [
  { name: 'API Server', status: 'healthy', uptime: '99.98%', icon: Server },
  { name: 'Database', status: 'healthy', uptime: '99.99%', icon: Database },
  { name: 'AI Service', status: 'degraded', uptime: '98.5%', icon: Brain },
  { name: 'Storage', status: 'healthy', uptime: '99.99%', icon: HardDrive },
];

export default function AdminPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Admin Panel
        </h1>
        <p className="text-muted-foreground mt-1">
          Platform-wide management and monitoring
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Institutions', value: '12', change: '+2 this month', icon: Building2, color: 'text-primary' },
          { label: 'Total Users', value: '348', change: '+23 this month', icon: Users, color: 'text-emerald-600' },
          { label: 'Questions Created', value: '15.2K', change: '+1.2K this month', icon: FileText, color: 'text-amber-600' },
          { label: 'AI Generations', value: '4.8K', change: '+520 this month', icon: Brain, color: 'text-purple-600' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-[10px] text-emerald-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="institutions">
        <TabsList>
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        {/* Institutions */}
        <TabsContent value="institutions" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search institutions..."
              className="pl-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {demoInstitutions
              .filter(inst => inst.name.toLowerCase().includes(search.toLowerCase()))
              .map((inst, i) => (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="hover:shadow-sm transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {inst.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-sm">{inst.name}</h3>
                              <Badge variant={inst.status === 'active' ? 'default' : 'destructive'} className="text-[10px]">
                                {inst.status}
                              </Badge>
                              <Badge variant="secondary" className="text-[10px]">
                                {inst.plan}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {inst.users} users · {inst.questions} questions · {inst.papers} papers
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Details</DropdownMenuItem>
                            <DropdownMenuItem><Edit3 className="h-4 w-4 mr-2" /> Edit Plan</DropdownMenuItem>
                            <DropdownMenuItem><Key className="h-4 w-4 mr-2" /> Manage Keys</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="h-4 w-4 mr-2" /> Suspend
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>

        {/* Activity */}
        <TabsContent value="activity" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-full ${
                    item.type === 'info' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                    item.type === 'error' ? 'bg-red-100 text-red-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <Activity className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Health */}
        <TabsContent value="system" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemHealth.map((service, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <service.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-sm">{service.name}</span>
                    </div>
                    <Badge
                      variant={service.status === 'healthy' ? 'default' : 'secondary'}
                      className={`text-[10px] ${
                        service.status === 'healthy'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {service.status === 'healthy' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {service.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Uptime</span>
                    <span>{service.uptime}</span>
                  </div>
                  <Progress value={parseFloat(service.uptime)} className="h-1.5" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Resource Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'CPU', value: 34, max: '8 cores' },
                { name: 'Memory', value: 62, max: '32 GB' },
                { name: 'Storage', value: 45, max: '500 GB' },
                { name: 'Bandwidth', value: 28, max: '1 TB' },
              ].map((resource) => (
                <div key={resource.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{resource.name}</span>
                    <span className="text-muted-foreground">{resource.value}% of {resource.max}</span>
                  </div>
                  <Progress value={resource.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
