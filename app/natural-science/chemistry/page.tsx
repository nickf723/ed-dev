// app/natural-science/chemistry/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  FlaskConical,
  Sprout,
  Zap,
  RotateCw,
} from "@/components/icons";
import React from "react";

const chemistrySymbols = [
  "\\text{H}_2\\text{O}", "\\text{C}", "\\text{Na}", "\\text{Cl}", "\\text{mol}", "\\Delta G", "\\Delta H", "\\text{pH}",
];

const disciplines = [
    {
      title: "Stoichiometry & Matter",
      desc: "The fundamental laws of mass, moles, and balancing chemical reactions.",
      href: "/natural-science/chemistry/stoichiometry",
      Icon: FlaskConical,
      className: "theme-chemistry"
    },
    {
      title: "Organic Chemistry",
      desc: "The study of the structure, properties, composition, reactions, and synthesis of carbon-containing compounds.",
      href: "/natural-science/chemistry/organic-chemistry",
      Icon: Sprout,
      className: "theme-chemistry"
    },
    {
      title: "Chemical Reactions",
      desc: "Exploring reaction types, kinetics (speed), and equilibrium (balance).",
      href: "/natural-science/chemistry/chemical-reactions",
      Icon: RotateCw,
      className: "theme-chemistry"
    },
    {
      title: "Physical Chemistry",
      desc: "The application of physics to chemical systems, covering thermodynamics and quantum mechanics.",
      href: "/natural-science/chemistry/physical-chemistry",
      Icon: Zap,
      className: "theme-chemistry"
    },
    {title: "Titration Lab", 
      desc: "Interactive lab on acid-base titrations and pH calculations.", 
      href: "/natural-science/chemistry/titration-lab", 
      Icon: FlaskConical, 
      className: "theme-chemistry"},
  ];


export default function ChemistryPage() {
  return (
    <main className="topic-page theme-chemistry lg:px-16">
      <FloatingSymbols symbols={chemistrySymbols} />
      <PageHeader
        eyebrow="Natural Science"
        title="Chemistry"
        subtitle="The study of matter, its properties, how and why substances combine or separate to form other substances. It is the molecular science underlying all of nature."
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