"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Cable,
  Droplets,
  Layers3,
  MapPinned,
  Mountain,
  Route,
  Trees,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import BlueprintBackground from "../../BlueprintBackground";

type LayerId = "terrain" | "water" | "vegetation" | "utilities" | "access" | "context" | "regulatory";
type ConditionId = "slope" | "drainage" | "trees" | "utility" | "street" | "neighbor" | "review-band";

type Condition = {
  id: ConditionId;
  layer: LayerId;
  label: string;
  fact: string;
  question: string;
  verify: string;
  response: string;
  rgb: string;
};

const LAYERS: readonly { id: LayerId; label: string; icon: LucideIcon; rgb: string }[] = [
  { id: "terrain", label: "Terrain", icon: Mountain, rgb: "74, 222, 128" },
  { id: "water", label: "Water", icon: Droplets, rgb: "56, 189, 248" },
  { id: "vegetation", label: "Vegetation", icon: Trees, rgb: "34, 197, 94" },
  { id: "utilities", label: "Utilities", icon: Cable, rgb: "192, 132, 252" },
  { id: "access", label: "Access", icon: Route, rgb: "251, 146, 60" },
  { id: "context", label: "Surroundings", icon: Building2, rgb: "148, 163, 184" },
  { id: "regulatory", label: "Review bands", icon: Layers3, rgb: "251, 191, 36" },
] as const;

const CONDITIONS: readonly Condition[] = [
  {
    id: "slope",
    layer: "terrain",
    label: "Falling terrain",
    fact: "The hypothetical contours descend toward the southeast side of the study area.",
    question: "Where would grading, entries, foundations, and accessible routes become easier or harder?",
    verify: "Topographic survey and field observations.",
    response: "Test building placement against the existing grade before assuming the site should be flattened.",
    rgb: "74, 222, 128",
  },
  {
    id: "drainage",
    layer: "water",
    label: "Drainage swale",
    fact: "A visible low path carries surface water across the lower half of the hypothetical parcel.",
    question: "Can the design preserve or improve that flow instead of blocking it?",
    verify: "Survey, drainage study, soil information, and local stormwater requirements.",
    response: "Keep the flow path visible during early placement studies and investigate before building across it.",
    rgb: "56, 189, 248",
  },
  {
    id: "trees",
    layer: "vegetation",
    label: "Mature tree cluster",
    fact: "Several established trees occupy the southwest interior of the hypothetical site.",
    question: "Do they provide shade, habitat, identity, buffering, or conflicts with the proposed work?",
    verify: "Tree survey, species/condition assessment, root-zone information, and project requirements.",
    response: "Treat preservation or removal as a design decision that needs evidence, not an automatic default.",
    rgb: "34, 197, 94",
  },
  {
    id: "utility",
    layer: "utilities",
    label: "Utility corridor",
    fact: "An illustrative utility route approaches from the east street edge.",
    question: "Where might service connections, easements, clearances, or relocations affect the plan?",
    verify: "Utility records, survey, provider coordination, and field verification.",
    response: "Reserve uncertainty around underground and overhead infrastructure until it is actually located.",
    rgb: "192, 132, 252",
  },
  {
    id: "street",
    layer: "access",
    label: "Public street edge",
    fact: "The south edge provides the clearest public approach in this hypothetical study.",
    question: "How should pedestrian arrival, vehicles, service, visibility, and public space share the edge?",
    verify: "Transportation context, curb conditions, ownership, accessibility, and local access requirements.",
    response: "Map different arrival types separately before collapsing them into one driveway or entrance.",
    rgb: "251, 146, 60",
  },
  {
    id: "neighbor",
    layer: "context",
    label: "Neighboring building",
    fact: "A taller neighboring mass sits close to the east side of the hypothetical study area.",
    question: "How might it affect privacy, views, daylight, service access, fire separation, or the street wall?",
    verify: "Survey, neighboring openings/uses, property information, and applicable regulations.",
    response: "Treat the adjacent building as part of the site context, not as empty background outside the property line.",
    rgb: "148, 163, 184",
  },
  {
    id: "review-band",
    layer: "regulatory",
    label: "Illustrative review band",
    fact: "The amber perimeter shown here is only a teaching overlay, not a real setback or easement.",
    question: "Which legal boundaries, setbacks, easements, overlays, or protected areas actually apply to the real project?",
    verify: "Current survey, zoning information, recorded documents, authorities having jurisdiction, and project team review.",
    response: "Never infer a legal buildable area from a generic diagram. Research the actual site and jurisdiction.",
    rgb: "251, 191, 36",
  },
] as const;

