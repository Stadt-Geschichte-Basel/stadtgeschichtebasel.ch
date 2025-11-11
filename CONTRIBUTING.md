# Contributing to stadtgeschichtebasel.ch

Thank you for your interest in contributing to Stadt.Geschichte.Basel's digital portal! We welcome contributions from the community and are grateful for your support.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

Please note we have a [code of conduct](CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project to ensure a welcoming and inclusive environment for everyone.

## Getting Started

Before you begin contributing:

1. **Read the [README.md](README.md)** to understand the project structure and setup
2. **Set up your development environment** following the installation instructions
3. **Run the existing tests** to ensure your environment is configured correctly:
   ```bash
   pnpm run lint
   pnpm run check
   pnpm run test
   ```

## How to Contribute

### Before Starting Work

When contributing to this repository, please first discuss the change you wish to make:

- **For bug fixes**: Open an issue describing the bug
- **For new features**: Open a feature request issue to discuss the proposal
- **For documentation**: Small fixes can be submitted directly; larger changes should be discussed first
- **For other changes**: Contact the maintainers via [GitHub Discussions](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/discussions)

This helps avoid duplicate work and ensures your contribution aligns with the project's goals.

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**: Fixing issues in existing functionality
- ✨ **Features**: Adding new features or enhancing existing ones
- 📚 **Documentation**: Improving README, guides, or code comments
- 🎨 **UI/UX improvements**: Enhancing the user interface and experience
- ♿ **Accessibility**: Improving accessibility compliance
- 🧪 **Tests**: Adding or improving test coverage
- 🔧 **Maintenance**: Dependency updates, refactoring, or code cleanup

### Setting Up Your Development Branch

1. **Fork the repository** (for external contributors)
2. **Clone your fork** or the main repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/stadtgeschichtebasel.ch.git
   cd stadtgeschichtebasel.ch
   ```
3. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

## Development Guidelines

### Code Style

- **JavaScript/TypeScript**: Follow the ESLint configuration
- **Svelte**: Follow Svelte best practices and the project's component patterns
- **CSS**: Use Tailwind CSS utility classes; avoid custom CSS when possible
- **Formatting**: Use Prettier (run `pnpm run format` before committing)

### Component Guidelines

When creating Svelte components:

1. Place reusable components in `src/lib/components/`
2. Keep components focused and single-purpose
3. Use TypeScript for type safety when appropriate
4. Document complex components with JSDoc comments
5. Ensure components are accessible (WCAG 2.1 AA compliant)

### Testing

- **Write tests** for new features and bug fixes
- **Run tests locally** before submitting:
  ```bash
  pnpm run test        # End-to-end tests
  pnpm run test:unit   # Unit tests
  ```
- **Ensure tests pass** in CI before requesting review
- Use descriptive test names that explain what is being tested

### Accessibility

This project prioritizes accessibility. Please ensure:

- Proper semantic HTML is used
- ARIA labels are provided where necessary
- Keyboard navigation works correctly
- Color contrast meets WCAG standards
- Screen readers can navigate the content

Test your changes with:

- Keyboard navigation (Tab, Enter, Arrow keys)
- Screen reader (NVDA, JAWS, or VoiceOver)
- Browser accessibility tools

## Pull Request Process

### Before Submitting

1. **Ensure your code is clean and tested**:

   ```bash
   pnpm run lint      # Fix linting issues
   pnpm run check     # Check types
   pnpm run test      # Run tests
   pnpm run build     # Ensure it builds successfully
   ```

2. **Update documentation** if needed:
   - Update README.md for new features or changed workflows
   - Add JSDoc comments for new functions or components
   - Update relevant documentation files

3. **Keep changes focused**: Each PR should address a single concern

### Submitting Your Pull Request

1. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub:
   - Use a clear, descriptive title
   - Reference related issues (e.g., "Fixes #123")
   - Describe what changes were made and why
   - Include screenshots for UI changes
   - List any breaking changes

3. **Fill out the PR template** completely

4. **Respond to feedback**: Be open to suggestions and make requested changes

### Review Process

- Pull requests require **approval from at least one maintainer**
- Automated checks (linting, tests, build) must pass
- Reviews typically happen within a few days
- Address review comments by pushing new commits to your branch

### Merging

- You may merge the Pull Request once you have:
  - Approval from at least one maintainer
  - All CI checks passing
  - All review comments addressed
- If you don't have merge permissions, a maintainer will merge it for you

## Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Use the provided tool for consistent commits:

```bash
git add .
pnpm run commit
```

This will guide you through creating a properly formatted commit message.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependency changes
- `ci`: CI configuration changes
- `chore`: Other changes that don't modify src or test files

**Examples:**

```
feat(map): add interactive timeline feature

fix(accessibility): improve keyboard navigation in menu

docs(readme): add troubleshooting section
```

## Reporting Bugs

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Verify the bug** in the latest version
3. **Collect information** about your environment

### Creating a Bug Report

Use the [bug report template](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues/new?template=bug_report.yml) and include:

- Clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)
- Error messages or console logs

## Suggesting Features

### Before Suggesting

1. **Search existing issues** for similar suggestions
2. **Consider if it fits the project scope**
3. **Think about how it benefits users**

### Creating a Feature Request

Use the [feature request template](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues/new?template=feature_request.yml) and include:

- Clear description of the feature
- Problem it solves
- Proposed solution
- Alternative solutions considered
- Mockups or examples (if applicable)
- Willingness to implement it yourself

## Questions?

If you have questions or need help:

- Check the [README.md](README.md) for documentation
- Search [GitHub Discussions](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/discussions)
- Open a new discussion for general questions
- Contact the maintainers: [@maehr](https://github.com/maehr)

## Versioning

We use [SemVer](http://semver.org/) for versioning:

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

Version updates are handled by maintainers during the release process.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project: [GNU Affero General Public License v3.0](LICENSE.md).

---

Thank you for contributing to Stadt.Geschichte.Basel! Your efforts help preserve and share Basel's rich history with the world. 🎉
