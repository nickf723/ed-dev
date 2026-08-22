"use client";

import { useState } from "react";
import { BookOpenText, Highlighter, Sparkles } from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import ClassroomLessonShell, {
  type ClassroomLessonNavItem,
} from "@/app/classroom/_components/lessons/ClassroomLessonShell";

type EvidenceLessonProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  unitHref: string;
};

type InferenceId = "closing" | "late" | "surprise";
type ExplanationId = "objects" | "feeling" | "summary";

const STAGES = [
  "Read",
  "Notice",
  "Infer",
  "Test",
  "Explain",
  "Practice",
  "Conclude",
] as const;

const PASSAGE = [
  "At 6:47, the bakery’s front sign still read CLOSED.",
  "Imani balanced a cardboard box on one hip and tried the locked door again.",
  "Inside, her father stood beside the dark ovens, holding his flour-dusted apron.",
  "When he saw her through the glass, he folded the apron once and placed it in the box.",
  "Imani stopped knocking.",
  "In the bakery window, a new FOR LEASE sign stirred in the rain.",
] as const;

const INFERENCES: readonly {
  id: InferenceId;
  label: string;
  feedback: string;
}[] = [
  {
    id: "closing",
    label: "The bakery is closing permanently.",
    feedback:
      "This is the strongest inference. Several details point toward an ending, even though the narrator never states it directly.",
  },
  {
    id: "late",
    label: "Imani arrived late for her work shift.",
    feedback:
      "The time and locked door might suggest lateness, but the packed apron and FOR LEASE sign need a fuller explanation.",
  },
  {
    id: "surprise",
    label: "Her father is preparing a surprise celebration.",
    feedback:
      "A box could hide a surprise, but the dark ovens and FOR LEASE sign work against this reading.",
  },
] as const;

const EXPLANATIONS: readonly {
  id: ExplanationId;
  label: string;
  strong: boolean;
}[] = [
  {
    id: "objects",
    label:
      "The dark ovens, packed apron, and FOR LEASE sign all signal that work has stopped and the space is being given up.",
    strong: true,
  },
  {
    id: "feeling",
    label: "The scene feels sad, so something bad probably happened.",
    strong: false,
  },
  {
    id: "summary",
    label: "Imani reaches a locked bakery and sees her father inside.",
    strong: false,
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "evidence-inference-difference",
    type: "mcq",
    prompt: "Which statement is an inference rather than an explicit detail?",
    options: [
      "The bakery is closing permanently",
      "The ovens are dark",
      "Imani carries a cardboard box",
    ],
    correctAnswer: "The bakery is closing permanently",
    explanation:
      "The closing is not stated directly. Readers infer it by combining several explicit details.",
  },
  {
    id: "evidence-best-line",
    type: "mcq",
    prompt:
      "Which detail most directly supports the idea that the bakery space is being given up?",
    options: [
      "A new FOR LEASE sign is in the bakery window",
      "It is 6:47",
      "Rain falls outside",
    ],
    correctAnswer: "A new FOR LEASE sign is in the bakery window",
    explanation:
      "The sign directly connects the physical space to a possible change in ownership or use.",
  },
  {
    id: "evidence-reasoning",
    type: "mcq",
    prompt: "What turns a quoted detail into useful evidence?",
    options: [
      "Reasoning that explains how it supports the claim",
      "Choosing the longest sentence",
      "Repeating the claim after the detail",
    ],
    correctAnswer: "Reasoning that explains how it supports the claim",
    explanation:
      "Evidence becomes persuasive when the writer makes its connection to the claim clear.",
  },
];

const SUPPORTING_LINES = new Set([3, 4, 6]);

