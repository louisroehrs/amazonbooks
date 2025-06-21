#!/bin/bash

# Full Stack Deployment Script for Amazon Books
# This script helps you deploy both the API and UI

echo "🚀 Full Stack Deployment Script for Amazon Books"
echo "================================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed."
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    echo ""
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running."
    echo "Please start Docker first."
    echo ""
    exit 1
fi

echo "✅ Docker is installed and running."
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

echo "🔧 Building and starting the full stack..."
echo "This will build both the API and UI containers."
echo ""

# Build and start the full stack
docker-compose -f docker-compose.full.yml up --build -d

echo ""
echo "✅ Full stack deployment completed!"
echo ""
echo "🌐 Your services are available at:"
echo "   API: http://localhost:8000"
echo "   UI:  http://localhost:3000"
echo ""
echo "📊 API Documentation:"
echo "   Swagger UI: http://localhost:8000/docs"
echo "   ReDoc:      http://localhost:8000/redoc"
echo ""
echo "🔍 Check logs with:"
echo "   docker-compose -f docker-compose.full.yml logs -f"
echo ""
echo "🛑 Stop services with:"
echo "   docker-compose -f docker-compose.full.yml down"
echo ""
echo "🔄 To redeploy, run:"
echo "   docker-compose -f docker-compose.full.yml up --build -d" 