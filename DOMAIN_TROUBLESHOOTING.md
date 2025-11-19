# 🔍 Domain Troubleshooting Guide for axionx.uk

## Current DNS Status ✅

As of the latest check, your DNS is configured correctly:

```
axionx.uk       → 75.2.60.5
www.axionx.uk   → 185.158.133.2, 185.158.133.1 (Lovable)
api.axionx.uk   → 66.33.22.157 (Railway)
```

## 🚨 Identified Issues

### **Issue #1: Root Domain Mismatch**

**Problem:**
- `axionx.uk` (without www) points to 75.2.60.5
- `www.axionx.uk` points to Lovable servers
- These are different destinations!

**Impact:** Users visiting `axionx.uk` don't see your Lovable app

**Solution Options:**

#### Option A: Redirect Root to WWW (Recommended)
Configure IONOS to redirect `axionx.uk` → `www.axionx.uk`

1. Log into IONOS Dashboard
2. Go to Domains & SSL → axionx.uk
3. Look for "URL Forwarding" or "Redirect" settings
4. Set up: `axionx.uk` → `https://www.axionx.uk`
5. Type: 301 Permanent Redirect

#### Option B: Point Root to Lovable
Change the A record for `@` (root) to point to Lovable's IP

1. In IONOS DNS settings
2. Find A record for `@` or `axionx.uk`
3. Change IP from `75.2.60.5` to `185.158.133.2`
4. Or change to a CNAME pointing to Lovable (if IONOS allows)

---

## 🧪 Quick Tests

Run these commands to verify each component:

### Test 1: Check DNS Resolution
```bash
dig axionx.uk +short
dig www.axionx.uk +short
dig api.axionx.uk +short
```

**Expected Results:**
- `axionx.uk` should point to same place as `www.axionx.uk`
- `api.axionx.uk` should point to Railway

### Test 2: Check API Connectivity
```bash
curl -k https://api.axionx.uk/
```

**Expected Response:**
```json
{"status":"AxionX Public API 🚀","version":"1.0"}
```

### Test 3: Check Main Site
```bash
curl -I https://www.axionx.uk
curl -I https://axionx.uk
```

**Expected:** Both should return `200 OK` or `301/302` redirect

### Test 4: Check SSL Certificates
```bash
openssl s_client -connect www.axionx.uk:443 -servername www.axionx.uk < /dev/null 2>&1 | grep -A 2 "Verify return code"
openssl s_client -connect api.axionx.uk:443 -servername api.axionx.uk < /dev/null 2>&1 | grep -A 2 "Verify return code"
```

**Expected:** `Verify return code: 0 (ok)`

---

## 🔧 Fix Checklist

### Step 1: IONOS Configuration
- [ ] Log into IONOS Dashboard: https://www.ionos.com
- [ ] Navigate to: Domains & SSL → axionx.uk
- [ ] Check current DNS records:
  - A record for `@` (root)
  - A or CNAME record for `www`
  - CNAME record for `api`

### Step 2: Choose Your Approach

#### Approach A: Redirect (Easiest)
- [ ] In IONOS, find "URL Forwarding" or "Redirects"
- [ ] Add redirect: `axionx.uk` → `https://www.axionx.uk`
- [ ] Type: 301 Permanent
- [ ] Include path: Yes
- [ ] Save changes

#### Approach B: DNS Update
- [ ] Update A record for `@` to match `www` IP
- [ ] Or create CNAME for `@` → `www.axionx.uk` (if allowed)
- [ ] Save and wait 5-30 minutes for propagation

### Step 3: Verify Lovable Deployment
- [ ] Log into Lovable: https://lovable.app
- [ ] Check your project is deployed
- [ ] Verify custom domain `www.axionx.uk` is added
- [ ] Check SSL certificate status
- [ ] Redeploy if needed

### Step 4: Test Everything
- [ ] Visit `https://axionx.uk` in browser
- [ ] Visit `https://www.axionx.uk` in browser
- [ ] Both should show your Lovable app
- [ ] Test chat widget works
- [ ] Check browser console (F12) for errors

---

## 📊 What Each Service Should Show

### Lovable Dashboard
**Domain Settings:**
- Custom domain: `www.axionx.uk`
- SSL status: ✅ Active
- DNS status: ✅ Verified

### Railway Dashboard
**Domain Settings:**
- Custom domain: `api.axionx.uk`
- SSL status: ✅ Active
- DNS status: ✅ Verified

