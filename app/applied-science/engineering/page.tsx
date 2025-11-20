// app/applied-science/engineering/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Wrench,
  Zap,
  Network,
  RotateCw,
} from "@/components/icons";
import React from "react";

const engineeringSymbols = [
  "\\text{CAD}", "\\text{R&D}", "\\text{Mpa}", "\\text{Hz}", "\\text{V}", "\\text{A}", "\\text{J}", "\\tau",
];

const branches = [
  {
    title: "Mechanical Engineering",
    desc: "Design and analysis of thermal and mechanical systems, power generation, and machines.",
    href: "/applied-science/engineering/mechanical",
    Icon: RotateCw,
    className: "theme-applied-science"
  },
  {
    title: "Electrical Engineering",
    desc: "Design, development, and maintenance of electrical systems, circuits, and electronic devices.",
    href: "/applied-science/engineering/electrical",
    Icon: Zap,
    className: "theme-applied-science"
  },
  {
    title: "Civil Engineering",
    desc: "Design, construction, and maintenance of the physical and naturally built environment (roads, bridges, canals).",
    href: "/applied-science/engineering/civil",
    Icon: Network,
    className: "theme-applied-science"
  },
  {
    title: "Chemical Engineering",
    desc: "Application of chemistry, physics, and life sciences to the design and operation of industrial processes.",
    href: "/applied-science/engineering/chemical",
    Icon: Wrench,
    className: "theme-applied-science"
  },
];

export default function EngineeringPage() {
  return (
    <main className="topic-page theme-applied-science lg:px-16">
      <FloatingSymbols symbols={engineeringSymbols} />
      <PageHeader
        eyebrow="Applied Sciences"
        title="Engineering"
        subtitle="The discipline that uses scientific principles to design, construct, and maintain machines, structures, and other complex systems."
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