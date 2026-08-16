"use client";

import Link from "next/link";
import {
  ArrowRight,
  CircleDashed,
  Map,
  PawPrint,
  Signpost,
  type LucideIcon,
} from "lucide-react";

export type ExhibitDestination = {
  id: string;
  label: string;
  summary: string;
  accentRgb: string;
  icon: LucideIcon;
  href?: string;
  status?: "active" | "planned";
};

const POSITIONS = [
  { left: 17, top: 26 },
  { left: 78, top: 22 },
  { left: 82, top: 69 },
  { left: 22, top: 72 },
  { left: 50, top: 84 },
  { left: 50, top: 13 },
];

export default function ExhibitCampusTopology({
  title,
  description,
  centerLabel,
  centerSummary,
  destinations,
  accentRgb = "52, 211, 153",
}: {
  title: string;
  description: string;
  centerLabel: string;
  centerSummary: string;
  destinations: ExhibitDestination[];
  accentRgb?: string;
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-emerald-100/[0.14] bg-[#0b1710]/[0.76] shadow-[0_36px_120px_rgba(0,0,0,0.34)]">
      <div className="grid border-b border-emerald-100/[0.10] bg-[#102019]/[0.82] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-200/70">
            <Map size={13} /> Primary navigation · research pavilions
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.7vw,3.5rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-[#f3fff5]">
            {title}
          </h2>
          <p className="mt-3 max-w-3xl text-[11px] leading-6 text-emerald-50/55">
            {description}
          </p>
        </div>
        <div className="border-t border-emerald-100/[0.09] bg-[#d8c494]/[0.055] p-5 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-amber-100/60">
            <Signpost size={12} /> Wayfinding rule
          </div>
          <p className="mt-3 text-[10px] leading-5 text-amber-50/50">
            The pavilions are the page&apos;s direct curriculum children. The living atlas in the center is the shared browsing exhibit, not another peer branch.
          </p>
        </div>
      </div>

      <div className="relative hidden min-h-[560px] overflow-hidden lg:block">
        <CampusGround accentRgb={accentRgb} />

        <div className="absolute left-1/2 top-1/2 z-20 w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-[46%_54%_48%_52%/55%_44%_56%_45%] border border-emerald-100/[0.18] bg-[#11231a]/95 px-8 py-9 text-center shadow-[0_28px_80px_rgba(0,0,0,0.38),0_0_60px_rgba(52,211,153,0.08)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200/[0.20] bg-emerald-300/[0.07] text-emerald-100">
            <PawPrint size={22} />
          </span>
          <div className="mt-4 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-emerald-200/55">
            Central habitat
          </div>
          <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">
            {centerLabel}
          </h3>
          <p className="mt-2 text-[9px] leading-5 text-emerald-50/45">
            {centerSummary}
          </p>
        </div>

        {destinations.map((destination, index) => {
          const position = POSITIONS[index % POSITIONS.length];
          return (
            <div
              key={destination.id}
              className="absolute z-30 w-[230px] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position.left}%`, top: `${position.top}%` }}
            >
              <DestinationSign destination={destination} />
            </div>
          );
        })}

        <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between rounded-full border border-amber-100/[0.10] bg-[#151c13]/85 px-5 py-3 font-mono text-[7px] uppercase tracking-[0.12em] text-amber-50/35">
          <span>Entrance</span>
          <span>atlas trail · research pavilions · field station</span>
          <span>deeper study</span>
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:hidden">
        <div className="rounded-[22px] border border-emerald-100/[0.12] bg-emerald-300/[0.035] p-5 sm:col-span-2">
          <div className="flex items-center gap-2 text-emerald-100"><PawPrint size={16} /><strong className="text-[13px]">{centerLabel}</strong></div>
          <p className="mt-2 text-[9px] leading-5 text-emerald-50/45">{centerSummary}</p>
        </div>
        {destinations.map((destination) => (
          <DestinationSign key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
}

function DestinationSign({ destination }: { destination: ExhibitDestination }) {
  const Icon = destination.icon;
  const active = destination.status !== "planned" && Boolean(destination.href);
  const content = (
    <article
      className={`group relative min-h-[154px] overflow-hidden rounded-[18px] border px-4 py-4 text-left shadow-[0_18px_45px_rgba(0,0,0,0.30)] transition ${
        active
          ? "border-amber-100/[0.15] bg-[#283022]/95 hover:-translate-y-1 hover:border-amber-100/[0.28]"
          : "border-white/[0.07] bg-[#151a16]/90 opacity-55"
      }`}
    >
      <div className="absolute inset-x-4 top-0 h-[3px] rounded-b-full" style={{ background: `rgba(${destination.accentRgb},0.58)` }} />
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-[12px] border"
          style={{
            color: `rgb(${destination.accentRgb})`,
            borderColor: `rgba(${destination.accentRgb},0.24)`,
            background: `rgba(${destination.accentRgb},0.07)`,
          }}
        >
          <Icon size={17} />
        </span>
        {active ? <ArrowRight size={14} className="mt-2 text-amber-100/35 transition group-hover:translate-x-1 group-hover:text-amber-100/75" /> : <CircleDashed size={14} className="mt-2 text-white/20" />}
      </div>
      <h3 className="mt-4 text-[13px] font-semibold text-amber-50">{destination.label}</h3>
      <p className="mt-1.5 line-clamp-3 text-[8px] leading-4 text-amber-50/42">{destination.summary}</p>
      <div className="mt-3 font-mono text-[7px] uppercase tracking-[0.10em]" style={{ color: `rgba(${destination.accentRgb},0.56)` }}>
        {active ? "enter pavilion" : "planned pavilion"}
      </div>
    </article>
  );

  return active && destination.href ? <Link href={destination.href}>{content}</Link> : <div aria-disabled="true">{content}</div>;
}

function CampusGround({ accentRgb }: { accentRgb: string }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(52,211,153,0.08),transparent_28%),linear-gradient(180deg,rgba(20,54,34,0.70),rgba(8,28,18,0.92))]" />
      <svg viewBox="0 0 1200 560" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M-30 454 C160 406 236 494 390 425 C505 374 535 292 600 280 C695 262 735 405 872 414 C1016 423 1100 338 1240 372" fill="none" stroke="rgba(225,204,153,0.18)" strokeWidth="52" strokeLinecap="round" />
        <path d="M-30 454 C160 406 236 494 390 425 C505 374 535 292 600 280 C695 262 735 405 872 414 C1016 423 1100 338 1240 372" fill="none" stroke="rgba(82,69,41,0.70)" strokeWidth="36" strokeLinecap="round" />
        <path d="M600 280 C470 236 390 165 230 142 M600 280 C748 218 846 147 1032 132 M600 280 C760 318 866 456 1012 492 M600 280 C454 332 355 456 194 486" fill="none" stroke="rgba(225,204,153,0.15)" strokeWidth="34" strokeLinecap="round" />
        <path d="M600 280 C470 236 390 165 230 142 M600 280 C748 218 846 147 1032 132 M600 280 C760 318 866 456 1012 492 M600 280 C454 332 355 456 194 486" fill="none" stroke="rgba(79,68,43,0.68)" strokeWidth="22" strokeLinecap="round" />
        <g fill={`rgba(${accentRgb},0.14)`}>
          <circle cx="600" cy="280" r="7" />
          <circle cx="230" cy="142" r="5" />
          <circle cx="1032" cy="132" r="5" />
          <circle cx="1012" cy="492" r="5" />
          <circle cx="194" cy="486" r="5" />
        </g>
        <g fill="rgba(52,211,153,0.055)">
          <path d="M0 0 H260 C210 80 192 144 170 220 C125 196 67 184 0 196 Z" />
          <path d="M1200 0 H925 C990 72 1012 145 1030 228 C1090 196 1148 186 1200 190 Z" />
          <path d="M0 560 V390 C82 404 136 438 176 510 L196 560 Z" />
          <path d="M1200 560 V388 C1124 405 1070 448 1028 520 L1008 560 Z" />
        </g>
      </svg>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle,rgba(236,220,178,0.18) 0 1px,transparent 1.5px)", backgroundSize: "28px 28px", maskImage: "linear-gradient(180deg,black,transparent 78%)" }} />
    </div>
  );
}
