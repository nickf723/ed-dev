"use client";

import { Calculator, BookOpen } from "lucide-react";
import TopicCard from "@/components/TopicCard"; // 👈 Import new component

export default function Home() {
  // 🧩  Card data - NOW WITH CORRECT PROPS
  const cards = [
    {
      title: "Mathematics",
      desc: "Patterns, logic, and structure.",
      href: "/math",
      Icon: Calculator,
      gradient: "from-cyan-400 to-blue-500",
      iconHoverColor: "group-hover:text-cyan-400",
      underlineColor: "bg-cyan-400",
    },
    {
      title: "Glossary",
      desc: "Definitions and key terms.",
      href: "/glossary",
      Icon: BookOpen,
      gradient: "from-amber-400 to-orange-500",
      iconHoverColor: "group-hover:text-amber-400",
      underlineColor: "bg-amber-400",
    },
  ];

  // 🌀 Tilt animation logic is now in TopicCard

  // 🧱 Page layout
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="glass w-full max-w-5xl border border-neutral-800/60 p-10 text-center shadow-2xl">
        {/* Tagline */}
        <div className="flex justify-center mb-4">
          <span className="text-xs tracking-widest text-cyan-300 uppercase bg-neutral-800/50 px-3 py-1 rounded-full">
            v0.1 — prototype
          </span>
        </div>

        <h1 className="text-4xl font-bold text-cyan-400">Ed Dev Protocol</h1>
        <p className="mt-2 text-neutral-300 italic">
          Working smarter, not harder 🚀
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
              gradient={card.gradient}
              iconHoverColor={card.iconHoverColor}
              underlineColor={card.underlineColor}
            />
          ))}
        </div>
      </div>
    </main>
  );
}