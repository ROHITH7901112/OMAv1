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
    @JsonProperty("sub_questions")
    private List<SubQuestionResponseDTO> subQuestions;
    private List<OptionResponseDTO> options;

    public MainQuestionResponseDTO() {}

    public MainQuestionResponseDTO(Integer mainQuestionId, String questionText, String questionType,
                                   List<SubQuestionResponseDTO> subQuestions,
                                   List<OptionResponseDTO> options) {
        this.mainQuestionId = mainQuestionId;
        this.questionText = questionText;
        this.questionType = questionType;
        this.subQuestions = subQuestions;
        this.options = options;
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

    public List<SubQuestionResponseDTO> getSubQuestions() {
        return subQuestions;
    }

    public void setSubQuestions(List<SubQuestionResponseDTO> subQuestions) {
        this.subQuestions = subQuestions;
    }

    public List<OptionResponseDTO> getOptions() {
        return options;
    }

    public void setOptions(List<OptionResponseDTO> options) {
        this.options = options;
    }
}
