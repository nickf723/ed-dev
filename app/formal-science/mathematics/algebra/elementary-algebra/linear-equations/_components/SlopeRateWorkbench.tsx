"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import {
  ArrowLeftRight,
  Gauge,
  MoveHorizontal,
  MoveVertical,
  RotateCcw,
  Sigma,
} from "lucide-react";
import { Surface, useWorldDirector } from "@/app/_page-system/scene";

type SlopeScene = "positive" | "negative" | "zero" | "vertical";

type Preset = {
  rise: number;
  run: number;
  intercept: number;
  startX: number;
  verticalX: number;
};

type Point = { x: number; y: number };

const PRESETS: Record<SlopeScene, Preset> = {
  positive: { rise: 2, run: 1, intercept: 1, startX: -2, verticalX: 2 },
  negative: { rise: -3, run: 2, intercept: 2, startX: -2, verticalX: 2 },
  zero: { rise: 0, run: 3, intercept: 2, startX: -2, verticalX: 2 },
  vertical: { rise: 4, run: 0, intercept: 0, startX: 2, verticalX: 2 },
};

const GRAPH_MIN = -7;
const GRAPH_MAX = 7;
const GRAPH_SIZE = 560;
const GRAPH_PADDING = 28;
const GRAPH_SPAN = GRAPH_SIZE - GRAPH_PADDING * 2;

