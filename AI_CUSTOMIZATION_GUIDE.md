# 🤖 AI Customization Guide - Make Your AI Smarter

## ✅ What We Just Did

Updated your AI to be more conversational and gather lead information by:
1. ✅ Modified the AI prompt in `api_public.py`
2. ✅ Updated the initial greeting in `ChatWidget.jsx`
3. ✅ Pushed changes to GitHub
4. ⏳ Railway will auto-deploy (takes 2-3 minutes)

---

## 🎯 How the New AI Works

### **First Interaction:**
When someone says "Hi" or "Hello":
- AI introduces itself: "Hi! I'm Alex from AxionX..."
- Asks for their name
- Asks about their specific challenge

### **Follow-up Conversation:**
- Uses their name naturally
- Provides specific, relevant advice
- Asks follow-up questions
- Keeps conversation flowing

### **Technical Questions:**
- Answers with authority and experience
- Provides specific examples and numbers
- No mention of "sources" or "meetings"
- Professional but conversational

---

## 🔧 How to Customize Further

### **Location:** `/Users/alextownend/Desktop/axionx-ai/api_public.py`

Find this section (around line 72):

```python
content: f"""You are a friendly, senior EPM consultant from AxionX...
```

### **What You Can Change:**

#### **1. Change the Persona**
```python
You are a [ROLE] from [COMPANY] with [EXPERIENCE]...

Examples:
- "You are a CFO advisor from AxionX..."
- "You are a finance transformation expert..."
- "You are an EPM implementation specialist..."
```

#### **2. Modify Greeting Behavior**
```python
1. If this is the FIRST message or a greeting:
   - Introduce yourself warmly: "YOUR INTRO HERE"
   - Ask for their name: "YOUR QUESTION"
   - Ask about their challenge: "YOUR CHALLENGE QUESTION"
```

**Examples:**
```python
- "Hi! I'm Sarah, specializing in financial close automation."
- "Hello! What brings you here today?"
- "What's keeping you up at night in your finance operations?"
```

#### **3. Change Conversation Style**
```python
Style: [YOUR STYLE HERE]

Examples:
- "Casual, friendly, like chatting with a colleague"
- "Formal, executive-level, boardroom style"
- "Technical, detailed, analyst-focused"
```

#### **4. Add Specific Questions**
```python
4. Always end with:
   - [YOUR ENDING STRATEGY]

Examples:
- "Ask about their budget timeline"
- "Ask about their current systems"
- "Ask about their team size"
- "Ask about their biggest pain point"
```

---

## 📝 Step-by-Step Customization

### **Step 1: Edit the Prompt**

Open `api_public.py` in your code editor:

```bash
cd /Users/alextownend/Desktop/axionx-ai
code api_public.py  # or your preferred editor
```

### **Step 2: Find the Prompt Section**

Search for: `You are a friendly, senior EPM consultant`

### **Step 3: Make Your Changes**

Example - Make it more technical:

```python
content: f"""You are a technical EPM architect from AxionX with deep expertise in OneStream, Oracle EPM, and Anaplan.

IMPORTANT CONVERSATION RULES:
1. If this is the FIRST message:
   - Introduce yourself: "Hi! I'm the AxionX EPM AI, trained on hundreds of implementation projects."
   - Ask: "What EPM platform are you currently using or considering?"
   - Ask: "What's your biggest technical challenge?"

2. For technical questions:
   - Be specific with version numbers, configuration details
   - Reference specific features and best practices
   - Suggest concrete implementation approaches

Style: Technical, detailed, solutions-focused. Like a senior architect in a design session.
```

### **Step 4: Update Frontend Greeting**

Open `frontend/src/components/ChatWidget.jsx`:

```javascript
const [messages, setMessages] = useState([
  {
    role: 'assistant',
    content: "YOUR NEW GREETING HERE"
  }
])
```

Example greetings:
```javascript
// Professional:
"Hello! I'm here to help with your EPM and finance transformation needs. How can I assist you today?"

// Casual:
"Hey there! 👋 I'm your EPM expert. What's on your mind?"

// Lead-focused:
"Hi! I'm Alex from AxionX. Before we dive in, may I ask - what's your name and what challenge brought you here today?"
```

### **Step 5: Test Locally (Optional)**

```bash
# Start your local API
python api_public.py

# In another terminal, test:
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Hi"}'
```

### **Step 6: Deploy**

```bash
git add api_public.py frontend/src/components/ChatWidget.jsx
git commit -m "Update AI personality and greeting"
git push origin main
```

Railway will auto-deploy in 2-3 minutes!

---

## 🎓 Advanced: Train on New Data

### **Option 1: Add More Meeting Transcripts**

1. Add new meeting files to `/meetings/` folder
2. Run the processor:
```bash
python process_meetings.py
```

3. Upload to Qdrant:
```bash
python upload_to_cloud.py
```

4. Your AI now knows about the new meetings!

### **Option 2: Add Custom Knowledge**

Create a new file with your specific knowledge:

