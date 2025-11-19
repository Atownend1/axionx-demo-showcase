# 💜 Lovable + Railway Deployment Guide

## 🎯 Your Current Setup

### **Frontend (Lovable Platform)**
- **Demo App:** https://axionx-demo-showcase.lovable.app
- **Landing Page:** https://www.axionx.uk
- **Platform:** Lovable (lovable.app)
- **Tech:** React + Vite

### **Backend (Railway)**
- **API URL:** https://web-production-dd2b1.up.railway.app
- **Platform:** Railway
- **Tech:** Python FastAPI
- **Data:** 174 meeting transcripts

---

## 🔧 Setup Instructions

### **Step 1: Add Environment Variables to Railway** ⚠️ CRITICAL

Your Railway API needs these environment variables to work:

1. Go to https://railway.app
2. Open project: "affectionate-friendship"
3. Click "web" service
4. Go to "Variables" tab
5. Add these 4 variables (get values from your local `.env` file):

```bash
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-proj-...
QDRANT_URL=https://...qdrant.io
QDRANT_API_KEY=...
```

6. Save → Railway will auto-redeploy (~2 minutes)

### **Step 2: Update CORS in Railway API**

Your Railway API needs to allow requests from Lovable domains. This is already configured in `api_public.py`:

```python
allow_origins=[
    "https://axionx.uk",
    "https://www.axionx.uk",
    "https://*.lovable.app",    # ✅ This allows your Lovable sites
    "https://*.lovable.dev",
    "http://localhost:3000",
    "http://localhost:5173",
    "*"  # Remove this in production for security
]
```

✅ Already done! Your CORS is configured correctly.

### **Step 3: Deploy Updated Frontend to Lovable**

Your `ChatWidget.jsx` is now updated to call Railway directly. To deploy to Lovable:

#### **Option A: Using Lovable's GitHub Integration**
1. Go to https://lovable.app
2. Open your project
3. If connected to GitHub, it will auto-deploy when you push
4. We just need to push the updated code:

```bash
cd /Users/alextownend/Desktop/axionx-ai
git add frontend/src/components/ChatWidget.jsx
git commit -m "Update ChatWidget to call Railway API directly"
git push origin main
```

#### **Option B: Manual Update in Lovable**
1. Go to https://lovable.app
2. Open your project
3. Find `ChatWidget.jsx`
4. Update the API call to use Railway URL
5. Publish changes

### **Step 4: Test the Integration**

Once both are deployed:

1. **Test Railway API directly:**
```bash
curl https://web-production-dd2b1.up.railway.app/

# Should return:
# {"status":"AxionX Public API 🚀","version":"1.0"}
```

2. **Test on Lovable site:**
   - Visit https://axionx-demo-showcase.lovable.app
   - Open chat widget
   - Ask: "What is EPM?"
   - Should get AI-powered response from your 174 meetings

---

## 🌐 How It Works

```
User visits Lovable site
    ↓
Clicks chat widget
    ↓
Types question: "What deals are in my pipeline?"
    ↓
ChatWidget.jsx sends POST to:
https://web-production-dd2b1.up.railway.app/ask
    ↓
Railway API:
  1. Converts question to vector (OpenAI)
  2. Searches 174 meetings (Qdrant)
  3. Generates answer (Claude)
    ↓
Response sent back to Lovable frontend
    ↓
User sees AI answer in chat
```

---

## 📊 Your Complete Architecture

```
┌─────────────────────────────────────────┐
│  www.axionx.uk                          │
│  (Landing Page)                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  axionx-demo-showcase.lovable.app       │
│  (Demo App with Chat Widget)            │
│  Hosted on Lovable Platform             │
└──────────────┬──────────────────────────┘
               │
               │ HTTPS POST /ask
               │
               ▼
┌─────────────────────────────────────────┐
│  web-production-dd2b1.up.railway.app    │
│  Python FastAPI Backend                 │
│  - Processes questions                  │
│  - Searches 174 meeting transcripts     │
│  - Generates AI responses               │
└──────────────┬──────────────────────────┘
               │
               ├─→ Qdrant Cloud (Vector DB)
               │   - 174 meetings as vectors
               │
               ├─→ Anthropic API
               │   - Claude 3 Haiku
               │   - Generates responses
               │
               └─→ OpenAI API
                   - text-embedding-3-small
                   - Converts questions to vectors
```

---

## 🎯 Current Status Checklist

### Railway (Backend)
- [x] Code deployed
- [x] railway.toml configured
- [x] Procfile configured
- [x] CORS configured for Lovable
- [ ] **Environment variables needed** ⚠️
- [ ] Test API health check

### Lovable (Frontend)
- [x] Demo site live: axionx-demo-showcase.lovable.app
- [x] Landing page: www.axionx.uk
- [x] ChatWidget.jsx updated for Railway
- [ ] Deploy updated code
- [ ] Test chat functionality

---

## 🚀 Quick Deploy Steps

```bash
# 1. Push updated frontend code
cd /Users/alextownend/Desktop/axionx-ai
git add frontend/src/components/ChatWidget.jsx
git commit -m "Connect Lovable frontend to Railway backend"
git push origin main

# 2. Add environment variables to Railway
# (Do this in Railway dashboard)

# 3. Test Railway API
curl https://web-production-dd2b1.up.railway.app/

# 4. Test Lovable site
# Visit: https://axionx-demo-showcase.lovable.app
# Use chat widget → Ask a question
```

---

## 🔐 Environment Variables Reference

### Railway Backend (Required)
```bash
ANTHROPIC_API_KEY=sk-ant-api03-...
OPENAI_API_KEY=sk-proj-...
QDRANT_URL=https://xxx-example.qdrant.io
QDRANT_API_KEY=...
```

### Lovable Frontend (Optional)
If you want to override the default Railway URL:
```bash
VITE_API_URL=https://web-production-dd2b1.up.railway.app
```
Set this in Lovable's environment settings if needed.

---

## 🐛 Troubleshooting

### Railway API returns 502
- ❌ Environment variables not set
- ✅ Add them in Railway dashboard

### Chat widget shows "trouble connecting"
- ❌ CORS not configured
- ✅ Already fixed in api_public.py

### Chat widget calls wrong API
- ❌ Old code still deployed on Lovable
- ✅ Push updated ChatWidget.jsx to GitHub

### "Network error" in browser console
- ❌ Railway API not running
- ✅ Check Railway deployment logs

---

## 📝 Next Actions

1. **Now:** Add environment variables to Railway
2. **Next:** Push updated frontend code
3. **Then:** Test the full integration
4. **Finally:** You're live! 🚀

---

## 💡 Why This Setup?

- **Lovable** = Perfect for rapid frontend deployment + hosting
- **Railway** = Best for Python/FastAPI backends with long-running processes
- **Separation** = Frontend and backend can be updated independently
- **Scalability** = Railway can handle heavy AI workloads while Lovable serves static content fast

---

**Your AI assistant is powered by 174 real meeting transcripts (3.4M words) and ready to answer questions about your business!** 🎯

