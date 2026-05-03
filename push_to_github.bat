@echo off
echo ===========================================
echo Pushing Mahila Bachat Gat to GitHub...
echo ===========================================
git init
git add .
git commit -m "Full Mahila Bachat Gat Project Upload"
git branch -M main
git remote add origin https://github.com/sammed8355/project17.git
git push -u origin main
echo ===========================================
echo Done! Please check your GitHub Repository.
echo ===========================================
pause
