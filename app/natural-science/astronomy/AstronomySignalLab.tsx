"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  CircleDashed,
  Eye,
  Orbit,
  Radio,
  Satellite,
  Sigma,
  Sparkles,
  Telescope,
  Waves,
  type LucideIcon,
} from "lucide-react";

type SignalId = "visible" | "radio" | "xray" | "gravity";

type SignalDefinition = {
  id: SignalId;
  label: string;
  icon: LucideIcon;
  accentRgb: string;
  source: string;
  sourceDetail: string;
  journey: string;
  detector: string;
  reveals: string[];
  atmosphere: string;
  transmission: number;
  amplitude: number;
  cycles: number;
  detectorInSpace?: boolean;
};

const SIGNALS: SignalDefinition[] = [
  {
    id: "visible",
    label: "Visible light",
    icon: Eye,
    accentRgb: "103, 232, 249",
    source: "Stars and warm matter",
    sourceDetail: "Thermal surfaces and atoms release photons across a spectrum.",
    journey: "Dust can dim and redden the signal before it reaches Earth.",
    detector: "Optical telescope + spectrograph",
    reveals: ["temperature", "chemical composition", "motion through Doppler shift"],
    atmosphere: "partly transmitted",
    transmission: 0.82,
    amplitude: 18,
    cycles: 8,
  },
  {
    id: "radio",
    label: "Radio",
    icon: Radio,
    accentRgb: "52, 211, 153",
    source: "Cold gas, pulsars, and jets",
    sourceDetail: "Long-wavelength emission traces structures that visible light can miss.",
    journey: "Radio waves cross dust and much of Earth’s atmosphere efficiently.",
    detector: "Radio dish or interferometer",
    reveals: ["cold hydrogen", "magnetic fields", "rotation and precise timing"],
    atmosphere: "mostly transmitted",
    transmission: 0.94,
    amplitude: 25,
    cycles: 4,
  },
  {
    id: "xray",
    label: "X-ray",
    icon: Satellite,
    accentRgb: "251, 191, 36",
    source: "Hot plasma and compact objects",
    sourceDetail: "Violent acceleration and million-degree gas produce energetic photons.",
    journey: "Earth’s atmosphere protects life by absorbing nearly all incoming X-rays.",
    detector: "Space-based X-ray observatory",
    reveals: ["black-hole accretion", "supernova remnants", "extreme gas temperature"],
    atmosphere: "blocked by atmosphere",
    transmission: 0.08,
    amplitude: 10,
    cycles: 14,
    detectorInSpace: true,
  },
  {
    id: "gravity",
    label: "Gravitational waves",
    icon: Activity,
    accentRgb: "244, 114, 182",
    source: "Merging neutron stars and black holes",
    sourceDetail: "Accelerating compact masses launch ripples through spacetime itself.",
    journey: "The wave passes through matter with almost no absorption or scattering.",
    detector: "Laser interferometer",
    reveals: ["masses and orbit", "merger dynamics", "strong-field gravity"],
    atmosphere: "matter is nearly transparent",
    transmission: 0.99,
    amplitude: 13,
    cycles: 6,
  },
];

