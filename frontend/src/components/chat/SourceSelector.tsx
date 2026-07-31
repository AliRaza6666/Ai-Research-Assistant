import { FileText, Globe } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

export default function SourceSelector() {
  const cards = [
    {
      title: "PDF",
      subtitle: "Upload research papers",
      icon: <FileText size={34} />,
    },
    {
      title: "Website",
      subtitle: "Analyze any webpage",
      icon: <Globe size={34} />,
    },
    {
      title: "YouTube",
      subtitle: "Summarize videos",
      icon: <FaYoutube size={34} className="text-red-500" />,
    },
  ];

  return (
    <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-8">
      <h3 className="mb-6 text-lg font-semibold text-white">
        Choose a source
      </h3>

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <button
            key={card.title}
            className="
              group
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              text-left
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-500
              hover:bg-zinc-800
            "
          >
            <div className="mb-5 text-blue-500 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>

            <h4 className="text-lg font-semibold text-white">
              {card.title}
            </h4>

            <p className="mt-2 text-sm text-zinc-400">
              {card.subtitle}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}