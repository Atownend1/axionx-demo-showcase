# 🔧 Domain Fix Instructions for axionx.uk

## 🎯 Problem Identified

Your diagnostic test revealed:

```
✅ www.axionx.uk → WORKING (HTTP 200)
✅ api.axionx.uk → WORKING (API responding)
❌ axionx.uk (root) → NOT WORKING (HTTP 404)
```

**The Issue:** The root domain `axionx.uk` (without www) is pointing to the wrong server (75.2.60.5) and returning a 404 error.

**The Solution:** Configure IONOS to redirect `axionx.uk` to `www.axionx.uk`

---

## ⚡ Quick Fix (5 minutes)

### Option 1: URL Forwarding/Redirect (RECOMMENDED ✨)

This is the easiest and most professional solution.

1. **Log into IONOS:**
   - Go to: https://www.ionos.com
   - Navigate to: **Domains & SSL**
   - Click on: **axionx.uk**

2. **Set Up URL Forwarding:**
   - Look for one of these sections:
     - **"URL Forwarding"**
     - **"Domain Redirect"**
     - **"Forwarding"**
     - **"Redirect Settings"**
   
3. **Configure the Redirect:**
   - **Source domain:** `axionx.uk` (or `@`)
   - **Destination URL:** `https://www.axionx.uk`
   - **Type:** `301 Permanent Redirect`
   - **Options:**
     - ✅ Keep path (forward subpaths)
     - ✅ Keep query string
     - ✅ Use HTTPS

4. **Save and Test:**
   - Click **Save** or **Activate**
   - Wait 5-10 minutes
   - Visit: http://axionx.uk
   - Should redirect to: https://www.axionx.uk

---

### Option 2: DNS A Record Update

If Option 1 isn't available, update the DNS directly.

1. **Log into IONOS:**
   - Go to: https://www.ionos.com
   - Navigate to: **Domains & SSL** → **axionx.uk**
   - Click: **DNS** tab

2. **Find the Root A Record:**
   - Look for record with:
     - Type: **A**
     - Host: **@** or blank or **axionx.uk**
     - Current value: `75.2.60.5`

