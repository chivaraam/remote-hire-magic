
import { useState } from 'react';
import {
  useAISkillMatching,
  useAIResumeAnalysis,
  useAIAssessmentAnalysis,
  useAIInterviewRecommendations
} from './huggingFaceService';

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
  const { matchSkills } = useAISkillMatching();

  const getJobMatches = async (userSkills: string[]): Promise<AiMatchingResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Sending user skills to AI matching API:", userSkills);
      
      // Mock job data that would typically come from your database
      const mockJobs = [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "TechCorp",
          location: "Worldwide",
          skills: ["React", "TypeScript", "Node.js"],
          description: "Join our team to build cutting-edge web applications using React and TypeScript."
        },
        {
          id: 2,
          title: "Product Manager",
          company: "InnovateLabs",
          location: "Americas",
          skills: ["Product Strategy", "Agile", "User Research"],
          description: "Lead product development for our SaaS platform, working closely with engineering and design teams."
        },
        {
          id: 3,
          title: "UX/UI Designer",
          company: "DesignWave",
          location: "Europe",
          skills: ["Figma", "User Testing", "Design Systems"],
          description: "Create beautiful and intuitive interfaces for our web and mobile applications."
        }
      ];
      
      // Get match results for all jobs
      const matchPromises = mockJobs.map(async job => {
        const { score, matchedSkills, missingSkills } = await matchSkills(userSkills, job.skills);
        return {
          ...job,
          matchScore: score
        };
      });
      
      const matchedJobs = await Promise.all(matchPromises);
      
      // Sort jobs by match score
      const sortedJobs = matchedJobs.sort((a, b) => b.matchScore - a.matchScore);
      
      // For the first (best) match, get detailed analysis
      const bestMatch = sortedJobs[0];
      const { matchedSkills, missingSkills, recommendations } = 
        await matchSkills(userSkills, bestMatch.skills);
      
      const response: AiMatchingResponse = {
        matches: sortedJobs,
        analysisDetails: {
          skillsMatched: matchedSkills,
          missingSkills: missingSkills,
          recommendations: recommendations
        }
      };
      
      return response;
    } catch (err) {
      console.error("Error in AI matching:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to get job matches";
      setError(errorMessage);
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
  const { analyzeResume } = useAIResumeAnalysis();

  const parseResume = async (file: File): Promise<ResumeParsingResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Sending resume to backend parsing API:", file.name);
      
      // Create form data to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', '1'); // Hardcoded for demo, should use actual user ID
      
      // Call the backend API to parse the resume
      const response = await fetch('/api/resumes/parse', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Format the response
      const resumeResponse: ResumeParsingResponse = {
        name: result.name || "Not found",
        email: result.email || "Not found",
        phone: result.phone || "Not found",
        skills: result.skills || [],
        experience: result.experience || [],
        education: result.education || [],
        confidence: result.confidence || 0.95 // Backend doesn't provide confidence, so we use a high default
      };
      
      return resumeResponse;
    } catch (err) {
      console.error("Error in resume parsing:", err);
      
      // If backend fails, fallback to AI service
      try {
        console.log("Falling back to AI service for resume parsing");
        // Read the file content
        const fileText = await file.text();
        
        // Call the AI service to analyze the resume text
        const aiResult = await analyzeResume(fileText);
        
        if (!aiResult) {
          throw new Error("AI service returned empty result");
        }
        
        // Format the response
        return {
          name: aiResult.skills ? "Extracted from resume" : "Not found", // AI model would extract this
          email: "Extracted from resume",
          phone: "Extracted from resume",
          skills: aiResult.skills || [],
          experience: aiResult.experience || [],
          education: aiResult.education || [],
          confidence: aiResult.confidence || 0.7
        };
      } catch (aiErr) {
        console.error("Error in AI resume parsing fallback:", aiErr);
        const errorMessage = err instanceof Error ? err.message : "Failed to parse resume";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { parseResume, isLoading, error };
};

export const useAssessmentAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { analyzeAssessment } = useAIAssessmentAnalysis();

  const analyzeAssessmentAnswers = async (answers: {[key: number]: number}): Promise<AssessmentAnalysisResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Sending assessment answers to AI analysis API:", answers);
      
      // Call the AI service
      const result = await analyzeAssessment(answers);
      
      return result;
    } catch (err) {
      console.error("Error in AI assessment analysis:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze assessment";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { analyzeAssessment: analyzeAssessmentAnswers, isLoading, error };
};

export const useInterviewRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getRecommendations: getAIRecommendations } = useAIInterviewRecommendations();

  const getRecommendations = async (
    company: string, 
    jobTitle: string,
    date?: Date
  ): Promise<InterviewRecommendationResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Sending interview details to AI recommendation API:", { company, jobTitle, date });
      
      // Call the AI service
      const result = await getAIRecommendations(company, jobTitle, date);
      
      return result;
    } catch (err) {
      console.error("Error in AI interview recommendations:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to get interview recommendations";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { getRecommendations, isLoading, error };
};
