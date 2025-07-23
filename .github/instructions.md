# Project Overview

Single page web page that is launched from another process. A user fills in the form and clicks Submit when done. The external process reads the submitted form data and uses another file to compose a message within the external process.

## File Structure

Bigfoot-Bib-Report-Initial.html

- The main HTML file that contains the form and JavaScript to handle form submission.

Bigfoot-Bib-Report.txt

- The text file containing variable placeholders that the external process uses to generate a message.

## Frameworks and Libraries

- Do not use any frameworks or libraries. The code should be written in plain HTML, CSS, and JavaScript.

## Coding Standards

- Use 2 spaces for indentation throughout.
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
- Use let and const for variable declarations in JavaScript, avoiding var.
- Do not use QuerySelector or QuerySelectorAll. Use GetElementById or GetElementsByClassName instead.

## Browser Compatibility

- Ensure compatibility going back as far as Internet Explorer 11 (IE 11).
- Avoid modern JavaScript features that are not supported prior to ES6.
- Avoid pseudo-elements that target specific browsers, such as `::-ms-input-placeholder`.

## Accessibility

- Ensure that all form elements have associated labels.
- Use ARIA roles and attributes where appropriate to enhance accessibility.
- Ensure that the form is navigable using a keyboard.
- Ensure that the form is usable with screen readers.
