"use client";

import { useState } from "react";
import { Brain, Heart, Scan, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

const REGIONS: readonly {
  id: string;
  label: string;
  cue: string;
  systems: readonly string[];
  organs: readonly string[];
  boundary: string;
  icon: LucideIcon;
  rgb: string;
}[] = [
  {
    id: "head-neck",
    label: "Head & neck",
    cue: "sensation · control · airway · swallowing",
    systems: ["Nervous", "Endocrine", "Respiratory", "Digestive", "Musculoskeletal"],
    organs: ["Brain", "eyes", "upper airway", "thyroid", "tongue & pharynx"],
    boundary: "A region groups structures by location. It does not mean those structures belong to one physiological system.",
    icon: Brain,
    rgb: "34,211,238",
  },
  {
    id: "thorax",
    label: "Thorax",
    cue: "ventilation · circulation · protection",
    systems: ["Cardiovascular", "Respiratory", "Lymphatic", "Musculoskeletal", "Nervous"],
    organs: ["Heart", "lungs", "great vessels", "trachea", "thoracic cage"],
    boundary: "The rib cage is skeletal, breathing uses muscles, gas exchange is respiratory, and transport is cardiovascular. One region hosts several coordinated systems.",
    icon: Heart,
    rgb: "248,113,113",
  },
  {
    id: "abdomen-pelvis",
    label: "Abdomen & pelvis",
    cue: "digestion · filtration · reproduction · load transfer",
    systems: ["Digestive", "Urinary", "Reproductive", "Endocrine", "Musculoskeletal"],
    organs: ["Liver", "stomach", "intestines", "kidneys", "pelvic organs"],
    boundary: "Organ location helps describe anatomy, but function often depends on vessels, nerves, ducts, connective tissue, and distant regulatory organs.",
    icon: ShieldCheck,
    rgb: "251,191,36",
  },
  {
    id: "limbs",
    label: "Limbs",
    cue: "support · leverage · sensation · circulation",
    systems: ["Skeletal", "Muscular", "Nervous", "Cardiovascular", "Integumentary"],
    organs: ["Long bones", "joints", "skeletal muscles", "peripheral nerves", "vessels"],
    boundary: "Movement is an integrated output: bone transmits load, joints constrain motion, muscles generate force, nerves coordinate it, and vessels sustain the tissue.",
    icon: Sparkles,
    rgb: "167,139,250",
  },
] as const;

export default function SystemScanner() {
  const [activeId, setActiveId] = useState(REGIONS[1].id);
  const active = REGIONS.find((region) => region.id === activeId) ?? REGIONS[0];
  const Icon = active.icon;

  return (
    <section className="overflow-hidden rounded-[24px] border border-rose-100/[0.10] bg-[#10090c]/60 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-rose-200/68"><Scan size={13} /> Regional anatomy scanner</div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">A body region is a place where several systems meet.</h3>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.07em] text-slate-500">region ≠ system</span>
      </div>

      <div className="grid lg:grid-cols-[210px_minmax(0,1fr)]">
        <div className="grid grid-cols-2 gap-2 border-b border-white/[0.07] p-3 lg:grid-cols-1 lg:border-b-0 lg:border-r">
          {REGIONS.map((region) => {
            const RegionIcon = region.icon;
            const selected = region.id === active.id;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setActiveId(region.id)}
                className="rounded-[15px] border px-3 py-3 text-left transition"
                style={{
                  borderColor: selected ? `rgba(${region.rgb},0.28)` : "rgba(255,255,255,0.06)",
                  background: selected ? `rgba(${region.rgb},0.055)` : "rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center gap-2"><RegionIcon size={14} style={{ color: `rgb(${region.rgb})` }} /><strong className="text-[12px] text-white/86">{region.label}</strong></div>
                <span className="mt-1.5 block text-[10px] leading-4 text-slate-500">{region.cue}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${active.rgb})`, borderColor: `rgba(${active.rgb},0.26)`, background: `rgba(${active.rgb},0.045)` }}><Icon size={18} /></span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: `rgba(${active.rgb},0.68)` }}>Selected region</div>
              <h4 className="mt-1 text-[20px] font-semibold text-white">{active.label}</h4>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-slate-500">Systems crossing this region</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {active.systems.map((system) => <span key={system} className="rounded-full border border-white/[0.07] bg-white/[0.018] px-2.5 py-1.5 text-[11px] text-slate-300">{system}</span>)}
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-slate-500">Structures to locate</div>
              <p className="mt-2 text-[12px] leading-6 text-slate-300/72">{active.organs.join(" · ")}</p>
            </div>
          </div>

          <div className="mt-4 border-l-2 pl-3" style={{ borderColor: `rgba(${active.rgb},0.48)` }}>
            <p className="text-[12px] leading-6 text-slate-400">{active.boundary}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
