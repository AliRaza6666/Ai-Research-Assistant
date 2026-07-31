import { Bot } from "lucide-react";

export default function MessageArea() {
  return (
    <section className="flex-1 bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-10">

        {/* Assistant Welcome */}

        <div className="flex gap-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">

            <Bot size={18} className="text-white" />

          </div>

          <div className="flex-1">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

              <h3 className="mb-3 text-lg font-semibold text-white">
                Welcome 👋
              </h3>

              <p className="leading-7 text-zinc-300">
                Upload a PDF, paste a website URL, or provide a YouTube link.
                I'll analyze the content and answer your questions with
                source-backed responses.
              </p>

              {/* Suggestions */}

              <div className="mt-8">

                <p className="mb-4 text-sm font-medium text-zinc-400">
                  Try asking:
                </p>

                <div className="space-y-3">

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300 transition hover:border-blue-500">
                    Summarize this document.
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300 transition hover:border-blue-500">
                    What are the key findings?
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300 transition hover:border-blue-500">
                    Explain this topic in simple words.
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300 transition hover:border-blue-500">
                    Generate interview questions from this content.
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}