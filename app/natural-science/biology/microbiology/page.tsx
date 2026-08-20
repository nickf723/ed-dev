import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import {
  Activity,
  ArrowRight,
  Beaker,
  Dna,
  FlaskConical,
  GitBranch,
  Leaf,
  Microscope,
  Network,
  ShieldCheck,
  Sprout,
  TestTubes,
  Users,
  type LucideIcon,
} from "lucide-react";
import MicrobiologyBackground from "./MicrobiologyBackground";
import CulturePlateWidget from "./CulturePlateWidget";

const LENSES: readonly { title: string; question: string; detail: string; icon: LucideIcon; rgb: string }[] = [
  {
    title: "Growth & physiology",
    question: "When can a population increase, persist, or stop growing?",
    detail: "Study resource use, transport, stress responses, cell division, growth phases, and the physical conditions that shape microbial activity.",
    icon: Sprout,
    rgb: "163,230,53",
  },
  {
    title: "Metabolism",
    question: "Which chemical pathways supply energy and building material?",
    detail: "Microbes use enormous metabolic diversity. Oxygen use is only one possibility; electron donors, acceptors, carbon sources, and environmental chemistry matter.",
    icon: FlaskConical,
    rgb: "251,191,36",
  },
  {
    title: "Genetics & evolution",
    question: "How do microbial traits arise and spread through populations?",
    detail: "Mutation, selection, drift, recombination, gene transfer, genome organization, and population history can change traits across very different time scales.",
    icon: Dna,
    rgb: "192,132,252",
  },
  {
    title: "Communities & ecology",
    question: "What changes when many populations share one environment?",
    detail: "Competition, cross-feeding, syntrophy, signaling, predation, spatial structure, gradients, and disturbance can make a community behave differently from an isolated strain.",
    icon: Network,
    rgb: "34,211,238",
  },
  {
    title: "Host interaction",
    question: "How can microbes live with, benefit, colonize, or harm a host?",
    detail: "Host-associated microbes span mutualism, commensal relationships, opportunism, and disease. Pathogenesis is important, but it is not synonymous with microbiology.",
    icon: Users,
    rgb: "244,114,182",
  },
  {
    title: "Methods & evidence",
    question: "What was actually measured, grown, sequenced, imaged, or inferred?",
    detail: "Culture, microscopy, staining, sequencing, molecular assays, metabolite measurements, perturbations, and community sampling reveal different slices of microbial systems.",
    icon: Microscope,
    rgb: "125,211,252",
  },
] as const;

const DISTINCTIONS = [
  ["Microbe ≠ pathogen", "Most microbial life is not adequately described by disease. Microbes drive ecosystems, biogeochemical cycles, food systems, biotechnology, host communities, and countless other processes."],
  ["Culture ≠ community", "A colony or liquid culture is a controlled experimental system. Many environmental microbes are difficult to culture under simple laboratory conditions, and communities contain interactions that isolates omit."],
  ["Virus ≠ cellular microbe", "Viruses are acellular replicating entities that depend on host cells. Virology is often studied alongside microbiology, but bacterial, archaeal, fungal, protist, and viral biology are not interchangeable."],
  ["Abundance ≠ activity", "Finding many cells or many DNA sequences does not by itself show which organisms are metabolically active, growing, interacting, or causing a measured process."],
  ["Association ≠ mechanism", "A taxon can correlate with an environment or phenotype without being the cause. Mechanistic claims usually require additional experiments, perturbations, temporal evidence, or converging methods."],
  ["Model strain ≠ microbial diversity", "Well-studied laboratory organisms are powerful tools, but conclusions from one strain, species, medium, or growth condition do not automatically generalize across microbial life."],
] as const;

