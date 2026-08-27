import Link from "next/link";
import { ArrowRight, Info, Sparkles } from "lucide-react";
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
          <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-100/45">
                ES64 / a map of connected knowledge
              </div>
              <h1 className="mt-1.5 text-[clamp(2.55rem,4.6vw,4.9rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-[#f7fbff]">
                Education Station <span className="font-mono text-cyan-100">64</span>
              </h1>
            </div>

            <div className="max-w-[540px] lg:text-right">
              <p className="text-[13px] leading-6 text-slate-300/80 sm:text-[14px]">
                An evolving collection of interactive explanations, visualizations, and notes
                organized around how ideas fit together.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-end">
                <Link
                  href="#knowledge-atlas"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[0.06] px-3.5 py-2 text-[11px] font-semibold text-cyan-100 transition-colors hover:bg-cyan-200/[0.11]"
                >
                  <Sparkles size={13} />
                  Explore the atlas
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-violet-200/15 bg-violet-200/[0.045] px-3.5 py-2 text-[11px] font-semibold text-violet-100/85 transition-colors hover:bg-violet-200/[0.09] hover:text-violet-50"
                >
                  <Info size={13} />
                  About the project
                </Link>
                <Link
                  href="/formal-science/mathematics/discrete/set-theory"
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3.5 py-2 text-[11px] font-semibold text-slate-300 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  See an interactive concept
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div id="knowledge-atlas" className="flex min-h-0 flex-1 items-center justify-center scroll-mt-6">
          <HexGrid />
        </div>
      </div>
    </main>
  );
}
