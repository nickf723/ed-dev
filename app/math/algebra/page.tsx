export default function AlgebraPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">Algebra</h1>
      <p className="text-neutral-300 mb-6">
        Algebra explores how symbols and variables represent quantities and relationships.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <a
          href="/math/algebra/variables"
          className="glass p-6 border border-neutral-800/70 hover:border-cyan-400/40 transition-all rounded-2xl"
        >
          <h2 className="text-2xl text-cyan-300 font-semibold">Variables</h2>
          <p className="text-neutral-400 mt-2">The building blocks of algebraic thinking.</p>
        </a>
        <a
          href="/math/algebra/expressions"
          className="glass p-6 border border-neutral-800/70 hover:border-cyan-400/40 transition-all rounded-2xl"
        >
          <h2 className="text-2xl text-cyan-300 font-semibold">Expressions</h2>
          <p className="text-neutral-400 mt-2">Combining variables and constants to form ideas.</p>
        </a>
      </div>
    </div>
  );
}
