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

// Helper map for colors
const colorMap: Record<string, { icon: string; underline: string }> = {
  "from-cyan-400 to-blue-500": {
    icon: "group-hover:text-cyan-400",
    underline: "bg-cyan-400",
  },
  "from-indigo-400 to-purple-500": {
    icon: "group-hover:text-indigo-400",
    underline: "bg-indigo-400",
  },
  "from-amber-400 to-orange-500": {
    icon: "group-hover:text-amber-400",
    underline: "bg-amber-400",
  },
  "from-pink-400 to-rose-500": {
    icon: "group-hover:text-pink-400",
    underline: "bg-pink-400",
  },
};

export default function MathPage() {
  const branches = [
    {
      title: "Algebra",
      desc: "The language of patterns and equations — where symbols reveal logic.",
      href: "/math/algebra",
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Geometry",
      desc: "Understanding shape, space, and proportion — mathematics made visual.",
      href: "/math/geometry",
      color: "from-indigo-400 to-purple-500",
    },
    {
      title: "Calculus",
      desc: "Exploring motion and change — the mathematics of the universe’s flow.",
      href: "/math/calculus",
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "Statistics",
      desc: "Finding truth in data — probability, inference, and real-world meaning.",
      href: "/math/statistics",
      color: "from-pink-400 to-rose-500",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-8 py-20 text-center">
      {/* Backgrounds */}
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
          const colors =
            colorMap[branch.color] ||
            colorMap["from-cyan-400 to-blue-500"];
          return (
            <TopicCard
              key={branch.href}
              href={branch.href}
              title={branch.title}
              desc={branch.desc}
              gradient={branch.color}
              iconHoverColor={colors.icon}
              underlineColor={colors.underline}
            />
          );
        })}
      </section>
    </main>
  );
}