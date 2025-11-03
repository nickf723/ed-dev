// app/math/page.tsx
"use client";
import React from "react";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";

const mathSymbols = [
  "π", "∞", "√", "∑", "Σ", "Δ", "θ", "φ", "Ω", "λ", "μ", "γ", "x²+y²=z²",
  "∫ f(x) dx", "E=mc²", "P(A|B)", "ℝ", "∂/∂t", "∇·F", "e^{iπ}+1=0",
  "f′(x)", "y=mx+b", "sinθ", "log₁₀x", "F=ma", "P=2πr", "ℕ⊂ℤ⊂ℚ⊂ℝ⊂ℂ",
  "∀x∈ℝ", "∴", "∃", "∈",
];

// 👇 --- NO LONGER NEEDED --- 👇
// const colorMap: Record<string, { icon: string; underline: string }> = { ... };

export default function MathPage() {
  const branches = [
    {
      title: "Algebra",
      desc: "The language of patterns and equations — where symbols reveal logic.",
      href: "/math/algebra",
      // 👇 style prop added to show evolving theme
      style: {
        "--card-gradient-start": "var(--color-text-title, #c084fc)", // purple-400
        "--card-gradient-end": "var(--color-text-header, #e879f9)", // fuchsia-400
        "--card-icon-hover": "var(--color-text-icon, #f0abfc)", // fuchsia-300
        "--card-underline": "var(--color-text-header, #e879f9)", // fuchsia-400
      }
    },
    {
      title: "Geometry",
      desc: "Understanding shape, space, and proportion — mathematics made visual.",
      href: "/math/geometry",
      // 👇 style prop added to show evolving theme
      style: {
        "--card-gradient-start": "#a5b4fc", // indigo-300
        "--card-gradient-end": "#818cf8", // indigo-400
        "--card-icon-hover": "#c7d2fe", // indigo-200
        "--card-underline": "#818cf8", // indigo-400
      }
    },
    {
      title: "Calculus",
      desc: "Exploring motion and change — the mathematics of the universe’s flow.",
      href: "/math/calculus",
      // 👇 All cards will just inherit the page theme (red/orange)
    },
    {
      title: "Statistics",
      desc: "Finding truth in data — probability, inference, and real-world meaning.",
      href: "/math/statistics",
      // 👇 style prop added to show evolving theme
      style: {
        "--card-gradient-start": "#f9a8d4", // pink-300
        "--card-gradient-end": "#f472b6", // pink-400
        "--card-icon-hover": "#fbcfe8", // pink-200
        "--card-underline": "#f472b6", // pink-400
      }
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-8 py-20 text-center">
      {/* ... (backgrounds) ... */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-neutral-950 to-black" />
      <div className="absolute top-0 left-1/2 h-[90vw] w-[90vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 to-pink-500/5 blur-3xl" />

      <FloatingSymbols symbols={mathSymbols} />

      <PageHeader
        title="Mathematics"
        subtitle="Mathematics is the art of reasoning about structure, quantity, and space — the foundation of every system. Dive into its branches below to explore the logic behind the universe."
      />

      {/* Branch Cards */}
      <section className="grid w-full max-w-6xl justify-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch) => {
          // 👇 --- REMOVED colorMap logic --- 👇
            return (
              <TopicCard
              key={branch.href}
              href={branch.href}
              title={branch.title}
              desc={branch.desc}
              style={branch.style as unknown as React.CSSProperties}
              />
            );
        })}
      </section>
    </main>
  );
}