"use client";

import { useState } from "react";
import { CloudRain, Droplets, Gauge, Waves } from "lucide-react";
import {
  TEACHING_WATER_BUDGET,
  getStorageChange,
} from "./earthScienceModel";

export default function EarthSystemLedger() {
  const [precipitation, setPrecipitation] = useState(
    TEACHING_WATER_BUDGET.precipitation,
  );
  const [evapotranspiration, setEvapotranspiration] = useState(
    TEACHING_WATER_BUDGET.evapotranspiration,
  );
  const [runoff, setRunoff] = useState(TEACHING_WATER_BUDGET.runoff);
  const storageChange = getStorageChange({
    precipitation,
    evapotranspiration,
    runoff,
  });
  const maximumFlux = Math.max(1, precipitation, evapotranspiration, runoff);

  return (
    <div className="overflow-hidden rounded-[30px] border border-sky-100/[0.12] bg-[#031017]/58 backdrop-blur-2xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-sky-100/60">
            <Gauge size={14} aria-hidden="true" /> Worked coupling · watershed
            boundary
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">
            A system budget becomes intelligible when every flux has a direction
            and interval.
          </h2>
        </div>
        <p className="text-[14px] leading-6 text-slate-400">
          This normalized ledger is a teaching model, not a measured basin. It
          closes only the three stated terms: precipitation input,
          evapotranspiration output, and runoff output.
        </p>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1.08fr)_360px]">
        <div className="border-b border-white/[0.07] p-5 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="grid gap-3 sm:grid-cols-3">
            <FluxColumn
              icon={CloudRain}
              label="Precipitation"
              direction="input"
              value={precipitation}
              maximum={maximumFlux}
              tone="sky"
            />
            <FluxColumn
              icon={Droplets}
              label="Evapotranspiration"
              direction="output"
              value={evapotranspiration}
              maximum={maximumFlux}
              tone="emerald"
            />
            <FluxColumn
              icon={Waves}
              label="Runoff"
              direction="output"
              value={runoff}
              maximum={maximumFlux}
              tone="cyan"
            />
          </div>

          <div className="mt-4 grid gap-3 border-y border-white/[0.07] bg-black/[0.08] px-4 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
                ΔS = P − ET − Q
              </div>
              <div className="mt-2 font-mono text-[15px] text-slate-300">
                {precipitation} − {evapotranspiration} − {runoff} ={" "}
                <strong
                  className={
                    storageChange > 0
                      ? "text-emerald-200"
                      : storageChange < 0
                        ? "text-amber-200"
                        : "text-sky-100"
                  }
                >
                  {storageChange > 0 ? "+" : ""}
                  {storageChange} mm
                </strong>
              </div>
            </div>
            <div className="min-w-[190px] text-left md:text-right">
              <strong className="text-[15px] text-white">
                {storageChange > 0
                  ? "Storage increases"
                  : storageChange < 0
                    ? "Storage decreases"
                    : "Budget balances"}
              </strong>
              <span className="mt-1 block text-[12px] leading-5 text-slate-500">
                over the stated model interval
              </span>
            </div>
          </div>

          <p className="mt-4 text-[13px] leading-6 text-slate-500">
            A real water budget may also resolve groundwater exchange, snow and
            ice, imported or exported water, measurement uncertainty, changing
            boundaries, and storage in soil, aquifers, lakes, organisms, and
            infrastructure.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-100/58">
            Change one flux
          </div>
          <p className="mt-2 text-[13px] leading-6 text-slate-400">
            Keep the interval and watershed boundary fixed. Watch the residual,
            then ask which unmodeled reservoir would actually store or supply
            that water.
          </p>
          <div className="mt-5 grid gap-3">
            <FluxControl
              label="Precipitation input"
              value={precipitation}
              onChange={setPrecipitation}
              tone="sky"
            />
            <FluxControl
              label="Evapotranspiration output"
              value={evapotranspiration}
              onChange={setEvapotranspiration}
              tone="emerald"
            />
            <FluxControl
              label="Runoff output"
              value={runoff}
              onChange={setRunoff}
              tone="cyan"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setPrecipitation(TEACHING_WATER_BUDGET.precipitation);
              setEvapotranspiration(TEACHING_WATER_BUDGET.evapotranspiration);
              setRunoff(TEACHING_WATER_BUDGET.runoff);
            }}
            className="mt-4 w-full rounded-full border border-white/[0.10] bg-black/20 px-4 py-2.5 text-[12px] font-semibold text-slate-300 transition hover:border-sky-100/28 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
          >
            Restore 120 / 45 / 55 case
          </button>
        </div>
      </div>
    </div>
  );
}

type Tone = "sky" | "emerald" | "cyan";

const TONE_CLASSES: Record<Tone, { border: string; text: string; fill: string }> = {
  sky: {
    border: "border-sky-200/18",
    text: "text-sky-100",
    fill: "bg-sky-300/58",
  },
  emerald: {
    border: "border-emerald-200/18",
    text: "text-emerald-100",
    fill: "bg-emerald-300/58",
  },
  cyan: {
    border: "border-cyan-200/18",
    text: "text-cyan-100",
    fill: "bg-cyan-300/58",
  },
};

function FluxColumn({
  icon: Icon,
  label,
  direction,
  value,
  maximum,
  tone,
}: {
  icon: typeof CloudRain;
  label: string;
  direction: "input" | "output";
  value: number;
  maximum: number;
  tone: Tone;
}) {
  const classes = TONE_CLASSES[tone];
  const height = Math.max(6, Math.round((value / maximum) * 100));

  return (
    <div className={`min-h-[250px] border bg-black/[0.08] p-4 ${classes.border}`}>
      <div className="flex items-center justify-between gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-black/20 ${classes.text}`}
        >
          <Icon size={15} aria-hidden="true" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-slate-600">
          {direction}
        </span>
      </div>
      <strong className="mt-4 block text-[14px] text-white/86">{label}</strong>
      <div className="mt-4 flex h-[112px] items-end border-b border-white/[0.08]">
        <div
          className={`w-full transition-[height] duration-300 ${classes.fill}`}
          style={{ height: `${height}%` }}
        />
      </div>
      <span className={`mt-3 block font-mono text-[22px] ${classes.text}`}>
        {value} mm
      </span>
    </div>
  );
}

function FluxControl({
  label,
  value,
  onChange,
  tone,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  tone: Tone;
}) {
  const classes = TONE_CLASSES[tone];

  return (
    <label className={`block rounded-[15px] border bg-black/[0.12] p-3 ${classes.border}`}>
      <span className="flex items-center justify-between gap-3 text-[12px] text-slate-300">
        <span>{label}</span>
        <strong className={`font-mono ${classes.text}`}>{value} mm</strong>
      </span>
      <input
        type="range"
        min="0"
        max="160"
        step="5"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-sky-400"
      />
    </label>
  );
}
