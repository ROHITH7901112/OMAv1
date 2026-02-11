package com.example.OMA.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Option")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Option {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long option_id;

    @ManyToOne
    @JoinColumn(name="question_id", nullable=false)
    private Question question;

    private String label;

    @Column(nullable=false)
    private String option_text;
    private int score;
}
