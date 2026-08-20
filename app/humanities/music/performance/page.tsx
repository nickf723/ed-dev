import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import {
  ArrowRight,
  AudioLines,
  Ear,
  Hand,
  Layers3,
  Mic2,
  Music2,
  Radio,
  Repeat2,
  SlidersHorizontal,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import PerformanceBackground from "./PerformanceBackground";
import PerformanceInterpretationLab from "./PerformanceInterpretationLab";

const LENSES: readonly { title: string; question: string; detail: string; icon: LucideIcon; rgb: string }[] = [
  {
    title: "Technique",
    question: "What physical action can reliably produce the intended sound?",
    detail: "Breath, fingering, bowing, embouchure, touch, posture, coordination, endurance, range, articulation, and instrument-specific motion constrain what can be performed and how.",
    icon: Hand,
    rgb: "251,146,60",
  },
  {
    title: "Interpretation",
    question: "Which choices shape one realization of the musical structure?",
    detail: "Tempo, timing, dynamics, articulation, phrasing, tone, balance, ornamentation, and style can change a performance without changing the underlying composition.",
    icon: SlidersHorizontal,
    rgb: "244,114,182",
  },
  {
    title: "Ensemble interaction",
    question: "How do performers coordinate when nobody controls every detail alone?",
    detail: "Listening, cueing, shared pulse, tuning, balance, leadership, following, rehearsal language, visual contact, and negotiated timing create collective performance.",
    icon: Users,
    rgb: "34,211,238",
  },
  {
    title: "Instrumentation",
    question: "How do instrument capabilities and timbres change what can be written or heard?",
    detail: "Range, transposition, register, resonance, attack, sustain, projection, extended techniques, blend, balance, and practical limitations all matter when distributing musical material.",
    icon: Layers3,
    rgb: "167,139,250",
  },
  {
    title: "Improvisation",
    question: "How can performance generate structure in real time?",
    detail: "Improvisation can work inside harmonic, rhythmic, melodic, stylistic, formal, social, or game-like constraints rather than meaning the absence of structure.",
    icon: Repeat2,
    rgb: "74,222,128",
  },
  {
    title: "Venue & technology",
    question: "How does the sounding environment change performance decisions?",
    detail: "Room acoustics, amplification, microphones, monitoring, latency, staging, audience position, instrument setup, recording context, and accessibility can reshape what performers do.",
    icon: Waves,
    rgb: "250,204,21",
  },
] as const;

const DISTINCTIONS = [
  ["Score ≠ performance", "A score, chart, lead sheet, tablature, recording, oral tradition, or memorized pattern can constrain a performance without fully specifying the sounding event."],
  ["Technique ≠ interpretation", "Technique concerns reliable control of the instrument or voice. Interpretation concerns musical choices. They interact, but virtuosity does not automatically determine an interpretation."],
  ["Expressive ≠ inaccurate", "Intentional timing, tuning, dynamics, tone, or articulation can depart from a mechanical grid while remaining highly controlled. Evaluation depends on style, task, ensemble, and musical context."],
  ["Loudness ≠ effort", "Perceived loudness depends on acoustics, spectrum, distance, instrument radiation, amplification, ensemble balance, and hearing. More physical effort does not map to one universal loudness result."],
  ["Improvisation ≠ no rules", "Improvisers often work with deeply learned vocabularies, constraints, forms, cues, conventions, and shared expectations, even when exact notes are not predetermined."],
  ["Recording ≠ transparent document", "A recording captures one performance through microphones, placement, editing, mixing, mastering, playback systems, and production choices. It is evidence of a performance, not the performance without mediation."],
] as const;

export default function MusicPerformancePage() {
  return (
    <SceneFrame
      background={<PerformanceBackground />}
      className="bg-[#090604] text-slate-100 selection:bg-orange-300/25"
      maxWidthClassName="max-w-[1560px]"
      headerBackground="rgba(9,6,4,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Humanities", href: "/humanities" },
            { label: "Music", href: "/humanities/music" },
            { label: "Performance & Instrumentation" },
          ]}
          eyebrow="Technique · interpretation · ensemble · instruments · improvisation · space"
          eyebrowStyle="rule"
          icon={Mic2}
          title={<span>Performance &amp; Instrumentation</span>}
          subtitle="Music performance turns musical structure into a situated sounding event. Study the physical techniques, interpretive choices, ensemble coordination, instrument capabilities, improvisational constraints, acoustics, and technologies that make one realization differ from another."
          accentRgb="251, 146, 60"
          titleClassName="font-sans text-[clamp(2.45rem,4.7vw,5.3rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-[#fff7ed]"
          headerClassName="border-orange-100/[0.10]"
        />
      }
    >
      <section className="mt-5">
        <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-orange-200/62"><AudioLines size={14} /> Rehearsal laboratory</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">A sequence of notes is not yet a performance.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/72">Start by holding pitch order constant and changing the realization. That makes the distinction between musical structure and performed sound audible before we name the dimensions involved.</p>
        </div>
        <PerformanceInterpretationLab />
      </section>

      <section className="mt-10 border-t border-orange-100/[0.09] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-pink-200/58"><Music2 size={14} /> Performance lenses</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.048em] text-white">The sounding result is embodied, interpreted, coordinated, and situated.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/68">These lenses overlap deliberately. Instrument design affects technique; technique affects possible phrasing; room acoustics affect timing and balance; ensemble interaction can change interpretation in the moment.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
          {LENSES.map((lens) => <Lens key={lens.title} {...lens} />)}
        </div>
      </section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_420px] xl:items-start">
        <Surface variant="glass" className="overflow-hidden rounded-[28px] border-cyan-100/[0.08]" style={{ background: "rgba(7,10,13,0.14)" }}>
          <div className="p-5 sm:p-6"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-200/54"><Ear size={13} /> Ensemble listening loop</div><h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.6rem)] font-semibold tracking-[-0.043em] text-white">Performers produce sound and continuously listen to the result they are helping create.</h3></div>
          <div className="grid border-t border-white/[0.07] sm:grid-cols-4">
            <LoopStep number="01" label="Intend" text="Form a timing, sound, balance, or expressive goal." rgb="251,146,60" />
            <LoopStep number="02" label="Act" text="Use voice, body, instrument, interface, or gesture." rgb="244,114,182" />
            <LoopStep number="03" label="Hear" text="Monitor self, partners, room, audience, or amplified mix." rgb="34,211,238" />
            <LoopStep number="04" label="Adjust" text="Change the next action while the performance continues." rgb="74,222,128" />
          </div>
          <p className="p-5 text-[13px] leading-6 text-slate-400/72">This loop can operate in milliseconds during ensemble timing, over minutes during a piece, across rehearsal sessions, or over years of technical development.</p>
        </Surface>

        <Surface variant="open" className="overflow-hidden rounded-[28px] border-orange-100/[0.08] xl:sticky xl:top-[172px]" style={{ background: "rgba(15,8,4,0.055)" }}>
          <div className="p-5"><div className="font-mono text-[11px] uppercase tracking-[0.08em] text-orange-200/48">Useful distinctions</div><h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Performance vocabulary gets slippery when every choice is called “expression.”</h3></div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {DISTINCTIONS.map(([term, text], index) => <div key={term} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 px-4 py-3.5"><span className="font-mono text-[10px] text-orange-200/38">0{index + 1}</span><span><strong className="block text-[12px] text-white/82">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>)}
          </div>
        </Surface>
      </section>

      <section className="mt-9 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-3">
        <Neighbor href="/humanities/music/theory" label="Theory & Composition" note="pitch, rhythm, harmony, notation, form" icon={Music2} rgb="244,114,182" />
        <Neighbor href="/humanities/music/recordings" label="Recorded Music" note="captured performances, releases, production, editions" icon={Radio} rgb="250,204,21" />
        <Neighbor href="/humanities/performing-arts" label="Performing Arts" note="bodies, staging, audience, rehearsal, liveness" icon={Users} rgb="251,146,60" />
      </section>
    </SceneFrame>
  );
}

