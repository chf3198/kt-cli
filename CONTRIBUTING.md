# Contributing to Knowledge Transfer CLI

We welcome contributions to the Knowledge Transfer CLI project! This document provides guidelines for contributing.

## 🎯 How to Contribute

### 1. Fork and Clone
```bash
git fork https://github.com/knowledge-transfer-protocols/kt-cli.git
git clone https://github.com/YOUR_USERNAME/kt-cli.git
cd kt-cli
```

### 2. Development Setup
```bash
npm install
npm link  # For local testing
```

### 3. Follow Our Protocols
Every contribution must follow the Knowledge Transfer Protocols included in this repository:
- **CodeOrganizationFramework.md** - Code structure standards
- **GitWorkflowPatterns.md** - Version control practices
- **DocumentationFramework.md** - Documentation requirements

### 4. Testing
```bash
# Test the CLI locally
kt-cli new test-project
cd test-project
npm install
npm test
```

### 5. Submit Pull Request
Follow conventional commit messages:
```
feat: add new protocol validation command
fix: resolve package.json template issue
docs: update installation instructions
```

## 🔄 Development Workflow

### Local Testing
```bash
# Link for local development
npm link

# Test CLI commands
kt-cli new test-project
kt-cli ai prepare
```

### Before Submitting
- [ ] Test CLI with new projects
- [ ] Verify AI context generation
- [ ] Update documentation if needed
- [ ] Follow commit message conventions

## 📋 Issue Guidelines

When reporting issues:
1. Include Node.js and npm versions
2. Provide steps to reproduce
3. Include generated project structure if relevant
4. Follow issue templates when available

## 🌟 Feature Requests

We welcome feature requests that enhance knowledge transfer:
- New project templates
- AI assistant integrations
- Protocol improvements
- Validation tools

## 📄 Code of Conduct

- Be respectful and inclusive
- Follow the Knowledge Transfer Protocols
- Help maintain high-quality standards
- Contribute to the knowledge sharing mission

Thank you for contributing to better knowledge transfer practices!
