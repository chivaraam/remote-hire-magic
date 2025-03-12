
package com.jobmatch.controller;

import com.jobmatch.dto.JobDTO;
import com.jobmatch.dto.UserDTO;
import com.jobmatch.model.JobMatch;
import com.jobmatch.service.JobMatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "*")
public class JobMatchController {
    
    @Autowired
    private JobMatchService jobMatchService;
    
    @GetMapping("/jobs/{userId}")
    public ResponseEntity<List<JobDTO>> getJobMatchesForUser(@PathVariable Long userId) {
        List<JobMatch> matches = jobMatchService.getMatchesForUser(userId);
        
        List<JobDTO> jobDTOs = matches.stream()
            .map(match -> {
                JobDTO dto = new JobDTO();
                dto.setId(match.getJob().getId());
                dto.setTitle(match.getJob().getTitle());
                dto.setCompany(match.getJob().getCompany());
                dto.setLocation(match.getJob().getLocation());
                dto.setDescription(match.getJob().getDescription());
                dto.setSalary(match.getJob().getSalary());
                dto.setType(match.getJob().getType());
                dto.setPostedDate(match.getJob().getPostedDate());
                dto.setSkills(match.getJob().getSkills());
                dto.setMatchScore(match.getMatchScore());
                return dto;
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(jobDTOs);
    }
    
    @GetMapping("/candidates/{jobId}")
    public ResponseEntity<List<UserDTO>> getCandidateMatchesForJob(@PathVariable Long jobId) {
        List<JobMatch> matches = jobMatchService.getMatchesForJob(jobId);
        
        List<UserDTO> userDTOs = matches.stream()
            .map(match -> {
                UserDTO dto = new UserDTO();
                dto.setId(match.getUser().getId());
                dto.setName(match.getUser().getName());
                dto.setEmail(match.getUser().getEmail());
                dto.setSkills(match.getUser().getSkills());
                return dto;
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(userDTOs);
    }
    
    @PostMapping("/calculate")
    public ResponseEntity<List<JobDTO>> calculateMatchesForUser(@RequestParam Long userId) {
        List<JobMatch> matches = jobMatchService.calculateMatchesForUser(userId);
        
        List<JobDTO> jobDTOs = matches.stream()
            .map(match -> {
                JobDTO dto = new JobDTO();
                dto.setId(match.getJob().getId());
                dto.setTitle(match.getJob().getTitle());
                dto.setCompany(match.getJob().getCompany());
                dto.setLocation(match.getJob().getLocation());
                dto.setDescription(match.getJob().getDescription());
                dto.setSalary(match.getJob().getSalary());
                dto.setType(match.getJob().getType());
                dto.setPostedDate(match.getJob().getPostedDate());
                dto.setSkills(match.getJob().getSkills());
                dto.setMatchScore(match.getMatchScore());
                return dto;
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(jobDTOs);
    }
}
