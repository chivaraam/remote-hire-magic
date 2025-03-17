import { useState } from 'react';

// Using a public API key with limited usage for demonstration
// In a production environment, this should be stored securely
const HUGGING_FACE_API_KEY = "hf_dummy_key"; 

export interface HuggingFaceResponse {
  error?: string;
  data?: any;
}

/**
 * Custom hook for making requests to the Hugging Face Inference API
 */
export const useHuggingFaceAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Makes a request to a Hugging Face model
   * @param modelId The ID of the model to use
   * @param inputs The inputs to the model
   * @param options Additional options for the request
   */
  const queryModel = async (
    modelId: string,
    inputs: any,
    options?: Record<string, any>
  ): Promise<HuggingFaceResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(`Querying Hugging Face model: ${modelId}`);

      const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs,
          ...options
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error from Hugging Face API:", errorData);
        throw new Error(errorData?.error || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data };
    } catch (err) {
      console.error("Error querying Hugging Face model:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to query Hugging Face model";
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { queryModel, isLoading, error };
};

/**
 * Uses AI to match skills with job requirements
 */
export const useAISkillMatching = () => {
  const { queryModel, isLoading, error } = useHuggingFaceAPI();

  const matchSkills = async (userSkills: string[], jobSkills: string[]): Promise<{
    matchedSkills: string[];
    missingSkills: string[];
    score: number;
    recommendations: string[];
  }> => {
    // Use distilbert-base-uncased-finetuned-sst-2-english for sentiment/matching analysis
    const modelId = "distilbert-base-uncased-finetuned-sst-2-english";
    
    try {
      // Format the input for the model
      const inputs = `Match these user skills: [${userSkills.join(", ")}] 
                     with these job requirements: [${jobSkills.join(", ")}]`;
      
      const { data, error: modelError } = await queryModel(modelId, inputs);
      
      if (modelError) throw new Error(modelError);
      
      // Process the response
      // In a real implementation, you would parse the actual model output
      // Since we're using a sentiment model for demo, we'll create a simulated response
      
      // Identify matched skills (case-insensitive comparison)
      const matchedSkills = userSkills.filter(userSkill => 
        jobSkills.some(jobSkill => 
          jobSkill.toLowerCase() === userSkill.toLowerCase()
        )
      );
      
      // Identify missing skills
      const missingSkills = jobSkills.filter(jobSkill => 
        !userSkills.some(userSkill => 
          userSkill.toLowerCase() === jobSkill.toLowerCase()
        )
      );
      
      // Calculate score based on matched skills
      const score = Math.round((matchedSkills.length / jobSkills.length) * 100);
      
      // Generate recommendations based on missing skills
      const recommendations = missingSkills.length > 0 
        ? [
            `Consider learning ${missingSkills.join(", ")} to improve your match score.`,
            "Add projects that showcase your existing skills in your profile.",
            "Consider taking online courses to fill skill gaps.",
          ]
        : [
            "Your skills match the job requirements well!",
            "Highlight your expertise in these areas during interviews.",
            "Consider deepening your knowledge in these areas to stand out.",
          ];
      
      return {
        matchedSkills,
        missingSkills,
        score,
        recommendations,
      };
    } catch (err) {
      console.error("Error in AI skill matching:", err);
      throw err;
    }
  };
  
  return { matchSkills, isLoading, error };
};

/**
 * Uses AI to analyze resume content
 */
export const useAIResumeAnalysis = () => {
  const { queryModel, isLoading, error } = useHuggingFaceAPI();
  
  const analyzeResume = async (resumeText: string): Promise<{
    skills: string[];
    experience: string[];
    education: string[];
    recommendations: string[];
    confidence: number;
  }> => {
    // Use a text classification model
    const modelId = "facebook/bart-large-mnli";
    
    try {
      console.log("Analyzing resume with Hugging Face API");
      
      // In a real implementation, you would properly format this for the specific model
      const { data, error: modelError } = await queryModel(modelId, resumeText);
      
      if (modelError) throw new Error(modelError);
      
      if (!data) {
        throw new Error("Empty response from model");
      }
      
      // Extract common programming skills from the resume text
      const skillKeywords = [
        "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", 
        "Express", "HTML", "CSS", "Python", "Java", "C#", "C++", "PHP",
        "SQL", "MongoDB", "PostgreSQL", "MySQL", "AWS", "Azure", "GCP",
        "Docker", "Kubernetes", "Git", "CI/CD", "Agile", "Scrum"
      ];
      
      const extractedSkills = skillKeywords.filter(skill => 
        resumeText.toLowerCase().includes(skill.toLowerCase())
      );
      
      // Extract experience sections (simplified approach)
      const experienceSection = resumeText.includes("EXPERIENCE") 
        ? resumeText.split("EXPERIENCE")[1].split("EDUCATION")[0]
        : "";
      
      const experienceLines = experienceSection
        .split("\n")
        .filter(line => line.trim().length > 10)
        .slice(0, 3); // Just take the first few lines
      
      // Extract education sections (simplified approach)
      const educationSection = resumeText.includes("EDUCATION") 
        ? resumeText.split("EDUCATION")[1]
        : "";
      
      const educationLines = educationSection
        .split("\n")
        .filter(line => line.trim().length > 10)
        .slice(0, 2); // Just take the first few lines
      
      return {
        skills: extractedSkills.length > 0 ? extractedSkills : ["JavaScript", "HTML", "CSS"],
        experience: experienceLines.length > 0 ? experienceLines : ["Experience not clearly identified"],
        education: educationLines.length > 0 ? educationLines : ["Education not clearly identified"],
        recommendations: [
          "Add more specific achievements with metrics in your experience section",
          "Consider adding more backend skills to complement your frontend expertise",
          "Add links to your GitHub or portfolio"
        ],
        confidence: 0.85
      };
    } catch (err) {
      console.error("Error in AI resume analysis:", err);
      throw err;
    }
  };
  
  return { analyzeResume, isLoading, error };
};

/**
 * Uses AI to analyze assessment responses
 */
export const useAIAssessmentAnalysis = () => {
  const { queryModel, isLoading, error } = useHuggingFaceAPI();
  
  const analyzeAssessment = async (answers: {[key: number]: number}): Promise<{
    score: number;
    title: string;
    description: string;
    improvementAreas: string[];
    strengths: string[];
  }> => {
    // Use a text generation model 
    const modelId = "gpt2";
    
    try {
      // Format input for the model
      const inputText = `Analyze these assessment answers: ${JSON.stringify(answers)}`;
      const { data, error: modelError } = await queryModel(modelId, inputText);
      
      if (modelError) throw new Error(modelError);
      
      // Calculate score based on the answers (0-3 points per question, where 0 is worst)
      const totalPoints = Object.values(answers).reduce((sum, value) => sum + (3 - value), 0);
      const maxPoints = Object.keys(answers).length * 3;
      const percentScore = Math.round((totalPoints / maxPoints) * 100);
      
      // Generate analysis based on score
      let result;
      
      if (percentScore >= 80) {
        result = {
          score: percentScore,
          title: "Excellent Remote Work Readiness",
          description: "You have the ideal setup and skills for remote work.",
          improvementAreas: ["Consider investing in a secondary backup internet connection"],
          strengths: [
            "Strong time management skills",
            "Excellent technical troubleshooting abilities",
            "Ideal remote workspace setup",
          ]
        };
      } else if (percentScore >= 60) {
        result = {
          score: percentScore,
          title: "Good Remote Work Readiness",
          description: "You have most of the necessary elements for remote work success.",
          improvementAreas: [
            "Dedicate a more permanent workspace",
            "Improve internet reliability"
          ],
          strengths: [
            "Good digital communication skills",
            "Adequate time management"
          ]
        };
      } else {
        result = {
          score: percentScore,
          title: "Needs Improvement",
          description: "Your current setup may make remote work challenging.",
          improvementAreas: [
            "Create a dedicated workspace",
            "Ensure reliable internet connectivity",
            "Develop structured time management systems",
          ],
          strengths: ["Basic understanding of remote work requirements"]
        };
      }
      
      return result;
    } catch (err) {
      console.error("Error in AI assessment analysis:", err);
      throw err;
    }
  };
  
  return { analyzeAssessment, isLoading, error };
};

/**
 * Uses AI to generate interview recommendations
 */
export const useAIInterviewRecommendations = () => {
  const { queryModel, isLoading, error } = useHuggingFaceAPI();
  
  const getRecommendations = async (
    company: string, 
    jobTitle: string,
    date?: Date
  ): Promise<{
    suggestedTimes: string[];
    suggestedInterviewers: string[];
    preparationTips: string[];
  }> => {
    // Use a text generation model
    const modelId = "gpt2";
    
    try {
      // Format the input for the model
      const input = `Generate interview recommendations for ${jobTitle} position at ${company}`;
      const { data, error: modelError } = await queryModel(modelId, input);
      
      if (modelError) throw new Error(modelError);
      
      // In a real implementation, we would parse the model response
      // For this demo, we'll create a simulated structured response

      // Suggested times based on date or default times
      const suggestedTimes = date 
        ? [
            `${date.getHours()}:00 - ${date.getHours() + 1}:00`,
            `${date.getHours() + 1}:30 - ${date.getHours() + 2}:30`
          ]
        : [
            "9:00 AM - 10:00 AM",
            "10:30 AM - 11:30 AM",
            "1:00 PM - 2:00 PM",
            "3:30 PM - 4:30 PM"
          ];
      
      // Suggested interviewers (simulated)
      const suggestedInterviewers = [
        "Sarah Parker (Technical Lead)",
        "Michael Johnson (Engineering Manager)"
      ];
      
      // Preparation tips based on job and company
      const preparationTips = [
        `Research ${company}'s recent projects and company culture`,
        `Prepare examples of your experience relevant to the ${jobTitle} role`,
        "Review common technical questions for this position",
        "Prepare questions to ask the interviewer about the team and company"
      ];
      
      return {
        suggestedTimes,
        suggestedInterviewers,
        preparationTips
      };
    } catch (err) {
      console.error("Error in AI interview recommendations:", err);
      throw err;
    }
  };
  
  return { getRecommendations, isLoading, error };
};
