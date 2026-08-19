import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Database, Fingerprint } from "lucide-react";
import BinaryOceanBackground from "./BinaryOceanBackground";
import EntropyWidget from "./EntropyWidget";
import InformationRecordNavigator from "./InformationRecordNavigator";
import VectorSearchLab from "./VectorSearchLab";

const NODE_ID = "formal.information-science";

const SYSTEM_QUESTIONS = [
  ["Representation", "What was encoded, what was omitted, and which assumptions are hidden in the format or schema?"],
  ["Identity", "How does the system decide that two names, records, files, or entities refer to the same thing?"],
  ["Context", "Which provenance, units, authorship, dates, rights, relationships, or uncertainty are needed to interpret the record?"],
  ["Retrieval", "What counts as relevant, who defines it, and which useful records may be invisible to the ranking method?"],
  ["Preservation", "Can the record still be opened, authenticated, understood, and trusted when software, formats, institutions, and communities change?"],
  ["Use", "How do users actually search, interpret, ignore, combine, or act on the information, and what harms can follow from a poor system?"],
] as const;

export default function InformationSciencePage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<BinaryOceanBackground />}
      className="bg-[#06111a] text-slate-100 selection:bg-cyan-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(6,17,26,0.49)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Representation · organization · preservation · retrieval · use"
          eyebrowStyle="rule"
          icon={Database}
          title={<span>Information Science</span>}
          subtitle="Information systems do more than store data. They choose representations, create descriptions, organize relationships, preserve context, rank possible answers, and meet people with different goals. Study the chain from encoded signal to usable record without confusing storage, uncertainty, meaning, and relevance."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.8rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#ecfeff]"
          headerClassName="border-cyan-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-cyan-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,26,0.34),transparent_27%,transparent_73%,rgba(8,13,28,0.30))] backdrop-blur-[5px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div className="rounded-[20px] bg-[#07131d]/[0.24] px-3 py-2 backdrop-blur-[18px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/66"><Database size={14} /> Primary navigation · record anatomy</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Inspect the choices hidden inside an information object before treating it as a neutral container.</h2>
            <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-300/70">The record below is an illustrative schema, not a hierarchy of the field. Each line is a direct curriculum peer that interrogates a different layer of representation, organization, retrieval, preservation, measurement, or use.</p>
          </div>
          <Link href="/formal-science" className="group flex items-center justify-between gap-4 border border-white/[0.08] bg-[#07131d]/[0.34] px-4 py-3 backdrop-blur-[16px] transition hover:bg-[#07131d]/[0.46]">
            <span><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Formal Sciences</strong></span>
            <ArrowRight size={15} className="text-cyan-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <InformationRecordNavigator branches={context.children} />
      </section>

      <section className="mt-8 grid gap-6 2xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] 2xl:items-start">
        <div>
          <div className="mb-3 rounded-[18px] bg-[#07131d]/[0.16] px-3 py-2 backdrop-blur-[14px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/58">Instrument 01 · information theory</div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Measure uncertainty in an observed symbol distribution.</h2>
          </div>
          <EntropyWidget />
        </div>
        <div>
          <div className="mb-3 rounded-[18px] bg-[#07131d]/[0.16] px-3 py-2 backdrop-blur-[14px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/58">Instrument 02 · information retrieval</div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Rank neighbors after a representation has turned records into geometry.</h2>
          </div>
          <VectorSearchLab />
        </div>
      </section>

      <section className="mt-8 border-t border-cyan-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="rounded-[18px] bg-[#07131d]/[0.15] px-3 py-2 backdrop-blur-[14px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58"><Fingerprint size={14} /> Information-system questions · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Every information system is a machine for preserving some distinctions and discarding others.</h2>
          </div>
          <p className="rounded-[16px] bg-[#07131d]/[0.15] px-3 py-2 text-[14px] leading-6 text-slate-400/72 backdrop-blur-[14px]">“More data” does not automatically mean more useful information. The quality of representation, context, organization, access, evaluation, and interpretation determines what a collection can support.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {SYSTEM_QUESTIONS.map(([term, text], index) => (
            <div key={term} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] bg-[#07131d]/[0.10] px-4 py-4 backdrop-blur-[10px] xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0">
              <span className="font-mono text-[11px] text-cyan-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-slate-200/86">{term}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{text}</span></span>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}
