@echo off
echo ============================================
echo   CMC Data Entry System - Deployment Setup
echo   Target Domain: softwireindia.info
echo ============================================
echo.

echo Step 1: Initializing Git Repository...
git init
if %ERRORLEVEL% NEQ 0 (
    echo Error: Git initialization failed
    pause
    exit /b 1
)

echo Step 2: Adding all files to git...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to add files
    pause
    exit /b 1
)

echo Step 3: Creating initial commit...
git commit -m "Production-ready CMC Data Entry System v1.0.0 for softwireindia.info"
if %ERRORLEVEL% NEQ 0 (
    echo Error: Failed to create commit
    pause
    exit /b 1
)

echo.
echo ============================================
echo   GitHub Repository Setup Required
echo ============================================
echo.
echo Next Steps:
echo 1. Go to https://github.com
echo 2. Create a new repository named: cmc-data-entry-system
echo 3. Copy the repository URL
echo 4. Run this command (replace YOUR_USERNAME):
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/cmc-data-entry-system.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 5. Then go to https://render.com and deploy from GitHub
echo.
echo ============================================
echo   Deployment Configuration Ready!
echo ============================================
echo.
echo Your application is configured for:
echo - Domain: softwireindia.info
echo - Platform: Render.com
echo - Environment: Production
echo.
pause
