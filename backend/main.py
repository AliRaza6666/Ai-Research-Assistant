from fastapi import FastAPI
from pydantic import BaseModel

from fastapi import UploadFile, File, Form


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chain_store={}

class SourceRequest(BaseModel):
    userid:str
    source: str
    source_type: str

from typing import List

class ChatMessage(BaseModel):
    role: str
    content: str

class QuestionRequest(BaseModel):
    question: str
    userid:str
    history:List[ChatMessage]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/process-pdf")
def process_pdf(
    userid: str = Form(...),
    file: UploadFile = File(...)
):
    from rag_pipeline import process_source

    chain = process_source(
        file,
        "pdf"
    )

    chain_store[userid] = chain

    return {
        "message": "PDF processed successfully"
    }



@app.post("/process")
def process(request: SourceRequest):
    print("1")
    from rag_pipeline import process_source
    chain = process_source(
        request.source,
        request.source_type
    )

    print("2")

    return {"message": "OK"}

@app.post("/ask")
def ask(request: QuestionRequest):
    from rag_pipeline import ask_question
    chain = chain_store.get(request.userid)


    if chain is None:
        return {
            "error":"No source processed"
        }


    answer = ask_question(
        chain,
        request.question,
        request.history
    )
   
    chain = chain_store.get(request.userid)

    print("CHAIN:", chain)

    return {
        "answer":answer
    }