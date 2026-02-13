# OMA Survey API Documentation

## Available REST Endpoints

### Category Endpoints
- **GET** `/api/category` - Get all categories
- **GET** `/api/category/{id}` - Get category by ID
- **POST** `/api/category` - Create new category
- **PUT** `/api/category/{id}` - Update category
- **DELETE** `/api/category/{id}` - Delete category

### Main Question Endpoints
- **GET** `/api/mainquestion` - Get all main questions (19 questions)
- **GET** `/api/mainquestion/{id}` - Get main question by ID
- **GET** `/api/mainquestion/category/{categoryId}` - Get questions by category
- **GET** `/api/mainquestion/type/{questionType}` - Get questions by type
- **POST** `/api/mainquestion` - Create new main question
- **PUT** `/api/mainquestion/{id}` - Update main question
- **DELETE** `/api/mainquestion/{id}` - Delete main question

### Sub-Question Endpoints
- **GET** `/api/subquestion` - Get all sub-questions (45 questions)
- **GET** `/api/subquestion/{id}` - Get sub-question by ID
- **GET** `/api/subquestion/mainquestion/{mainQuestionId}` - Get sub-questions by main question
- **POST** `/api/subquestion` - Create new sub-question
- **PUT** `/api/subquestion/{id}` - Update sub-question
- **DELETE** `/api/subquestion/{id}` - Delete sub-question

### Option Endpoints
- **GET** `/api/option` - Get all options (223 options)
- **GET** `/api/option/{id}` - Get option by ID
- **GET** `/api/option/mainquestion/{mainQuestionId}` - Get options by main question
- **GET** `/api/option/subquestion/{subQuestionId}` - Get options by sub-question
- **POST** `/api/option` - Create new option
- **PUT** `/api/option/{id}` - Update option
- **DELETE** `/api/option/{id}` - Delete option

## How to Get Nested JSON Structure

To get the complete nested JSON structure with categories containing main questions, sub-questions, and options, you can build a custom request or use the following approach:

### Current Workaround (Without Dedicated Endpoint)

Build the nested structure by making multiple API calls in your frontend:

```javascript
// 1. Fetch all categories
const categories = await fetch('/api/category').then(r => r.json());

// 2. For each category, fetch main questions
for(const category of categories) {
  const mainQuestions = await fetch(`/api/mainquestion/category/${category.categoryId}`)
    .then(r => r.json());
  
  // 3. For each main question, fetch sub-questions
  for(const mainQ of mainQuestions) {
    const subQuestions = await fetch(`/api/subquestion/mainquestion/${mainQ.mainQuestionId}`)
      .then(r => r.json());
    
    // 4. For each sub-question, fetch options
    for(const subQ of subQuestions) {
      const options = await fetch(`/api/option/subquestion/${subQ.subQuestionId}`)
        .then(r => r.json());
      subQ.options = options;
    }
    
    mainQ.subQuestions = subQuestions;
  }
  
  category.mainQuestions = mainQuestions;
}
```

## Expected Response Format

See `SAMPLE_RESPONSE.json` in the root directory for the complete nested JSON structure example.

### Sample Structure:
```json
[
  {
    "categoryId": 1,
    "categoryName": "Strategic Leadership",
    "mainQuestions": [
      {
        "mainQuestionId": 2,
        "questionText": "You as a leader...",
        "subQuestions": [
          {
            "subQuestionId": 1,
            "subQuestionText": "I clearly communicate vision",
            "options": [
              {
                "optionId": 10,
                "optionText": "1-Always True",
                "score": 5.0
              }
            ]
          }
        ]
      }
    ]
  }
]
```

## Database Schema

### Tables in `omav1` Database:
1. **category** - Assessment categories (8 records)
   - categoryId (PK)
   - category_text (name)
   - weight

2. **mainquestion** - Main survey questions (19 records)
   - main_question_id (PK)
   - category_id (FK to category)
   - question_text
   - question_type
   - weight

3. **sub_question** - Sub-questions (45 records)
   - sub_question_id (PK)
   - main_question_id (FK to mainquestion)
   - question_text
   - weight

4. **option** - Answer options (223 records)
   - option_id (PK)
   - main_question_id (FK to mainquestion)
   - sub_question_id (FK to sub_question, nullable)
   - option_text
   - score (BigDecimal)

## Running the Application

```bash
cd "OMA V1"
./mvnw spring-boot:run
```

Application will start on `http://localhost:8080`

## Upcoming Features

- [ ] Custom `/api/allquestions` endpoint to return fully nested structure (planned for Phase 2)
- [ ] UserResponse API for saving survey responses
- [ ] Results/Analytics endpoints for calculating scores by category
