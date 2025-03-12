
package com.jobmatch.repository;

import com.jobmatch.model.Assessment;
import com.jobmatch.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findByUser(User user);
    List<Assessment> findByUserAndType(User user, String type);
}
