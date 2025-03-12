
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string[];
  education: string[];
}

const ResumeParser = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a resume file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsParsing(true);

    // Simulate resume parsing (in a real app, this would send the file to a parsing API)
    setTimeout(() => {
      // Mock parsed data
      setParsedData({
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "(555) 123-4567",
        skills: ["React", "TypeScript", "JavaScript", "Node.js", "CSS", "HTML", "UI/UX Design"],
        experience: [
          "Senior Frontend Developer at TechCorp (2020-Present)",
          "Web Developer at DesignStudio (2018-2020)",
          "Junior Developer at StartupX (2016-2018)"
        ],
        education: [
          "BS Computer Science, University of Technology (2012-2016)"
        ]
      });
      
      setIsParsing(false);
      
      toast({
        title: "Resume Parsed Successfully",
        description: "Your skills and experience have been extracted",
      });
    }, 2000);
  };

  const handleSaveToProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your resume data has been saved to your profile",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-16 mx-auto">
        <div className="flex items-center mb-8 gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Resume Parser</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>
                Our AI will automatically parse your resume to extract skills and experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-6 text-center hover:bg-secondary/20 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    Drag and drop your resume file, or click to browse
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('resume-upload')?.click()}
                  >
                    Select File
                  </Button>
                  {file && (
                    <p className="mt-2 text-sm">
                      Selected: <span className="font-medium">{file.name}</span>
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!file || isParsing}
                >
                  {isParsing ? "Parsing Resume..." : "Parse Resume"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {parsedData && (
            <Card>
              <CardHeader>
                <CardTitle>Extracted Information</CardTitle>
                <CardDescription>
                  Here's what we've extracted from your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Personal Information</h3>
                  <p className="text-sm">{parsedData.name}</p>
                  <p className="text-sm">{parsedData.email}</p>
                  <p className="text-sm">{parsedData.phone}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {parsedData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Experience</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {parsedData.experience.map((exp, index) => (
                      <li key={index} className="text-sm">{exp}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Education</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {parsedData.education.map((edu, index) => (
                      <li key={index} className="text-sm">{edu}</li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={handleSaveToProfile}
                  className="w-full"
                  variant="default"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Save to My Profile
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeParser;
