import Link from "next/link";
import Container from "@/components/layout/Container";
import { FileText, Globe, PlayCircle } from "lucide-react";
import SourceSelector from "../chat/SourceSelector";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Title */}
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
            AI Research Assistant
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Chat with PDFs, websites and YouTube videos using
            Retrieval-Augmented Generation. Get accurate, source-backed answers
            in seconds.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/chat"
              className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-500"
            >
              Start Chat
            </Link>
          </div>

          {/* Supported Sources */}
           <SourceSelector />
         
        </div>
      </Container>
    </section>
  );
}