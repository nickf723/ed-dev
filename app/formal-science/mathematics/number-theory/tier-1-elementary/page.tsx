// app/formal-science/mathematics/number-theory/tier-1-elementary/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import { Calculator, Parentheses, SquareX, Waves, Spline } from "@/components/icons";
import React from "react";

const symbols = ["12", "7", "19", "2x3=6", "F", "M", "Prime", "Odd", "Even"];

const topics = [
  {
    title: "Whole Number Arithmetic (1.1)",
    href: "/formal-science/mathematics/number-theory/tier-1-elementary/whole-number-arithmetic",
    Icon: Calculator,
    desc: "Addition, subtraction, multiplication, and division.",
    className: "theme-number-theory",
  },
  {
    title: "Properties of Operations (1.2)",
    href: "/formal-science/mathematics/number-theory/tier-1-elementary/properties-of-operations",
    Icon: Parentheses,
    desc: "Commutative, Associative, Identity, and Distributive properties.",
    className: "theme-number-theory",
  },
  {
    title: "Factors & Multiples (1.3)",
    href: "/formal-science/mathematics/number-theory/tier-1-elementary/factors-multiples",
    Icon: SquareX,
    desc: "Factor pairs, multiples, even/odd, and prime vs. composite.",
    className: "theme-number-theory",
  },
  {
    title: "Divisibility (1.4)",
    href: "/formal-science/mathematics/number-theory/tier-1-elementary/divisibility",
    Icon: Waves,
    desc: "Divisibility rules, remainders, and divisors on number lines.",
    className: "theme-number-theory",
  },
  {
    title: "Patterns & Sequences (1.5)",
    href: "/formal-science/mathematics/number-theory/tier-1-elementary/patterns-sequences",
    Icon: Spline,
    desc: "Skip counting, square numbers, triangular numbers, and repeating patterns.",
    className: "theme-number-theory",
  },
];

export default function Tier1Page() {
  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={symbols} />
      <PageHeader
        eyebrow="Number Theory"
        title="Tier 1: Elementary Number Theory"
        subtitle="Where arithmetic becomes structured reasoning about numbers."
      />
      <section className="topic-grid">
        {topics.map((topic) => (
          <TopicCard
            key={topic.href}
            href={topic.href}
            title={topic.title}
            desc={topic.desc}
            Icon={topic.Icon}
            className={topic.className}
          />
        ))}
      </section>
    </main>
  );
}