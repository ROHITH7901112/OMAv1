package com.example.OMA.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.Question;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Long>{
    
}
