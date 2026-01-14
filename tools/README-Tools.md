# Tools for Build and Deploy

- Aggregate the HTML, CSS, and JavaScript source files into a Template and Form file, ready for use in Winlink Express: `Build-FormAndTemplate.ps1`
- Copy Winlink Template and Form files from source to the default Winlink Express installation directory: `Copy-TemplateFromFilesToWinlink.ps1`

## Build

1. Make code edits to file(s) in the `src` directory.
2. Test and debug the JavaScript functions.
3. Verify syntax usages in `template.txt` and `styles.css`
4. Confirm layout, content, and use of supported attributes in `form.html`
5. Execute `Build-FormAndTemplate.ps1` to generate a single-file Winlink Form, incorporating HTML, CSS, and JavaScript from source files.
6. Test and debug the composed form.

## Deploy

1. Build the Form and Template using `Build-FormAndTemplate.ps1`
2. Copy the files to the Winlink Express installation directory using `Copy-TemplateFormFilesToWinlink.ps1`

## Other Tools

Before building the Form:

- Design unit tests to validate JavaScript functions.
- Use Copilot or another AI

After building the Form and Template:

- Copy the Form URL and load it into a browser and use Browser Developer Tools.
- Use several browsers including desktop and mobile devices.

After copying the Form and Template to Winlink Express installation:

- Create a new message, select the template, and exercise the form.
- Use Browser Developer Tools.
- Use several browsers including desktop and mobile devices.

## Build and Deploy Tools Usage Examples

```powershell
# preview only
pwsh -NoProfile -File tools/Build-FormAndTemplate.ps1 -DryRun

# produce output and backup to bak/
pwsh -NoProfile -File tools/Build-FormAndTemplate.ps1 -Backup -Validate

# copy templates and include HTML forms
pwsh -NoProfile -File tools/Copy-TemplateFormFilesToWinlink.ps1 -srcPath './pub' -includeForms
```
