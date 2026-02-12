# Assessment Questions - Normalized Data Structure Guide

## Overview
The assessment questions data has been normalized from a flat Excel structure into a properly relational database schema designed for:
- ✓ Frontend survey applications
- ✓ Score tracking and analytics
- ✓ Multi-user response management
- ✓ Scalability and data integrity

## Database Schema

### 1. **Categories Table**
Stores assessment categories (e.g., Leadership, Culture, etc.)
```
categories:
  - id (Primary Key)
  - category_name (Unique)
  - description
  - created_at
```

### 2. **Question Types Table**
Defines question format and scoring scale
```
question_types:
  - id (Primary Key)
  - type_name (e.g., "Rating (1 to 4)")
  - description
  - scale_min (e.g., 1)
  - scale_max (e.g., 4)
  - created_at
```

**Supported Types:**
- `Rating (1 to 4)` - Likert scale 1-4
- `Rating (1 to 5)` - Likert scale 1-5
- `Ranking (1 to 5)` - Ranking/sorting questions
- `NPS (0 to 10)` - Net Promoter Score
- `Freetext (VOC)` - Voice of Customer text responses

### 3. **Assessment Questions Table**
Core questions with metadata
```
assessment_questions:
  - id (Primary Key)
  - category_id (Foreign Key → categories)
  - question_type_id (Foreign Key → question_types)
  - question_number (e.g., 1.0, 2.0)
  - question_text
  - level_enum ('L', 'E', or 'L+E')
    • L = Leadership level
    • E = Employee level
    • L+E = Both
  - example (Sample context)
  - scoring_logic (Calculation rules)
  - circle_median (Median benchmark score)
  - circle_mean (Mean benchmark score)
  - circle_interpretation (e.g., "In green - empowered adaptibility")
  - is_active (Boolean)
  - created_at, updated_at
```

### 4. **Answer Options Table**
Individual answer choices for each question
```
answer_options:
  - id (Primary Key)
  - question_id (Foreign Key → assessment_questions)
  - option_text (e.g., "Strongly Agree", "Option A")
  - option_number (1, 2, 3, ...)
  - score_value (Points assigned to this option)
  - circle_mapping (Maps to circle interpretation)
  - created_at
```

**Example:**
```
Question: "Rate our culture" (Rating 1-4)
  Option 1: "Strongly Disagree" → Score: 1
  Option 2: "Disagree" → Score: 2
  Option 3: "Agree" → Score: 3
  Option 4: "Strongly Agree" → Score: 4
```

### 5. **User Responses Table**
Stores each user's survey responses
```
user_responses:
  - id (Primary Key)
  - user_id (Foreign Key to users table)
  - question_id (Foreign Key → assessment_questions)
  - selected_option_id (Foreign Key → answer_options)
  - text_response (For freetext questions)
  - score_points (Points earned)
  - response_date
  - created_at
```

## Setup Instructions

### Step 1: Run the Migration
```bash
cd /Users/rohith/OMAv1
./mvnw flyway:migrate
# or
flyway migrate
```

### Step 2: Normalize Existing Data
```bash
python3 normalize_assessment_data.py
```

### Step 3: Verify Data
View the normalized Excel structure:
```bash
# Downloads/Normalized_Assessment_Structure.xlsx
```

## API Endpoints (To Implement in Spring Boot)

### Get all categories
```
GET /api/assessment/categories
Response:
{
  "categories": [
    { "id": 1, "name": "Strategic Leadership", "questionCount": 5 },
    ...
  ]
}
```

### Get questions for a category
```
GET /api/assessment/categories/{categoryId}/questions
Response:
{
  "questions": [
    {
      "id": 1,
      "text": "How would you rate...",
      "type": "Rating (1 to 5)",
      "level": "L+E",
      "options": [
        { "id": 1, "text": "Strongly Disagree", "score": 1 },
        { "id": 2, "text": "Disagree", "score": 2 },
        ...
      ]
    },
    ...
  ]
}
```

