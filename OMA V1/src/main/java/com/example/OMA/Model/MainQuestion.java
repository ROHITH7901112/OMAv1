package com.example.OMA.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mainquestion")
public class MainQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "main_question_id")
    private Integer mainQuestionId;

    @Column(name = "category_id", nullable = false)
    private Long categoryId;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "question_type")
    private String questionType;

    @Column(name = "weight")
    private Integer weight;

    public MainQuestion() {}

    public MainQuestion(Integer mainQuestionId, Long categoryId, String questionText, String questionType, Integer weight) {
        this.mainQuestionId = mainQuestionId;
        this.categoryId = categoryId;
        this.questionText = questionText;
        this.questionType = questionType;
        this.weight = weight;
    }

    public Integer getMainQuestionId() {
        return mainQuestionId;
    }

    public void setMainQuestionId(Integer mainQuestionId) {
        this.mainQuestionId = mainQuestionId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }
}
