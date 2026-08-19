"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Layers3, MapPin, PackageSearch, ShieldCheck } from "lucide-react";

type ContextCase = {
  id: string;
  label: string;
  position: { x: number; y: number };
  context: string;
  association: string;
  disturbance: string;
  strongestClaim: string;
  cannotClaim: string;
  evidence: readonly string[];
};

const CASES: readonly ContextCase[] = [
  {
    id: "floor",
    label: "On a sealed occupation floor",
    position: { x: 31, y: 36 },
    context: "A discrete floor surface sealed by a later deposit.",
    association: "Hearth ash, animal bone, and several vessels lie on the same surface.",
    disturbance: "No obvious cut or later intrusion crosses the floor in this teaching example.",
    strongestClaim: "The sherd can be discussed as part of an assemblage deposited on this occupation surface.",
    cannotClaim: "The sherd alone cannot identify who used the room, what language they spoke, or the exact activity that occurred there.",
    evidence: ["recorded layer", "horizontal position", "associated finds", "sealed surface"],
  },
  {
    id: "pit",
    label: "Inside a later pit cut",
    position: { x: 68, y: 55 },
    context: "A pit cuts down through two earlier deposits and is filled later.",
    association: "The sherd sits in the pit fill with mixed sediment and other discarded material.",
    disturbance: "The cut breaks the earlier layers, so depth alone no longer gives a simple chronological relationship.",
    strongestClaim: "The sherd was in the pit fill when that fill accumulated, unless it was already old and redeposited.",
    cannotClaim: "Its depth cannot be used to claim it belongs to the earlier layer that the pit physically cuts through.",
    evidence: ["cut boundary", "fill context", "vertical position", "mixed assemblage"],
  },
  {
    id: "plowzone",
    label: "In a disturbed plowzone",
    position: { x: 48, y: 22 },
    context: "Repeated cultivation has mixed the upper soil horizon.",
    association: "Nearby objects may have moved horizontally and vertically through plowing.",
    disturbance: "High. Fine-scale associations inside the plowzone are weakened even though the broader site location still matters.",
    strongestClaim: "The sherd contributes to evidence that archaeological material is present in this area.",
    cannotClaim: "Its exact resting position should not be treated as an intact activity surface or undisturbed association.",
    evidence: ["site coordinates", "surface density", "artifact type", "disturbance record"],
  },
  {
    id: "bag",
    label: "Loose artifact with no provenience",
    position: { x: 84, y: 19 },
    context: "The object survives, but its excavation location and context record are missing.",
    association: "Unknown.",
    disturbance: "The archaeological information loss happened in documentation, not necessarily in the ground.",
    strongestClaim: "The object itself can still be studied for material, manufacture, form, decoration, or use-wear.",
    cannotClaim: "It cannot securely reconstruct its original layer, feature, association, or spatial relationship to the site.",
    evidence: ["object fabric", "manufacture", "surface traces", "collection history"],
  },
];

export default function ContextLab() {
  const [activeId, setActiveId] = useState("floor");
  const active = useMemo(() => CASES.find((item) => item.id === activeId) ?? CASES[0], [activeId]);

  return (
    <section className="overflow-hidden rounded-[26px] border border-amber-200/18 bg-[#15110d]/84 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl">
      <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(330px,0.92fr)]">
        <div className="border-b border-white/[0.06] p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300/75">
                <PackageSearch size={15} /> Context lab
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-stone-100">Keep the sherd. Change its context.</h2>
              <p className="mt-2 max-w-2xl text-[13px] leading-5 text-stone-400">
                Archaeological interpretation depends on relationships among objects, deposits, features, and recorded positions. The ceramic sherd below never changes; only the circumstances of its recovery do.
              </p>
            </div>
            <Layers3 size={22} className="mt-1 shrink-0 text-amber-300/40" />
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {CASES.map((item) => {
              const selected = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-[12px] font-medium transition-colors ${
                    selected
                      ? "border-amber-300/35 bg-amber-300/[0.08] text-amber-100"
                      : "border-white/[0.06] bg-black/15 text-stone-400 hover:border-amber-200/18 hover:text-stone-200"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="relative mt-4 h-[310px] overflow-hidden rounded-[20px] border border-stone-100/[0.08] bg-[#0d0b09]">
            <div className="absolute inset-x-0 top-0 h-[22%] bg-[#4a3b2d]" />
            <div className="absolute inset-x-0 top-[22%] h-[25%] bg-[#68432a]" />
            <div className="absolute inset-x-0 top-[47%] h-[27%] bg-[#433a34]" />
            <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[#2c2926]" />

            <div className="absolute inset-x-0 top-[22%] border-t border-amber-100/15" />
            <div className="absolute inset-x-0 top-[47%] border-t border-amber-100/15" />
            <div className="absolute inset-x-0 top-[74%] border-t border-amber-100/15" />

            <div className="absolute bottom-[26%] right-[16%] h-[54%] w-[25%] rounded-b-[60%] border-x border-b border-amber-300/25 bg-black/30" />
            <div className="absolute left-[21%] top-[39%] h-1 w-[28%] rounded-full bg-orange-300/25" />
            <div className="absolute left-[29%] top-[36%] h-2 w-2 rounded-full bg-orange-300/40" />
            <div className="absolute left-[43%] top-[40%] h-2 w-2 rounded-full bg-stone-200/35" />

            <div className="absolute left-4 top-4 rounded-lg border border-white/[0.07] bg-black/30 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-stone-500">
              fictional trench profile
            </div>

            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
              style={{ left: `${active.position.x}%`, top: `${active.position.y}%` }}
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/45 bg-amber-300/10 shadow-[0_0_32px_rgba(245,158,11,0.12)]">
                <div className="h-5 w-8 rotate-[-12deg] rounded-b-[55%] border-b-2 border-l-2 border-r-2 border-orange-300/80" />
                <div className="absolute -bottom-6 whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-amber-200/75">
                  same sherd
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/35 px-2 py-1.5 font-mono text-[9px] text-stone-500">
              <MapPin size={11} /> position + context are part of the record
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="rounded-2xl border border-amber-200/[0.11] bg-amber-100/[0.025] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/65">Selected situation</div>
            <h3 className="mt-1.5 text-lg font-semibold text-stone-100">{active.label}</h3>
          </div>

          <div className="mt-3 grid gap-2">
            {[
              ["Context", active.context],
              ["Association", active.association],
              ["Disturbance", active.disturbance],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3">
                <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-stone-600">{label}</div>
                <p className="mt-1 text-[12px] leading-5 text-stone-400">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.035] p-3">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-emerald-300/70">
              <ShieldCheck size={13} /> Better-supported claim
            </div>
            <p className="mt-1.5 text-[12px] leading-5 text-stone-300">{active.strongestClaim}</p>
          </div>

          <div className="mt-2 rounded-xl border border-rose-300/15 bg-rose-300/[0.03] p-3">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-rose-300/65">
              <AlertTriangle size={13} /> Context does not justify
            </div>
            <p className="mt-1.5 text-[12px] leading-5 text-stone-400">{active.cannotClaim}</p>
          </div>

          <div className="mt-3">
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-stone-600">Evidence still available</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {active.evidence.map((item) => (
                <span key={item} className="rounded-md border border-white/[0.06] bg-black/20 px-2 py-1 text-[10px] text-stone-500">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
