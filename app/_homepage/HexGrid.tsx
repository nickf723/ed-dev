"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { DOMAINS, type DomainDefinition } from "@/lib/domains";

const HEX_POSITIONS = [
  { x: -7.5, y: -11.8 },
  { x: 7.5, y: -11.8 },
  { x: 15, y: 0 },
  { x: 7.5, y: 11.8 },
  { x: -7.5, y: 11.8 },
  { x: -15, y: 0 },
] as const;

export default function HexGrid() {
  const [active, setActive] = useState<DomainDefinition | null>(null);

  return (
    <div className="w-full">
      <div className="hidden min-h-[680px] w-full items-center justify-center lg:flex">
        <div className="relative flex h-0 w-0 items-center justify-center">
          <CenterNode active={active} />

          {DOMAINS.map((domain, index) => (
            <div
              key={domain.id}
              className="absolute"
              style={{
                transform: `translate(${HEX_POSITIONS[index].x}rem, ${HEX_POSITIONS[index].y}rem)`,
              }}
            >
              <DomainHex
                domain={domain}
                active={active?.id === domain.id}
                onActivate={() => setActive(domain)}
              />
            </div>
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
      className="absolute z-40 flex h-64 w-64 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-black/80 p-7 text-center shadow-[0_0_100px_rgba(0,0,0,0.72)] backdrop-blur-2xl transition-all duration-300"
      style={{
        borderColor: active ? `rgba(${active.theme.rgb},0.34)` : "rgba(255,255,255,0.10)",
        boxShadow: active
          ? `0 0 80px rgba(${active.theme.rgb},0.10), 0 28px 90px rgba(0,0,0,0.56)`
          : "0 28px 90px rgba(0,0,0,0.56)",
      }}
    >
      {active && ActiveIcon ? (
        <>
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl border"
            style={{
              color: `rgb(${active.theme.rgb})`,
              borderColor: `rgba(${active.theme.rgb},0.34)`,
              background: `rgba(${active.theme.rgb},0.08)`,
            }}
          >
            <ActiveIcon size={23} />
          </span>
          <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white">{active.title}</h2>
          <p className="mt-2 max-w-[190px] text-[10px] leading-4 text-slate-400">{active.description}</p>
          <Link
            href={active.href}
            className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-semibold transition-all hover:brightness-125"
            style={{
              color: `rgb(${active.theme.rgb})`,
              borderColor: `rgba(${active.theme.rgb},0.40)`,
              background: `rgba(${active.theme.rgb},0.09)`,
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
          <div className="mt-4 text-lg font-semibold tracking-[-0.02em] text-white">Education Station 64</div>
          <p className="mt-2 text-[10px] leading-4 text-slate-500">Choose one of the six fields to explore.</p>
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
      className="group relative block h-52 w-44 -translate-x-1/2 -translate-y-1/2 outline-none"
      aria-label={`Explore ${domain.title}`}
    >
      <div
        className="absolute inset-0 transition-all duration-300 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: active ? `rgba(${domain.theme.rgb},0.52)` : `rgba(${domain.theme.rgb},0.18)`,
          filter: active ? `drop-shadow(0 0 24px rgba(${domain.theme.rgb},0.24))` : undefined,
        }}
      >
        <div
          className="absolute inset-[1px]"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: active
              ? `linear-gradient(145deg, rgba(${domain.theme.rgb},0.22), rgba(4,7,12,0.90))`
              : "linear-gradient(145deg, rgba(12,16,24,0.86), rgba(4,7,12,0.90))",
          }}
        />

        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl border transition-all"
            style={{
              color: active ? `rgb(${domain.theme.rgb})` : "rgb(100 116 139)",
              borderColor: active ? `rgba(${domain.theme.rgb},0.38)` : "rgba(255,255,255,0.08)",
              background: active ? `rgba(${domain.theme.rgb},0.09)` : "rgba(255,255,255,0.025)",
            }}
          >
            <Icon size={21} />
          </span>
          <strong className={`mt-4 text-sm font-semibold leading-4 ${active ? "text-white" : "text-slate-400"}`}>
            {domain.title}
          </strong>
        </div>
      </div>
    </Link>
  );
}