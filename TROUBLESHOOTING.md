# AxionX Troubleshooting Guide

## 🔴 Common Deployment Issues

### Issue: Deploy Failed with Status 127

**Error Message**: "Exited with status 127 while running your code"

**Cause**: Command or file not found during deployment

**Solutions**:

1. **Check Deployment Platform**
   - Lovable auto-deploys frontends, not Python backends
   - Need to deploy backend separately

2. **For Lovable Frontend**:
   ```bash
   # Deploy only the frontend folder
   # In Lovable settings:
   # - Build directory: frontend
   # - Build command: npm install && npm run build
   # - Output directory: dist
   ```

3. **For Python Backend (Railway)**:
   - Deploy backend separately to Railway
   - Update frontend API URL to point to Railway

### Issue: Chat Widget Shows "Sorry, something went wrong"

**Cause**: Frontend can't connect to backend API

**Solutions**:

1. **Check Backend is Running**
   ```bash
   curl http://localhost:8000/
   # Should return: {"status":"AxionX Public API 🚀","version":"1.0"}
   ```

2. **Update API URL in Frontend**
   
   If backend is deployed to Railway:
   ```javascript
   // frontend/src/components/ChatWidget.jsx
   // Change:
   const response = await fetch('/api/ask', ...
   
   // To:
   const response = await fetch('https://your-railway-url.up.railway.app/ask', ...
   ```

3. **Check CORS Settings**
   Make sure `api_public.py` allows your frontend domain:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Or specify your frontend URL
       ...
   )
   ```

### Issue: Environment Variables Not Working

**Cause**: Missing `.env` file or environment variables

**Solutions**:

1. **Create `.env` file**:
   ```env
   OPENAI_API_KEY=sk-...
   ANTHROPIC_API_KEY=sk-ant-...
   QDRANT_URL=https://...
   QDRANT_API_KEY=...
   ```

2. **In Deployment Platform**:
   - Railway: Settings → Variables
   - Render: Environment → Add Variable
   - Vercel: Settings → Environment Variables

## 🎯 Recommended Deployment Strategy

### Separate Frontend and Backend

**Backend (Railway)**:
1. Create new project in Railway
2. Connect GitHub repo
3. Select root directory
4. Add environment variables
5. Set start command: `uvicorn api_public:app --host 0.0.0.0 --port $PORT`
6. Deploy
7. Note your Railway URL: `https://axionx-api.up.railway.app`

**Frontend (Vercel/Netlify)**:
1. Create new project
2. Connect GitHub repo
3. Set root directory: `frontend`
4. Set build command: `npm install && npm run build`
5. Set output directory: `dist`
6. Update API URL in code to point to Railway
7. Deploy

### Update Frontend to Use Production API

**Option 1: Environment Variables**

Create `frontend/.env.production`:
```env
VITE_API_URL=https://axionx-api.up.railway.app
```

Update `frontend/src/components/ChatWidget.jsx`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api'

const response = await fetch(`${API_URL}/ask`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: userMessage })
})
```

**Option 2: Direct URL**

Update both `ChatWidget.jsx` and `Dashboard.jsx`:
```javascript
const response = await fetch('https://axionx-api.up.railway.app/ask', {
  // ... rest of the code
})
```

## 🐛 Debugging Steps

### 1. Test Backend Locally

```bash
cd axionx-ai
source venv/bin/activate
python api_public.py

# In another terminal:
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "test"}'
```

### 2. Test Frontend Locally

```bash
cd axionx-ai/frontend
npm install
npm run dev

# Visit http://localhost:3000
# Try the chat widget
```

### 3. Check Deployment Logs

**Railway**:
- Dashboard → Your Service → Deployments → View Logs

**Vercel**:
- Dashboard → Your Project → Deployments → View Function Logs

**Netlify**:
- Dashboard → Your Site → Deploys → Deploy Log

### 4. Test Deployed API

```bash
# Replace with your actual API URL
curl https://your-api.up.railway.app/

# Should return:
{"status":"AxionX Public API 🚀","version":"1.0"}
```

### 5. Test Deployed Frontend

1. Open your deployed frontend URL
2. Open browser console (F12)
3. Click chat widget
4. Look for errors in console
5. Check Network tab for failed requests

## 🔧 Quick Fixes

### Fix 1: CORS Error

Add to `api_public.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Fix 2: Port Issues

Update `api_public.py`:
```python
import os
port = int(os.getenv("PORT", 8000))
uvicorn.run(app, host="0.0.0.0", port=port)
```

### Fix 3: Missing Dependencies

```bash
# Add to requirements.txt if missing:
fastapi==0.115.5
uvicorn[standard]==0.32.1
anthropic==0.39.0
qdrant-client==1.12.1
openai==1.54.5
python-dotenv==1.0.1
```

## 📊 Health Check URLs

After deployment, verify these URLs work:

1. **Backend Health**: `https://your-api.com/`
2. **Frontend**: `https://your-frontend.com/`
3. **API Ask Endpoint**: `https://your-api.com/ask` (POST)

## 🆘 Still Having Issues?

1. **Check GitHub Issues**: https://github.com/AxionXAI/AxionXLaunch/issues
2. **Review Logs**: Check deployment platform logs
3. **Test Locally First**: Ensure everything works locally before deploying
4. **Environment Variables**: Double-check all API keys are set correctly

## 💡 Pro Tips

1. **Always test locally first**
2. **Deploy backend before frontend**
3. **Update frontend API URLs after backend is deployed**
4. **Use environment variables for API URLs**
5. **Check CORS settings**
6. **Monitor logs during first deploy**

## ✅ Deployment Checklist

- [ ] Backend tested locally
- [ ] Frontend tested locally
- [ ] Backend deployed and accessible
- [ ] Frontend updated with backend URL
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Test chat widget works
- [ ] Test dashboard works
- [ ] Check browser console for errors
- [ ] Monitor deployment logs

## 🎊 Success!

Once everything is working:
- ✅ Backend returns proper responses
- ✅ Chat widget connects and responds
- ✅ Dashboard queries work
- ✅ No CORS errors
- ✅ No 404 or 500 errors

Your AxionX AI system is now live and operational! 🚀

