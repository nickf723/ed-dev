"use client";

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
    <main className="relative min-h-screen px-8 py-20 flex flex-col items-center text-center overflow-hidden">
      {/* Background gradient orbits */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-neutral-950 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] rounded-full bg-gradient-to-tr from-cyan-500/10 to-pink-500/5 blur-3xl" />

      {/* Header Section */}
      <section className="max-w-3xl mb-16">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Mathematics
        </h1>
        <p className="text-neutral-300 text-lg leading-relaxed">
          Mathematics is the art of reasoning about structure, quantity, and
          space — the foundation of every system. Dive into its branches below
          to explore the logic behind the universe.
        </p>
      </section>

      {/* Floating Math Symbols */}
      <div className="absolute inset-0 -z-10 overflow-hidden select-none">
        {[
          "π",
          "∞",
          "√",
          "∑",
          "Σ",
          "Δ",
          "θ",
          "φ",
          "Ω",
          "λ",
          "μ",
          "γ",
          "x²+y²=z²",
          "∫ f(x) dx",
          "E=mc²",
          "P(A|B)",
          "ℝ",
          "∂/∂t",
          "∇·F",
          "e^{iπ}+1=0",
          "f′(x)",
          "y=mx+b",
          "sinθ",
          "log₁₀x",
          "F=ma",
          "P=2πr",
          "ℕ⊂ℤ⊂ℚ⊂ℝ⊂ℂ",
          "∀x∈ℝ",
          "∴",
          "∃",
          "∈",
        ].map((symbol, i) => (
          <span
            key={i}
            className={`floating-symbol text-neutral-500/15 text-[3rem] sm:text-[4rem] lg:text-[5rem] font-mono`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 20}s`,
              transform: `scale(${0.8 + Math.random() * 0.8})`,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          >
            {symbol}
          </span>
        ))}
      </div>

      {/* Branch Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full justify-center">
        {branches.map(({ title, desc, href, color }) => (
          <a
            key={href}
            href={href}
            className={`group relative overflow-hidden rounded-3xl border border-neutral-800/70 
                        bg-neutral-900/40 p-8 transition-all duration-300 
                        hover:scale-[1.03] hover:border-cyan-400/40 glass`}
          >
            {/* gradient glow overlay */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                          bg-gradient-to-tr ${color} blur-3xl`}
            ></div>

            <h2
              className={`relative z-10 text-3xl font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
            >
              {title}
            </h2>
            <p className="relative z-10 text-neutral-400 mt-3 text-base leading-relaxed">
              {desc}
            </p>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-500"></div>
          </a>
        ))}
      </section>
    </main>
  );
}
