"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Boxes, CornerDownRight } from "lucide-react";
import { DOMAINS, type DomainDefinition, type DomainId } from "@/lib/domains";

export type HomepageDomainChild = {
  label: string;
  href: string;
};

export type HomepageDomainChildren = Record<DomainId, HomepageDomainChild[]>;

type HexPoint = { x: number; y: number };
type Axial = { q: number; r: number };

// Primary domain ring. These are the original point-up hex positions.
const HEX_POSITIONS: readonly HexPoint[] = [
  { x: -6.5, y: -11.25 },
  { x: 6.5, y: -11.25 },
  { x: 13, y: 0 },
  { x: 6.5, y: 11.25 },
  { x: -6.5, y: 11.25 },
  { x: -13, y: 0 },
] as const;

// The first child for each domain begins exactly where the old decorative
// outer/ghost hex sat. Children then continue on their own aligned honeycomb.
const CHILD_ANCHORS: readonly HexPoint[] = [
  { x: -19.5, y: -11.25 },
  { x: 19.5, y: -11.25 },
  { x: 26, y: 0 },
  { x: 19.5, y: 11.25 },
  { x: -19.5, y: 11.25 },
  { x: -26, y: 0 },
] as const;

// Restores the old outer-hex proportions: 10rem wide × 12rem tall.
// Point-up neighbors therefore step 10rem horizontally and 9rem vertically.
const CHILD_HEX_WIDTH = 10;
const CHILD_HEX_VERTICAL = 9;

function axialDistance({ q, r }: Axial) {
  return Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r));
}

function childPoint(anchor: HexPoint, axial: Axial): HexPoint {
  return {
    x: anchor.x + CHILD_HEX_WIDTH * (axial.q + axial.r / 2),
    y: anchor.y + CHILD_HEX_VERTICAL * axial.r,
  };
}

function generateChildPoints(domainIndex: number, count: number): HexPoint[] {
  if (count <= 0) return [];

  const anchor = CHILD_ANCHORS[domainIndex];
  const anchorLength = Math.hypot(anchor.x, anchor.y) || 1;
  const outward = { x: anchor.x / anchorLength, y: anchor.y / anchorLength };
  const tangent = { x: -outward.y, y: outward.x };
  const candidates: Array<{ point: HexPoint; distance: number; score: number }> = [];

  for (let q = -5; q <= 5; q += 1) {
    for (let r = -5; r <= 5; r += 1) {
      const axial = { q, r };
      const distance = axialDistance(axial);
      if (distance > 5) continue;

      const point = childPoint(anchor, axial);

      // Keep the smaller child lattice from sitting on top of the large
      // primary ring or the central station core.
      const overlapsPrimary = HEX_POSITIONS.some(
        (primary) => Math.hypot(point.x - primary.x, point.y - primary.y) < 10.7,
      );
      const overlapsCore = Math.hypot(point.x, point.y) < 9.8;
      if (overlapsPrimary || overlapsCore) continue;

      const fromAnchor = { x: point.x - anchor.x, y: point.y - anchor.y };
      const outwardAmount = fromAnchor.x * outward.x + fromAnchor.y * outward.y;
      const tangentAmount = Math.abs(fromAnchor.x * tangent.x + fromAnchor.y * tangent.y);

      // Prefer nearby cells, but steer large branches away from the header and
      // viewport edges before resorting to another ring.
      const verticalOverflow = Math.max(0, Math.abs(point.y) - 20.5);
      const horizontalOverflow = Math.max(0, Math.abs(point.x) - 34);
      const score =
        distance * 10 +
        verticalOverflow * 5 +
        horizontalOverflow * 4 -
        outwardAmount * 0.08 +
        tangentAmount * 0.015;

      candidates.push({ point, distance, score });
    }
  }

  candidates.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return a.distance - b.distance;
  });

  return candidates.slice(0, count).map((candidate) => candidate.point);
}

