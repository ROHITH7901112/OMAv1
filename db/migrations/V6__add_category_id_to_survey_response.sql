-- ============================================================
-- V6: Add category_id to survey_response for direct category
-- lookup without joining through mainquestion.
-- ============================================================

ALTER TABLE survey_response
    ADD COLUMN category_id INT;

ALTER TABLE survey_response
    ADD CONSTRAINT fk_response_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE;

CREATE INDEX idx_response_category ON survey_response(category_id);
