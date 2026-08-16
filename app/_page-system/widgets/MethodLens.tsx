"use client";

import { useState } from "react";
import { Eye, FlaskConical, Sparkles, Sigma } from "lucide-react";

type MethodId = "observe" | "model";

const METHODS = {
  observe: {
    label: "Observe",
    icon: Eye,
    rgb: "34, 211, 238",
    question: "What signal reached us?",
    description:
      "Astronomers measure light, timing, spectra, particles, position, and motion. Observation converts distant phenomena into data with uncertainty.",
    steps: ["collect signal", "calibrate instrument", "measure uncertainty", "extract pattern"],
  },
  model: {
    label: "Model",
    icon: Sigma,
    rgb: "192, 132, 252",
    question: "What physical system could produce it?",
    description:
      "Theory and simulation turn physical laws into predicted signals. Models are compared with observations and revised when they fail.",
    steps: ["state assumptions", "apply physics", "predict signal", "compare with data"],
  },
} as const;

export default function MethodLens() {
  const [method, setMethod] = useState<MethodId>("observe");
  const active = METHODS[method];
  const Icon = active.icon;

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
      <div className="grid md:grid-cols-2">
        {(Object.keys(METHODS) as MethodId[]).map((id) => {
          const item = METHODS[id];
          const ItemIcon = item.icon;
          const selected = method === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setMethod(id)}
              className={`border-b border-white/[0.07] p-5 text-left transition md:border-b-0 md:border-r md:last:border-r-0 sm:p-6 ${selected ? "bg-white/[0.025]" : "hover:bg-white/[0.018]"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.2)`, background: `rgba(${item.rgb},0.04)` }}><ItemIcon size={16} /></span>
                {selected ? <Sparkles size={12} style={{ color: `rgb(${item.rgb})` }} /> : null}
              </div>
              <div className="mt-4 font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: `rgba(${item.rgb},0.68)` }}>{item.question}</div>
              <h3 className="mt-1 text-[18px] font-semibold text-white">{item.label}</h3>
            </button>
          );
        })}
      </div>

      <div className="border-t border-white/[0.07] p-5 sm:p-6">
        <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${active.rgb},0.72)` }}><Icon size={12} /> {active.label} as a method</div>
        <p className="mt-3 max-w-3xl text-[11px] leading-6 text-slate-400">{active.description}</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-4">
          {active.steps.map((step, index) => (
            <div key={step} className="rounded-[14px] border border-white/[0.06] bg-white/[0.014] p-3">
              <div className="font-mono text-[7px]" style={{ color: `rgba(${active.rgb},0.5)` }}>0{index + 1}</div>
              <div className="mt-3 text-[9px] font-medium capitalize text-slate-300">{step}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-[14px] border border-white/[0.06] bg-white/[0.012] px-4 py-3 text-[9px] leading-4 text-slate-600">
          <FlaskConical size={13} className="shrink-0 text-slate-700" />
          Observation and theory are not competing branches of astronomy. They are complementary parts of the same evidence cycle and can be used at every cosmic scale.
        </div>
      </div>
    </div>
  );
}
