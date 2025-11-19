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

const humanitiesSymbols = [
  "1815", "iamb", "ethos", "logos", "pietas", "veritas", "mos", "lex",
];

export default function HumanitiesPage() {
  const disciplines = [
    {
      title: "History",
      desc: "The study of the past, focusing on events, people, and changes in society.",
      href: "/humanities/history",
      Icon: PenBox,
      className: "theme-humanities"
    },
    {
      title: "Literature",
      desc: "The study of written works, focusing on narrative, poetry, and dramatic texts.",
      href: "/humanities/literature",
      Icon: BookText,
      className: "theme-humanities topic-card-wide"
    },
    {
      title: "Philosophy",
      desc: "The study of general and fundamental problems concerning matters such as existence, knowledge, values, reason, mind, and language.",
      href: "/humanities/philosophy",
      Icon: Gavel,
      className: "theme-humanities"
    },
    {
      title: "Art & Culture",
      desc: "The study of visual arts, music, theatre, and the expression of human creativity.",
      href: "/humanities/art-culture",
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
        subtitle="Disciplines that study aspects of human society and culture, exploring human experience through critical, speculative, and historical methods."
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