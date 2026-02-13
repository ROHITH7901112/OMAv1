package com.example.OMA.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.OMA.Model.SubQuestion;
import com.example.OMA.Service.SubQuestionService;

@RestController
@RequestMapping("api/subquestion")
public class SubQuestionController {
    
    private final SubQuestionService subQuestionService;
    
    public SubQuestionController(SubQuestionService subQuestionService) {
        this.subQuestionService = subQuestionService;
    }

    // Create a new sub question
    @PostMapping
    public SubQuestion saveSubQuestion(@RequestBody SubQuestion subQuestion) {
        return subQuestionService.saveSubQuestion(subQuestion);
    }

    // Get all sub questions
    @GetMapping
    public List<SubQuestion> getAllSubQuestions() {
        return subQuestionService.getAllSubQuestions();
    }

    // Get sub question by ID
    @GetMapping("/{id}")
    public SubQuestion getSubQuestionById(@PathVariable Integer id) {
        return subQuestionService.getSubQuestionById(id);
    }

    // Get sub questions by main question ID
    @GetMapping("/mainquestion/{mainQuestionId}")
    public List<SubQuestion> getSubQuestionsByMainQuestionId(@PathVariable Integer mainQuestionId) {
        return subQuestionService.getSubQuestionsByMainQuestionId(mainQuestionId);
    }

    // Update sub question
    @PutMapping("/{id}")
    public SubQuestion updateSubQuestion(@PathVariable Integer id, @RequestBody SubQuestion subQuestion) {
        return subQuestionService.updateSubQuestion(id, subQuestion);
    }

    // Delete sub question
    @DeleteMapping("/{id}")
    public String deleteSubQuestion(@PathVariable Integer id) {
        subQuestionService.deleteSubQuestion(id);
        return "Sub Question deleted successfully";
    }
}
