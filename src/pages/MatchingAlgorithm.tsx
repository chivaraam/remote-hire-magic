
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import JobCard from '@/components/JobCard';
import { useAiMatching, AiMatchingResponse } from '@/utils/aiService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock user skills for demonstration
const userSkills = ["React", "TypeScript", "CSS", "HTML", "JavaScript", "UI Design"];

const MatchingAlgorithm = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
  const [analysisDetails, setAnalysisDetails] = useState<AiMatchingResponse['analysisDetails'] | null>(null);
  const { toast } = useToast();
  const { getJobMatches, isLoading, error } = useAiMatching();

  const handleFindMatches = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setMatchedJobs([]);
    setAnalysisDetails(null);

    // Simulate progress updates during AI processing
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Call the AI service with user skills
      const result = await getJobMatches(userSkills);
      
      // Complete the progress
      clearInterval(progressInterval);
      setProgress(100);
      
      // Update the UI with results
      setMatchedJobs(result.matches);
      setAnalysisDetails(result.analysisDetails);
      
      toast({
        title: "Matching Complete",
        description: `Found ${result.matches.length} matching jobs based on your profile`,
      });
    } catch (err) {
      toast({
        title: "Matching Failed",
        description: "There was an error finding job matches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
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
              disabled={isAnalyzing || isLoading}
              className="w-full md:w-auto"
            >
              {isAnalyzing ? "Analyzing your profile..." : "Find My Matches"}
            </Button>
            
            {(isAnalyzing || isLoading) && (
              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  AI is analyzing your profile and finding the best matches...
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {analysisDetails && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>
                Here's what our AI found about your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Skills Matched</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisDetails.skillsMatched.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Missing Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisDetails.missingSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisDetails.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
