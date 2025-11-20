// app/social-science/economics/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  DollarSign,
  LineChart,
  Target,
  Network,
} from "@/components/icons";
import React from "react";

const economicsSymbols = [
  "\\text{S}", "\\text{D}", "\\text{MR}", "\\text{MC}", "\\text{GDP}", "\\pi", "\\text{C}", "\\text{I}", "\\text{G}", "\\text{X}",
];

const branches = [
  {
    title: "Microeconomics",
    desc: "Analyzing how individual households and firms make decisions regarding the allocation of scarce resources.",
    href: "/social-science/economics/microeconomics",
    Icon: DollarSign,
    className: "theme-social-science"
  },
  {
    title: "Macroeconomics",
    desc: "Analyzing the performance, structure, behavior, and decision-making of an economy as a whole.",
    href: "/social-science/economics/macroeconomics",
    Icon: LineChart,
    className: "theme-social-science"
  },
  {
    title: "Markets and Pricing",
    desc: "The study of supply and demand, market efficiency, competition, and setting equilibrium prices.",
    href: "/social-science/economics/markets-pricing",
    Icon: Target,
    className: "theme-social-science"
  },
  {
    title: "Behavioral Economics",
    desc: "Integrating psychology into economic analysis to understand real-world human decision-making and biases.",
    href: "/social-science/economics/behavioral-economics",
    Icon: Network,
    className: "theme-social-science"
  },
];

export default function EconomicsPage() {
  return (
    <main className="topic-page theme-social-science lg:px-16">
      <FloatingSymbols symbols={economicsSymbols} />
      <PageHeader
        eyebrow="Social Science"
        title="Economics"
        subtitle="The social science that studies the production, distribution, and consumption of goods and services. It analyzes choices made under conditions of scarcity."
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