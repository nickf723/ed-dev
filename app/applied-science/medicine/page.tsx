// app/applied-science/medicine/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Syringe,
  Dna,
  Beaker,
  BrainCog,
} from "@/components/icons";
import React from "react";

const medicineSymbols = [
  "\\text{DNA}", "\\text{RNA}", "\\text{ATP}", "\\text{Rx}", "\\text{mg}", "\\text{mL}", "\\text{pH}", "\\text{Enzyme}",
];

const branches = [
  {
    title: "Anatomy and Physiology",
    desc: "The study of the structure of the human body and how its parts function together.",
    href: "/applied-science/medicine/anatomy-physiology",
    Icon: Syringe,
    className: "theme-applied-science"
  },
  {
    title: "Pharmacology & Therapeutics",
    desc: "The study of drugs and their effects on living organisms, including drug development.",
    href: "/applied-science/medicine/pharmacology",
    Icon: Beaker,
    className: "theme-applied-science"
  },
  {
    title: "Biotechnology & Diagnostics",
    desc: "The application of biological systems for medical and diagnostic purposes.",
    href: "/applied-science/medicine/biotechnology",
    Icon: Dna,
    className: "theme-applied-science"
  },
  {
    title: "Neuroscience",
    desc: "The scientific study of the nervous system and its functions, focusing on the brain.",
    href: "/applied-science/medicine/neuroscience",
    Icon: BrainCog,
    className: "theme-applied-science"
  },
];

export default function MedicinePage() {
  return (
    <main className="topic-page theme-applied-science lg:px-16">
      <FloatingSymbols symbols={medicineSymbols} />
      <PageHeader
        eyebrow="Applied Sciences"
        title="Medicine & Health Sciences"
        subtitle="Disciplines focused on maintaining human health, including the diagnosis, treatment, and prevention of disease, backed by biological and chemical research."
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