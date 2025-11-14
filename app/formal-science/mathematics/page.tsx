// app/formal-science/mathematics/page.tsx
"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";
import { Tangent, Spline, SquarePlus, Variable, Dices, Shapes, X } from "lucide-react";

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
      href: "/formal-science/mathematics/algebra",
      Icon: Variable,
      className: "theme-algebra",
      subtitle: ""
    },
    {
      title: "Geometry and Trigonometry",
      desc: "Understanding shape, space, and proportion — mathematics made visual.",
      href: "/formal-science/mathematics/geometry",
      Icon: Shapes,
      className: "theme-geometry topic-card-wide",
      subtitle: ""
    },
    {
      title: "Calculus",
      desc: "Exploring motion and change — the mathematics of the universe’s flow.",
      href: "/formal-science/mathematics/calculus",
      Icon: Tangent,
      className: "theme-calculus",
      subtitle: ""
    },
    {
      title: "Statistics and Probability",
      desc: "Finding truth in data — probability, inference, and real-world meaning.",
      href: "/formal-science/mathematics/statistics",
      Icon: Dices,
      className: "theme-statistics topic-card-wide",
      subtitle: ""
    },
    {
      title: "Number Theory",
      desc: "Numbers and their hidden properties — the purest form of mathematical thought.",
      href: "/formal-science/mathematics/number-theory",
      Icon: SquarePlus,
      className: "theme-number-theory",
      subtitle: "",
      // --- REMOVED UNITS, as this now links to the main Tier page ---
    },
    {
      title: "Discrete Mathematics",
      desc: "The study of countable structures — essential for computer science and combinatorics.",
      href: "/formal-science/mathematics/discrete-mathematics",
      Icon: Spline,
      className: "theme-discrete-math",
      subtitle: ""
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
            className={branch.className}
            Icon={branch.Icon}
            subtitle={branch.subtitle}
            //units={branch.units as any}
          />
        ))}
      </section>
    </main>
  );
}