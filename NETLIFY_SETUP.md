# Netlify Deployment Guide for AxionX

## 🎯 Recommended Setup: Netlify (Frontend) + Railway (Backend)

Since Netlify is primarily for static sites and doesn't support Python backends well, we'll use:
- **Netlify**: For your beautiful frontend (landing page + dashboard)
- **Railway**: For your Python API (free tier available)

This is the best approach for your stack!

## 🚀 Step 1: Deploy Backend to Railway (5 minutes)

### 1.1 Sign Up for Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. It's FREE for starters ($5 credit/month)

### 1.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `AxionXAI/AxionXLaunch`
4. Railway will auto-detect it's a Python app

### 1.3 Configure Environment Variables
In Railway dashboard, go to Variables and add:

```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
PORT=8000
```

### 1.4 Set Start Command
Railway should auto-detect, but if not:
- Settings → Deploy
- Start Command: `python api_public.py`

### 1.5 Deploy & Get URL
1. Click "Deploy"
2. Once deployed, click "Settings" → "Networking"
3. Copy your Railway URL, e.g., `https://axionxlaunch-production.up.railway.app`
4. Test it: `curl https://your-railway-url.up.railway.app/`

✅ **Backend is now live!**

## 🎨 Step 2: Deploy Frontend to Netlify (5 minutes)

### 2.1 Update Frontend to Use Railway API

Update `frontend/src/components/ChatWidget.jsx`:

```javascript
const API_URL = 'https://axionxlaunch-production.up.railway.app';

// In the sendMessage function:
const response = await fetch(`${API_URL}/ask`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: userMessage })
})
```

Update `frontend/src/pages/Dashboard.jsx`:

```javascript
const API_URL = 'https://axionxlaunch-production.up.railway.app';

// In the handleSearch function:
const response = await fetch(`${API_URL}/ask`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: query })
})
```

**Commit these changes:**
```bash
cd /Users/alextownend/Desktop/axionx-ai
git add .
git commit -m "Update frontend to use Railway API"
git push origin main
```

### 2.2 Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub → `AxionXAI/AxionXLaunch`
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/dist`
6. Click "Deploy site"

### 2.3 Get Your Netlify URL
- Your site will be at: `https://axionx-launch.netlify.app`
- You can customize this or add your own domain

✅ **Frontend is now live!**

## 🧪 Step 3: Test Everything

### 3.1 Test Backend
```bash
curl https://your-railway-url.up.railway.app/
# Should return: {"status":"AxionX Public API 🚀","version":"1.0"}

curl -X POST https://your-railway-url.up.railway.app/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the main topics discussed in meetings?"}'
# Should return AI response
```

### 3.2 Test Frontend
1. Open `https://your-site.netlify.app`
2. Click "Try AI Assistant"
3. Ask: "What are the top 3 mistakes in EPM implementations?"
4. Should get a response!

## 🎨 Step 4: Custom Domain (Optional)

### On Netlify:
1. Go to Site settings → Domain management
2. Add custom domain: `axionx.uk`
3. Update DNS records at your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify's IP)
   ```

## 🔧 Alternative: All-in-One Netlify (Advanced)

If you really want everything on Netlify, you'll need to:

1. Deploy your Python API to a separate platform (Railway/Render)
2. Use Netlify Functions as a proxy (already created in `netlify/functions/ask.js`)
3. Set `BACKEND_API_URL` environment variable in Netlify to your Railway URL

**In Netlify Dashboard:**
- Site settings → Build & deploy → Environment
- Add: `BACKEND_API_URL=https://your-railway-url.up.railway.app`

This way Netlify hosts the frontend and proxies API calls to Railway.

## 📊 Cost Breakdown

### Free Tier (Perfect for Starting)
- **Railway**: $5 credit/month (enough for low-medium traffic)
- **Netlify**: 100GB bandwidth/month (plenty for most sites)
- **Total**: FREE

### If You Exceed Free Tier
- **Railway**: Pay-as-you-go ($0.000463/GB-hour)
- **Netlify**: Still free for most use cases
- **Estimated**: $5-20/month for moderate traffic

## ✅ Deployment Checklist

- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] Railway environment variables set
- [ ] Railway URL obtained and tested
- [ ] Frontend updated with Railway API URL
- [ ] Changes committed and pushed to GitHub
- [ ] Netlify account created
- [ ] Frontend deployed to Netlify
- [ ] Netlify build successful
- [ ] Chat widget tested and working
- [ ] Dashboard tested and working
- [ ] Custom domain configured (optional)

## 🆘 Troubleshooting

### Backend Issues
**Problem**: Railway deployment fails
- Check logs in Railway dashboard
- Verify `requirements.txt` is correct
- Ensure all environment variables are set

**Problem**: API returns 500 errors
- Check Railway logs
- Verify API keys are correct
- Test locally first: `python api_public.py`

### Frontend Issues
**Problem**: Chat widget shows "Sorry, something went wrong"
- Open browser console (F12)
- Check for CORS errors
- Verify Railway URL is correct in code
- Make sure Railway backend is running

**Problem**: Build fails on Netlify
- Check Node version (should be 18)
- Clear cache and retry deploy
- Check build logs in Netlify dashboard

### CORS Issues
If you get CORS errors, your Railway API already has CORS configured:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    ...
)
```

## 🎉 Success!

Once deployed:
- ✅ Your API is running 24/7 on Railway
- ✅ Your frontend is blazing fast on Netlify CDN
- ✅ Chat widget connects and responds
- ✅ Dashboard queries work perfectly
- ✅ Everything is automatic and scales

**Share your links:**
- Frontend: `https://axionx-launch.netlify.app`
- API: `https://axionxlaunch-production.up.railway.app`

## 📞 Need Help?

1. Check Railway logs: Dashboard → Deployments → Logs
2. Check Netlify logs: Site → Deploys → Deploy log
3. Test locally first to ensure everything works
4. GitHub Issues: https://github.com/AxionXAI/AxionXLaunch/issues

Your AxionX AI system is now production-ready! 🚀

