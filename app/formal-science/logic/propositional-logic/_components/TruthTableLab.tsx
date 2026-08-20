"use client";

import { useMemo, useState } from "react";
import { Check, Table2, X } from "lucide-react";
import { M } from "@/app/_components/Math";

type OperatorId = "and" | "or" | "implies" | "iff" | "xor";

type Operator = {
  id: OperatorId;
  label: string;
  symbol: string;
  expression: string;
  evaluate: (p: boolean, q: boolean) => boolean;
  rule: string;
};

const OPERATORS: readonly Operator[] = [
  {
    id: "and",
    label: "AND",
    symbol: "∧",
    expression: "P \\land Q",
    evaluate: (p, q) => p && q,
    rule: "True only when both component propositions are true.",
  },
  {
    id: "or",
    label: "OR",
    symbol: "∨",
    expression: "P \\lor Q",
    evaluate: (p, q) => p || q,
    rule: "Inclusive OR is true when at least one component proposition is true.",
  },
  {
    id: "implies",
    label: "IMPLIES",
    symbol: "→",
    expression: "P \\to Q",
    evaluate: (p, q) => !p || q,
    rule: "Material implication is false only in the row where P is true and Q is false.",
  },
  {
    id: "iff",
    label: "IFF",
    symbol: "↔",
    expression: "P \\leftrightarrow Q",
    evaluate: (p, q) => p === q,
    rule: "The biconditional is true when P and Q have the same truth value.",
  },
  {
    id: "xor",
    label: "XOR",
    symbol: "⊕",
    expression: "P \\oplus Q",
    evaluate: (p, q) => p !== q,
    rule: "Exclusive OR is true when exactly one component proposition is true.",
  },
];

const ROWS = [
  { p: true, q: true },
  { p: true, q: false },
  { p: false, q: true },
  { p: false, q: false },
] as const;

function TruthValue({ value, emphasized = false }: { value: boolean; emphasized?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold ${
        value
          ? emphasized
            ? "text-violet-200"
            : "text-violet-300/65"
          : emphasized
            ? "text-slate-300"
            : "text-slate-600"
      }`}
    >
      {value ? <Check size={13} strokeWidth={2.5} /> : <X size={13} strokeWidth={2.5} />}
      {value ? "T" : "F"}
    </span>
  );
}

export default function TruthTableLab() {
  const [operatorId, setOperatorId] = useState<OperatorId>("implies");
  const [activeRow, setActiveRow] = useState(1);
  const operator = useMemo(() => OPERATORS.find((item) => item.id === operatorId) ?? OPERATORS[0], [operatorId]);
  const selected = ROWS[activeRow];
  const selectedResult = operator.evaluate(selected.p, selected.q);

  return (
    <section className="overflow-hidden rounded-[28px] border border-violet-200/[0.16] bg-[#0b0710]/84 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="border-b border-white/[0.06] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300/70">
              <Table2 size={14} /> Truth-table evaluator
            </div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.6rem)] font-semibold tracking-[-0.045em] text-white">
              Hold the four input states fixed. Change the connective.
            </h2>
            <p className="mt-2 max-w-3xl text-[12px] leading-5 text-slate-400">
              With two propositional variables there are four possible truth-value assignments. A connective is defined by what output it assigns to each of those rows.
            </p>
          </div>
          <div className="shrink-0 rounded-xl border border-violet-300/15 bg-violet-300/[0.04] px-4 py-3 text-center">
            <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-violet-300/50">active expression</div>
            <div className="mt-1 text-lg text-violet-100"><M>{operator.expression}</M></div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {OPERATORS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOperatorId(item.id)}
              className={`rounded-xl border px-3 py-2 text-[10px] font-semibold transition-colors ${
                operator.id === item.id
                  ? "border-violet-300/32 bg-violet-300/[0.08] text-violet-100"
                  : "border-white/[0.055] bg-black/16 text-slate-500 hover:border-violet-200/16 hover:text-slate-300"
              }`}
            >
              <span className="mr-2 font-serif text-[14px]">{item.symbol}</span>{item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="overflow-hidden rounded-[20px] border border-white/[0.065] bg-black/24">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="border-b border-white/[0.06] bg-black/25 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600">
                <th className="px-3 py-3 font-medium">P</th>
                <th className="px-3 py-3 font-medium">Q</th>
                <th className="px-3 py-3 font-medium">{operator.label}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, index) => {
                const result = operator.evaluate(row.p, row.q);
                const active = activeRow === index;
                return (
                  <tr
                    key={`${row.p}-${row.q}`}
                    onClick={() => setActiveRow(index)}
                    className={`cursor-pointer border-b border-white/[0.045] transition-colors last:border-b-0 ${
                      active ? "bg-violet-300/[0.075]" : "hover:bg-white/[0.018]"
                    }`}
                  >
                    <td className="px-3 py-4"><TruthValue value={row.p} emphasized={active} /></td>
                    <td className="px-3 py-4"><TruthValue value={row.q} emphasized={active} /></td>
                    <td className="px-3 py-4"><TruthValue value={result} emphasized={active} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-violet-300/12 bg-violet-300/[0.025] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.11em] text-violet-300/52">definition</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">{operator.rule}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.014] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.11em] text-slate-600">selected row</div>
            <div className="mt-3 flex items-center gap-3 text-[12px] text-slate-300">
              <span>P = {selected.p ? "T" : "F"}</span>
              <span className="text-slate-700">·</span>
              <span>Q = {selected.q ? "T" : "F"}</span>
              <span className="text-slate-700">→</span>
              <TruthValue value={selectedResult} emphasized />
            </div>
            <p className="mt-3 text-[10px] leading-5 text-slate-500">
              {operator.id === "implies" && selected.p && !selected.q
                ? "This is the one false row for material implication: the antecedent is true while the consequent is false."
                : operator.id === "implies"
                  ? "Material implication is true in this row. This truth-functional definition should not be confused with proof, causation, or everyday promises."
                  : `Apply the ${operator.label} rule directly to this pair of truth values.`}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.05] px-3 py-2.5 text-[10px] leading-5 text-slate-600">
            Truth tables evaluate formulas under assignments. They do not determine whether an atomic proposition is factually true in the world.
          </div>
        </div>
      </div>
    </section>
  );
}
