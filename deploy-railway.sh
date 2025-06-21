#!/bin/bash

# Railway Deployment Script for Amazon Books API
# This script helps you deploy your FastAPI app to Railway

echo "🚂 Railway Deployment Script for Amazon Books API"
echo "=================================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed."
    echo "Please install it first:"
    echo "npm install -g @railway/cli"
    echo ""
    exit 1
fi

# Check if user is logged in to Railway
if ! railway whoami &> /dev/null; then
    echo "❌ You are not logged in to Railway."
    echo "Please login first:"
    echo "railway login"
    echo ""
    exit 1
fi

echo "✅ Railway CLI is installed and you are logged in."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ This is not a git repository."
    echo "Please initialize git and commit your changes first:"
    echo "git init"
    echo "git add ."
    echo "git commit -m 'Initial commit'"
    echo ""
    exit 1
fi

echo "✅ Git repository detected."
echo ""

# Check if we have a Railway project
if ! railway status &> /dev/null; then
    echo "📝 No Railway project found. Creating a new one..."
    railway init
    echo ""
fi

echo "🚀 Deploying to Railway..."
echo "This will build and deploy your Docker container."
echo ""

# Deploy to Railway
railway up

echo ""
echo "✅ Deployment completed!"
echo ""
echo "🌐 Your app should be available at:"
railway domain
echo ""
echo "📊 View your deployment at:"
echo "https://railway.app/dashboard"
echo ""
echo "🔍 Check logs with:"
echo "railway logs"
echo ""
echo "🔄 To redeploy, run:"
echo "railway up" 