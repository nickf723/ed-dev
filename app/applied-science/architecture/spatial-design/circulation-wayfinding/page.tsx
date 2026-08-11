"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  GitBranch,
  MapPin,
  Route,
  Signpost,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import BlueprintBackground from "../../BlueprintBackground";

type NodeId = "entry" | "lobby" | "desk" | "stacks" | "reading" | "staff" | "restroom";
type Node = { id: NodeId; label: string; short: string; x: number; y: number; rgb: string };
type Edge = { id: string; a: NodeId; b: NodeId; label: string };

const NODES: readonly Node[] = [
  { id: "entry", label: "Entry", short: "EN", x: 62, y: 225, rgb: "56, 189, 248" },
  { id: "lobby", label: "Lobby", short: "LB", x: 155, y: 225, rgb: "251, 191, 36" },
  { id: "desk", label: "Service Desk", short: "SD", x: 245, y: 125, rgb: "74, 222, 128" },
  { id: "stacks", label: "Stacks", short: "ST", x: 350, y: 135, rgb: "34, 211, 238" },
  { id: "reading", label: "Reading", short: "RD", x: 440, y: 235, rgb: "192, 132, 252" },
  { id: "staff", label: "Staff", short: "SW", x: 235, y: 340, rgb: "244, 114, 182" },
  { id: "restroom", label: "Restroom", short: "RR", x: 360, y: 345, rgb: "251, 146, 60" },
] as const;

const EDGES: readonly Edge[] = [
  { id: "entry-lobby", a: "entry", b: "lobby", label: "Entry ↔ Lobby" },
  { id: "lobby-desk", a: "lobby", b: "desk", label: "Lobby ↔ Desk" },
  { id: "lobby-stacks", a: "lobby", b: "stacks", label: "Lobby ↔ Stacks" },
  { id: "lobby-staff", a: "lobby", b: "staff", label: "Lobby ↔ Staff" },
  { id: "desk-stacks", a: "desk", b: "stacks", label: "Desk ↔ Stacks" },
  { id: "desk-staff", a: "desk", b: "staff", label: "Desk ↔ Staff" },
  { id: "stacks-reading", a: "stacks", b: "reading", label: "Stacks ↔ Reading" },
  { id: "stacks-restroom", a: "stacks", b: "restroom", label: "Stacks ↔ Restroom" },
  { id: "reading-restroom", a: "reading", b: "restroom", label: "Reading ↔ Restroom" },
  { id: "staff-restroom", a: "staff", b: "restroom", label: "Staff ↔ Restroom" },
] as const;

const PRESETS = {
  spine: ["entry-lobby", "lobby-desk", "lobby-stacks", "desk-stacks", "stacks-reading", "stacks-restroom", "reading-restroom", "lobby-staff", "desk-staff", "staff-restroom"],
  loop: ["entry-lobby", "lobby-desk", "desk-stacks", "stacks-reading", "reading-restroom", "staff-restroom", "desk-staff", "lobby-staff", "stacks-restroom"],
  sparse: ["entry-lobby", "lobby-desk", "desk-stacks", "stacks-reading", "stacks-restroom", "staff-restroom", "desk-staff"],
} as const;
const PRESET_META = [
  { id: "spine", label: "Direct spine", note: "a clear public route with several shortcuts" },
  { id: "loop", label: "Loop", note: "multiple ways to circulate through the library" },
  { id: "sparse", label: "Sparse network", note: "fewer connections create longer and more fragile routes" },
] as const;
const DESTINATIONS: readonly NodeId[] = ["desk", "stacks", "reading", "restroom", "staff"];

