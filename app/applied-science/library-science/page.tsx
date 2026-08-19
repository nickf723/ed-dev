import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowRight,
  BookOpen,
  Boxes,
  FileSearch,
  FolderArchive,
  GraduationCap,
  Library,
  Search,
  ShieldCheck,
  Tags,
  Users,
} from "lucide-react";
import LibraryWorld from "./LibraryWorld";
import StewardshipLab from "./StewardshipLab";

const NODE_ID = "applied.library-science";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  rgb: string;
  short: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.library-science.collection-development": { icon: BookOpen, code: "COL", rgb: "251,191,36", short: "select · acquire · license · retain · evaluate", x: 4, y: 7, w: 27, h: 18 },
  "applied.library-science.cataloging-metadata": { icon: Tags, code: "CAT", rgb: "34,211,238", short: "identify · describe · relate · authorize", x: 4, y: 30, w: 27, h: 18 },
  "applied.library-science.classification-organization": { icon: Boxes, code: "ORG", rgb: "96,165,250", short: "classify · arrange · browse · expose bias", x: 4, y: 53, w: 27, h: 18 },
  "applied.library-science.reference-services": { icon: FileSearch, code: "REF", rgb: "52,211,153", short: "clarify questions · search · refer · support research", x: 36, y: 7, w: 28, h: 20 },
  "applied.library-science.information-literacy": { icon: GraduationCap, code: "ILI", rgb: "244,114,182", short: "frame questions · evaluate sources · teach discovery", x: 36, y: 34, w: 28, h: 17 },
  "applied.library-science.management-community": { icon: Users, code: "MGT", rgb: "253,186,116", short: "staff · spaces · programs · partnerships · mission", x: 36, y: 58, w: 28, h: 17 },
  "applied.library-science.archives-special-collections": { icon: Archive, code: "ARC", rgb: "167,139,250", short: "provenance · appraisal · arrangement · finding aids", x: 69, y: 7, w: 27, h: 18 },
  "applied.library-science.preservation-conservation": { icon: ShieldCheck, code: "PRE", rgb: "134,239,172", short: "stabilize · house · treat · plan for loss", x: 69, y: 30, w: 27, h: 18 },
  "applied.library-science.digital-libraries": { icon: FolderArchive, code: "DIG", rgb: "96,165,250", short: "ingest · store · fixity · migrate · interoperate", x: 69, y: 53, w: 27, h: 18 },
  "applied.library-science.ethics-access": { icon: ShieldCheck, code: "ETH", rgb: "192,132,252", short: "privacy · intellectual freedom · rights · accessibility · stewardship", x: 17, y: 80, w: 66, h: 13 },
};

const FUNCTIONS = [
  { title: "Organize", detail: "Describe and arrange resources so people and systems can distinguish, relate, browse, and discover them.", icon: Tags, rgb: "34,211,238" },
  { title: "Preserve", detail: "Keep physical and digital materials intelligible and usable across wear, disasters, changing formats, and time.", icon: Archive, rgb: "167,139,250" },
  { title: "Retrieve", detail: "Connect questions with sources through catalogs, indexes, finding aids, search strategies, reference work, and discovery systems.", icon: Search, rgb: "96,165,250" },
  { title: "Provide access", detail: "Design services around use while negotiating privacy, intellectual freedom, copyright, accessibility, restrictions, and stewardship obligations.", icon: ShieldCheck, rgb: "52,211,153" },
] as const;

