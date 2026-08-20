import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import SynesthesiaBackground from "./SynesthesiaBackground";
import SensoryMapperWidget from "./SensoryMapperWidget";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Eye,
  Languages,
  Music2,
  Palette,
  Sparkles,
  Type,
  type LucideIcon,
} from "lucide-react";

const FORMS: readonly { title: string; cue: string; text: string; icon: LucideIcon; rgb: string }[] = [
  {
    title: "Grapheme–color",
    cue: "letter / number → color",
    text: "A grapheme such as A or 7 reliably evokes a color concurrent for the individual, even when the printed grapheme itself is achromatic.",
    icon: Type,
    rgb: "244,114,182",
  },
  {
    title: "Sound–color",
    cue: "sound → color / shape",
    text: "Some people report colors or visual forms associated with musical notes, timbres, voices, or other sounds. Associations differ substantially across people.",
    icon: Music2,
    rgb: "34,211,238",
  },
  {
    title: "Sequence–space",
    cue: "ordered sequence → spatial layout",
    text: "Numbers, months, days, or other ordered sequences may be experienced as occupying consistent spatial arrangements around the person or in imagined space.",
    icon: Sparkles,
    rgb: "167,139,250",
  },
  {
    title: "Lexical–gustatory",
    cue: "word / sound → taste",
    text: "Words or speech sounds may evoke stable taste or food-related concurrents. This form is less common and illustrates how varied inducer–concurrent pairings can be.",
    icon: Languages,
    rgb: "250,204,21",
  },
] as const;

const BOUNDARIES = [
  ["Ordinary association", "People can learn that red means danger or associate a song with a place. Learned association alone is not sufficient to identify synesthesia."],
  ["Cross-modal correspondence", "Many people match high pitch with small or bright shapes, or certain sounds with angular forms. Population-level correspondences are not the same as an individual's stable synesthetic concurrent."],
  ["Hallucination", "A hallucinated color or shape need not be tied to a specific recurring inducer. Synesthetic concurrents are typically discussed as systematic relationships rather than unrestricted perceptual events."],
  ["Drug-associated cross-modal effects", "Psychoactive substances can alter sensory integration and produce synesthesia-like reports, but those transient effects should not simply be equated with developmental synesthesia."],
] as const;

const MECHANISM_NOTES = [
  {
    title: "Cross-activation hypotheses",
    text: "Some accounts propose unusually strong or differently organized interactions between neural systems involved in the inducer and concurrent. The details vary by synesthesia type and study method.",
  },
  {
    title: "Feedback / inhibition hypotheses",
    text: "Other accounts emphasize altered feedback, inhibition, or network dynamics rather than fixed extra connections. These are explanatory families, not settled universal mechanisms.",
  },
  {
    title: "Development & learning",
    text: "Associations can reflect development, concepts, categories, language, and experience. A neural explanation and a learning history are not mutually exclusive levels of description.",
  },
] as const;

