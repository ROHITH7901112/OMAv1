package com.example.OMA.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OMA.Model.SurveySubmission;

@Repository
public interface SurveySubmissionRepo extends JpaRepository<SurveySubmission, String> {

    List<SurveySubmission> findAllByOrderBySubmittedAtDesc();
}
