
package com.jobmatch.repository;

import com.jobmatch.model.Job;
import com.jobmatch.model.JobMatch;
import com.jobmatch.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobMatchRepository extends JpaRepository<JobMatch, Long> {
    List<JobMatch> findByUser(User user);
    List<JobMatch> findByJob(Job job);
}
