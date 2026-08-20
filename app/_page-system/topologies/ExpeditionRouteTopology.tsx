"use client";

import Link from "next/link";
import { WorldSceneFocus } from "@/app/_page-system/scene/WorldDirector";
import {
  Aperture,
  ArrowRight,
  CircleDashed,
  Compass,
  Eye,
  Flag,
  Navigation,
  Orbit,
  Rocket,
  Sigma,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const STOP_ICONS = {
  aperture: Aperture,
  eye: Eye,
  orbit: Orbit,
  sigma: Sigma,
  sparkles: Sparkles,
} satisfies Record<string, LucideIcon>;

export type ExpeditionStopIcon = keyof typeof STOP_ICONS;

export type ExpeditionStop = {
  id: string;
  label: string;
  summary: string;
  scaleLabel: string;
  accentRgb: string;
  icon: ExpeditionStopIcon;
  scene?: string;
  href?: string;
  status?: "active" | "planned";
};

export default function ExpeditionRouteTopology({
  title,
  description,
  stops,
  accentRgb = "167, 139, 250",
  presentation = "panel",
}: {
  title: string;
  description: string;
  stops: ExpeditionStop[];
  accentRgb?: string;
  presentation?: "panel" | "world";
}) {
  const route = (
    <>
      <div
        className={`relative hidden overflow-hidden lg:block ${
          presentation === "world" ? "min-h-[560px]" : "min-h-[570px]"
        }`}
      >
        <RouteField
          accentRgb={accentRgb}
          stopCount={stops.length}
          transparent={presentation === "world"}
        />

        <div className="absolute left-[4.5%] top-1/2 z-20 -translate-y-1/2">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-100/[0.24] bg-cyan-300/[0.075] text-cyan-100 shadow-[0_0_70px_rgba(34,211,238,0.17)] backdrop-blur-md">
            <Rocket size={28} />
          </div>
          <div className="mt-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-100/[0.64]">
            local launch
          </div>
        </div>

        {stops.map((stop, index) => {
          const position = routePosition(index, stops.length);
          return (
            <div
              key={`visible-${stop.id}`}
              className="absolute z-30 w-[242px] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position.left}%`, top: `${position.top}%` }}
            >
              <WorldSceneFocus scene={stop.scene}>
                <StopBeacon
                  stop={stop}
                  number={index + 1}
                  presentation={presentation}
                />
              </WorldSceneFocus>
            </div>
          );
        })}

        <div
          className={`absolute bottom-4 left-5 right-5 z-20 grid grid-cols-5 rounded-[18px] border px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] backdrop-blur-md ${
            presentation === "world"
              ? "border-white/[0.10] bg-black/[0.22] text-white/[0.48]"
              : "border-violet-100/[0.10] bg-[#070a18]/[0.78] text-violet-100/[0.44]"
          }`}
        >
          <span>world</span>
          <span className="text-center">star</span>
          <span className="text-center">galaxy</span>
          <span className="text-center">cosmic web</span>
          <span className="text-right">universe</span>
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:hidden">
        <div className="flex items-center gap-4 rounded-[20px] border border-cyan-100/[0.14] bg-black/[0.20] p-5 backdrop-blur-md sm:col-span-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-100/[0.18] text-cyan-100">
            <Rocket size={19} />
          </span>
          <div>
            <strong className="text-[15px] text-white">Begin near home</strong>
            <p className="mt-1 text-[13px] leading-5 text-slate-300/[0.68]">
              Move outward as the system under study becomes larger.
            </p>
          </div>
        </div>
        {stops.map((stop, index) => (
          <WorldSceneFocus key={stop.id} scene={stop.scene}>
            <StopBeacon
              stop={stop}
              number={index + 1}
              presentation={presentation}
            />
          </WorldSceneFocus>
        ))}
      </div>
    </>
  );

  if (presentation === "world") return <div className="relative">{route}</div>;

  return (
    <section className="overflow-hidden rounded-[36px] border border-violet-100/[0.14] bg-[#050718]/[0.70] shadow-[0_38px_140px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="grid border-b border-violet-100/[0.10] bg-[#090d25]/[0.70] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-100/[0.72]">
            <Navigation size={14} /> Direct branches by physical scale
          </div>
          <h2 className="mt-3 text-[clamp(2.1rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-slate-300/[0.70]">
            {description}
          </p>
        </div>
        <div className="border-t border-violet-100/[0.09] p-6 lg:border-l lg:border-t-0 lg:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-200/[0.68]">
            <Compass size={13} /> Organizing principle
          </div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/[0.62]">
            Each step changes the size of the system, the useful timescale, and the
            model that can explain it. Methods remain shared across the entire route.
          </p>
        </div>
      </div>
      {route}
    </section>
  );
}

function StopBeacon({
  stop,
  number,
  presentation,
}: {
  stop: ExpeditionStop;
  number: number;
  presentation: "panel" | "world";
}) {
  const Icon = STOP_ICONS[stop.icon];
  const active = stop.status !== "planned" && Boolean(stop.href);
  const body = (
    <article
      className={`group relative min-h-[194px] overflow-hidden rounded-[23px] border p-5 text-left backdrop-blur-md transition ${
        active
          ? presentation === "world"
            ? "border-white/[0.14] bg-[#071020]/[0.48] hover:-translate-y-1 hover:border-white/[0.26] hover:bg-[#071020]/[0.64]"
            : "border-white/[0.12] bg-[#0b1028]/[0.88] hover:-translate-y-1 hover:border-white/[0.22]"
          : "border-white/[0.07] bg-[#070a17]/[0.64] opacity-[0.62]"
      }`}
      style={{
        boxShadow: active
          ? `0 20px 65px rgba(${stop.accentRgb},${presentation === "world" ? 0.09 : 0.12})`
          : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="relative flex h-12 w-12 items-center justify-center rounded-full border"
          style={{
            color: `rgb(${stop.accentRgb})`,
            borderColor: `rgba(${stop.accentRgb},0.34)`,
            background: `radial-gradient(circle,rgba(${stop.accentRgb},0.18),rgba(4,7,20,0.62))`,
            boxShadow: `0 0 34px rgba(${stop.accentRgb},0.15)`,
          }}
        >
          <Icon size={20} />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.13] bg-[#090d20]/90 font-mono text-[11px] text-white/[0.68]">
            {String(number).padStart(2, "0")}
          </span>
        </span>
        {active ? (
          <ArrowRight
            size={15}
            className="mt-2 text-white/[0.32] transition group-hover:translate-x-1 group-hover:text-white/[0.78]"
          />
        ) : (
          <CircleDashed size={15} className="mt-2 text-white/[0.24]" />
        )}
      </div>
      <div
        className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: `rgba(${stop.accentRgb},0.76)` }}
      >
        {stop.scaleLabel}
      </div>
      <h3 className="mt-2 text-[18px] font-semibold text-white">{stop.label}</h3>
      <p className="mt-2 line-clamp-3 text-[13px] leading-5 text-slate-200/[0.68]">
        {stop.summary}
      </p>
      <div className="mt-4 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-400/[0.72]">
        {active ? <Flag size={11} /> : <CircleDashed size={11} />} {active ? "open field" : "planned field"}
      </div>
    </article>
  );

  return active && stop.href ? (
    <Link href={stop.href}>{body}</Link>
  ) : (
    <div aria-disabled="true">{body}</div>
  );
}

function routePosition(index: number, count: number) {
  const start = 17;
  const end = 90;
  const left = count <= 1 ? 54 : start + (index / (count - 1)) * (end - start);
  const wave = [30, 68, 25, 65, 32, 61];
  return { left, top: wave[index % wave.length] };
}

function RouteField({
  accentRgb,
  stopCount,
  transparent,
}: {
  accentRgb: string;
  stopCount: number;
  transparent: boolean;
}) {
  const points = Array.from({ length: stopCount }, (_, index) =>
    routePosition(index, stopCount),
  );
  const path = points.length
    ? `M 56 285 ${points
        .map(
          (point, index) =>
            `${index === 0 ? "Q" : "T"} ${point.left * 12 - 34} ${point.top * 5.7} ${point.left * 12} ${point.top * 5.7}`,
        )
        .join(" ")}`
    : "M 56 285 L 1120 285";

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className={`absolute inset-0 ${
          transparent
            ? "bg-[linear-gradient(180deg,rgba(4,6,22,0.10),transparent_34%,transparent_70%,rgba(3,4,13,0.22))]"
            : "bg-[linear-gradient(180deg,rgba(4,6,22,0.74),rgba(7,8,32,0.62)_55%,rgba(3,4,13,0.80))]"
        }`}
      />
      <svg
        viewBox="0 0 1200 570"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="expedition-route" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(34,211,238,0.58)" />
            <stop offset="0.52" stopColor={`rgba(${accentRgb},0.62)`} />
            <stop offset="1" stopColor="rgba(244,114,182,0.56)" />
          </linearGradient>
          <linearGradient id="scale-cone" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(34,211,238,0.07)" />
            <stop offset="0.65" stopColor={`rgba(${accentRgb},0.045)`} />
            <stop offset="1" stopColor="rgba(244,114,182,0.07)" />
          </linearGradient>
        </defs>

        <path
          d="M50 285 L1165 45 L1165 525 Z"
          fill="url(#scale-cone)"
          stroke="rgba(255,255,255,0.045)"
        />
        {[160, 360, 580, 800, 1020].map((x, index) => (
          <g key={x}>
            <line
              x1={x}
              y1="62"
              x2={x}
              y2="508"
              stroke="rgba(255,255,255,0.055)"
              strokeDasharray="3 12"
            />
            <line
              x1={x - 13}
              y1={82 + index * 13}
              x2={x + 13}
              y2={82 + index * 13}
              stroke="rgba(255,255,255,0.10)"
            />
          </g>
        ))}
        <path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d={path}
          fill="none"
          stroke="url(#expedition-route)"
          strokeWidth="2.4"
          strokeDasharray="8 11"
          strokeLinecap="round"
          className="expedition-route-motion"
        />
      </svg>
      <style jsx>{`
        @keyframes expedition-route-motion {
          to {
            stroke-dashoffset: -240;
          }
        }
        .expedition-route-motion {
          animation: expedition-route-motion 18s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .expedition-route-motion {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
