"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Landmark, MapPinned, Scale, Sparkles } from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import ClassroomLessonShell, {
  type ClassroomLessonNavItem,
} from "@/app/classroom/_components/lessons/ClassroomLessonShell";
import type { EmpireMapFocus } from "@/app/classroom/_components/lessons/EmpireComparisonMap";
import {
  COMPARISON_CLAIMS,
  COMPARISON_LENSES,
  COMPARISON_SUMMARIES,
  getComparisonEmpire,
  getComparisonLens,
  type ClaimVerdict,
  type ComparisonLens,
  type EmpireId,
} from "@/app/classroom/_components/lessons/ottoman-mughal-model";

const EmpireComparisonMap = dynamic(
  () => import("@/app/classroom/_components/lessons/EmpireComparisonMap"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-4 flex min-h-[360px] items-center justify-center rounded-[18px] border border-blue-200/[0.13] bg-[#061525] text-[14px] text-blue-100/65">
        Preparing the comparison map…
      </div>
    ),
  }
);

type OttomanMughalLessonProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  unitHref: string;
};

type MapPrediction = "location" | "control" | "same-system";

const STAGES = [
  "Orient",
  "Locate",
  "Compare",
  "Build",
  "Judge",
  "Practice",
  "Conclude",
] as const;

const VERDICT_LABELS: Record<ClaimVerdict, string> = {
  supported: "Supported",
  overgeneralized: "Overgeneralized",
  "not-shown": "Not shown by this evidence",
};

const QUIZ: AssessmentQuestion[] = [
  {
    id: "ottoman-mughal-fair-comparison",
    type: "mcq",
    prompt: "Which comparison holds the lens most consistently?",
    options: [
      "Compare how both courts extended authority beyond the capital",
      "Compare Ottoman trade with Mughal religious diversity",
      "Rank the empires only by the size of a colored map footprint",
    ],
    correctAnswer:
      "Compare how both courts extended authority beyond the capital",
    explanation:
      "A fair comparison applies the same question or category to both cases.",
  },
  {
    id: "ottoman-mughal-map-limit",
    type: "mcq",
    prompt: "What can the reconstructed footprint support most directly?",
    options: [
      "Approximate location and broad territorial reach",
      "Equal administrative control in every region",
      "The exact beliefs of every person inside the boundary",
    ],
    correctAnswer: "Approximate location and broad territorial reach",
    explanation:
      "A broad historical polygon helps orientation. Other evidence is needed for administration, identity, and local experience.",
  },
  {
    id: "ottoman-mughal-change",
    type: "mcq",
    prompt: "Why must a 1750 comparison treat the Mughal footprint cautiously?",
    options: [
      "Central authority had fragmented across powerful regional states",
      "South Asia had no cities or trade networks",
      "The Mughal Empire had never used provincial administration",
    ],
    correctAnswer:
      "Central authority had fragmented across powerful regional states",
    explanation:
      "A broad footprint can outlast or overstate the strength of central administration.",
  },
];

