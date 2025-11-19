# ✅ Complete Setup Checklist - Make Everything Live!

## 🎯 Goal
Make `www.axionx.uk` and Lovable dashboard the same seamless website with working AI chat powered by Railway backend.

---

## 📋 STEP 1: Fix Railway Backend (5 minutes) ⚠️ DO THIS FIRST

Your Railway API is deployed but not responding because it's missing environment variables.

### **Instructions:**

1. **Open Railway Dashboard:**
   - Go to: https://railway.app
   - Login to your account
   - Find project: **"affectionate-friendship"**
   - Click on the **"web"** service

2. **Add Environment Variables:**
   - Click on the **"Variables"** tab
   - Click **"Add Variable"** or **"New Variable"**
   - Add these 4 variables ONE BY ONE:

   ```
   Variable Name: ANTHROPIC_API_KEY
   Value: [Get from your local .env file]
   ```

   ```
   Variable Name: OPENAI_API_KEY
   Value: [Get from your local .env file]
   ```

   ```
   Variable Name: QDRANT_URL
   Value: [Get from your local .env file]
   ```

   ```
   Variable Name: QDRANT_API_KEY
   Value: [Get from your local .env file]
   ```

3. **Save and Wait:**
   - Click **"Save"** or it auto-saves
   - Railway will automatically redeploy (takes 1-2 minutes)
   - Watch the deployment logs

4. **Verify It Works:**
   - After deployment completes, test with this command:
   ```bash
   curl https://web-production-dd2b1.up.railway.app/
   ```
   - Should return: `{"status":"AxionX Public API 🚀","version":"1.0"}`
   - If you get 502 error, environment variables are still missing or incorrect

---

## 📋 STEP 2: Update Lovable to Connect Custom Domain (10 minutes)

### **Instructions:**

1. **Open Lovable Dashboard:**
   - Go to: https://lovable.app
   - Login to your account
   - Open your project (the one at axionx-demo-showcase.lovable.app)

2. **Add Custom Domain:**
   - Look for **"Settings"** or **"Domains"** section
   - Click **"Add Custom Domain"** or **"Custom Domain"**
   - Enter: `www.axionx.uk`
   - Lovable will show you DNS records to add

3. **Note Down the DNS Instructions:**
   Lovable will give you something like:
   ```
   Type: CNAME
   Name: www
   Value: [something].lovable.app
   
   OR
   
   Type: A
   Name: www
   Value: [IP address]
   ```
   - **Write these down!** You'll need them for IONOS

---

## 📋 STEP 3: Update IONOS DNS Settings (5 minutes)

### **Instructions:**

1. **Open IONOS Dashboard:**
   - Go to: https://www.ionos.com
   - Login to your account
   - Go to **Domains & SSL**
   - Click on **axionx.uk**

2. **Go to DNS Settings:**
   - Click on the **"DNS"** tab (you were already here in the screenshot)
   - Find the **"www"** A record (currently pointing to 185.158.133.1)

