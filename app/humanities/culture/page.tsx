import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clapperboard,
  Layers3,
  Map,
  MapPin,
  MonitorSmartphone,
  Music,
  PackageOpen,
  Radio,
  Repeat2,
  ScrollText,
  Users,
  WandSparkles,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { CULTURE_CURRICULUM } from "@/lib/curriculum/humanities/culture";
import type { CurriculumNode } from "@/lib/curriculum/types";
import CultureStream from "./CultureStream";
import CulturalTransmissionLab from "./CulturalTransmissionLab";

const PRINCIPLES = [
  ["Culture is shared, not uniform", "People can participate in the same practice while disagreeing about meaning, value, ownership, authenticity, or change."],
  ["Traditions change", "Repetition does not imply perfect copying. Materials, participants, settings, technologies, institutions, and interpretations can shift while continuity is still claimed."],
  ["Meaning depends on context", "An object, phrase, image, food, song, ritual, or style can carry different meanings for insiders, outsiders, institutions, markets, and later generations."],
  ["Circulation changes things", "Migration, translation, media, tourism, trade, platforms, education, and commercialization can alter who encounters a practice and how it is framed."],
  ["Power shapes visibility", "Some cultural forms are archived, funded, promoted, regulated, stigmatized, borrowed, or ignored more readily than others. Visibility is never distributed evenly."],
  ["Interpretation needs sources", "Claims about a culture should be grounded in people, artifacts, records, performances, contexts, and histories rather than stereotypes or a single representative example."],
] as const;

type ArtifactMeta = {
  icon: LucideIcon;
  kind: "poster" | "handbill" | "calendar" | "receipt" | "ticket" | "screen" | "map" | "archive" | "postcard";
  tint: string;
  evidence: string;
};

const ARTIFACT_META: Record<string, ArtifactMeta> = {
  "humanities.culture.cultural-studies": { icon: BookOpen, kind: "poster", tint: "244,114,182", evidence: "representation · audiences · institutions" },
  "humanities.culture.folklore": { icon: ScrollText, kind: "handbill", tint: "192,132,252", evidence: "story · performance · variation" },
  "humanities.culture.holidays": { icon: CalendarDays, kind: "calendar", tint: "251,191,36", evidence: "calendar · ritual · commemoration" },
  "humanities.culture.material-everyday": { icon: PackageOpen, kind: "receipt", tint: "251,146,60", evidence: "objects · foodways · habits · spaces" },
  "humanities.culture.popular-media": { icon: Clapperboard, kind: "ticket", tint: "96,165,250", evidence: "media · fandom · circulation" },
  "humanities.culture.digital": { icon: MonitorSmartphone, kind: "screen", tint: "34,211,238", evidence: "platforms · memes · networked participation" },
  "humanities.culture.locations": { icon: Map, kind: "map", tint: "52,211,153", evidence: "place · routes · memory · belonging" },
  "humanities.culture.heritage-memory": { icon: Archive, kind: "archive", tint: "148,163,184", evidence: "preservation · museums · contested memory" },
  "humanities.culture.change-circulation": { icon: Repeat2, kind: "postcard", tint: "248,113,113", evidence: "migration · remix · borrowing · revival" },
};

const WALL_LAYOUT = [
  { left: "3%", top: "5%", width: "31%", minHeight: 178, rotate: -1.8 },
  { left: "37%", top: "3%", width: "27%", minHeight: 158, rotate: 1.2 },
  { left: "68%", top: "7%", width: "28%", minHeight: 170, rotate: -0.8 },
  { left: "7%", top: "39%", width: "25%", minHeight: 164, rotate: 1.4 },
  { left: "35%", top: "35%", width: "29%", minHeight: 152, rotate: -1.1 },
  { left: "67%", top: "38%", width: "29%", minHeight: 174, rotate: 0.8 },
  { left: "3%", top: "70%", width: "30%", minHeight: 166, rotate: -0.9 },
  { left: "37%", top: "67%", width: "25%", minHeight: 172, rotate: 1.3 },
  { left: "66%", top: "70%", width: "31%", minHeight: 160, rotate: -1.2 },
] as const;

