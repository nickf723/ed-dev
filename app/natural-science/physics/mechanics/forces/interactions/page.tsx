"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import PhysicsBackground from "../../../_components/PhysicsBackground";
import {
  ArrowLeftRight,
  ArrowRight,
  Box,
  Check,
  CircleDot,
  Hand,
  Link2,
  RotateCcw,
  X,
  type LucideIcon,
} from "lucide-react";

type Scenario = {
  id: string;
  label: string;
  a: string;
  b: string;
  verb: string;
  context: string;
  aIcon: LucideIcon;
  bIcon: LucideIcon;
  rgbA: string;
  rgbB: string;
};

const SCENARIOS: readonly Scenario[] = [
  {
    id: "push",
    label: "Hand + crate",
    a: "hand",
    b: "crate",
    verb: "pushes",
    context: "A hand presses horizontally against a crate.",
    aIcon: Hand,
    bIcon: Box,
    rgbA: "250, 204, 21",
    rgbB: "34, 211, 238",
  },
  {
    id: "gravity",
    label: "Earth + ball",
    a: "Earth",
    b: "ball",
    verb: "attracts",
    context: "Earth and a ball attract one another gravitationally.",
    aIcon: CircleDot,
    bIcon: CircleDot,
    rgbA: "45, 212, 191",
    rgbB: "167, 139, 250",
  },
  {
    id: "rope",
    label: "Rope + sled",
    a: "rope",
    b: "sled",
    verb: "pulls",
    context: "A taut rope pulls on a sled while the sled pulls back on the rope.",
    aIcon: Link2,
    bIcon: Box,
    rgbA: "251, 146, 60",
    rgbB: "96, 165, 250",
  },
] as const;

type SystemSide = "a" | "b";
type CheckId = "pair" | "cancel";

