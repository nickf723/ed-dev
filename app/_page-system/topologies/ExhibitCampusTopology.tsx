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
  { left: 17, top: 27 },
  { left: 79, top: 23 },
  { left: 82, top: 70 },
  { left: 21, top: 72 },
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
  presentation = "panel",
}: {
  title: string;
  description: string;
  centerLabel: string;
  centerSummary: string;
  destinations: ExhibitDestination[];
  accentRgb?: string;
  presentation?: "panel" | "world";
}) {
  const campus = (
    <>
      <div className="relative hidden min-h-[590px] overflow-hidden lg:block">
        <CampusGround
          accentRgb={accentRgb}
          transparent={presentation === "world"}
        />

        <div
          className={`absolute left-1/2 top-1/2 z-20 w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-[46%_54%_48%_52%/55%_44%_56%_45%] border px-8 py-9 text-center backdrop-blur-md ${
            presentation === "world"
              ? "border-emerald-100/[0.22] bg-[#0b1b12]/[0.46] shadow-[0_28px_80px_rgba(0,0,0,0.24),0_0_80px_rgba(52,211,153,0.10)]"
              : "border-emerald-100/[0.20] bg-[#11231a]/[0.90] shadow-[0_28px_80px_rgba(0,0,0,0.34),0_0_70px_rgba(52,211,153,0.10)]"
          }`}
        >
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200/[0.24] bg-emerald-300/[0.09] text-emerald-100">
            <PawPrint size={25} />
          </span>
          <div className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200/[0.70]">
            Shared reference habitat
          </div>
          <h3 className="mt-2 text-[29px] font-semibold tracking-[-0.04em] text-white">
            {centerLabel}
          </h3>
          <p className="mt-3 text-[14px] leading-6 text-emerald-50/[0.70]">
            {centerSummary}
          </p>
        </div>

        {destinations.map((destination, index) => {
          const position = POSITIONS[index % POSITIONS.length];
          return (
            <div
              key={destination.id}
              className="absolute z-30 w-[252px] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${position.left}%`, top: `${position.top}%` }}
            >
              <DestinationSign
                destination={destination}
                presentation={presentation}
              />
            </div>
          );
        })}

        <div
          className={`absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between rounded-[17px] border px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] backdrop-blur-md ${
            presentation === "world"
              ? "border-white/[0.10] bg-black/[0.20] text-white/[0.48]"
              : "border-amber-100/[0.11] bg-[#151c13]/[0.78] text-amber-50/[0.45]"
          }`}
        >
          <span>entrance</span>
          <span>living atlas · research pavilions · field evidence</span>
          <span>deeper study</span>
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:hidden">
        <div className="rounded-[22px] border border-emerald-100/[0.15] bg-black/[0.20] p-5 backdrop-blur-md sm:col-span-2">
          <div className="flex items-center gap-3 text-emerald-100">
            <PawPrint size={18} />
            <strong className="text-[17px]">{centerLabel}</strong>
          </div>
          <p className="mt-3 text-[14px] leading-6 text-emerald-50/[0.68]">
            {centerSummary}
          </p>
        </div>
        {destinations.map((destination) => (
          <DestinationSign
            key={destination.id}
            destination={destination}
            presentation={presentation}
          />
        ))}
      </div>
    </>
  );

  if (presentation === "world") return <div className="relative">{campus}</div>;

  return (
    <section className="overflow-hidden rounded-[36px] border border-emerald-100/[0.15] bg-[#0b1710]/[0.68] shadow-[0_36px_120px_rgba(0,0,0,0.30)] backdrop-blur-xl">
      <div className="grid border-b border-emerald-100/[0.10] bg-[#102019]/[0.70] lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200/[0.74]">
            <Map size={14} /> Direct zoology branches
          </div>
          <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-[#f3fff5]">
            {title}
          </h2>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-emerald-50/[0.66]">
            {description}
          </p>
        </div>
        <div className="border-t border-emerald-100/[0.09] bg-[#d8c494]/[0.05] p-6 lg:border-l lg:border-t-0 lg:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-100/[0.68]">
            <Signpost size={13} /> How the atlas fits
          </div>
          <p className="mt-3 text-[13px] leading-6 text-amber-50/[0.58]">
            The pavilions are direct curriculum branches. The central atlas is a
            shared reference tool where one species can reappear across habitat,
            lineage, and ecological-role views.
          </p>
        </div>
      </div>
      {campus}
    </section>
  );
}

function DestinationSign({
  destination,
  presentation,
}: {
  destination: ExhibitDestination;
  presentation: "panel" | "world";
}) {
  const Icon = destination.icon;
  const active = destination.status !== "planned" && Boolean(destination.href);
  const content = (
    <article
      className={`group relative min-h-[184px] overflow-hidden rounded-[20px] border px-5 py-5 text-left backdrop-blur-md transition ${
        active
          ? presentation === "world"
            ? "border-amber-100/[0.19] bg-[#182218]/[0.50] shadow-[0_18px_45px_rgba(0,0,0,0.18)] hover:-translate-y-1 hover:border-amber-100/[0.32] hover:bg-[#182218]/[0.66]"
            : "border-amber-100/[0.17] bg-[#283022]/[0.90] shadow-[0_18px_45px_rgba(0,0,0,0.26)] hover:-translate-y-1 hover:border-amber-100/[0.30]"
          : "border-white/[0.08] bg-[#151a16]/[0.66] opacity-[0.62]"
      }`}
    >
      <div
        className="absolute inset-x-5 top-0 h-[3px] rounded-b-full"
        style={{ background: `rgba(${destination.accentRgb},0.68)` }}
      />
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-[13px] border"
          style={{
            color: `rgb(${destination.accentRgb})`,
            borderColor: `rgba(${destination.accentRgb},0.28)`,
            background: `rgba(${destination.accentRgb},0.09)`,
          }}
        >
          <Icon size={19} />
        </span>
        {active ? (
          <ArrowRight
            size={15}
            className="mt-2 text-amber-100/[0.40] transition group-hover:translate-x-1 group-hover:text-amber-100/[0.82]"
          />
        ) : (
          <CircleDashed size={15} className="mt-2 text-white/[0.24]" />
        )}
      </div>
      <h3 className="mt-4 text-[17px] font-semibold text-amber-50">
        {destination.label}
      </h3>
      <p className="mt-2 line-clamp-3 text-[13px] leading-5 text-amber-50/[0.66]">
        {destination.summary}
      </p>
      <div
        className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: `rgba(${destination.accentRgb},0.72)` }}
      >
        {active ? "enter pavilion" : "planned pavilion"}
      </div>
    </article>
  );

  return active && destination.href ? (
    <Link href={destination.href}>{content}</Link>
  ) : (
    <div aria-disabled="true">{content}</div>
  );
}

