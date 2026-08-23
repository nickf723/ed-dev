"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Landmark, Sparkles } from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import ClassroomLessonShell, {
  type ClassroomLessonNavItem,
} from "@/app/classroom/_components/lessons/ClassroomLessonShell";
import type { TokugawaBourbonMapFocus } from "@/app/classroom/_components/lessons/TokugawaBourbonMap";
import {
  CENTRALIZATION_CASES,
  CENTRALIZATION_CLAIMS,
  CENTRALIZATION_LENSES,
  getCentralizationCase,
  getCentralizationLens,
  type CentralizationCaseId,
  type CentralizationLens,
} from "@/app/classroom/_components/lessons/tokugawa-bourbon-model";

const TokugawaBourbonMap = dynamic(
  () => import("@/app/classroom/_components/lessons/TokugawaBourbonMap"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-4 flex h-[360px] items-center justify-center rounded-[18px] border border-blue-200/[0.12] bg-[#061525] text-[14px] text-blue-100/60 sm:h-[430px]">
        Preparing the historical map…
      </div>
    ),
  }
);

type TokugawaBourbonLessonProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  unitHref: string;
};

type ClaimId = (typeof CENTRALIZATION_CLAIMS)[number]["id"];

const STAGES = [
  "Locate",
  "Model",
  "Compare",
  "Connect",
  "Test",
  "Practice",
  "Conclude",
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "centralization-shared-method",
    type: "mcq",
    prompt:
      "Which comparison is best supported by the institutional evidence in this lesson?",
    options: [
      "Both governments made access to a political center important for powerful elites",
      "Both governments abolished every regional institution",
      "Both governments used identical offices and laws",
    ],
    correctAnswer:
      "Both governments made access to a political center important for powerful elites",
    explanation:
      "Alternate attendance and court-centered politics were different systems, but both linked elite position to a political center.",
  },
  {
    id: "centralization-tokugawa-limit",
    type: "mcq",
    prompt:
      "Why does domain administration matter when explaining Tokugawa centralization?",
    options: [
      "It shows that shogunal authority remained layered with daimyo rule",
      "It proves the shogun had no authority outside Edo",
      "It means Japan had no political center",
    ],
    correctAnswer:
      "It shows that shogunal authority remained layered with daimyo rule",
    explanation:
      "The bakufu set broad rules and supervised strategic affairs, but domains retained institutions and resources. Centralized did not mean uniform.",
  },
  {
    id: "centralization-map-limit",
    type: "mcq",
    prompt: "What can the lesson map establish most directly?",
    options: [
      "Approximate location and near-period footprint",
      "How obedient every local official was",
      "The exact strength of every institution",
    ],
    correctAnswer: "Approximate location and near-period footprint",
    explanation:
      "Administrative effectiveness requires institutional evidence. A footprint map cannot measure it by itself.",
  },
];

