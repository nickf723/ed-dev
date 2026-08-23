"use client";

import { useState } from "react";
import { ArrowLeftRight, Beaker, Droplets, Sparkles } from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import ClassroomLessonShell, {
  type ClassroomLessonNavItem,
} from "@/app/classroom/_components/lessons/ClassroomLessonShell";
import {
  breakBond,
  buildBond,
  getPolymerBenchState,
  maxBonds,
  waterForCompleteBuild,
  waterForHydrolysis,
} from "@/app/classroom/_components/lessons/polymer-reactions-model";

type PolymerLessonProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  unitHref: string;
};

type ScaleAnswer = "three" | "four" | "five";

const STAGES = [
  "Notice",
  "Build",
  "Reverse",
  "Scale",
  "Transfer",
  "Practice",
  "Conclude",
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "polymer-water-build",
    type: "mcq",
    prompt:
      "In this generic model, four monomers join into one linear chain. How many bonds form and how many water molecules are released?",
    options: [
      "3 bonds and 3 water molecules",
      "4 bonds and 4 water molecules",
      "3 bonds and 1 water molecule",
    ],
    correctAnswer: "3 bonds and 3 water molecules",
    explanation:
      "A linear chain of four monomers has three links. Each modeled dehydration step forms one link and releases one water molecule.",
  },
  {
    id: "polymer-hydrolysis",
    type: "mcq",
    prompt: "What does hydrolysis do in this lesson's reaction model?",
    options: [
      "Adds water across a bond as the bond breaks",
      "Removes water to form another bond",
      "Changes every atom into water",
    ],
    correctAnswer: "Adds water across a bond as the bond breaks",
    explanation:
      "Hydrolysis uses the components of water to cap the two ends created when a covalent bond is broken.",
  },
  {
    id: "polymer-boundary",
    type: "mcq",
    prompt: "Which statement keeps the model within its proper boundary?",
    options: [
      "The bench shows a recurring reaction pattern; specific molecules and enzymes add detail",
      "Every biological macromolecule is an identical linear polymer",
      "Water acts as a permanent glue between monomers",
    ],
    correctAnswer:
      "The bench shows a recurring reaction pattern; specific molecules and enzymes add detail",
    explanation:
      "The model isolates bond and water accounting. Real reactions depend on functional groups, enzymes, and molecular context, and lipids are not true polymers.",
  },
];