export default function ForcesAsInteractionsPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [system, setSystem] = useState<SystemSide>("b");
  const [answers, setAnswers] = useState<Partial<Record<CheckId, string>>>({});
  const scenario = SCENARIOS[scenarioIndex];

  const chosen = system === "a" ? scenario.a : scenario.b;
  const partner = system === "a" ? scenario.b : scenario.a;
  const chosenRgb = system === "a" ? scenario.rgbA : scenario.rgbB;
  const forceDirection = system === "a" ? "left" : "right";

  function chooseScenario(index: number) {
    setScenarioIndex(index);
    setSystem("b");
    setAnswers({});
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#060a0f] text-slate-100 selection:bg-yellow-300/25">
      <PhysicsBackground mode="classical" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true">
        <div className="absolute left-[8%] top-[32%] h-px w-[42%] -rotate-3 bg-gradient-to-r from-transparent via-yellow-300/45 to-transparent" />
        <div className="absolute right-[4%] top-[57%] h-px w-[38%] rotate-2 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#060a0f]/78 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Forces", href: "/natural-science/physics/mechanics/forces" },
              { label: "Interactions" },
            ]}
            eyebrow="Force · interaction · system"
            icon={ArrowLeftRight}
            title={<span>Forces as Interactions</span>}
            subtitle="A force exists because two systems interact. Choose one system at a time and track which force acts on it, where that force comes from, and why the partner force belongs to the other object."
            accentRgb="250, 204, 21"
            titleClassName="font-mono text-[clamp(2.2rem,4.5vw,4.6rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#fffdf3]"
            headerClassName="border-transparent"
            aside={
              <div className="rounded-full border border-yellow-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-yellow-100/65 backdrop-blur-md">
                Forces · 01 / 05
              </div>
            }
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-yellow-200/[0.10] bg-black/[0.14] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-yellow-300/72">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">
              When two objects interact, whose force are we talking about?
            </h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">
              Every force statement needs three pieces: the object feeling the force, the interaction partner producing it, and the direction of the force. Saying only “there is a force” leaves out the relationship that created it.
            </p>
          </div>

          <div className="rounded-[18px] border border-yellow-200/[0.10] bg-yellow-300/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-yellow-300/64">Interaction grammar</div>
            <div className="mt-3 text-[17px] text-white"><M>{"\\vec F_{A\\to B}"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Read this as “the force exerted by A on B.” B is the object the force acts on.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.28fr)_minmax(310px,0.72fr)]">
          <div className="rounded-[30px] border border-white/[0.09] bg-black/[0.15] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 px-1">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-yellow-300/70">Interaction lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Change the system, not the interaction.</h2>
              </div>
              <div className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 font-mono text-[9px] text-slate-500">{scenario.label}</div>
            </div>

            <div className="relative mt-4 min-h-[390px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#071019]/82 p-5">
              <div className="absolute inset-0 opacity-45" style={{ backgroundImage: "linear-gradient(rgba(250,204,21,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.04) 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
              <div className="relative z-10 flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.12em] text-slate-600">
                <span>{scenario.context}</span>
                <span>choose one system</span>
              </div>

              <InteractionScene scenario={scenario} system={system} />

              <div className="relative z-10 mt-2 grid gap-2 sm:grid-cols-2">
                <SystemButton scenario={scenario} side="a" active={system === "a"} onClick={() => setSystem("a")} />
                <SystemButton scenario={scenario} side="b" active={system === "b"} onClick={() => setSystem("b")} />
              </div>

              <div className="relative z-10 mt-4 rounded-[17px] border px-4 py-3" style={{ borderColor: `rgba(${chosenRgb},0.16)`, background: `rgba(${chosenRgb},0.035)` }}>
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${chosenRgb},0.70)` }}>Selected system: {chosen}</div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-slate-300">
                  <span>{partner} exerts a force on {chosen}</span>
                  <span className="text-slate-700">·</span>
                  <span className="font-mono" style={{ color: `rgb(${chosenRgb})` }}><M>{system === "a" ? "\\vec F_{B\\to A}" : "\\vec F_{A\\to B}"}</M></span>
                  <span className="text-slate-700">·</span>
                  <span>{forceDirection === "right" ? "points toward the right in this sketch" : "points toward the left in this sketch"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.16] p-5 backdrop-blur-xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Curated interactions</div>
              <div className="mt-4 space-y-2">
                {SCENARIOS.map((item, index) => (
                  <button key={item.id} type="button" onClick={() => chooseScenario(index)} className={`w-full rounded-[15px] border px-3 py-3 text-left transition ${scenarioIndex === index ? "border-yellow-200/22 bg-yellow-300/[0.055]" : "border-white/[0.06] bg-white/[0.012] hover:border-white/[0.12]"}`}>
                    <span className="block text-[11px] font-semibold text-white">{item.label}</span>
                    <span className="mt-1 block text-[9px] leading-4 text-slate-600">{item.context}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-cyan-200/[0.10] bg-cyan-300/[0.022] p-5 backdrop-blur-xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/66">Notice the invariant</div>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">Changing the chosen system does not create a new interaction. It changes which member of the interaction pair belongs on the diagram you are currently building.</p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <RuleCard
            number="01"
            title="Name the interaction"
            text="A force is produced by an interaction between systems. Contact is one kind of interaction; gravity can act without contact."
            rgb="250, 204, 21"
          />
          <RuleCard
            number="02"
            title="Choose the system"
            text="A force vector belongs to the object that experiences that force. Change the chosen object and the relevant vector changes too."
            rgb="34, 211, 238"
          />
          <RuleCard
            number="03"
            title="Keep the pair separate"
            text="Interaction partners exert equal-magnitude, opposite-direction forces on each other, but those forces act on different objects."
            rgb="167, 139, 250"
          />
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-[26px] border border-violet-200/[0.11] bg-violet-300/[0.022] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/68">Stress-test the misconception</div>
            <h2 className="mt-2 text-[21px] font-semibold tracking-[-0.03em] text-white">Equal and opposite does not mean “they cancel.”</h2>
            <p className="mt-3 text-[12px] leading-6 text-slate-400">Cancellation is a statement about the vector sum of forces acting on one chosen system. An interaction pair lives on two different systems, so you cannot add the pair together on one object’s free-body diagram.</p>
            <div className="mt-4 rounded-[17px] border border-white/[0.06] bg-black/[0.14] px-4 py-3 font-mono text-[11px] text-slate-400">
              same interaction pair ≠ same free-body diagram
            </div>
          </div>

          <TransferCheck answers={answers} setAnswers={setAnswers} />
        </section>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pb-5">
          <Link href="/natural-science/physics/mechanics/forces" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-2 text-[10px] font-semibold text-slate-500 transition hover:text-slate-300">
            ← Forces map
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/[0.08] bg-orange-300/[0.018] px-3 py-2 text-[10px] text-slate-600">
            Next: Common Forces <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </main>
  );
}

function InteractionScene({ scenario, system }: { scenario: Scenario; system: SystemSide }) {
  const AIcon = scenario.aIcon;
  const BIcon = scenario.bIcon;
  return (
    <div className="relative z-10 mx-auto mt-8 h-[210px] max-w-[760px]">
      <div className="absolute left-[18%] top-1/2 -translate-y-1/2">
        <ObjectNode icon={AIcon} label={scenario.a} rgb={scenario.rgbA} active={system === "a"} />
      </div>
      <div className="absolute right-[18%] top-1/2 -translate-y-1/2">
        <ObjectNode icon={BIcon} label={scenario.b} rgb={scenario.rgbB} active={system === "b"} />
      </div>

      <div className="absolute left-[31%] right-[31%] top-[46%] h-px bg-gradient-to-r from-yellow-300/45 via-white/20 to-cyan-300/45" />
      <div className="absolute left-[42%] top-[calc(46%-4px)] h-2 w-2 rotate-45 border-b border-l border-yellow-200/70" />
      <div className="absolute right-[42%] top-[calc(46%-4px)] h-2 w-2 rotate-45 border-r border-t border-cyan-200/70" />
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 rounded-full border border-white/[0.06] bg-black/30 px-3 py-1.5 font-mono text-[9px] text-slate-500">one interaction · two forces</div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-slate-500">
        <span style={{ color: `rgba(${scenario.rgbA},0.72)` }}><M>{"\\vec F_{B\\to A}"}</M></span>
        <span className="mx-3 text-slate-700">pair</span>
        <span style={{ color: `rgba(${scenario.rgbB},0.72)` }}><M>{"\\vec F_{A\\to B}"}</M></span>
      </div>
    </div>
  );
}

function ObjectNode({ icon: Icon, label, rgb, active }: { icon: LucideIcon; label: string; rgb: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`flex h-24 w-24 items-center justify-center rounded-[26px] border transition-all ${active ? "scale-105" : "opacity-55"}`} style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},${active ? "0.36" : "0.12"})`, background: `rgba(${rgb},${active ? "0.08" : "0.025"})`, boxShadow: active ? `0 0 48px rgba(${rgb},0.13)` : undefined }}>
        <Icon size={31} strokeWidth={1.45} />
      </div>
      <strong className={`mt-3 text-[12px] ${active ? "text-white" : "text-slate-600"}`}>{label}</strong>
      {active ? <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.70)` }}>chosen system</span> : null}
    </div>
  );
}

function SystemButton({ scenario, side, active, onClick }: { scenario: Scenario; side: SystemSide; active: boolean; onClick: () => void }) {
  const label = side === "a" ? scenario.a : scenario.b;
  const rgb = side === "a" ? scenario.rgbA : scenario.rgbB;
  return (
    <button type="button" onClick={onClick} className="rounded-[15px] border px-4 py-3 text-left transition" style={{ borderColor: active ? `rgba(${rgb},0.28)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${rgb},0.055)` : "rgba(255,255,255,0.012)" }}>
      <span className="block text-[9px] uppercase tracking-[0.11em] text-slate-600">Choose system</span>
      <strong className="mt-1 block text-[12px]" style={{ color: active ? `rgb(${rgb})` : "rgb(148,163,184)" }}>{label}</strong>
    </button>
  );
}

function RuleCard({ number, title, text, rgb }: { number: string; title: string; text: string; rgb: string }) {
  return (
    <div className="rounded-[19px] border border-white/[0.06] bg-black/[0.14] p-4 backdrop-blur-xl">
      <div className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.62)` }}>{number}</div>
      <h3 className="mt-3 text-[14px] font-semibold text-white">{title}</h3>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}

