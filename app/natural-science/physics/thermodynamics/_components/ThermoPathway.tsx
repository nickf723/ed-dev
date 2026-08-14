"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  CircleDashed,
  Flame,
  Gauge,
  Layers3,
  RefreshCw,
  Thermometer,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { ThermoFieldMode } from "./ThermoField";

export type ThermoIconKey = "thermometer" | "waves" | "gauge" | "layers" | "atom" | "refresh" | "flame";

export type ThermoPathwayLesson = {
  id: string;
  label: string;
  href: string;
  live: boolean;
  step: string;
  question: string;
  specimen: string;
  rgb: string;
  mode: ThermoFieldMode;
  icon: ThermoIconKey;
};

const ICONS: Record<ThermoIconKey, LucideIcon> = {
  thermometer: Thermometer,
  waves: Waves,
  gauge: Gauge,
  layers: Layers3,
  atom: Atom,
  refresh: RefreshCw,
  flame: Flame,
};

export default function ThermoPathway({ lessons }: { lessons: readonly ThermoPathwayLesson[] }) {
  const [activeId, setActiveId] = useState(lessons[0]?.id ?? "");
  const active = useMemo(() => lessons.find((lesson) => lesson.id === activeId) ?? lessons[0], [activeId, lessons]);

  function tune(lesson: ThermoPathwayLesson) {
    setActiveId(lesson.id);
    window.dispatchEvent(new CustomEvent<ThermoFieldMode>("thermo:mode", { detail: lesson.mode }));
  }

  function reset() {
    window.dispatchEvent(new Event("thermo:reset"));
  }

  return (
    <section className="mt-5 overflow-hidden rounded-[32px] border border-white/[0.09] bg-black/[0.035] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/75">Thermal pathway</div>
          <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-white">Follow energy from state to direction.</h2>
        </div>
        <p className="max-w-xl text-[11px] leading-5 text-slate-400/75">Hover or focus a stage and the surrounding particle field retunes to that idea. The laws appear where they become useful rather than acting as the table of contents.</p>
      </div>

      <div className="relative mt-7 hidden min-h-[360px] lg:block" onMouseLeave={reset}>
        <div className="absolute left-[6%] right-[6%] top-[172px] h-1 rounded-full bg-gradient-to-r from-cyan-300/35 via-yellow-300/42 via-orange-300/44 to-fuchsia-300/38 shadow-[0_0_28px_rgba(251,146,60,0.08)]" />
        <div className="absolute left-[6%] top-[154px] font-mono text-[9px] uppercase tracking-[0.13em] text-cyan-200/60">state</div>
        <div className="absolute right-[6%] top-[154px] font-mono text-[9px] uppercase tracking-[0.13em] text-fuchsia-200/60">direction & cycles</div>

        {lessons.map((lesson, index) => {
          const Icon = ICONS[lesson.icon];
          const top = index % 2 === 0 ? 74 : 205;
          const left = 7 + index * 17.2;
          const selected = active?.id === lesson.id;
          const inner = (
            <div className="group flex w-[150px] flex-col items-center text-center">
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-full border bg-[#09090d]/58 transition-all duration-200 group-hover:scale-110"
                style={{
                  color: `rgb(${lesson.rgb})`,
                  borderColor: `rgba(${lesson.rgb},${selected ? "0.52" : lesson.live ? "0.34" : "0.10"})`,
                  boxShadow: selected ? `0 0 56px rgba(${lesson.rgb},0.24), inset 0 0 26px rgba(${lesson.rgb},0.05)` : lesson.live ? `0 0 34px rgba(${lesson.rgb},0.12)` : undefined,
                }}
              >
                <div className="absolute inset-[-8px] rounded-full border transition-opacity" style={{ borderColor: `rgba(${lesson.rgb},0.16)`, opacity: selected ? 1 : 0 }} />
                <Icon size={20} />
              </div>
              <div className="mt-3 font-mono text-[9px]" style={{ color: `rgba(${lesson.rgb},0.72)` }}>{lesson.step}</div>
              <strong className={`mt-1 text-[12px] ${lesson.live ? "text-white" : "text-slate-600"}`}>{lesson.label}</strong>
              <span className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${lesson.rgb},${lesson.live ? "0.68" : "0.24"})` }}>{lesson.specimen}</span>
            </div>
          );

          return (
            <div key={lesson.id} className="absolute -translate-x-1/2" style={{ left: `${left}%`, top }} onMouseEnter={() => tune(lesson)}>
              {lesson.live ? (
                <Link href={lesson.href} onFocus={() => tune(lesson)} onBlur={reset}>{inner}</Link>
              ) : (
                <div aria-disabled="true">{inner}</div>
              )}
            </div>
          );
        })}

        {active ? (
          <div className="absolute bottom-0 left-1/2 w-[min(760px,78%)] -translate-x-1/2 rounded-[18px] border bg-[#09090d]/56 px-5 py-3 text-center backdrop-blur-xl" style={{ borderColor: `rgba(${active.rgb},0.16)`, boxShadow: `0 0 45px rgba(${active.rgb},0.05)` }}>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: `rgba(${active.rgb},0.70)` }}>{active.label}</span>
            <p className="mt-1 text-[11px] leading-5 text-slate-400">{active.question}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 space-y-2 lg:hidden">
        {lessons.map((lesson) => {
          const Icon = ICONS[lesson.icon];
          const inner = (
            <div className="flex items-center gap-3 rounded-[16px] border px-4 py-3" style={{ borderColor: `rgba(${lesson.rgb},${lesson.live ? "0.20" : "0.06"})`, background: `rgba(${lesson.rgb},${lesson.live ? "0.035" : "0.008"})` }}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${lesson.rgb})`, borderColor: `rgba(${lesson.rgb},0.22)` }}><Icon size={15} /></div>
              <div className="min-w-0 flex-1"><span className="font-mono text-[9px]" style={{ color: `rgba(${lesson.rgb},0.65)` }}>{lesson.step}</span><strong className={`block text-[12px] ${lesson.live ? "text-white" : "text-slate-600"}`}>{lesson.label}</strong><span className="mt-0.5 block text-[9px] text-slate-600">{lesson.question}</span></div>
              {lesson.live ? <ArrowRight size={14} style={{ color: `rgb(${lesson.rgb})` }} /> : <CircleDashed size={13} className="text-slate-700" />}
            </div>
          );
          return lesson.live ? <Link key={lesson.id} href={lesson.href} onPointerDown={() => tune(lesson)}>{inner}</Link> : <div key={lesson.id} aria-disabled="true">{inner}</div>;
        })}
      </div>
    </section>
  );
}
