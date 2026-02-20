package com.example.OMA.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "survey_response")
public class SurveyResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id")
    private Long responseId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", referencedColumnName = "session_id", nullable = false)
    @JsonIgnore
    private SurveySubmission submission;

    @Column(name = "main_question_id", nullable = false)
    private Integer mainQuestionId;

    @Column(name = "sub_question_id")
    private Integer subQuestionId;

    @Column(name = "option_id")
    private Integer optionId;

    @Column(name = "free_text", columnDefinition = "TEXT")
    private String freeText;

    @Column(name = "rank_position")
    private Integer rankPosition;

    @Column(name = "category_id", nullable = false)
    private Integer categoryId;

    public SurveyResponse() {}

    public SurveyResponse(SurveySubmission submission, Integer mainQuestionId, Integer subQuestionId,
                           Integer optionId, String freeText, Integer rankPosition, Integer categoryId) {
        this.submission = submission;
        this.mainQuestionId = mainQuestionId;
        this.subQuestionId = subQuestionId;
        this.optionId = optionId;
        this.freeText = freeText;
        this.rankPosition = rankPosition;
        this.categoryId = categoryId;
    }

    public Long getResponseId() { return responseId; }
    public void setResponseId(Long responseId) { this.responseId = responseId; }

    public SurveySubmission getSubmission() { return submission; }
    public void setSubmission(SurveySubmission submission) { this.submission = submission; }

    public Integer getMainQuestionId() { return mainQuestionId; }
    public void setMainQuestionId(Integer mainQuestionId) { this.mainQuestionId = mainQuestionId; }

    public Integer getSubQuestionId() { return subQuestionId; }
    public void setSubQuestionId(Integer subQuestionId) { this.subQuestionId = subQuestionId; }

    public Integer getOptionId() { return optionId; }
    public void setOptionId(Integer optionId) { this.optionId = optionId; }

    public String getFreeText() { return freeText; }
    public void setFreeText(String freeText) { this.freeText = freeText; }

    public Integer getRankPosition() { return rankPosition; }
    public void setRankPosition(Integer rankPosition) { this.rankPosition = rankPosition; }

    public Integer getCategoryId() { return categoryId; }
    public void setCategoryId(Integer categoryId) { this.categoryId = categoryId; }
}
