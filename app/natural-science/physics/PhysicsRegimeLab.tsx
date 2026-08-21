"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Crosshair, Ruler, ScanSearch } from "lucide-react";
import { PHYSICS_SCENARIOS, type PhysicsBranchId } from "./physicsModel";

type BranchRoute = {
  id: PhysicsBranchId;
  label: string;
  href: string;
};

export default function PhysicsRegimeLab({
  branches,
}: {
  branches: readonly BranchRoute[];
}) {
  const [activeId, setActiveId] = useState(PHYSICS_SCENARIOS[0].id);
  const active =
    PHYSICS_SCENARIOS.find((scenario) => scenario.id === activeId) ??
    PHYSICS_SCENARIOS[0];
  const primary = branchById(branches, active.primaryNodeId);
  const companions = active.companionNodeIds.map((id) =>
    branchById(branches, id)
  );

  return (
    <section className="bg-[#07111b]/68 overflow-hidden rounded-[30px] border border-sky-100/[0.13] shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_410px]">
        <div className="p-5 sm:p-7">
          <div className="text-sky-200/68 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
            <ScanSearch size={14} aria-hidden="true" /> Regime instrument ·
            route by conditions
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
            Start with the system—not the most impressive equation you know.
          </h2>
        </div>
        <p className="border-t border-white/[0.07] p-5 text-[13px] leading-6 text-slate-400 lg:border-l lg:border-t-0 lg:p-7">
          Pick a physical situation. The primary route identifies the model
          family doing the central explanatory work; companion routes show where
          a real system crosses subject boundaries.
        </p>
      </div>

      <div className="grid xl:grid-cols-[330px_minmax(0,1fr)]">
        <div className="grid grid-cols-2 gap-2 border-b border-white/[0.07] p-4 sm:grid-cols-4 xl:grid-cols-2 xl:border-b-0 xl:border-r">
          {PHYSICS_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              aria-pressed={scenario.id === active.id}
              onClick={() => setActiveId(scenario.id)}
              className={`min-h-[64px] rounded-[15px] border px-3 py-3 text-left text-[12px] font-semibold leading-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60 ${
                scenario.id === active.id
                  ? "border-sky-200/28 bg-sky-300/[0.08] text-sky-50"
                  : "border-white/[0.06] text-slate-500 hover:border-white/[0.14] hover:text-slate-300"
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-7 xl:p-9">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-orange-200/62 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
                Selected system
              </div>
              <h3 className="mt-2 text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-none tracking-[-0.045em] text-white">
                {active.label}
              </h3>
              <p className="text-slate-300/76 mt-3 max-w-3xl text-[14px] leading-6">
                {active.setting}
              </p>
            </div>
            <Link
              href={primary.href}
              className="border-orange-200/24 group inline-flex min-h-[46px] shrink-0 items-center justify-center gap-3 rounded-full border bg-orange-300/[0.06] px-5 text-[12px] font-semibold text-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/60"
            >
              Primary · {primary.label}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="mt-7 grid border-y border-white/[0.07] lg:grid-cols-3">
            <RegimeNote
              icon={Ruler}
              label="Observe"
              text={active.observation}
              edgeClass="border-b lg:border-b-0 lg:border-r"
            />
            <RegimeNote
              icon={Crosshair}
              label="Match the regime"
              text={active.regimeCue}
              edgeClass="border-b lg:border-b-0 lg:border-r"
            />
            <RegimeNote
              icon={ScanSearch}
              label="Hold the boundary"
              text={active.boundary}
              edgeClass=""
            />
          </div>

          <div className="mt-5 flex min-h-[34px] flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.11em] text-slate-600">
              Companion routes
            </span>
            {companions.length > 0 ? (
              companions.map((branch) => (
                <Link
                  key={branch.id}
                  href={branch.href}
                  className="border-violet-200/16 text-violet-200/68 hover:border-violet-200/28 rounded-full border px-3 py-1.5 text-[11px] font-semibold hover:text-violet-100"
                >
                  {branch.label}
                </Link>
              ))
            ) : (
              <span className="text-[12px] text-slate-600">
                None required for this first model.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function branchById(branches: readonly BranchRoute[], id: PhysicsBranchId) {
  const branch = branches.find((item) => item.id === id);
  if (!branch) throw new Error(`Missing physics branch route: ${id}`);
  return branch;
}

function RegimeNote({
  icon: Icon,
  label,
  text,
  edgeClass,
}: {
  icon: typeof Ruler;
  label: string;
  text: string;
  edgeClass: string;
}) {
  return (
    <div className={`p-4 ${edgeClass}`}>
      <div className="text-sky-200/56 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.11em]">
        <Icon size={13} aria-hidden="true" /> {label}
      </div>
      <p className="mt-3 text-[12px] leading-5 text-slate-400">{text}</p>
    </div>
  );
}