export default function CulturePage() {
  const branches = CULTURE_CURRICULUM.children ?? [];

  return (
    <SceneFrame
      background={<CultureStream />}
      className="bg-[#140d11] text-stone-100 selection:bg-pink-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(20,13,17,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Humanities", href: "/humanities" }, { label: "Culture" }]}
          eyebrow="Practice · meaning · memory · media · place · change"
          eyebrowStyle="rule"
          icon={Layers3}
          title={<span>Culture</span>}
          subtitle="Study the practices, objects, stories, media, places, memories, identities, traditions, institutions, and everyday habits through which people make shared meaning, while keeping internal diversity and change visible."
          accentRgb="244, 114, 182"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#fdf2f8]"
          headerClassName="border-pink-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-4 border-y border-pink-100/[0.10] py-4 sm:py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,13,17,0.32),transparent_28%,transparent_75%,rgba(11,14,19,0.24))] backdrop-blur-[2px]" />
        <div className="relative flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-pink-200/62"><BookOpen size={14} /> Primary navigation · community commons wall</div>
            <h2 className="mt-1 max-w-4xl text-[clamp(1.6rem,3vw,2.8rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">Choose the kind of cultural evidence you want to follow.</h2>
          </div>
          <p className="max-w-xl text-[11px] leading-5 text-stone-500">Each clipping represents a different route into cultural study. The formats are metaphors for evidence, not claims that any one source type belongs exclusively to that branch.</p>
        </div>

        <nav aria-label="Culture branches" className="relative mt-4 hidden min-h-[650px] overflow-hidden border border-white/[0.07] bg-[#130d12]/[0.08] backdrop-blur-[4px] lg:block">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:100%_34px]" />
          <div className="pointer-events-none absolute left-[33%] top-0 h-full w-px bg-white/[0.025]" />
          <div className="pointer-events-none absolute left-[65%] top-0 h-full w-px bg-white/[0.025]" />
          {branches.map((branch, index) => <CommonsArtifact key={branch.id} branch={branch} index={index} />)}
          <div className="absolute bottom-3 left-4 font-mono text-[8px] uppercase tracking-[0.12em] text-pink-100/25">commons index · routes overlap because cultural evidence overlaps</div>
          <div className="absolute bottom-3 right-4 font-mono text-[8px] uppercase tracking-[0.12em] text-stone-700">active clippings open · faded clippings are planned</div>
        </nav>

        <nav aria-label="Culture branches" className="mt-4 space-y-2 lg:hidden">
          {branches.map((branch, index) => <MobileCommonsArtifact key={branch.id} branch={branch} index={index} />)}
        </nav>

        <aside className="relative mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-3" aria-label="Neighboring fields">
          <span className="font-mono text-[8px] uppercase tracking-[0.11em] text-stone-700">cross-reference tabs</span>
          <Neighbor href="/social-science/anthropology" icon={Users} label="Anthropology" />
          <Neighbor href="/humanities/history" icon={Archive} label="History" />
          <Neighbor href="/humanities/music" icon={Music} label="Music" />
          <Neighbor href="/humanities/visual-arts" icon={WandSparkles} label="Visual Arts" />
        </aside>
      </section>

      <section className="mt-7">
        <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-pink-200/58"><Radio size={13} /> Signature instrument · transmission</div><h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">Culture persists through change, not by escaping it.</h2></div>
          <p className="text-[12px] leading-5 text-stone-500">The fictional case below keeps one practice recognizable while changing its setting. The exercise is about asking better questions, not scoring authenticity or deciding whether a community has changed “too much.”</p>
        </div>
        <CulturalTransmissionLab />
      </section>

      <section className="mt-9 border-t border-pink-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/54"><MapPin size={13} /> Interpretive principles · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">A culture is not a personality profile for a population.</h2></div>
          <p className="text-[13px] leading-6 text-stone-400/70">Good cultural study resists two temptations at once: reducing people to stereotypes, and pretending shared practices do not matter. The interesting work lives in variation, history, context, participation, conflict, continuity, and change.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {PRINCIPLES.map(([term, detail], index) => <div key={term} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[10px] text-pink-200/38">0{index + 1}</span><span><strong className="block text-[13px] text-stone-200/86">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-stone-500">{detail}</span></span></div>)}
        </div>
      </section>
    </SceneFrame>
  );
}

