// app/natural-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Atom,
  FlaskConical,
  Dna,
  Earth,
  MoonStar,
} from "@/components/icons";

// Symbols for the background
const naturalScienceSymbols = [
  "H₂O",
  "E=mc²",
  "ATP",
  "SiO₂",
  "F=ma",
  "C₆H₁₂O₆",
  "Fe",
  "g",
  "DNA",
  "eV",
  "AU",
  "Gyr",
  "CO₂",
];

export default function NaturalSciencePage() {
  const disciplines = [
    {
      title: "Physics",
      desc: "The study of matter, energy, motion, and force.",
      href: "/natural-science/physics",
      Icon: Atom,
      className: "theme-physics",
    },
    {
      title: "Chemistry",
      desc: "The study of substances, their properties, and reactions.",
      href: "/natural-science/chemistry",
      Icon: FlaskConical,
      className: "theme-chemistry",
    },
    {
      title: "Biology",
      desc: "The study of living organisms, life, and evolution.",
      href: "/natural-science/biology",
      Icon: Dna,
      className: "theme-biology topic-card-wide",
    },
    {
      title: "Earth Science",
      desc: "The study of the Earth, its systems, and its history.",
      href: "/natural-science/earth-science",
      Icon: Earth,
      className: "theme-earth-science topic-card-wide",
    },
    {
      title: "Astronomy",
      desc: "The study of celestial objects, space, and the universe.",
      href: "/natural-science/astronomy",
      Icon: MoonStar,
      className: "theme-astronomy topic-card-wide",
    },
  ];

  return (
    <main className="topic-page theme-natural-science lg:px-16">
      <FloatingSymbols symbols={naturalScienceSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Natural Sciences"
        subtitle="The branch of science concerned with the description, prediction, and understanding of natural phenomena, based on empirical evidence from observation and experimentation."
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