3. **Update the Record:**
   
   **Option A: If Lovable gave you a CNAME:**
   - Delete the existing **A** record for **www**
   - Click **"Add record"**
   - Type: **CNAME**
   - Host name: **www**
   - Points to: **[whatever Lovable told you].lovable.app**
   - TTL: **3600** (default)
   - Save

   **Option B: If Lovable gave you an A record:**
   - Click **Edit** on the existing **A** record for **www**
   - Change the value from **185.158.133.1** to **[Lovable's IP]**
   - Save

4. **For Root Domain (Optional):**
   If you want `axionx.uk` (without www) to also work:
   - Update the **@** A record (currently 75.2.60.5)
   - Point it to Lovable's IP as well
   - Or add a redirect from @ to www

5. **Save Changes:**
   - Click **"Save"** or **"Apply"**
   - DNS propagation takes 5-30 minutes (usually faster)

---

## 📋 STEP 4: Activate SSL Certificate (5 minutes)

### **Instructions:**

1. **In IONOS (if handling SSL there):**
   - Still in your axionx.uk domain settings
   - Look for **"SSL certificate"** section
   - Click **"Activate SSL encryption"**
   - Follow the prompts
   - Free Let's Encrypt certificate

2. **OR In Lovable (easier - recommended):**
   - In Lovable dashboard under your custom domain settings
   - Look for **"SSL"** or **"HTTPS"** option
   - Click **"Enable SSL"** or it might be automatic
   - Lovable usually handles SSL automatically once DNS is pointed correctly

3. **Wait for SSL to Activate:**
   - Can take a few minutes to a few hours
   - Your site will be accessible via https://www.axionx.uk

---

## 📋 STEP 5: Deploy Updated Frontend Code to Lovable (2 minutes)

Your frontend code is already updated in GitHub to connect to Railway.

### **Instructions:**

1. **Check Lovable GitHub Connection:**
   - In Lovable dashboard
   - Look for **"Settings"** → **"GitHub Integration"**
   
2. **If Connected to GitHub:**
   - ✅ Already done! Your recent push should auto-deploy
   - Check deployment status in Lovable
   - Look for latest deployment with message: "Connect Lovable frontend to Railway backend API"

3. **If NOT Connected to GitHub:**
   - In Lovable, find the code editor
   - Open `src/components/ChatWidget.jsx`
   - Update line 34 to:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'https://web-production-dd2b1.up.railway.app'
   ```
   - Save and publish

---

## 📋 STEP 6: Test Everything! (5 minutes)

### **Test 1: Railway API**
```bash
# Should return API status
curl https://web-production-dd2b1.up.railway.app/

# Expected response:
# {"status":"AxionX Public API 🚀","version":"1.0"}
```

### **Test 2: Railway AI Question**
```bash
curl -X POST https://web-production-dd2b1.up.railway.app/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is EPM?"}'

# Should return AI-generated answer
```

### **Test 3: Lovable Demo Site**
1. Visit: https://axionx-demo-showcase.lovable.app
2. Click on chat widget
3. Ask: "What deals are in my pipeline?"
4. Should get AI response from your 174 meeting transcripts

### **Test 4: Custom Domain (after DNS propagates)**
1. Visit: https://www.axionx.uk
2. Should show the same site as axionx-demo-showcase.lovable.app
3. Test chat widget - should work the same
4. Check for SSL padlock in browser

---

## 🎯 Expected Results

When everything is working:

```
User visits www.axionx.uk
    ↓
Lovable serves your React app (landing page + demo)
    ↓
User clicks chat widget
    ↓
Asks: "What are my active deals?"
    ↓
Frontend calls Railway API
    ↓
Railway searches 174 meeting transcripts
    ↓
AI generates answer using Claude
    ↓
Response displayed in chat widget
    ↓
Seamless experience! 🎉
```

---

## 🐛 Troubleshooting

### Railway Returns 502
- ❌ Problem: Environment variables not set or incorrect
- ✅ Solution: Double-check all 4 variables in Railway dashboard
- ✅ Check Railway deployment logs for errors

### www.axionx.uk Not Loading
- ❌ Problem: DNS not updated or not propagated yet
- ✅ Solution: Wait 5-30 minutes for DNS propagation
- ✅ Check DNS with: `nslookup www.axionx.uk`
- ✅ Should point to Lovable's servers

### Chat Widget Shows "Trouble Connecting"
- ❌ Problem: Frontend can't reach Railway API
- ✅ Solution: Check browser console (F12) for errors
- ✅ Verify Railway API is responding (test with curl)
- ✅ Check CORS settings in api_public.py (already configured)

### SSL Certificate Not Working
- ❌ Problem: SSL not activated or DNS not propagated
- ✅ Solution: Wait longer for DNS propagation
- ✅ In Lovable, check SSL status for custom domain
- ✅ In IONOS, verify SSL is activated

---

## 📊 Progress Tracker

Track your progress as you go:

- [ ] **Step 1:** Railway environment variables added
- [ ] **Step 1:** Railway API responding (tested with curl)
- [ ] **Step 2:** Custom domain added in Lovable
- [ ] **Step 2:** DNS records noted down
- [ ] **Step 3:** IONOS DNS updated with Lovable records
- [ ] **Step 4:** SSL certificate activated
- [ ] **Step 5:** Frontend code deployed to Lovable
- [ ] **Step 6:** Railway API tested successfully
- [ ] **Step 6:** Chat widget tested on demo site
- [ ] **Step 6:** www.axionx.uk loading correctly
- [ ] **Step 6:** Chat widget working on custom domain

---

## 🎓 Quick Reference

### Your URLs:
- **Production Site:** https://www.axionx.uk (after DNS update)
- **Lovable Demo:** https://axionx-demo-showcase.lovable.app
- **Railway API:** https://web-production-dd2b1.up.railway.app
- **Railway Dashboard:** https://railway.app
- **Lovable Dashboard:** https://lovable.app
- **IONOS Dashboard:** https://www.ionos.com

### Your Architecture:
```
IONOS (Domain)
    ↓ DNS
Lovable (Frontend)
    ↓ API Calls
Railway (Backend)
    ↓ AI Processing
Qdrant + Claude + OpenAI
```

---

## 🚀 Time Estimate

- **If you do everything now:** 30 minutes total
  - Railway: 5 min
  - Lovable domain: 10 min
  - IONOS DNS: 5 min
  - SSL: 5 min
  - Testing: 5 min
  - DNS propagation: 5-30 min (just waiting)

- **If you want everything perfect:** 1-2 hours
  - Includes waiting for DNS propagation
  - Testing thoroughly
  - Tweaking if needed

---

## 💡 Pro Tips

1. **Do Railway first** - Nothing works without the backend
2. **Test each step** - Don't move forward until previous step works
3. **DNS takes time** - Be patient with propagation
4. **Keep dashboards open** - You'll need to switch between them
5. **Check your .env file** - Make sure you copy the correct API keys

---

## ✅ When You're Done

You'll have:
- ✅ Professional domain: www.axionx.uk
- ✅ Lightning-fast Lovable frontend
- ✅ Powerful Railway backend
- ✅ AI chat powered by 174 real meeting transcripts
- ✅ Seamless user experience
- ✅ SSL encryption (HTTPS)
- ✅ Production-ready system!

**Your AI assistant will be live and answering questions from your actual business data!** 🎯

---

Need help with any specific step? Refer back to this checklist and follow the instructions carefully!

