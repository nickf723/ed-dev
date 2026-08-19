"use client";

import { useMemo, useState } from "react";
import { Divide, RefreshCw } from "lucide-react";

type Example = {
  id: string;
  label: string;
  form: "0/0" | "∞/∞";
  target: number | "infinity";
  originalLabel: string;
  derivativeLabel: string;
  original: (x: number) => number;
  derivativeRatio: (x: number) => number;
  result: string;
};

const EXAMPLES: readonly Example[] = [
  {
    id: "sinx",
    label: "sin x / x",
    form: "0/0",
    target: 0,
    originalLabel: "sin(x) / x",
    derivativeLabel: "cos(x) / 1",
    original: (x) => Math.sin(x) / x,
    derivativeRatio: (x) => Math.cos(x),
    result: "1",
  },
  {
    id: "exponential",
    label: "(eˣ − 1) / x",
    form: "0/0",
    target: 0,
    originalLabel: "(e^x − 1) / x",
    derivativeLabel: "e^x / 1",
    original: (x) => (Math.exp(x) - 1) / x,
    derivativeRatio: (x) => Math.exp(x),
    result: "1",
  },
  {
    id: "log",
    label: "ln x / (x − 1)",
    form: "0/0",
    target: 1,
    originalLabel: "ln(x) / (x − 1)",
    derivativeLabel: "(1/x) / 1",
    original: (x) => Math.log(x) / (x - 1),
    derivativeRatio: (x) => 1 / x,
    result: "1",
  },
  {
    id: "infinity",
    label: "x / eˣ",
    form: "∞/∞",
    target: "infinity",
    originalLabel: "x / e^x",
    derivativeLabel: "1 / e^x",
    original: (x) => x / Math.exp(x),
    derivativeRatio: (x) => 1 / Math.exp(x),
    result: "0",
  },
];

export default function LHopitalComparisonLab() {
  const [exampleId, setExampleId] = useState(EXAMPLES[0].id);
  const [closeness, setCloseness] = useState(1.2);
  const example = EXAMPLES.find((item) => item.id === exampleId) ?? EXAMPLES[0];

  const sample = useMemo(() => {
    if (example.target === "infinity") return 1 + closeness * 3;
    const offset = 10 ** -closeness;
    return example.target + offset;
  }, [example.target, closeness]);

  const originalValue = example.original(sample);
  const derivativeValue = example.derivativeRatio(sample);

  function choose(id: string) {
    setExampleId(id);
    setCloseness(1.2);
  }

  return (
    <section className="overflow-hidden rounded-[26px] border border-rose-200/[0.11] bg-black/[0.16] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-rose-200/54"><Divide size={13} /> Quotient comparison lab</div>
          <h2 className="mt-2 text-[clamp(1.6rem,2.9vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Compare the original quotient with the quotient of derivatives near the target.</h2>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">L’Hôpital’s Rule does not say the two quotients are equal at each nearby x. Under its hypotheses, it lets the limit of f/g be determined from the limit of f′/g′ for certain 0/0 or ∞/∞ forms.</p>
        </div>
        <div className="border-t border-white/[0.07] p-4 lg:border-l lg:border-t-0">
          <div className="grid grid-cols-2 gap-2">
            {EXAMPLES.map((item) => (
              <button key={item.id} type="button" onClick={() => choose(item.id)} className={`rounded-[12px] border px-3 py-2.5 text-left transition ${item.id === example.id ? "border-rose-200/[0.22] bg-rose-200/[0.04]" : "border-white/[0.06] bg-black/[0.08] hover:bg-white/[0.025]"}`}>
                <strong className="block font-mono text-[9px] text-white/78">{item.label}</strong>
                <span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.08em] text-rose-200/44">{item.form}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Panel label="Original quotient" expression={example.originalLabel} value={originalValue} />
            <Panel label="Derivative quotient" expression={example.derivativeLabel} value={derivativeValue} />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="font-mono text-[8px] uppercase text-slate-700">{example.target === "infinity" ? "larger x" : "closer to target"}</span>
            <input aria-label="Approach the limit target" type="range" min="0.4" max="3" step="0.05" value={closeness} onChange={(event) => setCloseness(Number(event.target.value))} className="min-w-0 flex-1 accent-rose-400" />
          </div>
          <div className="mt-3 rounded-[14px] border border-white/[0.06] bg-black/[0.10] px-4 py-3 font-mono text-[9px] text-slate-500">sample x = {sample.toFixed(6)}</div>
        </div>

        <aside className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.10em] text-slate-700"><RefreshCw size={11} /> Limit conclusion</div>
          <div className="mt-2 text-[38px] font-semibold tracking-[-0.05em] text-rose-100/80">{example.result}</div>
          <div className="mt-5 rounded-[15px] border border-rose-200/[0.09] bg-rose-200/[0.018] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.09em] text-rose-200/42">Required shape</div>
            <p className="mt-2 text-[9px] leading-4 text-slate-600">First verify that the original quotient approaches 0/0 or ±∞/±∞ and that the differentiability and denominator-derivative conditions needed by the theorem hold near the target.</p>
          </div>
          <div className="mt-4 rounded-[15px] border border-amber-200/[0.08] bg-amber-200/[0.015] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.09em] text-amber-200/40">Not automatic</div>
            <p className="mt-2 text-[9px] leading-4 text-slate-600">A form such as 0·∞, ∞−∞, 1^∞, 0^0, or ∞^0 must be transformed before the quotient rule can even become relevant.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Panel({ label, expression, value }: { label: string; expression: string; value: number }) {
  return <div className="rounded-[16px] border border-white/[0.07] bg-black/[0.10] p-4"><div className="font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">{label}</div><div className="mt-2 font-mono text-[11px] text-white/74">{expression}</div><div className="mt-4 text-[24px] font-semibold tracking-[-0.04em] text-white/84">{Number.isFinite(value) ? value.toFixed(6) : "undefined"}</div></div>;
}
