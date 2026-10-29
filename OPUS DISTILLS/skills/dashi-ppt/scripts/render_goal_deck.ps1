[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$GoalSpec,

    [Parameter(Position = 1)]
    [string]$OutputHtml,

    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$RemainingArgs
)

Write-Host "================================================================================"
Write-Host "[NOTICE] Dashi PPT runtime executable has been migrated to next-slidedeck-engine."
Write-Host "         All layout blueprints, examples, and theme catalogs are preserved."
Write-Host "         Please use 'next-slidedeck' or 'slidedeck-gen' for 16:9 presentations."
Write-Host "================================================================================"

$nextSlidedeck = Get-Command 'next-slidedeck' -ErrorAction SilentlyContinue
if ($nextSlidedeck) {
    Write-Host "[*] Forwarding to next-slidedeck..."
    & $nextSlidedeck.Source $RemainingArgs
    exit $LASTEXITCODE
}

$localEngineScript = Join-Path $env:USERPROFILE '.agents\skills\next-slidedeck-engine\bin\next-slidedeck.mjs'
if (Test-Path -LiteralPath $localEngineScript) {
    Write-Host "[*] Forwarding to local next-slidedeck-engine..."
    & node $localEngineScript $RemainingArgs
    exit $LASTEXITCODE
}

Write-Error "[!] next-slidedeck not found. Please install next-slidedeck-engine."
exit 1