function TransferCheck({ answers, setAnswers }: { answers: Partial<Record<CheckId, string>>; setAnswers: (next: Partial<Record<CheckId, string>>) => void }) {
  const pairCorrect = answers.pair === "crate";
  const cancelCorrect = answers.cancel === "no";

  function answer(id: CheckId, value: string) {
    setAnswers({ ...answers, [id]: value });
  }

  function reset() {
    setAnswers({});
  }

  return (
    <div className="rounded-[26px] border border-white/[0.08] bg-black/[0.16] p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-yellow-300/68">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.025em] text-white">Can you keep the systems straight?</h2>
        </div>
        <button type="button" onClick={reset} className="rounded-full border border-white/[0.06] p-2 text-slate-600 transition hover:text-slate-300" aria-label="Reset transfer check"><RotateCcw size={13} /></button>
      </div>

      <CheckQuestion
        prompt="A hand pushes a crate. Which force belongs on the crate's free-body diagram?"
        options={[{ value: "crate", label: "Force of the hand on the crate" }, { value: "hand", label: "Force of the crate on the hand" }]}
        selected={answers.pair}
        onSelect={(value) => answer("pair", value)}
        correct={pairCorrect}
        feedback={answers.pair ? (pairCorrect ? "Correct. The free-body diagram contains forces acting on the chosen system, the crate." : "That force acts on the hand, so it belongs on the hand's diagram instead.") : undefined}
      />

      <CheckQuestion
        prompt="The hand-on-crate and crate-on-hand forces are equal and opposite. Do they cancel each other on the crate?"
        options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
        selected={answers.cancel}
        onSelect={(value) => answer("cancel", value)}
        correct={cancelCorrect}
        feedback={answers.cancel ? (cancelCorrect ? "Correct. They act on different systems, so they are never summed on one object's free-body diagram." : "Equal and opposite is not enough for cancellation. The forces would need to act on the same chosen system to be added together there.") : undefined}
      />
    </div>
  );
}

