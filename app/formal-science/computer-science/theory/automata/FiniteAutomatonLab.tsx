"use client";

import { useMemo, useState } from "react";
import { Binary, CircleCheck, CircleX, RotateCcw } from "lucide-react";

type Machine = {
  id: string;
  label: string;
  language: string;
  states: readonly string[];
  start: string;
  accepting: readonly string[];
  transitions: Record<string, Record<"0" | "1", string>>;
  rgb: string;
};

const MACHINES: readonly Machine[] = [
  {
    id: "even-ones",
    label: "Even number of 1s",
    language: "L = { w ∈ {0,1}* : #₁(w) is even }",
    states: ["even", "odd"],
    start: "even",
    accepting: ["even"],
    transitions: {
      even: { "0": "even", "1": "odd" },
      odd: { "0": "odd", "1": "even" },
    },
    rgb: "34, 211, 238",
  },
  {
    id: "ends-01",
    label: "Ends with 01",
    language: "L = { w ∈ {0,1}* : w ends in 01 }",
    states: ["start", "seen 0", "ends 01"],
    start: "start",
    accepting: ["ends 01"],
    transitions: {
      start: { "0": "seen 0", "1": "start" },
      "seen 0": { "0": "seen 0", "1": "ends 01" },
      "ends 01": { "0": "seen 0", "1": "start" },
    },
    rgb: "192, 132, 252",
  },
];

type TraceStep = {
  state: string;
  symbol?: "0" | "1";
};