### Get complete survey
```
GET /api/assessment/survey
Response:
{
  "categories": [
    {
      "id": 1,
      "name": "Strategic Leadership",
      "questions": [
        {
          "id": 1,
          "text": "Question text",
          "type": "Rating (1 to 5)",
          "options": [...]
        }
      ]
    }
  ]
}
```

### Submit response
```
POST /api/assessment/users/{userId}/responses
Body:
{
  "questionId": 1,
  "selectedOptionId": 3,
  "textResponse": null
}
```

### Get user results
```
GET /api/assessment/users/{userId}/results
Response:
{
  "userId": 101,
  "totalScore": 156.5,
  "maxScore": 200,
  "categoryResults": [
    {
      "categoryId": 1,
      "categoryName": "Strategic Leadership",
      "score": 18.5,
      "maxScore": 20,
      "percentage": 92.5
    }
  ],
  "circleInterpretation": "In green - empowered adaptibility"
}
```

## Frontend Integration Example

### React Component for Survey
```jsx
import React, { useState, useEffect } from 'react';

function SurveyForm() {
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Fetch survey structure
    fetch('/api/assessment/survey')
      .then(res => res.json())
      .then(data => setSurvey(data));
  }, []);

  const handleOptionSelect = (questionId, optionId) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const submitSurvey = async () => {
    const userId = 101; // Get from auth
    
    for (const [questionId, optionId] of Object.entries(responses)) {
      await fetch(`/api/assessment/users/${userId}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: parseInt(questionId),
          selectedOptionId: optionId
        })
      });
    }
    
    // Fetch and display results
    const results = await fetch(`/api/assessment/users/${userId}/results`)
      .then(res => res.json());
    
    console.log('Survey Results:', results);
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <div>
      {survey.categories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          {category.questions.map(question => (
            <div key={question.id}>
              <h3>{question.text}</h3>
              <div>
                {question.options.map(option => (
                  <label key={option.id}>
                    <input
                      type="radio"
                      name={`q${question.id}`}
                      value={option.id}
                      onChange={() => handleOptionSelect(question.id, option.id)}
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <button onClick={submitSurvey}>Submit Survey</button>
    </div>
  );
}

export default SurveyForm;
```

## Key SQL Queries

### Get Survey with All Options
```sql
SELECT 
    q.id, q.question_text, q.level_enum,
    qt.type_name, qt.scale_min, qt.scale_max,
    c.category_name,
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
GROUP BY q.id, q.question_text, q.level_enum, qt.type_name, 
         qt.scale_min, qt.scale_max, c.category_name
ORDER BY c.id, q.question_number;
```

### Calculate User Scores by Category
```sql
SELECT 
    c.category_name,
    COUNT(DISTINCT ur.question_id) as total_answered,
    AVG(ur.score_points) as average_score,
    SUM(ur.score_points) as total_score
FROM user_responses ur
JOIN assessment_questions q ON ur.question_id = q.id
JOIN categories c ON q.category_id = c.id
WHERE ur.user_id = ?
GROUP BY c.id, c.category_name
ORDER BY c.id;
```

## Benefits of Normalization

✓ **Data Integrity** - No duplicate data, referential integrity enforced
✓ **Scalability** - Easy to add new questions, categories, or question types
✓ **Reusability** - Same questions can be used across different surveys
✓ **Analytics** - Easy to aggregate scores by category, track trends
✓ **Multi-user** - Track responses for multiple users with proper relationships
✓ **Flexibility** - Questions can have variable number of options
✓ **Scoring** - Each option has associated point values
✓ **Benchmarking** - Circle metrics (median, mean) for comparison

## Files Created

- `db/migrations/V6__normalize_assessment_questions_schema.sql` - New schema
- `normalize_assessment_data.py` - Migration script
- `Downloads/Normalized_Assessment_Structure.xlsx` - Example structure
- `API_ENDPOINTS_EXAMPLE.java` - Frontend API patterns
