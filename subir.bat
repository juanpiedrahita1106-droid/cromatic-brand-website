@echo off
set PATH=C:\Program Files\Git\cmd;%PATH%
"C:\Program Files\GitHub CLI\gh.exe" repo create cromatic-brand-website --public --source=. --remote=origin --push
