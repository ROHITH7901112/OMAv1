package com.example.OMA.Model;
 
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
 
import java.math.BigDecimal;
 
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
 
@Entity
@Table(name = "option")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Option {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Integer optionId;
 
    @Column(name = "main_question_id")
    private Integer mainQuestionId;
 
    @Column(name = "sub_question_id")
    private Integer subQuestionId;
 
    @Column(name = "option_text", nullable = false, columnDefinition = "TEXT")
    private String optionText;
 
    @Column(name = "score")
    private BigDecimal score;
 
}