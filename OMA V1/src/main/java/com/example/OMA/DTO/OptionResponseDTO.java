package com.example.OMA.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OptionResponseDTO {

    @JsonProperty("option_id")
    private Integer optionId;
    @JsonProperty("option_text")
    private String optionText;
    private Double score;

    public OptionResponseDTO() {}

    public OptionResponseDTO(Integer optionId, String optionText, Double score) {
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

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}
