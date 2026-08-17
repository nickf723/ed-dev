"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, Ear, MessageSquare, Mic, Reply } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import { VOCAB } from "./_assets/vocab";

const STEPS = [
  {
    id: "source",
    label: "Intent",
    icon: MessageSquare,
    signal: "an idea not yet public",
    rgb: "34,211,238",
    fallback: "A communicator begins with an intention, observation, feeling, or goal. What is meant internally is not yet identical to any message another person can receive.",
  },
  {
    id: "encoding",
    label: "Encoding",
    icon: Mic,
    signal: "words · gesture · image",
    rgb: "96,165,250",
    fallback: "The communicator selects signs and forms that can make the intended meaning observable: language, tone, gesture, image, interface choices, or other symbols.",
  },
  {
    id: "noise",
    label: "Channel + Noise",
    icon: AlertCircle,
    signal: "signal under constraints",
    rgb: "244,114,182",
    fallback: "Messages move through media and environments that can remove, emphasize, delay, distort, or compete with parts of the signal. Noise can be physical, technical, semantic, social, or attentional.",
  },
  {
    id: "decoding",
    label: "Interpretation",
    icon: Ear,
    signal: "message meets context",
    rgb: "167,139,250",
    fallback: "A receiver does not simply extract a pristine original thought. Meaning is constructed using the available signal together with language, experience, expectations, relationships, and context.",
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: Reply,
    signal: "response becomes input",
    rgb: "94,234,212",
    fallback: "Responses alter what happens next. A question, facial expression, silence, click, reply, or behavioral change can become new information for other participants in the communication process.",
  },
] as const;

export default function CommunicationCycle() {
  const [step, setStep] = useState(0);
  const active = STEPS[step];
  const ActiveIcon = active.icon;
  const vocab = VOCAB.find((item) => item.id === active.id);

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-cyan-100/[0.13]"
      style={{ background: "rgba(7,9,34,0.31)" }}
    >
      <div className="grid border-b border-cyan-100/[0.08] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/70">
            <ArrowRight size={14} /> Transmission model · selective abstraction
          </div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,3rem)] font-semibold tracking-[-0.045em] text-white">
            Follow one message through the places where meaning can change.
          </h3>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-indigo-100/66">
            Select a stage to isolate one part of the path. The model is useful because it simplifies, but conversation is usually more recursive and socially situated than a straight pipeline.
          </p>
        </div>
        <div className="border-t border-cyan-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-pink-200/62">Model boundary</div>
          <p className="mt-3 text-[13px] leading-6 text-indigo-100/58">
            Communication models foreground some mechanisms and hide others. Power, culture, relationship history, embodiment, platform design, and simultaneous feedback may matter even when they are not drawn as separate boxes.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="relative grid gap-2 md:grid-cols-5">
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-[30px] hidden h-px bg-indigo-100/[0.10] md:block" />
          <div
            className="pointer-events-none absolute left-[8%] top-[30px] hidden h-px bg-gradient-to-r from-cyan-300/70 via-violet-300/60 to-pink-300/60 transition-[width] duration-500 md:block"
            style={{ width: `${(step / (STEPS.length - 1)) * 84}%` }}
          />
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            const selected = index === step;
            const reached = index <= step;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStep(index)}
                className="group relative z-10 min-h-[104px] rounded-[16px] border px-3 py-3 text-left transition"
                style={{
                  borderColor: selected ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.07)",
                  background: selected ? `rgba(${item.rgb},0.07)` : reached ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.08)",
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full border bg-[#0b0d2b]/80"
                  style={{ color: reached ? `rgb(${item.rgb})` : "#64748b", borderColor: reached ? `rgba(${item.rgb},0.32)` : "rgba(148,163,184,0.14)" }}
                >
                  <Icon size={15} />
                </span>
                <strong className="mt-3 block text-[13px] text-white/84">{item.label}</strong>
                <span className="mt-1 block font-mono text-[11px] leading-4" style={{ color: selected ? `rgba(${item.rgb},0.72)` : "rgba(148,163,184,0.42)" }}>
                  {item.signal}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div
            className="rounded-[20px] border p-4"
            style={{ borderColor: `rgba(${active.rgb},0.20)`, background: `linear-gradient(145deg,rgba(${active.rgb},0.065),rgba(4,6,24,0.18))` }}
          >
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${active.rgb},0.76)` }}>
              <ActiveIcon size={14} /> Stage {String(step + 1).padStart(2, "0")}
            </div>
            <strong className="mt-3 block text-[20px] text-white">{active.label}</strong>
            <span className="mt-2 block text-[12px] leading-5 text-indigo-100/50">{active.signal}</span>
          </div>

          <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-[10px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-indigo-200/45">What to notice</div>
            <p className="mt-2 text-[14px] leading-6 text-indigo-50/68">{vocab?.def ?? active.fallback}</p>
            <div className="mt-4 border-l border-cyan-200/20 pl-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-cyan-200/48">Example</span>
              <p className="mt-1 text-[12px] leading-5 text-indigo-100/48">{vocab?.example ?? stageExample(active.id)}</p>
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function stageExample(id: string) {
  switch (id) {
    case "source":
      return "You want a teammate to understand that a deadline has become risky.";
    case "encoding":
      return "You choose a short written message, a graph, and a calm tone rather than sending only a warning emoji.";
    case "noise":
      return "The message arrives during a busy meeting, and the graph is difficult to read on a phone.";
    case "decoding":
      return "The teammate interprets your wording using prior project history and their assumptions about urgency.";
    default:
      return "Their reply changes what you explain next, turning the first message into one turn of a longer interaction.";
  }
}
