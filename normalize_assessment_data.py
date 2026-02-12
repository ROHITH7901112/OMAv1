#!/usr/bin/env python3
"""
Script to normalize assessment questions data from denormalized table
to normalized schema with proper relationships
"""
import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
import os
import sys
import re

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'oma_sur_2')
}

def connect_db():
    """Connect to PostgreSQL database"""
    try:
        conn = psycopg2.connect(
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            database=DB_CONFIG['database']
        )
        return conn
    except psycopg2.Error as e:
        print(f"✗ Database connection error: {e}")
        sys.exit(1)

def migrate_data():
    """Migrate data from denormalized to normalized schema"""
    conn = connect_db()
    cursor = conn.cursor()
    
    try:
        print("\n" + "="*60)
        print("MIGRATING TO NORMALIZED SCHEMA")
        print("="*60)
        
        # Step 1: Insert categories
        print("\n1. Inserting categories...")
        cursor.execute("""
            SELECT DISTINCT "Category" FROM assessment_questions 
            WHERE "Category" IS NOT NULL ORDER BY "Category"
        """)
        categories = cursor.fetchall()
        
        category_map = {}
        for cat_name, in categories:
            cursor.execute(
                'INSERT INTO categories (category_name) VALUES (%s) RETURNING id',
                (cat_name,)
            )
            cat_id = cursor.fetchone()[0]
            category_map[cat_name] = cat_id
            print(f"   ✓ {cat_name}")
        
        # Step 2: Insert question types
        print("\n2. Inserting question types...")
        cursor.execute("""
            SELECT DISTINCT "Question Type" FROM assessment_questions 
            WHERE "Question Type" IS NOT NULL ORDER BY "Question Type"
        """)
        question_types = cursor.fetchall()
        
        type_map = {}
        scale_ranges = {
            'Rating (1 to 4)': (1, 4),
            'Rating (1 to 5)': (1, 5),
            'Ranking (1 to 5)': (1, 5),
            'NPS (0 to 10)': (0, 10),
            'Freetext (VOC)': (None, None),
        }
        
        for qt_name, in question_types:
            scale_min, scale_max = scale_ranges.get(qt_name, (None, None))
            cursor.execute(
                '''INSERT INTO question_types (type_name, scale_min, scale_max) 
                   VALUES (%s, %s, %s) RETURNING id''',
                (qt_name, scale_min, scale_max)
            )
            type_id = cursor.fetchone()[0]
            type_map[qt_name] = type_id
            print(f"   ✓ {qt_name}")
        
        # Step 3: Migrate questions
        print("\n3. Migrating questions...")
        cursor.execute("""
            SELECT id, "Category", "#", "Question", "L / E / L+E", 
                   "Question Type", "Example", "Scoring logic",
                   "Circle #/ question (Median)", "Circle #/ question (Mean)",
                   "Circle interpretation"
            FROM assessment_questions 
            WHERE "Question" IS NOT NULL
            ORDER BY id
        """)
        
        questions = cursor.fetchall()
        question_map = {}
        
        for old_id, cat, q_num, q_text, level, q_type, example, scoring, median, mean, interp in questions:
            cat_id = category_map.get(cat) if cat else None
            type_id = type_map.get(q_type) if q_type else None
            
            cursor.execute('''
                INSERT INTO assessment_questions_normalized 
                (category_id, question_number, question_text, level_enum, 
                 question_type_id, example, scoring_logic, circle_median, 
                 circle_mean, circle_interpretation)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            ''', (cat_id, q_num, q_text, level, type_id, example, scoring, median, mean, interp))
            
            new_id = cursor.fetchone()[0]
            question_map[old_id] = new_id
        
        print(f"   ✓ Migrated {len(questions)} questions")
        
        # Step 4: Parse and insert answer options
        print("\n4. Parsing and inserting answer options...")
        cursor.execute("""
            SELECT id, "Question", "Answer Options", "Circle # / answer option",
                   "L / E / L+E", "Question Type"
            FROM assessment_questions 
            WHERE "Question" IS NOT NULL AND "Answer Options" IS NOT NULL
            ORDER BY id
        """)
        
        for old_id, question, options_str, circle_map, level, q_type in cursor.fetchall():
            new_q_id = question_map.get(old_id)
            if not new_q_id or not options_str:
                continue
            
            # Parse options - split by newline or comma
            options_list = [opt.strip() for opt in str(options_str).split('\n') if opt.strip()]
            if not options_list:
                options_list = [opt.strip() for opt in str(options_str).split(',') if opt.strip()]
            
            for idx, option_text in enumerate(options_list):
                score_val = idx + 1 if 'Rating' in str(q_type) or 'Ranking' in str(q_type) else None
                cursor.execute('''
                    INSERT INTO answer_options 
                    (question_id, option_text, option_number, score_value, circle_mapping)
                    VALUES (%s, %s, %s, %s, %s)
                ''', (new_q_id, option_text, idx + 1, score_val, circle_map))
        
        print(f"   ✓ Answer options parsed and inserted")
        
        # Commit all changes
        conn.commit()
        print("\n" + "="*60)
        print("✓ Migration completed successfully!")
        print("="*60)
        
        # Show summary
        cursor.execute("SELECT COUNT(*) FROM categories")
        cat_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM question_types")
        type_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM assessment_questions_normalized")
        q_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM answer_options")
        opt_count = cursor.fetchone()[0]
        
        print(f"\nSummary:")
        print(f"  Categories: {cat_count}")
        print(f"  Question Types: {type_count}")
        print(f"  Questions: {q_count}")
        print(f"  Answer Options: {opt_count}")
        
        cursor.close()
        
    except psycopg2.Error as e:
        conn.rollback()
        print(f"✗ Migration error: {e}")
        cursor.close()
        conn.close()
        sys.exit(1)
    finally:
        conn.close()

if __name__ == "__main__":
    print("Assessment Questions Data Normalization")
    print(f"Database: {DB_CONFIG['database']}")
    
    response = input("\nProceed with data normalization? This will populate the normalized tables. (yes/no): ").strip().lower()
    if response != 'yes':
        print("Aborted.")
        sys.exit(0)
    
    migrate_data()
