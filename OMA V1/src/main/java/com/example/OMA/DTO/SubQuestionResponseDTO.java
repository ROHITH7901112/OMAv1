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
public class SubQuestionResponseDTO {
 
    @JsonProperty("sub_question_id")
    private Integer subQuestionId;
    @JsonProperty("question_text")
    private String subQuestionText;
    private List<OptionResponseDTO> options;
}