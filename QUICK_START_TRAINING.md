# 🚀 Quick Start: Train Your AI in 10 Minutes

## The Fastest Way to Improve Your Chatbot

### Option 1: Add More Knowledge (5 minutes)

```bash
# 1. Create a new meeting transcript
cd /Users/alextownend/Desktop/axionx-ai/meetings
nano new_knowledge.txt

# 2. Add your content (examples, best practices, case studies)
# Save and exit (Ctrl+X, Y, Enter)

# 3. Process and upload
cd ..
python3 process_meetings.py

# 4. Test it
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "test your new knowledge here"}'
```

**Done! Your AI now knows this information.** ✅

---

### Option 2: Change Personality (3 minutes)

```bash
# 1. Open the API file
nano /Users/alextownend/Desktop/axionx-ai/api_public.py

# 2. Find line 72 (the prompt)
# Change: "You are a friendly, senior EPM consultant..."
# To: "You are a [YOUR DESIRED PERSONALITY]..."

# 3. Save (Ctrl+X, Y, Enter)

# 4. Deploy
git add api_public.py
git commit -m "Updated personality"
git push

# 5. Test in 2 minutes (Railway auto-deploys)
```

**Done! Your AI has a new personality.** ✅

---

### Option 3: Test Current Responses (2 minutes)

```bash
# Quick test
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Hi, I need help with EPM implementation"}'
```

---

## 📝 What to Add to Training Data

### Good Training Content:

✅ **Client conversations** about EPM challenges
✅ **Implementation stories** with timelines and costs  
✅ **Best practices** and frameworks
✅ **Common objections** and how you handled them
✅ **Success stories** and case studies
✅ **Technical guidance** on EPM tools
✅ **Industry-specific** knowledge

### Bad Training Content:

❌ Random unrelated content
❌ Marketing fluff without substance
❌ Outdated or incorrect information
❌ Confidential client data (anonymize first!)

---

## 🎯 Quick Personality Templates

Copy/paste these into `api_public.py` line 72:

### Professional Executive Advisor:
```python
"You are a Managing Partner at AxionX with 15+ years advising C-suite executives on enterprise performance management. You speak in strategic terms, focus on business outcomes, and emphasize ROI."
```

### Friendly Problem Solver:
```python
"You are a helpful EPM specialist who loves solving finance transformation challenges. You explain complex concepts simply, share real examples, and make people feel confident about their decisions."
```

### Technical Expert:
```python
"You are a technical EPM architect with deep expertise in Oracle, SAP, Anaplan, and OneStream. You provide specific technical guidance, integration patterns, and implementation best practices."
```

### Sales Consultant:
```python
"You are a solutions consultant focused on understanding client needs and demonstrating value. You ask probing questions, identify pain points, and guide prospects toward booking consultations."
```

---

## 📊 Quick Test Questions

After making changes, test with these:

```bash
# Test 1: Greeting
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Hi"}'

# Test 2: Technical Question
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What EPM tool should we use?"}'

# Test 3: Cost Question
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "How much does implementation cost?"}'

# Test 4: Timeline Question
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "How long will this take?"}'
```

---

## ⚡ Emergency: "My AI Sounds Wrong"

### If responses are too robotic:
Edit line 101: Change to `"Style: Conversational, warm, human-like dialogue."`

### If responses are too casual:
Edit line 101: Change to `"Style: Professional, authoritative, executive-level."`

### If responses are too long:
Edit line 69: Change `max_tokens=1024` to `max_tokens=512`

### If responses lack details:
Add more specific training data with numbers, examples, and case studies.

### If AI is too salesy:
Remove lines 110-111 (the CTA insertion)

---

## 🎓 Training in 3 Levels

### Level 1: Beginner (Start Here)
1. Test current responses
2. Add 2-3 new meeting transcripts
3. Process with `python3 process_meetings.py`
4. Test again

**Time: 15 minutes**

### Level 2: Intermediate
1. Do Level 1
2. Adjust personality in `api_public.py`
3. Change response length (max_tokens)
4. Customize CTAs
5. Deploy and test

**Time: 30 minutes**

### Level 3: Advanced
1. Do Levels 1 & 2
2. Create industry-specific knowledge bases
3. A/B test different personalities
4. Monitor logs and iterate
5. Build FAQ library

**Time: 2-3 hours over several days**

---

## 📁 File Locations Quick Reference

```
Training Data:
/Users/alextownend/Desktop/axionx-ai/meetings/

AI Personality:
/Users/alextownend/Desktop/axionx-ai/api_public.py (lines 72-103)

Processing Script:
/Users/alextownend/Desktop/axionx-ai/process_meetings.py

Test Scripts:
/Users/alextownend/Desktop/axionx-ai/test-domains.sh
/Users/alextownend/Desktop/axionx-ai/quick-check.sh

Documentation:
/Users/alextownend/Desktop/axionx-ai/TRAINING_GUIDE.md (detailed)
/Users/alextownend/Desktop/axionx-ai/PRACTICE_RESPONSES.md (testing)
```

---

## ✅ 10-Minute Improvement Checklist

Tomorrow when you wake up:

- [ ] Domain is working (`./test-domains.sh`)
- [ ] Test current AI responses
- [ ] Add 1-2 new training files to `/meetings/`
- [ ] Run `python3 process_meetings.py`
- [ ] Test new responses
- [ ] (Optional) Tweak personality
- [ ] Deploy if changed
- [ ] Test on live site

**Done! Your AI is improved.** 🎉

---

## 🆘 Need Help?

**All detailed guides are ready:**
- `TRAINING_GUIDE.md` - Complete training documentation
- `PRACTICE_RESPONSES.md` - How to test and evaluate
- `DOMAIN_TROUBLESHOOTING.md` - Domain issues
- `IONOS_FIX_NOW.md` - DNS quick fixes

---

**Start with adding one new meeting transcript and see how it improves responses!** 🚀

