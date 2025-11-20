"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Wrench,
  Zap,
  Hammer,
  Component,
  CircuitBoard
} from "@/components/icons"; // You might need to export 'Settings' or 'Cog' from icons.ts if not present.
import React from "react";

const engineeringSymbols = [
  "F=kx", "\\sigma = E\\epsilon", "V=IR", "\\tau", "\\text{CAD}", "\\eta", "P", "\\text{IoT}",
];

export default function EngineeringPage() {
  const branches = [
    {
      title: "Civil & Structural",
      desc: "The design and construction of physical infrastructure: bridges, roads, dams, and buildings.",
      href: "/applied-science/engineering/civil-structural",
      Icon: Hammer,
      className: "theme-applied-science",
    },
    {
      title: "Electrical & Electronics",
      desc: "The study of electricity, electromagnetism, and electronics to design circuits, power systems, and devices.",
      href: "/applied-science/engineering/electrical",
      Icon: Zap,
      className: "theme-applied-science",
    },
    {
      title: "Mechanical Engineering",
      desc: "Analyzing mechanics, thermodynamics, and materials to design moving machinery and heat systems.",
      href: "/applied-science/engineering/mechanical",
      Icon: Wrench,
      className: "theme-applied-science",
    },
    {
      title: "Software Engineering",
      desc: "Applying engineering principles to the systematic design, development, testing, and maintenance of software.",
      href: "/applied-science/engineering/software",
      Icon: CircuitBoard,
      className: "theme-applied-science",
    },
  ];

  return (
    <main className="topic-page theme-applied-science lg:px-16">
      <FloatingSymbols symbols={engineeringSymbols} />
      <PageHeader
        eyebrow="Applied Science"
        title="Engineering"
        subtitle="The application of mathematics and scientific principles to design, build, and maintain systems, structures, and machines that solve real-world problems."
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