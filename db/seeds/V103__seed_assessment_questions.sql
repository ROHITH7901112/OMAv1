-- Seed data for normalized assessment tables

-- 1. Seed categories
INSERT INTO categories (category_name, description) VALUES
('Strategic Leadership and Vision', 'Leadership vision and strategic direction'),
('Governance and Decision-Making', 'Decision-making processes and governance'),
('Culture Integration', 'Organizational culture and values'),
('Leadership Capability and Succession', 'Leadership development and succession planning'),
('Change Agility', 'Ability to adapt to change'),
('Communication and Engagement', 'Internal communication and engagement'),
('Performance and Accountability', 'Performance management and accountability'),
('Growth and Progress', 'Growth opportunities and career progression'),
('eNPS', 'Employee Net Promoter Score'),
('Feedback', 'Feedback mechanisms and processes')
ON CONFLICT (category_name) DO NOTHING;

-- 2. Seed question types
INSERT INTO question_types (type_name, scale_min, scale_max, description) VALUES
('Rating (1 to 4)', 1, 4, 'Likert scale with 4 options'),
('Rating (1 to 5)', 1, 5, 'Likert scale with 5 options'),
('Ranking (1 to 5)', 1, 5, 'Ranking scale 1-5'),
('NPS (0 to 10)', 0, 10, 'Net Promoter Score 0-10'),
('Freetext (VOC)', NULL, NULL, 'Free text voice of customer'),
('Single Choice (out of 3)', 1, 3, 'Single choice from 3 options'),
('Single Choice (out of 4)', 1, 4, 'Single choice from 4 options'),
('Single Choice (out of 5)', 1, 5, 'Single choice from 5 options'),
('Multiple Choice (1 to 5)', 1, 5, 'Multiple choice 1-5 options'),
('Multiple Choice (1 to 5 incl. None of the above)', 1, 5, 'Multiple choice with None option'),
('Multiple Choice (1 to 5 incl. None of the above) - VOC', 1, 5, 'Multiple choice with VOC')
ON CONFLICT (type_name) DO NOTHING;

-- 3. Seed sample questions (first few from each category)
INSERT INTO assessment_questions_normalized 
(category_id, question_number, question_text, level_enum, question_type_id, 
 example, scoring_logic, circle_median, circle_mean, circle_interpretation, is_active)
SELECT c.id, 1.0, 'How would you rate our strategic vision?', 'L+E', qt.id,
       'Rate your agreement with the strategic direction', 'Average of responses', 4.0, 3.8,
       'In green - empowered adaptibility', true
FROM categories c, question_types qt
WHERE c.category_name = 'Strategic Leadership and Vision' AND qt.type_name = 'Rating (1 to 5)'
ON CONFLICT DO NOTHING;

INSERT INTO assessment_questions_normalized 
(category_id, question_number, question_text, level_enum, question_type_id, 
 example, scoring_logic, circle_median, circle_mean, circle_interpretation, is_active)
SELECT c.id, 2.0, 'Do you understand the company decision-making process?', 'L+E', qt.id,
       'Clarity of decision-making process', 'Average of responses', 3.5, 3.2,
       'Between yellow & green - moving towards empowered adaptibility', true
FROM categories c, question_types qt
WHERE c.category_name = 'Governance and Decision-Making' AND qt.type_name = 'Rating (1 to 4)'
ON CONFLICT DO NOTHING;

INSERT INTO assessment_questions_normalized 
(category_id, question_number, question_text, level_enum, question_type_id, 
 example, scoring_logic, circle_median, circle_mean, circle_interpretation, is_active)
SELECT c.id, 3.0, 'How well do you see our values reflected in daily work?', 'L+E', qt.id,
       'Living and breathing the values', 'Average of responses', 3.0, 3.0,
       'In yellow - controlled stability', true
FROM categories c, question_types qt
WHERE c.category_name = 'Culture Integration' AND qt.type_name = 'Rating (1 to 5)'
ON CONFLICT DO NOTHING;

-- 4. Seed answer options for sample questions
-- Answer options for "How would you rate our strategic vision?" (Rating 1-5)
INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Strongly Disagree', 1, 1.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How would you rate our strategic vision?' AND q.question_number = 1.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Disagree', 2, 2.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How would you rate our strategic vision?' AND q.question_number = 1.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Agree', 3, 3.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How would you rate our strategic vision?' AND q.question_number = 1.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Strongly Agree', 4, 4.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How would you rate our strategic vision?' AND q.question_number = 1.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Strongly Agree (5)', 5, 5.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How would you rate our strategic vision?' AND q.question_number = 1.0
ON CONFLICT DO NOTHING;

-- Answer options for "Do you understand the company decision-making process?" (Rating 1-4)
INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Not at all', 1, 1.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'Do you understand the company decision-making process?' AND q.question_number = 2.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Somewhat', 2, 2.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'Do you understand the company decision-making process?' AND q.question_number = 2.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Mostly', 3, 3.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'Do you understand the company decision-making process?' AND q.question_number = 2.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Completely', 4, 4.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'Do you understand the company decision-making process?' AND q.question_number = 2.0
ON CONFLICT DO NOTHING;

-- Answer options for "How well do you see our values reflected in daily work?" (Rating 1-5)
INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Not at all', 1, 1.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How well do you see our values reflected in daily work?' AND q.question_number = 3.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Somewhat', 2, 2.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How well do you see our values reflected in daily work?' AND q.question_number = 3.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Moderately', 3, 3.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How well do you see our values reflected in daily work?' AND q.question_number = 3.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Mostly', 4, 4.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How well do you see our values reflected in daily work?' AND q.question_number = 3.0
ON CONFLICT DO NOTHING;

INSERT INTO answer_options (question_id, option_text, option_number, score_value, circle_mapping)
SELECT q.id, 'Completely', 5, 5.0, NULL
FROM assessment_questions_normalized q
WHERE q.question_text = 'How well do you see our values reflected in daily work?' AND q.question_number = 3.0
ON CONFLICT DO NOTHING;
