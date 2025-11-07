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
      title: "Formal Sciences",
      desc: "Study of abstract systems and logic.",
      href: "/formal-science",
      Icon: Calculator,
      style: {
        "--card-gradient-start": "#ff2020ff",
        "--card-gradient-end": "#ff7b0fff",
        "--card-icon-hover": "#ff1100ff",
        "--card-underline": "#ff0000af",
      },
    },
    {
      title: "Natural Sciences",
      desc: "Study of the physical world.",
      href: "/natural-science",
      Icon: FlaskConical,
      style: {
        "--card-gradient-start": "#00ff2aff",
        "--card-gradient-end": "#02ddddff",
        "--card-icon-hover": "#00ff5eff",
        "--card-underline": "#00df52ff",
      },
    },
    {
      title: "Social Sciences",
      desc: "Study of societies and relationships.",
      href: "/social-science",
      Icon: Users,
      style: {
        "--card-gradient-start": "#1519ffff",
        "--card-gradient-end": "#5b04e7ff",
        "--card-icon-hover": "#00c4e6ff",
        "--card-underline": "#2e0bf5c2",
      },
    },
    {
      title: "Applied Sciences",
      desc: "Study of practical applications.",
      href: "/applied-science",
      Icon: Building,
      style: {
        "--card-gradient-start": "#ff0f93ff",
        "--card-gradient-end": "#af4cffff",
        "--card-icon-hover": "#ff77f8ff",
        "--card-underline": "#ff00b3e3",
      },
    },
    {
      title: "Humanities",
      desc: "Study of human culture and expression.",
      href: "/humanities",
      Icon: Palette,
      style: {
        "--card-gradient-start": "#fffb00ff",
        "--card-gradient-end": "#9eff02ff",
        "--card-icon-hover": "#e7eb00ff",
        "--card-underline": "#fcf700bb",
      },
    },
    {
      title: "Interdisciplines",
      desc: "Connecting fields of study.",
      href: "/interdisciplines",
      Icon: GitMerge,
      style: {
        "--card-gradient-start": "#cc5200ff",
        "--card-gradient-end": "#fdad00ff",
        "--card-icon-hover": "#ff9f21ff",
        "--card-underline": "#a3a3a3",
      },
    },
    {
      title: "Glossary",
      desc: "Definitions and key terms.",
      href: "/glossary",
      Icon: BookOpen,
      style: {
        "--card-gradient-start": "#a0a0a0ff",
        "--card-gradient-end": "#2c2c2cff",
        "--card-icon-hover": "#bbbbbbff",
        "--card-underline": "#202020ff",
      },
    },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="glass w-full max-w-5xl border border-neutral-800/60 p-10 text-center shadow-2xl">
        <div className="flex justify-center mb-4">
        </div>
        <h1 className="text-4xl font-bold text-cyan-400">Academia</h1>
        <p className="mt-2 text-neutral-300 italic">Knowledge Network 🚀</p>
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