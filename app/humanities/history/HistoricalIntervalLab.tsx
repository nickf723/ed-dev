"use client";

import { useState } from "react";
import { CalendarRange, RotateCcw } from "lucide-react";
import {
  CAESAR_AUGUSTUS_INTERVAL,
  formatHistoricalDate,
  historicalYearDistance,
  toAstronomicalYear,
  type HistoricalDate,
} from "./historyModel";

const PRESETS = [
  {
    id: "boundary",
    label: "44 BCE → 14 CE",
    start: CAESAR_AUGUSTUS_INTERVAL.start,
    end: CAESAR_AUGUSTUS_INTERVAL.end,
  },
  {
    id: "bce",
    label: "500 BCE → 323 BCE",
    start: { year: 500, era: "BCE" },
    end: { year: 323, era: "BCE" },
  },
  {
    id: "ce",
    label: "1453 CE → 1789 CE",
    start: { year: 1453, era: "CE" },
    end: { year: 1789, era: "CE" },
  },
] as const satisfies readonly {
  id: string;
  label: string;
  start: HistoricalDate;
  end: HistoricalDate;
}[];

export default function HistoricalIntervalLab() {
  const [start, setStart] = useState<HistoricalDate>({
    ...CAESAR_AUGUSTUS_INTERVAL.start,
  });
  const [end, setEnd] = useState<HistoricalDate>({
    ...CAESAR_AUGUSTUS_INTERVAL.end,
  });
  const distance = historicalYearDistance(start, end);
  const crossesBoundary = start.era !== end.era;

  function reset() {
    setStart({ ...CAESAR_AUGUSTUS_INTERVAL.start });
    setEnd({ ...CAESAR_AUGUSTUS_INTERVAL.end });
  }

  return (
    <section className="bg-[#130d07]/58 overflow-hidden rounded-[30px] border border-amber-100/[0.13] backdrop-blur-2xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-5 sm:p-7">
          <div className="text-amber-100/58 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
            <CalendarRange size={14} aria-hidden="true" /> Chronology instrument
            · elapsed years
          </div>
          <h2 className="mt-2 max-w-4xl font-serif text-[clamp(2rem,3.8vw,3.65rem)] leading-[0.98] tracking-[-0.045em] text-[#fff8e7]">
            A timeline is quantitative, but its dating convention still matters.
          </h2>
          <p className="text-stone-400/82 mt-4 max-w-3xl text-[13px] leading-6">
            Choose two historical dates. The instrument converts BCE dates to
            astronomical year numbering for the arithmetic, then reports the
            result in the familiar BCE/CE convention. This avoids accidentally
            inserting a year zero.
          </p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.08] p-5 lg:border-l lg:border-t-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.09em] text-stone-600">
            Model boundary
          </div>
          <p className="mt-2 text-[11px] leading-5 text-stone-500">
            This calculates distance between labeled years. Exact elapsed time
            can require months, days, calendar systems, uncertain dates, date
            ranges, and decisions about inclusive counting.
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-stone-500">
            Fixed practice files
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setStart({ ...preset.start });
                  setEnd({ ...preset.end });
                }}
                className="hover:border-amber-200/28 rounded-full border border-white/[0.08] bg-black/10 px-3 py-2 font-mono text-[11px] text-stone-400 transition hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <DateControl
              label="First dated point"
              value={start}
              onChange={setStart}
            />
            <DateControl
              label="Second dated point"
              value={end}
              onChange={setEnd}
            />
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-stone-500 transition hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset canonical interval
          </button>
        </div>

        <div className="border border-white/[0.08] bg-black/[0.10] p-5 sm:p-6">
          <div className="text-emerald-100/48 font-mono text-[10px] font-semibold uppercase tracking-[0.10em]">
            Conversion ledger
          </div>
          <div className="mt-4 grid gap-px overflow-hidden border border-white/[0.06] bg-white/[0.055] sm:grid-cols-2">
            <LedgerCell
              label={formatHistoricalDate(start)}
              value={`astronomical ${toAstronomicalYear(start)}`}
            />
            <LedgerCell
              label={formatHistoricalDate(end)}
              value={`astronomical ${toAstronomicalYear(end)}`}
            />
          </div>
          <div className="border-amber-200/32 mt-6 border-l-2 pl-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-stone-600">
              Absolute difference
            </span>
            <strong className="mt-2 block font-serif text-[clamp(2.8rem,6vw,5.4rem)] leading-none text-amber-100">
              {distance.toLocaleString("en-US")}
            </strong>
            <span className="mt-2 block text-[12px] text-stone-400">
              years between the dated points
            </span>
          </div>
          <p className="mt-5 text-[11px] leading-5 text-stone-500">
            {crossesBoundary
              ? "The interval crosses BCE/CE, so the conversion removes the nonexistent year zero before subtraction."
              : "Both dates use the same era label; ordering still matters for a narrative, but absolute distance is symmetric."}
          </p>
        </div>
      </div>
    </section>
  );
}

function DateControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: HistoricalDate;
  onChange: (date: HistoricalDate) => void;
}) {
  return (
    <fieldset className="border border-white/[0.08] bg-black/[0.07] p-4">
      <legend className="px-1 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-stone-500">
        {label}
      </legend>
      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_92px] gap-2">
        <input
          aria-label={`${label} year`}
          type="number"
          min="1"
          max="300000"
          value={value.year}
          onChange={(event) =>
            onChange({
              ...value,
              year: Math.max(
                1,
                Math.min(300000, Math.trunc(Number(event.target.value) || 1))
              ),
            })
          }
          className="focus:border-amber-200/36 min-w-0 border border-white/[0.09] bg-black/20 px-3 py-2 font-mono text-[13px] text-amber-50 outline-none"
        />
        <select
          aria-label={`${label} era`}
          value={value.era}
          onChange={(event) =>
            onChange({
              ...value,
              era: event.target.value as HistoricalDate["era"],
            })
          }
          className="focus:border-amber-200/36 border border-white/[0.09] bg-[#130d07] px-3 py-2 font-mono text-[12px] text-amber-50 outline-none"
        >
          <option value="BCE">BCE</option>
          <option value="CE">CE</option>
        </select>
      </div>
    </fieldset>
  );
}

function LedgerCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#100b07] px-4 py-3">
      <span className="block text-[11px] text-stone-400">{label}</span>
      <strong className="text-emerald-100/58 mt-1 block font-mono text-[11px]">
        {value}
      </strong>
    </div>
  );
}
