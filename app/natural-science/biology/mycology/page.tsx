import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import {
  ArrowRight,
  Beaker,
  Dna,
  FlaskConical,
  GitBranch,
  Leaf,
  Microscope,
  Network,
  Sprout,
  Trees,
  Wind,
  type LucideIcon,
} from "lucide-react";
import MycologyBackground from "./MycologyBackground";
import MyceliumLab from "./MyceliumLab";

const BODY_PLAN = [
  { title: "Hypha", detail: "A tubular fungal filament that commonly extends by tip growth. Septa, nuclei, cell organization, and wall structure vary across fungal groups.", icon: GitBranch, rgb: "192,132,252" },
  { title: "Mycelium", detail: "A network of hyphae occupying a substrate or host-associated environment. Network architecture can change with species, resources, damage, neighbors, and conditions.", icon: Network, rgb: "74,222,128" },
  { title: "Fruiting structure", detail: "Some fungi build macroscopic reproductive structures. A mushroom is one possible form, not the defining body plan of all fungi and not usually the whole organism.", icon: Sprout, rgb: "251,191,36" },
  { title: "Spore", detail: "A reproductive or dispersal cell. Fungal life cycles and spore types are diverse, and dispersal may involve air, water, animals, growth through substrate, or other routes.", icon: Wind, rgb: "125,211,252" },
] as const;

const ECOLOGICAL_MODES = [
  {
    title: "Decomposition & saprotrophy",
    prompt: "How can a fungus obtain resources from material outside its body?",
    detail: "Many fungi secrete enzymes into their surroundings and absorb smaller products. This extracellular digestion helps fungi transform organic matter and participate in nutrient cycling.",
    rgb: "251,191,36",
  },
  {
    title: "Symbioses",
    prompt: "What changes when fungal and partner metabolism become linked?",
    detail: "Mycorrhizal, lichen-forming, endophytic, and other associations can exchange resources or alter access to environments. Outcomes depend on partners and context rather than being automatically beneficial to both sides.",
    rgb: "74,222,128",
  },
  {
    title: "Parasitism & disease",
    prompt: "How can fungal growth exploit or damage a living host?",
    detail: "Some fungi are pathogens or parasites of plants, animals, or other organisms. Virulence, host defenses, environment, exposure, and host condition all influence outcomes.",
    rgb: "244,114,182",
  },
] as const;

const LENSES: readonly { title: string; note: string; icon: LucideIcon; rgb: string }[] = [
  { title: "Cell biology", note: "walls · membranes · nuclei · hyphal growth · septa · organelles", icon: Microscope, rgb: "192,132,252" },
  { title: "Biochemistry", note: "enzymes · extracellular digestion · metabolism · secondary compounds", icon: FlaskConical, rgb: "251,191,36" },
  { title: "Genetics & evolution", note: "genomes · mating systems · recombination · adaptation · phylogeny", icon: Dna, rgb: "125,211,252" },
  { title: "Ecology", note: "decomposition · symbiosis · competition · host interaction · nutrient cycling", icon: Trees, rgb: "74,222,128" },
  { title: "Reproduction & dispersal", note: "sexual/asexual cycles · spores · fruiting · colonization", icon: Wind, rgb: "34,211,238" },
  { title: "Methods", note: "microscopy · culture · sequencing · chemistry · field sampling · experiments", icon: Beaker, rgb: "244,114,182" },
] as const;

const DISTINCTIONS = [
  ["Fungus ≠ mushroom", "A mushroom is one kind of reproductive structure produced by some fungi. Much of a fungal organism may exist as microscopic hyphae in soil, wood, tissue, food, water, or other substrates."],
  ["Edibility ≠ taxonomy", "Closely related fungi can differ chemically, and unrelated fungi can look similar. Appearance, color, habitat, or an app-generated label is not a safe basis for deciding whether a wild fungus is edible."],
  ["Fungi ≠ plants", "Fungi are eukaryotes but do not photosynthesize like plants. They absorb resources after external digestion and have distinct cell walls, metabolism, development, and evolutionary history."],
  ["Mycorrhiza ≠ guaranteed mutualism", "Plant-fungus exchange is context dependent. Carbon, nutrients, water, partner identity, soil conditions, and other organisms can change costs and benefits."],
  ["Visible form ≠ whole network", "Fruiting bodies can appear and disappear while mycelium persists. Conversely, detecting fungal DNA or hyphae does not automatically tell us the size, activity, or ecological effect of a network."],
  ["Morphology ≠ identity", "Cap shape, spores, hyphae, colonies, and microscopic traits can inform identification, but modern fungal systematics often combines morphology with molecular and ecological evidence."],
] as const;

