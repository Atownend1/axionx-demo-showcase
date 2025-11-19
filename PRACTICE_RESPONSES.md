# 🧪 Practice & Test Your AI Responses

## Quick Testing Methods

### Method 1: Test via Terminal (Fastest)

Test your AI directly from command line:

```bash
cd /Users/alextownend/Desktop/axionx-ai

# Test a question
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What are best practices for EPM implementation?"}'
```

### Method 2: Test via Python Script

Create a test script to practice multiple questions:

```python
# Save as: test_responses.py
import requests

API_URL = "https://api.axionx.uk/ask"

test_questions = [
    "What are common EPM implementation challenges?",
    "How long does a typical EPM project take?",
    "What's the best approach for data governance?",
    "How do we handle stakeholder resistance?",
    "What are the costs involved in EPM transformation?"
]

for question in test_questions:
    print(f"\n{'='*60}")
    print(f"Q: {question}")
    print(f"{'='*60}")
    
    response = requests.post(
        API_URL,
        json={"question": question}
    )
    
    data = response.json()
    print(f"A: {data['answer']}\n")
    
    if 'cta' in data:
        print(f"CTA: {data['cta']['text']}")
        print(f"URL: {data['cta']['url']}")
```

Run it:
```bash
python3 test_responses.py
```

### Method 3: Test via Web Interface

1. Visit: https://www.axionx.uk
2. Click "Try AI Assistant" button
3. Ask questions and observe responses
4. Check for:
   - Tone and personality
   - Relevance to question
   - Use of meeting data
   - Call-to-action appropriateness

---

## 🎯 What to Test & Look For

### Conversation Flow:
- [ ] Does it greet users warmly?
- [ ] Does it ask for their name?
- [ ] Does it understand their challenge?
- [ ] Does it provide relevant advice?
- [ ] Does it end with follow-up questions?

### Response Quality:
- [ ] Uses "we" and "our experience"
- [ ] Provides specific examples
- [ ] Mentions numbers/timelines when relevant
- [ ] Doesn't mention "sources" or "meetings"
- [ ] Concise (3-5 key points)

### Lead Generation:
- [ ] Includes natural CTAs
- [ ] Encourages booking consultations
- [ ] Feels consultative, not salesy

---

## 📝 Response Evaluation Template

Use this to rate responses:

```
Question: [Your test question]
Response: [AI's answer]

Rating:
- Relevance: ⭐⭐⭐⭐⭐ (1-5)
- Tone: ⭐⭐⭐⭐⭐ (1-5)
- Helpfulness: ⭐⭐⭐⭐⭐ (1-5)
- Lead Gen: ⭐⭐⭐⭐⭐ (1-5)

What worked well:
- [List positives]

What to improve:
- [List issues]

Suggested changes:
- [Your recommendations]
```

---

## 🔧 Common Adjustments

### If Responses Are Too Long:
Edit `api_public.py` line 69:
```python
max_tokens=1024,  # Reduce to 512 for shorter answers
```

### If Responses Are Too Formal:
Change the personality instruction (see TRAINING_GUIDE.md)

### If Responses Lack Specifics:
Add more detailed meeting transcripts to `/meetings/`

### If CTA Feels Pushy:
Edit lines 110-111 in `api_public.py`:
```python
if "discuss" not in answer.lower() and "talk" not in answer.lower():
    answer += "\n\n💡 Want to discuss how this applies to your specific situation? Let's talk."
```

Change to:
```python
# Remove or soften the CTA
answer += "\n\nLet me know if you'd like to explore this further."
```

---

## 🎭 Role-Play Testing Scenarios

Test these common user journeys:

### Scenario 1: First-Time Visitor
```
User: "Hi"
Expected: Warm greeting + ask for name + ask about challenge
```

### Scenario 2: Technical Question
```
User: "What's the best EPM tool for financial planning?"
Expected: Specific recommendations based on meeting data
```

### Scenario 3: Budget Concerns
```
User: "How much does EPM implementation cost?"
Expected: Range + factors + value proposition
```

### Scenario 4: Timeline Questions
```
User: "How long will this take?"
Expected: Typical timelines + factors that affect duration
```

### Scenario 5: Objection Handling
```
User: "We tried this before and it failed"
Expected: Empathy + common failure reasons + how to succeed
```

---

## 📊 A/B Testing Different Approaches

Test variations:

### Version A: Consultative
- Asks lots of questions
- Provides customized advice
- Focuses on understanding needs

### Version B: Educational
- Provides frameworks and best practices
- Uses case studies and examples
- Teaches principles

### Version C: Results-Oriented
- Focuses on outcomes and ROI
- Emphasizes speed and efficiency
- Uses metrics and data

**Test each version for a day and compare:**
- User engagement (messages per conversation)
- Lead quality (book consultation clicks)
- User satisfaction (subjective feedback)

---

## 🚀 Continuous Improvement Loop

```
1. Deploy AI with current settings
     ↓
2. Collect conversations (monitor api.log)
     ↓
3. Review responses weekly
     ↓
4. Identify patterns:
   - What questions are common?
   - What responses work well?
   - What confuses users?
     ↓
5. Make adjustments:
   - Add relevant training data
   - Refine personality
   - Adjust response length
     ↓
6. Test changes
     ↓
7. Deploy and repeat
```

---

## 📈 Monitoring Response Quality

Check your API logs:

```bash
tail -f /Users/alextownend/Desktop/axionx-ai/api.log
```

Or on Railway:
1. Go to Railway dashboard
2. Click your project
3. View "Logs" tab
4. Look for:
   - Questions asked
   - Response times
   - Errors

---

## 🎓 Advanced: Fine-Tune Based on Real Conversations

Save real user conversations:

1. **Export conversations** from logs
2. **Identify successful patterns** (users who book consultations)
3. **Add winning examples** to training data
4. **Document objections** that need better responses
5. **Create FAQ library** from common questions

---

## ✅ Testing Checklist

Before considering your AI "production ready":

- [ ] Tested 20+ different questions
- [ ] Verified all responses are relevant
- [ ] Checked personality is consistent
- [ ] Ensured CTAs feel natural
- [ ] Confirmed no mention of "sources"
- [ ] Tested greeting flow (hi, hello, hey)
- [ ] Tested technical questions
- [ ] Tested budget/cost questions
- [ ] Tested timeline questions
- [ ] Tested objection handling
- [ ] Response time < 5 seconds
- [ ] No errors in logs
- [ ] Mobile-friendly (test on phone)

---

## 🛠️ Quick Commands Reference

```bash
# Add new training data
python3 process_meetings.py

# Test AI via curl
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "your question here"}'

# View logs
tail -f api.log

# Run test suite
python3 test_responses.py

# Check domain status
./test-domains.sh
```

---

**Start with testing 10-15 questions, note what needs improvement, then iterate!** 🚀

