// app/math/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";

const mathSymbols = [
  "π", "∞", "√", "∑", "Σ", "Δ", "θ", "φ", "Ω", "λ", "μ", "γ", "x²+y²=z²",
  "∫ f(x) dx", "E=mc²", "P(A|B)", "ℝ", "∂/∂t", "∇·F", "e^{iπ}+1=0",
  "f′(x)", "y=mx+b", "sinθ", "log₁₀x", "F=ma", "P=2πr", "ℕ⊂ℤ⊂ℚ⊂ℝ⊂ℂ",
  "∀x∈ℝ", "∴", "∃", "∈",
];

export default function MathPage() {
  const branches = [
    {
      title: "Algebra",
      desc: "The language of patterns and equations — where symbols reveal logic.",
      href: "/math/algebra",    
    },
    {
      title: "Geometry",
      desc: "Understanding shape, space, and proportion — mathematics made visual.",
      href: "/math/geometry",
    },
    {
      title: "Calculus",
      desc: "Exploring motion and change — the mathematics of the universe’s flow.",
      href: "/math/calculus",
    },
    {
      title: "Statistics",
      desc: "Finding truth in data — probability, inference, and real-world meaning.",
      href: "/math/statistics",
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