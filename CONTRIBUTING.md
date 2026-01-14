# Contributing

Thanks for your interest in helping improve this project. Below are concise guidelines to make contributions smooth and reviewable.

## Staging Branch

The term `staging` is generic. Staged code for release will be named with the target release version, for example:

- `staging-v2-5`: Tested, stable code will be released for use with the version tag `v2.5.n` where n will count patches (based on included PRs).

## Quick start

- Search existing [issues](https://github.com/nojronatron/Bigfoot-Bib-Report-WL-Form/issues) before opening a new one.
- If you plan to code, open an issue or comment on an existing issue to state your intent.
- Fork the repo, create a branch named for your change, and target the current `staging` with your PR.

## Report issues and feature requests

- Use the issue template. Provide: reproducible steps, environment (browser, OS), and expected vs actual behavior.
- Keep each issue focused — one problem or one feature per issue.

## Code & pull request guidelines

- Follow the project coding guidance and directory structure definition in `.github/copilot-instructions.md`.
- Keep commits small and focused; write descriptive commit messages.
- Include tests or manual verification notes when relevant.
- In your PR description use the problem → solution → result format and reference related issues (use `#123`).

## Branching and releases

- Base work on current `staging`; PRs should target current `staging` for testing and review.
- After review and approval, changes are merged into the current `staging` and will eventually be promoted to `main` for release.

## Development environment

- No special build tools are required for basic testing — the project is primarily HTML/CSS/JS.
- Recommended: Visual Studio Code for editing and quick debugging. Keep formatting changes minimal to ease reviews.
- Test in multiple browsers (Chrome, Firefox, Edge, mobile browsers) when making UI changes.

## Best practices

- Keep code readable and well-scoped; add short comments for non-obvious logic.
- Preserve existing file conventions (indentation, line endings). See `.gitattributes` and `.gitignore`.
- Avoid large, cosmetic formatting changes in the same PR as functional work.

## Handling merge conflicts

- Rebase or merge the current `staging` into your branch locally and resolve conflicts before opening a PR.
- Helpful resources:
  - [GitHub: Addressing Merge Conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)
  - [Atlassian: Using Branches - Merge Conflicts](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)

## Contact

If you'd like to coordinate directly, email jonrumsey dot dev at gmail with a link to your GitHub profile and the repository name.

## License

See the project `LICENSE` file for terms and contributor obligations.
