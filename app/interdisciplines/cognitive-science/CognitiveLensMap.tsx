"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Brain,
  BrainCircuit,
  Cpu,
  Languages,
  Lightbulb,
  Users,
  type LucideIcon,
} from "lucide-react";

type PhenomenonId = "face" | "sentence" | "choice";

type Lens = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  rgb: string;
  questions: Record<PhenomenonId, string>;
};

const PHENOMENA: readonly {
  id: PhenomenonId;
  label: string;
  prompt: string;
  cue: string;
}[] = [
  {
    id: "face",
    label: "Recognize a face",
    prompt: "A familiar face appears for a fraction of a second and you know who it is.",
    cue: "perception → memory → identity",
  },
  {
    id: "sentence",
    label: "Understand a sentence",
    prompt: "A noisy sentence reaches your ears, yet you recover words, structure, and intended meaning.",
    cue: "signal → language → meaning",
  },
  {
    id: "choice",
    label: "Make a choice",
    prompt: "Two options compete. You weigh consequences, habits, goals, and uncertainty before acting.",
    cue: "representation → value → action",
  },
];

const LENSES: readonly Lens[] = [
  {
    id: "neural",
    label: "Brain & Biology",
    icon: BrainCircuit,
    href: "/natural-science/biology/anatomy",
    rgb: "52, 211, 153",
    questions: {
      face: "Which neural systems extract visual features, connect them to memory, and produce familiarity?",
      sentence: "How do auditory and language-related neural systems transform a changing sound signal?",
      choice: "How do valuation, memory, emotion, and control systems compete and coordinate before action?",
    },
  },
  {
    id: "behavior",
    label: "Psychology",
    icon: Brain,
    href: "/social-science/psychology",
    rgb: "244, 114, 182",
    questions: {
      face: "How do attention, expertise, memory, expectation, and context change recognition performance?",
      sentence: "How do attention, working memory, expectation, and prior knowledge help recover meaning from noise?",
      choice: "How do framing, heuristics, emotion, learning, and individual differences change the decision?",
    },
  },
  {
    id: "computation",
    label: "Computation & AI",
    icon: Cpu,
    href: "/formal-science/computer-science/artificial-intelligence",
    rgb: "96, 165, 250",
    questions: {
      face: "What representation and algorithm could distinguish one identity from many visually similar inputs?",
      sentence: "What representations let a system infer words, syntax, and likely meaning from uncertain input?",
      choice: "What objective, state representation, search process, or policy could generate the observed action?",
    },
  },
  {
    id: "language",
    label: "Language",
    icon: Languages,
    href: "/social-science/linguistics",
    rgb: "34, 211, 238",
    questions: {
      face: "How do names, categories, descriptions, and social labels become attached to perceived identities?",
      sentence: "Which phonological, syntactic, semantic, and pragmatic structures constrain the interpretation?",
      choice: "How does the wording of alternatives shape categories, reasons, commitments, and reported preferences?",
    },
  },
  {
    id: "philosophy",
    label: "Philosophy of Mind",
    icon: Lightbulb,
    href: "/humanities/philosophy",
    rgb: "251, 191, 36",
    questions: {
      face: "What makes recognizing a person an experience of identity rather than merely matching visual patterns?",
      sentence: "What does it mean for a mental state to possess meaning or intentional content?",
      choice: "What counts as a reason, an intention, agency, freedom, or responsibility for the resulting action?",
    },
  },
  {
    id: "culture",
    label: "Culture & Social Context",
    icon: Users,
    href: "/social-science/anthropology",
    rgb: "167, 139, 250",
    questions: {
      face: "Which identities are socially salient, and how do culture, familiarity, roles, and relationships shape recognition?",
      sentence: "Which shared conventions, identities, norms, and situations are required to infer what the speaker means?",
      choice: "Which norms, institutions, relationships, identities, and cultural expectations make some options meaningful?",
    },
  },
];

export default function CognitiveLensMap() {
  const [phenomenonId, setPhenomenonId] = useState<PhenomenonId>("face");
  const phenomenon = PHENOMENA.find((item) => item.id === phenomenonId) ?? PHENOMENA[0];

  return (
    <section className="overflow-hidden rounded-[28px] border border-cyan-100/[0.12] bg-[#07101a]/62 shadow-[0_28px_100px_rgba(0,0,0,0.26)] backdrop-blur-xl">
      <div className="border-b border-white/[0.08] px-5 py-5 sm:px-7">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-200/70">One phenomenon · six explanatory lenses</div>
        <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">Change the phenomenon. Watch the questions change.</h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-300">
          Cognitive science works by coordinating explanations that live at different levels. No single lens below is expected to replace the others.
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {PHENOMENA.map((item) => {
            const selected = item.id === phenomenonId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPhenomenonId(item.id)}
                className="rounded-[16px] border px-4 py-3 text-left transition"
                style={{
                  borderColor: selected ? "rgba(34,211,238,0.38)" : "rgba(255,255,255,0.07)",
                  background: selected ? "rgba(34,211,238,0.07)" : "rgba(0,0,0,0.12)",
                }}
                aria-pressed={selected}
              >
                <strong className={`block text-[14px] font-semibold ${selected ? "text-cyan-50" : "text-slate-300"}`}>{item.label}</strong>
                <span className="mt-1 block text-[12px] leading-5 text-slate-500">{item.cue}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mx-auto max-w-[720px] rounded-[22px] border border-white/[0.09] bg-black/[0.20] px-5 py-5 text-center">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-violet-200/65">Phenomenon</div>
          <p className="mt-2 text-[18px] leading-8 text-white">{phenomenon.prompt}</p>
        </div>

        <div className="relative mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-200/[0.12] via-violet-200/[0.05] to-transparent xl:block" />
          {LENSES.map((lens) => {
            const Icon = lens.icon;
            return (
              <Link
                key={lens.id}
                href={lens.href}
                className="group relative min-h-[210px] overflow-hidden rounded-[20px] border p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.03]"
                style={{
                  borderColor: `rgba(${lens.rgb},0.18)`,
                  background: `linear-gradient(145deg, rgba(${lens.rgb},0.06), rgba(4,9,15,0.66) 55%, rgba(4,8,13,0.52))`,
                }}
              >
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-55 blur-3xl" style={{ background: `rgba(${lens.rgb},0.10)` }} />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-[13px] border"
                      style={{ color: `rgb(${lens.rgb})`, borderColor: `rgba(${lens.rgb},0.28)`, background: `rgba(${lens.rgb},0.05)` }}
                    >
                      <Icon size={18} strokeWidth={1.55} />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.05em] text-slate-600">lens</span>
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.025em] text-white">{lens.label}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-slate-300/88">{lens.questions[phenomenonId]}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[10px] uppercase tracking-[0.045em]">
                    <span style={{ color: `rgba(${lens.rgb},0.72)` }}>follow discipline</span>
                    <ArrowRight size={14} style={{ color: `rgb(${lens.rgb})` }} className="transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
