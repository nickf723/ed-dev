import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import HistoryBackground from "../_components/HistoryBackground";
import { ArrowRight, CircleDashed, Globe2, Map, Route } from "lucide-react";

const NODE_ID = "humanities.history.regional";

const REGION_POSITIONS: Record<string, { left: number; top: number; rgb: string }> = {
  "humanities.history.regional.americas": { left: 19, top: 45, rgb: "16, 185, 129" },
  "humanities.history.regional.europe": { left: 48, top: 28, rgb: "96, 165, 250" },
  "humanities.history.regional.africa": { left: 48, top: 57, rgb: "245, 158, 11" },
  "humanities.history.regional.asia": { left: 70, top: 36, rgb: "232, 121, 249" },
  "humanities.history.regional.oceania": { left: 82, top: 69, rgb: "34, 211, 238" },
};

export default function HistoryRegionalPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050806] text-slate-100 selection:bg-emerald-400/25">
      <HistoryBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1460px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#050806]/72 px-4 pb-3 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Humanities", href: "/humanities" },
              { label: "History", href: "/humanities/history" },
              { label: "History by Place" },
            ]}
            eyebrow="Environment · movement · borders · connection"
            icon={Map}
            title={<span>History by Place</span>}
            subtitle="Geography keeps local conditions visible while showing how people, goods, ideas, diseases, technologies, and institutions move between connected regions."
            accentRgb="16, 185, 129"
            titleClassName="font-serif text-[clamp(2.5rem,4.8vw,5.1rem)] font-semibold leading-[0.88] tracking-[-0.052em] text-[#effff7]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
          <div className="relative min-h-[610px] overflow-hidden rounded-[32px] border border-emerald-200/[0.13] bg-black/[0.10] shadow-[0_32px_110px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <div
              className="absolute inset-0 opacity-45"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(16,185,129,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.045) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            <svg viewBox="0 0 900 560" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
              <path d="M65 190 C115 95 238 78 286 151 C315 196 266 242 213 233 C164 226 162 306 101 285 C55 270 34 231 65 190Z" fill="rgba(16,185,129,0.035)" stroke="rgba(52,211,153,0.17)" strokeWidth="1.5" />
              <path d="M396 102 C445 65 522 77 545 128 C563 167 520 182 501 216 C478 257 425 235 418 194 C413 160 365 131 396 102Z" fill="rgba(96,165,250,0.025)" stroke="rgba(96,165,250,0.14)" strokeWidth="1.4" />
              <path d="M558 128 C634 71 774 91 825 162 C855 205 787 230 742 216 C699 202 682 279 620 252 C570 231 518 165 558 128Z" fill="rgba(232,121,249,0.026)" stroke="rgba(232,121,249,0.14)" strokeWidth="1.4" />
              <path d="M703 358 C750 329 824 354 842 401 C857 440 804 454 760 441 C718 429 670 381 703 358Z" fill="rgba(34,211,238,0.025)" stroke="rgba(34,211,238,0.13)" strokeWidth="1.4" />

              <path d="M170 236 Q375 73 632 180" fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="1.5" strokeDasharray="5 8" />
              <path d="M435 165 Q594 274 760 394" fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="1.3" strokeDasharray="5 8" />
              <path d="M178 250 Q402 375 656 226" fill="none" stroke="rgba(129,140,248,0.17)" strokeWidth="1.3" strokeDasharray="5 8" />
              <path d="M457 315 Q568 205 706 202" fill="none" stroke="rgba(245,158,11,0.16)" strokeWidth="1.2" strokeDasharray="5 8" />
            </svg>

            <div className="absolute left-6 top-6 z-10 max-w-lg">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">
                Regional map
              </div>
              <h2 className="mt-1 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">
                Start locally. Follow the connections outward.
              </h2>
              <p className="mt-2 max-w-xl text-[11px] leading-5 text-slate-500">
                Live regions open normally. Planned regions remain visible so the global structure grows in one place instead of becoming a patchwork of unrelated routes.
              </p>
            </div>

            {context.children.map((child) => (
              <RegionNode key={child.id} child={child} />
            ))}

            <div className="absolute bottom-5 left-6 right-6 z-10 flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-[8px] uppercase tracking-[0.11em] text-slate-600">
              <span>environment</span>
              <span>migration · trade · conflict · exchange</span>
              <span>institutions</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.10] p-5 backdrop-blur-md sm:p-6">
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/68">
                <Globe2 size={13} /> Geographic scale
              </div>
              <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-white">
                “Where?” can mean several nested things.
              </h2>
              <div className="mt-5 space-y-2">
                <ScaleStep label="Global system" text="Ocean basins, climate zones, exchange systems, and worldwide processes" />
                <ScaleStep label="Region" text="Large connected areas such as the Americas, Africa, Europe, Asia, or Oceania" />
                <ScaleStep label="Subregion" text="Areas linked by geography, institutions, language, ecology, or exchange" />
                <ScaleStep label="Polity & community" text="States, nations, cities, villages, neighborhoods, and local groups" />
              </div>
            </div>

            <div className="rounded-[28px] border border-amber-200/[0.10] bg-amber-400/[0.025] p-5 backdrop-blur-md sm:p-6">
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/65">
                <Route size={13} /> Boundaries move
              </div>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">
                Historical regions are analytical tools, not timeless containers. Borders, identities, trade zones, environments, and political centers change, so the useful geographic scale depends on the question.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function RegionNode({ child }: { child: CurriculumNode }) {
  const live = child.status !== "placeholder";
  const position = REGION_POSITIONS[child.id] ?? { left: 50, top: 50, rgb: "16, 185, 129" };
  const inner = (
    <div className="group flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full border bg-[#07100c]/88 shadow-2xl transition-transform duration-300 group-hover:scale-105"
        style={{
          color: `rgb(${position.rgb})`,
          borderColor: `rgba(${position.rgb},${live ? "0.34" : "0.12"})`,
          boxShadow: live ? `0 0 42px rgba(${position.rgb},0.13)` : undefined,
        }}
      >
        {live ? <Globe2 size={20} /> : <CircleDashed size={18} className="opacity-45" />}
      </div>
      <strong className={`mt-3 whitespace-nowrap text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{child.label}</strong>
      <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.10em]" style={{ color: `rgba(${position.rgb},${live ? "0.58" : "0.25"})` }}>
        {live ? "open region" : "planned"}
      </span>
      {live ? <ArrowRight size={12} className="mt-2" style={{ color: `rgba(${position.rgb},0.66)` }} /> : null}
    </div>
  );

  return (
    <div className="absolute z-20" style={{ left: `${position.left}%`, top: `${position.top}%` }}>
      {live ? <Link href={child.href}>{inner}</Link> : <div aria-disabled="true">{inner}</div>}
    </div>
  );
}

function ScaleStep({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-[92px_1fr] gap-3 rounded-[15px] border border-white/[0.06] bg-white/[0.012] px-3 py-3">
      <strong className="text-[10px] text-emerald-100/72">{label}</strong>
      <p className="text-[10px] leading-5 text-slate-600">{text}</p>
    </div>
  );
}
