package com.example.OMA.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.OMA.Model.Assessment;
import com.example.OMA.Model.User;

@Repository
public interface AssessmentRepo extends JpaRepository<Assessment, Long> {
    List<Assessment> findByCreatedBy(User createdBy);
    Assessment findByAssessmentName(String assessmentName);
}
