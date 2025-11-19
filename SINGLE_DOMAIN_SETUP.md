# 🌐 Single Domain Setup Guide - www.axionx.uk

## 🎯 Goal: Everything Under One Domain

```
www.axionx.uk     → Your main site (Lovable)
api.axionx.uk     → Backend API (Railway)
```

Users only see: **www.axionx.uk** in their browser!

---

## 📋 Step-by-Step Setup

### **STEP 1: Configure Railway for api.axionx.uk** (5 minutes)

1. **Open Railway Dashboard:**
   - Go to: https://railway.app
   - Select "affectionate-friendship" project
   - Click on "web" service

2. **Add Custom Domain:**
   - Click "Settings" tab
   - Scroll to "Domains" section
   - Click "**+ Custom Domain**"
   - Enter: `api.axionx.uk`
   - Click "Add Domain"

3. **Note the DNS Record:**
   Railway will show you something like:
   ```
   CNAME: api.axionx.uk → [some-id].up.railway.app
   ```
   **Write this down!** You'll need it for IONOS.

4. **Generate SSL Certificate:**
   - Railway will automatically provision SSL
   - Just wait a few minutes after adding the domain

---

### **STEP 2: Configure Lovable for www.axionx.uk** (5 minutes)

1. **Open Lovable Dashboard:**
   - Go to: https://lovable.app
   - Open your AxionX project

2. **Add Custom Domain:**
   - Go to **Settings** → **Domains** (or similar section)
   - Click "**Add Custom Domain**"
   - Enter: `www.axionx.uk`

3. **Note the DNS Records:**
   Lovable will give you DNS records, typically:
   ```
   CNAME: www → [your-project].lovable.app
   OR
   A Record: www → [IP address]
   ```
   **Write these down!** You'll need them for IONOS.

4. **Enable SSL:**
   - Lovable usually auto-enables SSL
   - Check the "SSL" or "HTTPS" toggle

---

### **STEP 3: Update DNS in IONOS** (10 minutes)

1. **Open IONOS Dashboard:**
   - Go to: https://www.ionos.com
   - Login
   - Go to **Domains & SSL**
   - Click on **axionx.uk**
   - Click **DNS** tab

