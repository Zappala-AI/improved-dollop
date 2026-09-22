@echo off
cd /d "%~dp0"
where vercel >nul 2>nul
if %errorlevel%==0 (
  vercel --prod
  goto :end
)
where npx >nul 2>nul
if %errorlevel%==0 (
  npx vercel --prod
  goto :end
)
echo No se encontro Vercel ni npx.
echo Instala Node.js desde https://nodejs.org/ y volve a ejecutar este archivo.
:end
pause
