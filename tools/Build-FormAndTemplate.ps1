<#
Synopsis: Inline CSS and JS from src folder into target HTML file and copy template to pub.

Usage examples:
  .\Build-FormAndTemplate.ps1                    # use defaults (src/, pub/, default names)
  .\Build-FormAndTemplate.ps1 -SourceDir src -OutDir pub -Form 'Bigfoot-Bib-Report-Initial.html' -Template 'Bigfoot-Bib-Report.txt' -Backup -Validate

Parameters:
  -SourceDir: folder containing `form.html`, `styles.css`, `scripts.js`, `template.txt` (default: src)
  -OutDir: destination directory for composed files (default: pub)
  -Form: output filename for the composed HTML (default: Bigfoot-Bib-Report-Initial.html)
  -Template: output filename for the template copy (default: Bigfoot-Bib-Report.txt)
  -Backup: switch to create timestamped backups of existing outputs in `bak/` before overwriting
  -Validate: run post-build validation checks
  -DryRun: preview changes without writing files
#>

[CmdletBinding()]
param(
    [string]$SourceDir = 'src',
    [string]$OutDir = 'pub',
    [string]$Form = 'Bigfoot-Bib-Report-Initial.html',
    [string]$Template = 'Bigfoot-Bib-Report.txt',
    [switch]$Backup,
    [switch]$Validate,
    [switch]$DryRun,
    [switch]$Strict
)

function Fail([string]$msg) {
    Write-Error $msg; exit 1
}

