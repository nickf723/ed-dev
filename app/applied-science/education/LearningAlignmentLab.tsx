"use client";

import { useState } from "react";
import { BookOpenCheck, ClipboardCheck, Layers3, Target } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import {
  EDUCATION_ACTIVITIES,
  EDUCATION_EVIDENCE_TASKS,
  EDUCATION_FIT_META,
  EDUCATION_GOALS,
  evaluateEducationAlignment,
  type EducationActivityKey,
  type EducationEvidenceKey,
  type EducationGoalKey,
} from "./educationModel";

export default function LearningAlignmentLab() {
  const [goalKey, setGoalKey] = useState<EducationGoalKey>("explanation");
  const [activityKey, setActivityKey] =
    useState<EducationActivityKey>("explain");
  const [evidenceKey, setEvidenceKey] =
    useState<EducationEvidenceKey>("explanation");

  const goal = EDUCATION_GOALS[goalKey];
  const activity =
    EDUCATION_ACTIVITIES.find((item) => item.key === activityKey) ??
    EDUCATION_ACTIVITIES[0];
  const evidence =
    EDUCATION_EVIDENCE_TASKS.find((item) => item.key === evidenceKey) ??
    EDUCATION_EVIDENCE_TASKS[0];
  const alignment = evaluateEducationAlignment(
    goalKey,
    activityKey,
    evidenceKey
  );
  const activityFit = EDUCATION_FIT_META[alignment.activityFit];
  const evidenceFit = EDUCATION_FIT_META[alignment.evidenceFit];

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[26px] border-blue-100/[0.10]"
      style={{ background: "rgba(7,9,17,0.29)" }}
    >
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-100/60">
            <Target size={13} /> Alignment studio
          </div>
          <h3 className="mt-1.5 text-[clamp(1.5rem,2.6vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">
            If the goal changes, the evidence should probably change too.
          </h3>
          <p className="text-slate-300/78 mt-2 max-w-3xl text-[14px] leading-6">
            Choose a learning goal, an activity, and an evidence task. The
            readout checks direct alignment between the stated performance and
            the task. It does not rank teaching methods or predict learning.
          </p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-4 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">
            Learning target
          </span>
          <strong
            className="mt-1.5 block text-[18px]"
            style={{ color: `rgb(${goal.rgb})` }}
          >
            {goal.label}
          </strong>
          <p className="mt-1.5 text-[13px] leading-5 text-slate-400">
            {goal.target}
          </p>
        </div>
      </div>

      <div className="grid gap-3 p-3 sm:p-4 xl:grid-cols-[165px_minmax(0,1fr)_300px]">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
            1 · Goal
          </div>
          <div className="mt-2 space-y-1.5">
            {(Object.keys(EDUCATION_GOALS) as EducationGoalKey[]).map((key) => {
              const item = EDUCATION_GOALS[key];
              const active = key === goalKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setGoalKey(key)}
                  className="w-full border px-3 py-2.5 text-left text-[13px] font-semibold transition"
                  style={{
                    color: active
                      ? `rgb(${item.rgb})`
                      : "rgba(203,213,225,0.72)",
                    borderColor: active
                      ? `rgba(${item.rgb},0.30)`
                      : "rgba(255,255,255,0.06)",
                    background: active
                      ? `rgba(${item.rgb},0.05)`
                      : "rgba(0,0,0,0.03)",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Selector
            icon={BookOpenCheck}
            eyebrow="2 · Learning activity"
            items={EDUCATION_ACTIVITIES}
            selectedKey={activityKey}
            onSelect={(key) => setActivityKey(key as EducationActivityKey)}
          />
          <Selector
            icon={ClipboardCheck}
            eyebrow="3 · Evidence task"
            items={EDUCATION_EVIDENCE_TASKS}
            selectedKey={evidenceKey}
            onSelect={(key) => setEvidenceKey(key as EducationEvidenceKey)}
          />
        </div>

        <div className="border border-white/[0.065] bg-black/[0.045] p-4 xl:sticky xl:top-[172px] xl:self-start">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
            <Layers3 size={12} /> Alignment readout
          </div>
          <FitReadout
            label="Practice opportunity"
            fit={activityFit}
            item={activity.label}
          />
          <FitReadout
            label="Evidence directness"
            fit={evidenceFit}
            item={evidence.label}
          />
          <div className="mt-4 border-t border-white/[0.06] pt-3">
            <strong className="text-[11px] uppercase tracking-[0.05em] text-blue-100/60">
              Next design question
            </strong>
            <p className="mt-2 text-[12px] leading-5 text-slate-400">
              {alignment.nextMove}
            </p>
          </div>
          <p className="mt-3 text-[11px] leading-4 text-slate-600">
            “Direct” means directly aligned to this toy target. It does not mean
            universally superior or sufficient by itself.
          </p>
        </div>
      </div>
    </Surface>
  );
}

function Selector({
  icon: Icon,
  eyebrow,
  items,
  selectedKey,
  onSelect,
}: {
  icon: typeof BookOpenCheck;
  eyebrow: string;
  items: readonly { key: string; label: string; note: string }[];
  selectedKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="border border-white/[0.06] bg-black/[0.035] p-3">
      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500">
        <Icon size={12} /> {eyebrow}
      </div>
      <div className="mt-2 space-y-1.5">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            className={`w-full border px-3 py-2 text-left transition ${selectedKey === item.key ? "border-blue-300/24 bg-blue-300/[0.045]" : "border-white/[0.055] bg-black/[0.02]"}`}
          >
            <strong className="text-white/82 block text-[12px] leading-4">
              {item.label}
            </strong>
            <span className="mt-1 block text-[11px] leading-4 text-slate-500">
              {item.note}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FitReadout({
  label,
  fit,
  item,
}: {
  label: string;
  fit: { label: string; rgb: string; description: string };
  item: string;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400">{label}</span>
        <span
          className="border px-2 py-1 font-mono text-[11px] uppercase"
          style={{
            color: `rgb(${fit.rgb})`,
            borderColor: `rgba(${fit.rgb},0.25)`,
            background: `rgba(${fit.rgb},0.04)`,
          }}
        >
          {fit.label}
        </span>
      </div>
      <strong className="text-white/82 mt-1.5 block text-[13px] leading-5">
        {item}
      </strong>
      <p className="mt-1 text-[11px] leading-5 text-slate-500">
        {fit.description}
      </p>
    </div>
  );
}
