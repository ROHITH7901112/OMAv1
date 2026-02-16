package com.example.OMA.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SubQuestionResponseDTO {

    @JsonProperty("sub_question_id")
    private Integer subQuestionId;
    @JsonProperty("question_text")
    private String subQuestionText;
    private Integer weight;
    private List<OptionResponseDTO> options;

    public SubQuestionResponseDTO() {}

    public SubQuestionResponseDTO(Integer subQuestionId, String subQuestionText, Integer weight,
                                  List<OptionResponseDTO> options) {
        this.subQuestionId = subQuestionId;
        this.subQuestionText = subQuestionText;
        this.weight = weight;
        this.options = options;
    }

    public Integer getSubQuestionId() {
        return subQuestionId;
    }

    public void setSubQuestionId(Integer subQuestionId) {
        this.subQuestionId = subQuestionId;
    }

    public String getSubQuestionText() {
        return subQuestionText;
    }

    public void setSubQuestionText(String subQuestionText) {
        this.subQuestionText = subQuestionText;
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
