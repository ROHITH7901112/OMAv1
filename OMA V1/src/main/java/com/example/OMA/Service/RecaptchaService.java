package com.example.OMA.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class RecaptchaService {

    private static final String RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    @Value("${recaptcha.secret.key}")
    private String recaptchaSecretKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public RecaptchaService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * Verifies a reCAPTCHA v3 token against Google's verification API.
     * 
     * @param token The reCAPTCHA token from the client
     * @return A map containing:
     *         - "success": boolean indicating if the token is valid
     *         - "score": float between 0.0 and 1.0 (higher = more likely human)
     *         - "action": the action name (should be "submit")
     *         - "message": error message if verification failed
     */
    public Map<String, Object> verifyToken(String token) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (token == null || token.isEmpty()) {
                response.put("success", false);
                response.put("message", "reCAPTCHA token is missing");
                return response;
            }

            // Prepare request parameters
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("secret", recaptchaSecretKey);
            requestBody.put("response", token);

            // Call Google's verification API
            String verificationUrl = RECAPTCHA_VERIFY_URL + "?secret=" + recaptchaSecretKey + "&response=" + token;
            String result = restTemplate.postForObject(verificationUrl, null, String.class);

            // Parse the response
            JsonNode jsonNode = objectMapper.readTree(result);

            boolean success = jsonNode.get("success").asBoolean();
            double score = jsonNode.has("score") ? jsonNode.get("score").asDouble() : 0.0;
            String action = jsonNode.has("action") ? jsonNode.get("action").asText() : "";

            response.put("success", success);
            response.put("score", score);
            response.put("action", action);

            // Log for debugging
            System.out.println("reCAPTCHA Verification: success=" + success + ", score=" + score + ", action=" + action);

            return response;

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Exception during reCAPTCHA verification: " + e.getMessage());
            e.printStackTrace();
            return response;
        }
    }

    /**
     * Checks if the reCAPTCHA verification was successful and score is above threshold.
     * 
     * @param verificationResult The result from verifyToken()
     * @param scoreThreshold Minimum score required (typically 0.5)
     * @return true if verification passed and score is acceptable
     */
    public boolean isValidScore(Map<String, Object> verificationResult, double scoreThreshold) {
        Boolean success = (Boolean) verificationResult.get("success");
        Double score = (Double) verificationResult.get("score");

        return success != null && success && score != null && score >= scoreThreshold;
    }
}
