# ========================================
# OMA Application - Development Setup (Windows)
# ========================================
# This script sets all REQUIRED environment variables
# then starts the Spring Boot application.
#
# Usage: Run from the repo root:
#   .\scripts\dev-env.ps1

# ========================================
# DEVELOPMENT ENVIRONMENT VARIABLES
# ========================================

# Database Configuration
$env:DB_URL      = "jdbc:postgresql://localhost:5432/oma_sur_2"
$env:DB_USER     = "postgres"
$env:DB_PASS     = "madhan@123"

# Logging Configuration
$env:SHOW_SQL            = "true"
$env:LOG_LEVEL_ROOT       = "WARN"
$env:LOG_LEVEL_OMA        = "INFO"
$env:LOG_LEVEL_SERVICE    = "INFO"
$env:LOG_LEVEL_CONTROLLER = "INFO"

# Cache Configuration
$env:CACHE_TYPE = "simple"

# reCAPTCHA Configuration (Dev keys)
$env:RECAPTCHA_SECRET_KEY = "6LePxXAsAAAAABbqmqL6gZiPpSIjDGV19BmM0Wa-"

# CORS Configuration (Allow localhost)
$env:ALLOWED_ORIGINS = "http://localhost:5173,http://localhost:3000, http://192.168.29.62:5173"

$env:SECURE = "true"
$env:HTTP_ONLY= "true"
$env:SAME_SITE = "strict"

Write-Host "Development environment variables set" -ForegroundColor Green
Write-Host ""
Write-Host "Starting Spring Boot backend..." -ForegroundColor Cyan

Set-Location "$PSScriptRoot\..\OMA V1"
./mvnw spring-boot:run
