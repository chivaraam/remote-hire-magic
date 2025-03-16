
package com.jobmatch.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private User applicant;
    
    @ManyToOne
    private User employer;
    
    @ManyToOne
    private Job job;
    
    private String coverLetter;
    
    private String status; // "PENDING", "ACCEPTED", "REJECTED"
    
    private LocalDateTime appliedDate;
    
    private LocalDateTime statusUpdateDate;
    
    private String employerNotes;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getApplicant() { return applicant; }
    public void setApplicant(User applicant) { this.applicant = applicant; }
    
    public User getEmployer() { return employer; }
    public void setEmployer(User employer) { this.employer = employer; }
    
    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }
    
    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDateTime getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDateTime appliedDate) { this.appliedDate = appliedDate; }
    
    public LocalDateTime getStatusUpdateDate() { return statusUpdateDate; }
    public void setStatusUpdateDate(LocalDateTime statusUpdateDate) { this.statusUpdateDate = statusUpdateDate; }
    
    public String getEmployerNotes() { return employerNotes; }
    public void setEmployerNotes(String employerNotes) { this.employerNotes = employerNotes; }
}
