// app/formal-science/mathematics/number-theory/tier-6-frontier/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import { Flame, HelpCircle, Sigma, Network } from "@/components/icons";
import React from "react";

const symbols = ["ζ(1/2 + it)", "p+q=2n", "3n+1", "P vs NP", "?"];

const topics = [
  {
    title: "Prime-Related Problems",
    href: "/formal-science/mathematics/number-theory/frontier/prime-problems",
    Icon: Flame,
    desc: "Riemann Hypothesis, Goldbach’s Conjecture, Twin Prime Conjecture.",
    className: "theme-number-theory",
  },
  {
    title: "Integer & Diophantine Mysteries",
    href: "/formal-science/mathematics/number-theory/frontier/integer-mysteries",
    Icon: HelpCircle,
    desc: "Collatz Conjecture, Perfect Cuboid Problem, Erdős–Straus Conjecture.",
    className: "theme-number-theory",
  },
  {
    title: "Combinatorial & Additive NT",
    href: "/formal-science/mathematics/number-theory/frontier/combinatorial-additive",
    Icon: Sigma,
    desc: "Erdős Distinct Distances Problem, Sumset problems, Partition function.",
    className: "theme-number-theory",
  },
  {
    title: "Computational Complexity",
    href: "/formal-science/mathematics/number-theory/frontier/computational-complexity",
    Icon: Network,
    desc: "P vs NP, integer factorization, and the link between primes and randomness.",
    className: "theme-number-theory",
  },
];

export default function Tier6Page() {
  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={symbols} />
      <PageHeader
        eyebrow="Number Theory"
        title="Frontier & Unsolved Problems"
        subtitle="Humanity’s greatest unanswered number questions. These problems define the future of mathematics."
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