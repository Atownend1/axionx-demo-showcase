# AxionX Deployment Guide

Complete guide to deploying your AxionX AI system to production.

## 📋 Pre-Deployment Checklist

- [ ] Backend API tested locally
- [ ] Frontend running locally
- [ ] Environment variables secured
- [ ] GitHub repository updated
- [ ] Domain name ready (optional)

## 🌐 Option 1: Vercel (Frontend) + Railway (Backend)

**Best for**: Quick deployment, automatic scaling, minimal configuration

### Step 1: Deploy Backend to Railway

1. **Sign up at [railway.app](https://railway.app)**
   - Connect your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `AxionXAI/AxionXLaunch`

3. **Configure Settings**
   - Root Directory: `/` (leave default)
   - Start Command: `python api_public.py`
   - Build Command: `pip install -r requirements.txt`

4. **Add Environment Variables**
   ```
   OPENAI_API_KEY=your_key_here
   ANTHROPIC_API_KEY=your_key_here
   QDRANT_URL=your_qdrant_url
   QDRANT_API_KEY=your_qdrant_key
   ```

5. **Deploy**
   - Click "Deploy"
   - Note your Railway URL: `https://axionx-api-production.up.railway.app`

6. **Configure Port**
   - Railway automatically assigns PORT
   - Update `api_public.py` to use `os.getenv("PORT", 8000)`

### Step 2: Deploy Frontend to Vercel

1. **Sign up at [vercel.com](https://vercel.com)**
   - Connect your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Import `AxionXAI/AxionXLaunch`

3. **Configure Build**
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Update API URL**
   Before deploying, update `frontend/vercel.json`:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://axionx-api-production.up.railway.app/:path*"
       },
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

5. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://axionx-launch.vercel.app`

6. **Add Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add `axionx.uk` or your domain
   - Update DNS records as instructed

## 🌐 Option 2: Render (All-in-One)

**Best for**: Single platform, easier management

### Deploy Backend

1. **Go to [render.com](https://render.com)**

2. **New Web Service**
   - Connect GitHub: `AxionXAI/AxionXLaunch`
   - Name: `axionx-api`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `/`
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn api_public:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables**
   Add all your API keys

4. **Deploy**
   - Free tier available
   - Note your URL: `https://axionx-api.onrender.com`

### Deploy Frontend

1. **New Static Site**
   - Connect same repo
   - Name: `axionx-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Update Environment**
   - Add: `API_URL=https://axionx-api.onrender.com`

3. **Update Rewrites**
   Create `frontend/render.yaml`:
   ```yaml
   services:
     - type: web
       name: axionx-frontend
       env: static
       buildCommand: npm install && npm run build
       staticPublishPath: ./dist
       routes:
         - type: rewrite
           source: /api/*
           destination: https://axionx-api.onrender.com/*
   ```

## 🌐 Option 3: Netlify + Railway

**Best for**: Better frontend performance, CDN

### Backend: Railway (Same as Option 1)

### Frontend: Netlify

1. **Go to [netlify.com](https://netlify.com)**

2. **Import Project**
   - Connect `AxionXAI/AxionXLaunch`
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

3. **Update netlify.toml**
   ```toml
   [build]
     base = "frontend"
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/api/*"
     to = "https://your-railway-api.up.railway.app/:splat"
     status = 200
     force = true

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

4. **Deploy**
   - Your site: `https://axionx.netlify.app`
   - Add custom domain in settings

## 🔒 Security Checklist

### Before Going Live

1. **Environment Variables**
   - [ ] All API keys in environment variables
   - [ ] No secrets in code
   - [ ] `.env` file in `.gitignore`

2. **API Security**
   - [ ] CORS configured properly
   - [ ] Rate limiting enabled (if needed)
   - [ ] HTTPS only

3. **Frontend**
   - [ ] No API keys exposed in frontend
   - [ ] Environment-specific builds
   - [ ] Error messages don't leak info

## 🚀 Post-Deployment

### 1. Test Everything

```bash
# Test API
curl https://your-api-url.com/

# Test frontend
open https://your-frontend-url.com

# Test chat widget
# Click "Try AI Assistant" and ask a question
```

### 2. Monitor

- Set up error tracking (Sentry)
- Monitor API response times
- Check logs regularly

### 3. Update DNS (If using custom domain)

For `axionx.uk`:

```
# Add CNAME record
axionx.uk → your-vercel-url.vercel.app

# Or A record (if using Netlify)
@ → Netlify Load Balancer IP
```

## 📊 Cost Estimates

### Free Tier (Getting Started)

- **Frontend**: Vercel Free (100GB bandwidth/month)
- **Backend**: Railway Free ($5 credit/month)
- **Total**: $0-5/month

### Production (Growing)

- **Frontend**: Vercel Pro ($20/month)
- **Backend**: Railway Pro ($5-20/month depending on usage)
- **Total**: $25-40/month

### Enterprise

- **Frontend**: Vercel Enterprise (Custom)
- **Backend**: Dedicated server or serverless
- **Total**: $100+/month

## 🛠️ Maintenance

### Regular Updates

```bash
# Update backend dependencies
pip install --upgrade -r requirements.txt

# Update frontend dependencies
cd frontend
npm update

# Commit and push
git add .
git commit -m "Update dependencies"
git push
```

### Monitoring

- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure alerts for downtime
- Regular security audits

## 🐛 Troubleshooting

### API not responding
- Check Railway/Render logs
- Verify environment variables
- Test API endpoint directly

### CORS errors
- Update `api_public.py` CORS settings
- Verify frontend URL in allowed origins

### Build failures
- Check Node version (use LTS)
- Verify all dependencies installed
- Check build logs

## 📞 Support

- **Issues**: https://github.com/AxionXAI/AxionXLaunch/issues
- **Email**: support@axionx.uk
- **Website**: https://axionx.uk

## ✅ You're Live!

Once deployed, your AxionX AI system will be:
- ✅ Accessible 24/7
- ✅ Automatically scaling
- ✅ Secured with HTTPS
- ✅ Ready for users worldwide

**Next Steps**: Share your link, gather feedback, and iterate!

