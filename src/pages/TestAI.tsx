
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Check, Code, FileText, UserRound, Wifi } from 'lucide-react';
import { 
  useAiMatching, 
  useResumeParser, 
  useAssessmentAnalysis, 
  useInterviewRecommendations 
} from '@/utils/aiService';
import { useToast } from '@/hooks/use-toast';
import { useNotificationService } from '@/utils/notificationService';

const TestAI = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("matching");
  const [testResults, setTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { createNotification } = useNotificationService();

  // Skills matching test
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "UI/UX"]);
  const { getJobMatches } = useAiMatching();

  // Resume parsing test
  const { parseResume } = useResumeParser();
  
  // Assessment analysis test
  const { analyzeAssessment } = useAssessmentAnalysis();
  
  // Interview recommendations test
  const [company, setCompany] = useState("TechCorp");
  const [jobTitle, setJobTitle] = useState("Senior Frontend Developer");
  const { getRecommendations } = useInterviewRecommendations();

  const handleSkillChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setSkills(skillsArray);
  };

  const runSkillsMatching = async () => {
    setIsLoading(true);
    try {
      const results = await getJobMatches(skills);
      setTestResults(results);
      toast({
        title: "AI Test Successful",
        description: `Found ${results.matches.length} matching jobs`,
      });
    } catch (error) {
      console.error("AI test error:", error);
      toast({
        title: "AI Test Failed",
        description: "There was an error processing your request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runResumeParser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    try {
      const results = await parseResume(file);
      setTestResults(results);
      toast({
        title: "Resume Parsing Successful",
        description: `Extracted ${results.skills.length} skills with ${results.confidence * 100}% confidence`,
      });
    } catch (error) {
      console.error("Resume parsing error:", error);
      toast({
        title: "Resume Parsing Failed",
        description: "There was an error processing your resume",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runAssessmentAnalysis = async () => {
    setIsLoading(true);
    try {
      // Simulate assessment answers (1-5 questions with 0-3 answers where 0 is best)
      const mockAnswers = {
        1: Math.floor(Math.random() * 4),
        2: Math.floor(Math.random() * 4),
        3: Math.floor(Math.random() * 4),
        4: Math.floor(Math.random() * 4),
        5: Math.floor(Math.random() * 4)
      };
      
      const results = await analyzeAssessment(mockAnswers);
      setTestResults(results);
      toast({
        title: "Assessment Analysis Successful",
        description: `Your remote work readiness score is ${results.score}%`,
      });
    } catch (error) {
      console.error("Assessment analysis error:", error);
      toast({
        title: "Assessment Analysis Failed",
        description: "There was an error analyzing your assessment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runInterviewRecommendations = async () => {
    setIsLoading(true);
    try {
      const results = await getRecommendations(company, jobTitle);
      setTestResults(results);
      toast({
        title: "Recommendations Generated",
        description: `${results.suggestedTimes.length} interview slots suggested`,
      });
    } catch (error) {
      console.error("Interview recommendations error:", error);
      toast({
        title: "Recommendations Failed",
        description: "There was an error generating interview recommendations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testNotifications = () => {
    // Test application notification for employer
    createNotification({
      type: 'new_application',
      jobId: 1,
      jobTitle: 'React Developer',
      company: 'TechCorp',
      applicantName: 'John Doe',
      employerId: 1
    });
    
    // Test status change notification for applicant
    createNotification({
      type: 'status_change',
      jobId: 2,
      jobTitle: 'UX Designer',
      company: 'DesignCo',
      applicantId: 2,
      status: 'ACCEPTED'
    });
    
    toast({
      title: "Notifications Created",
      description: "Test notifications have been generated",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Helmet>
        <title>AI Testing | JobMatch</title>
      </Helmet>
      <Header />
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">AI Engineer Testing Console</h1>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Test Controls */}
          <div className="md:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>AI Functionality Tests</CardTitle>
                <CardDescription>
                  Test different AI capabilities in the JobMatch platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="matching">Skills Matching</TabsTrigger>
                    <TabsTrigger value="other">Other Tests</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="matching" className="space-y-4">
                    <div>
                      <Label htmlFor="skills">Skills (comma separated)</Label>
                      <Textarea 
                        id="skills"
                        value={skills.join(', ')}
                        onChange={handleSkillChange}
                        placeholder="React, JavaScript, UI/UX..."
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={runSkillsMatching} 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Run Skills Matching Test"}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="other" className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Resume Parser</h3>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="file" 
                          accept=".pdf,.doc,.docx,.txt" 
                          onChange={runResumeParser}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Assessment Analysis</h3>
                      <Button 
                        onClick={runAssessmentAnalysis}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full"
                      >
                        {isLoading ? "Processing..." : "Test with Random Answers"}
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Interview Recommendations</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input 
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input 
                            id="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={runInterviewRecommendations}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full"
                      >
                        {isLoading ? "Processing..." : "Generate Recommendations"}
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Notification System</h3>
                      <Button 
                        onClick={testNotifications}
                        variant="outline"
                        className="w-full"
                      >
                        Generate Test Notifications
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Results Display */}
          <div className="md:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>
                  AI processing output and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {testResults ? (
                  <div className="overflow-auto max-h-[70vh]">
                    {activeTab === "matching" && testResults.matches && (
                      <div className="space-y-4">
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Analysis Details</h3>
                          {testResults.analysisDetails && (
                            <>
                              <div className="mb-2">
                                <span className="font-medium">Skills Matched:</span>{" "}
                                {testResults.analysisDetails.skillsMatched.map((skill: string) => (
                                  <Badge key={skill} variant="outline" className="mr-1 bg-green-100">
                                    <Check className="h-3 w-3 mr-1" /> {skill}
                                  </Badge>
                                ))}
                              </div>
                              <div className="mb-2">
                                <span className="font-medium">Missing Skills:</span>{" "}
                                {testResults.analysisDetails.missingSkills.map((skill: string) => (
                                  <Badge key={skill} variant="outline" className="mr-1 bg-red-100">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              <div>
                                <span className="font-medium">Recommendations:</span>
                                <ul className="list-disc pl-5 mt-1">
                                  {testResults.analysisDetails.recommendations.map((rec: string, i: number) => (
                                    <li key={i} className="text-sm">{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <h3 className="font-medium">Matched Jobs</h3>
                        {testResults.matches.map((job: any) => (
                          <Card key={job.id} className="mb-3">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{job.title}</h4>
                                <Badge>{job.matchScore}% Match</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {job.company} • {job.location}
                              </div>
                              <div className="mt-2 text-sm">{job.description}</div>
                              <div className="mt-2">
                                {job.skills.map((skill: string) => (
                                  <Badge key={skill} variant="outline" className="mr-1">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                    
                    {activeTab === "other" && (
                      <pre className="whitespace-pre-wrap bg-secondary/20 p-4 rounded-lg overflow-auto">
                        {JSON.stringify(testResults, null, 2)}
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 flex-col text-muted-foreground">
                    <Code className="h-12 w-12 mb-4" />
                    <p>Run a test to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAI;
