"use client";

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
    <main className="relative min-h-screen px-8 py-20 flex flex-col items-center text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-neutral-950 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] rounded-full bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 blur-3xl algebra-bg" />

      {/* Floating Algebra Symbols */}
      <div className="absolute inset-0 -z-10 overflow-hidden select-none">
        {[
          "x²",
          "y³",
          "a+b=c",
          "2x+3=9",
          "y=mx+b",
          "ƒ(x)",
          "aⁿ",
          "Σx",
          "(x+2)(x−2)=x²−4",
          "x≠0",
          "Δy/Δx",
          "∝",
          "x→∞",
          "α+β=γ",
          "ℕ",
        ].map((symbol, i) => (
          <span
            key={i}
            className="floating-symbol text-neutral-500/15 text-[2.5rem] sm:text-[3rem] lg:text-[4rem] font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${18 + Math.random() * 15}s`,
              transform: `scale(${0.8 + Math.random() * 0.8})`,
              filter: `blur(${Math.random() * 1.5}px)`,
            }}
          >
            {symbol}
          </span>
        ))}
      </div>

      {/* Header */}
      <section className="max-w-3xl mb-16">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Algebra
        </h1>
        <p className="text-neutral-300 text-lg leading-relaxed">
          Algebra transforms numbers into symbols and rules — allowing us to
          generalize, manipulate, and discover universal patterns that govern
          logic itself.
        </p>
      </section>

      {/* Topics Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full justify-center">
        {topics.map(({ title, desc, href, color }) => (
          <a
            key={href}
            href={href}
            className={`group relative overflow-hidden rounded-3xl border border-neutral-800/70 
                        bg-neutral-900/40 p-8 transition-all duration-300 
                        hover:scale-[1.03] hover:border-cyan-400/40 glass`}
          >
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
