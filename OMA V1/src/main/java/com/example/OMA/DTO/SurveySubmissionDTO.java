package com.example.OMA.DTO;

import java.util.Map;

public class SurveySubmissionDTO {

    private String sessionId;
    private String startedAt;
    private String submittedAt;
    private Map<String, Object> responses;

    public SurveySubmissionDTO() {}

    public String getSessionId()                  { return sessionId; }
    public void   setSessionId(String sessionId)  { this.sessionId = sessionId; }

    public String getStartedAt()                  { return startedAt; }
    public void   setStartedAt(String startedAt)  { this.startedAt = startedAt; }

    public String getSubmittedAt()                    { return submittedAt; }
    public void   setSubmittedAt(String submittedAt)  { this.submittedAt = submittedAt; }

    public Map<String, Object> getResponses()                     { return responses; }
    public void                setResponses(Map<String, Object> r){ this.responses = r; }
}
