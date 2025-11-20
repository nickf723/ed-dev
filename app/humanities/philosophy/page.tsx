"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Lightbulb,
  BookOpen,
  Scale,
  HelpCircle,
  Gavel, // For Ethics/Justice
} from "@/components/icons";
import React from "react";

const philosophySymbols = [
  "\\exists", "\\forall", "\\therefore", "\\phi", "\\psi", "\\text{Truth}", "\\text{Ethics}", "?",
];

export default function PhilosophyPage() {
  const branches = [
    {
      title: "Epistemology",
      desc: "The theory of knowledge. What separates justified belief from opinion? How do we know what we know?",
      href: "/humanities/philosophy/epistemology",
      Icon: Lightbulb,
      className: "theme-humanities",
    },
    {
      title: "Ethics (Moral Philosophy)",
      desc: "Systematizing, defending, and recommending concepts of right and wrong conduct.",
      href: "/humanities/philosophy/ethics",
      Icon: Gavel,
      className: "theme-humanities",
    },
    {
      title: "Metaphysics",
      desc: "The study of the fundamental nature of reality, including the relationship between mind and matter, between substance and attribute.",
      href: "/humanities/philosophy/metaphysics",
      Icon: BookOpen,
      className: "theme-humanities",
    },
    {
      title: "Logic",
      desc: "The study of valid inference and argument structure (shared with Formal Science).",
      href: "/formal-science/logic", // Cross-linking to existing Logic page
      Icon: Scale,
      className: "theme-humanities",
    },
  ];

  return (
    <main className="topic-page theme-humanities lg:px-16">
      <FloatingSymbols symbols={philosophySymbols} />
      <PageHeader
        eyebrow="Humanities"
        title="Philosophy"
        subtitle="The study of general and fundamental questions about existence, knowledge, values, reason, mind, and language. It is the 'love of wisdom' that underpins all other academic inquiry."
      />
      <section className="topic-grid">
        {branches.map((branch) => (
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