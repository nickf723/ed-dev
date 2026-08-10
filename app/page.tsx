import HexGrid from "./_homepage/HexGrid";
import LibraryBackground from "./_homepage/HomepageBackground";
import NetworkBackground from "./_homepage/NetworkBackground";
import WireframeBackground from "./_homepage/WireframeBackground";
import { DOMAINS } from "@/lib/domains";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02040a] text-slate-100 selection:bg-cyan-400/30 lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <NetworkBackground />
        <LibraryBackground />
        <WireframeBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_52%_43%,rgba(125,211,252,0.04),transparent_28%),radial-gradient(circle_at_48%_62%,rgba(167,139,250,0.025),transparent_34%),linear-gradient(to_bottom,rgba(2,4,10,0.02),rgba(2,4,10,0.28))]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col px-4 py-5 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-6">
        <header className="relative z-20 shrink-0 text-center">
          <h1 className="text-[clamp(3.2rem,5.4vw,5.7rem)] font-black leading-[0.88] tracking-[-0.065em] text-white drop-shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            Education Station{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300 opacity-30 blur-2xl" />
              <span className="relative bg-gradient-to-r from-cyan-200 via-emerald-200 to-violet-200 bg-clip-text text-transparent">
                64
              </span>
            </span>
          </h1>

          <div className="mt-4 flex items-center justify-center gap-2.5" aria-hidden="true">
            {DOMAINS.map((domain) => (
              <span
                key={domain.id}
                className="h-1.5 w-1.5 rounded-full shadow-[0_0_12px_currentColor]"
                style={{ color: `rgb(${domain.theme.rgb})`, background: "currentColor" }}
              />
            ))}
          </div>

          <p className="mt-3 text-sm font-medium tracking-wide text-slate-500">Explore by field.</p>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <HexGrid />
        </div>
      </div>
    </main>
  );
}
