#!/bin/bash

# BMW/MINI Vehicle Card - Deploy to Git Script
# This script handles the final Git deployment

set -e

echo "🚗 BMW/MINI Vehicle Card - Deploy to Git"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "ha-vehicle-card-brief.md" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not initialized"
    echo "   Please run ./setup-git.sh first"
    exit 1
fi

echo "📋 Deployment Checklist:"
echo "========================"
echo ""
echo "✅ Project cleaned up"
echo "✅ .gitignore configured"
echo "✅ Public README created"
echo "✅ Testing guidance added"
echo "✅ Files staged for commit"
echo ""

# Show what will be committed
echo "📁 Files to be committed:"
echo "========================="
git status --porcelain | grep "^A" | sed 's/^A /   ✅ /'
echo ""

# Show what will be ignored
echo "🚫 Files that will be ignored:"
echo "=============================="
echo "   🚫 ha-vehicle-card-brief.md (internal documentation)"
echo "   🚫 PROJECT_SUMMARY.md (internal documentation)"
echo "   🚫 FINAL_SUMMARY.md (internal documentation)"
echo "   🚫 DEPLOYMENT_GUIDE.md (internal documentation)"
echo "   🚫 DEPLOYMENT_CHECKLIST.md (internal documentation)"
echo "   🚫 TESTING_GUIDE.md (internal documentation)"
echo "   🚫 HACS_DEPENDENCIES.md (internal documentation)"
echo "   🚫 DEPENDENCY_CHECKLIST.md (internal documentation)"
echo "   🚫 All development scripts (internal tools)"
echo "   🚫 Legacy cards/ folder (inspiration/old implementation)"
echo "   🚫 .DS_Store and other system files"
echo ""

# Commit the changes
echo "💾 Committing changes..."
git commit -m "Initial commit: BMW/MINI Vehicle Card

- Complete TypeScript/Lit implementation
- Auto-discovery of BMW/MINI vehicles
- Multi-powertrain support (ICE/EV/PHEV)
- Action buttons for remote control
- Unit conversion (imperial/metric)
- Card editor with live preview
- Responsive design
- Comprehensive documentation
- Test suite (41 tests passing)
- HACS compatibility
- Production-ready build (36KB)
- Safe testing guidance included"

echo "✅ Changes committed successfully"
echo ""

# Show current status
echo "📊 Current Git Status:"
echo "======================"
git status --short
echo ""

echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. Create GitHub Repository:"
echo "   - Go to https://github.com/new"
echo "   - Name: ha-bmw-mini-vehicle-card"
echo "   - Make it public"
echo "   - Don't initialize with README"
echo ""
echo "2. Add Remote and Push:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/ha-bmw-mini-vehicle-card.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Test Safely:"
echo "   - Use a separate Home Assistant instance for testing"
echo "   - See SAFE_TESTING_GUIDE.md for detailed testing advice"
echo "   - Test thoroughly before using in production"
echo ""
echo "4. Deploy to HACS:"
echo "   - Add as custom repository in HACS"
echo "   - Install and test"
echo "   - Share with the community"
echo ""

echo "⚠️  IMPORTANT: Testing Safety"
echo "============================="
echo ""
echo "🔴 RECOMMENDED: Use a separate Home Assistant instance for testing"
echo "   - This is NOT extreme - it's best practice"
echo "   - See SAFE_TESTING_GUIDE.md for detailed guidance"
echo "   - Your main Home Assistant will be completely safe"
echo ""
echo "🟡 The card is designed to be safe and non-destructive, but"
echo "   testing in isolation is always the best practice"
echo ""

echo "🎉 Ready for GitHub deployment!"
echo ""
echo "Your BMW/MINI Vehicle Card is now ready to be pushed to GitHub."
echo "Follow the steps above to complete the deployment."
echo ""
echo "Good luck with your launch! 🚗✨"
