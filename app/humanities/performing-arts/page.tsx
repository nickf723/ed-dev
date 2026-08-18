import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Clapperboard,
  Drama,
  Eye,
  Lightbulb,
  MessageSquareText,
  Move,
  Palette,
  Radio,
  Tent,
  Users,
} from "lucide-react";
import PerformingArtsBackground from "./PerformingArtsBackground";
import StagePictureLab from "./StagePictureLab";

const NODE_ID = "humanities.performing-arts";

const BRANCH_META: Record<string, { icon: LucideIcon; code: string; rgb: string }> = {
  "humanities.performing-arts.theatre": { icon: Drama, code: "THR", rgb: "244,63,94" },
  "humanities.performing-arts.dance": { icon: Move, code: "DAN", rgb: "129,140,248" },
  "humanities.performing-arts.screen-performance": { icon: Clapperboard, code: "SCR", rgb: "34,211,238" },
  "humanities.performing-arts.directing-dramaturgy": { icon: Eye, code: "DIR", rgb: "251,191,36" },
  "humanities.performing-arts.stagecraft-design": { icon: Palette, code: "STG", rgb: "52,211,153" },
  "humanities.performing-arts.voice-spoken": { icon: MessageSquareText, code: "VOC", rgb: "253,186,116" },
  "humanities.performing-arts.circus-variety": { icon: Tent, code: "VAR", rgb: "217,70,239" },
  "humanities.performing-arts.performance-studies": { icon: Users, code: "PST", rgb: "192,132,252" },
};

const DIMENSIONS = [
  { title: "Body & voice", detail: "Gesture, posture, movement, breath, speech, sound, stillness, virtuosity, effort, and embodied presence become material for performance.", icon: Move, rgb: "244,63,94" },
  { title: "Space & composition", detail: "Blocking, pathways, levels, proximity, architecture, framing, scenery, and sightlines shape relationships and what an audience can read.", icon: Eye, rgb: "34,211,238" },
  { title: "Time & rhythm", detail: "Tempo, pause, repetition, duration, cue timing, musicality, entrances, transitions, and pacing organize expectation and attention.", icon: Radio, rgb: "251,191,36" },
  { title: "Ensemble & relation", detail: "Performance emerges through listening, response, partnering, leadership, trust, conflict, coordination, and the distribution of focus among people.", icon: Users, rgb: "52,211,153" },
  { title: "Design & cue systems", detail: "Lighting, sound, costume, scenery, props, media, stage management, technical systems, and backstage labor structure the event around performers.", icon: Lightbulb, rgb: "167,139,250" },
  { title: "Audience & mediation", detail: "A live audience shares time and space with performers; cameras, microphones, editing, screens, and recordings transform presence, scale, repetition, and viewpoint.", icon: Clapperboard, rgb: "125,211,252" },
] as const;

export default function PerformingArtsPage() {
  const { node } = requireCurriculumPageContext(NODE_ID);
  const children = node.children ?? [];

  return (
    <SceneFrame
      background={<PerformingArtsBackground />}
      className="bg-[#070505] text-stone-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1680px]"
      headerBackground="rgba(7,5,5,0.54)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Humanities", href: "/humanities" }, { label: "Performing Arts" }]}
          eyebrow="Body · voice · space · time · cues · ensemble · audience"
          eyebrowStyle="rule"
          icon={Drama}
          title={<span>Performing Arts</span>}
          subtitle="Study performance as an event made through bodies, voices, movement, interpretation, rehearsal, space, rhythm, design, technical cues, ensemble relationships, and audiences, whether the performance is live, captured, or mediated through screens and sound systems."
          accentRgb="251, 191, 36"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#fff7ed]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="mt-5">
        <div className="mb-3 grid gap-3 border-b border-amber-100/[0.08] pb-3 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-100/55">Live event · primary navigation + rehearsal lab</div>
            <h2 className="mt-1 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.046em] text-white">A performance is composed in front of somebody, somewhere, over time.</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/humanities/music" label="Music" note="composition · theory · musical traditions" />
            <Neighbor href="/humanities/literature" label="Literature" note="texts · narrative · interpretation" />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[250px_minmax(0,1fr)] xl:items-start">
          <FieldIndex children={children} />
          <StagePictureLab />
        </div>
      </section>

      <section className="mt-8 border-t border-amber-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-rose-100/52">Performance dimensions</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Technique, interpretation, design, and audience experience meet in the same event.</h2>
          </div>
          <p className="text-[13px] leading-6 text-stone-400/72">The dimensions below are a rehearsal and analysis lens, not a universal recipe. Traditions differ radically in performer-audience relationships, training, authorship, improvisation, technology, ritual context, aesthetics, and what counts as a finished performance.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {DIMENSIONS.map((item, index) => <Dimension key={item.title} item={item} number={`0${index + 1}`} />)}
        </div>
      </section>
    </SceneFrame>
  );
}

function FieldIndex({ children }: { children: readonly CurriculumNode[] }) {
  return (
    <Surface variant="open" className="overflow-hidden rounded-[26px] border-amber-100/[0.08]" style={{ background: "rgba(8,5,5,0.025)" }}>
      <div className="border-b border-white/[0.06] px-3.5 py-3">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-100/48">Performance fields</div>
        <p className="mt-1 text-[10px] leading-4 text-stone-600">Screen Performance opens now. Other direct branches remain visibly planned.</p>
      </div>
      <div>
        {children.map((child, index) => {
          const meta = BRANCH_META[child.id] ?? { icon: Drama, code: `P${index + 1}`, rgb: "168,162,158" };
          const Icon = meta.icon;
          const active = child.status === "active";
          const content = <><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span className="min-w-0 flex-1"><span className="block font-mono text-[9px] uppercase tracking-[0.05em]" style={{ color: `rgba(${meta.rgb},0.52)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] leading-4 text-white/76">{child.label}</strong></span>{active ? <ArrowRight size={11} className="text-stone-600" /> : <span className="font-mono text-[8px] uppercase text-stone-700">planned</span>}</>;
          return active ? <Link key={child.id} href={child.href ?? "#"} className="group flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 transition last:border-b-0 hover:bg-amber-200/[0.035]">{content}</Link> : <div key={child.id} aria-disabled="true" className="flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 last:border-b-0">{content}</div>;
        })}
      </div>
    </Surface>
  );
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[68px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-2.5 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="text-[11px] font-semibold text-white/78">{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-3 text-stone-600">{note}</span><ArrowRight size={11} className="text-stone-600 transition group-hover:translate-x-1" /></span></Link>;
}

function Dimension({ item, number }: { item: (typeof DIMENSIONS)[number]; number: string }) {
  const Icon = item.icon;
  return <div className="grid min-h-[150px] grid-cols-[42px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[10px]" style={{ color: `rgba(${item.rgb},0.42)` }}>{number}</span><span><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.24)` }}><Icon size={13} /></span><strong className="mt-2 block text-[12px]" style={{ color: `rgba(${item.rgb},0.78)` }}>{item.title}</strong><span className="mt-2 block text-[10px] leading-5 text-stone-500">{item.detail}</span></span></div>;
}
