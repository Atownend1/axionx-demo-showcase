import os
import json
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from openai import OpenAI
import hashlib
import time

load_dotenv()

print("☁️  Uploading meetings to cloud...\n")

# Connect to services
print("1️⃣ Connecting to Qdrant...")
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)
print("   ✅ Connected\n")

print("2️⃣ Connecting to OpenAI...")
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
print("   ✅ Connected\n")

# Load meetings
print("3️⃣ Loading processed meetings...")
with open("processed_meetings.json") as f:
    meetings = json.load(f)
print(f"   ✅ Loaded {len(meetings)} meetings\n")

# Create collection
collection_name = "axionx_meetings"

print(f"4️⃣ Creating collection: {collection_name}")
try:
    qdrant.delete_collection(collection_name)
    print("   🗑️  Deleted old collection")
except:
    pass

qdrant.create_collection(
    collection_name=collection_name,
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
)
print("   ✅ Collection created\n")

# Upload meetings
print("5️⃣ Uploading meetings to cloud...")
print("   ⏱️  Going slower to avoid rate limits...")
print("   (This will take 15-20 minutes)\n")

points = []
uploaded_count = 0

for i, meeting in enumerate(meetings, 1):
    meeting_id = meeting["id"][:50]
    print(f"   [{i}/{len(meetings)}] {meeting_id}")
    
    # Get text
    text = meeting["transcript"][:8000]
    
    if not text.strip():
        print(f"      ⚠️  Skipping - empty transcript")
        continue
    
    try:
        # Convert to vector
        response = openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        vector = response.data[0].embedding
        
        # Create point
        point = PointStruct(
            id=hashlib.md5(meeting["id"].encode()).hexdigest(),
            vector=vector,
            payload={
                "content": text,
                "meeting_id": meeting["id"],
                "metadata": meeting.get("metadata", {})
            }
        )
        
        points.append(point)
        
        # Upload in batches of 5 (smaller batches)
        if len(points) >= 5:
            qdrant.upsert(collection_name=collection_name, points=points)
            uploaded_count += len(points)
            print(f"      ✅ Uploaded batch ({uploaded_count} total)")
            points = []
            
            # Wait 3 seconds to avoid rate limit
            time.sleep(3)
            
    except Exception as e:
        if "rate_limit" in str(e).lower():
            print(f"      ⏸️  Rate limit hit - waiting 10 seconds...")
            time.sleep(10)
            # Retry this meeting
            try:
                response = openai_client.embeddings.create(
                    model="text-embedding-3-small",
                    input=text
                )
                vector = response.data[0].embedding
                point = PointStruct(
                    id=hashlib.md5(meeting["id"].encode()).hexdigest(),
                    vector=vector,
                    payload={
                        "content": text,
                        "meeting_id": meeting["id"],
                        "metadata": meeting.get("metadata", {})
                    }
                )
                points.append(point)
            except Exception as retry_error:
                print(f"      ❌ Failed after retry: {retry_error}")
                continue
        else:
            print(f"      ❌ Error: {e}")
            continue

# Upload remaining
if points:
    qdrant.upsert(collection_name=collection_name, points=points)
    uploaded_count += len(points)
    print(f"      ✅ Uploaded final batch ({uploaded_count} total)")

print(f"\n🎉 Successfully uploaded {uploaded_count} meetings!")

# Verify
info = qdrant.get_collection(collection_name)
print(f"\n📊 Database stats:")
print(f"   Total documents: {info.points_count}")

print("\n✅ Your AI is ready to answer questions!")
