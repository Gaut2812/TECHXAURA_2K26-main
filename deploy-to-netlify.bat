@echo off
REM Quick Netlify Deployment Setup

echo.
echo =====================================
echo  TECHXAURA - Netlify Deployment
echo =====================================
echo.

echo Step 1: Initialize Git Repository
git init
git add .
git commit -m "Initial commit: TECHXAURA 2K26"

echo.
echo Step 2: Add your GitHub repository
echo.
echo Please enter your GitHub repository URL:
echo (Example: https://github.com/YOUR_USERNAME/techxaura-2k26.git)
echo.
set /p github_url="GitHub URL: "

git remote add origin %github_url%
git branch -M main
git push -u origin main

echo.
echo =====================================
echo  Git Push Complete!
echo =====================================
echo.
echo Next steps:
echo 1. Go to https://netlify.com
echo 2. Sign up/Login with GitHub
echo 3. Click "Add new site" > "Import an existing project"
echo 4. Select your GitHub repository
echo 5. Configure environment variables
echo 6. Deploy!
echo.
echo For detailed instructions, see: NETLIFY_DEPLOYMENT.md
echo.
pause
