
package com.jobmatch.service;

import com.jobmatch.model.Job;
import com.jobmatch.model.JobApplication;
import com.jobmatch.model.User;
import com.jobmatch.repository.JobApplicationRepository;
import com.jobmatch.repository.JobRepository;
import com.jobmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    public List<JobApplication> getApplicationsByApplicant(Long applicantId) {
        Optional<User> applicant = userRepository.findById(applicantId);
        return applicant.map(jobApplicationRepository::findByApplicant).orElse(null);
    }
    
    public List<JobApplication> getApplicationsByEmployer(Long employerId) {
        Optional<User> employer = userRepository.findById(employerId);
        return employer.map(jobApplicationRepository::findByEmployer).orElse(null);
    }
    
    public List<JobApplication> getApplicationsByJob(Long jobId) {
        Optional<Job> job = jobRepository.findById(jobId);
        return job.map(jobApplicationRepository::findByJob).orElse(null);
    }
    
    public List<JobApplication> getApplicationsByStatus(String status) {
        return jobApplicationRepository.findByStatus(status);
    }
    
    public JobApplication createApplication(Long applicantId, Long jobId, String coverLetter) {
        Optional<User> applicantOpt = userRepository.findById(applicantId);
        Optional<Job> jobOpt = jobRepository.findById(jobId);
        
        if (applicantOpt.isPresent() && jobOpt.isPresent()) {
            User applicant = applicantOpt.get();
            Job job = jobOpt.get();
            
            // Check if user has already applied to this job
            List<JobApplication> existingApplications = jobApplicationRepository.findByApplicantAndJob(applicant, job);
            if (!existingApplications.isEmpty()) {
                return null; // Already applied
            }
            
            // Find employer for this job (in a real scenario, job would have an employer field)
            // For demo purposes, we'll use a default employer or the first admin user
            User employer = userRepository.findByUserType("EMPLOYER").stream().findFirst().orElse(null);
            
            JobApplication application = new JobApplication();
            application.setApplicant(applicant);
            application.setEmployer(employer);
            application.setJob(job);
            application.setCoverLetter(coverLetter);
            application.setStatus("PENDING");
            application.setAppliedDate(LocalDateTime.now());
            
            return jobApplicationRepository.save(application);
        }
        
        return null;
    }
    
    public JobApplication updateApplicationStatus(Long applicationId, String status, String employerNotes) {
        Optional<JobApplication> applicationOpt = jobApplicationRepository.findById(applicationId);
        
        if (applicationOpt.isPresent()) {
            JobApplication application = applicationOpt.get();
            application.setStatus(status);
            application.setStatusUpdateDate(LocalDateTime.now());
            
            if (employerNotes != null) {
                application.setEmployerNotes(employerNotes);
            }
            
            return jobApplicationRepository.save(application);
        }
        
        return null;
    }
}
