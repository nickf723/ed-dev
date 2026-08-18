"use client";

import { useState } from "react";
import { Activity, Bone, Brain, Heart, Lungs, Shield } from "lucide-react";

const LAYERS = [
  { id: "skeletal", label: "Skeletal", icon: Bone, rgb: "226,232,240", role: "support · leverage · protection", question: "What structures bear load, transmit force, protect organs, and provide attachment points?" },
  { id: "circulatory", label: "Cardiovascular", icon: Heart, rgb: "248,113,113", role: "pressure · flow · exchange", question: "How are oxygen, nutrients, heat, hormones, and waste moved between tissues?" },
  { id: "respiratory", label: "Respiratory", icon: Lungs, rgb: "125,211,252", role: "ventilation · diffusion · regulation", question: "How do airflow, gas exchange, mechanics, and control work together across lungs and circulation?" },
  { id: "nervous", label: "Nervous", icon: Brain, rgb: "103,232,249", role: "sensing · integration · control", question: "How are signals detected, transmitted, integrated, and converted into coordinated responses?" },
  { id: "immune", label: "Immune", icon: Shield, rgb: "192,132,252", role: "recognition · response · memory", question: "How does the body distinguish threats, coordinate defense, limit damage, and adapt after exposure?" },
] as const;

type LayerId = (typeof LAYERS)[number]["id"];

export default function AnatomyWidget() {
  const [activeLayer, setActiveLayer] = useState<LayerId>("skeletal");
  const active = LAYERS.find((layer) => layer.id === activeLayer) ?? LAYERS[0];

  return (
    <div className="overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#07100f]/72 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <h3 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-teal-100/66"><Activity size={13} /> System lens</h3>
        <span className="font-mono text-[10px] uppercase text-slate-600">schematic</span>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[160px_minmax(0,1fr)] lg:grid-cols-1">
        <div className="relative mx-auto h-[250px] w-[150px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-black/20">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(45,212,191,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />
          <BodySchematic layer={activeLayer} rgb={active.rgb} />
          <div className="absolute inset-x-0 top-[14%] h-px bg-teal-200/28 shadow-[0_0_14px_rgba(94,234,212,0.3)] animate-[system-scan_8s_ease-in-out_infinite_alternate] motion-reduce:animate-none" />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {LAYERS.map((layer) => {
              const Icon = layer.icon;
              const selected = layer.id === activeLayer;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayer(layer.id)}
                  className="flex items-center gap-2 border px-2.5 py-2 text-left transition"
                  style={{ borderColor: selected ? `rgba(${layer.rgb},0.28)` : "rgba(255,255,255,0.055)", background: selected ? `rgba(${layer.rgb},0.055)` : "rgba(0,0,0,0.03)" }}
                >
                  <Icon size={13} style={{ color: `rgb(${layer.rgb})` }} />
                  <span className="text-[11px] font-semibold text-white/78">{layer.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 border-t border-white/[0.06] pt-3">
            <strong className="font-mono text-[10px] uppercase tracking-[0.06em]" style={{ color: `rgba(${active.rgb},0.68)` }}>{active.role}</strong>
            <p className="mt-2 text-[11px] leading-5 text-slate-400/78">{active.question}</p>
            <p className="mt-2 text-[10px] leading-4 text-slate-600">This diagram is conceptual, not anatomical imaging and not a diagnostic tool.</p>
          </div>
        </div>
      </div>
      <style>{`@keyframes system-scan { from { transform: translateY(0); } to { transform: translateY(178px); } }`}</style>
    </div>
  );
}

function BodySchematic({ layer, rgb }: { layer: LayerId; rgb: string }) {
  return (
    <svg className="absolute inset-[8%_12%] h-[84%] w-[76%]" viewBox="0 0 100 210" aria-hidden="true">
      <circle cx="50" cy="20" r="13" fill="none" stroke={`rgba(${rgb},0.30)`} strokeWidth="2" />
      <path d="M50 34v64M27 53l23 16 23-16M34 98l-9 63M66 98l9 63M50 98l-13 77M50 98l13 77" fill="none" stroke={`rgba(${rgb},0.28)`} strokeWidth="2" strokeLinecap="round" />
      {layer === "circulatory" ? <><path d="M50 55c-11-12-23 5 0 19 23-14 11-31 0-19Z" fill={`rgba(${rgb},0.22)`} /><path d="M50 72v91M50 88l-20 29M50 88l20 29" fill="none" stroke={`rgba(${rgb},0.22)`} /></> : null}
      {layer === "respiratory" ? <><path d="M48 43v19M52 43v19" stroke={`rgba(${rgb},0.23)`} /><ellipse cx="39" cy="76" rx="12" ry="25" fill={`rgba(${rgb},0.08)`} stroke={`rgba(${rgb},0.24)`} /><ellipse cx="61" cy="76" rx="12" ry="25" fill={`rgba(${rgb},0.08)`} stroke={`rgba(${rgb},0.24)`} /></> : null}
      {layer === "nervous" ? <><circle cx="50" cy="20" r="9" fill={`rgba(${rgb},0.16)`} /><path d="M50 30v132M50 63L28 91M50 63l22 28M50 112l-13 62M50 112l13 62" fill="none" stroke={`rgba(${rgb},0.20)`} /></> : null}
      {layer === "immune" ? [44, 65, 88, 111, 134].map((y, index) => <circle key={y} cx={index % 2 ? 61 : 39} cy={y} r="4" fill={`rgba(${rgb},0.16)`} stroke={`rgba(${rgb},0.28)`} />) : null}
      {layer === "skeletal" ? <><path d="M33 56h34M39 65h22M40 75h20M41 85h18" stroke={`rgba(${rgb},0.18)`} /><ellipse cx="50" cy="103" rx="18" ry="9" fill="none" stroke={`rgba(${rgb},0.22)`} /></> : null}
    </svg>
  );
}
