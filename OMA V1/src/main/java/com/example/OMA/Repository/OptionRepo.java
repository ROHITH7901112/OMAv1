package com.example.OMA.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.Option;
import com.example.OMA.Model.MainQuestion;
import com.example.OMA.Model.SubQuestion;

@Repository
public interface OptionRepo extends JpaRepository<Option, Integer> {
    
    // Find all options by main question
    List<Option> findByMainQuestion(MainQuestion mainQuestion);
    
    // Find all options by main question ID
    List<Option> findByMainQuestionMainQuestionId(Integer mainQuestionId);
    
    // Find all options by sub question
    List<Option> findBySubQuestion(SubQuestion subQuestion);
    
    // Find all options by sub question ID
    List<Option> findBySubQuestionSubQuestionId(Integer subQuestionId);
}
