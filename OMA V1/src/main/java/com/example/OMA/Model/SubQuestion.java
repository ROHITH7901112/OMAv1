package com.example.OMA.Model;
 
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
 
@Entity
@Table(name = "sub_question")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubQuestion {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sub_question_id")
    private Integer subQuestionId;
 
    @Column(name = "main_question_id", nullable = false)
    private Integer mainQuestionId;
 
    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;
 
    @Column(name = "weight", columnDefinition = "integer default 0")
    private Integer weight;
 
}