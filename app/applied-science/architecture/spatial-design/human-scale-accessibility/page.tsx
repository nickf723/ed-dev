"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Accessibility,
  ArrowLeft,
  Eye,
  MoveHorizontal,
  Ruler,
  RotateCcw,
  Users,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import BlueprintBackground from "../../BlueprintBackground";

const PRESETS = [
  { id: "compact", label: "Compact envelope", envelope: 55, side: 12, opening: 90, turn: 115, zone: 125 },
  { id: "wide", label: "Wider envelope", envelope: 78, side: 14, opening: 100, turn: 145, zone: 135 },
  { id: "assisted", label: "Assisted movement", envelope: 96, side: 12, opening: 125, turn: 155, zone: 165 },
] as const;

type PresetId = (typeof PRESETS)[number]["id"];

export default function HumanScaleAccessibilityPage() {
  const [activePreset, setActivePreset] = useState<PresetId | null>("compact");
  const [envelopeWidth, setEnvelopeWidth] = useState(55);
  const [sideClearance, setSideClearance] = useState(12);
  const [openingWidth, setOpeningWidth] = useState(90);
  const [turningEnvelope, setTurningEnvelope] = useState(115);
  const [turningZone, setTurningZone] = useState(125);

  const fit = useMemo(() => {
    const passageNeed = envelopeWidth + sideClearance * 2;
    return {
      passageNeed,
      passageMargin: openingWidth - passageNeed,
      passageFits: openingWidth >= passageNeed,
      turningMargin: turningZone - turningEnvelope,
      turningFits: turningZone >= turningEnvelope,
    };
  }, [envelopeWidth, openingWidth, sideClearance, turningEnvelope, turningZone]);

  const applyPreset = (id: PresetId) => {
    const preset = PRESETS.find((item) => item.id === id) ?? PRESETS[0];
    setActivePreset(id);
    setEnvelopeWidth(preset.envelope);
    setSideClearance(preset.side);
    setOpeningWidth(preset.opening);
    setTurningEnvelope(preset.turn);
    setTurningZone(preset.zone);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06121d] text-slate-100 selection:bg-amber-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-56"><BlueprintBackground /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_14%,rgba(251,191,36,0.09),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(56,189,248,0.06),transparent_27%),linear-gradient(to_bottom,rgba(6,18,29,0.16),rgba(3,9,16,0.92))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(125,211,252,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.025)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences", href: "/applied-science" },
            { label: "Architecture", href: "/applied-science/architecture" },
            { label: "Spatial Design & Program", href: "/applied-science/architecture/spatial-design" },
            { label: "Human Scale & Accessibility" },
          ]}
          eyebrow="Bodies · Devices · Clearance · Turning · Inclusive use"
          icon={Accessibility}
          title={<span>Human Scale & Accessibility</span>}
          subtitle="Size space around the people, devices, tasks, and movement envelopes that must actually fit, rather than designing for one imaginary average body."
          accentRgb="251, 191, 36"
          titleClassName="font-serif text-[clamp(2.65rem,4.7vw,5rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-amber-300/[0.13]"
          aside={<div className="rounded-full border border-amber-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-amber-200/85 backdrop-blur-md">person + task + movement envelope</div>}
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-amber-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/72">Core idea</div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">A dimension only works when the required movement envelope fits inside it.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">People occupy more than a point. Bodies, mobility devices, carried objects, furniture, reach, turning, passing, and assistance all need space. Inclusive spatial design tests several user envelopes instead of treating one body size as the default and everyone else as an exception.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <CoreFact icon={Users} label="Envelope" text="Represent the body, device, object, or assistance pattern that occupies space." rgb="251, 191, 36" />
            <CoreFact icon={MoveHorizontal} label="Clearance" text="Add room to pass, maneuver, reach, transfer, or use the space comfortably." rgb="56, 189, 248" />
            <CoreFact icon={RotateCcw} label="Maneuvering" text="A route can be wide enough to move forward but still fail when turning is required." rgb="192, 132, 252" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-amber-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300/75">Fit studio</div>
              <p className="mt-1 text-[13px] text-slate-500">Illustrative dimensions only. Change the user envelope and available space independently.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">required envelope ≤ available space</div>
          </div>

          <div className="grid items-stretch gap-3 xl:grid-cols-[320px_minmax(500px,1fr)_340px]">
            <div className="rounded-[20px] border border-amber-200/[0.08] bg-[#171109]/72 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Illustrative profiles</div>
              <div className="mt-3 grid gap-2">
                {PRESETS.map((preset) => <button key={preset.id} type="button" onClick={() => applyPreset(preset.id)} className={`rounded-[14px] border p-3 text-left ${activePreset === preset.id ? "border-amber-300/[0.26] bg-amber-400/[0.055]" : "border-white/[0.045] bg-black/[0.14]"}`}><strong className="text-[11px] text-slate-200">{preset.label}</strong><p className="mt-1 font-mono text-[9px] text-slate-600">{preset.envelope} cm envelope · {preset.side} cm side allowance</p></button>)}
              </div>
              <div className="mt-3 grid gap-2">
                <Control label="User / device envelope" value={envelopeWidth} min={40} max={110} suffix=" cm" rgb="251, 191, 36" onChange={(value) => { setActivePreset(null); setEnvelopeWidth(value); }} />
                <Control label="Desired clearance each side" value={sideClearance} min={0} max={30} suffix=" cm" rgb="56, 189, 248" onChange={(value) => { setActivePreset(null); setSideClearance(value); }} />
                <Control label="Available passage / opening" value={openingWidth} min={60} max={160} suffix=" cm" rgb="74, 222, 128" onChange={(value) => { setActivePreset(null); setOpeningWidth(value); }} />
                <Control label="Turning envelope" value={turningEnvelope} min={90} max={190} suffix=" cm" rgb="192, 132, 252" onChange={(value) => { setActivePreset(null); setTurningEnvelope(value); }} />
                <Control label="Available turning zone" value={turningZone} min={90} max={200} suffix=" cm" rgb="244, 114, 182" onChange={(value) => { setActivePreset(null); setTurningZone(value); }} />
              </div>
            </div>

            <FitDiagram envelopeWidth={envelopeWidth} sideClearance={sideClearance} openingWidth={openingWidth} turningEnvelope={turningEnvelope} turningZone={turningZone} fit={fit} />

            <div className="rounded-[20px] border border-sky-200/[0.08] bg-[#061221]/76 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-300/70">Read the fit</div>
              <div className="mt-3 grid gap-2">
                <Readout label="Required passage" value={`${fit.passageNeed} cm`} note={`${envelopeWidth} + 2(${sideClearance})`} passes={fit.passageFits} />
                <Readout label="Available passage" value={`${openingWidth} cm`} note={`${signed(fit.passageMargin)} cm margin`} passes={fit.passageFits} />
                <Readout label="Turning envelope" value={`${turningEnvelope} cm`} note="illustrative maneuvering need" passes={fit.turningFits} />
                <Readout label="Available turning zone" value={`${turningZone} cm`} note={`${signed(fit.turningMargin)} cm margin`} passes={fit.turningFits} />
              </div>
              <div className={`mt-3 rounded-[15px] border p-3 ${fit.passageFits && fit.turningFits ? "border-emerald-300/[0.14] bg-emerald-400/[0.03]" : "border-rose-300/[0.13] bg-rose-400/[0.025]"}`}>
                <strong className={`text-[11px] ${fit.passageFits && fit.turningFits ? "text-emerald-200" : "text-rose-200"}`}>{fit.passageFits && fit.turningFits ? "Both illustrative fit tests pass" : "At least one illustrative fit test fails"}</strong>
                <p className="mt-1.5 text-[10px] leading-4 text-slate-500">This is geometric comparison, not a compliance verdict. Real accessibility requirements depend on jurisdiction, building type, route condition, fixtures, doors, slopes, reach ranges, and many other details.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-3">
          <ReferenceCard icon={Ruler} title="Human scale is plural" text="Design must accommodate variation in body size, posture, mobility devices, carried objects, assistants, children, aging, and temporary limitations." />
          <ReferenceCard icon={Eye} title="Accessibility is not only clearance" text="Vision, hearing, cognition, lighting, contrast, acoustics, signage, controls, fatigue, and sensory conditions can matter as much as physical width." />
          <ReferenceCard icon={Accessibility} title="Minimum compliance is not the whole goal" text="Codes establish enforceable baselines. Inclusive design also asks how independently, comfortably, clearly, and equitably different people can use the space." />
        </section>

        <nav className="mt-3 pb-8" aria-label="Human scale and accessibility navigation">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/applied-science/architecture/spatial-design/circulation-wayfinding" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-violet-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-violet-300/[0.18]"><ArrowLeft size={15} className="text-violet-300 transition-transform group-hover:-translate-x-0.5" /><span><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Previous lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Circulation & Wayfinding</strong></span></Link>
            <Link href="/applied-science/architecture" className="flex min-h-[72px] items-center justify-end rounded-[18px] border border-amber-300/[0.10] bg-black/[0.20] px-4 py-3 text-right transition-colors hover:border-amber-300/[0.18]"><span><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Complete the unit</span><strong className="mt-0.5 block text-[14px] text-slate-200">Return to Architecture</strong></span></Link>
          </div>
        </nav>
      </div>
    </main>
  );
}

