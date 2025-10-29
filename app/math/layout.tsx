// src/app/math/layout.tsx
import Link from "next/link";

export default function MathLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Local sidebar */}
      <aside className="glass w-64 p-6 border-r border-neutral-800/60">
        <h2 className="text-cyan-400 font-semibold mb-4 text-xl">Mathematics</h2>
        <nav className="flex flex-col gap-2 text-neutral-300">
          <Link href="/math/algebra" className="hover:text-cyan-300">Algebra</Link>
          <Link href="/math/geometry" className="hover:text-cyan-300">Geometry</Link>
          <Link href="/math/calculus" className="hover:text-cyan-300">Calculus</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
