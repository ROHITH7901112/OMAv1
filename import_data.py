import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
import numpy as np

# Connect to PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    database="demo_db",
    user="postgres",
    password="madhan@123",
    port=5432
)
cursor = conn.cursor()

print("Creating database tables...\n")

# 1. Create User table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS "user"(
        user_id serial primary key,
        username varchar(100) unique not null,
        email varchar(100) unique not null,
        first_name varchar(100),
        last_name varchar(100),
        department varchar(100),
        role varchar(100),
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp
    )
""")

# 2. Create Assessment table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS assessment(
        assessment_id serial primary key,
        assessment_name varchar(255) not null,
        description text,
        created_by integer,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp,
        foreign key(created_by) references "user"(user_id) on delete set null
    )
""")

# 3. Create UserResponse table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_response(
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
    )
""")

# Create indexes
cursor.execute("CREATE INDEX IF NOT EXISTS idx_user_response_user ON user_response(user_id)")
cursor.execute("CREATE INDEX IF NOT EXISTS idx_user_response_assessment ON user_response(assessment_id)")
cursor.execute("CREATE INDEX IF NOT EXISTS idx_user_response_question ON user_response(question_id)")

conn.commit()
print("✓ Tables created successfully!\n")

# Now import data from Excel
print("Starting data import from Excel...\n")

excel_file = "/Users/rohith/Downloads/Book1.xlsx"
df = pd.read_excel(excel_file, sheet_name='Sheet1')

# Clean data
df = df.fillna('')

# 1. Extract and insert unique categories
print("=== IMPORTING CATEGORIES ===")
categories = []
for _, row in df.iterrows():
    category_name = row['Category']
    if category_name and str(category_name).strip() and str(category_name) != 'nan':
        if category_name not in [c[0] for c in categories]:
            categories.append((category_name, None))  # name, weight

print(f"Found {len(categories)} unique categories:")
for cat in categories:
    print(f"  - {cat[0]}")

# Clear existing data
cursor.execute("DELETE FROM user_response;")
cursor.execute("DELETE FROM option;")
cursor.execute("DELETE FROM question;")
cursor.execute("DELETE FROM category;")
conn.commit()

# Insert categories
if categories:
    execute_values(cursor, 
        "INSERT INTO category (name, weight) VALUES %s",
        categories)
    conn.commit()
    print(f"✓ Inserted {len(categories)} categories\n")

# Get category IDs
cursor.execute("SELECT category_id, name FROM category")
category_map = {name: cid for cid, name in cursor.fetchall()}

# 2. Extract and insert questions
print("=== IMPORTING QUESTIONS ===")
questions = []

for idx, row in df.iterrows():
    category_name = row['Category']
    question_text = row['Question']
    question_type = row['Question Type']
    
    if question_text and str(question_text).strip() and str(question_text) != 'nan':
        if category_name in category_map:
            questions.append((
                category_map[category_name],
                str(question_text)[:1000],  # Limit length
                None,  # weight
                True,  # active
                str(question_type)[:100] if question_type and str(question_type) != 'nan' else None
            ))

print(f"Found {len(questions)} unique questions")

# Insert questions
if questions:
    execute_values(cursor,
        "INSERT INTO question (category_id, question, weight, active, question_type) VALUES %s",
        questions)
    conn.commit()
    print(f"✓ Inserted {len(questions)} questions\n")

# Get question IDs
cursor.execute("SELECT question_id, question FROM question")
question_map = {q: qid for qid, q in cursor.fetchall()}

# 3. Extract and insert options
print("=== IMPORTING OPTIONS ===")
options = []

for idx, row in df.iterrows():
    question_text = row['Question']
    answer_options = row['Answer Options']
    option_type = row['Question Type']
    
    # Check if this is a valid question
    if question_text and str(question_text).strip() and str(question_text) != 'nan':
        question_text_str = str(question_text)[:1000]
        
        if question_text_str in question_map:
            if answer_options and str(answer_options).strip() and str(answer_options) != 'nan':
                options.append((
                    question_map[question_text_str],
                    str(option_type)[:100] if option_type and str(option_type) != 'nan' else 'Multiple Choice',
                    str(answer_options)[:1000],
                    None  # score
                ))

print(f"Found {len(options)} options/answers")

# Insert options
if options:
    execute_values(cursor,
        "INSERT INTO option (question_id, option_type, option_text, score) VALUES %s",
        options)
    conn.commit()
    print(f"✓ Inserted {len(options)} options\n")

# Verify data
cursor.execute("SELECT COUNT(*) FROM category;")
cat_count = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM question;")
q_count = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM option;")
opt_count = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM \"user\";")
user_count = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM assessment;")
assess_count = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM user_response;")
response_count = cursor.fetchone()[0]

print("=== IMPORT SUMMARY ===")
print(f"Categories: {cat_count}")
print(f"Questions: {q_count}")
print(f"Options: {opt_count}")
print(f"Users: {user_count}")
print(f"Assessments: {assess_count}")
print(f"User Responses: {response_count}")
print("\n✓ Data import completed successfully!")

cursor.close()
conn.close()
