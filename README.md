<div align="center">

# 🧠 Research Assistant (RAG)

### Multi-Source AI Research Assistant built with FastAPI, Next.js, LangChain & ChromaDB

Query **PDFs**, **Websites**, and **YouTube videos** using Retrieval-Augmented Generation (RAG) powered by **Llama 3.1**.

---

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?logo=next.js)
![LangChain](https://img.shields.io/badge/LangChain-RAG-blue)
![ChromaDB](https://img.shields.io/badge/ChromaDB-VectorDB-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38B2AC?logo=tailwind-css)

</div>

---

# 🚀 Overview

Research Assistant is a Retrieval-Augmented Generation (RAG) application that enables users to chat with information extracted from multiple knowledge sources.

Instead of relying solely on a Large Language Model, the system retrieves the most relevant information from uploaded content before generating a response.

Supported sources include:

- 📄 PDF Documents
- 🌐 Websites
- ▶️ YouTube Videos (with transcripts)

The project focuses on building a practical AI system while exploring modern RAG architecture, semantic search, vector databases, and conversational AI.

---

# ✨ Features

- 📄 Chat with PDF documents
- 🌐 Chat with websites
- ▶️ Chat with YouTube videos
- 🧠 Conversational memory
- 🔍 Semantic search using embeddings
- 📚 Retrieval-Augmented Generation (RAG)
- ⚡ FastAPI backend
- 🎨 Modern Next.js interface
- 📱 Responsive design
- 🔄 Automatic source replacement
- 💬 ChatGPT-style messaging interface

---

# 🏗 System Architecture

```text
                User
                  │
                  ▼
          Next.js Frontend
                  │
          REST API Requests
                  │
                  ▼
           FastAPI Backend
                  │
      ┌───────────┼───────────┐
      │           │           │
      ▼           ▼           ▼
    PDF       Website     YouTube
 Loader        Loader      Loader
      │           │           │
      └───────────┼───────────┘
                  │
                  ▼
        Document Chunking
                  │
                  ▼
      HuggingFace Embeddings
                  │
                  ▼
         Chroma Vector Store
                  │
                  ▼
            Similarity Search
                  │
                  ▼
      Prompt + Conversation History
                  │
                  ▼
        Llama 3.1 Instruct
                  │
                  ▼
             Final Response
```

---

# 🛠 Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- Lucide Icons

### Backend

- FastAPI
- LangChain
- ChromaDB
- HuggingFace Embeddings
- HuggingFace Inference API
- Llama 3.1 Instruct

### Document Processing

- PyPDFLoader
- Playwright
- BeautifulSoup
- YouTube Transcript Loader

---

# 📚 Supported Sources

## 📄 PDF

Upload research papers, resumes, books, or documentation and ask natural language questions.

---

## 🌐 Website

Extracts readable content from websites before generating embeddings.

Supports approximately **80% of public websites**.

---

## ▶️ YouTube

Processes video transcripts and allows users to query video content.

Only videos with available transcripts are currently supported.

---

# 🧠 How It Works

1. User uploads a source.
2. Source is loaded using the appropriate loader.
3. Content is cleaned and split into chunks.
4. Embeddings are generated.
5. Chunks are stored inside ChromaDB.
6. User asks a question.
7. Retriever finds the most relevant chunks.
8. Retrieved context is combined with conversation history.
9. Llama 3.1 generates a grounded response.

---

# 💬 Conversation Memory

Instead of using LangChain memory objects, the application maintains lightweight conversation history.

- Last few conversation turns are sent with every request.
- Improves follow-up questions.
- Reduces token usage.
- Keeps implementation simple and transparent.

Whenever a **new source is uploaded**, both:

- Previous vector database
- Previous conversation memory

are reset automatically.

---

# ⚠ Current Limitations

This project intentionally uses free services.

- Uses the free Hugging Face Inference API.
- Response speed depends on API availability.
- Only YouTube videos with transcripts are supported.
- Approximately 80% website compatibility.
- Some websites block scraping.
- OCR for scanned PDFs is not implemented.
- Only one active knowledge source per user session.

---

# 🚧 Challenges & Solutions

## 🌐 Website Extraction

### Challenge

Many modern websites rendered incomplete or empty HTML because their content was generated dynamically using JavaScript.

### Solution

Integrated **Playwright** to render pages before parsing them with BeautifulSoup.

---

## 📑 Website Formatting

### Challenge

Raw HTML contained navigation menus, scripts, advertisements, and unnecessary content that reduced retrieval quality.

### Solution

Implemented custom preprocessing and document cleaning before chunking.

---

## ▶️ YouTube Processing

### Challenge

Many YouTube videos do not expose transcripts.

### Solution

Added transcript availability checks and graceful error handling.

---

## 🗂 Context Leakage

### Challenge

Previously uploaded documents were leaking into newly uploaded documents.

### Solution

Created a fresh Chroma collection and retrieval chain whenever a new source is uploaded.

---

## 💬 Conversation Context

### Challenge

Follow-up questions lacked context.

### Solution

Implemented lightweight conversation memory by sending the latest conversation history to the prompt.

---

# 🎯 Key Learnings

Building this project independently taught me that building AI applications involves much more than simply calling an LLM API.

Some key lessons include:

- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Databases
- Prompt Engineering
- Document Chunking
- Conversation Management
- Backend API Design
- Frontend–Backend Integration
- System Architecture

The biggest takeaway was:

> **Building reliable AI systems depends far more on good system design than simply choosing a powerful language model.**

---

# 🔮 Future Improvements

- Authentication
- Multi-document collections
- Persistent vector database
- OCR support for scanned PDFs
- Source citations
- Streaming responses
- Hybrid Search (Keyword + Semantic)
- DOCX support
- PowerPoint support
- Chat export



# ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/yourusername/ResearchAssistant.git

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

---

# 👨‍💻 Author

**Ali Raza**

Full Stack Developer | MERN | Next.js | AI Applications

GitHub: https://github.com/AliRaza6666

LinkedIn: https://linkedin.com/in/ali-raza-784b10362

---

<div align="center">

⭐ If you found this project useful, consider giving it a star.

</div>