export default function HexGrid({ domainChildren }: { domainChildren: HomepageDomainChildren }) {
  const [active, setActive] = useState<DomainDefinition | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndex = active ? DOMAINS.findIndex((domain) => domain.id === active.id) : -1;
  const activeChildren = active ? domainChildren[active.id] : [];

  const activate = (domain: DomainDefinition) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = null;
    setActive(domain);
  };

  const scheduleClear = () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setActive(null), 130);
  };

  return (
    <div className="w-full">
      <div className="hidden w-full items-center justify-center lg:flex">
        <div
          className="relative mx-auto h-[920px] w-full max-w-[1360px]"
          onPointerEnter={() => {
            if (clearTimer.current) clearTimeout(clearTimer.current);
          }}
          onPointerLeave={scheduleClear}
        >
          <AmbientGeometry active={active} />
          <CenterCore active={active} childCount={activeChildren.length} />

          {DOMAINS.map((domain, index) => (
            <div
              key={domain.id}
              className="absolute left-1/2 top-1/2 z-30"
              style={{
                marginLeft: `${HEX_POSITIONS[index].x}rem`,
                marginTop: `${HEX_POSITIONS[index].y}rem`,
              }}
            >
              <DomainHex
                domain={domain}
                active={active?.id === domain.id}
                onActivate={() => activate(domain)}
              />
            </div>
          ))}

          {active && activeIndex >= 0 ? (
            <ChildCluster
              domain={active}
              domainIndex={activeIndex}
              children={activeChildren}
              onTrack={() => activate(active)}
            />
          ) : null}
        </div>
      </div>

      <div className="grid gap-2.5 pb-8 sm:grid-cols-2 lg:hidden">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          const children = domainChildren[domain.id];
          return (
            <Link
              key={domain.id}
              href={domain.href}
              className="group relative overflow-hidden border border-white/[0.09] bg-[#05080d]/88 p-4 backdrop-blur-xl transition-all hover:border-white/[0.16]"
              style={{ boxShadow: `inset 3px 0 0 rgba(${domain.theme.rgb},0.45)` }}
            >
              <div className="relative flex items-start gap-4">
                <span
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border"
                  style={{
                    color: `rgb(${domain.theme.rgb})`,
                    borderColor: `rgba(${domain.theme.rgb},0.30)`,
                    background: `rgba(${domain.theme.rgb},0.045)`,
                  }}
                >
                  <Icon size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-[15px] font-semibold text-white">{domain.title}</strong>
                  <span className="mt-1 block text-[12px] leading-5 text-slate-400">{domain.description}</span>
                  {children.length ? (
                    <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.045em] text-slate-600">
                      {children.map((child) => <span key={child.href}>{child.label}</span>)}
                    </span>
                  ) : null}
                </span>
                <ArrowRight
                  size={15}
                  style={{ color: `rgb(${domain.theme.rgb})` }}
                  className="mt-1 shrink-0 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function AmbientGeometry({ active }: { active: DomainDefinition | null }) {
  const rgb = active?.theme.rgb ?? "125, 211, 252";

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 border border-white/[0.025] transition-colors duration-300"
        style={{
          clipPath: "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)",
          borderColor: `rgba(${rgb},0.06)`,
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-px w-[920px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[720px] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

      {DOMAINS.map((domain, index) => (
        <div
          key={domain.id}
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border transition-all duration-300"
          style={{
            marginLeft: `${HEX_POSITIONS[index].x}rem`,
            marginTop: `${HEX_POSITIONS[index].y}rem`,
            borderColor: `rgba(${domain.theme.rgb},${active?.id === domain.id ? 0.8 : 0.22})`,
            background: `rgba(${domain.theme.rgb},${active?.id === domain.id ? 0.30 : 0.055})`,
          }}
        />
      ))}
    </div>
  );
}

function CenterCore({ active, childCount }: { active: DomainDefinition | null; childCount: number }) {
  const ActiveIcon = active?.icon;

  return (
    <section className="absolute left-1/2 top-1/2 z-40 h-56 w-48 -translate-x-1/2 -translate-y-1/2">
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
          background: active ? `rgba(${active.theme.rgb},0.52)` : "rgba(148,163,184,0.22)",
        }}
      />
      <div
        className="absolute inset-[1px] bg-[#03070c]/92"
        style={{ clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)" }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
        {active && ActiveIcon ? (
          <>
            <ActiveIcon size={25} style={{ color: `rgb(${active.theme.rgb})` }} />
            <div className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgba(${active.theme.rgb},0.72)` }}>
              active domain
            </div>
            <h2 className="mt-1.5 text-[19px] font-semibold tracking-[-0.02em] text-white">{active.title}</h2>
            <p className="mt-2 max-w-[165px] text-[11px] leading-5 text-slate-400">{active.subtitle}</p>
            <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.065em] text-slate-600">
              {childCount} direct {childCount === 1 ? "field" : "fields"}
            </div>
            <Link
              href={active.href}
              className="mt-4 inline-flex items-center gap-2 border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.055em] transition hover:bg-white/[0.04]"
              style={{ color: `rgb(${active.theme.rgb})`, borderColor: `rgba(${active.theme.rgb},0.32)` }}
            >
              enter domain <ArrowRight size={11} />
            </Link>
          </>
        ) : (
          <>
            <Boxes size={24} className="text-cyan-100/75" />
            <div className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-cyan-100/55">domain array</div>
            <div className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-white">Education Station 64</div>
            <p className="mt-2 max-w-[165px] text-[11px] leading-5 text-slate-500">Hover a field to expose its first layer.</p>
          </>
        )}
      </div>
    </section>
  );
}

function DomainHex({
  domain,
  active,
  onActivate,
}: {
  domain: DomainDefinition;
  active: boolean;
  onActivate: () => void;
}) {
  const Icon = domain.icon;

  return (
    <Link
      href={domain.href}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      className="group relative block h-60 w-52 -translate-x-1/2 -translate-y-1/2 outline-none"
      aria-label={`Explore ${domain.title}`}
    >
      <div
        className="absolute inset-0 transition-all duration-200 group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
        style={{
          clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
          background: active ? `rgba(${domain.theme.rgb},0.70)` : `rgba(${domain.theme.rgb},0.24)`,
        }}
      >
        <div
          className="absolute inset-[1px]"
          style={{
            clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            background: active
              ? `linear-gradient(155deg, rgba(${domain.theme.rgb},0.095), rgba(3,7,12,0.94) 54%)`
              : "linear-gradient(155deg, rgba(255,255,255,0.018), rgba(3,7,12,0.91) 58%)",
          }}
        />

        <div className="absolute inset-x-8 top-[31%] h-px" style={{ background: `rgba(${domain.theme.rgb},${active ? 0.38 : 0.12})` }} />
        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
          <Icon size={24} style={{ color: active ? `rgb(${domain.theme.rgb})` : `rgba(${domain.theme.rgb},0.58)` }} />
          <strong className={`mt-4 text-[15px] font-semibold leading-5 tracking-[-0.01em] ${active ? "text-white" : "text-slate-300/78"}`}>
            {domain.title}
          </strong>
          <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${domain.theme.rgb},${active ? 0.65 : 0.28})` }}>
            {domain.subtitle}
          </span>
        </div>
      </div>
    </Link>
  );
}

function ChildCluster({
  domain,
  domainIndex,
  children,
  onTrack,
}: {
  domain: DomainDefinition;
  domainIndex: number;
  children: HomepageDomainChild[];
  onTrack: () => void;
}) {
  const points = generateChildPoints(domainIndex, children.length);
  const anchor = CHILD_ANCHORS[domainIndex];
  const parent = HEX_POSITIONS[domainIndex];

  return (
    <div className="absolute inset-0 z-35" onPointerEnter={onTrack}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1360 920" preserveAspectRatio="none" aria-hidden="true">
        <line
          x1={680 + parent.x * 16}
          y1={460 + parent.y * 16}
          x2={680 + anchor.x * 16}
          y2={460 + anchor.y * 16}
          stroke={`rgba(${domain.theme.rgb},0.18)`}
          strokeWidth="1"
          strokeDasharray="3 7"
        />
      </svg>

      {children.map((child, index) => {
        const point = points[index];
        if (!point) return null;

        return (
          <div
            key={child.href}
            className="absolute left-1/2 top-1/2"
            style={{ marginLeft: `${point.x}rem`, marginTop: `${point.y}rem` }}
          >
            <Link
              href={child.href}
              onPointerEnter={onTrack}
              onFocus={onTrack}
              className="group relative block h-48 w-40 -translate-x-1/2 -translate-y-1/2 outline-none"
            >
              <div
                className="absolute inset-0 transition-all duration-180 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                style={{
                  clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                  background: `rgba(${domain.theme.rgb},0.34)`,
                }}
              >
                <div
                  className="absolute inset-[1px]"
                  style={{
                    clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                    background: `linear-gradient(155deg, rgba(${domain.theme.rgb},0.055), rgba(3,7,12,0.94) 58%)`,
                  }}
                />
                <div className="relative flex h-full flex-col items-center justify-center px-3 text-center">
                  <CornerDownRight size={13} style={{ color: `rgba(${domain.theme.rgb},0.72)` }} />
                  <span className="mt-2 text-[11px] font-semibold leading-4 tracking-[-0.005em] text-slate-100">{child.label}</span>
                  <span className="mt-2 font-mono text-[8px] uppercase tracking-[0.04em]" style={{ color: `rgba(${domain.theme.rgb},0.42)` }}>
                    open
                  </span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
