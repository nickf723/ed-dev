// app/humanities/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Palette,
  BookText,
  Gavel,
  PenBox,
} from "@/components/icons";
import React from "react";

const humanitiesSymbols = [
  "1815", "iamb", "ethos", "logos", "pietas", "veritas", "mos", "lex",
];

export default function HumanitiesPage() {
  const disciplines = [
    {
      title: "Philosophy",
      desc: "The critical study of fundamental problems concerning existence, knowledge, values, and reason.",
      href: "/humanities/philosophy",
      Icon: Gavel,
      className: "theme-humanities"
    },
    {
      title: "History",
      desc: "The analysis and interpretation of past events, providing context for human societies and change over time.",
      href: "/humanities/history",
      Icon: PenBox,
      className: "theme-humanities"
    },
    {
      title: "Literature & Language",
      desc: "The study of written works, narrative structure, and the forms, functions, and evolution of human language.",
      href: "/humanities/literature",
      Icon: BookText,
      className: "theme-humanities topic-card-wide"
    },
    {
      title: "Arts & Aesthetics",
      desc: "The study of visual arts, music, and the principles underlying beauty and artistic judgment in culture.",
      href: "/humanities/arts-aesthetics",
      Icon: Palette,
      className: "theme-humanities"
    },
  ];

  return (
    <main className="topic-page theme-humanities lg:px-16">
      <FloatingSymbols symbols={humanitiesSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Humanities"
        subtitle="Disciplines that study aspects of human society and culture, exploring human experience through critical, speculative, and historical methods. They examine what it means to be human."
      />
      <section className="topic-grid">
        {disciplines.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            desc={branch.desc}
            Icon={branch.Icon}
            className={branch.className}
          />
        ))}
      </section>
    </main>
  );
}