2. **Add API Subdomain (for Railway):**
   - Click "**Add record**"
   - Type: **CNAME**
   - Host name: **api**
   - Points to: **[Railway's CNAME from Step 1]**
   - TTL: **3600** (1 hour)
   - Click **Save**

3. **Update WWW Record (for Lovable):**
   
   **If Lovable gave you a CNAME:**
   - Find existing **www** A record
   - Click **Edit** or **Delete** it
   - Click "**Add record**"
   - Type: **CNAME**
   - Host name: **www**
   - Points to: **[Lovable's CNAME from Step 2]**
   - TTL: **3600**
   - Click **Save**

   **If Lovable gave you an A record:**
   - Find existing **www** A record
   - Click **Edit**
   - Change IP to: **[Lovable's IP from Step 2]**
   - Click **Save**

4. **Optional: Root Domain Redirect:**
   
   To make `axionx.uk` (without www) redirect to `www.axionx.uk`:
   - Add an A record for **@** pointing to Lovable's IP
   - OR set up a redirect in IONOS settings
   - OR add a CNAME for **@** → **www.axionx.uk** (if IONOS allows)

5. **Enable SSL in IONOS:**
   - Still in axionx.uk domain settings
   - Find "**SSL certificate**" section
   - Click "**Activate SSL encryption**"
   - Choose: **Let's Encrypt** (free)
   - Apply to: **www.axionx.uk** and **api.axionx.uk**

---

### **STEP 4: Update Frontend Code** (2 minutes)

Update your ChatWidget to use the new API domain:

```javascript
// frontend/src/components/ChatWidget.jsx
const API_URL = import.meta.env.VITE_API_URL || 'https://api.axionx.uk'
```

I'll do this for you automatically!

---

### **STEP 5: Wait for DNS Propagation** (5-30 minutes)

After updating DNS:
- Changes take 5-30 minutes to propagate
- Check status: `nslookup www.axionx.uk`
- Check status: `nslookup api.axionx.uk`

Expected results:
```bash
$ nslookup www.axionx.uk
# Should point to Lovable's servers

$ nslookup api.axionx.uk  
# Should point to Railway's servers
```

---

## 🧪 Testing Your Setup

### **Test 1: API Domain**

```bash
# Should return API status
curl https://api.axionx.uk/

# Expected:
# {"status":"AxionX Public API 🚀","version":"1.0"}
```

### **Test 2: Main Website**

```bash
# Visit in browser:
https://www.axionx.uk

# Should show your Lovable app
```

### **Test 3: Chat Widget**

1. Visit: https://www.axionx.uk
2. Click chat widget
3. Ask: "Hi"
4. Should get response from AI
5. Check browser console (F12) - API calls should go to `api.axionx.uk`

---

## 🎯 Expected Final Result

```
┌─────────────────────────────────────────┐
│  www.axionx.uk                          │
│  (User sees this in browser)            │
│  ↓                                      │
│  Lovable serves React app               │
│  ↓                                      │
│  Chat widget makes API calls to:        │
│  api.axionx.uk (in background)          │
│  ↓                                      │
│  Railway backend processes request      │
│  ↓                                      │
│  Response sent back to user             │
└─────────────────────────────────────────┘
```

**User Experience:**
- Visits: `www.axionx.uk`
- Sees: Professional landing page with chat
- Uses: Chat widget seamlessly
- Never sees: Lovable or Railway subdomains
- Everything appears to be on: `axionx.uk` ✨

---

## 📊 Current vs. New Setup

### **Before:**
```
❌ axionx-demo-showcase.lovable.app     → Demo
❌ web-production-dd2b1.up.railway.app  → API
❌ www.axionx.uk                        → Not connected
```

### **After:**
```
✅ www.axionx.uk    → Everything (main site)
✅ api.axionx.uk    → Backend (hidden from users)
✅ Clean, professional, one domain!
```

---

## 🔧 DNS Records Summary

Copy this to IONOS DNS settings:

```
Record 1:
Type: CNAME
Host: api
Value: [from Railway - looks like: xxx.up.railway.app]
TTL: 3600

Record 2:
Type: CNAME (or A)
Host: www
Value: [from Lovable - their CNAME or IP]
TTL: 3600

Optional Record 3 (root redirect):
Type: A (or redirect)
Host: @
Value: [redirect to www or same IP as www]
TTL: 3600
```

---

## 🆘 Troubleshooting

### **"api.axionx.uk not found"**
- ✅ Wait longer for DNS propagation (can take 30 min)
- ✅ Check DNS with: `nslookup api.axionx.uk`
- ✅ Verify CNAME in IONOS matches Railway's

### **"www.axionx.uk not loading"**
- ✅ Check DNS with: `nslookup www.axionx.uk`
- ✅ Verify record in IONOS matches Lovable's
- ✅ Clear browser cache

### **"SSL certificate error"**
- ✅ Wait 10-15 minutes for SSL to provision
- ✅ Check Railway has generated SSL
- ✅ Check Lovable has generated SSL
- ✅ Verify IONOS SSL is activated

### **"Chat widget not working"**
- ✅ Check browser console (F12) for errors
- ✅ Verify API calls go to `api.axionx.uk`
- ✅ Test API directly: `curl https://api.axionx.uk/`
- ✅ Check CORS settings allow www.axionx.uk

---

## ✅ Completion Checklist

- [ ] Railway: Added api.axionx.uk custom domain
- [ ] Railway: Noted CNAME record
- [ ] Lovable: Added www.axionx.uk custom domain  
- [ ] Lovable: Noted DNS records
- [ ] IONOS: Added api CNAME record
- [ ] IONOS: Updated www record
- [ ] IONOS: Activated SSL
- [ ] Code: Updated API URL to api.axionx.uk
- [ ] Code: Pushed to GitHub
- [ ] Tested: api.axionx.uk responds
- [ ] Tested: www.axionx.uk loads
- [ ] Tested: Chat widget works
- [ ] DNS: Propagation complete

---

## 🎓 Benefits of Single Domain

✅ **Professional:** One clean domain
✅ **SEO:** Better ranking on single domain
✅ **Branding:** Consistent user experience
✅ **Trust:** Users see axionx.uk everywhere
✅ **SSL:** Simpler certificate management
✅ **Easy:** Easier to remember and share

---

## 🚀 Timeline

| Task | Time |
|------|------|
| Configure Railway | 5 min |
| Configure Lovable | 5 min |
| Update IONOS DNS | 10 min |
| Update code | 2 min |
| DNS propagation | 5-30 min |
| SSL activation | 5-15 min |
| **Total** | **30-60 min** |

---

## 💡 Pro Tips

1. **Do Railway first** - Get that CNAME ready
2. **Do Lovable second** - Get those DNS records
3. **Do IONOS last** - Once you have all the records
4. **Test incrementally** - Test API first, then frontend
5. **Be patient** - DNS takes time to propagate

---

## 📝 Quick Reference

**Railway Dashboard:** https://railway.app
**Lovable Dashboard:** https://lovable.app
**IONOS Dashboard:** https://www.ionos.com

**Your Domains:**
- Main: `www.axionx.uk`
- API: `api.axionx.uk`
- Old demo: `axionx-demo-showcase.lovable.app` (will redirect)
- Old API: `web-production-dd2b1.up.railway.app` (will still work)

---

**Once complete, your entire system runs on the professional axionx.uk domain!** 🎯

