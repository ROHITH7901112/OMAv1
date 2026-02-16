package com.example.OMA.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.example.OMA.Model.MainQuestion;
import com.example.OMA.Repository.MainQuestionRepo;

@Service
public class MainQuestionService {
    private static final Logger logger = LoggerFactory.getLogger(MainQuestionService.class);

    private final MainQuestionRepo mainQuestionRepo;

    public MainQuestionService(MainQuestionRepo mainQuestionRepo) {
        this.mainQuestionRepo = mainQuestionRepo;
    }

    // Create and update - invalidate survey cache
    @CacheEvict(value = "surveyStructure", allEntries = true)
    public MainQuestion saveMainQuestion(MainQuestion mainQuestion) {
        logger.info("💾 Saving main question | Cache invalidated");
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

    // Update - invalidate survey cache
    @CacheEvict(value = "surveyStructure", allEntries = true)
    public MainQuestion updateMainQuestion(Integer id, MainQuestion mainQuestion) {
        logger.info("💾 Updating main question: {} | Cache invalidated", id);
        mainQuestion.setMainQuestionId(id);
        return mainQuestionRepo.save(mainQuestion);
    }

    // Delete - invalidate survey cache
    @CacheEvict(value = "surveyStructure", allEntries = true)
    public void deleteMainQuestion(Integer id) {
        logger.info("🗑️  Deleting main question: {} | Cache invalidated", id);
        mainQuestionRepo.deleteById(id);
    }
}
