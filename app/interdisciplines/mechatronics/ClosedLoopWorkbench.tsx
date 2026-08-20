"use client";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  CircuitBoard,
  Cog,
  Crosshair,
  Gauge,
  ScanLine,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

type StageId = "sense" | "decide" | "actuate" | "move";
type FaultId = "none" | "sensor" | "control" | "actuator" | "load";

type Stage = {
  id: StageId;
  label: string;
  short: string;
  question: string;
  signal: string;
  discipline: string;
  icon: LucideIcon;
  rgb: string;
};

const STAGES: readonly Stage[] = [
  {
    id: "sense",
    label: "Sense",
    short: "measure the machine",
    question: "What is the system actually doing right now?",
    signal: "position · velocity · force · temperature · current",
    discipline: "sensors · instrumentation · electronics",
    icon: ScanLine,
    rgb: "34,211,238",
  },
  {
    id: "decide",
    label: "Decide",
    short: "compare target and state",
    question: "What correction should be commanded from the measured error?",
    signal: "setpoint − measurement → control command",
    discipline: "control theory · embedded software · computation",
    icon: CircuitBoard,
    rgb: "167,139,250",
  },
  {
    id: "actuate",
    label: "Actuate",
    short: "turn command into force",
    question: "How does an electrical or fluid command become torque, force, heat, or motion?",
    signal: "voltage · current · pressure → physical effort",
    discipline: "motors · drives · power electronics · pneumatics",
    icon: Zap,
    rgb: "251,146,60",
  },
  {
    id: "move",
    label: "Move",
    short: "let mechanics respond",
    question: "How do mass, stiffness, friction, geometry, and external loads shape the motion?",
    signal: "force + mechanism + load → new physical state",
    discipline: "mechanics · machine design · dynamics",
    icon: Cog,
    rgb: "74,222,128",
  },
];

const FAULTS: readonly {
  id: FaultId;
  label: string;
  stage: StageId | null;
  symptom: string;
  intuition: string;
}[] = [
  {
    id: "none",
    label: "Nominal loop",
    stage: null,
    symptom: "Measurement, control, actuation, and mechanics agree closely enough for the loop to keep correcting error.",
    intuition: "Feedback works because the machine repeatedly measures the result of its own action instead of assuming the previous command worked perfectly.",
  },
  {
    id: "sensor",
    label: "Biased sensor",
    stage: "sense",
    symptom: "The controller receives the wrong state, so even a mathematically correct control law can steer toward the wrong physical result.",
    intuition: "A feedback loop can only correct the error it can observe. Bad measurement moves the reference frame of the whole machine.",
  },
  {
    id: "control",
    label: "Poor control rule",
    stage: "decide",
    symptom: "The machine may respond too slowly, oscillate, overshoot, or amplify noise even when sensing and hardware are healthy.",
    intuition: "The controller is not merely an on/off switch. It translates error into action over time, so timing and gain shape stability.",
  },
  {
    id: "actuator",
    label: "Weak actuator",
    stage: "actuate",
    symptom: "Commands saturate or lag because the physical actuator cannot produce the requested effort quickly or strongly enough.",
    intuition: "Software cannot command unlimited physics. Torque, voltage, pressure, current, heat, and speed all impose real ceilings.",
  },
  {
    id: "load",
    label: "Unexpected load",
    stage: "move",
    symptom: "The same command produces a different motion because friction, payload, geometry, or disturbance changed the plant itself.",
    intuition: "The mechanism is part of the computation. A robot arm carrying a heavy object is dynamically different from the same arm moving empty.",
  },
];

