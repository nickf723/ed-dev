"use client";

import Link from "next/link";
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
  href?: string;
  status?: "active" | "planned";
};

export default function ExpeditionRouteTopology({
  title,
  description,
  stops,
  accentRgb = "167, 139, 250",
}: {
  title: string;
  description: string;
  stops: ExpeditionStop[];
  accentRgb?: string;
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-violet-100/[0.14] bg-[#050718]/[0.84] shadow-[0_38px_140px_rgba(0,0,0,0.42)]">
      <div className="grid border-b border-violet-100/[0.09] bg-[#090d25]/[0.88] lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-cyan-100/65">
            <Navigation size={13} /> Primary navigation · expedition route
          </div>
          <h2 className="mt-2 text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[0.92] tracking-[-0.056em] text-white">
            {title}
          </h2>
          <p className="mt-3 max-w-3xl text-[11px] leading-6 text-slate-300/55">
            {description}
          </p>
        </div>
        <div className="border-t border-violet-100/[0.08] p-5 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-violet-200/60">
            <Compass size={12} /> Navigation principle
          </div>
          <p className="mt-3 text-[10px] leading-5 text-slate-400/65">
            The route follows the direct astronomy branches outward by scale. Methods belong in the instrument bay because every destination uses them.
          </p>
        </div>
      </div>

      <div className="relative hidden min-h-[560px] overflow-hidden lg:block">
        <RouteField accentRgb={accentRgb} stopCount={stops.length} />
        <div className="absolute left-[5%] top-1/2 z-20 -translate-y-1/2">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-100/[0.20] bg-cyan-300/[0.065] text-cyan-100 shadow-[0_0_70px_rgba(34,211,238,0.15)]">
            <Rocket size={27} />
          </div>
          <div className="mt-3 text-center font-mono text-[7px] uppercase tracking-[0.13em] text-cyan-100/45">launch</div>
        </div>

        {stops.map((stop, index) => {
          const position = routePosition(index, stops.length);
          return (
            <div
              key={stop.id}
              className="absolute z-30 w-[210px] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position.left}%`, top: `${position.top}%` }}
            >
              <StopBeacon stop={stop} number={index + 1} />
            </div>
          );
        })}

        <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between rounded-full border border-violet-100/[0.08] bg-[#070a18]/80 px-5 py-3 font-mono text-[7px] uppercase tracking-[0.12em] text-violet-100/30 backdrop-blur-md">
          <span>local worlds</span>
          <span>stars · galaxies · large-scale structure</span>
          <span>observable universe</span>
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:hidden">
        <div className="flex items-center gap-3 rounded-[20px] border border-cyan-100/[0.12] bg-cyan-300/[0.035] p-4 sm:col-span-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-100/[0.15] text-cyan-100"><Rocket size={17} /></span>
          <div><strong className="text-[11px] text-white">Expedition launch</strong><p className="mt-1 text-[8px] leading-4 text-slate-500">Choose the scale of system you want to investigate.</p></div>
        </div>
        {stops.map((stop, index) => <StopBeacon key={stop.id} stop={stop} number={index + 1} />)}
      </div>
    </section>
  );
}

function StopBeacon({ stop, number }: { stop: ExpeditionStop; number: number }) {
  const Icon = STOP_ICONS[stop.icon];
  const active = stop.status !== "planned" && Boolean(stop.href);
  const body = (
    <article
      className={`group relative min-h-[166px] overflow-hidden rounded-[22px] border p-4 text-left backdrop-blur-md transition ${
        active
          ? "border-white/[0.11] bg-[#0b1028]/92 hover:-translate-y-1 hover:border-white/[0.20]"
          : "border-white/[0.06] bg-[#070a17]/88 opacity-55"
      }`}
      style={{ boxShadow: active ? `0 18px 60px rgba(${stop.accentRgb},0.10)` : undefined }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="relative flex h-12 w-12 items-center justify-center rounded-full border"
          style={{
            color: `rgb(${stop.accentRgb})`,
            borderColor: `rgba(${stop.accentRgb},0.30)`,
            background: `radial-gradient(circle,rgba(${stop.accentRgb},0.14),rgba(4,7,20,0.9))`,
            boxShadow: `0 0 30px rgba(${stop.accentRgb},0.13)`,
          }}
        >
          <Icon size={18} />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.10] bg-[#090d20] font-mono text-[6px] text-white/50">{String(number).padStart(2, "0")}</span>
        </span>
        {active ? <ArrowRight size={13} className="mt-2 text-white/25 transition group-hover:translate-x-1 group-hover:text-white/70" /> : <CircleDashed size={13} className="mt-2 text-white/18" />}
      </div>
      <div className="mt-4 font-mono text-[7px] uppercase tracking-[0.10em]" style={{ color: `rgba(${stop.accentRgb},0.60)` }}>{stop.scaleLabel}</div>
      <h3 className="mt-1 text-[13px] font-semibold text-white">{stop.label}</h3>
      <p className="mt-1.5 line-clamp-3 text-[8px] leading-4 text-slate-500">{stop.summary}</p>
      <div className="mt-3 flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">
        {active ? <Flag size={9} /> : <CircleDashed size={9} />} {active ? "open waypoint" : "planned waypoint"}
      </div>
    </article>
  );

  return active && stop.href ? <Link href={stop.href}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}

function routePosition(index: number, count: number) {
  const start = 18;
  const end = 90;
  const left = count <= 1 ? 54 : start + (index / (count - 1)) * (end - start);
  const wave = [28, 68, 22, 64, 30, 60];
  return { left, top: wave[index % wave.length] };
}

function RouteField({ accentRgb, stopCount }: { accentRgb: string; stopCount: number }) {
  const points = Array.from({ length: stopCount }, (_, index) => routePosition(index, stopCount));
  const path = points.length
    ? `M 60 280 ${points.map((point, index) => `${index === 0 ? "Q" : "T"} ${point.left * 12 - 35} ${point.top * 5.6} ${point.left * 12} ${point.top * 5.6}`).join(" ")}`
    : "M 60 280 L 1120 280";

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_50%,rgba(34,211,238,0.12),transparent_20%),radial-gradient(circle_at_82%_28%,rgba(192,132,252,0.11),transparent_32%),linear-gradient(180deg,#040616,#070820_55%,#03040d)]" />
      <svg viewBox="0 0 1200 560" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="expedition-route" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(34,211,238,0.42)" />
            <stop offset="0.52" stopColor={`rgba(${accentRgb},0.48)`} />
            <stop offset="1" stopColor="rgba(244,114,182,0.40)" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="18" strokeLinecap="round" />
        <path d={path} fill="none" stroke="url(#expedition-route)" strokeWidth="2" strokeDasharray="7 10" strokeLinecap="round" className="animate-[expedition-dash_18s_linear_infinite]" />
        <ellipse cx="172" cy="282" rx="90" ry="34" fill="none" stroke="rgba(34,211,238,0.11)" transform="rotate(-17 172 282)" />
        <ellipse cx="876" cy="182" rx="176" ry="48" fill="none" stroke={`rgba(${accentRgb},0.09)`} transform="rotate(18 876 182)" />
        <path d="M-40 480 C230 360 356 550 610 430 S980 340 1260 458" fill="none" stroke="rgba(129,140,248,0.055)" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 opacity-55" style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.28) 0 1px,transparent 1.5px)", backgroundSize: "74px 74px", maskImage: "radial-gradient(circle at center,black,transparent 86%)" }} />
      <style jsx>{`
        @keyframes expedition-dash { to { stroke-dashoffset: -220; } }
        @media (prefers-reduced-motion: reduce) { path { animation: none !important; } }
      `}</style>
    </div>
  );
}
