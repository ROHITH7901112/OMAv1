package com.example.OMA.DTO;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SubQuestionResponseDTO {
    @JsonProperty("sub_question_id")
    private Integer subQuestionId;
    @JsonProperty("question_text")
    private String questionText;
    private Integer weight;
    private List<OptionResponseDTO> options;

    public SubQuestionResponseDTO(Integer subQuestionId, String questionText, Integer weight, List<OptionResponseDTO> options) {
        this.subQuestionId = subQuestionId;
        this.questionText = questionText;
        this.weight = weight;
        this.options = options;
    }

    public Integer getSubQuestionId() {
        return subQuestionId;
    }

    public void setSubQuestionId(Integer subQuestionId) {
        this.subQuestionId = subQuestionId;
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

    public List<OptionResponseDTO> getOptions() {
        return options;
    }

    public void setOptions(List<OptionResponseDTO> options) {
        this.options = options;
    }
}
