package com.example.OMA.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CategorySurveyDTO {

    @JsonProperty("category_id")
    private Long categoryId;
    @JsonProperty("category_text")
    private String categoryName;
    private Integer weight;
    @JsonProperty("questions")
    private List<MainQuestionResponseDTO> mainQuestions;

    public CategorySurveyDTO() {}

    public CategorySurveyDTO(Long categoryId, String categoryName, Integer weight,
                             List<MainQuestionResponseDTO> mainQuestions) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.weight = weight;
        this.mainQuestions = mainQuestions;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public List<MainQuestionResponseDTO> getMainQuestions() {
        return mainQuestions;
    }

    public void setMainQuestions(List<MainQuestionResponseDTO> mainQuestions) {
        this.mainQuestions = mainQuestions;
    }
}
