package com.example.OMA.Model.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CategorySurveyDTO {
    @JsonProperty("category_id")
    private Integer categoryId;
    @JsonProperty("category_text")
    private String categoryText;
    private Integer weight;
    private List<MainQuestionResponseDTO> questions;

    public CategorySurveyDTO(Integer categoryId, String categoryText, Integer weight, 
                            List<MainQuestionResponseDTO> questions) {
        this.categoryId = categoryId;
        this.categoryText = categoryText;
        this.weight = weight;
        this.questions = questions;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryText() {
        return categoryText;
    }

    public void setCategoryText(String categoryText) {
        this.categoryText = categoryText;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public List<MainQuestionResponseDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<MainQuestionResponseDTO> questions) {
        this.questions = questions;
    }
}
