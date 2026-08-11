"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Eye,
  Route,
  Truck,
  Users,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import BlueprintBackground from "../../BlueprintBackground";

type Edge = "north" | "east" | "south" | "west";

type ContextEdge = {
  id: Edge;
  label: string;
  condition: string;
  note: string;
  rgb: string;
};

const EDGES: readonly ContextEdge[] = [
  { id: "north", label: "North", condition: "Neighboring building", note: "privacy, shadow, shared edge", rgb: "148, 163, 184" },
  { id: "east", label: "East", condition: "Service lane", note: "deliveries, utilities, back-of-house", rgb: "251, 146, 60" },
  { id: "south", label: "South", condition: "Public street", note: "visibility, pedestrians, vehicles, noise", rgb: "56, 189, 248" },
  { id: "west", label: "West", condition: "Landscape edge", note: "trees, quieter outlook, pedestrian path", rgb: "74, 222, 128" },
] as const;

const PUBLIC_CHOICES: readonly Edge[] = ["south", "west", "east"];
const SERVICE_CHOICES: readonly Edge[] = ["east", "south", "north"];
const OUTLOOK_CHOICES: readonly Edge[] = ["west", "south", "north", "east"];
const NOISE_CHOICES: readonly Edge[] = ["south", "east", "north", "west"];

export default function AccessSurroundingsPage() {
  const [publicEdge, setPublicEdge] = useState<Edge>("south");
  const [serviceEdge, setServiceEdge] = useState<Edge>("east");
  const [outlookEdge, setOutlookEdge] = useState<Edge>("west");
  const [noiseEdge, setNoiseEdge] = useState<Edge>("south");

  const relationships = useMemo(() => ({
    sharedArrivalEdge: publicEdge === serviceEdge,
    outlookNoiseConflict: outlookEdge === noiseEdge,
    publicOutlookAligned: publicEdge === outlookEdge,
    serviceNeighborConflict: serviceEdge === "north",
  }), [noiseEdge, outlookEdge, publicEdge, serviceEdge]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a111a] text-slate-100 selection:bg-violet-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-54"><BlueprintBackground /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_82%_14%,rgba(192,132,252,0.08),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(56,189,248,0.06),transparent_27%),linear-gradient(to_bottom,rgba(10,17,26,0.16),rgba(3,9,15,0.92))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(192,132,252,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.022)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Architecture", href: "/applied-science/architecture" },
            { label: "Site & Context", href: "/applied-science/architecture/site-context" },
            { label: "Access & Surroundings" },
          ]}
          eyebrow="Edges · Arrival · Service · Neighbors · Views · Noise"
          icon={Route}
          title={<span>Access & Surroundings</span>}
          subtitle="Treat every site edge as a relationship with streets, neighbors, landscape, movement, views, noise, and service rather than as an empty border around the project."
          accentRgb="192, 132, 252"
          titleClassName="font-serif text-[clamp(2.7rem,4.9vw,5.15rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-violet-300/[0.13]"
          aside={<div className="rounded-full border border-violet-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-violet-200/85 backdrop-blur-md">every edge connects to something</div>}
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-violet-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/72">Core idea</div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">A site edge is an interface, not a line that ends the design problem.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">Entrances connect to public movement; service access connects to logistics; windows face views, neighbors, sun, or noise; landscape edges connect to ecological and pedestrian systems. Good site planning coordinates those relationships instead of choosing doors and driveways in isolation.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <CoreFact icon={Users} label="Public arrival" text="Pedestrian clarity, visibility, accessibility, transit, drop-off, and street presence shape how people enter." rgb="56, 189, 248" />
            <CoreFact icon={Truck} label="Service access" text="Deliveries, waste, maintenance, utilities, and staff movement often need different routes and operating conditions." rgb="251, 146, 60" />
            <CoreFact icon={Building2} label="Surroundings" text="Neighbors, landscape, streets, views, noise, and public space keep affecting the project beyond its property line." rgb="192, 132, 252" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-violet-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300/75">Edge relationship studio</div>
              <p className="mt-1 text-[13px] text-slate-500">Move four design intentions independently and watch the edge relationships change.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">arrival + service + outlook + disturbance</div>
          </div>

          <div className="grid items-stretch gap-3 xl:grid-cols-[320px_minmax(520px,1fr)_350px]">
            <div className="rounded-[20px] border border-violet-200/[0.08] bg-[#100c19]/72 p-4">
              <ChoiceGroup icon={Users} label="Public arrival edge" choices={PUBLIC_CHOICES} value={publicEdge} onChange={setPublicEdge} rgb="56, 189, 248" />
              <ChoiceGroup icon={Truck} label="Service access edge" choices={SERVICE_CHOICES} value={serviceEdge} onChange={setServiceEdge} rgb="251, 146, 60" />
              <ChoiceGroup icon={Eye} label="Preferred outlook" choices={OUTLOOK_CHOICES} value={outlookEdge} onChange={setOutlookEdge} rgb="74, 222, 128" />
              <ChoiceGroup icon={Volume2} label="Illustrative noise source" choices={NOISE_CHOICES} value={noiseEdge} onChange={setNoiseEdge} rgb="244, 114, 182" />
            </div>

            <EdgeDiagram publicEdge={publicEdge} serviceEdge={serviceEdge} outlookEdge={outlookEdge} noiseEdge={noiseEdge} />

            <div className="rounded-[20px] border border-sky-200/[0.08] bg-[#061621]/76 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-300/70">Read the tradeoffs</div>
              <div className="mt-3 grid gap-2">
                <RelationshipState active={relationships.sharedArrivalEdge} title="Public + service share one edge" activeText="They need coordination so deliveries and back-of-house movement do not casually dominate the public arrival." inactiveText="Public and service approaches currently use different site edges." rgb="251, 146, 60" />
                <RelationshipState active={relationships.outlookNoiseConflict} title="Outlook faces the noise source" activeText="The desired view and the disturbance come from the same direction, creating a real design tradeoff." inactiveText="The preferred outlook and illustrative noise source currently come from different edges." rgb="244, 114, 182" />
                <RelationshipState active={relationships.publicOutlookAligned} title="Arrival and outlook align" activeText="The public approach could potentially frame the preferred outlook, depending on program and geometry." inactiveText="The public arrival and preferred outlook currently emphasize different edges." rgb="74, 222, 128" />
                <RelationshipState active={relationships.serviceNeighborConflict} title="Service meets the neighbor edge" activeText="Service noise, doors, vehicles, or screening may need special coordination with the neighboring building." inactiveText="Service access currently avoids the illustrated north neighbor edge." rgb="192, 132, 252" />
              </div>
              <div className="mt-3 rounded-[15px] border border-white/[0.05] bg-black/[0.14] p-3"><div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-700">No score on purpose</div><p className="mt-1.5 text-[10px] leading-4 text-slate-600">None of these states is automatically good or bad. They reveal relationships that need architectural judgment, project-specific priorities, and more detailed site information.</p></div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-3">
          <ReferenceCard title="Separate flows when they truly conflict" text="Public, staff, service, emergency, and vehicle movement may need different routes, but unnecessary separation can also waste space and complicate operations." />
          <ReferenceCard title="A view is not just a window direction" text="Outlooks are shaped by room use, eye level, foreground, privacy, glare, landscape, neighboring development, and what may change over time." />
          <ReferenceCard title="Street relationship is architectural" text="Entrances, setbacks, porches, storefronts, lobbies, landscape, parking, service doors, and facade transparency all influence how a building participates in public space." />
        </section>

        <nav className="mt-3 pb-8" aria-label="Access and surroundings navigation">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/applied-science/architecture/site-context/topography-water" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-emerald-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-emerald-300/[0.18]"><ArrowLeft size={15} className="text-emerald-300 transition-transform group-hover:-translate-x-0.5" /><span><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Previous lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Topography & Water</strong></span></Link>
            <Link href="/applied-science/architecture" className="flex min-h-[72px] items-center justify-end rounded-[18px] border border-amber-300/[0.10] bg-black/[0.20] px-4 py-3 text-right transition-colors hover:border-amber-300/[0.18]"><span><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Complete the unit</span><strong className="mt-0.5 block text-[14px] text-slate-200">Return to Architecture</strong></span></Link>
          </div>
        </nav>
      </div>
    </main>
  );
}

