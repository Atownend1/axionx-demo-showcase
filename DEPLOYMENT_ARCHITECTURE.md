# 🏗️ AxionX AI Deployment Architecture

## ✅ Correct Setup (What You Should Have)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  USER visits: https://your-site.netlify.app                │
│                                                             │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   NETLIFY (Frontend)          │
        │   - Hosts React app           │
        │   - Serves HTML/CSS/JS        │
        │   - Netlify Function proxies  │
        └───────────┬───────────────────┘
                    │ API calls
                    ▼
        ┌───────────────────────────────┐
        │   RAILWAY (Backend API)       │
        │   - Python FastAPI            │
        │   - api_public.py             │
        │   - URL: web-production-      │
        │     dd2b1.up.railway.app      │
        └───────────┬───────────────────┘
                    │
                    ├─→ Qdrant Cloud (Vector DB)
                    ├─→ Anthropic API (Claude)
                    └─→ OpenAI API (Embeddings)
```

## 🎯 Deployment Steps

### **Step 1: Railway (Backend) - IN PROGRESS**

✅ Code deployed
✅ railway.toml configured
✅ Procfile configured
⚠️  **TODO: Add environment variables**

**Action Required:**
1. Go to Railway dashboard
2. Select "affectionate-friendship" project
3. Click "web" service
4. Go to "Variables" tab
5. Add these 4 variables:
   ```
   ANTHROPIC_API_KEY=your_key
   OPENAI_API_KEY=your_key
   QDRANT_URL=your_url
   QDRANT_API_KEY=your_key
   ```

### **Step 2: Netlify (Frontend) - READY TO DEPLOY**

✅ netlify.toml configured
✅ Netlify function updated with Railway URL
✅ Frontend code ready

**Action Required:**
1. Go to Netlify dashboard
2. Create new site from Git
3. Connect your GitHub repo
4. Set build command: `cd frontend && npm install && npm run build`
5. Set publish directory: `frontend/dist`
6. Deploy!

### **Step 3: Remove Conflicting Configs (Optional)**

You have extra deployment configs that might cause confusion:

**Vercel configs (not needed if using Netlify + Railway):**
- `/vercel.json` - Remove or ignore
- `/frontend/vercel.json` - Remove or ignore

**If you want to use Vercel instead of Netlify:**
- Keep vercel.json files
- Remove netlify.toml files
- Deploy frontend to Vercel
- Backend stays on Railway

## 📋 Configuration Files Explained

### Railway (Backend)
```
railway.toml       → Railway deployment config
Procfile          → Start command for Railway
runtime.txt       → Python version
requirements.txt  → Python dependencies
api_public.py     → Main API file
```

### Netlify (Frontend)
```
netlify.toml                → Netlify config
netlify/functions/ask.js    → Proxy to Railway API
frontend/dist/              → Built React app
```

## 🔐 Environment Variables Needed

### Railway (Backend API)
```bash
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-proj-...
QDRANT_URL=https://...qdrant.io
QDRANT_API_KEY=...
PORT=8000  # Auto-set by Railway
```

### Netlify (Frontend) - Optional
```bash
BACKEND_API_URL=https://web-production-dd2b1.up.railway.app
# Only needed if you want to override the default
```

## 🧪 Testing After Deployment

### Test Railway API (once env vars added):
```bash
# Health check
curl https://web-production-dd2b1.up.railway.app/

# Should return:
# {"status":"AxionX Public API 🚀","version":"1.0"}

# Test question
curl -X POST https://web-production-dd2b1.up.railway.app/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is EPM?"}'
```

### Test Netlify (once deployed):
```bash
# Visit your Netlify URL
https://your-site.netlify.app

# Use the chat widget
# It should call Railway API via Netlify function
```

## 🚀 Quick Start Checklist

- [x] Code pushed to GitHub
- [x] Railway deployment created
- [x] railway.toml configured
- [x] Netlify function updated with Railway URL
- [ ] **Add environment variables to Railway**
- [ ] Test Railway API
- [ ] Deploy frontend to Netlify
- [ ] Test full integration

## ⚡ Current Status

**Backend (Railway):**
🟡 Deployed but needs environment variables

**Frontend (Netlify):**
🟡 Code ready, needs to be deployed

**Next Action:**
👉 Add environment variables to Railway, then deploy frontend to Netlify

---

## 🎓 Why This Architecture?

- **Railway** = Best for Python/FastAPI backends
- **Netlify** = Best for static React frontends + serverless functions
- **Separation** = Frontend and backend can scale independently
- **Netlify Function** = Acts as a secure proxy to your Railway API