export default function LibrarySciencePage() {
  const { node } = requireCurriculumPageContext(NODE_ID);
  const children = node.children ?? [];

  return (
    <SceneFrame
      background={<LibraryWorld />}
      className="bg-[#05090d] text-slate-100 selection:bg-cyan-300/25"
      maxWidthClassName="max-w-[1680px]"
      headerBackground="rgba(5,9,13,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applied Sciences", href: "/applied-science" }, { label: "Library Science" }]}
          eyebrow="Collections · description · preservation · discovery · access · service"
          eyebrowStyle="rule"
          icon={Library}
          title={<span>Library Science</span>}
          subtitle="Steward collections and information services so resources remain describable, durable, discoverable, interpretable, and usable across formats, communities, rights, technologies, institutions, and time."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#ecfeff]"
          headerClassName="border-cyan-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 border-y border-cyan-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,9,13,0.28),transparent_28%,transparent_72%,rgba(5,9,13,0.24))] backdrop-blur-[5px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="-mx-3 rounded-[20px] bg-[#071019]/[0.30] px-3 py-2 backdrop-blur-[20px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-100/62">Primary navigation · stewardship floor</div>
            <h2 className="mt-1 max-w-5xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.046em] text-white">Move through the work that keeps a collection meaningful, findable, durable, and usable.</h2>
            <p className="mt-2 max-w-4xl text-[12px] leading-5 text-slate-400/72">This is a conceptual service floor, not a recommended architectural plan. The zones expose relationships among direct branches; real libraries combine, distribute, outsource, or overlap these functions in many different ways.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/formal-science/information-science" label="Information Science" note="representation · retrieval · information systems" />
            <Neighbor href="/humanities/history" label="History" note="sources · context · interpretation" />
          </div>
        </div>

        <LibraryServiceFloor children={children} />
      </section>

      <section className="mt-8">
        <div className="mb-3 grid gap-3 border-b border-cyan-100/[0.08] pb-3 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#071019]/[0.18] px-3 py-2 backdrop-blur-[14px]"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-100/55">Stewardship instrument · after the field map</div><h2 className="mt-1 text-[clamp(1.55rem,2.6vw,2.45rem)] font-semibold tracking-[-0.042em] text-white">The object changes what stewardship has to protect.</h2></div>
          <p className="rounded-[16px] bg-[#071019]/[0.18] px-3 py-2 text-[11px] leading-5 text-slate-500 backdrop-blur-[14px]">The same lifecycle questions behave differently for a circulating book, rare manuscript, oral-history recording, or born-digital collection. The lab keeps those object-specific tradeoffs separate from the field navigation above.</p>
        </div>
        <StewardshipLab />
      </section>

      <section className="mt-8 border-t border-cyan-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#071019]/[0.16] px-3 py-2 backdrop-blur-[14px]"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-100/52">Core stewardship functions · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Organization, preservation, retrieval, and access form a loop around people and collections, not a one-way conveyor belt.</h2></div>
          <p className="rounded-[16px] bg-[#071019]/[0.16] px-3 py-2 text-[13px] leading-6 text-slate-400/72 backdrop-blur-[14px]">Libraries also acquire and license resources, teach research and information-literacy practices, manage spaces and technology, build community services, document decisions, evaluate use, and negotiate ethical or legal tensions. The four functions below are a compact lens, not the whole profession.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          {FUNCTIONS.map((item, index) => <FunctionStrip key={item.title} item={item} number={`0${index + 1}`} />)}
        </div>
      </section>
    </SceneFrame>
  );
}

function LibraryServiceFloor({ children }: { children: readonly CurriculumNode[] }) {
  return (
    <nav aria-label="Library Science conceptual service floor" className="relative mt-5 overflow-hidden border border-cyan-100/[0.11] bg-[#071019]/[0.30] shadow-[0_30px_95px_rgba(0,0,0,0.18)] backdrop-blur-[22px] backdrop-saturate-[1.07]">
      <div className="relative hidden min-h-[660px] lg:block">
        <div className="pointer-events-none absolute inset-[4%]">
          <div className="absolute inset-x-[31%] top-[5%] bottom-[20%] border-x border-cyan-100/[0.055] bg-cyan-100/[0.008]" />
          <div className="absolute left-[31%] right-[31%] top-[28%] h-px bg-cyan-100/[0.07]" />
          <div className="absolute left-[31%] right-[31%] top-[52%] h-px bg-cyan-100/[0.07]" />
          <div className="absolute left-[31%] right-[31%] top-[77%] h-px bg-cyan-100/[0.07]" />
          <div className="absolute left-[33%] right-[33%] top-[46%] rounded-full border border-cyan-100/[0.08] bg-[#071019]/45 px-4 py-3 text-center backdrop-blur-[16px]">
            <span className="font-mono text-[9px] uppercase tracking-[0.09em] text-cyan-100/44">collection + circulation spine</span>
            <span className="mt-1 block text-[10px] text-slate-600">objects, records, requests, rights, and stewardship decisions move between service zones</span>
          </div>
        </div>

        <div className="absolute inset-[4%]">
          {children.map((child, index) => <LibraryZone key={child.id} child={child} index={index} />)}
        </div>
        <div className="absolute bottom-3 left-4 rounded-full bg-[#071019]/60 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.09em] text-cyan-100/38 backdrop-blur-[14px]">conceptual service floor · not a building prescription</div>
        <div className="absolute bottom-3 right-4 rounded-full bg-[#071019]/60 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-600 backdrop-blur-[14px]">planned zones define direct curriculum branches</div>
      </div>

      <div className="grid gap-2 p-3 sm:grid-cols-2 lg:hidden">
        {children.map((child, index) => <MobileLibraryZone key={child.id} child={child} index={index} />)}
      </div>
    </nav>
  );
}

