import KnowledgeAtlasBackdrop from "./_components/KnowledgeAtlasBackdrop";
import HydrationSafeHexGrid from "./_homepage/HydrationSafeHexGrid";
import LibraryBackground from "./_homepage/HomepageBackground";
import WireframeBackground from "./_homepage/WireframeBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020407] text-slate-100 selection:bg-cyan-300/25">
      <div className="pointer-events-none fixed inset-0 z-0">
        <KnowledgeAtlasBackdrop className="scale-[1.06]" opacity={0.34} showLabels={false} />
        <LibraryBackground />
        <WireframeBackground />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_46%,rgba(7,18,28,0.015),rgba(2,4,7,0.26)_48%,rgba(2,4,7,0.76)_100%),linear-gradient(to_bottom,rgba(2,4,7,0.02),rgba(2,4,7,0.18)_74%,rgba(2,4,7,0.62))]"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-cyan-100/18 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1580px] flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <header className="relative z-20 shrink-0 border-b border-white/[0.055] pb-5">
          <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:items-end lg:text-left">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100/42">
                ES64 / knowledge atlas
              </div>
              <h1 className="mt-1.5 text-[clamp(2.7rem,4.8vw,5.15rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-[#f7fbff]">
                Education Station <span className="font-mono text-cyan-100">64</span>
              </h1>
            </div>

            <p className="max-w-[500px] text-[13px] leading-6 text-slate-400 sm:text-[14px] lg:text-right">
              Interactive explanations, visualizations, and notes organized by how ideas fit together.
            </p>
          </div>
        </header>

        <section
          id="knowledge-atlas"
          className="flex min-h-0 flex-1 flex-col items-center justify-center py-2 lg:py-0"
          aria-label="Knowledge domains"
        >
          <div className="mb-1 hidden w-full max-w-[1360px] items-center justify-between px-6 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-700 lg:flex">
            <span>Choose a field</span>
            <span>follow ideas from broad domains to individual concepts</span>
          </div>
          <HydrationSafeHexGrid />
        </section>
      </div>
    </main>
  );
}
