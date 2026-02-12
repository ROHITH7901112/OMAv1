package com.example.OMA.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.OMA.Model.Assessment;
import com.example.OMA.Service.AssessmentService;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {
    
    @Autowired
    private AssessmentService assessmentService;
    
    @GetMapping
    public List<Assessment> getAllAssessments() {
        return assessmentService.getAllAssessments();
    }
    
    @GetMapping("/{assessment_id}")
    public Assessment getAssessmentById(@PathVariable Long assessment_id) {
        return assessmentService.getAssessmentById(assessment_id).orElse(null);
    }
    
    @PostMapping
    public Assessment createAssessment(@RequestBody Assessment assessment) {
        return assessmentService.createAssessment(assessment);
    }
    
    @PutMapping("/{assessment_id}")
    public Assessment updateAssessment(@PathVariable Long assessment_id, @RequestBody Assessment assessment) {
        return assessmentService.updateAssessment(assessment_id, assessment);
    }
    
    @DeleteMapping("/{assessment_id}")
    public void deleteAssessment(@PathVariable Long assessment_id) {
        assessmentService.deleteAssessment(assessment_id);
    }
}