export default function AstronomySignalLab({
  methods,
}: {
  methods?: {
    href: string;
    status?: "active" | "placeholder";
    description: string;
  };
}) {
  const [signalId, setSignalId] = useState<SignalId>("visible");
  const signal = SIGNALS.find((item) => item.id === signalId) ?? SIGNALS[0];
  const SignalIcon = signal.icon;
  const methodsActive = methods?.status !== "placeholder" && Boolean(methods?.href);

  return (
    <section className="overflow-hidden rounded-[34px] border border-cyan-100/[0.14] bg-[#050a18]/[0.54] shadow-[0_36px_120px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="grid border-b border-cyan-100/[0.10] bg-[#081126]/[0.52] xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-100/[0.70]">
            <Waves size={14} /> Astronomy begins with an arriving signal
          </div>
          <h2 className="mt-3 max-w-4xl text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
            Follow evidence from its source to a physical explanation.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-300/[0.72]">
            Astronomers rarely touch the object they study. They identify a signal,
            account for what happened during its journey, measure it with an instrument,
            and compare the result with physical models.
          </p>
        </div>

        <div className="border-t border-cyan-100/[0.09] bg-violet-400/[0.045] p-6 xl:border-l xl:border-t-0 xl:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-100/[0.68]">
            <Sigma size={13} /> Astronomical methods
          </div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/[0.62]">
            {methods?.description ||
              "Observation and modeling form one evidence cycle used at every cosmic scale."}
          </p>
          <div className="mt-5">
            {methodsActive && methods ? (
              <Link
                href={methods.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-[13px] border border-violet-200/[0.18] bg-violet-300/[0.06] px-4 text-[12px] font-semibold text-violet-100 transition hover:border-violet-100/[0.32] hover:bg-violet-300/[0.10]"
              >
                Open the instrument bay <ArrowRight size={14} />
              </Link>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-[13px] border border-white/[0.07] bg-white/[0.02] px-4 text-[11px] text-slate-500">
                <CircleDashed size={13} /> Methods branch planned
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[250px_minmax(0,1fr)]">
        <div className="border-b border-cyan-100/[0.09] bg-[#050817]/[0.48] p-3 lg:border-b-0 lg:border-r lg:p-4">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {SIGNALS.map((item) => {
              const Icon = item.icon;
              const active = item.id === signal.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSignalId(item.id)}
                  className={`group min-h-[82px] rounded-[16px] border p-3 text-left transition sm:p-4 ${
                    active
                      ? "bg-white/[0.055] shadow-[0_16px_42px_rgba(0,0,0,0.20)]"
                      : "border-transparent bg-white/[0.012] hover:border-white/[0.08] hover:bg-white/[0.028]"
                  }`}
                  style={{
                    borderColor: active
                      ? `rgba(${item.accentRgb},0.28)`
                      : undefined,
                  }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-[12px] border"
                    style={{
                      color: `rgb(${item.accentRgb})`,
                      borderColor: `rgba(${item.accentRgb},${active ? 0.28 : 0.13})`,
                      background: `rgba(${item.accentRgb},${active ? 0.09 : 0.035})`,
                    }}
                  >
                    <Icon size={17} />
                  </span>
                  <strong
                    className={`mt-3 block text-[13px] leading-5 ${
                      active ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </strong>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 p-5 sm:p-7">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(310px,0.85fr)]">
            <div
              className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#020611]/[0.55] p-5 sm:p-6"
              style={{
                boxShadow: `inset 0 0 90px rgba(${signal.accentRgb},0.055)`,
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: `rgba(${signal.accentRgb},0.72)` }}
                  >
                    Active messenger
                  </div>
                  <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-white">
                    {signal.label}
                  </h3>
                </div>
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-[15px] border"
                  style={{
                    color: `rgb(${signal.accentRgb})`,
                    borderColor: `rgba(${signal.accentRgb},0.24)`,
                    background: `rgba(${signal.accentRgb},0.06)`,
                  }}
                >
                  <SignalIcon size={20} />
                </span>
              </div>

              <div className="relative mt-7 h-[205px] overflow-hidden rounded-[22px] border border-white/[0.07] bg-black/[0.20]">
                <SignalDiagram signal={signal} />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <EvidenceStep
                  number="01"
                  label="Source"
                  value={signal.source}
                  icon={Sparkles}
                  rgb={signal.accentRgb}
                />
                <EvidenceStep
                  number="02"
                  label="Journey"
                  value={signal.journey}
                  icon={Orbit}
                  rgb={signal.accentRgb}
                />
                <EvidenceStep
                  number="03"
                  label="Detector"
                  value={signal.detector}
                  icon={signal.detectorInSpace ? Satellite : Telescope}
                  rgb={signal.accentRgb}
                />
              </div>
            </div>

            <aside className="flex min-h-[420px] flex-col rounded-[28px] border border-white/[0.09] bg-[#08101f]/[0.52] p-5 sm:p-6">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-100/[0.68]">
                <Sigma size={13} /> What can be inferred?
              </div>
              <p className="mt-4 text-[14px] leading-6 text-slate-300/[0.68]">
                {signal.sourceDetail}
              </p>

              <div className="mt-5 space-y-3">
                {signal.reveals.map((item, index) => (
                  <div
                    key={item}
                    className="grid grid-cols-[30px_1fr] items-start gap-3 rounded-[15px] border border-white/[0.07] bg-white/[0.018] p-3.5"
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-[9px] font-mono text-[11px] font-semibold"
                      style={{
                        color: `rgb(${signal.accentRgb})`,
                        background: `rgba(${signal.accentRgb},0.07)`,
                      }}
                    >
                      {index + 1}
                    </span>
                    <span className="pt-1 text-[13px] leading-5 text-slate-200/[0.82]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <div className="rounded-[16px] border border-white/[0.07] bg-black/[0.18] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.11em] text-slate-400">
                      Atmosphere
                    </span>
                    <span
                      className="text-right text-[12px] font-semibold"
                      style={{ color: `rgb(${signal.accentRgb})` }}
                    >
                      {signal.atmosphere}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.055]">
                    <div
                      className="h-full rounded-full transition-[width] duration-500"
                      style={{
                        width: `${Math.max(6, signal.transmission * 100)}%`,
                        background: `linear-gradient(90deg,rgba(${signal.accentRgb},0.38),rgba(${signal.accentRgb},0.95))`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalDiagram({ signal }: { signal: SignalDefinition }) {
  const sourceX = 74;
  const atmosphereX = 650;
  const detectorX = signal.detectorInSpace ? 585 : 800;
  const centerY = 98;
  const path = wavePath(
    sourceX + 42,
    detectorX - 52,
    centerY,
    signal.amplitude,
    signal.cycles,
  );

  return (
    <svg
      viewBox="0 0 880 205"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`signal-${signal.id}`} x1="0" x2="1">
          <stop offset="0" stopColor={`rgba(${signal.accentRgb},0.26)`} />
          <stop offset="0.55" stopColor={`rgba(${signal.accentRgb},0.90)`} />
          <stop
            offset="1"
            stopColor={`rgba(${signal.accentRgb},${Math.max(0.18, signal.transmission)})`}
          />
        </linearGradient>
        <linearGradient id="atmosphere-band" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(56,189,248,0.02)" />
          <stop offset="0.5" stopColor="rgba(125,211,252,0.15)" />
          <stop offset="1" stopColor="rgba(56,189,248,0.02)" />
        </linearGradient>
      </defs>

      <g opacity="0.48">
        {Array.from({ length: 8 }, (_, index) => (
          <line
            key={index}
            x1={index * 126 - 40}
            y1="0"
            x2={index * 126 + 80}
            y2="205"
            stroke="rgba(255,255,255,0.025)"
          />
        ))}
      </g>

      <rect
        x={atmosphereX}
        y="0"
        width="74"
        height="205"
        fill="url(#atmosphere-band)"
      />
      <line
        x1={atmosphereX + 37}
        y1="20"
        x2={atmosphereX + 37}
        y2="185"
        stroke="rgba(125,211,252,0.18)"
        strokeDasharray="4 8"
      />

      <g transform={`translate(${sourceX} ${centerY})`}>
        <circle r="31" fill={`rgba(${signal.accentRgb},0.055)`} />
        <circle r="17" fill={`rgba(${signal.accentRgb},0.17)`} />
        <path
          d="M0 -25 V-35 M0 25 V35 M-25 0 H-35 M25 0 H35 M-18 -18 L-25 -25 M18 -18 L25 -25 M-18 18 L-25 25 M18 18 L25 25"
          stroke={`rgba(${signal.accentRgb},0.58)`}
          strokeWidth="2"
        />
      </g>

      <path
        d={path}
        fill="none"
        stroke={`url(#signal-${signal.id})`}
        strokeWidth={signal.id === "gravity" ? 3 : 2.2}
        strokeLinecap="round"
        className="signal-flight"
        strokeDasharray={signal.id === "gravity" ? "4 8" : "8 9"}
      />

      <g transform={`translate(${detectorX} ${centerY})`}>
        {signal.detectorInSpace ? (
          <>
            <rect
              x="-16"
              y="-12"
              width="32"
              height="24"
              rx="5"
              fill="rgba(15,23,42,0.94)"
              stroke={`rgba(${signal.accentRgb},0.48)`}
            />
            <path
              d="M-16 -7 H-39 V7 H-16 M16 -7 H39 V7 H16 M0 -12 V-29 M-7 -29 H7"
              fill="none"
              stroke={`rgba(${signal.accentRgb},0.56)`}
              strokeWidth="2"
            />
          </>
        ) : signal.id === "gravity" ? (
          <path
            d="M-34 19 H0 V-19 M0 0 H34"
            fill="none"
            stroke={`rgba(${signal.accentRgb},0.68)`}
            strokeWidth="4"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path
              d="M-27 -19 Q-2 10 27 -19 Q15 23 -2 24 Q-19 23 -27 -19 Z"
              fill={`rgba(${signal.accentRgb},0.08)`}
              stroke={`rgba(${signal.accentRgb},0.58)`}
              strokeWidth="2"
            />
            <path
              d="M0 22 V36 M-15 36 H15"
              fill="none"
              stroke={`rgba(${signal.accentRgb},0.45)`}
              strokeWidth="2"
            />
          </>
        )}
      </g>

      <g
        fill="rgba(226,232,240,0.48)"
        fontSize="10"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        <text x="32" y="180">SOURCE</text>
        <text x="624" y="180">ATMOSPHERE</text>
        <text x={detectorX - 34} y="180">DETECTOR</text>
      </g>

      <style>{`
        @keyframes signal-flight { to { stroke-dashoffset: -180; } }
        .signal-flight { animation: signal-flight 3.8s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .signal-flight { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}

function EvidenceStep({
  number,
  label,
  value,
  icon: Icon,
  rgb,
}: {
  number: string;
  label: string;
  value: string;
  icon: LucideIcon;
  rgb: string;
}) {
  return (
    <div className="rounded-[16px] border border-white/[0.07] bg-white/[0.018] p-4">
      <div className="flex items-center justify-between gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[11px] border"
          style={{
            color: `rgb(${rgb})`,
            borderColor: `rgba(${rgb},0.18)`,
            background: `rgba(${rgb},0.045)`,
          }}
        >
          <Icon size={15} />
        </span>
        <span className="font-mono text-[11px] text-slate-600">{number}</span>
      </div>
      <div className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-500">
        {label}
      </div>
      <p className="mt-2 text-[12px] leading-5 text-slate-200/[0.72]">{value}</p>
    </div>
  );
}

function wavePath(
  startX: number,
  endX: number,
  centerY: number,
  amplitude: number,
  cycles: number,
) {
  const points = 96;
  let path = `M ${startX} ${centerY}`;
  for (let index = 1; index <= points; index += 1) {
    const progress = index / points;
    const x = lerp(startX, endX, progress);
    const envelope = Math.sin(progress * Math.PI) * 0.18 + 0.82;
    const y =
      centerY +
      Math.sin(progress * cycles * Math.PI * 2) * amplitude * envelope;
    path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return path;
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}
