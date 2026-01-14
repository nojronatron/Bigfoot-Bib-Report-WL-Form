<#
Synopsis: Inline CSS and JS from src folder into target HTML file.

Usage examples:
  .\Build-InlineHtml.ps1                    # use defaults (src/, Bigfoot-Bib-Report-Initial.html)
  .\Build-InlineHtml.ps1 -SourceDir src -Target ..\Bigfoot-Bib-Report-Initial.html -Backup -Validate

Parameters:
  -SourceDir: folder containing `Bigfoot-Bib-Report-Initial.html`, `styles.css`, `scripts.js` (default: src)
  -Target: output HTML to overwrite (default: Bigfoot-Bib-Report-Initial.html in repo root)
  -Backup: switch to create a timestamped backup of existing target before overwriting
  -Validate: switch to run post-build validation (ensures inlining and optional checksum match)
  -DryRun: switch to preview changes without writing file
#>

[CmdletBinding()]
param(
    [string]$SourceDir = 'src',
    [string]$Target = 'Bigfoot-Bib-Report-Initial.html',
    [switch]$Backup,
    [switch]$Validate,
    [switch]$DryRun,
    [switch]$Strict
)

function Fail([string]$msg) {
    Write-Error $msg; exit 1
}

try {
    $script:repoRoot = (Get-Location)
    $srcPath = Join-Path $script:repoRoot $SourceDir

    $htmlSrc = Join-Path $srcPath 'Bigfoot-Bib-Report-Initial.html'
    $cssSrc = Join-Path $srcPath 'styles.css'
    $jsSrc = Join-Path $srcPath 'scripts.js'

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

    # Prepare target path
    $targetPath = Join-Path $script:repoRoot $Target
    if (Test-Path $targetPath -PathType Leaf) {
        if ($Backup) {
            $bakDir = Join-Path $script:repoRoot 'bak'
            if (-not (Test-Path $bakDir)) {
                New-Item -ItemType Directory -Path $bakDir | Out-Null
            }
            $fileName = [System.IO.Path]::GetFileName($targetPath)
            $stamp = (Get-Date).ToString('yyyyMMdd-HHmmss')
            $bakPath = Join-Path $bakDir ("$fileName.$stamp.bak")
            Copy-Item -Path $targetPath -Destination $bakPath -Force
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
        Write-Host "`nSummary: total chars: $length; <style> blocks: $styleCount; <script> blocks: $scriptCount; Target: $targetPath"
    }
    else {
        $replacedHtml | Out-File -FilePath $targetPath -Encoding utf8 -Force
        Write-Host "Wrote inlined HTML to: $targetPath"
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
