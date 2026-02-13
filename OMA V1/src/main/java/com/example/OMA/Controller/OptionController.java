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

import com.example.OMA.Model.Option;
import com.example.OMA.Service.OptionService;

@RestController
@RequestMapping("api/option")
public class OptionController {
    
    private final OptionService optionService;
    
    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    // Create a new option
    @PostMapping
    public Option saveOption(@RequestBody Option option) {
        return optionService.saveOption(option);
    }

    // Get all options
    @GetMapping
    public List<Option> getAllOptions() {
        return optionService.getAllOptions();
    }

    // Get option by ID
    @GetMapping("/{id}")
    public Option getOptionById(@PathVariable Integer id) {
        return optionService.getOptionById(id);
    }

    // Get options by main question ID
    @GetMapping("/mainquestion/{mainQuestionId}")
    public List<Option> getOptionsByMainQuestionId(@PathVariable Integer mainQuestionId) {
        return optionService.getOptionsByMainQuestionId(mainQuestionId);
    }

    // Get options by sub question ID
    @GetMapping("/subquestion/{subQuestionId}")
    public List<Option> getOptionsBySubQuestionId(@PathVariable Integer subQuestionId) {
        return optionService.getOptionsBySubQuestionId(subQuestionId);
    }

    // Update option
    @PutMapping("/{id}")
    public Option updateOption(@PathVariable Integer id, @RequestBody Option option) {
        return optionService.updateOption(id, option);
    }

    // Delete option
    @DeleteMapping("/{id}")
    public String deleteOption(@PathVariable Integer id) {
        optionService.deleteOption(id);
        return "Option deleted successfully";
    }
}
