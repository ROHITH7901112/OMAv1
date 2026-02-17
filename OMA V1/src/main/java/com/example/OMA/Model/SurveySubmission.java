package com.example.OMA.Model;

import jakarta.persistence.*;
import org.springframework.data.domain.Persistable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "survey_submission")
public class SurveySubmission implements Persistable<String> {

    @Id
    @Column(name = "session_id")
    private String sessionId;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SurveyResponse> responses = new ArrayList<>();

    @Transient
    private boolean isNew = true;

    public SurveySubmission() {
        this.createdAt = LocalDateTime.now();
    }

    public SurveySubmission(String sessionId, LocalDateTime startedAt, LocalDateTime submittedAt) {
        this.sessionId = sessionId;
        this.startedAt = startedAt;
        this.submittedAt = submittedAt;
        this.createdAt = LocalDateTime.now();
    }

    @Override
    public String getId() { return sessionId; }

    @Override
    public boolean isNew() { return isNew; }

    @PostLoad
    @PostPersist
    void markNotNew() { this.isNew = false; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<SurveyResponse> getResponses() { return responses; }
    public void setResponses(List<SurveyResponse> responses) { this.responses = responses; }

    public void addResponse(SurveyResponse response) {
        responses.add(response);
        response.setSubmission(this);
    }
}
