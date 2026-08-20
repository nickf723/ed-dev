"use client";

import { useMemo, useState } from "react";
import { M } from "@/app/_components/Math";
import {
  ArrowDownWideNarrow,
  Brackets,
  EqualApproximately,
  ListOrdered,
  RotateCcw,
} from "lucide-react";
import CountingTokenMark from "./CountingTokenMark";
import {
  COUNTING_TOKENS,
  combinationCount,
  countOutcomes,
  enumerateOutcomes,
  factorial,
  permutationCount,
  type CountingMode,
} from "./combinatoricsModel";

const MAX_VISIBLE_OUTCOMES = 24;

export default function CountingVault() {
  const [n, setN] = useState(4);
  const [k, setK] = useState(2);
  const [mode, setMode] = useState<CountingMode>("permutation");
  const tokens = useMemo(() => COUNTING_TOKENS.slice(0, n), [n]);
  const outcomeCount = countOutcomes(mode, n, k);
  const orderedCount = permutationCount(n, k);
  const unorderedCount = combinationCount(n, k);
  const outcomes = useMemo(
    () =>
      enumerateOutcomes(
        tokens.map((token) => token.id),
        k,
        mode
      ),
    [tokens, k, mode]
  );
  const visibleOutcomes = outcomes.slice(0, MAX_VISIBLE_OUTCOMES);
  const hiddenOutcomeCount = Math.max(
    0,
    outcomes.length - visibleOutcomes.length
  );
  const formula =
    mode === "permutation"
      ? String.raw`P(${n},${k})=\frac{${n}!}{(${n}-${k})!}=${orderedCount}`
      : String.raw`C(${n},${k})=\frac{${n}!}{${k}!(${n}-${k})!}=${unorderedCount}`;

  const reset = () => {
    setN(4);
    setK(2);
    setMode("permutation");
  };

  return (
    <div className="bg-[#100b06]/72 overflow-hidden border border-amber-100/[0.16] shadow-[0_42px_120px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
      <div className="grid border-b border-white/[0.08] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-stretch">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100/60">
            <Brackets size={14} /> Counting chamber
          </div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.65rem)] font-semibold leading-none tracking-[-0.045em] text-white">
            Decide what makes an outcome new.
          </h3>
          <p className="mt-4 max-w-3xl text-[14px] leading-6 text-stone-400">
            Choose distinct tokens without repetition. In the numbered-slot
            chamber, changing order creates a new sequence. In the collection
            chamber, reorderings collapse into the same selected group.
          </p>
        </div>

        <div className="grid grid-cols-2 border-t border-white/[0.08] lg:min-w-[310px] lg:border-l lg:border-t-0">
          <ModeButton
            active={mode === "permutation"}
            icon={ListOrdered}
            title="Numbered slots"
            note="order matters"
            onClick={() => setMode("permutation")}
          />
          <ModeButton
            active={mode === "combination"}
            icon={EqualApproximately}
            title="One collection"
            note="order collapses"
            onClick={() => setMode("combination")}
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] p-5 sm:p-7 xl:border-b-0 xl:border-r">
          <div className="space-y-7">
            <RangeControl
              label="Available distinct tokens"
              symbol="n"
              min={3}
              max={7}
              value={n}
              onChange={(value) => {
                setN(value);
                setK((current) => Math.min(current, value));
              }}
            />
            <RangeControl
              label="Tokens selected"
              symbol="k"
              min={1}
              max={Math.min(n, 4)}
              value={k}
              onChange={setK}
            />
          </div>

          <div
            className="mt-7 flex flex-wrap gap-2"
            aria-label="Available tokens"
          >
            {COUNTING_TOKENS.map((token, index) => (
              <CountingTokenMark
                key={token.id}
                token={token}
                size="sm"
                muted={index >= n}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-7 inline-flex min-h-10 items-center gap-2 text-[12px] font-semibold text-stone-500 transition-colors hover:text-amber-100"
          >
            <RotateCcw size={14} /> Restore the four-token case
          </button>
        </div>

        <div className="min-w-0">
          <div className="grid border-b border-white/[0.08] sm:grid-cols-[minmax(0,1fr)_220px]">
            <div className="min-w-0 p-5 sm:p-7">
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500">
                Exact rule
              </div>
              <div className="mt-3 overflow-x-auto text-[clamp(1rem,2.5vw,1.45rem)] text-amber-50 [scrollbar-color:rgba(251,191,36,0.18)_transparent] [scrollbar-width:thin]">
                <M>{formula}</M>
              </div>
              <p className="mt-3 text-[12px] leading-5 text-stone-500">
                {mode === "permutation"
                  ? `${n} choices fill the first slot, then ${n - 1}, continuing for ${k} distinct positions.`
                  : `The ordered count groups into classes of ${k}! = ${factorial(k)} reorderings that represent the same selection.`}
              </p>
            </div>
            <div className="flex flex-col justify-center border-t border-white/[0.08] bg-amber-300/[0.035] p-5 sm:border-l sm:border-t-0 sm:p-7">
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-100/55">
                Distinct outcomes
              </div>
              <strong className="mt-2 font-mono text-[clamp(2.5rem,6vw,4.6rem)] leading-none tracking-[-0.065em] text-amber-50">
                {outcomeCount.toLocaleString("en-US")}
              </strong>
              <span className="mt-3 text-[11px] leading-5 text-stone-500">
                {mode === "permutation"
                  ? `${orderedCount.toLocaleString("en-US")} ordered sequences`
                  : `${orderedCount.toLocaleString("en-US")} sequences ÷ ${factorial(k)} orders per group`}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500">
                  Outcome register
                </div>
                <h4 className="mt-1 text-[19px] font-semibold text-white">
                  {mode === "permutation"
                    ? "Position preserves sequence"
                    : "Reordering preserves membership"}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                <ArrowDownWideNarrow size={14} className="text-cyan-200/65" />
                Showing {visibleOutcomes.length} of {outcomes.length}
              </div>
            </div>

            <div
              className={`mt-5 grid gap-2 ${k <= 2 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"}`}
            >
              {visibleOutcomes.map((outcome) => (
                <OutcomeMark
                  key={outcome.join("-")}
                  tokenIds={outcome}
                  mode={mode}
                />
              ))}
            </div>

            {hiddenOutcomeCount > 0 ? (
              <div className="mt-4 border-l border-amber-200/20 pl-4 text-[12px] leading-5 text-stone-500">
                {hiddenOutcomeCount.toLocaleString("en-US")} additional outcomes
                are counted exactly but omitted from this sample so the register
                stays readable.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModeButton({
  active,
  icon: Icon,
  title,
  note,
  onClick,
}: {
  active: boolean;
  icon: typeof ListOrdered;
  title: string;
  note: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-24 border-r border-white/[0.08] px-4 py-4 text-left transition-colors last:border-r-0 ${
        active
          ? "bg-amber-300/[0.09] text-amber-50"
          : "bg-black/10 text-stone-500 hover:bg-white/[0.025] hover:text-stone-200"
      }`}
    >
      <Icon
        size={17}
        className={active ? "text-amber-200" : "text-stone-600"}
      />
      <strong className="mt-2 block text-[12px] leading-4">{title}</strong>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.11em] opacity-65">
        {note}
      </span>
    </button>
  );
}

function RangeControl({
  label,
  symbol,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  symbol: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-end justify-between gap-4">
        <span>
          <span className="block text-[12px] font-semibold text-stone-300">
            {label}
          </span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-stone-600">
            {symbol} · {min} to {max}
          </span>
        </span>
        <strong className="font-mono text-[26px] leading-none text-amber-100">
          {value}
        </strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-800 accent-amber-500"
      />
    </label>
  );
}

function OutcomeMark({
  tokenIds,
  mode,
}: {
  tokenIds: readonly string[];
  mode: CountingMode;
}) {
  return (
    <div
      className={`flex min-h-14 items-center justify-center gap-1 border px-2 py-2 ${
        mode === "permutation"
          ? "border-amber-100/[0.13] bg-amber-300/[0.035]"
          : "rounded-full border-cyan-100/[0.15] bg-cyan-300/[0.035]"
      }`}
      aria-label={`${mode === "permutation" ? "Sequence" : "Selection"} ${tokenIds.join(", ")}`}
    >
      {tokenIds.map((tokenId, index) => {
        const token = COUNTING_TOKENS.find(
          (candidate) => candidate.id === tokenId
        );
        if (!token) return null;
        return (
          <div key={tokenId} className="flex items-center gap-1">
            {mode === "permutation" ? (
              <span className="font-mono text-[10px] text-stone-600">
                {index + 1}
              </span>
            ) : null}
            <CountingTokenMark token={token} size="sm" />
          </div>
        );
      })}
    </div>
  );
}
