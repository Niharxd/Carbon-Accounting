@echo off
echo ========================================
echo Starting GHG Platform Backend Server
echo ========================================
echo.

cd backend

echo Cleaning Python cache...
for /d /r . %%d in (__pycache__) do @if exist "%%d" rd /s /q "%%d"
del /s /q *.pyc 2>nul

echo Activating virtual environment...
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
    echo Virtual environment activated.
) else (
    echo Warning: Virtual environment not found. Using global Python.
)

echo.
echo Starting FastAPI server...
echo Backend will be available at: http://127.0.0.1:8000
echo Swagger docs at: http://127.0.0.1:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

python -B -m uvicorn main:app --reload --host 127.0.0.1 --port 8000

pause
