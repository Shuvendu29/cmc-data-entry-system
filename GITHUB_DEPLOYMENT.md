# 🚀 GitHub Deployment Guide for CMC Data Entry System

## 📋 Pre-Deployment Checklist ✅

### ✅ **Project Cleaned & Ready**
- Test files removed
- Unnecessary documentation cleaned
- Main application optimized
- Build test passed successfully
- Production configuration verified

## 🔧 Step 1: Initialize Git Repository

Run these commands in your project directory:

```bash
cd "d:\Projects\dataentry"

# Initialize git repository (if not already done)
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: CMC Data Entry System v1.0.0"
```

## 🌐 Step 2: Create GitHub Repository

### Option A: Using GitHub Website
1. Go to [GitHub.com](https://github.com)
2. Click "New repository" (+ icon)
3. Repository name: `cmc-data-entry-system`
4. Description: `Marine Water Quality Data Entry System for CMC`
5. Set to **Public** (for free Render deployment)
6. **Don't** initialize with README, .gitignore, or license (we already have them)
7. Click "Create repository"

### Option B: Using GitHub CLI (if installed)
```bash
gh repo create cmc-data-entry-system --public --description "Marine Water Quality Data Entry System for CMC"
```

## 📤 Step 3: Push to GitHub

After creating the repository on GitHub, run:

```bash
# Add GitHub remote origin (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/cmc-data-entry-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌍 Step 4: Deploy to Render.com

### 4.1 Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up/Login with GitHub account
3. Connect your GitHub account

### 4.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect to your `cmc-data-entry-system` repository
3. Configure deployment:

**Basic Settings:**
- **Name**: `cmc-data-entry-system`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

**Build & Deploy:**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

**Environment Variables:** (Add these in Render dashboard)
```
NODE_ENV=production
PORT=10000
NEXT_PUBLIC_APP_URL=https://softwireindia.info
NEXT_PUBLIC_APP_NAME=CMC Data Entry System
NEXT_PUBLIC_APP_DESCRIPTION=Marine Water Quality Monitoring System
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 4.3 Custom Domain Setup
1. In Render dashboard, go to your service settings
2. Click "Custom Domains"
3. Add domain: `softwireindia.info`
4. Add domain: `www.softwireindia.info`

### 4.4 Configure DNS with BigRock
In your BigRock DNS management:
```
Type: CNAME
Name: www
Value: [your-render-service].onrender.com

Type: A
Name: @
Value: [Render's IP address provided in dashboard]
```

## 🔄 Step 5: Automatic Deployments

Once connected, Render will automatically:
- Build and deploy on every push to `main` branch
- Show build logs and deployment status
- Provide live URL for your application

## 🧪 Step 6: Test Deployment

After deployment:
1. Visit your Render app URL
2. Test login with demo credentials:
   - **Admin**: `admin` / `admin123`
   - **Analyst**: `analyst` / `analyst123`
3. Verify all features work correctly

## 📋 Step 7: Final Domain Setup

Once DNS propagates (24-48 hours):
1. Visit `https://softwireindia.info`
2. Verify SSL certificate is active
3. Test all application features
4. Update any hardcoded URLs if needed

## 🔧 Commands Summary

```bash
# 1. Navigate to project
cd "d:\Projects\dataentry"

# 2. Initialize and commit
git init
git add .
git commit -m "Initial commit: CMC Data Entry System v1.0.0"

# 3. Add GitHub remote (replace USERNAME)
git remote add origin https://github.com/USERNAME/cmc-data-entry-system.git

# 4. Push to GitHub
git branch -M main
git push -u origin main
```

## 🎯 **Ready for Deployment!**

Your CMC Data Entry System is now:
- ✅ Cleaned and optimized
- ✅ Ready for GitHub
- ✅ Configured for Render deployment
- ✅ Set up for softwireindia.info domain

## 🆘 Troubleshooting

### Build Fails on Render
- Check Node.js version in package.json
- Verify all dependencies are listed
- Check build logs for specific errors

### Domain Not Working
- Verify DNS settings with BigRock
- Allow 24-48 hours for DNS propagation
- Check Render custom domain configuration

### Application Errors
- Check Render logs in dashboard
- Verify environment variables
- Test locally with production build

---

**🎉 Your CMC Data Entry System is ready for production deployment!**
