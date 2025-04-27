# Contributing to LegalForge

First off, thank you for considering contributing to LegalForge! It's people like you that make LegalForge such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to conduct@legalforge.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps to reproduce the problem
* Describe the behavior you observed and what you expected to see
* Include screenshots if possible
* Include your environment details (OS, browser, etc.)

### Suggesting Enhancements

If you have a suggestion for a new feature or enhancement:

* Use a clear and descriptive title
* Provide a detailed description of the proposed functionality
* Explain why this enhancement would be useful
* Include mockups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run the tests and ensure they pass
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

#### Pull Request Guidelines

* Follow our coding standards and style guides
* Include tests for new functionality
* Update documentation as needed
* One pull request per feature
* Keep pull requests focused in scope

## Development Setup

1. Install dependencies:
```bash
yarn install
```

2. Set up your environment variables:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
yarn dev
```

### Project Structure

```
legalforge/
├── apps/
│   ├── web/          # Next.js frontend
│   └── server/       # Express backend
├── packages/         # Shared packages
│   ├── ui/          # Shared UI components
│   └── config/      # Shared configuration
└── docs/            # Documentation
```

## Coding Standards

### TypeScript

* Use TypeScript for all new code
* Maintain strict type checking
* Document complex types

### React/Next.js

* Use functional components
* Implement proper error boundaries
* Follow React best practices
* Use proper component composition

### Testing

* Write unit tests for new functionality
* Maintain test coverage above 80%
* Include integration tests where necessary

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` - New features
* `fix:` - Bug fixes
* `docs:` - Documentation changes
* `style:` - Code style changes (formatting, etc.)
* `refactor:` - Code refactoring
* `test:` - Adding or modifying tests
* `chore:` - Maintenance tasks

Example:
```
feat(auth): add password reset functionality

- Add password reset endpoint
- Implement email notification
- Add reset token validation
```

## Documentation

* Update README.md if needed
* Document new features
* Update API documentation
* Include JSDoc comments for functions
* Update changelog

## Review Process

1. All code changes require review
2. Reviewers will check for:
   * Code quality
   * Test coverage
   * Documentation
   * Performance implications
   * Security considerations

## Branch Strategy

* `main` - Production-ready code
* `develop` - Development branch
* `feature/*` - New features
* `bugfix/*` - Bug fixes
* `hotfix/*` - Urgent production fixes

## Getting Help

If you need help, you can:

* Join our [Discord community](https://discord.gg/legalforge)
* Check our [documentation](https://docs.legalforge.com)
* Email the development team at dev@legalforge.com

## License

By contributing to LegalForge, you agree that your contributions will be licensed under its MIT License.