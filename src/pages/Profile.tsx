
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import JobApplicationsList from "@/components/JobApplicationsList";
import { PlusCircle, Save, User, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [userType, setUserType] = useState<"CANDIDATE" | "EMPLOYER">("CANDIDATE");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Node.js", "UI/UX Design"]);
  const [newSkill, setNewSkill] = useState("");

  // Mock user data
  const candidateData = {
    name: "Jane Cooper",
    title: "Senior Frontend Developer",
    email: "jane@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    experience: 5,
    summary: "Experienced frontend developer with a focus on React and TypeScript. I'm passionate about creating beautiful, performant, and accessible web applications."
  };

  const employerData = {
    companyName: "TechCorp",
    industry: "Software Development",
    email: "hr@techcorp.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    about: "TechCorp is a leading software development company specializing in web and mobile applications."
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  return (
    <>
      <Helmet>
        <title>My Profile | JobMatch</title>
      </Helmet>
      <Header />
      <div className="container py-8 px-4 mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="mb-2">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Applications
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information to help employers find you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {userType === "CANDIDATE" ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={candidateData.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input id="title" defaultValue={candidateData.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={candidateData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={candidateData.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={candidateData.location} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          defaultValue={candidateData.experience.toString()}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        rows={4}
                        defaultValue={candidateData.summary}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-xs ml-1 hover:text-red-500"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSkill();
                            }
                          }}
                        />
                        <Button type="button" onClick={handleAddSkill} size="sm">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" defaultValue={employerData.companyName} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input id="industry" defaultValue={employerData.industry} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={employerData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={employerData.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={employerData.location} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about">About the Company</Label>
                      <Textarea
                        id="about"
                        rows={4}
                        defaultValue={employerData.about}
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>
                  {userType === "EMPLOYER" ? "Candidate Applications" : "Your Applications"}
                </CardTitle>
                <CardDescription>
                  {userType === "EMPLOYER" 
                    ? "View and respond to applications for your job postings" 
                    : "Track the status of your job applications"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JobApplicationsList isEmployer={userType === "EMPLOYER"} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
