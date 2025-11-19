# 🚨 IONOS Immediate Fix Instructions

## The Problem (Based on Your Screenshots)

Your IONOS DNS has:
- **Row 5**: A record for `@` → `75.2.60.5` ❌ (This is wrong!)
- **Row 1**: CNAME for `www` → `canvas-logo-spark.lovable.app` ✅ (This is correct!)

The root domain `@` is pointing to the Railway API server instead of Lovable.

---

## ⚡ IMMEDIATE FIX (2 minutes)

### Step 1: Click the Edit Button (Pencil Icon)

In your IONOS DNS settings table, find **Row 5**:
```
Type: A
Host Name: @
Value: 75.2.60.5
```

Click the **pencil icon (✏️)** on the right side of that row.

### Step 2: Change the IP Address

In the edit dialog:
- **Type**: Keep as `A`
- **Host Name**: Keep as `@`
- **Value**: Change from `75.2.60.5` to `185.158.133.2`
- **TTL**: Keep as is (probably 3600)

Click **Save**

### Step 3: Also Check Row 2 (Optional)

If **Row 2** (Type: A, Host: ourdata) is not needed, you can delete it. But if you're using "ourdata" subdomain for something, leave it.

### Step 4: Wait 5-10 Minutes

DNS changes need to propagate. Wait 5-10 minutes, then test.

---

## 🧪 Test After Changes

### Test 1: Run Diagnostic Script
```bash
cd /Users/alextownend/Desktop/axionx-ai
./test-domains.sh
```

Should now show all tests passing!

### Test 2: Browser Test
1. Open **private/incognito window**
2. Go to: `http://axionx.uk`
3. Should show: Your Lovable landing page (not API JSON)
4. URL bar might show: `https://www.axionx.uk` or `https://axionx.uk`

---

## 📊 What This Does

### Before (Current):
```
axionx.uk (@) → 75.2.60.5 → Railway API → Shows JSON ❌
www.axionx.uk → Lovable → Shows landing page ✅
```

### After (Fixed):
```
axionx.uk (@) → 185.158.133.2 → Lovable → Shows landing page ✅
www.axionx.uk → Lovable → Shows landing page ✅
```

---

## 🎯 Expected Final IONOS DNS Settings

Your table should look like this after the fix:

| TYPE | HOST NAME | VALUE | ACTIONS |
|------|-----------|-------|---------|
| CNAME | www | canvas-logo-spark.lovable.app | ✏️ 🗑️ |
| A | ourdata | 75.2.60.5 | ✏️ 🗑️ (optional - delete if not needed) |
| CNAME | api | 40wffwq.up.railway.app | ✏️ 🗑️ |
| TXT | _dmarc | "v=DMARC1..." | ✏️ 🗑️ |
| **A** | **@** | **185.158.133.2** | **✏️ 🗑️** ← THIS IS THE KEY CHANGE |
| (other mail/domain records...) |

---

## 🆘 Alternative: Add Both Lovable IPs

If changing to `185.158.133.2` alone doesn't work, you can add both Lovable IPs:

1. Edit the `@` A record → Change to `185.158.133.2`
2. Add another A record:
   - Type: `A`
   - Host: `@`
   - Value: `185.158.133.1`
   - Save

This gives you both Lovable IPs for redundancy.

---

## ⚠️ Important Notes

1. **Don't delete the `@` A record** - Edit it instead
2. **Don't touch the `www` CNAME** - It's already correct
3. **Don't touch the `api` CNAME** - It's already correct
4. **Do use private/incognito** when testing to avoid cache
5. **Do be patient** - DNS takes 5-30 minutes to propagate

---

## ✅ When It Works

After the fix and propagation:
- ✅ `axionx.uk` → Shows Lovable landing page
- ✅ `www.axionx.uk` → Shows Lovable landing page  
- ✅ `api.axionx.uk` → Returns API JSON (correct!)
- ✅ Chat widget → Works on landing page
- ✅ All SSL certificates → Valid

---

## 🔍 Why This Was Happening

The IP `75.2.60.5` appears to be routing to your Railway deployment. Railway is configured to serve your API at `api.axionx.uk`, but when requests come to the root domain through that IP, Railway's routing was serving the API instead of redirecting.

By pointing the root domain to Lovable's IP (`185.158.133.2`), requests will go directly to Lovable's servers, which will serve your landing page correctly.

---

## 📞 If You Need Help

**IONOS Support**: https://www.ionos.com/help
**Or screenshot the error and share**

---

**DO THIS NOW: Edit Row 5 in IONOS DNS, change 75.2.60.5 → 185.158.133.2, Save, Wait 10 minutes, Test!**

