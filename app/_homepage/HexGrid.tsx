"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";
import { DOMAINS, type DomainDefinition } from "@/lib/domains";

const HEX_POSITIONS = [
  { x: -6.5, y: -11.25 },
  { x: 6.5, y: -11.25 },
  { x: 13, y: 0 },
  { x: 6.5, y: 11.25 },
  { x: -6.5, y: 11.25 },
  { x: -13, y: 0 },
] as const;

export default function HexGrid() {
  const [active, setActive] = useState<DomainDefinition | null>(null);

  return (
    <div className="w-full">
      <div className="hidden w-full items-center justify-center lg:flex">
        <div
          className="relative mx-auto h-[704px] w-full max-w-[1360px]"
          onPointerLeave={() => setActive(null)}
        >
          <AmbientGeometry active={active} />
          <CenterCore active={active} />

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
        </div>
      </div>

      <div className="grid gap-2.5 pb-8 sm:grid-cols-2 lg:hidden">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          return (
            <Link
              key={domain.id}
              href={domain.href}
              className="group relative overflow-hidden border border-white/[0.09] bg-[#05080d]/82 p-4 backdrop-blur-xl transition-all hover:border-white/[0.16]"
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
                  <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.045em]" style={{ color: `rgba(${domain.theme.rgb},0.58)` }}>
                    {domain.subtitle}
                  </span>
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
        className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 border transition-colors duration-300"
        style={{
          clipPath: "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)",
          borderColor: `rgba(${rgb},0.06)`,
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-px w-[920px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[650px] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

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

function CenterCore({ active }: { active: DomainDefinition | null }) {
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
        className="absolute inset-[1px] bg-[#03070c]/88 backdrop-blur-md"
        style={{ clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)" }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
        {active && ActiveIcon ? (
          <>
            <ActiveIcon size={25} style={{ color: `rgb(${active.theme.rgb})` }} />
            <div className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${active.theme.rgb},0.72)` }}>
              domain
            </div>
            <h2 className="mt-1.5 text-[19px] font-semibold tracking-[-0.02em] text-white">{active.title}</h2>
            <p className="mt-2 max-w-[165px] text-[11px] leading-5 text-slate-400">{active.description}</p>
            <Link
              href={active.href}
              className="mt-4 inline-flex items-center gap-2 border px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.04em] transition hover:bg-white/[0.04]"
              style={{ color: `rgb(${active.theme.rgb})`, borderColor: `rgba(${active.theme.rgb},0.32)` }}
            >
              enter <ArrowRight size={11} />
            </Link>
          </>
        ) : (
          <>
            <Boxes size={24} className="text-cyan-100/75" />
            <div className="mt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-cyan-100/55">domain array</div>
            <div className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-white">Education Station 64</div>
            <p className="mt-2 max-w-[165px] text-[11px] leading-5 text-slate-500">Hover to inspect a field. Click to enter it.</p>
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
          className="absolute inset-[1px] backdrop-blur-sm"
          style={{
            clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            background: active
              ? `linear-gradient(155deg, rgba(${domain.theme.rgb},0.095), rgba(3,7,12,0.90) 54%)`
              : "linear-gradient(155deg, rgba(255,255,255,0.018), rgba(3,7,12,0.88) 58%)",
          }}
        />
        <div className="absolute inset-x-8 top-[31%] h-px" style={{ background: `rgba(${domain.theme.rgb},${active ? 0.38 : 0.12})` }} />
        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
          <Icon size={24} style={{ color: active ? `rgb(${domain.theme.rgb})` : `rgba(${domain.theme.rgb},0.58)` }} />
          <strong className={`mt-4 text-[15px] font-semibold leading-5 tracking-[-0.01em] ${active ? "text-white" : "text-slate-300/78"}`}>
            {domain.title}
          </strong>
          <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.045em]" style={{ color: `rgba(${domain.theme.rgb},${active ? 0.65 : 0.28})` }}>
            {domain.subtitle}
          </span>
        </div>
      </div>
    </Link>
  );
}
