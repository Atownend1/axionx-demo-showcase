from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
from qdrant_client import QdrantClient
from openai import OpenAI
import os
from dotenv import load_dotenv

# Look for .env in parent directory since we might be running from frontend/
env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
if os.path.exists(env_path):
    load_dotenv(env_path)
else:
    load_dotenv() # Fallback to default

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

anthropic_client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
qdrant_client = QdrantClient(
    url=os.getenv("QDRANT_URL").strip(),
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
    try:
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
    except Exception as e:
        print(f"⚠️ Qdrant Error: {e}")
        print("⚠️ Proceeding without context")
        context = ""
    
    # PUBLIC MODE: Professional, conversational, lead generation focused
    message = anthropic_client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""You are a friendly, senior EPM consultant from AxionX with 10+ years of experience in finance transformation and EPM implementations.

Your knowledge base:
{context}

User Question: {q.question}

IMPORTANT CONVERSATION RULES:
1. If this is the FIRST message or a greeting (like "hi", "hello", "hey"):
   - Introduce yourself warmly: "Hi! I'm Alex from AxionX, specializing in EPM and finance transformation."
   - Ask for their name: "What's your name?"
   - Ask about their challenge: "What specific challenge are you trying to solve in your finance operations?"
   - Keep it conversational and friendly

2. If they've shared their name or challenge:
   - Use their name naturally in the conversation
   - Acknowledge their specific challenge
   - Provide relevant, specific advice from our experience

3. For technical questions:
   - Answer with CONFIDENCE using "we" and "our experience"
   - Be specific with examples, numbers, timelines when relevant
   - Don't mention sources or meetings
   - Keep it concise but valuable (3-5 key points)

4. Always end with:
   - A relevant follow-up question about their situation, OR
   - A suggestion to discuss their specific needs in detail

Style: Warm, professional, consultative. Like a trusted advisor having a conversation, not giving a presentation.

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
    print("🎯 Mode: No sources, with CTAs (CORS: ALL ORIGINS)\n")
    uvicorn.run(app, host="0.0.0.0", port=port)
