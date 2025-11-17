// app/formal-science/mathematics/algebra/pre-algebra/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  SquareFunction,
  Parentheses,
  Percent,
  Equal,
  LineChart,
  Puzzle,
} from "@/components/icons";
import React from "react";

// Symbols for the background
const foundationsSymbols = [
  "x", "y", "a+b", "a(b+c)", "3x+1", "+", "-", "=", "()", "<", ">",
];

// Data for the unit cards
const foundationsTopics = [
  {
    title: "Variables & Expressions (Unit 1)",
    href: "/formal-science/mathematics/algebra/pre-algebra/variables-expressions",
    Icon: SquareFunction,
    description: "Learn how symbols (variables) are used to represent unknown values.",
    className: "card-theme-elementary-algebra-foundations",
    status: "In Progress",
    subtitle: "1.1-1.3"
  },
  {
    title: "Ratios, Rates & Proportions (Unit 2)",
    href: "/formal-science/mathematics/algebra/pre-algebra/ratios-rates-proportions",
    Icon: Percent,
    description: "Using algebraic relationships to compare quantities and solve for unknowns.",
    className: "card-theme-elementary-algebra-foundations",
    status: "Planned",
    subtitle: "2.1-2.3"
  },
  {
    title: "Equations & Inequalities (Unit 3)",
    href: "/formal-science/mathematics/algebra/pre-algebra/equations-inequalities",
    Icon: Equal,
    description: "Using inverse operations to find the value of a variable.",
    className: "card-theme-elementary-algebra-foundations",
    status: "Planned",
    subtitle: "3.1-3.3"
  },
  {
    title: "Linear Reasoning Foundations (Unit 4)",
    href: "/formal-science/mathematics/algebra/pre-algebra/linear-reasoning",
    Icon: LineChart,
    description: "Finding rules in patterns and plotting relationships on a graph.",
    className: "card-theme-elementary-algebra-foundations",
    status: "Planned",
    subtitle: "4.1-4.3"
  },
  {
    title: "Structure, Logic & Problem Solving (Unit 5)",
    href: "/formal-science/mathematics/algebra/pre-algebra/structure-logic",
    Icon: Puzzle,
    description: "The reasoning habits and problem-solving strategies for algebra.",
    className: "card-theme-elementary-algebra-foundations",
    status: "Planned",
    subtitle: "5.1-5.3"
  },
];

// Main Page Component
export default function FoundationsPage() {
  return (
    <main className="topic-page theme-elementary-algebra-foundations lg:px-16">
      <FloatingSymbols symbols={foundationsSymbols} />
      <PageHeader
        eyebrow="Algebra"
        title="Pre-Algebra"
        subtitle="The essential building blocks of algebra: symbolic reasoning, structure, and problem-solving logic."
      />
      {/* Grid for Units */}
      <section className="topic-grid">
        {foundationsTopics.map((topic) => (
          <TopicCard
            key={topic.title}
            href={topic.href}
            title={topic.title}
            Icon={topic.Icon}
            desc={topic.description}
            className={topic.className}
            subtitle={topic.subtitle}
          />
        ))}
      </section>
    </main>
  );
}