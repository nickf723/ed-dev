import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Clock3,
  Layers3,
  Music2,
  ScrollText,
  Waves,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import IntervalWidget from "./IntervalWidget";
import PianoRollBackground from "./PianoRollBackground";
import VoiceLeadingLab from "./VoiceLeadingLab";

const NEIGHBORS = [
  {
    href: "/humanities/music/chords",
    label: "Chords",
    question: "Which pitches sound at once?",
    icon: Layers3,
    rgb: "251, 146, 60",
  },
  {
    href: "/humanities/music/scales",
    label: "Scales & Modes",
    question: "Which pitches belong to the field?",
    icon: Waves,
    rgb: "244, 114, 182",
  },
  {
    href: "/humanities/music/rhythm",
    label: "Rhythm & Meter",
    question: "When do harmonic events occur?",
    icon: Clock3,
    rgb: "45, 212, 191",
  },
  {
    href: "/humanities/music/notation",
    label: "Notation",
    question: "How are the relationships encoded?",
    icon: ScrollText,
    rgb: "96, 165, 250",
  },
] as const;

const HARMONY_LENSES = [
  ["Sonority", "Which pitches are sounding together right now?"],
  ["Function", "What role does this harmony play inside a tonal context?"],
  ["Progression", "How does one sonority lead to the next?"],
  ["Voice leading", "How do individual pitch lines move through those sonorities?"],
  ["Cadence", "Does a phrase create arrival, continuation, interruption, or ambiguity?"],
  ["Tuning", "Which frequency system determines the exact pitch relationships?"],
] as const;

export default function HarmonyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080309] text-slate-100 selection:bg-violet-400/25">
      <PianoRollBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_20%_15%,rgba(244,114,182,0.055),transparent_26%),linear-gradient(to_bottom,rgba(8,3,9,0.05),rgba(8,3,9,0.58))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.055] bg-[#080309]/76 px-4 pb-3 pt-4 shadow-[0_18px_58px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Humanities", href: "/humanities" },
              { label: "Music", href: "/humanities/music" },
              { label: "Theory & Composition", href: "/humanities/music/theory" },
              { label: "Harmony" },
            ]}
            eyebrow="Sonority · function · progression · voice leading · cadence · tuning"
            eyebrowStyle="rule"
            icon={AudioLines}
            title={<span>Harmony</span>}
            subtitle="Study how simultaneous pitches form sonorities, how those sonorities connect through time, and how voice leading, function, cadence, register, and tuning change what a progression does without reducing harmony to a single recipe."
            accentRgb="167, 139, 250"
            titleClassName="font-sans text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.86] tracking-[-0.062em] text-[#fff8ff]"
            headerClassName="border-white/[0.07]"
          />
        </div>

        <div className="mt-4">
          <VoiceLeadingLab />
        </div>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(350px,0.92fr)]">
          <IntervalWidget />

          <div className="rounded-[24px] border border-violet-200/[0.12] bg-[#0c0710]/76 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/65">
              <Music2 size={13} /> Harmony coordinates
            </div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">One chord can participate in several different stories.</h2>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              Harmonic analysis asks multiple questions at once. Roman numerals can describe scale-degree relationships in tonal music, but other repertoires may organize harmony through modes, drones, pitch-class sets, parallel sonorities, timbre, tuning systems, or practices that do not center functional tonality at all.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {HARMONY_LENSES.map(([label, question]) => (
                <div key={label} className="rounded-xl border border-white/[0.055] bg-white/[0.014] p-3">
                  <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-violet-300/48">{label}</div>
                  <p className="mt-1.5 text-[10px] leading-4 text-slate-500">{question}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-amber-200/[0.08] bg-amber-100/[0.018] p-3 text-[10px] leading-5 text-slate-600">
              “Tension” and “resolution” are useful analytical words in many musical contexts, but they are not universal emotional labels attached permanently to particular chords or intervals.
            </div>
          </div>
        </section>

        <nav className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Nearby music theory pages">
          {NEIGHBORS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[92px] items-center gap-3 rounded-[18px] border border-white/[0.065] bg-black/22 p-3.5 backdrop-blur-lg transition-colors hover:border-white/[0.13] hover:bg-black/32"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                  style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.2)`, background: `rgba(${item.rgb},0.035)` }}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-semibold text-slate-200">{item.label}</div>
                  <div className="mt-1 text-[9px] leading-4 text-slate-600">{item.question}</div>
                </div>
                <ArrowRight size={13} className="shrink-0 text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />
              </Link>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
