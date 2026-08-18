import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowDown,
  ArrowRight,
  Binary,
  BookKey,
  Boxes,
  Braces,
  Database,
  FileSearch,
  Fingerprint,
  GitFork,
  LibraryBig,
  Network,
  Search,
  Tags,
  UsersRound,
} from "lucide-react";
import BinaryOceanBackground from "./BinaryOceanBackground";
import EntropyWidget from "./EntropyWidget";
import VectorSearchLab from "./VectorSearchLab";

const NODE_ID = "formal.information-science";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  question: string;
  rgb: string;
  family: "representation" | "organization";
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.information-science.information-theory": {
    icon: Binary,
    code: "INF-01",
    question: "How much uncertainty is present, how efficiently can symbols be coded, and what can a noisy channel preserve?",
    rgb: "34,211,238",
    family: "representation",
  },
  "formal.information-science.encoding-representation": {
    icon: Braces,
    code: "REP-02",
    question: "Which distinctions survive when an object, event, or idea becomes symbols, fields, formats, schemas, or identifiers?",
    rgb: "96,165,250",
    family: "representation",
  },
  "formal.information-science.information-retrieval": {
    icon: Search,
    code: "RET-03",
    question: "How should a system index, rank, filter, and evaluate results when relevance depends on a query, representation, collection, and user?",
    rgb: "192,132,252",
    family: "organization",
  },
  "formal.information-science.taxonomy-ontology": {
    icon: GitFork,
    code: "ORG-04",
    question: "How should categories, types, relationships, constraints, and inheritance be made explicit without pretending one structure is natural or universal?",
    rgb: "129,140,248",
    family: "organization",
  },
  "formal.information-science.metadata-semantics": {
    icon: Tags,
    code: "MET-05",
    question: "Which descriptive, structural, provenance, rights, technical, and semantic context must travel with an information object?",
    rgb: "251,191,36",
    family: "representation",
  },
  "formal.information-science.knowledge-graphs": {
    icon: Network,
    code: "GRF-06",
    question: "How can entities and relationships form queryable knowledge networks while retaining provenance and uncertainty about identity?",
    rgb: "94,234,212",
    family: "organization",
  },
  "formal.information-science.archives-preservation": {
    icon: Archive,
    code: "ARC-07",
    question: "What must be selected, authenticated, documented, stored, migrated, and made accessible so records remain interpretable over time?",
    rgb: "251,146,60",
    family: "organization",
  },
  "formal.information-science.information-behavior": {
    icon: UsersRound,
    code: "USE-08",
    question: "How do people seek, avoid, judge, interpret, organize, trust, share, and act on information in real contexts?",
    rgb: "244,114,182",
    family: "organization",
  },
  "formal.information-science.bibliometrics": {
    icon: LibraryBig,
    code: "BIB-09",
    question: "What can publication and citation patterns reveal about knowledge production, and where do measurement incentives or coverage distort the picture?",
    rgb: "134,239,172",
    family: "organization",
  },
};

