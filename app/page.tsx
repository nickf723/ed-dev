import HexGrid from "./_homepage/HexGrid";
import LibraryBackground from "./_homepage/HomepageBackground";
import NetworkBackground from "./_homepage/NetworkBackground";
import WireframeBackground from "./_homepage/WireframeBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020407] text-slate-100 selection:bg-cyan-300/25">
      <div className="pointer-events-none fixed inset-0 z-0">
        <NetworkBackground />
        <LibraryBackground />
        <WireframeBackground />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_47%,rgba(6,16,25,0.02),rgba(2,4,7,0.28)_50%,rgba(2,4,7,0.74)_100%),linear-gradient(to_bottom,rgba(2,4,7,0.02),rgba(2,4,7,0.20)_78%,rgba(2,4,7,0.58))]"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-cyan-100/20 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1580px] flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <header className="relative z-20 shrink-0 border-b border-white/[0.055] pb-4">
          <div className="flex flex-col items-center justify-between gap-3 text-center lg:flex-row lg:text-left">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-100/45">
                ES64 / interactive curriculum atlas
              </div>
              <h1 className="mt-1.5 text-[clamp(2.55rem,4.6vw,4.9rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-[#f7fbff]">
                Education Station <span className="font-mono text-cyan-100">64</span>
              </h1>
            </div>

            <div className="max-w-[450px] lg:text-right">
              <p className="text-[13px] leading-6 text-slate-400 sm:text-[14px]">
                Six primary domains. Hover to inspect a field, then enter it to explore its curriculum map.
              </p>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.11em] text-slate-700">
                inspect → enter → explore
              </div>
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <HexGrid />
        </div>
      </div>
    </main>
  );
}
