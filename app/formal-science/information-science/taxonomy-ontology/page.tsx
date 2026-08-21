import type { Metadata } from "next";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, BookOpen, FolderTree, Network, Tags } from "lucide-react";
import ClassificationBackground from "./ClassificationBackground";
import ClassificationChallenge from "./ClassificationChallenge";
import StructureComparator from "./StructureComparator";
import { KNOWLEDGE_GRAPH_NODE_ID } from "./taxonomyOntologyModel";

const NODE_ID = "formal.information-science.taxonomy-ontology";

export const metadata: Metadata = {
  title: "Taxonomy & Ontology | Education Station 64",
  description:
    "Compare hierarchical classification with typed relational models, inspect RDF triples, and practice choosing an organizing structure for a collection.",
};

const ORGANIZATION_LAYERS = [
  {
    label: "Controlled vocabulary",
    question: "Which terms may catalogers use consistently?",
    structure: "Authorized terms, labels, variants, and usage notes",
    example: "network strategy · preferred label",
    rgb: "56,189,248",
  },
  {
    label: "Thesaurus",
    question: "Which concepts are broader, narrower, or related?",
    structure: "A controlled vocabulary with semantic relationships",
    example: "strategy games · broader than network strategy",
    rgb: "129,140,248",
  },
  {
    label: "Taxonomy",
    question: "Where can this item be browsed in a category scheme?",
    structure: "One or more hierarchical classification paths",
    example: "Games → Board games → Strategy games",
    rgb: "167,139,250",
  },
  {
    label: "Ontology",
    question: "What kinds of entities and relations exist, and what constraints apply?",
    structure: "Classes, individuals, properties, axioms, and constraints",
    example: "Harbor Routes — designed by — M. Rivera",
    rgb: "251,191,36",
  },
] as const;

