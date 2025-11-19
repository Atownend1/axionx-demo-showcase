# 🎙️ AxionX Transcript Data - Complete Guide

## 📍 Where Your Data Lives

### 1. **Raw Meeting Files** (`/meetings/` folder)
**You have ~170+ meeting recordings!**

Each meeting folder contains:
```
meetings/barloworld-october-1-2025-at-229-pm-utc/
├── transcript.json          # Full transcript with timestamps
├── meeting-summary-*.txt    # AI summary with action items
├── meeting-metadata-*.txt   # Meeting details
├── audio.mp3               # Original recording
└── speaker-meta.json       # Speaker identification
```

### 2. **Processed Database** (`processed_meetings.json`)
- **8.5 million tokens** of consolidated data
- All transcripts in queryable format
- Used by your AI search system

### 3. **Vector Database** (Qdrant Cloud)
- AI-searchable embeddings of your transcripts
- Collection: `axionx_meetings`
- Powers your `/ask` API endpoint

---

## 💡 How to VIEW Your Transcripts

### **Method 1: Interactive Viewer (Easiest)**

Run the built-in viewer tool:
```bash
python view_transcripts.py
```

Features:
- ✅ List all meetings
- ✅ View meeting summaries
- ✅ Read full transcripts
- ✅ Search across all meetings

### **Method 2: Command Line**

**List all meetings:**
```bash
ls meetings/
```

**View a meeting summary:**
```bash
cat "meetings/barloworld-october-1-2025-at-229-pm-utc/meeting-summary-"*.txt
```

**Search for a keyword:**
```bash
grep -r "OneStream" meetings/ --include="*.txt"
```

### **Method 3: Through Your API**

Your AI is already using the transcripts! Test it:

```bash
curl -X POST https://kaitlyn-uncommendatory-valene.ngrok-free.dev/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What deals are we working on with Barloworld?"}'
```

Or use your frontend at your website.

### **Method 4: Python Script**

```python
import json

# Load all meetings
with open('processed_meetings.json', 'r') as f:
    meetings = json.load(f)

# Search for specific meeting
for meeting in meetings:
    if 'barloworld' in meeting['id'].lower():
        print(meeting['metadata']['summary'])
```

---

## 🔍 What's IN Your Transcripts

Each meeting summary includes:

### **1. AI Meeting Summary**
- Key discussion points
- Deal status updates
- Financial numbers mentioned
- Strategic decisions

### **2. Meeting Notes with Timestamps**
```
📈 Sales Targets and Performance (00:03 - 01:49)
Speaker set personal target of $10 million...
```

### **3. Action Items**
Assigned tasks with owners:
```
**Josh Cleary**
- Contact Robin tonight regarding MSA draft (14:04)
- Schedule reference call by end of week (16:05)
```

### **4. Sentiment Analysis**
Participant sentiment scores (1-5):
```
Alex (Black Diamond): 4 (Positive)
Client Representative: 3 (Neutral)
```

### **5. Follow-up Email Drafts**
Pre-written emails based on the conversation

### **6. Keywords & Topics**
```
Keywords: Sales pipeline, MSA negotiation, 
revenue projection, OneStream implementation
```

---

## 🚀 How to USE Your Transcript Data

### **1. Sales Intelligence**
```bash
# Find all mentions of a client
python view_transcripts.py
# Then choose "Search" and enter: "Barloworld"
```

### **2. Deal Pipeline Review**
Search for:
- Deal names
- Client names
- Revenue numbers
- Closing dates

### **3. Knowledge Base (Current)**
Your API already uses this data:
- Visit your website
- Ask: "What's the status of the Weir Group deal?"
- AI searches transcripts and responds with context

### **4. Export Specific Data**

**Export all action items:**
```bash
grep -r "Action items:" meetings/ --include="*.txt" -A 10
```

**Find all financial mentions:**
```bash
grep -r "\$[0-9]" meetings/ --include="*.txt"
```

### **5. Custom Analysis**

Create custom queries in Python:
```python
import json

with open('processed_meetings.json', 'r') as f:
    meetings = json.load(f)

# Find all Q4 deals
q4_deals = [m for m in meetings if 'Q4' in m['transcript']]
print(f"Found {len(q4_deals)} Q4 deal discussions")

# Find all meetings mentioning specific person
person_meetings = [m for m in meetings 
                   if 'Jeremy' in m['transcript']]
```

