"use client";

import { useState, type ReactNode } from "react";
import { AlertTriangle, Beaker, CheckCircle2, Minus, Plus, Scale } from "lucide-react";

type Coefficients = {
  methane: number;
  oxygen: number;
  carbonDioxide: number;
  water: number;
};

const INITIAL: Coefficients = {
  methane: 1,
  oxygen: 1,
  carbonDioxide: 1,
  water: 1,
};

export default function ReactionBalancer() {
  const [coefficients, setCoefficients] = useState(INITIAL);
  const reactants = {
    C: coefficients.methane,
    H: coefficients.methane * 4,
    O: coefficients.oxygen * 2,
  };
  const products = {
    C: coefficients.carbonDioxide,
    H: coefficients.water * 2,
    O: coefficients.carbonDioxide * 2 + coefficients.water,
  };
  const balanced = (Object.keys(reactants) as Array<keyof typeof reactants>).every(
    (element) => reactants[element] === products[element],
  );

  function adjust(key: keyof Coefficients, amount: number) {
    setCoefficients((current) => ({
      ...current,
      [key]: Math.min(9, Math.max(1, current[key] + amount)),
    }));
  }

  return (
    <article className="overflow-hidden rounded-[24px] border border-amber-100/[0.11] bg-black/[0.25] shadow-[0_24px_85px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/74">
            <Beaker size={14} /> Conservation ledger
          </div>
          <p className="mt-1 text-[13px] text-slate-400/68">Combustion of methane</p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold ${
            balanced
              ? "border-emerald-300/[0.30] bg-emerald-300/[0.08] text-emerald-200"
              : "border-rose-300/[0.24] bg-rose-300/[0.06] text-rose-200"
          }`}
        >
          {balanced ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
          {balanced ? "Balanced" : "Atoms do not match"}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-[20px] border border-white/[0.07] bg-black/[0.22] p-5 sm:gap-5 sm:p-7">
          <MoleculeCoefficient
            value={coefficients.methane}
            formula={<>CH<sub>4</sub></>}
            onDecrease={() => adjust("methane", -1)}
            onIncrease={() => adjust("methane", 1)}
          />
          <Operator>+</Operator>
          <MoleculeCoefficient
            value={coefficients.oxygen}
            formula={<>O<sub>2</sub></>}
            onDecrease={() => adjust("oxygen", -1)}
            onIncrease={() => adjust("oxygen", 1)}
          />
          <Operator>→</Operator>
          <MoleculeCoefficient
            value={coefficients.carbonDioxide}
            formula={<>CO<sub>2</sub></>}
            onDecrease={() => adjust("carbonDioxide", -1)}
            onIncrease={() => adjust("carbonDioxide", 1)}
          />
          <Operator>+</Operator>
          <MoleculeCoefficient
            value={coefficients.water}
            formula={<>H<sub>2</sub>O</>}
            onDecrease={() => adjust("water", -1)}
            onIncrease={() => adjust("water", 1)}
          />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <AtomLedger title="Reactants" counts={reactants} comparison={products} />
          <AtomLedger title="Products" counts={products} comparison={reactants} />
        </div>

        <div
          className={`mt-5 flex items-start gap-3 rounded-[16px] border p-4 text-[14px] leading-6 ${
            balanced
              ? "border-emerald-300/[0.18] bg-emerald-300/[0.045] text-emerald-100/82"
              : "border-white/[0.08] bg-white/[0.018] text-slate-300/72"
          }`}
        >
          {balanced ? (
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />
          ) : (
            <Scale size={18} className="mt-0.5 shrink-0 text-amber-200/66" />
          )}
          <p>
            {balanced
              ? "Every carbon, hydrogen, and oxygen nucleus is accounted for. The coefficients describe how many whole molecules participate."
              : "Change coefficients only. Subscripts belong to the molecular identity, while coefficients change the number of molecules in the reaction."}
          </p>
        </div>
      </div>
    </article>
  );
}

function MoleculeCoefficient({
  value,
  formula,
  onDecrease,
  onIncrease,
}: {
  value: number;
  formula: ReactNode;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid gap-1">
        <ControlButton label="Increase coefficient" onClick={onIncrease} icon={Plus} />
        <span className={`min-w-8 text-center text-[24px] font-semibold ${value > 1 ? "text-emerald-200" : "text-slate-500"}`}>
          {value}
        </span>
        <ControlButton label="Decrease coefficient" onClick={onDecrease} icon={Minus} />
      </div>
      <span className="text-[28px] font-semibold tracking-[-0.04em] text-white sm:text-[34px] [&_sub]:text-[16px] [&_sub]:text-slate-400">
        {formula}
      </span>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  icon: Icon,
}: {
  label: string;
  onClick: () => void;
  icon: typeof Plus;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-7 w-8 items-center justify-center rounded-[8px] border border-white/[0.08] bg-white/[0.025] text-slate-500 transition hover:bg-white/[0.08] hover:text-white"
    >
      <Icon size={13} />
    </button>
  );
}

function Operator({ children }: { children: ReactNode }) {
  return <span className="px-1 text-[24px] font-light text-white/28">{children}</span>;
}

function AtomLedger({
  title,
  counts,
  comparison,
}: {
  title: string;
  counts: Record<"C" | "H" | "O", number>;
  comparison: Record<"C" | "H" | "O", number>;
}) {
  return (
    <div className="rounded-[17px] border border-white/[0.08] bg-white/[0.018] p-4">
      <h4 className="border-b border-white/[0.07] pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-400">
        {title}
      </h4>
      <div className="mt-3 space-y-2">
        {(["C", "H", "O"] as const).map((element) => {
          const matches = counts[element] === comparison[element];
          return (
            <div key={element} className="flex items-center justify-between gap-4 text-[14px]">
              <span className="text-slate-400">{elementName(element)}</span>
              <span className={`font-mono font-semibold ${matches ? "text-emerald-300" : "text-slate-200"}`}>
                {counts[element]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function elementName(symbol: "C" | "H" | "O") {
  if (symbol === "C") return "Carbon (C)";
  if (symbol === "H") return "Hydrogen (H)";
  return "Oxygen (O)";
}