export default function SiteAnalysisConstraintsPage() {
  const [visible, setVisible] = useState<Record<LayerId, boolean>>(() => ({
    terrain: true,
    water: true,
    vegetation: true,
    utilities: true,
    access: true,
    context: true,
    regulatory: true,
  }));
  const [selectedId, setSelectedId] = useState<ConditionId>("drainage");
  const selected = CONDITIONS.find((condition) => condition.id === selectedId) ?? CONDITIONS[0];

  const toggleLayer = (layer: LayerId) => {
    setVisible((current) => ({ ...current, [layer]: !current[layer] }));
  };

  const focusCondition = (condition: Condition) => {
    setSelectedId(condition.id);
    setVisible((current) => ({ ...current, [condition.layer]: true }));
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06141a] text-slate-100 selection:bg-sky-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-54"><BlueprintBackground /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_82%_14%,rgba(56,189,248,0.09),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(74,222,128,0.06),transparent_27%),linear-gradient(to_bottom,rgba(6,20,26,0.16),rgba(3,10,15,0.92))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(125,211,252,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(134,239,172,0.02)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Architecture", href: "/applied-science/architecture" },
            { label: "Site & Context", href: "/applied-science/architecture/site-context" },
            { label: "Site Analysis & Constraints" },
          ]}
          eyebrow="Observe · Locate · Verify · Interpret · Respond"
          icon={MapPinned}
          title={<span>Site Analysis & Constraints</span>}
          subtitle="Build a trustworthy picture of existing conditions before deciding which ones are opportunities, constraints, risks, or design resources."
          accentRgb="56, 189, 248"
          titleClassName="font-serif text-[clamp(2.65rem,4.7vw,5rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-sky-300/[0.13]"
          aside={<div className="rounded-full border border-sky-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-sky-200/85 backdrop-blur-md">fact first · response second</div>}
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-sky-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-300/72">Core idea</div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">The same site condition can mean different things to different projects.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">A tree, slope, street, drainage path, utility line, or neighboring wall is first a condition to locate and verify. Its design meaning comes later. Good site analysis keeps evidence separate from preference long enough to avoid designing around assumptions that were never true.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <CoreFact icon={MapPinned} label="Locate" text="Put each known condition in the right place and at an appropriate level of precision." rgb="56, 189, 248" />
            <CoreFact icon={Layers3} label="Verify" text="Know which facts come from surveys, records, studies, field observation, or unresolved assumptions." rgb="251, 191, 36" />
            <CoreFact icon={Building2} label="Interpret" text="Ask what the condition means for this project before choosing a response." rgb="74, 222, 128" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-sky-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300/75">Site evidence board</div>
              <p className="mt-1 text-[13px] text-slate-500">Toggle evidence layers, then select a condition to inspect what is known and what still needs verification.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">layer visibility ≠ importance</div>
          </div>

          <div className="grid items-stretch gap-3 xl:grid-cols-[290px_minmax(520px,1fr)_350px]">
            <div className="rounded-[20px] border border-sky-200/[0.08] bg-[#061621]/76 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Evidence layers</div>
              <div className="mt-3 grid gap-2">
                {LAYERS.map((layer) => {
                  const Icon = layer.icon;
                  const active = visible[layer.id];
                  return (
                    <button key={layer.id} type="button" onClick={() => toggleLayer(layer.id)} className={`flex items-center gap-3 rounded-[14px] border p-3 text-left transition-colors ${active ? "border-white/[0.09] bg-white/[0.025]" : "border-white/[0.035] bg-black/[0.10] opacity-50"}`}>
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border" style={{ color: `rgb(${layer.rgb})`, borderColor: `rgba(${layer.rgb},0.20)`, background: `rgba(${layer.rgb},0.045)` }}><Icon size={14} /></span>
                      <span className="min-w-0 flex-1"><strong className="block text-[11px] text-slate-300">{layer.label}</strong><span className="mt-0.5 block font-mono text-[9px] text-slate-700">{active ? "visible" : "hidden"}</span></span>
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: active ? `rgb(${layer.rgb})` : "rgb(51,65,85)" }} />
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 rounded-[15px] border border-amber-300/[0.10] bg-amber-400/[0.02] p-3">
                <div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-amber-300/70">Hypothetical teaching site</div>
                <p className="mt-1.5 text-[10px] leading-4 text-slate-600">The geometry and conditions on this page are invented to teach reading methods. They are not survey, zoning, utility, ecological, or legal information for a real property.</p>
              </div>
            </div>

            <SiteEvidenceMap visible={visible} selectedId={selectedId} onSelect={setSelectedId} />

            <div className="rounded-[20px] border border-emerald-200/[0.08] bg-[#07170f]/72 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300/70">Condition ledger</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {CONDITIONS.map((condition) => (
                  <button key={condition.id} type="button" onClick={() => focusCondition(condition)} className={`rounded-xl border px-3 py-2 text-left ${selectedId === condition.id ? "border-emerald-300/[0.22] bg-emerald-400/[0.045]" : "border-white/[0.045] bg-black/[0.13]"}`}>
                    <span className="block text-[10px] font-semibold text-slate-300">{condition.label}</span>
                    <span className="mt-0.5 block text-[9px] text-slate-700">{LAYERS.find((layer) => layer.id === condition.layer)?.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-3 rounded-[16px] border border-white/[0.05] bg-black/[0.16] p-3.5">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${selected.rgb})` }} /><strong className="text-[13px] text-slate-200">{selected.label}</strong></div>
                <LedgerRow label="Mapped fact" text={selected.fact} />
                <LedgerRow label="Question" text={selected.question} />
                <LedgerRow label="Verify with" text={selected.verify} />
                <LedgerRow label="Possible response" text={selected.response} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-3">
          <ReferenceCard title="A map can contain uncertainty" text="Unknown utility depth, unverified property information, seasonal water, or incomplete ecological data should stay visibly unresolved instead of being silently converted into precise-looking lines." />
          <ReferenceCard title="Property line is not the edge of context" text="Streets, neighbors, views, noise, transit, landscape systems, infrastructure, and larger ecological patterns can matter even when they sit outside the parcel." />
          <ReferenceCard title="Legal constraints require real sources" text="Setbacks, easements, overlays, rights-of-way, protected areas, and other restrictions are project- and jurisdiction-specific. Generic diagrams can teach the category, not supply the answer." />
        </section>

        <nav className="mt-3 pb-8" aria-label="Site analysis navigation">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/applied-science/architecture/site-context" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-emerald-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-emerald-300/[0.18]"><ArrowLeft size={15} className="text-emerald-300 transition-transform group-hover:-translate-x-0.5" /><span><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Parent unit</span><strong className="mt-0.5 block text-[14px] text-slate-200">Site & Context</strong></span></Link>
            <Link href="/applied-science/architecture/site-context/climate-orientation" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-amber-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-amber-300/[0.18]"><span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Next lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Climate & Orientation</strong></span><ArrowRight size={15} className="text-amber-300 transition-transform group-hover:translate-x-0.5" /></Link>
          </div>
        </nav>
      </div>
    </main>
  );
}

function SiteEvidenceMap({ visible, selectedId, onSelect }: { visible: Record<LayerId, boolean>; selectedId: ConditionId; onSelect: (id: ConditionId) => void }) {
  const emphasis = (id: ConditionId, base = 0.62) => selectedId === id ? 1 : base;
  return (
    <div className="relative flex min-h-[570px] items-center justify-center overflow-hidden rounded-[20px] border border-sky-200/[0.10] bg-[#041318]/86 p-4">
      <div className="absolute left-4 top-4 z-10"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Hypothetical site study</div><div className="mt-1 text-[9px] text-sky-300/65">select a mapped condition to inspect it</div></div>
      <svg viewBox="0 0 620 500" className="w-full max-w-[680px]" role="img" aria-label="Hypothetical layered site analysis diagram">
        <defs><pattern id="analysis-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(125,211,252,0.055)" strokeWidth="1" /></pattern></defs>
        <rect width="620" height="500" fill="url(#analysis-grid)" />
        <rect x="100" y="62" width="402" height="334" rx="5" fill="rgba(74,222,128,0.018)" stroke="rgba(134,239,172,0.65)" strokeWidth="3" strokeDasharray="10 7" />
        <text x="106" y="50" fill="#86efac" fontSize="10">STUDY BOUNDARY</text>

        {visible.regulatory ? <g opacity={emphasis("review-band", 0.55)} onClick={() => onSelect("review-band")} className="cursor-pointer"><rect x="122" y="84" width="358" height="290" rx="3" fill="none" stroke="#fbbf24" strokeWidth="12" opacity="0.20" /><text x="375" y="98" fill="#fde68a" fontSize="9">ILLUSTRATIVE REVIEW BAND</text></g> : null}

        {visible.terrain ? <g opacity={emphasis("slope")} onClick={() => onSelect("slope")} className="cursor-pointer" fill="none" stroke="#4ade80" strokeWidth="1.8"><path d="M74 118 C190 86 305 132 536 94"/><path d="M72 160 C188 128 330 174 540 136"/><path d="M74 205 C204 170 348 222 543 184"/><path d="M80 255 C210 217 363 277 540 232"/><path d="M86 311 C220 269 372 328 528 286"/><path d="M94 365 C232 322 382 374 512 340"/><text x="120" y="348" fill="#86efac" stroke="none" fontSize="9">FALLING GRADE →</text></g> : null}

        {visible.water ? <g opacity={emphasis("drainage")} onClick={() => onSelect("drainage")} className="cursor-pointer"><path d="M172 83 C212 170 194 258 246 382" fill="none" stroke="#38bdf8" strokeWidth="7" opacity="0.72" /><path d="M245 382 L258 365 L265 389 Z" fill="#38bdf8" /><text x="255" y="369" fill="#7dd3fc" fontSize="9">SURFACE FLOW</text></g> : null}

        {visible.vegetation ? <g opacity={emphasis("trees")} onClick={() => onSelect("trees")} className="cursor-pointer" fill="#22c55e"><circle cx="154" cy="275" r="26" opacity="0.68"/><circle cx="188" cy="306" r="31" opacity="0.72"/><circle cx="136" cy="330" r="23" opacity="0.65"/><circle cx="210" cy="260" r="19" opacity="0.62"/><text x="115" y="372" fill="#86efac" fontSize="9">MATURE TREES</text></g> : null}

        {visible.utilities ? <g opacity={emphasis("utility")} onClick={() => onSelect("utility")} className="cursor-pointer"><path d="M503 225 H420 V382" fill="none" stroke="#c084fc" strokeWidth="4" strokeDasharray="9 7" /><circle cx="503" cy="225" r="6" fill="#c084fc"/><text x="422" y="213" fill="#d8b4fe" fontSize="9">ILLUSTRATIVE UTILITY ROUTE</text></g> : null}

        {visible.access ? <g opacity={emphasis("street")} onClick={() => onSelect("street")} className="cursor-pointer"><rect x="28" y="405" width="562" height="48" fill="rgba(148,163,184,0.09)" stroke="rgba(148,163,184,0.30)"/><line x1="58" y1="429" x2="560" y2="429" stroke="#94a3b8" strokeWidth="2" strokeDasharray="14 9"/><path d="M304 429 V374" stroke="#fb923c" strokeWidth="6"/><path d="M303 372 L292 388 H314 Z" fill="#fb923c"/><text x="261" y="470" fill="#fdba74" fontSize="9">PUBLIC STREET / ARRIVAL EDGE</text></g> : null}

        {visible.context ? <g opacity={emphasis("neighbor")} onClick={() => onSelect("neighbor")} className="cursor-pointer"><rect x="512" y="114" width="74" height="178" fill="rgba(148,163,184,0.10)" stroke="#94a3b8" strokeWidth="2" /><rect x="523" y="133" width="13" height="18" fill="rgba(125,211,252,0.20)"/><rect x="550" y="133" width="13" height="18" fill="rgba(125,211,252,0.20)"/><text x="516" y="103" fill="#cbd5e1" fontSize="9">NEIGHBOR</text></g> : null}
      </svg>
      <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/[0.05] bg-black/60 px-3 py-2 text-[9px] text-slate-600 backdrop-blur-md">Layer visibility is only a reading aid. Hidden information does not stop existing on the real site.</div>
    </div>
  );
}

function LedgerRow({ label, text }: { label: string; text: string }) {
  return <div className="mt-3 border-t border-white/[0.05] pt-2.5"><div className="text-[9px] font-semibold uppercase tracking-[0.09em] text-slate-700">{label}</div><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p></div>;
}

function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>;
}

function ReferenceCard({ title, text }: { title: string; text: string }) {
  return <div className="rounded-[18px] border border-sky-200/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl"><h3 className="text-[13px] font-semibold text-slate-200">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
