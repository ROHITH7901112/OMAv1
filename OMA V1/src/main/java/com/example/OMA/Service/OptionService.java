package com.example.OMA.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.OMA.Model.Option;
import com.example.OMA.Repository.OptionRepo;

@Service
public class OptionService {

    private final OptionRepo optionRepo;

    public OptionService(OptionRepo optionRepo) {
        this.optionRepo = optionRepo;
    }

    // Create and update
    public Option saveOption(Option option) {
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

    // Update
    public Option updateOption(Integer id, Option option) {
        option.setOptionId(id);
        return optionRepo.save(option);
    }

    // Delete
    public void deleteOption(Integer id) {
        optionRepo.deleteById(id);
    }
}
