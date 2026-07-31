"use client";
import { useEffect } from "react";
import {User} from "lucide-react";
import { useState } from "react";
import {
  FileText,
  Globe,
  
  Bot,
  SendHorizontal,
  Loader2,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";



export default function ChatPage() {
  const [sourceType, setSourceType] = useState<
    "pdf" | "website" | "youtube" | null
  >(null);

  const [selectedSource, setSelectedSource] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;

};

  const [messages, setMessages] = useState<Message[]>([]);
  

  

 async function processYoutubeVedio(){
    setIsProcessing(true);

    const response = await fetch(
        "http://127.0.0.1:8000/process",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userid: userid,
                source: youtubeUrl,
                source_type:"youtube"
            })
        }
    );
  

    const data = await response.json();

    console.log(data);

    setSelectedSource(youtubeUrl);
    setIsProcessing(false);
}


async function processWebsite() {
     setIsProcessing(true);

     const response=await fetch(
      "http://127.0.0.1:8000/process",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"

        },
        body:JSON.stringify({
                userid: userid,
                source: websiteUrl,
                source_type:"web"
            })
      }

     )
     const data=await response.json()
     console.log(data)
     setSelectedSource(websiteUrl)
     setIsProcessing(false)
  }

  async function processPdf(file: File) {
  setIsProcessing(true);

  setSelectedSource(file.name);  
  const formData = new FormData();

  formData.append("userid", userid);
  formData.append("file", file);

  const response = await fetch(
    "http://127.0.0.1:8000/process-pdf",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  console.log(data);
  setIsProcessing(false);
}
    

  async function sendMessage() {
  setIsLoading(true);
  if (!input.trim()) return;

  if (!selectedSource) {
    alert("Please select a source before asking a question.");
    return;
  }
  setInput("");

  const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

  const history = messages.slice(-10);

  try {
    const response = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: input,
        userid: userid,
        history:history
      }),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      alert(data.error || "Something went wrong.");
      return;
    }

    
  
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: data.answer,
    };

    setMessages((prev) => [...prev, aiMessage]);

    setIsLoading(false);

  } catch (error) {
    console.error(error);
    alert("Failed to connect to backend.");
  }
}
 


     const [userid] = useState(() => {

        let id = sessionStorage.getItem("userid");


        if(!id){

            id = Math.floor(
                100000 + Math.random() * 900000
            ).toString();


            sessionStorage.setItem(
                "userid",
                id
            );
        }


        return id;

    });

  return (
    <div className="flex h-screen bg-zinc-950">

      {/* ================= Sidebar ================= */}

      <aside className="flex w-60 flex-col border-r border-zinc-800 bg-zinc-900">

        <div className="border-b border-zinc-800 p-5">

          <button
            onClick={() => {
              setSourceType(null);
              setSelectedSource("");
              setWebsiteUrl("");
              setYoutubeUrl("");
              setMessages([]);
              setInput("");
            }}
            className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-500"
          >
            + New Session
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-5">

          {!selectedSource ? (
            <>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Choose Source
              </h3>

              {/* PDF */}

              <button
                onClick={() => setSourceType("pdf")}
                className={`mb-2 w-full rounded-2xl border p-2 text-left transition ${
                  sourceType === "pdf"
                    ? "border-blue-500 bg-zinc-800"
                    : "border-zinc-700 hover:border-blue-500"
                }`}
              >
                <FileText className="mb-3 text-blue-500" size={28} />

                <h4 className="font-semibold text-white">
                  PDF
                </h4>

                <p className="mt-1 text-sm text-zinc-400">
                  Upload research papers
                </p>
              </button>

              {/* Website */}

              <button
                onClick={() => setSourceType("website")}
                className={`mb-2 w-full rounded-2xl border p-2 text-left transition ${
                  sourceType === "website"
                    ? "border-blue-500 bg-zinc-800"
                    : "border-zinc-700 hover:border-blue-500"
                }`}
              >
                <Globe className="mb-3 text-blue-500" size={28} />

                <h4 className="font-semibold text-white">
                  Website
                </h4>

                <p className="mt-1 text-sm text-zinc-400">
                  Analyze webpages
                </p>
              </button>

              {/* YouTube */}

              <button
                onClick={() => setSourceType("youtube")}
                className={`mb-4 w-full rounded-2xl border p-2 text-left transition ${
                  sourceType === "youtube"
                    ? "border-blue-500 bg-zinc-800"
                    : "border-zinc-700 hover:border-blue-500"
                }`}
              >
                <FaYoutube
                  className="mb-3 text-red-500"
                  size={28}
                />

                <h4 className="font-semibold text-white">
                  YouTube
                </h4>

                <p className="mt-1 text-sm text-zinc-400">
                  Analyze videos
                </p>
              </button>

              {/* Dynamic Input */}
{sourceType === "pdf" && (
  <div className="space-y-3">

    <input
      disabled={isProcessing}
      type="file"
      accept=".pdf"
      onChange={(e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        processPdf(file);

      }}
      className="block w-full rounded-lg border border-zinc-700 text-sm text-zinc-400
      file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600
      file:px-3 file:py-2 file:text-white"
    />

  </div>
)}

              {sourceType === "website" && (
                <div className="space-y-3">

                  <input
                    disabled={isProcessing}
                    value={websiteUrl}
                    onChange={(e) =>
                      setWebsiteUrl(e.target.value)
                    }
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
                  />

                  <button
                    onClick={processWebsite}
                    className="w-full rounded-lg bg-blue-600 py-2 text-white"
                  >
                    Analyze Website
                  </button>

                </div>
              )}

              {sourceType === "youtube" && (
                <div className="space-y-3">

                  <input
                    disabled={isProcessing}
                    value={youtubeUrl}
                    onChange={(e) =>
                      setYoutubeUrl(e.target.value)
                    }
                    placeholder="https://youtube.com/..."
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
                  />

                  <button
                    onClick={() =>
                      processYoutubeVedio()
                    }
                    className="w-full rounded-lg bg-blue-600 py-2 text-white"
                  >
                    Analyze Video
                  </button>

                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">

              <h3 className="mb-4 font-semibold text-white">
                Current Source
              </h3>

              <p className="break-all text-sm text-zinc-300">
                {selectedSource}
              </p>

              <div className="mt-6 space-y-2 text-sm">

                <p className="text-green-400">
                  ● Ready
                </p>



              </div>



            </div>
          )}
        </div>
       
      </aside>

      {/* ================= Main ================= */}

      <main className="flex flex-1 flex-col">
        

        {/* Header */}

        <header className="border-b border-zinc-800 bg-zinc-900 px-8 py-2">

          <div className="flex items-center gap-3">

            <Bot className="text-blue-500" />

            <div>

              <h2 className="font-semibold text-white">
                AI Research Assistant
              </h2>

              <p className="text-sm text-green-400">
                ● Ready
              </p>

            </div>

          </div>

        </header>
        

        {messages.length === 0 ? (
  <div className="flex h-full flex-col items-center justify-center text-center">
    <div className="mb-6 rounded-full bg-blue-600/10 p-5">
      <Bot size={52} className="text-blue-500" />
    </div>

    <h2 className="mb-2 text-3xl font-bold text-white">
      AI Research Assistant
    </h2>

    <p className="mb-8 max-w-lg text-zinc-400">
      Upload a PDF, website, or YouTube video and ask questions
      about its content. I'll answer using only the uploaded
      source.
    </p>

    
  </div>
) : (
  <div className="mx-auto flex max-w-4xl flex-col gap-6">
    {/* Your messages.map() here */}
  </div>
)}

{isProcessing && (
  <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
    <div className="flex items-center gap-4 rounded-2xl border border-blue-500/30 bg-zinc-900/95 px-6 py-5 shadow-2xl backdrop-blur-md">
      <Loader2
        size={26}
        className="animate-spin text-blue-500"
      />

      <div>
        <h3 className="font-semibold text-white">
          Processing your source...
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          Extracting content, creating embeddings, and preparing your knowledge base.
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          This usually takes a few seconds.
        </p>
      </div>
    </div>
  </div>
)}


        {/* Messages */}
     
       <div className="flex-1 overflow-y-auto px-8 py-8">
  <div className="mx-auto flex max-w-4xl flex-col gap-6">

    {/* Source Processing Banner */}

    {isProcessing && (
      <div
        className={`${
          messages.length > 0
            ? "sticky top-0 z-10"
            : ""
        }`}
      >
        <div className="flex items-center gap-4 rounded-2xl border border-blue-500/30 bg-zinc-900/95 px-5 py-4 shadow-lg backdrop-blur">
          <Loader2
            size={22}
            className="animate-spin text-blue-500"
          />

          <div className="flex-1">
            <p className="font-semibold text-white">
              Processing your source...
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              Extracting content, creating embeddings, and preparing your knowledge base.
              This usually takes a few seconds.
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Messages */}

    {messages.map((message) => (
      <div
        key={message.id}
        className={`flex ${
          message.role === "user"
            ? "justify-start"
            : "justify-end"
        }`}
      >
        <div
          className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-md ${
            message.role === "user"
              ? "rounded-br-md bg-blue-600 text-white"
              : "rounded-bl-md bg-zinc-800 text-zinc-100"
          }`}
        >
          {/* Header */}

          <div className="mb-3 flex items-center gap-2">
            {message.role === "user" ? (
              <User
                size={18}
                className="text-white"
              />
            ) : (
              <Bot
                size={18}
                className="text-blue-400"
              />
            )}

            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-300">
              {message.role === "user"
                ? "You"
                : "AI Assistant"}
            </span>
          </div>

          {/* Message */}

          <p className="whitespace-pre-wrap leading-7">
            {message.content}
          </p>
        </div>
      </div>
    ))}

    {/* AI Typing */}

    {isLoading && (
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-bl-md bg-zinc-800 px-5 py-4 shadow-md">
          <div className="flex items-center gap-2">
            <Bot
              className="text-blue-400"
              size={18}
            />

            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-300"></span>

              <span
                className="h-2 w-2 animate-bounce rounded-full bg-zinc-300"
                style={{ animationDelay: "0.2s" }}
              ></span>

              <span
                className="h-2 w-2 animate-bounce rounded-full bg-zinc-300"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    )}

  </div>
</div>

        {/* Sticky Input */}

        <div className="border-t border-zinc-800 bg-zinc-900 p-3">

          <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-800 p-1">

          

            <input
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              
            />

            <button className="rounded-xl bg-blue-600 p-3 hover:bg-blue-500"
            onClick={sendMessage}>

              <SendHorizontal className="text-white" />

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}