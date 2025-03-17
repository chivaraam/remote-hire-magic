
import { useState } from 'react';
import { AssessmentAnalysisResponse, InterviewRecommendationResponse } from './aiService';

// Mock implementation for skill matching
export const useAISkillMatching = () => {
  const matchSkills = async (userSkills: string[], jobSkills: string[]) => {
    console.log("HuggingFace AI: Matching skills", { userSkills, jobSkills });
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate matching score based on overlapping skills
    const matchedSkills = userSkills.filter(skill => 
      jobSkills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()) || 
                               skill.toLowerCase().includes(jobSkill.toLowerCase()))
    );
    
    const missingSkills = jobSkills.filter(skill => 
      !userSkills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()) || 
                                   skill.toLowerCase().includes(userSkill.toLowerCase()))
    );
    
    // Calculate score based on percentage of matched skills
    const score = Math.round((matchedSkills.length / jobSkills.length) * 100);
    
    // Generate recommendations
    const recommendations = [];
    if (missingSkills.length > 0) {
      recommendations.push(`Consider developing skills in: ${missingSkills.join(', ')}`);
    }
    if (score < 50) {
      recommendations.push("This job may not be a strong match for your current skills. Consider upskilling or looking for more relevant positions.");
    } else if (score >= 50 && score < 80) {
      recommendations.push("You have a decent match with this job. Highlight your existing relevant skills in your application.");
    } else {
      recommendations.push("You're a great match for this position! Make sure to showcase your extensive experience with these skills.");
    }
    
    return {
      score,
      matchedSkills,
      missingSkills,
      recommendations
    };
  };
  
  return { matchSkills };
};

// Mock implementation for resume analysis
export const useAIResumeAnalysis = () => {
  const analyzeResume = async (resumeText: string) => {
    console.log("HuggingFace AI: Analyzing resume", { resumeTextLength: resumeText.length });
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract skills (in a real implementation, this would use NLP to extract skills)
    const extractedSkills = ['JavaScript', 'React', 'Node.js', 'TypeScript'];
    
    // Extract experience (in a real implementation, this would use NLP to extract experience)
    const extractedExperience = [
      'Frontend Developer at TechCorp',
      'Junior Developer at StartupInc'
    ];
    
    // Extract education (in a real implementation, this would use NLP to extract education)
    const extractedEducation = [
      'BS Computer Science, University of Technology'
    ];
    
    return {
      skills: extractedSkills,
      experience: extractedExperience,
      education: extractedEducation,
      confidence: 0.85
    };
  };
  
  return { analyzeResume };
};

// Mock implementation for assessment analysis
export const useAIAssessmentAnalysis = () => {
  const analyzeAssessment = async (answers: {[key: number]: number}): Promise<AssessmentAnalysisResponse> => {
    console.log("HuggingFace AI: Analyzing assessment answers", answers);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    // Calculate score based on answers (0-3 scale, with 3 being the best)
    // In a real implementation, this would use ML to analyze answers
    let totalPoints = 0;
    const answerValues = Object.values(answers);
    
    for (const answer of answerValues) {
      // Assuming lower indices (0, 1) are better answers than higher indices (2, 3)
      totalPoints += 3 - answer;
    }
    
    const maxPossible = answerValues.length * 3;
    const score = Math.round((totalPoints / maxPossible) * 100);
    
    // Generate response based on score
    let title, description;
    const strengths = [];
    const improvementAreas = [];
    
    if (score >= 80) {
      title = "Highly Ready for Remote Work";
      description = "You demonstrate excellent remote work readiness. You have the setup, skills, and mindset needed for successful remote work.";
      
      // Add specific strengths based on answers
      if (answers[1] <= 1) strengths.push("You have an excellent dedicated workspace");
      if (answers[2] <= 1) strengths.push("Your internet connection is very reliable");
      if (answers[3] <= 1) strengths.push("You're very comfortable with digital communication tools");
      if (answers[4] <= 1) strengths.push("You have excellent time management skills");
      if (answers[5] <= 1) strengths.push("You're capable of handling technical issues independently");
      
      // Even high scorers can have improvement areas
      if (answers[1] > 0) improvementAreas.push("Consider enhancing your workspace for optimal productivity");
      if (answers[3] > 0) improvementAreas.push("Continue to explore and master new digital communication tools");
    } else if (score >= 60) {
      title = "Ready for Remote Work";
      description = "You have good remote work readiness. With some minor adjustments, you'll thrive in a remote environment.";
      
      // Add specific strengths
      if (answers[1] <= 1) strengths.push("You have a good workspace setup");
      if (answers[2] <= 1) strengths.push("Your internet connection is generally reliable");
      if (answers[3] <= 1) strengths.push("You're comfortable with most digital tools");
      
      // Add improvement areas
      if (answers[1] > 1) improvementAreas.push("Consider creating a more dedicated workspace");
      if (answers[2] > 1) improvementAreas.push("Look into improving your internet reliability");
      if (answers[3] > 1) improvementAreas.push("Invest time in becoming more familiar with digital communication tools");
      if (answers[4] > 1) improvementAreas.push("Develop stronger time management strategies");
      if (answers[5] > 1) improvementAreas.push("Build more confidence in solving technical issues");
    } else {
      title = "Developing Remote Work Readiness";
      description = "You have some challenges that might affect your remote work effectiveness. Focus on the improvement areas to increase your readiness.";
      
      // Add any strengths
      if (answers[1] <= 1) strengths.push("You have a workable space for remote work");
      if (answers[3] <= 1) strengths.push("You have some familiarity with digital tools");
      
      // Add critical improvement areas
      improvementAreas.push("Establish a dedicated workspace with minimal distractions");
      improvementAreas.push("Ensure your internet connection is reliable and has sufficient bandwidth");
      improvementAreas.push("Practice and become proficient with essential remote work tools");
      improvementAreas.push("Develop structured time management systems");
      improvementAreas.push("Build your technical troubleshooting skills");
    }
    
    // Ensure we have at least one strength
    if (strengths.length === 0) {
      strengths.push("You've taken the first step by assessing your remote work readiness");
    }
    
    return {
      score,
      title,
      description,
      strengths,
      improvementAreas
    };
  };
  
  return { analyzeAssessment };
};

