"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import TvFilmBackground from "./TvFilmBackground";
import {
  Aperture,
  ArrowRight,
  BedDouble,
  CakeSlice,
  Clock3,
  Film,
  Frame,
  Layers3,
  Medal,
  Music2,
  Scissors,
  Tv,
  UserRound,
  Volume2,
  type LucideIcon,
} from "lucide-react";

type ContextKey = "cake" | "bed" | "medal";
type SoundKey = "silence" | "drone" | "applause";

type Context = {
  key: ContextKey;
  label: string;
  cue: string;
  reading: string;
  icon: LucideIcon;
  rgb: string;
};

const CONTEXTS: readonly Context[] = [
  {
    key: "cake",
    label: "Birthday cake",
    cue: "food · celebration",
    reading: "The repeated neutral face may now feel anticipatory, hungry, affectionate, or amused because the cut supplies an object to react to.",
    icon: CakeSlice,
    rgb: "251,191,36",
  },
  {
    key: "bed",
    label: "Empty hospital bed",
    cue: "absence · vulnerability",
    reading: "The same face may now feel worried, reflective, or stunned. The expression did not change; the adjacent image changed the available interpretation.",
    icon: BedDouble,
    rgb: "34,211,238",
  },
  {
    key: "medal",
    label: "Finish-line medal",
    cue: "effort · achievement",
    reading: "The identical face may now read as relieved, proud, exhausted, or quietly satisfied because the sequence gives it a different narrative relation.",
    icon: Medal,
    rgb: "244,114,182",
  },
] as const;

const SOUNDS = [
  { key: "silence" as const, label: "Silence", note: "leaves more interpretive space" },
  { key: "drone" as const, label: "Low drone", note: "adds unease or suspense" },
  { key: "applause" as const, label: "Applause", note: "pushes the sequence toward public recognition" },
] as const;

const GRAMMAR = [
  { label: "Frame", detail: "One composed image: scale, angle, light, color, depth, and what is included or excluded.", icon: Frame, rgb: "251,191,36" },
  { label: "Shot", detail: "A continuous recorded span between edits. Camera and performance can change inside it.", icon: Aperture, rgb: "34,211,238" },
  { label: "Cut", detail: "A relation between shots. Order and timing can create comparison, continuity, contrast, surprise, or inference.", icon: Scissors, rgb: "244,114,182" },
  { label: "Sound", detail: "Speech, music, ambience, silence, and effects can reinforce, complicate, or contradict the image track.", icon: Volume2, rgb: "167,139,250" },
  { label: "Duration", detail: "Screen works organize attention through shot length, scene length, pacing, repetition, episodes, and larger serial arcs.", icon: Clock3, rgb: "94,234,212" },
] as const;

const SERIAL_LEVELS = [
  ["Moment", "gesture · line · visual beat"],
  ["Shot", "continuous recorded span"],
  ["Scene", "local dramatic or informational unit"],
  ["Episode / work", "bounded viewing unit"],
  ["Season / cycle", "recurring structure across several units"],
  ["Series", "long-form accumulation and change"],
] as const;

