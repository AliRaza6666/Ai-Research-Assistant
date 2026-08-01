import html
import os
import token
from dotenv import load_dotenv
from operator import itemgetter
os.makedirs("uploads", exist_ok=True)


from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.document_loaders import YoutubeLoader
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
import requests

from langchain_core.documents import Document
from chromadb import EphemeralClient

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.runnables import RunnableLambda

from youtubeContent import load_youtube_content
load_dotenv()
import uuid
token = os.getenv("huggingface_api")



# using beautifulsoup to scrape the content of the web page and return it as a document(using 
# it so we can store information of tables aslo in webpage)

def extract_structured_text(html):

    soup = BeautifulSoup(html, "html.parser")

    # Remove unwanted elements
    for tag in soup([
        "script",
        "style",
        "noscript",
        "svg",
        "iframe",
        "footer",
        "nav",
        "form",
        "button",
        "input",
        "aside"
    ]):
        tag.decompose()

    output = []

    # Traverse important elements in document order
    for element in soup.find_all([
        "h1", "h2", "h3", "h4", "h5", "h6",
        "p",
        "ul", "ol",
        "table",
        "pre",
        "code"
    ]):

        # ---------------- Headings ----------------
        if element.name.startswith("h"):

            level = int(element.name[1])
            heading = element.get_text(" ", strip=True)

            if heading:
                output.append(f"\n{'#'*level} {heading}\n")

        # ---------------- Paragraph ----------------
        elif element.name == "p":

            text = element.get_text(" ", strip=True)

            if text:
                output.append(text)

        # ---------------- Lists ----------------
        elif element.name in ["ul", "ol"]:

            for li in element.find_all("li", recursive=False):

                text = li.get_text(" ", strip=True)

                if text:
                    output.append(f"• {text}")

        # ---------------- Tables ----------------
            
        elif element.name == "table":

            table_output = []

            rows = element.find_all("tr")

            if not rows:
                continue

            headers = []

            # Case 1: Proper <th> headers exist
            first_row = rows[0]
            ths = first_row.find_all("th")

            if ths:
                headers = [
                    th.get_text(" ", strip=True)
                    for th in ths
                ]
                data_rows = rows[1:]

            # Case 2: No <th>, assume first row contains headers
            else:
                first_cols = [
                    td.get_text(" ", strip=True)
                    for td in first_row.find_all(["td", "th"])
                ]

                headers = first_cols
                data_rows = rows[1:]

            # Process each row
            for tr in data_rows:

                cols = [
                    cell.get_text(" ", strip=True)
                    for cell in tr.find_all(["td", "th"])
                ]

                if not cols:
                    continue

                # Header count matches column count
                if headers and len(headers) == len(cols):

                    row = []

                    for h, c in zip(headers, cols):
                        row.append(f"{h}: {c}")

                    table_output.append("\n".join(row))
                    table_output.append("-" * 40)

                # Fallback if headers don't match
                else:

                    table_output.append(" | ".join(cols))
                    table_output.append("-" * 40)

            if table_output:
                output.append("\n".join(table_output))

        # ---------------- Code Blocks ----------------
        elif element.name == "pre":

            code = element.get_text("\n", strip=True)

            if code:
                output.append("Code Example:")
                output.append(code)

        elif element.name == "code":

            if element.parent.name != "pre":

                code = element.get_text(strip=True)

                if code:
                    output.append(f"`{code}`")

    return "\n\n".join(output)


def load_web_content(url):

    with sync_playwright() as p:

        browser = p.chromium.launch(headless=True)

        page = browser.new_page()

        page.goto(url, wait_until="domcontentloaded")

        page.wait_for_timeout(5000)

        html = page.content()
        

        with open("page.html", "w", encoding="utf-8") as f:
          f.write(html)

        browser.close()

    structured_text = extract_structured_text(html)

    return [
        Document(
            page_content=structured_text,
            metadata={"source": url}
        )
    ]

#as we have three input type so we need a function for document loading based on the input type(pdf,web,youtube)
def load_content(source,source_type):
    if source_type=="pdf":
        if source_type == "pdf":

         filepath = os.path.join("uploads", source.filename)

        with open(filepath, "wb") as f:
            f.write(source.file.read())

        try:
          loader = PyPDFLoader(filepath)
          return loader.load()
        finally:
          if os.path.exists(filepath):
           os.remove(filepath)
    elif source_type=="web":
        return load_web_content(source)
    elif source_type=="youtube":
        return load_youtube_content(source)
        
    else:
      raise ValueError("Unsupported source type")

    
    





#definiing a text splitter to split the content into smaller chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)




#creating a embedding model which we will use along text when storing text and when retreving text
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")



def create_vectorstore(source, source_type):

    content = load_content(source, source_type)

    chunks = splitter.split_documents(content)
    client=EphemeralClient()
    collection_name = str(uuid.uuid4())

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        client=client,
        collection_name=collection_name
    )
    print(vectorstore._collection.name)

    

    return vectorstore
  








import os
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace

token = os.getenv("HUGGINGFACEHUB_API_TOKEN") or os.getenv("huggingface_api")

llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.1-8B-Instruct",
    huggingfacehub_api_token=token,
    task="text-generation",
    max_new_tokens=512,
    temperature=0.2,
    streaming=True,
)

chat = ChatHuggingFace(llm=llm)




##using promppt template bcz it provides input validation ,also we can store it into  separte json
#file for later use,memory managmenet bcz it be defualt gives system human ai value
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """You are an AI research assistant.

Use ONLY the provided context and history to answer the user's question.

If the answer is not present in the context, say:
"I couldn't find that information in the provided sources."

Conversation History:
{history}

Context:
{context}
"""
        ),
        ("human", "{question}")
    ]
)




def format_docs(docs):
    context = "\n\n".join(doc.page_content for doc in docs)

    

    return context

def debug_prompt(prompt_value):

    print(prompt_value.to_string())

    return prompt_value

def format_history(history):
    if not history:
        return ""

    return "\n".join(
        f"{msg.role.capitalize()}: {msg.content}"
        for msg in history
    )

def create_chain(vectorstore):

    print("Collection Count:", vectorstore._collection.count())

    docs = vectorstore.get()

    print("=" * 80)
    print("VECTORSTORE CONTENT")
    print("=" * 80)

    for i, d in enumerate(docs["documents"]):
        print(f"{i+1}. {d[:200]}")
    retriever = vectorstore.as_retriever(
        search_kwargs={"k": 3}
    )


    chain = (
    {
        "context": itemgetter("question") | retriever | RunnableLambda(format_docs),
        "question": itemgetter("question"),
        "history": itemgetter("history") | RunnableLambda(format_history),
    }
    | prompt
    |debug_prompt
    | chat
    | StrOutputParser()
)

    return chain
def process_source(source, source_type):

    vectorstore = create_vectorstore(
        source,
        source_type
    )
    print(vectorstore._collection.count())
    ##actually the retreiver stores the refrence of store from which it should get
    ##get results next time so we need to create chain with new retrieve each time 
    ##source is changed
    return create_chain(vectorstore)






def ask_question(chain, question,history):

    return chain.invoke({
        "question": question,
        "history": history
    })