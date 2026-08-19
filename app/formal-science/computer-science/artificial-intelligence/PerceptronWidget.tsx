"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, Play, RotateCcw, TriangleAlert } from "lucide-react";

type GateName = "AND" | "OR" | "XOR";
type Bit = 0 | 1;
type Example = { x1: Bit; x2: Bit; target: Bit };

const DATASETS: Record<GateName, readonly Example[]> = {
  AND: [
    { x1: 0, x2: 0, target: 0 },
    { x1: 0, x2: 1, target: 0 },
    { x1: 1, x2: 0, target: 0 },
    { x1: 1, x2: 1, target: 1 },
  ],
  OR: [
    { x1: 0, x2: 0, target: 0 },
    { x1: 0, x2: 1, target: 1 },
    { x1: 1, x2: 0, target: 1 },
    { x1: 1, x2: 1, target: 1 },
  ],
  XOR: [
    { x1: 0, x2: 0, target: 0 },
    { x1: 0, x2: 1, target: 1 },
    { x1: 1, x2: 0, target: 1 },
    { x1: 1, x2: 1, target: 0 },
  ],
};

const LEARNING_RATE = 0.2;

function classify(x1: number, x2: number, weights: readonly [number, number], bias: number): Bit {
  return weights[0] * x1 + weights[1] * x2 + bias >= 0 ? 1 : 0;
}

