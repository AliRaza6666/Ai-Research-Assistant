import os
from urllib.parse import urlparse, parse_qs

from dotenv import load_dotenv
from groq import Groq
from langdetect import detect
from youtube_transcript_api import YouTubeTranscriptApi
from langchain_core.documents import Document

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
    timeout=120
)


# ----------------------------------------
# Extract YouTube Video ID
# ----------------------------------------

def extract_video_id(url):

    parsed = urlparse(url)

    if "youtube.com" in parsed.netloc:
        return parse_qs(parsed.query)["v"][0]

    elif "youtu.be" in parsed.netloc:
        return parsed.path.lstrip("/")

    raise ValueError("Invalid YouTube URL")


# ----------------------------------------
# Get Any Available Transcript
# ----------------------------------------

def get_any_transcript(video_id):

    api = YouTubeTranscriptApi()

    transcript_list = api.list(video_id)

    available = list(transcript_list)

    if not available:
        raise Exception("No transcripts available")

    print("\nAvailable transcripts:")

    for t in available:
        print(f"- {t.language_code} ({t.language})")

    transcript = available[0]

    print(f"\nUsing transcript: {transcript.language}")

    data = transcript.fetch()

    text = " ".join(item.text for item in data)

    return text


# ----------------------------------------
# Translate to English
# ----------------------------------------

def translate_to_english(text):

    print("\nTranslating transcript...")

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": """
You are a professional translator.

Translate the following transcript into fluent English.

Rules:
- Preserve meaning.
- Do not summarize.
- Do not explain.
- Return only the English translation.
"""
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )

    return response.choices[0].message.content.strip()


# ----------------------------------------
# Loader used by RAG Pipeline
# ----------------------------------------

def load_youtube_content(url):

    video_id = extract_video_id(url)

    print(f"Video ID: {video_id}")

    transcript = get_any_transcript(video_id)

    print(f"Transcript length: {len(transcript)}")

    language = detect(transcript)

    print(f"Detected language: {language}")

    if language != "en":
        transcript = translate_to_english(transcript)

    return [
        Document(
            page_content=transcript,
            metadata={
                "source": url,
                "type": "youtube"
            }
        )
    ]