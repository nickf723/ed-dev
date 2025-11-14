// app/formal-science/mathematics/number-theory/tier-3-high-school/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import { Sigma, Equal, Atom, SquareRadical, Tally5 } from "@/components/icons";
import React from "react";

const symbols = ["a ≡ b (mod n)", "√2", "p, p+2", "2^p - 1", "f(n)"];

const topics = [
  {
    title: "Modular Arithmetic (Formal) (3.1)",
    href: "/formal-science/mathematics/number-theory/tier-3-high-school/modular-arithmetic-formal",
    Icon: Sigma,
    desc: "Congruence notation, residue classes, and modular operations.",
    className: "theme-number-theory",
  },
  {
    title: "Diophantine Equations (3.2)",
    href: "/formal-science/mathematics/number-theory/tier-3-high-school/diophantine-equations",
    Icon: Equal,
    desc: "Finding integer solutions to linear Diophantine equations.",
    className: "theme-number-theory",
  },
  {
    title: "Advanced Prime Topics (3.3)",
    href: "/formal-science/mathematics/number-theory/tier-3-high-school/advanced-prime-topics",
    Icon: Atom,
    desc: "Distribution of primes, twin primes, Mersenne primes, and Fermat primes.",
    className: "theme-number-theory",
  },
  {
    title: "Irrational Numbers (3.4)",
    href: "/formal-science/mathematics/number-theory/tier-3-high-school/irrational-numbers",
    Icon: SquareRadical,
    desc: "Proof that √2 is irrational and properties of non-repeating decimals.",
    className: "theme-number-theory",
  },
  {
    title: "Counting & Combinatorics (3.5)",
    href: "/formal-science/mathematics/number-theory/tier-3-high-school/counting-combinatorics",
    Icon: Tally5,
    desc: "Binomial coefficients, Pascal’s Triangle, and recurrence relations.",
    className: "theme-number-theory",
  },
];

export default function Tier3Page() {
  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={symbols} />
      <PageHeader
        eyebrow="Number Theory"
        title="Tier 3: High School Number Theory"
        subtitle="Where number theory becomes its own subject, exploring modular arithmetic, Diophantine equations, and irrationals."
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