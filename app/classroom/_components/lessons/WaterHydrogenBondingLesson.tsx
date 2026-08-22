"use client";

import { useState } from "react";
import { Droplets, Link2, Sparkles, ThermometerSun } from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import ClassroomLessonShell, {
  type ClassroomLessonNavItem,
} from "@/app/classroom/_components/lessons/ClassroomLessonShell";

type WaterLessonProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  unitHref: string;
};

type Prediction = "opposites" | "oxygen" | "random";
type WaterProperty = "cohesion" | "specific-heat" | "evaporation";
type ScenarioId = "xylem" | "lake" | "sweat";

const STAGES = [
  "Observe",
  "Predict",
  "Model",
  "Connect",
  "Apply",
  "Practice",
  "Conclude",
] as const;

const PROPERTIES: Record<
  WaterProperty,
  { label: string; cause: string; result: string; example: string }
> = {
  cohesion: {
    label: "Cohesion",
    cause: "Hydrogen bonds link neighboring water molecules.",
    result: "Water molecules resist separating from one another.",
    example: "Continuous water columns can move through plant xylem.",
  },
  "specific-heat": {
    label: "High specific heat",
    cause: "Added energy first disrupts many intermolecular attractions.",
    result: "Water temperature changes more slowly than it otherwise would.",
    example:
      "Aquatic habitats and body fluids resist rapid temperature swings.",
  },
  evaporation: {
    label: "Evaporative cooling",
    cause: "Higher-energy molecules escape the liquid as water vapor.",
    result: "The molecules left behind have lower average kinetic energy.",
    example: "Sweating and transpiration can cool living systems.",
  },
};

const SCENARIOS: readonly {
  id: ScenarioId;
  label: string;
  prompt: string;
  answer: WaterProperty;
}[] = [
  {
    id: "xylem",
    label: "Plant xylem",
    prompt:
      "A continuous column of water is pulled upward through narrow vessels.",
    answer: "cohesion",
  },
  {
    id: "lake",
    label: "Lake temperature",
    prompt: "A lake warms and cools more gradually than the surrounding air.",
    answer: "specific-heat",
  },
  {
    id: "sweat",
    label: "Sweating",
    prompt: "The fastest-moving water molecules leave the skin as vapor.",
    answer: "evaporation",
  },
];

const QUIZ: AssessmentQuestion[] = [
  {
    id: "water-between-molecules",
    type: "mcq",
    prompt: "Which attraction forms between neighboring water molecules?",
    options: ["Hydrogen bond", "Nonpolar covalent bond", "Ionic bond"],
    correctAnswer: "Hydrogen bond",
    explanation:
      "A partially positive hydrogen is attracted to a partially negative region on a neighboring molecule.",
  },
  {
    id: "water-cohesion-application",
    type: "mcq",
    prompt:
      "Which property most directly helps maintain a water column in plant xylem?",
    options: ["Cohesion", "Low density as a solid", "Neutral pH"],
    correctAnswer: "Cohesion",
    explanation:
      "Cohesion keeps neighboring water molecules linked as the column is pulled upward.",
  },
  {
    id: "water-cooling-reasoning",
    type: "mcq",
    prompt: "Why can evaporation cool a surface?",
    options: [
      "Higher-energy molecules leave the liquid",
      "Water molecules stop moving",
      "Covalent bonds inside water break",
    ],
    correctAnswer: "Higher-energy molecules leave the liquid",
    explanation:
      "Removing higher-energy molecules lowers the average kinetic energy of the liquid that remains.",
  },
];

