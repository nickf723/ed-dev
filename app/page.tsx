import HexGrid from "./_homepage/HexGrid";
import LibraryBackground from "./_homepage/HomepageBackground";
import NetworkBackground from "./_homepage/NetworkBackground";
import WireframeBackground from "./_homepage/WireframeBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02040a] text-slate-100 selection:bg-cyan-400/30 lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <NetworkBackground />
        <LibraryBackground />
        <WireframeBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_52%_44%,rgba(125,211,252,0.025),transparent_30%),linear-gradient(to_bottom,rgba(2,4,10,0.04),rgba(2,4,10,0.36))]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-6 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-7">
        <header className="shrink-0 text-center">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Education Station <span className="text-cyan-200">64</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">Explore by field.</p>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <HexGrid />
        </div>
      </div>
    </main>
  );
}
