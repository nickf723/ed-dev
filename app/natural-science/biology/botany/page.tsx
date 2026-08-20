import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import {
  ArrowRight,
  Dna,
  Droplets,
  Flower2,
  FlaskConical,
  GitBranch,
  Leaf,
  Microscope,
  MoveUp,
  Network,
  Sprout,
  Sun,
  Trees,
  Wind,
  type LucideIcon,
} from "lucide-react";
import BotanyBackground from "./BotanyBackground";
import PhotosynthesisWidget from "./PhotosynthesisWidget";

const TRANSPORT = [
  { title: "Root interface", question: "What enters from soil and what limits uptake?", detail: "Roots interact with water, dissolved ions, soil structure, microbes, oxygen availability, and mycorrhizal partners. Uptake is selective and physiologically regulated.", icon: Sprout, rgb: "251,191,36" },
  { title: "Xylem", question: "How can water move from roots toward leaves?", detail: "Xylem transports water and dissolved minerals through dead conducting cells in many vascular plants. Transpiration, cohesion, pressure, anatomy, and soil–plant–air gradients all matter.", icon: MoveUp, rgb: "34,211,238" },
  { title: "Leaf exchange", question: "How does a leaf acquire CO₂ without losing unlimited water?", detail: "Stomata regulate a diffusion pathway between internal leaf air spaces and the atmosphere. Photosynthetic carbon gain and water loss are coupled to a larger control system.", icon: Leaf, rgb: "74,222,128" },
  { title: "Phloem & sinks", question: "Where do sugars and other transported compounds go?", detail: "Phloem moves products from source tissues toward sinks such as growing organs, roots, fruits, storage tissues, or other demanding regions. Source–sink direction can change with development and season.", icon: Network, rgb: "244,114,182" },
] as const;

const LENSES: readonly { title: string; note: string; icon: LucideIcon; rgb: string }[] = [
  { title: "Plant physiology", note: "water relations · photosynthesis · respiration · transport · hormones · stress", icon: Droplets, rgb: "34,211,238" },
  { title: "Anatomy & development", note: "meristems · tissues · vascular systems · roots · stems · leaves · growth", icon: Microscope, rgb: "74,222,128" },
  { title: "Genetics & evolution", note: "gene regulation · domestication · adaptation · phylogeny · life-history change", icon: Dna, rgb: "192,132,252" },
  { title: "Reproduction", note: "flowers · cones · spores · pollination · fertilization · seeds · dispersal", icon: Flower2, rgb: "244,114,182" },
  { title: "Ecology", note: "competition · facilitation · herbivory · symbiosis · succession · climate response", icon: Trees, rgb: "134,239,172" },
  { title: "Systematics & diversity", note: "classification · morphology · molecular evidence · lineages · plant diversity", icon: GitBranch, rgb: "251,191,36" },
] as const;

const DISTINCTIONS = [
  ["Photosynthesis ≠ growth", "Photosynthesis supplies chemical energy and fixed carbon, but plant growth also depends on respiration, nutrient availability, water, temperature, development, tissue allocation, transport, damage, and many other processes."],
  ["Plants respire too", "Plants carry out cellular respiration. Gas exchange varies with tissue, light, metabolism, development, and environment; describing plants as simply 'breathing in CO₂ and breathing out O₂' hides half the system."],
  ["Xylem ≠ pump pipe", "Water transport in xylem is not equivalent to a mechanical pump pushing a rigid column. Cohesion, tension, pressure, resistance, cavitation, anatomy, and environmental gradients contribute."],
  ["Phloem ≠ always downward", "Phloem transport follows source–sink relationships, not a universal top-to-bottom rule. Young leaves, roots, fruits, storage organs, and other tissues can switch roles over time."],
  ["Plant use ≠ botanical classification", "Medicinal, edible, ornamental, toxic, fiber, timber, or crop uses are human categories. They do not define evolutionary relationships or the central organization of botany."],
  ["Green ≠ plant", "Many photosynthetic organisms are not plants, and some plants contain little chlorophyll or rely partly or strongly on other organisms. Botanical identity is evolutionary, not a color test."],
] as const;

