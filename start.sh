#!/bin/bash
# AxionX API Start Script

echo "🚀 Starting AxionX API..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Start the API
echo "✅ Starting API server..."
python api_public.py