export default function OttomanMughalLesson({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: OttomanMughalLessonProps) {
  const [mapPrediction, setMapPrediction] = useState<MapPrediction | null>(
    null
  );
  const [mapFocus, setMapFocus] = useState<EmpireMapFocus>("both");
  const [lens, setLens] = useState<ComparisonLens>("government");
  const [evidenceOpen, setEvidenceOpen] = useState<Record<EmpireId, boolean>>({
    ottoman: true,
    mughal: false,
  });
  const [claimIndex, setClaimIndex] = useState(0);
  const [claimVerdict, setClaimVerdict] = useState<ClaimVerdict | null>(null);
  const selectedLens = getComparisonLens(lens);
  const claim = COMPARISON_CLAIMS[claimIndex];
  const summary = COMPARISON_SUMMARIES[lens];

  function chooseLens(nextLens: ComparisonLens) {
    setLens(nextLens);
    setEvidenceOpen({ ottoman: true, mughal: false });
  }

  function chooseClaim(index: number) {
    setClaimIndex(index);
    setClaimVerdict(null);
  }

  return (
    <ClassroomLessonShell
      subjectTone="social-studies"
      breadcrumbs={breadcrumbs}
      eyebrow="Global II · Unit 1 · Key Idea 10.1a"
      icon={Landmark}
      title="Ottoman & Mughal Empires"
      subtitle="Compare two large, diverse empires with one steady lens—and learn why a colored footprint is only the beginning of a historical claim."
      stages={STAGES}
      practiceTargetId="ottoman-mughal-practice"
      unitHref={unitHref}
      previous={previous}
      next={next}
      lessonPosition="02 / 04"
      background={<EmpireField />}
    >
      <section className="bg-[#06111f]/72 mt-4 rounded-[20px] border border-blue-200/[0.13] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="1" label="Orient" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.1rem)] font-semibold tracking-[-0.03em] text-white">
          Start with the shared problem of distance.
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-300/80">
          Both courts claimed authority across many regions, communities, and
          routes. Before comparing their solutions, separate what a map can show
          from what must come from other evidence.
        </p>

        <AuthorityDiagram />

        <p className="mt-3 text-[14px] font-semibold text-stone-300">
          What can a territorial footprint show most directly?
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {(
            [
              ["location", "Approximate location and reach"],
              ["control", "Equal control in every region"],
              ["same-system", "The same administrative system"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMapPrediction(value)}
              aria-pressed={mapPrediction === value}
              className={`rounded-[13px] border px-3 py-2.5 text-left text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 ${
                mapPrediction === value
                  ? "border-blue-200/25 bg-blue-300/[0.09] text-blue-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {mapPrediction ? (
          <p
            className={`mt-3 rounded-[14px] border px-3 py-2.5 text-[14px] leading-5 ${
              mapPrediction === "location"
                ? "border-blue-200/[0.18] bg-blue-300/[0.05] text-blue-100"
                : "border-amber-200/[0.15] bg-amber-300/[0.04] text-amber-100"
            }`}
            aria-live="polite"
          >
            {mapPrediction === "location"
              ? "Exactly. The footprint helps us locate and compare broad reach; documents and other records are needed to explain how rule worked."
              : "A filled region can look uniform even when control, institutions, and local relationships vary. Use it for orientation, not as the whole argument."}
          </p>
        ) : null}
      </section>

      <section className="mt-4 rounded-[20px] border border-cyan-200/[0.12] bg-cyan-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="2" label="Locate" tone="cyan" />
        <div className="flex items-start gap-3">
          <MapPinned
            size={19}
            className="mt-1 text-cyan-200"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
              Locate both before zooming into either.
            </h2>
            <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-400">
              The two empires occupied different but connected parts of Eurasia.
              Focus each footprint, then return to the shared view.
            </p>
          </div>
        </div>
        <EmpireComparisonMap focus={mapFocus} onFocus={setMapFocus} />
        <p className="mt-3 text-[13px] leading-5 text-stone-400">
          Both polygons come from the 1715 source snapshot used in the previous
          lesson. They support near-period orientation, not exact borders or
          equal administrative reach in 1750.
        </p>
      </section>

      <section className="mt-4 rounded-[20px] border border-violet-200/[0.12] bg-violet-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="3" label="Compare" tone="violet" />
        <div className="flex items-start gap-3">
          <Scale
            size={19}
            className="mt-1 text-violet-200"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
              Hold one question steady.
            </h2>
            <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-400">
              A fair comparison asks the same kind of question about both
              empires. Change the lens, not the standard.
            </p>
          </div>
        </div>

        <div
          className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
          role="tablist"
        >
          {COMPARISON_LENSES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={lens === item.id}
              onClick={() => chooseLens(item.id)}
              className={`rounded-[13px] border px-3 py-2.5 text-left text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 ${
                lens === item.id
                  ? "border-violet-200/25 bg-violet-300/[0.09] text-violet-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-3 border-l-2 border-violet-300/35 pl-3 text-[15px] leading-6 text-stone-300">
          {selectedLens.question}
        </p>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {(["ottoman", "mughal"] as EmpireId[]).map((id) => (
            <EmpireEvidence key={id} id={id} lens={lens} />
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-blue-200/[0.12] bg-black/[0.20] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="4" label="Build" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Build similarity and difference from the same evidence.
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-400">
          Open both dossiers. A strong comparison identifies a shared pattern
          and then protects the context that makes each case distinct.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(["ottoman", "mughal"] as EmpireId[]).map((id) => {
            const empire = getComparisonEmpire(id);
            const open = evidenceOpen[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() =>
                  setEvidenceOpen((current) => ({ ...current, [id]: !open }))
                }
                aria-pressed={open}
                className={`rounded-[14px] border px-3 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 ${
                  open
                    ? "border-blue-200/25 bg-blue-300/[0.08] text-blue-50"
                    : "border-white/[0.07] bg-black/[0.12] text-stone-400"
                }`}
              >
                <span className="flex items-center gap-2 text-[14px] font-semibold">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: empire.mapColor }}
                    aria-hidden="true"
                  />
                  {empire.name} evidence
                </span>
                <span className="mt-1 block text-[12px] font-normal opacity-65">
                  {open ? "Included in the comparison" : "Open this dossier"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <ComparisonResult
            label="Similarity"
            text={summary.similarity}
            ready={evidenceOpen.ottoman && evidenceOpen.mughal}
          />
          <ComparisonResult
            label="Contextual difference"
            text={summary.difference}
            ready={evidenceOpen.ottoman && evidenceOpen.mughal}
          />
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-indigo-200/[0.12] bg-indigo-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="5" label="Judge" tone="violet" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Judge what the evidence can carry.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {COMPARISON_CLAIMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => chooseClaim(index)}
              aria-pressed={claimIndex === index}
              className={`rounded-[13px] border px-3 py-2.5 text-left text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 ${
                claimIndex === index
                  ? "border-indigo-200/25 bg-indigo-300/[0.09] text-indigo-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              Claim {index + 1}
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-[16px] border border-white/[0.08] bg-black/[0.15] p-4">
          <p className="font-serif text-[18px] leading-7 text-stone-200">
            “{claim.claim}”
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(Object.keys(VERDICT_LABELS) as ClaimVerdict[]).map((verdict) => (
              <button
                key={verdict}
                type="button"
                onClick={() => setClaimVerdict(verdict)}
                aria-pressed={claimVerdict === verdict}
                className={`rounded-xl border px-3 py-2.5 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 ${
                  claimVerdict === verdict
                    ? "border-indigo-200/25 bg-indigo-300/[0.08] text-indigo-50"
                    : "border-white/[0.07] text-stone-400"
                }`}
              >
                {VERDICT_LABELS[verdict]}
              </button>
            ))}
          </div>
          {claimVerdict ? (
            <p
              className={`mt-3 text-[14px] font-semibold leading-5 ${
                claimVerdict === claim.verdict
                  ? "text-blue-100"
                  : "text-amber-100"
              }`}
              aria-live="polite"
            >
              {claimVerdict === claim.verdict
                ? claim.explanation
                : "Compare the exact wording with the map and both evidence dossiers. Which part is demonstrated, assumed, or too broad?"}
            </p>
          ) : null}
        </div>
      </section>

      <section id="ottoman-mughal-practice" className="mt-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[20px] border border-blue-200/[0.12] bg-black/[0.20] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div>
              <StageLabel number="6" label="Practice" />
              <h2 className="mt-1 font-serif text-[21px] font-semibold text-white">
                Check the comparison method
              </h2>
            </div>
            <Sparkles
              size={17}
              className="mt-1 text-blue-200"
              aria-hidden="true"
            />
          </div>
          <div className="empire-assessment border-t border-white/[0.06] p-3 sm:p-4">
            <Assessment
              title="Ottoman & Mughal comparison check"
              questions={QUIZ}
              accentColor="blue"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-blue-200/[0.14] bg-blue-300/[0.04] p-4 backdrop-blur-xl sm:p-5">
        <StageLabel number="7" label="Conclude" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Compare with a steady lens, then restore the context.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            "Locate both cases",
            "Ask the same question",
            "Use evidence from each",
            "Limit the claim",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-[13px] border border-white/[0.07] bg-black/[0.13] p-3"
            >
              <div className="font-mono text-[11px] text-blue-200/70">
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
        .empire-assessment > div { border-radius: 16px !important; padding: 14px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .empire-assessment > div > div { min-height: 250px !important; }
        .empire-assessment h3 { margin-bottom: 14px !important; font-size: 1.02rem !important; line-height: 1.45 !important; }
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

function AuthorityDiagram() {
  return (
    <div className="mt-4 grid gap-2 rounded-[17px] border border-blue-200/[0.10] bg-black/[0.15] p-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
      <DiagramNode label="Imperial court" detail="claims and decisions" />
      <DiagramArrow />
      <DiagramNode
        label="Officials & elites"
        detail="administration and negotiation"
      />
      <DiagramArrow />
      <DiagramNode
        label="Regions & communities"
        detail="varied local conditions"
      />
    </div>
  );
}

function DiagramNode({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="rounded-[13px] border border-white/[0.07] bg-blue-300/[0.035] p-3 text-center">
      <div className="text-[14px] font-semibold text-blue-50">{label}</div>
      <div className="mt-1 text-[12px] text-stone-500">{detail}</div>
    </div>
  );
}

function DiagramArrow() {
  return (
    <div
      className="rotate-90 text-center font-mono text-[18px] text-blue-200/45 sm:rotate-0"
      aria-hidden="true"
    >
      →
    </div>
  );
}

function EmpireEvidence({ id, lens }: { id: EmpireId; lens: ComparisonLens }) {
  const empire = getComparisonEmpire(id);
  return (
    <article
      className="rounded-[16px] border bg-black/[0.14] p-4"
      style={{ borderColor: `${empire.mapColor}3d` }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-500">
            {empire.capital} court
          </div>
          <h3 className="mt-1 font-serif text-[21px] font-semibold text-white">
            {empire.name}
          </h3>
        </div>
        <span
          className="h-4 w-4 rounded-full border-2"
          style={{
            borderColor: empire.mapColor,
            backgroundColor: `${empire.mapColor}33`,
          }}
          aria-hidden="true"
        />
      </div>
      <p className="mt-3 text-[14px] leading-6 text-stone-300">
        {empire.evidence[lens]}
      </p>
    </article>
  );
}

function ComparisonResult({
  label,
  text,
  ready,
}: {
  label: string;
  text: string;
  ready: boolean;
}) {
  return (
    <div
      className={`rounded-[15px] border p-4 transition-colors ${
        ready
          ? "border-blue-200/[0.18] bg-blue-300/[0.05]"
          : "border-white/[0.06] bg-black/[0.10]"
      }`}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-200/70">
        {label}
      </div>
      <p
        className={`mt-2 text-[14px] leading-5 ${ready ? "text-stone-200" : "text-stone-600"}`}
      >
        {ready ? text : "Open both evidence dossiers to compare this lens."}
      </p>
    </div>
  );
}

function EmpireField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(59,130,246,0.18),transparent_31%),radial-gradient(circle_at_80%_34%,rgba(139,92,246,0.17),transparent_32%),linear-gradient(180deg,#06111f,#02070d)]" />
      <div className="absolute left-[8%] top-[18%] h-44 w-44 rounded-full border border-blue-200/[0.09] shadow-[0_0_80px_rgba(59,130,246,0.08)]" />
      <div className="absolute right-[7%] top-[31%] h-52 w-52 rounded-full border border-violet-200/[0.09] shadow-[0_0_90px_rgba(139,92,246,0.08)]" />
      <div className="absolute left-[23%] top-[34%] h-px w-[52%] rotate-[7deg] border-t border-dashed border-cyan-200/[0.12]" />
      <div className="absolute left-[27%] top-[43%] h-px w-[45%] -rotate-[5deg] border-t border-dashed border-violet-200/[0.10]" />
      <div className="absolute bottom-[12%] left-[10%] right-[10%] grid grid-cols-2 gap-[28%] opacity-20">
        <div className="h-32 border-x border-t border-blue-200/[0.16] [clip-path:polygon(10%_100%,10%_42%,28%_42%,28%_17%,50%_0,72%_17%,72%_42%,90%_42%,90%_100%)]" />
        <div className="h-32 border-x border-t border-violet-200/[0.16] [clip-path:polygon(10%_100%,10%_42%,28%_42%,28%_17%,50%_0,72%_17%,72%_42%,90%_42%,90%_100%)]" />
      </div>
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(147,197,253,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.65)_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  );
}
