// app/math/algebra/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";

const algebraSymbols = [
  "x²", "y³", "a+b=c", "2x+3=9", "y=mx+b", "ƒ(x)", "aⁿ", "Σx",
  "(x+2)(x−2)=x²−4", "x≠0", "Δy/Δx", "∝", "x→∞", "α+β=γ", "ℕ",
];

export default function AlgebraPage() {
  const topics = [
    {
      title: "Variables",
      desc: "Symbols that stand for numbers — the language of algebraic thought.",
      href: "/math/algebra/variables",
    },
    {
      title: "Expressions",
      desc: "Combinations of variables and constants that describe relationships.",
      href: "/math/algebra/expressions",
    },
    {
      title: "Equations",
      desc: "Statements showing equality — the heart of solving for the unknown.",
      href: "/math/algebra/equations",
    },
    {
      title: "Inequalities",
      desc: "Comparisons using <, >, ≤, or ≥ — discover solution sets on number lines.",
      href: "/math/algebra/inequalities",
    },
    {
      title: "Functions",
      desc: "Rules linking input and output — the engine of algebraic models.",
      href: "/math/algebra/functions",
    },
    {
      title: "Relations & Graphs",
      desc: "Transform ordered pairs into visuals and master the vertical line test.",
      href: "/math/algebra/relations",
    },
  ];

  return (
      <main className="topic-page theme-algebra lg:px-16">
      <FloatingSymbols symbols={algebraSymbols} />

      <PageHeader
        eyebrow="Branch Overview"
        title="Algebra"
        subtitle="Algebra transforms numbers into symbols and rules — allowing us to generalize, manipulate, and discover universal patterns that govern logic itself."
      />
      <section className="topic-grid">
        {topics.map((topic) => (
          <TopicCard
            key={topic.href}
            href={topic.href}
            title={topic.title}
            desc={topic.desc}
          />
        ))}
      </section>
      </main>
  );
}