import Link from "next/link";
import type { CurriculumNode } from "@/lib/curriculum/types";
import { Archive, ArrowRight, Binary, Braces, Fingerprint, GitFork, LibraryBig, Network, Search, Tags, UsersRound, type LucideIcon } from "lucide-react";

type Meta = { icon: LucideIcon; key: string; code: string; question: string; rgb: string; indent: number };

const META: Record<string, Meta> = {
  "formal.information-science.information-theory": { icon: Binary, key: "uncertainty", code: "INF-01", question: "How much uncertainty is present, how efficiently can symbols be coded, and what can a noisy channel preserve?", rgb: "34,211,238", indent: 0 },
  "formal.information-science.encoding-representation": { icon: Braces, key: "representation.encoding", code: "REP-02", question: "Which distinctions survive when an object, event, or idea becomes symbols, fields, formats, schemas, or identifiers?", rgb: "96,165,250", indent: 1 },
  "formal.information-science.metadata-semantics": { icon: Tags, key: "representation.metadata", code: "MET-05", question: "Which descriptive, structural, provenance, rights, technical, and semantic context must travel with an information object?", rgb: "251,191,36", indent: 1 },
  "formal.information-science.taxonomy-ontology": { icon: GitFork, key: "organization.types", code: "ORG-04", question: "How should categories, types, relationships, constraints, and inheritance be made explicit without pretending one structure is natural or universal?", rgb: "129,140,248", indent: 1 },
  "formal.information-science.knowledge-graphs": { icon: Network, key: "organization.links", code: "GRF-06", question: "How can entities and relationships form queryable knowledge networks while retaining provenance and uncertainty about identity?", rgb: "94,234,212", indent: 1 },
  "formal.information-science.information-retrieval": { icon: Search, key: "retrieval.rank", code: "RET-03", question: "How should a system index, rank, filter, and evaluate results when relevance depends on a query, representation, collection, and user?", rgb: "192,132,252", indent: 0 },
  "formal.information-science.archives-preservation": { icon: Archive, key: "stewardship.preserve", code: "ARC-07", question: "What must be selected, authenticated, documented, stored, migrated, and made accessible so records remain interpretable over time?", rgb: "251,146,60", indent: 0 },
  "formal.information-science.information-behavior": { icon: UsersRound, key: "use.context", code: "USE-08", question: "How do people seek, avoid, judge, interpret, organize, trust, share, and act on information in real contexts?", rgb: "244,114,182", indent: 0 },
  "formal.information-science.bibliometrics": { icon: LibraryBig, key: "collection.metrics", code: "BIB-09", question: "What can publication and citation patterns reveal about knowledge production, and where do measurement incentives or coverage distort the picture?", rgb: "134,239,172", indent: 0 },
};

const ORDER = [
  "formal.information-science.information-theory",
  "formal.information-science.encoding-representation",
  "formal.information-science.metadata-semantics",
  "formal.information-science.taxonomy-ontology",
  "formal.information-science.knowledge-graphs",
  "formal.information-science.information-retrieval",
  "formal.information-science.archives-preservation",
  "formal.information-science.information-behavior",
  "formal.information-science.bibliometrics",
] as const;

const LIFECYCLE = [
  ["Signal", "events · marks · measurements", "34,211,238"],
  ["Represent", "symbols · fields · formats", "96,165,250"],
  ["Describe", "metadata · provenance · rights", "251,191,36"],
  ["Organize", "types · graphs · indexes", "129,140,248"],
  ["Retrieve & use", "query · ranking · interpretation", "244,114,182"],
] as const;

