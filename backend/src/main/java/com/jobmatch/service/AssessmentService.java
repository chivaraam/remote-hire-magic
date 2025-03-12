
package com.jobmatch.service;

import com.jobmatch.model.Assessment;
import com.jobmatch.model.User;
import com.jobmatch.repository.AssessmentRepository;
import com.jobmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AssessmentService {
    
    @Autowired
    private AssessmentRepository assessmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Assessment> getAssessmentsByUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(assessmentRepository::findByUser).orElse(java.util.Collections.emptyList());
    }
    
    public Optional<Assessment> getAssessmentById(Long id) {
        return assessmentRepository.findById(id);
    }
    
    public Assessment submitRemoteAssessment(Long userId, Map<Integer, Integer> answers) {
        User user = userRepository.findById(userId).orElseThrow();
        
        // Calculate score based on answers
        int totalScore = answers.values().stream().mapToInt(value -> 3 - value).sum();
        int percentScore = Math.round((float) totalScore / (answers.size() * 3) * 100);
        
        Assessment assessment = new Assessment();
        assessment.setUser(user);
        assessment.setType("REMOTE_READINESS");
        assessment.setAnswers(answers);
        assessment.setScore(percentScore);
        
        return assessmentRepository.save(assessment);
    }
    
    public void deleteAssessment(Long id) {
        assessmentRepository.deleteById(id);
    }
}
