"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import ManaBackground from "../ManaBackground";
import CardAnatomyWidget from "./CardAnatomyWidget";
import FormatCompass from "./FormatCompass";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Layers3,
  Library,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const ZONES = [
  ["Library", "Ordered face-down deck; drawing normally moves the top card to hand."],
  ["Hand", "Private zone holding cards a player may be able to play or cast."],
  ["Battlefield", "Shared zone containing permanents after they enter play."],
  ["Graveyard", "Public discard zone that can itself become a strategic resource."],
  ["Exile", "A separate public zone used by many effects; exile does not mean the object can never matter again."],
  ["Stack", "Temporary zone where most spells and many abilities wait to resolve in last-in, first-out order."],
] as const;

const TURN = [
  ["Beginning", "untap · upkeep · draw"],
  ["Precombat main", "land play · sorcery-speed actions"],
  ["Combat", "begin combat · attackers · blockers · damage · end combat"],
  ["Postcombat main", "another main phase"],
  ["Ending", "end step · cleanup"],
] as const;

const STACK_ITEMS = [
  { id: "a", label: "Your spell", note: "cast first", rgb: "34,211,238" },
  { id: "b", label: "Opponent response", note: "added second", rgb: "248,113,113" },
] as const;

export default function MTGFundamentalsPage() {
  const [stackStep, setStackStep] = useState(0);

  return (
    <SceneFrame
      background={<ManaBackground />}
      className="bg-[#090705] text-slate-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1460px]"
      headerBackground="rgba(9,7,5,0.56)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Humanities", href: "/humanities" },
            { label: "Gaming", href: "/humanities/gaming" },
            { label: "Game Repository", href: "/humanities/gaming/repository" },
            { label: "Magic: The Gathering", href: "/humanities/gaming/repository/magic-the-gathering" },
            { label: "Fundamentals" },
          ]}
          eyebrow="Cards · zones · priority · stack · turns · formats"
          eyebrowStyle="rule"
          icon={BookOpen}
          title={<span>MTG Fundamentals</span>}
          subtitle="Read Magic as a rules engine: cards are structured objects, objects move among zones, players receive priority to act, and timing determines how spells and abilities interact."
          accentRgb="250, 204, 21"
          titleClassName="font-sans text-[clamp(2.6rem,5vw,5.6rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fffbea]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="mt-5 rounded-[24px] border border-amber-100/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/68">Start with timing</div>
        <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">You cast a spell. Your opponent responds before it resolves. Which effect happens first?</h2>
        <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-300/76">Magic separates <strong className="text-white">playing or casting an object</strong> from <strong className="text-white">resolving it</strong>. The stack lets players respond before the newest spell or ability resolves.</p>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
        <StackLab step={stackStep} setStep={setStackStep} />
        <Surface variant="open" className="rounded-[22px] border-violet-100/[0.08] p-5 xl:sticky xl:top-[170px]">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-200/58"><Clock3 size={13} /> Priority &amp; stack boundary</div>
          <p className="mt-3 text-[13px] leading-6 text-slate-400">The stack model is fundamental, but not every game action uses it. Playing a land is a special action, and mana abilities have special timing rules. The comprehensive rules define many additional priority and timing details beyond this teaching example.</p>
          <p className="mt-3 text-[12px] leading-5 text-slate-500">The safe mental model is: identify the action, ask whether it uses the stack, identify who has priority, then resolve the stack from newest object to oldest when all players pass in succession.</p>
        </Surface>
      </section>

      <section className="mt-8">
        <CardAnatomyWidget />
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
        <Surface variant="glass" className="rounded-[22px] border-cyan-100/[0.09] p-5 sm:p-6" style={{ background: "rgba(5,13,18,0.16)" }}>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><Library size={13} /> Zones</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {ZONES.map(([zone, text]) => <div key={zone} className="rounded-[15px] border border-white/[0.06] bg-black/[0.10] p-3"><strong className="text-[12px] text-white">{zone}</strong><p className="mt-1.5 text-[11px] leading-5 text-slate-400">{text}</p></div>)}
          </div>
        </Surface>

        <Surface variant="open" className="rounded-[22px] border-amber-100/[0.08] p-5 sm:p-6 xl:sticky xl:top-[170px]">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/58"><Layers3 size={13} /> Turn skeleton</div>
          <div className="mt-4 space-y-2">
            {TURN.map(([phase, detail], index) => <div key={phase} className="grid grid-cols-[26px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] pb-2 last:border-b-0"><span className="font-mono text-[9px] text-amber-200/42">0{index + 1}</span><div><strong className="text-[11px] text-white/84">{phase}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-500">{detail}</span></div></div>)}
          </div>
          <p className="mt-4 text-[10px] leading-5 text-slate-500">This is a phase-level map. Several phases contain multiple steps with their own turn-based actions and priority windows.</p>
        </Surface>
      </section>

      <section className="mt-8">
        <FormatCompass />
      </section>

      <section className="mt-8 rounded-[22px] border border-emerald-100/[0.08] bg-emerald-300/[0.02] p-5 backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-emerald-200/58"><Sparkles size={13} /> Next layer</div>
            <p className="mt-2 text-[13px] leading-6 text-slate-300/74">Rules tell you which actions are legal. Strategy asks which legal actions, cards, resource distributions, and plans make sense for the deck and environment you expect.</p>
          </div>
          <Link href="/humanities/gaming/repository/magic-the-gathering/strategy" className="group flex items-center justify-between rounded-[16px] border border-white/[0.07] bg-black/[0.10] p-4 text-[12px] font-semibold text-white/82 transition hover:bg-black/[0.18]">Continue to Strategy <ArrowRight size={13} className="text-emerald-200/55 transition group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </SceneFrame>
  );
}

