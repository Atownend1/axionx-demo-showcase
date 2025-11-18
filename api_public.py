from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
from qdrant_client import QdrantClient
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://axionx.uk",
        "https://www.axionx.uk",
        "https://*.lovable.app",
        "https://*.lovable.dev",
        "http://localhost:3000",
        "http://localhost:5173",
        "*"  # Remove this in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

anthropic_client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
qdrant_client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Question(BaseModel):
    question: str

@app.post("/ask")
async def ask(q: Question):
    print(f"❓ Question: {q.question}")
    
    # Convert question to vector
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=q.question
    )
    vector = response.data[0].embedding
    
    # Find relevant meetings
    results = qdrant_client.query_points(
        collection_name="axionx_meetings",
        query=vector,
        limit=5
    ).points
    
    print(f"📚 Found {len(results)} relevant meetings")
    
    # Build context
    context = "\n\n---\n\n".join([
        f"{r.payload['content']}"
        for r in results
    ])
    
    # PUBLIC MODE: Professional, no sources, with CTA
    message = anthropic_client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""You are a senior EPM consultant with 10+ years of experience in finance transformation and EPM implementations.

Your knowledge base:
{context}

User Question: {q.question}

Instructions:
- Answer with CONFIDENCE and authority using "we" and "our experience"
- Do NOT mention sources, meetings, or cite references
- Do NOT say "based on meetings" or similar phrases
- Sound like you're speaking from direct experience
- Be specific with examples, numbers, timelines when relevant
- Keep it concise but valuable (3-5 key points)
- End with a subtle call-to-action about discussing their specific needs

Style: Professional, authoritative, consultant voice. Like you're advising a CFO.

Answer:"""
        }]
    )
    
    answer = message.content[0].text
    
    # Add CTA if not already in answer
    if "discuss" not in answer.lower() and "talk" not in answer.lower():
        answer += "\n\n💡 Want to discuss how this applies to your specific situation? Let's talk."
    
    print(f"✅ Generated answer\n")
    
    return {
        "answer": answer,
        "cta": {
            "text": "Book a Free 15-Minute Consultation",
            "url": "https://axionx.uk/book"
        }
    }

@app.get("/")
async def root():
    return {"status": "AxionX Public API 🚀", "version": "1.0"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print("\n🚀 Starting AxionX PUBLIC API (Lead Magnet)...")
    print(f"📍 API at: http://0.0.0.0:{port}")
    print("🎯 Mode: No sources, with CTAs\n")
    uvicorn.run(app, host="0.0.0.0", port=port)