function EdgeDiagram({ publicEdge, serviceEdge, outlookEdge, noiseEdge }: { publicEdge: Edge; serviceEdge: Edge; outlookEdge: Edge; noiseEdge: Edge }) {
  const point = (edge: Edge, offset = 0) => {
    if (edge === "north") return { x: 310 + offset, y: 78 };
    if (edge === "south") return { x: 310 + offset, y: 422 };
    if (edge === "east") return { x: 520, y: 250 + offset };
    return { x: 100, y: 250 + offset };
  };
  const center = { x: 310, y: 250 };
  const pub = point(publicEdge, -22);
  const service = point(serviceEdge, 22);
  const outlook = point(outlookEdge, -45);
  const noise = point(noiseEdge, 45);
  return <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[20px] border border-violet-200/[0.10] bg-[#08111a]/86 p-4"><div className="absolute left-4 top-4 z-10"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Hypothetical site edges</div><div className="mt-1 text-[9px] text-violet-300/65">fixed context · movable design intentions</div></div><svg viewBox="0 0 620 500" className="w-full max-w-[680px]" role="img" aria-label="Site edge diagram showing public entry, service, outlook, noise, and surrounding conditions"><defs><pattern id="edge-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(192,132,252,0.045)" strokeWidth="1" /></pattern><marker id="public-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#38bdf8" /></marker><marker id="service-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fb923c" /></marker></defs><rect width="620" height="500" fill="url(#edge-grid)" /><rect x="120" y="95" width="380" height="310" rx="6" fill="rgba(125,211,252,0.018)" stroke="rgba(226,232,240,0.34)" strokeWidth="2" /><rect x="205" y="165" width="210" height="170" rx="8" fill="rgba(192,132,252,0.055)" stroke="rgba(216,180,254,0.55)" strokeWidth="2" /><text x="310" y="250" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="600">BUILDING / PROGRAM</text><text x="310" y="270" textAnchor="middle" fill="#64748b" fontSize="9">placement simplified for edge study</text><rect x="115" y="37" width="390" height="40" fill="rgba(148,163,184,0.10)" stroke="rgba(148,163,184,0.26)"/><text x="310" y="61" textAnchor="middle" fill="#cbd5e1" fontSize="10">NORTH · NEIGHBORING BUILDING</text><rect x="530" y="90" width="54" height="320" fill="rgba(251,146,60,0.07)" stroke="rgba(251,146,60,0.25)"/><text x="558" y="250" textAnchor="middle" fill="#fdba74" fontSize="9" transform="rotate(90 558 250)">EAST · SERVICE LANE</text><rect x="65" y="425" width="490" height="45" fill="rgba(56,189,248,0.07)" stroke="rgba(56,189,248,0.25)"/><text x="310" y="452" textAnchor="middle" fill="#7dd3fc" fontSize="9">SOUTH · PUBLIC STREET</text><rect x="35" y="90" width="58" height="320" fill="rgba(74,222,128,0.07)" stroke="rgba(74,222,128,0.25)"/><text x="63" y="250" textAnchor="middle" fill="#86efac" fontSize="9" transform="rotate(-90 63 250)">WEST · LANDSCAPE EDGE</text><line x1={pub.x} y1={pub.y} x2={center.x} y2={center.y} stroke="#38bdf8" strokeWidth="5" markerEnd="url(#public-arrow)" opacity="0.82"/><line x1={service.x} y1={service.y} x2={center.x} y2={center.y} stroke="#fb923c" strokeWidth="5" markerEnd="url(#service-arrow)" opacity="0.78"/><line x1={center.x} y1={center.y} x2={outlook.x} y2={outlook.y} stroke="#4ade80" strokeWidth="4" strokeDasharray="8 6" opacity="0.74"/><circle cx={outlook.x} cy={outlook.y} r="7" fill="#4ade80"/><path d={`M${noise.x - 12} ${noise.y - 8} q12 -10 24 0 q-12 10 -24 20 q12 10 24 0`} fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.75"/><text x={pub.x} y={pub.y - 12} textAnchor="middle" fill="#7dd3fc" fontSize="9">PUBLIC</text><text x={service.x} y={service.y + 18} textAnchor="middle" fill="#fdba74" fontSize="9">SERVICE</text><text x={outlook.x} y={outlook.y - 12} textAnchor="middle" fill="#86efac" fontSize="9">OUTLOOK</text><text x={noise.x} y={noise.y + 26} textAnchor="middle" fill="#f9a8d4" fontSize="9">NOISE</text></svg><div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/[0.05] bg-black/60 px-3 py-2 text-[9px] text-slate-600 backdrop-blur-md">The surrounding edges are fixed only for this teaching example. Real context must be mapped from the actual site.</div></div>;
}

function ChoiceGroup({ icon: Icon, label, choices, value, onChange, rgb }: { icon: LucideIcon; label: string; choices: readonly Edge[]; value: Edge; onChange: (edge: Edge) => void; rgb: string }) { return <div className="mb-3 rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3"><div className="flex items-center gap-2"><Icon size={13} style={{ color: `rgb(${rgb})` }} /><span className="text-[10px] font-semibold text-slate-400">{label}</span></div><div className="mt-2 grid grid-cols-2 gap-1.5">{choices.map((edge) => <button key={edge} type="button" onClick={() => onChange(edge)} className={`rounded-lg border px-2 py-2 text-[9px] capitalize ${value === edge ? "text-white" : "border-white/[0.04] bg-black/[0.13] text-slate-600"}`} style={value === edge ? { borderColor: `rgba(${rgb},0.28)`, background: `rgba(${rgb},0.06)`, color: `rgb(${rgb})` } : undefined}>{edge}</button>)}</div></div>; }
function RelationshipState({ active, title, activeText, inactiveText, rgb }: { active: boolean; title: string; activeText: string; inactiveText: string; rgb: string }) { return <div className="rounded-[14px] border p-3" style={{ borderColor: `rgba(${rgb},${active ? 0.18 : 0.06})`, background: `rgba(${rgb},${active ? 0.035 : 0.008})` }}><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: active ? `rgb(${rgb})` : "rgb(51,65,85)" }} /><strong className="text-[10px] text-slate-300">{title}</strong></div><p className="mt-1.5 text-[9px] leading-4 text-slate-600">{active ? activeText : inactiveText}</p></div>; }
function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) { return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>; }
function ReferenceCard({ title, text }: { title: string; text: string }) { return <div className="rounded-[18px] border border-violet-200/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl"><h3 className="text-[13px] font-semibold text-slate-200">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
