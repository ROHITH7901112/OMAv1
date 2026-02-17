package com.example.OMA.DTO;
 
import com.fasterxml.jackson.annotation.JsonProperty;
 
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
 
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OptionResponseDTO {
 
    @JsonProperty("option_id")
    private Integer optionId;
    @JsonProperty("option_text")
    private String optionText;
 
}