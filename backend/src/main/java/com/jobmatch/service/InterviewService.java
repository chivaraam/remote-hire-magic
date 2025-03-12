
package com.jobmatch.service;

import com.jobmatch.model.Interview;
import com.jobmatch.model.User;
import com.jobmatch.repository.InterviewRepository;
import com.jobmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {
    
    @Autowired
    private InterviewRepository interviewRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Interview> getInterviewsByUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(interviewRepository::findByUser).orElse(java.util.Collections.emptyList());
    }
    
    public Optional<Interview> getInterviewById(Long id) {
        return interviewRepository.findById(id);
    }
    
    public Interview scheduleInterview(Interview interview, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        interview.setUser(user);
        
        // In a real app, this might include scheduling with a calendar API
        
        return interviewRepository.save(interview);
    }
    
    public Optional<Interview> updateInterview(Long id, Interview updatedInterview) {
        return interviewRepository.findById(id)
            .map(interview -> {
                interview.setCompany(updatedInterview.getCompany());
                interview.setJobTitle(updatedInterview.getJobTitle());
                interview.setDate(updatedInterview.getDate());
                interview.setTime(updatedInterview.getTime());
                interview.setInterviewer(updatedInterview.getInterviewer());
                interview.setPlatform(updatedInterview.getPlatform());
                return interviewRepository.save(interview);
            });
    }
    
    public void deleteInterview(Long id) {
        interviewRepository.deleteById(id);
    }
}
