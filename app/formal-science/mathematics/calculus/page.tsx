// app/formal-science/mathematics/calculus/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import {
  Diff,
  Sigma,
  Network,
  RotateCw,
} from "@/components/icons";
import React from "react";

const calculusSymbols = [
  "\\int", "\\frac{dy}{dx}", "\\lim_{h\\to 0}", "\\partial", "\\infty", "e", "\\nabla", "f'(x)",
];

const branches = [
  {
    title: "Differential Calculus",
    desc: "The study of instantaneous rates of change and slopes of curves (derivatives).",
    href: "/formal-science/mathematics/calculus/differential-calculus",
    Icon: Diff,
    className: "theme-calculus",
  },
  {
    title: "Integral Calculus",
    desc: "The study of accumulation, areas under curves, and total change (integrals).",
    href: "/formal-science/mathematics/calculus/integral-calculus",
    Icon: Sigma,
    className: "theme-calculus",
  },
  {
    title: "Multivariable Calculus",
    desc: "Extending calculus to three (or more) dimensions, involving partial derivatives and multiple integrals.",
    href: "/formal-science/mathematics/calculus/multivariable-calculus",
    Icon: Network,
    className: "theme-calculus",
  },
  {
    title: "Differential Equations",
    desc: "Equations that relate a function to its derivatives; essential for modeling natural processes.",
    href: "/formal-science/mathematics/calculus/differential-equations",
    Icon: RotateCw,
    className: "theme-calculus",
  },
];

export default function CalculusPage() {
  return (
    <main className="topic-page theme-calculus lg:px-16">
      <FloatingSymbols symbols={calculusSymbols} />
      <PageHeader
        eyebrow="Mathematics"
        title="Calculus"
        subtitle="The mathematics of change and motion, developed to solve problems where quantities are dynamically evolving. It is the core tool of modern physics and engineering."
      />
      <section className="topic-grid">
        {branches.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            desc={branch.desc}
            Icon={branch.Icon}
            className={branch.className}
          />
        ))}
      </section>
    </main>
  );
}