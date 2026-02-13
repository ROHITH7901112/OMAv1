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
import java.math.BigDecimal;

@Entity
@Table(name = "\"option\"")
public class Option {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Integer optionId;

    @ManyToOne
    @JoinColumn(name = "main_question_id", nullable = false, foreignKey = @ForeignKey(name = "fk_option_main_question"))
    private MainQuestion mainQuestion;

    @ManyToOne
    @JoinColumn(name = "sub_question_id", foreignKey = @ForeignKey(name = "fk_option_sub_question"))
    private SubQuestion subQuestion;

    @Column(name = "option_text", nullable = false, columnDefinition = "TEXT")
    private String optionText;

    @Column(name = "score")
    private BigDecimal score;

    public Option() {}

    public Option(Integer optionId, MainQuestion mainQuestion, SubQuestion subQuestion, String optionText, BigDecimal score) {
        this.optionId = optionId;
        this.mainQuestion = mainQuestion;
        this.subQuestion = subQuestion;
        this.optionText = optionText;
        this.score = score;
    }

    public Integer getOptionId() {
        return optionId;
    }

    public void setOptionId(Integer optionId) {
        this.optionId = optionId;
    }

    public MainQuestion getMainQuestion() {
        return mainQuestion;
    }

    public void setMainQuestion(MainQuestion mainQuestion) {
        this.mainQuestion = mainQuestion;
    }

    public SubQuestion getSubQuestion() {
        return subQuestion;
    }

    public void setSubQuestion(SubQuestion subQuestion) {
        this.subQuestion = subQuestion;
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
