"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { DOMAINS, type DomainDefinition } from "@/lib/domains";

// Point-up hexagons share edges at these offsets for a 13rem × 15rem tile.
const HEX_POSITIONS = [
  { x: -6.5, y: -11.25 },
  { x: 6.5, y: -11.25 },
  { x: 13, y: 0 },
  { x: 6.5, y: 11.25 },
  { x: -6.5, y: 11.25 },
  { x: -13, y: 0 },
] as const;

const GHOST_POSITIONS = [
  { x: -19.5, y: -11.25 },
  { x: 19.5, y: -11.25 },
  { x: 26, y: 0 },
  { x: 19.5, y: 11.25 },
  { x: -19.5, y: 11.25 },
  { x: -26, y: 0 },
] as const;

export default function HexGrid() {
  const [active, setActive] = useState<DomainDefinition | null>(null);

  return (
    <div className="w-full">
      <div className="hidden w-full items-center justify-center lg:flex">
        <div
          className="relative mx-auto h-[650px] w-full max-w-[1260px]"
          onMouseLeave={() => setActive(null)}
        >
          <AmbientGeometry active={active} />
          <CenterNode active={active} />

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
                onActivate={() => setActive(domain)}
              />
            </div>
          ))}

          {GHOST_POSITIONS.map((position, index) => (
            <GhostHex key={`${position.x}-${position.y}-${index}`} x={position.x} y={position.y} />
          ))}
        </div>
      </div>

      <div className="grid gap-3 pb-8 sm:grid-cols-2 lg:hidden">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          return (
            <Link
              key={domain.id}
              href={domain.href}
              className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-black/30 p-4 backdrop-blur-xl transition-all hover:-translate-y-0.5"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full blur-2xl"
                style={{ background: `rgba(${domain.theme.rgb},0.14)` }}
              />
              <div className="relative flex items-center gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
                  style={{
                    color: `rgb(${domain.theme.rgb})`,
                    borderColor: `rgba(${domain.theme.rgb},0.34)`,
                    background: `rgba(${domain.theme.rgb},0.09)`,
                  }}
                >
                  <Icon size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-base font-semibold text-white">{domain.title}</strong>
                  <span className="mt-1 block text-xs text-slate-500">{domain.description}</span>
                </span>
                <ArrowRight
                  size={15}
                  style={{ color: `rgb(${domain.theme.rgb})` }}
                  className="shrink-0 transition-transform group-hover:translate-x-1"
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
        className="absolute left-1/2 top-1/2 h-[590px] w-[590px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] transition-all duration-500"
        style={{ boxShadow: `0 0 120px rgba(${rgb},0.035)` }}
      />
      <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.035]" />
      <div className="absolute left-1/2 top-1/2 h-px w-[820px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/[0.025] to-transparent" />

      {DOMAINS.map((domain, index) => (
        <div
          key={domain.id}
          className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-300"
          style={{
            marginLeft: `${HEX_POSITIONS[index].x}rem`,
            marginTop: `${HEX_POSITIONS[index].y}rem`,
            background: `rgba(${domain.theme.rgb},${active?.id === domain.id ? 0.12 : 0.035})`,
          }}
        />
      ))}
    </div>
  );
}

function CenterNode({ active }: { active: DomainDefinition | null }) {
  const ActiveIcon = active?.icon;

  return (
    <section
      className="absolute left-1/2 top-1/2 z-40 flex h-64 w-64 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-black/78 p-7 text-center shadow-[0_0_110px_rgba(0,0,0,0.72)] backdrop-blur-2xl transition-all duration-300"
      style={{
        borderColor: active ? `rgba(${active.theme.rgb},0.42)` : "rgba(255,255,255,0.11)",
        boxShadow: active
          ? `0 0 92px rgba(${active.theme.rgb},0.14), 0 30px 100px rgba(0,0,0,0.58)`
          : "0 30px 100px rgba(0,0,0,0.58)",
      }}
    >
      {active && ActiveIcon ? (
        <>
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl border"
            style={{
              color: `rgb(${active.theme.rgb})`,
              borderColor: `rgba(${active.theme.rgb},0.40)`,
              background: `rgba(${active.theme.rgb},0.10)`,
              boxShadow: `0 0 26px rgba(${active.theme.rgb},0.10)`,
            }}
          >
            <ActiveIcon size={23} />
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white">{active.title}</h2>
          <p className="mt-3 max-w-[205px] text-[11px] leading-5 text-slate-400">{active.description}</p>
          <Link
            href={active.href}
            className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-semibold transition-all hover:brightness-125"
            style={{
              color: `rgb(${active.theme.rgb})`,
              borderColor: `rgba(${active.theme.rgb},0.44)`,
              background: `rgba(${active.theme.rgb},0.10)`,
            }}
          >
            Explore <ArrowRight size={12} />
          </Link>
        </>
      ) : (
        <>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.07] text-cyan-100 shadow-[0_0_26px_rgba(125,211,252,0.08)]">
            <LayoutGrid size={22} />
          </span>
          <div className="mt-4 text-xl font-semibold tracking-[-0.025em] text-white">Education Station 64</div>
          <p className="mt-2 max-w-[190px] text-[11px] leading-5 text-slate-500">Choose a field to explore.</p>
        </>
      )}
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
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group relative block h-60 w-52 -translate-x-1/2 -translate-y-1/2 outline-none"
      aria-label={`Explore ${domain.title}`}
    >
      <div
        className="absolute inset-0 transition-all duration-300 group-hover:z-20 group-hover:scale-[1.045] group-focus-visible:z-20 group-focus-visible:scale-[1.045]"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: active ? `rgba(${domain.theme.rgb},0.70)` : `rgba(${domain.theme.rgb},0.27)`,
          filter: active
            ? `drop-shadow(0 0 30px rgba(${domain.theme.rgb},0.31))`
            : `drop-shadow(0 0 18px rgba(${domain.theme.rgb},0.055))`,
        }}
      >
        <div
          className="absolute inset-[1px]"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: active
              ? `linear-gradient(145deg, rgba(${domain.theme.rgb},0.30), rgba(4,7,12,0.88))`
              : `linear-gradient(145deg, rgba(${domain.theme.rgb},0.055), rgba(4,7,12,0.90))`,
          }}
        />

        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-all"
            style={{
              color: active ? `rgb(${domain.theme.rgb})` : `rgba(${domain.theme.rgb},0.62)`,
              borderColor: active ? `rgba(${domain.theme.rgb},0.44)` : `rgba(${domain.theme.rgb},0.17)`,
              background: active ? `rgba(${domain.theme.rgb},0.11)` : `rgba(${domain.theme.rgb},0.035)`,
            }}
          >
            <Icon size={22} />
          </span>
          <strong className={`mt-4 text-sm font-semibold leading-4 ${active ? "text-white" : "text-slate-300/75"}`}>
            {domain.title}
          </strong>
        </div>
      </div>
    </Link>
  );
}

function GhostHex({ x, y }: { x: number; y: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-48 w-40 -translate-x-1/2 -translate-y-1/2 opacity-[0.10]"
      style={{ marginLeft: `${x}rem`, marginTop: `${y}rem` }}
    >
      <div
        className="absolute inset-0 bg-slate-400/30"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      />
      <div
        className="absolute inset-[1px] bg-[#050811]/80"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      />
    </div>
  );
}
