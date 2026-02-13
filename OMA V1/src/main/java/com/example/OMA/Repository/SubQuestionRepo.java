package com.example.OMA.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.SubQuestion;
import com.example.OMA.Model.MainQuestion;

@Repository
public interface SubQuestionRepo extends JpaRepository<SubQuestion, Integer> {
    
    // Find all sub questions by main question
    List<SubQuestion> findByMainQuestion(MainQuestion mainQuestion);
    
    // Find all sub questions by main question ID
    List<SubQuestion> findByMainQuestionMainQuestionId(Integer mainQuestionId);
}
