-- Create assessment questions table from Book1.xlsx data
CREATE TABLE IF NOT EXISTS assessment_questions (
    id SERIAL PRIMARY KEY,
    "Category" VARCHAR(255),
    "#" NUMERIC,
    "Question" TEXT,
    "L / E / L+E" VARCHAR(50),
    "Question Type" VARCHAR(100),
    "Answer Options" TEXT,
    "Circle # / answer option" VARCHAR(100),
    "Scoring logic" VARCHAR(255),
    "Example" TEXT,
    "Circle #/ question (Median)" NUMERIC(5,2),
    "Circle #/ question (Mean)" NUMERIC(5,2),
    "Circle interpretation" TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category for faster queries
CREATE INDEX idx_assessment_questions_category ON assessment_questions("Category");
CREATE INDEX idx_assessment_questions_question_type ON assessment_questions("Question Type");
