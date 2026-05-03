@echo off
echo ===========================================
echo Pushing Mahila Bachat Gat to GitHub...
echo ===========================================
git init
git config user.email "sammed8355@gmail.com"
git config user.name "Sammed"
git add .
git commit -m "Fix package.json and push project"
git branch -M main
git remote add origin https://github.com/sammed8355/project17.git
git push -u origin main
echo ===========================================
echo Done! Please check your GitHub Repository.
echo ===========================================
pause
