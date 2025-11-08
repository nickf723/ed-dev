// app/formal-science/mathematics/algebra/elementary-algebra/foundations/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Calculator,
  FunctionSquare,
  Sparkles,
  Shuffle,
} from "@/components/icons";
import React from "react";

// Symbols for the background
const foundationsSymbols = [
  "1",
  "2",
  "3",
  "x",
  "y",
  "+",
  "-",
  "=",
  "()",
  "[]",
  "{}",
];

// Data for the unit cards
const foundationsTopics = [
  {
    title: "Numbers and Operations",
    href: "/formal-science/mathematics/algebra/elementary-algebra/foundations/num-ops",
    Icon: Calculator,
    description: "Explore number systems, properties, and the order of operations.",
    className: "theme-elementary-algebra-foundations",
    status: "In Progress",
  },
  {
    title: "Variables & Expressions",
    href: "#",
    Icon: FunctionSquare,
    description: "Learn how symbols (variables) are used to represent unknown values.",
    className: "theme-foundations",
    status: "Planned",
  },
  {
    title: "Properties of Algebra",
    href: "#",
    Icon: Shuffle,
    description: "The core rules (commutative, associative, distributive) that govern algebra.",
    className: "theme-foundations",
    status: "Planned",
  },
];

// Main Page Component
export default function FoundationsPage() {
  return (
    <main className="topic-page theme-foundations lg:px-16">
      <FloatingSymbols symbols={foundationsSymbols} />
      <PageHeader
        eyebrow="Elementary Algebra"
        title="Foundations"
        subtitle="The essential building blocks of algebra. Master these concepts, and all of high-level mathematics will become more intuitive."
      />

      <section className="topic-grid">
        {foundationsTopics.map((topic) => (
          <TopicCard
            key={topic.href}
            href={topic.href}
            title={topic.title}
            Icon={topic.Icon}
            desc={topic.description}
            className={topic.className}
          />
        ))}
      </section>
    </main>
  );
}