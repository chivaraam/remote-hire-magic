
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar, Award, User, Mail, Phone, Globe, FileText, Edit } from 'lucide-react';

const Profile = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userType = localStorage.getItem('userType') || 'jobseeker';

  // Mock user profile data
  const profile = {
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    website: "alexjohnson.dev",
    about: "Passionate frontend developer with 5+ years of experience building responsive and user-friendly web applications. Specialized in React, TypeScript, and modern JavaScript frameworks.",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Node.js", "Git", "Responsive Design", "UI/UX"],
    experience: [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2021",
        endDate: "Present",
        description: "Lead frontend development for enterprise SaaS platform. Implemented new features and optimized performance."
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "WebSolutions",
        location: "Portland, OR",
        startDate: "Mar 2018",
        endDate: "Dec 2020",
        description: "Developed responsive web applications for clients in various industries."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2014-2018"
      }
    ]
  };

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Your Profile | JobMatch</title>
      </Helmet>

      <Header />

      <main className="naukri-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg" alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-gray-600 mb-2">{profile.title}</p>
                <p className="text-gray-500 flex items-center text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </p>
                
                <Button variant="outline" size="sm" className="mb-6">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit Profile
                </Button>

                <div className="w-full space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profile.website}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{profile.about}</p>
                    
                    <h3 className="font-semibold mt-6 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {profile.experience.map((exp) => (
                        <div key={exp.id} className="border-b pb-4 last:border-0">
                          <h3 className="font-semibold text-lg">{exp.title}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {exp.company}
                            <span className="mx-2">•</span>
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.startDate} - {exp.endDate}
                          </div>
                          <p className="text-gray-700">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {profile.education.map((edu) => (
                        <div key={edu.id} className="border-b pb-4 last:border-0">
                          <h3 className="font-semibold text-lg">{edu.degree}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Award className="w-4 h-4 mr-1" />
                            {edu.institution}
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {edu.year}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Applications</CardTitle>
                    <CardDescription>Track your applications and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 py-8 text-center">
                      You haven't applied to any jobs yet.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => window.location.href = '/dashboard'}>
                      Browse Jobs
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
