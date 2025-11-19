# ⚡ DO THIS NOW - 3 Simple Steps

## 🎯 Goal: Get www.axionx.uk Working in 20 Minutes

---

## ✅ STEP 1: Railway - Add api.axionx.uk (5 min)

### **Open This Link:**
👉 https://railway.app/project/232fd7f3-d1ef-49c2-98de-535051a67867/service/f8bb1593-ecf1-4483-bfd3-43de83ffb21f/settings

### **Then:**

1. **Scroll down to "Networking" section**

2. **Click "+ Custom Domain"** or **"Generate Domain"**

3. **Type:** `api.axionx.uk`

4. **Click "Add"** or **"Save"**

5. **Railway will show you a CNAME record like:**
   ```
   CNAME: api.axionx.uk → xxxxxxxx.up.railway.app
   ```

6. **COPY THIS!** Write it down:
   ```
   _________________________________________________
   
   My Railway CNAME: _______________________________
   
   _________________________________________________
   ```

✅ **Done! Move to Step 2**

---

## ✅ STEP 2: Lovable - Add www.axionx.uk (5 min)

### **Open This Link:**
👉 https://lovable.app

### **Then:**

1. **Open your AxionX project** (axionx-demo-showcase)

2. **Find Settings → Domains** (or Custom Domain section)

3. **Click "Add Custom Domain"** or similar button

4. **Type:** `www.axionx.uk`

5. **Click "Add"** or **"Save"**

6. **Lovable will show you DNS records like:**
   ```
   CNAME: www → your-project.lovable.app
   OR
   A: www → 123.456.789.0
   ```

7. **COPY THIS!** Write it down:
   ```
   _________________________________________________
   
   My Lovable DNS Record: __________________________
   
   _________________________________________________
   ```

✅ **Done! Move to Step 3**

---

## ✅ STEP 3: IONOS - Update DNS (10 min)

### **Open This Link:**
👉 https://www.ionos.com/login

### **Then:**

1. **Login to IONOS**

2. **Go to:** Domains & SSL → axionx.uk

3. **Click the "DNS" tab**

4. **ADD FIRST RECORD (for API):**
   - Click "Add record" or "+"
   - Type: **CNAME**
   - Host name: **api**
   - Points to: **[Paste from Step 1 - the Railway CNAME]**
   - TTL: **3600**
   - Click **Save**

5. **UPDATE SECOND RECORD (for WWW):**
   
   **Find the existing "www" A record**
   
   **Option A - If Lovable gave you CNAME:**
   - Delete the old www A record
   - Click "Add record"
   - Type: **CNAME**
   - Host name: **www**
   - Points to: **[Paste from Step 2 - the Lovable CNAME]**
   - TTL: **3600**
   - Click **Save**
   
   **Option B - If Lovable gave you A record:**
   - Click "Edit" on existing www A record
   - Change IP to: **[Paste from Step 2 - the Lovable IP]**
   - Click **Save**

6. **ACTIVATE SSL (Important!):**
   - Still in DNS settings
   - Find "SSL certificate" section
   - Click "Activate SSL encryption"
   - Choose "Let's Encrypt" (free)
   - Apply to domain
   - Click **Save**

✅ **Done! Now wait...**

---

## ⏰ STEP 4: Wait for DNS (5-30 min)

### **Just Wait...**

DNS changes take 5-30 minutes to propagate worldwide. 

**While waiting, you can:**
- Get a coffee ☕
- Check email 📧
- Test your current Lovable site: https://axionx-demo-showcase.lovable.app

### **Check Status:**

Open terminal and run:
```bash
# Check if api.axionx.uk is ready:
nslookup api.axionx.uk

# Check if www.axionx.uk is ready:
nslookup www.axionx.uk
```

**When ready, they'll show the correct servers!**

---

## 🧪 STEP 5: Test Everything! (5 min)

### **Test 1: API Works**
```bash
curl https://api.axionx.uk/
```

**Expected:**
```json
{"status":"AxionX Public API 🚀","version":"1.0"}
```

### **Test 2: Website Works**

Open browser: https://www.axionx.uk

**Expected:**
- Your Lovable app loads
- Chat widget appears
- Professional domain!

### **Test 3: Chat Widget Works**

1. On www.axionx.uk
2. Click chat widget
3. Type: "Hi"
4. AI should respond!

---

## ✅ Success Checklist

After completing all steps:

- [ ] Railway has api.axionx.uk custom domain
- [ ] Lovable has www.axionx.uk custom domain
- [ ] IONOS has api CNAME record
- [ ] IONOS has updated www record
- [ ] IONOS SSL is activated
- [ ] Waited 5-30 minutes for DNS
- [ ] api.axionx.uk responds to curl
- [ ] www.axionx.uk loads in browser
- [ ] Chat widget works on www.axionx.uk

---

## 🎯 Final Result

```
www.axionx.uk  ✅ Your main website (Lovable)
               ✅ Chat widget
               ✅ Professional domain
               ✅ SSL encrypted (https)

api.axionx.uk  ✅ Backend API (Railway)
               ✅ Processes AI requests
               ✅ Hidden from users
               ✅ SSL encrypted (https)
```

**One clean, professional domain! 🚀**

---

## 🆘 Need Help?

### **"Railway doesn't have Custom Domain option"**
- Look for "Settings" → "Networking" or "Domains"
- It might be called "Public Networking"
- Try clicking the current domain and look for "Add Domain"

### **"Lovable doesn't show DNS records"**
- Check Settings → Domains
- Look for "Custom Domain" or "Connect Domain"
- The DNS info appears after you add the domain

### **"IONOS is confusing"**
- Look for the DNS section (might be called "Name Server")
- You want to edit DNS records, not domain settings
- If stuck, look for "Manage DNS" or "Edit DNS"

### **"Nothing works after 30 minutes"**
- Double-check the DNS records in IONOS
- Make sure there are no typos
- Try clearing your browser cache
- Try in incognito/private mode

---

## 📋 What I've Already Done For You:

✅ Updated code to use api.axionx.uk
✅ Configured CORS for www.axionx.uk
✅ Set up conversational AI with lead capture
✅ Pushed all changes to GitHub
✅ Railway will auto-deploy
✅ Lovable will auto-deploy (if connected to GitHub)

**You just need to connect the domains!** 🎯

---

## ⏱️ Total Time: ~30 minutes

- Railway: 5 min
- Lovable: 5 min  
- IONOS: 10 min
- DNS wait: 5-30 min
- Testing: 5 min

**Then you're LIVE on www.axionx.uk!** 🎉

---

Start with STEP 1 above! 👆

