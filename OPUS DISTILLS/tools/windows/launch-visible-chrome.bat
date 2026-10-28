@echo off
rem ==============================================================================
rem launch-visible-chrome.bat (Windows CMD / Batch Edition)
rem Fast, visible GUI Chrome launcher with CDP remote debugging enabled (Port: 9223)
rem ==============================================================================
setlocal enabledelayedexpansion

set "PORT=%~1"
if "%PORT%"=="" set "PORT=9223"

set "URL=%~2"
if "%URL%"=="" set "URL=about:blank"

rem 1. Check if Chrome CDP is already running on port
where curl.exe >nul 2>&1
if not errorlevel 1 (
    curl.exe -s "http://127.0.0.1:%PORT%/json/version" >nul 2>&1
) else (
    powershell -NoProfile -Command "try { (Invoke-RestMethod -Uri 'http://127.0.0.1:%PORT%/json/version' -TimeoutSec 1) | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
)
if not errorlevel 1 (
    echo [OK] Chrome is already running and accessible on port %PORT%.
    if not "%URL%"=="about:blank" (
        if exist "%~dp0..\cdp_visual_agent.py" (
            python "%~dp0..\cdp_visual_agent.py" open "%URL%" --port %PORT% >nul 2>&1
        ) else if exist "%~dp0cdp_visual_agent.py" (
            python "%~dp0cdp_visual_agent.py" open "%URL%" --port %PORT% >nul 2>&1
        ) else if exist "%USERPROFILE%\.agents\tools\cdp_visual_agent.py" (
            python "%USERPROFILE%\.agents\tools\cdp_visual_agent.py" open "%URL%" --port %PORT% >nul 2>&1
        )
    )
    exit /b 0
)

rem 2. Locate Chrome / Chromium / Edge / Brave executable on Windows
set "CHROME_BIN="
set "CANDIDATES[0]=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
set "CANDIDATES[1]=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "CANDIDATES[2]=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
set "CANDIDATES[3]=%PROGRAMFILES%\Google\Chrome\Application\chrome.exe"
set "CANDIDATES[4]=%PROGRAMFILES(X86)%\Google\Chrome\Application\chrome.exe"
set "CANDIDATES[5]=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set "CANDIDATES[6]=C:\Program Files\Microsoft\Edge\Application\msedge.exe"
set "CANDIDATES[7]=%LOCALAPPDATA%\BraveSoftware\Brave-Browser\Application\brave.exe"
set "CANDIDATES[8]=%LOCALAPPDATA%\Chromium\Application\chrome.exe"

for /L %%i in (0,1,8) do (
    if not defined CHROME_BIN (
        if exist "!CANDIDATES[%%i]!" (
            set "CHROME_BIN=!CANDIDATES[%%i]!"
        )
    )
)

if not defined CHROME_BIN (
    echo [ERROR] Google Chrome / Edge / Brave executable not found on Windows.
    echo Please install Google Chrome or set CHROME_BIN environment variable.
    exit /b 1
)

rem 3. Isolated user profile directory to prevent session locks
set "USER_DATA_DIR=%TEMP%\chrome-cdp-%PORT%"
if not exist "%USER_DATA_DIR%" mkdir "%USER_DATA_DIR%"

echo [START] Launching Visible GUI Chrome on Windows (Port: %PORT%)...
start "" "%CHROME_BIN%" --remote-debugging-port=%PORT% --remote-debugging-address=127.0.0.1 --user-data-dir="%USER_DATA_DIR%" --window-size=1366,840 --window-position=60,40 --disable-blink-features=AutomationControlled --no-first-run --no-default-browser-check --password-store=basic "%URL%"

rem 4. Wait up to 5s for CDP endpoint to respond (5 iterations x 1s)
for /L %%i in (1,1,5) do (
    timeout /t 1 /nobreak >nul 2>&1
    where curl.exe >nul 2>&1
    if not errorlevel 1 (
        curl.exe -s "http://127.0.0.1:%PORT%/json/version" >nul 2>&1
    ) else (
        powershell -NoProfile -Command "try { (Invoke-RestMethod -Uri 'http://127.0.0.1:%PORT%/json/version' -TimeoutSec 1) | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
    )
    if not errorlevel 1 (
        echo [SUCCESS] Chrome GUI is running and ready on port %PORT%!
        exit /b 0
    )
)

echo [WARNING] Chrome launched, but CDP port %PORT% did not respond within 5 seconds.
exit /b 0