function StackLab({ step, setStep }: { step: number; setStep: (step: number) => void }) {
  const visible = step === 0 ? [] : step === 1 ? [STACK_ITEMS[0]] : STACK_ITEMS;
  const resolved = step >= 3;
  return (
    <section className="overflow-hidden rounded-[22px] border border-cyan-100/[0.10] bg-[#071015]/72 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] p-4"><div><div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/68">Stack sequence</div><h3 className="mt-1 text-[20px] font-semibold text-white">Last in, first out</h3></div><button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400"><RotateCcw size={11} /> reset</button></div>
      <div className="grid gap-5 p-4 lg:grid-cols-[minmax(0,1fr)_240px] sm:p-5">
        <div className="flex min-h-[270px] flex-col-reverse justify-start gap-2 rounded-[18px] border border-white/[0.07] bg-black/[0.18] p-4">
          {!visible.length && !resolved ? <div className="m-auto text-center font-mono text-[10px] uppercase tracking-[0.06em] text-slate-600">stack empty</div> : null}
          {visible.map((item, index) => <div key={item.id} className={`rounded-[14px] border p-4 ${resolved && index === 1 ? "opacity-35" : ""}`} style={{ borderColor: `rgba(${item.rgb},0.24)`, background: `rgba(${item.rgb},0.04)` }}><div className="font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${item.rgb},0.68)` }}>{item.note}</div><strong className="mt-1 block text-[13px] text-white">{item.label}</strong></div>)}
          {resolved ? <div className="rounded-[14px] border border-emerald-300/[0.14] bg-emerald-300/[0.025] p-3 text-[12px] text-emerald-200">Opponent response resolves first. If your original spell is still on the stack and legal to resolve, it resolves afterward.</div> : null}
        </div>
        <div className="space-y-2">
          <StepButton active={step >= 1} number="01" label="Cast your spell" onClick={() => setStep(1)} />
          <StepButton active={step >= 2} number="02" label="Opponent responds" onClick={() => setStep(2)} />
          <StepButton active={step >= 3} number="03" label="Both pass; resolve newest first" onClick={() => setStep(3)} />
          <p className="pt-2 text-[10px] leading-5 text-slate-500">This example compresses priority passes and legality checks so the last-in, first-out relationship stays visible.</p>
        </div>
      </div>
    </section>
  );
}

function StepButton({ active, number, label, onClick }: { active: boolean; number: string; label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-[13px] border p-3 text-left transition" style={{ borderColor: active ? "rgba(34,211,238,0.20)" : "rgba(255,255,255,0.06)", background: active ? "rgba(34,211,238,0.035)" : "rgba(0,0,0,0.04)" }}><span className="font-mono text-[9px] text-cyan-200/52">{number}</span><strong className="text-[11px] text-white/80">{label}</strong></button>;
}