export default function MycologyPage() {
  return (
    <SceneFrame
      background={<MycologyBackground />}
      className="bg-[#07050a] text-slate-100 selection:bg-purple-300/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(7,5,10,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Biology", href: "/natural-science/biology" },
            { label: "Mycology" },
          ]}
          eyebrow="Hyphae · mycelium · digestion · symbiosis · reproduction · ecology"
          eyebrowStyle="rule"
          icon={Sprout}
          title={<span>Mycology</span>}
          subtitle="Mycology studies fungi as cellular, biochemical, reproductive, and ecological systems. Follow hyphae into mycelial networks, extracellular digestion, symbioses, decomposition, disease, reproduction, evolution, and the methods used to study organisms whose largest structures are often hidden in their substrate."
          accentRgb="192, 132, 252"
          titleClassName="font-sans text-[clamp(2.9rem,5.3vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#faf5ff]"
          headerClassName="border-purple-100/[0.10]"
        />
      }
    >
      <section className="mt-5">
        <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-purple-200/62"><Network size={14} /> Hidden body laboratory</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Start below the mushroom.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/72">Fungal form makes more sense when the visible reproductive structure is treated as one temporary part of a larger life cycle. The first instrument focuses on mycelial geometry, not species identification.</p>
        </div>
        <MyceliumLab />
      </section>

      <section className="mt-10 border-t border-purple-100/[0.09] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-emerald-200/58"><GitBranch size={14} /> Fungal body plan</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.048em] text-white">A branching body connects microscopic growth with macroscopic ecology.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-300/68">These terms describe recurring structures, not a single universal fungal anatomy. Yeasts, molds, mushrooms, chytrids, rusts, smuts, and many other fungi organize growth and reproduction differently.</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {BODY_PLAN.map((item) => <BodyCell key={item.title} {...item} />)}
        </div>
      </section>

      <section className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_420px] xl:items-start">
        <Surface variant="glass" className="overflow-hidden rounded-[28px] border-emerald-100/[0.08]" style={{ background: "rgba(5,12,8,0.16)" }}>
          <div className="p-5 sm:p-6"><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-200/54"><Leaf size={13} /> Ecological relationships</div><h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.6rem)] font-semibold tracking-[-0.043em] text-white">Fungal nutrition happens through relationships with surroundings.</h3></div>
          <div className="border-t border-white/[0.07]">
            {ECOLOGICAL_MODES.map((item, index) => <div key={item.title} className="grid gap-3 border-b border-white/[0.06] p-4 last:border-b-0 sm:grid-cols-[42px_220px_minmax(0,1fr)] sm:items-start"><span className="font-mono text-[10px]" style={{ color: `rgba(${item.rgb},0.52)` }}>0{index + 1}</span><span><strong className="block text-[14px] text-white/86">{item.title}</strong><span className="mt-1 block text-[11px] leading-5" style={{ color: `rgba(${item.rgb},0.68)` }}>{item.prompt}</span></span><p className="text-[12px] leading-5 text-slate-400/72">{item.detail}</p></div>)}
          </div>
        </Surface>

        <Surface variant="open" className="overflow-hidden rounded-[28px] border-purple-100/[0.08] xl:sticky xl:top-[172px]" style={{ background: "rgba(12,7,16,0.08)" }}>
          <div className="p-5"><div className="font-mono text-[11px] uppercase tracking-[0.08em] text-purple-200/48">Useful distinctions</div><h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">The mushroom-shaped shortcut causes trouble fast.</h3></div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {DISTINCTIONS.map(([term, text], index) => <div key={term} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 px-4 py-3.5"><span className="font-mono text-[10px] text-purple-200/38">0{index + 1}</span><span><strong className="block text-[12px] text-white/82">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>)}
          </div>
        </Surface>
      </section>

      <section className="mt-10 border-t border-white/[0.07] pt-5">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-200/52"><Beaker size={13} /> Mycological lenses</div>
        <div className="mt-4 grid border-y border-white/[0.07] sm:grid-cols-2 xl:grid-cols-3">
          {LENSES.map((lens) => <Lens key={lens.title} {...lens} />)}
        </div>
      </section>

      <section className="mt-9 grid gap-3 border-t border-white/[0.07] pt-5 sm:grid-cols-3">
        <Neighbor href="/natural-science/biology/microbiology" label="Microbiology" note="microbial growth, communities, methods, host interaction" icon={Microscope} rgb="163,230,53" />
        <Neighbor href="/natural-science/biology/botany" label="Botany" note="plants, roots, tissues, reproduction, ecology" icon={Leaf} rgb="74,222,128" />
        <Neighbor href="/natural-science/chemistry" label="Chemistry" note="enzymes, molecular structure, reactions, metabolites" icon={FlaskConical} rgb="34,211,238" />
      </section>
    </SceneFrame>
  );
}

function BodyCell({ title, detail, icon: Icon, rgb }: { title: string; detail: string; icon: LucideIcon; rgb: string }) {
  return <div className="min-h-[210px] rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4 backdrop-blur-[10px]" style={{ boxShadow: `inset 0 3px 0 rgba(${rgb},0.28)` }}><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.24)`, background: `rgba(${rgb},0.04)` }}><Icon size={16} /></span><h3 className="mt-4 text-[16px] font-semibold text-white/88">{title}</h3><p className="mt-2 text-[12px] leading-5 text-slate-400/72">{detail}</p></div>;
}

function Lens({ title, note, icon: Icon, rgb }: { title: string; note: string; icon: LucideIcon; rgb: string }) {
  return <div className="min-h-[130px] border-b border-white/[0.06] p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><Icon size={15} style={{ color: `rgb(${rgb})` }} /><strong className="mt-3 block text-[13px] text-white/84">{title}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{note}</span></div>;
}

function Neighbor({ href, label, note, icon: Icon, rgb }: { href: string; label: string; note: string; icon: LucideIcon; rgb: string }) {
  return <Link href={href} className="group flex min-h-[92px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-[10px] transition hover:bg-black/[0.15]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)` }}><Icon size={16} /></span><span className="min-w-0 flex-1"><strong className="text-[13px] text-white/84">{label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{note}</span></span><ArrowRight size={13} className="text-white/28 transition group-hover:translate-x-1" /></Link>;
}