export default function EvidenceInferenceLesson({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: EvidenceLessonProps) {
  const [inference, setInference] = useState<InferenceId | null>(null);
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [explanation, setExplanation] = useState<ExplanationId | null>(null);
  const selectedInference = INFERENCES.find((item) => item.id === inference);
  const usefulEvidence = selectedLines.filter((line) =>
    SUPPORTING_LINES.has(line)
  );
  const evidenceReady = usefulEvidence.length >= 2;
  const selectedExplanation = EXPLANATIONS.find(
    (item) => item.id === explanation
  );

  function toggleLine(line: number) {
    setSelectedLines((current) =>
      current.includes(line)
        ? current.filter((item) => item !== line)
        : [...current, line]
    );
  }

  return (
    <ClassroomLessonShell
      subjectTone="english"
      breadcrumbs={breadcrumbs}
      eyebrow="Literature · Unit 1 · Close Reading"
      icon={BookOpenText}
      title="Evidence & Inference"
      subtitle="Read what the text says, notice what it implies, and build an interpretation that the details can support."
      stages={STAGES}
      practiceTargetId="evidence-practice"
      unitHref={unitHref}
      previous={previous}
      next={next}
      lessonPosition="01 / 06"
      background={<ReadingField />}
    >
      <section className="mt-4 rounded-[20px] border border-yellow-200/[0.14] bg-[#181306]/75 p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="1" label="Read" />
        <div className="mt-2 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
              Read once without solving.
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-6 text-stone-300/80">
              Let the scene form before deciding what it means. On a first read,
              collect details and questions rather than racing toward an answer.
            </p>
          </div>
          <div className="rounded-[15px] border border-yellow-200/[0.10] bg-yellow-300/[0.035] p-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-yellow-200/70">
              First-read question
            </div>
            <p className="mt-2 font-serif text-[15px] leading-6 text-stone-200">
              What changed before Imani reached the bakery?
            </p>
          </div>
        </div>
        <Passage />
      </section>

      <section className="mt-4 rounded-[20px] border border-amber-200/[0.12] bg-amber-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="2" label="Notice" tone="amber" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Separate what is stated from what is suggested.
        </h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <NoticeCard
            label="Explicit detail"
            text="Her father places the flour-dusted apron in the box."
            note="The words directly show this action."
          />
          <NoticeCard
            label="Possible inference"
            text="Her father will not bake there again."
            note="The text suggests this idea but never states it."
          />
        </div>
        <ul className="mt-3 grid gap-2 text-[14px] leading-5 text-stone-400 sm:grid-cols-3">
          {[
            "Details are observable in the text.",
            "Inferences combine details with reasoning.",
            "Strong inferences explain the whole pattern.",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-[13px] border border-white/[0.07] bg-black/[0.12] p-3"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-[20px] border border-yellow-200/[0.12] bg-black/[0.20] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="3" label="Infer" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Which reading explains the most details?
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-stone-400">
          Choose a tentative interpretation. A useful inference can still be
          revised.
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {INFERENCES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setInference(item.id)}
              aria-pressed={inference === item.id}
              className={`rounded-[14px] border px-3 py-3 text-left text-[14px] font-semibold leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60 ${
                inference === item.id
                  ? "border-yellow-200/30 bg-yellow-300/[0.09] text-yellow-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400 hover:text-stone-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {selectedInference ? (
          <p
            className={`mt-3 rounded-[14px] border px-3 py-2.5 text-[14px] leading-5 ${
              inference === "closing"
                ? "border-yellow-200/[0.18] bg-yellow-300/[0.045] text-yellow-100"
                : "border-orange-200/[0.15] bg-orange-300/[0.04] text-orange-100"
            }`}
            aria-live="polite"
          >
            {selectedInference.feedback}
          </p>
        ) : null}
      </section>

      <section className="mt-4 rounded-[20px] border border-orange-200/[0.12] bg-orange-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="4" label="Test" tone="orange" />
        <div className="mt-1.5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-end">
          <div>
            <h2 className="font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
              Highlight evidence, not just atmosphere.
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-400">
              Select two or more lines that directly support the bakery-closing
              inference.
            </p>
          </div>
          <div className="rounded-[14px] border border-orange-200/[0.12] bg-black/[0.13] p-3 text-[13px] text-stone-400">
            <span className="font-mono text-orange-200">
              {usefulEvidence.length}
            </span>{" "}
            useful details selected
          </div>
        </div>
        <div className="mt-3 grid gap-2">
          {PASSAGE.map((line, index) => {
            const lineNumber = index + 1;
            const selected = selectedLines.includes(lineNumber);
            return (
              <button
                key={line}
                type="button"
                onClick={() => toggleLine(lineNumber)}
                aria-pressed={selected}
                className={`grid grid-cols-[28px_minmax(0,1fr)] items-start gap-2 rounded-[13px] border px-3 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/60 ${
                  selected
                    ? "border-orange-200/25 bg-orange-300/[0.09] text-orange-50"
                    : "border-white/[0.07] bg-black/[0.12] text-stone-400"
                }`}
              >
                <span className="font-mono text-[11px] leading-5 text-orange-200/70">
                  {String(lineNumber).padStart(2, "0")}
                </span>
                <span className="font-serif text-[14px] leading-5">{line}</span>
              </button>
            );
          })}
        </div>
        {selectedLines.length ? (
          <p
            className={`mt-3 rounded-[14px] border px-3 py-2.5 text-[14px] leading-5 ${
              evidenceReady
                ? "border-yellow-200/[0.18] bg-yellow-300/[0.045] text-yellow-100"
                : "border-orange-200/[0.15] bg-orange-300/[0.04] text-orange-100"
            }`}
            aria-live="polite"
          >
            {evidenceReady
              ? "Strong pattern: the stopped work, packed apron, and changing space reinforce one another."
              : "Look for details that explain what is happening to the bakery, not details that only establish time or mood."}
          </p>
        ) : null}
      </section>

      <section className="mt-4 rounded-[20px] border border-yellow-200/[0.12] bg-yellow-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="5" label="Explain" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Make the bridge from evidence to claim.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-[0.8fr_1.2fr_1.35fr]">
          {[
            ["Claim", "The bakery is closing."],
            ["Evidence", "Dark ovens · packed apron · FOR LEASE sign"],
            ["Reasoning", "Choose the sentence that explains the connection."],
          ].map(([label, text], index) => (
            <div
              key={label}
              className="rounded-[14px] border border-white/[0.07] bg-black/[0.13] p-3"
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-yellow-200/70">
                <span className="font-mono">0{index + 1}</span>
                {label}
              </div>
              <p className="mt-2 text-[14px] leading-5 text-stone-300">
                {text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2">
          {EXPLANATIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setExplanation(item.id)}
              aria-pressed={explanation === item.id}
              className={`rounded-[13px] border px-3 py-2.5 text-left text-[14px] leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60 ${
                explanation === item.id
                  ? "border-yellow-200/25 bg-yellow-300/[0.08] text-yellow-50"
                  : "border-white/[0.07] bg-black/[0.11] text-stone-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {selectedExplanation ? (
          <p
            className={`mt-3 text-[14px] font-semibold ${
              selectedExplanation.strong ? "text-yellow-100" : "text-orange-100"
            }`}
            aria-live="polite"
          >
            {selectedExplanation.strong
              ? "Yes. This reasoning names the pattern and explains why the details support the claim."
              : explanation === "summary"
                ? "That restates events but does not explain how they support the closing inference."
                : "Mood can guide a reading, but the explanation must connect specific details to the claim."}
          </p>
        ) : null}
      </section>

      <section id="evidence-practice" className="mt-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[20px] border border-yellow-200/[0.12] bg-black/[0.20] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div>
              <StageLabel number="6" label="Practice" />
              <h2 className="mt-1 font-serif text-[21px] font-semibold text-white">
                Check the close-reading moves
              </h2>
            </div>
            <Sparkles
              size={17}
              className="mt-1 text-yellow-200"
              aria-hidden="true"
            />
          </div>
          <div className="evidence-assessment border-t border-white/[0.06] p-3 sm:p-4">
            <Assessment
              title="Evidence & Inference check"
              questions={QUIZ}
              accentColor="amber"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-yellow-200/[0.14] bg-yellow-300/[0.04] p-4 backdrop-blur-xl sm:p-5">
        <StageLabel number="7" label="Conclude" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          A close reading keeps an interpretation accountable.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            "Notice a pattern",
            "Form a tentative claim",
            "Test it with details",
            "Explain the connection",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-[13px] border border-white/[0.07] bg-black/[0.13] p-3"
            >
              <div className="font-mono text-[11px] text-yellow-200/70">
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
        .evidence-assessment > div { border-radius: 16px !important; padding: 14px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .evidence-assessment > div > div { min-height: 250px !important; }
        .evidence-assessment h3 { margin-bottom: 14px !important; font-size: 1.02rem !important; line-height: 1.45 !important; }
      `}</style>
    </ClassroomLessonShell>
  );
}

function StageLabel({
  number,
  label,
  tone = "yellow",
}: {
  number: string;
  label: string;
  tone?: "yellow" | "amber" | "orange";
}) {
  const color =
    tone === "amber"
      ? "text-amber-200/80"
      : tone === "orange"
        ? "text-orange-200/80"
        : "text-yellow-200/80";
  return (
    <div
      className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${color}`}
    >
      Stage {number} · {label}
    </div>
  );
}

function Passage() {
  return (
    <figure className="relative mt-4 overflow-hidden rounded-[18px] border border-yellow-100/[0.13] bg-[#f1e5c7] px-4 py-5 text-[#282116] shadow-[0_18px_60px_rgba(0,0,0,0.20)] sm:px-7">
      <div
        className="absolute inset-y-0 left-10 w-px bg-red-800/15 sm:left-14"
        aria-hidden="true"
      />
      <figcaption className="mb-3 pl-9 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-600 sm:pl-10">
        “The Last Batch” · original microfiction
      </figcaption>
      <div className="space-y-1.5">
        {PASSAGE.map((line, index) => (
          <p
            key={line}
            className="grid grid-cols-[24px_minmax(0,1fr)] gap-3 font-serif text-[15px] leading-6 sm:text-[16px]"
          >
            <span className="font-mono text-[11px] text-stone-500">
              {index + 1}
            </span>
            <span>{line}</span>
          </p>
        ))}
      </div>
    </figure>
  );
}

function NoticeCard({
  label,
  text,
  note,
}: {
  label: string;
  text: string;
  note: string;
}) {
  return (
    <div className="rounded-[15px] border border-white/[0.08] bg-black/[0.14] p-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/70">
        <Highlighter size={13} aria-hidden="true" /> {label}
      </div>
      <blockquote className="mt-2 border-l-2 border-amber-300/35 pl-3 font-serif text-[15px] leading-6 text-stone-200">
        {text}
      </blockquote>
      <p className="mt-2 text-[13px] leading-5 text-stone-500">{note}</p>
    </div>
  );
}

function ReadingField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-yellow-300/[0.07] blur-[90px]" />
      <div className="absolute -right-24 top-[38%] h-80 w-80 rounded-full bg-orange-400/[0.055] blur-[110px]" />
      <div className="absolute inset-0 opacity-[0.15] [background-image:repeating-linear-gradient(0deg,transparent,transparent_31px,rgba(250,204,21,0.12)_32px)]" />
      <div className="absolute left-[10%] top-[13%] h-[72%] w-px bg-red-300/[0.08]" />
      <BookOpenText className="absolute right-[7%] top-[18%] h-40 w-40 rotate-6 text-yellow-200/[0.025]" />
    </div>
  );
}
