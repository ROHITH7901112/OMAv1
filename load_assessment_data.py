#!/usr/bin/env python3
"""
Script to load assessment questions data from Book1.xlsx into PostgreSQL
"""
import pandas as pd
import psycopg2
from psycopg2.extras import execute_batch
import os
import sys

# Excel file path
EXCEL_FILE = "/Users/rohith/Downloads/Book1.xlsx"

# Database configuration - update these with your actual credentials
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'oma_sur_2')
}

INSERT_SQL = """
INSERT INTO assessment_questions (
    "Category", "#", "Question", "L / E / L+E", "Question Type",
    "Answer Options", "Circle # / answer option", "Scoring logic", "Example",
    "Circle #/ question (Median)", "Circle #/ question (Mean)", "Circle interpretation"
) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

def load_excel_data():
    """Load and prepare data from Excel file"""
    print(f"Reading Excel file: {EXCEL_FILE}")
    df = pd.read_excel(EXCEL_FILE, sheet_name='Sheet1')
    
    # Clean df - replace NaN with None for proper NULL handling in PostgreSQL
    df = df.where(pd.notna(df), None)
    
    print(f"Loaded {len(df)} rows from Excel")
    return df

def insert_data_to_postgres(df):
    """Insert data into PostgreSQL database"""
    try:
        # Connect to database
        print(f"\nConnecting to PostgreSQL: {DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}")
        conn = psycopg2.connect(
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            database=DB_CONFIG['database']
        )
        cursor = conn.cursor()
        
        # Prepare data for insertion
        data_to_insert = []
        for idx, row in df.iterrows():
            data_to_insert.append((
                row['Category'],
                row['#'],
                row['Question'],
                row['L / E / L+E'],
                row['Question Type'],
                row['Answer Options'],
                row['Circle # / answer option'],
                row['Scoring logic'],
                row['Example'],
                row['Circle #/ question (Median)'],
                row['Circle #/ question (Mean)'],
                row['Circle interpretation']
            ))
        
        # Execute batch insert
        print(f"\nInserting {len(data_to_insert)} rows into assessment_questions table...")
        execute_batch(cursor, INSERT_SQL, data_to_insert, page_size=100)
        
        conn.commit()
        print(f"✓ Successfully inserted {len(data_to_insert)} rows")
        
        # Show some stats
        cursor.execute("SELECT COUNT(*) FROM assessment_questions")
        total = cursor.fetchone()[0]
        print(f"Total rows in assessment_questions table: {total}")
        
        cursor.execute("SELECT COUNT(DISTINCT \"Category\") FROM assessment_questions WHERE \"Category\" IS NOT NULL")
        categories = cursor.fetchone()[0]
        print(f"Distinct categories: {categories}")
        
        cursor.close()
        conn.close()
        
    except psycopg2.Error as e:
        print(f"✗ Database error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("="*60)
    print("Assessment Questions Data Loader")
    print("="*60)
    
    # Check if Excel file exists
    if not os.path.exists(EXCEL_FILE):
        print(f"✗ Excel file not found: {EXCEL_FILE}")
        sys.exit(1)
    
    # Load Excel data
    df = load_excel_data()
    
    # Insert into PostgreSQL
    print("\nDatabase Configuration:")
    print(f"  Host: {DB_CONFIG['host']}")
    print(f"  Port: {DB_CONFIG['port']}")
    print(f"  Database: {DB_CONFIG['database']}")
    print(f"  User: {DB_CONFIG['user']}")
    
    # Check if input is from stdin (pipe)
    if not sys.stdin.isatty():
        response = sys.stdin.readline().strip().lower()
    else:
        response = input("\nProceed with data insertion? (yes/no): ").strip().lower()
    
    if response != 'yes':
        print("Aborted.")
        sys.exit(0)
    
    insert_data_to_postgres(df)
    print("\n✓ Data loading completed successfully!")
