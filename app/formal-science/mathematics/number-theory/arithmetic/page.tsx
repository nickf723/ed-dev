// app/formal-science/mathematics/number-theory/arithmetic/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  SquareX,
} from "@/components/icons";
import React from "react";

// Symbols for the background
const arithmeticSymbols = [
  "1", "2", "3", "x", "y", "+", "-", "=", "()", "[]", "{}", "1/2", "0.5"
];

// Data for the unit cards
const arithmeticTopics = [
  {
    title: "Numbers & Operations",
    href: "/formal-science/mathematics/number-theory/arithmetic/num-ops",
    Icon: SquareX,
    description: "Explore number systems, properties, and the order of operations.",
    className: "theme-number-theory", // Use number theory theme
    status: "In Progress",
    subtitle: ""
  },
  // Future topics like "Prime Factorization" could go here
];

// Main Page Component
export default function ArithmeticPage() {
  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={arithmeticSymbols} />
      <PageHeader
        eyebrow="Number Theory"
        title="Arithmetic"
        subtitle="The foundational study of numbers and the basic operations: addition, subtraction, multiplication, and division."
      />
      {/* Grid for Units */}
      <section className="topic-grid">
        {arithmeticTopics.map((topic) => (
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