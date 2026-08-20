"use client";

import { useMemo, useState } from "react";
import { ArrowRight, GitMerge } from "lucide-react";

const POPULATION = 1000;

export default function BayesUpdateLab() {
  const [prior, setPrior] = useState(10);
  const [truePositiveRate, setTruePositiveRate] = useState(90);
  const [falsePositiveRate, setFalsePositiveRate] = useState(5);

  const result = useMemo(() => {
    const p = prior / 100;
    const tpr = truePositiveRate / 100;
    const fpr = falsePositiveRate / 100;
    const hypothesis = POPULATION * p;
    const notHypothesis = POPULATION - hypothesis;
    const truePositive = hypothesis * tpr;
    const falseNegative = hypothesis * (1 - tpr);
    const falsePositive = notHypothesis * fpr;
    const trueNegative = notHypothesis * (1 - fpr);
    const positive = truePositive + falsePositive;
    const posterior = positive === 0 ? 0 : truePositive / positive;
    const evidenceProbability = positive / POPULATION;
    return { hypothesis, notHypothesis, truePositive, falseNegative, falsePositive, trueNegative, positive, posterior, evidenceProbability };
  }, [falsePositiveRate, prior, truePositiveRate]);

  return (
    <section className="overflow-hidden rounded-[30px] border border-pink-200/[0.10] bg-[#160817]/74 backdrop-blur-xl">
      <div className="grid gap-4 border-b border-white/[0.07] px-4 py-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-200/66"><GitMerge size={13} /> Evidence-update lab</div>
          <p className="mt-1 text-[10px] text-slate-600">Imagine 1,000 cases. Set the prior rate and how strongly a positive observation favors the hypothesis.</p>
        </div>
        <div className="rounded-[14px] border border-pink-200/[0.10] bg-pink-200/[0.025] px-3 py-2 font-mono text-[9px] text-pink-100/62">posterior = true positives / all positives</div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[330px_minmax(0,1fr)]">
        <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-4">
          <Slider label="Prior P(H)" value={prior} min={1} max={80} onChange={setPrior} rgb="244, 114, 182" note="How common is H before this evidence?" />
          <div className="mt-5"><Slider label="P(+ | H)" value={truePositiveRate} min={50} max={100} onChange={setTruePositiveRate} rgb="52, 211, 153" note="True-positive rate / sensitivity." /></div>
          <div className="mt-5"><Slider label="P(+ | not H)" value={falsePositiveRate} min={0} max={50} onChange={setFalsePositiveRate} rgb="251, 146, 60" note="False-positive rate." /></div>
          <div className="mt-5 border-t border-white/[0.06] pt-4 text-[9px] leading-4 text-slate-700">These sliders define a simple two-hypothesis model. The posterior is conditional on this model and these rates being appropriate for the situation.</div>
        </div>

        <div>
          <div className="grid gap-3 md:grid-cols-2">
            <FrequencyBlock label="H is true" total={result.hypothesis} positive={result.truePositive} negative={result.falseNegative} rgb="244, 114, 182" positiveLabel="true +" negativeLabel="false −" />
            <FrequencyBlock label="H is false" total={result.notHypothesis} positive={result.falsePositive} negative={result.trueNegative} rgb="96, 165, 250" positiveLabel="false +" negativeLabel="true −" />
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_230px]">
            <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4">
              <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.11em] text-slate-600">Condition on a positive result</div>
              <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
                <Box label="True +" value={result.truePositive} rgb="52, 211, 153" />
                <span className="font-mono text-[13px] text-slate-700">+</span>
                <Box label="False +" value={result.falsePositive} rgb="251, 146, 60" />
                <ArrowRight size={18} className="shrink-0 text-pink-300/52" />
                <div className="min-w-[130px] rounded-[16px] border border-pink-200/[0.12] bg-pink-200/[0.035] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.1em] text-pink-200/48">P(H | +)</div><strong className="mt-1 block font-mono text-[24px] text-pink-100/82">{(result.posterior * 100).toFixed(1)}%</strong></div>
              </div>
              <div className="mt-4 rounded-[14px] border border-white/[0.055] bg-white/[0.012] px-3 py-2.5 font-mono text-[9px] leading-4 text-slate-500">P(H|+) = {format(result.truePositive)} / ({format(result.truePositive)} + {format(result.falsePositive)})</div>
            </div>

            <aside className="rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4">
              <Metric label="Prior P(H)" value={`${prior.toFixed(1)}%`} />
              <Metric label="P(+)" value={`${(result.evidenceProbability * 100).toFixed(1)}%`} />
              <Metric label="Posterior P(H|+)" value={`${(result.posterior * 100).toFixed(1)}%`} />
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, onChange, rgb, note }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void; rgb: string; note: string }) {
  return <div><div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-600">{label}</span><strong className="font-mono text-[11px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}%</strong></div><input aria-label={label} type="range" min={min} max={max} step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-pink-400" /><p className="mt-1.5 text-[8px] leading-4 text-slate-700">{note}</p></div>;
}

function FrequencyBlock({ label, total, positive, negative, rgb, positiveLabel, negativeLabel }: { label: string; total: number; positive: number; negative: number; rgb: string; positiveLabel: string; negativeLabel: string }) {
  const positiveShare = total === 0 ? 0 : positive / total;
  return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4"><div className="flex items-center justify-between gap-3"><strong className="text-[11px] text-white/80">{label}</strong><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.68)` }}>{format(total)} cases</span></div><div className="mt-4 flex h-5 overflow-hidden rounded-full bg-white/[0.03]"><div style={{ width: `${positiveShare * 100}%`, background: "rgba(52,211,153,0.60)" }} /><div className="flex-1 bg-slate-500/20" /></div><div className="mt-2 grid grid-cols-2 gap-2 font-mono text-[8px]"><span className="text-emerald-200/56">{positiveLabel}: {format(positive)}</span><span className="text-right text-slate-600">{negativeLabel}: {format(negative)}</span></div></div>;
}

function Box({ label, value, rgb }: { label: string; value: number; rgb: string }) {
  return <div className="min-w-[92px] rounded-[14px] border p-3 text-center" style={{ borderColor: `rgba(${rgb},0.12)`, background: `rgba(${rgb},0.025)` }}><div className="font-mono text-[7px] uppercase tracking-[0.08em]" style={{ color: `rgba(${rgb},0.58)` }}>{label}</div><strong className="mt-1 block font-mono text-[15px] text-white/80">{format(value)}</strong></div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-white/[0.055] py-3 first:pt-0 last:border-b-0"><div className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[16px] text-pink-100/78">{value}</strong></div>;
}

function format(value: number) {
  return value.toFixed(value < 10 ? 1 : 0);
}
