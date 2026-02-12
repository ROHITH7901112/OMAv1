#!/usr/bin/env python3
"""
Example Spring Boot API endpoints to fetch normalized assessment data
This is a Java template - showing the structure you should implement
"""

"""
EXAMPLE SPRING BOOT JAVA CONTROLLER:

@RestController
@RequestMapping("/api/assessment")
public class AssessmentController {
    
    @Autowired
    private AssessmentRepository assessmentRepo;
    
    // 1. Get all categories with questions count
    @GetMapping("/categories")
    public List<CategoryDTO> getCategories() {
        // Query: SELECT c.*, COUNT(q.id) as question_count 
        //        FROM categories c LEFT JOIN assessment_questions q ON c.id = q.category_id
        //        GROUP BY c.id
    }
    
    // 2. Get all questions for a category
    @GetMapping("/categories/{categoryId}/questions")
    public List<QuestionDTO> getQuestionsByCategory(@PathVariable Long categoryId) {
        // Query: SELECT q.*, qt.type_name, c.category_name 
        //        FROM assessment_questions q
        //        JOIN question_types qt ON q.question_type_id = qt.id
        //        JOIN categories c ON q.category_id = c.id
        //        WHERE q.category_id = ? AND q.is_active = true
    }
    
    // 3. Get single question with all options
    @GetMapping("/questions/{questionId}")
    public QuestionDetailDTO getQuestion(@PathVariable Long questionId) {
        // Query: SELECT q.*, qt.type_name, c.category_name 
        //        FROM assessment_questions q
        //        JOIN question_types qt ON q.question_type_id = qt.id
        //        JOIN categories c ON q.category_id = c.id
        //        WHERE q.id = ?
        // Also fetch: SELECT * FROM answer_options WHERE question_id = ?
    }
    
    // 4. Submit user response
    @PostMapping("/users/{userId}/responses")
    public ResponseDTO submitResponse(@PathVariable Long userId, 
                                      @RequestBody UserResponseDTO response) {
        // INSERT INTO user_responses (user_id, question_id, selected_option_id, score_points)
        // VALUES (?, ?, ?, ?)
    }
    
    // 5. Get survey results for a user
    @GetMapping("/users/{userId}/results")
    public SurveyResultDTO getUserResults(@PathVariable Long userId) {
        // Query user responses grouped by category with scores
    }
}

DTO CLASSES:

public class CategoryDTO {
    private Long id;
    private String categoryName;
    private Integer questionCount;
}

public class QuestionDTO {
    private Long id;
    private String questionText;
    private String levelEnum; // L, E, L+E
    private String questionType;
    private String categoryName;
    private List<OptionDTO> options;
}

public class OptionDTO {
    private Long id;
    private String optionText;
    private Integer optionNumber;
    private Double scoreValue;
    private String circleMapping;
}

public class UserResponseDTO {
    private Long questionId;
    private Long selectedOptionId;
    private String textResponse;
}

public class SurveyResultDTO {
    private Long userId;
    private Double totalScore;
    private Map<String, CategoryResultDTO> categoryResults;
    private String circleInterpretation;
}
"""

# SQL QUERIES FOR REFERENCE:

# 1. Get all questions with options (for frontend survey)
"""
SELECT 
    q.id,
    q.question_text,
    q.level_enum,
    qt.type_name,
    qt.scale_min,
    qt.scale_max,
    c.category_name,
    q.example,
    q.circle_interpretation,
    json_agg(json_build_object(
        'id', ao.id,
        'text', ao.option_text,
        'number', ao.option_number,
        'score', ao.score_value
    ) ORDER BY ao.option_number) as options
FROM assessment_questions q
LEFT JOIN question_types qt ON q.question_type_id = qt.id
LEFT JOIN categories c ON q.category_id = c.id
LEFT JOIN answer_options ao ON q.id = ao.question_id
WHERE q.is_active = true
GROUP BY q.id, q.question_text, q.level_enum, qt.type_name, qt.scale_min, 
         qt.scale_max, c.category_name, q.example, q.circle_interpretation
ORDER BY c.id, q.question_number;
"""

# 2. Calculate user survey score by category
"""
SELECT 
    c.category_name,
    COUNT(DISTINCT ur.question_id) as total_questions,
    COUNT(DISTINCT CASE WHEN ur.score_points IS NOT NULL THEN ur.question_id END) as answered,
    AVG(COALESCE(ur.score_points, 0)) as average_score,
    SUM(COALESCE(ur.score_points, 0)) as total_score
FROM user_responses ur
JOIN assessment_questions q ON ur.question_id = q.id
JOIN categories c ON q.category_id = c.id
WHERE ur.user_id = ?
GROUP BY c.id, c.category_name
ORDER BY c.id;
"""

# 3. Get user's specific responses
"""
SELECT 
    q.id,
    q.question_text,
    c.category_name,
    ao.option_text,
    ur.score_points,
    ur.text_response,
    ur.response_date
FROM user_responses ur
JOIN assessment_questions q ON ur.question_id = q.id
LEFT JOIN answer_options ao ON ur.selected_option_id = ao.id
LEFT JOIN categories c ON q.category_id = c.id
WHERE ur.user_id = ?
ORDER BY c.id, q.question_number;
"""
