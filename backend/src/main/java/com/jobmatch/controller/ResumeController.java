
package com.jobmatch.controller;

import com.jobmatch.dto.ResumeDTO;
import com.jobmatch.model.Resume;
import com.jobmatch.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*")
public class ResumeController {
    
    @Autowired
    private ResumeService resumeService;
    
    @GetMapping("/{id}")
    public ResponseEntity<ResumeDTO> getResumeById(@PathVariable Long id) {
        return resumeService.getResumeById(id)
            .map(this::convertToDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<ResumeDTO> getResumeByUser(@PathVariable Long userId) {
        return resumeService.getResumeByUser(userId)
            .map(this::convertToDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/parse")
    public ResponseEntity<ResumeDTO> parseResume(
            @RequestParam("userId") Long userId,
            @RequestParam("file") MultipartFile file) {
        
        try {
            Resume parsedResume = resumeService.parseResume(userId, file.getBytes());
            return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(parsedResume));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ResumeDTO> updateResume(@PathVariable Long id, @RequestBody Resume updatedResume) {
        return resumeService.updateResume(id, updatedResume)
            .map(this::convertToDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    private ResumeDTO convertToDTO(Resume resume) {
        ResumeDTO dto = new ResumeDTO();
        dto.setId(resume.getId());
        dto.setUserId(resume.getUser().getId());
        dto.setName(resume.getName());
        dto.setEmail(resume.getEmail());
        dto.setPhone(resume.getPhone());
        dto.setSkills(resume.getSkills());
        dto.setExperience(resume.getExperience());
        dto.setEducation(resume.getEducation());
        return dto;
    }
}
