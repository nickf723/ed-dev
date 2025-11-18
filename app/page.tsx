"use client";

import {
  Pi,
  BookText,
  Atom,
  Handshake,
  Hammer,
  Palette,
  Link,
  Wrench,
  BookOpen,
  Binary,
} from "@/components/icons";
import TopicCard from "@/components/TopicCard";
import { Skull, Theater } from "lucide-react";

export default function Home() {
  const cards = [
    {
      title: "Formal Sciences",
      desc: "Study of abstract systems and logic.",
      href: "/formal-science",
      Icon: Binary,
      className: "theme-formal-science"
    }
  ,
    {
      title: "Natural Sciences",
      desc: "Study of the physical world.",
      href: "/natural-science",
      Icon: Atom,
      className: "theme-natural-science"
    },
    {
      title: "Social Sciences",
      desc: "Study of societies and relationships.",
      href: "/social-science",
      Icon: Handshake,
      className: "theme-social-science"
    },
    {
      title: "Applied Sciences",
      desc: "Study of practical applications.",
      href: "/applied-science",
      Icon: Hammer,
      className: "theme-applied-science"
    },
    {
      title: "Humanities",
      desc: "Study of human culture and expression.",
      href: "/humanities",
      Icon: Palette,
      className: "theme-humanities"
    },
    {
      title: "Interdisciplines",
      desc: "Connecting fields of study.",
      href: "/interdisciplines",
      Icon: Link,
      className: "theme-interdisciplines"
    },
    {
      title: "Glossary",
      desc: "Definitions and key terms.",
      href: "/glossary",
      Icon: BookOpen,
      className: "theme-glossary"
    },
    {
      title: "Development Playground",
      desc: "Testing new features and designs.",
      href: "/dev-playground",
      Icon: Wrench,
      className: "theme-dev-playground"
    },
    {
      title: "Skeleton Pages",
      desc: "Template pages for future content.",
      href: "/skeleton",
      Icon: Skull,
      className: "theme-skeleton"
    },
    {
      title: "Stage",
      desc: "Recording Studio",
      href: "/stage",
      Icon: Theater,
      className: "theme-stage"
    }
  ];

  return (
    <main className="topic-page theme-home flex min-h-screen items-center justify-center px-6 py-12">
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
              className={card.className}
            />
          ))}
        </div>
      </div>
    </main>
  );
}