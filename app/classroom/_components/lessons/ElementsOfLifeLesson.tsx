"use client";

import { useState } from "react";
import { Atom, Dna, Filter, Sparkles } from "lucide-react";
import Assessment, {
  type AssessmentQuestion,
} from "@/app/_components/Assessment";
import ClassroomLessonShell, {
  type ClassroomLessonNavItem,
} from "@/app/classroom/_components/lessons/ClassroomLessonShell";
import {
  ELEMENTS,
  ELEMENT_ORDER,
  MOLECULES,
  formulaParts,
  getElement,
  getMolecule,
  matchingMolecules,
  moleculeContains,
  type ElementId,
  type MoleculeId,
} from "@/app/classroom/_components/lessons/elements-of-life-model";

type ElementsLessonProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ClassroomLessonNavItem;
  next?: ClassroomLessonNavItem;
  unitHref: string;
};

type PatternAnswer = "cho" | "nps" | "all";
type TransferId = "nucleotide" | "fatty-acid" | "amino-acid";

const STAGES = [
  "Notice",
  "Decode",
  "Scan",
  "Build",
  "Apply",
  "Practice",
  "Conclude",
] as const;

const TRANSFER_CASES: readonly {
  id: TransferId;
  label: string;
  observation: string;
  answer: MoleculeId;
  reasoning: string;
}[] = [
  {
    id: "nucleotide",
    label: "Sample A",
    observation:
      "The molecule contains a phosphate group, a sugar, and a nitrogenous base.",
    answer: "amp",
    reasoning:
      "The phosphate contributes P, the base contributes N, and the arrangement identifies a nucleotide building block.",
  },
  {
    id: "fatty-acid",
    label: "Sample B",
    observation:
      "The molecule has a long carbon–hydrogen chain and only a small oxygen-containing end group.",
    answer: "palmitic-acid",
    reasoning:
      "The hydrocarbon-rich structure—not merely the presence of C, H, and O—supports a fatty-acid identification.",
  },
  {
    id: "amino-acid",
    label: "Sample C",
    observation:
      "The molecule contains amino and carboxyl groups plus a sulfur-bearing side chain.",
    answer: "cysteine",
    reasoning:
      "Nitrogen supports the amino group, sulfur distinguishes the side chain, and the full arrangement identifies cysteine.",
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "elements-phosphate",
    type: "mcq",
    prompt: "Which element must be present in a phosphate group?",
    options: ["Phosphorus", "Sulfur", "Carbon"],
    correctAnswer: "Phosphorus",
    explanation:
      "The P in a molecular formula signals phosphorus and can be part of a phosphate group.",
  },
  {
    id: "elements-cho-boundary",
    type: "mcq",
    prompt:
      "Why is a C–H–O inventory alone insufficient to identify an unknown as a carbohydrate?",
    options: [
      "Some lipid components also contain only C, H, and O",
      "Carbohydrates never contain oxygen",
      "Carbon appears only in proteins",
    ],
    correctAnswer: "Some lipid components also contain only C, H, and O",
    explanation:
      "Glucose and palmitic acid share the same three element types, but their proportions and arrangements differ.",
  },
  {
    id: "elements-protein-sulfur",
    type: "mcq",
    prompt: "Which statement about sulfur in proteins is most accurate?",
    options: [
      "Some amino acids contain sulfur, so some proteins do too",
      "Every amino acid contains sulfur",
      "Sulfur alone proves that a molecule is a protein",
    ],
    correctAnswer: "Some amino acids contain sulfur, so some proteins do too",
    explanation:
      "Sulfur occurs in particular amino-acid side chains. Composition is evidence, but arrangement and context still matter.",
  },
];

