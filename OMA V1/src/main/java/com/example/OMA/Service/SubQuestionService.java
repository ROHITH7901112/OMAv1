package com.example.OMA.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.OMA.Model.SubQuestion;
import com.example.OMA.Model.MainQuestion;
import com.example.OMA.Repository.SubQuestionRepo;

@Service
public class SubQuestionService {
    
    private final SubQuestionRepo subQuestionRepo;
    
    public SubQuestionService(SubQuestionRepo subQuestionRepo) {
        this.subQuestionRepo = subQuestionRepo;
    }

    // Create and update
    public SubQuestion saveSubQuestion(SubQuestion subQuestion) {
        return subQuestionRepo.save(subQuestion);
    }

    // Read all
    public List<SubQuestion> getAllSubQuestions() {
        return subQuestionRepo.findAll();
    }

    // Read by ID
    public SubQuestion getSubQuestionById(Integer id) {
        return subQuestionRepo.findById(id).orElse(null);
    }

    // Get sub questions by main question
    public List<SubQuestion> getSubQuestionsByMainQuestion(MainQuestion mainQuestion) {
        return subQuestionRepo.findByMainQuestion(mainQuestion);
    }

    // Get sub questions by main question ID
    public List<SubQuestion> getSubQuestionsByMainQuestionId(Integer mainQuestionId) {
        return subQuestionRepo.findByMainQuestionMainQuestionId(mainQuestionId);
    }

    // Update (same as save)
    public SubQuestion updateSubQuestion(Integer id, SubQuestion subQuestion) {
        subQuestion.setSubQuestionId(id);
        return subQuestionRepo.save(subQuestion);
    }

    // Delete
    public void deleteSubQuestion(Integer id) {
        subQuestionRepo.deleteById(id);
    }
}
