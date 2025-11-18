# AxionX AI - Meeting Intelligence System

An AI-powered system that indexes and analyzes meeting transcripts, providing intelligent Q&A capabilities through a FastAPI backend.

## 🚀 Features

- **Vector Search**: Uses OpenAI embeddings and Qdrant for semantic search across meetings
- **AI-Powered Answers**: Claude AI generates intelligent responses based on meeting context
- **Dual APIs**:
  - `api.py` - Internal version with source attribution
  - `api_public.py` - Public-facing lead magnet with consultant voice
- **Meeting Processing**: Automated pipeline to process and upload meeting transcripts

## 📋 Prerequisites

- Python 3.9+
- OpenAI API key
- Anthropic API key (Claude)
- Qdrant Cloud instance

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Atownend1/canvas-charm-hub-152d24ad.git
cd canvas-charm-hub-152d24ad
```

2. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install fastapi uvicorn anthropic qdrant-client openai python-dotenv
```

4. Create `.env` file with your API keys:
```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_key
```

## 📁 Project Structure

```
axionx-ai/
├── api.py                      # Internal API with sources
├── api_public.py               # Public API for lead generation
├── process_meetings.py         # Process meeting files
├── upload_to_cloud.py          # Upload to Qdrant
├── processed_meetings.json     # Processed meeting data
└── meetings/                   # Raw meeting files (not in git)
```

## 🚦 Usage

### Process Meetings

```bash
python process_meetings.py
```

### Upload to Qdrant

```bash
python upload_to_cloud.py
```

### Run Internal API

```bash
python api.py
```

### Run Public API (Lead Magnet)

```bash
python api_public.py
```

### Make Queries

```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the main topics discussed in meetings?"}'
```

## 🎯 API Endpoints

### POST /ask
Submit a question and get AI-generated answer based on meeting transcripts.

**Request:**
```json
{
  "question": "What are the top 3 mistakes in EPM implementations?"
}
```

**Response:**
```json
{
  "answer": "Based on our experience...",
  "sources": ["meeting-1", "meeting-2"],  // Internal API only
  "cta": {                                 // Public API only
    "text": "Book a Free Consultation",
    "url": "https://axionx.uk/book"
  }
}
```

### GET /
Health check endpoint.

## 🔒 Security Notes

- Never commit `.env` file
- Keep API keys secure
- Meeting data is excluded from git by default
- Use environment variables for all sensitive data

## 📝 License

Proprietary - AxionX

## 🤝 Contributing

This is a private project. Contact the team for contribution guidelines.

## 📧 Contact

For questions or support, visit [axionx.uk](https://axionx.uk)

