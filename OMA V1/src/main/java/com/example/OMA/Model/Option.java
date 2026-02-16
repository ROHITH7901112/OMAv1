package com.example.OMA.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "\"option\"")
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Integer optionId;

    @Column(name = "main_question_id")
    private Integer mainQuestionId;

    @Column(name = "sub_question_id")
    private Integer subQuestionId;

    @Column(name = "option_text", nullable = false, columnDefinition = "TEXT")
    private String optionText;

    @Column(name = "score")
    private BigDecimal score;

    public Option() {}

    public Option(Integer optionId, Integer mainQuestionId, Integer subQuestionId, String optionText, BigDecimal score) {
        this.optionId = optionId;
        this.mainQuestionId = mainQuestionId;
        this.subQuestionId = subQuestionId;
        this.optionText = optionText;
        this.score = score;
    }

    public Integer getOptionId() {
        return optionId;
    }

    public void setOptionId(Integer optionId) {
        this.optionId = optionId;
    }

    public Integer getMainQuestionId() {
        return mainQuestionId;
    }

    public void setMainQuestionId(Integer mainQuestionId) {
        this.mainQuestionId = mainQuestionId;
    }

    public Integer getSubQuestionId() {
        return subQuestionId;
    }

    public void setSubQuestionId(Integer subQuestionId) {
        this.subQuestionId = subQuestionId;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }
}
