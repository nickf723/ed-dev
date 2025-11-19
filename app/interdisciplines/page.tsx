// app/interdisciplines/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Link,
  Atom,
  BrainCog,
  Database,
  Sprout,
} from "@/components/icons";

const interdisciplinesSymbols = [
  "CIM", "AI", "ML", "E=mc²", "G", "J", "H", "B",
];

export default function InterdisciplinesPage() {
  const disciplines = [
    {
      title: "Bioengineering",
      desc: "The intersection of biology and engineering, applying engineering principles to living systems.",
      href: "/interdisciplines/bioengineering",
      Icon: Sprout,
      className: "theme-interdisciplines"
    },
    {
      title: "Astro-Physics",
      desc: "The convergence of astronomy and physics, studying the physical nature of celestial objects.",
      href: "/interdisciplines/astro-physics",
      Icon: Atom,
      className: "theme-interdisciplines"
    },
    {
      title: "Computational Linguistics",
      desc: "The study of language and computation, enabling AI to understand human language.",
      href: "/interdisciplines/computational-linguistics",
      Icon: BrainCog,
      className: "theme-interdisciplines"
    },
    {
      title: "Data Visualization",
      desc: "The intersection of data science, visual arts, and psychology to communicate complex information.",
      href: "/interdisciplines/data-visualization",
      Icon: Database,
      className: "theme-interdisciplines"
    },
  ];

  return (
    <main className="topic-page theme-interdisciplines lg:px-16">
      <FloatingSymbols symbols={interdisciplinesSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Interdisciplines"
        subtitle="Fields of study that combine two or more established academic disciplines into one coherent body of knowledge, solving complex problems too broad for a single field."
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