try {
    # Determine repository root as the parent of the tools script folder
    # Use $PSScriptRoot (folder where this script lives) and take its parent
    $script:repoRoot = Split-Path -Parent $PSScriptRoot
    $srcPath = Join-Path $script:repoRoot $SourceDir

    # Source HTML is 'form.html' in the src directory
    $htmlSrc = Join-Path $srcPath 'form.html'
    $cssSrc = Join-Path $srcPath 'styles.css'
    $jsSrc = Join-Path $srcPath 'scripts.js'
    $templateSrc = Join-Path $srcPath 'template.txt'

    if (-not (Test-Path $htmlSrc)) { Fail "Source HTML not found: $htmlSrc" }
    if (-not (Test-Path $cssSrc)) { Fail "CSS source not found: $cssSrc" }
    if (-not (Test-Path $jsSrc))  { Fail "JS source not found: $jsSrc" }

    $htmlRaw = Get-Content -Raw -Encoding UTF8 $htmlSrc
    $cssRaw = Get-Content -Raw -Encoding UTF8 $cssSrc
    $jsRaw  = Get-Content -Raw -Encoding UTF8 $jsSrc

    # Patterns to locate link and script tags referencing src files
    $linkPattern = '(?im)^(\s*)<link\b[^>]*href\s*=\s*"[^"]*styles\.css"[^>]*>\s*$'
    $scriptPattern = '(?im)^(\s*)<script\b[^>]*src\s*=\s*"[^"]*scripts\.js"[^>]*>\s*</script>\s*$'

    $replacedHtml = $htmlRaw

    # Replace or insert <style> in head
    if ([regex]::IsMatch($replacedHtml, $linkPattern)) {
        $replacedHtml = [regex]::Replace($replacedHtml, $linkPattern, {
            param($m)
            $indent = $m.Groups[1].Value
            return "$indent<style>`r`n$cssRaw`r`n$indent</style>"
        }, 'IgnoreCase')
        Write-Host "Inlined CSS: replaced <link> with <style> block."
    }
    else {
        Write-Warning "No <link> tag referencing styles.css found."
        if ($Strict) { Fail "Strict mode: expected link tag not found." }
    }

    # Replace or insert <script> before </body>
    if ([regex]::IsMatch($replacedHtml, $scriptPattern)) {
        $replacedHtml = [regex]::Replace($replacedHtml, $scriptPattern, {
            param($m)
            $indent = $m.Groups[1].Value
            return "$indent<script>`r`n$jsRaw`r`n$indent</script>"
        }, 'IgnoreCase')
        Write-Host "Inlined JS: replaced external <script> with inline <script> block."
    }
    else {
        Write-Warning "No <script src=...scripts.js> tag found. Attempting to inject before </body>."
        if ($replacedHtml -match '(?im)</body>') {
            $replacedHtml = [regex]::Replace($replacedHtml, '(?im)</body>', "<script>`r`n$jsRaw`r`n</script>`r`n</body>")
            Write-Host "Injected inline <script> before </body>."
        }
        elseif ($Strict) {
            Fail "Strict mode: could not find </body> to inject inline script." }
    }

    # Prepare output directory and target paths
    $outDirPath = Join-Path $script:repoRoot $OutDir
    if (-not (Test-Path $outDirPath)) {
        New-Item -ItemType Directory -Path $outDirPath | Out-Null
        Write-Host "Created output directory: $outDirPath"
    }

    $targetFormPath = Join-Path $outDirPath $Form
    $targetTemplatePath = Join-Path $outDirPath $Template

    function Backup-IfNeeded([string]$path) {
        if ($Backup -and (Test-Path $path -PathType Leaf)) {
            $bakDir = Join-Path $script:repoRoot 'bak'
            if (-not (Test-Path $bakDir)) { New-Item -ItemType Directory -Path $bakDir | Out-Null }
            $fileName = [System.IO.Path]::GetFileName($path)
            $stamp = (Get-Date).ToString('yyyyMMdd-HHmmss')
            $bakPath = Join-Path $bakDir ("$fileName.$stamp.bak")
            Copy-Item -Path $path -Destination $bakPath -Force
            Write-Host "Backup created: $bakPath"
        }
    }

    if ($DryRun) {
        $length = $replacedHtml.Length
        $headLen = 800
        $tailLen = 800

        if ($length -le ($headLen + $tailLen + 50)) {
            Write-Host "DryRun preview (full, length $length chars):`n"
            Write-Host $replacedHtml
        }
        else {
            $head = $replacedHtml.Substring(0, [math]::Min($headLen, $length))
            $tail = $replacedHtml.Substring([math]::Max(0, $length - $tailLen), [math]::Min($tailLen, $length))
            Write-Host "DryRun preview (length $length chars). Showing head ($headLen) and tail ($tailLen):`n"
            Write-Host '----- HEAD -----'
            Write-Host $head
            Write-Host '----- (snip) -----'
            Write-Host '----- TAIL -----'
            Write-Host $tail
        }

        $styleCount = ([regex]::Matches($replacedHtml, '(?is)<style[^>]*>').Count)
        $scriptCount = ([regex]::Matches($replacedHtml, '(?is)<script[^>]*>').Count)
        Write-Host "`nSummary: total chars: $length; <style> blocks: $styleCount; <script> blocks: $scriptCount; Form Target: $targetFormPath; Template Target: $targetTemplatePath"
    }
    else {
        # Backup existing form if requested
        Backup-IfNeeded $targetFormPath

        $replacedHtml | Out-File -FilePath $targetFormPath -Encoding utf8 -Force
        Write-Host "Wrote inlined HTML to: $targetFormPath"

        # Handle template copy: copy template.txt to pub only when content differs
        if (Test-Path $templateSrc) {
            $copyTemplate = $true
            if (Test-Path $targetTemplatePath) {
                try {
                    $srcHash = (Get-FileHash -Path $templateSrc -Algorithm SHA256).Hash
                    $dstHash = (Get-FileHash -Path $targetTemplatePath -Algorithm SHA256).Hash
                    if ($srcHash -eq $dstHash) { $copyTemplate = $false }
                } catch {
                    Write-Warning "Checksum compare failed, will copy template: $_"
                }
            }

            if ($copyTemplate) {
                Backup-IfNeeded $targetTemplatePath
                Copy-Item -Path $templateSrc -Destination $targetTemplatePath -Force
                Write-Host "Copied template to: $targetTemplatePath"
            }
            else { Write-Host "Template unchanged; no copy needed: $targetTemplatePath" }
        }
        else { Write-Warning "Template source not found: $templateSrc" }
    }

    if ($Validate) {
        Write-Host "Running validation checks..."
        $errors = @()
        if ($replacedHtml -match 'href\s*=\s*"[^"]*styles\.css"') { $errors += 'Found leftover styles.css href in output.' }
        if ($replacedHtml -match 'src\s*=\s*"[^"]*scripts\.js"')  { $errors += 'Found leftover scripts.js src in output.' }
        if (-not ($replacedHtml -match '(?is)<style[^>]*>\s*.+\s*</style>')) { $errors += 'No <style> block with content found.' }
        if (-not ($replacedHtml -match '(?is)<script[^>]*>\s*.+\s*</script>')) { $errors += 'No <script> block with content found.' }

        if ($errors.Count -gt 0) {
            Write-Error "Validation failed:`n" + ($errors -join "`n")
            exit 2
        }
        else { Write-Host "Validation passed: inlined CSS and JS appear present and no external refs remain." }
    }

    Write-Host "Done."
}
catch {
    Write-Error "Error: $_"
    exit 1
}
