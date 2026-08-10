"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { DOMAINS, type DomainDefinition } from "@/lib/domains";

const DESKTOP_POSITIONS = [
  { left: "29%", top: "18%" },
  { left: "71%", top: "18%" },
  { left: "86%", top: "50%" },
  { left: "71%", top: "82%" },
  { left: "29%", top: "82%" },
  { left: "14%", top: "50%" },
] as const;

const CONNECTOR_POINTS = [
  { x: 29, y: 18 },
  { x: 71, y: 18 },
  { x: 86, y: 50 },
  { x: 71, y: 82 },
  { x: 29, y: 82 },
  { x: 14, y: 50 },
] as const;

export default function HexGrid() {
  const [activeId, setActiveId] = useState(DOMAINS[1].id);
  const active = DOMAINS.find((domain) => domain.id === activeId) ?? DOMAINS[0];
  const ActiveIcon = active.icon;

  return (
    <div className="w-full">
      <div className="hidden h-[610px] w-full lg:block">
        <div className="relative mx-auto h-full w-full max-w-[1240px]">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {CONNECTOR_POINTS.map((point, index) => {
              const domain = DOMAINS[index];
              const selected = domain.id === active.id;
              return (
                <line
                  key={domain.id}
                  x1="50"
                  y1="50"
                  x2={point.x}
                  y2={point.y}
                  stroke={`rgba(${domain.theme.rgb},${selected ? 0.46 : 0.10})`}
                  strokeWidth={selected ? 0.34 : 0.16}
                  strokeDasharray={selected ? "0" : "1.2 1.4"}
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-300"
                />
              );
            })}
            <circle cx="50" cy="50" r="17" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="0.18" vectorEffect="non-scaling-stroke" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.028)" strokeWidth="0.16" strokeDasharray="1 1.6" vectorEffect="non-scaling-stroke" />
          </svg>

          <section
            className="absolute left-1/2 top-1/2 z-20 flex h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-black/50 p-9 text-center backdrop-blur-2xl transition-all duration-500"
            style={{
              borderColor: `rgba(${active.theme.rgb},0.36)`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 90px rgba(0,0,0,0.48), 0 0 72px rgba(${active.theme.rgb},0.11)`,
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-[20px] border transition-all duration-300"
              style={{
                color: `rgb(${active.theme.rgb})`,
                borderColor: `rgba(${active.theme.rgb},0.40)`,
                background: `rgba(${active.theme.rgb},0.10)`,
                boxShadow: `0 0 30px rgba(${active.theme.rgb},0.14)`,
              }}
            >
              <ActiveIcon size={27} strokeWidth={1.55} />
            </div>

            <div className="mt-4 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-600">
              Domain {String(DOMAINS.findIndex((domain) => domain.id === active.id) + 1).padStart(2, "0")}
            </div>
            <h2 className="mt-2 text-2xl font-semibold leading-none tracking-[-0.035em] text-white">{active.title}</h2>
            <p className="mt-3 max-w-[220px] text-[11px] leading-5 text-slate-400">{active.description}</p>

            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {active.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em]"
                  style={{
                    color: `rgba(${active.theme.rgb},0.86)`,
                    borderColor: `rgba(${active.theme.rgb},0.20)`,
                    background: `rgba(${active.theme.rgb},0.055)`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={active.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all hover:brightness-125"
              style={{
                color: `rgb(${active.theme.rgb})`,
                borderColor: `rgba(${active.theme.rgb},0.42)`,
                background: `rgba(${active.theme.rgb},0.10)`,
              }}
            >
              Explore <ArrowRight size={13} />
            </Link>
          </section>

          {DOMAINS.map((domain, index) => (
            <DomainNode
              key={domain.id}
              domain={domain}
              position={DESKTOP_POSITIONS[index]}
              selected={domain.id === active.id}
              onSelect={() => setActiveId(domain.id)}
            />
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
              style={{ boxShadow: `0 0 34px rgba(${domain.theme.rgb},0.05)` }}
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
                  <span className="mt-1 block text-xs text-slate-500">{domain.subtitle}</span>
                </span>
                <ArrowRight size={15} style={{ color: `rgb(${domain.theme.rgb})` }} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function DomainNode({
  domain,
  position,
  selected,
  onSelect,
}: {
  domain: DomainDefinition;
  position: { left: string; top: string };
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = domain.icon;

  return (
    <Link
      href={domain.href}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      className="group absolute z-30 h-[132px] w-[200px] -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{ left: position.left, top: position.top }}
      aria-label={`Explore ${domain.title}`}
    >
      <div
        className="absolute inset-0 transition-all duration-300 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
        style={{
          clipPath: "polygon(18% 0%, 82% 0%, 100% 50%, 82% 100%, 18% 100%, 0% 50%)",
          background: selected ? `rgba(${domain.theme.rgb},0.52)` : `rgba(${domain.theme.rgb},0.17)`,
          filter: selected ? `drop-shadow(0 0 20px rgba(${domain.theme.rgb},0.22))` : undefined,
        }}
      >
        <div
          className="absolute inset-[1px]"
          style={{
            clipPath: "polygon(18% 0%, 82% 0%, 100% 50%, 82% 100%, 18% 100%, 0% 50%)",
            background: selected
              ? `linear-gradient(145deg, rgba(${domain.theme.rgb},0.20), rgba(5,8,14,0.88))`
              : "linear-gradient(145deg, rgba(16,20,29,0.88), rgba(5,8,14,0.88))",
          }}
        />

        <div className="relative flex h-full items-center gap-3 px-8">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all"
            style={{
              color: selected ? `rgb(${domain.theme.rgb})` : "rgb(100 116 139)",
              borderColor: selected ? `rgba(${domain.theme.rgb},0.34)` : "rgba(255,255,255,0.08)",
              background: selected ? `rgba(${domain.theme.rgb},0.08)` : "rgba(255,255,255,0.025)",
            }}
          >
            <Icon size={19} />
          </span>

          <span className="min-w-0">
            <span className="block font-mono text-[7px] uppercase tracking-[0.16em]" style={{ color: selected ? `rgba(${domain.theme.rgb},0.82)` : "rgb(71 85 105)" }}>
              {domain.subtitle}
            </span>
            <strong className={`mt-1 block text-sm font-semibold leading-4 ${selected ? "text-white" : "text-slate-400"}`}>
              {domain.title}
            </strong>
          </span>
        </div>
      </div>

      {selected ? (
        <span className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.16em] text-slate-500">
          <Sparkles size={9} style={{ color: `rgb(${domain.theme.rgb})` }} /> Selected
        </span>
      ) : null}
    </Link>
  );
}
