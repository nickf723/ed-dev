"use client";

import { useState } from "react";
import { Compass, Globe2, MapPinned, Sparkles } from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import ClassroomLessonShell, {
  type ClassroomLessonNavItem,
} from "@/app/classroom/_components/lessons/ClassroomLessonShell";

type WorldLessonProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  unitHref: string;
};

type StateId =
  | "ottoman"
  | "mughal"
  | "qing"
  | "tokugawa"
  | "bourbon"
  | "ashanti";
type Lens = "government" | "geography" | "exchange";

type StateRecord = {
  id: StateId;
  name: string;
  region: string;
  position: readonly [number, number];
  government: string;
  geography: string;
  exchange: string;
  color: string;
};

const STAGES = [
  "Question",
  "Map",
  "Investigate",
  "Compare",
  "Evidence",
  "Practice",
  "Conclude",
] as const;

const STATES: readonly StateRecord[] = [
  {
    id: "ottoman",
    name: "Ottoman Empire",
    region: "Southeastern Europe, West Asia & North Africa",
    position: [50, 40],
    government:
      "A dynastic empire governed through the sultan, court, provincial officials, and varied local arrangements.",
    geography:
      "Its territory connected the eastern Mediterranean, Black Sea, Red Sea, and overland routes between regions.",
    exchange:
      "Merchants and ports linked Mediterranean, African, Asian, and European commercial networks.",
    color: "border-blue-200/25 bg-blue-300/[0.10] text-blue-100",
  },
  {
    id: "mughal",
    name: "Mughal Empire",
    region: "South Asia",
    position: [63, 50],
    government:
      "An imperial court governed a large, diverse population through administrators, regional elites, and taxation.",
    geography:
      "Its core included fertile plains, major cities, and access to Indian Ocean commercial routes.",
    exchange:
      "Textiles, agricultural goods, and urban markets connected the empire to wide trading networks.",
    color: "border-violet-200/25 bg-violet-300/[0.10] text-violet-100",
  },
  {
    id: "qing",
    name: "Qing China",
    region: "East Asia",
    position: [78, 39],
    government:
      "A large bureaucratic empire ruled by the Qing dynasty through imperial institutions and provincial administration.",
    geography:
      "Expanding territory joined densely populated agricultural regions with extensive interior frontiers.",
    exchange:
      "Large internal markets and regulated foreign trade connected China to regional and global demand.",
    color: "border-cyan-200/25 bg-cyan-300/[0.10] text-cyan-100",
  },
  {
    id: "tokugawa",
    name: "Tokugawa Japan",
    region: "Japanese archipelago",
    position: [89, 44],
    government:
      "The shogunate balanced central authority with regional daimyo and required political attendance in Edo.",
    geography:
      "An island setting shaped travel, defense, internal routes, and the regulation of overseas contact.",
    exchange:
      "Foreign exchange was restricted to controlled channels, while internal commerce and cities grew.",
    color: "border-sky-200/25 bg-sky-300/[0.10] text-sky-100",
  },
  {
    id: "bourbon",
    name: "Bourbon France",
    region: "Western Europe & Atlantic world",
    position: [39, 32],
    government:
      "A monarchy centered authority around the crown, royal officials, and an elite political world symbolized by Versailles.",
    geography:
      "A European territorial base connected to Atlantic colonies, ports, and commercial competition.",
    exchange:
      "Domestic production and Atlantic trade tied France to colonial and maritime networks.",
    color: "border-indigo-200/25 bg-indigo-300/[0.10] text-indigo-100",
  },
  {
    id: "ashanti",
    name: "Ashanti Kingdom",
    region: "West Africa",
    position: [43, 59],
    government:
      "A centralized kingdom coordinated constituent states through the Asantehene, councils, officials, and military power.",
    geography:
      "Its forest-region position connected gold-producing areas with inland and coastal routes.",
    exchange:
      "Gold and regional commerce supported influence within West African and Atlantic trade networks.",
    color: "border-amber-200/25 bg-amber-300/[0.10] text-amber-100",
  },
];

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
  const selected = STATES.find((state) => state.id === selectedId) ?? STATES[0];
  const left = STATES.find((state) => state.id === compareIds[0]) ?? STATES[0];
  const right = STATES.find((state) => state.id === compareIds[1]) ?? STATES[1];
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
        <StageLabel number="1" label="Question" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
          Where did power reside in 1750?
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-300/80">
          “Most powerful” is not a visible fact. First decide what evidence
          could show: territory, political organization, military reach, trade
          connections, population, or control over strategic routes.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            "Power needs a definition",
            "Maps show space—not everything",
            "Comparison needs a shared lens",
          ].map((idea, index) => (
            <div
              key={idea}
              className="rounded-[13px] border border-white/[0.07] bg-black/[0.14] p-3"
            >
              <div className="font-mono text-[11px] text-blue-200/70">
                0{index + 1}
              </div>
              <div className="mt-1 text-[14px] font-semibold text-stone-200">
                {idea}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-blue-200/[0.12] bg-blue-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="2" label="Map" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Start with several centers—not one.
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-stone-400">
          Select a state to inspect. Positions are schematic so the map can
          emphasize global distribution.
        </p>
        <WorldMap selectedId={selectedId} onSelect={setSelectedId} />
      </section>

      <section className="mt-4 rounded-[20px] border border-cyan-200/[0.12] bg-cyan-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="3" label="Investigate" tone="cyan" />
        <div className="mt-2 grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className={`rounded-[16px] border p-4 ${selected.color}`}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.11em] opacity-65">
              {selected.region}
            </div>
            <h2 className="mt-2 font-serif text-[24px] font-semibold text-white">
              {selected.name}
            </h2>
            <Compass size={19} className="mt-4 opacity-70" aria-hidden="true" />
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

function WorldMap({
  selectedId,
  onSelect,
}: {
  selectedId: StateId;
  onSelect: (id: StateId) => void;
}) {
  return (
    <div className="relative mt-4 min-h-[360px] overflow-hidden rounded-[18px] border border-blue-200/[0.11] bg-[#06111f] sm:min-h-[410px]">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(96,165,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.18)_1px,transparent_1px)] [background-size:12.5%_20%]" />
      <div className="absolute left-[7%] top-[20%] h-[58%] w-[31%] rounded-[48%_42%_46%_50%] border border-blue-100/[0.07] bg-blue-200/[0.025]" />
      <div className="absolute left-[36%] top-[16%] h-[63%] w-[56%] rounded-[45%_48%_42%_50%] border border-blue-100/[0.07] bg-blue-200/[0.025]" />
      {STATES.map((state) => (
        <button
          key={state.id}
          type="button"
          onClick={() => onSelect(state.id)}
          aria-pressed={selectedId === state.id}
          className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-2 text-[11px] font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.24)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/70 ${
            selectedId === state.id
              ? `${state.color} scale-105`
              : "border-blue-200/[0.14] bg-[#091b2e] text-stone-400"
          }`}
          style={{
            left: `${state.position[0]}%`,
            top: `${state.position[1]}%`,
          }}
        >
          {state.name}
        </button>
      ))}
      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-blue-200/[0.12] bg-black/35 px-3 py-1.5 text-[11px] font-semibold text-blue-100/80">
        <MapPinned size={13} aria-hidden="true" /> schematic positions · circa
        1750
      </div>
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