export default function PolymerReactionsLesson({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: PolymerLessonProps) {
  const [monomers, setMonomers] = useState(5);
  const [bonds, setBonds] = useState(0);
  const [lastMove, setLastMove] = useState<"build" | "break" | null>(null);
  const [scaleAnswer, setScaleAnswer] = useState<ScaleAnswer | null>(null);
  const state = getPolymerBenchState(monomers, bonds);

  function runBuild() {
    const next = buildBond(state);
    setBonds(next.bonds);
    setLastMove("build");
  }

  function runBreak() {
    const next = breakBond(state);
    setBonds(next.bonds);
    setLastMove("break");
  }

  function changeMonomerCount(next: number) {
    setMonomers(next);
    setBonds(0);
    setLastMove(null);
  }

  return (
    <ClassroomLessonShell
      subjectTone="science"
      breadcrumbs={breadcrumbs}
      eyebrow="AP Biology · Unit 1 · Macromolecule Reactions"
      icon={Beaker}
      title="Building & Breaking Polymers"
      subtitle="Operate a reaction bench to track monomers, covalent bonds, and water through dehydration synthesis and hydrolysis."
      stages={STAGES}
      practiceTargetId="polymer-practice"
      unitHref={unitHref}
      previous={previous}
      next={next}
      lessonPosition="03 / 07"
      background={<ReactionField />}
    >
      <section className="bg-[#061a12]/76 mt-4 rounded-[20px] border border-green-200/[0.14] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="1" label="Notice" />
        <div className="mt-2 grid gap-3 lg:grid-cols-[minmax(0,1fr)_285px] lg:items-end">
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-semibold tracking-[-0.04em] text-white">
              Watch the ends, not just the chain.
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-300/80">
              In this generic reaction model, one monomer contributes an OH and
              another contributes an H. A new covalent bond forms as those
              components leave together.
            </p>
          </div>
          <div className="rounded-[14px] border border-cyan-200/[0.12] bg-cyan-300/[0.035] p-3 text-[14px] leading-5 text-cyan-50/80">
            Track two ledgers: <strong>bond change</strong> and{" "}
            <strong>water change</strong>.
          </div>
        </div>
        <div className="mt-4 overflow-x-auto rounded-[18px] border border-green-100/[0.12] bg-black/[0.16] p-4">
          <div className="mx-auto flex min-w-[570px] items-center justify-center gap-3 font-mono">
            <Monomer token="A" end="OH" />
            <span className="text-[22px] text-green-100/40">+</span>
            <Monomer token="B" end="H" reverse />
            <span className="text-[22px] text-green-100/40">→</span>
            <BondedPair />
            <span className="text-[22px] text-green-100/40">+</span>
            <WaterToken />
          </div>
        </div>
        <ul className="mt-3 grid gap-2 text-[14px] leading-5 text-stone-400 sm:grid-cols-3">
          {[
            "A covalent bond forms between monomers.",
            "H and OH combine into H₂O in the model.",
            "The process is dehydration synthesis.",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-[13px] border border-white/[0.07] bg-black/[0.12] p-3"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-300/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-[20px] border border-emerald-200/[0.12] bg-black/[0.20] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="2" label="Build" tone="emerald" />
        <div className="mt-1.5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <h2 className="text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.04em] text-white">
              Run the reaction bench.
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-400">
              Build one bond at a time. The model joins the leftmost available
              unit to the growing chain and updates every count.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-1.5 rounded-[14px] border border-white/[0.07] bg-black/[0.13] p-1.5">
            {[3, 4, 5, 6].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => changeMonomerCount(count)}
                aria-pressed={monomers === count}
                className={`min-h-10 rounded-[10px] font-mono text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60 ${
                  monomers === count
                    ? "bg-green-300/[0.13] text-green-50"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-green-200/[0.11] bg-[radial-gradient(circle_at_50%_0%,rgba(74,222,128,0.10),rgba(0,0,0,0.16)_58%)] p-4 sm:p-5">
          <PolymerChain monomers={state.monomers} bonds={state.bonds} />
          <div className="mt-5 grid gap-2 sm:grid-cols-4">
            <Ledger label="Covalent bonds" value={state.bonds} />
            <Ledger label="Separate chains" value={state.chains} />
            <Ledger label="Free monomers" value={state.freeMonomers} />
            <Ledger label="H₂O released" value={state.waterReleased} />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={runBuild}
              disabled={state.bonds === maxBonds(state.monomers)}
              className="min-h-12 rounded-[13px] border border-green-200/20 bg-green-300/[0.09] px-4 text-[14px] font-semibold text-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Form one bond · release one H₂O
            </button>
            <button
              type="button"
              onClick={runBreak}
              disabled={state.bonds === 0}
              className="border-cyan-200/18 min-h-12 rounded-[13px] border bg-cyan-300/[0.06] px-4 text-[14px] font-semibold text-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Break one bond · use one H₂O
            </button>
          </div>
          <p
            className="mt-3 min-h-5 text-[13px] leading-5 text-stone-400"
            aria-live="polite"
          >
            {lastMove === "build"
              ? "Dehydration move: one bond formed and one water molecule was released."
              : lastMove === "break"
                ? "Hydrolysis move: one water molecule was used as one bond broke."
                : "Choose a reaction move and watch both ledgers change together."}
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-cyan-200/[0.12] bg-cyan-300/[0.025] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="3" label="Reverse" tone="cyan" />
        <h2 className="mt-1.5 text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.04em] text-white">
          Hydrolysis runs the accounting backward.
        </h2>
        <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <ReactionCard
            label="Dehydration synthesis"
            action="remove H + OH"
            result="form a bond + release H₂O"
            tone="green"
          />
          <div className="flex items-center justify-center px-2 py-1 text-cyan-200/70">
            <ArrowLeftRight size={24} aria-label="opposite modeled reactions" />
          </div>
          <ReactionCard
            label="Hydrolysis"
            action="add H₂O"
            result="break a bond + cap both ends"
            tone="cyan"
          />
        </div>
        <p className="mt-3 rounded-[14px] border border-white/[0.07] bg-black/[0.12] p-3 text-[14px] leading-5 text-stone-400">
          <strong className="text-cyan-100">
            Do not picture water as glue.
          </strong>{" "}
          In hydrolysis, water participates in breaking a covalent bond. In the
          dehydration model, water is a product of forming one.
        </p>
      </section>

      <section className="mt-4 rounded-[20px] border border-green-200/[0.12] bg-green-300/[0.025] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="4" label="Scale" />
        <h2 className="mt-1.5 text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.04em] text-white">
          Find the chain rule.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[2, 3, 4, 5].map((count) => (
            <div
              key={count}
              className="rounded-[14px] border border-white/[0.07] bg-black/[0.12] p-3"
            >
              <div className="font-mono text-[20px] font-semibold text-green-100">
                {count} → {waterForCompleteBuild(count)}
              </div>
              <p className="mt-1 text-[12px] leading-5 text-stone-500">
                monomers → bonds and H₂O released
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-[15px] border border-green-200/[0.13] bg-black/[0.13] p-4 text-center font-mono text-[clamp(1.2rem,3vw,2rem)] font-semibold text-green-50">
          n monomers → n − 1 links → n − 1 H₂O
        </div>
        <p className="mt-3 text-[14px] leading-5 text-stone-400">
          This relation holds for the one-chain, no-cycle model shown here. It
          follows from needing one fewer link than the number of objects in a
          line.
        </p>
      </section>

      <section className="mt-4 rounded-[20px] border border-teal-200/[0.12] bg-teal-300/[0.025] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="5" label="Transfer" tone="teal" />
        <h2 className="mt-1.5 text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.04em] text-white">
          Partially hydrolyze a chain.
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-stone-400">
          A linear five-monomer chain is cut at two bonds. How many water
          molecules does the model use?
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {(["three", "four", "five"] as ScaleAnswer[]).map((answer) => {
            const number = answer === "three" ? 2 : answer === "four" ? 4 : 5;
            return (
              <button
                key={answer}
                type="button"
                onClick={() => setScaleAnswer(answer)}
                aria-pressed={scaleAnswer === answer}
                className={`min-h-11 rounded-[13px] border px-3 py-2 font-mono text-[15px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60 ${
                  scaleAnswer === answer
                    ? "border-teal-200/25 bg-teal-300/[0.09] text-teal-50"
                    : "border-white/[0.07] bg-black/[0.11] text-stone-400"
                }`}
              >
                {number} H₂O
              </button>
            );
          })}
        </div>
        {scaleAnswer ? (
          <p
            className={`mt-3 rounded-[13px] border p-3 text-[14px] leading-5 ${
              scaleAnswer === "three"
                ? "border-teal-200/[0.18] bg-teal-300/[0.045] text-teal-100"
                : "border-orange-200/[0.15] bg-orange-300/[0.04] text-orange-100"
            }`}
            aria-live="polite"
          >
            {scaleAnswer === "three"
              ? `Correct. Two broken bonds use ${waterForHydrolysis(2)} water molecules, even though the original chain contains five monomers.`
              : "Count the bonds being broken, not the total monomers or all bonds in the original chain."}
          </p>
        ) : null}
        <div className="mt-3 flex items-start gap-3 rounded-[14px] border border-amber-200/[0.12] bg-amber-300/[0.03] p-3 text-[14px] leading-5 text-stone-400">
          <Droplets
            size={17}
            className="mt-0.5 shrink-0 text-amber-200"
            aria-hidden="true"
          />
          <p>
            <strong className="text-amber-100">Model boundary:</strong> actual
            biological reactions depend on functional groups and enzymes. Many
            proteins, nucleic acids, and carbohydrates are polymers; lipids are
            large biological molecules but are not true polymers built from one
            repeating monomer chain.
          </p>
        </div>
      </section>

      <section id="polymer-practice" className="mt-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[20px] border border-green-200/[0.12] bg-black/[0.20] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div>
              <StageLabel number="6" label="Practice" />
              <h2 className="mt-1 text-[21px] font-semibold text-white">
                Check the reaction accounting
              </h2>
            </div>
            <Sparkles
              size={17}
              className="mt-1 text-green-200"
              aria-hidden="true"
            />
          </div>
          <div className="polymer-assessment border-t border-white/[0.06] p-3 sm:p-4">
            <Assessment
              title="Polymer reactions check"
              questions={QUIZ}
              accentColor="emerald"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-green-200/[0.14] bg-green-300/[0.04] p-4 backdrop-blur-xl sm:p-5">
        <StageLabel number="7" label="Conclude" />
        <h2 className="mt-1.5 text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.04em] text-white">
          Follow the bond, then balance the water.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            "Count monomers",
            "Count links",
            "Name the direction",
            "Track each H₂O",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-[13px] border border-white/[0.07] bg-black/[0.13] p-3"
            >
              <div className="font-mono text-[11px] text-green-200/70">
                0{index + 1}
              </div>
              <div className="mt-1 text-[14px] font-semibold text-stone-200">
                {step}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .polymer-assessment > div { border-radius: 16px !important; padding: 14px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .polymer-assessment > div > div { min-height: 250px !important; }
        .polymer-assessment h3 { margin-bottom: 14px !important; font-size: 1.02rem !important; line-height: 1.45 !important; }
      `}</style>
    </ClassroomLessonShell>
  );
}

function Monomer({
  token,
  end,
  reverse = false,
}: {
  token: string;
  end: string;
  reverse?: boolean;
}) {
  return (
    <div className={`flex items-center ${reverse ? "flex-row-reverse" : ""}`}>
      <span className="flex h-16 w-16 items-center justify-center rounded-[18px] border border-green-200/25 bg-green-300/[0.10] text-[18px] font-semibold text-green-50">
        {token}
      </span>
      <span className="rounded-full border border-cyan-200/20 bg-cyan-300/[0.08] px-2 py-1 text-[12px] text-cyan-100">
        {end}
      </span>
    </div>
  );
}

function BondedPair() {
  return (
    <div className="flex items-center">
      {(["A", "B"] as const).map((token, index) => (
        <div key={token} className="flex items-center">
          {index ? (
            <span className="h-1 w-8 bg-gradient-to-r from-green-300/70 to-cyan-300/70" />
          ) : null}
          <span className="flex h-16 w-16 items-center justify-center rounded-[18px] border border-green-200/25 bg-green-300/[0.10] text-[18px] font-semibold text-green-50">
            {token}
          </span>
        </div>
      ))}
    </div>
  );
}

function WaterToken() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/[0.09] text-[15px] font-semibold text-cyan-50">
      H₂O
    </span>
  );
}

function PolymerChain({
  monomers,
  bonds,
}: {
  monomers: number;
  bonds: number;
}) {
  return (
    <div
      className="overflow-x-auto py-3"
      aria-label={`${monomers} monomers with ${bonds} bonds`}
    >
      <div className="mx-auto flex w-max min-w-full items-center justify-center px-2">
        {Array.from({ length: monomers }, (_, index) => (
          <div key={index} className="flex items-center">
            {index ? (
              <span
                className={`h-1 w-7 sm:w-10 ${
                  index <= bonds
                    ? "bg-gradient-to-r from-green-300/80 to-cyan-300/75"
                    : "border-t-2 border-dashed border-stone-700"
                }`}
                aria-label={index <= bonds ? "formed bond" : "available link"}
              />
            ) : null}
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-[17px] border font-mono text-[14px] font-semibold sm:h-16 sm:w-16 ${
                index <= bonds
                  ? "border-green-200/30 bg-green-300/[0.12] text-green-50"
                  : "border-stone-600/60 bg-black/[0.14] text-stone-500"
              }`}
            >
              M{index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Ledger({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[13px] border border-white/[0.07] bg-black/[0.13] p-3">
      <div className="font-mono text-[22px] font-semibold text-green-100">
        {value}
      </div>
      <div className="mt-0.5 text-[12px] leading-4 text-stone-500">{label}</div>
    </div>
  );
}

function ReactionCard({
  label,
  action,
  result,
  tone,
}: {
  label: string;
  action: string;
  result: string;
  tone: "green" | "cyan";
}) {
  return (
    <article className="rounded-[15px] border border-white/[0.08] bg-black/[0.14] p-4">
      <div
        className={`text-[11px] font-semibold uppercase tracking-[0.11em] ${
          tone === "green" ? "text-green-200/75" : "text-cyan-200/75"
        }`}
      >
        {label}
      </div>
      <div className="mt-3 font-mono text-[15px] font-semibold text-stone-200">
        {action}
      </div>
      <div className="mt-1 text-[13px] leading-5 text-stone-500">{result}</div>
    </article>
  );
}

function StageLabel({
  number,
  label,
  tone = "green",
}: {
  number: string;
  label: string;
  tone?: "green" | "emerald" | "cyan" | "teal";
}) {
  const color =
    tone === "cyan"
      ? "text-cyan-200/80"
      : tone === "teal"
        ? "text-teal-200/80"
        : tone === "emerald"
          ? "text-emerald-200/80"
          : "text-green-200/80";
  return (
    <div
      className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${color}`}
    >
      Stage {number} · {label}
    </div>
  );
}

function ReactionField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_26%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_16%_70%,rgba(74,222,128,0.15),transparent_34%),linear-gradient(180deg,#03170f,#010905)]" />
      <div className="absolute right-[4%] top-[16%] flex rotate-[-12deg] items-center opacity-[0.07]">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="flex items-center">
            {item ? <span className="h-2 w-16 bg-green-200" /> : null}
            <span className="h-24 w-24 rounded-[28px] border-4 border-green-200" />
          </div>
        ))}
      </div>
      <Droplets className="absolute -left-8 bottom-[8%] h-72 w-72 text-cyan-200/[0.035]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(134,239,172,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(134,239,172,0.6)_1px,transparent_1px)] [background-size:64px_64px]" />
    </div>
  );
}
