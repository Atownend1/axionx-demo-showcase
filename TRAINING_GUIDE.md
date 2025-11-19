# 🎓 AxionX AI Training & Improvement Guide

## How Your AI Currently Works

Your chatbot is trained on:
- ✅ Meeting transcripts in `/meetings/` folder
- ✅ Indexed in Qdrant vector database
- ✅ Uses Claude AI to generate responses
- ✅ Searches relevant context from meetings

---

## 📚 Method 1: Add New Training Data (Meeting Transcripts)

### Step 1: Add New Transcripts

1. **Add new meeting files** to the `/meetings/` folder:
   ```
   /Users/alextownend/Desktop/axionx-ai/meetings/
   ```

2. **Format**: Text files (.txt) or any format containing:
   - Client conversations
   - Implementation discussions
   - Best practices
   - Problem-solving sessions
   - Technical guidance

3. **Naming**: Use descriptive names:
   ```
   meeting_client_abc_epm_implementation.txt
   discussion_data_governance_best_practices.txt
   consultation_financial_planning_automation.txt
   ```

### Step 2: Process New Transcripts

Run the processing script to index new data:

```bash
cd /Users/alextownend/Desktop/axionx-ai
python3 process_meetings.py
```

This will:
- Read all transcripts in `/meetings/`
- Split them into chunks
- Create embeddings (vectors)
- Upload to Qdrant database
- Make them searchable by the AI

### Step 3: Verify Upload

Check the output shows:
```
✅ Processed: meeting_name.txt
✅ Uploaded X chunks to Qdrant
✅ Collection: axionx_meetings
```

---

## 🎨 Method 2: Adjust AI Personality & Approach

Edit the AI's instructions in `api_public.py`:

### Location to Edit:

```bash
File: /Users/alextownend/Desktop/axionx-ai/api_public.py
Lines: 72-103
```

### Current Personality Settings:

```python
content: f"""You are a friendly, senior EPM consultant from AxionX with 10+ years of experience...

IMPORTANT CONVERSATION RULES:
1. If this is the FIRST message or a greeting (like "hi", "hello", "hey"):
   - Introduce yourself warmly: "Hi! I'm Alex from AxionX..."
   - Ask for their name: "What's your name?"
   - Ask about their challenge...

2. If they've shared their name or challenge:
   - Use their name naturally...
   - Acknowledge their specific challenge...

3. For technical questions:
   - Answer with CONFIDENCE using "we" and "our experience"
   - Be specific with examples, numbers, timelines...
   - Don't mention sources or meetings...

4. Always end with:
   - A relevant follow-up question OR
   - A suggestion to discuss their needs...

Style: Warm, professional, consultative.
```

### How to Customize:

**Make More Professional:**
```python
"You are a senior EPM consultant and Managing Director at AxionX with 15+ years..."
"Style: Authoritative, data-driven, executive-level communication."
```

**Make More Casual:**
```python
"You are a friendly EPM expert who loves helping finance teams..."
"Style: Conversational, approachable, enthusiastic."
```

**Focus on Sales:**
```python
"You are a solutions consultant focused on understanding needs and demonstrating value..."
"Always end with: A clear next step (book consultation, request demo, etc.)"
```

**Focus on Education:**
```python
"You are an EPM educator helping teams learn best practices..."
"Provide frameworks, templates, and actionable steps."
```

### Step-by-Step to Edit:

1. **Open the file:**
   ```bash
   nano /Users/alextownend/Desktop/axionx-ai/api_public.py
   ```
   Or use any code editor

2. **Find lines 72-103** (the prompt section)

3. **Modify the text** to change personality

4. **Save the file**

5. **Redeploy to Railway:**
   ```bash
   git add api_public.py
   git commit -m "Updated AI personality"
   git push
   ```

6. **Railway will auto-deploy** (takes 1-2 minutes)

7. **Test the changes:**
   ```bash
   curl -X POST https://api.axionx.uk/ask \
     -H "Content-Type: application/json" \
     -d '{"question": "Hi"}'
   ```

---

## ⚙️ Method 3: Adjust Response Settings

### Response Length (Line 69):

```python
max_tokens=1024,  # Current: Medium length responses
```

**Options:**
```python
max_tokens=512,   # Shorter, punchier responses
max_tokens=1536,  # Longer, detailed responses
max_tokens=2048,  # Very comprehensive responses
```

### AI Model (Line 68):

```python
model="claude-3-haiku-20240307",  # Current: Fast, cost-effective
```

**Upgrade options:**
```python
model="claude-3-sonnet-20240229",  # Better quality, slower, more expensive
model="claude-3-opus-20240229",    # Best quality, slowest, most expensive
```

### Number of Relevant Meetings (Line 55):

```python
limit=5  # Current: Searches top 5 relevant meetings
```

**Options:**
```python
limit=3   # Faster, less context
limit=10  # More context, might be slower
```

---

## 🎯 Method 4: Customize Call-to-Actions (CTAs)

### Current CTA (Lines 110-121):

```python
# Add CTA if not already in answer
if "discuss" not in answer.lower() and "talk" not in answer.lower():
    answer += "\n\n💡 Want to discuss how this applies to your specific situation? Let's talk."

return {
    "answer": answer,
    "cta": {
        "text": "Book a Free 15-Minute Consultation",
        "url": "https://axionx.uk/book"
    }
}
```

