// app/formal-science/mathematics/number-theory/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Calculator,
  SquarePlus
} from "@/components/icons";
import React from "react";

// Symbols for the background
const numTheorySymbols = [
  "p", "q", "gcd", "lcm", "φ(n)", "a ≡ b (mod n)", "1", "2", "3", "5", "7", "11",
];

// Data for the branches
const numberTheoryBranches = [
  {
    title: "Arithmetic",
    href: "/formal-science/mathematics/number-theory/arithmetic",
    Icon: Calculator,
    difficulty: "Foundational",
    description:
      "The foundational study of numbers and the basic operations that combine them.",
    units: [
      {
        name: "Number Systems & Operations",
        href: "/formal-science/mathematics/number-theory/arithmetic/num-ops",
        status: "In Progress",
      },
    ],
    className: "theme-number-theory",
    subtitle: "1 2 3 + - × ÷",
  },
  // Add more Number Theory topics here in the future
];

// Main Page Component
export default function NumberTheoryPage() {
  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={numTheorySymbols} />
      <PageHeader
        eyebrow="Mathematics"
        title="Number Theory"
        subtitle="The study of integers and their properties. Number theory explores the hidden structures and relationships within the most foundational objects in mathematics."
      />

      <section className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
        {numberTheoryBranches.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            Icon={branch.Icon}
            desc={branch.description}
            difficulty={branch.difficulty}
            units={branch.units as any}
            className={branch.className}
            subtitle={branch.subtitle}
          />
        ))}
      </section>
    </main>
  );
}