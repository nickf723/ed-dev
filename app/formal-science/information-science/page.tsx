import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, BookOpen, Database, Fingerprint } from "lucide-react";
import CollectionProtocol from "./CollectionProtocol";
import EntropyWidget from "./EntropyWidget";
import InformationFlowBackground from "./InformationFlowBackground";
import InformationRecordNavigator from "./InformationRecordNavigator";
import InformationScienceEvidenceReview from "./InformationScienceEvidenceReview";
import VectorSearchLab from "./VectorSearchLab";
import {
  INFORMATION_SCIENCE_DIRECT_BRANCH_IDS,
  INFORMATION_SCIENCE_NESTED_BRANCH_IDS,
} from "./informationScienceModel";

const NODE_ID = "formal.information-science";

export const metadata: Metadata = {
  title: "Information Science | Education Station 64",
  description:
    "Inspect how information is represented, described, organized, retrieved, preserved, evaluated, and used through deterministic models and evidence review.",
};

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
  const directIds = context.children.map((child) => child.id);
  if (
    directIds.length !== INFORMATION_SCIENCE_DIRECT_BRANCH_IDS.length ||
    directIds.some((id, index) => id !== INFORMATION_SCIENCE_DIRECT_BRANCH_IDS[index])
  ) {
    throw new Error("Information Science page navigation must match the curriculum registry");
  }
  const representation = context.children.find(
    (child) => child.id === "formal.information-science.encoding-representation",
  );
  const organization = context.children.find(
    (child) => child.id === "formal.information-science.taxonomy-ontology",
  );
  const nestedIds = [
    ...(representation?.children ?? []),
    ...(organization?.children ?? []),
  ].map((child) => child.id);
  if (
    nestedIds.length !== INFORMATION_SCIENCE_NESTED_BRANCH_IDS.length ||
    nestedIds.some((id, index) => id !== INFORMATION_SCIENCE_NESTED_BRANCH_IDS[index])
  ) {
    throw new Error("Information Science specialties must remain filed under their registry parents");
  }

  return (
    <SceneFrame
      background={<InformationFlowBackground />}
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
            <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-300/70">The record below is both an illustrative schema and the registry-owned field map. Seven direct branches define the root; Metadata is filed under Representation, while Knowledge Graphs is filed under Taxonomy &amp; Ontology. The visible indentation now matches the curriculum tree exactly.</p>
          </div>
          <Link href="/formal-science" className="group flex items-center justify-between gap-4 border border-white/[0.08] bg-[#07131d]/[0.34] px-4 py-3 backdrop-blur-[16px] transition hover:bg-[#07131d]/[0.46]">
            <span><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Formal Sciences</strong></span>
            <ArrowRight size={15} className="text-cyan-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <InformationRecordNavigator branches={context.children} />
      </section>

      <section className="mt-20 grid gap-8 2xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] 2xl:items-start">
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

      <div className="mt-24">
        <CollectionProtocol />
      </div>

      <section className="mt-24 border-t border-cyan-100/[0.10] pt-7">
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

      <div className="mt-24">
        <InformationScienceEvidenceReview />
      </div>

      <section className="mt-24 border-y border-white/[0.08] bg-[#07131d]/[0.22] px-5 py-6 backdrop-blur-xl sm:px-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-100/52"><BookOpen size={14} aria-hidden="true" /> Standards desk · source boundary</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">The models teach distinctions; the standards document interoperable practice.</h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.055] sm:grid-cols-2">
            {[
              ["Library of Congress JSON/YAML API", "Structured collection records, query parameters, endpoints, coverage, pagination, and rate-limit boundaries.", "https://www.loc.gov/apis/json-and-yaml/"],
              ["W3C RDF 1.1 Concepts", "The graph data model in which subject–predicate–object triples represent statements about resources.", "https://www.w3.org/TR/rdf11-concepts/"],
              ["Library of Congress PREMIS", "A preservation-metadata data model for objects, events, agents, rights, and long-term repository workflows.", "https://www.loc.gov/standards/premis/"],
              ["Library of Congress METS", "A standard for packaging descriptive, administrative, and structural metadata for complex digital objects.", "https://www.loc.gov/standards/mets/"],
            ].map(([label, note, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="group bg-[#07131d]/90 px-4 py-4 transition hover:bg-[#0a1a27]">
                <strong className="text-[12px] text-white/82 transition group-hover:text-cyan-100">{label}</strong>
                <span className="mt-2 block text-[11px] leading-5 text-slate-500">{note}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SceneFrame>
  );
}
