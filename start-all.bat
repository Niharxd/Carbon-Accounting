@echo off
echo ========================================
echo Starting GHG Platform (Full Stack)
echo ========================================
echo.
echo This will start both Backend and Frontend servers
echo.
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to continue...
pause > nul

echo.
echo Starting Backend Server...
start "GHG Backend" cmd /k "cd backend && (if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat) else (echo Using global Python)) && uvicorn main:app --reload"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
start "GHG Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo.
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo.
echo Two command windows will open.
echo Close them to stop the servers.
echo.
pause
