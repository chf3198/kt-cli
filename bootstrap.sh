#!/bin/bash

# Knowledge Transfer CLI Bootstrap Script
# Installs everything needed for Knowledge Transfer Protocols on fresh system
# Version: 1.0.0
# Date: 2025-09-09

set -e  # Exit on any error

echo "🚀 Knowledge Transfer Protocol Bootstrap"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running on Linux (Chromebook)
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
    log_warning "This script is designed for Linux (Chromebook). Proceeding anyway..."
fi

log_info "Step 1: System Update"
echo "Updating system packages..."
sudo apt update > /dev/null 2>&1
log_success "System packages updated"

log_info "Step 2: Install Node.js and npm"
echo "Installing Node.js v18..."

# Check if Node.js is already installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    log_info "Node.js already installed: $NODE_VERSION"
    
    # Check if version is sufficient (v16+)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -lt 16 ]; then
        log_warning "Node.js version too old. Installing latest..."
        INSTALL_NODE=true
    else
        log_success "Node.js version is sufficient"
        INSTALL_NODE=false
    fi
else
    log_info "Node.js not found. Installing..."
    INSTALL_NODE=true
fi

if [ "$INSTALL_NODE" = true ]; then
    # Install Node.js v18
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - > /dev/null 2>&1
    sudo apt-get install -y nodejs > /dev/null 2>&1
    log_success "Node.js installed successfully"
fi

# Verify installation
if command -v node &> /dev/null && command -v npm &> /dev/null; then
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    log_success "Node.js $NODE_VERSION and npm $NPM_VERSION are ready"
else
    log_error "Failed to install Node.js and npm"
    exit 1
fi

log_info "Step 3: Install Git (if needed)"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    log_success "Git already installed: $GIT_VERSION"
else
    log_info "Installing Git..."
    sudo apt install -y git > /dev/null 2>&1
    log_success "Git installed successfully"
fi

log_info "Step 4: Install Knowledge Transfer CLI"

# Option 1: Install from local directory (for development/testing)
if [ -f "./kt-cli.js" ]; then
    log_info "Found local kt-cli.js, installing locally..."
    npm install -g . > /dev/null 2>&1
    log_success "Knowledge Transfer CLI installed from local directory"
    
# Option 2: Install from GitHub (when published)
elif [ "$1" = "--from-github" ]; then
    log_info "Installing from GitHub repository..."
    npm install -g git+https://github.com/knowledge-transfer-protocols/kt-cli.git > /dev/null 2>&1
    log_success "Knowledge Transfer CLI installed from GitHub"
    
# Option 3: Copy from provided directory
elif [ -n "$1" ] && [ -d "$1" ]; then
    log_info "Installing from provided directory: $1"
    cd "$1"
    npm install -g . > /dev/null 2>&1
    log_success "Knowledge Transfer CLI installed from $1"
    
# Option 4: Manual installation instructions
else
    log_warning "kt-cli not found locally. Manual installation required."
    echo ""
    echo "📋 Manual Installation Options:"
    echo ""
    echo "Option A - From transferred CLI directory:"
    echo "  cd /path/to/kt-cli-alpha"
    echo "  sudo npm install -g ."
    echo ""
    echo "Option B - From GitHub (when published):"
    echo "  npm install -g @knowledge-transfer/cli"
    echo ""
    echo "Option C - Direct GitHub install:"
    echo "  npm install -g git+https://github.com/knowledge-transfer-protocols/kt-cli.git"
    echo ""
fi

log_info "Step 5: Verify Installation"

# Test kt-cli installation
if command -v kt-cli &> /dev/null; then
    KT_VERSION=$(kt-cli version 2>/dev/null || echo "version check failed")
    log_success "Knowledge Transfer CLI is ready: $KT_VERSION"
    
    echo ""
    echo "🎉 Bootstrap Complete!"
    echo "===================="
    echo ""
    echo "📋 Next Steps:"
    echo "  1. Create a new project:    kt-cli new my-awesome-project"
    echo "  2. Enter project directory: cd my-awesome-project"
    echo "  3. Prepare AI context:      kt-cli ai prepare"
    echo "  4. Start development:       npm run dev"
    echo ""
    echo "🤖 AI Assistant Integration:"
    echo "  Run 'kt-cli ai prepare' in your project to generate"
    echo "  complete context for your AI coding assistant."
    echo ""
    echo "📚 Documentation:"
    echo "  All projects include Knowledge Transfer Protocols"
    echo "  in the BestPractices/ directory."
    
else
    log_warning "kt-cli not found in PATH. Manual installation may be required."
    echo ""
    echo "🔧 Troubleshooting:"
    echo "  1. Ensure npm global bin directory is in PATH:"
    echo "     echo \$PATH | grep -q \$(npm config get prefix)/bin || echo 'Add npm bin to PATH'"
    echo ""
    echo "  2. Try installing manually:"
    echo "     npm install -g /path/to/kt-cli-directory"
    echo ""
    echo "  3. If still having issues, try:"
    echo "     sudo npm install -g /path/to/kt-cli-directory"
fi

log_info "Step 6: Environment Summary"
echo ""
echo "🖥️  System Environment:"
echo "  OS: $(uname -s) $(uname -r)"
echo "  Node.js: $(node --version 2>/dev/null || echo 'Not found')"
echo "  npm: $(npm --version 2>/dev/null || echo 'Not found')"
echo "  Git: $(git --version 2>/dev/null || echo 'Not found')"
echo "  kt-cli: $(kt-cli version 2>/dev/null || echo 'Not found - manual install needed')"
echo ""

if command -v kt-cli &> /dev/null; then
    echo "✅ Ready to create Knowledge Transfer Protocol projects!"
else
    echo "⚠️  Manual kt-cli installation required. See instructions above."
fi
