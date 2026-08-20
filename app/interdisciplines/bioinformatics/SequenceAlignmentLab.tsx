"use client";

import { useMemo, useState } from "react";
import { AlignCenter, ArrowRight, Dna, Minus, Search } from "lucide-react";

type ExampleId = "conserved" | "substitutions" | "insertion" | "deletion";

type Example = {
  id: ExampleId;
  label: string;
  question: string;
  reference: string;
  sample: string;
  note: string;
};

const EXAMPLES: readonly Example[] = [
  {
    id: "conserved",
    label: "Mostly conserved",
    question: "What does strong similarity look like?",
    reference: "ATGCTACGTTAC",
    sample:    "ATGCTACGTTAC",
    note: "Every aligned column agrees in this toy example. Real biological similarity is interpreted in context, not by a universal percent-identity threshold.",
  },
  {
    id: "substitutions",
    label: "Substitutions",
    question: "Where do the sequences disagree without changing length?",
    reference: "ATGCTACGTTAC",
    sample:    "ATGTTACATTAC",
    note: "A substitution places different symbols in corresponding aligned positions. Whether a nucleotide change matters biologically depends on where it occurs and what function that region has.",
  },
  {
    id: "insertion",
    label: "Insertion",
    question: "How can one extra base be represented without shifting every later comparison?",
    reference: "ATGCTACG-TTAC",
    sample:    "ATGCTACGATTAC",
    note: "The gap is an alignment device that preserves a proposed correspondence after an insertion in the sample lineage. It is not a literal DNA character.",
  },
  {
    id: "deletion",
    label: "Deletion",
    question: "How does an absent base differ from a substitution?",
    reference: "ATGCTACGTTAC",
    sample:    "ATGC-ACGTTAC",
    note: "Here the gap sits in the sample. Calling it a deletion assumes a reference and an evolutionary or experimental interpretation; the alignment itself only proposes correspondence.",
  },
] as const;

const BASE_RGB: Record<string, string> = {
  A: "52, 211, 153",
  T: "244, 114, 182",
  G: "34, 211, 238",
  C: "167, 139, 250",
  "-": "148, 163, 184",
};

