"use client";

import { useMemo, useState } from "react";
import { BookOpenCheck, ClipboardCheck, Layers3, Target } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type Fit = "direct" | "partial" | "weak";
type GoalKey = "recall" | "procedure" | "explanation" | "transfer";
type ActivityKey = "model" | "guided" | "retrieval" | "explain" | "novel";
type EvidenceKey = "recognition" | "free-recall" | "familiar-performance" | "explanation" | "novel-application";

const ACTIVITIES: readonly { key: ActivityKey; label: string; note: string }[] = [
  { key: "model", label: "Study a model / worked example", note: "Observe a representation of the target performance or idea." },
  { key: "guided", label: "Guided practice", note: "Attempt the target with prompts, scaffolds, examples, or teacher support." },
  { key: "retrieval", label: "Retrieve from memory", note: "Produce previously learned information without simply rereading it." },
  { key: "explain", label: "Explain & compare", note: "Articulate relationships, reasons, evidence, differences, or models." },
  { key: "novel", label: "Apply in a new context", note: "Use prior learning where surface features, setting, or task conditions differ." },
] as const;

const EVIDENCE_TASKS: readonly { key: EvidenceKey; label: string; note: string }[] = [
  { key: "recognition", label: "Recognition / selected response", note: "Identify an answer, feature, or relationship from supplied options." },
  { key: "free-recall", label: "Unprompted recall", note: "Produce requested information from memory without seeing the answer." },
  { key: "familiar-performance", label: "Independent familiar performance", note: "Carry out the learned procedure or performance on a familiar task type." },
  { key: "explanation", label: "Explanation with reasoning / evidence", note: "Construct an explanation, justification, model, or argument rather than merely select one." },
  { key: "novel-application", label: "Novel-context application", note: "Use the target knowledge or strategy in a meaningfully different task or context." },
] as const;

const GOALS = {
  recall: {
    label: "Recall",
    rgb: "96,165,250",
    target: "Recall key factual information without an answer cue.",
    activity: { model: "weak", guided: "partial", retrieval: "direct", explain: "partial", novel: "partial" } as Record<ActivityKey, Fit>,
    evidence: { recognition: "partial", "free-recall": "direct", "familiar-performance": "weak", explanation: "partial", "novel-application": "weak" } as Record<EvidenceKey, Fit>,
  },
  procedure: {
    label: "Procedure",
    rgb: "167,139,250",
    target: "Carry out a learned multi-step procedure independently on a familiar task type.",
    activity: { model: "partial", guided: "direct", retrieval: "weak", explain: "partial", novel: "partial" } as Record<ActivityKey, Fit>,
    evidence: { recognition: "weak", "free-recall": "weak", "familiar-performance": "direct", explanation: "partial", "novel-application": "partial" } as Record<EvidenceKey, Fit>,
  },
  explanation: {
    label: "Explanation",
    rgb: "52,211,153",
    target: "Explain why a relationship or outcome occurs using a model, reasoning, or evidence.",
    activity: { model: "partial", guided: "partial", retrieval: "weak", explain: "direct", novel: "partial" } as Record<ActivityKey, Fit>,
    evidence: { recognition: "weak", "free-recall": "partial", "familiar-performance": "partial", explanation: "direct", "novel-application": "partial" } as Record<EvidenceKey, Fit>,
  },
  transfer: {
    label: "Transfer",
    rgb: "251,191,36",
    target: "Use a learned strategy or idea in a meaningfully different context where the answer is not cued by surface familiarity.",
    activity: { model: "weak", guided: "partial", retrieval: "weak", explain: "partial", novel: "direct" } as Record<ActivityKey, Fit>,
    evidence: { recognition: "weak", "free-recall": "weak", "familiar-performance": "partial", explanation: "partial", "novel-application": "direct" } as Record<EvidenceKey, Fit>,
  },
} as const;

const FIT_META: Record<Fit, { label: string; rgb: string; description: string }> = {
  direct: { label: "direct", rgb: "52,211,153", description: "The task closely samples the stated performance." },
  partial: { label: "partial", rgb: "251,191,36", description: "The task is related, but it samples only part of the stated performance." },
  weak: { label: "weak", rgb: "148,163,184", description: "The task may still support learning, but it is a poor direct sample of this goal." },
};

