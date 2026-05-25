'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Building2, Bell, Palette, Lock, Key, Globe, Mail,
  Save, Upload, Camera, Moon, Sun, Monitor, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [theme, setTheme] = useState('system');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and institution settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="institution" className="gap-2">
            <Building2 className="h-4 w-4" /> Institution
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">DS</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" /> Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max 2MB
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Dr. Sarah Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="sarah@demo.edu" type="email" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue="+1 234 567 8900" />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input defaultValue="Computer Science" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    defaultValue="Associate Professor of Computer Science with 10+ years of experience."
                    rows={3}
                  />
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Institution */}
        <TabsContent value="institution">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Institution Settings</CardTitle>
                <CardDescription>Configure your institution details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Used in paper headers. SVG, PNG or JPG. Max 1MB
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution Name</Label>
                    <Input defaultValue="Demo University" />
                  </div>
                  <div className="space-y-2">
                    <Label>Short Name / Abbreviation</Label>
                    <Input defaultValue="DU" />
                  </div>
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <Input defaultValue="https://demo.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input defaultValue="exams@demo.edu" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea defaultValue="123 University Ave, Academic City, ST 12345" rows={2} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Paper Template</Label>
                    <Select defaultValue="university-classic">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university-classic">University Classic</SelectItem>
                        <SelectItem value="modern-clean">Modern Clean</SelectItem>
                        <SelectItem value="board-style">Board Style</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Academic Year</Label>
                    <Input defaultValue="2023-24" />
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { title: 'Paper Shared', desc: 'When someone shares a paper with you', key: 'paper_shared' },
                  { title: 'Review Request', desc: 'When you are assigned as reviewer', key: 'review_request' },
                  { title: 'Review Comments', desc: 'When a reviewer comments on your paper', key: 'review_comments' },
                  { title: 'AI Generation Complete', desc: 'When AI question generation finishes', key: 'ai_complete' },
                  { title: 'Team Updates', desc: 'When team members join or leave', key: 'team_updates' },
                  { title: 'Weekly Digest', desc: 'Weekly summary of activity', key: 'weekly_digest' },
                ].map((notif) => (
                  <div key={notif.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{notif.title}</p>
                      <p className="text-xs text-muted-foreground">{notif.desc}</p>
                    </div>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-1.5 text-xs">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <Mail className="h-3 w-3" /> Email
                      </label>
                      <label className="flex items-center gap-1.5 text-xs">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <Bell className="h-3 w-3" /> Push
                      </label>
                    </div>
                  </div>
                ))}

                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Preferences
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', label: 'Light', icon: Sun },
                      { value: 'dark', label: 'Dark', icon: Moon },
                      { value: 'system', label: 'System', icon: Monitor },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setTheme(opt.value)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          theme === opt.value
                            ? 'border-primary bg-primary/5'
                            : 'border-muted hover:border-muted-foreground/30'
                        }`}
                      >
                        <opt.icon className="h-6 w-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Accent Color</Label>
                  <div className="flex gap-3">
                    {[
                      { color: 'bg-indigo-600', label: 'Indigo' },
                      { color: 'bg-blue-600', label: 'Blue' },
                      { color: 'bg-emerald-600', label: 'Emerald' },
                      { color: 'bg-violet-600', label: 'Violet' },
                      { color: 'bg-rose-600', label: 'Rose' },
                    ].map(c => (
                      <button
                        key={c.label}
                        className={`h-8 w-8 rounded-full ${c.color} ring-2 ring-offset-2 ring-transparent hover:ring-current transition-all`}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Font Size</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" /> Save Preferences
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" />
                  </div>
                </div>
                <Button>
                  <Lock className="h-4 w-4 mr-2" /> Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API access for integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg border bg-muted/50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Production Key</p>
                    <p className="text-xs text-muted-foreground font-mono">qpg_live_****************************a1b2</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Copy</Button>
                    <Button variant="ghost" size="sm" className="text-red-600">Revoke</Button>
                  </div>
                </div>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" /> Generate New Key
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'New York, US', current: true, lastActive: 'Now' },
                  { device: 'Safari on iPhone', location: 'New York, US', current: false, lastActive: '2 hours ago' },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium flex items-center gap-2">
                          {session.device}
                          {session.current && (
                            <Badge variant="secondary" className="text-[10px]">Current</Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.location} · {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-red-600">Revoke</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
