"use client";

import { useMemo, useState } from "react";
import { Archive, BookOpen, FileAudio, FolderArchive, ShieldCheck } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ResourceKey = "circulating" | "manuscript" | "oral-history" | "born-digital";
type StageKey = "acquire" | "describe" | "preserve" | "access";

type Resource = {
  key: ResourceKey;
  label: string;
  icon: typeof BookOpen;
  rgb: string;
  identity: string;
  risks: readonly string[];
  stages: Record<StageKey, readonly string[]>;
  access: string;
};

const STAGES = [
  { key: "acquire" as const, label: "Select / acquire" },
  { key: "describe" as const, label: "Describe / organize" },
  { key: "preserve" as const, label: "Preserve" },
  { key: "access" as const, label: "Discover / access" },
] as const;

const RESOURCES: readonly Resource[] = [
  {
    key: "circulating",
    label: "Circulating book",
    icon: BookOpen,
    rgb: "34,211,238",
    identity: "A replaceable published item intended for repeated public use and ordinary circulation.",
    risks: ["wear and loss", "edition ambiguity", "poor subject access", "local demand changing over time"],
    stages: {
      acquire: ["match collection scope and community need", "identify edition and format", "consider cost, licensing, replacement, and expected use"],
      describe: ["record title, creator, edition, identifiers, subjects, and relationships", "support shelf arrangement and catalog discovery", "distinguish this edition from related manifestations"],
      preserve: ["use durable handling and storage appropriate to routine circulation", "repair or replace when condition and value justify it", "track loss, damage, and retention decisions"],
      access: ["make holdings and availability discoverable", "support borrowing, holds, renewals, accessibility needs, and alternatives", "connect readers to related editions or formats"],
    },
    access: "The stewardship goal favors broad routine use, discoverability, and sustainable circulation rather than museum-style restriction.",
  },
  {
    key: "manuscript",
    label: "Rare manuscript",
    icon: Archive,
    rgb: "167,139,250",
    identity: "A unique or scarce physical item whose provenance, context, material condition, and original relationships may be significant.",
    risks: ["physical deterioration", "loss of provenance or arrangement", "handling damage", "rights, donor, privacy, or cultural restrictions"],
    stages: {
      acquire: ["document provenance, custody, agreements, and collection context", "assess significance, condition, ownership, restrictions, and stewardship capacity", "record what arrived together and how it was organized"],
      describe: ["describe the collection and relationships without pretending every item can be cataloged like a published book", "preserve provenance and arrangement information", "create finding aids or collection-level access points where appropriate"],
      preserve: ["use appropriate housing, environmental control, handling rules, condition documentation, and conservation priorities", "plan for disasters and safe retrieval", "avoid treatment that destroys evidential features"],
      access: ["balance research access with condition, agreements, privacy, law, and cultural responsibilities", "provide surrogates where useful", "make restrictions and context transparent rather than invisible"],
    },
    access: "Access can be mediated because uniqueness, condition, agreements, privacy, or cultural stewardship may matter alongside openness.",
  },
  {
    key: "oral-history",
    label: "Oral-history recording",
    icon: FileAudio,
    rgb: "52,211,153",
    identity: "A recorded interview whose meaning includes voice, context, participant relationships, documentation, permissions, and often a transcript or index.",
    risks: ["format obsolescence or file loss", "weak rights/consent documentation", "names and context becoming detached", "transcript errors or inaccessible media"],
    stages: {
      acquire: ["keep recording, release/permission information, participant identities, dates, project context, and related documentation together", "clarify stewardship and access expectations", "verify usable file transfer"],
      describe: ["describe interviewee, interviewer, date, project, topics, language, format, and relationships", "link recordings with transcripts, summaries, indexes, or related materials", "note restrictions and context"],
      preserve: ["maintain preservation copies, integrity checks, documented formats, and redundant managed storage", "retain original files where appropriate", "plan migration or normalization without losing provenance"],
      access: ["provide usable playback, transcripts or captions where available, search aids, and contextual metadata", "honor permissions and restrictions", "avoid implying a transcript is identical to the recorded performance"],
    },
    access: "Usability depends on both digital stewardship and ethical/contextual documentation, not merely keeping an audio file online.",
  },
  {
    key: "born-digital",
    label: "Born-digital collection",
    icon: FolderArchive,
    rgb: "96,165,250",
    identity: "Files and digital records created in electronic form, potentially spread across folders, formats, metadata, software dependencies, accounts, and storage systems.",
    risks: ["bit loss or silent corruption", "format/software dependence", "missing context and filenames", "privacy, rights, credentials, or sensitive content"],
    stages: {
      acquire: ["capture files plus directory structure, transfer context, permissions, and relevant documentation", "avoid altering original timestamps or structure unnecessarily during transfer", "identify sensitive material and technical dependencies"],
      describe: ["record collection context, creators, dates, formats, relationships, technical metadata, and arrangement", "preserve meaningful directory or system relationships where possible", "create discovery metadata without exposing restricted content"],
      preserve: ["use managed redundant storage, fixity checking, format monitoring, documentation, and preservation planning", "separate preservation copies from access copies when useful", "record migrations and transformations"],
      access: ["provide safe, intelligible access through appropriate viewers, emulation, transformed copies, or repository interfaces", "apply privacy, rights, and security controls", "retain enough technical context for future interpretation"],
    },
    access: "Digital access can look effortless while depending on substantial preservation, metadata, rights, security, and software infrastructure behind the interface.",
  },
] as const;

