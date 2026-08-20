import Link from "next/link";
import {
  ArrowRight,
  Braces,
  ChartNoAxesCombined,
  Dna,
  FileSearch,
  Microscope,
  Network,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContextByHref } from "@/lib/curriculum/page-context";
import SequenceAlignmentLab from "./SequenceAlignmentLab";
import SequenceFieldBackground from "./SequenceFieldBackground";

const ROUTE = "/interdisciplines/bioinformatics";

const PIPELINE = [
  {
    index: "01",
    title: "Sequence & measure",
    detail: "Convert biological material into digital observations while tracking read quality, coverage, experimental design, and measurement uncertainty.",
    icon: Dna,
    rgb: "52,211,153",
  },
  {
    index: "02",
    title: "Compare & search",
    detail: "Align sequences, search databases, assemble fragments, and identify patterns that may represent shared ancestry, conserved function, or technical artifacts.",
    icon: FileSearch,
    rgb: "34,211,238",
  },
  {
    index: "03",
    title: "Annotate & represent",
    detail: "Attach coordinates, features, genes, variants, structures, pathways, and relationships to otherwise anonymous strings and records.",
    icon: Braces,
    rgb: "167,139,250",
  },
  {
    index: "04",
    title: "Model & test",
    detail: "Use statistical and computational models to separate signal from noise, estimate uncertainty, compare hypotheses, and predict biological behavior.",
    icon: ChartNoAxesCombined,
    rgb: "244,114,182",
  },
  {
    index: "05",
    title: "Infer biology",
    detail: "Translate computational results back into biological claims about function, evolution, disease, regulation, ecology, or experimental mechanism.",
    icon: Microscope,
    rgb: "251,191,36",
  },
] as const;

const BOUNDARIES = [
  ["Sequence ≠ function", "A DNA or protein sequence can constrain hypotheses about function, but sequence similarity alone does not prove that two molecules behave identically."],
  ["Database ≠ nature", "Reference databases reflect what has been sampled, curated, named, sequenced, and deposited. Missing or biased data can shape the conclusions."],
  ["Prediction ≠ validation", "A computational prediction becomes stronger when independent experimental, clinical, ecological, or structural evidence supports it."],
] as const;

export default function BioinformaticsPage() {
  const context = requireCurriculumPageContextByHref(ROUTE);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030907] text-slate-100 selection:bg-emerald-300/25">
      <SequenceFieldBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#030907]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Biology · algorithms · statistics · databases"
            eyebrowStyle="rule"
            icon={Dna}
            title={<span>Bioinformatics</span>}
            subtitle="Bioinformatics builds computational representations of biological data so sequences, structures, expression patterns, populations, and experiments can be compared at scales impossible to inspect by hand. Its job is not merely to compute, but to preserve the biological meaning and uncertainty of what was measured."
            accentRgb="52, 211, 153"
            titleClassName="font-mono text-[clamp(2.8rem,5.2vw,5.7rem)] font-semibold uppercase leading-[0.86] tracking-[-0.05em] text-[#f2fff8]"
            headerClassName="border-emerald-100/[0.10]"
          />
        </div>

        <section className="mx-auto mt-10 max-w-[930px] rounded-[22px] border border-emerald-100/[0.11] bg-[#07110d]/52 px-5 py-5 backdrop-blur-xl sm:px-6">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.075em] text-emerald-200/70">The computational problem</div>
          <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.3rem)] font-semibold tracking-[-0.04em] text-white">A genome is data, but biological meaning is not written between the letters for us.</h2>
          <p className="mt-3 max-w-4xl text-[16px] leading-7 text-slate-300">
            Sequencing can produce millions or billions of symbols. Bioinformatics asks which observations correspond, where features begin and end, what patterns are unusual, and which claims remain plausible after uncertainty and bias are considered.
          </p>
        </section>

        <div className="mt-8">
          <SequenceAlignmentLab />
        </div>

        <section className="mx-auto mt-10 max-w-[980px]">
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.075em] text-cyan-200/68">
            <Network size={14} /> Sequence to inference
          </div>
          <div className="relative border-l border-emerald-200/[0.12] pl-5 sm:pl-8">
            {PIPELINE.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative pb-7 last:pb-0">
                  <span
                    className="absolute -left-[29px] top-1 flex h-9 w-9 items-center justify-center rounded-full border bg-[#06100c] font-mono text-[9px] font-semibold sm:-left-[37px]"
                    style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.30)` }}
                  >
                    {step.index}
                  </span>
                  <article
                    className="grid gap-4 rounded-[20px] border p-5 backdrop-blur-xl sm:grid-cols-[48px_minmax(0,1fr)] sm:items-start"
                    style={{ borderColor: `rgba(${step.rgb},0.14)`, background: `linear-gradient(145deg,rgba(${step.rgb},0.045),rgba(4,11,9,0.55))` }}
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-[13px] border"
                      style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.24)`, background: `rgba(${step.rgb},0.04)` }}
                    >
                      <Icon size={18} strokeWidth={1.55} />
                    </span>
                    <div>
                      <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-white">{step.title}</h3>
                      <p className="mt-2 text-[14px] leading-6 text-slate-300/86">{step.detail}</p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-[980px] border-t border-emerald-100/[0.10] pt-6">
          <div className="grid gap-3 md:grid-cols-3">
            {BOUNDARIES.map(([title, detail]) => (
              <article key={title} className="rounded-[18px] border border-amber-100/[0.10] bg-amber-100/[0.025] p-5 backdrop-blur-xl">
                <h3 className="text-[17px] font-semibold text-amber-50">{title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-slate-300">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-[980px] border-t border-white/[0.08] pt-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <CrossLink href="/natural-science/biology" label="Biology" note="The molecules, cells, organisms, and evolutionary processes that give the data meaning." rgb="52,211,153" />
            <CrossLink href="/formal-science/computer-science/algorithms" label="Algorithms & Data" note="Search, dynamic programming, graph methods, indexing, and scalable computation." rgb="96,165,250" />
            <CrossLink href="/formal-science/mathematics/statistics" label="Statistics" note="Inference, uncertainty, experimental design, multiple testing, and model comparison." rgb="192,132,252" />
          </div>
        </section>
      </div>
    </main>
  );
}

function CrossLink({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return (
    <Link href={href} className="group rounded-[18px] border border-white/[0.08] bg-black/[0.16] p-4 backdrop-blur-xl transition hover:bg-white/[0.025]">
      <div className="flex items-center justify-between gap-3">
        <strong className="text-[15px] text-white">{label}</strong>
        <ArrowRight size={14} style={{ color: `rgb(${rgb})` }} className="transition group-hover:translate-x-1" />
      </div>
      <p className="mt-2 text-[13px] leading-6 text-slate-400">{note}</p>
    </Link>
  );
}
