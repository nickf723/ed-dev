"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  LayoutGrid,
  Network,
  Table2,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import BlueprintBackground from "../../BlueprintBackground";

type Relation = "near" | "flexible" | "separate";
type RoomId = "entry" | "desk" | "stacks" | "reading" | "staff" | "restroom";

type Room = {
  id: RoomId;
  label: string;
  short: string;
  zone: "public" | "shared" | "staff";
  rgb: string;
  x: number;
  y: number;
};

const ROOMS: readonly Room[] = [
  { id: "entry", label: "Entry", short: "EN", zone: "public", rgb: "56, 189, 248", x: 85, y: 240 },
  { id: "desk", label: "Service Desk", short: "SD", zone: "shared", rgb: "251, 191, 36", x: 190, y: 150 },
  { id: "stacks", label: "Book Stacks", short: "ST", zone: "public", rgb: "74, 222, 128", x: 335, y: 135 },
  { id: "reading", label: "Reading", short: "RD", zone: "public", rgb: "34, 211, 238", x: 420, y: 250 },
  { id: "staff", label: "Staff Workroom", short: "SW", zone: "staff", rgb: "192, 132, 252", x: 245, y: 340 },
  { id: "restroom", label: "Restroom", short: "RR", zone: "shared", rgb: "244, 114, 182", x: 410, y: 370 },
] as const;

const PRESETS: Record<string, Record<string, Relation>> = {
  balanced: {
    "desk-entry": "near",
    "entry-restroom": "near",
    "desk-staff": "near",
    "desk-stacks": "near",
    "reading-stacks": "near",
    "reading-staff": "separate",
    "entry-staff": "separate",
  },
  quiet: {
    "desk-entry": "near",
    "reading-stacks": "near",
    "entry-reading": "separate",
    "reading-staff": "separate",
    "reading-restroom": "separate",
    "desk-staff": "near",
  },
  service: {
    "desk-entry": "near",
    "desk-staff": "near",
    "desk-stacks": "near",
    "stacks-staff": "near",
    "entry-restroom": "near",
    "entry-staff": "separate",
  },
};

const PRESET_META = [
  { id: "balanced", label: "Balanced library", note: "mix public clarity, quiet reading, and staff support" },
  { id: "quiet", label: "Quiet-first", note: "buffer reading from entry, service, and support activity" },
  { id: "service", label: "Service-first", note: "shorten staff and collection support relationships" },
] as const;

function pairKey(a: RoomId, b: RoomId) {
  return [a, b].sort().join("-");
}

function roomById(id: RoomId) {
  return ROOMS.find((room) => room.id === id) ?? ROOMS[0];
}

