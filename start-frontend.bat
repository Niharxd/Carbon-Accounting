@echo off
echo ========================================
echo Starting GHG Platform Frontend
echo ========================================
echo.

cd frontend

echo Installing dependencies (if needed)...
if not exist node_modules (
    echo Installing npm packages...
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo Starting Next.js development server...
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
