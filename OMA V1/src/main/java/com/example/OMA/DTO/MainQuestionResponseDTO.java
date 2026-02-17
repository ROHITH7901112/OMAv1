package com.example.OMA.DTO;
 
import java.util.List;
 
import com.fasterxml.jackson.annotation.JsonProperty;
 
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
 
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
 
}