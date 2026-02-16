package com.example.OMA.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.MainQuestion;

@Repository
public interface MainQuestionRepo extends JpaRepository<MainQuestion, Integer> {

    List<MainQuestion> findAllByOrderByMainQuestionId();

    List<MainQuestion> findByCategoryId(Long categoryId);

    List<MainQuestion> findByQuestionType(String questionType);
}
