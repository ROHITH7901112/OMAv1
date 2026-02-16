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

import com.example.OMA.Model.MainQuestion;
import com.example.OMA.Service.MainQuestionService;

@RestController
@RequestMapping("api/mainquestion")
public class MainQuestionController {
    
    private final MainQuestionService mainQuestionService;
    
    public MainQuestionController(MainQuestionService mainQuestionService) {
        this.mainQuestionService = mainQuestionService;
    }

    // Create a new main question
    @PostMapping
    public MainQuestion saveMainQuestion(@RequestBody MainQuestion mainQuestion) {
        return mainQuestionService.saveMainQuestion(mainQuestion);
    }

    // Get all main questions
    @GetMapping
    public List<MainQuestion> getAllMainQuestions() {
        return mainQuestionService.getAllMainQuestions();
    }

    // Get main question by ID
    @GetMapping("/{id}")
    public MainQuestion getMainQuestionById(@PathVariable Integer id) {
        return mainQuestionService.getMainQuestionById(id);
    }

    // Get questions by category ID
    @GetMapping("/category/{categoryId}")
    public List<MainQuestion> getQuestionsByCategory(@PathVariable Long categoryId) {
        return mainQuestionService.getQuestionsByCategoryId(categoryId);
    }

    // Get questions by type
    @GetMapping("/type/{questionType}")
    public List<MainQuestion> getQuestionsByType(@PathVariable String questionType) {
        return mainQuestionService.getQuestionsByType(questionType);
    }

    // Update main question
    @PutMapping("/{id}")
    public MainQuestion updateMainQuestion(@PathVariable Integer id, @RequestBody MainQuestion mainQuestion) {
        return mainQuestionService.updateMainQuestion(id, mainQuestion);
    }

    // Delete main question
    @DeleteMapping("/{id}")
    public String deleteMainQuestion(@PathVariable Integer id) {
        mainQuestionService.deleteMainQuestion(id);
        return "Main Question deleted successfully";
    }
}