export default function TokugawaBourbonLesson({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: TokugawaBourbonLessonProps) {
  const [mapFocus, setMapFocus] = useState<TokugawaBourbonMapFocus>("both");
  const [lensId, setLensId] = useState<CentralizationLens>("elite-control");
  const [caseId, setCaseId] = useState<CentralizationCaseId>("tokugawa");
  const [claimId, setClaimId] = useState<ClaimId | null>(null);
  const lens = getCentralizationLens(lensId);
  const activeCase = getCentralizationCase(caseId);
  const selectedClaim = CENTRALIZATION_CLAIMS.find(
    (claim) => claim.id === claimId
  );

  return (
    <ClassroomLessonShell
      subjectTone="social-studies"
      breadcrumbs={breadcrumbs}
      eyebrow="Global II · Unit 1 · Institutions of Power"
      icon={Landmark}
      title="Tokugawa Japan & Bourbon France"
      subtitle="Compare how two governments drew elites toward a political center—then test where the similarity stops."
      stages={STAGES}
      practiceTargetId="centralization-practice"
      unitHref={unitHref}
      previous={previous}
      next={next}
      lessonPosition="03 / 04"
      background={<InstitutionField />}
    >
      <section className="bg-[#061321]/76 mt-4 rounded-[20px] border border-blue-200/[0.14] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="1" label="Locate" />
        <div className="mt-2 grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
              Start far apart.
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-300/80">
              Locate each case before comparing it. The reconstructed footprints
              come from near-period snapshots—France from 1715 and Japan from
              1783—not exact borders frozen in 1750.
            </p>
          </div>
          <p className="rounded-[14px] border border-blue-200/[0.11] bg-blue-300/[0.035] p-3 font-serif text-[15px] leading-6 text-blue-50/80">
            A map can show where. Institutions help explain how.
          </p>
        </div>
        <TokugawaBourbonMap focus={mapFocus} onFocus={setMapFocus} />
      </section>

      <section className="mt-4 rounded-[20px] border border-cyan-200/[0.12] bg-cyan-300/[0.025] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="2" label="Model" tone="cyan" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Centralization is a network, not a volume knob.
        </h2>
        <div className="mt-4 overflow-x-auto rounded-[18px] border border-cyan-100/[0.11] bg-black/[0.14] p-4">
          <div className="mx-auto grid min-w-[620px] max-w-[780px] grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 text-center">
            <NetworkNode
              label="Political center"
              note="court · shogunate"
              tone="cyan"
            />
            <NetworkLink label="rules + access" />
            <NetworkNode
              label="Powerful elites"
              note="nobles · daimyo"
              tone="blue"
            />
            <NetworkLink label="offices + attendance" />
            <NetworkNode
              label="Regions"
              note="provinces · domains"
              tone="violet"
            />
          </div>
        </div>
        <ul className="mt-3 grid gap-2 text-[14px] leading-5 text-stone-400 sm:grid-cols-3">
          {[
            "Ask how decisions travel outward.",
            "Ask what draws elites inward.",
            "Ask what still resists uniform control.",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-[13px] border border-white/[0.07] bg-black/[0.12] p-3"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-[20px] border border-blue-200/[0.12] bg-black/[0.20] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="3" label="Compare" />
        <div className="mt-1.5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <h2 className="font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
              Hold the lens steady.
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-400">
              Ask the same question of both cases. That makes the comparison
              fair without pretending the systems were identical.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1.5 rounded-[14px] border border-white/[0.07] bg-black/[0.13] p-1.5">
            {CENTRALIZATION_LENSES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLensId(item.id)}
                aria-pressed={lensId === item.id}
                className={`min-h-10 rounded-[10px] px-2 text-[12px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 ${
                  lensId === item.id
                    ? "bg-blue-300/[0.12] text-blue-50"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 rounded-[13px] border border-blue-200/[0.10] bg-blue-300/[0.025] p-3 font-serif text-[15px] leading-6 text-blue-50/80">
          {lens.question}
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {(Object.keys(CENTRALIZATION_CASES) as CentralizationCaseId[]).map(
            (id) => {
              const item = getCentralizationCase(id);
              return (
                <article
                  key={id}
                  className="rounded-[16px] border bg-black/[0.14] p-4"
                  style={{ borderColor: `${item.mapColor}30` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-[18px] font-semibold text-white">
                      {item.name}
                    </h3>
                    <span
                      className="rounded-full border px-2.5 py-1 font-mono text-[11px]"
                      style={{
                        borderColor: `${item.mapColor}35`,
                        color: item.mapColor,
                        backgroundColor: `${item.mapColor}10`,
                      }}
                    >
                      {item.center}
                    </span>
                  </div>
                  <p className="mt-3 text-[14px] leading-6 text-stone-300/85">
                    {item.evidence[lensId]}
                  </p>
                </article>
              );
            }
          )}
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-violet-200/[0.12] bg-violet-300/[0.025] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="4" label="Connect" tone="violet" />
        <div className="mt-1.5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_270px] lg:items-end">
          <div>
            <h2 className="font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
              Build an institutional chain.
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-400">
              Choose a case, then follow one mechanism from action to intended
              effect to practical limit.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1.5 rounded-[14px] border border-white/[0.07] bg-black/[0.13] p-1.5">
            {(Object.keys(CENTRALIZATION_CASES) as CentralizationCaseId[]).map(
              (id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCaseId(id)}
                  aria-pressed={caseId === id}
                  className={`min-h-10 rounded-[10px] px-2 text-[12px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 ${
                    caseId === id
                      ? "bg-violet-300/[0.12] text-violet-50"
                      : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  {id === "tokugawa" ? "Tokugawa" : "Bourbon"}
                </button>
              )
            )}
          </div>
        </div>
        <div className="mt-3 grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          <ChainCard
            number="01"
            label="Mechanism"
            text={
              caseId === "tokugawa"
                ? "Alternate attendance connected daimyo life to Edo."
                : "Court life, patronage, and office linked many elites to Versailles."
            }
          />
          <ChainArrow />
          <ChainCard
            number="02"
            label="Intended effect"
            text={
              caseId === "tokugawa"
                ? "Keep regional lords visible, invested, and costly to mobilize independently."
                : "Make royal access and favor important to elite political position."
            }
          />
          <ChainArrow />
          <ChainCard
            number="03"
            label="Limit"
            text={activeCase.evidence.limit}
          />
        </div>
        <p className="mt-3 rounded-[13px] border border-violet-200/[0.10] bg-black/[0.12] p-3 text-[14px] leading-5 text-stone-400">
          The chain describes a tendency and a mechanism. It does not claim that
          every elite behaved identically or that the center always achieved its
          intended result.
        </p>
      </section>

      <section className="mt-4 rounded-[20px] border border-blue-200/[0.12] bg-blue-300/[0.025] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="5" label="Test" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          How far can the evidence carry the claim?
        </h2>
        <div className="mt-3 grid gap-2">
          {CENTRALIZATION_CLAIMS.map((claim) => (
            <button
              key={claim.id}
              type="button"
              onClick={() => setClaimId(claim.id)}
              aria-pressed={claimId === claim.id}
              className={`rounded-[13px] border px-3 py-2.5 text-left text-[14px] leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 ${
                claimId === claim.id
                  ? "border-blue-200/25 bg-blue-300/[0.08] text-blue-50"
                  : "border-white/[0.07] bg-black/[0.11] text-stone-400"
              }`}
            >
              {claim.claim}
            </button>
          ))}
        </div>
        {selectedClaim ? (
          <div
            className={`mt-3 rounded-[14px] border p-3 text-[14px] leading-5 ${
              selectedClaim.verdict === "supported"
                ? "border-blue-200/[0.18] bg-blue-300/[0.045] text-blue-100"
                : "border-orange-200/[0.15] bg-orange-300/[0.04] text-orange-100"
            }`}
            aria-live="polite"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.11em]">
              {selectedClaim.verdict === "not-shown"
                ? "Not shown by this evidence"
                : selectedClaim.verdict}
            </div>
            <p className="mt-1">{selectedClaim.explanation}</p>
          </div>
        ) : null}
      </section>

      <section id="centralization-practice" className="mt-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[20px] border border-blue-200/[0.12] bg-black/[0.20] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div>
              <StageLabel number="6" label="Practice" />
              <h2 className="mt-1 font-serif text-[21px] font-semibold text-white">
                Check the institutional comparison
              </h2>
            </div>
            <Sparkles
              size={17}
              className="mt-1 text-blue-200"
              aria-hidden="true"
            />
          </div>
          <div className="centralization-assessment border-t border-white/[0.06] p-3 sm:p-4">
            <Assessment
              title="Tokugawa & Bourbon check"
              questions={QUIZ}
              accentColor="blue"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-blue-200/[0.14] bg-blue-300/[0.04] p-4 backdrop-blur-xl sm:p-5">
        <StageLabel number="7" label="Conclude" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Compare the mechanism—and preserve the limits.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            "Locate each case",
            "Hold one lens",
            "Trace an institution",
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
        .centralization-assessment > div { border-radius: 16px !important; padding: 14px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .centralization-assessment > div > div { min-height: 250px !important; }
        .centralization-assessment h3 { margin-bottom: 14px !important; font-size: 1.02rem !important; line-height: 1.45 !important; }
      `}</style>
    </ClassroomLessonShell>
  );
}

function NetworkNode({
  label,
  note,
  tone,
}: {
  label: string;
  note: string;
  tone: "cyan" | "blue" | "violet";
}) {
  const colors = {
    cyan: "border-cyan-200/22 bg-cyan-300/[0.07] text-cyan-50",
    blue: "border-blue-200/22 bg-blue-300/[0.07] text-blue-50",
    violet: "border-violet-200/22 bg-violet-300/[0.07] text-violet-50",
  };
  return (
    <div className={`rounded-[16px] border p-4 ${colors[tone]}`}>
      <div className="font-serif text-[17px] font-semibold">{label}</div>
      <div className="mt-1 text-[12px] opacity-60">{note}</div>
    </div>
  );
}

function NetworkLink({ label }: { label: string }) {
  return (
    <div className="min-w-[90px]">
      <div className="border-t border-dashed border-blue-200/30" />
      <div className="mt-1 text-[11px] text-blue-100/45">{label}</div>
    </div>
  );
}

function ChainCard({
  number,
  label,
  text,
}: {
  number: string;
  label: string;
  text: string;
}) {
  return (
    <article className="rounded-[15px] border border-violet-200/[0.11] bg-black/[0.14] p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/70">
        <span className="font-mono">{number}</span> {label}
      </div>
      <p className="mt-2 text-[14px] leading-6 text-stone-300">{text}</p>
    </article>
  );
}

function ChainArrow() {
  return (
    <div className="flex items-center justify-center text-violet-200/55">
      <span className="hidden text-[24px] lg:block" aria-hidden="true">
        →
      </span>
      <span className="text-[20px] lg:hidden" aria-hidden="true">
        ↓
      </span>
    </div>
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

function InstitutionField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_26%,rgba(139,92,246,0.12),transparent_28%),radial-gradient(circle_at_14%_68%,rgba(59,130,246,0.16),transparent_34%),linear-gradient(180deg,#05101c,#02070d)]" />
      <svg
        viewBox="0 0 100 100"
        className="absolute right-[-5%] top-[9%] h-[70vw] max-h-[850px] w-[70vw] max-w-[850px] opacity-[0.10]"
      >
        {[
          [50, 22, 27, 48],
          [50, 22, 72, 46],
          [27, 48, 18, 76],
          [27, 48, 43, 78],
          [72, 46, 62, 77],
          [72, 46, 86, 72],
        ].map(([x1, y1, x2, y2], index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(147,197,253,0.8)"
            strokeWidth="0.45"
            strokeDasharray="2 2"
          />
        ))}
        {[
          [50, 22, 6],
          [27, 48, 5],
          [72, 46, 5],
          [18, 76, 4],
          [43, 78, 4],
          [62, 77, 4],
          [86, 72, 4],
        ].map(([x, y, radius], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={radius}
            fill="rgba(96,165,250,0.18)"
            stroke="rgba(191,219,254,0.75)"
            strokeWidth="0.45"
          />
        ))}
      </svg>
      <Landmark className="absolute -left-12 bottom-[6%] h-72 w-72 text-blue-200/[0.03]" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(147,197,253,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  );
}