export default function SlopeRateWorkbench() {
  const director = useWorldDirector();
  const skipPresetRef = useRef(false);
  const [rise, setRise] = useState(PRESETS.positive.rise);
  const [run, setRun] = useState(PRESETS.positive.run);
  const [intercept, setIntercept] = useState(PRESETS.positive.intercept);
  const [startX, setStartX] = useState(PRESETS.positive.startX);
  const [verticalX, setVerticalX] = useState(PRESETS.vertical.verticalX);
  const [vertical, setVertical] = useState(false);
  const [reversed, setReversed] = useState(false);

  const scene = sceneFromModel(vertical, rise);
  const slope = vertical ? null : rise / run;
  const baseA: Point = vertical
    ? { x: verticalX, y: -2 }
    : { x: startX, y: (slope ?? 0) * startX + intercept };
  const baseB: Point = vertical
    ? { x: verticalX, y: 2 }
    : { x: startX + run, y: (slope ?? 0) * (startX + run) + intercept };
  const first = reversed ? baseB : baseA;
  const second = reversed ? baseA : baseB;
  const deltaX = second.x - first.x;
  const deltaY = second.y - first.y;
  const slopeLabel = vertical
    ? "undefined"
    : fractionLabel(reversed ? -rise : rise, reversed ? -run : run);

  useEffect(() => {
    const pinned = asSlopeScene(director.pinnedScene);
    if (!pinned) return;
    if (skipPresetRef.current) {
      skipPresetRef.current = false;
      return;
    }
    applyPreset(pinned);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [director.pinnedScene]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("slope-world:update", {
        detail: {
          scene,
          rise,
          run: vertical ? 0 : run,
          intercept,
          verticalX,
        },
      }),
    );
  }, [intercept, rise, run, scene, vertical, verticalX]);

  const meaning = useMemo(() => {
    if (vertical) {
      return "The run is zero. Because Δx = 0, the ratio Δy / Δx would divide by zero, so a vertical line has undefined slope.";
    }
    if (rise === 0) {
      return `For every ${run} ${run === 1 ? "unit" : "units"} of horizontal change, y changes by 0. The line is horizontal.`;
    }
    const direction = rise > 0 ? "increases" : "decreases";
    return `For every ${run} ${run === 1 ? "unit" : "units"} x moves right, y ${direction} by ${Math.abs(rise)}.`;
  }, [rise, run, vertical]);

  function syncScene(next: SlopeScene) {
    if (director.pinnedScene === next) return;
    skipPresetRef.current = true;
    director.pinScene(next);
  }

  function applyPreset(next: SlopeScene) {
    const preset = PRESETS[next];
    setRise(preset.rise);
    setRun(Math.max(1, preset.run));
    setIntercept(preset.intercept);
    setStartX(preset.startX);
    setVerticalX(preset.verticalX);
    setVertical(next === "vertical");
    setReversed(false);
  }

  function changeRise(value: number) {
    setRise(value);
    setVertical(false);
    syncScene(sceneFromModel(false, value));
  }

  function changeRun(value: number) {
    setRun(Math.max(1, value));
    setVertical(false);
    syncScene(sceneFromModel(false, rise));
  }

  function resetCurrent() {
    applyPreset(scene);
    syncScene(scene);
  }

  return (
    <div className="grid h-full gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
      <Surface variant="ghost" className="overflow-hidden rounded-[24px]">
        <div className="flex flex-col gap-2 border-b border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-teal-200/72">
              <Gauge size={14} /> Constant-rate field
            </div>
            <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.035em] text-white">
              {vertical ? `x = ${verticalX}` : `y = ${formatNumber(slope ?? 0)}x ${signed(intercept)}`}
            </h3>
          </div>
          <span
            className="rounded-full border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{
              color: `rgb(${sceneRgb(scene)})`,
              borderColor: `rgba(${sceneRgb(scene)},0.24)`,
              background: `rgba(${sceneRgb(scene)},0.045)`,
            }}
          >
            {sceneLabel(scene)}
          </span>
        </div>

        <SlopeGraph
          vertical={vertical}
          verticalX={verticalX}
          slope={slope ?? 0}
          intercept={intercept}
          first={first}
          second={second}
          scene={scene}
        />

        <div className="grid gap-2 p-3 sm:grid-cols-4">
          <Readout
            label="Change in y"
            value={`Δy = ${formatNumber(deltaY)}`}
            rgb="244,114,182"
          />
          <Readout
            label="Change in x"
            value={`Δx = ${formatNumber(deltaX)}`}
            rgb="250,204,21"
          />
          <Readout
            label="Slope"
            value={vertical ? "undefined" : `m = ${slopeLabel}`}
            rgb={sceneRgb(scene)}
          />
          <Readout
            label="Point order"
            value={reversed ? "B → A" : "A → B"}
            rgb="148,163,184"
          />
        </div>
      </Surface>

      <Surface variant="glass" className="rounded-[24px] p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/72">
            <Sigma size={14} /> Measurement controls
          </div>
          <button
            type="button"
            onClick={resetCurrent}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/[0.08] px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 transition hover:text-white"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
        <p className="mt-2 text-[12px] leading-5 text-slate-400/74">
          Change the rate, slide the measurement triangle, or reverse the points. The graph, ratio, and background use the same state.
        </p>

        {!vertical ? (
          <div className="mt-4 space-y-3">
            <RangeControl
              icon={MoveVertical}
              label="Rise"
              value={rise}
              minimum={-4}
              maximum={4}
              onChange={changeRise}
              accent="pink"
            />
            <SegmentControl
              icon={MoveHorizontal}
              label="Run"
              options={[1, 2, 3, 4]}
              value={run}
              onChange={changeRun}
            />
            <RangeControl
              icon={MoveVertical}
              label="Starting value b"
              value={intercept}
              minimum={-3}
              maximum={3}
              onChange={setIntercept}
              accent="teal"
            />
            <RangeControl
              icon={MoveHorizontal}
              label="Triangle starts at x"
              value={startX}
              minimum={-3}
              maximum={1}
              onChange={setStartX}
              accent="amber"
            />
          </div>
        ) : (
          <div className="mt-4">
            <RangeControl
              icon={MoveHorizontal}
              label="Vertical line x-value"
              value={verticalX}
              minimum={-3}
              maximum={3}
              onChange={setVerticalX}
              accent="amber"
            />
            <div className="mt-3 rounded-[15px] border border-amber-200/[0.12] bg-amber-300/[0.035] p-3 text-[12px] leading-5 text-slate-300/74">
              Both selected points share the same x-coordinate. The graph has rise, but no horizontal run.
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setReversed((value) => !value)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-[13px] border border-indigo-200/[0.12] bg-indigo-300/[0.025] px-3 py-2.5 text-[12px] font-semibold text-indigo-100/78 transition hover:bg-indigo-300/[0.055]"
        >
          <ArrowLeftRight size={14} /> Reverse A and B
        </button>

        <div className="mt-3 rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-teal-200/64">
            Read the rate
          </div>
          <p className="mt-2 text-[13px] leading-5 text-slate-300/76">{meaning}</p>
        </div>
      </Surface>
    </div>
  );
}

