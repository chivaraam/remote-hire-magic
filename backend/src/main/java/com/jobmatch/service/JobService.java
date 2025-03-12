
package com.jobmatch.service;

import com.jobmatch.model.Job;
import com.jobmatch.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    
    @Autowired
    private JobRepository jobRepository;
    
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
    
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }
    
    public List<Job> getJobsByCompany(String company) {
        return jobRepository.findByCompany(company);
    }
    
    public List<Job> getJobsBySkill(String skill) {
        return jobRepository.findBySkillsContaining(skill);
    }
    
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }
    
    public Optional<Job> updateJob(Long id, Job updatedJob) {
        return jobRepository.findById(id)
            .map(job -> {
                job.setTitle(updatedJob.getTitle());
                job.setCompany(updatedJob.getCompany());
                job.setLocation(updatedJob.getLocation());
                job.setDescription(updatedJob.getDescription());
                job.setSalary(updatedJob.getSalary());
                job.setType(updatedJob.getType());
                job.setPostedDate(updatedJob.getPostedDate());
                job.setSkills(updatedJob.getSkills());
                return jobRepository.save(job);
            });
    }
    
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
