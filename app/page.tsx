"use client";

import {
  Calculator,
  BookOpen,
  FlaskConical,
  Users,
  Building,
  Palette,
  GitMerge,
} from "@/components/icons";
import TopicCard from "@/components/TopicCard";

export default function Home() {
  const cards = [
    {
      title: "Formal Science",
      desc: "Logic, mathematics, and systems.",
      href: "/formal-science",
      Icon: Calculator,
      style: {
        "--card-gradient-start": "#f87171",
        "--card-gradient-end": "#fb923c",
        "--card-icon-hover": "#fdba74",
        "--card-underline": "#fb923c",
      },
    },
    {
      title: "Natural Science",
      desc: "Physics, chemistry, and biology.",
      href: "/natural-science",
      Icon: FlaskConical,
      style: {
        "--card-gradient-start": "#34d399",
        "--card-gradient-end": "#22c55e",
        "--card-icon-hover": "#86efac",
        "--card-underline": "#22c55e",
      },
    },
    {
      title: "Social Science",
      desc: "Societies, behavior, and culture.",
      href: "/social-science",
      Icon: Users,
      style: {
        "--card-gradient-start": "#fbbf24",
        "--card-gradient-end": "#f59e0b",
        "--card-icon-hover": "#fde68a",
        "--card-underline": "#f59e0b",
      },
    },
    {
      title: "Applied Science",
      desc: "Engineering and technology.",
      href: "/applied-science",
      Icon: Building,
      style: {
        "--card-gradient-start": "#a78bfa",
        "--card-gradient-end": "#c084fc",
        "--card-icon-hover": "#e9d5ff",
        "--card-underline": "#c084fc",
      },
    },
    {
      title: "Humanities",
      desc: "Arts, history, and philosophy.",
      href: "/humanities",
      Icon: Palette,
      style: {
        "--card-gradient-start": "#f472b6",
        "--card-gradient-end": "#ec4899",
        "--card-icon-hover": "#fbcfe8",
        "--card-underline": "#ec4899",
      },
    },
    {
      title: "Interdisciplines",
      desc: "Connecting fields of study.",
      href: "/interdisciplines",
      Icon: GitMerge,
      style: {
        "--card-gradient-start": "#737373",
        "--card-gradient-end": "#a3a3a3",
        "--card-icon-hover": "#e5e5e5",
        "--card-underline": "#a3a3a3",
      },
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
      },
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
        <p className="mt-2 text-neutral-300 italic">Knowledge Network 🚀</p>
        {/* Card grid */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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