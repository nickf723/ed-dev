import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import LivingCanvasBackground from "./LivingCanvasBackground";
import {
  Aperture,
  ArrowRight,
  Brush,
  Building2,
  Drama,
  Eye,
  Music2,
  Palette,
  PenTool,
  Scale,
  type LucideIcon,
} from "lucide-react";

type Route = {
  label: string;
  href: string;
  role: string;
  question: string;
  icon: LucideIcon;
  rgb: string;
};

const MAKING: readonly Route[] = [
  {
    label: "Visual Arts",
    href: "/humanities/visual-arts",
    role: "image · object · material · space",
    question: "How do marks, materials, images, objects, and spatial arrangements become artworks?",
    icon: Brush,
    rgb: "244,63,94",
  },
  {
    label: "Music",
    href: "/humanities/music",
    role: "sound · time · performance · composition",
    question: "How do pitch, rhythm, timbre, form, performance, and recording organize sound through time?",
    icon: Music2,
    rgb: "167,139,250",
  },
  {
    label: "Performing Arts",
    href: "/humanities/performing-arts",
    role: "body · voice · stage · screen · audience",
    question: "What changes when artistic work unfolds through performers, timing, staging, and an audience?",
    icon: Drama,
    rgb: "251,146,60",
  },
  {
    label: "Film & Television",
    href: "/humanities/performing-arts/tv-film",
    role: "shot · edit · sound · performance · sequence",
    question: "How do moving images, sound, editing, performance, and screen conventions create audiovisual form?",
    icon: Aperture,
    rgb: "34,211,238",
  },
] as const;

const SHAPING: readonly Route[] = [
  {
    label: "Design",
    href: "/humanities/visual-arts/design",
    role: "use · form · communication · constraint",
    question: "How do aesthetic choices interact with function, users, production, communication, and constraints?",
    icon: PenTool,
    rgb: "94,234,212",
  },
  {
    label: "Architecture",
    href: "/humanities/visual-arts/architecture",
    role: "space · structure · use · place",
    question: "How do buildings and environments organize material, movement, function, symbolism, and lived space?",
    icon: Building2,
    rgb: "250,204,21",
  },
] as const;

const QUESTIONS = [
  ["Medium", "What materials, bodies, instruments, technologies, or conventions make the work possible?"],
  ["Form", "How are color, line, rhythm, space, sequence, scale, sound, contrast, repetition, or emphasis organized?"],
  ["Experience", "What does the work ask the viewer, listener, reader, participant, or audience to notice or do?"],
  ["Context", "How do maker, patronage, institution, culture, history, genre, circulation, and interpretation change the work's meaning?"],
  ["Value", "What do we mean when we call something beautiful, moving, skillful, original, ugly, kitsch, profound, useful, or art at all?"],
] as const;

export default function ArtsPage() {
  return (
    <SceneFrame
      background={<LivingCanvasBackground />}
      className="bg-[#0b0709] text-stone-100 selection:bg-pink-300/25"
      maxWidthClassName="max-w-[1540px]"
      headerBackground="rgba(11,7,9,0.54)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Humanities", href: "/humanities" },
            { label: "Arts & Aesthetics" },
          ]}
          eyebrow="Medium · form · performance · experience · interpretation · value"
          eyebrowStyle="rule"
          icon={Palette}
          title={<span>Arts &amp; Aesthetics</span>}
          subtitle="Use this crossroads to move between artistic practices and the questions we ask about form, experience, interpretation, design, and aesthetic value."
          accentRgb="244, 114, 182"
          titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fff7fb]"
          headerClassName="border-pink-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-pink-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(22,8,16,0.34),transparent_30%,transparent_70%,rgba(10,8,20,0.28))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-pink-200/68"><Eye size={14} /> Cross-disciplinary map</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">Artistic media differ, but many analytical questions travel between them.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/74">This route is a crossroads rather than a parent hierarchy. Visual Arts, Music, Performing Arts, and Philosophy each have their own canonical homes in Humanities; use this page to compare the questions that connect them.</p>
          </div>
          <Link href="/humanities/philosophy/aesthetics" className="group rounded-[20px] border border-violet-200/[0.12] bg-violet-300/[0.025] p-4 backdrop-blur-xl transition hover:bg-violet-300/[0.045]">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-violet-200/58"><Scale size={13} /> Philosophical aesthetics</div>
            <strong className="mt-2 block text-[18px] text-white">What is aesthetic value?</strong>
            <p className="mt-2 text-[12px] leading-5 text-stone-400">Move from making and interpreting works into philosophical questions about beauty, taste, art, representation, expression, judgment, and aesthetic experience.</p>
            <span className="mt-4 flex items-center justify-between text-[11px] font-semibold text-violet-100/70">open Aesthetics <ArrowRight size={13} className="transition group-hover:translate-x-1" /></span>
          </Link>
        </div>

        <div className="relative mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {MAKING.map((route) => <RouteCard key={route.href} route={route} />)}
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_460px] xl:items-start">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-emerald-200/60">Art meets designed use</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.045em] text-white">Some practices make the boundary between aesthetic and practical judgment especially visible.</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SHAPING.map((route) => <RouteCard key={route.href} route={route} />)}
          </div>
        </div>

        <Surface variant="glass" className="rounded-[24px] border-pink-100/[0.09] p-5 xl:sticky xl:top-[170px]" style={{ background: "rgba(20,8,16,0.16)" }}>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-pink-200/58">Reading a work</div>
          <div className="mt-4 space-y-3">
            {QUESTIONS.map(([term, text], index) => (
              <div key={term} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] pb-3 last:border-b-0">
                <span className="font-mono text-[9px] text-pink-200/42">0{index + 1}</span>
                <div><strong className="text-[12px] text-white">{term}</strong><p className="mt-1 text-[11px] leading-5 text-stone-400">{text}</p></div>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <section className="mt-8 rounded-[22px] border border-amber-100/[0.09] bg-amber-300/[0.022] p-5 backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/58">A useful correction</div>
            <p className="mt-2 text-[13px] leading-6 text-stone-300/74">No single theory, including imitation or representation, defines all art. Works can represent, perform, decorate, document, intervene, ritualize, communicate, organize space, foreground material, challenge categories, or pursue many of these at once.</p>
          </div>
          <Link href="/humanities" className="group flex items-center justify-between rounded-[16px] border border-white/[0.07] bg-black/[0.10] p-4 text-[12px] font-semibold text-white/80 transition hover:bg-black/[0.18]">Return to Humanities <ArrowRight size={13} className="text-pink-200/55 transition group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </SceneFrame>
  );
}

function RouteCard({ route }: { route: Route }) {
  const Icon = route.icon;
  return (
    <Link href={route.href} className="group flex min-h-[210px] flex-col rounded-[20px] border p-4 backdrop-blur-[12px] transition hover:-translate-y-0.5" style={{ borderColor: `rgba(${route.rgb},0.16)`, background: `linear-gradient(145deg,rgba(${route.rgb},0.045),rgba(9,6,10,0.18))` }}>
      <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${route.rgb})`, borderColor: `rgba(${route.rgb},0.26)`, background: `rgba(${route.rgb},0.04)` }}><Icon size={17} /></span><ArrowRight size={13} className="text-white/28 transition group-hover:translate-x-1" /></div>
      <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${route.rgb},0.66)` }}>{route.role}</div>
      <h3 className="mt-1 text-[17px] font-semibold text-white">{route.label}</h3>
      <p className="mt-2 text-[11px] leading-5 text-stone-400">{route.question}</p>
    </Link>
  );
}
