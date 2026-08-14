"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import WaveField, { type WaveFieldMode } from "./WaveField";
import {
  ArrowRight,
  CircleDashed,
  Focus,
  Glasses,
  Radio,
  ScanLine,
  Triangle,
  Waves,
  type LucideIcon,
} from "lucide-react";

type Lesson = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status?: "active" | "placeholder";
};

type Props = { lessons: Lesson[]; activeCount: number };

type Presentation = {
  step: string;
  mode: WaveFieldMode;
  icon: LucideIcon;
  rgb: string;
  specimen: string;
  question: string;
};

const PRESENTATIONS: Record<string, Presentation> = {
  "natural.physics.waves-optics.wave-motion": { step: "01", mode: "wave", icon: Waves, rgb: "34, 211, 238", specimen: "v = fλ", question: "How does a disturbance carry a pattern through space?" },
  "natural.physics.waves-optics.superposition": { step: "02", mode: "superposition", icon: Radio, rgb: "232, 121, 249", specimen: "y = y₁ + y₂", question: "What happens when waves occupy the same place at the same time?" },
  "natural.physics.waves-optics.reflection-refraction": { step: "03", mode: "refraction", icon: Triangle, rgb: "250, 204, 21", specimen: "n₁ sinθ₁ = n₂ sinθ₂", question: "How do boundaries redirect wave propagation?" },
  "natural.physics.waves-optics.diffraction": { step: "04", mode: "diffraction", icon: ScanLine, rgb: "167, 139, 250", specimen: "aperture ↔ λ", question: "Why do waves spread around edges and through openings?" },
  "natural.physics.waves-optics.lenses": { step: "05", mode: "lenses", icon: Glasses, rgb: "74, 222, 128", specimen: "1/f = 1/dₒ + 1/dᵢ", question: "How can boundaries bend many rays into an image?" },
  "natural.physics.waves-optics.resonance": { step: "06", mode: "resonance", icon: Focus, rgb: "232, 121, 249", specimen: "L = nλ/2", question: "How do reflections lock waves into stable modes?" },
};

