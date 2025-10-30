"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import TopicCard from "@/components/TopicCard";

const algebraSymbols = [
  "x²", "y³", "a+b=c", "2x+3=9", "y=mx+b", "ƒ(x)", "aⁿ", "Σx",
  "(x+2)(x−2)=x²−4", "x≠0", "Δy/Δx", "∝", "x→∞", "α+β=γ", "ℕ",
];

// Helper map for colors
const colorMap: Record<string, { icon: string; underline: string }> = {
  "from-cyan-400 to-blue-400": {
    icon: "group-hover:text-cyan-400",
    underline: "bg-cyan-400",
  },
  "from-blue-400 to-indigo-400": {
    icon: "group-hover:text-blue-400",
    underline: "bg-blue-400",
  },
  "from-indigo-400 to-purple-400": {
    icon: "group-hover:text-indigo-400",
    underline: "bg-indigo-400",
  },
  "from-purple-400 to-pink-400": {
    icon: "group-hover:text-purple-400",
    underline: "bg-purple-400",
  },
};

export default function AlgebraPage() {
  const topics = [
    {
      title: "Variables",
      desc: "Symbols that stand for numbers — the language of algebraic thought.",
      href: "/math/algebra/variables",
      color: "from-cyan-400 to-blue-400",
    },
    {
      title: "Expressions",
      desc: "Combinations of variables and constants that describe relationships.",
      href: "/math/algebra/expressions",
      color: "from-blue-400 to-indigo-400",
    },
    {
      title: "Equations",
      desc: "Statements showing equality — the heart of solving for the unknown.",
      href: "/math/algebra/equations",
      color: "from-indigo-400 to-purple-400",
    },
    {
      title: "Functions",
      desc: "Rules linking input and output — the engine of algebraic models.",
      href: "/math/algebra/functions",
      color: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-8 py-20 text-center">
      {/* Background glow */}
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
          const colors =
            colorMap[topic.color] ||
            colorMap["from-cyan-400 to-blue-400"];
          return (
            <TopicCard
              key={topic.href}
              href={topic.href}
              title={topic.title}
              desc={topic.desc}
              gradient={topic.color}
              iconHoverColor={colors.icon}
              underlineColor={colors.underline}
            />
          );
        })}
      </section>
    </main>
  );
}