// app/formal-science/mathematics/number-theory/tier-2-middle/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import { Minus, SquareDivide, TreeDeciduous, AlarmSmoke, Percent } from "@/components/icons";
import React from "react";

const symbols = ["-1", "-5", "1/2", "3/4", "GCF", "LCM", "a/b", "p1*p2"];

const topics = [
  {
    title: "Integer System (2.1)",
    href: "/formal-science/mathematics/number-theory/tier-2-middle/integer-system",
    Icon: Minus,
    desc: "Negative numbers, absolute value, opposites, and integer operations.",
    className: "theme-number-theory",
  },
  {
    title: "Rational Number Structure (2.2)",
    href: "/formal-science/mathematics/number-theory/tier-2-middle/rational-number-structure",
    Icon: SquareDivide,
    desc: "Equivalent fractions, simplest form, and the density of rationals.",
    className: "theme-number-theory",
  },
  {
    title: "Prime Factorization (2.3)",
    href: "/formal-science/mathematics/number-theory/tier-2-middle/prime-factorization",
    Icon: TreeDeciduous,
    desc: "Fundamental Theorem of Arithmetic, GCF & LCM via factorization.",
    className: "theme-number-theory",
  },
  {
    title: "Modular Thinking (Light) (2.4)",
    href: "/formal-science/mathematics/number-theory/tier-2-middle/modular-thinking-light",
    Icon: AlarmSmoke,
    desc: "Meaning of congruence, clock arithmetic, and remainder classes.",
    className: "theme-number-theory",
  },
  {
    title: "Proportional Number Structures (2.5)",
    href: "/formal-science/mathematics/number-theory/tier-2-middle/proportional-number-structures",
    Icon: Percent,
    desc: "Structural relationships of ratios, rates, and proportions.",
    className: "theme-number-theory",
  },
];

export default function Tier2Page() {
  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={symbols} />
      <PageHeader
        eyebrow="Number Theory"
        title="Tier 2: Middle School Number Theory"
        subtitle="The classic 'prealgebra' number theory: integers, rationals, and prime factorization."
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