const LIFECYCLE = [
  { label: "Signal", detail: "events · marks · measurements · observations", rgb: "34,211,238", icon: Binary },
  { label: "Representation", detail: "symbols · fields · formats · identifiers", rgb: "96,165,250", icon: Braces },
  { label: "Description", detail: "metadata · provenance · semantics · rights", rgb: "251,191,36", icon: Tags },
  { label: "Organization", detail: "classification · graph · index · collection", rgb: "129,140,248", icon: Boxes },
  { label: "Retrieval & use", detail: "query · ranking · interpretation · decision", rgb: "244,114,182", icon: FileSearch },
] as const;

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
  const representation = context.children.filter((branch) => BRANCH_META[branch.id]?.family === "representation");
  const organization = context.children.filter((branch) => BRANCH_META[branch.id]?.family === "organization");

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
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,26,0.45),transparent_27%,transparent_73%,rgba(8,13,28,0.38))] backdrop-blur-[2px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/66"><BookKey size={14} /> Primary navigation · catalog records</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.7rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
              Enter through information itself, its representations, its organizing structures, or the systems that preserve and retrieve it.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
              The binary ocean behind the page now flows into a representation gate and an indexed record shelf. A single query beam traces one retrieval path, so the world remains readable when the foreground demands attention.
            </p>
          </div>
          <Link href="/formal-science" className="group flex items-center justify-between gap-4 border-l border-cyan-200/[0.18] bg-black/[0.08] px-4 py-3 backdrop-blur-[10px] transition hover:bg-black/[0.15]">
            <span><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Parent field</span><strong className="mt-1 block text-[14px] text-white">Formal Sciences</strong></span>
            <ArrowRight size={15} className="text-cyan-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px_minmax(0,1fr)] xl:items-stretch">
          <CatalogBank label="Represent & describe" branches={representation} />
          <LifecycleCore />
          <CatalogBank label="Organize, retrieve & steward" branches={organization} align="right" />
        </div>
      </section>

      <section className="mt-8 grid gap-6 2xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] 2xl:items-start">
        <div>
          <div className="mb-3">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/58">Instrument 01 · information theory</div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Measure uncertainty in an observed symbol distribution.</h2>
          </div>
          <EntropyWidget />
        </div>
        <div>
          <div className="mb-3">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-violet-200/58">Instrument 02 · information retrieval</div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">Rank neighbors after a representation has turned records into geometry.</h2>
          </div>
          <VectorSearchLab />
        </div>
      </section>

      <section className="mt-8 border-t border-cyan-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/58"><Fingerprint size={14} /> Information-system questions · reference, not navigation</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Every information system is a machine for preserving some distinctions and discarding others.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/72">“More data” does not automatically mean more useful information. The quality of representation, context, organization, access, evaluation, and interpretation determines what a collection can support.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {SYSTEM_QUESTIONS.map(([term, text], index) => (
            <div key={term} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0">
              <span className="font-mono text-[11px] text-cyan-200/42">0{index + 1}</span>
              <span><strong className="block text-[13px] text-slate-200/86">{term}</strong><span className="mt-1 block text-[12px] leading-5 text-slate-500">{text}</span></span>
            </div>
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function CatalogBank({ label, branches, align = "left" }: { label: string; branches: CurriculumNode[]; align?: "left" | "right" }) {
  return (
    <div>
      <div className={`mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500 ${align === "right" ? "xl:text-right" : ""}`}>{label}</div>
      <div className="border-y border-white/[0.06]">
        {branches.map((branch) => <CatalogRecord key={branch.id} branch={branch} align={align} />)}
      </div>
    </div>
  );
}

function CatalogRecord({ branch, align }: { branch: CurriculumNode; align: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? { icon: Database, code: "INF", question: branch.description ?? "Explore this information branch.", rgb: "34,211,238", family: "organization" as const };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div className="group grid min-h-[91px] grid-cols-[70px_minmax(0,1fr)_48px] gap-3 border-b border-white/[0.06] bg-black/[0.045] px-3 py-3 backdrop-blur-[8px] last:border-b-0 transition hover:bg-black/[0.09]">
      <span className={`flex flex-col ${align === "right" ? "xl:order-3 xl:items-end" : ""}`}><span className="font-mono text-[11px] font-semibold" style={{ color: `rgba(${meta.rgb},0.72)` }}>{meta.code}</span><span className="mt-2 flex h-7 w-7 items-center justify-center border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={13} /></span></span>
      <span className={align === "right" ? "xl:text-right" : ""}><strong className="block text-[14px] text-white/88">{branch.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{meta.question}</span></span>
      <span className={`pt-1 font-mono text-[11px] uppercase text-slate-600 ${align === "right" ? "text-right xl:order-first xl:text-left" : "text-right"}`}>{planned ? "planned" : "open"}</span>
    </div>
  );
  return planned ? <div aria-disabled="true">{content}</div> : <Link href={branch.href}>{content}</Link>;
}

function LifecycleCore() {
  return (
    <Surface variant="open" className="relative min-h-[500px] overflow-hidden rounded-[30px] border-cyan-100/[0.08]" style={{ background: "rgba(5,16,26,0.025)" }}>
      <div className="p-4">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-cyan-200/54"><Database size={13} /> Information object lifecycle</div>
        <p className="mt-2 text-[12px] leading-5 text-slate-400/64">A stored record has already passed through several layers of choice before anyone searches it.</p>
      </div>
      <div className="mx-4 mt-1 space-y-1">
        {LIFECYCLE.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="border-b border-white/[0.06] py-3 last:border-b-0">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${step.rgb})`, borderColor: `rgba(${step.rgb},0.24)`, background: `rgba(${step.rgb},0.04)` }}><Icon size={13} /></span>
                <span><strong className="block text-[13px]" style={{ color: `rgba(${step.rgb},0.84)` }}>{step.label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{step.detail}</span></span>
              </div>
              {index < LIFECYCLE.length - 1 ? <ArrowDown size={13} className="ml-[10px] mt-2 text-slate-600" /> : null}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-4 inset-x-4 border-t border-cyan-100/[0.07] pt-3 text-center font-mono text-[11px] uppercase tracking-[0.07em] text-cyan-200/34">retrieval begins long after representation choices</div>
    </Surface>
  );
}
