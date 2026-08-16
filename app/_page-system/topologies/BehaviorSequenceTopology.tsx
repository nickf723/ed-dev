"use client";

import { ArrowRight, Radio, Timer } from "lucide-react";

export type BehaviorSequenceEvent = {
  id: string;
  start: number;
  end: number;
  label: string;
  actor: string;
  phase: "stimulus" | "state" | "action" | "consequence" | "feedback";
  signal?: string;
  accentRgb?: string;
};

const PHASE_LABEL: Record<BehaviorSequenceEvent["phase"], string> = {
  stimulus: "stimulus",
  state: "internal state",
  action: "action",
  consequence: "consequence",
  feedback: "feedback",
};

export default function BehaviorSequenceTopology({
  events,
  duration,
  currentTime,
  selectedId,
  onSelect,
}: {
  events: BehaviorSequenceEvent[];
  duration: number;
  currentTime: number;
  selectedId?: string;
  onSelect?: (event: BehaviorSequenceEvent) => void;
}) {
  const active = events.find((event) => currentTime >= event.start && currentTime <= event.end);

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.18] shadow-[0_34px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="grid min-h-[270px] lg:grid-cols-[1fr_330px]">
        <div className="relative overflow-hidden border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(96,165,250,0.055),transparent_52%)]" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-blue-200/60">behavior field</div>
              <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">{active?.label ?? "Observation window"}</h3>
              <p className="mt-2 max-w-xl text-[10px] leading-5 text-slate-500">{active ? `${active.actor} · ${PHASE_LABEL[active.phase]}${active.signal ? ` · ${active.signal}` : ""}` : "Move the observation clock to inspect a recorded state."}</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-blue-300/[0.12] bg-blue-400/[0.04] text-blue-200/70"><Radio size={15} /></span>
          </div>
          <SignalField events={events} currentTime={currentTime} duration={duration} />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600"><Timer size={11} /> current transition</div>
          {active ? (
            <div className="mt-4">
              <div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${active.accentRgb ?? "96,165,250"},0.72)` }}>{PHASE_LABEL[active.phase]}</div>
              <div className="mt-2 text-[18px] font-semibold text-white">{active.label}</div>
              <div className="mt-2 text-[10px] text-slate-500">Actor: {active.actor}</div>
              {active.signal ? <div className="mt-3 rounded-[12px] border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[9px] text-slate-400">Signal: {active.signal}</div> : null}
            </div>
          ) : <p className="mt-4 text-[10px] leading-5 text-slate-600">No coded event occupies this exact moment.</p>}
        </div>
      </div>

      <div className="border-t border-white/[0.07] p-4 sm:p-5">
        <div className="relative h-2 rounded-full bg-white/[0.045]">
          <div className="absolute inset-y-0 left-0 rounded-full bg-blue-300/30" style={{ width: `${Math.min(100, Math.max(0, (currentTime / duration) * 100))}%` }} />
          <div className="absolute top-1/2 h-5 w-px -translate-y-1/2 bg-white shadow-[0_0_12px_rgba(255,255,255,0.45)]" style={{ left: `${(currentTime / duration) * 100}%` }} />
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-5">
          {events.map((event, index) => {
            const selected = selectedId === event.id;
            const passed = currentTime >= event.start;
            const rgb = event.accentRgb ?? "96, 165, 250";
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => onSelect?.(event)}
                className="group rounded-[14px] border p-3 text-left transition"
                style={{
                  borderColor: `rgba(${rgb},${selected ? 0.30 : 0.10})`,
                  background: selected ? `rgba(${rgb},0.075)` : "rgba(255,255,255,0.012)",
                  opacity: passed ? 1 : 0.5,
                }}
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[7px] uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.62)` }}><span>{String(index + 1).padStart(2, "0")}</span><span>{event.start}s</span></div>
                <strong className="mt-2 block text-[9px] leading-4 text-slate-300">{event.label}</strong>
                <div className="mt-2 flex items-center gap-1 text-[7px] text-slate-700">{PHASE_LABEL[event.phase]} <ArrowRight size={8} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SignalField({ events, currentTime, duration }: { events: BehaviorSequenceEvent[]; currentTime: number; duration: number }) {
  const actors = Array.from(new Set(events.map((event) => event.actor)));
  return (
    <div className="relative mt-6 h-[150px] overflow-hidden rounded-[20px] border border-white/[0.055] bg-[#030811]/55">
      <svg viewBox="0 0 760 170" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <g fill="none" strokeLinecap="round">
          {actors.map((actor, index) => {
            const x = 100 + (index * 560) / Math.max(1, actors.length - 1);
            const y = 84 + Math.sin(index * 1.7) * 30;
            return (
              <g key={actor}>
                <circle cx={x} cy={y} r="18" fill="rgba(96,165,250,0.06)" stroke="rgba(125,211,252,0.22)" />
                <circle cx={x} cy={y} r="4" fill="rgba(191,219,254,0.65)" />
                <text x={x} y={y + 35} fill="rgba(148,163,184,0.55)" fontSize="9" textAnchor="middle">{actor}</text>
              </g>
            );
          })}
          {events.filter((event) => event.signal && currentTime >= event.start).map((event, index) => {
            const sourceIndex = actors.indexOf(event.actor);
            const sx = 100 + (sourceIndex * 560) / Math.max(1, actors.length - 1);
            const sy = 84 + Math.sin(sourceIndex * 1.7) * 30;
            const progress = Math.min(1, Math.max(0, (currentTime - event.start) / Math.max(0.5, event.end - event.start)));
            const tx = 380 + Math.cos(index * 2.2) * 220;
            const ty = 78 + Math.sin(index * 1.5) * 45;
            const mx = sx + (tx - sx) * progress;
            const my = sy + (ty - sy) * progress;
            return <path key={event.id} d={`M${sx} ${sy} Q${(sx + tx) / 2} ${Math.min(sy, ty) - 38} ${mx} ${my}`} stroke={`rgba(${event.accentRgb ?? "96,165,250"},0.32)`} strokeWidth="2" strokeDasharray="5 8" />;
          })}
        </g>
      </svg>
      <div className="absolute bottom-2 right-3 font-mono text-[7px] uppercase tracking-[0.1em] text-slate-800">{Math.round((currentTime / duration) * 100)}% observed</div>
    </div>
  );
}