function LibraryZone({ child, index }: { child: CurriculumNode; index: number }) {
  const meta = BRANCH_META[child.id] ?? { icon: Library, code: `L${index + 1}`, rgb: "148,163,184", short: child.description ?? "Explore this library-science field.", x: 36, y: 36, w: 28, h: 18 };
  const Icon = meta.icon;
  const active = child.status === "active";
  const content = (
    <div className={`group absolute flex flex-col border bg-[#071019]/[0.56] px-3 py-3 shadow-[0_14px_45px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition ${active ? "hover:bg-[#071019]/[0.70]" : "opacity-58"}`} style={{ left: `${meta.x}%`, top: `${meta.y}%`, width: `${meta.w}%`, height: `${meta.h}%`, borderColor: `rgba(${meta.rgb},0.18)` }}>
      <div className="flex items-center justify-between gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.25)`, background: `rgba(${meta.rgb},0.04)` }}><Icon size={12} /></span><span className="font-mono text-[8px] uppercase tracking-[0.07em] text-slate-600">{active ? "open" : "planned"}</span></div>
      <span className="mt-2 font-mono text-[8px] font-semibold uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.60)` }}>{meta.code}</span>
      <strong className="mt-0.5 text-[11px] leading-4 text-white/84">{child.label}</strong>
      <span className="mt-1 text-[9px] leading-4 text-slate-600">{meta.short}</span>
      {active ? <span className="mt-auto flex items-center justify-end gap-1 font-mono text-[8px] uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>open zone <ArrowRight size={9} className="transition group-hover:translate-x-1" /></span> : null}
    </div>
  );
  return active ? <Link href={child.href ?? "#"}>{content}</Link> : <div aria-disabled="true">{content}</div>;
}

function MobileLibraryZone({ child, index }: { child: CurriculumNode; index: number }) {
  const meta = BRANCH_META[child.id] ?? { icon: Library, code: `L${index + 1}`, rgb: "148,163,184", short: child.description ?? "Explore this library-science field.", x: 0, y: 0, w: 0, h: 0 };
  const Icon = meta.icon;
  const active = child.status === "active";
  const content = <div className={`group grid min-h-[92px] grid-cols-[38px_minmax(0,1fr)_18px] gap-2 border bg-[#071019]/[0.42] px-3 py-3 backdrop-blur-[18px] ${active ? "" : "opacity-58"}`} style={{ borderColor: `rgba(${meta.rgb},0.16)` }}><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span><span className="font-mono text-[8px] uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] text-white/82">{child.label}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-500">{meta.short}</span></span>{active ? <ArrowRight size={11} className="mt-2 text-slate-500 transition group-hover:translate-x-1" /> : null}</div>;
  return active ? <Link href={child.href ?? "#"}>{content}</Link> : <div aria-disabled="true">{content}</div>;
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[68px] flex-col justify-between border border-white/[0.08] bg-[#071019]/[0.34] px-3 py-2.5 backdrop-blur-[18px] transition hover:bg-[#071019]/[0.46]"><span className="text-[11px] font-semibold text-white/82">{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-3 text-slate-500">{note}</span><ArrowRight size={11} className="text-slate-500 transition group-hover:translate-x-1" /></span></Link>;
}

function FunctionStrip({ item, number }: { item: (typeof FUNCTIONS)[number]; number: string }) {
  const Icon = item.icon;
  return <div className="grid min-h-[150px] grid-cols-[42px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] bg-[#071019]/[0.14] px-4 py-4 backdrop-blur-[12px] xl:border-r xl:border-b-0 xl:last:border-r-0"><span className="font-mono text-[10px]" style={{ color: `rgba(${item.rgb},0.42)` }}>{number}</span><span><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.24)` }}><Icon size={13} /></span><strong className="mt-2 block text-[12px]" style={{ color: `rgba(${item.rgb},0.78)` }}>{item.title}</strong><span className="mt-2 block text-[10px] leading-5 text-slate-500">{item.detail}</span></span></div>;
}