// Mock implementation for interview recommendations
export const useAIInterviewRecommendations = () => {
  const getRecommendations = async (
    company: string,
    jobTitle: string,
    date?: Date
  ): Promise<InterviewRecommendationResponse> => {
    console.log("HuggingFace AI: Generating interview recommendations", { company, jobTitle, date });
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate suggested times (in a real implementation, this would use ML to analyze patterns)
    const currentDate = date || new Date();
    const suggestedTimes = [];
    
    // Generate times for the next 3 business days
    for (let i = 1; i <= 3; i++) {
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + i);
      
      // Skip weekends
      if (futureDate.getDay() === 0 || futureDate.getDay() === 6) {
        continue;
      }
      
      // Morning slot
      suggestedTimes.push(`${futureDate.toLocaleDateString()} at 10:00 AM`);
      
      // Afternoon slot
      suggestedTimes.push(`${futureDate.toLocaleDateString()} at 2:00 PM`);
    }
    
    // Generate suggested interviewers based on job title
    const suggestedInterviewers = ['John Smith, HR Manager'];
    
    if (jobTitle.toLowerCase().includes('developer') || 
        jobTitle.toLowerCase().includes('engineer')) {
      suggestedInterviewers.push('Alex Johnson, Tech Lead');
      suggestedInterviewers.push('Sarah Lee, Senior Developer');
    } else if (jobTitle.toLowerCase().includes('design')) {
      suggestedInterviewers.push('Michael Chen, Design Director');
      suggestedInterviewers.push('Emma Wilson, UX Manager');
    } else if (jobTitle.toLowerCase().includes('manager')) {
      suggestedInterviewers.push('David Brown, Department Director');
      suggestedInterviewers.push('Lisa Garcia, Operations Head');
    } else {
      suggestedInterviewers.push('Taylor Kim, Team Lead');
    }
    
    // Generate preparation tips based on job title and company
    const preparationTips = [
      `Research ${company}'s recent projects and news`,
      'Prepare questions about the company culture',
      'Review the job description and prepare examples of relevant experience'
    ];
    
    if (jobTitle.toLowerCase().includes('developer') || 
        jobTitle.toLowerCase().includes('engineer')) {
      preparationTips.push('Be ready to discuss your technical skills and problem-solving approach');
      preparationTips.push('Prepare examples of challenging technical problems you've solved');
    } else if (jobTitle.toLowerCase().includes('design')) {
      preparationTips.push('Prepare to showcase your portfolio and discuss your design process');
      preparationTips.push('Research current design trends in the industry');
    } else if (jobTitle.toLowerCase().includes('manager')) {
      preparationTips.push('Prepare examples of your leadership and decision-making skills');
      preparationTips.push('Be ready to discuss your management style and approach to team development');
    }
    
    return {
      suggestedTimes,
      suggestedInterviewers,
      preparationTips
    };
  };
  
  return { getRecommendations };
};