export default function SequenceAlignmentLab() {
  const [exampleId, setExampleId] = useState<ExampleId>("substitutions");
  const [selectedColumn, setSelectedColumn] = useState(0);
  const example = EXAMPLES.find((item) => item.id === exampleId) ?? EXAMPLES[0];

  const columns = useMemo(() => {
    const length = Math.max(example.reference.length, example.sample.length);
    return Array.from({ length }, (_, index) => {
      const reference = example.reference[index] ?? "-";
      const sample = example.sample[index] ?? "-";
      const kind = reference === sample ? "match" : reference === "-" || sample === "-" ? "gap" : "substitution";
      return { index, reference, sample, kind } as const;
    });
  }, [example]);

  const matches = columns.filter((column) => column.kind === "match").length;
  const substitutions = columns.filter((column) => column.kind === "substitution").length;
  const gaps = columns.filter((column) => column.kind === "gap").length;
  const ungappedColumns = columns.filter((column) => column.kind !== "gap").length;
  const identity = ungappedColumns ? Math.round((matches / ungappedColumns) * 100) : 0;
  const selected = columns[Math.min(selectedColumn, columns.length - 1)];

  const selectExample = (id: ExampleId) => {
    setExampleId(id);
    setSelectedColumn(0);
  };

  return (
    <section className="overflow-hidden rounded-[28px] border border-emerald-100/[0.13] bg-[#06110d]/66 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl">
      <div className="border-b border-white/[0.08] px-5 py-5 sm:px-7">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-200/70">
          <AlignCenter size={14} /> Sequence alignment workstation
        </div>
        <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">An alignment proposes which symbols correspond.</h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-300">
          Switch examples, then click an aligned column. The goal is not to memorize a score. It is to distinguish a match, a substitution, and a gap before asking what the difference might mean biologically.
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {EXAMPLES.map((item) => {
            const selectedExample = item.id === exampleId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectExample(item.id)}
                className="rounded-[15px] border px-4 py-3 text-left transition"
                style={{
                  borderColor: selectedExample ? "rgba(52,211,153,0.38)" : "rgba(255,255,255,0.07)",
                  background: selectedExample ? "rgba(52,211,153,0.07)" : "rgba(0,0,0,0.12)",
                }}
                aria-pressed={selectedExample}
              >
                <strong className={`block text-[14px] font-semibold ${selectedExample ? "text-emerald-50" : "text-slate-300"}`}>{item.label}</strong>
                <span className="mt-1 block text-[11px] leading-5 text-slate-500">{item.question}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="overflow-x-auto rounded-[22px] border border-white/[0.09] bg-black/[0.20] p-4 sm:p-5">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[92px_repeat(13,minmax(42px,1fr))] items-center gap-1 font-mono">
              <div className="text-[10px] uppercase tracking-[0.06em] text-slate-500">reference</div>
              {columns.map((column) => (
                <BaseCell key={`r-${column.index}`} base={column.reference} selected={selectedColumn === column.index} onClick={() => setSelectedColumn(column.index)} />
              ))}
              <div className="text-[10px] uppercase tracking-[0.06em] text-slate-500">relation</div>
              {columns.map((column) => (
                <button
                  key={`m-${column.index}`}
                  type="button"
                  onClick={() => setSelectedColumn(column.index)}
                  className="flex h-8 items-center justify-center text-[15px] transition hover:bg-white/[0.03]"
                  aria-label={`Inspect alignment column ${column.index + 1}`}
                >
                  {column.kind === "match" ? (
                    <span className="text-emerald-200/65">|</span>
                  ) : column.kind === "gap" ? (
                    <Minus size={13} className="text-amber-200/70" />
                  ) : (
                    <span className="text-rose-200/70">×</span>
                  )}
                </button>
              ))}
              <div className="text-[10px] uppercase tracking-[0.06em] text-slate-500">sample</div>
              {columns.map((column) => (
                <BaseCell key={`s-${column.index}`} base={column.sample} selected={selectedColumn === column.index} onClick={() => setSelectedColumn(column.index)} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="rounded-[20px] border border-cyan-100/[0.10] bg-cyan-100/[0.025] p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-cyan-200/65"><Search size={13} /> Column {selected.index + 1}</div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[18px] font-semibold text-white">
              <span className="font-mono">{selected.reference}</span>
              <ArrowRight size={15} className="text-slate-600" />
              <span className="font-mono">{selected.sample}</span>
              <span
                className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.05em]"
                style={{
                  color: selected.kind === "match" ? "rgb(167,243,208)" : selected.kind === "gap" ? "rgb(253,230,138)" : "rgb(254,202,202)",
                  borderColor: selected.kind === "match" ? "rgba(52,211,153,0.22)" : selected.kind === "gap" ? "rgba(251,191,36,0.22)" : "rgba(248,113,113,0.22)",
                }}
              >
                {selected.kind}
              </span>
            </div>
            <p className="mt-3 text-[14px] leading-6 text-slate-300">{example.note}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Readout label="matches" value={String(matches)} rgb="52,211,153" />
            <Readout label="substitutions" value={String(substitutions)} rgb="248,113,113" />
            <Readout label="gap columns" value={String(gaps)} rgb="251,191,36" />
            <Readout label="ungapped identity" value={`${identity}%`} rgb="34,211,238" />
          </div>
        </div>

        <div className="mt-5 flex gap-3 rounded-[18px] border border-amber-200/[0.11] bg-amber-200/[0.025] p-4">
          <Dna size={18} className="mt-0.5 shrink-0 text-amber-200/70" />
          <p className="text-[13px] leading-6 text-slate-300">
            <strong className="text-white">Important:</strong> an alignment is a model, not ground truth. Different scoring rules, reference choices, repetitive regions, and evolutionary assumptions can produce different plausible alignments.
          </p>
        </div>
      </div>
    </section>
  );
}

function BaseCell({ base, selected, onClick }: { base: string; selected: boolean; onClick: () => void }) {
  const rgb = BASE_RGB[base] ?? "148,163,184";
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 items-center justify-center rounded-[9px] border text-[15px] font-semibold transition"
      style={{
        color: `rgb(${rgb})`,
        borderColor: selected ? `rgba(${rgb},0.46)` : `rgba(${rgb},0.13)`,
        background: selected ? `rgba(${rgb},0.11)` : `rgba(${rgb},0.035)`,
        boxShadow: selected ? `0 0 18px rgba(${rgb},0.10)` : undefined,
      }}
      aria-pressed={selected}
    >
      {base}
    </button>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="rounded-[16px] border border-white/[0.07] bg-black/[0.16] p-4">
      <div className="font-mono text-[9px] uppercase tracking-[0.055em] text-slate-500">{label}</div>
      <div className="mt-2 font-mono text-[20px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div>
    </div>
  );
}