export default function LearningAlignmentLab() {
  const [goalKey, setGoalKey] = useState<GoalKey>("explanation");
  const [activityKey, setActivityKey] = useState<ActivityKey>("explain");
  const [evidenceKey, setEvidenceKey] = useState<EvidenceKey>("explanation");

  const goal = GOALS[goalKey];
  const activity = ACTIVITIES.find((item) => item.key === activityKey) ?? ACTIVITIES[0];
  const evidence = EVIDENCE_TASKS.find((item) => item.key === evidenceKey) ?? EVIDENCE_TASKS[0];
  const activityFit = FIT_META[goal.activity[activityKey]];
  const evidenceFit = FIT_META[goal.evidence[evidenceKey]];

  const nextMove = useMemo(() => {
    if (goal.evidence[evidenceKey] === "weak") return "The evidence task does not directly ask learners to show the stated goal. Revise the evidence before interpreting a score as mastery.";
    if (goal.activity[activityKey] === "weak") return "The learning activity offers little direct practice of the stated goal. Add an opportunity to perform the target before the assessment.";
    if (goal.evidence[evidenceKey] === "partial" || goal.activity[activityKey] === "partial") return "The pieces are related but not fully aligned. Decide whether the goal is too broad, the activity is only preparatory, or the evidence samples only part of the intended performance.";
    return "Goal, practice opportunity, and evidence are directly aligned in this toy example. That still does not guarantee learning: prior knowledge, task quality, accessibility, feedback, motivation, time, and context still matter.";
  }, [activityKey, evidenceKey, goal]);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[26px] border-blue-100/[0.10]" style={{ background: "rgba(7,9,17,0.29)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue-100/60"><Target size={13} /> Alignment studio</div>
          <h3 className="mt-1.5 text-[clamp(1.5rem,2.6vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">If the goal changes, the evidence should probably change too.</h3>
          <p className="mt-2 max-w-3xl text-[14px] leading-6 text-slate-300/78">Choose a learning goal, an activity, and an evidence task. The readout checks direct alignment between the stated performance and the task. It does not rank teaching methods or predict learning.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-4 lg:border-l lg:border-t-0">
          <span className="font-mono text-[9px] uppercase tracking-[0.07em] text-slate-500">Learning target</span>
          <strong className="mt-1.5 block text-[18px]" style={{ color: `rgb(${goal.rgb})` }}>{goal.label}</strong>
          <p className="mt-1.5 text-[13px] leading-5 text-slate-400">{goal.target}</p>
        </div>
      </div>

      <div className="grid gap-3 p-3 sm:p-4 xl:grid-cols-[165px_minmax(0,1fr)_300px]">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-slate-500">1 · Goal</div>
          <div className="mt-2 space-y-1.5">
            {(Object.keys(GOALS) as GoalKey[]).map((key) => {
              const item = GOALS[key];
              const active = key === goalKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setGoalKey(key)}
                  className="w-full border px-3 py-2.5 text-left text-[13px] font-semibold transition"
                  style={{
                    color: active ? `rgb(${item.rgb})` : "rgba(203,213,225,0.72)",
                    borderColor: active ? `rgba(${item.rgb},0.30)` : "rgba(255,255,255,0.06)",
                    background: active ? `rgba(${item.rgb},0.05)` : "rgba(0,0,0,0.03)",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Selector icon={BookOpenCheck} eyebrow="2 · Learning activity" items={ACTIVITIES} selectedKey={activityKey} onSelect={(key) => setActivityKey(key as ActivityKey)} />
          <Selector icon={ClipboardCheck} eyebrow="3 · Evidence task" items={EVIDENCE_TASKS} selectedKey={evidenceKey} onSelect={(key) => setEvidenceKey(key as EvidenceKey)} />
        </div>

        <div className="border border-white/[0.065] bg-black/[0.045] p-4 xl:sticky xl:top-[172px] xl:self-start">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-slate-500"><Layers3 size={12} /> Alignment readout</div>
          <FitReadout label="Practice opportunity" fit={activityFit} item={activity.label} />
          <FitReadout label="Evidence directness" fit={evidenceFit} item={evidence.label} />
          <div className="mt-4 border-t border-white/[0.06] pt-3">
            <strong className="text-[10px] uppercase tracking-[0.05em] text-blue-100/60">Next design question</strong>
            <p className="mt-2 text-[12px] leading-5 text-slate-400">{nextMove}</p>
          </div>
          <p className="mt-3 text-[10px] leading-4 text-slate-600">“Direct” means directly aligned to this toy target. It does not mean universally superior or sufficient by itself.</p>
        </div>
      </div>
    </Surface>
  );
}

function Selector({ icon: Icon, eyebrow, items, selectedKey, onSelect }: { icon: typeof BookOpenCheck; eyebrow: string; items: readonly { key: string; label: string; note: string }[]; selectedKey: string; onSelect: (key: string) => void }) {
  return (
    <div className="border border-white/[0.06] bg-black/[0.035] p-3">
      <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] text-slate-500"><Icon size={12} /> {eyebrow}</div>
      <div className="mt-2 space-y-1.5">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            className={`w-full border px-3 py-2 text-left transition ${selectedKey === item.key ? "border-blue-300/24 bg-blue-300/[0.045]" : "border-white/[0.055] bg-black/[0.02]"}`}
          >
            <strong className="block text-[12px] leading-4 text-white/82">{item.label}</strong>
            <span className="mt-1 block text-[10px] leading-4 text-slate-500">{item.note}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FitReadout({ label, fit, item }: { label: string; fit: { label: string; rgb: string; description: string }; item: string }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400">{label}</span>
        <span className="border px-2 py-1 font-mono text-[9px] uppercase" style={{ color: `rgb(${fit.rgb})`, borderColor: `rgba(${fit.rgb},0.25)`, background: `rgba(${fit.rgb},0.04)` }}>{fit.label}</span>
      </div>
      <strong className="mt-1.5 block text-[13px] leading-5 text-white/82">{item}</strong>
      <p className="mt-1 text-[11px] leading-5 text-slate-500">{fit.description}</p>
    </div>
  );
}
