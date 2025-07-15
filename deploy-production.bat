@echo off
REM Production Deployment Script for CMC Data Entry System - Windows

echo 🚀 CMC Data Entry System - Production Deployment
echo ==================================================

REM Check Node.js version
echo 📋 Checking Node.js version...
node --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ npm install failed
    exit /b 1
)
echo.

REM Type checking
echo 🔍 Running TypeScript checks...
npx tsc --noEmit
if %errorlevel% neq 0 (
    echo ❌ TypeScript compilation failed
    exit /b 1
) else (
    echo ✅ TypeScript compilation successful
)
echo.

REM Build the application
echo 🔨 Building application...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    exit /b 1
) else (
    echo ✅ Build successful
)
echo.

echo 🎉 All checks passed! Ready for deployment.
echo.
echo 🌐 Deployment Information:
echo    Domain: softwireindia.info
echo    Platform: Render.com
echo    Configuration: render.yaml
echo.
echo 📝 Next Steps:
echo    1. Push code to Git repository
echo    2. Deploy to Render.com using render.yaml
echo    3. Configure DNS with BigRock
echo    4. Test live deployment
echo.
echo 🔐 Demo Credentials:
echo    Admin: admin / admin123
echo    Analyst: analyst / analyst123

pause