export default function ClosedLoopWorkbench() {
  const [activeStage, setActiveStage] = useState<StageId>("decide");
  const [fault, setFault] = useState<FaultId>("none");

  const selectedStage = STAGES.find((stage) => stage.id === activeStage) ?? STAGES[0];
  const selectedFault = FAULTS.find((item) => item.id === fault) ?? FAULTS[0];

  return (
    <section className="overflow-hidden border-y border-white/[0.09] bg-[#061015]/40 backdrop-blur-xl">
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0 border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-cyan-200/65">Closed-loop machine</div>
              <h2 className="mt-1 text-[clamp(1.45rem,2.8vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">A mechatronic system keeps asking the machine what happened.</h2>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-slate-600">target → action → measurement → correction</span>
          </div>

          <div className="mt-5 grid gap-2 lg:grid-cols-4">
            {STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const active = activeStage === stage.id;
              const faulted = selectedFault.stage === stage.id;
              return (
                <div key={stage.id} className="relative">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveStage(stage.id)}
                    onFocus={() => setActiveStage(stage.id)}
                    onClick={() => setActiveStage(stage.id)}
                    className="group flex min-h-[116px] w-full flex-col border p-3 text-left transition hover:bg-white/[0.025]"
                    style={{
                      borderColor: faulted ? "rgba(248,113,113,0.42)" : active ? `rgba(${stage.rgb},0.36)` : "rgba(255,255,255,0.07)",
                      background: faulted ? "rgba(127,29,29,0.08)" : active ? `rgba(${stage.rgb},0.05)` : "rgba(0,0,0,0.08)",
                    }}
                    aria-pressed={active}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex h-8 w-8 items-center justify-center border" style={{ color: `rgb(${stage.rgb})`, borderColor: `rgba(${stage.rgb},0.24)` }}>
                        <Icon size={14} strokeWidth={1.55} />
                      </span>
                      <span className="font-mono text-[8px] text-slate-700">0{index + 1}</span>
                    </div>
                    <strong className="mt-3 text-[16px] text-white">{stage.label}</strong>
                    <span className="mt-1 text-[11px] leading-4 text-slate-500">{stage.short}</span>
                  </button>
                  {index < STAGES.length - 1 ? (
                    <ArrowRight className="absolute -right-[7px] top-1/2 z-10 hidden -translate-y-1/2 text-slate-700 lg:block" size={13} />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-cyan-100/[0.08] pt-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/[0.20] text-cyan-200/70"><Activity size={13} /></div>
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[8px] uppercase tracking-[0.06em] text-cyan-200/50">Feedback path</div>
              <div className="mt-0.5 text-[11px] leading-5 text-slate-500">The new physical state loops back into sensing. That repeated comparison is what lets the machine reject disturbances instead of blindly replaying commands.</div>
            </div>
            <ArrowRight size={14} className="hidden rotate-180 text-cyan-200/35 sm:block" />
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-5" aria-label="Mechatronics failure scenarios">
            {FAULTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setFault(item.id);
                  if (item.stage) setActiveStage(item.stage);
                }}
                className="border px-3 py-2 text-left font-mono text-[8px] uppercase tracking-[0.045em] transition hover:bg-white/[0.025]"
                style={{
                  borderColor: fault === item.id ? "rgba(251,146,60,0.34)" : "rgba(255,255,255,0.07)",
                  color: fault === item.id ? "rgba(253,186,116,0.90)" : "rgba(148,163,184,0.52)",
                  background: fault === item.id ? "rgba(251,146,60,0.05)" : "transparent",
                }}
                aria-pressed={fault === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="p-4 sm:p-5 xl:sticky xl:top-[170px] xl:self-start">
          <div className="font-mono text-[8px] uppercase tracking-[0.07em] text-slate-600">Inspecting stage</div>
          <div className="mt-2 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border" style={{ color: `rgb(${selectedStage.rgb})`, borderColor: `rgba(${selectedStage.rgb},0.28)`, background: `rgba(${selectedStage.rgb},0.035)` }}>
              <selectedStage.icon size={17} strokeWidth={1.5} />
            </span>
            <div>
              <strong className="text-[19px] text-white">{selectedStage.label}</strong>
              <div className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.05em]" style={{ color: `rgba(${selectedStage.rgb},0.68)` }}>{selectedStage.discipline}</div>
            </div>
          </div>

          <p className="mt-4 text-[14px] leading-6 text-slate-300">{selectedStage.question}</p>

          <div className="mt-4 border-t border-white/[0.07] pt-3">
            <div className="font-mono text-[8px] uppercase tracking-[0.06em] text-slate-600">Signal transformation</div>
            <p className="mt-1.5 text-[12px] leading-5 text-cyan-100/65">{selectedStage.signal}</p>
          </div>

          <div className="mt-4 border-t border-white/[0.07] pt-3">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.06em] text-orange-200/55"><Wrench size={11} /> Scenario</div>
            <strong className="mt-2 block text-[14px] text-white">{selectedFault.label}</strong>
            <p className="mt-1.5 text-[11px] leading-5 text-slate-400">{selectedFault.symptom}</p>
            <p className="mt-2 border-l border-orange-200/[0.18] pl-3 text-[11px] leading-5 text-slate-500">{selectedFault.intuition}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
