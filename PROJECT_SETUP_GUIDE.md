# OMA Survey Project - Setup & Run Guide

## Overview
This project consists of three main components:
1. **Backend API** - Spring Boot application (Java) located in `OMA V1/`
2. **Frontend** - React + TypeScript + Vite application located in `OMA - frontend/`
3. **Database** - PostgreSQL with Flyway migrations located in `db/`

---

## Prerequisites

### Required Software
- **Java 21** - For running the Spring Boot backend
- **Maven** - For building the Java project (included via `mvnw`)
- **Node.js 18+** - For running the React frontend
- **PostgreSQL 15+** - Database server
- **Flyway CLI** (optional) - For database migrations

### Verify Installations
```powershell
# Check Java version
java -version

# Check Node.js version
node -v

# Check npm version
npm -v

# Check PostgreSQL
psql --version
```

---

## Part 1: Database Setup

### Step 1: Create Database
Open PowerShell and connect to PostgreSQL:

```powershell
# Connect to PostgreSQL (enter your postgres password when prompted)
psql -U postgres

# Inside psql prompt, create database
CREATE DATABASE omav1;

# Exit psql
\q
```

### Step 2: Run Flyway Migrations

Navigate to the project root directory:

```powershell
cd "C:\Users\NARESH\OneDrive\Desktop\OMA-12-2\OMA-12-2"
```

#### Option A: Using PowerShell Scripts (Recommended)
```powershell
# Run migrations
.\scripts\migrate.ps1
```

#### Option B: Using Flyway CLI Directly
```powershell
# Make sure flyway.conf has correct credentials
flyway migrate
```

### Step 3: Verify Database Setup
```powershell
# Connect to database
psql -U postgres -d omav1

# Check tables
\dt

# Verify data
SELECT COUNT(*) FROM category;
SELECT COUNT(*) FROM main_question;
SELECT COUNT(*) FROM sub_question;
SELECT COUNT(*) FROM option;

# Exit
\q
```

Expected counts:
- Categories: ~12
- Main Questions: ~19
- Sub Questions: ~45
- Options: ~223

---

## Part 2: Backend Setup & Run

### Step 1: Configure Database Connection

Verify that `OMA V1/src/main/resources/application.properties` has correct credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/omav1
spring.datasource.username=postgres
spring.datasource.password=madhan@123
```

**Update the password** to match your PostgreSQL password if different.

### Step 2: Navigate to Backend Directory
```powershell
cd "OMA V1"
```

### Step 3: Build the Project
```powershell
# Windows
.\mvnw clean install

# Or if you have Maven installed globally
mvn clean install
```

### Step 4: Run the Backend
```powershell
# Using Maven wrapper
.\mvnw spring-boot:run

# Or using Maven
mvn spring-boot:run
```

**Backend will start on:** `http://localhost:8080`

### Step 5: Verify Backend is Running

Open another PowerShell window and test the API:

```powershell
# Test basic endpoint
curl http://localhost:8080/api/category

# Test the main survey endpoint
curl http://localhost:8080/api/category/allquestion
```

Or open in browser: `http://localhost:8080/api/category/allquestion`

---

## Part 3: Frontend Setup & Run

### Step 1: Navigate to Frontend Directory
Open a **new PowerShell window**:

```powershell
cd "C:\Users\NARESH\OneDrive\Desktop\OMA-12-2\OMA-12-2\OMA - frontend"
```

### Step 2: Install Dependencies
```powershell
npm install
```

### Step 3: Verify Environment Configuration

Check that `.env` file exists with:
```
VITE_API_BASE_URL=http://localhost:8080
```

### Step 4: Run the Frontend
```powershell
npm run dev
```

**Frontend will start on:** `http://localhost:5173`

### Step 5: Open in Browser
Navigate to: `http://localhost:5173`

---

## Running the Complete Project

### Quick Start (All Services)

#### Terminal 1 - Backend
```powershell
cd "C:\Users\NARESH\OneDrive\Desktop\OMA-12-2\OMA-12-2\OMA V1"
.\mvnw spring-boot:run
```

#### Terminal 2 - Frontend
```powershell
cd "C:\Users\NARESH\OneDrive\Desktop\OMA-12-2\OMA-12-2\OMA - frontend"
npm run dev
```

---

## API Endpoints Reference

### Survey Data
- **GET** `/api/category/allquestion` - Get complete nested survey structure (used by frontend)

### Category Endpoints
- **GET** `/api/category` - Get all categories
- **GET** `/api/category/{id}` - Get category by ID
- **POST** `/api/category` - Create new category
- **PUT** `/api/category/{id}` - Update category
- **DELETE** `/api/category/{id}` - Delete category

