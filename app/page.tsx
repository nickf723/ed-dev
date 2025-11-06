"use client";

import { Calculator, BookOpen } from "lucide-react";
import TopicCard from "@/components/TopicCard"; 

export default function Home() {
  const cards = [
    {
      title: "Mathematics",
      desc: "Patterns, logic, and structure.",
      href: "/math",
      Icon: Calculator,
      style: {
        "--card-gradient-start": "var(--color-text-title, #f87171)",
        "--card-gradient-end": "var(--color-text-header, #fb923c)",
        "--card-icon-hover": "var(--color-text-icon, #fdba74)",
        "--card-underline": "var(--color-text-header, #fb923c)",
      }
    },
    {
      title: "Glossary",
      desc: "Definitions and key terms.",
      href: "/glossary",
      Icon: BookOpen,
      style: {
        "--card-gradient-start": "#fcd34d", 
        "--card-gradient-end": "#fbbf24", 
        "--card-icon-hover": "#fde68a",
        "--card-underline": "#fbbf24", 
      }
    },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="glass w-full max-w-5xl border border-neutral-800/60 p-10 text-center shadow-2xl">
        {/* ... (Tagline and H1) ... */}
        <div className="flex justify-center mb-4">
          <span className="text-xs tracking-widest text-cyan-300 uppercase bg-neutral-800/50 px-3 py-1 rounded-full">
            -- Welcome --
          </span>
        </div>

        <h1 className="text-4xl font-bold text-cyan-400">Academia</h1>
        <p className="mt-2 text-neutral-300 italic">
          Knowledge Network 🚀
        </p>
        {/* Card grid */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {cards.map((card) => (
            <TopicCard
              key={card.href}
              href={card.href}
              title={card.title}
              desc={card.desc}
              Icon={card.Icon}
              style={card.style as any}
            />
          ))}
        </div>
      </div>
    </main>
  );
}