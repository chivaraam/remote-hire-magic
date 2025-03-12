
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Wifi } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleAnswer = () => {
    if (selectedOption === null) return;
    
    const newAnswers = { ...answers, [currentQuestion]: selectedOption };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Calculate score (in a real app, this would use a more sophisticated algorithm)
      const totalScore = Object.values(newAnswers).reduce((sum, value) => {
        // Assuming first option (index 0) is worth 3 points, and last option (index 3) is worth 0
        return sum + (3 - value);
      }, 0);
      
      const percentScore = Math.round((totalScore / (questions.length * 3)) * 100);
      setScore(percentScore);
      setShowResults(true);
      
      toast({
        title: "Assessment Complete",
        description: "Your remote work readiness score has been calculated",
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setShowResults(false);
  };

  const renderFeedback = () => {
    if (score >= 80) {
      return {
        title: "Excellent Remote Work Readiness",
        description: "You have the ideal setup and skills for remote work. You're well-equipped to thrive in a distributed team environment."
      };
    } else if (score >= 60) {
      return {
        title: "Good Remote Work Readiness",
        description: "You have most of the necessary elements for remote work success, but there are some areas where you could improve."
      };
    } else if (score >= 40) {
      return {
        title: "Average Remote Work Readiness",
        description: "You have some of the basics in place, but there are significant areas that need improvement before you can thrive in a remote environment."
      };
    } else {
      return {
        title: "Needs Improvement",
        description: "Your current setup and practices may make remote work challenging. Consider addressing the key improvement areas listed below."
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-16 mx-auto max-w-3xl">
        <div className="flex items-center mb-8 gap-3">
          <Wifi className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Remote Work Readiness Assessment</h1>
        </div>

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
                    disabled={selectedOption === null}
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Assessment"}
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Your Remote Work Readiness Score</CardTitle>
                <CardDescription>
                  Based on your answers, we've assessed your remote work readiness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="relative h-36 w-36 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-3xl font-bold">{score}%</div>
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
                        strokeDasharray={`${score * 2.51} 251`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-semibold">{renderFeedback().title}</h3>
                  <p className="text-center text-muted-foreground mt-2">
                    {renderFeedback().description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Key Improvement Areas:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {score < 80 && (
                      <li className="text-sm">Consider creating a more dedicated workspace to minimize distractions.</li>
                    )}
                    {score < 70 && (
                      <li className="text-sm">Improve your internet connection reliability for seamless communication.</li>
                    )}
                    {score < 60 && (
                      <li className="text-sm">Practice using digital communication tools more regularly.</li>
                    )}
                    {score < 50 && (
                      <li className="text-sm">Develop a structured time management system to stay productive.</li>
                    )}
                  </ul>
                </div>
                
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
          )}
        </Card>
      </div>
    </div>
  );
};

export default RemoteAssessment;
