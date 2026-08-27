"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";
import { DOMAINS, type DomainDefinition } from "@/lib/domains";

const HEX_CLIP = "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)";

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

      <div className="grid gap-3 pb-8 sm:grid-cols-2 lg:hidden">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          return (
            <Link
              key={domain.id}
              href={domain.href}
              className="group relative border border-white/[0.08] bg-[#05080d]/72 p-4 transition-all hover:border-white/[0.15] hover:bg-[#071019]/78"
              style={{ boxShadow: `inset 2px 0 0 rgba(${domain.theme.rgb},0.42)` }}
            >
              <div className="relative flex items-start gap-4">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border bg-black/20"
                  style={{
                    color: `rgb(${domain.theme.rgb})`,
                    borderColor: `rgba(${domain.theme.rgb},0.26)`,
                  }}
                >
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-[15px] font-semibold text-white">{domain.title}</strong>
                  <span className="mt-1 block text-[12px] leading-5 text-slate-400">{domain.description}</span>
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
          borderColor: `rgba(${rgb},0.045)`,
        }}
      />

      {DOMAINS.map((domain, index) => (
        <div
          key={domain.id}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border transition-all duration-300"
          style={{
            marginLeft: `${HEX_POSITIONS[index].x}rem`,
            marginTop: `${HEX_POSITIONS[index].y}rem`,
            borderColor: `rgba(${domain.theme.rgb},${active?.id === domain.id ? 0.76 : 0.16})`,
            background: `rgba(${domain.theme.rgb},${active?.id === domain.id ? 0.24 : 0.03})`,
          }}
        />
      ))}
    </div>
  );
}

function CenterCore({ active }: { active: DomainDefinition | null }) {
  const ActiveIcon = active?.icon;
  const rgb = active?.theme.rgb ?? "125,211,252";

  return (
    <section className="absolute left-1/2 top-1/2 z-40 h-44 w-40 -translate-x-1/2 -translate-y-1/2">
      <div
        className="absolute inset-0 border transition-colors duration-300"
        style={{
          clipPath: HEX_CLIP,
          borderColor: `rgba(${rgb},${active ? 0.46 : 0.16})`,
          background: `rgba(3,7,12,${active ? 0.82 : 0.64})`,
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        {active && ActiveIcon ? (
          <>
            <ActiveIcon size={22} style={{ color: `rgb(${active.theme.rgb})` }} />
            <h2 className="mt-3 text-[17px] font-semibold tracking-[-0.025em] text-white">{active.title}</h2>
            <p className="mt-2 max-w-[142px] text-[10px] leading-[1.5] text-slate-500">{active.description}</p>
            <Link
              href={active.href}
              className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-300 transition hover:text-white"
            >
              Open <ArrowRight size={10} />
            </Link>
          </>
        ) : (
          <Network size={23} className="text-slate-500" aria-hidden="true" />
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
      style={{ clipPath: HEX_CLIP }}
      aria-label={`Explore ${domain.title}`}
    >
      <div
        className="absolute inset-0 transition-colors duration-200"
        style={{
          clipPath: HEX_CLIP,
          background: `rgba(${domain.theme.rgb},${active ? 0.5 : 0.16})`,
        }}
      />
      <div
        className="absolute inset-[1px] bg-[#03070c]/82 transition-colors duration-200"
        style={{
          clipPath: HEX_CLIP,
          backgroundColor: active ? `rgba(${domain.theme.rgb},0.055)` : "rgba(3,7,12,0.82)",
        }}
      />
      <div
        className="absolute left-1/2 top-[31%] h-px w-12 -translate-x-1/2 transition-colors duration-200"
        style={{ backgroundColor: `rgba(${domain.theme.rgb},${active ? 0.34 : 0.09})` }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
        <Icon
          size={22}
          style={{ color: active ? `rgb(${domain.theme.rgb})` : `rgba(${domain.theme.rgb},0.56)` }}
        />
        <strong className={`mt-4 text-[15px] font-semibold leading-5 tracking-[-0.015em] transition-colors ${active ? "text-white" : "text-slate-300/78"}`}>
          {domain.title}
        </strong>
      </div>
    </Link>
  );
}
