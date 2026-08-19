"use client";

import { useMemo, useState } from "react";
import { Beaker, Gem, Hammer, Layers3, Sparkles } from "lucide-react";

type Specimen = {
  id: string;
  name: string;
  formula: string;
  family: string;
  hardness: number;
  streak: string;
  cleavage: string;
  luster: string;
  acid: string;
  rgb: string;
};

const SPECIMENS: readonly Specimen[] = [
  { id: "quartz", name: "Quartz", formula: "SiO₂", family: "Silicate", hardness: 7, streak: "White", cleavage: "None · conchoidal fracture", luster: "Vitreous", acid: "No visible reaction", rgb: "196, 181, 253" },
  { id: "calcite", name: "Calcite", formula: "CaCO₃", family: "Carbonate", hardness: 3, streak: "White", cleavage: "Perfect rhombohedral", luster: "Vitreous to pearly", acid: "Effervesces in dilute acid", rgb: "125, 211, 252" },
  { id: "halite", name: "Halite", formula: "NaCl", family: "Halide", hardness: 2.5, streak: "White", cleavage: "Perfect cubic", luster: "Vitreous", acid: "No diagnostic reaction", rgb: "147, 197, 253" },
  { id: "pyrite", name: "Pyrite", formula: "FeS₂", family: "Sulfide", hardness: 6.25, streak: "Greenish-black to brownish-black", cleavage: "Poor / indistinct", luster: "Metallic", acid: "Not a routine field diagnostic", rgb: "250, 204, 21" },
];

const TESTS = [
  { id: "hardness", label: "Hardness", icon: Hammer },
  { id: "streak", label: "Streak", icon: Sparkles },
  { id: "cleavage", label: "Cleavage", icon: Layers3 },
  { id: "acid", label: "Acid", icon: Beaker },
] as const;

type TestId = (typeof TESTS)[number]["id"];

export default function MineralDiagnosticLab() {
  const [specimenId, setSpecimenId] = useState("quartz");
  const [test, setTest] = useState<TestId>("hardness");
  const specimen = useMemo(() => SPECIMENS.find((item) => item.id === specimenId) ?? SPECIMENS[0], [specimenId]);
  const result = test === "hardness" ? `${specimen.hardness} on the Mohs scale` : test === "streak" ? specimen.streak : test === "cleavage" ? specimen.cleavage : specimen.acid;

  return (
    <section className="overflow-hidden rounded-[30px] border border-fuchsia-200/[0.12] bg-black/[0.18] shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-fuchsia-200/62"><Gem size={13} /> Diagnostic bench</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.047em] text-white">Identify minerals by converging evidence.</h2>
          <p className="mt-2 max-w-3xl text-[12px] leading-6 text-slate-400">Color alone is unreliable. A field identification gets stronger when hardness, streak, cleavage or fracture, luster, crystal habit, density, and special reactions point toward the same mineral.</p>
        </div>
        <div className="border-t border-white/[0.07] p-4 lg:border-l lg:border-t-0"><div className="grid grid-cols-2 gap-2">{SPECIMENS.map((item) => <button key={item.id} type="button" onClick={() => setSpecimenId(item.id)} className={`rounded-[14px] border px-3 py-2.5 text-left transition ${item.id === specimen.id ? "bg-white/[0.045]" : "border-white/[0.06] bg-black/[0.08] hover:bg-white/[0.025]"}`} style={item.id === specimen.id ? { borderColor: `rgba(${item.rgb},0.32)` } : undefined}><span className="font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: `rgba(${item.rgb},0.62)` }}>{item.formula}</span><strong className="mt-1 block text-[12px] text-white/84">{item.name}</strong></button>)}</div></div>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="relative min-h-[360px] border-b border-white/[0.07] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:28px_28px]" aria-hidden="true" />
          <div className="relative grid gap-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center"><div className="relative mx-auto flex h-[170px] w-[170px] items-center justify-center"><div className="absolute inset-5 rotate-[18deg] rounded-[34px] border" style={{ borderColor: `rgba(${specimen.rgb},0.24)`, boxShadow: `0 0 60px rgba(${specimen.rgb},0.08)` }} /><div className="absolute inset-8 -rotate-[12deg] rounded-[28px] border" style={{ borderColor: `rgba(${specimen.rgb},0.38)` }} /><div className="relative flex h-24 w-24 rotate-45 items-center justify-center border bg-black/25" style={{ color: `rgb(${specimen.rgb})`, borderColor: `rgba(${specimen.rgb},0.44)`, boxShadow: `0 0 40px rgba(${specimen.rgb},0.16)` }}><Gem size={34} className="-rotate-45" /></div></div><div><div className="font-mono text-[9px] uppercase tracking-[0.13em]" style={{ color: `rgba(${specimen.rgb},0.62)` }}>{specimen.family}</div><h3 className="mt-1 text-[30px] font-semibold tracking-[-0.05em] text-white">{specimen.name}</h3><div className="mt-1 font-mono text-[13px] text-slate-400">{specimen.formula}</div><div className="mt-5 grid grid-cols-2 gap-2 text-[10px]"><Spec label="Luster" value={specimen.luster} /><Spec label="Hardness" value={String(specimen.hardness)} /><Spec label="Streak" value={specimen.streak} /><Spec label="Cleavage" value={specimen.cleavage} /></div></div></div>
        </div>
        <div className="p-5 sm:p-6"><div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">Choose a diagnostic test</div><div className="mt-3 grid grid-cols-2 gap-2">{TESTS.map((item) => { const Icon = item.icon; const selected = item.id === test; return <button key={item.id} type="button" onClick={() => setTest(item.id)} className={`flex items-center gap-2 rounded-[14px] border px-3 py-3 text-left transition ${selected ? "border-fuchsia-200/[0.24] bg-fuchsia-200/[0.045] text-fuchsia-100" : "border-white/[0.06] bg-black/[0.08] text-slate-500 hover:bg-white/[0.025]"}`}><Icon size={13} /><span className="text-[11px] font-semibold">{item.label}</span></button>; })}</div><div className="mt-5 rounded-[18px] border border-white/[0.07] bg-black/[0.16] p-4"><div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Observed result</div><div className="mt-2 text-[18px] font-semibold leading-6 text-white/88">{result}</div><p className="mt-3 text-[10px] leading-5 text-slate-600">No single result identifies every specimen. Use several independent properties and eliminate alternatives.</p></div></div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) { return <div className="rounded-[12px] border border-white/[0.06] bg-black/[0.12] px-3 py-2"><span className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</span><span className="mt-1 block line-clamp-2 text-[10px] leading-4 text-slate-400">{value}</span></div>; }
