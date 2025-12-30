# 🎨 AI Customization Guide

This guide will help you customize your AxionX AI to match your specific business needs, voice, and expertise.

## ✅ Prerequisites

Before you begin, ensure you have the following installed:
*   **Python 3.8+** (for the backend API)
*   **Node.js 14+** (for the frontend)
*   **Git** (for version control)
*   **VS Code** (or your preferred code editor)

## 🧠 What You Can Customize

1.  **Personality & Tone**: Make it professional, friendly, or technical.
2.  **Greeting**: The first message users see.
3.  **Knowledge Base**: Add your own PDFs, meeting transcripts, and docs.
4.  **Questions & Rules**: Control how it qualifies leads.

## 📝 Step-by-Step Customization

### **Step 1: Edit the Prompt**

Open `api_public.py` in your code editor:

```bash
# Navigate to the project directory
cd axionx-ai 
# Open the file
code api_public.py
```

### **Step 2: Find the Prompt Section**

Search for the variable or section defining the system prompt, often starting with: `You are a friendly, senior EPM consultant` or similar.

### **Step 3: Make Your Changes**

**Example - Make it Technical:**

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
"""
```

### **Step 4: Update Frontend Greeting**

Open `frontend/src/components/ChatWidget.jsx`:

```javascript
// Locate the initial state for messages
const [messages, setMessages] = useState([
  {
    role: 'assistant',
    content: "YOUR NEW GREETING HERE"
  }
])
```

**Example Greetings:**

*   **Professional:** "Hello! I'm here to help with your EPM and finance transformation needs. How can I assist you today?"
*   **Casual:** "Hey there! 👋 I'm your EPM expert. What's on your mind?"
*   **Lead-focused:** "Hi! I'm Alex from AxionX. Before we dive in, may I ask - what's your name and what challenge brought you here today?"

### **Step 5: Test Locally (Optional)**

Run the backend:
```bash
# Terminal 1: Start API
python api_public.py
```

Test with curl:
```bash
# Terminal 2: Test request
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Hi"}'
```

### **Step 6: Deploy**

Push your changes to Git to trigger a deployment (e.g., on Railway):

```bash
git add api_public.py frontend/src/components/ChatWidget.jsx
git commit -m "Update AI personality and greeting"
git push origin main
```

## 🎓 Advanced: Train on New Data

### **Option 1: Add More Meeting Transcripts**

1.  Add new meeting files (txt/md) to the `/meetings/` folder.
2.  Run the processor:
    ```bash
    python process_meetings.py
    ```
3.  Upload to your vector database (e.g., Qdrant):
    ```bash
    python upload_to_cloud.py
    ```

### **Option 2: Add Custom Knowledge**

Create a new script to upload specific facts:

```python
# add_custom_knowledge.py
from qdrant_client import QdrantClient
# ... imports ...

custom_knowledge = """
AxionX Specific Information:
- We specialize in OneStream implementations
- Average project timeline: 12-16 weeks
"""
# ... vector embedding and upload logic ...
```

### **Option 3: Fine-tune Response Style**

Add specific few-shot examples in the prompt to guide the style:

```python
Example interactions:
User: "What's your pricing?"
You: "Our implementations typically range from $150K-$500K depending on complexity. What's your organization's size and current setup?"
```

## 🧪 Testing Different Personalities

*   **Sales-Focused AI**: Ask qualifying questions, emphasize ROI.
*   **Technical Expert AI**: Ask about tech stack, provide architectural solutions.
*   **Advisory AI**: Listen first, acknowledge pain points, guide gently.

## 📊 Track What Questions People Ask

To improve your AI, monitor common questions:
1.  Check application logs (e.g., Railway logs).
2.  Add FAQs to your prompt based on real user queries.

## 🎯 Best Practices

*   **DO**: Test changes locally first.
*   **DO**: Keep the prompt focused and clear (avoid contradictory instructions).
*   **DO**: Update the frontend greeting to match the AI's persona.
*   **DON'T**: Make the prompt too long (context window limits).
*   **DON'T**: Auto-run untested code in production.
