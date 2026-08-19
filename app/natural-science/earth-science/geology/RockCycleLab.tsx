"use client";

import { useMemo, useState } from "react";
import { Flame, Layers3, Mountain, RefreshCw, Waves, type LucideIcon } from "lucide-react";

type RockId = "magma" | "igneous" | "sediment" | "sedimentary" | "metamorphic";
type ProcessId = "cooling" | "weathering" | "lithification" | "metamorphism" | "melting";

type RockNode = { id: RockId; label: string; note: string; rgb: string; icon: LucideIcon };

const ROCKS: readonly RockNode[] = [
  { id: "magma", label: "Magma", note: "Molten or partially molten rock", rgb: "248, 113, 113", icon: Flame },
  { id: "igneous", label: "Igneous rock", note: "Crystallized from melt", rgb: "251, 146, 60", icon: Mountain },
  { id: "sediment", label: "Sediment", note: "Transported rock and mineral fragments", rgb: "250, 204, 21", icon: Waves },
  { id: "sedimentary", label: "Sedimentary rock", note: "Lithified sediment or chemical/biogenic material", rgb: "226, 232, 240", icon: Layers3 },
  { id: "metamorphic", label: "Metamorphic rock", note: "Rock transformed without fully melting", rgb: "167, 139, 250", icon: RefreshCw },
];

const PROCESSES: readonly { id: ProcessId; label: string; from: readonly RockId[]; to: RockId; detail: string }[] = [
  { id: "cooling", label: "Cooling & crystallization", from: ["magma"], to: "igneous", detail: "Melt loses heat and minerals crystallize into igneous rock." },
  { id: "weathering", label: "Weathering, erosion & transport", from: ["igneous", "sedimentary", "metamorphic"], to: "sediment", detail: "Exposed rock breaks down and material is transported as sediment." },
  { id: "lithification", label: "Deposition & lithification", from: ["sediment"], to: "sedimentary", detail: "Sediment is deposited, compacted, cemented, or otherwise converted into sedimentary rock." },
  { id: "metamorphism", label: "Heat, pressure & fluids", from: ["igneous", "sedimentary", "metamorphic"], to: "metamorphic", detail: "Rock recrystallizes or changes texture and mineralogy while remaining mostly solid." },
  { id: "melting", label: "Melting", from: ["igneous", "sedimentary", "metamorphic"], to: "magma", detail: "Sufficient heating produces partial or complete melting and returns material to magma." },
];

export default function RockCycleLab() {
  const [rockId, setRockId] = useState<RockId>("igneous");
  const rock = useMemo(() => ROCKS.find((item) => item.id === rockId) ?? ROCKS[1], [rockId]);
  const available = PROCESSES.filter((process) => process.from.includes(rock.id));
  const RockIcon = rock.icon;

  return (
    <section className="overflow-hidden rounded-[30px] border border-orange-200/[0.12] bg-black/[0.18] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_410px]">
        <div className="px-5 py-5 sm:px-6"><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-orange-200/60"><RefreshCw size={13} /> Rock transformation network</div><h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.047em] text-white">The rock cycle is a network, not a conveyor belt.</h2><p className="mt-2 max-w-3xl text-[12px] leading-6 text-slate-400">A rock does not have to march through one fixed sequence. Burial, uplift, weathering, heating, melting, crystallization, deposition, and fluid interaction open many possible pathways depending on environment and tectonic history.</p></div>
        <div className="border-t border-white/[0.07] p-4 lg:border-l lg:border-t-0"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">{ROCKS.map((item) => { const Icon = item.icon; const selected = item.id === rock.id; return <button key={item.id} type="button" onClick={() => setRockId(item.id)} className={`flex items-center gap-2 rounded-[14px] border px-3 py-2.5 text-left transition ${selected ? "bg-white/[0.045]" : "border-white/[0.06] bg-black/[0.08] hover:bg-white/[0.025]"}`} style={selected ? { borderColor: `rgba(${item.rgb},0.30)` } : undefined}><Icon size={13} style={{ color: `rgb(${item.rgb})` }} /><span className="text-[10px] font-semibold text-white/80">{item.label}</span></button>; })}</div></div>
      </div>
      <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.07] p-5 sm:p-6 lg:border-b-0 lg:border-r"><div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Selected material</div><div className="mt-5 flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-full border" style={{ color: `rgb(${rock.rgb})`, borderColor: `rgba(${rock.rgb},0.30)`, background: `rgba(${rock.rgb},0.05)`, boxShadow: `0 0 35px rgba(${rock.rgb},0.10)` }}><RockIcon size={21} /></span><div><h3 className="text-[22px] font-semibold tracking-[-0.04em] text-white">{rock.label}</h3><p className="mt-1 text-[10px] leading-4 text-slate-600">{rock.note}</p></div></div><div className="mt-6 border-t border-white/[0.06] pt-4"><div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Available transformations</div><div className="mt-2 font-mono text-[28px] font-semibold tracking-[-0.05em]" style={{ color: `rgb(${rock.rgb})` }}>{available.length}</div></div></div>
        <div className="p-5 sm:p-6"><div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Choose a process</div><div className="mt-3 grid gap-2 sm:grid-cols-2">{available.map((process) => { const target = ROCKS.find((item) => item.id === process.to)!; return <button key={process.id} type="button" onClick={() => setRockId(process.to)} className="group rounded-[16px] border border-white/[0.07] bg-black/[0.10] p-4 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.025]"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] uppercase tracking-[0.1em] text-orange-200/48">{process.label}</span><span className="text-[11px]" style={{ color: `rgb(${target.rgb})` }}>→ {target.label}</span></div><p className="mt-2 text-[10px] leading-5 text-slate-600">{process.detail}</p></button>; })}</div><div className="mt-5 rounded-[14px] border border-white/[0.06] bg-black/[0.10] px-4 py-3 text-[10px] leading-5 text-slate-600">Real pathways operate across very different timescales and can reverse, branch, stall, or repeat. This lab represents material transformations, not a mandatory chronology.</div></div>
      </div>
    </section>
  );
}
