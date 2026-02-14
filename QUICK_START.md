# Quick Start Guide

## Start the entire project in 3 steps:

### Step 1: Ensure PostgreSQL is running
```powershell
# Your database should be created and migrated already
# If not, run: .\scripts\migrate.ps1
```

### Step 2: Start Backend (Terminal 1)
```powershell
cd "OMA V1"
.\mvnw spring-boot:run
```
Wait for: `Started OmaApplication in X seconds`
Backend running on: http://localhost:8080

### Step 3: Start Frontend (Terminal 2)
```powershell
cd "OMA - frontend"
npm run dev
```
Frontend running on: http://localhost:5173

## Open in Browser
Navigate to: http://localhost:5173

The survey page will now fetch data from your backend API!

## Key Changes Made
✅ Backend now has CORS configuration to allow frontend requests
✅ Frontend configured with Vite proxy to route `/api/*` to backend
✅ Survey page updated to fetch from `/api/category/allquestion`
✅ Environment variables configured

## Verify Integration
1. Open http://localhost:5173
2. Navigate to Survey page
3. Check browser Network tab - you should see API call to `/api/category/allquestion`
4. Survey questions should load from your database

## Troubleshooting
- Backend not running? Check Terminal 1 for errors
- Frontend showing errors? Check browser console
- No data? Verify backend endpoint: http://localhost:8080/api/category/allquestion
- Still issues? See PROJECT_SETUP_GUIDE.md for detailed troubleshooting
