package com.example.OMA.Model.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OptionResponseDTO {
    @JsonProperty("option_id")
    private Integer optionId;
    @JsonProperty("option_text")
    private String optionText;
    private Object score;

    public OptionResponseDTO(Integer optionId, String optionText, Object score) {
        this.optionId = optionId;
        this.optionText = optionText;
        this.score = score;
    }

    public Integer getOptionId() {
        return optionId;
    }

    public void setOptionId(Integer optionId) {
        this.optionId = optionId;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    public Object getScore() {
        return score;
    }

    public void setScore(Object score) {
        this.score = score;
    }
}
