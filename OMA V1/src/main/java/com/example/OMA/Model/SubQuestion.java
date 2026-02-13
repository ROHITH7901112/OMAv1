package com.example.OMA.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sub_question")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubQuestion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sub_question_id")
    private Integer subQuestionId;

    @ManyToOne
    @JoinColumn(name = "main_question_id", nullable = false, foreignKey = @ForeignKey(name = "fk_sub_question_main_question"))
    private MainQuestion mainQuestion;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "weight", columnDefinition = "integer default 0")
    private Integer weight;

}