export default function WavesOpticsHub({ lessons, activeCount }: Props) {
  const [mode, setMode] = useState<WaveFieldMode>("overview");
  const [activeId, setActiveId] = useState(lessons[0]?.id ?? "");
  const activeLesson = lessons.find((lesson) => lesson.id === activeId) ?? lessons[0];
  const activePresentation = activeLesson ? PRESENTATIONS[activeLesson.id] : undefined;

  function activate(lesson: Lesson) {
    const presentation = PRESENTATIONS[lesson.id];
    setActiveId(lesson.id);
    setMode(presentation?.mode ?? "overview");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-slate-100 selection:bg-cyan-300/25">
      <WaveField mode={mode} intensity={1.22} />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#020617]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Waves & Optics" }]}
            eyebrow="Oscillation · interference · imaging"
            icon={Waves}
            title={<span>Waves & Optics</span>}
            subtitle="Start with traveling disturbances, then build interference, boundary behavior, diffraction, imaging, and resonance from the same wave language."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.1rem,4.7vw,4.9rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f1fdff]"
            headerClassName="border-transparent"
            aside={<div className="rounded-full border border-cyan-200/[0.11] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-cyan-100/65 backdrop-blur-md">{activeCount} / {lessons.length} lessons live</div>}
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-stretch">
          <div className="rounded-[28px] border border-cyan-200/[0.10] bg-black/[0.07] p-5 backdrop-blur-md sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">Wave throughline</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] text-white">One wave language explains ripples, sound, light, images, and resonance.</h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">Frequency, wavelength, amplitude, phase, and speed form the shared vocabulary. Once waves overlap or encounter boundaries, interference and geometry create the richer phenomena we call optics.</p>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500"><span className="text-cyan-200/70">wave</span><ArrowRight size={12} className="text-slate-700" /><span>superposition</span><ArrowRight size={12} className="text-slate-700" /><span>boundary</span><ArrowRight size={12} className="text-slate-700" /><span>image</span><ArrowRight size={12} className="text-slate-700" /><span className="text-fuchsia-200/70">mode</span></div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#06101a]/38 p-5 backdrop-blur-[2px]">
            <div className="absolute left-[7%] right-[7%] top-1/2 h-px bg-gradient-to-r from-cyan-300/35 via-yellow-300/25 to-fuchsia-300/30" />
            <div className="relative z-10 flex min-h-[260px] flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600"><span>propagation</span><span>structure from waves</span></div>
              <div className="mx-auto max-w-xl text-center"><div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: activePresentation ? `rgba(${activePresentation.rgb},0.68)` : undefined }}>{activePresentation?.step ?? "wave"}</div><h2 className="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-white">{activeLesson?.label ?? "Waves"}</h2><p className="mt-2 text-[12px] leading-6 text-slate-400">{activePresentation?.question ?? "Hover the pathway to retune the optical field."}</p><div className="mt-4 font-mono text-[11px]" style={{ color: activePresentation ? `rgba(${activePresentation.rgb},0.72)` : undefined }}>{activePresentation?.specimen}</div></div>
              <div className="text-center font-mono text-[9px] uppercase tracking-[0.12em] text-green-100/38">move the pointer — the original laser lab stays alive underneath</div>
            </div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[34px] border border-white/[0.08] bg-black/[0.05] p-5 backdrop-blur-[2px] sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/68">Wave pathway</div><h2 className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-white">Build optical behavior from wave behavior.</h2></div><p className="max-w-xl text-[11px] leading-5 text-slate-500">Geometric optics is a powerful approximation, but the path begins with the wave model that explains when ray behavior works and when it breaks.</p></div>

          <div className="relative mt-8 hidden min-h-[390px] lg:block">
            <div className="absolute left-[6%] right-[6%] top-[184px] h-1 rounded-full bg-gradient-to-r from-cyan-300/28 via-fuchsia-300/24 via-yellow-300/24 to-green-300/25" />
            {lessons.map((lesson, index) => {
              const presentation = PRESENTATIONS[lesson.id];
              if (!presentation) return null;
              const Icon = presentation.icon;
              const live = lesson.status !== "placeholder";
              const top = index % 2 === 0 ? 76 : 218;
              const left = 7 + index * 17.2;
              const inner = <div className="group flex w-[150px] flex-col items-center text-center"><div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border bg-[#06101a]/82 transition-transform group-hover:scale-105" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},${live ? "0.32" : "0.10"})`, boxShadow: live ? `0 0 38px rgba(${presentation.rgb},0.10)` : undefined }}><Icon size={21} /></div><div className="mt-3 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{presentation.step}</div><strong className={`mt-1 text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{lesson.label}</strong><span className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},${live ? "0.50" : "0.24"})` }}>{presentation.specimen}</span></div>;
              return <div key={lesson.id} className="absolute -translate-x-1/2" style={{ left: `${left}%`, top }} onMouseEnter={() => activate(lesson)} onMouseLeave={() => setMode("overview")} onFocusCapture={() => activate(lesson)} onBlurCapture={() => setMode("overview")}>{live ? <Link href={lesson.href}>{inner}</Link> : <div aria-disabled="true">{inner}</div>}</div>;
            })}
          </div>

          <div className="mt-6 space-y-2 lg:hidden">{lessons.map((lesson) => { const presentation = PRESENTATIONS[lesson.id]; if (!presentation) return null; const Icon = presentation.icon; const live = lesson.status !== "placeholder"; const inner = <div className="flex items-center gap-3 rounded-[16px] border px-4 py-3" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.15" : "0.06"})`, background: `rgba(${presentation.rgb},${live ? "0.025" : "0.008"})` }}><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.16)` }}><Icon size={15} /></div><div className="min-w-0 flex-1"><span className="font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.55)` }}>{presentation.step}</span><strong className={`block text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{lesson.label}</strong></div>{live ? <ArrowRight size={14} style={{ color: `rgb(${presentation.rgb})` }} /> : <CircleDashed size={13} className="text-slate-700" />}</div>; return live ? <Link key={lesson.id} href={lesson.href}>{inner}</Link> : <div key={lesson.id} aria-disabled="true">{inner}</div>; })}</div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Idea icon={Waves} title="Phase controls interference" text="Two waves can have the same frequency and amplitude yet add very differently because their peaks and troughs arrive with different phase." rgb="34, 211, 238" />
          <Idea icon={Triangle} title="Boundaries reshape propagation" text="Reflection, refraction, and diffraction are different ways a wave responds when its environment or allowed path changes." rgb="250, 204, 21" />
          <Idea icon={Glasses} title="Images are organized ray/wave geometry" text="Lenses and mirrors redirect many portions of a wavefront so light from one object point converges or appears to diverge from an image point." rgb="74, 222, 128" />
        </section>
      </div>
    </main>
  );
}

function Idea({ icon: Icon, title, text, rgb }: { icon: LucideIcon; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.07] p-4 backdrop-blur-md"><div className="flex items-center gap-2" style={{ color: `rgba(${rgb},0.72)` }}><Icon size={13} /><span className="text-[9px] font-semibold uppercase tracking-[0.11em]">principle</span></div><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