function CommonsArtifact({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = ARTIFACT_META[branch.id] ?? { icon: BookOpen, kind: "poster" as const, tint: "244,114,182", evidence: "cultural evidence" };
  const position = WALL_LAYOUT[index] ?? WALL_LAYOUT[0];
  const Icon = meta.icon;
  const active = branch.status === "active";
  const shape = artifactShape(meta.kind);

  const content = (
    <div
      className={`group absolute overflow-hidden border p-4 shadow-[0_16px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl transition ${shape} ${active ? "hover:z-20 hover:scale-[1.018]" : "opacity-48"}`}
      style={{ left: position.left, top: position.top, width: position.width, minHeight: position.minHeight, transform: `rotate(${position.rotate}deg)`, borderColor: `rgba(${meta.tint},0.18)`, background: artifactBackground(meta.kind, meta.tint) }}
    >
      <Pin kind={meta.kind} tint={meta.tint} />
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border" style={{ color: `rgb(${meta.tint})`, borderColor: `rgba(${meta.tint},0.20)`, background: `rgba(${meta.tint},0.035)` }}><Icon size={15} /></span>
        <span className="font-mono text-[8px] uppercase tracking-[0.10em] text-stone-600">{active ? "open clipping" : "planned clipping"}</span>
      </div>
      <div className="mt-3 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.tint},0.58)` }}>{meta.evidence}</div>
      <strong className="mt-1.5 block max-w-[92%] text-[15px] leading-5 text-stone-100/88">{branch.label}</strong>
      <p className="mt-2 line-clamp-3 text-[10px] leading-4 text-stone-500">{branch.description}</p>
      {active ? <span className="absolute bottom-3 right-3 flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.tint},0.62)` }}>follow <ArrowRight size={9} className="transition group-hover:translate-x-1" /></span> : null}
      <ArtifactMarks kind={meta.kind} tint={meta.tint} />
    </div>
  );

  return active ? <Link href={branch.href}>{content}</Link> : <div aria-disabled="true">{content}</div>;
}

function MobileCommonsArtifact({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = ARTIFACT_META[branch.id] ?? { icon: BookOpen, kind: "poster" as const, tint: "244,114,182", evidence: "cultural evidence" };
  const Icon = meta.icon;
  const active = branch.status === "active";
  const content = (
    <div className={`group grid grid-cols-[38px_minmax(0,1fr)_18px] gap-3 border px-3 py-3 backdrop-blur-xl ${active ? "" : "opacity-50"}`} style={{ borderColor: `rgba(${meta.tint},0.14)`, background: `rgba(${meta.tint},0.025)` }}>
      <span className="flex h-8 w-8 items-center justify-center border" style={{ color: `rgb(${meta.tint})`, borderColor: `rgba(${meta.tint},0.18)` }}><Icon size={13} /></span>
      <span><span className="font-mono text-[8px] uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.tint},0.55)` }}>CU.{String(index + 1).padStart(2, "0")} · {meta.evidence}</span><strong className="mt-1 block text-[13px] text-stone-100/88">{branch.label}</strong><span className="mt-1 block text-[9px] leading-4 text-stone-600">{branch.description}</span></span>
      {active ? <ArrowRight size={12} className="mt-2 text-stone-600 transition group-hover:translate-x-1" /> : null}
    </div>
  );
  return active ? <Link href={branch.href}>{content}</Link> : <div aria-disabled="true">{content}</div>;
}

function artifactShape(kind: ArtifactMeta["kind"]) {
  switch (kind) {
    case "handbill": return "rounded-[3px] border-dashed";
    case "calendar": return "rounded-t-[12px] rounded-b-[3px] border-t-4";
    case "receipt": return "rounded-none border-dashed";
    case "ticket": return "rounded-[16px]";
    case "screen": return "rounded-[18px] shadow-[0_18px_55px_rgba(6,182,212,0.06)]";
    case "map": return "rounded-[2px] border-emerald-200/[0.12]";
    case "archive": return "rounded-[4px] border-slate-200/[0.11]";
    case "postcard": return "rounded-[5px] border-2";
    default: return "rounded-[4px]";
  }
}

function artifactBackground(kind: ArtifactMeta["kind"], tint: string) {
  if (kind === "screen") return `linear-gradient(160deg, rgba(${tint},0.075), rgba(8,15,20,0.48))`;
  if (kind === "archive") return `linear-gradient(165deg, rgba(231,229,228,0.045), rgba(${tint},0.018))`;
  return `linear-gradient(155deg, rgba(250,250,249,0.055), rgba(${tint},0.025), rgba(12,9,11,0.34))`;
}

function Pin({ kind, tint }: { kind: ArtifactMeta["kind"]; tint: string }) {
  if (kind === "screen" || kind === "ticket") return null;
  return <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full border border-white/10" style={{ background: `rgba(${tint},0.42)`, boxShadow: `0 2px 7px rgba(0,0,0,0.35)` }} />;
}

function ArtifactMarks({ kind, tint }: { kind: ArtifactMeta["kind"]; tint: string }) {
  if (kind === "map") return <div className="pointer-events-none absolute inset-y-0 left-1/3 w-px bg-emerald-100/[0.06] shadow-[70px_0_0_rgba(209,250,229,0.045)]" />;
  if (kind === "calendar") return <div className="pointer-events-none absolute inset-x-0 top-10 h-px" style={{ background: `rgba(${tint},0.12)` }} />;
  if (kind === "receipt") return <div className="pointer-events-none absolute inset-x-4 bottom-5 border-b border-dashed border-orange-100/[0.08]" />;
  if (kind === "screen") return <div className="pointer-events-none absolute inset-x-4 top-3 h-px bg-cyan-100/[0.08] shadow-[0_6px_0_rgba(207,250,254,0.04)]" />;
  if (kind === "archive") return <div className="pointer-events-none absolute left-4 top-0 h-3 w-20 border-x border-b border-slate-100/[0.08] bg-slate-100/[0.025]" />;
  if (kind === "ticket") return <div className="pointer-events-none absolute bottom-0 top-0 right-[28%] border-l border-dashed border-blue-100/[0.08]" />;
  return null;
}

function Neighbor({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
  return <Link href={href} className="group flex items-center gap-2 border-b border-white/[0.06] pb-1 font-mono text-[9px] uppercase tracking-[0.08em] text-stone-600 transition hover:border-pink-200/20 hover:text-stone-300"><Icon size={10} className="text-pink-200/42" />{label}<ArrowRight size={9} className="transition group-hover:translate-x-0.5" /></Link>;
}
