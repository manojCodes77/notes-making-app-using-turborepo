@echo off
echo Starting Daily Notes Application...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd apps\http-server && npm run dev"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd apps\web && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul
