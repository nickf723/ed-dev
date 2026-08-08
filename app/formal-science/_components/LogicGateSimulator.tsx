"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

type Bit = 0 | 1;
type GateType = "AND" | "OR" | "XOR";

const RULE_DESCRIPTIONS: Record<GateType, string> = {
  AND: "The output is 1 only when both inputs are 1.",
  OR: "The output is 1 when either input is 1, including when both are 1.",
  XOR: "The output is 1 only when the two inputs are different.",
};

function evaluateGate(gate: GateType, inputA: Bit, inputB: Bit): Bit {
  if (gate === "AND") return inputA === 1 && inputB === 1 ? 1 : 0;
  if (gate === "OR") return inputA === 1 || inputB === 1 ? 1 : 0;
  return inputA !== inputB ? 1 : 0;
}

export default function LogicGateSimulator() {
  const [inputA, setInputA] = useState<Bit>(0);
  const [inputB, setInputB] = useState<Bit>(0);
  const [gateType, setGateType] = useState<GateType>("AND");

  const output = evaluateGate(gateType, inputA, inputB);

  const reset = () => {
    setInputA(0);
    setInputB(0);
    setGateType("AND");
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-950/80 p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Try a logic rule</h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Change the inputs or rule and watch the required output update.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset logic gate example"
          className="rounded-lg border border-white/10 p-2 text-slate-500 transition-colors hover:bg-white/5 hover:text-white"
        >
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-8 grid gap-7 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
        <div className="flex justify-center gap-4 md:flex-col">
          <InputButton
            label="Input A"
            value={inputA}
            onChange={() => setInputA(inputA === 1 ? 0 : 1)}
          />
          <InputButton
            label="Input B"
            value={inputB}
            onChange={() => setInputB(inputB === 1 ? 0 : 1)}
          />
        </div>

        <div>
          <span className="block text-center text-xs font-medium uppercase tracking-wider text-slate-500">
            Rule
          </span>
          <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-black/30 p-2">
            {(["AND", "OR", "XOR"] as GateType[]).map((gate) => (
              <button
                type="button"
                key={gate}
                aria-pressed={gateType === gate}
                onClick={() => setGateType(gate)}
                className={`rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                  gateType === gate
                    ? "bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/40"
                    : "text-slate-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                {gate}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Output
          </span>
          <div
            className={`mt-3 flex h-20 w-20 items-center justify-center rounded-full border text-3xl font-bold transition-colors ${
              output === 1
                ? "border-rose-400/60 bg-rose-500/15 text-rose-200"
                : "border-white/10 bg-black/30 text-slate-500"
            }`}
            aria-live="polite"
          >
            {output}
          </div>
          <span className="mt-2 text-sm text-slate-400">
            {output === 1 ? "True" : "False"}
          </span>
        </div>
      </div>

      <p className="mt-7 border-t border-white/10 pt-5 text-center text-sm text-slate-400">
        {RULE_DESCRIPTIONS[gateType]}
      </p>
    </div>
  );
}

type InputButtonProps = {
  label: string;
  value: Bit;
  onChange: () => void;
};

function InputButton({ label, value, onChange }: InputButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-2 text-xs font-medium text-slate-500">{label}</span>
      <button
        type="button"
        onClick={onChange}
        aria-pressed={value === 1}
        aria-label={`${label}: ${value}. Toggle value.`}
        className={`flex h-14 w-14 items-center justify-center rounded-xl border text-xl font-bold transition-colors ${
          value === 1
            ? "border-rose-400/60 bg-rose-500/15 text-rose-200"
            : "border-white/10 bg-black/30 text-slate-500 hover:border-white/25 hover:text-white"
        }`}
      >
        {value}
      </button>
    </div>
  );
}