export default function ElementsOfLifeLesson({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: ElementsLessonProps) {
  const [patternAnswer, setPatternAnswer] = useState<PatternAnswer | null>(
    null
  );
  const [selectedElement, setSelectedElement] = useState<ElementId>("C");
  const [selectedMolecule, setSelectedMolecule] =
    useState<MoleculeId>("glucose");
  const [fingerprint, setFingerprint] = useState<ElementId[]>(["N"]);
  const [transferId, setTransferId] = useState<TransferId>("nucleotide");
  const [transferAnswer, setTransferAnswer] = useState<MoleculeId | null>(null);
  const molecule = getMolecule(selectedMolecule);
  const element = getElement(selectedElement);
  const matches = matchingMolecules(fingerprint);
  const transfer =
    TRANSFER_CASES.find((item) => item.id === transferId) ?? TRANSFER_CASES[0];

  function toggleFingerprint(id: ElementId) {
    setFingerprint((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function chooseTransfer(id: TransferId) {
    setTransferId(id);
    setTransferAnswer(null);
  }

  return (
    <ClassroomLessonShell
      subjectTone="science"
      breadcrumbs={breadcrumbs}
      eyebrow="AP Biology · Unit 1 · Topic 1.2"
      icon={Atom}
      title="Elements of Life"
      subtitle="Read molecular formulas as evidence, then connect a small elemental alphabet to the structures of biological molecules."
      stages={STAGES}
      practiceTargetId="elements-practice"
      unitHref={unitHref}
      previous={previous}
      next={next}
      lessonPosition="02 / 07"
      background={<ElementsField />}
    >
      <section className="mt-4 rounded-[20px] border border-green-200/[0.13] bg-[#03150e]/70 p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="1" label="Notice" />
        <h2 className="mt-1.5 text-[clamp(1.45rem,3vw,2.15rem)] font-semibold tracking-[-0.035em] text-white">
          Four molecules, one repeating alphabet.
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-300/80">
          Ignore the molecule names for a moment. Compare the formulas and look
          for the element symbols that appear in every sample.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {MOLECULES.map((item, index) => (
            <div
              key={item.id}
              className="rounded-[15px] border border-white/[0.07] bg-black/[0.14] p-3"
            >
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-green-200/65">
                Sample {String.fromCharCode(65 + index)}
              </div>
              <Formula moleculeId={item.id} compact />
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {(
            [
              ["cho", "C, H, and O"],
              ["nps", "N, P, and S"],
              ["all", "All six appear every time"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setPatternAnswer(value)}
              aria-pressed={patternAnswer === value}
              className={`rounded-[13px] border px-3 py-2.5 text-left text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60 ${
                patternAnswer === value
                  ? "border-green-200/25 bg-green-300/[0.09] text-green-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {patternAnswer ? (
          <p
            className={`mt-3 rounded-[14px] border px-3 py-2.5 text-[14px] leading-5 ${
              patternAnswer === "cho"
                ? "border-green-200/[0.18] bg-green-300/[0.045] text-green-100"
                : "border-amber-200/[0.15] bg-amber-300/[0.04] text-amber-100"
            }`}
            aria-live="polite"
          >
            {patternAnswer === "cho"
              ? "Yes. Carbon, hydrogen, and oxygen repeat across all four examples; nitrogen, phosphorus, and sulfur distinguish particular structures."
              : "Scan each formula again. N, P, and S are important clues, but they do not appear in every sample."}
          </p>
        ) : null}
      </section>

      <section className="mt-4 rounded-[20px] border border-cyan-200/[0.12] bg-cyan-300/[0.035] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="2" label="Decode" tone="cyan" />
        <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
          Decode CHNOPS without turning it into a checklist.
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-400">
          These six elements are common in biological molecules. Select one to
          see what structural clue it can contribute.
        </p>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {ELEMENTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedElement(item.id)}
                aria-pressed={selectedElement === item.id}
                className={`min-h-[92px] rounded-[15px] border p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
                  selectedElement === item.id
                    ? item.surface
                    : "border-white/[0.07] bg-black/[0.13] text-stone-400"
                }`}
              >
                <span className="block font-mono text-[28px] font-semibold">
                  {item.id}
                </span>
                <span className="mt-1 block text-[11px] font-semibold">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
          <div
            className="rounded-[16px] border p-4"
            style={{
              borderColor: `${element.color}44`,
              backgroundColor: `${element.color}10`,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full border font-mono text-[22px] font-semibold"
                style={{ borderColor: element.color, color: element.color }}
              >
                {element.id}
              </span>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-500">
                  Structural clue
                </div>
                <div className="mt-1 text-[17px] font-semibold text-white">
                  {element.name}
                </div>
              </div>
            </div>
            <p className="mt-3 text-[14px] leading-5 text-stone-300">
              {element.clue}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-green-200/[0.12] bg-black/[0.20] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="3" label="Scan" />
        <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
          Scan one molecule atom by atom.
        </h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-400">
          A formula reports the number of each element. The inventory matters,
          but the arrangement explains what the molecule can do.
        </p>

        <div className="mt-3 flex flex-wrap gap-2" role="tablist">
          {MOLECULES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selectedMolecule === item.id}
              onClick={() => setSelectedMolecule(item.id)}
              className={`rounded-xl border px-3 py-2 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60 ${
                selectedMolecule === item.id
                  ? "border-green-200/25 bg-green-300/[0.09] text-green-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
          <MoleculeInventory moleculeId={selectedMolecule} />
          <div className="rounded-[16px] border border-white/[0.07] bg-black/[0.13] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-green-200/70">
              {molecule.family}
            </div>
            <h3 className="mt-1.5 text-[20px] font-semibold text-white">
              {molecule.name}
            </h3>
            <p className="mt-2 text-[14px] leading-5 text-stone-300">
              {molecule.structureClue}
            </p>
            <p className="mt-3 border-l-2 border-amber-300/35 pl-3 text-[13px] leading-5 text-stone-400">
              {molecule.boundary}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-teal-200/[0.12] bg-teal-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="4" label="Build" tone="teal" />
        <div className="flex items-start gap-3">
          <Filter size={19} className="mt-1 text-teal-200" aria-hidden="true" />
          <div>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
              Build an elemental fingerprint.
            </h2>
            <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone-400">
              Require one or more elements and watch the candidate set narrow.
              This is a screening tool, not a complete identification test.
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {ELEMENTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleFingerprint(item.id)}
              aria-pressed={fingerprint.includes(item.id)}
              className={`rounded-[13px] border px-3 py-2.5 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60 ${
                fingerprint.includes(item.id)
                  ? item.surface
                  : "border-white/[0.07] bg-black/[0.12] text-stone-500"
              }`}
            >
              <span className="font-mono text-[17px]">{item.id}</span>
              <span className="ml-2">required</span>
            </button>
          ))}
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {MOLECULES.map((item) => {
            const match = matches.some((candidate) => candidate.id === item.id);
            return (
              <div
                key={item.id}
                className={`rounded-[14px] border p-3 transition-colors ${
                  match
                    ? "border-teal-200/20 bg-teal-300/[0.055]"
                    : "border-white/[0.055] bg-black/[0.10] opacity-40"
                }`}
              >
                <div className="text-[14px] font-semibold text-stone-200">
                  {item.name}
                </div>
                <div className="mt-1 font-mono text-[12px] text-stone-500">
                  {item.formula}
                </div>
                <div className="mt-2 text-[12px] font-semibold text-teal-100/75">
                  {match ? "Matches the fingerprint" : "Missing a requirement"}
                </div>
              </div>
            );
          })}
        </div>
        <p
          className="mt-3 text-[14px] leading-5 text-stone-400"
          aria-live="polite"
        >
          {fingerprint.length === 0
            ? "With no required elements, every sample remains possible."
            : matches.length === 0
              ? "No teaching sample contains that complete combination. The result narrows this collection; it does not prove the combination is impossible in biology."
              : `${matches.length} of 4 teaching samples match. Element evidence narrows possibilities; proportions and arrangement finish the explanation.`}
        </p>
      </section>

      <section className="mt-4 rounded-[20px] border border-green-200/[0.12] bg-green-300/[0.03] p-4 backdrop-blur-2xl sm:p-5">
        <StageLabel number="5" label="Apply" />
        <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
          Use composition and arrangement together.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {TRANSFER_CASES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => chooseTransfer(item.id)}
              aria-pressed={transferId === item.id}
              className={`rounded-[13px] border px-3 py-2.5 text-left text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60 ${
                transferId === item.id
                  ? "border-green-200/25 bg-green-300/[0.08] text-green-50"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-[16px] border border-white/[0.08] bg-black/[0.15] p-4">
          <p className="text-[15px] leading-6 text-stone-300">
            {transfer.observation}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {MOLECULES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTransferAnswer(item.id)}
                aria-pressed={transferAnswer === item.id}
                className={`rounded-xl border px-3 py-2.5 text-left text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/60 ${
                  transferAnswer === item.id
                    ? "border-green-200/25 bg-green-300/[0.08] text-green-50"
                    : "border-white/[0.07] text-stone-400"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          {transferAnswer ? (
            <p
              className={`mt-3 text-[14px] font-semibold leading-5 ${
                transferAnswer === transfer.answer
                  ? "text-green-100"
                  : "text-amber-100"
              }`}
              aria-live="polite"
            >
              {transferAnswer === transfer.answer
                ? transfer.reasoning
                : "Use both clues: which elements are present, and how are their groups arranged?"}
            </p>
          ) : null}
        </div>
      </section>

      <section id="elements-practice" className="mt-4 scroll-mt-24">
        <div className="overflow-hidden rounded-[20px] border border-green-200/[0.12] bg-black/[0.20] backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div>
              <StageLabel number="6" label="Practice" />
              <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.025em] text-white">
                Check the composition reasoning
              </h2>
            </div>
            <Sparkles
              size={17}
              className="mt-1 text-green-200"
              aria-hidden="true"
            />
          </div>
          <div className="elements-assessment border-t border-white/[0.06] p-3 sm:p-4">
            <Assessment
              title="Elements of Life check"
              questions={QUIZ}
              accentColor="emerald"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-green-200/[0.14] bg-green-300/[0.04] p-4 backdrop-blur-xl sm:p-5">
        <StageLabel number="7" label="Conclude" />
        <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
          Element inventory starts the explanation. Structure completes it.
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            "Read the symbols",
            "Count the atoms",
            "Locate functional groups",
            "Connect structure to function",
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
        .elements-assessment > div { border-radius: 16px !important; padding: 14px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .elements-assessment > div > div { min-height: 250px !important; }
        .elements-assessment h3 { margin-bottom: 14px !important; font-size: 1.02rem !important; line-height: 1.45 !important; }
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

function Formula({
  moleculeId,
  compact = false,
}: {
  moleculeId: MoleculeId;
  compact?: boolean;
}) {
  const molecule = getMolecule(moleculeId);
  return (
    <div
      className={`mt-2 flex flex-wrap items-end font-mono font-semibold ${
        compact ? "text-[21px]" : "text-[clamp(1.65rem,4vw,3rem)]"
      }`}
      aria-label={`${molecule.name} formula ${molecule.formula}`}
    >
      {formulaParts(molecule).map(({ element, count }) => (
        <span key={element} className="inline-flex items-end">
          <span style={{ color: getElement(element).color }}>{element}</span>
          <sub className="mb-0.5 text-[0.48em] text-stone-400">{count}</sub>
        </span>
      ))}
    </div>
  );
}

function MoleculeInventory({ moleculeId }: { moleculeId: MoleculeId }) {
  const molecule = getMolecule(moleculeId);
  const maxCount = Math.max(...Object.values(molecule.counts));

  return (
    <div className="rounded-[17px] border border-green-200/[0.10] bg-[radial-gradient(circle_at_30%_30%,rgba(74,222,128,0.09),rgba(0,0,0,0.14)_64%)] p-4 sm:p-5">
      <Formula moleculeId={moleculeId} />
      <div className="mt-4 grid gap-2">
        {ELEMENT_ORDER.filter((id) => moleculeContains(molecule, id)).map(
          (id) => {
            const count = molecule.counts[id] ?? 0;
            const item = getElement(id);
            return (
              <div
                key={id}
                className="grid grid-cols-[28px_1fr_36px] items-center gap-2"
              >
                <span
                  className="font-mono text-[13px] font-semibold"
                  style={{ color: item.color }}
                >
                  {id}
                </span>
                <span className="h-2 overflow-hidden rounded-full bg-white/[0.055]">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${Math.max(8, (count / maxCount) * 100)}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </span>
                <span className="text-right font-mono text-[12px] text-stone-400">
                  {count}
                </span>
              </div>
            );
          }
        )}
      </div>
      <p className="mt-3 text-[12px] leading-5 text-stone-500">
        Bars are normalized within this molecule. Counts are exact; bar length
        is comparative.
      </p>
    </div>
  );
}

function ElementsField() {
  const nodes = [
    ["C", 19, 24, "#86efac"],
    ["H", 42, 16, "#e2e8f0"],
    ["O", 66, 29, "#fca5a5"],
    ["N", 78, 53, "#67e8f9"],
    ["P", 58, 72, "#fcd34d"],
    ["S", 29, 67, "#c4b5fd"],
  ] as const;
  const links = [
    [19, 24, 42, 16],
    [42, 16, 66, 29],
    [66, 29, 78, 53],
    [78, 53, 58, 72],
    [58, 72, 29, 67],
    [29, 67, 19, 24],
    [42, 16, 58, 72],
  ] as const;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_30%,rgba(34,211,238,0.13),transparent_30%),radial-gradient(circle_at_18%_68%,rgba(74,222,128,0.16),transparent_34%),linear-gradient(180deg,#03170f,#010905)]" />
      <svg
        viewBox="0 0 100 100"
        className="absolute right-[-8%] top-[8%] h-[74vw] max-h-[900px] w-[74vw] max-w-[900px] opacity-25"
      >
        {links.map(([x1, y1, x2, y2], index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(187,247,208,0.24)"
            strokeWidth="0.35"
          />
        ))}
        {nodes.map(([symbol, x, y, color]) => (
          <g key={symbol}>
            <circle
              cx={x}
              cy={y}
              r="5.8"
              fill={`${color}12`}
              stroke={`${color}88`}
              strokeWidth="0.45"
            />
            <text
              x={x}
              y={y + 1.8}
              textAnchor="middle"
              fill={color}
              fontSize="5.2"
              fontFamily="monospace"
              fontWeight="700"
            >
              {symbol}
            </text>
          </g>
        ))}
      </svg>
      <Dna
        className="absolute -left-10 bottom-[8%] h-72 w-72 rotate-[-18deg] text-green-200/[0.035]"
        strokeWidth={0.55}
      />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(134,239,172,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(134,239,172,0.6)_1px,transparent_1px)] [background-size:64px_64px]" />
    </div>
  );
}
