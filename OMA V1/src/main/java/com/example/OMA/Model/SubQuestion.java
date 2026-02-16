package com.example.OMA.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sub_question")
public class SubQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sub_question_id")
    private Integer subQuestionId;

    @Column(name = "main_question_id", nullable = false)
    private Integer mainQuestionId;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "weight", columnDefinition = "integer default 0")
    private Integer weight;

    public SubQuestion() {}

    public SubQuestion(Integer subQuestionId, Integer mainQuestionId, String questionText, Integer weight) {
        this.subQuestionId = subQuestionId;
        this.mainQuestionId = mainQuestionId;
        this.questionText = questionText;
        this.weight = weight;
    }

    public Integer getSubQuestionId() {
        return subQuestionId;
    }

    public void setSubQuestionId(Integer subQuestionId) {
        this.subQuestionId = subQuestionId;
    }

    public Integer getMainQuestionId() {
        return mainQuestionId;
    }

    public void setMainQuestionId(Integer mainQuestionId) {
        this.mainQuestionId = mainQuestionId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }
}
