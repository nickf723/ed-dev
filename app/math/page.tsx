export default function MathPage() {
  const sections = [
    {
      title: "Algebra",
      desc: "Patterns, equations, and symbolic logic — the foundation of all higher math.",
      href: "/math/algebra",
    },
    {
      title: "Geometry",
      desc: "Shapes, space, and structure — visualizing relationships in the world around us.",
      href: "/math/geometry",
    },
    {
      title: "Calculus",
      desc: "Change, motion, and accumulation — exploring how quantities evolve over time.",
      href: "/math/calculus",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col justify-center px-10 py-16 space-y-12">
      {/* Header Section */}
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">Mathematics</h1>
        <p className="text-neutral-300 text-lg leading-relaxed">
          Mathematics is the universal language of logic and pattern —
          connecting the abstract and the real. Choose a field below to explore
          its principles and applications.
        </p>
      </section>

      {/* Grid of Topics */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
        {sections.map(({ title, desc, href }) => (
          <a
            key={href}
            href={href}
            className="glass block p-8 border border-neutral-800/70 hover:border-cyan-400/40 
                       transition-all rounded-3xl hover:scale-[1.03]"
          >
            <h2 className="text-2xl font-semibold text-cyan-300 mb-2">{title}</h2>
            <p className="text-neutral-400 text-base leading-relaxed">{desc}</p>
          </a>
        ))}
      </section>
    </main>
  );
}
