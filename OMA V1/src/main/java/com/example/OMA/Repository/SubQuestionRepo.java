package com.example.OMA.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.SubQuestion;

@Repository
public interface SubQuestionRepo extends JpaRepository<SubQuestion, Integer> {

    List<SubQuestion> findAllByOrderBySubQuestionId();

    List<SubQuestion> findByMainQuestionId(Integer mainQuestionId);
}
