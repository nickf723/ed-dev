// app/social-science/political-science/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Landmark,
  Gavel,
  Users,
  Earth,
} from "@/components/icons";
import React from "react";

const politicalScienceSymbols = [
  "\\text{Gov}", "\\text{State}", "\\text{Law}", "\\text{Power}", "\\text{Lobby}", "\\text{Vote}", "\\text{UN}", "\\text{EU}",
];

const branches = [
  {
    title: "Political Theory",
    desc: "Analyzing foundational ideas about the state, society, governance, and justice from classical thinkers (Plato, Locke, Marx).",
    href: "/social-science/political-science/political-theory",
    Icon: Gavel,
    className: "theme-social-science"
  },
  {
    title: "Comparative Politics",
    desc: "The study of domestic politics across different countries, examining political institutions, conflicts, and outcomes.",
    href: "/social-science/political-science/comparative-politics",
    Icon: Users,
    className: "theme-social-science"
  },
  {
    title: "International Relations",
    desc: "The study of relationships between states, including diplomacy, war, trade, and the roles of international organizations.",
    href: "/social-science/political-science/international-relations",
    Icon: Earth,
    className: "theme-social-science"
  },
  {
    title: "Public Administration & Law",
    desc: "Analyzing the practical management of government and the relationship between public policy and legal frameworks.",
    href: "/social-science/political-science/public-administration",
    Icon: Landmark,
    className: "theme-social-science"
  },
];

export default function PoliticalSciencePage() {
  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={politicalScienceSymbols} />
      <PageHeader
        eyebrow="Social Science"
        title="Political Science"
        subtitle="The systematic study of political systems, processes, behavior, and the theory and practice of governance at local, national, and international levels."
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