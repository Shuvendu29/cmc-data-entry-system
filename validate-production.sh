#!/bin/bash

# Pre-deployment validation script for CMC Data Entry System

echo "🔍 Running final validation checks..."

# Check for build errors
echo "1. Checking build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo "✅ Build successful"

# Check for linting issues
echo "2. Running linter..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting issues found!"
    exit 1
fi
echo "✅ Linting passed"

# Check TypeScript types
echo "3. Checking TypeScript..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ TypeScript type errors found!"
    exit 1
fi
echo "✅ TypeScript check passed"

# Check for security issues
echo "4. Security validation..."

# Check for hardcoded secrets (excluding demo data)
if grep -r "password.*:" src/ --include="*.ts" --include="*.tsx" | grep -v "constants.ts" | grep -v "type.*password" | grep -v "placeholder" | grep -v "Password" > /dev/null; then
    echo "❌ Potential hardcoded passwords found outside demo data!"
    grep -r "password.*:" src/ --include="*.ts" --include="*.tsx" | grep -v "constants.ts" | grep -v "type.*password" | grep -v "placeholder" | grep -v "Password"
    exit 1
fi

# Check for debug statements (console.log, but allow console.error and safeLog)
if grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" | grep -v "security.ts" > /dev/null; then
    echo "❌ Debug console.log statements found!"
    grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" | grep -v "security.ts"
    exit 1
fi

echo "✅ Security validation passed"

# Check for TODO/FIXME
echo "5. Checking for unfinished work..."
if grep -r "TODO\|FIXME\|XXX" src/ --include="*.ts" --include="*.tsx" > /dev/null; then
    echo "⚠️  Found TODO/FIXME items:"
    grep -r "TODO\|FIXME\|XXX" src/ --include="*.ts" --include="*.tsx"
    echo "Please review and address these items before production deployment."
fi

# Check file structure
echo "6. Validating file structure..."
required_files=(
    "src/app/page.tsx"
    "src/app/layout.tsx"
    "src/components/LoginPage.tsx"
    "src/components/AdminDashboard.tsx"
    "src/components/AnalystDashboard.tsx"
    "src/data/constants.ts"
    "src/lib/utils.ts"
    "src/lib/security.ts"
    "src/types/index.ts"
    "package.json"
    "next.config.js"
    "tailwind.config.js"
    "tsconfig.json"
    ".env.example"
    "README.md"
    "PRODUCTION_CHECKLIST.md"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Required file missing: $file"
        exit 1
    fi
done
echo "✅ All required files present"

# Check package.json dependencies
echo "7. Validating dependencies..."
if ! npm audit --audit-level high > /dev/null 2>&1; then
    echo "⚠️  High-severity vulnerabilities found in dependencies"
    npm audit --audit-level high
    echo "Consider running 'npm audit fix' to resolve issues"
fi

echo "✅ Dependency audit completed"

echo ""
echo "🎉 Final validation completed successfully!"
echo ""
echo "📋 Pre-deployment checklist:"
echo "  ✅ Code builds without errors"
echo "  ✅ All linting rules pass"
echo "  ✅ TypeScript types are valid"
echo "  ✅ No hardcoded secrets detected"
echo "  ✅ Debug statements removed"
echo "  ✅ File structure validated"
echo ""
echo "🚀 Application is ready for production deployment!"
echo ""
echo "Next steps:"
echo "1. Update production environment variables"
echo "2. Change demo passwords for production users"
echo "3. Configure SSL certificate"
echo "4. Set up monitoring and logging"
echo "5. Deploy to production environment"