### Main Question Endpoints
- **GET** `/api/mainquestion` - Get all main questions
- **GET** `/api/mainquestion/{id}` - Get main question by ID
- **GET** `/api/mainquestion/category/{categoryId}` - Get questions by category
- **POST** `/api/mainquestion` - Create new main question
- **PUT** `/api/mainquestion/{id}` - Update main question
- **DELETE** `/api/mainquestion/{id}` - Delete main question

### Sub-Question Endpoints
- **GET** `/api/subquestion` - Get all sub-questions
- **GET** `/api/subquestion/{id}` - Get sub-question by ID
- **GET** `/api/subquestion/mainquestion/{mainQuestionId}` - Get sub-questions by main question

### Option Endpoints
- **GET** `/api/option` - Get all options
- **GET** `/api/option/{id}` - Get option by ID
- **GET** `/api/option/mainquestion/{mainQuestionId}` - Get options by main question
- **GET** `/api/option/subquestion/{subQuestionId}` - Get options by sub-question

---

## Troubleshooting

### Backend Issues

**Problem: Port 8080 already in use**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Problem: Database connection failed**
- Verify PostgreSQL is running: `Get-Service postgresql*`
- Check credentials in `application.properties`
- Test connection: `psql -U postgres -d omav1`

**Problem: Maven build fails**
```powershell
# Clear Maven cache
.\mvnw clean

# Try building again
.\mvnw clean install -U
```

### Frontend Issues

**Problem: Port 5173 already in use**
- Kill the process or change port in `vite.config.ts`:
```typescript
server: {
  port: 3000, // Change to any available port
  proxy: { ... }
}
```

**Problem: API calls failing (404 or CORS errors)**
- Ensure backend is running on port 8080
- Check browser console for specific error
- Verify proxy configuration in `vite.config.ts`
- Clear browser cache and reload

**Problem: Dependencies installation fails**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

### Database Issues

**Problem: Flyway migrations fail**
```powershell
# Check current schema version
flyway info

# Repair if needed
flyway repair

# Try again
flyway migrate
```

**Problem: Data not showing in frontend**
- Check if migrations ran successfully
- Verify data exists: `psql -U postgres -d omav1 -c "SELECT * FROM category;"`
- Check backend logs for errors
- Test API endpoint: `curl http://localhost:8080/api/category/allquestion`

---

## Project Structure

```
OMA-12-2/
├── OMA V1/                          # Backend (Spring Boot)
│   ├── src/main/java/
│   │   └── com/example/OMA/
│   │       ├── Controller/          # REST Controllers
│   │       ├── Model/               # Entity classes & DTOs
│   │       ├── Service/             # Business logic
│   │       ├── Repository/          # Data access layer
│   │       └── Config/              # Configuration (CORS, etc.)
│   ├── src/main/resources/
│   │   └── application.properties   # Database config
│   └── pom.xml                      # Maven dependencies
│
├── OMA - frontend/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/                   # Page components
│   │   │   └── Survey.tsx          # Main survey page (API-connected)
│   │   ├── components/              # Reusable components
│   │   └── types/                   # TypeScript types
│   ├── vite.config.ts              # Vite config with proxy
│   ├── .env                        # Environment variables
│   └── package.json                # npm dependencies
│
├── db/
│   ├── migrations/                  # Flyway schema migrations
│   └── seeds/                       # Sample data
│
└── scripts/                         # PowerShell utility scripts
```

---

## Development Workflow

### Making Database Changes
1. Create new migration: `.\scripts\new-migration.ps1 "description"`
2. Edit the SQL file in `db/migrations/`
3. Run migration: `.\scripts\migrate.ps1`
4. Verify in database

### Making Backend Changes
1. Edit Java files
2. Spring Boot DevTools will auto-reload (if enabled)
3. Or restart: `Ctrl+C` then `.\mvnw spring-boot:run`

### Making Frontend Changes
1. Edit React/TypeScript files
2. Vite will hot-reload automatically
3. Check browser for changes

---

## Building for Production

### Backend
```powershell
cd "OMA V1"
.\mvnw clean package
# JAR file will be in target/OMA-0.0.1-SNAPSHOT.jar

# Run production JAR
java -jar target/OMA-0.0.1-SNAPSHOT.jar
```

### Frontend
```powershell
cd "OMA - frontend"
npm run build
# Production files will be in dist/

# Preview production build
npm run preview
```

---

## Environment Variables

### Backend (application.properties)
- `spring.datasource.url` - Database connection URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `spring.jpa.hibernate.ddl-auto` - Schema management (use 'update' in dev, 'validate' in prod)

### Frontend (.env)
- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version

---

## Additional Resources

- **Backend Documentation:** `API_DOCUMENTATION.md`
- **Frontend Technical Stack:** `OMA - frontend/TECHNICAL_STACK.md`
- **Sample Response:** `SAMPLE_RESPONSE.json`

---

## Support

For issues or questions:
1. Check this guide's troubleshooting section
2. Review backend logs in the terminal
3. Check browser console for frontend errors
4. Verify all prerequisites are installed correctly