function FitDiagram({ envelopeWidth, sideClearance, openingWidth, turningEnvelope, turningZone, fit }: { envelopeWidth: number; sideClearance: number; openingWidth: number; turningEnvelope: number; turningZone: number; fit: { passageNeed: number; passageFits: boolean; turningFits: boolean } }) {
  const passageScale = 2.1;
  const openingPx = Math.min(openingWidth * passageScale, 330);
  const envelopePx = Math.min(envelopeWidth * passageScale, 250);
  const clearancePx = Math.min(sideClearance * passageScale, 65);
  const turnScale = 1.5;
  const zoneD = Math.min(turningZone * turnScale, 270);
  const turnD = Math.min(turningEnvelope * turnScale, 250);
  return <div className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[20px] border border-amber-200/[0.10] bg-[#04111c]/86 p-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Spatial envelope</div><div className="mt-1 font-mono text-[11px] text-amber-300/70">passage + maneuvering</div></div><div className="mt-5 grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"><div className="flex min-h-[240px] flex-col items-center justify-center rounded-[16px] border border-white/[0.05] bg-black/[0.14] p-4"><div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.09em] text-slate-600">Straight passage</div><div className="relative flex h-[150px] items-center justify-center border-y-4 border-slate-600/70 bg-slate-900/35" style={{ width: openingPx }}><div className="absolute inset-y-0 left-0 bg-sky-400/[0.08]" style={{ width: clearancePx }} /><div className="absolute inset-y-0 right-0 bg-sky-400/[0.08]" style={{ width: clearancePx }} /><div className={`h-[110px] rounded-[38px] border-2 ${fit.passageFits ? "border-emerald-300 bg-emerald-400/[0.08]" : "border-rose-300 bg-rose-400/[0.08]"}`} style={{ width: envelopePx }} /></div><div className={`mt-4 font-mono text-[11px] ${fit.passageFits ? "text-emerald-300" : "text-rose-300"}`}>{fit.passageNeed} cm required ≤ {openingWidth} cm available</div></div><div className="flex min-h-[240px] flex-col items-center justify-center rounded-[16px] border border-white/[0.05] bg-black/[0.14] p-4"><div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.09em] text-slate-600">Turning zone</div><div className={`relative flex items-center justify-center rounded-full border-2 ${fit.turningFits ? "border-emerald-300/70" : "border-rose-300/70"}`} style={{ width: zoneD, height: zoneD }}><div className={`rounded-full border-2 border-dashed ${fit.turningFits ? "border-violet-300 bg-violet-400/[0.06]" : "border-rose-300 bg-rose-400/[0.06]"}`} style={{ width: turnD, height: turnD }} /></div><div className={`mt-4 font-mono text-[11px] ${fit.turningFits ? "text-emerald-300" : "text-rose-300"}`}>{turningEnvelope} cm envelope ≤ {turningZone} cm zone</div></div></div><p className="mt-3 text-[10px] leading-4 text-slate-600">The diagram compares dimensions only. It does not represent a code-approved doorway, route, restroom, or turning space.</p></div>;
}

function Control({ label, value, min, max, suffix, rgb, onChange }: { label: string; value: number; min: number; max: number; suffix: string; rgb: string; onChange: (value: number) => void }) {
  return <label className="block rounded-[14px] border border-white/[0.045] bg-white/[0.012] p-3"><span className="flex items-center justify-between gap-3"><span className="text-[10px] font-semibold text-slate-400">{label}</span><span className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.06)` }}>{value}{suffix}</span></span><input type="range" min={min} max={max} step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-amber-400" /></label>;
}

function Readout({ label, value, note, passes }: { label: string; value: string; note: string; passes: boolean }) {
  return <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] px-3 py-2.5"><div className="flex items-start justify-between gap-3"><span className="text-[9px] font-semibold uppercase tracking-[0.09em] text-slate-600">{label}</span><strong className={`font-mono text-[12px] ${passes ? "text-emerald-300" : "text-rose-300"}`}>{value}</strong></div><div className="mt-1 text-[9px] leading-4 text-slate-700">{note}</div></div>;
}

function CoreFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span><span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>;
}

function ReferenceCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <div className="rounded-[18px] border border-amber-200/[0.07] bg-black/[0.18] p-4 backdrop-blur-xl"><div className="flex items-center gap-2"><Icon size={14} className="text-amber-300" /><h3 className="text-[13px] font-semibold text-slate-200">{title}</h3></div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function signed(value: number) { return value >= 0 ? `+${value}` : String(value); }