### IONOS Dashboard
**DNS Records:**

**Option A (with redirect):**
```
Type: A
Host: @
Value: 75.2.60.5 (or redirect rule)

Type: CNAME
Host: www
Value: canvas-logo-spark.lovable.app

Type: CNAME
Host: api
Value: 40wffwq.up.railway.app
```

**Option B (both point to Lovable):**
```
Type: A
Host: @
Value: 185.158.133.2

Type: CNAME
Host: www
Value: canvas-logo-spark.lovable.app

Type: CNAME
Host: api
Value: 40wffwq.up.railway.app
```

---

## 🆘 Common Problems & Solutions

### Problem: "This site can't be reached"
**Causes:**
- DNS not propagated yet
- SSL certificate not ready
- Service is down

**Solutions:**
1. Wait 30 minutes for DNS propagation
2. Try in private/incognito browser window
3. Clear browser cache
4. Check service status (Lovable/Railway)

### Problem: "Your connection is not private" (SSL error)
**Causes:**
- SSL certificate not issued yet
- Domain not verified
- Mixed HTTP/HTTPS content

**Solutions:**
1. Wait 15 minutes for SSL provisioning
2. Verify domain in Lovable/Railway dashboard
3. Ensure all links use HTTPS

### Problem: Website loads but chat doesn't work
**Causes:**
- API endpoint wrong
- CORS error
- API service down

**Solutions:**
1. Open browser console (F12)
2. Look for errors
3. Check API is responding: `curl https://api.axionx.uk/`
4. Verify frontend code uses correct API URL

### Problem: Different content on axionx.uk vs www.axionx.uk
**Cause:** Root domain points to wrong server

**Solution:** Follow Issue #1 fixes above

---

## 🎯 Expected Final State

After fixes:

1. **User visits:** `axionx.uk` or `www.axionx.uk`
2. **Browser shows:** `https://www.axionx.uk` (redirected if needed)
3. **Content:** Your Lovable landing page with chat widget
4. **Chat widget:** Makes requests to `https://api.axionx.uk`
5. **Everything:** Works seamlessly with SSL

---

## 📞 Quick Reference

**IONOS Dashboard:** https://www.ionos.com
**Lovable Dashboard:** https://lovable.app  
**Railway Dashboard:** https://railway.app

**Your Current URLs:**
- Main site (intended): `https://www.axionx.uk`
- Root domain: `https://axionx.uk` ⚠️ (needs fix)
- API: `https://api.axionx.uk` ✅
- Lovable preview: `https://canvas-logo-spark.lovable.app` ✅
- Railway direct: `https://40wffwq.up.railway.app` ✅

---

## ⏱️ Expected Timeline

| Task | Duration |
|------|----------|
| Update IONOS DNS/redirect | 5 min |
| DNS propagation | 5-30 min |
| SSL certificate generation | 5-15 min |
| Testing & verification | 10 min |
| **Total** | **25-60 min** |

---

## 🔍 Diagnostic Commands

Save these for troubleshooting:

```bash
# Check all DNS records
dig axionx.uk ANY +noall +answer
dig www.axionx.uk ANY +noall +answer
dig api.axionx.uk ANY +noall +answer

# Trace DNS path
dig +trace www.axionx.uk

# Check HTTP response
curl -v https://www.axionx.uk 2>&1 | grep -E "HTTP|SSL|certificate"

# Check API response
curl -v https://api.axionx.uk/ 2>&1 | head -20

# Test from different DNS servers
dig @8.8.8.8 www.axionx.uk +short  # Google DNS
dig @1.1.1.1 www.axionx.uk +short  # Cloudflare DNS
```

---

## ✅ When Everything Works

You should see:
- ✅ `axionx.uk` → redirects or shows Lovable app
- ✅ `www.axionx.uk` → shows Lovable app
- ✅ `api.axionx.uk` → returns API status
- ✅ SSL certificates valid on all
- ✅ Chat widget functional
- ✅ No console errors

**Then you're ready to go! 🚀**

---

## 💡 Pro Tips

1. **Always test in private/incognito** window to avoid cache issues
2. **Use browser developer tools** (F12) to see network requests
3. **DNS changes take time** - be patient, usually 5-30 minutes
4. **SSL generation takes time** - usually 5-15 minutes after DNS resolves
5. **Keep dashboard logins handy** for quick fixes

---

**Need help? Check the console, run the diagnostic commands, and verify each service dashboard.**

