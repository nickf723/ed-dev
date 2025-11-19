// app/formal-science/mathematics/number-theory/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Baby,
  Calculator,
  Network,
  Sigma,
  FlaskConical,
  Brain,
  Flame,
} from "@/components/icons";
import React from "react";

const numTheorySymbols = [
  "p", "q", "\\text{gcd}", "\\text{lcm}", "\\varphi(n)", "a \\equiv b \\pmod{n}", "1", "2", "3", "5", "7", "11",
];

export default function NumberTheoryPage() {
  const tiers = [
    {
      title: "Counting and Primal Structures",
      desc: "Foundational concepts: counting, cardinality, and early operations with natural numbers.",
      href: "/formal-science/mathematics/number-theory/foundations",
      Icon: Baby,
      className: "theme-number-theory",
    },
    {
      title: "Divisibility, Factors, and Properties",
      desc: "The transition from arithmetic to theory: factorization, multiples, and the fundamental properties of operations.",
      href: "/formal-science/mathematics/number-theory/elementary",
      Icon: Calculator,
      className: "theme-number-theory",
    },
    {
      title: "The Integer System & Rationals",
      desc: "The structure of integers, rational numbers, GCF, LCM, and modular thinking (light).",
      href: "/formal-science/mathematics/number-theory/middle-school",
      Icon: Network,
      className: "theme-number-theory",
    },
    {
      title: "Formal Modular Arithmetic",
      desc: "Introduction to modular arithmetic, Diophantine equations, and the existence of irrational numbers.",
      href: "/formal-science/mathematics/number-theory/high-school",
      Icon: Sigma,
      className: "theme-number-theory",
    },
    {
      title: "Congruence, Rings, & Multiplicative NT",
      desc: "Formal algebraic structures of congruence classes, Euler's Totient function, and quadratic reciprocity.",
      href: "/formal-science/mathematics/number-theory/undergraduate",
      Icon: FlaskConical,
      className: "theme-number-theory",
    },
    {
      title: "Analytic and Elliptic Curves",
      desc: "Advanced topics: algebraic number theory, modular forms, and cryptographic foundations.",
      href: "/formal-science/mathematics/number-theory/graduate",
      Icon: Brain,
      className: "theme-number-theory",
    },
    {
      title: "Unsolved Conjectures & Frontiers",
      desc: "Humanity's greatest unanswered number questions: Riemann, Goldbach, Collatz, and more.",
      href: "/formal-science/mathematics/number-theory/frontier",
      Icon: Flame,
      className: "theme-number-theory",
    },
  ];

  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={numTheorySymbols} />
      <PageHeader
        eyebrow="Mathematics"
        title="Number Theory"
        subtitle="The study of integers and their properties. Number theory explores the hidden structures and relationships within the most foundational objects in mathematics."
      />
      <section className="topic-grid">
        {tiers.map((tier) => (
          <TopicCard
            key={tier.href}
            href={tier.href}
            title={tier.title}
            desc={tier.desc}
            Icon={tier.Icon}
            className={tier.className}
          />
        ))}
      </section>
    </main>
  );
}