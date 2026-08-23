"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Compass, Globe2, Layers3, Sparkles } from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import ClassroomLessonShell, {
  type ClassroomLessonNavItem,
} from "@/app/classroom/_components/lessons/ClassroomLessonShell";
import {
  getState,
  STATES,
  type Lens,
  type StateId,
} from "@/app/classroom/_components/lessons/world-in-1750-model";

const HistoricalWorldMap = dynamic(
  () => import("@/app/classroom/_components/lessons/HistoricalWorldMap"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-4 flex h-[390px] items-center justify-center rounded-[18px] border border-blue-200/[0.13] bg-[#061525] text-[14px] text-blue-100/65 sm:h-[460px]">
        Drawing the historical map…
      </div>
    ),
  }
);

type WorldLessonProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  unitHref: string;
};

const STAGES = [
  "Orient",
  "Read",
  "Explore",
  "Compare",
  "Evidence",
  "Practice",
  "Conclude",
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "world-1750-power",
    type: "mcq",
    prompt: "Which conclusion is best supported by the 1750 state records?",
    options: [
      "Power had several regional centers",
      "Only European states controlled long-distance trade",
      "Land area alone determined influence",
    ],
    correctAnswer: "Power had several regional centers",
    explanation:
      "The records show large and influential states across Europe, Africa, and Asia using different institutions and networks.",
  },
  {
    id: "world-1750-comparison",
    type: "mcq",
    prompt: "What makes a historical comparison meaningful?",
    options: [
      "Use the same category and account for context",
      "Choose the two largest states",
      "List facts without making a claim",
    ],
    correctAnswer: "Use the same category and account for context",
    explanation:
      "A fair comparison examines a shared dimension—such as government or exchange—without erasing contextual differences.",
  },
  {
    id: "world-1750-map-boundary",
    type: "mcq",
    prompt: "What can a territorial map show most directly?",
    options: [
      "Approximate location and extent",
      "The full experience of every subject",
      "Whether a government was effective",
    ],
    correctAnswer: "Approximate location and extent",
    explanation:
      "Maps reveal spatial relationships, but claims about institutions or lived experience require additional evidence.",
  },
];

