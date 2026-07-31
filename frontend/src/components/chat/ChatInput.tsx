import { Paperclip, SendHorizonal } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="sticky bottom-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto max-w-4xl p-6">

        <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-3 shadow-2xl">

          {/* Input Row */}

          <div className="flex items-center gap-3">

            <button className="rounded-xl p-2 transition hover:bg-zinc-800">
              <Paperclip className="text-zinc-400" size={20} />
            </button>

            <input
              type="text"
              placeholder="Ask anything about your uploaded source..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-500"
            />

            <button className="rounded-xl bg-blue-600 p-3 transition hover:bg-blue-500">
              <SendHorizonal className="text-white" size={18} />
            </button>

          </div>

          {/* Bottom Row */}

          <div className="mt-4 flex items-center justify-between">

            <div className="flex gap-2">

              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                PDF
              </span>

              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                Website
              </span>

              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                YouTube
              </span>

            </div>

            

          </div>

        </div>

      </div>
    </div>
  );
}