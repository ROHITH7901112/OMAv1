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
@Table(name = "mainquestion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MainQuestion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "main_question_id")
    private Integer mainQuestionId;

    @ManyToOne
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_main_question_category"))
    private Category category;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "question_type")
    private String questionType;

    @Column(name = "weight")
    private Integer weight;

}