```python
# add_custom_knowledge.py
from qdrant_client import QdrantClient
from openai import OpenAI
import os

custom_knowledge = """
AxionX Specific Information:
- We specialize in OneStream implementations
- Average project timeline: 12-16 weeks
- Typical client size: $500M+ revenue
- Key differentiator: Real-time consolidation expertise
"""

# Convert to vector and upload
# (similar to upload_to_cloud.py)
```

### **Option 3: Fine-tune Response Style**

Add specific examples in the prompt:

```python
Example interactions:
User: "What's your pricing?"
You: "Our implementations typically range from $150K-$500K depending on complexity. What's your organization's size and current setup?"

User: "How long does it take?"
You: "Most of our OneStream implementations take 12-16 weeks. What's your target go-live date?"
```

---

## 🧪 Testing Different Personalities

### **Sales-Focused AI:**
```python
You are a sales consultant focused on understanding client needs and demonstrating value.

Always:
- Ask qualifying questions (budget, timeline, decision makers)
- Emphasize ROI and business value
- Create urgency without being pushy
- End with a clear next step
```

### **Technical Expert AI:**
```python
You are a technical architect focused on solving complex implementation challenges.

Always:
- Ask about current tech stack
- Provide specific technical solutions
- Reference best practices and patterns
- Offer architectural recommendations
```

### **Advisory AI (Current):**
```python
You are a trusted advisor focused on building relationships and understanding challenges.

Always:
- Ask about their situation first
- Listen and acknowledge their pain points
- Provide relevant experience and insights
- Guide toward a deeper conversation
```

---

## 📊 Track What Questions People Ask

To improve your AI, monitor common questions:

1. Check Railway logs for questions:
```bash
# In Railway dashboard → Logs
# Look for: "❓ Question: ..."
```

2. Add FAQs to your prompt:
```python
Common questions and best answers:
Q: "What's EPM?"
A: [Your best answer]

Q: "How much does it cost?"
A: [Your pricing approach]
```

---

## 🎯 Best Practices

### **DO:**
✅ Test changes locally first
✅ Keep the prompt focused and clear
✅ Ask one question at a time
✅ Use conversational, natural language
✅ Give examples of good responses
✅ Iterate based on real conversations

### **DON'T:**
❌ Make the prompt too long (max 500 words)
❌ Ask too many questions at once
❌ Be too salesy or aggressive
❌ Forget to update frontend greeting
❌ Deploy without testing

---

## 🚀 Quick Changes You Can Make Right Now

### **Make it More Friendly:**
Change line 81 to:
```python
- Introduce yourself warmly: "Hey! I'm Alex 👋 I help finance teams transform their operations. Great to meet you!"
```

### **Add Urgency:**
Add to the rules:
```python
5. If discussing a problem:
   - Mention: "This is a common challenge we see, and it typically costs organizations $X in inefficiency."
   - Create gentle urgency without pressure
```

### **Capture More Info:**
```python
- Ask: "What's your name and company?"
- Ask: "What's your role in the organization?"
- Ask: "What's your timeline for solving this?"
```

---

## 🔄 Deployment Timeline

After you push changes:
- **0-1 min:** GitHub receives your commit
- **1-2 min:** Railway detects changes
- **2-3 min:** Railway builds and deploys
- **3-4 min:** New AI is live!

**Total: ~4 minutes from push to live** 🚀

---

## 💡 Pro Tips

1. **Version Your Prompts:** Keep old versions commented out so you can revert
2. **A/B Test:** Try different greetings and see what works
3. **Use Context:** The AI already has access to your 174 meetings - reference them!
4. **Stay On-Brand:** Make sure the AI sounds like YOU/your company
5. **Monitor Results:** Check what questions people actually ask

---

## 📝 Example Prompt Variations

Save these for quick testing:

### **Variation 1: Discovery-Focused**
```python
"Hi! I'm Alex from AxionX. Before we dive in, I'd love to understand:
1. What's your name?
2. What's your current role?
3. What's the #1 challenge you're facing right now?

This helps me give you the most relevant advice from our experience!"
```

### **Variation 2: Problem-Focused**
```python
"Hi! I'm Alex, specializing in fixing broken finance processes.

Quick question: What's the most frustrating part of your current close process?"
```

### **Variation 3: Value-Focused**
```python
"Hi! I'm Alex from AxionX. We've helped CFOs save 40-60% of their close time.

What's your name, and what would you do with an extra week every month?"
```

---

## 🎓 Learning Resources

Your AI learns from:
- ✅ The 174 meeting transcripts (already done)
- ✅ The prompt you write (you control this)
- ✅ The context it finds (automatic via vector search)

It does NOT learn from:
- ❌ Individual conversations (stateless)
- ❌ User feedback (unless you build that)
- ❌ Other websites or sources

**To add new knowledge:** Add more transcripts or meetings to `/meetings/` folder!

---

## 🆘 Need Help?

Check these files for reference:
- `api_public.py` - Main AI logic
- `ChatWidget.jsx` - Frontend greeting
- `upload_to_cloud.py` - How data gets to Qdrant
- `processed_meetings.json` - Your current knowledge base

**Current Stats:**
- 174 meetings
- 3.4 million words
- Ready to answer questions!

---

**Your AI is now more conversational and will gather lead information naturally!** 🎯

