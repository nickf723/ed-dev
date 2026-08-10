"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { DOMAINS, type DomainDefinition } from "@/lib/domains";

const HEX_POSITIONS = [
  { x: -10, y: -15.5 },
  { x: 10, y: -15.5 },
  { x: 20, y: 0 },
  { x: 10, y: 15.5 },
  { x: -10, y: 15.5 },
  { x: -20, y: 0 },
] as const;

const GHOST_POSITIONS = [
  { x: -30, y: -15.5 },
  { x: 30, y: -15.5 },
  { x: -30, y: 15.5 },
  { x: 30, y: 15.5 },
] as const;

export default function HexGrid() {
  const [active, setActive] = useState<DomainDefinition | null>(null);

  return (
    <div className="w-full">
      <div className="hidden w-full items-center justify-center lg:flex">
        <div
          className="relative mx-auto h-[720px] w-full max-w-[1180px]"
          onMouseLeave={() => setActive(null)}
        >
          <CenterNode active={active} />

          {DOMAINS.map((domain, index) => (
            <div
              key={domain.id}
              className="absolute left-1/2 top-1/2"
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

function CenterNode({ active }: { active: DomainDefinition | null }) {
  const ActiveIcon = active?.icon;

  return (
    <section
      className="absolute left-1/2 top-1/2 z-40 flex h-72 w-72 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-black/75 p-8 text-center shadow-[0_0_110px_rgba(0,0,0,0.72)] backdrop-blur-2xl transition-all duration-300"
      style={{
        borderColor: active ? `rgba(${active.theme.rgb},0.38)` : "rgba(255,255,255,0.10)",
        boxShadow: active
          ? `0 0 92px rgba(${active.theme.rgb},0.12), 0 30px 100px rgba(0,0,0,0.58)`
          : "0 30px 100px rgba(0,0,0,0.58)",
      }}
    >
      {active && ActiveIcon ? (
        <>
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl border"
            style={{
              color: `rgb(${active.theme.rgb})`,
              borderColor: `rgba(${active.theme.rgb},0.38)`,
              background: `rgba(${active.theme.rgb},0.09)`,
            }}
          >
            <ActiveIcon size={23} />
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white">{active.title}</h2>
          <p className="mt-3 max-w-[210px] text-[11px] leading-5 text-slate-400">{active.description}</p>
          <Link
            href={active.href}
            className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-semibold transition-all hover:brightness-125"
            style={{
              color: `rgb(${active.theme.rgb})`,
              borderColor: `rgba(${active.theme.rgb},0.42)`,
              background: `rgba(${active.theme.rgb},0.10)`,
            }}
          >
            Explore <ArrowRight size={12} />
          </Link>
        </>
      ) : (
        <>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-200/80">
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
      className="group relative block h-56 w-48 -translate-x-1/2 -translate-y-1/2 outline-none"
      aria-label={`Explore ${domain.title}`}
    >
      <div
        className="absolute inset-0 transition-all duration-300 group-hover:scale-[1.045] group-focus-visible:scale-[1.045]"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: active ? `rgba(${domain.theme.rgb},0.62)` : `rgba(${domain.theme.rgb},0.22)`,
          filter: active ? `drop-shadow(0 0 28px rgba(${domain.theme.rgb},0.28))` : undefined,
        }}
      >
        <div
          className="absolute inset-[1px]"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: active
              ? `linear-gradient(145deg, rgba(${domain.theme.rgb},0.27), rgba(4,7,12,0.88))`
              : "linear-gradient(145deg, rgba(14,18,28,0.83), rgba(4,7,12,0.88))",
          }}
        />

        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-all"
            style={{
              color: active ? `rgb(${domain.theme.rgb})` : "rgb(100 116 139)",
              borderColor: active ? `rgba(${domain.theme.rgb},0.42)` : "rgba(255,255,255,0.09)",
              background: active ? `rgba(${domain.theme.rgb},0.10)` : "rgba(255,255,255,0.03)",
            }}
          >
            <Icon size={22} />
          </span>
          <strong className={`mt-4 text-sm font-semibold leading-4 ${active ? "text-white" : "text-slate-400"}`}>
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
      className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-36 -translate-x-1/2 -translate-y-1/2 opacity-[0.13]"
      style={{ marginLeft: `${x}rem`, marginTop: `${y}rem` }}
    >
      <div
        className="absolute inset-0 bg-slate-500/25"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      />
      <div
        className="absolute inset-[1px] bg-[#050811]/90"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      />
    </div>
  );
}
