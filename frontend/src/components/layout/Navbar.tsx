import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          AI Research Assistant
        </Link>

        <a
          href="https://github.com/YOUR_USERNAME/YOUR_REPO"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 transition hover:bg-zinc-800"
        >
          <FaGithub size={22} />
        </a>

      </div>
    </header>
  );
}