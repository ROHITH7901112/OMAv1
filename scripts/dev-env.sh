#!/bin/bash

# ========================================
# OMA Application - Development Setup (macOS/Linux)
# ========================================
# This script sets all REQUIRED environment variables
# for the Spring Boot application.
#
# Usage: 
#   source scripts/dev-env.sh
#   cd "OMA V1"
#   ./mvnw spring-boot:run
#
# OR run backend with env vars in one line:
#   cd "OMA V1" && source ../scripts/dev-env.sh && ./mvnw spring-boot:run

# ========================================
# DEVELOPMENT ENVIRONMENT VARIABLES
# ========================================

# Database Configuration
export DB_URL="jdbc:postgresql://localhost:5432/omav1"
export DB_USER="postgres"
export DB_PASS="madhan@123"

# Logging Configuration
export SHOW_SQL="true"
export LOG_LEVEL_ROOT="WARN"
export LOG_LEVEL_OMA="INFO"
export LOG_LEVEL_SERVICE="INFO"
export LOG_LEVEL_CONTROLLER="INFO"

# Cache Configuration
export CACHE_TYPE="simple"

# reCAPTCHA Configuration (Dev keys)
export RECAPTCHA_SECRET_KEY="6LePxXAsAAAAABbqmqL6gZiPpSIjDGV19BmM0Wa-"

# CORS Configuration (Allow localhost)
export ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000"

echo "✅ Development environment variables set"
echo ""
echo "To start the backend, run:"
echo "cd \"OMA V1\""
echo "./mvnw spring-boot:run"
