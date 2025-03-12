
package com.jobmatch.service;

import com.jobmatch.model.Job;
import com.jobmatch.model.JobMatch;
import com.jobmatch.model.Resume;
import com.jobmatch.model.User;
import com.jobmatch.repository.JobMatchRepository;
import com.jobmatch.repository.JobRepository;
import com.jobmatch.repository.ResumeRepository;
import com.jobmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobMatchService {
    
    @Autowired
    private JobMatchRepository jobMatchRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ResumeRepository resumeRepository;
    
    public List<JobMatch> getMatchesForUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(jobMatchRepository::findByUser).orElse(java.util.Collections.emptyList());
    }
    
    public List<JobMatch> getMatchesForJob(Long jobId) {
        Optional<Job> job = jobRepository.findById(jobId);
        return job.map(jobMatchRepository::findByJob).orElse(java.util.Collections.emptyList());
    }
    
    public List<JobMatch> calculateMatchesForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Job> allJobs = jobRepository.findAll();
        Optional<Resume> resume = resumeRepository.findByUser(user);
        
        List<String> userSkills = new ArrayList<>();
        if (resume.isPresent()) {
            userSkills = resume.get().getSkills();
        } else if (user.getSkills() != null) {
            userSkills = user.getSkills();
        }
        
        List<JobMatch> matches = new ArrayList<>();
        
        for (Job job : allJobs) {
            int matchScore = calculateMatchScore(userSkills, job.getSkills());
            
            // Check if a match already exists
            Optional<JobMatch> existingMatch = jobMatchRepository.findByUser(user).stream()
                .filter(match -> match.getJob().getId().equals(job.getId()))
                .findFirst();
            
            JobMatch jobMatch;
            if (existingMatch.isPresent()) {
                jobMatch = existingMatch.get();
                jobMatch.setMatchScore(matchScore);
            } else {
                jobMatch = new JobMatch();
                jobMatch.setUser(user);
                jobMatch.setJob(job);
                jobMatch.setMatchScore(matchScore);
            }
            
            matches.add(jobMatchRepository.save(jobMatch));
        }
        
        return matches;
    }
    
    private int calculateMatchScore(List<String> userSkills, List<String> jobSkills) {
        if (userSkills == null || jobSkills == null || userSkills.isEmpty() || jobSkills.isEmpty()) {
            return 0;
        }
        
        // Convert skills to lowercase for case-insensitive comparison
        List<String> userSkillsLower = userSkills.stream()
            .map(String::toLowerCase)
            .collect(Collectors.toList());
        
        List<String> jobSkillsLower = jobSkills.stream()
            .map(String::toLowerCase)
            .collect(Collectors.toList());
        
        // Count matching skills
        long matchingSkills = jobSkillsLower.stream()
            .filter(userSkillsLower::contains)
            .count();
        
        // Calculate percentage match
        return (int) Math.round((double) matchingSkills / jobSkillsLower.size() * 100);
    }
}
