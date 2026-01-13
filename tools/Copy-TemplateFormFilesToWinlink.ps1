[CmdletBinding(SupportsShouldProcess=$true)]
Param(
    [Parameter(Mandatory=$false,
    Position=0,
    HelpMessage="Enter the path that contains the files to copy.")]
    [string]$srcPath,
    [Parameter(Mandatory=$false,
    Position=1,
    HelpMessage="Include Form (HTML) files. Specify -includeForms to include them.")]
    [switch]$includeForms
    ,
    [Parameter(Mandatory=$false,
    Position=2,
    HelpMessage="Show this help message and exit.")]
    [switch]$Help
)

$startingPath = $pwd.Path

# Support --help passed as an argument as well as the named parameter
if ($Help -or $args -contains '--help' -or $args -contains '-help') {
    Write-Host "Usage: .\Copy-TemplateFormFilesToWinlink.ps1 [-srcPath <path>] [-includeForms] [--help]" -ForegroundColor Cyan
    Write-Host "" -ForegroundColor Cyan
    Write-Host "Options:" -ForegroundColor Cyan
    Write-Host "  -srcPath <path>      Path containing template files to copy. Defaults to current directory." -ForegroundColor Cyan
    Write-Host "  -includeForms        Include .html form files in addition to required .txt template files." -ForegroundColor Cyan
    Write-Host "  -help                Show this help message and exit." -ForegroundColor Cyan
    Write-Host "" -ForegroundColor Cyan
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\Copy-TemplateFormFilesToWinlink.ps1 -srcPath 'C:\MyTemplates' -includeForms" -ForegroundColor Cyan
    Write-Host "  .\Copy-TemplateFormFilesToWinlink.ps1" -ForegroundColor Cyan
    exit 0
}

if ([string]::IsNullOrEmpty($srcPath)) {
    $userInput = Read-Host "Enter source path (folder) that contains the files to copy (press Enter to use current directory)"
    if ([string]::IsNullOrEmpty($userInput)) { $srcPath = $startingPath } else { $srcPath = $userInput }
}

$winlinkPath = "C:\Winlink Express"
$rmsPath = "C:\RMS Express"
$wleRmsPath = ""


if (Test-Path -Path $winlinkPath) {
    $wleRmsPath = $winlinkPath
}
elseif (Test-Path -Path $rmsPath) {
    $wleRmsPath = $rmsPath
}
else {
    Write-Warning -Message "Unable to find Winlink Express installation directory."
    Read-Host "Press <Enter> to exit"
    exit 1
}

$dstPath = Join-Path -Path $wleRmsPath -ChildPath "Global Folders\Templates"

if (-not (Test-Path -Path $srcPath -PathType Container)) {
    Write-Warning -Message "Source path '$srcPath' not found or is not a folder."
    Read-Host "Press <Enter> to exit"
    exit 1
}

if (-not (Test-Path -Path $dstPath -PathType Container)) {
    Write-Warning -Message "Destination path '$dstPath' not found."
    Read-Host "Press <Enter> to exit"
    exit 1
}

# Find .txt files (required) and .html files (optional)
$txtFiles = Get-ChildItem -Path $srcPath -Filter "*.txt" -File -ErrorAction SilentlyContinue

if (-not $txtFiles -or $txtFiles.Count -eq 0) {
    Write-Warning -Message "No .txt files found in source path '$srcPath'. Nothing to copy."
    Read-Host "Press <Enter> to exit"
    exit 0
}

$htmlFiles = @()
if ($includeForms) {
    $htmlFiles = Get-ChildItem -Path $srcPath -Filter "*.html" -File -ErrorAction SilentlyContinue
}

$filesToCopy = @()
$filesToCopy += $txtFiles
if ($includeForms -and $htmlFiles) { $filesToCopy += $htmlFiles }

# Track successfully copied files
$copiedFiles = @()

try {
    foreach ($f in $filesToCopy) {
        $dstFile = Join-Path -Path $dstPath -ChildPath $f.Name

        if ($PSCmdlet.ShouldProcess("$($f.FullName)", "Copy to $dstFile")) {
            Copy-Item -Path $f.FullName -Destination $dstFile -Force -Verbose
            if (Test-Path -Path $dstFile) {
                $copiedFiles += $f.Name
            }
        }
    }
}
catch {
    Write-Host "Something went wrong while copying files." -ForegroundColor Red
    Write-Host $Error[0]
}
finally {
    Set-Location -Path $startingPath

    # Show destination and list of files copied
    if ($copiedFiles.Count -gt 0) {
        Write-Host "Files copied to: $dstPath" -ForegroundColor Green
        Write-Host "Copied files:" -ForegroundColor Green
        foreach ($cf in $copiedFiles) { Write-Host " - $cf" }
    }
    else {
        Write-Host "No files were copied." -ForegroundColor Yellow
    }
    $dateTimeStamp = Get-Date
    Write-Host "$dateTimeStamp => Operation completed." -ForegroundColor Cyan
}

Write-Host ""

Set-Location -Path $startingPath