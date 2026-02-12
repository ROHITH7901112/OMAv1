#!/usr/bin/env python3
"""
Script to seed sample user responses into the assessment database
"""
import psycopg2
from psycopg2.extras import execute_values
import os
import sys
import random
from datetime import datetime, timedelta

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

def seed_user_responses(num_users=5, start_user_id=101):
    """Generate and insert sample user responses"""
    conn = connect_db()
    cursor = conn.cursor()
    
    try:
        print("\n" + "="*60)
        print("SEEDING USER RESPONSES")
        print("="*60)
        
        # Get all questions and their answer options
        cursor.execute("""
            SELECT q.id, q.category_id, q.question_number,
                   COUNT(ao.id) as option_count
            FROM assessment_questions_normalized q
            LEFT JOIN answer_options ao ON q.id = ao.question_id
            WHERE q.is_active = true
            GROUP BY q.id, q.category_id, q.question_number
            ORDER BY q.id
        """)
        
        questions = cursor.fetchall()
        print(f"\nFound {len(questions)} active questions")
        
        if not questions:
            print("✗ No active questions found. Run seed migration first.")
            cursor.close()
            conn.close()
            return
        
        # Get available answer options for each question
        cursor.execute("""
            SELECT question_id, id, score_value
            FROM answer_options
            ORDER BY question_id, option_number
        """)
        
        options_map = {}
        for q_id, opt_id, score in cursor.fetchall():
            if q_id not in options_map:
                options_map[q_id] = []
            options_map[q_id].append((opt_id, score))
        
        # Generate sample responses
        print(f"\nGenerating responses for {num_users} users...")
        total_responses = 0
        
        for user_id in range(start_user_id, start_user_id + num_users):
            responses_data = []
            
            for q_id, cat_id, q_num, opt_count in questions:
                if q_id not in options_map or not options_map[q_id]:
                    continue
                
                # Randomly select an option
                option_id, score = random.choice(options_map[q_id])
                
                # Random response date within last 30 days
                days_ago = random.randint(0, 30)
                response_date = datetime.now() - timedelta(days=days_ago)
                
                responses_data.append((
                    user_id,
                    q_id,
                    option_id,
                    None,  # text_response
                    score,
                    response_date
                ))
            
            # Insert responses for this user
            if responses_data:
                execute_values(
                    cursor,
                    '''INSERT INTO user_responses 
                       (user_id, question_id, selected_option_id, text_response, score_points, response_date)
                       VALUES %s''',
                    responses_data,
                    page_size=100
                )
                total_responses += len(responses_data)
                print(f"   ✓ User {user_id}: {len(responses_data)} responses")
        
        conn.commit()
        
        print("\n" + "="*60)
        print(f"✓ Seeding completed!")
        print("="*60)
        print(f"\nSummary:")
        print(f"  Users seeded: {num_users}")
        print(f"  Total responses: {total_responses}")
        print(f"  Average responses per user: {total_responses // num_users if num_users > 0 else 0}")
        
        # Show scoring summary
        cursor.execute("""
            SELECT user_id, COUNT(*) as responses, 
                   ROUND(AVG(score_points)::numeric, 2) as avg_score,
                   ROUND(SUM(score_points)::numeric, 2) as total_score
            FROM user_responses
            WHERE user_id >= %s
            GROUP BY user_id
            ORDER BY user_id
        """, (start_user_id,))
        
        print("\n\nUser Scores:")
        print("-" * 60)
        print(f"{'User ID':<10} {'Responses':<12} {'Avg Score':<12} {'Total Score':<12}")
        print("-" * 60)
        
        for user_id, resp_count, avg_score, total_score in cursor.fetchall():
            print(f"{user_id:<10} {resp_count:<12} {avg_score:<12} {total_score:<12}")
        
        cursor.close()
        
    except psycopg2.Error as e:
        conn.rollback()
        print(f"✗ Seeding error: {e}")
        cursor.close()
        conn.close()
        sys.exit(1)
    finally:
        conn.close()

if __name__ == "__main__":
    print("Assessment User Response Seeding")
    print(f"Database: {DB_CONFIG['database']}")
    
    # Parse command line arguments
    num_users = 5
    start_user_id = 101
    
    if len(sys.argv) > 1:
        try:
            num_users = int(sys.argv[1])
        except ValueError:
            print("Usage: python seed_user_responses.py [num_users] [start_user_id]")
            sys.exit(1)
    
    if len(sys.argv) > 2:
        try:
            start_user_id = int(sys.argv[2])
        except ValueError:
            print("Usage: python seed_user_responses.py [num_users] [start_user_id]")
            sys.exit(1)
    
    response = input(f"\nSeed {num_users} users starting from ID {start_user_id}? (yes/no): ").strip().lower()
    if response != 'yes':
        print("Aborted.")
        sys.exit(0)
    
    seed_user_responses(num_users, start_user_id)