export default function AdjacencyZoningPage() {
  const [relations, setRelations] = useState<Record<string, Relation>>(() => ({ ...PRESETS.balanced }));
  const [activePreset, setActivePreset] = useState<string | null>("balanced");
  const [selectedPair, setSelectedPair] = useState<[RoomId, RoomId]>(["entry", "desk"]);

  const relationFor = (a: RoomId, b: RoomId): Relation => relations[pairKey(a, b)] ?? "flexible";

  const cycleRelation = (a: RoomId, b: RoomId) => {
    if (a === b) return;
    const current = relationFor(a, b);
    const next: Relation = current === "near" ? "flexible" : current === "flexible" ? "separate" : "near";
    setRelations((currentRelations) => ({ ...currentRelations, [pairKey(a, b)]: next }));
    setSelectedPair([a, b]);
    setActivePreset(null);
  };

  const applyPreset = (id: string) => {
    setRelations({ ...(PRESETS[id] ?? PRESETS.balanced) });
    setActivePreset(id);
    setSelectedPair(["entry", "desk"]);
  };

  const selectedRelation = relationFor(selectedPair[0], selectedPair[1]);
  const selectedA = roomById(selectedPair[0]);
  const selectedB = roomById(selectedPair[1]);

  const counts = useMemo(() => {
    let near = 0;
    let separate = 0;
    for (let i = 0; i < ROOMS.length; i += 1) {
      for (let j = i + 1; j < ROOMS.length; j += 1) {
        const relation = relationFor(ROOMS[i].id, ROOMS[j].id);
        if (relation === "near") near += 1;
        if (relation === "separate") separate += 1;
      }
    }
    return { near, separate, flexible: 15 - near - separate };
  }, [relations]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06121d] text-slate-100 selection:bg-emerald-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-56"><BlueprintBackground /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_14%,rgba(74,222,128,0.09),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(56,189,248,0.06),transparent_27%),linear-gradient(to_bottom,rgba(6,18,29,0.16),rgba(3,9,16,0.92))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(125,211,252,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.025)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Architecture", href: "/applied-science/architecture" },
            { label: "Spatial Design & Program", href: "/applied-science/architecture/spatial-design" },
            { label: "Adjacency & Zoning" },
          ]}
          eyebrow="Near · Flexible · Separate · Public · Shared · Staff"
          icon={Network}
          title={<span>Adjacency & Zoning</span>}
          subtitle="Describe which spaces should connect, which may float, and which need separation before translating those relationships into a floor plan."
          accentRgb="74, 222, 128"
          titleClassName="font-serif text-[clamp(2.8rem,5vw,5.25rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-emerald-300/[0.13]"
          aside={<div className="rounded-full border border-emerald-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-emerald-200/85 backdrop-blur-md">relationships before geometry</div>}
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-emerald-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/72">Core idea</div><h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">Not every room relationship deserves the same strength.</h2><p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">Some spaces benefit from quick direct proximity, some have no strong preference, and others need buffering because of privacy, noise, service, security, or incompatible activity. Adjacency diagrams encode those intentions before wall geometry makes them expensive to change.</p></div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1"><CoreFact icon={Boxes} label="Near" text="Favor short, convenient connection. Near does not always mean sharing a wall." rgb="74, 222, 128" /><CoreFact icon={LayoutGrid} label="Flexible" text="No strong adjacency requirement; other constraints may decide the relationship." rgb="148, 163, 184" /><CoreFact icon={Waypoints} label="Separate" text="Prefer distance, a buffer, or a controlled transition between incompatible uses." rgb="251, 113, 133" /></div>
        </section>

        <section className="mt-3 rounded-[26px] border border-emerald-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between"><div><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/75">Adjacency studio</div><p className="mt-1 text-[13px] text-slate-500">Click a matrix cell to cycle one relationship. The network redraws immediately.</p></div><div className="font-mono text-[11px] text-slate-600">matrix ↔ relationship graph</div></div>
          <div className="grid items-stretch gap-3 xl:grid-cols-[350px_minmax(500px,1fr)_320px]">
            <div className="rounded-[20px] border border-emerald-200/[0.08] bg-[#07170f]/76 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Design intent</div><div className="mt-3 grid gap-2">{PRESET_META.map((preset) => <button key={preset.id} type="button" onClick={() => applyPreset(preset.id)} className={`rounded-[14px] border p-3 text-left ${activePreset === preset.id ? "border-emerald-300/[0.26] bg-emerald-400/[0.055]" : "border-white/[0.045] bg-black/[0.14]"}`}><strong className="text-[11px] text-slate-200">{preset.label}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">{preset.note}</p></button>)}</div><div className="mt-4 rounded-[15px] border border-white/[0.05] bg-black/[0.14] p-3"><div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Current relationship count</div><div className="mt-2 grid grid-cols-3 gap-2 text-center"><Count value={counts.near} label="near" rgb="74, 222, 128" /><Count value={counts.flexible} label="flex" rgb="148, 163, 184" /><Count value={counts.separate} label="separate" rgb="251, 113, 133" /></div></div><div className="mt-4 text-[10px] leading-5 text-slate-600">Zones add another layer of intent: <span className="text-sky-300">public</span>, <span className="text-amber-300">shared/service</span>, and <span className="text-violet-300">staff</span>. They group spaces by access and use, while adjacency describes pairwise relationships.</div></div>
            <AdjacencyInstrument relations={relations} relationFor={relationFor} onCycle={cycleRelation} selectedPair={selectedPair} />
            <div className="rounded-[20px] border border-sky-200/[0.08] bg-[#061221]/76 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-300/70">Selected pair</div><div className="mt-3 rounded-[15px] border border-white/[0.05] bg-black/[0.16] p-3"><div className="text-[15px] font-semibold text-white">{selectedA.label} ↔ {selectedB.label}</div><div className="mt-2"><RelationBadge relation={selectedRelation} /></div></div><p className="mt-3 text-[11px] leading-5 text-slate-500">{relationExplanation(selectedRelation, selectedA, selectedB)}</p><div className="mt-4 rounded-[15px] border border-white/[0.05] bg-black/[0.14] p-3"><div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">How to read it</div><div className="mt-2 grid gap-2"><Legend relation="near" text="solid green line = proximity preferred" /><Legend relation="flexible" text="no line = relationship can be decided later" /><Legend relation="separate" text="dashed rose line = buffering preferred" /></div></div></div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-3"><ReferenceCard title="Near is not necessarily touching" text="A strong adjacency may mean direct visibility, a short path, or convenient access rather than a shared wall." /><ReferenceCard title="Separate is not disconnected" text="Two spaces can remain reachable while a lobby, corridor, storage zone, acoustic buffer, or controlled door keeps them apart." /><ReferenceCard title="The matrix is not the plan" text="An adjacency matrix records desired relationships. Many different floor plans can satisfy the same relationship pattern." /></section>

        <nav className="mt-3 pb-8" aria-label="Adjacency and zoning navigation"><div className="grid gap-3 sm:grid-cols-2"><Link href="/applied-science/architecture/spatial-design/program-area" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-sky-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-sky-300/[0.18]"><ArrowLeft size={15} className="text-sky-300 transition-transform group-hover:-translate-x-0.5" /><span><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Previous lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Program & Area</strong></span></Link><Link href="/applied-science/architecture/spatial-design/circulation-wayfinding" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-violet-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-violet-300/[0.18]"><span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Next lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Circulation & Wayfinding</strong></span><ArrowRight size={15} className="text-violet-300 transition-transform group-hover:translate-x-0.5" /></Link></div></nav>
      </div>
    </main>
  );
}

