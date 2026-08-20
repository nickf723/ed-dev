"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import {
  CORE_DOMAIN_ORDER,
  DOMAIN_META,
  SUBJECT_ICONS,
  pairKey,
  pairingFor,
  subjectCode,
  type MatrixAxisSeed,
  type Pairing,
} from "./data";

const CELL_SIZE = 14;
const LABEL_WIDTH = 144;

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

  const groups = useMemo(() => CORE_DOMAIN_ORDER.map((domainId) => ({
    domainId,
    axes: axes.filter((axis) => axis.domainId === domainId),
  })).filter((group) => group.axes.length > 0), [axes]);

  const matrixWidth = LABEL_WIDTH + axes.length * CELL_SIZE;
  const activeIds = new Set([activeA?.id, activeB?.id].filter(Boolean));

  return (
    <section className="relative min-h-0 flex-1 overflow-hidden rounded-[24px] border border-orange-300/18 bg-black/[0.20] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(251,146,60,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.022)_1px,transparent_1px)] [background-size:30px_30px]" />
      <div className="pointer-events-none absolute right-[6%] top-[8%] h-72 w-72 rounded-full bg-orange-400/[0.045] blur-3xl" />

      <div className="relative grid min-h-0 gap-4 p-3 sm:p-4 xl:h-full xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
        <div className="min-h-0 overflow-auto rounded-[18px] border border-white/[0.045] bg-black/[0.08] custom-scrollbar xl:h-full">
          <div className="p-3 sm:p-4" style={{ width: matrixWidth, minWidth: matrixWidth }}>
            <div className="flex" style={{ marginLeft: LABEL_WIDTH }}>
              {groups.map((group) => {
                const meta = DOMAIN_META[group.domainId];
                return (
                  <div
                    key={group.domainId}
                    className="flex h-7 items-center border-b px-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]"
                    style={{
                      width: group.axes.length * CELL_SIZE,
                      color: `rgb(${meta.rgb})`,
                      borderColor: `rgba(${meta.rgb},0.22)`,
                      background: `rgba(${meta.rgb},0.035)`,
                    }}
                  >
                    {meta.label}
                  </div>
                );
              })}
            </div>

            <div className="flex">
              <div className="h-12 shrink-0 border-b border-r border-white/[0.06]" style={{ width: LABEL_WIDTH }} />
              {axes.map((axis, index) => {
                const meta = DOMAIN_META[axis.domainId];
                const groupStart = index === 0 || axes[index - 1]?.domainId !== axis.domainId;
                return (
                  <div
                    key={`column-${axis.id}`}
                    title={axis.label}
                    className="relative flex h-12 shrink-0 items-end justify-center border-b border-white/[0.05] pb-1.5"
                    style={{
                      width: CELL_SIZE,
                      borderLeft: groupStart ? `1px solid rgba(${meta.rgb},0.24)` : undefined,
                    }}
                  >
                    <span
                      className="max-h-10 truncate font-mono text-[11px] font-semibold uppercase tracking-[0.04em]"
                      style={{
                        color: `rgba(${meta.rgb},0.78)`,
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {subjectCode(axis.label)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              {axes.map((row, rowIndex) => {
                const rowMeta = DOMAIN_META[row.domainId];
                const rowGroupStart = rowIndex === 0 || axes[rowIndex - 1]?.domainId !== row.domainId;

                return (
                  <div key={`row-${row.id}`} className="flex" style={{ height: CELL_SIZE }}>
                    <div
                      title={row.label}
                      className="flex shrink-0 items-center justify-between border-r border-white/[0.055] pr-2"
                      style={{
                        width: LABEL_WIDTH,
                        borderTop: rowGroupStart ? `1px solid rgba(${rowMeta.rgb},0.28)` : undefined,
                        background: activeIds.has(row.id) ? `rgba(${rowMeta.rgb},0.075)` : undefined,
                      }}
                    >
                      <span className="truncate pl-2 text-[11px] font-medium text-slate-400">{row.label}</span>
                      <span
                        className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: `rgb(${rowMeta.rgb})`, opacity: activeIds.has(row.id) ? 1 : 0.58 }}
                      />
                    </div>

                    {axes.slice(0, rowIndex + 1).map((col, colIndex) => {
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
                            className="shrink-0 border-b border-r border-white/[0.022]"
                            style={{
                              width: CELL_SIZE,
                              height: CELL_SIZE,
                              borderLeft: colGroupStart ? `1px solid rgba(${colMeta.rgb},0.18)` : undefined,
                              borderTop: rowGroupStart ? `1px solid rgba(${rowMeta.rgb},0.18)` : undefined,
                              background: inCrosshair ? "rgba(251,146,60,0.028)" : "rgba(0,0,0,0.08)",
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
                          className="relative flex shrink-0 items-center justify-center border-b border-r transition-transform hover:z-20 hover:scale-[1.38] focus:z-20 focus:scale-[1.38] focus:outline-none"
                          style={{
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            borderRightColor: selected ? "rgba(251,146,60,0.92)" : "rgba(255,255,255,0.05)",
                            borderBottomColor: selected ? "rgba(251,146,60,0.92)" : "rgba(255,255,255,0.05)",
                            borderLeftWidth: colGroupStart ? 1 : 0,
                            borderLeftStyle: colGroupStart ? "solid" : undefined,
                            borderLeftColor: colGroupStart ? `rgba(${colMeta.rgb},0.26)` : undefined,
                            borderTopWidth: rowGroupStart ? 1 : 0,
                            borderTopStyle: rowGroupStart ? "solid" : undefined,
                            borderTopColor: rowGroupStart ? `rgba(${rowMeta.rgb},0.26)` : undefined,
                            background: pure
                              ? `rgba(${rowMeta.rgb},${selected ? 0.62 : 0.34})`
                              : `linear-gradient(135deg, rgba(${rowMeta.rgb},${selected ? 0.48 : 0.19}), rgba(${colMeta.rgb},${selected ? 0.48 : 0.19}))`,
                            boxShadow: selected ? "0 0 13px rgba(251,146,60,0.50)" : undefined,
                          }}
                        >
                          <span
                            className="rounded-full"
                            style={{
                              width: selected ? 5 : 3,
                              height: selected ? 5 : 3,
                              background: pure ? `rgb(${rowMeta.rgb})` : "rgba(255,255,255,0.82)",
                              boxShadow: selected ? "0 0 7px rgba(255,255,255,0.85)" : undefined,
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-[22px] border border-orange-300/16 bg-[#0a0705]/88 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl xl:sticky xl:top-0 xl:self-start">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/55 to-transparent" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-orange-400/[0.08] blur-3xl" />

          {activeA && activeB && current && CurrentIcon ? (
            <div className="relative flex min-h-[330px] flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <AxisChip axis={activeA} />
                {activeA.id !== activeB.id ? (
                  <>
                    <Plus size={12} className="text-orange-300/55" />
                    <AxisChip axis={activeB} />
                  </>
                ) : null}
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-300/14 bg-orange-400/[0.045] text-orange-100">
                  <CurrentIcon size={22} strokeWidth={1.45} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[22px] font-semibold tracking-[-0.035em] text-white">{current.title}</h2>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.10em] text-orange-300/58">{current.field}</div>
                </div>
              </div>

              <p className="mt-4 text-[14px] leading-6 text-slate-300/72">{current.desc}</p>

              <div className="mt-5 border-l-2 border-orange-300/28 pl-3">
                <strong className="text-[11px] text-orange-100/78">What the overlap means</strong>
                <p className="mt-1 text-[12px] leading-5 text-slate-500">The five core branches remain the canonical homes for subjects. This atlas records meaningful overlaps among them; it does not create a sixth duplicate copy of every connected field.</p>
              </div>

              {current.href ? (
                <Link
                  href={current.href}
                  className="group mt-auto flex items-center justify-between rounded-xl border border-orange-300/16 bg-orange-400/[0.045] px-3.5 py-3 text-[13px] font-semibold text-orange-100 transition-colors hover:bg-orange-400/[0.08]"
                >
                  Open {current.title}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </aside>
      </div>
    </section>
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
      <Icon size={12} />
      <span className="max-w-[132px] truncate text-[11px] font-semibold uppercase tracking-[0.06em]">{axis.label}</span>
    </span>
  );
}