function CampusGround({
  accentRgb,
  transparent,
}: {
  accentRgb: string;
  transparent: boolean;
}) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className={`absolute inset-0 ${
          transparent
            ? "bg-[radial-gradient(circle_at_50%_46%,rgba(52,211,153,0.055),transparent_31%),linear-gradient(180deg,rgba(20,54,34,0.08),transparent_52%,rgba(8,28,18,0.16))]"
            : "bg-[radial-gradient(circle_at_50%_46%,rgba(52,211,153,0.10),transparent_29%),linear-gradient(180deg,rgba(20,54,34,0.62),rgba(8,28,18,0.80))]"
        }`}
      />
      <svg
        viewBox="0 0 1200 590"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M-30 470 C160 420 236 510 390 438 C505 384 535 306 600 292 C695 274 735 418 872 428 C1016 438 1100 350 1240 385"
          fill="none"
          stroke="rgba(225,204,153,0.16)"
          strokeWidth="50"
          strokeLinecap="round"
        />
        <path
          d="M-30 470 C160 420 236 510 390 438 C505 384 535 306 600 292 C695 274 735 418 872 428 C1016 438 1100 350 1240 385"
          fill="none"
          stroke={transparent ? "rgba(38,35,24,0.36)" : "rgba(82,69,41,0.68)"}
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M600 292 C470 246 390 172 230 148 M600 292 C748 228 846 154 1032 138 M600 292 C760 332 866 472 1012 510 M600 292 C454 346 355 472 194 504"
          fill="none"
          stroke="rgba(225,204,153,0.14)"
          strokeWidth="32"
          strokeLinecap="round"
        />
        <path
          d="M600 292 C470 246 390 172 230 148 M600 292 C748 228 846 154 1032 138 M600 292 C760 332 866 472 1012 510 M600 292 C454 346 355 472 194 504"
          fill="none"
          stroke={transparent ? "rgba(38,35,24,0.34)" : "rgba(79,68,43,0.66)"}
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M-30 470 C160 420 236 510 390 438 C505 384 535 306 600 292 C695 274 735 418 872 428 C1016 438 1100 350 1240 385"
          fill="none"
          stroke={`rgba(${accentRgb},0.22)`}
          strokeWidth="2"
          strokeDasharray="8 15"
          className="campus-trail-motion"
        />
        <g fill={`rgba(${accentRgb},0.20)`}>
          <circle cx="600" cy="292" r="7" />
          <circle cx="230" cy="148" r="5" />
          <circle cx="1032" cy="138" r="5" />
          <circle cx="1012" cy="510" r="5" />
          <circle cx="194" cy="504" r="5" />
        </g>
      </svg>
      <style jsx>{`
        @keyframes campus-trail-motion {
          to {
            stroke-dashoffset: -180;
          }
        }
        .campus-trail-motion {
          animation: campus-trail-motion 20s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .campus-trail-motion {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
