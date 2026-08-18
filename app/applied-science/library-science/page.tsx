import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
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

type BranchMeta = { icon: LucideIcon; code: string; rgb: string };

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.library-science.cataloging-metadata": { icon: Tags, code: "CAT", rgb: "34,211,238" },
  "applied.library-science.classification-organization": { icon: Boxes, code: "ORG", rgb: "96,165,250" },
  "applied.library-science.collection-development": { icon: BookOpen, code: "COL", rgb: "251,191,36" },
  "applied.library-science.reference-services": { icon: FileSearch, code: "REF", rgb: "52,211,153" },
  "applied.library-science.archives-special-collections": { icon: Archive, code: "ARC", rgb: "167,139,250" },
  "applied.library-science.preservation-conservation": { icon: ShieldCheck, code: "PRE", rgb: "134,239,172" },
  "applied.library-science.digital-libraries": { icon: FolderArchive, code: "DIG", rgb: "96,165,250" },
  "applied.library-science.information-literacy": { icon: GraduationCap, code: "ILI", rgb: "244,114,182" },
  "applied.library-science.management-community": { icon: Users, code: "MGT", rgb: "253,186,116" },
  "applied.library-science.ethics-access": { icon: ShieldCheck, code: "ETH", rgb: "192,132,252" },
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
      <section className="mt-5">
        <div className="mb-3 grid gap-3 border-b border-cyan-100/[0.08] pb-3 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-100/55">Stewardship system · primary navigation + collection lab</div>
            <h2 className="mt-1 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.046em] text-white">A collection is not preserved merely because its objects still exist.</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/formal-science/information-science" label="Information Science" note="representation · retrieval · information systems" />
            <Neighbor href="/humanities/history" label="History" note="sources · context · interpretation" />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[250px_minmax(0,1fr)] xl:items-start">
          <FieldIndex children={children} />
          <StewardshipLab />
        </div>
      </section>

      <section className="mt-8 border-t border-cyan-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-100/52">Core stewardship functions</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Organization, preservation, retrieval, and access form a loop around people and collections, not a one-way conveyor belt.</h2>
          </div>
          <p className="text-[13px] leading-6 text-slate-400/72">Libraries also acquire and license resources, teach research and information-literacy practices, manage spaces and technology, build community services, document decisions, evaluate use, and negotiate ethical or legal tensions. The four functions below are a compact lens, not the whole profession.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          {FUNCTIONS.map((item, index) => <FunctionStrip key={item.title} item={item} number={`0${index + 1}`} />)}
        </div>
      </section>
    </SceneFrame>
  );
}

function FieldIndex({ children }: { children: readonly CurriculumNode[] }) {
  return (
    <Surface variant="open" className="overflow-hidden rounded-[26px] border-cyan-100/[0.08]" style={{ background: "rgba(5,9,13,0.025)" }}>
      <div className="border-b border-white/[0.06] px-3.5 py-3">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-100/48">Fields of library science</div>
        <p className="mt-1 text-[10px] leading-4 text-slate-600">The parent is active. Direct branches stay visibly planned until their pages are developed.</p>
      </div>
      <div>
        {children.map((child, index) => {
          const meta = BRANCH_META[child.id] ?? { icon: Library, code: `L${index + 1}`, rgb: "148,163,184" };
          const Icon = meta.icon;
          const active = child.status === "active";
          const content = <><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span className="min-w-0 flex-1"><span className="block font-mono text-[9px] uppercase tracking-[0.05em]" style={{ color: `rgba(${meta.rgb},0.52)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] leading-4 text-white/76">{child.label}</strong></span>{active ? <ArrowRight size={11} className="text-slate-600" /> : <span className="font-mono text-[8px] uppercase text-slate-700">planned</span>}</>;
          return active ? <Link key={child.id} href={child.href ?? "#"} className="group flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 transition last:border-b-0 hover:bg-cyan-200/[0.035]">{content}</Link> : <div key={child.id} aria-disabled="true" className="flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 last:border-b-0">{content}</div>;
        })}
      </div>
    </Surface>
  );
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[68px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-2.5 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="text-[11px] font-semibold text-white/78">{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-3 text-slate-600">{note}</span><ArrowRight size={11} className="text-slate-600 transition group-hover:translate-x-1" /></span></Link>;
}

function FunctionStrip({ item, number }: { item: (typeof FUNCTIONS)[number]; number: string }) {
  const Icon = item.icon;
  return <div className="grid min-h-[150px] grid-cols-[42px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:border-b-0 xl:last:border-r-0"><span className="font-mono text-[10px]" style={{ color: `rgba(${item.rgb},0.42)` }}>{number}</span><span><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.24)` }}><Icon size={13} /></span><strong className="mt-2 block text-[12px]" style={{ color: `rgba(${item.rgb},0.78)` }}>{item.title}</strong><span className="mt-2 block text-[10px] leading-5 text-slate-500">{item.detail}</span></span></div>;
}
