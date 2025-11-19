# AxionX AI Training & Practice Manual
## Complete Guide to Training and Improving Your Finance Transformation Chatbot

---

## Table of Contents

1. [Quick Start (10 Minutes)](#quick-start)
2. [How Your AI Works](#how-it-works)
3. [Method 1: Add Training Data](#add-training-data)
4. [Method 2: Adjust Personality](#adjust-personality)
5. [Method 3: Configure Response Settings](#response-settings)
6. [Method 4: Customize CTAs](#customize-ctas)
7. [Testing Your AI](#testing)
8. [Practice Scenarios](#practice-scenarios)
9. [Monitoring & Improvement](#monitoring)
10. [Troubleshooting](#troubleshooting)

---

# Quick Start (10 Minutes) {#quick-start}

## The Fastest Way to Improve Your Chatbot

### Add More Knowledge (5 minutes)

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

### Change Personality (3 minutes)

```bash
# 1. Open the API file
nano /Users/alextownend/Desktop/axionx-ai/api_public.py

# 2. Find line 72 and change the personality
# 3. Save and deploy
git add api_public.py
git commit -m "Updated personality"
git push
```

---

# How Your AI Works {#how-it-works}

## Architecture Overview

Your chatbot consists of four main components:

1. **Frontend (Lovable)**: www.axionx.uk - The chat widget interface
2. **Backend API (Railway)**: api.axionx.uk - Processes requests
3. **Vector Database (Qdrant)**: Stores indexed meeting transcripts
4. **AI Engine (Claude + OpenAI)**: Generates responses

## The Request Flow

```
User asks question
    ↓
Frontend sends to API
    ↓
API converts question to vector (OpenAI embeddings)
    ↓
Qdrant finds 5 most relevant meeting transcripts
    ↓
Claude AI reads transcripts + generates answer
    ↓
Response sent back to user
```

## Current Training Data

- **Location**: `/Users/alextownend/Desktop/axionx-ai/meetings/`
- **Format**: Text files containing meeting transcripts
- **Indexed in**: Qdrant vector database
- **Searchable by**: Semantic similarity (meaning-based, not keyword)

---

# Method 1: Add Training Data {#add-training-data}

## What Makes Good Training Data?

### ✅ Excellent Training Content:

- **Client conversations** with real problems and solutions
- **Implementation stories** including timelines, costs, challenges
- **Best practices** with specific examples and frameworks
- **Common objections** and how you addressed them
- **Success stories** with measurable outcomes (ROI, time saved, etc.)
- **Technical guidance** on EPM tools (Oracle, SAP, Anaplan, OneStream)
- **Industry-specific** knowledge (healthcare, manufacturing, retail, etc.)

### ❌ Poor Training Content:

- Generic marketing copy without substance
- Outdated or incorrect information
- Random unrelated content
- Raw confidential data (anonymize client names first!)
- Short snippets without context

## Step-by-Step: Add New Training Data

### Step 1: Create Training Files

Navigate to the meetings folder:
```bash
cd /Users/alextownend/Desktop/axionx-ai/meetings
```

Create a new file:
```bash
nano healthcare_epm_implementation.txt
```

**Example content format:**

```
Meeting: Healthcare EPM Implementation Discussion
Date: November 2024
Topic: Implementing EPM in regulated healthcare environment

Key Discussion Points:

Challenge: Client struggled with regulatory compliance (HIPAA) during EPM rollout
Solution: We implemented role-based access controls and audit trails from day one
Timeline: 8 months phased approach - Planning (2mo), Build (4mo), Deploy (2mo)
Budget: £180,000 including licenses and consulting
Tools: Oracle EPM Cloud with enhanced security features

Best Practices Discussed:
1. Start with financial planning module before consolidation
2. Engage compliance team from kickoff
3. Document all data flows for regulatory audits
4. Use test environment that mirrors production
5. Train super-users before broad deployment

Common Objections Handled:
- "Too expensive": Showed 18-month ROI through automation savings
- "Takes too long": Demonstrated quick wins in 90 days (automated reports)
- "Too complex": Phased approach reduces risk and change fatigue

Results:
- Reduced month-end close from 15 days to 5 days
- Eliminated 200+ hours/month of manual work
- Improved forecast accuracy by 35%
- Full compliance with HIPAA requirements

Key Takeaway: Healthcare implementations require extra security planning 
but deliver massive efficiency gains once deployed properly.
```

### Step 2: Process and Index

After adding your files, process them:

```bash
cd /Users/alextownend/Desktop/axionx-ai
python3 process_meetings.py
```

**What this does:**
1. Reads all files in `/meetings/` folder
2. Splits text into 500-character chunks
3. Converts each chunk to a vector (embedding)
4. Uploads vectors to Qdrant database
5. Makes content searchable by AI

**Expected output:**
```
📁 Processing meetings...
✅ Processed: healthcare_epm_implementation.txt (12 chunks)
✅ Processed: manufacturing_case_study.txt (8 chunks)
✅ Total: 20 chunks uploaded to Qdrant
Collection: axionx_meetings
```

### Step 3: Test New Knowledge

Ask a question related to your new content:

```bash
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "How do we implement EPM in healthcare?"}'
```

The AI should now reference your new training data!

## Organizing Your Training Library

### Recommended Structure:

```
meetings/
├── industry_healthcare/
│   ├── healthcare_implementation_best_practices.txt
│   ├── hipaa_compliance_epm.txt
│   └── healthcare_roi_case_study.txt
├── industry_manufacturing/
│   ├── manufacturing_planning_automation.txt
│   └── supply_chain_integration.txt
├── technical/
│   ├── oracle_epm_technical_guide.txt
│   ├── anaplan_vs_onestream_comparison.txt
│   └── data_integration_patterns.txt
├── sales/
│   ├── handling_budget_objections.txt
│   ├── roi_justification_examples.txt
│   └── competitor_comparisons.txt
└── implementation/
    ├── typical_project_timeline.txt
    ├── change_management_best_practices.txt
    └── post_go_live_support.txt
```

## Quick Training Templates

### Template 1: Implementation Story
```
Project: [Client/Industry] EPM Implementation
Challenge: [What problem they faced]
Solution: [What you recommended]
Approach: [Step-by-step process]
Timeline: [How long it took]
Budget: [Investment required]
Tools: [Technology used]
Results: [Measurable outcomes]
Lessons Learned: [Key insights]
```

### Template 2: Technical Guidance
```
Topic: [Technical subject]
Context: [When this applies]
Problem: [Common issue]
Solution: [Technical approach]
Steps: [How to implement]
Gotchas: [Common mistakes to avoid]
Best Practices: [Proven approaches]
Example: [Real-world scenario]
```

### Template 3: Sales Conversation
```
Objection: [What prospect said]
Context: [Their situation]
Response: [How you addressed it]
Evidence: [Data/examples used]
Outcome: [Result of conversation]
Follow-up: [Next steps]
```

---

# Method 2: Adjust Personality {#adjust-personality}

## Where to Edit

**File**: `/Users/alextownend/Desktop/axionx-ai/api_public.py`  
**Lines**: 72-103  
**Section**: AI prompt/instructions

## Current Personality

```python
You are a friendly, senior EPM consultant from AxionX with 10+ years 
of experience in finance transformation and EPM implementations.

CONVERSATION RULES:
1. Greetings: Introduce warmly, ask for name, ask about challenge
2. Use their name naturally in conversation
3. Answer with confidence using "we" and "our experience"
4. Be specific with examples, numbers, timelines
5. Don't mention sources or meetings
6. Keep concise but valuable (3-5 key points)
7. End with follow-up question or suggestion

Style: Warm, professional, consultative.
```

## Personality Templates

### Professional Executive Advisor
```python
content: f"""You are Alex Chen, Managing Partner at AxionX with 15+ years 
advising Fortune 500 CFOs and finance executives on enterprise performance 
management transformation.

Your expertise:
- Strategic planning and business case development
- C-suite stakeholder management
- Enterprise-wide transformation programs
- ROI modeling and value realization

Communication style:
- Speak in strategic, business-outcome terms
- Focus on ROI, risk mitigation, and competitive advantage
- Use executive-level language (avoid technical jargon)
- Ask strategic questions about business objectives
- Provide frameworks and decision criteria

Tone: Authoritative, strategic, executive-level.

{context}

User Question: {q.question}

Provide strategic guidance focusing on business value and executive concerns.

Answer:"""
```

### Friendly Problem Solver
```python
content: f"""You are Sam, a friendly EPM specialist who genuinely loves 
helping finance teams solve their planning and reporting challenges.

Your approach:
- Make complex concepts simple and approachable
- Share real stories and relatable examples
- Celebrate small wins and progress
- Build confidence through encouragement
- Break big problems into manageable steps

Communication style:
- Conversational and warm
- Use analogies and metaphors
- Ask clarifying questions
- Acknowledge frustrations
- Provide actionable next steps

Tone: Enthusiastic, empathetic, encouraging.

{context}

User Question: {q.question}

Help them feel confident and excited about solving their challenge.

Answer:"""
```

### Technical Expert
```python
content: f"""You are Jordan Lee, Principal EPM Architect with deep technical 
expertise in Oracle EPM Cloud, SAP BPC, Anaplan, and OneStream.

Your expertise:
- Solution architecture and design patterns
- Data integration and ETL processes
- Security models and access controls
- Performance optimization
- API integrations and automation

Communication style:
- Provide specific technical guidance
- Reference actual features and capabilities
- Explain implementation approaches
- Discuss pros/cons of different options
- Include configuration examples when relevant

Tone: Precise, technical, solution-focused.

{context}

User Question: {q.question}

Provide detailed technical guidance with specific implementation steps.

Answer:"""
```

### Sales Consultant
```python
content: f"""You are Morgan Taylor, Solutions Consultant at AxionX focused 
on understanding client needs and demonstrating clear business value.

Your objectives:
- Understand their current challenges deeply
- Identify pain points and impact on business
- Demonstrate relevant experience and credibility
- Create urgency around solving problems
- Guide toward next steps (consultation, demo, assessment)

Communication style:
- Ask probing discovery questions
- Listen actively and acknowledge concerns
- Share relevant success stories
- Quantify value and ROI
- Suggest clear next actions

Conversation flow:
1. Build rapport and understand situation
2. Identify specific challenges and impact
3. Share relevant experience
4. Discuss potential solutions
5. Suggest consultation or next step

Tone: Consultative, value-focused, action-oriented.

{context}

User Question: {q.question}

Understand their needs and guide them toward a consultation.

Answer:"""
```

### Educator/Trainer
```python
content: f"""You are Dr. Riley Park, EPM educator and thought leader who 
helps finance teams learn best practices and build internal capabilities.

Your mission:
- Educate on EPM principles and frameworks
- Provide templates and tools
- Build knowledge and confidence
- Share industry best practices
- Enable self-service problem solving

Communication style:
- Structured, step-by-step explanations
- Provide frameworks and models
- Use teaching analogies
- Offer resources and references
- Check for understanding

Tone: Educational, patient, empowering.

{context}

User Question: {q.question}

Teach them the principles and provide actionable frameworks.

Answer:"""
```

## How to Change Personality

1. **Open the file:**
   ```bash
   cd /Users/alextownend/Desktop/axionx-ai
   nano api_public.py
   ```

2. **Find line 72** (search for "You are a friendly")

3. **Replace the prompt** with your chosen personality template

4. **Save the file** (Ctrl+X, Y, Enter in nano)

5. **Deploy to production:**
   ```bash
   git add api_public.py
   git commit -m "Updated AI personality to [your choice]"
   git push
   ```

6. **Wait 1-2 minutes** for Railway to redeploy

7. **Test the new personality:**
   ```bash
   curl -X POST https://api.axionx.uk/ask \
     -H "Content-Type: application/json" \
     -d '{"question": "Hi, I need help with EPM"}'
   ```

---

# Method 3: Configure Response Settings {#response-settings}

## Response Length

**Location**: Line 69 in `api_public.py`

```python
max_tokens=1024,  # Current setting
```

### Options:

| Tokens | Length | Best For |
|--------|--------|----------|
| 256 | Very short | Quick answers, mobile users |
| 512 | Short | Concise responses, high-level guidance |
| 1024 | Medium | Balanced detail (current setting) |
| 1536 | Long | Detailed explanations |
| 2048 | Very long | Comprehensive analysis |

**Cost impact**: More tokens = slightly higher API costs

## AI Model Selection

**Location**: Line 68 in `api_public.py`

```python
model="claude-3-haiku-20240307",  # Current: Fast & economical
```

### Available Models:

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| claude-3-haiku | ⚡⚡⚡ | ⭐⭐⭐ | $ | High volume, fast responses |
| claude-3-sonnet | ⚡⚡ | ⭐⭐⭐⭐ | $$ | Balanced quality & speed |
| claude-3-opus | ⚡ | ⭐⭐⭐⭐⭐ | $$$ | Highest quality needed |

**Recommendation**: Start with Haiku (current), upgrade to Sonnet if quality issues.

## Context Window (Meeting Search Results)

**Location**: Line 55 in `api_public.py`

```python
limit=5  # Current: Searches top 5 relevant meetings
```

### Options:

| Limit | Speed | Context | Best For |
|-------|-------|---------|----------|
| 3 | ⚡⚡⚡ | Less | Simple questions |
| 5 | ⚡⚡ | Balanced | Most use cases (current) |
| 10 | ⚡ | More | Complex questions needing broad context |

**Trade-off**: More context = better answers but slower responses

---

# Method 4: Customize CTAs {#customize-ctas}

## Call-to-Action Configuration

**Location**: Lines 110-121 in `api_public.py`

### Current CTA Setup

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

### CTA Templates

#### Soft/Educational Approach
```python
"cta": {
    "text": "Learn More About Our Services",
    "url": "https://axionx.uk/services"
}
```

#### Direct Sales Approach
```python
"cta": {
    "text": "Schedule Your Strategy Session Now →",
    "url": "https://calendly.com/axionx/strategy"
}
```

#### Resource-First Approach
```python
"cta": {
    "text": "Download Our EPM Implementation Guide",
    "url": "https://axionx.uk/download/epm-guide"
}
```

#### Assessment Approach
```python
"cta": {
    "text": "Get Your Free EPM Readiness Assessment",
    "url": "https://axionx.uk/assessment"
}
```

#### Demo Focus
```python
"cta": {
    "text": "See Live Demo of Our Solutions",
    "url": "https://axionx.uk/demo"
}
```

### Remove CTAs Entirely

If you want a pure information chatbot without sales push:

```python
# Comment out the CTA insertion (lines 110-111)
# if "discuss" not in answer.lower()...

return {
    "answer": answer
    # Remove the cta section
}
```

### Dynamic CTAs Based on Question

```python
# Add before return statement
cta_text = "Book a Free Consultation"
cta_url = "https://axionx.uk/book"

# Customize based on question type
if "cost" in q.question.lower() or "price" in q.question.lower():
    cta_text = "Get Custom Pricing Quote"
    cta_url = "https://axionx.uk/pricing"
elif "demo" in q.question.lower():
    cta_text = "Schedule Live Demo"
    cta_url = "https://axionx.uk/demo"
elif "help" in q.question.lower():
    cta_text = "Talk to an Expert"
    cta_url = "https://axionx.uk/contact"

return {
    "answer": answer,
    "cta": {
        "text": cta_text,
        "url": cta_url
    }
}
```

---

# Testing Your AI {#testing}

## Method 1: Command Line Testing (Fastest)

### Test via cURL

```bash
# Basic test
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What are best practices for EPM implementation?"}'

# Test with formatted output
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "How long does EPM implementation take?"}' | python3 -m json.tool
```

### Essential Test Questions

```bash
# 1. Test greeting flow
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Hi"}'

# 2. Test technical knowledge
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What EPM tool should we choose for financial planning?"}'

# 3. Test budget/cost handling
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "How much does EPM implementation typically cost?"}'

# 4. Test timeline questions
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "How long will this project take?"}'

# 5. Test objection handling
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "We tried this before and it failed. Why would it work now?"}'
```

## Method 2: Python Test Script

Create a comprehensive test suite:

```python
# Save as: test_ai_responses.py
import requests
import json
from datetime import datetime

API_URL = "https://api.axionx.uk/ask"

# Test categories
test_cases = {
    "Greetings": [
        "Hi",
        "Hello",
        "Hey there",
    ],
    "Technical Questions": [
        "What's the best EPM tool for financial planning?",
        "How do I integrate EPM with our ERP system?",
        "What are the technical requirements for EPM implementation?",
    ],
    "Business Questions": [
        "What ROI can we expect from EPM?",
        "How long does implementation take?",
        "What are the main benefits of EPM?",
    ],
    "Cost/Budget": [
        "How much does EPM cost?",
        "What's the typical budget for this?",
        "Is there a cheaper alternative?",
    ],
    "Objections": [
        "This seems too expensive",
        "We don't have time for this",
        "Our team won't adopt new technology",
    ]
}

print("=" * 70)
print("AxionX AI Response Testing")
print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print("=" * 70)

for category, questions in test_cases.items():
    print(f"\n\n{'='*70}")
    print(f"Category: {category}")
    print("=" * 70)
    
    for question in questions:
        print(f"\n  Q: {question}")
        print("  " + "-" * 66)
        
        try:
            response = requests.post(
                API_URL,
                json={"question": question},
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                answer = data.get('answer', 'No answer provided')
                
                # Print answer with word wrap
                words = answer.split()
                line = "  A: "
                for word in words:
                    if len(line + word) > 68:
                        print(line)
                        line = "     " + word + " "
                    else:
                        line += word + " "
                print(line)
                
                # Show CTA if present
                if 'cta' in data:
                    print(f"\n  CTA: {data['cta']['text']}")
                    print(f"  URL: {data['cta']['url']}")
                    
            else:
                print(f"  ERROR: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"  ERROR: {str(e)}")
        
        print()

print("\n" + "=" * 70)
print("Testing Complete")
print("=" * 70)
```

Run it:
```bash
python3 test_ai_responses.py
```

## Method 3: Web Interface Testing

1. **Visit your live site:**
   ```
   https://www.axionx.uk
   ```

2. **Click "Try AI Assistant"**

3. **Test the conversation flow:**
   - Start with greeting
   - Ask follow-up questions
   - Test objections
   - Check if CTAs appear
   - Verify mobile experience

4. **Check browser console** (F12):
   - Look for JavaScript errors
   - Check API response times
   - Verify requests go to correct API

## Response Evaluation Checklist

For each response, evaluate:

### ✅ Relevance (1-5 stars)
- Does it answer the question directly?
- Is the information accurate?
- Does it use relevant training data?

### ✅ Tone (1-5 stars)
- Matches intended personality?
- Appropriate formality level?
- Warm and engaging?

### ✅ Completeness (1-5 stars)
- Provides enough detail?
- Includes examples/numbers?
- Actionable advice given?

### ✅ Lead Generation (1-5 stars)
- Natural CTA integration?
- Creates desire for consultation?
- Not too pushy or salesy?

### ✅ Technical (1-5 stars)
- Response time < 5 seconds?
- No errors in logs?
- Proper formatting?

## Response Grading Template

```
Question: [Test question]
Response: [AI answer]

Ratings:
- Relevance:    ⭐⭐⭐⭐⭐
- Tone:         ⭐⭐⭐⭐⭐
- Completeness: ⭐⭐⭐⭐⭐
- Lead Gen:     ⭐⭐⭐⭐⭐
- Technical:    ⭐⭐⭐⭐⭐

Overall: ____ / 25

What worked well:
- [List positives]

What needs improvement:
- [List issues]

Action items:
- [Changes to make]
```

---

# Practice Scenarios {#practice-scenarios}

## Role-Play Testing

### Scenario 1: First-Time Visitor (Curious)

**User Journey:**
```
User: "Hi"
Expected: Warm greeting + introduction + ask for name

User: "I'm Sarah"
Expected: Use name + ask about their challenge

User: "We're struggling with our month-end close"
Expected: Acknowledge pain + relevant advice + follow-up question
```

**What to look for:**
- Natural conversation flow
- Uses their name
- Asks relevant questions
- Builds rapport

### Scenario 2: Technical Evaluator (Researching Tools)

**User Journey:**
```
User: "What's the best EPM tool?"
Expected: Clarify requirements first

User: "We need financial planning for 500 users"
Expected: Specific tool recommendations with reasons

User: "What about Anaplan vs OneStream?"
Expected: Compare with pros/cons based on their needs
```

**What to look for:**
- Asks clarifying questions
- Provides specific technical details
- References training data
- Helps with decision criteria

### Scenario 3: Budget-Conscious Buyer (Price Sensitive)

**User Journey:**
```
User: "How much does this cost?"
Expected: Range + value discussion

User: "That's too expensive"
Expected: ROI justification + payment options + quick wins

User: "Can we do this cheaper?"
Expected: Phased approach + prioritization
```

**What to look for:**
- Acknowledges concern
- Focuses on value/ROI
- Provides alternatives
- Maintains professionalism

### Scenario 4: Skeptical Executive (Been Burned Before)

**User Journey:**
```
User: "We tried this 3 years ago and it failed"
Expected: Empathy + common failure reasons

User: "Why would it work now?"
Expected: Different approach + success factors + risk mitigation

User: "I need proof"
Expected: Case studies + metrics + references
```

**What to look for:**
- Shows empathy
- Doesn't get defensive
- Provides evidence
- Addresses root concerns

### Scenario 5: Urgent Need (Time Pressure)

**User Journey:**
```
User: "We need this done in 3 months"
Expected: Reality check + what's possible + quick wins

User: "That's not fast enough"
Expected: Accelerated options + trade-offs + phased approach

User: "What can we do immediately?"
Expected: 30-day quick wins + immediate actions
```

**What to look for:**
- Manages expectations
- Provides realistic timelines
- Offers quick wins
- Creates urgency for consultation

---

# Monitoring & Improvement {#monitoring}

## Check API Logs

### View Live Logs

```bash
# Local logs
tail -f /Users/alextownend/Desktop/axionx-ai/api.log

# Railway logs (in dashboard)
# Go to railway.app → Your Project → Logs tab
```

### What to Look For

```
❓ Question: [User question]
📚 Found X relevant meetings
✅ Generated answer
```

**Red flags:**
- Response time > 10 seconds
- Errors or exceptions
- Failed Qdrant connections
- Authentication issues

## Track Metrics

### Key Performance Indicators

| Metric | Target | How to Track |
|--------|--------|--------------|
| Response time | < 5 seconds | API logs |
| Conversation length | 3-5 messages | Manual review |
| CTA click rate | > 10% | Analytics |
| Consultation bookings | Track conversions | CRM |
| User satisfaction | > 4/5 | Feedback surveys |

### Weekly Review Process

**Every Monday:**

1. **Review logs** from past week
2. **Identify common questions** asked
3. **Note which responses** worked well
4. **List gaps** in knowledge
5. **Plan improvements** for week

**Template:**
```
Week of: [Date]
Total conversations: [#]

Most common questions:
1. [Question 1] - Asked X times
2. [Question 2] - Asked Y times
3. [Question 3] - Asked Z times

Knowledge gaps identified:
- [Topic 1]: Need more training data
- [Topic 2]: Responses too vague
- [Topic 3]: Missing industry examples

Action items for next week:
- [ ] Add training data on [Topic 1]
- [ ] Adjust personality to be more [specific]
- [ ] Test new responses for [Topic 3]
```

## Continuous Improvement Loop

```
1. Monitor conversations
     ↓
2. Identify patterns (weekly)
     ↓
3. Add training data (as needed)
     ↓
4. Adjust personality (monthly)
     ↓
5. A/B test changes
     ↓
6. Deploy winning version
     ↓
7. Repeat
```

## User Feedback Collection

### Add Feedback to Chat Widget

Consider adding thumbs up/down after responses:

```javascript
// In ChatWidget.jsx after each message
<div className="feedback-buttons">
  <button onClick={() => sendFeedback('positive', messageId)}>👍</button>
  <button onClick={() => sendFeedback('negative', messageId)}>👎</button>
</div>
```

### Post-Conversation Survey

Add a quick survey after chat closes:
```
"How was your experience? (1-5 stars)"
"Did you find what you needed? (Yes/No)"
"What could we improve?"
```

---

# Troubleshooting {#troubleshooting}

## Common Issues & Solutions

### Issue: Responses Are Too Generic

**Symptoms:**
- Vague, non-specific answers
- Lacks concrete examples
- Feels like generic AI

**Solutions:**
1. Add more detailed training data with specific examples
2. Include numbers, timelines, costs in transcripts
3. Add more case studies and success stories
4. Adjust prompt to emphasize specificity

### Issue: Responses Are Too Long

**Symptoms:**
- Takes forever to read
- Users drop off mid-response
- Mobile users complain

**Solutions:**
1. Reduce `max_tokens` from 1024 to 512
2. Add instruction: "Keep responses to 3-5 key bullet points"
3. Adjust personality to be more concise
4. Remove redundant training data

### Issue: Responses Are Too Short

**Symptoms:**
- Doesn't provide enough detail
- Users ask follow-up clarifying questions
- Feels unhelpful

**Solutions:**
1. Increase `max_tokens` from 1024 to 1536
2. Add instruction: "Provide detailed explanations with examples"
3. Increase context window (limit) from 5 to 10
4. Add more comprehensive training data

### Issue: Wrong Personality/Tone

**Symptoms:**
- Too formal or too casual
- Doesn't match brand
- Users mention tone in feedback

**Solutions:**
1. Review personality prompt (lines 72-103)
2. Use one of the personality templates
3. Add specific tone instructions
4. Test with 10 questions and iterate

### Issue: Slow Response Times

**Symptoms:**
- Takes > 10 seconds to respond
- Users complain about lag
- Timeout errors

**Solutions:**
1. Reduce context window from 5 to 3 meetings
2. Reduce `max_tokens` to 512
3. Check Qdrant database performance
4. Consider upgrading Railway plan
5. Optimize training data (remove duplicates)

### Issue: Irrelevant Responses

**Symptoms:**
- Answers don't match questions
- Pulls wrong training data
- Confuses topics

**Solutions:**
1. Improve training data organization
2. Add more specific examples for each topic
3. Remove outdated or conflicting data
4. Reprocess meetings: `python3 process_meetings.py`
5. Check Qdrant indexing

### Issue: Too Salesy/Pushy

**Symptoms:**
- Every response pushes CTA
- Users mention "too salesy"
- Feels like marketing bot

**Solutions:**
1. Remove or soften CTA (lines 110-111)
2. Change personality to "educator" or "advisor"
3. Only show CTA after 2-3 messages
4. Make CTAs more subtle
5. Focus on value over selling

### Issue: Not Enough Lead Generation

**Symptoms:**
- No consultation bookings
- Users don't click CTAs
- Lacks business impact

**Solutions:**
1. Strengthen CTAs with urgency
2. Add more value statements
3. Include ROI examples in responses
4. Adjust personality to "sales consultant"
5. Test different CTA copy

### Issue: API Errors

**Symptoms:**
- 500 errors in responses
- "Connection failed" messages
- Blank responses

**Solutions:**
1. Check Railway logs for errors
2. Verify environment variables set
3. Test Qdrant connection
4. Check Anthropic API key valid
5. Verify OpenAI API key valid
6. Check API rate limits

**Emergency fix:**
```bash
# Restart Railway service
# Go to railway.app → Your Project → Settings → Restart
```

### Issue: Training Data Not Working

**Symptoms:**
- Added new data but AI doesn't use it
- Old information still appears
- New files not indexed

**Solutions:**
1. Verify files in `/meetings/` folder
2. Re-run processing: `python3 process_meetings.py`
3. Check for processing errors in output
4. Verify Qdrant collection has new data
5. Clear Qdrant and reindex everything:
   ```python
   # In Python console
   from qdrant_client import QdrantClient
   client = QdrantClient(url="your_url", api_key="your_key")
   client.delete_collection("axionx_meetings")
   # Then run: python3 process_meetings.py
   ```

---

## Quick Reference Commands

### Training & Testing
```bash
# Add training data
cd /Users/alextownend/Desktop/axionx-ai/meetings
nano new_file.txt
cd ..
python3 process_meetings.py

# Test API
curl -X POST https://api.axionx.uk/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "your question"}'

# Run test suite
python3 test_ai_responses.py

# Check domain status
./test-domains.sh

# View logs
tail -f api.log
```

### Deployment
```bash
# Deploy changes
git add .
git commit -m "Description of changes"
git push

# Railway auto-deploys in 1-2 minutes
```

### File Locations
```
Training data:     /Users/alextownend/Desktop/axionx-ai/meetings/
API code:          /Users/alextownend/Desktop/axionx-ai/api_public.py
Processing script: /Users/alextownend/Desktop/axionx-ai/process_meetings.py
Frontend code:     /Users/alextownend/Desktop/axionx-ai/frontend/src/
```

### Important Links
```
Live site:       https://www.axionx.uk
API endpoint:    https://api.axionx.uk
Lovable dash:    https://lovable.app
Railway dash:    https://railway.app
IONOS dash:      https://ionos.com
```

---

## Support & Next Steps

### What You've Learned

✅ How your AI chatbot works  
✅ How to add new training data  
✅ How to adjust personality and tone  
✅ How to configure response settings  
✅ How to test and evaluate responses  
✅ How to monitor and improve over time  

### Recommended Next Actions

**This Week:**
1. Test current AI with 10-15 questions
2. Add 2-3 new training files with your best examples
3. Process training data
4. Test improvements

**This Month:**
1. Try different personality settings
2. Build industry-specific knowledge bases
3. Track metrics and user feedback
4. Iterate based on data

**Ongoing:**
1. Weekly review of conversations
2. Monthly training data additions
3. Quarterly personality adjustments
4. Continuous A/B testing

---

## Appendix: Advanced Topics

### Conversation Memory (Future Enhancement)

Currently, the AI doesn't remember previous messages in a conversation. To add memory:

1. Store conversation history in database
2. Send previous messages as context
3. Update API to maintain session state

*Let me know if you want help implementing this!*

### Multi-Language Support

To support multiple languages:

1. Detect user language
2. Translate question to English
3. Process with AI
4. Translate response back

*Claude supports 100+ languages natively.*

### Custom Domain for API

Currently using `api.axionx.uk`. You could also:

1. Use API gateway service
2. Add authentication layer
3. Implement rate limiting
4. Add caching for common questions

### Analytics Integration

Track detailed usage:

1. Add Google Analytics to chat widget
2. Send events for each interaction
3. Track conversion funnel
4. A/B test different versions

---

**End of Training Manual**

*Version 1.0 - November 2024*  
*AxionX AI Platform*

For questions or support, refer to the documentation files in your project folder.

