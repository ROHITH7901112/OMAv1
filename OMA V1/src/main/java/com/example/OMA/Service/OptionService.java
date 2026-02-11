package com.example.OMA.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.OMA.Model.Option;
import com.example.OMA.Repository.OptionRepo;

@Service
public class OptionService {

    private final OptionRepo optionRepo;
    public OptionService(OptionRepo optionRepo){
        this.optionRepo = optionRepo;
    }

    //create and update
    public Option saveOption(Option option){
        return optionRepo.save(option);
    }

    // read all
    public List<Option> getOption(){
        return optionRepo.findAll();
    }
    
    // read by id
    public Option getOptionById(Long id){
        return optionRepo.findById(id).orElse(null);
    }

    //delete
    public void deleteOption(Long id){
        optionRepo.deleteById(id);
    }
}
