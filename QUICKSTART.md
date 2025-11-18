# AxionX Quick Start Guide

Get your AxionX AI system up and running in minutes!

## 🚀 Quick Setup

### 1. Backend API (5 minutes)

```bash
# Navigate to project
cd axionx-ai

# Activate virtual environment
source venv/bin/activate

# Start the API
python api_public.py
```

✅ API running at `http://localhost:8000`

### 2. Frontend (5 minutes)

Open a new terminal:

```bash
# Navigate to frontend
cd axionx-ai/frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

✅ Frontend running at `http://localhost:3000`

## 🌐 Access Your Application

- **Landing Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **API Docs**: http://localhost:8000/docs

## 🎯 Test the System

### Option 1: Use the Chat Widget

1. Open http://localhost:3000
2. Click "Try AI Assistant" button
3. Ask: "What are the main topics discussed in meetings?"

### Option 2: Use the Dashboard

1. Open http://localhost:3000/dashboard
2. Enter a question in the query box
3. Click "Submit Query"

### Option 3: Use curl

```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the top 3 mistakes in EPM implementations?"}'
```

## 🚀 Deploy to Production

### Deploy Frontend (Vercel - Recommended)

1. Push to GitHub ✅ (Already done!)
2. Go to [vercel.com](https://vercel.com)
3. Import `AxionXAI/AxionXLaunch` repository
4. Select `frontend` as root directory
5. Update `vercel.json` with your API URL
6. Deploy!

### Deploy Backend (Railway/Render)

#### Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select `AxionXAI/AxionXLaunch`
4. Add environment variables:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `QDRANT_URL`
   - `QDRANT_API_KEY`
5. Set start command: `python api_public.py`

#### Render

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `python api_public.py`
6. Add environment variables

## 🔧 Environment Variables

Create `.env` file in root directory:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
QDRANT_URL=https://...
QDRANT_API_KEY=...
```

## 📊 What's Included

### Backend
- ✅ Internal API with source attribution
- ✅ Public API for lead generation
- ✅ Vector search with Qdrant
- ✅ AI responses with Claude
- ✅ 1200+ processed meetings

### Frontend
- ✅ Professional landing page
- ✅ AI chat widget
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Ready for deployment

## 🎨 Customization

### Update Branding

Edit `frontend/src/pages/LandingPage.jsx`:
- Change company name
- Update hero text
- Modify feature descriptions
- Update CTA links

### Update API URL for Production

Edit `frontend/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-api-url.com/:path*"
    }
  ]
}
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### API Connection Error

1. Ensure backend is running on port 8000
2. Check `.env` file has correct API keys
3. Verify Qdrant is accessible

### Frontend Build Issues

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📞 Need Help?

- Repository: https://github.com/AxionXAI/AxionXLaunch
- Website: https://axionx.uk
- Email: support@axionx.uk

## 🎉 You're Ready!

Your AxionX AI system is now operational. Start asking questions and let the AI help you leverage your meeting intelligence!