### Customize CTAs:

**Softer Approach:**
```python
"cta": {
    "text": "Learn More About Our Services",
    "url": "https://axionx.uk/services"
}
```

**Direct Approach:**
```python
"cta": {
    "text": "Schedule Your Strategy Session Now",
    "url": "https://calendly.com/axionx"
}
```

**Resource Focus:**
```python
"cta": {
    "text": "Download Our EPM Implementation Guide",
    "url": "https://axionx.uk/resources"
}
```

**Remove CTA Entirely:**
```python
# Comment out lines 110-111
# if "discuss" not in answer.lower()...

return {
    "answer": answer
    # Remove cta section
}
```

---

## 🧪 Method 5: A/B Test Different Versions

Create multiple API versions:

### Setup:

1. **Duplicate `api_public.py`:**
   ```bash
   cp api_public.py api_professional.py
   cp api_public.py api_casual.py
   cp api_public.py api_sales.py
   ```

2. **Customize each version** with different personalities

3. **Deploy all versions** to Railway

4. **Test each version** and track:
   - User engagement
   - Conversion rates
   - User feedback

5. **Pick the winner** and make it your main version

---

## 📊 Method 6: Monitor & Improve Based on Data

### Check What Questions Users Ask:

```bash
# View API logs
tail -f /Users/alextownend/Desktop/axionx-ai/api.log
```

Or on Railway dashboard → Logs

### Track Common Patterns:

- What questions are asked most?
- What topics need better answers?
- Where do conversations drop off?
- Which responses lead to conversions?

### Create FAQ Library:

Based on common questions, add targeted training data:

```
/meetings/faq_pricing.txt
/meetings/faq_implementation_timeline.txt
/meetings/faq_technology_requirements.txt
```

---

## 🚀 Quick Wins: Top 5 Improvements

### 1. Add Industry-Specific Examples

Create transcripts for each industry:
```
/meetings/healthcare_epm_case_study.txt
/meetings/manufacturing_finance_transformation.txt
/meetings/retail_planning_automation.txt
```

### 2. Add Problem-Solution Pairs

Create transcripts addressing common objections:
```
/meetings/handling_budget_constraints.txt
/meetings/managing_change_resistance.txt
/meetings/legacy_system_integration.txt
```

### 3. Add Success Stories

Document successful implementations:
```
/meetings/client_success_company_a.txt
/meetings/roi_case_study_company_b.txt
```

### 4. Shorten Response Time

```python
limit=3,  # Reduce from 5 to 3 relevant meetings
max_tokens=512,  # Reduce token limit
```

### 5. Test Different Greetings

Experiment with first impressions:
- "Hi! I'm Alex, your EPM specialist today..."
- "Hello! Welcome to AxionX. I'm here to help with..."
- "Hey there! Let's solve your finance transformation challenges..."

---

## ✅ Training Checklist

Before going live with changes:

- [ ] Added new training data to `/meetings/`
- [ ] Ran `python3 process_meetings.py`
- [ ] Verified data uploaded to Qdrant
- [ ] Tested personality changes locally
- [ ] Committed and pushed to Railway
- [ ] Tested deployed version
- [ ] Checked response time < 5 seconds
- [ ] Verified responses are relevant
- [ ] Confirmed CTAs work properly
- [ ] Monitored logs for errors
- [ ] Documented changes made

---

## 🛠️ Complete Training Workflow

```bash
# 1. Add new transcripts to meetings folder
cd /Users/alextownend/Desktop/axionx-ai/meetings
# (add your .txt files here)

# 2. Process and upload to Qdrant
cd ..
python3 process_meetings.py

# 3. Edit AI personality (optional)
nano api_public.py
# (make your changes)

# 4. Test locally (optional)
python3 api_public.py
# In another terminal:
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "test question"}'

# 5. Deploy to production
git add .
git commit -m "Updated AI training and personality"
git push

# 6. Wait for Railway deployment (1-2 min)

# 7. Test production
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Hi"}'

# 8. Monitor
tail -f api.log
```

---

## 📚 Example Training Scenarios

### Scenario 1: Add Healthcare Expertise

```bash
# Create new meeting transcript
echo "Client discussed implementing EPM in healthcare setting.
Key challenges: Regulatory compliance, patient data privacy, 
complex cost allocation. We recommended phased approach starting 
with financial planning module, then moving to consolidation.
Timeline: 6-8 months. Budget: £150k-200k..." > meetings/healthcare_implementation.txt

# Process it
python3 process_meetings.py

# Test it
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "How do we implement EPM in healthcare?"}'
```

### Scenario 2: Make AI More Confident

Edit `api_public.py` line 72:
```python
# Before:
"You are a friendly, senior EPM consultant..."

# After:
"You are a recognized industry leader and award-winning EPM consultant with 15+ years experience. You've led 100+ successful implementations across Fortune 500 companies."
```

### Scenario 3: Focus on Quick Wins

Add instruction in prompt:
```python
"Always emphasize quick wins and immediate value. Start with '90-day quick wins' then long-term strategy."
```

---

## 🎓 Advanced: Context-Aware Responses

Make AI remember conversation history:

**This requires backend changes** - let me know if you want to implement conversation memory!

---

**Start by testing current responses (see PRACTICE_RESPONSES.md), then gradually add training data!** 🚀