export default function TvFilmPage() {
  const [contextKey, setContextKey] = useState<ContextKey>("bed");
  const [soundKey, setSoundKey] = useState<SoundKey>("silence");
  const context = useMemo(() => CONTEXTS.find((item) => item.key === contextKey) ?? CONTEXTS[1], [contextKey]);
  const sound = SOUNDS.find((item) => item.key === soundKey) ?? SOUNDS[0];

  return (
    <SceneFrame
      background={<TvFilmBackground />}
      className="bg-[#050507] text-stone-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1540px]"
      headerBackground="rgba(5,5,7,0.62)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Humanities", href: "/humanities" },
            { label: "Performing Arts", href: "/humanities/performing-arts" },
            { label: "Film & Television" },
          ]}
          eyebrow="Frame · shot · cut · sound · performance · duration · serial form"
          eyebrowStyle="rule"
          icon={Film}
          title={<span>Film &amp; Television</span>}
          subtitle="Screen media create meaning by arranging images, sound, performance, and time. A shot can be studied on its own, but editing makes meaning relational, and television adds recurring episode, season, and series structures that accumulate across time."
          accentRgb="251, 191, 36"
          titleClassName="font-sans text-[clamp(2.7rem,5vw,5.7rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fffaf0]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="mt-5">
        <div className="mb-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/66">Editing laboratory · meaning between shots</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.8vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Keep the face identical. Change only what the audience sees beside it.</h2>
          </div>
          <p className="text-[14px] leading-6 text-stone-300/72">The exercise does not claim that every viewer will read a sequence the same way. It exposes a basic property of editing: adjacent shots create relationships that no isolated frame contains by itself.</p>
        </div>

        <Surface variant="glass" className="overflow-hidden rounded-[30px] border-amber-100/[0.11]" style={{ background: "rgba(10,8,8,0.34)" }}>
          <div className="grid xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
              <div className="grid gap-2 md:grid-cols-[1fr_34px_1fr_34px_1fr] md:items-center">
                <FilmFrame label="SHOT A · neutral close-up" icon={UserRound} rgb="251,191,36" detail="same image in every version" />
                <CutMark />
                <FilmFrame label={`SHOT B · ${context.label}`} icon={context.icon} rgb={context.rgb} detail={context.cue} />
                <CutMark />
                <FilmFrame label="SHOT C · neutral close-up" icon={UserRound} rgb="251,191,36" detail="same image again" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {CONTEXTS.map((item) => {
                  const Icon = item.icon;
                  const active = item.key === contextKey;
                  return (
                    <button key={item.key} type="button" onClick={() => setContextKey(item.key)} className="rounded-[15px] border p-3 text-left transition" style={{ borderColor: active ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${item.rgb},0.05)` : "rgba(0,0,0,0.08)" }}>
                      <span className="flex items-center gap-2 text-[12px] font-semibold" style={{ color: active ? `rgb(${item.rgb})` : "rgb(214,211,209)" }}><Icon size={14} /> {item.label}</span>
                      <span className="mt-1 block text-[11px] leading-5 text-stone-500">insert this image between the same two close-ups</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="p-4 sm:p-5 xl:sticky xl:top-[168px] xl:self-start">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-200/58">Interpretation monitor</div>
              <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">What changed?</h3>
              <p className="mt-3 text-[13px] leading-6 text-stone-300/76">{context.reading}</p>

              <div className="mt-5 border-t border-white/[0.07] pt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-violet-200/52">Soundtrack layer</div>
                <div className="mt-2 grid gap-2">
                  {SOUNDS.map((item) => <button key={item.key} type="button" onClick={() => setSoundKey(item.key)} className={`rounded-[12px] border px-3 py-2.5 text-left transition ${soundKey === item.key ? "border-violet-200/[0.24] bg-violet-300/[0.045]" : "border-white/[0.06] bg-black/[0.08]"}`}><strong className="text-[11px] text-white/84">{item.label}</strong><span className="ml-2 text-[10px] text-stone-500">{item.note}</span></button>)}
                </div>
              </div>

              <div className="mt-5 rounded-[15px] border border-white/[0.07] bg-black/[0.10] p-3">
                <strong className="text-[11px] text-amber-100/82">Current construction</strong>
                <p className="mt-1 text-[11px] leading-5 text-stone-500">Neutral face → {context.label.toLowerCase()} → neutral face, with {sound.label.toLowerCase()} on the soundtrack.</p>
              </div>
            </aside>
          </div>
        </Surface>
      </section>

      <section className="mt-9 border-t border-amber-100/[0.09] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/58">Formal grammar · after the edit</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.048em] text-white">Screen form is built from simultaneous layers and nested units of time.</h2>
          </div>
          <p className="text-[14px] leading-6 text-stone-300/68">These terms are analytical tools, not a recipe. Long takes can minimize cutting; montage can foreground it; sound can align with the image or work against it; television and film can borrow each other’s structures.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-5">
          {GRAMMAR.map((item) => <GrammarCell key={item.label} {...item} />)}
        </div>
      </section>

      <section className="mt-9 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_420px] xl:items-start">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-200/58"><Tv size={14} /> Serial form</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold tracking-[-0.048em] text-white">Television adds nested clocks that can repeat, accumulate, and reset at different scales.</h2>
          <div className="mt-5 space-y-2">
            {SERIAL_LEVELS.map(([label, detail], index) => (
              <div key={label} className="grid grid-cols-[54px_minmax(0,1fr)] items-center gap-3 border-b border-white/[0.06] bg-black/[0.055] px-3 py-3 backdrop-blur-[8px] last:border-b-0">
                <span className="font-mono text-[10px] text-cyan-200/42">0{index + 1}</span>
                <span><strong className="text-[13px] text-white/84">{label}</strong><span className="ml-2 text-[12px] text-stone-500">{detail}</span></span>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-[13px] leading-6 text-stone-400">A series can resolve one problem inside an episode while preserving another across a season. Recurring locations, character relationships, motifs, credit sequences, and format conventions can create continuity even when individual stories reset.</p>
        </div>

        <Surface variant="glass" className="overflow-hidden rounded-[26px] border-cyan-100/[0.10] xl:sticky xl:top-[172px]" style={{ background: "rgba(5,10,12,0.24)" }}>
          <div className="p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan-200/58"><Layers3 size={13} /> Repository specimen</div>
            <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">Avatar: The Last Airbender</h3>
            <p className="mt-3 text-[13px] leading-6 text-stone-400">The repository currently contains one developed screen-media specimen. Use it as a case study rather than pretending an empty catalog is a library.</p>
            <Link href="/humanities/performing-arts/tv-film/repository/avatar" className="group mt-5 flex items-center justify-between rounded-[15px] border border-cyan-200/[0.14] bg-cyan-300/[0.035] px-4 py-3 text-[12px] font-semibold text-cyan-100/82 transition hover:bg-cyan-300/[0.06]">Open case study <ArrowRight size={14} className="transition group-hover:translate-x-1" /></Link>
          </div>
        </Surface>
      </section>

      <section className="mt-9 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-3">
        <CrossLink href="/humanities/performing-arts" label="Performing Arts" note="performance, staging, audience, live time" icon={Film} rgb="251,146,60" />
        <CrossLink href="/humanities/visual-arts" label="Visual Arts" note="composition, image, color, material, visual form" icon={Frame} rgb="244,63,94" />
        <CrossLink href="/humanities/music" label="Music" note="sound, rhythm, form, recording, temporal expectation" icon={Music2} rgb="167,139,250" />
      </section>
    </SceneFrame>
  );
}

function FilmFrame({ label, icon: Icon, rgb, detail }: { label: string; icon: LucideIcon; rgb: string; detail: string }) {
  return (
    <div className="relative min-h-[190px] overflow-hidden rounded-[18px] border bg-black/[0.16] p-4" style={{ borderColor: `rgba(${rgb},0.18)` }}>
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: `rgba(${rgb},0.54)` }} />
      <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-stone-500">{label}</span>
      <div className="mt-5 flex h-20 items-center justify-center rounded-[12px] border border-white/[0.055] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035),transparent_60%)]"><Icon size={42} strokeWidth={1.15} style={{ color: `rgb(${rgb})` }} /></div>
      <p className="mt-3 text-[11px] leading-5 text-stone-500">{detail}</p>
    </div>
  );
}

function CutMark() {
  return <div className="hidden items-center justify-center md:flex"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-200/[0.14] bg-pink-300/[0.025]"><Scissors size={13} className="text-pink-200/60" /></span></div>;
}

function GrammarCell({ label, detail, icon: Icon, rgb }: { label: string; detail: string; icon: LucideIcon; rgb: string }) {
  return <div className="min-h-[170px] border-b border-white/[0.06] p-4 xl:border-r xl:border-b-0 xl:last:border-r-0"><span className="flex h-9 w-9 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.24)`, background: `rgba(${rgb},0.04)` }}><Icon size={15} /></span><strong className="mt-3 block text-[14px] text-white/86">{label}</strong><p className="mt-2 text-[12px] leading-5 text-stone-500">{detail}</p></div>;
}

function CrossLink({ href, label, note, icon: Icon, rgb }: { href: string; label: string; note: string; icon: LucideIcon; rgb: string }) {
  return <Link href={href} className="group flex min-h-[92px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-[10px] transition hover:bg-black/[0.15]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)` }}><Icon size={16} /></span><span className="min-w-0 flex-1"><strong className="text-[13px] text-white/84">{label}</strong><span className="mt-1 block text-[11px] leading-4 text-stone-500">{note}</span></span><ArrowRight size={13} className="text-white/28 transition group-hover:translate-x-1" /></Link>;
}
