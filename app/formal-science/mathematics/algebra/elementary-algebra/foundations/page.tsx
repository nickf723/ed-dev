// app/formal-science/mathematics/algebra/elementary-algebra/foundations/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  SquareX, SquareFunction, Parentheses,
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
    Icon: SquareX,
    description: "Explore number systems, properties, and the order of operations.",
    className: "card-theme-elementary-algebra-foundations",
    status: "In Progress",
    subtitle: ""
  },
  {
    title: "Variables & Expressions",
    href: "/formal-science/mathematics/algebra/elementary-algebra/foundations/variables-expressions",
    Icon: SquareFunction,
    description: "Learn how symbols (variables) are used to represent unknown values.",
    className: "card-theme-elementary-algebra-foundations",
    status: "In Progress",
    subtitle: ""
  },
  {
    title: "Properties of Algebra",
    href: "/formal-science/mathematics/algebra/elementary-algebra/foundations/algebraic-properties",
    Icon: Parentheses,
    description: "The core rules (commutative, associative, distributive) that govern algebra.",
    className: "card-theme-elementary-algebra-foundations",
    status: "In Progress",
    subtitle: ""
  },
];

// Main Page Component
export default function FoundationsPage() {
  return (
    <main className="topic-page theme-elementary-algebra-foundations lg:px-16">
      <FloatingSymbols symbols={foundationsSymbols} />
      <PageHeader
        eyebrow="Elementary Algebra"
        title="Foundations"
        subtitle="The essential building blocks of algebra. Master these concepts, and all of high-level mathematics will become more intuitive."
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