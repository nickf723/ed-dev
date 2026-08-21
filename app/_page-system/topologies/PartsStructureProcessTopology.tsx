"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import { ArrowRight, Boxes, Network, RefreshCw } from "lucide-react";
import { useWorldDirector, WorldSceneFocus } from "@/app/_page-system/scene";

export type StructureStage = {
  id: string;
  label: string;
  question: string;
  summary: string;
  rgb: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  specimen?: ReactNode;
};

const FALLBACK_ICONS = [Boxes, Network, RefreshCw];

export default function PartsStructureProcessTopology({
  stages,
  presentation = "panel",
}: {
  stages: StructureStage[];
  presentation?: "panel" | "world";
}) {
  const director = useWorldDirector();
  const [selectedId, setSelectedId] = useState(stages[0]?.id ?? "");
  const directed = stages.find((stage) => stage.id === director.scene);
  const selected =
    directed ?? stages.find((stage) => stage.id === selectedId) ?? stages[0];
  if (!selected) return null;

  function selectStage(id: string) {
    setSelectedId(id);
    director.pinScene(id);
  }

  const world = presentation === "world";

  return (
    <div
      className={`overflow-hidden rounded-[30px] border ${
        world
          ? "border-white/[0.11] bg-black/[0.10] shadow-[0_28px_100px_rgba(0,0,0,0.22)] backdrop-blur-md"
          : "border-white/[0.09] bg-black/[0.20] shadow-[0_30px_105px_rgba(0,0,0,0.24)] backdrop-blur-xl"
      }`}
    >
      {!world ? (
        <div className="grid gap-5 border-b border-white/[0.08] p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="text-emerald-200/72 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
              Parts → structure → process
            </div>
            <h2 className="mt-3 text-[clamp(2rem,3.6vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
              Understanding a system means changing the unit you are looking at.
            </h2>
          </div>
          <p className="text-slate-300/68 text-[14px] leading-7">
            Identify the pieces, ask how their arrangement creates new
            properties, then follow how the structure changes over time. The
            same grammar works far beyond chemistry.
          </p>
        </div>
      ) : (
        <div className="border-b border-white/[0.08] px-5 py-4 sm:px-6">
          <div className="text-emerald-100/64 font-mono text-[11px] font-semibold uppercase tracking-[0.13em]">
            Move between chemical scales
          </div>
          <p className="text-slate-200/68 mt-2 max-w-4xl text-[14px] leading-6">
            Select a level to reorganize the diagram, active record, and
            specimen while the representation bench remains stable behind it.
          </p>
        </div>
      )}

      <div
        className={`grid gap-4 ${world ? "p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_390px]" : "p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_360px]"}`}
      >
        <div className="relative grid gap-3 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[15%] right-[15%] top-[76px] hidden h-px bg-gradient-to-r from-emerald-300/30 via-cyan-300/30 to-amber-300/30 md:block" />
          {stages.map((stage, index) => {
            const Icon = stage.icon ?? FALLBACK_ICONS[index] ?? Boxes;
            const active = selected.id === stage.id;
            return (
              <WorldSceneFocus
                key={stage.id}
                scene={stage.id}
                className="relative z-10"
              >
                <button
                  type="button"
                  onClick={() => selectStage(stage.id)}
                  className={`group relative w-full rounded-[22px] border p-5 text-left transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60 ${
                    world
                      ? "min-h-[245px] bg-black/[0.20] backdrop-blur-sm"
                      : "min-h-[270px]"
                  }`}
                  style={{
                    borderColor: `rgba(${stage.rgb},${active ? 0.36 : 0.13})`,
                    backgroundImage: `linear-gradient(145deg,rgba(${stage.rgb},${active ? 0.11 : 0.035}),rgba(0,0,0,${world ? 0.16 : 0.24}))`,
                    boxShadow: active
                      ? `0 18px 55px rgba(${stage.rgb},0.10)`
                      : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-[15px] border"
                      style={{
                        color: `rgb(${stage.rgb})`,
                        borderColor: `rgba(${stage.rgb},0.28)`,
                        background: `rgba(${stage.rgb},0.055)`,
                      }}
                    >
                      <Icon size={19} />
                    </span>
                    <span className="text-white/32 font-mono text-[11px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: `rgba(${stage.rgb},0.74)` }}
                  >
                    {stage.question}
                  </div>
                  <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-white">
                    {stage.label}
                  </h3>
                  <p className="text-slate-300/66 mt-3 text-[14px] leading-6">
                    {stage.summary}
                  </p>
                  {index < stages.length - 1 ? (
                    <ArrowRight
                      size={16}
                      className="absolute -right-[22px] top-[69px] hidden text-white/[0.18] md:block"
                    />
                  ) : null}
                </button>
              </WorldSceneFocus>
            );
          })}
        </div>

        <aside className="rounded-[23px] border border-white/[0.09] bg-black/[0.24] p-5 backdrop-blur-md sm:p-6">
          <div
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em]"
            style={{ color: `rgba(${selected.rgb},0.72)` }}
          >
            Active scale
          </div>
          <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.045em] text-white">
            {selected.label}
          </h3>
          <p className="text-slate-200/72 mt-3 text-[15px] leading-7">
            {selected.question}
          </p>
          <div className="mt-5 flex min-h-[210px] items-center justify-center overflow-hidden rounded-[19px] border border-white/[0.08] bg-black/[0.24] p-4">
            {selected.specimen ?? (
              <DefaultSpecimen rgb={selected.rgb} id={selected.id} />
            )}
          </div>
          <p className="text-slate-400/72 mt-4 text-[13px] leading-6">
            {selected.summary}
          </p>
        </aside>
      </div>
    </div>
  );
}

function DefaultSpecimen({ rgb, id }: { rgb: string; id: string }) {
  if (id.includes("part") || id.includes("element")) {
    return (
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className="flex h-11 w-11 items-center justify-center rounded-full border font-mono text-[11px]"
            style={{
              color: `rgba(${rgb},${0.5 + (index % 4) * 0.1})`,
              borderColor: `rgba(${rgb},0.22)`,
              background: `rgba(${rgb},0.035)`,
            }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    );
  }

  if (id.includes("structure") || id.includes("molecule")) {
    return (
      <svg viewBox="0 0 240 170" className="h-[170px] w-[240px]">
        {[
          [44, 85, 100, 42],
          [44, 85, 108, 126],
          [100, 42, 178, 72],
          [108, 126, 178, 72],
        ].map(([x1, y1, x2, y2], index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={`rgba(${rgb},0.42)`}
            strokeWidth="4"
          />
        ))}
        {[
          [44, 85],
          [100, 42],
          [108, 126],
          [178, 72],
        ].map(([cx, cy], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r={13 + (index % 2) * 3}
            fill={`rgba(${rgb},0.18)`}
            stroke={`rgba(${rgb},0.58)`}
          />
        ))}
      </svg>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span
        className="h-16 w-16 rounded-full border"
        style={{
          borderColor: `rgba(${rgb},0.34)`,
          background: `rgba(${rgb},0.08)`,
        }}
      />
      <ArrowRight size={20} style={{ color: `rgba(${rgb},0.52)` }} />
      <span
        className="h-14 w-14 rounded-[16px] border"
        style={{
          borderColor: `rgba(${rgb},0.34)`,
          background: `rgba(${rgb},0.10)`,
        }}
      />
      <span className="text-[18px] text-white/30">+</span>
      <span
        className="h-10 w-10 rounded-full border"
        style={{
          borderColor: `rgba(${rgb},0.34)`,
          background: `rgba(${rgb},0.05)`,
        }}
      />
    </div>
  );
}
