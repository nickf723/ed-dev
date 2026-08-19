import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  Atom,
  Boxes,
  Gem,
  Grid3X3,
  Layers3,
  Search,
  Sparkles,
} from "lucide-react";
import CrystalBackground from "./CrystalBackground";
import MineralDiagnosticLab from "./MineralDiagnosticLab";

const NODE_ID = "natural.earth-science.mineralogy";

const STRUCTURE_CHAIN = [
  {
    icon: Atom,
    label: "Composition",
    detail: "Which elements and ions are present, in what proportions, and with what substitutions?",
    rgb: "125, 211, 252",
  },
  {
    icon: Grid3X3,
    label: "Crystal structure",
    detail: "How are those atoms or ions arranged and repeated through the solid?",
    rgb: "192, 132, 252",
  },
  {
    icon: Gem,
    label: "Mineral properties",
    detail: "Structure and bonding produce hardness, cleavage, fracture, density, luster, optical behavior, and other observable traits.",
    rgb: "244, 114, 182",
  },
  {
    icon: Search,
    label: "Identification",
    detail: "Compare multiple diagnostic properties against known minerals rather than trusting appearance alone.",
    rgb: "250, 204, 21",
  },
] as const;

const FAMILIES = [
  ["Silicates", "Built around silicon-oxygen structural units; the dominant mineral family in Earth's crust."],
  ["Carbonates", "Contain carbonate groups and often record sedimentary, marine, hydrothermal, or metamorphic environments."],
  ["Oxides", "Oxygen bonded to one or more metallic elements; important as ores and weathering products."],
  ["Sulfides", "Sulfur combined with metals or metalloids; many economically important ore minerals belong here."],
  ["Halides", "Salts containing halogen ions such as chloride or fluoride; often associated with evaporite settings."],
  ["Native elements", "Minerals dominated by a single element, including gold, copper, sulfur, graphite, and diamond."],
] as const;

export default function MineralogyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0d0614] text-slate-100 selection:bg-fuchsia-400/25">
      <CrystalBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_76%_16%,rgba(217,70,239,0.12),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(125,211,252,0.055),transparent_27%),linear-gradient(to_bottom,rgba(13,6,20,0.08),rgba(13,6,20,0.74)_76%,rgba(9,4,14,0.96))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.10] [background-image:linear-gradient(60deg,rgba(232,121,249,0.10)_1px,transparent_1px),linear-gradient(-60deg,rgba(192,132,252,0.08)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#0d0614]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Composition · crystal structure · properties · identification"
            eyebrowStyle="rule"
            icon={Gem}
            title={<span>Mineralogy</span>}
            subtitle="Mineralogy connects chemistry to crystal structure and crystal structure to observable properties. Minerals are defined by composition and ordered structure, then identified by converging evidence from tests such as hardness, streak, cleavage, luster, density, crystal habit, and special reactions."
            accentRgb="217, 70, 239"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fff7ff]"
            headerClassName="border-fuchsia-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-fuchsia-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-200/58"><Boxes size={13} /> Structure → property chain</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">A mineral's appearance is the surface expression of atomic structure.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">That is why cleavage planes, crystal symmetry, hardness, density, optical effects, and fracture patterns are not arbitrary labels. They emerge from bonding and the repeated arrangement of matter.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {STRUCTURE_CHAIN.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[205px] border-b border-white/[0.06] px-5 py-5 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                  <div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)`, background: `rgba(${item.rgb},0.035)` }}><Icon size={15} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                  <h3 className="mt-5 text-[14px] font-semibold text-white/86">{item.label}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-slate-600">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-6"><MineralDiagnosticLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:px-6">
            <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/54"><Layers3 size={12} /> Classification · reference, not navigation</div><h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Chemical families organize minerals by their dominant anion or anionic group.</h2></div>
            <p className="text-[11px] leading-5 text-slate-500">The full mineral-classification system is more detailed than this overview, but family-level grouping makes common chemical relationships visible before diving into individual species.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3">
            {FAMILIES.map(([name, detail], index) => (
              <article key={name} className="min-h-[150px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] text-fuchsia-200/34">0{index + 1}</span><Sparkles size={11} className="text-fuchsia-200/28" /></div>
                <h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
