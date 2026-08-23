"use client";

import { useState } from "react";
import { BookOpenText, Eye, Sparkles, UserRound } from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import ClassroomLessonShell, {
  type ClassroomLessonNavItem,
} from "@/app/classroom/_components/lessons/ClassroomLessonShell";
import {
  ACCESS_FACTS,
  ACCESS_LABELS,
  TELLINGS,
  accessCount,
  getTelling,
  type AccessLevel,
  type TellingId,
} from "@/app/classroom/_components/lessons/narrator-perspective-model";

type NarratorLessonProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  unitHref: string;
};

type TransferAnswer = "mara" | "theo" | "neither";

const STAGES = [
  "Compare",
  "Name",
  "Shift",
  "Track",
  "Transfer",
  "Practice",
  "Conclude",
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "perspective-author-narrator",
    type: "mcq",
    prompt: "Which statement correctly separates author and narrator?",
    options: [
      "The author creates the text; the narrator is the voice that tells it",
      "The narrator is always the author's truthful autobiography",
      "Only first-person texts have a narrator",
    ],
    correctAnswer:
      "The author creates the text; the narrator is the voice that tells it",
    explanation:
      "Every narrative has a telling voice. That constructed voice is not automatically the real author.",
  },
  {
    id: "perspective-third-limited",
    type: "mcq",
    prompt:
      "A third-person telling directly reveals Theo's thoughts but not Mara's. What is the strongest description?",
    options: [
      "Third person with perspective centered on Theo",
      "First person centered on Mara",
      "Third person with direct access to everyone",
    ],
    correctAnswer: "Third person with perspective centered on Theo",
    explanation:
      "Pronouns identify third-person voice; the pattern of inner access identifies Theo as the perceiving character.",
  },
  {
    id: "perspective-withheld",
    type: "mcq",
    prompt:
      "If the envelope's contents are not revealed, what may a careful reader conclude?",
    options: [
      "The contents are withheld for now",
      "The envelope is definitely empty",
      "The narrator has proven that no contents exist",
    ],
    correctAnswer: "The contents are withheld for now",
    explanation:
      "A reader should not turn missing access into a fact. Withholding can create curiosity or uncertainty.",
  },
];

