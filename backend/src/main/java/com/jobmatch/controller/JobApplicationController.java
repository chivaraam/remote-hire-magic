
package com.jobmatch.controller;

import com.jobmatch.dto.JobApplicationDTO;
import com.jobmatch.model.JobApplication;
import com.jobmatch.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;
    
    @GetMapping("/applicant/{applicantId}")
    public ResponseEntity<List<JobApplicationDTO>> getApplicationsByApplicant(@PathVariable Long applicantId) {
        List<JobApplication> applications = jobApplicationService.getApplicationsByApplicant(applicantId);
        
        if (applications == null) {
            return ResponseEntity.notFound().build();
        }
        
        List<JobApplicationDTO> applicationDTOs = applications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(applicationDTOs);
    }
    
    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<JobApplicationDTO>> getApplicationsByEmployer(@PathVariable Long employerId) {
        List<JobApplication> applications = jobApplicationService.getApplicationsByEmployer(employerId);
        
        if (applications == null) {
            return ResponseEntity.notFound().build();
        }
        
        List<JobApplicationDTO> applicationDTOs = applications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(applicationDTOs);
    }
    
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplicationDTO>> getApplicationsByJob(@PathVariable Long jobId) {
        List<JobApplication> applications = jobApplicationService.getApplicationsByJob(jobId);
        
        if (applications == null) {
            return ResponseEntity.notFound().build();
        }
        
        List<JobApplicationDTO> applicationDTOs = applications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(applicationDTOs);
    }
    
    @PostMapping
    public ResponseEntity<JobApplicationDTO> createApplication(
            @RequestParam Long applicantId,
            @RequestParam Long jobId,
            @RequestParam(required = false) String coverLetter) {
        
        JobApplication application = jobApplicationService.createApplication(applicantId, jobId, coverLetter);
        
        if (application == null) {
            return ResponseEntity.badRequest().build();
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(application));
    }
    
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<JobApplicationDTO> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status,
            @RequestParam(required = false) String employerNotes) {
        
        if (!status.equals("ACCEPTED") && !status.equals("REJECTED") && !status.equals("PENDING")) {
            return ResponseEntity.badRequest().build();
        }
        
        JobApplication application = jobApplicationService.updateApplicationStatus(applicationId, status, employerNotes);
        
        if (application == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(convertToDTO(application));
    }
    
    private JobApplicationDTO convertToDTO(JobApplication application) {
        JobApplicationDTO dto = new JobApplicationDTO();
        dto.setId(application.getId());
        dto.setApplicantId(application.getApplicant().getId());
        dto.setApplicantName(application.getApplicant().getName());
        
        if (application.getEmployer() != null) {
            dto.setEmployerId(application.getEmployer().getId());
            dto.setEmployerName(application.getEmployer().getName());
        }
        
        dto.setJobId(application.getJob().getId());
        dto.setJobTitle(application.getJob().getTitle());
        dto.setJobCompany(application.getJob().getCompany());
        dto.setCoverLetter(application.getCoverLetter());
        dto.setStatus(application.getStatus());
        dto.setAppliedDate(application.getAppliedDate());
        dto.setStatusUpdateDate(application.getStatusUpdateDate());
        dto.setEmployerNotes(application.getEmployerNotes());
        
        return dto;
    }
}
