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
  "p", "q", "gcd", "lcm", "φ(n)", "a ≡ b (mod n)", "1", "2", "3", "5", "7", "11",
];

export default function NumberTheoryPage() {
  const tiers = [
    {
      title: "Pre-NT Foundations",
      desc: "The raw ingredients: counting, cardinality, and early operations.",
      href: "/formal-science/mathematics/number-theory/foundations",
      Icon: Baby,
      className: "theme-number-theory",
    },
    {
      title: "Elementary NT",
      desc: "Where arithmetic becomes structured reasoning: factors, primes, and properties.",
      href: "/formal-science/mathematics/number-theory/elementary",
      Icon: Calculator,
      className: "theme-number-theory",
    },
    {
      title: "Middle School NT",
      desc: "The classic 'prealgebra' number theory: integers, rationals, and prime factorization.",
      href: "/formal-science/mathematics/number-theory/middle-school",
      Icon: Network,
      className: "theme-number-theory topic-card-wide",
    },
    {
      title: "High School NT",
      desc: "Number theory as its own subject: modular arithmetic, Diophantine equations, and irrationals.",
      href: "/formal-science/mathematics/number-theory/high-school",
      Icon: Sigma,
      className: "theme-number-theory topic-card-wide",
    },
    {
      title: "Undergraduate NT",
      desc: "Formal number theory for math majors: Euclidean algorithm, quadratic residues, and rings.",
      href: "/formal-science/mathematics/number-theory/undergraduate",
      Icon: FlaskConical,
      className: "theme-number-theory",
    },
    {
      title: "Graduate NT",
      desc: "Deep structure: algebraic & analytic number theory, modular forms, and elliptic curves.",
      href: "/formal-science/mathematics/number-theory/graduate",
      Icon: Brain,
      className: "theme-number-theory",
    },
    {
      title: "Frontier Problems",
      desc: "Humanity's greatest unanswered number questions: Riemann, Goldbach, Collatz, and more.",
      href: "/formal-science/mathematics/number-theory/frontier",
      Icon: Flame,
      className: "theme-number-theory topic-card-wide",
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