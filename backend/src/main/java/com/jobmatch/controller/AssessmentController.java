
package com.jobmatch.controller;

import com.jobmatch.dto.AssessmentDTO;
import com.jobmatch.model.Assessment;
import com.jobmatch.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "*")
public class AssessmentController {
    
    @Autowired
    private AssessmentService assessmentService;
    
    @GetMapping("/{id}")
    public ResponseEntity<AssessmentDTO> getAssessmentById(@PathVariable Long id) {
        return assessmentService.getAssessmentById(id)
            .map(this::convertToDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AssessmentDTO>> getAssessmentsByUser(@PathVariable Long userId) {
        List<Assessment> assessments = assessmentService.getAssessmentsByUser(userId);
        
        List<AssessmentDTO> assessmentDTOs = assessments.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(assessmentDTOs);
    }
    
    @PostMapping("/remote")
    public ResponseEntity<AssessmentDTO> submitRemoteAssessment(
            @RequestParam Long userId,
            @RequestBody Map<Integer, Integer> answers) {
        
        Assessment assessment = assessmentService.submitRemoteAssessment(userId, answers);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(assessment));
    }
    
    private AssessmentDTO convertToDTO(Assessment assessment) {
        AssessmentDTO dto = new AssessmentDTO();
        dto.setId(assessment.getId());
        dto.setUserId(assessment.getUser().getId());
        dto.setType(assessment.getType());
        dto.setScore(assessment.getScore());
        dto.setAnswers(assessment.getAnswers());
        return dto;
    }
}
