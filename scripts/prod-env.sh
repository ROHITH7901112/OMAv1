#!/bin/bash

# ========================================
# OMA Application - Production Setup
# ========================================
# Update these values with your actual production secrets
# DO NOT COMMIT this file to Git

# ========================================
# PRODUCTION ENVIRONMENT
# ========================================

# Database Configuration (Replace with your production database)
export DB_URL="jdbc:postgresql://your-prod-db.com:5432/omav1-prod"
export DB_USER="your-db-user"
export DB_PASS="your-very-secure-password-here"

# Logging Configuration (Production: reduced verbosity)
export SHOW_SQL="false"
export LOG_LEVEL_ROOT="WARN"
export LOG_LEVEL_OMA="WARN"
export LOG_LEVEL_SERVICE="WARN"
export LOG_LEVEL_CONTROLLER="WARN"

# Cache Configuration (Switch to Redis for production)
export CACHE_TYPE="redis"

# reCAPTCHA Configuration (Production keys from Google Console)
export RECAPTCHA_SECRET_KEY="your-production-recaptcha-secret-key"

# CORS Configuration (Allow your production domain)
export ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"

# Optional: Redis Configuration (if using Redis cache)
# export REDIS_HOST="your-redis-host.com"
# export REDIS_PORT="6379"

echo "⚠️  Production environment variables configured"
echo ""
echo "IMPORTANT: Verify all values are correct before deploying"
echo ""
echo "To start the backend in production, run:"
echo "java -jar target/OMA-0.0.1-SNAPSHOT.jar --spring.profiles.active=production"
