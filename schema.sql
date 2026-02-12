-- Drop existing tables if needed (in reverse dependency order)
DROP TABLE IF EXISTS user_response CASCADE;
DROP TABLE IF EXISTS assessment CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS option CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS category CASCADE;

-- Create Category table
CREATE TABLE category(
    category_id serial primary key,
    name text not null,
    weight int,
    created_at timestamp default current_timestamp
);

-- Create Question table
CREATE TABLE question(
    question_id serial primary key,
    category_id serial not null,
    question text not null,
    weight int,
    active boolean default true,
    question_type varchar(100),
    created_at timestamp default current_timestamp,
    foreign key(category_id) references category(category_id) on delete cascade
);

-- Create Option table
CREATE TABLE option(
    option_id serial primary key,
    question_id serial not null,
    option_type varchar(100),
    option_text text not null,
    score int,
    created_at timestamp default current_timestamp,
    foreign key(question_id) references question(question_id) on delete cascade
);

-- Create User table
CREATE TABLE "user"(
    user_id serial primary key,
    username varchar(100) unique not null,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    department varchar(100),
    role varchar(100),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

-- Create Assessment table
CREATE TABLE assessment(
    assessment_id serial primary key,
    assessment_name varchar(255) not null,
    description text,
    created_by integer,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    foreign key(created_by) references "user"(user_id) on delete set null
);

-- Create UserResponse table
CREATE TABLE user_response(
    response_id serial primary key,
    user_id integer not null,
    assessment_id integer not null,
    question_id integer not null,
    option_id integer,
    response_text text,
    score int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    foreign key(user_id) references "user"(user_id) on delete cascade,
    foreign key(assessment_id) references assessment(assessment_id) on delete cascade,
    foreign key(question_id) references question(question_id) on delete cascade,
    foreign key(option_id) references option(option_id) on delete set null
);

-- Create indexes for better query performance
CREATE INDEX idx_question_category ON question(category_id);
CREATE INDEX idx_option_question ON option(question_id);
CREATE INDEX idx_user_response_user ON user_response(user_id);
CREATE INDEX idx_user_response_assessment ON user_response(assessment_id);
CREATE INDEX idx_user_response_question ON user_response(question_id);