export default function WaterHydrogenBondingLesson({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: WaterLessonProps) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [motion, setMotion] = useState(0);
  const [property, setProperty] = useState<WaterProperty>("cohesion");
  const [scenarioId, setScenarioId] = useState<ScenarioId>("xylem");
  const [scenarioAnswer, setScenarioAnswer] = useState<WaterProperty | null>(
    null
  );
  const selectedScenario =
    SCENARIOS.find((scenario) => scenario.id === scenarioId) ?? SCENARIOS[0];
  const visibleBonds = Math.max(1, 6 - motion);

  return (
    <ClassroomLessonShell
      subjectTone="science"
      breadcrumbs={breadcrumbs}
      eyebrow="AP Biology · Unit 1 · Topic 1.1"
      icon={Droplets}
      title="Water & Hydrogen Bonding"
      subtitle="Follow partial charges from molecular structure to the properties that sustain living systems."
      stages={STAGES}
      practiceTargetId="water-practice"
      unitHref={unitHref}
      previous={previous}
      next={next}
      lessonPosition="01 / 07"
      background={<WaterField />}
    >
      <section className="mt-4 rounded-[20px] border border-green-200/[0.13] bg-[#03150e]/70 p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="1" label="Observe" />
        <h2 className="mt-1.5 text-[clamp(1.45rem,3vw,2.15rem)] font-semibold tracking-[-0.035em] text-white">
          One molecule has an uneven charge pattern.
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-300/80">
          Oxygen pulls the shared electrons closer than hydrogen does. The
          molecule stays electrically neutral overall, but its oxygen side is
          partially negative and its hydrogen sides are partially positive.
        </p>

        <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
          <WaterMolecule large />
          <BulletNotes
            items={[
              "O—H bonds inside one molecule are polar covalent bonds.",
              "The bent shape keeps the partial charges from canceling.",
              "Partial charges let separate water molecules attract.",
            ]}
          />
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-cyan-200/[0.12] bg-cyan-300/[0.035] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="2" label="Predict" tone="cyan" />
        <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
          How will neighboring molecules orient?
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-stone-400">
          Choose the arrangement that should create the strongest intermolecular
          attraction.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {(
            [
              ["opposites", "δ+ hydrogen faces δ− oxygen"],
              ["oxygen", "δ− oxygen faces δ− oxygen"],
              ["random", "Orientation makes no difference"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setPrediction(value)}
              aria-pressed={prediction === value}
              className={`rounded-[14px] border px-3 py-3 text-left text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
                prediction === value
                  ? "border-cyan-200/30 bg-cyan-300/[0.10] text-cyan-50"
                  : "border-white/[0.08] bg-black/[0.13] text-stone-400 hover:text-stone-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {prediction ? (
          <p
            className={`mt-3 rounded-[14px] border px-3 py-2.5 text-[14px] leading-5 ${
              prediction === "opposites"
                ? "border-green-200/[0.18] bg-green-300/[0.045] text-green-100"
                : "border-amber-200/[0.15] bg-amber-300/[0.04] text-amber-100"
            }`}
            aria-live="polite"
          >
            {prediction === "opposites"
              ? "Yes. Opposite partial charges align, creating a hydrogen bond between molecules."
              : "Compare the charge labels again: like charges repel, while opposite partial charges attract."}
          </p>
        ) : null}
      </section>

      <section className="mt-4 rounded-[20px] border border-green-200/[0.12] bg-black/[0.20] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="3" label="Model" />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-center">
          <div>
            <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
              Add molecular motion.
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-6 text-stone-400">
              Hydrogen bonds constantly form and break. Increase motion and
              watch this conceptual snapshot retain fewer aligned attractions at
              one moment.
            </p>
          </div>
          <label className="rounded-[15px] border border-white/[0.08] bg-white/[0.02] p-3">
            <span className="flex items-center justify-between gap-3 text-[13px] font-semibold text-stone-300">
              <span className="inline-flex items-center gap-2">
                <ThermometerSun
                  size={15}
                  className="text-green-200"
                  aria-hidden="true"
                />
                Molecular motion
              </span>
              <span className="font-mono text-green-100">{motion} / 5</span>
            </span>
            <input
              type="range"
              min="0"
              max="5"
              value={motion}
              onChange={(event) => setMotion(Number(event.target.value))}
              className="mt-3 w-full accent-green-400"
            />
          </label>
        </div>

        <HydrogenBondNetwork visibleBonds={visibleBonds} />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[13px] text-stone-400">
          <span>
            {visibleBonds} aligned attractions visible in this snapshot
          </span>
          <span className="text-[11px] uppercase tracking-[0.1em] text-stone-600">
            Conceptual model · not quantitative
          </span>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-teal-200/[0.12] bg-teal-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="4" label="Connect" tone="teal" />
        <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
          Trace structure into biological function.
        </h2>

        <div
          className="mt-3 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Water properties"
        >
          {(Object.keys(PROPERTIES) as WaterProperty[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={property === key}
              onClick={() => setProperty(key)}
              className={`rounded-xl border px-3 py-2 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60 ${
                property === key
                  ? "border-teal-200/25 bg-teal-300/[0.09] text-teal-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              {PROPERTIES[key].label}
            </button>
          ))}
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {[
            ["Molecular cause", PROPERTIES[property].cause],
            ["Physical result", PROPERTIES[property].result],
            ["Biological function", PROPERTIES[property].example],
          ].map(([label, text], index) => (
            <div
              key={label}
              className="rounded-[14px] border border-white/[0.07] bg-black/[0.13] p-3"
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-teal-200/70">
                <span className="font-mono">{index + 1}</span>
                {label}
              </div>
              <p className="mt-2 text-[14px] leading-5 text-stone-300">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-green-200/[0.12] bg-green-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="5" label="Apply" />
        <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
          Match the property to the living system.
        </h2>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => {
                setScenarioId(scenario.id);
                setScenarioAnswer(null);
              }}
              aria-pressed={scenarioId === scenario.id}
              className={`rounded-[14px] border px-3 py-3 text-left text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60 ${
                scenarioId === scenario.id
                  ? "border-green-200/25 bg-green-300/[0.08] text-green-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-[15px] border border-white/[0.08] bg-black/[0.15] p-3">
          <p className="text-[15px] leading-6 text-stone-300">
            {selectedScenario.prompt}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(Object.keys(PROPERTIES) as WaterProperty[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setScenarioAnswer(key)}
                aria-pressed={scenarioAnswer === key}
                className={`rounded-xl border px-3 py-2.5 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60 ${
                  scenarioAnswer === key
                    ? "border-green-200/25 bg-green-300/[0.08] text-green-50"
                    : "border-white/[0.07] text-stone-400"
                }`}
              >
                {PROPERTIES[key].label}
              </button>
            ))}
          </div>
          {scenarioAnswer ? (
            <p
              className={`mt-3 text-[14px] font-semibold ${
                scenarioAnswer === selectedScenario.answer
                  ? "text-green-100"
                  : "text-amber-100"
              }`}
              aria-live="polite"
            >
              {scenarioAnswer === selectedScenario.answer
                ? `Correct: ${PROPERTIES[selectedScenario.answer].cause}`
                : "Try tracing the scenario back to the molecular result before choosing again."}
            </p>
          ) : null}
        </div>
      </section>

      <section id="water-practice" className="mt-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[20px] border border-green-200/[0.12] bg-black/[0.20] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div>
              <StageLabel number="6" label="Practice" />
              <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.025em] text-white">
                Transfer the structure-function chain
              </h2>
            </div>
            <Sparkles
              size={17}
              className="mt-1 text-green-200"
              aria-hidden="true"
            />
          </div>
          <div className="water-assessment border-t border-white/[0.06] p-3 sm:p-4">
            <Assessment
              title="Water & Hydrogen Bonding check"
              questions={QUIZ}
              accentColor="emerald"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-green-200/[0.14] bg-green-300/[0.04] p-4 backdrop-blur-xl sm:p-5">
        <StageLabel number="7" label="Conclude" />
        <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
          The explanation is a chain, not a vocabulary list.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            "Bent polar molecule",
            "Hydrogen bonding",
            "Emergent water property",
            "Biological function",
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
        .water-assessment > div { border-radius: 16px !important; padding: 14px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .water-assessment > div > div { min-height: 250px !important; }
        .water-assessment h3 { margin-bottom: 14px !important; font-size: 1.02rem !important; line-height: 1.45 !important; }
      `}</style>
    </ClassroomLessonShell>
  );
}

function StageLabel({
  number,
  label,
  tone = "green",
}: {
  number: string;
  label: string;
  tone?: "green" | "cyan" | "teal";
}) {
  const color =
    tone === "cyan"
      ? "text-cyan-200/80"
      : tone === "teal"
        ? "text-teal-200/80"
        : "text-green-200/80";
  return (
    <div
      className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${color}`}
    >
      Stage {number} · {label}
    </div>
  );
}

function BulletNotes({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-2 text-[14px] leading-5 text-stone-400">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-300/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function WaterMolecule({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`relative mx-auto flex items-center justify-center rounded-[18px] border border-green-200/[0.11] bg-black/[0.16] ${
        large ? "min-h-[220px] w-full" : "h-24 w-32"
      }`}
      aria-label="Water molecule with a partially negative oxygen and two partially positive hydrogens"
      role="img"
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-[72px] origin-left -translate-y-1/2 rotate-[145deg] rounded-full bg-green-100/25" />
      <span className="absolute left-1/2 top-1/2 h-1 w-[72px] origin-left -translate-y-1/2 rotate-[35deg] rounded-full bg-green-100/25" />
      <span className="z-10 flex h-24 w-24 items-center justify-center rounded-full border border-red-200/25 bg-red-300/[0.10] text-center font-mono text-[28px] font-semibold text-red-100 shadow-[0_0_30px_rgba(248,113,113,0.10)]">
        O
        <small className="ml-1 self-start pt-5 text-[11px] text-red-200/70">
          δ−
        </small>
      </span>
      <span className="absolute left-[17%] top-[24%] z-20 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/[0.10] font-mono text-[18px] font-semibold text-cyan-50">
        H<small className="text-[11px] text-cyan-200/70">δ+</small>
      </span>
      <span className="absolute right-[17%] top-[24%] z-20 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/[0.10] font-mono text-[18px] font-semibold text-cyan-50">
        H<small className="text-[11px] text-cyan-200/70">δ+</small>
      </span>
    </div>
  );
}

function HydrogenBondNetwork({ visibleBonds }: { visibleBonds: number }) {
  const nodes = [
    [16, 28],
    [42, 22],
    [69, 31],
    [28, 70],
    [58, 72],
    [84, 64],
  ] as const;
  const bonds = [
    [22, 29, 36, 24],
    [48, 23, 63, 29],
    [21, 36, 28, 62],
    [35, 68, 51, 71],
    [64, 69, 78, 65],
    [72, 37, 82, 58],
  ] as const;

  return (
    <div className="relative mt-4 min-h-[240px] overflow-hidden rounded-[18px] border border-green-200/[0.10] bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.08),rgba(0,0,0,0.16)_62%)]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {bonds.map(([x1, y1, x2, y2], index) => (
          <line
            key={`${x1}-${y1}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(103,232,249,0.58)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity={index < visibleBonds ? 1 : 0.08}
          />
        ))}
      </svg>
      {nodes.map(([left, top], index) => (
        <div
          key={`${left}-${top}`}
          className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-200/[0.18] bg-red-300/[0.07] font-mono text-[16px] font-semibold text-red-100/80"
          style={{ left: `${left}%`, top: `${top}%` }}
        >
          O
          <span className="absolute -left-3 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-200/[0.16] bg-cyan-300/[0.07] text-[11px] text-cyan-100">
            H
          </span>
          <span className="absolute -right-3 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-200/[0.16] bg-cyan-300/[0.07] text-[11px] text-cyan-100">
            H
          </span>
          {index === 0 ? <span className="sr-only">Water molecule</span> : null}
        </div>
      ))}
      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.12] bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-cyan-100/80">
        <Link2 size={13} aria-hidden="true" /> dashed line = hydrogen bond
      </div>
    </div>
  );
}

function WaterField() {
  const points = [
    [8, 16],
    [28, 9],
    [78, 13],
    [92, 27],
    [14, 48],
    [86, 55],
    [25, 82],
    [71, 87],
    [95, 76],
  ] as const;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,197,94,0.14),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,#03170f,#020b08)]" />
      {points.map(([left, top], index) => (
        <div
          key={`${left}-${top}`}
          className="absolute h-16 w-16 rounded-full border border-cyan-100/[0.08] bg-cyan-200/[0.018] shadow-[0_0_36px_rgba(34,211,238,0.04)]"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            opacity: 0.4 + (index % 3) * 0.12,
          }}
        >
          <span className="absolute -left-2 -top-1 h-6 w-6 rounded-full border border-green-100/[0.06]" />
          <span className="absolute -right-2 -top-1 h-6 w-6 rounded-full border border-green-100/[0.06]" />
        </div>
      ))}
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:44px_44px]" />
    </div>
  );
}
