#!/bin/bash

# Yupix Task Management - Development Script
echo "🚀 Starting Yupix Task Management Development Environment"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check and free development ports
echo "🔍 Checking development ports..."
./scripts/check-ports.sh

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building shared types..."
cd packages/types && npm run build && cd ../..

echo "🌐 Starting development servers..."
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔌 Backend API will be available at: http://localhost:3001"
echo "📊 Health check: http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers concurrently
npm run dev 