export default function CirculationWayfindingPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => edgeState(PRESETS.spine));
  const [activePreset, setActivePreset] = useState<string | null>("spine");
  const [destination, setDestination] = useState<NodeId>("reading");
  const routeResult = useMemo(() => shortestRoute("entry", destination, enabled), [destination, enabled]);
  const highlightedEdges = useMemo(() => {
    const keys = new Set<string>();
    if (!routeResult.path) return keys;
    for (let i = 0; i < routeResult.path.length - 1; i += 1) {
      const edge = EDGES.find((candidate) => connects(candidate, routeResult.path![i], routeResult.path![i + 1]));
      if (edge) keys.add(edge.id);
    }
    return keys;
  }, [routeResult.path]);
  const applyPreset = (id: string) => { const paths = PRESETS[id as keyof typeof PRESETS] ?? PRESETS.spine; setEnabled(edgeState(paths)); setActivePreset(id); };
  const toggleEdge = (id: string) => { setEnabled((current) => ({ ...current, [id]: !current[id] })); setActivePreset(null); };
  const destinationNode = nodeById(destination);
  const decisions = routeResult.path ? Math.max(routeResult.path.length - 2, 0) : null;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06121d] text-slate-100 selection:bg-violet-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-56"><BlueprintBackground /></div><div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_14%,rgba(192,132,252,0.09),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(56,189,248,0.06),transparent_27%),linear-gradient(to_bottom,rgba(6,18,29,0.16),rgba(3,9,16,0.92))]" /><div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(125,211,252,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.025)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applied Sciences", href: "/applied-science" }, { label: "Architecture", href: "/applied-science/architecture" }, { label: "Spatial Design & Program", href: "/applied-science/architecture/spatial-design" }, { label: "Circulation & Wayfinding" }]} eyebrow="Origin · Destination · Paths · Decisions · Cues" icon={Route} title={<span>Circulation & Wayfinding</span>} subtitle="Treat movement as a network of connected spaces, then make that network understandable enough for people to navigate without solving a puzzle." accentRgb="192, 132, 252" titleClassName="font-serif text-[clamp(2.7rem,4.8vw,5.1rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]" iconClassName="rounded-[16px]" headerClassName="border-violet-300/[0.13]" aside={<div className="rounded-full border border-violet-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-violet-200/85 backdrop-blur-md">paths + decisions + cues</div>} />
        <section className="mt-3 grid gap-3 rounded-[24px] border border-violet-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]"><div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/72">Core idea</div><h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">A route exists only if the circulation network connects origin to destination.</h2><p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">Architecture does not merely place rooms; it connects them. Every doorway, corridor, lobby, stair, and threshold changes which routes are possible. Wayfinding asks a second question: can people understand those possible routes at the moments when they must choose where to go?</p></div><div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1"><CoreFact icon={MapPin} label="Origin + destination" text="Movement has a starting point and a goal." rgb="56, 189, 248" /><CoreFact icon={GitBranch} label="Decision points" text="Intersections create choices that need hierarchy, visibility, landmarks, or signs." rgb="192, 132, 252" /><CoreFact icon={Signpost} label="Wayfinding cues" text="Spatial form and information help people choose correctly without trial and error." rgb="251, 191, 36" /></div></section>
        <section className="mt-3 rounded-[26px] border border-violet-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"><div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between"><div><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300/75">Circulation studio</div><p className="mt-1 text-[13px] text-slate-500">Choose a destination, then open or close individual path connections.</p></div><div className="font-mono text-[11px] text-slate-600">network → route → decision points</div></div><div className="grid items-stretch gap-3 xl:grid-cols-[330px_minmax(500px,1fr)_320px]"><div className="rounded-[20px] border border-violet-200/[0.08] bg-[#0d0919]/76 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Network presets</div><div className="mt-3 grid gap-2">{PRESET_META.map((preset) => <button key={preset.id} type="button" onClick={() => applyPreset(preset.id)} className={`rounded-[14px] border p-3 text-left ${activePreset === preset.id ? "border-violet-300/[0.26] bg-violet-400/[0.055]" : "border-white/[0.045] bg-black/[0.14]"}`}><strong className="text-[11px] text-slate-200">{preset.label}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">{preset.note}</p></button>)}</div><div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Connections</div><div className="mt-2 grid gap-1.5">{EDGES.map((edge) => <button key={edge.id} type="button" onClick={() => toggleEdge(edge.id)} className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left ${enabled[edge.id] ? "border-violet-300/[0.14] bg-violet-400/[0.025]" : "border-white/[0.04] bg-black/[0.12] opacity-50"}`}><span className="text-[9px] text-slate-500">{edge.label}</span><span className={`h-2 w-2 rounded-full ${enabled[edge.id] ? "bg-violet-300" : "bg-slate-700"}`} /></button>)}</div></div><CirculationGraph enabled={enabled} highlightedEdges={highlightedEdges} routePath={routeResult.path} onToggle={toggleEdge} destination={destination} /><div className="rounded-[20px] border border-sky-200/[0.08] bg-[#061221]/76 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-300/70">Choose destination</div><div className="mt-3 grid grid-cols-2 gap-2">{DESTINATIONS.map((id) => { const node = nodeById(id); return <button key={id} type="button" onClick={() => setDestination(id)} className={`rounded-xl border px-3 py-2 text-[10px] ${destination === id ? "border-sky-300/[0.26] bg-sky-400/[0.055] text-sky-200" : "border-white/[0.045] bg-black/[0.14] text-slate-500"}`}>{node.label}</button>; })}</div><div className="mt-4 rounded-[15px] border border-white/[0.05] bg-black/[0.16] p-3"><div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Entry → {destinationNode.label}</div>{routeResult.path ? <><div className="mt-2 font-mono text-[12px] text-violet-200">{routeResult.path.map((id) => nodeById(id).short).join(" → ")}</div><div className="mt-3 grid grid-cols-2 gap-2"><Metric label="Route length" value={`${Math.round(routeResult.distance)} plan units`} /><Metric label="Intermediate decisions" value={String(decisions)} /></div></> : <div className="mt-2 rounded-xl border border-rose-300/[0.12] bg-rose-400/[0.025] p-3 text-[11px] leading-5 text-rose-200/80">No route currently connects the entry to this destination.</div>}</div><div className="mt-3 rounded-[15px] border border-white/[0.05] bg-black/[0.14] p-3"><div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Wayfinding is more than shortest path</div><p className="mt-1.5 text-[10px] leading-4 text-slate-500">This toy network tracks connection, route length, and intermediate decisions. Real wayfinding also depends on sightlines, spatial hierarchy, landmarks, signage, lighting, familiarity, crowding, accessibility, and many other cues.</p></div></div></div></section>
        <section className="mt-3 grid gap-3 lg:grid-cols-3"><ReferenceCard title="Movement consumes space" text="Lobbies, corridors, stairs, queues, turning areas, thresholds, and waiting zones are part of the program, not leftover gaps between rooms." /><ReferenceCard title="More connections are not automatically better" text="Extra paths can shorten routes and add flexibility, but they can also complicate security, privacy, supervision, acoustics, and orientation." /><ReferenceCard title="Clarity can beat distance" text="A slightly longer route may be easier to understand when it follows a strong spine, visible landmark, or simple sequence of spaces." /></section>
        <nav className="mt-3 pb-8" aria-label="Circulation and wayfinding navigation"><div className="grid gap-3 sm:grid-cols-2"><Link href="/applied-science/architecture/spatial-design/adjacency-zoning" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-emerald-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-emerald-300/[0.18]"><ArrowLeft size={15} className="text-emerald-300 transition-transform group-hover:-translate-x-0.5" /><span><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Previous lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Adjacency & Zoning</strong></span></Link><Link href="/applied-science/architecture/spatial-design/human-scale-accessibility" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-amber-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-amber-300/[0.18]"><span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Next lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Human Scale & Accessibility</strong></span><ArrowRight size={15} className="text-amber-300 transition-transform group-hover:translate-x-0.5" /></Link></div></nav>
      </div>
    </main>
  );
}

function CirculationGraph({ enabled, highlightedEdges, routePath, onToggle, destination }: { enabled: Record<string, boolean>; highlightedEdges: Set<string>; routePath: NodeId[] | null; onToggle: (id: string) => void; destination: NodeId }) {
  const routeNodes = new Set(routePath ?? []);
  return <div className="relative flex min-h-[570px] items-center justify-center overflow-hidden rounded-[20px] border border-violet-200/[0.10] bg-[#04111c]/86 p-4"><div className="absolute left-4 top-4 z-10"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Circulation network</div><div className="mt-1 text-[9px] text-violet-300/65">click a path segment to open / close it</div></div><svg viewBox="0 0 500 440" className="w-full max-w-[560px]" role="img" aria-label="Circulation network from the entry to a selected destination"><defs><pattern id="circ-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(125,211,252,0.06)" strokeWidth="1" /></pattern></defs><rect width="500" height="440" fill="url(#circ-grid)" />{EDGES.map((edge) => { const a = nodeById(edge.a); const b = nodeById(edge.b); const active = enabled[edge.id]; const highlighted = highlightedEdges.has(edge.id); return <g key={edge.id} onClick={() => onToggle(edge.id)} className="cursor-pointer"><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth="18" /><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={highlighted ? "#c084fc" : active ? "rgba(148,163,184,0.42)" : "rgba(71,85,105,0.18)"} strokeWidth={highlighted ? 6 : active ? 3 : 2} strokeDasharray={active ? undefined : "5 7"} /></g>; })}{NODES.map((node) => { const onRoute = routeNodes.has(node.id); const isDestination = node.id === destination; return <g key={node.id}><circle cx={node.x} cy={node.y} r={isDestination ? 31 : 27} fill={`rgba(${node.rgb},${onRoute ? 0.18 : 0.08})`} stroke={`rgb(${node.rgb})`} strokeWidth={isDestination ? 4 : onRoute ? 3 : 2} /><text x={node.x} y={node.y - 1} textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">{node.short}</text><text x={node.x} y={node.y + 13} textAnchor="middle" fill="rgba(203,213,225,0.58)" fontSize="8">{node.label}</text>{onRoute && node.id !== "entry" && node.id !== destination ? <circle cx={node.x} cy={node.y} r="36" fill="none" stroke="rgba(251,191,36,0.45)" strokeWidth="1.5" strokeDasharray="4 5" /> : null}</g>; })}</svg><div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/[0.05] bg-black/60 px-3 py-2 text-[9px] text-slate-600 backdrop-blur-md">violet = current route · amber halo = intermediate decision point · dashed gray = closed connection</div></div>;
}

function shortestRoute(start: NodeId, destination: NodeId, enabled: Record<string, boolean>) { const distances = new Map<NodeId, number>(NODES.map((node) => [node.id, Number.POSITIVE_INFINITY])); const previous = new Map<NodeId, NodeId | null>(NODES.map((node) => [node.id, null])); const unvisited = new Set<NodeId>(NODES.map((node) => node.id)); distances.set(start, 0); while (unvisited.size > 0) { let current: NodeId | null = null; let best = Number.POSITIVE_INFINITY; for (const id of unvisited) { const distance = distances.get(id) ?? Number.POSITIVE_INFINITY; if (distance < best) { best = distance; current = id; } } if (current === null || !Number.isFinite(best)) break; unvisited.delete(current); if (current === destination) break; for (const edge of EDGES) { if (!enabled[edge.id]) continue; const neighbor = edge.a === current ? edge.b : edge.b === current ? edge.a : null; if (!neighbor || !unvisited.has(neighbor)) continue; const nextDistance = best + edgeLength(edge); if (nextDistance < (distances.get(neighbor) ?? Number.POSITIVE_INFINITY)) { distances.set(neighbor, nextDistance); previous.set(neighbor, current); } } } const distance = distances.get(destination) ?? Number.POSITIVE_INFINITY; if (!Number.isFinite(distance)) return { path: null as NodeId[] | null, distance }; const path: NodeId[] = []; let cursor: NodeId | null = destination; while (cursor) { path.unshift(cursor); cursor = previous.get(cursor) ?? null; } if (path[0] !== start) return { path: null as NodeId[] | null, distance: Number.POSITIVE_INFINITY }; return { path, distance }; }
function edgeState(ids: readonly string[]) { const state: Record<string, boolean> = {}; for (const edge of EDGES) state[edge.id] = ids.includes(edge.id); return state; }
function edgeLength(edge: Edge) { const a = nodeById(edge.a); const b = nodeById(edge.b); return Math.hypot(a.x - b.x, a.y - b.y); }
function connects(edge: Edge, a: NodeId, b: NodeId) { return (edge.a === a && edge.b === b) || (edge.a === b && edge.b === a); }
function nodeById(id: NodeId) { return NODES.find((node) => node.id === id) ?? NODES[0]; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/[0.045] bg-white/[0.012] p-2.5"><div className="text-[8px] uppercase tracking-[0.08em] text-slate-700">{label}</div><div className="mt-1 font-mono text-[10px] text-violet-200">{value}</div></div>; }
function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) { return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>; }
function ReferenceCard({ title, text }: { title: string; text: string }) { return <div className="rounded-[18px] border border-violet-200/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl"><h3 className="text-[13px] font-semibold text-slate-200">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
