# ========================================
# OMA Application - Development Setup (Windows)
# ========================================
# This script sets all REQUIRED environment variables
# for the Spring Boot application.
#
# Usage:
#   .\scripts\dev-env.ps1
#   cd "OMA V1"
#   .\mvnw spring-boot:run
#
# OR run backend with env vars in one line:
#   .\scripts\dev-env.ps1; cd "OMA V1"; .\mvnw spring-boot:run

# ========================================
# DEVELOPMENT ENVIRONMENT VARIABLES
# ========================================

# Database Configuration
$env:DB_URL = "jdbc:postgresql://localhost:5432/oma_sur_2"
$env:DB_USER = "postgres"
$env:DB_PASS = "naresh2005!"

# Logging Configuration
$env:SHOW_SQL = "true"
$env:LOG_LEVEL_ROOT = "WARN"
$env:LOG_LEVEL_OMA = "INFO"
$env:LOG_LEVEL_SERVICE = "INFO"
$env:LOG_LEVEL_CONTROLLER = "INFO"

# Cache Configuration
$env:CACHE_TYPE = "simple"

# reCAPTCHA Configuration (Dev keys)
$env:RECAPTCHA_SECRET_KEY = "6LePxXAsAAAAABbqmqL6gZiPpSIjDGV19BmM0Wa-"

# CORS Configuration (Allow localhost)
$env:ALLOWED_ORIGINS = "http://localhost:5173,http://localhost:3000"

Write-Host "Development environment variables set" -ForegroundColor Green
Write-Host ""
Write-Host "To start the backend, run:"
Write-Host '  cd "OMA V1"'
Write-Host "  .\mvnw spring-boot:run"
