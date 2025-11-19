// app/natural-science/biology/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Dna,
  Microscope,
  Sprout,
  Users,
} from "@/components/icons";
import React from "react";

const biologySymbols = [
  "DNA", "RNA", "ATP", "\\text{H}_2\\text{O}", "\\text{C}_6\\text{H}_{12}\\text{O}_6", "\\mu\\text{m}", "\\text{pH}",
];

const disciplines = [
    {
      title: "Cellular Biology",
      desc: "The study of cells—the fundamental units of life—including their structure, function, and behavior.",
      href: "/natural-science/biology/cellular-biology",
      Icon: Microscope,
      className: "theme-biology"
    },
    {
      title: "Genetics",
      desc: "The study of heredity, genes, and genetic variation in living organisms.",
      href: "/natural-science/biology/genetics",
      Icon: Dna,
      className: "theme-biology"
    },
    {
      title: "Evolution & Biodiversity",
      desc: "The study of how populations change over time and the vast variety of life on Earth.",
      href: "/natural-science/biology/evolution-biodiversity",
      Icon: Sprout,
      className: "theme-biology"
    },
    {
      title: "Ecology",
      desc: "The study of the relationships between living organisms and their environment.",
      href: "/natural-science/biology/ecology",
      Icon: Users,
      className: "theme-biology"
    },
  ];


export default function BiologyPage() {
  return (
    <main className="topic-page theme-biology lg:px-16">
      <FloatingSymbols symbols={biologySymbols} />
      <PageHeader
        eyebrow="Natural Science"
        title="Biology"
        subtitle="The scientific study of life, living organisms, and their vital processes. It encompasses everything from the smallest molecular components to global ecosystems."
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