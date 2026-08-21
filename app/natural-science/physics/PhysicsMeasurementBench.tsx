"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Workflow } from "lucide-react";
import { calculateMotionObservation } from "./physicsModel";

const TRACK_MIN = -10;
const TRACK_MAX = 10;

export default function PhysicsMeasurementBench() {
  const [startM, setStartM] = useState(-4);
  const [endM, setEndM] = useState(8);
  const [durationS, setDurationS] = useState(3);
  const result = useMemo(
    () => calculateMotionObservation(startM, endM, durationS),
    [durationS, endM, startM]
  );
  const startPercent = toTrackPercent(startM);
  const endPercent = toTrackPercent(endM);
  const arrowLeft = Math.min(startPercent, endPercent);
  const arrowWidth = Math.abs(endPercent - startPercent);

  return (
    <section className="bg-[#0b1117]/48 overflow-hidden border-y border-orange-100/[0.12] backdrop-blur-xl">
      <div className="grid xl:grid-cols-[420px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.07] p-5 sm:p-7 xl:border-b-0 xl:border-r">
          <div className="text-orange-200/68 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
            <Workflow size={14} aria-hidden="true" /> Measurement bench · one
            segment
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.3vw,3.1rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            A number becomes physical when its reference, interval, direction,
            and unit stay attached.
          </h2>
          <p className="mt-4 text-[13px] leading-6 text-slate-400">
            Set two positions and an elapsed time. This deliberately simple
            instrument separates position from displacement and speed from
            velocity before a more complicated model adds forces or a curved
            path.
          </p>
        </div>

        <div className="p-5 sm:p-7">
          <div className="relative h-[150px] rounded-[22px] border border-white/[0.08] bg-black/[0.16] px-6 pt-12">
            <div className="bg-sky-100/18 absolute left-6 right-6 top-[78px] h-px" />
            <div
              className="border-orange-200/42 bg-orange-300/18 absolute top-[72px] h-[13px] border-x"
              style={{
                left: `calc(1.5rem + (100% - 3rem) * ${arrowLeft / 100})`,
                width: `calc((100% - 3rem) * ${arrowWidth / 100})`,
              }}
              aria-hidden="true"
            />
            {Array.from({ length: 11 }, (_, index) => {
              const value = TRACK_MIN + index * 2;
              return (
                <span
                  key={value}
                  className="bg-sky-100/24 absolute top-[73px] h-3 w-px"
                  style={{
                    left: `calc(1.5rem + (100% - 3rem) * ${
                      toTrackPercent(value) / 100
                    })`,
                  }}
                >
                  <span className="absolute left-1/2 top-4 -translate-x-1/2 font-mono text-[10px] text-slate-600">
                    {value}
                  </span>
                </span>
              );
            })}
            <TrackMarker
              label="start"
              value={startM}
              percent={startPercent}
              colorClass="bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.48)]"
              offsetClass="-translate-y-[31px]"
            />
            <TrackMarker
              label="end"
              value={endM}
              percent={endPercent}
              colorClass="bg-orange-300 shadow-[0_0_18px_rgba(253,186,116,0.48)]"
              offsetClass="translate-y-[27px]"
            />
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <Slider
              label="Initial position x₀"
              value={startM}
              unit="m"
              min={TRACK_MIN}
              max={TRACK_MAX}
              onChange={setStartM}
            />
            <Slider
              label="Final position x₁"
              value={endM}
              unit="m"
              min={TRACK_MIN}
              max={TRACK_MAX}
              onChange={setEndM}
            />
            <Slider
              label="Elapsed time Δt"
              value={durationS}
              unit="s"
              min={1}
              max={10}
              onChange={setDurationS}
            />
          </div>

          <div className="mt-5 grid gap-px overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            <Readout
              label="Displacement Δx"
              value={`${format(result.displacementM)} m`}
              note="final minus initial; signed"
            />
            <Readout
              label="Distance"
              value={`${format(result.distanceM)} m`}
              note="path length for this segment"
            />
            <Readout
              label="Average velocity"
              value={`${format(result.averageVelocityMps)} m/s`}
              note="Δx divided by Δt"
            />
            <Readout
              label="Average speed"
              value={`${format(result.averageSpeedMps)} m/s`}
              note="distance divided by Δt"
            />
          </div>
          <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-slate-500">
            <ArrowLeftRight
              size={14}
              className="text-orange-200/56 mt-0.5 shrink-0"
              aria-hidden="true"
            />
            Reverse the endpoints. Distance and speed remain nonnegative, while
            displacement and velocity change sign because the coordinate
            direction is part of the report.
          </p>
        </div>
      </div>
    </section>
  );
}

function TrackMarker({
  label,
  value,
  percent,
  colorClass,
  offsetClass,
}: {
  label: string;
  value: number;
  percent: number;
  colorClass: string;
  offsetClass: string;
}) {
  return (
    <span
      className={`absolute top-[73px] -translate-x-1/2 ${offsetClass}`}
      style={{ left: `calc(1.5rem + (100% - 3rem) * ${percent / 100})` }}
    >
      <span className={`block h-3 w-3 rotate-45 ${colorClass}`} />
      <span className="absolute left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400">
        {label} {value} m
      </span>
    </span>
  );
}

function Slider({
  label,
  value,
  unit,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="rounded-[16px] border border-white/[0.08] bg-black/[0.10] p-4">
      <span className="flex items-center justify-between gap-3 text-[12px] text-slate-400">
        <span>{label}</span>
        <strong className="font-mono text-orange-100">
          {value} {unit}
        </strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 w-full accent-orange-300"
      />
      <span className="mt-2 flex justify-between font-mono text-[10px] text-slate-700">
        <span>{min}</span>
        <span>{max}</span>
      </span>
    </label>
  );
}

function Readout({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="bg-[#081018]/96 p-4">
      <div className="text-sky-200/54 font-mono text-[10px] font-semibold uppercase tracking-[0.09em]">
        {label}
      </div>
      <div className="mt-2 text-[21px] font-semibold tracking-[-0.025em] text-white">
        {value}
      </div>
      <div className="mt-1 text-[11px] leading-4 text-slate-600">{note}</div>
    </div>
  );
}

function toTrackPercent(value: number) {
  return ((value - TRACK_MIN) / (TRACK_MAX - TRACK_MIN)) * 100;
}

function format(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
