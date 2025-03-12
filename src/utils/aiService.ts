
import { useState } from 'react';

// This would normally use an environment variable or secure storage
const AI_API_KEY = "dummy-api-key"; 

export interface AiMatchingResponse {
  matches: Array<{
    id: number;
    title: string;
    company: string;
    location: string;
    matchScore: number;
    skills: string[];
    description: string;
  }>;
  analysisDetails?: {
    skillsMatched: string[];
    missingSkills: string[];
    recommendations: string[];
  };
}

export interface ResumeParsingResponse {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string[];
  education: string[];
  confidence: number;
}

export interface AssessmentAnalysisResponse {
  score: number;
  title: string;
  description: string;
  improvementAreas: string[];
  strengths: string[];
}

export interface InterviewRecommendationResponse {
  suggestedTimes: string[];
  suggestedInterviewers: string[];
  preparationTips: string[];
}

export const useAiMatching = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getJobMatches = async (userSkills: string[]): Promise<AiMatchingResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate an API call to an AI matching service
      console.log("Sending user skills to AI matching API:", userSkills);
      
      // In a real implementation, this would be a fetch or axios call to an AI API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating network delay
      
      // Mock response that would normally come from an AI service
      const response: AiMatchingResponse = {
        matches: [
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
          }
        ],
        analysisDetails: {
          skillsMatched: userSkills.filter(skill => Math.random() > 0.3),
          missingSkills: ["AWS", "Docker", "GraphQL"],
          recommendations: [
            "Consider learning GraphQL to expand your job opportunities",
            "Add more project examples that showcase your TypeScript skills",
            "Highlight your experience with responsive design"
          ]
        }
      };
      
      return response;
    } catch (err) {
      console.error("Error in AI matching:", err);
      setError("Failed to get job matches. Please try again later.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { getJobMatches, isLoading, error };
};

export const useResumeParser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseResume = async (file: File): Promise<ResumeParsingResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Sending resume to AI parsing API:", file.name);
      
      // In a real implementation, this would upload the file to an AI parsing service
      // like AWS Textract, Google Document AI, or a specialized resume parsing API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating upload and processing
      
      // Mock response that would come from an AI resume parser
      const response: ResumeParsingResponse = {
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
        ],
        confidence: 0.89
      };
      
      return response;
    } catch (err) {
      console.error("Error in AI resume parsing:", err);
      setError("Failed to parse resume. Please try again later.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { parseResume, isLoading, error };
};

export const useAssessmentAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeAssessment = async (answers: {[key: number]: number}): Promise<AssessmentAnalysisResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Sending assessment answers to AI analysis API:", answers);
      
      // In a real implementation, this would send the answers to an AI service
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating processing
      
      // Calculate a score based on the answers (0-3 points per question, where 0 is worst)
      // In a real app, this would be done by the AI service
      const totalPoints = Object.values(answers).reduce((sum, value) => sum + (3 - value), 0);
      const maxPoints = Object.keys(answers).length * 3;
      const percentScore = Math.round((totalPoints / maxPoints) * 100);
      
      // Generate response based on score
      let response: AssessmentAnalysisResponse;
      
      if (percentScore >= 80) {
        response = {
          score: percentScore,
          title: "Excellent Remote Work Readiness",
          description: "You have the ideal setup and skills for remote work. You're well-equipped to thrive in a distributed team environment.",
          improvementAreas: ["Consider investing in a secondary backup internet connection"],
          strengths: [
            "Strong time management skills",
            "Excellent technical troubleshooting abilities",
            "Ideal remote workspace setup",
            "Proficiency with digital collaboration tools"
          ]
        };
      } else if (percentScore >= 60) {
        response = {
          score: percentScore,
          title: "Good Remote Work Readiness",
          description: "You have most of the necessary elements for remote work success, but there are some areas where you could improve.",
          improvementAreas: [
            "Dedicate a more permanent workspace",
            "Improve internet reliability"
          ],
          strengths: [
            "Good digital communication skills",
            "Adequate time management"
          ]
        };
      } else if (percentScore >= 40) {
        response = {
          score: percentScore,
          title: "Average Remote Work Readiness",
          description: "You have some of the basics in place, but there are significant areas that need improvement before you can thrive in a remote environment.",
          improvementAreas: [
            "Create a dedicated workspace",
            "Improve internet connection reliability",
            "Develop better time management practices",
            "Practice using digital communication tools more regularly"
          ],
          strengths: ["Basic understanding of remote work requirements"]
        };
      } else {
        response = {
          score: percentScore,
          title: "Needs Improvement",
          description: "Your current setup and practices may make remote work challenging. Consider addressing the key improvement areas listed below.",
          improvementAreas: [
            "Create a dedicated workspace",
            "Ensure reliable internet connectivity",
            "Develop structured time management systems",
            "Improve technical troubleshooting skills",
            "Practice with digital collaboration tools"
          ],
          strengths: []
        };
      }
      
      return response;
    } catch (err) {
      console.error("Error in AI assessment analysis:", err);
      setError("Failed to analyze assessment. Please try again later.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { analyzeAssessment, isLoading, error };
};

export const useInterviewRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (
    company: string, 
    jobTitle: string,
    date?: Date
  ): Promise<InterviewRecommendationResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Sending interview details to AI recommendation API:", { company, jobTitle, date });
      
      // In a real implementation, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating processing
      
      // Mock response that would come from an AI service
      const response: InterviewRecommendationResponse = {
        suggestedTimes: [
          "9:00 AM - 10:00 AM",
          "10:30 AM - 11:30 AM",
          "1:00 PM - 2:00 PM",
          "3:30 PM - 4:30 PM"
        ],
        suggestedInterviewers: [
          "Sarah Parker (Technical Lead)",
          "Michael Johnson (Engineering Manager)",
          "Emily Chen (Senior Developer)"
        ],
        preparationTips: [
          `Research ${company}'s recent projects and company culture`,
          `Prepare examples of your experience relevant to the ${jobTitle} role`,
          "Review common technical questions for this position",
          "Prepare questions to ask the interviewer about the team and company"
        ]
      };
      
      return response;
    } catch (err) {
      console.error("Error in AI interview recommendations:", err);
      setError("Failed to get interview recommendations. Please try again later.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { getRecommendations, isLoading, error };
};
