#!/bin/bash

# Script to check and kill processes using development ports
echo "🔍 Checking for processes using development ports..."

# Check port 3000 (Frontend)
if lsof -i :3000 > /dev/null 2>&1; then
    echo "⚠️  Port 3000 is in use. Killing process..."
    lsof -ti :3000 | xargs kill -9
    echo "✅ Port 3000 freed"
else
    echo "✅ Port 3000 is available"
fi

# Check port 3001 (Backend)
if lsof -i :3001 > /dev/null 2>&1; then
    echo "⚠️  Port 3001 is in use. Killing process..."
    lsof -ti :3001 | xargs kill -9
    echo "✅ Port 3001 freed"
else
    echo "✅ Port 3001 is available"
fi

echo "🎯 All development ports are ready!" 