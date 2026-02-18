package com.example.OMA.Controller;

import com.example.OMA.DTO.SaveAnswerDTO;
import com.example.OMA.DTO.SurveySubmissionDTO;
import com.example.OMA.Model.SurveySubmission;
import com.example.OMA.Service.SurveyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/survey")
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    /** Incrementally save one answer (called on Next click, debounced 2 s). */
    @PostMapping("/save-answer")
    public ResponseEntity<Map<String, Object>> saveAnswer(@RequestBody SaveAnswerDTO dto) {
        try {
            surveyService.saveAnswer(dto);
            Map<String, Object> body = new HashMap<>();
            body.put("success", true);
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> err = new HashMap<>();
            err.put("success", false);
            err.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    /** Final submit — stamps submittedAt and re-saves all answers. */
    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitSurvey(@RequestBody SurveySubmissionDTO dto) {
        try {
            SurveySubmission saved = surveyService.submitSurvey(dto);

            Map<String, Object> body = new HashMap<>();
            body.put("success", true);
            body.put("message", "Survey submitted successfully");
            body.put("sessionId", saved.getSessionId());
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> err = new HashMap<>();
            err.put("success", false);
            err.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    /**
     * Recover saved answers for a session (used when localStorage is cleared).
     * Returns the responses map in the same format the frontend stores it,
     * so it can be loaded directly into state.
     */
    @GetMapping("/session/{sessionId}/responses")
    public ResponseEntity<Map<String, Object>> getSessionResponses(@PathVariable String sessionId) {
        try {
            SurveySubmission submission = surveyService.getSubmissionBySessionId(sessionId);
            Map<String, Object> body = new HashMap<>();

            if (submission == null) {
                body.put("found", false);
                body.put("responses", Map.of());
                return ResponseEntity.ok(body);
            }

            // If already submitted, don't allow recovery
            if (submission.getSubmittedAt() != null) {
                body.put("found", true);
                body.put("submitted", true);
                body.put("responses", Map.of());
                return ResponseEntity.ok(body);
            }

            Map<String, Object> responses = surveyService.getResponsesMapForSession(sessionId);
            body.put("found", true);
            body.put("submitted", false);
            body.put("responses", responses);
            body.put("startedAt", submission.getStartedAt() != null
                    ? submission.getStartedAt().toString() : null);
            return ResponseEntity.ok(body);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> err = new HashMap<>();
            err.put("found", false);
            err.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }


    @GetMapping("survey_score")
    public Map<Integer, BigDecimal> getScore(){
        return surveyService.getAllResponse();
    }

}
