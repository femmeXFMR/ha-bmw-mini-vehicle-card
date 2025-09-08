#!/bin/bash

# BMW/MINI Vehicle Card - Regular Commit Script
# This script helps ensure regular commits to the repository

echo "🚗 BMW/MINI Vehicle Card - Regular Commit Helper"
echo "================================================"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check git status
echo "📊 Current Git Status:"
git status --short

# Check if there are changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to commit"
    echo "📅 Last commit: $(git log -1 --format='%cd - %s' --date=short)"
    exit 0
fi

# Show what will be committed
echo ""
echo "📝 Changes to be committed:"
git diff --name-only

# Ask for commit message
echo ""
read -p "💬 Enter commit message (or press Enter for auto-message): " commit_msg

# Generate auto-message if none provided
if [ -z "$commit_msg" ]; then
    commit_msg="Update BMW/MINI Vehicle Card - $(date '+%Y-%m-%d %H:%M')"
fi

# Commit and push
echo ""
echo "🔄 Committing changes..."
git add .
git commit -m "$commit_msg"

echo "🚀 Pushing to remote..."
git push

echo ""
echo "✅ Successfully committed and pushed!"
echo "📅 Commit: $(git log -1 --format='%cd - %s' --date=short)"
echo ""
echo "🌐 Repository: https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card"
