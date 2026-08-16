"use client";

import { ArrowLeftRight, ChevronRight } from "lucide-react";

export type TaxonomicRankStep = {
  rank: string;
  label: string;
  accentRgb?: string;
};

export default function TaxonomicPath({
  primary,
  secondary,
}: {
  primary: TaxonomicRankStep[];
  secondary?: TaxonomicRankStep[];
}) {
  return (
    <div className="rounded-[22px] border border-white/[0.08] bg-black/[0.18] p-4 backdrop-blur-xl">
      <PathRow steps={primary} />
      {secondary?.length ? (
        <>
          <div className="my-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-700">
            <span className="h-px flex-1 bg-white/[0.06]" />
            <ArrowLeftRight size={11} /> parallel lineage
            <span className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <PathRow steps={secondary} />
        </>
      ) : null}
    </div>
  );
}

function PathRow({ steps }: { steps: TaxonomicRankStep[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => {
        const accent = step.accentRgb ?? "52, 211, 153";
        return (
          <div key={`${step.rank}-${step.label}`} className="contents">
            {index > 0 ? <ChevronRight size={11} className="text-slate-700" /> : null}
            <div
              className="rounded-[12px] border px-3 py-2"
              style={{
                borderColor: `rgba(${accent},0.15)`,
                background: `rgba(${accent},0.035)`,
              }}
            >
              <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-slate-700">{step.rank}</div>
              <div className="mt-1 text-[10px] font-medium" style={{ color: `rgba(${accent},0.90)` }}>
                {step.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