export default function NarratorPerspectiveLesson({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: NarratorLessonProps) {
  const [tellingId, setTellingId] = useState<TellingId>("mara");
  const [transferAnswer, setTransferAnswer] = useState<TransferAnswer | null>(
    null
  );
  const telling = getTelling(tellingId);

  return (
    <ClassroomLessonShell
      subjectTone="english"
      breadcrumbs={breadcrumbs}
      eyebrow="Literature · Unit 1 · Narrative Access"
      icon={Eye}
      title="Narrator & Perspective"
      subtitle="Retell one event through different information windows, then explain how the telling changes what a reader can know."
      stages={STAGES}
      practiceTargetId="perspective-practice"
      unitHref={unitHref}
      previous={previous}
      next={next}
      lessonPosition="02 / 06"
      background={<PerspectiveField />}
    >
      <section className="mt-4 rounded-[20px] border border-yellow-200/[0.14] bg-[#181306]/75 p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="1" label="Compare" />
        <div className="mt-2 grid gap-3 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
              Same table. Different window.
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-300/80">
              Read both tellings before naming the technique. Notice what
              becomes certain—and what turns into a guess.
            </p>
          </div>
          <p className="rounded-[14px] border border-yellow-200/[0.11] bg-yellow-300/[0.035] p-3 font-serif text-[15px] leading-6 text-yellow-50/80">
            Which telling puts you closer to Mara? Which puts you closer to
            Theo?
          </p>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <MiniTelling tellingId="mara" label="Telling A" />
          <MiniTelling tellingId="limited" label="Telling B" />
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-amber-200/[0.12] bg-amber-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="2" label="Name" tone="amber" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Ask two questions, not one.
        </h2>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          <ConceptCard
            label="Author"
            question="Who made the text?"
            answer="The real writer outside the story"
          />
          <ConceptCard
            label="Narrator / voice"
            question="Who tells?"
            answer="The voice using I, she, he, or they"
          />
          <ConceptCard
            label="Perspective / access"
            question="Whose experience can we enter?"
            answer="The mind or viewpoint filtering the event"
          />
        </div>
        <div className="mt-3 flex items-start gap-3 rounded-[14px] border border-orange-200/[0.12] bg-orange-300/[0.035] p-3 text-[14px] leading-5 text-stone-300">
          <UserRound
            size={17}
            className="mt-0.5 shrink-0 text-orange-200"
            aria-hidden="true"
          />
          <p>
            <strong className="text-orange-100">Boundary:</strong> a
            first-person narrator is not automatically the author or
            automatically truthful. Third person is not automatically
            all-knowing.
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-yellow-200/[0.12] bg-black/[0.20] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="3" label="Shift" />
        <div className="mt-1.5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_270px] lg:items-end">
          <div>
            <h2 className="font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
              Move the information window.
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-400">
              Switch the telling. The event stays stable while voice, inner
              access, and suspense change.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1.5 rounded-[14px] border border-white/[0.07] bg-black/[0.13] p-1.5">
            {(Object.keys(TELLINGS) as TellingId[]).map((id, index) => (
              <button
                key={id}
                type="button"
                onClick={() => setTellingId(id)}
                aria-pressed={tellingId === id}
                className={`min-h-10 rounded-[10px] px-2 text-[12px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60 ${
                  tellingId === id
                    ? "bg-yellow-300/[0.12] text-yellow-50"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                View {index + 1}
              </button>
            ))}
          </div>
        </div>

        <figure className="mt-4 overflow-hidden rounded-[18px] border border-yellow-100/[0.13] bg-[#f1e5c7] text-[#282116] shadow-[0_18px_60px_rgba(0,0,0,0.20)]">
          <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-700/10 px-4 py-3 sm:px-6">
            <span className="font-serif text-[16px] font-semibold">
              {telling.label}
            </span>
            <span className="rounded-full border border-stone-700/15 bg-white/35 px-3 py-1 font-mono text-[11px]">
              {telling.voice} · access: {telling.perspective}
            </span>
          </figcaption>
          <div className="space-y-2 px-4 py-5 sm:px-6">
            {telling.text.map((line, index) => (
              <p
                key={line}
                className="grid grid-cols-[24px_minmax(0,1fr)] gap-3 font-serif text-[16px] leading-7"
              >
                <span className="font-mono text-[11px] text-stone-500">
                  {index + 1}
                </span>
                <span>{line}</span>
              </p>
            ))}
          </div>
        </figure>
      </section>

      <section className="mt-4 rounded-[20px] border border-orange-200/[0.12] bg-orange-300/[0.025] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="4" label="Track" tone="orange" />
        <div className="mt-1.5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_235px] lg:items-end">
          <div>
            <h2 className="font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
              Inspect the reader-access ledger.
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-stone-400">
              A perspective does not merely change pronouns. It distributes
              certainty, inference, and missing information.
            </p>
          </div>
          <div className="rounded-[14px] border border-orange-200/[0.12] bg-black/[0.12] p-3 text-[13px] leading-5 text-stone-400">
            Direct inner access: {accessCount(tellingId, "direct")} of{" "}
            {ACCESS_FACTS.length} facts
          </div>
        </div>
        <div className="mt-3 grid gap-2">
          {ACCESS_FACTS.map((fact) => (
            <AccessRow
              key={fact.id}
              label={fact.label}
              level={telling.access[fact.id]}
            />
          ))}
        </div>
        <p className="mt-3 rounded-[13px] border border-white/[0.07] bg-black/[0.12] p-3 text-[14px] leading-5 text-stone-400">
          <strong className="text-orange-100">Effect:</strong>{" "}
          {tellingId === "mara"
            ? "Mara's intention becomes certain, but Theo's reaction and the envelope remain sources of tension."
            : tellingId === "limited"
              ? "Theo's suspicion becomes certain while Mara's plan must be reconstructed from behavior."
              : "Both characters must be read from visible action, making the scene cooler and more ambiguous."}
        </p>
      </section>

      <section className="mt-4 rounded-[20px] border border-yellow-200/[0.12] bg-yellow-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="5" label="Transfer" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Who can the reader enter here?
        </h2>
        <blockquote className="mt-3 rounded-[15px] border border-yellow-100/[0.12] bg-black/[0.14] p-4 font-serif text-[16px] leading-7 text-stone-200">
          Theo watched Mara turn the atlas sideways. He wondered whether the
          corner of a white envelope had just disappeared beneath it. Mara
          smiled and asked why he was staring.
        </blockquote>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {(["mara", "theo", "neither"] as TransferAnswer[]).map((answer) => (
            <button
              key={answer}
              type="button"
              onClick={() => setTransferAnswer(answer)}
              aria-pressed={transferAnswer === answer}
              className={`min-h-11 rounded-[13px] border px-3 py-2 text-[14px] font-semibold capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60 ${
                transferAnswer === answer
                  ? "border-yellow-200/25 bg-yellow-300/[0.09] text-yellow-50"
                  : "border-white/[0.07] bg-black/[0.11] text-stone-400"
              }`}
            >
              {answer === "neither" ? "Neither character" : answer}
            </button>
          ))}
        </div>
        {transferAnswer ? (
          <p
            className={`mt-3 rounded-[13px] border p-3 text-[14px] leading-5 ${
              transferAnswer === "theo"
                ? "border-yellow-200/[0.18] bg-yellow-300/[0.045] text-yellow-100"
                : "border-orange-200/[0.15] bg-orange-300/[0.04] text-orange-100"
            }`}
            aria-live="polite"
          >
            {transferAnswer === "theo"
              ? "Yes. The narrator directly reports Theo's wondering. Mara's intention remains outside his—and our—direct access."
              : "Look for the thought the narrator reports directly. Visible action alone does not provide inner access."}
          </p>
        ) : null}
      </section>

      <section id="perspective-practice" className="mt-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[20px] border border-yellow-200/[0.12] bg-black/[0.20] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div>
              <StageLabel number="6" label="Practice" />
              <h2 className="mt-1 font-serif text-[21px] font-semibold text-white">
                Check voice, access, and limits
              </h2>
            </div>
            <Sparkles
              size={17}
              className="mt-1 text-yellow-200"
              aria-hidden="true"
            />
          </div>
          <div className="perspective-assessment border-t border-white/[0.06] p-3 sm:p-4">
            <Assessment
              title="Narrator & Perspective check"
              questions={QUIZ}
              accentColor="amber"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-yellow-200/[0.14] bg-yellow-300/[0.04] p-4 backdrop-blur-xl sm:p-5">
        <StageLabel number="7" label="Conclude" />
        <h2 className="mt-1.5 font-serif text-[clamp(1.45rem,3vw,2.05rem)] font-semibold tracking-[-0.03em] text-white">
          Perspective is an information design choice.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            "Identify the voice",
            "Find inner access",
            "Mark what is withheld",
            "Explain the effect",
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
        .perspective-assessment > div { border-radius: 16px !important; padding: 14px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .perspective-assessment > div > div { min-height: 250px !important; }
        .perspective-assessment h3 { margin-bottom: 14px !important; font-size: 1.02rem !important; line-height: 1.45 !important; }
      `}</style>
    </ClassroomLessonShell>
  );
}

function MiniTelling({
  tellingId,
  label,
}: {
  tellingId: TellingId;
  label: string;
}) {
  const telling = getTelling(tellingId);
  return (
    <article className="rounded-[16px] border border-yellow-100/[0.11] bg-black/[0.14] p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-yellow-200/65">
        {label}
      </div>
      <p className="mt-2 font-serif text-[15px] leading-6 text-stone-200">
        {telling.text[0]} {telling.text[2]}
      </p>
    </article>
  );
}

function ConceptCard({
  label,
  question,
  answer,
}: {
  label: string;
  question: string;
  answer: string;
}) {
  return (
    <article className="rounded-[15px] border border-white/[0.08] bg-black/[0.14] p-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/70">
        {label}
      </div>
      <p className="mt-2 font-serif text-[16px] font-semibold text-stone-200">
        {question}
      </p>
      <p className="mt-1 text-[13px] leading-5 text-stone-500">{answer}</p>
    </article>
  );
}

function AccessRow({ label, level }: { label: string; level: AccessLevel }) {
  const colors: Record<AccessLevel, string> = {
    direct: "border-yellow-200/22 bg-yellow-300/[0.075] text-yellow-100",
    inferred: "border-orange-200/18 bg-orange-300/[0.045] text-orange-100",
    withheld: "border-white/[0.08] bg-black/[0.13] text-stone-400",
  };
  return (
    <div className="grid gap-2 rounded-[14px] border border-white/[0.07] bg-black/[0.10] p-3 sm:grid-cols-[minmax(0,1fr)_190px] sm:items-center">
      <span className="text-[14px] font-semibold text-stone-200">{label}</span>
      <span
        className={`rounded-[10px] border px-3 py-1.5 text-[12px] font-semibold ${colors[level]}`}
      >
        {ACCESS_LABELS[level]}
      </span>
    </div>
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

function PerspectiveField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-yellow-300/[0.07] blur-[90px]" />
      <div className="absolute -right-24 top-[38%] h-80 w-80 rounded-full bg-orange-400/[0.055] blur-[110px]" />
      <div className="absolute right-[8%] top-[15%] h-48 w-48 rounded-full border border-yellow-100/[0.045]" />
      <Eye className="absolute right-[9%] top-[17%] h-40 w-40 text-yellow-200/[0.025]" />
      <BookOpenText className="absolute -left-12 bottom-[7%] h-72 w-72 rotate-[-8deg] text-orange-200/[0.025]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(0deg,transparent,transparent_31px,rgba(250,204,21,0.10)_32px)]" />
    </div>
  );
}
