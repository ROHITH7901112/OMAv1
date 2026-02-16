package com.example.OMA.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.Option;

@Repository
public interface OptionRepo extends JpaRepository<Option, Integer> {

    List<Option> findAllByOrderByOptionId();

    List<Option> findByMainQuestionId(Integer mainQuestionId);

    List<Option> findBySubQuestionId(Integer subQuestionId);
}
