"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  BookOpen,
  Pen,
  VenetianMask,
  Lightbulb,
  Speech,
  Globe,
} from "@/components/icons";
import React from "react";

const litSymbols = [
  "Metaphor", "Simile", "Haiku", "Iambic", "Prose", "Syntax", "Theme", "Motif",
];

export default function LiteraturePage() {
  const branches = [
    {
      title: "Literary Theory & Criticism",
      desc: "The systematic study of the nature of literature and the methods for analyzing literary works (e.g., Structuralism, Post-colonialism).",
      href: "/humanities/literature/theory",
      Icon: Lightbulb,
      className: "theme-humanities",
    },
    {
      title: "Poetry & Poetics",
      desc: "The study of aesthetic and rhythmic qualities of language, including meter, sound symbolism, and verse forms.",
      href: "/humanities/literature/poetry",
      Icon: Pen,
      className: "theme-humanities",
    },
    {
      title: "Prose & The Novel",
      desc: "The study of narrative fiction and non-fiction, exploring plot, character development, and narrative voice.",
      href: "/humanities/literature/prose",
      Icon: BookOpen,
      className: "theme-humanities",
    },
    {
      title: "Drama & Performance",
      desc: "Literature written for performance, analyzing scripts, dialogue, and the transition from text to stage.",
      href: "/humanities/literature/drama",
      Icon: VenetianMask,
      className: "theme-humanities",
    },
    {
      title: "Comparative Literature",
      desc: "The study of literature across cultural, linguistic, and national borders.",
      href: "/humanities/literature/comparative",
      Icon: Globe,
      className: "theme-humanities",
    },
    {
      title: "Rhetoric",
      desc: "The art of persuasion and the study of the capacities of writers or speakers to inform, persuade, or motivate particular audiences.",
      href: "/humanities/literature/rhetoric",
      Icon: Speech,
      className: "theme-humanities",
    },
  ];

  return (
    <main className="topic-page theme-humanities lg:px-16">
      <FloatingSymbols symbols={litSymbols} />
      <PageHeader
        eyebrow="Humanities"
        title="Literature & Language"
        subtitle="The exploration of the human condition through written works, narrative structures, and the expressive power of language."
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