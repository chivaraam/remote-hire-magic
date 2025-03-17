
package com.jobmatch.service;

import com.jobmatch.model.Resume;
import com.jobmatch.model.User;
import com.jobmatch.repository.ResumeRepository;
import com.jobmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeService {
    
    @Autowired
    private ResumeRepository resumeRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Optional<Resume> getResumeById(Long id) {
        return resumeRepository.findById(id);
    }
    
    public Optional<Resume> getResumeByUser(Long userId) {
        return userRepository.findById(userId)
            .flatMap(resumeRepository::findByUser);
    }
    
    public Resume parseResume(Long userId, byte[] resumeFile) {
        // Get the user
        User user = userRepository.findById(userId).orElseThrow();
        
        // Create a new resume object
        Resume resume = new Resume();
        resume.setUser(user);
        
        try {
            // Convert the file to text
            String resumeText = extractTextFromResume(resumeFile);
            
            // Extract information using regex patterns
            resume.setName(extractName(resumeText, user.getName()));
            resume.setEmail(extractEmail(resumeText, user.getEmail()));
            resume.setPhone(extractPhone(resumeText));
            resume.setSkills(extractSkills(resumeText));
            resume.setExperience(extractExperience(resumeText));
            resume.setEducation(extractEducation(resumeText));
        } catch (Exception e) {
            // If parsing fails, fall back to basic information
            resume.setName(user.getName());
            resume.setEmail(user.getEmail());
            resume.setPhone("Not found in resume");
            resume.setSkills(new ArrayList<>());
            resume.setExperience(new ArrayList<>());
            resume.setEducation(new ArrayList<>());
        }
        
        return resumeRepository.save(resume);
    }
    
    private String extractTextFromResume(byte[] resumeFile) throws Exception {
        StringBuilder text = new StringBuilder();
        BufferedReader reader = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(resumeFile)));
        
        String line;
        while ((line = reader.readLine()) != null) {
            text.append(line).append("\n");
        }
        
        return text.toString();
    }
    
    private String extractName(String resumeText, String fallback) {
        // Look for name at the beginning of the resume
        Pattern pattern = Pattern.compile("^([A-Z][a-z]+ [A-Z][a-z]+)", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(resumeText);
        
        if (matcher.find()) {
            return matcher.group(1);
        }
        
        return fallback;
    }
    
    private String extractEmail(String resumeText, String fallback) {
        Pattern pattern = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}");
        Matcher matcher = pattern.matcher(resumeText);
        
        if (matcher.find()) {
            return matcher.group(0);
        }
        
        return fallback;
    }
    
    private String extractPhone(String resumeText) {
        // Look for phone numbers in various formats
        Pattern pattern = Pattern.compile("(\\+?\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}");
        Matcher matcher = pattern.matcher(resumeText);
        
        if (matcher.find()) {
            return matcher.group(0);
        }
        
        return "Not found in resume";
    }
    
    private List<String> extractSkills(String resumeText) {
        List<String> skills = new ArrayList<>();
        
        // Common programming languages and technologies
        String[] commonSkills = {
            "Java", "Python", "JavaScript", "TypeScript", "C\\+\\+", "C#", "Ruby", "PHP", "Swift",
            "HTML", "CSS", "SQL", "NoSQL", "React", "Angular", "Vue", "Node.js", "Express",
            "Django", "Spring", "ASP\\.NET", "AWS", "Azure", "GCP", "Docker", "Kubernetes",
            "Git", "REST API", "GraphQL", "Machine Learning", "AI", "Data Analysis",
            "Agile", "Scrum", "DevOps", "CI/CD", "TDD", "Project Management", 
            "Leadership", "Communication", "Teamwork", "Problem Solving"
        };
        
        for (String skill : commonSkills) {
            Pattern pattern = Pattern.compile("\\b" + skill + "\\b", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(resumeText);
            
            if (matcher.find()) {
                skills.add(skill.replaceAll("\\\\", ""));
            }
        }
        
        return skills;
    }
    
    private List<String> extractExperience(String resumeText) {
        List<String> experience = new ArrayList<>();
        
        // Look for common experience section indicators
        String[] sectionHeaders = {"Experience", "Work Experience", "Professional Experience", "Employment"};
        String[] nextSectionHeaders = {"Education", "Skills", "Projects", "References"};
        
        for (String header : sectionHeaders) {
            int startIndex = resumeText.indexOf(header);
            if (startIndex != -1) {
                // Find the end of the section
                int endIndex = resumeText.length();
                for (String nextHeader : nextSectionHeaders) {
                    int nextHeaderIndex = resumeText.indexOf(nextHeader, startIndex + header.length());
                    if (nextHeaderIndex != -1 && nextHeaderIndex < endIndex) {
                        endIndex = nextHeaderIndex;
                    }
                }
                
                // Extract the experience section
                String experienceSection = resumeText.substring(startIndex, endIndex);
                
                // Split by lines and look for job titles or dates
                String[] lines = experienceSection.split("\n");
                for (int i = 1; i < lines.length; i++) { // Skip the header line
                    String line = lines[i].trim();
                    if (line.isEmpty()) continue;
                    
                    // Look for lines that might contain job experience
                    if ((line.contains(" at ") || line.matches(".*\\d{4}.*")) && !line.startsWith("•") && line.length() > 10) {
                        experience.add(line);
                    }
                }
                
                break;
            }
        }
        
        return experience;
    }
    
    private List<String> extractEducation(String resumeText) {
        List<String> education = new ArrayList<>();
        
        // Look for common education section indicators
        String[] sectionHeaders = {"Education", "Academic Background", "Qualifications"};
        String[] nextSectionHeaders = {"Experience", "Skills", "Projects", "References"};
        
        for (String header : sectionHeaders) {
            int startIndex = resumeText.indexOf(header);
            if (startIndex != -1) {
                // Find the end of the section
                int endIndex = resumeText.length();
                for (String nextHeader : nextSectionHeaders) {
                    int nextHeaderIndex = resumeText.indexOf(nextHeader, startIndex + header.length());
                    if (nextHeaderIndex != -1 && nextHeaderIndex < endIndex) {
                        endIndex = nextHeaderIndex;
                    }
                }
                
                // Extract the education section
                String educationSection = resumeText.substring(startIndex, endIndex);
                
                // Split by lines and look for education information
                String[] lines = educationSection.split("\n");
                for (int i = 1; i < lines.length; i++) { // Skip the header line
                    String line = lines[i].trim();
                    if (line.isEmpty()) continue;
                    
                    // Look for lines that might contain education information
                    if ((line.contains("University") || line.contains("College") || 
                         line.contains("School") || line.contains("Degree") || 
                         line.matches(".*\\d{4}.*")) && 
                        !line.startsWith("•") && line.length() > 10) {
                        education.add(line);
                    }
                }
                
                break;
            }
        }
        
        return education;
    }
    
    public Optional<Resume> updateResume(Long id, Resume updatedResume) {
        return resumeRepository.findById(id)
            .map(resume -> {
                resume.setName(updatedResume.getName());
                resume.setEmail(updatedResume.getEmail());
                resume.setPhone(updatedResume.getPhone());
                resume.setSkills(updatedResume.getSkills());
                resume.setExperience(updatedResume.getExperience());
                resume.setEducation(updatedResume.getEducation());
                return resumeRepository.save(resume);
            });
    }
    
    public void deleteResume(Long id) {
        resumeRepository.deleteById(id);
    }
}
