<#
.SYNOPSIS
    Copies the Apex Legends configuration files to the correct Windows paths and marks them as read-only.

.DESCRIPTION
    The script scans the provided source directory (defaults to the script folder)
    for an autoexec configuration (*.cfg) and a videoconfig (*.txt). It interactively
    asks which files to copy, places them in the default Steam installation folder
    and the Saved Games folder, and marks the destination files as read-only.

.PARAMETER SourcePath
    Path to the configuration files. Default: current script directory.

.PARAMETER ApexInstallPath
    Apex Legends installation path. Default: C:\Program Files (x86)\Steam\steamapps\common\Apex Legends

.PARAMETER SavedGamesPath
    Saved Games path. Default: %USERPROFILE%\Saved Games\Respawn\Apex\local

.PARAMETER Force
    Skips confirmation prompts when overwriting existing files.
#>
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = "Medium")]
param(
    [string]$SourcePath,
    [string]$ApexInstallPath,
    [string]$SavedGamesPath,
    [switch]$Force
)

function Select-ConfigFile {
    param(
        [Parameter(Mandatory)]
        [string]$Pattern,
        [Parameter(Mandatory)]
        [string]$Description,
        [Parameter(Mandatory)]
        [System.IO.FileInfo[]]$Candidates
    )

    if (-not $Candidates -or $Candidates.Count -eq 0) {
        throw "No files found for $Description matching '$Pattern' in the source directory."
    }

    if ($Candidates.Count -eq 1) {
        Write-Host "[OK] Using ${Description}: $($Candidates[0].Name)" -ForegroundColor Green
        return $Candidates[0]
    }

    Write-Host ""
    Write-Host "Multiple files found for $Description :" -ForegroundColor Yellow
    $i = 1
    foreach ($candidate in $Candidates) {
        Write-Host ("[{0}] {1}" -f $i, $candidate.Name)
        $i++
    }
    while ($true) {
        $selection = Read-Host "Enter the number for $Description"
        $parsed = 0
        if ([int]::TryParse($selection, [ref]$parsed)) {
            $index = $parsed
            if ($index -ge 1 -and $index -le $Candidates.Count) {
                $chosen = $Candidates[$index - 1]
                Write-Host "[OK] Using ${Description}: $($chosen.Name)" -ForegroundColor Green
                return $chosen
            }
        }
        Write-Host "Invalid selection, please try again." -ForegroundColor Red
    }
}

function Resolve-PathOrPrompt {
    param(
        [string]$Value,
        [string]$PromptMessage,
        [string]$DefaultPath,
        [switch]$EnsureExists,
        [string]$SubDirectory
    )

    if ($Value) {
        $resolvedValue = Resolve-Path -LiteralPath $Value -ErrorAction SilentlyContinue
        if (-not $resolvedValue) {
            throw "Path '$Value' was not found."
        }
        $fullPath = $resolvedValue.ProviderPath
    } else {
        while ($true) {
            $prompt = if ($DefaultPath) { "$PromptMessage [`$enter` for $DefaultPath]" } else { $PromptMessage }
            $input = Read-Host $prompt
            $path = if ([string]::IsNullOrWhiteSpace($input)) { $DefaultPath } else { $input }

            $resolved = Resolve-Path -LiteralPath $path -ErrorAction SilentlyContinue
            if ($resolved) {
                $fullPath = $resolved.ProviderPath
                break
            }

            if ($EnsureExists) {
                New-Item -Path $path -ItemType Directory -Force | Out-Null
                $fullPath = (Resolve-Path -LiteralPath $path).ProviderPath
                break
            }

            Write-Host "Path '$path' was not found. Please try again." -ForegroundColor Red
        }
    }

    if ($SubDirectory) {
        $fullPath = Join-Path -Path $fullPath -ChildPath $SubDirectory
        if (-not (Test-Path -LiteralPath $fullPath)) {
            New-Item -Path $fullPath -ItemType Directory -Force | Out-Null
        }
    }

    return $fullPath
}

function Copy-And-LockFile {
    param(
        [Parameter(Mandatory)]
        [System.IO.FileInfo]$SourceFile,
        [Parameter(Mandatory)]
        [string]$TargetPath,
        [switch]$Force
    )

    $targetDirectory = Split-Path -Path $TargetPath -Parent
    if (-not (Test-Path -LiteralPath $targetDirectory)) {
        New-Item -Path $targetDirectory -ItemType Directory -Force | Out-Null
    }

    if (Test-Path -LiteralPath $TargetPath) {
        $target = Get-Item -LiteralPath $TargetPath
        if (-not $Force -and -not $PSCmdlet.ShouldContinue("Overwrite file '$TargetPath'?", "Existing file detected")) {
            Write-Host "[WARN] Skipped overwriting $TargetPath." -ForegroundColor Yellow
            return
        }
        $target.IsReadOnly = $false
    }

    Copy-Item -LiteralPath $SourceFile.FullName -Destination $TargetPath -Force
    $copied = Get-Item -LiteralPath $TargetPath
    $copied.IsReadOnly = $true
    Write-Host "[OK] $($SourceFile.Name) -> $TargetPath (read-only)" -ForegroundColor Green
}

try {
    $scriptPath = Split-Path -Parent $PSCommandPath
    $resolvedSource = if ($SourcePath) {
        (Resolve-Path -LiteralPath $SourcePath -ErrorAction Stop).ProviderPath
    } else {
        $scriptPath
    }

    Write-Host "Using source directory: $resolvedSource"

    $autoexecFiles = Get-ChildItem -Path $resolvedSource -Filter "autoexec*.cfg" -File
    $videoFiles = Get-ChildItem -Path $resolvedSource -Filter "videoconfig*.txt" -File

    $autoexec = Select-ConfigFile -Pattern "autoexec*.cfg" -Description "autoexec" -Candidates $autoexecFiles
    $video = Select-ConfigFile -Pattern "videoconfig*.txt" -Description "videoconfig" -Candidates $videoFiles

    $defaultApexPath = "C:\Program Files (x86)\Steam\steamapps\common\Apex Legends"
    $defaultSavedGames = Join-Path -Path $env:USERPROFILE -ChildPath "Saved Games\Respawn\Apex\local"

    $resolvedApex = Resolve-PathOrPrompt -Value $ApexInstallPath -PromptMessage "Enter the Apex installation path" -DefaultPath $defaultApexPath -SubDirectory "cfg"
    $resolvedSaved = Resolve-PathOrPrompt -Value $SavedGamesPath -PromptMessage "Enter the Saved Games path" -DefaultPath $defaultSavedGames -EnsureExists

    Copy-And-LockFile -SourceFile $autoexec -TargetPath (Join-Path -Path $resolvedApex -ChildPath "autoexec.cfg") -Force:$Force
    Copy-And-LockFile -SourceFile $video -TargetPath (Join-Path -Path $resolvedSaved -ChildPath "videoconfig.txt") -Force:$Force

    Write-Host ""
    Write-Host "Done. The files are installed and marked as read-only." -ForegroundColor Cyan
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
