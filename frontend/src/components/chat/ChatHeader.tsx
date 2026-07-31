import { Bot } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="flex h-16 items-center justify-between px-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-2">
            <Bot className="text-white" size={18} />
          </div>

          <div>

            <h2 className="font-semibold text-white">
              AI Research Assistant
            </h2>

            <p className="text-xs text-green-400">
              ● Ready
            </p>

          </div>

        </div>

        <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-blue-500">
          New Chat
        </button>

      </div>
    </header>
  );
}