function CheckQuestion({ prompt, options, selected, onSelect, correct, feedback }: { prompt: string; options: readonly { value: string; label: string }[]; selected?: string; onSelect: (value: string) => void; correct: boolean; feedback?: string }) {
  return (
    <div className="mt-4 border-t border-white/[0.06] pt-4 first:border-t-0 first:pt-0">
      <div className="text-[11px] leading-5 text-slate-300">{prompt}</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button key={option.value} type="button" onClick={() => onSelect(option.value)} className={`rounded-[14px] border px-3 py-2.5 text-left text-[10px] transition ${selected === option.value ? "border-yellow-200/24 bg-yellow-300/[0.05] text-white" : "border-white/[0.06] bg-white/[0.012] text-slate-500 hover:text-slate-300"}`}>{option.label}</button>
        ))}
      </div>
      {feedback ? (
        <div className={`mt-3 flex items-start gap-2 rounded-[13px] border px-3 py-2.5 text-[10px] leading-5 ${correct ? "border-emerald-300/[0.14] bg-emerald-300/[0.025] text-emerald-100/75" : "border-rose-300/[0.13] bg-rose-300/[0.02] text-rose-100/70"}`}>
          {correct ? <Check size={13} className="mt-0.5 shrink-0" /> : <X size={13} className="mt-0.5 shrink-0" />} {feedback}
        </div>
      ) : null}
    </div>
  );
}
