
package com.jobmatch.repository;

import com.jobmatch.model.Job;
import com.jobmatch.model.JobApplication;
import com.jobmatch.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByApplicant(User applicant);
    List<JobApplication> findByEmployer(User employer);
    List<JobApplication> findByJob(Job job);
    List<JobApplication> findByApplicantAndJob(User applicant, Job job);
    List<JobApplication> findByStatus(String status);
}
