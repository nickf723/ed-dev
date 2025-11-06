// app/formal-science/mathematics/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";

const mathSymbols = [
  "π", "∞", "√", "∑", "Δ", "θ", "φ", "Ω", "λ", "a²+b²=c²",
  "∫ f(x) dx", "E=mc²", "P(A|B)", "ℝ", "∂/∂t", "∇·F", "e^{iπ}+1=0",
  "f′(x)", "y=mx+b", "sinθ", "cosθ", "tanθ", "secθ", "cscθ", "cotθ", "log₁₀x", "F=ma", "P=2πr", "ℕ⊂ℤ⊂ℚ⊂ℝ⊂ℂ",
  "∀x∈ℝ", "∴", "∃", "∈", "∉", "⊆", "∪", "∩",
];

export default function MathPage() {
  const branches = [
    {
      title: "Algebra",
      desc: "The language of patterns and equations — where symbols reveal logic.",
      href: "/formal-science/mathematics/algebra", // 👈 Updated link
    },
    {
      title: "Geometry",
      desc: "Understanding shape, space, and proportion — mathematics made visual.",
      href: "/formal-science/mathematics/geometry", // 👈 Updated link
    },
    {
      title: "Calculus",
      desc: "Exploring motion and change — the mathematics of the universe’s flow.",
      href: "/formal-science/mathematics/calculus", // 👈 Updated link
    },
    {
      title: "Statistics",
      desc: "Finding truth in data — probability, inference, and real-world meaning.",
      href: "/formal-science/mathematics/statistics", // 👈 Updated link
    },
    {
      title: "Number Theory",
      desc: "Numbers and their hidden properties — the purest form of mathematical thought.",
      href: "/formal-science/mathematics/number-theory", // 👈 Updated link
    },
    {
      title: "Discrete Mathematics",
      desc: "The study of countable structures — essential for computer science and combinatorics.",
      href: "/formal-science/mathematics/discrete-mathematics", // 👈 Updated link
    },
  ];

  return (
    <main className="topic-page theme-math lg:px-16">
      <FloatingSymbols symbols={mathSymbols} />
      <PageHeader
        eyebrow="Discipline Overview"
        title="Mathematics"
        subtitle="Mathematics is the art of reasoning about structure, quantity, and space — the foundation of every system. Dive into its branches below to explore the logic behind the universe."
      />
      <section className="topic-grid">
        {branches.map((branch) => (
          <TopicCard
            key={branch.href}
            href={branch.href}
            title={branch.title}
            desc={branch.desc}
          />
        ))}
      </section>
    </main>
  );
}