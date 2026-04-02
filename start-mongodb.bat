@echo off
echo ========================================
echo Starting MongoDB Service
echo ========================================
echo.

REM Try to start MongoDB service
net start MongoDB 2>nul

if %errorlevel% equ 0 (
    echo ✅ MongoDB service started successfully!
    echo.
    echo Testing connection...
    node test-connection.js
    echo.
    echo ========================================
    echo MongoDB is ready!
    echo You can now run: npm run dev
    echo ========================================
) else (
    echo ❌ Failed to start MongoDB service
    echo.
    echo Possible reasons:
    echo 1. MongoDB is not installed
    echo 2. Service doesn't exist
    echo 3. Need administrator privileges
    echo.
    echo Solutions:
    echo 1. Run this script as Administrator
    echo 2. Install MongoDB from: https://www.mongodb.com/try/download/community
    echo 3. Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
    echo.
    echo For MongoDB Atlas:
    echo 1. Create free account
    echo 2. Get connection string
    echo 3. Update .env.local with connection string
    echo.
)

pause
