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
    title: "Variables & Expressions (1.1-1.3)",
    href: "/formal-science/mathematics/algebra/pre-algebra/variables-expressions",
    Icon: SquareFunction,
    description: "Learn how symbols (variables) are used to represent unknown values.",
    className: "theme-elementary-algebra-foundations",
    status: "In Progress",
    subtitle: "Unit 1"
  },
  {
    title: "Ratios, Rates & Proportions (2.1-2.3)",
    href: "/formal-science/mathematics/algebra/pre-algebra/ratios-rates-proportions",
    Icon: Percent,
    description: "Using algebraic relationships to compare quantities and solve for unknowns.",
    className: "theme-elementary-algebra-foundations",
    status: "Planned",
    subtitle: "Unit 2"
  },
  {
    title: "Equations & Inequalities (3.1-3.3)",
    href: "/formal-science/mathematics/algebra/pre-algebra/equations-inequalities",
    Icon: Equal,
    description: "Using inverse operations to find the value of a variable.",
    className: "theme-elementary-algebra-foundations",
    status: "Planned",
    subtitle: "Unit 3"
  },
  {
    title: "Linear Reasoning Foundations (4.1-4.3)",
    href: "/formal-science/mathematics/algebra/pre-algebra/linear-reasoning",
    Icon: LineChart,
    description: "Finding rules in patterns and plotting relationships on a graph.",
    className: "theme-elementary-algebra-foundations",
    status: "Planned",
    subtitle: "Unit 4"
  },
  {
    title: "Structure, Logic & Problem Solving (5.1-5.3)",
    href: "/formal-science/mathematics/algebra/pre-algebra/structure-logic",
    Icon: Puzzle,
    description: "The reasoning habits and problem-solving strategies for algebra.",
    className: "theme-elementary-algebra-foundations",
    status: "Planned",
    subtitle: "Unit 5"
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