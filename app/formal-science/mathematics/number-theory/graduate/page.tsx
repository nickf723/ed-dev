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
    title: "Algebraic Number Theory",
    href: "/formal-science/mathematics/number-theory/graduate/algebraic-number-theory",
    Icon: Brain,
    desc: "Number fields, rings of integers, and ideal theory.",
    className: "theme-number-theory",
  },
  {
    title: "Analytic Number Theory",
    href: "/formal-science/mathematics/number-theory/graduate/analytic-number-theory",
    Icon: Spline,
    desc: "Zeta functions, Dirichlet characters, and L-functions.",
    className: "theme-number-theory",
  },
  {
    title: "Modular Forms",
    href: "/formal-science/mathematics/number-theory/graduate/modular-forms",
    Icon: Network,
    desc: "Fourier expansions, Hecke operators, and modular curves.",
    className: "theme-number-theory",
  },
  {
    title: "Elliptic Curves",
    href: "/formal-science/mathematics/number-theory/graduate/elliptic-curves",
    Icon: Waypoints,
    desc: "Group law, rational points, and torsion structure.",
    className: "theme-number-theory",
  },
  {
    title: "Cryptographic Foundations",
    href: "/formal-science/mathematics/number-theory/graduate/cryptographic-foundations",
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
        title="Graduate Number Theory"
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