function AdjacencyInstrument({ relations, relationFor, onCycle, selectedPair }: { relations: Record<string, Relation>; relationFor: (a: RoomId, b: RoomId) => Relation; onCycle: (a: RoomId, b: RoomId) => void; selectedPair: [RoomId, RoomId] }) {
  return <div className="grid gap-3 rounded-[20px] border border-emerald-200/[0.10] bg-[#04111c]/86 p-4"><div className="rounded-[16px] border border-white/[0.05] bg-black/[0.14] p-3"><div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.10em] text-slate-500"><Table2 size={13} /> Adjacency matrix</div><div className="grid grid-cols-7 gap-1"><div />{ROOMS.map((room) => <div key={room.id} className="flex h-8 items-center justify-center font-mono text-[8px] text-slate-600">{room.short}</div>)}{ROOMS.map((row) => <div key={row.id} className="contents"><div className="flex h-8 items-center justify-start pr-2 text-[9px] text-slate-500">{row.short}</div>{ROOMS.map((col) => { if (row.id === col.id) return <div key={col.id} className="flex h-8 items-center justify-center rounded-md border border-white/[0.03] bg-white/[0.01] text-[8px] text-slate-800">—</div>; const relation = relationFor(row.id, col.id); const selected = pairKey(row.id, col.id) === pairKey(selectedPair[0], selectedPair[1]); return <button key={col.id} type="button" onClick={() => onCycle(row.id, col.id)} aria-label={`${row.label} and ${col.label}: ${relation}. Click to change.`} className={`flex h-8 items-center justify-center rounded-md border font-mono text-[9px] ${selected ? "ring-1 ring-sky-300/40" : ""}`} style={{ borderColor: relationColor(relation, 0.22), background: relationColor(relation, 0.055), color: relationColor(relation, 0.88) }}>{relationSymbol(relation)}</button>; })}</div>)}</div></div><div className="relative min-h-[380px] overflow-hidden rounded-[16px] border border-white/[0.05] bg-black/[0.14] p-3"><div className="absolute left-3 top-3 z-10 text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Relationship graph</div><svg viewBox="0 0 500 440" className="w-full" role="img" aria-label="Bubble relationship diagram for library spaces"><defs><pattern id="adj-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(125,211,252,0.06)" strokeWidth="1" /></pattern></defs><rect width="500" height="440" fill="url(#adj-grid)" />{ROOMS.flatMap((a, i) => ROOMS.slice(i + 1).map((b) => ({ a, b, relation: relations[pairKey(a.id, b.id)] ?? "flexible" }))).filter((edge) => edge.relation !== "flexible").map((edge) => <line key={`${edge.a.id}-${edge.b.id}`} x1={edge.a.x} y1={edge.a.y} x2={edge.b.x} y2={edge.b.y} stroke={edge.relation === "near" ? "#4ade80" : "#fb7185"} strokeWidth={edge.relation === "near" ? 4 : 2.5} strokeDasharray={edge.relation === "separate" ? "8 7" : undefined} opacity={0.55} />)}{ROOMS.map((room) => <g key={room.id}><circle cx={room.x} cy={room.y} r="34" fill={`rgba(${room.rgb},0.12)`} stroke={`rgb(${room.rgb})`} strokeWidth="2" /><text x={room.x} y={room.y - 2} textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">{room.short}</text><text x={room.x} y={room.y + 13} textAnchor="middle" fill="rgba(203,213,225,0.62)" fontSize="8">{room.zone}</text></g>)}</svg></div></div>;
}

function Count({ value, label, rgb }: { value: number; label: string; rgb: string }) { return <div className="rounded-xl border border-white/[0.04] bg-white/[0.012] px-2 py-2"><strong className="block font-mono text-[15px]" style={{ color: `rgb(${rgb})` }}>{value}</strong><span className="text-[8px] uppercase tracking-[0.08em] text-slate-700">{label}</span></div>; }
function RelationBadge({ relation }: { relation: Relation }) { return <span className="inline-flex rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.10em]" style={{ borderColor: relationColor(relation, 0.24), background: relationColor(relation, 0.05), color: relationColor(relation, 0.9) }}>{relation}</span>; }
function Legend({ relation, text }: { relation: Relation; text: string }) { return <div className="flex items-center gap-2 text-[9px] text-slate-600"><span className="h-1.5 w-6 rounded-full" style={{ background: relation === "flexible" ? "rgba(148,163,184,0.25)" : relationColor(relation, 0.75) }} />{text}</div>; }
function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) { return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>; }
function ReferenceCard({ title, text }: { title: string; text: string }) { return <div className="rounded-[18px] border border-emerald-200/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl"><h3 className="text-[13px] font-semibold text-slate-200">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
function relationExplanation(relation: Relation, a: Room, b: Room) { if (relation === "near") return `${a.label} and ${b.label} currently have a strong proximity preference. The design should make their connection convenient without assuming they must share a wall.`; if (relation === "separate") return `${a.label} and ${b.label} currently prefer separation. A buffer, controlled threshold, or extra distance may protect privacy, quiet, security, or incompatible activity.`; return `${a.label} and ${b.label} currently have no strong adjacency preference. Other constraints can decide where they land relative to one another.`; }
function relationSymbol(relation: Relation) { if (relation === "near") return "N"; if (relation === "separate") return "S"; return "·"; }
function relationColor(relation: Relation, alpha: number) { const rgb = relation === "near" ? "74,222,128" : relation === "separate" ? "251,113,133" : "148,163,184"; return `rgba(${rgb},${alpha})`; }
