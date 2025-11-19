#!/usr/bin/env python3
"""
Simple tool to view and search your meeting transcripts
"""
import json
import os
from pathlib import Path
from datetime import datetime

def list_meetings():
    """List all available meetings"""
    meetings_dir = Path("meetings")
    folders = sorted([f.name for f in meetings_dir.iterdir() if f.is_dir()])
    
    print(f"\n📁 Found {len(folders)} meetings:\n")
    for i, folder in enumerate(folders[:20], 1):
        # Clean up folder name for display
        display_name = folder.replace('-', ' ').title()
        print(f"{i}. {display_name}")
    
    if len(folders) > 20:
        print(f"\n... and {len(folders) - 20} more meetings")
    
    return folders

def view_meeting_summary(meeting_folder):
    """View a specific meeting summary"""
    meeting_path = Path("meetings") / meeting_folder
    
    # Find summary file
    summary_files = list(meeting_path.glob("meeting-summary-*.txt"))
    
    if not summary_files:
        print("❌ No summary found for this meeting")
        return
    
    with open(summary_files[0], 'r') as f:
        content = f.read()
    
    print(f"\n{'='*80}")
    print(f"MEETING: {meeting_folder}")
    print(f"{'='*80}\n")
    print(content[:2000])  # First 2000 chars
    
    if len(content) > 2000:
        print(f"\n... (showing first 2000 of {len(content)} characters)")

def view_transcript(meeting_folder):
    """View raw transcript"""
    meeting_path = Path("meetings") / meeting_folder
    
    # Find transcript JSON
    transcript_file = meeting_path / "transcript.json"
    
    if not transcript_file.exists():
        print("❌ No transcript found")
        return
    
    with open(transcript_file, 'r') as f:
        data = json.load(f)
    
    print(f"\n{'='*80}")
    print(f"TRANSCRIPT: {meeting_folder}")
    print(f"{'='*80}\n")
    
    # Show first 20 entries
    for i, entry in enumerate(data[:20]):
        speaker = entry.get('speaker_id', 'Unknown')
        text = entry.get('sentence', '')
        time = entry.get('time', 0)
        mins = int(time // 60)
        secs = int(time % 60)
        
        print(f"[{mins:02d}:{secs:02d}] Speaker {speaker}: {text}")
    
    if len(data) > 20:
        print(f"\n... ({len(data) - 20} more entries)")

def search_transcripts(query):
    """Search all transcripts for a keyword"""
    print(f"\n🔍 Searching for: '{query}'\n")
    
    with open('processed_meetings.json', 'r') as f:
        meetings = json.load(f)
    
    results = []
    for meeting in meetings:
        if query.lower() in meeting['transcript'].lower():
            results.append(meeting)
    
    print(f"Found {len(results)} meetings mentioning '{query}':\n")
    
    for i, meeting in enumerate(results[:10], 1):
        meeting_id = meeting['id']
        # Find snippet with query
        transcript = meeting['transcript']
        idx = transcript.lower().find(query.lower())
        if idx != -1:
            start = max(0, idx - 100)
            end = min(len(transcript), idx + 100)
            snippet = transcript[start:end]
            print(f"{i}. {meeting_id}")
            print(f"   ...{snippet}...")
            print()
    
    if len(results) > 10:
        print(f"... and {len(results) - 10} more results")

def main():
    print("🎙️  AxionX Meeting Transcript Viewer")
    print("=" * 80)
    
    while True:
        print("\nWhat would you like to do?")
        print("1. List all meetings")
        print("2. View meeting summary (by name)")
        print("3. View transcript (by name)")
        print("4. Search all transcripts")
        print("5. Exit")
        
        choice = input("\nEnter choice (1-5): ").strip()
        
        if choice == "1":
            list_meetings()
        
        elif choice == "2":
            meeting_name = input("Enter meeting folder name: ").strip()
            view_meeting_summary(meeting_name)
        
        elif choice == "3":
            meeting_name = input("Enter meeting folder name: ").strip()
            view_transcript(meeting_name)
        
        elif choice == "4":
            query = input("Enter search query: ").strip()
            search_transcripts(query)
        
        elif choice == "5":
            print("\n👋 Goodbye!")
            break
        
        else:
            print("❌ Invalid choice")

if __name__ == "__main__":
    main()

