#!/usr/bin/env node

/**
 * Knowledge Transfer CLI - AI-Optimized Protocol Management
 * 
 * @fileoverview Command-line interface for managing Knowledge Transfer Protocols
 *               with AI assistant continuity and knowledge evolution features.
 * 
 * @version 1.0.0-alpha
 * @author GitHub Copilot (Claude Sonnet 3.5)
 * @since 2025-09-09
 * 
 * @features
 * - AI-ready project initialization
 * - Automated AI context generation
 * - Knowledge evolution capture
 * - Protocol synchronization
 * - Cross-project learning
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class KnowledgeTransferCLI {
  constructor() {
    this.version = '1.0.0-alpha';
    this.configDir = path.join(process.env.HOME, '.kt-cli');
    this.coreRepoUrl = 'https://raw.githubusercontent.com/knowledge-transfer-protocols/core-ai-context/main';
    
    this.ensureConfigDir();
  }

  /**
   * Ensure CLI configuration directory exists
   */
  ensureConfigDir() {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
      fs.mkdirSync(path.join(this.configDir, 'templates'), { recursive: true });
      fs.mkdirSync(path.join(this.configDir, 'protocols'), { recursive: true });
    }
  }

  /**
   * Main CLI entry point
   */
  async run() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
      case 'new':
        await this.createProject(args[1], args.slice(2));
        break;
      case 'ai':
        await this.handleAICommand(args.slice(1));
        break;
      case 'learn':
        await this.handleLearnCommand(args.slice(1));
        break;
      case 'sync':
        await this.syncProtocols();
        break;
      case 'version':
        console.log(`kt-cli v${this.version}`);
        break;
      case 'help':
      default:
        this.showHelp();
    }
  }

  /**
   * Create new project with AI-ready Knowledge Transfer Protocols
   */
  async createProject(projectName, options) {
    if (!projectName) {
      console.error('❌ Project name required: kt-cli new <project-name>');
      return;
    }

    const projectPath = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(projectPath)) {
      console.error(`❌ Directory ${projectName} already exists`);
      return;
    }

    console.log(`🚀 Creating AI-ready project: ${projectName}`);
    
    // Create project structure
    this.createProjectStructure(projectPath);
    
    // Setup Knowledge Transfer Protocols
    await this.setupProtocols(projectPath);
    
    // Generate AI context
    await this.generateAIContext(projectPath, projectName);
    
    // Initialize git repository
    this.initializeGit(projectPath, projectName);
    
    console.log(`✅ Project ${projectName} created successfully!`);
    console.log(`📁 Location: ${projectPath}`);
    console.log(`🤖 AI Context: ${projectPath}/.kt-context/ai-context.md`);
    console.log(`\n📋 Next steps:`);
    console.log(`   cd ${projectName}`);
    console.log(`   kt-cli ai prepare  # Share context with AI assistant`);
  }

  /**
   * Create standard project directory structure
   */
  createProjectStructure(projectPath) {
    const dirs = [
      'src',
      'tests', 
      'docs',
      'public',
      'data',
      'BestPractices/Generic',
      'BestPractices/ProjectSpecific',
      '.kt-context'
    ];

    fs.mkdirSync(projectPath, { recursive: true });
    
    dirs.forEach(dir => {
      fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
    });

    // Create initial files
    const files = {
      'package.json': this.generatePackageJson(path.basename(projectPath)),
      'README.md': this.generateReadme(path.basename(projectPath)),
      '.gitignore': this.generateGitignore(),
      'src/server.js': this.generateServerTemplate(),
      'tests/test-server.js': this.generateTestTemplate(),
      'docs/API_DOCUMENTATION.md': this.generateAPIDocsTemplate(),
      'data/README.md': '# Data Directory\n\nStore data files and databases here.\n'
    };

    Object.entries(files).forEach(([file, content]) => {
      fs.writeFileSync(path.join(projectPath, file), content);
    });
  }

  /**
   * Setup Knowledge Transfer Protocols
   */
  async setupProtocols(projectPath) {
    console.log('📚 Setting up Knowledge Transfer Protocols...');
    
    // Copy protocols from TSV Ledger (for now, later from GitHub)
    const sourcePath = path.join(__dirname, '../BestPractices/Generic');
    const targetPath = path.join(projectPath, 'BestPractices/Generic');
    
    if (fs.existsSync(sourcePath)) {
      this.copyDirectory(sourcePath, targetPath);
    } else {
      // Fallback: create basic protocols
      this.createBasicProtocols(targetPath);
    }
  }

  /**
   * Generate AI context for the project
   */
  async generateAIContext(projectPath, projectName) {
    console.log('🤖 Generating AI Assistant context...');
    
    const aiContext = `# AI Assistant Context Package
# Project: ${projectName}
# Generated: ${new Date().toISOString()}
# Protocol Version: 1.0.0

## 🎯 PROJECT OVERVIEW
**Name:** ${projectName}
**Type:** Node.js Express Web Application
**Purpose:** [Project purpose - update as needed]
**Technology Stack:** Node.js, Express.js, JSON file storage

## 🧠 CORE PROTOCOLS (Always Apply)
Please read and understand these Knowledge Transfer Protocols:

1. **BestPractices/Generic/CodeOrganizationFramework.md** - Universal project structure
2. **BestPractices/Generic/GitWorkflowPatterns.md** - Professional version control
3. **BestPractices/Generic/DocumentationFramework.md** - Knowledge capture standards

## 📁 PROJECT STRUCTURE
Follow this exact structure (defined in CodeOrganizationFramework.md):
\`\`\`
${projectName}/
├── src/                    # Core application logic
├── tests/                  # Testing framework
├── docs/                   # Documentation
├── public/                 # Frontend assets
├── data/                   # Data storage
├── BestPractices/          # Knowledge Transfer Protocols
└── .kt-context/           # AI context and project memory
\`\`\`

## 🤖 AI BEHAVIOR GUIDELINES
1. **Always follow protocols** - Apply CodeOrganizationFramework.md without deviation
2. **Document everything** - Follow DocumentationFramework.md standards
3. **Use conventional commits** - Apply GitWorkflowPatterns.md for all commits
4. **Maintain consistency** - Keep code style and patterns uniform
5. **Update context** - Keep this file current as project evolves

## ✅ VALIDATION CHECKLIST
Before completing any task, verify:
- [ ] Files are in correct directories per CodeOrganizationFramework.md
- [ ] All functions have JSDoc comments
- [ ] README.md is updated with new features
- [ ] Git commits follow conventional format
- [ ] Code follows established patterns

## 📊 CURRENT PROJECT STATE
**Status:** Initial setup complete
**Last Updated:** ${new Date().toISOString()}
**Files Created:** package.json, basic server, test framework, documentation structure
**Next Steps:** Implement core functionality following protocols

## 🔄 KNOWLEDGE EVOLUTION
Record improvements and lessons learned:
- Protocol effectiveness: [Track how well protocols work]
- AI understanding: [Note any confusion or unclear areas]  
- Process improvements: [Suggest enhancements to protocols]

---
**Instructions for AI Assistant:**
1. Read all protocol files in BestPractices/Generic/
2. Apply these standards to all code and documentation
3. Update this context file as the project evolves
4. Ask for clarification if any protocol is unclear
`;

    fs.writeFileSync(path.join(projectPath, '.kt-context/ai-context.md'), aiContext);
    
    // Create project DNA file
    const projectDNA = {
      name: projectName,
      created: new Date().toISOString(),
      protocols: {
        version: '1.0.0',
        compliance: 'pending',
        adaptations: []
      },
      technology: {
        runtime: 'node.js',
        framework: 'express',
        database: 'json-files'
      },
      patterns: {
        architecture: 'modular-monolith',
        testing: 'unit-tests',
        documentation: 'comprehensive'
      }
    };
    
    fs.writeFileSync(
      path.join(projectPath, '.kt-context/project-dna.json'), 
      JSON.stringify(projectDNA, null, 2)
    );
  }

  /**
   * Handle AI-related commands
   */
  async handleAICommand(args) {
    const subcommand = args[0];
    
    switch (subcommand) {
      case 'prepare':
        await this.prepareAIContext();
        break;
      case 'validate':
        await this.validateAIUnderstanding();
        break;
      case 'handoff':
        await this.generateHandoffPackage();
        break;
      default:
        console.log('AI Commands:');
        console.log('  kt-cli ai prepare   - Generate context for AI assistant');
        console.log('  kt-cli ai validate  - Test AI understanding of protocols');
        console.log('  kt-cli ai handoff   - Create handoff package for new AI session');
    }
  }

  /**
   * Prepare AI context for sharing with assistant
   */
  async prepareAIContext() {
    const contextPath = '.kt-context/ai-context.md';
    
    if (!fs.existsSync(contextPath)) {
      console.error('❌ No AI context found. Run this in a kt-cli project directory.');
      return;
    }
    
    console.log('🤖 Preparing AI Assistant context...');
    console.log('');
    console.log('📋 Share this with your AI Assistant:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('I\'m working on a project that uses Knowledge Transfer Protocols.');
    console.log('Please read and understand this context:');
    console.log('');
    console.log(fs.readFileSync(contextPath, 'utf8'));
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('✅ Copy the above text and share it with your AI assistant');
  }

  /**
   * Copy directory recursively
   */
  copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }

  /**
   * Create basic Knowledge Transfer Protocols when source not available
   */
  createBasicProtocols(targetPath) {
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    // Create CodeOrganizationFramework.md
    const codeOrgContent = `# Code Organization Framework

## Universal Project Structure

This framework provides proven directory organization patterns that work across any technology stack.

### Core Principles

1. **Separation of Concerns**: Each directory has a single, clear purpose
2. **Predictable Structure**: Anyone can navigate the project intuitively
3. **Scalable Organization**: Structure grows gracefully with project complexity

### Standard Directory Structure

\`\`\`
project-root/
├── src/                    # Core application logic
├── tests/                  # Testing framework and test files
├── docs/                   # Documentation and guides
├── public/                 # Static assets and frontend files
├── data/                   # Data files and storage
├── scripts/                # Build, deployment, and utility scripts
├── BestPractices/          # Knowledge Transfer Protocols
│   ├── Generic/           # Universal best practices
│   └── ProjectSpecific/   # Project-specific knowledge
└── .kt-context/           # AI assistant context and project memory
\`\`\`

### Implementation Guidelines

- Keep related functionality together
- Use clear, descriptive naming
- Document directory purposes in README files
- Maintain consistent structure across projects

This organization ensures any developer (or AI assistant) can quickly understand and navigate the codebase.
`;

    // Create GitWorkflowPatterns.md
    const gitWorkflowContent = `# Git Workflow Patterns

## Professional Version Control Standards

This document defines proven Git workflows that ensure code quality and seamless collaboration.

### Conventional Commits

Use descriptive commit messages that follow this pattern:

\`\`\`
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
\`\`\`

#### Commit Types
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code formatting (no logic changes)
- **refactor**: Code restructuring (no functionality change)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

#### Examples
\`\`\`
feat(auth): add user authentication system
fix(api): resolve data validation error
docs(readme): update installation instructions
\`\`\`

### Branch Strategy

- **main**: Production-ready code
- **feature/feature-name**: New feature development
- **fix/bug-description**: Bug fixes
- **docs/documentation-update**: Documentation improvements

### Best Practices

1. Commit early and often
2. Write descriptive commit messages
3. Review changes before committing
4. Keep commits focused on single changes
5. Use pull requests for code review

These patterns ensure clear project history and enable effective AI assistant understanding of development progression.
`;

    // Create DocumentationFramework.md
    const docsFrameworkContent = `# Documentation Framework

## Knowledge Capture and Transfer Standards

This framework ensures comprehensive documentation that enables seamless project understanding and handoffs.

### Documentation Types

#### 1. Project Documentation
- **README.md**: Project overview, setup, and usage
- **API_DOCUMENTATION.md**: API endpoints and usage examples
- **CHANGELOG.md**: Version history and notable changes

#### 2. Code Documentation
- Inline comments for complex logic
- Function and class documentation
- Architecture decision records (ADRs)

#### 3. Process Documentation
- Development workflows
- Deployment procedures
- Testing strategies

### Documentation Standards

#### Writing Guidelines
- Use clear, concise language
- Include practical examples
- Keep documentation current with code changes
- Structure information logically

#### Markdown Best Practices
- Use consistent heading hierarchy
- Include code examples with syntax highlighting
- Add tables for structured information
- Use lists for step-by-step procedures

### AI Assistant Integration

Documentation should enable AI assistants to:
- Understand project context immediately
- Provide accurate guidance
- Maintain consistency across sessions
- Support effective handoffs between developers

### Maintenance

- Review documentation during code reviews
- Update docs when features change
- Archive outdated information
- Validate examples regularly

This framework ensures knowledge is preserved and accessible to both human developers and AI assistants.
`;

    // Create ProtocolEvolutionFramework.md
    const protocolEvolutionContent = `# Protocol Evolution Framework

## Continuous Improvement and Knowledge Sharing System

This framework enables Knowledge Transfer Protocols to evolve and improve through practical application.

### Evolution Principles

1. **Experience-Driven**: Protocols improve based on real-world usage
2. **Evidence-Based**: Changes supported by data and outcomes
3. **Community-Informed**: Shared learnings across projects and teams
4. **AI-Optimized**: Enhanced for AI assistant understanding and application

### Feedback Collection

#### Development Insights
- What patterns worked well?
- Which processes caused friction?
- Where did handoffs fail?
- How did AI assistance perform?

#### Project Outcomes
- Development velocity metrics
- Code quality indicators
- Team satisfaction scores
- Knowledge transfer effectiveness

### Protocol Updates

#### Version Control
- Semantic versioning for protocol changes
- Clear migration guides between versions
- Backward compatibility considerations
- Deprecation timelines for outdated practices

#### Distribution
- Centralized protocol repository
- Automated updates through CLI tools
- Project-specific customizations
- Cross-project learning integration

### Measurement and Analytics

#### Success Metrics
- Time to project understanding for new team members
- AI assistant effectiveness ratings
- Code review efficiency
- Project handoff success rates

#### Continuous Monitoring
- Protocol compliance tracking
- Outcome correlation analysis
- Best practice identification
- Knowledge gap detection

### Community Contribution

- Protocol improvement proposals
- Case study sharing
- Tool enhancement suggestions
- Success story documentation

This framework ensures Knowledge Transfer Protocols remain current, effective, and continuously improving through collective experience.
`;

    // Write the protocol files
    fs.writeFileSync(path.join(targetPath, 'CodeOrganizationFramework.md'), codeOrgContent);
    fs.writeFileSync(path.join(targetPath, 'GitWorkflowPatterns.md'), gitWorkflowContent);
    fs.writeFileSync(path.join(targetPath, 'DocumentationFramework.md'), docsFrameworkContent);
    fs.writeFileSync(path.join(targetPath, 'ProtocolEvolutionFramework.md'), protocolEvolutionContent);
    
    console.log('✅ Created basic Knowledge Transfer Protocols');
  }

  /**
   * Initialize git repository with first commit
   */
  initializeGit(projectPath, projectName) {
    const originalCwd = process.cwd();
    process.chdir(projectPath);
    
    try {
      execSync('git init', { stdio: 'ignore' });
      execSync('git add .', { stdio: 'ignore' });
      execSync(`git commit -m "feat: initial ${projectName} setup with Knowledge Transfer Protocols"`, { stdio: 'ignore' });
      console.log('📝 Git repository initialized with conventional commit');
    } catch (error) {
      console.log('⚠️  Git initialization skipped (git not available)');
    } finally {
      process.chdir(originalCwd);
    }
  }

  /**
   * Generate package.json template
   */
  generatePackageJson(projectName) {
    return JSON.stringify({
      name: projectName,
      version: '1.0.0',
      description: `${projectName} - Built with Knowledge Transfer Protocols`,
      main: 'src/server.js',
      scripts: {
        start: 'node src/server.js',
        dev: 'nodemon src/server.js',
        test: 'node tests/test-server.js'
      },
      dependencies: {
        express: '^4.18.2'
      },
      devDependencies: {
        nodemon: '^3.0.0'
      },
      kt_protocols: {
        version: '1.0.0',
        compliance: 'enforced'
      }
    }, null, 2);
  }

  /**
   * Generate README template
   */
  generateReadme(projectName) {
    return `# ${projectName}

**Built with Knowledge Transfer Protocols v1.0**

## 🎯 Project Overview

[Project description - update as needed]

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
\`\`\`

## 📁 Project Structure

Following CodeOrganizationFramework.md:

\`\`\`
${projectName}/
├── src/                    # Core application logic
├── tests/                  # Testing framework
├── docs/                   # Documentation
├── public/                 # Frontend assets
├── data/                   # Data storage
├── BestPractices/          # Knowledge Transfer Protocols
└── .kt-context/           # AI context and project memory
\`\`\`

## 🤖 AI Assistant Ready

This project includes comprehensive AI context for seamless development:

\`\`\`bash
kt-cli ai prepare    # Share context with AI assistant
kt-cli ai validate   # Test AI understanding
kt-cli ai handoff    # Generate handoff package
\`\`\`

## 📚 Knowledge Transfer Protocols

- **CodeOrganizationFramework.md** - Project structure standards
- **GitWorkflowPatterns.md** - Version control best practices  
- **DocumentationFramework.md** - Knowledge capture standards

## 🔄 Development Workflow

1. **Follow protocols** - Apply all standards consistently
2. **Document changes** - Update README and docs as you build
3. **Test thoroughly** - Maintain comprehensive test coverage
4. **Commit conventionally** - Use conventional commit format

---

**Generated with kt-cli v1.0.0 - Knowledge Transfer Protocol Evolution System**
`;
  }

  /**
   * Generate .gitignore template
   */
  generateGitignore() {
    return `# Dependencies
node_modules/
npm-debug.log*

# Runtime
*.log
.env
.env.local

# Build outputs
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# kt-cli
.kt-context/private/
`;
  }

  /**
   * Generate basic server template
   */
  generateServerTemplate() {
    return `/**
 * ${path.basename(process.cwd())} - Main Express Server
 * 
 * @fileoverview Main server application built with Knowledge Transfer Protocols
 * @version 1.0.0
 * @author [Your name]
 * @since ${new Date().toISOString().split('T')[0]}
 * 
 * @requires express Express.js web framework
 * 
 * @example
 * // Start the server
 * node src/server.js
 * // Access at http://localhost:3000
 */

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    protocols: 'Knowledge Transfer v1.0'
  });
});

// Start server
app.listen(port, () => {
  console.log(\`🚀 Server running at http://localhost:\${port}\`);
  console.log(\`📊 Built with Knowledge Transfer Protocols v1.0\`);
});

module.exports = app;
`;
  }

  /**
   * Generate test template
   */
  generateTestTemplate() {
    return `/**
 * Server Tests
 * 
 * @fileoverview Test suite for main server functionality
 * @follows Knowledge Transfer Protocol testing standards
 */

const http = require('http');

/**
 * Simple test runner following Knowledge Transfer Protocols
 */
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = { passed: 0, failed: 0, total: 0 };
  }

  /**
   * Add test case
   * @param {string} name - Test name
   * @param {Function} testFn - Test function
   */
  test(name, testFn) {
    this.tests.push({ name, testFn });
  }

  /**
   * Run all tests
   */
  async run() {
    console.log('🧪 Running tests...');
    
    for (const { name, testFn } of this.tests) {
      try {
        await testFn();
        console.log(\`✅ \${name}\`);
        this.results.passed++;
      } catch (error) {
        console.log(\`❌ \${name}: \${error.message}\`);
        this.results.failed++;
      }
      this.results.total++;
    }
    
    console.log(\`\n📊 Results: \${this.results.passed}/\${this.results.total} passed\`);
    
    if (this.results.failed > 0) {
      process.exit(1);
    }
  }
}

// Test suite
const runner = new TestRunner();

runner.test('Server health endpoint', async () => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/health',
    method: 'GET'
  };
  
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve();
      } else {
        reject(new Error(\`Expected 200, got \${res.statusCode}\`));
      }
    });
    
    req.on('error', reject);
    req.end();
  });
});

// Run tests
runner.run();
`;
  }

  /**
   * Generate API documentation template
   */
  generateAPIDocsTemplate() {
    return `# API Documentation

**Generated with Knowledge Transfer Protocols v1.0**

## Endpoints

### GET /api/health
Health check endpoint

**Response:**
\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-09-09T12:00:00.000Z",
  "protocols": "Knowledge Transfer v1.0"
}
\`\`\`

---

**Documentation follows DocumentationFramework.md standards**
`;
  }

  /**
   * Show help information
   */
  showHelp() {
    console.log(`
Knowledge Transfer CLI v${this.version}
AI-Optimized Protocol Management System

USAGE:
  kt-cli <command> [options]

COMMANDS:
  new <name>      Create new project with Knowledge Transfer Protocols
  ai prepare      Generate context for AI assistant
  ai validate     Test AI understanding of protocols
  ai handoff      Create handoff package for new AI session
  learn capture   Capture lessons learned during development
  sync            Update to latest protocols
  version         Show version information
  help            Show this help

EXAMPLES:
  kt-cli new my-awesome-app
  kt-cli ai prepare
  kt-cli sync protocols

For more information, visit:
https://github.com/knowledge-transfer-protocols/kt-cli
`);
  }
}

// CLI entry point
if (require.main === module) {
  const cli = new KnowledgeTransferCLI();
  cli.run().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = KnowledgeTransferCLI;
