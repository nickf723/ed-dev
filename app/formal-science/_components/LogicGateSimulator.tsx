"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

type Bit = 0 | 1;
type GateType = "AND" | "OR" | "XOR";

const GATE_INFO: Record<
  GateType,
  { symbol: string; description: string }
> = {
  AND: {
    symbol: "A ∧ B",
    description: "The lamp turns on only when both channels carry a signal.",
  },
  OR: {
    symbol: "A ∨ B",
    description: "The lamp turns on when either channel carries a signal.",
  },
  XOR: {
    symbol: "A ⊕ B",
    description: "The lamp turns on when exactly one channel carries a signal.",
  },
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
    <div className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[20px] border border-rose-500/20 bg-[linear-gradient(145deg,rgba(30,6,15,0.78),rgba(2,3,5,0.88))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_0_34px_rgba(244,63,94,0.025),0_22px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <PanelScrews />

      <header className="flex min-h-14 items-center gap-3 border-b border-rose-500/20 bg-rose-950/10 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-white">Rule bench</h2>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-rose-300/60">
            inputs · operator · output
          </div>
        </div>

        <div className="flex rounded-xl border border-white/10 bg-black/40 p-1 shadow-[inset_0_0_12px_rgba(0,0,0,0.7)]" aria-label="Choose a logic gate">
          {(["AND", "OR", "XOR"] as GateType[]).map((gate) => (
            <button
              type="button"
              key={gate}
              aria-pressed={gateType === gate}
              onClick={() => setGateType(gate)}
              className={`min-w-12 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] font-bold transition-all ${
                gateType === gate
                  ? "border-rose-400/50 bg-rose-500/20 text-rose-100 shadow-[inset_0_0_14px_rgba(244,63,94,0.13),0_0_12px_rgba(244,63,94,0.08)]"
                  : "border-transparent text-slate-600 hover:border-white/10 hover:text-slate-300"
              }`}
            >
              {gate}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={reset}
          aria-label="Reset logic gate"
          className="rounded-lg border border-white/10 bg-black/30 p-2 text-slate-600 transition-colors hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-200"
        >
          <RotateCcw size={15} aria-hidden="true" />
        </button>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-[minmax(220px,1fr)_auto] gap-3 p-3.5">
        <div className="grid min-h-0 grid-cols-[70px_minmax(150px,1fr)_70px] items-center gap-2.5 rounded-2xl border border-white/10 bg-black/40 p-3 shadow-[inset_0_0_34px_rgba(0,0,0,0.68)]">
          <div className="grid gap-4">
            <InputSwitch
              label="A"
              value={inputA}
              onChange={() => setInputA(inputA === 1 ? 0 : 1)}
            />
            <InputSwitch
              label="B"
              value={inputB}
              onChange={() => setInputB(inputB === 1 ? 0 : 1)}
            />
          </div>

          <CircuitBoard
            gateType={gateType}
            inputA={inputA}
            inputB={inputB}
            output={output}
          />

          <OutputLamp value={output} />
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_210px]">
          <div className="flex min-h-[124px] items-center gap-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 shadow-[inset_0_0_20px_rgba(255,255,255,0.012)]">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-rose-500/25 bg-rose-500/10 font-mono text-xl font-black text-rose-100 shadow-[inset_0_0_18px_rgba(244,63,94,0.08)]">
              {GATE_INFO[gateType].symbol}
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-300/60">
                {gateType} rule
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                {GATE_INFO[gateType].description}
              </p>
              <div className="mt-2 font-mono text-xs text-slate-500">
                {GATE_INFO[gateType].symbol} = <span className={output === 1 ? "text-rose-200" : "text-slate-300"}>{output}</span>
              </div>
            </div>
          </div>

          <TruthMatrix
            gateType={gateType}
            inputA={inputA}
            inputB={inputB}
            onSelect={(nextA, nextB) => {
              setInputA(nextA);
              setInputB(nextB);
            }}
          />
        </div>
      </div>
    </div>
  );
}

type InputSwitchProps = {
  label: string;
  value: Bit;
  onChange: () => void;
};

function InputSwitch({ label, value, onChange }: InputSwitchProps) {
  const active = value === 1;

  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={active}
      aria-label={`Input ${label}: ${value}. Toggle input.`}
      className="group flex flex-col items-center gap-1.5"
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
        {label}
      </span>
      <span
        className={`relative h-12 w-7 rounded-full border transition-all ${
          active
            ? "border-rose-300/60 bg-rose-500/20 shadow-[0_0_18px_rgba(244,63,94,0.18),inset_0_0_10px_rgba(244,63,94,0.15)]"
            : "border-white/20 bg-neutral-950 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] group-hover:border-white/25"
        }`}
      >
        <span
          className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border transition-all ${
            active
              ? "top-1 border-rose-100/70 bg-rose-300 shadow-[0_0_10px_rgba(251,113,133,0.85)]"
              : "top-7 border-white/20 bg-slate-700"
          }`}
        />
      </span>
      <span className={`font-mono text-sm font-bold ${active ? "text-rose-200" : "text-slate-600"}`}>
        {value}
      </span>
    </button>
  );
}

type CircuitBoardProps = {
  gateType: GateType;
  inputA: Bit;
  inputB: Bit;
  output: Bit;
};

function CircuitBoard({ gateType, inputA, inputB, output }: CircuitBoardProps) {
  return (
    <div className="relative h-full min-h-[190px] overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.055),transparent_52%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.025)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <SignalPath className="left-0 right-1/2 top-[35%]" active={inputA === 1} />
      <SignalPath className="left-0 right-1/2 top-[65%]" active={inputB === 1} />
      <SignalPath className="left-1/2 right-0 top-1/2" active={output === 1} />

      <Port className="left-0 top-[35%]" active={inputA === 1} />
      <Port className="left-0 top-[65%]" active={inputB === 1} />
      <Port className="right-0 top-1/2" active={output === 1} />

      <div className="absolute left-1/2 top-1/2 flex h-28 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[24px] border border-rose-400/30 bg-[linear-gradient(145deg,rgba(55,9,24,0.94),rgba(8,4,7,0.96))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_24px_rgba(244,63,94,0.08),0_14px_35px_rgba(0,0,0,0.5)]">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose-300/60">operator</span>
        <span className="mt-2 font-mono text-3xl font-black text-rose-50">{GATE_INFO[gateType].symbol}</span>
        <span className="mt-2 rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[9px] text-slate-500">
          {gateType}
        </span>
      </div>
    </div>
  );
}

function SignalPath({ className, active }: { className: string; active: boolean }) {
  return (
    <div
      className={`absolute h-px -translate-y-1/2 transition-colors ${className} ${
        active
          ? "bg-rose-300 shadow-[0_0_10px_rgba(251,113,133,0.86)]"
          : "bg-white/10"
      }`}
      aria-hidden="true"
    >
      {active && (
        <span className="absolute right-1/4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-rose-100 shadow-[0_0_10px_rgba(255,228,230,0.9)] motion-safe:animate-pulse motion-reduce:animate-none" />
      )}
    </div>
  );
}

function Port({ className, active }: { className: string; active: boolean }) {
  return (
    <span
      className={`absolute h-3 w-3 -translate-y-1/2 rounded-full border transition-colors ${className} ${
        active
          ? "border-rose-100 bg-rose-300 shadow-[0_0_10px_rgba(251,113,133,0.8)]"
          : "border-white/20 bg-neutral-950"
      }`}
      aria-hidden="true"
    />
  );
}

function OutputLamp({ value }: { value: Bit }) {
  const active = value === 1;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">out</span>
      <div
        className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all ${
          active
            ? "border-rose-200/80 bg-rose-500/20 text-rose-50 shadow-[0_0_30px_rgba(244,63,94,0.42),inset_0_0_18px_rgba(255,228,230,0.12)]"
            : "border-white/10 bg-black/40 text-slate-700 shadow-[inset_0_0_18px_rgba(0,0,0,0.85)]"
        }`}
        aria-live="polite"
        aria-label={`Output ${value}, ${active ? "true" : "false"}`}
      >
        <span className="font-mono text-2xl font-black">{value}</span>
        <span className="absolute inset-2 rounded-full border border-white/5" aria-hidden="true" />
      </div>
      <span className={`font-mono text-[10px] uppercase tracking-wider ${active ? "text-rose-200" : "text-slate-600"}`}>
        {active ? "true" : "false"}
      </span>
    </div>
  );
}

type TruthMatrixProps = {
  gateType: GateType;
  inputA: Bit;
  inputB: Bit;
  onSelect: (inputA: Bit, inputB: Bit) => void;
};

function TruthMatrix({ gateType, inputA, inputB, onSelect }: TruthMatrixProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.55)]">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">output map</span>
        <span className="font-mono text-[9px] text-rose-300/60">B →</span>
      </div>

      <div className="grid grid-cols-[24px_1fr_1fr] grid-rows-[20px_1fr_1fr] gap-1.5">
        <div />
        <AxisLabel value="0" />
        <AxisLabel value="1" />
        <AxisLabel value="A0" />
        <TruthCell gateType={gateType} rowA={0} rowB={0} active={inputA === 0 && inputB === 0} onSelect={onSelect} />
        <TruthCell gateType={gateType} rowA={0} rowB={1} active={inputA === 0 && inputB === 1} onSelect={onSelect} />
        <AxisLabel value="A1" />
        <TruthCell gateType={gateType} rowA={1} rowB={0} active={inputA === 1 && inputB === 0} onSelect={onSelect} />
        <TruthCell gateType={gateType} rowA={1} rowB={1} active={inputA === 1 && inputB === 1} onSelect={onSelect} />
      </div>
    </div>
  );
}

function AxisLabel({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-center font-mono text-[9px] text-slate-600">
      {value}
    </div>
  );
}

type TruthCellProps = {
  gateType: GateType;
  rowA: Bit;
  rowB: Bit;
  active: boolean;
  onSelect: (inputA: Bit, inputB: Bit) => void;
};

function TruthCell({ gateType, rowA, rowB, active, onSelect }: TruthCellProps) {
  const result = evaluateGate(gateType, rowA, rowB);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`A ${rowA}, B ${rowB}, output ${result}. Load this input pair.`}
      onClick={() => onSelect(rowA, rowB)}
      className={`relative flex min-h-10 items-center justify-center rounded-lg border font-mono text-sm font-bold transition-all ${
        active
          ? "border-rose-300/60 bg-rose-500/20 text-rose-100 shadow-[0_0_14px_rgba(244,63,94,0.13),inset_0_0_12px_rgba(244,63,94,0.08)]"
          : result === 1
            ? "border-rose-500/20 bg-rose-500/10 text-rose-300/60 hover:border-rose-400/40"
            : "border-white/10 bg-black/30 text-slate-600 hover:border-white/20 hover:text-slate-300"
      }`}
    >
      {result}
      {result === 1 && (
        <span className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full ${active ? "bg-rose-100 shadow-[0_0_7px_rgba(255,228,230,0.85)]" : "bg-rose-500/40"}`} aria-hidden="true" />
      )}
    </button>
  );
}

function PanelScrews() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
      <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
      <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
      <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full border border-white/20 bg-black/70" />
    </div>
  );
}
