package com.example.OMA.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.example.OMA.Model.SubQuestion;
import com.example.OMA.Repository.SubQuestionRepo;

@Service
public class SubQuestionService {
    private static final Logger logger = LoggerFactory.getLogger(SubQuestionService.class);

    private final SubQuestionRepo subQuestionRepo;

    public SubQuestionService(SubQuestionRepo subQuestionRepo) {
        this.subQuestionRepo = subQuestionRepo;
    }

    // Create and update - invalidate survey cache
    @CacheEvict(value = "surveyStructure", allEntries = true)
    public SubQuestion saveSubQuestion(SubQuestion subQuestion) {
        logger.info("💾 Saving sub question | Cache invalidated");
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

    // Get sub questions by main question ID
    public List<SubQuestion> getSubQuestionsByMainQuestionId(Integer mainQuestionId) {
        return subQuestionRepo.findByMainQuestionId(mainQuestionId);
    }

    // Update - invalidate survey cache
    @CacheEvict(value = "surveyStructure", allEntries = true)
    public SubQuestion updateSubQuestion(Integer id, SubQuestion subQuestion) {
        logger.info("💾 Updating sub question: {} | Cache invalidated", id);
        subQuestion.setSubQuestionId(id);
        return subQuestionRepo.save(subQuestion);
    }

    // Delete - invalidate survey cache
    @CacheEvict(value = "surveyStructure", allEntries = true)
    public void deleteSubQuestion(Integer id) {
        logger.info("🗑️  Deleting sub question: {} | Cache invalidated", id);
        subQuestionRepo.deleteById(id);
    }
}
