"use client";

import { useState } from "react";
import { Layers3, RefreshCw, Shield, Sparkles, Swords } from "lucide-react";

type PlanId = "aggro" | "midrange" | "control" | "combo";

const PLANS: readonly {
  id: PlanId;
  name: string;
  cue: string;
  gamePlan: string;
  resources: string;
  pressurePoint: string;
  horizon: string;
  icon: typeof Swords;
  rgb: string;
}[] = [
  {
    id: "aggro",
    name: "Aggro",
    cue: "early pressure · efficient threats",
    gamePlan: "Convert cards and mana into pressure quickly enough that the opponent has limited time to deploy slower advantages.",
    resources: "Often values low-cost threats, reach, tempo, and damage efficiency over long-game resource accumulation.",
    pressurePoint: "Can struggle when early pressure is neutralized efficiently or when the game extends beyond the deck's strongest window.",
    horizon: "earlier turns",
    icon: Swords,
    rgb: "248,113,113",
  },
  {
    id: "midrange",
    name: "Midrange",
    cue: "flexibility · efficient threats + interaction",
    gamePlan: "Contest the middle of the game with individually strong cards and shift between pressure and defense as the matchup demands.",
    resources: "Often trades one-for-one early, then tries to gain value from higher-impact threats, card quality, or flexible answers.",
    pressurePoint: "Can be pulled apart by strategies that are much faster or that generate stronger long-game inevitability or synergy.",
    horizon: "middle turns",
    icon: Sparkles,
    rgb: "250,204,21",
  },
  {
    id: "control",
    name: "Control",
    cue: "answers · card advantage · long game",
    gamePlan: "Survive and exchange resources until the game reaches a state where opposing threats are contained and late-game advantages dominate.",
    resources: "Often emphasizes removal, counterplay, card selection, card advantage, sweepers, and a smaller number of durable win conditions.",
    pressurePoint: "Can be stressed by threats that arrive before answers line up, resilient value engines, or strategies that attack from unusual angles.",
    horizon: "later turns",
    icon: Shield,
    rgb: "96,165,250",
  },
  {
    id: "combo",
    name: "Combo",
    cue: "synergy · assembly · conversion",
    gamePlan: "Assemble a set of interactions that produces a disproportionately powerful effect, engine, lock, or win condition.",
    resources: "Often values tutoring, card selection, redundancy, protection, mana acceleration, or pieces whose combined value exceeds their isolated value.",
    pressurePoint: "Can be disrupted by interaction aimed at key pieces, timing windows, graveyards, mana, or the specific resource the combo requires.",
    horizon: "variable",
    icon: RefreshCw,
    rgb: "192,132,252",
  },
] as const;

export default function ArchetypeTriangle() {
  const [activeId, setActiveId] = useState<PlanId>("midrange");
  const active = PLANS.find((plan) => plan.id === activeId) ?? PLANS[1];
  const ActiveIcon = active.icon;

  return (
    <section className="overflow-hidden rounded-[22px] border border-amber-100/[0.10] bg-[#100c07]/70 backdrop-blur-xl">
      <div className="border-b border-white/[0.07] p-4">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/68"><Layers3 size={13} /> Strategic plans</div>
        <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">Archetype names describe plans, not guaranteed matchups.</h3>
      </div>

      <div className="grid gap-5 p-4 lg:grid-cols-[230px_minmax(0,1fr)] sm:p-5">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            const selected = active.id === plan.id;
            return (
              <button key={plan.id} type="button" onClick={() => setActiveId(plan.id)} className="rounded-[14px] border p-3 text-left transition" style={{ borderColor: selected ? `rgba(${plan.rgb},0.30)` : "rgba(255,255,255,0.06)", background: selected ? `rgba(${plan.rgb},0.055)` : "rgba(0,0,0,0.04)" }}>
                <div className="flex items-center gap-2"><Icon size={14} style={{ color: `rgb(${plan.rgb})` }} /><strong className="text-[12px] text-white/86">{plan.name}</strong></div>
                <span className="mt-1.5 block text-[10px] leading-4 text-slate-500">{plan.cue}</span>
              </button>
            );
          })}
        </div>

        <div>
          <div className="flex items-start gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${active.rgb})`, borderColor: `rgba(${active.rgb},0.26)`, background: `rgba(${active.rgb},0.04)` }}><ActiveIcon size={18} /></span><div><div className="font-mono text-[10px] uppercase tracking-[0.06em]" style={{ color: `rgba(${active.rgb},0.68)` }}>typical horizon · {active.horizon}</div><h4 className="mt-1 text-[23px] font-semibold text-white">{active.name}</h4></div></div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <Note label="Primary plan" text={active.gamePlan} />
            <Note label="Resource tendency" text={active.resources} />
            <Note label="Pressure point" text={active.pressurePoint} />
          </div>
          <p className="mt-4 border-l-2 border-amber-300/28 pl-3 text-[11px] leading-5 text-slate-500">Real decks blend plans, change roles after sideboarding, and occupy different positions in different formats and metagames. “Aggro,” “control,” “midrange,” and “combo” are useful abstractions, not immutable species or matchup laws.</p>
        </div>
      </div>
    </section>
  );
}

function Note({ label, text }: { label: string; text: string }) {
  return <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500">{label}</div><p className="mt-1.5 text-[11px] leading-5 text-slate-400">{text}</p></div>;
}
