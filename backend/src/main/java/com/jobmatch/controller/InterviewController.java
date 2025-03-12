
package com.jobmatch.controller;

import com.jobmatch.dto.InterviewDTO;
import com.jobmatch.model.Interview;
import com.jobmatch.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "*")
public class InterviewController {
    
    @Autowired
    private InterviewService interviewService;
    
    @GetMapping("/{id}")
    public ResponseEntity<InterviewDTO> getInterviewById(@PathVariable Long id) {
        return interviewService.getInterviewById(id)
            .map(this::convertToDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InterviewDTO>> getInterviewsByUser(@PathVariable Long userId) {
        List<Interview> interviews = interviewService.getInterviewsByUser(userId);
        
        List<InterviewDTO> interviewDTOs = interviews.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(interviewDTOs);
    }
    
    @PostMapping
    public ResponseEntity<InterviewDTO> scheduleInterview(
            @RequestBody Interview interview,
            @RequestParam Long userId) {
        
        Interview scheduledInterview = interviewService.scheduleInterview(interview, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(scheduledInterview));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<InterviewDTO> updateInterview(
            @PathVariable Long id,
            @RequestBody Interview updatedInterview) {
        
        return interviewService.updateInterview(id, updatedInterview)
            .map(this::convertToDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
        return ResponseEntity.noContent().build();
    }
    
    private InterviewDTO convertToDTO(Interview interview) {
        InterviewDTO dto = new InterviewDTO();
        dto.setId(interview.getId());
        dto.setUserId(interview.getUser().getId());
        dto.setCompany(interview.getCompany());
        dto.setJobTitle(interview.getJobTitle());
        dto.setDate(interview.getDate());
        dto.setTime(interview.getTime());
        dto.setInterviewer(interview.getInterviewer());
        dto.setPlatform(interview.getPlatform());
        return dto;
    }
}
