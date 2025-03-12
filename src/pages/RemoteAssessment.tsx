
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2, AlertTriangle, Wifi } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAssessmentAnalysis, AssessmentAnalysisResponse } from '@/utils/aiService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Do you have a dedicated workspace at home?",
    options: ["Yes, I have a separate office", "I have a dedicated desk in a shared space", "I work from various locations at home", "I don't have a dedicated space"]
  },
  {
    id: 2,
    text: "How would you rate your internet connection reliability?",
    options: ["Excellent - high-speed and very reliable", "Good - occasionally has minor issues", "Average - works but has frequent interruptions", "Poor - often unreliable"]
  },
  {
    id: 3,
    text: "How comfortable are you with digital communication tools?",
    options: ["Very comfortable - I use them daily", "Comfortable - I can use most tools efficiently", "Somewhat comfortable - I need time to learn new tools", "Not comfortable - I struggle with digital tools"]
  },
  {
    id: 4,
    text: "How do you manage your time when working independently?",
    options: ["I use structured systems and track my productivity", "I create daily to-do lists and schedules", "I work on tasks as they come up", "I struggle with time management without supervision"]
  },
  {
    id: 5,
    text: "How do you handle technical issues when working remotely?",
    options: ["I can troubleshoot and solve most problems myself", "I can handle basic issues and know when to ask for help", "I need guidance for most technical problems", "I get very frustrated and need immediate support"]
  }
];

const RemoteAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentAnalysisResponse | null>(null);
  const { toast } = useToast();
  const { analyzeAssessment, isLoading, error } = useAssessmentAnalysis();

  const handleAnswer = async () => {
    if (selectedOption === null) return;
    
    const newAnswers = { ...answers, [questions[currentQuestion].id]: selectedOption };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      try {
        // All questions answered, send to AI for analysis
        const results = await analyzeAssessment(newAnswers);
        setAssessmentResults(results);
        setShowResults(true);
        
        toast({
          title: "Assessment Complete",
          description: "Your remote work readiness score has been calculated",
        });
      } catch (err) {
        toast({
          title: "Assessment Analysis Failed",
          description: "There was an error analyzing your assessment. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setShowResults(false);
    setAssessmentResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-16 mx-auto max-w-3xl">
        <div className="flex items-center mb-8 gap-3">
          <Wifi className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Remote Work Readiness Assessment</h1>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          {!showResults ? (
            <>
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
                <CardDescription>
                  This assessment will evaluate your readiness for remote work
                </CardDescription>
                <Progress 
                  value={(currentQuestion / questions.length) * 100} 
                  className="h-2 mt-2" 
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-lg font-medium">
                    {questions[currentQuestion].text}
                  </div>
                  
                  <RadioGroup 
                    onValueChange={(value) => setSelectedOption(parseInt(value))}
                    value={selectedOption !== null ? selectedOption.toString() : undefined}
                    className="space-y-3"
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <Button 
                    onClick={handleAnswer}
                    className="w-full"
                    disabled={selectedOption === null || isLoading}
                  >
                    {isLoading ? "Processing..." : currentQuestion < questions.length - 1 ? "Next Question" : "Complete Assessment"}
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            assessmentResults && (
              <>
                <CardHeader>
                  <CardTitle>Your Remote Work Readiness Score</CardTitle>
                  <CardDescription>
                    Based on your answers, our AI has assessed your remote work readiness
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative h-36 w-36 mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-3xl font-bold">{assessmentResults.score}%</div>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="text-secondary"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className="text-primary"
                          strokeWidth="10"
                          strokeDasharray={`${assessmentResults.score * 2.51} 251`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-semibold">{assessmentResults.title}</h3>
                    <p className="text-center text-muted-foreground mt-2">
                      {assessmentResults.description}
                    </p>
                  </div>
                  
                  {assessmentResults.strengths.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        Your Strengths:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {assessmentResults.strengths.map((strength, index) => (
                          <li key={index} className="text-sm">{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {assessmentResults.improvementAreas.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        Improvement Areas:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {assessmentResults.improvementAreas.map((area, index) => (
                          <li key={index} className="text-sm">{area}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex space-x-4">
                    <Button 
                      onClick={handleRestart}
                      variant="outline"
                      className="w-full"
                    >
                      Retake Assessment
                    </Button>
                    <Button className="w-full">
                      Save to My Profile
                    </Button>
                  </div>
                </CardContent>
              </>
            )
          )}
        </Card>
      </div>
    </div>
  );
};

export default RemoteAssessment;
