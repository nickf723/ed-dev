"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ClipboardList,
  FlaskConical,
  Gauge,
  RotateCcw,
  Stethoscope,
} from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import {
  MEDICINE_EVIDENCE_PACKETS,
  MEDICINE_HYPOTHESES,
  MEDICINE_REASONING_STAGES,
  calculateMedicineSupport,
  type MedicineEvidenceKey,
  type MedicineStageKey,
} from "./medicineModel";

const STAGE_ICONS = {
  observe: ClipboardList,
  interpret: Stethoscope,
  test: FlaskConical,
  act: Gauge,
  monitor: Activity,
} as const;

export default function ClinicalReasoningLab() {
  const [stage, setStage] = useState<MedicineStageKey>("observe");
  const [selectedEvidence, setSelectedEvidence] = useState<
    MedicineEvidenceKey[]
  >(["history"]);

  const activeStage =
    MEDICINE_REASONING_STAGES.find((item) => item.key === stage) ??
    MEDICINE_REASONING_STAGES[0];
  const scores = useMemo(
    () => calculateMedicineSupport(selectedEvidence),
    [selectedEvidence]
  );
  const maxScore = Math.max(...scores, 1);

  function toggleEvidence(key: MedicineEvidenceKey) {
    setSelectedEvidence((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[30px] border-teal-100/[0.10]"
      style={{ background: "rgba(5,17,16,0.28)" }}
    >
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="p-5 sm:p-6">
          <div className="text-teal-100/58 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]">
            Fictional teaching case · reasoning model
          </div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.9vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">
            Evidence should move a working assessment, not snap it to certainty.
          </h3>
          <p className="text-slate-400/78 mt-3 max-w-3xl text-[13px] leading-6">
            Turn evidence packets on and off and watch three anonymous
            hypotheses move. The scores are invented teaching weights, not
            probabilities, diagnostic thresholds, or clinical decision rules.
          </p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.06] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">
            Current stage
          </span>
          <strong
            className="mt-2 block text-[18px]"
            style={{ color: `rgb(${activeStage.rgb})` }}
          >
            {activeStage.label}
          </strong>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">
            {activeStage.prompt}
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[180px_310px_minmax(0,1fr)]">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
            Reasoning loop
          </div>
          <div className="mt-3 space-y-2">
            {MEDICINE_REASONING_STAGES.map((item) => {
              const Icon = STAGE_ICONS[item.key];
              const active = item.key === stage;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStage(item.key)}
                  className="flex w-full items-center gap-2 border px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200/60"
                  style={{
                    borderColor: active
                      ? `rgba(${item.rgb},0.30)`
                      : "rgba(255,255,255,0.06)",
                    background: active
                      ? `rgba(${item.rgb},0.055)`
                      : "rgba(0,0,0,0.035)",
                  }}
                >
                  <Icon size={13} style={{ color: `rgb(${item.rgb})` }} />
                  <span className="text-white/78 text-[11px] font-semibold">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
              Evidence packets
            </div>
            <button
              type="button"
              onClick={() => setSelectedEvidence([])}
              className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200/60"
            >
              <RotateCcw size={11} /> clear
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {MEDICINE_EVIDENCE_PACKETS.map((item) => {
              const active = selectedEvidence.includes(item.key);
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleEvidence(item.key)}
                  className="w-full border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200/60"
                  style={{
                    borderColor: active
                      ? "rgba(45,212,191,0.26)"
                      : "rgba(255,255,255,0.055)",
                    background: active
                      ? "rgba(45,212,191,0.045)"
                      : "rgba(0,0,0,0.03)",
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-[11px] text-white/80">
                      {item.label}
                    </strong>
                    <span className="font-mono text-[11px] uppercase text-slate-600">
                      {item.kind}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-600">
                    {item.note}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-[390px] border border-white/[0.065] bg-black/[0.055] p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
                Working hypotheses
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Relative support in this synthetic toy model
              </p>
            </div>
            <span className="font-mono text-[11px] text-teal-200/40">
              n={selectedEvidence.length} packets
            </span>
          </div>
          <div className="mt-8 space-y-7">
            {MEDICINE_HYPOTHESES.map((hypothesis, index) => {
              const score = scores[index];
              return (
                <div key={hypothesis.label}>
                  <div className="flex items-center justify-between">
                    <strong
                      className="text-[12px]"
                      style={{ color: `rgb(${hypothesis.rgb})` }}
                    >
                      {hypothesis.label}
                    </strong>
                    <span className="font-mono text-[11px] text-slate-600">
                      support {score}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.04]">
                    <div
                      className="h-full rounded-full transition-[width] duration-300"
                      style={{
                        width: `${(score / maxScore) * 100}%`,
                        background: `rgba(${hypothesis.rgb},0.54)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 grid gap-2 sm:grid-cols-3">
            <ReasoningRule
              title="Corroborate"
              text="Look for evidence from different sources rather than counting repeated versions of the same clue."
            />
            <ReasoningRule
              title="Seek friction"
              text="Actively notice evidence that weighs against a favored explanation."
            />
            <ReasoningRule
              title="Reassess"
              text="After testing or treatment, new observations can change the working model."
            />
          </div>
          <p className="mt-5 border-t border-white/[0.06] pt-3 text-[11px] leading-5 text-slate-600">
            Educational abstraction only. It does not represent validated
            diagnostic probabilities, treatment recommendations, or a substitute
            for medical care.
          </p>
        </div>
      </div>
    </Surface>
  );
}

function ReasoningRule({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-l border-teal-200/15 bg-teal-200/[0.02] px-3 py-2">
      <strong className="text-teal-100/58 text-[11px] uppercase tracking-[0.04em]">
        {title}
      </strong>
      <p className="mt-1 text-[11px] leading-5 text-slate-600">{text}</p>
    </div>
  );
}
