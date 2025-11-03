// app/math/algebra/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";

const algebraSymbols = [
  "x²", "y³", "a+b=c", "2x+3=9", "y=mx+b", "ƒ(x)", "aⁿ", "Σx",
  "(x+2)(x−2)=x²−4", "x≠0", "Δy/Δx", "∝", "x→∞", "α+β=γ", "ℕ",
];

// 👇 --- NO LONGER NEEDED --- 👇
// const colorMap: Record<string, { icon: string; underline: string }> = { ... };

export default function AlgebraPage() {
  const topics = [
    {
      title: "Variables",
      desc: "Symbols that stand for numbers — the language of algebraic thought.",
      href: "/math/algebra/variables",
      // 👇 All props removed
    },
    {
      title: "Expressions",
      desc: "Combinations of variables and constants that describe relationships.",
      href: "/math/algebra/expressions",
      // 👇 All props removed
    },
    {
      title: "Equations",
      desc: "Statements showing equality — the heart of solving for the unknown.",
      href: "/math/algebra/equations",
      // 👇 All props removed
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
      // 👇 All props removed
    },
    {
      title: "Relations & Graphs",
      desc: "Transform ordered pairs into visuals and master the vertical line test.",
      href: "/math/algebra/relations",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-8 py-20 text-center">
      {/* ... (backgrounds) ... */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-neutral-950 to-black" />
      <div className="absolute top-0 left-1/2 h-[90vw] w-[90vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 blur-3xl" />

      <FloatingSymbols symbols={algebraSymbols} />

      <PageHeader
        title="Algebra"
        subtitle="Algebra transforms numbers into symbols and rules — allowing us to generalize, manipulate, and discover universal patterns that govern logic itself."
      />

      {/* Topics Grid */}
      <section className="grid w-full max-w-6xl justify-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          // 👇 --- REMOVED colorMap logic --- 👇
          return (
            <TopicCard
              key={topic.href}
              href={topic.href}
              title={topic.title}
              desc={topic.desc}
              // We pass no style, so it will inherit the
              // .theme-algebra colors from the layout.
            />
          );
        })}
      </section>
    </main>
  );
}