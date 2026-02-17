-- ============================================================
-- survey_submission : one row per completed survey attempt.
-- session_id is the unique anonymous identifier for the user;
-- no login required, so this is how we group all answers.
-- ============================================================
CREATE TABLE survey_submission (

    session_id   VARCHAR(255) PRIMARY KEY,
    started_at   TIMESTAMP,
    submitted_at TIMESTAMP,
    -- Server-side timestamp for auditing / ordering.
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE survey_response (
    -- Auto-generated surrogate key for each answer row.
    response_id      BIGSERIAL PRIMARY KEY,
    session_id       VARCHAR(255) NOT NULL,
    main_question_id INT NOT NULL,
    sub_question_id  INT,
    option_id        INT,
    free_text        TEXT,
    rank_position    INT,

    CONSTRAINT fk_response_session
        FOREIGN KEY (session_id)
        REFERENCES survey_submission(session_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_response_main_question
        FOREIGN KEY (main_question_id)
        REFERENCES mainquestion(main_question_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_response_sub_question
        FOREIGN KEY (sub_question_id)
        REFERENCES sub_question(sub_question_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_response_option
        FOREIGN KEY (option_id)
        REFERENCES option(option_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_response_session ON survey_response(session_id);
CREATE INDEX idx_response_main_q  ON survey_response(main_question_id);
