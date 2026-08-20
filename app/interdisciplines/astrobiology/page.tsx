import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import StardustBackground from "./StardustBackground";
import DrakeWidget from "./DrakeWidget";
import {
  ArrowRight,
  Dna,
  FlaskConical,
  Globe2,
  Microscope,
  Radio,
  Search,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";

type Step = {
  title: string;
  cue: string;
  question: string;
  icon: LucideIcon;
  rgb: string;
};

const SEARCH_CHAIN: readonly Step[] = [
  {
    title: "Characterize the world",
    cue: "orbit · star · mass · atmosphere · surface",
    question: "What kind of planetary or moon environment are we actually observing, and how well are its basic properties constrained?",
    icon: Globe2,
    rgb: "96,165,250",
  },
  {
    title: "Ask about habitability",
    cue: "energy · solvent · chemistry · stability · time",
    question: "Could the environment support known life processes, and are the required conditions local, global, temporary, or hidden below the surface?",
    icon: Sun,
    rgb: "250,204,21",
  },
  {
    title: "Model possible biology",
    cue: "metabolism · ecology · adaptation · limits",
    question: "What forms of life or metabolism are physically plausible under those conditions, using Earth as evidence without assuming Earth is the only template?",
    icon: Dna,
    rgb: "74,222,128",
  },
  {
    title: "Predict an observable",
    cue: "gas · pigment · chemistry · structure · signal",
    question: "If a biological process were present, what measurable feature might it produce or maintain at a detectable scale?",
    icon: Microscope,
    rgb: "94,234,212",
  },
  {
    title: "Challenge the inference",
    cue: "false positive · contamination · geology · photochemistry",
    question: "Which non-biological processes could produce the same observation, and what additional measurements would distinguish them?",
    icon: Search,
    rgb: "244,114,182",
  },
] as const;

const LENSES = [
  ["Origins", "How can chemistry become self-sustaining, evolvable biological organization? Abiogenesis research investigates pathways and constraints rather than assuming one established sequence."],
  ["Habitability", "A circumstellar habitable zone is only one screening concept. Atmosphere, pressure, composition, geology, stellar activity, interior heat, oceans, ice, and time can all matter."],
  ["Extremes on Earth", "Extremophiles expand the known environmental range of life, but they are evidence about terrestrial biology, not direct templates for every possible extraterrestrial organism."],
  ["Biosignatures", "A candidate biosignature is evidence to interpret in planetary context. No single molecule should automatically be treated as proof of life."],
  ["Technosignatures", "Searches can target signals or artifacts that might be difficult to explain without technology, while still requiring careful treatment of natural and human-made alternatives."],
  ["Planetary protection", "Searching for life also requires preventing forward contamination of other worlds and protecting the integrity of returned samples and scientific measurements."],
] as const;

const INFERENCE_GUARDRAILS = [
  ["Habitability is not inhabitation", "An environment that could support some form of life is not evidence that life is present."],
  ["Detectability is selective", "Life could exist without producing a remote signal our instruments can detect, and detection thresholds favor some worlds and processes over others."],
  ["One signal can have several causes", "Geology, atmospheric chemistry, stellar radiation, instrumentation, contamination, and biology can produce overlapping signatures."],
  ["Earth is evidence and bias", "Earth provides the only confirmed example of life, which makes it indispensable and also limits what we know about the full space of possible biology."],
] as const;

export default function AstrobiologyPage() {
  return (
    <SceneFrame
      background={<StardustBackground />}
      className="bg-[#04080d] text-slate-100 selection:bg-lime-300/25"
      maxWidthClassName="max-w-[1540px]"
      headerBackground="rgba(4,8,13,0.54)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Interdisciplines", href: "/interdisciplines" },
            { label: "Astrobiology" },
          ]}
          eyebrow="Worlds · chemistry · life · signatures · inference"
          eyebrowStyle="rule"
          icon={Sparkles}
          title={<span>Astrobiology</span>}
          subtitle="Study life's cosmic context by combining planetary science, astronomy, chemistry, geology, biology, and the logic of detecting a phenomenon that may be rare, distant, or unfamiliar."
          accentRgb="163, 230, 53"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#f7fee7]"
          headerClassName="border-lime-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-lime-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,10,0.32),transparent_30%,transparent_70%,rgba(5,10,20,0.30))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-lime-200/68"><Search size={14} /> Life-detection reasoning</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">Do not start with “Is there life?” Start with what observation could discriminate between explanations.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">Astrobiology often works backward from observables. A telescope or probe measures light, chemistry, structure, motion, or environment. Biology enters only after the signal survives physical and chemical alternatives.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/natural-science/astronomy/planetary-astronomy" label="Planetary Astronomy" note="worlds · orbits · atmospheres" rgb="96,165,250" />
            <Neighbor href="/natural-science/chemistry" label="Chemistry" note="molecules · reactions · spectra" rgb="250,204,21" />
            <Neighbor href="/natural-science/biology" label="Biology" note="life · evolution · ecology" rgb="74,222,128" />
            <Neighbor href="/natural-science/earth-science" label="Earth Science" note="geology · climate · cycles" rgb="34,211,238" />
          </div>
        </div>

        <div className="relative mt-5 grid gap-2 lg:grid-cols-5">
          {SEARCH_CHAIN.map((step, index) => <SearchStep key={step.title} step={step} index={index} />)}
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.92fr)] xl:items-start">
        <DrakeWidget />

        <Surface variant="glass" className="rounded-[24px] border-cyan-100/[0.09] p-5 sm:p-6 xl:sticky xl:top-[170px]" style={{ background: "rgba(5,10,18,0.18)" }}>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/60"><Radio size={13} /> The Fermi question</div>
          <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">A large search space and no confirmed detection can coexist.</h2>
          <p className="mt-3 text-[13px] leading-6 text-slate-400">Questions sometimes grouped under the “Fermi paradox” compare expectations about technological civilizations with the absence of confirmed evidence. But the tension depends on assumptions about frequency, detectability, longevity, expansion, search coverage, and what evidence should look like.</p>
          <div className="mt-4 border-l-2 border-cyan-300/30 pl-3">
            <strong className="text-[11px] text-cyan-100/78">Absence of detection is not one simple observation</strong>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">Different searches cover different frequencies, distances, times, technologies, planetary environments, and signal types. Search completeness is part of the inference.</p>
          </div>
        </Surface>
      </section>

      <section className="mt-8 border-t border-white/[0.07] pt-5">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-emerald-200/58"><FlaskConical size={14} /> Major research lenses · not child routes</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {LENSES.map(([title, text], index) => (
            <div key={title} className="grid min-h-[170px] grid-cols-[32px_minmax(0,1fr)] gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.10] p-4 backdrop-blur-[12px]">
              <span className="font-mono text-[9px] text-lime-200/42">0{index + 1}</span>
              <div><strong className="text-[14px] text-white">{title}</strong><p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t border-lime-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/58">Inference guardrails</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">The farther the target is from direct observation, the more important alternative explanations become.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/72">Astrobiology is exciting precisely because the evidence can be sparse. That makes disciplined uncertainty part of the science, not an obstacle to the science.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          {INFERENCE_GUARDRAILS.map(([title, text], index) => (
            <div key={title} className="grid min-h-[180px] grid-cols-[32px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] p-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
              <span className="font-mono text-[9px] text-lime-200/42">0{index + 1}</span>
              <div><strong className="text-[13px] text-white/86">{title}</strong><p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p></div>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function SearchStep({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;
  return (
    <div className="relative flex min-h-[220px] flex-col rounded-[19px] border p-4 backdrop-blur-[12px]" style={{ borderColor: `rgba(${step.rgb},0.16)`, background: `linear-gradient(145deg,rgba(${step.rgb},0.045),rgba(4,8,13,0.18))` }}>
      <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.26)`, background: `rgba(${step.rgb},0.04)` }}><Icon size={17} /></span><span className="font-mono text-[9px]" style={{ color: `rgba(${step.rgb},0.52)` }}>0{index + 1}</span></div>
      <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${step.rgb},0.66)` }}>{step.cue}</div>
      <h3 className="mt-1 text-[16px] font-semibold text-white">{step.title}</h3>
      <p className="mt-2 text-[11px] leading-5 text-slate-400">{step.question}</p>
      {index < SEARCH_CHAIN.length - 1 ? <ArrowRight size={14} className="absolute -right-[9px] top-1/2 z-10 hidden -translate-y-1/2 text-white/25 lg:block" /> : null}
    </div>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[74px] flex-col justify-between rounded-[15px] border border-white/[0.07] bg-black/[0.08] p-3 backdrop-blur-[10px] transition hover:bg-black/[0.16]"><strong className="text-[12px] text-white/84">{label}</strong><span className="flex items-end justify-between gap-2"><span className="text-[10px] leading-4 text-slate-500">{note}</span><ArrowRight size={11} style={{ color: `rgba(${rgb},0.62)` }} className="transition group-hover:translate-x-1" /></span></Link>;
}