---

## 📊 Your Data Statistics

```
Total Meetings: ~170+
Total Data Size: 8.5 million tokens
Date Range: September 2025 - November 2025
Meeting Types:
  - Client calls (External)
  - Internal strategy meetings
  - Sales pipeline reviews
  - Coaching sessions
```

---

## 🔧 Advanced Usage

### **Re-process Meetings**
If you add new meetings to `/meetings/`:
```bash
python process_meetings.py
```

### **Upload to Vector Database**
To update your AI search with new data:
```bash
python upload_to_cloud.py
```

### **Query the Database Directly**
```python
from qdrant_client import QdrantClient
import os

client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

# Get collection info
info = client.get_collection("axionx_meetings")
print(f"Total points: {info.points_count}")
```

---

## 💼 Business Use Cases

### **1. Client Preparation**
Before a meeting, search for all previous conversations with that client:
```bash
python view_transcripts.py
# Search: "client-name"
```

### **2. Deal Status Review**
Find latest status of any deal:
```bash
# Ask your AI via ngrok URL:
curl -X POST https://kaitlyn-uncommendatory-valene.ngrok-free.dev/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the current status of all active deals?"}'
```

### **3. Extract Action Items**
Get all your pending tasks:
```bash
grep -r "**Unassigned**" meetings/ --include="*.txt" -A 5
```

### **4. Performance Review**
Track your sales conversations over time:
```bash
ls meetings/ | grep "nov-" | wc -l  # Count November meetings
```

### **5. Training Material**
Review successful sales calls:
```bash
# Find calls with positive sentiment
grep -r "Sentiment Score: [45]" meetings/ --include="*.txt"
```

---

## 🌐 Access Your Data Anywhere

### **Your Public API**
```
https://kaitlyn-uncommendatory-valene.ngrok-free.dev
```

### **Test It:**
```bash
# Health check
curl https://kaitlyn-uncommendatory-valene.ngrok-free.dev/

# Ask a question
curl -X POST https://kaitlyn-uncommendatory-valene.ngrok-free.dev/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What deals closed in October?"}'
```

### **Via Your Frontend**
- Your website's chat widget connects to this API
- Users ask questions
- AI searches your 170+ meetings
- Returns intelligent answers

---

## 📝 Quick Reference

| Task | Command |
|------|---------|
| Interactive viewer | `python view_transcripts.py` |
| List meetings | `ls meetings/` |
| Search keyword | `grep -r "keyword" meetings/` |
| View summary | `cat meetings/FOLDER/meeting-summary*.txt` |
| Ask AI | `curl -X POST YOUR_URL/ask -d '{"question":"..."}' -H "Content-Type: application/json"` |
| Re-process data | `python process_meetings.py` |
| Update AI search | `python upload_to_cloud.py` |

---

## 🎯 Next Steps

1. **Try the viewer:**
   ```bash
   python view_transcripts.py
   ```

2. **Test your API:**
   ```bash
   curl -X POST https://kaitlyn-uncommendatory-valene.ngrok-free.dev/ask \
     -H "Content-Type: application/json" \
     -d '{"question": "What are my Q4 deals?"}'
   ```

3. **Integrate with your website:**
   - Your ChatWidget.jsx already connects
   - Update API URL if needed

4. **Customize searches:**
   - Edit `view_transcripts.py` for custom queries
   - Add new analysis features

---

## 🆘 Troubleshooting

**"Can't find processed_meetings.json"**
```bash
python process_meetings.py
```

**"API not responding"**
```bash
# Check if API is running
curl https://kaitlyn-uncommendatory-valene.ngrok-free.dev/

# Restart API if needed
python api_public.py
```

**"Want to add new meetings"**
1. Add new folders to `/meetings/`
2. Run `python process_meetings.py`
3. Run `python upload_to_cloud.py`

---

## 📧 Support

Your transcript system is fully operational! You have:
- ✅ 170+ meeting transcripts
- ✅ AI-powered search
- ✅ Public API endpoint
- ✅ Interactive viewer
- ✅ 8.5 million tokens of business intelligence

**Everything is ready to use!** 🚀

