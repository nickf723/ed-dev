// app/formal-science/mathematics/number-theory/tier-4-undergraduate/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import { GitMerge, Network, Sigma, Waves } from "@/components/icons";
import React from "react";

const symbols = ["φ(n)", "μ(n)", "σ(n)", "(a/p)", "ℤ/nℤ", "a|b"];

const topics = [
  {
    title: "Euclidean Structure (4.1)",
    href: "/formal-science/mathematics/number-theory/tier-4-undergraduate/euclidean-structure",
    Icon: GitMerge,
    desc: "Euclidean algorithm, Bézout’s identity, and modular inverses.",
    className: "theme-number-theory",
  },
  {
    title: "Congruence Classes Algebra (4.2)",
    href: "/formal-science/mathematics/number-theory/tier-4-undergraduate/congruence-classes-algebra",
    Icon: Network,
    desc: "Rings ℤ/nℤ, group structures, units, and zero divisors.",
    className: "theme-number-theory",
  },
  {
    title: "Multiplicative Number Theory (4.3)",
    href: "/formal-science/mathematics/number-theory/tier-4-undergraduate/multiplicative-number-theory",
    Icon: Sigma,
    desc: "Euler’s totient (φ), Möbius (μ), and Divisor (σ) functions.",
    className: "theme-number-theory",
  },
  {
    title: "Quadratic Residues (4.4)",
    href: "/formal-science/mathematics/number-theory/tier-4-undergraduate/quadratic-residues",
    Icon: Waves,
    desc: "Legendre symbol and an introduction to quadratic reciprocity.",
    className: "theme-number-theory",
  },
  {
    title: "Prime Distribution Theory (4.5)",
    href: "/formal-science/mathematics/number-theory/tier-4-undergraduate/prime-distribution-theory",
    Icon: Waves,
    desc: "Informal statement of the Prime Number Theorem and Chebyshev functions.",
    className: "theme-number-theory",
  },
];

export default function Tier4Page() {
  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={symbols} />
      <PageHeader
        eyebrow="Number Theory"
        title="Tier 4: Undergraduate Number Theory"
        subtitle="Formal number theory as taught in math majors, focusing on algebraic structures and multiplicative functions."
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