export default function WorldIn1750Lesson({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: WorldLessonProps) {
  const [selectedId, setSelectedId] = useState<StateId>("ottoman");
  const [compareIds, setCompareIds] = useState<readonly [StateId, StateId]>([
    "ottoman",
    "mughal",
  ]);
  const [lens, setLens] = useState<Lens>("government");
  const [claim, setClaim] = useState<"distributed" | "uniform" | null>(null);
  const [evidence, setEvidence] = useState<StateId[]>([]);
  const selected = getState(selectedId);
  const left = getState(compareIds[0]);
  const right = getState(compareIds[1]);
  const evidenceRegions = new Set(
    evidence.map((id) => STATES.find((state) => state.id === id)?.region)
  ).size;
  const supported =
    claim === "distributed" && evidence.length >= 2 && evidenceRegions >= 2;

  function chooseComparison(side: 0 | 1, id: StateId) {
    setCompareIds((current) => {
      const other = current[side === 0 ? 1 : 0];
      if (id === other) return current;
      return side === 0 ? [id, current[1]] : [current[0], id];
    });
  }

  function toggleEvidence(id: StateId) {
    setEvidence((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <ClassroomLessonShell
      subjectTone="social-studies"
      breadcrumbs={breadcrumbs}
      eyebrow="Global II · Unit 1 · Key Idea 10.1"
      icon={Globe2}
      title="A World of Empires"
      subtitle="Use geography, government, and exchange to build a global snapshot of power in 1750."
      stages={STAGES}
      practiceTargetId="world-practice"
      unitHref={unitHref}
      previous={previous}
      next={next}
      lessonPosition="01 / 04"
      background={<WorldField />}
    >
      <section className="bg-[#071321]/72 mt-4 rounded-[20px] border border-blue-200/[0.13] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="1" label="Orient" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
          Step into 1750 before judging it.
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-300/80">
          This is not a blank world waiting for modern nations to appear. Large
          empires, kingdoms, ports, and commercial networks already connect
          Africa, Asia, Europe, and the Atlantic. Our first job is simply to get
          oriented.
        </p>
        <div className="mt-4 grid gap-2 md:grid-cols-[0.85fr_1.15fr_1.15fr]">
          <OrientationCard
            label="When"
            value="1750"
            text="A baseline before the revolutions and industrial changes studied later in Global II."
          />
          <OrientationCard
            label="What to find"
            value="Several centers"
            text="Look across regions before assuming that political or economic power sat in one place."
          />
          <OrientationCard
            label="What to ask"
            value="Power by what measure?"
            text="Territory, government, exchange, population, and military reach answer different questions."
          />
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-blue-200/[0.12] bg-blue-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="2" label="Read" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Learn the legend before making a claim.
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-stone-400">
          Coastlines tell you where you are. Colored footprints help you locate
          six states and empires. Broken edges remind us that premodern control
          was often layered, changing, and reconstructed from incomplete
          evidence.
        </p>
        <HistoricalWorldMap selectedId={selectedId} onSelect={setSelectedId} />
        <div className="mt-3 flex items-start gap-3 rounded-[14px] border border-blue-200/[0.10] bg-black/[0.13] p-3 text-[13px] leading-5 text-stone-400">
          <Layers3
            size={17}
            className="mt-0.5 shrink-0 text-blue-200/75"
            aria-hidden="true"
          />
          <p>
            This orientation layer uses the nearest suitable open snapshots in
            the source collection—1715 and 1783—not invented “exact” borders for
            one day in 1750. Use it to locate and compare. Treat precise border
            claims as questions for stronger sources.
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-cyan-200/[0.12] bg-cyan-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="3" label="Explore" tone="cyan" />
        <div className="mt-2 grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className={`rounded-[16px] border p-4 ${selected.color}`}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.11em] opacity-65">
              {selected.region}
            </div>
            <h2 className="mt-2 font-serif text-[24px] font-semibold text-white">
              {selected.name}
            </h2>
            <Compass size={19} className="mt-4 opacity-70" aria-hidden="true" />
            <p className="mt-3 text-[12px] leading-5 text-white/65">
              Map footprint source: {selected.sourceYear} snapshot
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {(
              [
                ["Government", selected.government],
                ["Geography", selected.geography],
                ["Exchange", selected.exchange],
              ] as const
            ).map(([label, text]) => (
              <div
                key={label}
                className="rounded-[14px] border border-white/[0.07] bg-black/[0.15] p-3"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/70">
                  {label}
                </div>
                <p className="mt-2 text-[14px] leading-5 text-stone-300">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-violet-200/[0.12] bg-violet-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="4" label="Compare" tone="violet" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Hold the lens steady.
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-stone-400">
          Choose two different states, then compare the same category in both.
        </p>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <StateSelect
            label="State A"
            value={compareIds[0]}
            onChange={(id) => chooseComparison(0, id)}
          />
          <StateSelect
            label="State B"
            value={compareIds[1]}
            onChange={(id) => chooseComparison(1, id)}
          />
        </div>
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Comparison lens"
        >
          {(["government", "geography", "exchange"] as Lens[]).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={lens === item}
              onClick={() => setLens(item)}
              className={`rounded-xl border px-3 py-2 text-[13px] font-semibold capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 ${
                lens === item
                  ? "border-violet-200/25 bg-violet-300/[0.09] text-violet-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {[left, right].map((state) => (
            <div
              key={state.id}
              className="rounded-[14px] border border-white/[0.07] bg-black/[0.14] p-3"
            >
              <div className="font-serif text-[18px] font-semibold text-stone-100">
                {state.name}
              </div>
              <p className="mt-2 text-[14px] leading-5 text-stone-300">
                {state[lens]}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 border-l-2 border-violet-300/40 pl-3 text-[14px] leading-5 text-stone-400">
          A useful comparison can find a similarity without claiming the two
          states were identical.
        </p>
      </section>

      <section className="mt-4 rounded-[20px] border border-blue-200/[0.12] bg-black/[0.20] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="5" label="Evidence" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Build a claim that the evidence can carry.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(
            [
              ["distributed", "Power in 1750 had several regional centers."],
              [
                "uniform",
                "Every major state used the same political and commercial strategy.",
              ],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setClaim(value)}
              aria-pressed={claim === value}
              className={`rounded-[14px] border px-3 py-3 text-left text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 ${
                claim === value
                  ? "border-blue-200/25 bg-blue-300/[0.08] text-blue-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[14px] text-stone-400">
          Select at least two records from different regions as evidence.
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.map((state) => (
            <button
              key={state.id}
              type="button"
              onClick={() => toggleEvidence(state.id)}
              aria-pressed={evidence.includes(state.id)}
              className={`rounded-[13px] border px-3 py-2.5 text-left text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 ${
                evidence.includes(state.id)
                  ? state.color
                  : "border-white/[0.07] bg-black/[0.12] text-stone-500"
              }`}
            >
              {state.name}
              <span className="mt-1 block text-[11px] font-normal opacity-65">
                {state.region}
              </span>
            </button>
          ))}
        </div>
        {claim ? (
          <p
            className={`mt-3 rounded-[14px] border px-3 py-2.5 text-[14px] leading-5 ${
              supported
                ? "border-blue-200/[0.18] bg-blue-300/[0.05] text-blue-100"
                : "border-amber-200/[0.15] bg-amber-300/[0.04] text-amber-100"
            }`}
            aria-live="polite"
          >
            {supported
              ? "Supported: records from different regions demonstrate multiple centers using different institutions and networks."
              : claim === "uniform"
                ? "The records contradict uniformity: the states organized authority and exchange in different ways."
                : "Add evidence from at least two different regions before treating the claim as supported."}
          </p>
        ) : null}
      </section>

      <section id="world-practice" className="mt-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[20px] border border-blue-200/[0.12] bg-black/[0.20] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div>
              <StageLabel number="6" label="Practice" />
              <h2 className="mt-1 font-serif text-[21px] font-semibold text-white">
                Check the historical reasoning
              </h2>
            </div>
            <Sparkles
              size={17}
              className="mt-1 text-blue-200"
              aria-hidden="true"
            />
          </div>
          <div className="world-assessment border-t border-white/[0.06] p-3 sm:p-4">
            <Assessment
              title="The World in 1750 check"
              questions={QUIZ}
              accentColor="blue"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-blue-200/[0.14] bg-blue-300/[0.04] p-4 backdrop-blur-xl sm:p-5">
        <StageLabel number="7" label="Conclude" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          The 1750 world is a baseline for the changes ahead.
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-400">
          Revolutions, industrialization, imperialism, and nationalism did not
          begin on an empty map. They transformed a world already organized
          through many powerful states and exchange networks.
        </p>
      </section>

      <style>{`
        .world-assessment > div { border-radius: 16px !important; padding: 14px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .world-assessment > div > div { min-height: 250px !important; }
        .world-assessment h3 { margin-bottom: 14px !important; font-size: 1.02rem !important; line-height: 1.45 !important; }
      `}</style>
    </ClassroomLessonShell>
  );
}

function StageLabel({
  number,
  label,
  tone = "blue",
}: {
  number: string;
  label: string;
  tone?: "blue" | "cyan" | "violet";
}) {
  const color =
    tone === "cyan"
      ? "text-cyan-200/80"
      : tone === "violet"
        ? "text-violet-200/80"
        : "text-blue-200/80";
  return (
    <div
      className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${color}`}
    >
      Stage {number} · {label}
    </div>
  );
}

function OrientationCard({
  label,
  value,
  text,
}: {
  label: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-[15px] border border-white/[0.07] bg-black/[0.14] p-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.11em] text-blue-200/70">
        {label}
      </div>
      <div className="mt-1.5 font-serif text-[19px] font-semibold text-blue-50">
        {value}
      </div>
      <p className="mt-1.5 text-[13px] leading-5 text-stone-400">{text}</p>
    </div>
  );
}

function StateSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: StateId;
  onChange: (id: StateId) => void;
}) {
  return (
    <label className="rounded-[14px] border border-white/[0.07] bg-black/[0.13] p-3">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-violet-200/70">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as StateId)}
        className="mt-2 w-full rounded-xl border border-white/[0.09] bg-[#0a1423] px-3 py-2.5 text-[14px] font-semibold text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
      >
        {STATES.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function WorldField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_82%_38%,rgba(99,102,241,0.14),transparent_32%),linear-gradient(180deg,#06111f,#02070d)]" />
      <div className="absolute -left-[8%] top-[15%] h-[55vw] max-h-[720px] w-[55vw] max-w-[720px] rounded-full border border-blue-200/[0.06]" />
      <div className="absolute -left-[3%] top-[20%] h-[45vw] max-h-[590px] w-[45vw] max-w-[590px] rounded-full border border-blue-200/[0.05]" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(147,197,253,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  );
}
