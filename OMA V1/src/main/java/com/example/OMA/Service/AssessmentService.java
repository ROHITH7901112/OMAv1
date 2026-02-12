package com.example.OMA.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.OMA.Model.Assessment;
import com.example.OMA.Model.User;
import com.example.OMA.Repository.AssessmentRepo;

@Service
public class AssessmentService {
    
    @Autowired
    private AssessmentRepo assessmentRepo;
    
    public List<Assessment> getAllAssessments() {
        return assessmentRepo.findAll();
    }
    
    public Optional<Assessment> getAssessmentById(Long assessment_id) {
        return assessmentRepo.findById(assessment_id);
    }
    
    public Assessment createAssessment(Assessment assessment) {
        return assessmentRepo.save(assessment);
    }
    
    public Assessment updateAssessment(Long assessment_id, Assessment assessment) {
        if (assessmentRepo.existsById(assessment_id)) {
            return assessmentRepo.save(assessment);
        }
        return null;
    }
    
    public void deleteAssessment(Long assessment_id) {
        assessmentRepo.deleteById(assessment_id);
    }
    
    public List<Assessment> getAssessmentsByCreatedBy(User createdBy) {
        return assessmentRepo.findByCreatedBy(createdBy);
    }
    
    public Assessment getAssessmentByName(String assessmentName) {
        return assessmentRepo.findByAssessmentName(assessmentName);
    }
}
