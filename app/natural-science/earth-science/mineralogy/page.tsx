import type { Metadata } from "next";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  Atom,
  Boxes,
  Gem,
  Grid3X3,
  Layers3,
  Mountain,
  Search,
  Shapes,
  Sparkles,
} from "lucide-react";
import CrystalBackground from "./CrystalBackground";
import MineralCabinet from "./MineralCabinet";

const NODE_ID = "natural.earth-science.mineralogy";

export const metadata: Metadata = {
  title: "Mineralogy",
  description:
    "Learn how composition and crystal structure produce mineral properties, then search and compare a curated teaching cabinet of mineral specimens.",
};

const STRUCTURE_CHAIN = [
  {
    icon: Atom,
    label: "Composition",
    detail:
      "Which elements and ions are present, in what proportions, and with which substitutions?",
    rgb: "125, 211, 252",
  },
  {
    icon: Grid3X3,
    label: "Crystal structure",
    detail:
      "How are those particles bonded and repeated through three-dimensional space?",
    rgb: "192, 132, 252",
  },
  {
    icon: Gem,
    label: "Observable properties",
    detail:
      "Bonding and structure constrain hardness, cleavage, fracture, density, luster, and optical behavior.",
    rgb: "244, 114, 182",
  },
  {
    icon: Search,
    label: "Identification",
    detail:
      "Several independent observations narrow a candidate; laboratory tools can resolve cases that field tests cannot.",
    rgb: "250, 204, 21",
  },
] as const;

const BOUNDARIES = [
  {
    icon: Shapes,
    label: "Mineral",
    rule: "A naturally formed solid with crystalline structure and a characteristic chemical composition.",
    example: "Quartz is the mineral species SiO₂ with an ordered structure.",
    rgb: "125, 211, 252",
  },
  {
    icon: Mountain,
    label: "Rock",
    rule: "A natural aggregate of one or more minerals, mineraloids, glass, or organic material.",
    example:
      "Granite is a rock commonly assembled from quartz, feldspar, mica, and other minerals.",
    rgb: "74, 222, 128",
  },
  {
    icon: Sparkles,
    label: "Gem",
    rule: "A material selected and fashioned for beauty, durability, rarity, or cultural value—not a separate mineral class.",
    example:
      "Amethyst is gem-quality purple quartz; pearl and amber show that some gems are not minerals.",
    rgb: "244, 114, 182",
  },
] as const;

export default function MineralogyPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#08060b] text-slate-100 selection:bg-fuchsia-400/25">
      <CrystalBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-20 sm:px-6 xl:px-8">
        <div className="bg-[#08060b]/76 sticky top-0 z-30 -mx-4 border-b border-white/[0.06] px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Earth materials · field evidence · crystal structure"
            eyebrowStyle="rule"
            icon={Gem}
            title={<span>Mineralogy</span>}
            subtitle="Read a mineral from the inside out. Composition and ordered structure produce physical properties; multiple observations then build an identification that is stronger than color or resemblance alone."
            accentRgb="217, 70, 239"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fff7ff]"
            headerClassName="border-fuchsia-100/[0.10]"
          />
        </div>

        <section className="mt-7 grid gap-8 lg:grid-cols-[minmax(270px,0.68fr)_minmax(0,1.32fr)] lg:items-start">
          <div className="pt-2 lg:sticky lg:top-[176px]">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100/65">
              <Boxes size={14} /> Structure → property
            </div>
            <h2 className="mt-3 max-w-xl text-[clamp(2.25rem,4.7vw,5rem)] font-semibold leading-[0.88] tracking-[-0.062em] text-white">
              The surface is a clue to the lattice beneath it.
            </h2>
            <p className="mt-5 max-w-lg border-l border-cyan-100/[0.18] pl-4 text-[14px] leading-7 text-slate-300/75">
              A mineral is not merely a color or a polished stone. Its chemistry
              and repeating structure constrain how it grows, breaks, reflects
              light, and resists scratching.
            </p>
          </div>

          <div className="bg-[#0b0710]/48 relative overflow-hidden border-y border-fuchsia-100/[0.12] backdrop-blur-xl">
            <div
              className="pointer-events-none absolute bottom-8 left-[33px] top-8 w-px bg-gradient-to-b from-cyan-200/35 via-pink-200/30 via-violet-200/30 to-amber-200/35 sm:left-[41px]"
              aria-hidden="true"
            />
            {STRUCTURE_CHAIN.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.label}
                  className="relative grid min-h-[132px] grid-cols-[50px_minmax(0,1fr)] gap-4 border-b border-white/[0.065] px-4 py-5 last:border-b-0 sm:grid-cols-[62px_minmax(0,1fr)_72px] sm:px-5"
                >
                  <span
                    className="relative z-10 flex h-9 w-9 items-center justify-center self-start rounded-full border bg-[#0b0910] sm:h-11 sm:w-11"
                    style={{
                      color: `rgb(${item.rgb})`,
                      borderColor: `rgba(${item.rgb},0.30)`,
                      boxShadow: `0 0 26px rgba(${item.rgb},0.08)`,
                    }}
                  >
                    <Icon size={16} />
                  </span>
                  <div>
                    <h3 className="text-white/92 text-[16px] font-semibold">
                      {item.label}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[12px] leading-6 text-slate-400">
                      {item.detail}
                    </p>
                  </div>
                  <span className="hidden self-center justify-self-end font-mono text-[9px] tracking-[0.13em] text-slate-700 sm:block">
                    0{index + 1}
                  </span>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-14">
          <MineralCabinet />
        </div>

        <section className="mt-16">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-100/60">
                <Layers3 size={14} /> Category boundary
              </div>
              <h2 className="mt-2 text-[clamp(2rem,4vw,4.1rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
                Mineral, rock, and gem answer different questions.
              </h2>
            </div>
            <p className="max-w-2xl text-[14px] leading-7 text-slate-300/70 lg:justify-self-end">
              These words overlap in daily conversation, but they are not peers
              in one scientific classification. Mineral describes material
              structure and composition; rock describes an aggregate; gem
              describes selection and use.
            </p>
          </div>

          <div className="mt-6 grid gap-px overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
            {BOUNDARIES.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.label}
                  className="bg-[#09090d]/84 min-h-[260px] p-5 backdrop-blur-xl sm:p-6"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-[15px] border"
                    style={{
                      color: `rgb(${item.rgb})`,
                      borderColor: `rgba(${item.rgb},0.24)`,
                      background: `rgba(${item.rgb},0.04)`,
                    }}
                  >
                    <Icon size={17} />
                  </span>
                  <h3 className="mt-5 text-[23px] font-semibold tracking-[-0.04em] text-white">
                    {item.label}
                  </h3>
                  <p className="text-slate-300/74 mt-3 text-[13px] leading-6">
                    {item.rule}
                  </p>
                  <p className="mt-4 border-t border-white/[0.07] pt-4 text-[11px] leading-5 text-slate-500">
                    {item.example}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3 border-l border-amber-100/[0.18] pl-4 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-4xl text-[12px] leading-6 text-slate-400">
              Field properties narrow possibilities; they do not guarantee a
              species-level answer. Fine-grained mixtures, weathered surfaces,
              solid-solution series, and look-alikes may require optical
              microscopy, chemical analysis, or X-ray diffraction.
            </p>
            <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.1em] text-amber-100/45">
              Model boundary · identification confidence
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
