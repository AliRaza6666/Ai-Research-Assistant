import Container from "@/components/layout/Container";
import { Bot, User, FileText, Globe } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

export default function MockChat() {
  return (
    <section className="pb-24">
      <Container>
        <div className="mx-auto max-w-3xl">

          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-600 p-2">
                  <Bot size={18} className="text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    AI Research Assistant
                  </h3>

                  <p className="text-xs text-green-400">
                    ● Online
                  </p>
                </div>
              </div>

            </div>

            {/* Chat */}
            <div className="space-y-8 p-6">

              {/* User */}

              <div className="flex justify-end">

                <div className="max-w-md rounded-2xl bg-blue-600 px-5 py-4 text-white">

                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">

                    <User size={15} />

                    You

                  </div>

                  Summarize the uploaded research paper and tell me the key
                  findings.

                </div>

              </div>

              {/* Assistant */}

              <div className="flex justify-start">

                <div className="max-w-xl rounded-2xl border border-zinc-700 bg-zinc-800 px-5 py-4">

                  <div className="mb-3 flex items-center gap-2 text-blue-400">

                    <Bot size={16} />

                    Assistant

                  </div>

                  <p className="leading-7 text-zinc-300">

                    The paper introduces Retrieval-Augmented Generation (RAG)
                    to improve factual accuracy by combining vector search with
                    large language models.

                  </p>

                  {/* Sources */}

                  <div className="mt-5 rounded-xl border border-zinc-700 bg-zinc-900 p-4">

                    <p className="mb-3 font-medium text-white">

                      Sources

                    </p>

                    <div className="flex flex-wrap gap-3">

                      <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-2 text-sm text-zinc-300">

                        <FileText size={14} />

                        PDF • Page 5

                      </div>

                      <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-2 text-sm text-zinc-300">

                        <Globe size={14} />

                        Website

                      </div>

                      <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-2 text-sm text-zinc-300">

                        <FaYoutube className="text-red-500" />

                        Video 08:12

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Input */}

            <div className="border-t border-zinc-800 bg-zinc-950 px-6 py-5">

              <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">

                <input
                  disabled
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-zinc-400 outline-none placeholder:text-zinc-500"
                />

                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                  Send
                </button>

              </div>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}