export default function PerceptronWidget() {
  const [gate, setGate] = useState<GateName>("AND");
  const [weights, setWeights] = useState<[number, number]>([0, 0]);
  const [bias, setBias] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const [lastMistakes, setLastMistakes] = useState<number | null>(null);

  const examples = DATASETS[gate];
  const predictions = useMemo(
    () => examples.map((example) => classify(example.x1, example.x2, weights, bias)),
    [examples, weights, bias],
  );
  const correct = predictions.filter((prediction, index) => prediction === examples[index].target).length;
  const converged = correct === examples.length;

  function reset(nextGate: GateName = gate) {
    setGate(nextGate);
    setWeights([0, 0]);
    setBias(0);
    setEpoch(0);
    setLastMistakes(null);
  }

  function trainEpochs(count: number) {
    let nextWeights: [number, number] = [...weights];
    let nextBias = bias;
    let mistakes = 0;

    for (let pass = 0; pass < count; pass += 1) {
      mistakes = 0;
      for (const example of examples) {
        const prediction = classify(example.x1, example.x2, nextWeights, nextBias);
        const error = example.target - prediction;
        if (error === 0) continue;
        mistakes += 1;
        nextWeights = [
          nextWeights[0] + LEARNING_RATE * error * example.x1,
          nextWeights[1] + LEARNING_RATE * error * example.x2,
        ];
        nextBias += LEARNING_RATE * error;
      }
    }

    setWeights(nextWeights);
    setBias(nextBias);
    setEpoch((value) => value + count);
    setLastMistakes(mistakes);
  }

  return (
    <section className="overflow-hidden rounded-[28px] border border-violet-200/[0.11] bg-black/[0.18] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/60"><BrainCircuit size={13} /> Perceptron learning lab</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.047em] text-white">Update the weights when the classifier makes a mistake.</h2>
          <p className="mt-2 max-w-3xl text-[12px] leading-6 text-slate-400">A perceptron computes a weighted sum, applies a threshold, compares the prediction with a target, and nudges its parameters when the answer is wrong. The same rule can learn AND and OR, but no single straight decision boundary can represent XOR.</p>
        </div>
        <div className="border-t border-white/[0.07] p-4 lg:border-l lg:border-t-0">
          <div className="grid grid-cols-3 gap-2">
            {(["AND", "OR", "XOR"] as const).map((name) => (
              <button key={name} type="button" onClick={() => reset(name)} className={`rounded-[13px] border px-3 py-3 font-mono text-[10px] font-semibold transition ${gate === name ? "border-violet-200/[0.28] bg-violet-200/[0.055] text-violet-100" : "border-white/[0.06] bg-black/[0.08] text-slate-600 hover:bg-white/[0.025]"}`}>{name}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="border-b border-white/[0.07] p-5 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="grid gap-2 sm:grid-cols-4">
            {examples.map((example, index) => {
              const prediction = predictions[index];
              const right = prediction === example.target;
              return (
                <div key={`${example.x1}${example.x2}`} className={`rounded-[16px] border p-4 ${right ? "border-emerald-200/[0.10] bg-emerald-200/[0.018]" : "border-rose-200/[0.13] bg-rose-200/[0.025]"}`}>
                  <div className="font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">input</div>
                  <div className="mt-1 text-[18px] font-semibold text-white/84">({example.x1}, {example.x2})</div>
                  <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[8px]"><span className="text-slate-600">target <strong className="text-slate-300">{example.target}</strong></span><span className={right ? "text-emerald-200/58" : "text-rose-200/62"}>pred <strong>{prediction}</strong></span></div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 rounded-[18px] border border-white/[0.07] bg-black/[0.10] p-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <Parameter label="w₁" value={weights[0]} />
              <Parameter label="w₂" value={weights[1]} />
              <Parameter label="bias" value={bias} />
            </div>
            <div className="mt-4 font-mono text-[9px] text-violet-100/58">ŷ = step({weights[0].toFixed(1)}x₁ + {weights[1].toFixed(1)}x₂ + {bias.toFixed(1)})</div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => trainEpochs(1)} className="flex items-center gap-2 rounded-[13px] border border-violet-200/[0.20] bg-violet-200/[0.045] px-4 py-2.5 text-[10px] font-semibold text-violet-100/80 transition hover:bg-violet-200/[0.08]"><Play size={12} /> Train 1 epoch</button>
            <button type="button" onClick={() => trainEpochs(10)} className="rounded-[13px] border border-cyan-200/[0.14] bg-cyan-200/[0.025] px-4 py-2.5 text-[10px] font-semibold text-cyan-100/70 transition hover:bg-cyan-200/[0.05]">Train 10 epochs</button>
            <button type="button" onClick={() => reset()} className="flex items-center gap-2 rounded-[13px] border border-white/[0.07] px-4 py-2.5 text-[10px] text-slate-600 transition hover:bg-white/[0.025]"><RotateCcw size={12} /> Reset</button>
          </div>
        </div>

        <aside className="p-5 sm:p-6">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Training state</div>
          <div className="mt-2 text-[38px] font-semibold tracking-[-0.055em] text-white">{correct} / 4</div>
          <div className={`font-mono text-[9px] uppercase tracking-[0.09em] ${converged ? "text-emerald-200/62" : "text-violet-200/56"}`}>{converged ? "all examples classified" : "errors remain"}</div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <Stat label="epoch" value={String(epoch)} />
            <Stat label="last mistakes" value={lastMistakes === null ? "—" : String(lastMistakes)} />
          </div>

          <div className="mt-5 rounded-[18px] border border-white/[0.07] bg-black/[0.12] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.10em] text-violet-200/44">Update rule</div>
            <p className="mt-2 font-mono text-[9px] leading-5 text-slate-500">w ← w + η(y − ŷ)x<br />b ← b + η(y − ŷ)</p>
            <p className="mt-2 text-[9px] leading-4 text-slate-600">η = {LEARNING_RATE}. Correct examples produce no update; mistakes push the decision boundary toward the desired classification.</p>
          </div>

          {gate === "XOR" ? (
            <div className="mt-4 rounded-[18px] border border-amber-200/[0.13] bg-amber-200/[0.025] p-4">
              <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.09em] text-amber-200/58"><TriangleAlert size={11} /> Capacity limit</div>
              <p className="mt-2 text-[9px] leading-4 text-slate-600">XOR is not linearly separable. More training cannot repair a model class that lacks the required shape; extra representational capacity is needed.</p>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

function Parameter({ label, value }: { label: string; value: number }) {
  return <div><div className="font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">{label}</div><div className="mt-1 text-[22px] font-semibold tracking-[-0.04em] text-violet-100/78">{value.toFixed(1)}</div></div>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.09] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">{label}</div><strong className="mt-1 block text-[14px] text-white/78">{value}</strong></div>;
}
