@echo off
REM Pre-deployment validation script for CMC Data Entry System (Windows)

echo 🔍 Running final validation checks...

REM Check for build errors
echo 1. Checking build...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    exit /b 1
)
echo ✅ Build successful

REM Check for linting issues
echo 2. Running linter...
call npm run lint
if %errorlevel% neq 0 (
    echo ❌ Linting issues found!
    exit /b 1
)
echo ✅ Linting passed

REM Check TypeScript types
echo 3. Checking TypeScript...
call npm run type-check
if %errorlevel% neq 0 (
    echo ❌ TypeScript type errors found!
    exit /b 1
)
echo ✅ TypeScript check passed

echo.
echo 🎉 Final validation completed successfully!
echo.
echo 📋 Pre-deployment checklist:
echo   ✅ Code builds without errors
echo   ✅ All linting rules pass
echo   ✅ TypeScript types are valid
echo.
echo 🚀 Application is ready for production deployment!
echo.
echo Next steps:
echo 1. Update production environment variables
echo 2. Change demo passwords for production users
echo 3. Configure SSL certificate
echo 4. Set up monitoring and logging
echo 5. Deploy to production environment

pause
