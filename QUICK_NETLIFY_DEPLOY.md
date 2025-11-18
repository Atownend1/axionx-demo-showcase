# 🚀 Quick Netlify Deploy - 10 Minutes to Live!

## Your Current Situation
- ✅ Code is ready and in GitHub
- ✅ Frontend is beautiful
- ✅ Backend API works
- ❌ Netlify deploys are failing (status 127)

## Why It's Failing
Netlify is trying to deploy your Python backend, but **Netlify is designed for frontends** (HTML/JS/React), not Python backends.

## ✨ The Solution (2 Platforms, 10 Minutes)

```
┌─────────────┐         ┌─────────────┐
│   NETLIFY   │────────>│   RAILWAY   │
│  (Frontend) │  calls  │  (Backend)  │
│             │         │  Python API │
└─────────────┘         └─────────────┘
   Your Site              Your AI API
```

---

## 🎯 PART 1: Deploy Backend to Railway (5 min)

### Step 1: Go to Railway
👉 Open: [railway.app](https://railway.app)

### Step 2: Sign Up
- Click "Login with GitHub"
- Authorize Railway

### Step 3: Deploy
1. Click "New Project"
2. Click "Deploy from GitHub repo"
3. Select **`AxionXAI/AxionXLaunch`**
4. Wait for Railway to detect it's Python ✅

### Step 4: Add Environment Variables
Click "Variables" tab and add:

```
OPENAI_API_KEY         →  sk-proj-...
ANTHROPIC_API_KEY      →  sk-ant-...
QDRANT_URL             →  https://...qdrant.io
QDRANT_API_KEY         →  your-key
```

### Step 5: Get Your URL
1. Click "Settings" → "Networking"
2. Click "Generate Domain"
3. Copy your URL: `https://axionxlaunch-production.up.railway.app`
4. **Save this URL!** You'll need it in a minute.

### Step 6: Test It
```bash
curl https://YOUR-RAILWAY-URL.up.railway.app/

# Should return: {"status":"AxionX Public API 🚀","version":"1.0"}
```

✅ **Backend is LIVE!**

---

## 🎨 PART 2: Deploy Frontend to Netlify (5 min)

### Step 1: Update Frontend with Your Railway URL

On your computer, run:

```bash
cd /Users/alextownend/Desktop/axionx-ai

# Option A: Use the helper script
./update-api-url.sh
# Then paste your Railway URL when prompted

# Option B: Manual update
# Edit these files and replace '/api/ask' with 'YOUR-RAILWAY-URL/ask':
# - frontend/src/components/ChatWidget.jsx
# - frontend/src/pages/Dashboard.jsx
```

### Step 2: Commit and Push

```bash
git add .
git commit -m "Connect frontend to Railway backend"
git push origin main
```

### Step 3: Go to Netlify
👉 Open: [netlify.com](https://netlify.com)

### Step 4: Import Project
1. Click "Add new site"
2. Click "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select **`AxionXAI/AxionXLaunch`**

### Step 5: Configure Build

**IMPORTANT:** Use these exact settings:

```
Base directory:     frontend
Build command:      npm install && npm run build
Publish directory:  frontend/dist
```

### Step 6: Deploy
1. Click "Deploy site"
2. Wait 2-3 minutes for build
3. Get your URL: `https://axionx-something.netlify.app`

### Step 7: Test Everything

1. Open your Netlify URL
2. Click "Try AI Assistant"
3. Ask: "What are the top 3 mistakes in EPM implementations?"
4. 🎉 Get an AI response!

✅ **You're LIVE!**

---

## 🎊 You Now Have:

- ✅ Backend API running 24/7 on Railway
- ✅ Frontend hosted on Netlify's global CDN
- ✅ AI chat widget working
- ✅ Dashboard functional
- ✅ Automatic deploys (push to GitHub → auto-deploy)

## 🔗 Your Live Links

- **Website**: `https://your-site.netlify.app`
- **API**: `https://your-api.up.railway.app`

## 🎨 Add Custom Domain (axionx.uk)

### In Netlify:
1. Site settings → Domain management
2. Add domain: `axionx.uk`
3. Follow Netlify's DNS instructions

### In Your Domain Provider:
Add these DNS records:
```
Type: CNAME
Name: www
Value: your-site.netlify.app

Type: A  
Name: @
Value: 75.2.60.5
```

Wait 10-30 minutes for DNS to propagate.

---

## 💰 Cost

- **Railway**: $5 credit/month (FREE to start)
- **Netlify**: FREE (100GB bandwidth)
- **Total**: $0-5/month

---

## 🐛 Still Not Working?

### Backend Issues:
```bash
# Check Railway logs
# Go to Railway dashboard → Your service → Deployments → View Logs

# Test backend directly
curl https://YOUR-RAILWAY-URL.up.railway.app/
```

### Frontend Issues:
```bash
# Check Netlify logs
# Go to Netlify dashboard → Site → Deploys → Deploy log

# Check browser console
# Press F12 on your site → Look for errors
```

### Chat Widget Not Working:
1. Open browser console (F12)
2. Look for CORS or connection errors
3. Verify Railway URL is correct in your code
4. Make sure you pushed the updated code to GitHub

---

## 📞 Need Help?

- **Netlify Setup Guide**: Check `NETLIFY_SETUP.md` for detailed instructions
- **Troubleshooting**: Check `TROUBLESHOOTING.md` 
- **GitHub**: [AxionXAI/AxionXLaunch](https://github.com/AxionXAI/AxionXLaunch)

---

## ✅ Success Checklist

- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] Environment variables added to Railway
- [ ] Railway URL obtained and tested
- [ ] Frontend code updated with Railway URL
- [ ] Code committed and pushed to GitHub
- [ ] Netlify account created
- [ ] Netlify site configured (frontend directory!)
- [ ] Frontend deployed successfully
- [ ] Chat widget tested - works! ✅
- [ ] Dashboard tested - works! ✅

## 🚀 Your AxionX AI is LIVE!

Time to share your link and get those leads! 🎉

