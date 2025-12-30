from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os
import sys

# Load env from parent
env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(env_path)

url = os.getenv("QDRANT_URL").strip()
api_key = os.getenv("QDRANT_API_KEY")

print(f"Testing Qdrant URL: '{url}'")
print(f"API Key present: {bool(api_key)}")

try:
    client = QdrantClient(url=url, api_key=api_key)
    collections = client.get_collections()
    print("✅ Connection successful!")
    print(f"Collections: {collections}")
except Exception as e:
    print(f"❌ Connection failed: {e}")
    # Try adding port 6333
    if "404" in str(e):
        print("\nRetrying with port 6333...")
        try:
            url_port = url.rstrip('/') + ":6333"
            client = QdrantClient(url=url_port, api_key=api_key)
            collections = client.get_collections()
            print(f"✅ Connection successful on port 6333! URL should be: {url_port}")
            print(f"Collections: {collections}")
        except Exception as e2:
            print(f"❌ Connection failed on port 6333: {e2}")
