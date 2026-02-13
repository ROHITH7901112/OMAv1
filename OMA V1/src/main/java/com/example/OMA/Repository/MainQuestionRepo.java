package com.example.OMA.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.MainQuestion;
import com.example.OMA.Model.Category;

@Repository
public interface MainQuestionRepo extends JpaRepository<MainQuestion, Integer> {
    
    // Find all questions by category
    List<MainQuestion> findByCategory(Category category);
    
    // Find all questions by category ID
    List<MainQuestion> findByCategoryCategoryId(Long categoryId);
    
    // Find questions by type
    List<MainQuestion> findByQuestionType(String questionType);
}
