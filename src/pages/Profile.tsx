
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
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { User, Mail, MapPin, Calendar, Briefcase, Plus, X, Upload } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Mock user data
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    location: 'New York, USA',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    experience: 5,
    summary: 'Passionate frontend developer with 5+ years of experience building modern web applications using React, TypeScript, and related technologies.',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Redux', 'Node.js', 'GraphQL'],
    education: [
      {
        id: '1',
        degree: 'BS Computer Science',
        institution: 'University of Technology',
        year: '2016-2020'
      }
    ],
    experience: [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp',
        duration: '2022-Present',
        description: 'Lead the frontend development team for the company\'s main product.'
      },
      {
        id: '2',
        title: 'Frontend Developer',
        company: 'WebSolutions',
        duration: '2020-2022',
        description: 'Worked on various client projects using React and related technologies.'
      }
    ]
  });

  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleAddSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skill)
    });
  };

  const handleSaveProfile = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>My Profile | JobMatch</title>
      </Helmet>
      
      <Header />
      
      <div className="naukri-container py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <Button 
              onClick={() => navigate('/settings')}
              variant="outline"
            >
              Settings
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" alt={profile.name} />
                      <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={profile.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="title">Profile Title</Label>
                        <Input 
                          id="title" 
                          name="title"
                          value={profile.title}
                          onChange={handleInputChange}
                          placeholder="e.g. Senior Frontend Developer"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            name="location"
                            value={profile.location}
                            onChange={handleInputChange}
                            placeholder="e.g. New York, USA"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
                <CardDescription>
                  Provide a brief overview of your professional background and skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  id="summary" 
                  name="summary"
                  value={profile.summary}
                  onChange={handleInputChange}
                  placeholder="Describe your professional background, skills, and career goals..."
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>
            
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Add your professional skills and competencies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button onClick={handleAddSkill}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your work history, starting with your most recent position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="border-b pb-5 last:border-b-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-base">{exp.title}</h3>
                        <p className="text-muted-foreground flex items-center gap-1 mt-1">
                          <Briefcase className="w-4 h-4" />
                          {exp.company}
                        </p>
                        <p className="text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                    <p className="mt-2 text-sm">{exp.description}</p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Work Experience
                </Button>
              </CardContent>
            </Card>
            
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>
                  Add your educational background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="border-b pb-5 last:border-b-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-base">{edu.degree}</h3>
                        <p className="text-muted-foreground mt-1">{edu.institution}</p>
                        <p className="text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-4 h-4" />
                          {edu.year}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveProfile} 
                disabled={saving}
                size="lg"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
