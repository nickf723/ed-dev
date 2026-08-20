"use client";

import { useMemo, useState } from "react";
import { BatteryCharging, Cpu, Gauge, Radio, RotateCcw, ScanLine, Settings, WifiOff } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ModuleKey = "power" | "sensor" | "compute" | "network" | "actuator";
type Health = "healthy" | "degraded" | "offline";

type Module = {
  key: ModuleKey;
  label: string;
  icon: typeof BatteryCharging;
  rgb: string;
  role: string;
};

const MODULES: readonly Module[] = [
  { key: "power", label: "Power", icon: BatteryCharging, rgb: "251,191,36", role: "supplies usable electrical energy" },
  { key: "sensor", label: "Sensor", icon: ScanLine, rgb: "94,234,212", role: "measures the physical environment" },
  { key: "compute", label: "Compute", icon: Cpu, rgb: "192,132,252", role: "interprets measurements and chooses actions" },
  { key: "network", label: "Network", icon: Radio, rgb: "56,189,248", role: "moves status and commands beyond the local device" },
  { key: "actuator", label: "Actuator", icon: Settings, rgb: "248,113,113", role: "changes the physical system" },
] as const;

const STATES: readonly Health[] = ["healthy", "degraded", "offline"];

export default function CapabilityChainLab() {
  const [health, setHealth] = useState<Record<ModuleKey, Health>>({
    power: "healthy",
    sensor: "healthy",
    compute: "healthy",
    network: "degraded",
    actuator: "healthy",
  });

  const capability = useMemo(() => evaluateCapabilities(health), [health]);

  const cycle = (key: ModuleKey) => {
    setHealth((current) => {
      const index = STATES.indexOf(current[key]);
      return { ...current, [key]: STATES[(index + 1) % STATES.length] };
    });
  };

  const reset = () => setHealth({ power: "healthy", sensor: "healthy", compute: "healthy", network: "degraded", actuator: "healthy" });

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-sky-100/[0.12]" style={{ background: "rgba(5,12,24,0.24)" }}>
      <div className="grid border-b border-sky-100/[0.08] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-sky-200/60"><Gauge size={14} /> Capability chain · fictional remote greenhouse controller</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Which useful capabilities survive when one technological subsystem weakens?</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/72">Cycle each module through healthy, degraded, and offline. The example is deliberately simple: a greenhouse controller senses temperature, computes a local decision, reports status, and can open a vent.</p>
        </div>
        <div className="border-t border-sky-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <div className="flex items-start justify-between gap-4"><span><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">System status</span><strong className="mt-2 block text-[17px] text-white">{capability.summary}</strong></span><button type="button" onClick={reset} className="flex h-9 w-9 items-center justify-center border border-white/[0.08] text-slate-500 transition hover:text-white" aria-label="Reset capability chain"><RotateCcw size={14} /></button></div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">Dependency maps are model choices. Real systems can have redundancy, graceful degradation, local fallback, manual override, multiple sensors, stored energy, and alternative network paths.</p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-2 md:grid-cols-5">
          {MODULES.map((module, index) => {
            const Icon = module.icon;
            const state = health[module.key];
            const opacity = state === "healthy" ? 0.82 : state === "degraded" ? 0.48 : 0.18;
            return (
              <button key={module.key} type="button" onClick={() => cycle(module.key)} className="relative min-h-[132px] border px-3 py-3 text-left transition hover:bg-white/[0.025]" style={{ borderColor: `rgba(${module.rgb},${state === "offline" ? 0.10 : 0.25})`, background: `rgba(${module.rgb},${state === "healthy" ? 0.055 : state === "degraded" ? 0.028 : 0.010})` }}>
                {index < MODULES.length - 1 ? <span className="absolute -right-[9px] top-1/2 z-10 hidden h-px w-4 bg-white/[0.12] md:block" /> : null}
                <span className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ color: `rgba(${module.rgb},${opacity})`, borderColor: `rgba(${module.rgb},${opacity * 0.45})` }}><Icon size={15} /></span>
                <strong className="mt-3 block text-[13px] text-white/84">{module.label}</strong>
                <span className="mt-1 block text-[11px] leading-4 text-slate-600">{module.role}</span>
                <span className="mt-3 inline-flex border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${module.rgb},${opacity})`, borderColor: `rgba(${module.rgb},${opacity * 0.34})` }}>{state}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Capability label="Sense locally" status={capability.sense} note="requires usable power and sensor" />
          <Capability label="Decide locally" status={capability.decide} note="requires sensing plus compute" />
          <Capability label="Report remotely" status={capability.report} note="requires local decision plus network" />
          <Capability label="Change environment" status={capability.act} note="requires local decision plus actuator" />
        </div>
      </div>

      <div className="grid border-t border-sky-100/[0.08] md:grid-cols-3">
        <Boundary title="Function is layered">A product can remain partly useful after one subsystem fails. “Device works” and “device is dead” are often too coarse to describe graceful degradation.</Boundary>
        <Boundary title="Interfaces become fallback paths">Manual controls, alarms, maintenance ports, local displays, and physical access can preserve capability when automation or networking is unavailable.</Boundary>
        <Boundary title="Reliability is architectural">Redundancy, diagnostics, modularity, replaceable parts, safe failure states, documentation, and repair access are technological design choices, not afterthoughts.</Boundary>
      </div>
    </Surface>
  );
}

function evaluateCapabilities(health: Record<ModuleKey, Health>) {
  const usable = (key: ModuleKey) => health[key] !== "offline";
  const quality = (keys: ModuleKey[]) => {
    if (keys.some((key) => health[key] === "offline")) return "offline" as Health;
    if (keys.some((key) => health[key] === "degraded")) return "degraded" as Health;
    return "healthy" as Health;
  };
  const sense = quality(["power", "sensor"]);
  const decide = quality(["power", "sensor", "compute"]);
  const report = quality(["power", "sensor", "compute", "network"]);
  const act = quality(["power", "sensor", "compute", "actuator"]);
  const activeCount = [sense, decide, report, act].filter((state) => state !== "offline").length;
  const summary = !usable("power") ? "No powered capability" : activeCount === 4 ? (Object.values(health).some((state) => state === "degraded") ? "Operating with degradation" : "All modeled capabilities available") : activeCount >= 2 ? "Partial local capability" : activeCount === 1 ? "Minimal capability" : "Capabilities unavailable";
  return { sense, decide, report, act, summary };
}

function Capability({ label, status, note }: { label: string; status: Health; note: string }) {
  const rgb = status === "healthy" ? "94,234,212" : status === "degraded" ? "251,191,36" : "248,113,113";
  return <div className="border-l-2 bg-black/[0.055] px-3 py-3" style={{ borderColor: `rgba(${rgb},0.34)` }}><div className="flex items-center justify-between gap-3"><strong className="text-[12px] text-slate-300/82">{label}</strong><span className="font-mono text-[10px] uppercase" style={{ color: `rgba(${rgb},0.68)` }}>{status}</span></div><p className="mt-1 text-[11px] leading-4 text-slate-600">{note}</p></div>;
}

function Boundary({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="border-b border-white/[0.06] px-4 py-4 md:border-b-0 md:border-r md:last:border-r-0"><strong className="block text-[12px] text-slate-300/82">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{children}</p></div>;
}
