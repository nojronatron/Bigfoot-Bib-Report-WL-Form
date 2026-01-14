# Project Overview

Single page web page that is launched from another process. A user fills in the form and clicks Submit when done. The external process reads the submitted form data and uses another file to compose a message within the external process.

## File Structure

Project Root:

- README, LICENSE, CONTRIBUTING, .gitignore, and .gitattributes.
- Do not place any code in the project root.

src Directory:

- The directory where most development work occurs.
- `Form.html`: Strictly HTML 5 elements and content necessary for composing into a Winlink Express Form.
- `Template.txt`: Plain-text Winlink Express Template file.
- `script.js`: Strictly JavaScript functional code that will be composed into a `<script>` element in `Form.html`
- `styles.css`: Strictly CSS 3.0 stylesheet language that will be composed into a `<style>` element in `Form.html`

pub Directory:

- Target directory for the copied Winlink Template file and composed Winlink Form file.
- Only the Build script should write/overwrite files into this directory, they should not be edited.
  - `Bigfoot-Bib-Report-Initial.html`:  A Winlink Express Form file comprised of HTML, CSS, and JavaScript located in the `src` directory.
  - `Bigfoot-Bib-Report.txt`: A Winlink Express Template file containing variable placeholders that Winlik Express uses to generate a message from the Form values.

bak Directory:

- Whenever `Build-FormAndTemplate.ps1` executes, a backup of the HTML Form in `pub` is copied to `bak` before the source file is overwritten.
- Do not edit files in this directory, it is only for temporary file backup.

`.github` Directory:

- GitHub Issue templates (bug reports, feature requests, etc).
- Copilot instructions file.

`.vscode` Directory:

- VS Code settings.

## Frameworks and Libraries

- Do not use any frameworks or libraries.
- All code should be written in plain HTML, CSS, and JavaScript/ECMA 2015/ES6.

## Coding Standards

- Use 4 spaces for indentation throughout.
- All HTML, JavaScript, and CSS code are all contained within the Bigfoot-Bib-Report-Initial.html file.
- Use semicolons at the end of javascript statements.
- Use single quotes for strings in JavaScript.
- Use camelCase for variable and function names in JavaScript.
- Use descriptive names for variables and functions.
- Use the area below the comment "// USE THIS SECTION to add event listeners to form elements" for adding event listeners to form elements.
- Use lowercase for HTML tags and attributes.
- Use double quotes for HTML attributes.
- Use semantic HTML elements where appropriate.
- Use lowercase for CSS properties and values.
- Use descriptive names for CSS classes and IDs.
- Avoid using 'var' to declare variables in javascript.
- Use let and const to declare variables in JavaScript.
- Do not use QuerySelector or QuerySelectorAll.
- Prefer GetElementById or GetElementsByClassName.
- Prefer rgb() and rgba() over hex color values.

## Browser Compatibility

- Prefer ES6/ECMA 2015 JavaScript.
- Avoid JavaScript features that are not supported prior to ES6/ECMA 2015.
- Avoid pseudo-elements that target specific browsers, such as `::-ms-input-placeholder`.

## Accessibility

- Ensure that all form elements have associated labels.
- Use ARIA roles and attributes where appropriate to enhance accessibility.
- Ensure that the form is navigable using a keyboard.
- Ensure that the form is usable with screen readers.