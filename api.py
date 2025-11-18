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

# Allow your website to access this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to services
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
    try:
        print(f"❓ Question: {q.question}")
        
        # 1. Convert question to vector
        response = openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=q.question
        )
        vector = response.data[0].embedding
        
        # 2. Find relevant meetings
        results = qdrant_client.query_points(
            collection_name="axionx_meetings",
            query=vector,
            limit=3
        ).points
        
        print(f"📚 Found {len(results)} relevant meetings")
        
        # 3. Build context from meetings
        context = "\n\n---\n\n".join([
            f"Meeting: {r.payload['meeting_id']}\n{r.payload['content']}"
            for r in results
        ])
        
        # 4. Ask Claude AI
        message = anthropic_client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": f"""You are an AI assistant for AxionX with access to meeting transcripts.

Meeting Transcripts:
{context}

User Question: {q.question}

Instructions:
- Answer based ONLY on the transcripts above
- Be specific and mention which meeting you're referencing
- If the answer isn't in the transcripts, say so
- Be helpful and concise

Answer:"""
            }]
        )
        
        answer = message.content[0].text
        print(f"✅ Generated answer\n")
        
        return {
            "answer": answer,
            "sources": [r.payload["meeting_id"] for r in results]
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        raise

@app.get("/")
async def root():
    return {"status": "AxionX AI is running! 🚀", "version": "1.0"}

if __name__ == "__main__":
    import uvicorn
    print("\n🚀 Starting AxionX AI...")
    print("📍 API running at: http://localhost:8000")
    print("📖 Docs at: http://localhost:8000/docs\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)
    