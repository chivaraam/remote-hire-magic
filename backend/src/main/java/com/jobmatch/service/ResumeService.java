
package com.jobmatch.service;

import com.jobmatch.model.Resume;
import com.jobmatch.model.User;
import com.jobmatch.repository.ResumeRepository;
import com.jobmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
        // In a real application, this would use a resume parsing library or API
        // For now, we'll just create a mock resume with dummy data
        
        User user = userRepository.findById(userId).orElseThrow();
        
        Resume resume = new Resume();
        resume.setUser(user);
        resume.setName(user.getName());
        resume.setEmail(user.getEmail());
        resume.setPhone("555-123-4567");
        
        // Add mock data
        resume.setSkills(java.util.Arrays.asList("Java", "Spring Boot", "React", "TypeScript"));
        resume.setExperience(java.util.Arrays.asList(
            "Senior Developer at TechCorp (2020-Present)",
            "Web Developer at CodeShop (2017-2020)"
        ));
        resume.setEducation(java.util.Arrays.asList(
            "BS Computer Science, University of Technology (2013-2017)"
        ));
        
        return resumeRepository.save(resume);
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
