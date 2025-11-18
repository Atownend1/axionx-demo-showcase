import os
import json
from pathlib import Path

print("🚀 Processing meetings...\n")

meetings_folder = Path("meetings")

if not meetings_folder.exists():
    print("❌ ERROR: 'meetings' folder not found!")
    print("   Please make sure your meeting data folder is named 'meetings'")
    exit(1)

all_meetings = []

folders = [f for f in meetings_folder.iterdir() if f.is_dir()]
print(f"📁 Found {len(folders)} meeting folders\n")

for i, folder in enumerate(folders, 1):
    print(f"[{i}/{len(folders)}] {folder.name}")
    
    meeting = {"id": folder.name, "transcript": "", "metadata": {}}
    
    # Get transcript
    transcript_files = list(folder.glob("transcript*.json"))
    if transcript_files:
        try:
            with open(transcript_files[0]) as f:
                data = json.load(f)
                if isinstance(data, list):
                    lines = [f"{item.get('speaker', 'Unknown')}: {item.get('text', '')}" 
                            for item in data if item.get('text')]
                    meeting["transcript"] = "\n\n".join(lines)
                else:
                    meeting["transcript"] = str(data)
        except Exception as e:
            print(f"   ⚠️  Could not read transcript: {e}")
    
    # Get summary
    summary_files = list(folder.glob("meeting-summary*.txt"))
    if summary_files:
        try:
            with open(summary_files[0]) as f:
                meeting["metadata"]["summary"] = f.read()
        except:
            pass
    
    # Get metadata
    metadata_files = list(folder.glob("meeting-metadata*.json"))
    if metadata_files:
        try:
            with open(metadata_files[0]) as f:
                meeting["metadata"].update(json.load(f))
        except:
            pass
    
    if meeting["transcript"]:
        all_meetings.append(meeting)
        print(f"   ✅ {len(meeting['transcript'].split())} words")
    else:
        print(f"   ⚠️  Skipped - no transcript")

# Save
with open("processed_meetings.json", 'w') as f:
    json.dump(all_meetings, f, indent=2)

print(f"\n✅ Processed {len(all_meetings)} meetings")
print(f"�� Saved to processed_meetings.json")

# Stats
total_words = sum(len(m["transcript"].split()) for m in all_meetings)
print(f"📝 Total words: {total_words:,}")
