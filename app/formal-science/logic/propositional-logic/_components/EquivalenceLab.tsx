"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, CheckCircle2 } from "lucide-react";
import { M } from "@/app/_components/Math";

type Identity = {
  id: string;
  label: string;
  left: string;
  right: string;
  evaluateLeft: (p: boolean, q: boolean) => boolean;
  evaluateRight: (p: boolean, q: boolean) => boolean;
  note: string;
};

const IDENTITIES: readonly Identity[] = [
  {
    id: "demorgan-and",
    label: "De Morgan: negated AND",
    left: "\\neg(P \\land Q)",
    right: "\\neg P \\lor \\neg Q",
    evaluateLeft: (p, q) => !(p && q),
    evaluateRight: (p, q) => !p || !q,
    note: "Negating a conjunction is equivalent to disjoining the negated components.",
  },
  {
    id: "demorgan-or",
    label: "De Morgan: negated OR",
    left: "\\neg(P \\lor Q)",
    right: "\\neg P \\land \\neg Q",
    evaluateLeft: (p, q) => !(p || q),
    evaluateRight: (p, q) => !p && !q,
    note: "Negating a disjunction is equivalent to conjoining the negated components.",
  },
  {
    id: "implication",
    label: "Material implication",
    left: "P \\to Q",
    right: "\\neg P \\lor Q",
    evaluateLeft: (p, q) => !p || q,
    evaluateRight: (p, q) => !p || q,
    note: "The material conditional has the same truth table as not-P OR Q.",
  },
  {
    id: "contrapositive",
    label: "Contrapositive",
    left: "P \\to Q",
    right: "\\neg Q \\to \\neg P",
    evaluateLeft: (p, q) => !p || q,
    evaluateRight: (p, q) => q || !p,
    note: "A material conditional and its contrapositive agree on every truth-value assignment.",
  },
];

const ROWS = [
  { p: true, q: true },
  { p: true, q: false },
  { p: false, q: true },
  { p: false, q: false },
] as const;

export default function EquivalenceLab() {
  const [identityId, setIdentityId] = useState("demorgan-and");
  const identity = useMemo(() => IDENTITIES.find((item) => item.id === identityId) ?? IDENTITIES[0], [identityId]);
  const rows = ROWS.map((row) => ({
    ...row,
    left: identity.evaluateLeft(row.p, row.q),
    right: identity.evaluateRight(row.p, row.q),
  }));
  const equivalent = rows.every((row) => row.left === row.right);

  return (
    <section className="overflow-hidden rounded-[26px] border border-cyan-200/[0.12] bg-[#071014]/78 backdrop-blur-xl">
      <div className="border-b border-white/[0.055] p-5">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-300/65">
          <ArrowRightLeft size={13} /> Equivalence checker
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Same truth column, different syntax.</h2>
        <p className="mt-2 max-w-3xl text-[11px] leading-5 text-slate-500">
          Two propositional formulas are logically equivalent when they have the same truth value under every assignment to their variables. Matching words or symbols are not required; matching evaluations are.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {IDENTITIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIdentityId(item.id)}
              className={`rounded-xl border px-3 py-2 text-[10px] font-semibold transition-colors ${
                identity.id === item.id
                  ? "border-cyan-300/28 bg-cyan-300/[0.07] text-cyan-100"
                  : "border-white/[0.055] bg-black/15 text-slate-500 hover:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="rounded-2xl border border-cyan-300/12 bg-cyan-300/[0.025] p-4 text-center text-lg text-cyan-100">
              <M>{identity.left}</M>
            </div>
            <ArrowRightLeft size={17} className="mx-auto text-slate-700" />
            <div className="rounded-2xl border border-violet-300/12 bg-violet-300/[0.025] p-4 text-center text-lg text-violet-100">
              <M>{identity.right}</M>
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/22">
            <div className="grid grid-cols-4 border-b border-white/[0.055] bg-black/24 px-3 py-2.5 text-center font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">
              <span>P</span><span>Q</span><span>left</span><span>right</span>
            </div>
            {rows.map((row) => (
              <div key={`${row.p}-${row.q}`} className="grid grid-cols-4 border-b border-white/[0.04] px-3 py-3 text-center font-mono text-[11px] last:border-b-0">
                <span className={row.p ? "text-cyan-200/65" : "text-slate-600"}>{row.p ? "T" : "F"}</span>
                <span className={row.q ? "text-cyan-200/65" : "text-slate-600"}>{row.q ? "T" : "F"}</span>
                <span className={row.left ? "text-violet-200/70" : "text-slate-600"}>{row.left ? "T" : "F"}</span>
                <span className={row.right ? "text-violet-200/70" : "text-slate-600"}>{row.right ? "T" : "F"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className={`rounded-2xl border p-4 ${equivalent ? "border-emerald-300/14 bg-emerald-300/[0.03]" : "border-rose-300/14 bg-rose-300/[0.03]"}`}>
            <div className="flex items-center gap-2 text-[10px] font-semibold text-stone-200">
              <CheckCircle2 size={14} className={equivalent ? "text-emerald-300/70" : "text-rose-300/70"} />
              {equivalent ? "Equivalent across all four rows" : "Not equivalent"}
            </div>
            <p className="mt-2 text-[10px] leading-5 text-slate-500">{identity.note}</p>
          </div>

          <div className="rounded-xl border border-white/[0.055] bg-white/[0.014] p-3 text-[10px] leading-5 text-slate-600">
            Logical equivalence is stronger than two formulas happening to agree in one selected situation. They must agree under every assignment represented by the table.
          </div>

          <div className="rounded-xl border border-amber-200/[0.08] bg-amber-100/[0.018] p-3 text-[10px] leading-5 text-slate-600">
            These identities concern truth-functional propositional logic. Natural-language “and,” “or,” “if,” and “not” can carry pragmatic meanings that a truth table intentionally abstracts away.
          </div>
        </div>
      </div>
    </section>
  );
}
