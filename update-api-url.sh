#!/bin/bash
# Script to update frontend API URL

echo "🔧 AxionX API URL Updater"
echo ""
echo "Enter your Railway API URL (e.g., https://axionxlaunch-production.up.railway.app):"
read API_URL

if [ -z "$API_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo ""
echo "📝 Updating ChatWidget.jsx..."

# Update ChatWidget
sed -i.bak "s|const response = await fetch('/api/ask'|const response = await fetch('${API_URL}/ask'|g" frontend/src/components/ChatWidget.jsx

echo "📝 Updating Dashboard.jsx..."

# Update Dashboard
sed -i.bak "s|const response = await fetch('/api/ask'|const response = await fetch('${API_URL}/ask'|g" frontend/src/pages/Dashboard.jsx

echo ""
echo "✅ Updated successfully!"
echo ""
echo "📦 Next steps:"
echo "1. Review the changes: git diff"
echo "2. Commit: git add . && git commit -m 'Update API URL to Railway'"
echo "3. Push: git push origin main"
echo ""
echo "🚀 Netlify will auto-deploy your changes!"

