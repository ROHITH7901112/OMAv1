package com.example.OMA.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.example.OMA.Model.Option;
import com.example.OMA.Repository.OptionRepo;

@Service
public class OptionService {
    private static final Logger logger = LoggerFactory.getLogger(OptionService.class);

    private final OptionRepo optionRepo;

    public OptionService(OptionRepo optionRepo) {
        this.optionRepo = optionRepo;
    }

    // Create and update - invalidate survey cache
    @CacheEvict(value = "surveyStructure", allEntries = true)
    public Option saveOption(Option option) {
        logger.info("💾 Saving option | Cache invalidated");
        return optionRepo.save(option);
    }

    // Read all
    public List<Option> getAllOptions() {
        return optionRepo.findAll();
    }

    // Read by ID
    public Option getOptionById(Integer id) {
        return optionRepo.findById(id).orElse(null);
    }

    // Get options by main question ID
    public List<Option> getOptionsByMainQuestionId(Integer mainQuestionId) {
        return optionRepo.findByMainQuestionId(mainQuestionId);
    }

    // Get options by sub question ID
    public List<Option> getOptionsBySubQuestionId(Integer subQuestionId) {
        return optionRepo.findBySubQuestionId(subQuestionId);
    }

    // Update - invalidate survey cache
    @CacheEvict(value = "surveyStructure", allEntries = true)
    public Option updateOption(Integer id, Option option) {
        logger.info("💾 Updating option: {} | Cache invalidated", id);
        option.setOptionId(id);
        return optionRepo.save(option);
    }

    // Delete - invalidate survey cache
    @CacheEvict(value = "surveyStructure", allEntries = true)
    public void deleteOption(Integer id) {
        logger.info("🗑️  Deleting option: {} | Cache invalidated", id);
        optionRepo.deleteById(id);
    }
}
