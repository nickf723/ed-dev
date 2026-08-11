"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import {
  CORE_DOMAIN_ORDER,
  DOMAIN_META,
  SUBJECT_ICONS,
  pairKey,
  pairingFor,
  subjectCode,
  type CoreDomainId,
  type MatrixAxisSeed,
  type Pairing,
} from "./data";

const CELL_SIZE = 16;
const LABEL_WIDTH = 132;

type DisplayCell = Pairing & { pure?: boolean };

function displayFor(a: MatrixAxisSeed, b: MatrixAxisSeed): DisplayCell | undefined {
  if (a.id === b.id) {
    return {
      title: a.label,
      desc: `The standalone discipline of ${a.label}.`,
      field: DOMAIN_META[a.domainId].label,
      href: a.href,
      icon: SUBJECT_ICONS[a.id] ?? DOMAIN_META[a.domainId].icon,
      pure: true,
    };
  }
  return pairingFor(a.id, b.id);
}

export default function InterdisciplinaryMatrix({ axes }: { axes: readonly MatrixAxisSeed[] }) {
  const axisById = useMemo(() => new Map(axes.map((axis) => [axis.id, axis])), [axes]);
  const defaultKey = pairKey("formal.data-science", "natural.biology");
  const fallbackKey = axes[0] ? pairKey(axes[0].id, axes[0].id) : "";
  const [activeKey, setActiveKey] = useState(
    pairingFor("formal.data-science", "natural.biology") ? defaultKey : fallbackKey,
  );

  const [activeAId, activeBId] = activeKey.split("::");
  const activeA = axisById.get(activeAId) ?? axes[0];
  const activeB = axisById.get(activeBId) ?? activeA;
  const current = activeA && activeB ? displayFor(activeA, activeB) : undefined;
  const CurrentIcon = current?.icon;

  const groups = CORE_DOMAIN_ORDER.map((domainId) => ({
    domainId,
    axes: axes.filter((axis) => axis.domainId === domainId),
  })).filter((group) => group.axes.length > 0);

  const gridTemplateColumns = `${LABEL_WIDTH}px repeat(${axes.length}, ${CELL_SIZE}px)`;
  const matrixWidth = LABEL_WIDTH + axes.length * CELL_SIZE;
  const activeIds = new Set([activeA?.id, activeB?.id].filter(Boolean));

  return (
    <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
      <section className="relative min-h-0 overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.24] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative h-full overflow-auto p-3 sm:p-4 custom-scrollbar">
          <div style={{ width: matrixWidth }}>
            <div className="flex" style={{ marginLeft: LABEL_WIDTH }}>
              {groups.map((group) => {
                const meta = DOMAIN_META[group.domainId];
                return (
                  <div
                    key={group.domainId}
                    className="flex h-7 items-center border-b border-white/[0.06] px-2 font-mono text-[7px] uppercase tracking-[0.15em]"
                    style={{
                      width: group.axes.length * CELL_SIZE,
                      color: `rgb(${meta.rgb})`,
                      borderColor: `rgba(${meta.rgb},0.20)`,
                      background: `rgba(${meta.rgb},0.035)`,
                    }}
                  >
                    {meta.label}
                  </div>
                );
              })}
            </div>

            <div className="grid gap-0" style={{ gridTemplateColumns }}>
              <div className="h-[66px] border-b border-r border-white/[0.06]" />
              {axes.map((axis, index) => {
                const meta = DOMAIN_META[axis.domainId];
                const groupStart = index === 0 || axes[index - 1]?.domainId !== axis.domainId;
                return (
                  <div
                    key={`column-${axis.id}`}
                    title={axis.label}
                    className="relative flex h-[66px] items-end justify-center border-b border-white/[0.06] pb-1"
                    style={{
                      borderLeft: groupStart ? `1px solid rgba(${meta.rgb},0.24)` : undefined,
                    }}
                  >
                    <span
                      className="max-h-[58px] truncate font-mono text-[6px] font-semibold uppercase tracking-[0.08em]"
                      style={{
                        color: `rgba(${meta.rgb},0.64)`,
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {subjectCode(axis.label)}
                    </span>
                  </div>
                );
              })}

              {axes.map((row, rowIndex) => {
                const rowMeta = DOMAIN_META[row.domainId];
                const rowGroupStart = rowIndex === 0 || axes[rowIndex - 1]?.domainId !== row.domainId;

                return (
                  <Fragment key={`row-${row.id}`}>
                    <div
                      title={row.label}
                      className="flex h-4 min-w-0 items-center justify-between border-r border-white/[0.06] pr-2"
                      style={{
                        borderTop: rowGroupStart ? `1px solid rgba(${rowMeta.rgb},0.24)` : undefined,
                        background: activeIds.has(row.id) ? `rgba(${rowMeta.rgb},0.055)` : undefined,
                      }}
                    >
                      <span className="truncate pl-2 text-[7px] font-medium text-slate-500">{row.label}</span>
                      <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${rowMeta.rgb})`, opacity: 0.62 }} />
                    </div>

                    {axes.map((col, colIndex) => {
                      const colMeta = DOMAIN_META[col.domainId];
                      const colGroupStart = colIndex === 0 || axes[colIndex - 1]?.domainId !== col.domainId;
                      const data = displayFor(row, col);
                      const key = pairKey(row.id, col.id);
                      const selected = activeKey === key;
                      const inCrosshair = activeIds.has(row.id) || activeIds.has(col.id);
                      const pure = row.id === col.id;

                      if (!data) {
                        return (
                          <div
                            key={`${row.id}-${col.id}`}
                            className="h-4 w-4 border-b border-r border-white/[0.025]"
                            style={{
                              borderLeft: colGroupStart ? `1px solid rgba(${colMeta.rgb},0.16)` : undefined,
                              borderTop: rowGroupStart ? `1px solid rgba(${rowMeta.rgb},0.16)` : undefined,
                              background: inCrosshair ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.10)",
                            }}
                          />
                        );
                      }

                      return (
                        <button
                          key={`${row.id}-${col.id}`}
                          type="button"
                          title={data.title}
                          aria-label={`${row.label} and ${col.label}: ${data.title}`}
                          onMouseEnter={() => setActiveKey(key)}
                          onFocus={() => setActiveKey(key)}
                          onClick={() => setActiveKey(key)}
                          className="relative flex h-4 w-4 items-center justify-center border-b border-r transition-transform hover:z-10 hover:scale-125 focus:z-10 focus:scale-125 focus:outline-none"
                          style={{
                            borderColor: selected ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.045)",
                            borderLeft: colGroupStart ? `1px solid rgba(${colMeta.rgb},0.24)` : undefined,
                            borderTop: rowGroupStart ? `1px solid rgba(${rowMeta.rgb},0.24)` : undefined,
                            background: pure
                              ? `rgba(${rowMeta.rgb},${selected ? 0.52 : 0.28})`
                              : `linear-gradient(135deg, rgba(${rowMeta.rgb},${selected ? 0.44 : 0.18}), rgba(${colMeta.rgb},${selected ? 0.44 : 0.18}))`,
                            boxShadow: selected ? "0 0 14px rgba(255,255,255,0.18)" : undefined,
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              background: pure ? `rgb(${rowMeta.rgb})` : "rgba(255,255,255,0.78)",
                              boxShadow: selected ? "0 0 8px rgba(255,255,255,0.8)" : undefined,
                            }}
                          />
                        </button>
                      );
                    })}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <aside className="relative min-h-0 overflow-hidden rounded-[24px] border border-white/[0.09] bg-black/35 p-5 backdrop-blur-xl">
        {activeA && activeB && current && CurrentIcon ? (
          <div className="relative flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <AxisChip axis={activeA} />
              {activeA.id !== activeB.id ? (
                <>
                  <Plus size={11} className="text-slate-700" />
                  <AxisChip axis={activeB} />
                </>
              ) : null}
            </div>

            <div
              className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl border"
              style={{
                color: activeA.id === activeB.id ? `rgb(${DOMAIN_META[activeA.domainId].rgb})` : "white",
                borderColor: "rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.035)",
              }}
            >
              <CurrentIcon size={25} strokeWidth={1.45} />
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">{current.title}</h2>
            <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-slate-600">{current.field}</div>
            <p className="mt-4 text-sm leading-6 text-slate-400">{current.desc}</p>

            <div className="mt-6 space-y-2 border-t border-white/[0.07] pt-4">
              {CORE_DOMAIN_ORDER.map((domainId) => {
                const meta = DOMAIN_META[domainId];
                return (
                  <div key={domainId} className="flex items-center gap-2 text-[9px] text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${meta.rgb})` }} />
                    <span>{meta.label}</span>
                  </div>
                );
              })}
            </div>

            {current.href ? (
              <Link
                href={current.href}
                className="group mt-auto flex items-center justify-between rounded-xl border border-white/[0.10] bg-white/[0.035] px-3 py-3 text-xs font-semibold text-white transition-colors hover:bg-white/[0.07]"
              >
                Open {current.title}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function AxisChip({ axis }: { axis: MatrixAxisSeed }) {
  const meta = DOMAIN_META[axis.domainId];
  const Icon = SUBJECT_ICONS[axis.id] ?? meta.icon;

  return (
    <span
      className="inline-flex min-w-0 items-center gap-2 rounded-full border px-2.5 py-1.5"
      style={{
        color: `rgb(${meta.rgb})`,
        borderColor: `rgba(${meta.rgb},0.20)`,
        background: `rgba(${meta.rgb},0.055)`,
      }}
    >
      <Icon size={11} />
      <span className="max-w-[105px] truncate text-[8px] font-semibold uppercase tracking-[0.08em]">{axis.label}</span>
    </span>
  );
}
