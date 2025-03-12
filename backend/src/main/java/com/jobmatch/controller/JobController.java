
package com.jobmatch.controller;

import com.jobmatch.dto.JobDTO;
import com.jobmatch.model.Job;
import com.jobmatch.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {
    
    @Autowired
    private JobService jobService;
    
    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs(
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String skill) {
        
        List<Job> jobs;
        
        if (company != null && !company.isEmpty()) {
            jobs = jobService.getJobsByCompany(company);
        } else if (skill != null && !skill.isEmpty()) {
            jobs = jobService.getJobsBySkill(skill);
        } else {
            jobs = jobService.getAllJobs();
        }
        
        List<JobDTO> jobDTOs = jobs.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(jobDTOs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id)
            .map(job -> ResponseEntity.ok(convertToDTO(job)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<JobDTO> createJob(@RequestBody Job job) {
        Job createdJob = jobService.createJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(createdJob));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JobDTO> updateJob(@PathVariable Long id, @RequestBody Job updatedJob) {
        return jobService.updateJob(id, updatedJob)
            .map(job -> ResponseEntity.ok(convertToDTO(job)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
    
    private JobDTO convertToDTO(Job job) {
        JobDTO jobDTO = new JobDTO();
        jobDTO.setId(job.getId());
        jobDTO.setTitle(job.getTitle());
        jobDTO.setCompany(job.getCompany());
        jobDTO.setLocation(job.getLocation());
        jobDTO.setDescription(job.getDescription());
        jobDTO.setSalary(job.getSalary());
        jobDTO.setType(job.getType());
        jobDTO.setPostedDate(job.getPostedDate());
        jobDTO.setSkills(job.getSkills());
        return jobDTO;
    }
}
