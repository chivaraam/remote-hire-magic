
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import { BellRing, ShieldCheck, Mail, Lock, User, Globe, Bell } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Mock settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    marketingEmails: false,
    profileVisibility: 'public',
    twoFactorAuth: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  const handleSaveSettings = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleChangePassword = () => {
    if (settings.newPassword !== settings.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      });
      return;
    }
    
    if (settings.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      
      setSettings({
        ...settings,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Settings | JobMatch</title>
      </Helmet>
      
      <Header />
      
      <div className="naukri-container py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
              <TabsTrigger
                value="general"
                className="data-[state=active]:border-b-2 border-primary rounded-none data-[state=active]:shadow-none py-3 px-4"
              >
                <User className="w-4 h-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:border-b-2 border-primary rounded-none data-[state=active]:shadow-none py-3 px-4"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="data-[state=active]:border-b-2 border-primary rounded-none data-[state=active]:shadow-none py-3 px-4"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Privacy & Security
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile display settings and job preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="visibility">Profile Visibility</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div 
                        className={`border p-4 rounded-lg cursor-pointer ${settings.profileVisibility === 'public' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                        onClick={() => setSettings({...settings, profileVisibility: 'public'})}
                      >
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span className="font-medium">Public</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Visible to all employers</p>
                      </div>
                      <div 
                        className={`border p-4 rounded-lg cursor-pointer ${settings.profileVisibility === 'private' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                        onClick={() => setSettings({...settings, profileVisibility: 'private'})}
                      >
                        <div className="flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span className="font-medium">Private</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Only visible to employers you apply to</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSaveSettings} 
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Preferences</CardTitle>
                  <CardDescription>
                    Manage the emails you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive emails about your account activity
                      </div>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications} 
                      onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked)} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Job Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified when new jobs match your skills
                      </div>
                    </div>
                    <Switch 
                      checked={settings.jobAlerts} 
                      onCheckedChange={(checked) => handleSwitchChange('jobAlerts', checked)} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Marketing Emails</div>
                      <div className="text-sm text-muted-foreground">
                        Receive updates about JobMatch features and services
                      </div>
                    </div>
                    <Switch 
                      checked={settings.marketingEmails} 
                      onCheckedChange={(checked) => handleSwitchChange('marketingEmails', checked)} 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSaveSettings} 
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Switch 
                      checked={settings.twoFactorAuth} 
                      onCheckedChange={(checked) => handleSwitchChange('twoFactorAuth', checked)} 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword"
                      type="password"
                      value={settings.currentPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword"
                      type="password"
                      value={settings.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password"
                      value={settings.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleChangePassword} 
                    disabled={saving}
                  >
                    {saving ? 'Updating...' : 'Update Password'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Settings;
