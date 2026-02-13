package com.example.OMA.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "sub_question")
public class SubQuestion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sub_question_id")
    private Integer subQuestionId;

    @ManyToOne
    @JoinColumn(name = "main_question_id", nullable = false, foreignKey = @ForeignKey(name = "fk_sub_question_main_question"))
    private MainQuestion mainQuestion;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "weight", columnDefinition = "integer default 0")
    private Integer weight;

    public SubQuestion() {}

    public SubQuestion(Integer subQuestionId, MainQuestion mainQuestion, String questionText, Integer weight) {
        this.subQuestionId = subQuestionId;
        this.mainQuestion = mainQuestion;
        this.questionText = questionText;
        this.weight = weight;
    }

    public Integer getSubQuestionId() {
        return subQuestionId;
    }

    public void setSubQuestionId(Integer subQuestionId) {
        this.subQuestionId = subQuestionId;
    }

    public MainQuestion getMainQuestion() {
        return mainQuestion;
    }

    public void setMainQuestion(MainQuestion mainQuestion) {
        this.mainQuestion = mainQuestion;
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