export default function MicrobiologyPage() {
  return (
    <SceneFrame
      background={<MicrobiologyBackground />}
      className="bg-[#020807] text-slate-100 selection:bg-lime-300/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(2,8,7,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Biology", href: "/natural-science/biology" },
            { label: "Microbiology" },
          ]}
          eyebrow="Growth · metabolism · heredity · communities · hosts · measurement"
          eyebrowStyle="rule"
          icon={Microscope}
          title={<span>Microbiology</span>}
          subtitle="Microbiology studies microscopic biological systems across cells, populations, communities, hosts, and environments. The field connects growth and metabolism with genetics, evolution, ecology, molecular mechanisms, and the experimental methods used to observe organisms that are often invisible to the naked eye."
          accentRgb="163, 230, 53"
          titleClassName="font-sans text-[clamp(2.9rem,5.3vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#f7fee7]"
          headerClassName="border-lime-100/[0.10]"
        />
      }
    >
      <section className="mt-5">
        <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-lime-200/62"><Activity size={14} /> Population laboratory</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Start with change through time, not a gallery of microscopic shapes.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/72">A culture curve is only one experimental window, but it makes a central idea visible immediately: microbial populations respond to resources and conditions, and population-level patterns emerge from many local cellular processes.</p>
        </div>
        <CulturePlateWidget />
      </section>

      <section className="mt-10 border-t border-lime-100/[0.09] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><GitBranch size={14} /> Field lenses</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.048em] text-white">The subject gets larger as soon as one cell is no longer alone.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/68">Microbiology crosses scales constantly. A gene can alter a protein, a protein can alter metabolism, metabolism can alter growth, growth can alter competition, and community context can change which traits matter.</p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {LENSES.map((lens, index) => <Lens key={lens.title} lens={lens} number={`0${index + 1}`} />)}
        </div>
      </section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_420px] xl:items-start">
        <Surface variant="glass" className="overflow-hidden rounded-[28px] border-cyan-100/[0.08]" style={{ background: "rgba(3,14,12,0.18)" }}>
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-200/54"><TestTubes size={13} /> Method boundary</div>
            <h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.6rem)] font-semibold tracking-[-0.043em] text-white">What you can see depends on how you asked the question.</h3>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/74">Growing an isolate, sequencing a community, imaging a cell, measuring a metabolite, and perturbing a gene can all describe the same microbial system differently. Strong claims name the measurement and the missing information.</p>
          </div>
          <div className="grid border-t border-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
            <Method icon={Beaker} title="Culture" note="controlled growth under chosen laboratory conditions" />
            <Method icon={Microscope} title="Imaging" note="morphology, localization, spatial organization, dynamics" />
            <Method icon={Dna} title="Sequencing" note="genetic content, diversity, relative representation, expression" />
            <Method icon={Activity} title="Physiology" note="growth, transport, metabolism, stress, chemical response" />
            <Method icon={Network} title="Community assays" note="interactions, gradients, ecology, shared metabolites" />
            <Method icon={ShieldCheck} title="Perturbation" note="test whether changing one factor changes the outcome" />
          </div>
        </Surface>

        <Surface variant="open" className="overflow-hidden rounded-[28px] border-lime-100/[0.08] xl:sticky xl:top-[172px]" style={{ background: "rgba(7,14,5,0.06)" }}>
          <div className="p-5"><div className="font-mono text-[11px] uppercase tracking-[0.08em] text-lime-200/48">Useful distinctions</div><h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Small organisms create big category errors.</h3></div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {DISTINCTIONS.map(([term, text], index) => <div key={term} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 px-4 py-3.5"><span className="font-mono text-[10px] text-lime-200/38">0{index + 1}</span><span><strong className="block text-[12px] text-white/82">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>)}
          </div>
        </Surface>
      </section>

      <section className="mt-9 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-3">
        <Neighbor href="/natural-science/biology/cytology" label="Cytology" note="cell structure, membranes, trafficking, division" icon={Microscope} rgb="52,211,153" />
        <Neighbor href="/natural-science/biology/mycology" label="Mycology" note="fungal biology, ecology, growth, symbiosis" icon={Leaf} rgb="251,191,36" />
        <Neighbor href="/natural-science/chemistry" label="Chemistry" note="molecular structure, reactions, energy, measurement" icon={FlaskConical} rgb="34,211,238" />
      </section>
    </SceneFrame>
  );
}

function Lens({ lens, number }: { lens: (typeof LENSES)[number]; number: string }) {
  const Icon = lens.icon;
  return <article className="min-h-[220px] rounded-[20px] border border-white/[0.07] bg-black/[0.075] p-4 backdrop-blur-[10px]" style={{ boxShadow: `inset 3px 0 0 rgba(${lens.rgb},0.34)` }}><div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${lens.rgb})`, borderColor: `rgba(${lens.rgb},0.24)`, background: `rgba(${lens.rgb},0.04)` }}><Icon size={16} /></span><span className="font-mono text-[10px] text-slate-600">{number}</span></div><h3 className="mt-4 text-[17px] font-semibold text-white/90">{lens.title}</h3><strong className="mt-2 block text-[12px] leading-5" style={{ color: `rgba(${lens.rgb},0.78)` }}>{lens.question}</strong><p className="mt-2 text-[12px] leading-5 text-slate-400/72">{lens.detail}</p></article>;
}

function Method({ icon: Icon, title, note }: { icon: LucideIcon; title: string; note: string }) {
  return <div className="min-h-[125px] border-b border-white/[0.06] p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><Icon size={15} className="text-cyan-200/58" /><strong className="mt-3 block text-[13px] text-white/84">{title}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{note}</span></div>;
}

function Neighbor({ href, label, note, icon: Icon, rgb }: { href: string; label: string; note: string; icon: LucideIcon; rgb: string }) {
  return <Link href={href} className="group flex min-h-[92px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-[10px] transition hover:bg-black/[0.15]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)` }}><Icon size={16} /></span><span className="min-w-0 flex-1"><strong className="text-[13px] text-white/84">{label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{note}</span></span><ArrowRight size={13} className="text-white/28 transition group-hover:translate-x-1" /></Link>;
}
