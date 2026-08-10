import { Compass, Network } from "lucide-react";
import HexGrid from "./_homepage/HexGrid";
import NetworkBackground from "./_homepage/NetworkBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03050a] text-slate-100 selection:bg-cyan-400/30 lg:h-screen lg:overflow-hidden">
      <NetworkBackground />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.07),transparent_30%),radial-gradient(circle_at_18%_18%,rgba(248,113,113,0.06),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(52,211,153,0.07),transparent_24%),radial-gradient(circle_at_82%_82%,rgba(251,191,36,0.05),transparent_24%),radial-gradient(circle_at_18%_82%,rgba(167,139,250,0.06),transparent_24%),linear-gradient(to_bottom,rgba(3,5,10,0.08),rgba(3,5,10,0.72))]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col px-4 py-5 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-6">
        <header className="shrink-0 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-black/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-100/55 backdrop-blur-lg">
            <Network size={12} className="text-cyan-300/70" /> Education Station 64
          </div>

          <h1 className="mt-4 text-[clamp(3.8rem,7vw,7.2rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-white">
            Knowledge <span className="bg-gradient-to-r from-cyan-200 via-emerald-200 to-violet-200 bg-clip-text text-transparent">Map</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Choose a domain, follow its branches, and build a connected picture of what we know.
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">
            <Compass size={11} /> Select a field to begin
          </div>
        </header>

        <div className="mt-2 flex min-h-0 flex-1 items-center justify-center">
          <HexGrid />
        </div>
      </div>
    </main>
  );
}
