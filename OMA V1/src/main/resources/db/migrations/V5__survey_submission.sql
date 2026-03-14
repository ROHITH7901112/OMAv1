CREATE TABLE IF NOT EXISTS survey_submission (
    session_id VARCHAR(255) PRIMARY KEY,
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    consent_given BOOLEAN,
    consent_at TIMESTAMPTZ,
    consent_version VARCHAR(20),
    consent_text_hash VARCHAR(64)
);