function Lens({ title, question, detail, icon: Icon, rgb }: { title: string; question: string; detail: string; icon: LucideIcon; rgb: string }) {
  return <article className="min-h-[235px] border-b border-white/[0.06] p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="flex h-9 w-9 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.24)`, background: `rgba(${rgb},0.04)` }}><Icon size={15} /></span><h3 className="mt-3 text-[15px] font-semibold text-white/88">{title}</h3><strong className="mt-2 block text-[11px] leading-5" style={{ color: `rgba(${rgb},0.74)` }}>{question}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{detail}</p></article>;
}

function LoopStep({ number, label, text, rgb }: { number: string; label: string; text: string; rgb: string }) {
  return <div className="min-h-[145px] border-b border-white/[0.06] p-4 sm:border-r sm:border-b-0 sm:last:border-r-0"><span className="font-mono text-[10px]" style={{ color: `rgba(${rgb},0.50)` }}>{number}</span><strong className="mt-4 block text-[14px]" style={{ color: `rgb(${rgb})` }}>{label}</strong><span className="mt-2 block text-[11px] leading-5 text-slate-500">{text}</span></div>;
}

function Neighbor({ href, label, note, icon: Icon, rgb }: { href: string; label: string; note: string; icon: LucideIcon; rgb: string }) {
  return <Link href={href} className="group flex min-h-[92px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-[10px] transition hover:bg-black/[0.15]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)` }}><Icon size={16} /></span><span className="min-w-0 flex-1"><strong className="text-[13px] text-white/84">{label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{note}</span></span><ArrowRight size={13} className="text-white/28 transition group-hover:translate-x-1" /></Link>;
}
