package com.example.OMA.DTO;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MainQuestionResponseDTO {
    @JsonProperty("main_question_id")
    private Integer mainQuestionId;
    @JsonProperty("question_text")
    private String questionText;
    @JsonProperty("question_type")
    private String questionType;
    private Integer weight;
    private List<OptionResponseDTO> options;
    @JsonProperty("sub_questions")
    private List<SubQuestionResponseDTO> subQuestions;

    public MainQuestionResponseDTO(Integer mainQuestionId, String questionText, String questionType, 
                                   Integer weight, List<OptionResponseDTO> options, 
                                   List<SubQuestionResponseDTO> subQuestions) {
        this.mainQuestionId = mainQuestionId;
        this.questionText = questionText;
        this.questionType = questionType;
        this.weight = weight;
        this.options = options;
        this.subQuestions = subQuestions;
    }

    public Integer getMainQuestionId() {
        return mainQuestionId;
    }

    public void setMainQuestionId(Integer mainQuestionId) {
        this.mainQuestionId = mainQuestionId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
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

    public List<SubQuestionResponseDTO> getSubQuestions() {
        return subQuestions;
    }

    public void setSubQuestions(List<SubQuestionResponseDTO> subQuestions) {
        this.subQuestions = subQuestions;
    }
}
