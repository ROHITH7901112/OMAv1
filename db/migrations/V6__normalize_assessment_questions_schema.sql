-- Normalized schema for assessment questions with proper structure for frontend
-- DROP TABLE IF EXISTS answer_options CASCADE;
-- DROP TABLE IF EXISTS assessment_questions CASCADE;
-- DROP TABLE IF EXISTS categories CASCADE;
-- DROP TABLE IF EXISTS question_types CASCADE;

-- 1. Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Question types table
CREATE TABLE IF NOT EXISTS question_types (
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    scale_min INTEGER,
    scale_max INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Normalized assessment questions table (rename existing one)
CREATE TABLE IF NOT EXISTS assessment_questions_normalized (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    question_number NUMERIC,
    question_text TEXT NOT NULL,
    level_enum VARCHAR(50), -- L, E, or L+E
    question_type_id INTEGER REFERENCES question_types(id),
    example TEXT,
    scoring_logic VARCHAR(255),
    circle_median NUMERIC(5,2),
    circle_mean NUMERIC(5,2),
    circle_interpretation TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Answer options table (for rating/ranking questions)
CREATE TABLE IF NOT EXISTS answer_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES assessment_questions_normalized(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    option_number INTEGER,
    score_value NUMERIC(5,2),
    circle_mapping VARCHAR(100), -- Maps to circle interpretation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. User responses table (for storing survey responses)
CREATE TABLE IF NOT EXISTS user_responses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL REFERENCES assessment_questions_normalized(id),
    selected_option_id INTEGER REFERENCES answer_options(id),
    text_response TEXT,
    score_points NUMERIC(5,2),
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_assessment_questions_normalized_category_id ON assessment_questions_normalized(category_id);
CREATE INDEX idx_assessment_questions_normalized_type_id ON assessment_questions_normalized(question_type_id);
CREATE INDEX idx_assessment_questions_normalized_active ON assessment_questions_normalized(is_active);
CREATE INDEX idx_answer_options_question_id ON answer_options(question_id);
CREATE INDEX idx_user_responses_user_id ON user_responses(user_id);
CREATE INDEX idx_user_responses_question_id ON user_responses(question_id);
CREATE INDEX idx_user_responses_date ON user_responses(response_date);
