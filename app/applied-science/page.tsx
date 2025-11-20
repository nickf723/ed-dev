// app/applied-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Hammer,
  Wrench,
  Syringe,
  Binary,
} from "@/components/icons";
import React from "react";

const appliedScienceSymbols = [
  "R&D", "CAD", "AI", "DNA", "CODE", "C", "\\text{H}_2\\text{O}", "J", "W", "P", "T",
];

export default function AppliedSciencePage() {
  const disciplines = [
    {
      title: "Engineering",
      desc: "Designing and building machines, structures, and systems to solve problems across various disciplines (e.g., civil, electrical, mechanical).",
      href: "/applied-science/engineering",
      Icon: Wrench,
      className: "theme-applied-science"
    },
    {
      title: "Medicine & Health Sciences",
      desc: "The science and practice of the diagnosis, treatment, and prevention of disease and the promotion of wellness.",
      href: "/applied-science/medicine",
      Icon: Syringe,
      className: "theme-applied-science"
    },
    {
      title: "Computer Technology",
      desc: "The practical application of computational hardware, software, and networking systems for specific goals.",
      href: "/applied-science/computer-technology",
      Icon: Binary,
      className: "theme-applied-science"
    },
    {
      title: "Materials Science",
      desc: "The interdisciplinary field of manipulating and designing new physical materials for industrial and technological applications.",
      href: "/applied-science/materials-science",
      Icon: Hammer,
      className: "theme-applied-science"
    },
  ];

  return (
    <main className="topic-page theme-applied-science lg:px-16">
      <FloatingSymbols symbols={appliedScienceSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Applied Sciences"
        subtitle="The practical application of scientific knowledge to solve real-world problems, develop technology, and drive innovation across all industries."
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