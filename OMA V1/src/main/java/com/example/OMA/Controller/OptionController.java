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
    public OptionController(OptionService optionService){
        this.optionService = optionService;
    }

    @PostMapping
    public Option saveOption(@RequestBody Option option){
        return optionService.saveOption(option);
    }

    @GetMapping
    public List<Option> getOption(){
        return optionService.getOption();
    }

    @GetMapping("/{id}")
    public Option getOptionById(@PathVariable Long id){
        return optionService.getOptionById(id);
    }

    @PutMapping("/{id}")
    public Option updateOption(@PathVariable Long id, @RequestBody Option option){
        option.setOption_id(id);
        return optionService.saveOption(option);
    }

    @DeleteMapping("/{id}")
    public String deleteOption(@PathVariable Long id){
        optionService.deleteOption(id);
        return "Deleted Successfully";
    }
}
