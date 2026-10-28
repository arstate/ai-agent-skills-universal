<#
.SYNOPSIS
    launch-visible-chrome.ps1 (Windows PowerShell Edition)
    Fast, visible GUI Chrome launcher with CDP remote debugging enabled (Default port: 9223)

.PARAMETER Port
    Remote debugging port (Default: 9223)

.PARAMETER Url
    Initial URL to navigate to (Default: "about:blank")
#>
[CmdletBinding()]
param(
    [Parameter(Position=0)]
    [int]$Port = 9223,
    
    [Parameter(Position=1)]
    [string]$Url = "about:blank"
)

# 1. Check if Chrome CDP is already running on port
try {
    $resp = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/json/version" -TimeoutSec 1 -ErrorAction Stop
    if ($resp) {
        Write-Host "⚡ Chrome is already running on port $Port." -ForegroundColor Green
        if ($Url -and $Url -ne "about:blank") {
            $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
            $agentCandidates = @(
                (Join-Path $scriptDir "..\cdp_visual_agent.py"),
                (Join-Path $scriptDir "cdp_visual_agent.py"),
                "$env:USERPROFILE\.agents\tools\cdp_visual_agent.py",
                "$env:USERPROFILE\browser-tools\cdp_visual_agent.py"
            )
            foreach ($cand in $agentCandidates) {
                if (Test-Path $cand) {
                    python $cand open "$Url" --port $Port 2>$null
                    break
                }
            }
        }
        exit 0
    }
} catch {
    # Port not listening, proceed to launch
}

# 2. Locate Chrome / Chromium / Edge / Brave executable on Windows
$candidates = @(
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\Application\brave.exe",
    "$env:LOCALAPPDATA\Chromium\Application\chrome.exe"
)

$chromeBin = $null
foreach ($c in $candidates) {
    if ($c -and (Test-Path $c)) {
        $chromeBin = $c
        break
    }
}

if (-not $chromeBin) {
    Write-Error "❌ Google Chrome / Edge / Brave executable not found on Windows."
    Write-Host "👉 Install Chrome or ensure chrome.exe is in LocalAppData or Program Files." -ForegroundColor Yellow
    exit 1
}

# 3. Isolated user profile directory to prevent profile locking
$userDataDir = Join-Path $env:TEMP "chrome-cdp-$Port"
if (-not (Test-Path $userDataDir)) {
    New-Item -ItemType Directory -Path $userDataDir -Force | Out-Null
}

$chromeArgs = @(
    "--remote-debugging-port=$Port",
    "--remote-debugging-address=127.0.0.1",
    "--user-data-dir=$userDataDir",
    "--window-size=1366,840",
    "--window-position=60,40",
    "--disable-blink-features=AutomationControlled",
    "--no-first-run",
    "--no-default-browser-check",
    "--password-store=basic",
    "$Url"
)

Write-Host "🚀 Launching Visible GUI Chrome on Windows (Port: $Port, Executable: $chromeBin)..." -ForegroundColor Cyan
Start-Process -FilePath $chromeBin -ArgumentList $chromeArgs

# 4. Wait up to 5s for CDP endpoint to respond
for ($i = 0; $i -lt 25; $i++) {
    Start-Sleep -Milliseconds 200
    try {
        $check = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/json/version" -TimeoutSec 1 -ErrorAction Stop
        if ($check) {
            Write-Host "✅ Chrome GUI successfully running on port $Port!" -ForegroundColor Green
            exit 0
        }
    } catch {}
}

Write-Warning "Chrome launched, but CDP port $Port did not respond within 5s."
exit 0