export default function TaxonomyOntologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  if (
    context.children.length !== 1 ||
    context.children[0].id !== KNOWLEDGE_GRAPH_NODE_ID
  ) {
    throw new Error("Taxonomy & Ontology navigation must match the curriculum registry");
  }
  const knowledgeGraphs = context.children[0];

  return (
    <SceneFrame
      background={<ClassificationBackground />}
      className="bg-[#050714] text-slate-100 selection:bg-indigo-300/25"
      maxWidthClassName="max-w-[1540px]"
      headerBackground="rgba(5,7,20,0.54)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Name · group · relate · constrain"
          eyebrowStyle="rule"
          icon={FolderTree}
          title={<span>Taxonomy &amp; Ontology</span>}
          subtitle="Knowledge organization is designed, not discovered whole. Taxonomies create navigable category paths; ontologies make entity types, relationships, and constraints explicit. Learn what each representation supports, what it omits, and who is responsible for its commitments."
          accentRgb="129, 140, 248"
          titleClassName="font-sans text-[clamp(2.7rem,5vw,5.7rem)] font-semibold leading-[0.86] tracking-[-0.064em] text-[#eef2ff]"
          headerClassName="border-indigo-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-indigo-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,20,0.38),transparent_28%,transparent_72%,rgba(18,12,25,0.34))] backdrop-blur-[5px]" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
          <div className="rounded-[20px] bg-[#080b1c]/[0.26] px-3 py-2 backdrop-blur-[18px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-100/60"><Network size={14} aria-hidden="true" /> Primary navigation · direct specialization</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Begin with organization itself; continue into graph-shaped knowledge when that lesson is ready.</h2>
          </div>
          <Link href="/formal-science/information-science" className="group flex items-center justify-between gap-4 border border-white/[0.08] bg-[#080b1c]/[0.38] px-4 py-3 backdrop-blur-[16px] transition hover:bg-[#080b1c]/[0.52]">
            <span><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Information Science</strong></span>
            <ArrowRight size={15} className="text-indigo-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-5 border border-emerald-100/[0.11] bg-[#080b1c]/[0.34] p-5 backdrop-blur-[18px] sm:p-6" aria-disabled="true">
          <div className="grid gap-4 sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:items-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200/18 bg-emerald-300/[0.045] text-emerald-200/66"><Network size={17} aria-hidden="true" /></span>
            <span><span className="font-mono text-[10px] uppercase tracking-[0.09em] text-emerald-100/46">Direct child · planned</span><strong className="mt-1 block text-[18px] text-white/86">{knowledgeGraphs.label}</strong><span className="mt-2 block max-w-4xl text-[12px] leading-5 text-slate-500">{knowledgeGraphs.description}</span></span>
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-slate-600">route reserved</span>
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-8 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-start">
        <div className="rounded-[26px] border border-white/[0.08] bg-[#080b1c]/[0.34] p-5 backdrop-blur-xl sm:p-7">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-100/52">Orient · representation before interface</div>
          <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.65rem)] font-semibold leading-[0.94] tracking-[-0.054em] text-white">The same object can occupy a category path and a relationship graph.</h2>
          <p className="mt-5 text-[14px] leading-7 text-slate-400/80">A taxonomy answers “where should I browse?” by placing concepts or items into broader and narrower groupings. An ontology answers “what kinds of things and relations are asserted?” by naming classes, properties, individuals, and constraints. They can complement one another, and neither is automatically neutral.</p>
          <div className="mt-6 border-l-2 border-amber-200/24 pl-4 text-[12px] leading-6 text-slate-500">This lesson uses a fictional board game so the organizing structure—not disputed real-world classification—is the object of attention.</div>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.055] sm:grid-cols-2">
          {ORGANIZATION_LAYERS.map((layer, index) => (
            <div key={layer.label} className="bg-[#080b1c]/90 px-4 py-5">
              <div className="flex items-center justify-between gap-3"><span className="font-mono text-[9px]" style={{ color: `rgba(${layer.rgb},0.55)` }}>0{index + 1}</span><span className="h-px flex-1" style={{ background: `rgba(${layer.rgb},0.16)` }} /></div>
              <h3 className="mt-3 text-[16px] font-semibold text-white/86">{layer.label}</h3>
              <p className="mt-2 text-[12px] leading-5 text-slate-400/75">{layer.question}</p>
              <p className="mt-3 border-t border-white/[0.055] pt-3 text-[10px] leading-4 text-slate-600">{layer.structure}</p>
              <code className="mt-2 block text-[9px] leading-4" style={{ color: `rgba(${layer.rgb},0.54)` }}>{layer.example}</code>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-24"><StructureComparator /></div>

      <section className="mt-24 grid gap-8 border-y border-white/[0.08] bg-[#080b1c]/[0.24] px-5 py-7 backdrop-blur-xl lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] sm:px-7">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-indigo-100/52"><Tags size={14} aria-hidden="true" /> Explain · the reusable rule</div>
          <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.98] tracking-[-0.048em] text-white">Structure is a commitment about which distinctions should remain visible.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Taxonomy", "Optimizes hierarchical browsing and category-level retrieval. Ask whether a single path, polyhierarchy, facets, or mappings fit the users."],
            ["Ontology", "Optimizes explicit semantics across entity and relation types. Ask which constraints and inferences are actually warranted."],
            ["Governance", "Records who defines terms, resolves conflicts, maps schemes, versions changes, and represents affected communities."],
          ].map(([label, note]) => <div key={label} className="border-l border-white/[0.10] pl-4"><strong className="text-[13px] text-white/84">{label}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{note}</p></div>)}
        </div>
      </section>

      <div className="mt-24"><ClassificationChallenge /></div>

      <section className="mt-24 border-t border-indigo-100/[0.10] pt-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-indigo-100/52"><BookOpen size={14} aria-hidden="true" /> Standards desk</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">Use standards to sharpen the model, not to turn the lesson into a syntax dump.</h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.055] sm:grid-cols-3">
            {[
              ["W3C SKOS", "Concept schemes, preferred and alternative labels, broader/narrower links, related concepts, collections, and mappings.", "https://www.w3.org/TR/skos-reference/"],
              ["W3C RDF 1.1", "A graph data model in which subject–predicate–object triples express statements about resources.", "https://www.w3.org/TR/rdf11-concepts/"],
              ["W3C OWL 2", "A formal ontology language with classes, properties, individuals, data values, semantics, and multiple profiles.", "https://www.w3.org/TR/owl-overview/"],
            ].map(([label, note, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group bg-[#080b1c]/90 px-4 py-4 transition hover:bg-[#10102a]"><strong className="text-[12px] text-white/82 transition group-hover:text-indigo-100">{label}</strong><span className="mt-2 block text-[11px] leading-5 text-slate-500">{note}</span></a>)}
          </div>
        </div>
      </section>
    </SceneFrame>
  );
}
