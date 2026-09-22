@echo off
cd /d "%~dp0"
start "ZAVIAN servidor" cmd /k node "%~dp0server.mjs"
timeout /t 2 /nobreak >nul
start "ZAVIAN panel" http://localhost:8765
