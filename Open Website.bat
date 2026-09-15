@echo off
title HIMAT Consulting Website
echo.
echo  ============================================
echo   HIMAT Consulting - Opening Website...
echo  ============================================
echo.
start "" "%~dp0dist\index.html"
echo  Website opened in your default browser.
echo  No server needed - fully serverless!
echo.
timeout /t 3 /nobreak >nul