function SlopeGraph({
  vertical,
  verticalX,
  slope,
  intercept,
  first,
  second,
  scene,
}: {
  vertical: boolean;
  verticalX: number;
  slope: number;
  intercept: number;
  first: Point;
  second: Point;
  scene: SlopeScene;
}) {
  const color = sceneRgb(scene);
  const x1 = GRAPH_MIN;
  const x2 = GRAPH_MAX;
  const y1 = slope * x1 + intercept;
  const y2 = slope * x2 + intercept;
  const horizontalEnd = { x: second.x, y: first.y };
  const ghostA = vertical
    ? { x: verticalX, y: -4 }
    : { x: clamp(first.x + 2, -4, 2), y: 0 };
  if (!vertical) ghostA.y = slope * ghostA.x + intercept;
  const ghostB = vertical
    ? { x: verticalX, y: 0 }
    : { x: ghostA.x + Math.abs(second.x - first.x), y: 0 };
  if (!vertical) ghostB.y = slope * ghostB.x + intercept;

  return (
    <div className="relative h-[318px] overflow-hidden border-b border-white/[0.08] bg-[#020b13]/88 2xl:h-[334px]">
      <svg
        viewBox={`0 0 ${GRAPH_SIZE} ${GRAPH_SIZE}`}
        className="h-full w-full"
        role="img"
        aria-label={
          vertical
            ? `Vertical line x equals ${verticalX} with undefined slope`
            : `Line with slope ${formatNumber(slope)} and intercept ${intercept}`
        }
      >
        <defs>
          <clipPath id="slope-graph-clip">
            <rect
              x={GRAPH_PADDING}
              y={GRAPH_PADDING}
              width={GRAPH_SPAN}
              height={GRAPH_SPAN}
              rx="18"
            />
          </clipPath>
          <filter id="slope-line-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x={GRAPH_PADDING}
          y={GRAPH_PADDING}
          width={GRAPH_SPAN}
          height={GRAPH_SPAN}
          rx="18"
          fill="rgba(2,8,18,0.72)"
          stroke="rgba(255,255,255,0.07)"
        />

        <g clipPath="url(#slope-graph-clip)">
          {Array.from({ length: GRAPH_MAX - GRAPH_MIN + 1 }, (_, index) => {
            const coordinate = GRAPH_MIN + index;
            return (
              <g key={coordinate}>
                <line
                  x1={xFor(coordinate)}
                  y1={GRAPH_PADDING}
                  x2={xFor(coordinate)}
                  y2={GRAPH_SIZE - GRAPH_PADDING}
                  stroke="rgba(94,234,212,0.08)"
                  strokeWidth="1"
                />
                <line
                  x1={GRAPH_PADDING}
                  y1={yFor(coordinate)}
                  x2={GRAPH_SIZE - GRAPH_PADDING}
                  y2={yFor(coordinate)}
                  stroke="rgba(125,211,252,0.07)"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          <line
            x1={GRAPH_PADDING}
            y1={yFor(0)}
            x2={GRAPH_SIZE - GRAPH_PADDING}
            y2={yFor(0)}
            stroke="rgba(226,232,240,0.42)"
            strokeWidth="1.5"
          />
          <line
            x1={xFor(0)}
            y1={GRAPH_PADDING}
            x2={xFor(0)}
            y2={GRAPH_SIZE - GRAPH_PADDING}
            stroke="rgba(226,232,240,0.42)"
            strokeWidth="1.5"
          />

          {vertical ? (
            <line
              x1={xFor(verticalX)}
              y1={GRAPH_PADDING - 20}
              x2={xFor(verticalX)}
              y2={GRAPH_SIZE - GRAPH_PADDING + 20}
              stroke={`rgb(${color})`}
              strokeWidth="4"
              filter="url(#slope-line-glow)"
            />
          ) : (
            <line
              x1={xFor(x1)}
              y1={yFor(y1)}
              x2={xFor(x2)}
              y2={yFor(y2)}
              stroke={`rgb(${color})`}
              strokeWidth="4"
              filter="url(#slope-line-glow)"
            />
          )}

          {!vertical ? (
            <g opacity="0.28">
              <line
                x1={xFor(ghostA.x)}
                y1={yFor(ghostA.y)}
                x2={xFor(ghostB.x)}
                y2={yFor(ghostA.y)}
                stroke="rgb(250,204,21)"
                strokeWidth="3"
                strokeDasharray="7 8"
              />
              <line
                x1={xFor(ghostB.x)}
                y1={yFor(ghostA.y)}
                x2={xFor(ghostB.x)}
                y2={yFor(ghostB.y)}
                stroke="rgb(244,114,182)"
                strokeWidth="3"
                strokeDasharray="7 8"
              />
            </g>
          ) : null}

          <line
            x1={xFor(first.x)}
            y1={yFor(first.y)}
            x2={xFor(horizontalEnd.x)}
            y2={yFor(horizontalEnd.y)}
            stroke="rgb(250,204,21)"
            strokeWidth="4"
            strokeDasharray="8 7"
          />
          <line
            x1={xFor(horizontalEnd.x)}
            y1={yFor(horizontalEnd.y)}
            x2={xFor(second.x)}
            y2={yFor(second.y)}
            stroke="rgb(244,114,182)"
            strokeWidth="4"
            strokeDasharray="8 7"
          />

          <PointMarker point={first} label="A" rgb="241,245,249" />
          <PointMarker point={second} label="B" rgb={color} />
        </g>

        <text
          x={(xFor(first.x) + xFor(horizontalEnd.x)) / 2}
          y={yFor(first.y) - 12}
          textAnchor="middle"
          fill="rgb(250,204,21)"
          fontSize="12"
          fontWeight="700"
        >
          Δx = {formatNumber(second.x - first.x)}
        </text>
        <text
          x={xFor(second.x) + 12}
          y={(yFor(first.y) + yFor(second.y)) / 2}
          fill="rgb(244,114,182)"
          fontSize="12"
          fontWeight="700"
        >
          Δy = {formatNumber(second.y - first.y)}
        </text>

        <text
          x={GRAPH_SIZE - GRAPH_PADDING - 6}
          y={yFor(0) - 8}
          textAnchor="end"
          fill="rgba(226,232,240,0.48)"
          fontSize="12"
        >
          x
        </text>
        <text
          x={xFor(0) + 9}
          y={GRAPH_PADDING + 16}
          fill="rgba(226,232,240,0.48)"
          fontSize="12"
        >
          y
        </text>
      </svg>
    </div>
  );
}

function PointMarker({ point, label, rgb }: { point: Point; label: string; rgb: string }) {
  return (
    <g>
      <circle
        cx={xFor(point.x)}
        cy={yFor(point.y)}
        r="8"
        fill={`rgb(${rgb})`}
        stroke="rgba(2,6,16,0.94)"
        strokeWidth="3"
      />
      <text
        x={xFor(point.x) + 12}
        y={yFor(point.y) - 11}
        fill="rgba(241,245,249,0.88)"
        fontSize="12"
        fontWeight="700"
      >
        {label} ({formatNumber(point.x)}, {formatNumber(point.y)})
      </text>
    </g>
  );
}

function RangeControl({
  icon: Icon,
  label,
  value,
  minimum,
  maximum,
  onChange,
  accent,
}: {
  icon: typeof MoveVertical;
  label: string;
  value: number;
  minimum: number;
  maximum: number;
  onChange: (value: number) => void;
  accent: "teal" | "pink" | "amber";
}) {
  return (
    <label className="block rounded-[14px] border border-white/[0.08] bg-black/[0.17] p-3">
      <span className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[12px] font-medium text-slate-300">
          <Icon size={14} className="text-slate-500" /> {label}
        </span>
        <strong className="font-mono text-[13px] text-white">{value}</strong>
      </span>
      <input
        type="range"
        min={minimum}
        max={maximum}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(Number(event.target.value))
        }
        className={`mt-3 w-full ${
          accent === "pink"
            ? "accent-pink-400"
            : accent === "amber"
              ? "accent-amber-400"
              : "accent-teal-400"
        }`}
      />
    </label>
  );
}

function SegmentControl({
  icon: Icon,
  label,
  options,
  value,
  onChange,
}: {
  icon: typeof MoveHorizontal;
  label: string;
  options: number[];
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-[14px] border border-white/[0.08] bg-black/[0.17] p-3">
      <div className="flex items-center gap-2 text-[12px] font-medium text-slate-300">
        <Icon size={14} className="text-amber-200/60" /> {label}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-[36px] rounded-[9px] border text-[12px] font-semibold transition ${
              value === option
                ? "border-amber-200/[0.30] bg-amber-300/[0.08] text-amber-100"
                : "border-white/[0.07] bg-white/[0.018] text-slate-500 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Readout({
  label,
  value,
  rgb,
}: {
  label: string;
  value: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[13px] border border-white/[0.08] bg-black/[0.16] p-3">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
        {label}
      </div>
      <div
        className="mt-1.5 text-[14px] font-semibold"
        style={{ color: `rgb(${rgb})` }}
      >
        {value}
      </div>
    </div>
  );
}

function sceneFromModel(vertical: boolean, rise: number): SlopeScene {
  if (vertical) return "vertical";
  if (rise > 0) return "positive";
  if (rise < 0) return "negative";
  return "zero";
}

function asSlopeScene(value: string | null): SlopeScene | null {
  return value === "positive" ||
    value === "negative" ||
    value === "zero" ||
    value === "vertical"
    ? value
    : null;
}

function sceneRgb(scene: SlopeScene) {
  if (scene === "negative") return "244,114,182";
  if (scene === "zero") return "96,165,250";
  if (scene === "vertical") return "250,204,21";
  return "45,212,191";
}

function sceneLabel(scene: SlopeScene) {
  if (scene === "negative") return "negative slope";
  if (scene === "zero") return "zero slope";
  if (scene === "vertical") return "undefined slope";
  return "positive slope";
}

function xFor(value: number) {
  return (
    GRAPH_PADDING +
    ((value - GRAPH_MIN) / (GRAPH_MAX - GRAPH_MIN)) * GRAPH_SPAN
  );
}

function yFor(value: number) {
  return (
    GRAPH_SIZE -
    GRAPH_PADDING -
    ((value - GRAPH_MIN) / (GRAPH_MAX - GRAPH_MIN)) * GRAPH_SPAN
  );
}

function fractionLabel(numerator: number, denominator: number) {
  if (denominator === 0) return "undefined";
  if (numerator === 0) return "0";
  let topValue = numerator;
  let bottomValue = denominator;
  if (bottomValue < 0) {
    topValue *= -1;
    bottomValue *= -1;
  }
  const divisor = gcd(Math.abs(topValue), Math.abs(bottomValue));
  const top = topValue / divisor;
  const bottom = bottomValue / divisor;
  if (bottom === 1) return String(top);
  return `${top}/${bottom}`;
}

function gcd(a: number, b: number): number {
  let first = Math.max(1, Math.round(a));
  let second = Math.max(1, Math.round(b));
  while (second !== 0) {
    const remainder = first % second;
    first = second;
    second = remainder;
  }
  return first;
}

function formatNumber(value: number) {
  if (Math.abs(value) < 0.005) return "0";
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(2)));
}

function signed(value: number) {
  if (value === 0) return "+ 0";
  return value > 0 ? `+ ${value}` : `− ${Math.abs(value)}`;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}