export default function FiniteAutomatonLab() {
  const [machineId, setMachineId] = useState(MACHINES[0].id);
  const [input, setInput] = useState("1011");
  const machine = MACHINES.find((item) => item.id === machineId) ?? MACHINES[0];

  const trace = useMemo<TraceStep[]>(() => {
    const steps: TraceStep[] = [{ state: machine.start }];
    let state = machine.start;
    for (const symbol of input) {
      if (symbol !== "0" && symbol !== "1") continue;
      state = machine.transitions[state][symbol];
      steps.push({ state, symbol });
    }
    return steps;
  }, [input, machine]);

  const finalState = trace.at(-1)?.state ?? machine.start;
  const accepted = machine.accepting.includes(finalState);

  function append(symbol: "0" | "1") {
    setInput((current) => (current.length >= 14 ? current : `${current}${symbol}`));
  }

  return (
    <section className="overflow-hidden rounded-[30px] border border-cyan-200/[0.11] bg-black/[0.17] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_410px]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/60"><Binary size={13} /> DFA trace lab</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.047em] text-white">The machine remembers only its current state.</h2>
          <p className="mt-2 max-w-3xl text-[12px] leading-6 text-slate-400">Choose a language and feed the deterministic finite automaton a binary string. Each symbol forces exactly one transition. When the input ends, membership is decided solely by whether the final state is accepting.</p>
        </div>
        <div className="border-t border-white/[0.07] p-4 lg:border-l lg:border-t-0">
          <div className="grid gap-2">
            {MACHINES.map((item) => {
              const selected = item.id === machine.id;
              return (
                <button key={item.id} type="button" onClick={() => setMachineId(item.id)} className={`rounded-[14px] border px-3 py-3 text-left transition ${selected ? "bg-white/[0.045]" : "border-white/[0.06] bg-black/[0.08] hover:bg-white/[0.025]"}`} style={selected ? { borderColor: `rgba(${item.rgb},0.30)` } : undefined}>
                  <strong className="block text-[11px] text-white/84">{item.label}</strong>
                  <span className="mt-1 block font-mono text-[8px]" style={{ color: `rgba(${item.rgb},0.58)` }}>{item.language}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="border-b border-white/[0.07] p-5 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Input string</div>
              <div className="mt-2 flex min-h-11 flex-wrap items-center gap-1.5">
                {input.length === 0 ? <span className="font-mono text-[12px] text-slate-700">ε · empty string</span> : input.split("").map((symbol, index) => <span key={`${symbol}-${index}`} className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/[0.08] bg-black/[0.12] font-mono text-[14px] text-white/82">{symbol}</span>)}
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => append("0")} className="h-9 min-w-9 rounded-[10px] border border-cyan-200/[0.16] bg-cyan-200/[0.025] font-mono text-[12px] text-cyan-100/72">0</button>
              <button type="button" onClick={() => append("1")} className="h-9 min-w-9 rounded-[10px] border border-violet-200/[0.16] bg-violet-200/[0.025] font-mono text-[12px] text-violet-100/72">1</button>
              <button type="button" onClick={() => setInput("")} aria-label="Clear input" className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/[0.08] text-slate-500 hover:bg-white/[0.025]"><RotateCcw size={13} /></button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto pb-2">
            <div className="flex min-w-max items-center gap-2">
              {trace.map((step, index) => (
                <div key={`${step.state}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? <span className="flex flex-col items-center gap-0.5"><span className="font-mono text-[8px] text-cyan-200/54">{step.symbol}</span><span className="text-slate-700">→</span></span> : null}
                  <div className={`min-w-[92px] rounded-[16px] border px-3 py-3 text-center ${index === trace.length - 1 ? "bg-white/[0.045]" : "bg-black/[0.10]"}`} style={{ borderColor: index === trace.length - 1 ? `rgba(${machine.rgb},0.30)` : "rgba(255,255,255,0.06)" }}>
                    <div className="font-mono text-[8px] uppercase tracking-[0.08em] text-slate-700">{index === 0 ? "start" : `step ${index}`}</div>
                    <strong className="mt-1 block text-[11px] text-white/84">{step.state}</strong>
                    {machine.accepting.includes(step.state) ? <span className="mt-1 block font-mono text-[7px] uppercase text-emerald-200/48">accepting</span> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {machine.states.map((state) => (
              <div key={state} className="rounded-[14px] border border-white/[0.06] bg-black/[0.08] p-3">
                <div className="flex items-center justify-between gap-2"><strong className="text-[10px] text-white/80">{state}</strong><span className="font-mono text-[7px] uppercase text-slate-700">{machine.accepting.includes(state) ? "accept" : "reject"}</span></div>
                <div className="mt-2 grid grid-cols-2 gap-1 font-mono text-[8px] text-slate-500"><span>0 → {machine.transitions[state]["0"]}</span><span>1 → {machine.transitions[state]["1"]}</span></div>
              </div>
            ))}
          </div>
        </div>

        <aside className="p-5 sm:p-6">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full border ${accepted ? "border-emerald-200/[0.20] bg-emerald-200/[0.04] text-emerald-200" : "border-rose-200/[0.16] bg-rose-200/[0.03] text-rose-200"}`}>{accepted ? <CircleCheck size={19} /> : <CircleX size={19} />}</div>
          <div className="mt-4 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Final state</div>
          <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.045em] text-white">{finalState}</h3>
          <div className={`mt-2 font-mono text-[9px] uppercase tracking-[0.10em] ${accepted ? "text-emerald-200/64" : "text-rose-200/58"}`}>{accepted ? "string accepted" : "string rejected"}</div>

          <div className="mt-6 rounded-[18px] border border-white/[0.07] bg-black/[0.12] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.10em] text-cyan-200/46">Why finite memory matters</div>
            <p className="mt-2 text-[10px] leading-5 text-slate-600">The machine never stores the full input. Its state compresses all relevant history into one of finitely many possibilities. A regular language is one whose membership can be decided with that finite-state memory.</p>
          </div>

          <div className="mt-4 rounded-[18px] border border-violet-200/[0.08] bg-violet-200/[0.015] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.10em] text-violet-200/44">Deterministic</div>
            <p className="mt-2 text-[10px] leading-5 text-slate-600">For every state and input symbol, a DFA has exactly one next state. Nondeterministic finite automata allow several possible transitions, but recognize exactly the same class of regular languages.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