3. **Update Options:**

   **Option 2A - Point to Lovable IP:**
   - Click **Edit** on the A record
   - Change IP from: `75.2.60.5`
   - To: `185.158.133.2` (Lovable's IP)
   - TTL: `3600`
   - Save

   **Option 2B - Change to CNAME (if allowed):**
   - Delete the A record for `@`
   - Create new CNAME record:
     - Type: **CNAME**
     - Host: **@**
     - Value: **www.axionx.uk**
     - TTL: `3600`
   - Save
   
   ⚠️ **Note:** Some DNS providers don't allow CNAME for root domains. If IONOS rejects this, use Option 2A instead.

4. **Wait for Propagation:**
   - Changes take 5-30 minutes
   - Run test script again: `./test-domains.sh`

---

## 🧪 Verification Steps

After making changes, verify the fix:

### Test 1: Run Diagnostic Script
```bash
cd /Users/alextownend/Desktop/axionx-ai
./test-domains.sh
```

**Expected Result:** All tests should pass ✅

### Test 2: Manual Browser Test
1. Open private/incognito browser window
2. Visit: `http://axionx.uk`
3. Should redirect to: `https://www.axionx.uk`
4. Should show: Your Lovable landing page

### Test 3: Test Chat Widget
1. On www.axionx.uk, click the chat widget
2. Ask a question like "Hi"
3. Should get AI response
4. Open browser console (F12)
5. Check Network tab - API calls should go to `api.axionx.uk`

---

## 📊 Expected Final Configuration

After the fix, here's what your setup should look like:

### IONOS DNS Settings:
```
Record 1 - Root Domain:
Type: URL Redirect (preferred)
From: axionx.uk
To: https://www.axionx.uk
Type: 301 Permanent

OR

Type: A
Host: @
Value: 185.158.133.2
TTL: 3600

---

Record 2 - WWW Subdomain:
Type: CNAME
Host: www
Value: canvas-logo-spark.lovable.app
TTL: 3600

---

Record 3 - API Subdomain:
Type: CNAME
Host: api
Value: 40wffwq.up.railway.app
TTL: 3600
```

### User Experience Flow:
```
User types:         axionx.uk
Browser redirects:  → https://www.axionx.uk
Page loads:         → Lovable landing page
Chat clicks:        → Connects to api.axionx.uk
Everything works:   ✅
```

---

## 🎨 Visual Guide

### Current State (Before Fix):
```
┌─────────────────────────────────────────┐
│  axionx.uk                              │
│  ↓                                      │
│  75.2.60.5 (unknown server)             │
│  ↓                                      │
│  ❌ 404 Error                           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  www.axionx.uk                          │
│  ↓                                      │
│  Lovable servers                        │
│  ↓                                      │
│  ✅ Landing page loads                  │
└─────────────────────────────────────────┘
```

### After Fix:
```
┌─────────────────────────────────────────┐
│  axionx.uk                              │
│  ↓                                      │
│  301 Redirect                           │
│  ↓                                      │
│  www.axionx.uk                          │
│  ↓                                      │
│  Lovable servers                        │
│  ↓                                      │
│  ✅ Landing page loads                  │
└─────────────────────────────────────────┘
```

---

## ⏱️ Timeline

| Step | Duration |
|------|----------|
| Log into IONOS | 1 min |
| Configure redirect/DNS | 3 min |
| Save changes | 1 min |
| DNS propagation | 5-30 min |
| Testing | 5 min |
| **Total** | **15-40 min** |

---

## 🆘 Troubleshooting

### "I can't find URL Forwarding in IONOS"
Try these alternative names:
- Domain Redirect
- HTTP Redirect
- Forwarding
- Redirect Settings
- Website Redirect

If none exist, use **Option 2** (DNS A Record Update) instead.

### "Changes aren't working yet"
1. **Be patient** - DNS takes 5-30 minutes to propagate
2. **Clear browser cache** - Or use private/incognito window
3. **Check from phone** - Use mobile data (different DNS)
4. **Run diagnostic:** `./test-domains.sh` to see current status

### "Still getting 404 error"
1. Verify the redirect/DNS was saved correctly
2. Check you're editing **axionx.uk**, not a different domain
3. Contact IONOS support if settings won't save
4. Try Option 2 if Option 1 doesn't work

### "Redirect loops"
If you get infinite redirects:
1. Make sure only **one** redirect rule exists
2. Ensure it goes from `axionx.uk` → `www.axionx.uk` (not vice versa)
3. Check there's no conflicting redirect in Lovable settings

---

## ✅ Success Checklist

- [ ] Logged into IONOS Dashboard
- [ ] Found axionx.uk domain settings
- [ ] Applied Option 1 (redirect) OR Option 2 (DNS)
- [ ] Saved changes
- [ ] Waited 10-15 minutes
- [ ] Ran `./test-domains.sh` - all tests pass
- [ ] Tested `axionx.uk` in browser - redirects to `www.axionx.uk`
- [ ] Tested `www.axionx.uk` - shows Lovable landing page
- [ ] Tested chat widget - AI responds
- [ ] Checked browser console - no errors

---

## 🎉 When Complete

Once all tests pass, your domain will be fully operational:

✅ **Professional:** Single domain experience
✅ **SEO-friendly:** No duplicate content issues  
✅ **SSL secured:** All connections encrypted
✅ **Fast:** Proper CDN routing
✅ **Functional:** Chat widget working perfectly

**Your visitors can now access your site from either `axionx.uk` or `www.axionx.uk` and get the same great experience!** 🚀

---

## 📞 Support Resources

- **IONOS Support:** https://www.ionos.com/help
- **Lovable Support:** https://lovable.app/help
- **Railway Support:** https://railway.app/help
- **Project Diagnostics:** Run `./test-domains.sh` anytime

---

## 🔍 Current Status Summary

Based on the diagnostic test:

| Component | Status | Issue |
|-----------|--------|-------|
| DNS Resolution | ✅ Working | All domains resolve |
| www.axionx.uk | ✅ Working | Landing page loads |
| api.axionx.uk | ✅ Working | API responding |
| SSL Certificates | ✅ Working | All valid |
| Root Domain (axionx.uk) | ❌ **FIX NEEDED** | Returns 404 |

**Action Required:** Follow Option 1 or Option 2 above to fix the root domain.

---

**Once you complete these steps, run the diagnostic script again to confirm everything is working!**

