// app/formal-science/mathematics/number-theory/tier-5-graduate/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import { Brain, Network, Spline, Waypoints, Lock } from "@/components/icons";
import React from "react";

const symbols = ["ζ(s)", "L(s, χ)", "E(τ)", "y²=x³+Ax+B", "RSA"];

const topics = [
  {
    title: "Algebraic Number Theory (5.1)",
    href: "/formal-science/mathematics/number-theory/tier-5-graduate/algebraic-number-theory",
    Icon: Brain,
    desc: "Number fields, rings of integers, and ideal theory.",
    className: "theme-number-theory",
  },
  {
    title: "Analytic Number Theory (5.2)",
    href: "/formal-science/mathematics/number-theory/tier-5-graduate/analytic-number-theory",
    Icon: Spline,
    desc: "Zeta functions, Dirichlet characters, and L-functions.",
    className: "theme-number-theory",
  },
  {
    title: "Modular Forms (5.3)",
    href: "/formal-science/mathematics/number-theory/tier-5-graduate/modular-forms",
    Icon: Network,
    desc: "Fourier expansions, Hecke operators, and modular curves.",
    className: "theme-number-theory",
  },
  {
    title: "Elliptic Curves (5.4)",
    href: "/formal-science/mathematics/number-theory/tier-5-graduate/elliptic-curves",
    Icon: Waypoints,
    desc: "Group law, rational points, and torsion structure.",
    className: "theme-number-theory",
  },
  {
    title: "Cryptographic Foundations (5.5)",
    href: "/formal-science/mathematics/number-theory/tier-5-graduate/cryptographic-foundations",
    Icon: Lock,
    desc: "RSA, Diffie-Hellman, discrete logarithms, and primality testing.",
    className: "theme-number-theory",
  },
];

export default function Tier5Page() {
  return (
    <main className="topic-page theme-number-theory lg:px-16">
      <FloatingSymbols symbols={symbols} />
      <PageHeader
        eyebrow="Number Theory"
        title="Tier 5: Graduate Number Theory"
        subtitle="Deep structure: algebraic & analytic number theory, modular forms, and elliptic curves."
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