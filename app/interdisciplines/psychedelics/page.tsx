import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import PsychedelicBackground from "./PsychedelicBackground";
import BrainStateWidget from "./BrainStateWidget";
import {
  ArrowRight,
  Brain,
  FlaskConical,
  Globe2,
  Microscope,
  Network,
  Scale,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

type Lens = {
  title: string;
  cue: string;
  question: string;
  icon: LucideIcon;
  rgb: string;
  status: "planned" | "live";
  href?: string;
};

const LENSES: readonly Lens[] = [
  {
    title: "Molecular pharmacology",
    cue: "compound · receptor · binding · metabolism",
    question: "Which molecular targets and pharmacokinetic processes are associated with the compound, and what does that evidence actually establish?",
    icon: FlaskConical,
    rgb: "34,211,238",
    status: "planned",
  },
  {
    title: "Systems neuroscience",
    cue: "activity · connectivity · dynamics · measurement",
    question: "Which changes are observed in neural activity or network organization, and how sensitive are those findings to method and analysis?",
    icon: Brain,
    rgb: "217,70,239",
    status: "planned",
  },
  {
    title: "Perception & phenomenology",
    cue: "perception · self-report · attention · meaning",
    question: "How can altered perception and experience be described without treating one report, metaphor, or scale as the experience itself?",
    icon: Sparkles,
    rgb: "250,204,21",
    status: "live",
    href: "/interdisciplines/psychedelics/synesthesia",
  },
  {
    title: "Clinical research",
    cue: "trial · outcome · adverse event · follow-up",
    question: "What can controlled studies say about benefits, harms, durability, moderators, and uncertainty in specific populations and settings?",
    icon: Microscope,
    rgb: "94,234,212",
    status: "planned",
  },
  {
    title: "Culture, history & policy",
    cue: "ritual · law · media · norms · institutions",
    question: "How do cultural meaning, legal regimes, medicalization, history, and community practice shape what psychedelic use and research become?",
    icon: Globe2,
    rgb: "96,165,250",
    status: "planned",
  },
] as const;

const INFERENCE_STEPS = [
  {
    label: "Molecular action",
    text: "A receptor interaction or metabolite profile describes one biological level. It does not by itself specify a whole subjective experience.",
    rgb: "34,211,238",
  },
  {
    label: "Neural measurement",
    text: "Imaging, electrophysiology, and network analyses provide measurements shaped by method, preprocessing, statistics, and model choices.",
    rgb: "217,70,239",
  },
  {
    label: "Reported experience",
    text: "Self-report, behavior, interviews, and psychometric scales capture different slices of experience and are influenced by language and context.",
    rgb: "250,204,21",
  },
  {
    label: "Clinical interpretation",
    text: "A study outcome depends on population, design, comparison condition, support, follow-up, adverse-event monitoring, and the question being asked.",
    rgb: "94,234,212",
  },
] as const;

const GUARDRAILS = [
  ["One receptor is not the whole mechanism", "Classic psychedelic pharmacology often emphasizes serotonergic signaling, especially 5-HT2A-related mechanisms, but a molecular target should not be treated as a complete explanation of cognition, perception, or therapeutic outcome."],
  ["Connectivity is not a feeling", "A brain-network visualization is an analytical representation. Increased, decreased, or redistributed connectivity does not translate one-to-one into ego loss, insight, creativity, or any other subjective label."],
  ["Context is part of the observation", "Expectations, environment, culture, prior experience, interpersonal support, and study procedures can influence reports and outcomes. Context should be measured and discussed rather than reduced to a slogan."],
  ["Clinical evidence is scoped", "A result from a controlled study supports claims about that design and population. It does not automatically establish effectiveness, safety, or suitability for every person or unsupervised setting."],
] as const;

export default function PsychedelicsPage() {
  return (
    <SceneFrame
      background={<PsychedelicBackground />}
      className="bg-[#080511] text-slate-100 selection:bg-fuchsia-300/25"
      maxWidthClassName="max-w-[1540px]"
      headerBackground="rgba(8,5,17,0.54)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Interdisciplines", href: "/interdisciplines" },
            { label: "Psychedelics" },
          ]}
          eyebrow="Pharmacology · neuroscience · experience · clinical evidence · culture"
          eyebrowStyle="rule"
          icon={Network}
          title={<span>Psychedelics</span>}
          subtitle="Study psychedelic compounds across levels that should not be collapsed into one another: molecular pharmacology, neural measurement, subjective experience, clinical research, and cultural or institutional context."
          accentRgb="217, 70, 239"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#fff7ff]"
          headerClassName="border-fuchsia-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-fuchsia-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,7,27,0.36),transparent_28%,transparent_72%,rgba(7,14,25,0.28))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-fuchsia-200/68"><Scale size={14} /> Interdisciplinary map</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">The same phenomenon can be measured at several levels without those levels becoming interchangeable.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">A receptor assay, an fMRI analysis, a participant report, a clinical outcome, and a cultural interpretation can all be relevant evidence. The hard part is explaining how they relate without pretending one vocabulary replaces all the others.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/natural-science/chemistry" label="Chemistry" note="molecules · structure · measurement" rgb="52,211,153" />
            <Neighbor href="/social-science/psychology" label="Psychology" note="perception · cognition · behavior" rgb="96,165,250" />
            <Neighbor href="/natural-science/biology" label="Biology" note="cells · systems · physiology" rgb="74,222,128" />
            <Neighbor href="/humanities/culture" label="Culture" note="meaning · practice · institutions" rgb="251,191,36" />
          </div>
        </div>

        <div className="relative mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {LENSES.map((lens) => <LensCard key={lens.title} lens={lens} />)}
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)] xl:items-start">
        <BrainStateWidget />

        <Surface variant="glass" className="rounded-[24px] border-fuchsia-100/[0.09] p-5 sm:p-6" style={{ background: "rgba(16,8,21,0.20)" }}>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-fuchsia-200/62">Inference ladder</div>
          <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Every arrow needs evidence.</h2>
          <p className="mt-3 text-[13px] leading-6 text-slate-400">Interdisciplinary explanations become fragile when they jump from a measurement at one level straight to a confident story at another. Keep the intermediate inference visible.</p>
          <div className="mt-5 space-y-2">
            {INFERENCE_STEPS.map((step, index) => (
              <div key={step.label} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 rounded-[16px] border border-white/[0.06] bg-black/[0.12] p-3">
                <span className="font-mono text-[10px]" style={{ color: `rgba(${step.rgb},0.62)` }}>0{index + 1}</span>
                <div><strong className="text-[13px] text-white">{step.label}</strong><p className="mt-1 text-[12px] leading-5 text-slate-400">{step.text}</p></div>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <section className="mt-8 border-t border-fuchsia-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/58"><Users size={14} /> Evidence guardrails</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Interesting hypotheses should become more testable, not more mystical, as the evidence gets complicated.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/72">This page is a map of research questions, not medical guidance and not a model of what any individual experience should look like.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          {GUARDRAILS.map(([title, text], index) => (
            <div key={title} className="grid min-h-[190px] grid-cols-[34px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] p-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
              <span className="font-mono text-[10px] text-fuchsia-200/42">0{index + 1}</span>
              <div><strong className="text-[13px] text-white/86">{title}</strong><p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p></div>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function LensCard({ lens }: { lens: Lens }) {
  const Icon = lens.icon;
  const body = (
    <div className={`group flex min-h-[230px] flex-col rounded-[20px] border p-4 backdrop-blur-[12px] ${lens.status === "planned" ? "opacity-62" : "transition hover:-translate-y-0.5"}`} style={{ borderColor: `rgba(${lens.rgb},0.16)`, background: `linear-gradient(145deg,rgba(${lens.rgb},0.045),rgba(7,5,14,0.18))` }}>
      <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${lens.rgb})`, borderColor: `rgba(${lens.rgb},0.26)`, background: `rgba(${lens.rgb},0.04)` }}><Icon size={17} /></span><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">{lens.status === "planned" ? "planned" : "open"}</span></div>
      <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${lens.rgb},0.68)` }}>{lens.cue}</div>
      <h3 className="mt-1 text-[16px] font-semibold text-white">{lens.title}</h3>
      <p className="mt-2 text-[11px] leading-5 text-slate-400">{lens.question}</p>
      {lens.status === "live" ? <span className="mt-auto flex items-center justify-end gap-1 pt-3 text-[10px] font-semibold" style={{ color: `rgba(${lens.rgb},0.72)` }}>open live example <ArrowRight size={11} className="transition group-hover:translate-x-1" /></span> : null}
    </div>
  );
  return lens.status === "live" && lens.href ? <Link href={lens.href}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[74px] flex-col justify-between rounded-[15px] border border-white/[0.07] bg-black/[0.08] p-3 backdrop-blur-[10px] transition hover:bg-black/[0.16]"><strong className="text-[12px] text-white/84">{label}</strong><span className="flex items-end justify-between gap-2"><span className="text-[10px] leading-4 text-slate-500">{note}</span><ArrowRight size={11} style={{ color: `rgba(${rgb},0.62)` }} className="transition group-hover:translate-x-1" /></span></Link>;
}
