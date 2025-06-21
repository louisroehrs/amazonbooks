#!/bin/bash

echo "🚀 Simple Deployment - No Bullshit"
echo "=================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login if needed
if ! railway whoami &> /dev/null; then
    echo "Please login to Railway:"
    railway login
fi

echo "✅ Deploying your app..."
railway up

echo ""
echo "🎉 Done! Your app is live at:"
railway domain 