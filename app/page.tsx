import KnowledgeAtlasBackdrop from "@/app/_components/KnowledgeAtlasBackdrop";
import HydrationSafeHexGrid from "./_homepage/HydrationSafeHexGrid";
import LibraryBackground from "./_homepage/HomepageBackground";
import WireframeBackground from "./_homepage/WireframeBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020407] text-slate-100 selection:bg-cyan-300/25">
      <div className="pointer-events-none fixed inset-0 z-0">
        <KnowledgeAtlasBackdrop opacity={0.28} showLabels={false} className="scale-[1.08]" />
        <LibraryBackground />
        <WireframeBackground />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_48%,rgba(7,18,28,0.01),rgba(2,4,7,0.22)_48%,rgba(2,4,7,0.78)_100%),linear-gradient(to_bottom,rgba(2,4,7,0.015),rgba(2,4,7,0.16)_74%,rgba(2,4,7,0.66))]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1580px] flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <header className="relative z-20 shrink-0 pb-2 text-center lg:text-left">
          <h1 className="text-[clamp(2.7rem,4.8vw,5.15rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
            Education Station <span className="text-white">64</span>
          </h1>
        </header>

        <section
          id="knowledge-atlas"
          className="flex min-h-0 flex-1 items-center justify-center"
          aria-label="Knowledge domains"
        >
          <HydrationSafeHexGrid />
        </section>
      </div>
    </main>
  );
}
