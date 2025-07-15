#!/bin/bash
# Production Deployment Script for CMC Data Entry System

echo "🚀 CMC Data Entry System - Production Deployment"
echo "=================================================="

# Check Node.js version
echo "📋 Checking Node.js version..."
node --version
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Type checking
echo "🔍 Running TypeScript checks..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi
echo ""

# Build the application
echo "🔨 Building application..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi
echo ""

# Test the build
echo "🧪 Testing production build..."
timeout 10s npm start &
PID=$!
sleep 5

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Production build test successful"
    kill $PID 2>/dev/null
else
    echo "❌ Production build test failed"
    kill $PID 2>/dev/null
    exit 1
fi
echo ""

echo "🎉 All checks passed! Ready for deployment."
echo ""
echo "🌐 Deployment Information:"
echo "   Domain: softwireindia.info"
echo "   Platform: Render.com"
echo "   Configuration: render.yaml"
echo ""
echo "📝 Next Steps:"
echo "   1. Push code to Git repository"
echo "   2. Deploy to Render.com using render.yaml"
echo "   3. Configure DNS with BigRock"
echo "   4. Test live deployment"
echo ""
echo "🔐 Demo Credentials:"
echo "   Admin: admin / admin123"
echo "   Analyst: analyst / analyst123"