export default function InformationRecordNavigator({ branches }: { branches: readonly CurriculumNode[] }) {
  const byId = new Map(branches.map((branch) => [branch.id, branch]));
  return (
    <nav aria-label="Information Science fields" className="relative mt-5 overflow-hidden border border-cyan-100/[0.10] bg-[#07131d]/[0.30] shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-[20px] backdrop-saturate-[1.08]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.025),transparent_30%,rgba(192,132,252,0.025)_74%,transparent)]" />
      <div className="relative grid border-b border-white/[0.07] px-4 py-3 lg:grid-cols-[92px_minmax(0,1fr)_250px] lg:items-center">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.10em] text-cyan-100/46">record inspector</span>
        <span className="font-mono text-[10px] text-cyan-100/55">record://knowledge-object/current</span>
        <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em] text-slate-600 lg:mt-0 lg:text-right">illustrative schema · direct curriculum peers</span>
      </div>

      <div className="relative hidden lg:block">
        <div className="grid grid-cols-[54px_18px_265px_minmax(0,1fr)_74px] border-b border-white/[0.055] bg-black/[0.05] px-4 py-2 font-mono text-[8px] uppercase tracking-[0.08em] text-slate-600">
          <span>line</span><span /><span>field key</span><span>question carried by the field</span><span className="text-right">state</span>
        </div>
        <div className="divide-y divide-white/[0.055]">
          {ORDER.map((id, index) => { const branch = byId.get(id); return branch ? <RecordLine key={id} branch={branch} index={index} /> : null; })}
        </div>
        <div className="grid grid-cols-[54px_18px_minmax(0,1fr)] items-center px-4 py-3 font-mono text-[9px] text-slate-600"><span>010</span><span className="text-cyan-100/36">}</span><span>checksum: meaning depends on representation + context + use</span></div>
      </div>

      <div className="relative grid gap-2 p-3 sm:grid-cols-2 lg:hidden">
        {ORDER.map((id, index) => { const branch = byId.get(id); return branch ? <MobileRecord key={id} branch={branch} index={index} /> : null; })}
      </div>

      <div className="relative grid border-t border-white/[0.07] sm:grid-cols-2 xl:grid-cols-5">
        {LIFECYCLE.map(([label, note, rgb], index) => (
          <div key={label} className="grid min-h-[78px] grid-cols-[30px_minmax(0,1fr)] gap-2 border-b border-white/[0.055] px-3 py-3 sm:border-r xl:border-b-0 xl:last:border-r-0"><span className="font-mono text-[8px]" style={{ color: `rgba(${rgb},0.46)` }}>0{index + 1}</span><span><strong className="block text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{label}</strong><span className="mt-1 block text-[8px] leading-3 text-slate-600">{note}</span></span></div>
        ))}
      </div>
    </nav>
  );
}

function RecordLine({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = META[branch.id] ?? { icon: Fingerprint, key: "record.field", code: "INF", question: branch.description ?? "Explore this information-science field.", rgb: "34,211,238", indent: 0 };
  const Icon = meta.icon;
  const active = branch.status === "active";
  const body = (
    <div className={`group grid min-h-[78px] grid-cols-[54px_18px_265px_minmax(0,1fr)_74px] items-center px-4 py-2.5 transition ${active ? "hover:bg-white/[0.018]" : "opacity-58"}`}>
      <span className="font-mono text-[9px] text-slate-700">{String(index + 1).padStart(3, "0")}</span>
      <span className="font-mono text-[12px]" style={{ color: `rgba(${meta.rgb},0.40)` }}>{meta.indent ? "│" : index === 0 ? "{" : "·"}</span>
      <span className="min-w-0" style={{ paddingLeft: meta.indent * 18 }}><span className="font-mono text-[9px] font-semibold tracking-[0.02em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>{meta.key}</span><span className="mt-0.5 flex items-center gap-2"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.22)`, background: `rgba(${meta.rgb},0.035)` }}><Icon size={11} /></span><strong className="truncate text-[12px] text-white/84">{branch.label}</strong></span></span>
      <span className="rounded-[12px] bg-[#07131d]/[0.48] px-3 py-2 text-[10px] leading-4 text-slate-500 backdrop-blur-[14px]">{meta.question}</span>
      <span className="flex items-center justify-end gap-2 font-mono text-[8px] uppercase tracking-[0.06em] text-slate-600">{active ? "open" : "planned"}{active ? <ArrowRight size={10} className="transition group-hover:translate-x-1" /> : null}</span>
    </div>
  );
  return active ? <Link href={branch.href ?? "#"}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}

function MobileRecord({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = META[branch.id] ?? { icon: Fingerprint, key: "record.field", code: "INF", question: branch.description ?? "Explore this information-science field.", rgb: "34,211,238", indent: 0 };
  const Icon = meta.icon;
  const active = branch.status === "active";
  const body = <div className={`group min-h-[122px] border bg-[#07131d]/[0.40] px-3 py-3 backdrop-blur-[16px] ${active ? "" : "opacity-58"}`} style={{ borderColor: `rgba(${meta.rgb},0.14)` }}><div className="flex items-start justify-between gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span className="font-mono text-[8px] text-slate-600">{String(index + 1).padStart(3, "0")}</span></div><span className="mt-2 block font-mono text-[8px] tracking-[0.02em]" style={{ color: `rgba(${meta.rgb},0.62)` }}>{meta.key}</span><strong className="mt-0.5 block text-[11px] text-white/82">{branch.label}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-500">{meta.question}</span></div>;
  return active ? <Link href={branch.href ?? "#"}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}
