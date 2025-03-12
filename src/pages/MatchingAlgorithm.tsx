
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import JobCard from '@/components/JobCard';

// Mock jobs (in a real app, this would come from an API)
const allJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Worldwide",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js"],
    description: "Join our team to build cutting-edge web applications using React and TypeScript."
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "Americas",
    matchScore: 88,
    skills: ["Product Strategy", "Agile", "User Research"],
    description: "Lead product development for our SaaS platform, working closely with engineering and design teams."
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignWave",
    location: "Europe",
    matchScore: 92,
    skills: ["Figma", "User Testing", "Design Systems"],
    description: "Create beautiful and intuitive interfaces for our web and mobile applications."
  },
];

// Mock user skills for demonstration
const userSkills = ["React", "TypeScript", "CSS", "HTML", "JavaScript", "UI Design"];

const MatchingAlgorithm = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFindMatches = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setMatchedJobs([]);

    // Simulate the matching algorithm with a progress indicator
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Sort jobs by match score (in a real app, this would be calculated based on AI analysis)
          const sorted = [...allJobs].sort((a, b) => b.matchScore - a.matchScore);
          setMatchedJobs(sorted);
          
          toast({
            title: "Matching Complete",
            description: `Found ${sorted.length} matching jobs based on your profile`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-16 mx-auto">
        <div className="flex items-center mb-8 gap-3">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">AI Job Matching</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Skills Profile</CardTitle>
            <CardDescription>
              Our AI will match jobs to your skills profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {userSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <Button 
              onClick={handleFindMatches} 
              disabled={isAnalyzing}
              className="w-full md:w-auto"
            >
              {isAnalyzing ? "Analyzing your profile..." : "Find My Matches"}
            </Button>
            
            {isAnalyzing && (
              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  AI is analyzing your profile and finding the best matches...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {matchedJobs.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-6">Your Top Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  matchScore={job.matchScore}
                  skills={job.skills}
                  description={job.description}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MatchingAlgorithm;