export default function SynesthesiaPage() {
  return (
    <SceneFrame
      background={<SynesthesiaBackground />}
      className="bg-[#090510] text-slate-100 selection:bg-fuchsia-300/25"
      maxWidthClassName="max-w-[1420px]"
      headerBackground="rgba(9,5,16,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Interdisciplines", href: "/interdisciplines" },
            { label: "Psychedelics", href: "/interdisciplines/psychedelics" },
            { label: "Synesthesia" },
          ]}
          eyebrow="Inducer · concurrent · consistency · perception · development"
          eyebrowStyle="rule"
          icon={Eye}
          title={<span>Synesthesia</span>}
          subtitle="Study stable cross-domain perceptual or conceptual associations by separating the stimulus that triggers the experience from the concurrent experience it evokes."
          accentRgb="217, 70, 239"
          titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fff7ff]"
          headerClassName="border-fuchsia-100/[0.10]"
        />
      }
    >
      <section className="mt-5 rounded-[24px] border border-fuchsia-100/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-fuchsia-200/70">Phenomenon</div>
        <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">A black letter can remain visibly black while also reliably evoking a particular color for the person seeing it.</h2>
        <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-300/76">That extra association is not inferred from the ink. In grapheme–color synesthesia, the grapheme is the <strong className="text-white">inducer</strong> and the evoked color is the <strong className="text-white">concurrent</strong>. The relationship is individual-specific and often notable for its consistency.</p>
      </section>

      <section className="mt-5">
        <SensoryMapperWidget />
      </section>

      <section className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/62">Conceptual bridge</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.045em] text-white">Consistency is evidence about the association, not a magical fingerprint.</h2>
          <p className="mt-3 text-[14px] leading-7 text-slate-300/74">Researchers can revisit the same inducers across repeated trials and ask whether the concurrents recur with unusual stability. That makes consistency measurable instead of relying only on a vivid description.</p>
          <p className="mt-3 text-[14px] leading-7 text-slate-300/74">But consistency alone is not enough to diagnose or explain synesthesia. Memory, learned categories, task strategy, automaticity, development, and the person's phenomenology all matter when interpreting the result.</p>
        </div>
        <Surface variant="glass" className="rounded-[22px] border-fuchsia-100/[0.09] p-5 lg:sticky lg:top-[170px]" style={{ background: "rgba(16,8,21,0.18)" }}>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fuchsia-200/58">Two useful terms</div>
          <div className="mt-4 space-y-3">
            <Term term="Inducer" text="The stimulus, concept, sequence item, sound, or other event that reliably triggers the association." />
            <Term term="Concurrent" text="The additional color, taste, spatial form, or other experience associated with that inducer." />
          </div>
        </Surface>
      </section>

      <section className="mt-8 border-t border-white/[0.07] pt-5">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/60"><Palette size={14} /> Several forms · examples, not a complete taxonomy</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {FORMS.map((form) => <FormCard key={form.title} {...form} />)}
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] xl:items-start">
        <Surface variant="open" className="rounded-[24px] border-cyan-100/[0.08] p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><Brain size={14} /> Mechanism hypotheses</div>
          <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">There is no single settled “crossed wires” explanation.</h2>
          <div className="mt-4 space-y-3">
            {MECHANISM_NOTES.map((note, index) => <div key={note.title} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] pb-3 last:border-b-0"><span className="font-mono text-[9px] text-cyan-200/42">0{index + 1}</span><div><strong className="text-[13px] text-white">{note.title}</strong><p className="mt-1 text-[12px] leading-5 text-slate-400">{note.text}</p></div></div>)}
          </div>
        </Surface>

        <Surface variant="glass" className="rounded-[24px] border-amber-100/[0.08] p-5 sm:p-6" style={{ background: "rgba(20,13,5,0.13)" }}>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/58">Do not collapse these together</div>
          <div className="mt-4 space-y-3">
            {BOUNDARIES.map(([title, text]) => <Term key={title} term={title} text={text} />)}
          </div>
        </Surface>
      </section>

      <section className="mt-8 rounded-[22px] border border-fuchsia-100/[0.09] bg-fuchsia-300/[0.025] p-5 backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-fuchsia-200/60">Why this sits near Psychedelics</div>
            <p className="mt-2 text-[13px] leading-6 text-slate-300/74">Psychedelic research sometimes reports altered sensory integration or synesthesia-like experiences. That makes synesthesia a useful comparison case, but developmental synesthesia does not require psychedelic use and should not be defined through it.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/social-science/psychology" label="Psychology" note="perception · cognition" />
            <Neighbor href="/interdisciplines/cognitive-science" label="Cognitive Science" note="levels of explanation" />
            <Neighbor href="/humanities/music" label="Music" note="sound · structure · listening" />
            <Neighbor href="/interdisciplines/psychedelics" label="Psychedelics" note="return to evidence map" />
          </div>
        </div>
      </section>

      <section className="mt-7 border-t border-white/[0.07] pt-5">
        <Link href="/interdisciplines/psychedelics" className="group inline-flex items-center gap-2 text-[11px] font-semibold text-fuchsia-100/70 hover:text-white"><ArrowLeft size={13} className="transition group-hover:-translate-x-1" /> Back to Psychedelics</Link>
      </section>
    </SceneFrame>
  );
}

function Term({ term, text }: { term: string; text: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.12] p-3"><strong className="text-[12px] text-white/86">{term}</strong><p className="mt-1.5 text-[11px] leading-5 text-slate-400">{text}</p></div>;
}

function FormCard({ title, cue, text, icon: Icon, rgb }: (typeof FORMS)[number]) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.10] p-4 backdrop-blur-[12px]"><Icon size={16} style={{ color: `rgb(${rgb})` }} /><div className="mt-3 font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${rgb},0.66)` }}>{cue}</div><h3 className="mt-1 text-[15px] font-semibold text-white">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-400">{text}</p></div>;
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[70px] flex-col justify-between rounded-[14px] border border-white/[0.07] bg-black/[0.10] p-3 transition hover:bg-black/[0.18]"><strong className="text-[11px] text-white/82">{label}</strong><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-4 text-slate-500">{note}</span><ArrowRight size={10} className="text-fuchsia-200/55 transition group-hover:translate-x-1" /></span></Link>;
}
