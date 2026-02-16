package com.example.OMA.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.OMA.Model.MainQuestion;
import com.example.OMA.Repository.MainQuestionRepo;

@Service
public class MainQuestionService {

    private final MainQuestionRepo mainQuestionRepo;

    public MainQuestionService(MainQuestionRepo mainQuestionRepo) {
        this.mainQuestionRepo = mainQuestionRepo;
    }

    // Create and update
    public MainQuestion saveMainQuestion(MainQuestion mainQuestion) {
        return mainQuestionRepo.save(mainQuestion);
    }

    // Read all
    public List<MainQuestion> getAllMainQuestions() {
        return mainQuestionRepo.findAll();
    }

    // Read by ID
    public MainQuestion getMainQuestionById(Integer id) {
        return mainQuestionRepo.findById(id).orElse(null);
    }

    // Get questions by category ID
    public List<MainQuestion> getQuestionsByCategoryId(Long categoryId) {
        return mainQuestionRepo.findByCategoryId(categoryId);
    }

    // Get questions by type
    public List<MainQuestion> getQuestionsByType(String questionType) {
        return mainQuestionRepo.findByQuestionType(questionType);
    }

    // Update
    public MainQuestion updateMainQuestion(Integer id, MainQuestion mainQuestion) {
        mainQuestion.setMainQuestionId(id);
        return mainQuestionRepo.save(mainQuestion);
    }

    // Delete
    public void deleteMainQuestion(Integer id) {
        mainQuestionRepo.deleteById(id);
    }
}