export default function StewardshipLab() {
  const [resourceKey, setResourceKey] = useState<ResourceKey>("manuscript");
  const [stageKey, setStageKey] = useState<StageKey>("describe");
  const resource = useMemo(() => RESOURCES.find((item) => item.key === resourceKey) ?? RESOURCES[0], [resourceKey]);
  const stage = STAGES.find((item) => item.key === stageKey) ?? STAGES[0];
  const Icon = resource.icon;

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[28px] border-cyan-100/[0.10]" style={{ background: "rgba(5,9,13,0.29)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-cyan-100/60"><ShieldCheck size={13} /> Stewardship laboratory</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.9vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">The lifecycle can stay familiar while the stewardship problem changes completely.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/78">Choose a collection object and a lifecycle stage. Compare how the same professional question changes when the object, risks, rights, and intended use change.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-500">Current object</span>
          <div className="mt-2 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full border" style={{ color: `rgb(${resource.rgb})`, borderColor: `rgba(${resource.rgb},0.28)` }}><Icon size={16} /></span><strong className="text-[17px]" style={{ color: `rgb(${resource.rgb})` }}>{resource.label}</strong></div>
          <p className="mt-2 text-[12px] leading-5 text-slate-400">{resource.identity}</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[230px_minmax(0,1fr)_310px] sm:p-5">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Collection object</div>
          <div className="mt-3 space-y-2">{RESOURCES.map((item) => { const ItemIcon = item.icon; const active = item.key === resourceKey; return <button key={item.key} type="button" onClick={() => setResourceKey(item.key)} className="flex w-full items-center gap-2 border px-3 py-3 text-left transition" style={{ borderColor: active ? `rgba(${item.rgb},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${item.rgb},0.05)` : "rgba(0,0,0,0.03)" }}><ItemIcon size={14} style={{ color: `rgb(${item.rgb})` }} /><strong className="text-[12px] text-white/80">{item.label}</strong></button>; })}</div>
          <div className="mt-5 border-t border-white/[0.06] pt-3"><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">Key risks</span>{resource.risks.map((risk) => <div key={risk} className="mt-2 border-l border-white/[0.09] pl-2 text-[11px] leading-5 text-slate-400">{risk}</div>)}</div>
        </div>

        <div>
          <div className="grid gap-2 sm:grid-cols-4">{STAGES.map((item, index) => { const active = item.key === stageKey; return <button key={item.key} type="button" onClick={() => setStageKey(item.key)} className="border px-2.5 py-3 text-left transition" style={{ borderColor: active ? `rgba(${resource.rgb},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${resource.rgb},0.045)` : "rgba(0,0,0,0.025)" }}><span className="font-mono text-[9px]" style={{ color: `rgba(${resource.rgb},0.62)` }}>0{index + 1}</span><strong className="mt-1 block text-[11px] leading-4 text-white/78">{item.label}</strong></button>; })}</div>
          <div className="mt-4 min-h-[330px] border border-white/[0.065] bg-black/[0.04] p-5">
            <div className="flex items-center justify-between gap-3"><div><div className="font-mono text-[10px] font-semibold uppercase tracking-[0.07em]" style={{ color: `rgba(${resource.rgb},0.64)` }}>{stage.label}</div><h4 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Stewardship questions</h4></div><span className="font-mono text-[9px] uppercase text-slate-500">representative</span></div>
            <div className="mt-5 space-y-3">{resource.stages[stageKey].map((item, index) => <div key={item} className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 border-b border-white/[0.05] pb-3 last:border-b-0"><span className="font-mono text-[9px]" style={{ color: `rgba(${resource.rgb},0.58)` }}>0{index + 1}</span><p className="text-[13px] leading-6 text-slate-300/78">{item}</p></div>)}</div>
          </div>
        </div>

        <aside className="border border-white/[0.065] bg-black/[0.04] p-4 xl:sticky xl:top-[172px] xl:self-start">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-slate-500">Access principle</div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/76">{resource.access}</p>
          <div className="mt-5 border-t border-white/[0.06] pt-3"><strong className="text-[10px] uppercase tracking-[0.05em] text-cyan-100/58">Why this differs from Information Science</strong><p className="mt-2 text-[12px] leading-5 text-slate-400">Information Science studies information structures and retrieval broadly. Library Science applies organization and retrieval inside institutions that also select collections, serve communities, preserve materials, teach users, manage spaces and systems, and negotiate rights, ethics, and stewardship over time.</p></div>
        </aside>
      </div>
    </Surface>
  );
}
