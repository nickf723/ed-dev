"use client";

import { useState } from "react";
import { ArrowRight, Cpu, RotateCcw } from "lucide-react";

type Bit = 0 | 1;
type GateType = "AND" | "OR" | "XOR";

const GATE_INFO: Record<
  GateType,
  { symbol: string; description: string }
> = {
  AND: {
    symbol: "A ∧ B",
    description: "Both inputs must be on.",
  },
  OR: {
    symbol: "A ∨ B",
    description: "At least one input must be on.",
  },
  XOR: {
    symbol: "A ⊕ B",
    description: "Exactly one input must be on.",
  },
};

const INPUT_COMBINATIONS: Array<[Bit, Bit]> = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

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
    <div className="overflow-hidden rounded-xl border border-rose-500/20 bg-[#050506]/90 shadow-[inset_0_0_28px_rgba(244,63,94,0.025)]">
      <div className="flex items-center justify-between gap-4 border-b border-rose-500/15 bg-rose-950/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-300">
            <Cpu size={17} aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Logic gate</h3>
            <p className="text-xs text-slate-500">
              Active signals glow as they travel through the rule.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset logic gate"
          className="rounded-lg border border-white/10 p-2 text-slate-500 transition-colors hover:border-rose-500/25 hover:bg-rose-500/10 hover:text-rose-200"
        >
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="p-4 sm:p-6">
        <div className="hidden md:grid md:grid-cols-[150px_minmax(70px,1fr)_260px_minmax(70px,1fr)_150px] md:items-center">
          <div className="grid gap-6">
            <InputNode
              label="A"
              value={inputA}
              onChange={() => setInputA(inputA === 1 ? 0 : 1)}
            />
            <InputNode
              label="B"
              value={inputB}
              onChange={() => setInputB(inputB === 1 ? 0 : 1)}
            />
          </div>

          <div className="grid gap-6 px-3">
            <SignalWire active={inputA === 1} />
            <SignalWire active={inputB === 1} />
          </div>

          <GateModule
            gateType={gateType}
            inputA={inputA}
            inputB={inputB}
            output={output}
            onGateChange={setGateType}
          />

          <div className="px-3">
            <SignalWire active={output === 1} />
          </div>

          <OutputNode value={output} />
        </div>

        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3">
            <InputNode
              label="A"
              value={inputA}
              onChange={() => setInputA(inputA === 1 ? 0 : 1)}
            />
            <InputNode
              label="B"
              value={inputB}
              onChange={() => setInputB(inputB === 1 ? 0 : 1)}
            />
          </div>

          <InputJoin inputA={inputA} inputB={inputB} />

          <GateModule
            gateType={gateType}
            inputA={inputA}
            inputB={inputB}
            output={output}
            onGateChange={setGateType}
          />

          <div className="mx-auto h-9 w-px">
            <div
              className={`h-full w-px transition-colors ${
                output === 1
                  ? "bg-rose-400 shadow-[0_0_9px_rgba(251,113,133,0.75)]"
                  : "bg-white/10"
              }`}
            />
          </div>

          <OutputNode value={output} />
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Truth table</h4>
              <p className="text-xs text-slate-500">
                Every possible input pair. Select one to load it.
              </p>
            </div>
            <span className="font-mono text-xs text-rose-300/80">
              {GATE_INFO[gateType].description}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {INPUT_COMBINATIONS.map(([rowA, rowB]) => {
              const rowOutput = evaluateGate(gateType, rowA, rowB);
              const isActive = rowA === inputA && rowB === inputB;

              return (
                <button
                  type="button"
                  key={`${rowA}-${rowB}`}
                  aria-pressed={isActive}
                  onClick={() => {
                    setInputA(rowA);
                    setInputB(rowB);
                  }}
                  className={`rounded-xl border px-3 py-3 text-left transition-all ${
                    isActive
                      ? "border-rose-400/45 bg-rose-500/12 shadow-[0_0_18px_rgba(244,63,94,0.08)]"
                      : "border-white/8 bg-black/25 hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="grid grid-cols-[1fr_1fr_auto_1fr] items-center gap-2 font-mono">
                    <TruthValue label="A" value={rowA} active={isActive} />
                    <TruthValue label="B" value={rowB} active={isActive} />
                    <ArrowRight
                      size={13}
                      className={isActive ? "text-rose-300" : "text-slate-700"}
                      aria-hidden="true"
                    />
                    <TruthValue
                      label="OUT"
                      value={rowOutput}
                      active={isActive && rowOutput === 1}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type InputNodeProps = {
  label: string;
  value: Bit;
  onChange: () => void;
};

function InputNode({ label, value, onChange }: InputNodeProps) {
  const isActive = value === 1;

  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={isActive}
      aria-label={`Input ${label}: ${value}. Toggle input.`}
      className={`group flex min-h-[74px] w-full items-center justify-between rounded-xl border px-4 transition-all ${
        isActive
          ? "border-rose-400/55 bg-rose-500/15 shadow-[0_0_20px_rgba(244,63,94,0.12)]"
          : "border-white/10 bg-black/30 hover:border-white/25 hover:bg-white/[0.03]"
      }`}
    >
      <span className="text-left">
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Input
        </span>
        <span className={`mt-1 block text-lg font-bold ${isActive ? "text-rose-200" : "text-white"}`}>
          {label}
        </span>
      </span>
      <span className="text-right">
        <span
          className={`block font-mono text-2xl font-black ${
            isActive ? "text-rose-200" : "text-slate-500"
          }`}
        >
          {value}
        </span>
        <span className="block text-[10px] uppercase tracking-wider text-slate-600">
          {isActive ? "on" : "off"}
        </span>
      </span>
    </button>
  );
}

type GateModuleProps = {
  gateType: GateType;
  inputA: Bit;
  inputB: Bit;
  output: Bit;
  onGateChange: (gate: GateType) => void;
};

function GateModule({
  gateType,
  inputA,
  inputB,
  output,
  onGateChange,
}: GateModuleProps) {
  return (
    <div className="relative rounded-2xl border border-rose-500/25 bg-[radial-gradient(circle_at_50%_30%,rgba(244,63,94,0.10),transparent_58%),rgba(0,0,0,0.55)] p-4 shadow-[inset_0_0_24px_rgba(244,63,94,0.04)]">
      <span
        className={`absolute -left-2 top-[29%] h-4 w-4 rounded-full border transition-colors ${
          inputA === 1
            ? "border-rose-300 bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.85)]"
            : "border-white/15 bg-neutral-950"
        }`}
        aria-hidden="true"
      />
      <span
        className={`absolute -left-2 bottom-[29%] h-4 w-4 rounded-full border transition-colors ${
          inputB === 1
            ? "border-rose-300 bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.85)]"
            : "border-white/15 bg-neutral-950"
        }`}
        aria-hidden="true"
      />
      <span
        className={`absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border transition-colors ${
          output === 1
            ? "border-rose-300 bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.85)]"
            : "border-white/15 bg-neutral-950"
        }`}
        aria-hidden="true"
      />

      <div className="grid grid-cols-3 gap-2">
        {(["AND", "OR", "XOR"] as GateType[]).map((gate) => (
          <button
            type="button"
            key={gate}
            aria-pressed={gateType === gate}
            onClick={() => onGateChange(gate)}
            className={`rounded-lg border px-2 py-2 font-mono text-xs font-bold transition-colors ${
              gateType === gate
                ? "border-rose-400/45 bg-rose-500/15 text-rose-100"
                : "border-white/8 bg-black/30 text-slate-600 hover:border-white/20 hover:text-white"
            }`}
          >
            {gate}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/8 bg-black/35 px-4 py-5 text-center">
        <div className="font-mono text-3xl font-black text-white">
          {GATE_INFO[gateType].symbol}
        </div>
        <div className="mt-2 text-xs text-slate-500">
          {GATE_INFO[gateType].description}
        </div>
      </div>
    </div>
  );
}

function SignalWire({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-[74px] items-center">
      <div
        className={`h-px w-full transition-colors ${
          active
            ? "bg-rose-400 shadow-[0_0_9px_rgba(251,113,133,0.75)]"
            : "bg-white/10"
        }`}
      />
      <div
        className={`absolute right-0 h-2.5 w-2.5 rounded-full border transition-colors ${
          active
            ? "border-rose-200 bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.8)]"
            : "border-white/15 bg-neutral-950"
        }`}
      />
    </div>
  );
}

function InputJoin({ inputA, inputB }: { inputA: Bit; inputB: Bit }) {
  const eitherActive = inputA === 1 || inputB === 1;

  return (
    <div className="relative mx-auto h-12 w-1/2" aria-hidden="true">
      <div
        className={`absolute left-1/4 top-0 h-6 w-px ${
          inputA === 1
            ? "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.7)]"
            : "bg-white/10"
        }`}
      />
      <div
        className={`absolute right-1/4 top-0 h-6 w-px ${
          inputB === 1
            ? "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.7)]"
            : "bg-white/10"
        }`}
      />
      <div
        className={`absolute left-1/4 right-1/4 top-6 h-px ${
          eitherActive ? "bg-rose-400/70" : "bg-white/10"
        }`}
      />
      <div
        className={`absolute left-1/2 top-6 h-6 w-px -translate-x-1/2 ${
          eitherActive
            ? "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.7)]"
            : "bg-white/10"
        }`}
      />
    </div>
  );
}

function OutputNode({ value }: { value: Bit }) {
  const isActive = value === 1;

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
        Output
      </span>
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-full border-2 transition-all ${
          isActive
            ? "border-rose-300/80 bg-rose-500/18 text-rose-100 shadow-[0_0_34px_rgba(244,63,94,0.34)]"
            : "border-white/10 bg-black/35 text-slate-600"
        }`}
        aria-live="polite"
        aria-label={`Output ${value}, ${isActive ? "true" : "false"}`}
      >
        <span className="font-mono text-4xl font-black">{value}</span>
      </div>
      <span className={`mt-3 text-sm ${isActive ? "text-rose-200" : "text-slate-500"}`}>
        {isActive ? "True" : "False"}
      </span>
    </div>
  );
}

function TruthValue({
  label,
  value,
  active,
}: {
  label: string;
  value: Bit;
  active: boolean;
}) {
  return (
    <span className="text-center">
      <span className="block text-[9px] text-slate-600">{label}</span>
      <span
        className={`mt-1 block text-lg font-bold ${
          active ? "text-rose-200" : "text-slate-400"
        }`}
      >
        {value}
      </span>
    </span>
  );
}