export default function BotanyPage() {
  return (
    <SceneFrame
      background={<BotanyBackground />}
      className="bg-[#020704] text-slate-100 selection:bg-emerald-300/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(2,7,4,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Biology", href: "/natural-science/biology" },
            { label: "Botany" },
          ]}
          eyebrow="Water · carbon · transport · growth · reproduction · environment"
          eyebrowStyle="rule"
          icon={Leaf}
          title={<span>Botany</span>}
          subtitle="Botany studies plants as integrated living systems. Follow water and nutrients from roots, carbon through leaves, transported resources between source and sink tissues, growth from meristems, reproduction across life cycles, and the ecological and evolutionary conditions that shape plant form."
          accentRgb="74, 222, 128"
          titleClassName="font-sans text-[clamp(2.9rem,5.3vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#f0fdf4]"
          headerClassName="border-emerald-100/[0.10]"
        />
      }
    >
      <section className="mt-5">
        <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-emerald-200/62"><Wind size={14} /> Leaf exchange laboratory</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">A leaf cannot open itself to carbon dioxide without also opening itself to the atmosphere.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/72">Start with a physiological tradeoff instead of a specimen gallery. Once gas exchange is visible, photosynthesis, water transport, stomatal regulation, and whole-plant allocation have somewhere concrete to attach.</p>
        </div>
        <PhotosynthesisWidget />
      </section>

      <section className="mt-10 border-t border-emerald-100/[0.09] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><Droplets size={14} /> Whole-plant transport</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.048em] text-white">Plants connect soil, atmosphere, and growing tissues through moving gradients and source–sink relationships.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/68">The arrows below are a reading order, not four isolated departments. Root uptake changes leaf water status; stomata change transpiration; carbon fixation changes sugar supply; sinks feed back on where resources are allocated.</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {TRANSPORT.map((item, index) => <TransportCell key={item.title} item={item} number={`0${index + 1}`} />)}
        </div>
      </section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_420px] xl:items-start">
        <Surface variant="glass" className="overflow-hidden rounded-[28px] border-lime-100/[0.08]" style={{ background: "rgba(5,14,6,0.15)" }}>
          <div className="p-5 sm:p-6"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-lime-200/54"><Sun size={13} /> Plant process network</div><h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.6rem)] font-semibold tracking-[-0.043em] text-white">No single process explains a plant.</h3><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/74">Botany moves between cell-scale mechanisms, tissue architecture, whole-organism allocation, life cycles, populations, and ecosystems. The same trait can be understood differently at each scale.</p></div>
          <div className="grid border-t border-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
            {LENSES.map((lens) => <Lens key={lens.title} {...lens} />)}
          </div>
        </Surface>

        <Surface variant="open" className="overflow-hidden rounded-[28px] border-emerald-100/[0.08] xl:sticky xl:top-[172px]" style={{ background: "rgba(3,12,6,0.06)" }}>
          <div className="p-5"><div className="font-mono text-[11px] uppercase tracking-[0.08em] text-emerald-200/48">Useful distinctions</div><h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Plant diagrams collect shortcuts. Keep the shortcuts labeled.</h3></div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {DISTINCTIONS.map(([term, text], index) => <div key={term} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 px-4 py-3.5"><span className="font-mono text-[10px] text-emerald-200/38">0{index + 1}</span><span><strong className="block text-[12px] text-white/82">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>)}
          </div>
        </Surface>
      </section>

      <section className="mt-9 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-3">
        <Neighbor href="/natural-science/biology/cytology" label="Cytology" note="membranes, organelles, cell division, molecular traffic" icon={Microscope} rgb="52,211,153" />
        <Neighbor href="/natural-science/biology/mycology" label="Mycology" note="fungal networks, decomposition, symbiosis, ecology" icon={Sprout} rgb="192,132,252" />
        <Neighbor href="/natural-science/chemistry" label="Chemistry" note="molecular structure, reactions, energy, measurement" icon={FlaskConical} rgb="34,211,238" />
      </section>
    </SceneFrame>
  );
}

function TransportCell({ item, number }: { item: (typeof TRANSPORT)[number]; number: string }) {
  const Icon = item.icon;
  return <div className="min-h-[245px] rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4 backdrop-blur-[10px]" style={{ boxShadow: `inset 0 3px 0 rgba(${item.rgb},0.28)` }}><div className="flex items-start justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.24)`, background: `rgba(${item.rgb},0.04)` }}><Icon size={16} /></span><span className="font-mono text-[10px] text-slate-600">{number}</span></div><h3 className="mt-4 text-[16px] font-semibold text-white/88">{item.title}</h3><strong className="mt-2 block text-[12px] leading-5" style={{ color: `rgba(${item.rgb},0.76)` }}>{item.question}</strong><p className="mt-2 text-[12px] leading-5 text-slate-400/72">{item.detail}</p></div>;
}

function Lens({ title, note, icon: Icon, rgb }: { title: string; note: string; icon: LucideIcon; rgb: string }) {
  return <div className="min-h-[130px] border-b border-white/[0.06] p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><Icon size={15} style={{ color: `rgb(${rgb})` }} /><strong className="mt-3 block text-[13px] text-white/84">{title}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{note}</span></div>;
}

function Neighbor({ href, label, note, icon: Icon, rgb }: { href: string; label: string; note: string; icon: LucideIcon; rgb: string }) {
  return <Link href={href} className="group flex min-h-[92px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-[10px] transition hover:bg-black/[0.15]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)` }}><Icon size={16} /></span><span className="min-w-0 flex-1"><strong className="text-[13px] text-white/84">{label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{note}</span></span><ArrowRight size={13} className="text-white/28 transition group-hover:translate-x-1" /></Link>;
}
