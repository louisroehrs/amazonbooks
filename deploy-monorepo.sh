#!/bin/bash

echo "🚀 Amazon Books Monorepo Deployment"
echo "==================================="

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

echo "✅ Deploying monorepo (Frontend + Backend)..."
echo "This will deploy both services to the same URL"
echo ""

railway up

echo ""
echo "🎉 Deployment completed!"
echo ""
echo "🌐 Your full-stack app is live at:"
railway domain
echo ""
echo "📊 API endpoints available at:"
echo "  - GET /api/books"
echo "  - POST /api/books"
echo "  - GET /api/books/{id}"
echo "  - POST /api/books/{id}/reviews"
echo ""
echo "🔍 Check logs with:"
echo "railway logs" 