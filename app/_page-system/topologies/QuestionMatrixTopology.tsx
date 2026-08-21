"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Brain,
  Eye,
  FlaskConical,
  Grid3X3,
  HelpCircle,
  Landmark,
  Orbit,
  Palette,
  Scale,
  type LucideIcon,
} from "lucide-react";

const QUESTION_ICONS = {
  brain: Brain,
  eye: Eye,
  flask: FlaskConical,
  landmark: Landmark,
  orbit: Orbit,
  palette: Palette,
  scale: Scale,
} satisfies Record<string, LucideIcon>;

export type QuestionMatrixIcon = keyof typeof QUESTION_ICONS;

export type QuestionMatrixNode = {
  id: string;
  label: string;
  question: string;
  summary: string;
  rgb: string;
  x: number;
  y: number;
  href?: string;
  status?: "active" | "planned";
  icon?: QuestionMatrixIcon;
};

export default function QuestionMatrixTopology({
  nodes,
  xLabels,
  yLabels,
}: {
  nodes: QuestionMatrixNode[];
  xLabels: [string, string, string];
  yLabels: [string, string, string];
}) {
  const [selectedId, setSelectedId] = useState(nodes[0]?.id ?? "");
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/[0.14] shadow-[0_34px_110px_rgba(0,0,0,0.26)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-200/70">
            <Grid3X3 size={14} /> Question space
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">
            Philosophical fields overlap because the questions overlap.
          </h2>
        </div>
        <p className="text-slate-400/72 text-[14px] leading-6">
          The matrix is not a rigid taxonomy. It locates each branch by the kind
          of subject and question it emphasizes while keeping neighboring
          problems visibly close.
        </p>
      </div>

      <nav
        aria-label="Available philosophy fields"
        className="flex flex-wrap gap-2 border-b border-white/[0.07] px-5 py-4 sm:px-6"
      >
        {nodes
          .filter((node) => node.href && node.status !== "planned")
          .map((node) => (
            <Link
              key={node.id}
              href={node.href!}
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
              style={{
                color: `rgb(${node.rgb})`,
                borderColor: `rgba(${node.rgb},0.2)`,
              }}
            >
              {node.label}
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          ))}
      </nav>

      <div className="grid gap-4 p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_350px]">
        <div className="bg-[#08070d]/78 relative min-h-[560px] overflow-hidden rounded-[24px] border border-white/[0.07]">
          <div className="absolute inset-[64px] grid grid-cols-3 grid-rows-3">
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className="border-b border-r border-white/[0.055] last:border-r-0"
              />
            ))}
          </div>
          <div className="absolute left-[64px] right-[64px] top-5 grid grid-cols-3 text-center font-mono text-[11px] uppercase tracking-[0.09em] text-slate-500/70">
            {xLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="absolute bottom-[64px] left-4 top-[64px] grid grid-rows-3 items-center font-mono text-[11px] uppercase tracking-[0.09em] text-slate-500/70">
            {yLabels.map((label) => (
              <span key={label} className="-rotate-90 whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>

          {nodes.map((node) => {
            const active = node.id === selected.id;
            const Icon = node.icon ? QUESTION_ICONS[node.icon] : HelpCircle;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedId(node.id)}
                className="group absolute w-[184px] -translate-x-1/2 -translate-y-1/2 text-left"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  zIndex: active ? 7 : 4,
                }}
              >
                <div
                  className="rounded-[18px] border p-3 backdrop-blur-xl transition duration-300 group-hover:-translate-y-1"
                  style={{
                    borderColor: `rgba(${node.rgb},${active ? 0.34 : 0.14})`,
                    background: `linear-gradient(145deg,rgba(${node.rgb},${active ? 0.1 : 0.035}),rgba(5,5,9,0.78))`,
                    boxShadow: active
                      ? `0 0 42px rgba(${node.rgb},0.12)`
                      : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Icon size={16} style={{ color: `rgb(${node.rgb})` }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500/55">
                      {node.status === "planned" ? "planned" : "open"}
                    </span>
                  </div>
                  <strong className="mt-3 block text-[13px] text-white">
                    {node.label}
                  </strong>
                  <span className="text-slate-400/72 mt-1.5 line-clamp-3 block text-[11px] leading-4">
                    {node.question}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <aside className="rounded-[24px] border border-white/[0.07] bg-white/[0.014] p-5">
          <div
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em]"
            style={{ color: `rgba(${selected.rgb},0.68)` }}
          >
            Selected question
          </div>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">
            {selected.label}
          </h3>
          <p className="text-slate-200/82 mt-2 text-[15px] font-medium leading-6">
            {selected.question}
          </p>
          <p className="text-slate-400/72 mt-4 text-[14px] leading-6">
            {selected.summary}
          </p>
          <div className="mt-5 rounded-[16px] border border-white/[0.06] bg-black/[0.18] p-4 text-[13px] leading-6 text-slate-400/70">
            Nearby branches often share premises, methods, or consequences. The
            matrix makes those overlaps visible without collapsing distinct
            questions together.
          </div>
          {selected.href && selected.status !== "planned" ? (
            <Link
              href={selected.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold"
              style={{
                color: `rgb(${selected.rgb})`,
                borderColor: `rgba(${selected.rgb},0.22)`,
              }}
            >
              Open field <ArrowRight size={14} />
            </Link>
          ) : (
            <span className="mt-5 inline-block rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.09em] text-slate-500/70">
              planned field
            </span>
          )}
        </aside>
      </div>
    </div>
  );
}
