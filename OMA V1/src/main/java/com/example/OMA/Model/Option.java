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
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Option")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Option {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long optionId;

    @ManyToOne
    @JoinColumn(name="question_id", nullable=false)
    private Question question;

    @Column(name = "option_type")
    private String optionType;

    @Column(nullable=false, name = "option_text")
    private String optionText;
    private Integer score;
}
