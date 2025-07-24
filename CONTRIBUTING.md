# Contributing

Thank you for your interest in contributing to this project! I welcome your input and look forward to collaboration.

## Table of Contents

- [Code Contributing Guidelines](#code-contributing-guidelines)
- [Adding Issues and Feature Requests](#adding-issues-and-feature-requests)
- [Development](#development)
- [Branching](#branching)
- [Development Best Practices](#development-best-practices)
- [License](#license)

## Code Contributing Guidelines

1. Fork or clone this repository to start contributing.
2. Create a new branch for your work (e.g., `dev/feature-name` or `patch/issue-id`).
3. All Pull Requests must target the `staging` branch.
4. Assign your PR to **Nojronatron** when ready for review.
5. Follow instructions in `./.github/instructions.md` or ask Copilot for guidance.
6. Ensure your code is clear, documented, and tested.
7. Keep commits focused and descriptive.
8. Resolve merge conflicts before requesting review.
9. Be respectful and collaborative in all interactions.

## Adding Issues and Feature Requests

Use Github's `New Issue` button to create a new Issue or Feature Request, then:

1. Follow the template instructions carefully.
1. If an section or field doesn't apply, don't change anything just move to the next one.
1. Add step-by-step from a common, known starting point to clarify specific path to get to the problem or feature area.
1. Explain the issue or feature with as much context as possible. This will speed-up the process of evaluation and consideration for implementation.
1. Review your entries carefully before submitting.

## Development

This project utilizes HTML, Javascript, CSS, and plain text. Compatibility is biased toward supporting Windows 8 and newer browsers, encompassing browser-supported features from mid 2015 up to today.

Good news for developers is single-page websites have no specific build requirements. It is helpful to have an operable and up-to-date version of Winlink Express installed on (or near) your development machine, as well as a bunch of browsers and devices for testing/viewing results.

This form should support browsers and devices released after early 2015 including Chrome, Firefox, Opera, Edge, Android Chrome and Firefox, and Opera iOS. Note: IE 11 has been out of support for a long time now, and Edge has "IE Compatibility mode" that you can use if you really want to.

If you run across issues using this form in a specific browser, search existing [GitHub Issues](https://github.com/nojronatron/Bigfoot-Bib-Report-WL-Form/issues) before submitting a new one.

### Prerequisites

Highly recommended: VS Code (available for Windows, mac, Linux, and GitHub Codespaces).

Many other IDEs can be used however your changes might be excessive if you reformat the code at any time. [Development best practices](#development-best-practices) has more about information.

### Development Help Wanted

Wanted: _Your help and input developing this form_!

- In-Form documentation.
- Updating code to ensure support all the way back to 2015.
- Refactoring or factoring-out unnecessary functions, elements and attributes, and CSS classes.
- UI operational validation on many devices and platforms.
- Refactoring the UI to better support Web Accessibility best practices for inclusion, maximizing the user-base.

Contact jonrumsey dot dev at gmail dot com with a message about your interest(s) and a link to your Github profile. Be sure to include the name of this repository in the subject line.

### To Develop Locally

1. Fork this repo to your own Github account.
2. Clone this repo to your local dev environment.
3. Create a development branch named appropriately for what work you are about to do.
4. Open the project in your preferred HTML, CSS, and javascript editor/IDE. See [development best practices](#development-best-practices), above.
5. Add, Commit, and Push your changes with appropriate comments.
6. When you are done adding or editing the code, open a [Pull Request](#pull-requests) with appropriate documentation.
7. If there is already an Issue and/or Discussion related to the work, please mention those in your PR Comment using the `#` [shortened linking method](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls#issues-and-pull-requests).

## Branching

This repository uses a Root branching pattern, pointing to _main_.

- Contributing Pull Requests should point to `staging` so they can be tested and vetted.
- `staging` is protected and requires approvals to merge code into it _only from staging_.
- Create your own custom develpment branch(es) and point your PR to `staging` in this repository when your code is ready.
- Any commits, new or patch, must be based on `staging` and ready to merge without merge conflicts in order to be considered (see [Handling merge conflicts](#handling-merge-conflicts) above).

### Pull Requests

A Pull Request should have helpful comments within it:

1. Brief subject line indicating the fix or inhancement.
2. Detailed comments in the body of the PR following the problem-solution-result format.
3. Body of the message should include a link to an associated GitHub Issue using the [shortened linking method](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls#issues-and-pull-requests) with the hash symbol `#`.
4. Include details on which browser(s) are affected.

## Development Best Practices

- Maintain the `.vscode/settings.json` file, it is necessary for development in this repo. If it is changed in the future, you must update it in your local.
- Maintain the files `.gitignore` and `.gitattributes`. These are necessary to keep this codebase clean, and ensure `cr-lf` characters are maintained for Winlink Express.
- Avoid formatting the entire document, it will significantly reduce the value of code-reviewing your PR, and therefore might not be accepted.
- Maintain the existing color scheme and contrasts. Discuss any desired changes with me prior to starting work.
- Ensure you have the lastest version of `main`. If your PR has merge conflicts, I will work with you to help resolve merge conflicts _after you have tried to do so_.

### Handling Merge Conflicts

- [Github: Resolving Merge Conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line).
- [Atlassian: Resolving Merge Conflicts](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts) for help understanding and resolving merge conflicts.

## License

Review this projects [LICENCE](./LICENSE) file as it has code ownership and sharing details you need to know before contributing.
