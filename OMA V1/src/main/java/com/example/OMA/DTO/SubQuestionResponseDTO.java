package com.example.OMA.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SubQuestionResponseDTO {

    @JsonProperty("sub_question_id")
    private Integer subQuestionId;
    @JsonProperty("question_text")
    private String subQuestionText;
    private List<OptionResponseDTO> options;

    public SubQuestionResponseDTO() {}

    public SubQuestionResponseDTO(Integer subQuestionId, String subQuestionText,
                                  List<OptionResponseDTO> options) {
        this.subQuestionId = subQuestionId;
        this.subQuestionText = subQuestionText;
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

    public List<OptionResponseDTO> getOptions() {
        return options;
    }

    public void setOptions(List<OptionResponseDTO> options) {
        this.options = options;
    }
}
