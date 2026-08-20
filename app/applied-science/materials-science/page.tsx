import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, FlaskConical, Microscope, ScanSearch } from "lucide-react";
import MaterialsAtlas from "./MaterialsAtlas";
import MechanicalResponseLab from "./MechanicalResponseLab";
import MicrostructureBackground from "./MicrostructureBackground";

const NODE_ID = "applied.materials-science";

const RELATIONSHIP = [
  { label: "Processing", note: "casting · forming · heat · deposition · curing", rgb: "251,146,60" },
  { label: "Structure", note: "bonding · defects · phases · grains · interfaces", rgb: "125,211,252" },
  { label: "Properties", note: "mechanical · thermal · electrical · optical", rgb: "251,191,36" },
  { label: "Performance", note: "function · reliability · lifetime · failure", rgb: "94,234,212" },
] as const;

const SELECTION_QUESTIONS = [
  { label: "Function", text: "Which responses actually control success in the intended service condition?" },
  { label: "Environment", text: "What temperatures, chemicals, radiation, moisture, loads, fields, or wear will the material experience?" },
  { label: "Processing", text: "Can the needed structure be made repeatably at the required geometry, rate, and scale?" },
  { label: "Failure", text: "Which fracture, fatigue, creep, corrosion, wear, delamination, or degradation modes deserve explicit margins?" },
  { label: "Manufacture & repair", text: "How will parts be joined, inspected, maintained, recycled, repaired, or replaced?" },
  { label: "Lifecycle", text: "How do cost, embodied energy, scarcity, toxicity, reuse, and end-of-life constraints change the choice?" },
] as const;

export default function MaterialsSciencePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<MicrostructureBackground />}
      className="bg-[#05080c] text-slate-100 selection:bg-sky-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(5,8,12,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Processing · structure · properties · performance · characterization"
          eyebrowStyle="rule"
          icon={Microscope}
          title={<span>Materials Science</span>}
          subtitle="Materials science asks how structure is created, how structure produces properties, and whether those properties survive the conditions of use. Move between atoms, defects, microstructures, processing routes, measurements, and real performance rather than treating a material name as a complete specification."
          accentRgb="125, 211, 252"
          titleClassName="font-sans text-[clamp(2.8rem,5.3vw,6rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#f4fbff]"
          headerClassName="border-sky-100/[0.09]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-sky-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,12,0.34),transparent_28%,transparent_72%,rgba(5,8,12,0.30))] backdrop-blur-[5px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div className="rounded-[20px] bg-[#071019]/[0.24] px-3 py-2 backdrop-blur-[18px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200/66"><ScanSearch size={14} /> Primary navigation · microstructure atlas</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Start with the instrument rail, or open a specimen family and inspect how its internal structure changes the story.</h2>
            <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-300/70">The specimen windows are schematic teaching motifs, not microscope images of one universal metal, ceramic, polymer, composite, or functional material. Each family contains enormous structural variation.</p>
          </div>
          <Link href="/applied-science" className="group flex items-center justify-between gap-4 border border-white/[0.08] bg-[#071019]/[0.34] px-4 py-3 backdrop-blur-[16px] transition hover:bg-[#071019]/[0.46]">
            <span><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Applied Sciences</strong></span>
            <ArrowRight size={15} className="text-sky-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <MaterialsAtlas children={context.children} />

        <div className="relative mt-4 grid overflow-hidden border-y border-white/[0.07] bg-[#061019]/[0.16] backdrop-blur-[12px] sm:grid-cols-2 xl:grid-cols-4">
          {RELATIONSHIP.map((step, index) => (
            <div key={step.label} className="relative grid min-h-[92px] grid-cols-[34px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] px-3 py-3 sm:border-r xl:border-b-0 xl:last:border-r-0">
              <span className="font-mono text-[9px]" style={{ color: `rgba(${step.rgb},0.48)` }}>0{index + 1}</span>
              <span><strong className="block text-[11px]" style={{ color: `rgba(${step.rgb},0.80)` }}>{step.label}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-500">{step.note}</span></span>
              {index < RELATIONSHIP.length - 1 ? <span className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-white/[0.10] bg-[#071019] xl:block" /> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="rounded-[18px] bg-[#071019]/[0.16] px-3 py-2 backdrop-blur-[14px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/62">Response instrument</div>
            <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.035em] text-white">Read mechanical behavior from curve shape before assigning a material name.</h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">idealized normalized curves</span>
        </div>
        <MechanicalResponseLab />
      </section>

      <section className="mt-8 border-t border-sky-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#071019]/[0.15] px-3 py-2 backdrop-blur-[14px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/58"><FlaskConical size={14} /> Selection questions · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">The strongest material on a datasheet can still be the wrong material for the system.</h2>
          </div>
          <p className="rounded-[16px] bg-[#071019]/[0.15] px-3 py-2 text-[14px] leading-6 text-slate-400/72 backdrop-blur-[14px]">Material selection is constrained optimization. Properties matter only relative to geometry, environment, manufacturing, uncertainty, cost, failure consequences, maintenance, and lifecycle requirements.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {SELECTION_QUESTIONS.map((item, index) => (
            <div key={item.label} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] bg-[#071019]/[0.10] px-4 py-4 backdrop-blur-[10px] md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b xl:[&:nth-last-child(-n+3)]:border-b-0 xl:border-r xl:[&:nth-child(3n)]:border-r-0">
              <span className="font-mono text-[11px] text-sky-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-slate-200/86">{item.label}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{item.text}</span></span>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}
