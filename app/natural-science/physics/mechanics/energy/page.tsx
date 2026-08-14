import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground from "../../_components/PhysicsBackground";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import EnergyField from "./_components/EnergyField";
import { Activity, ArrowRight, MoveRight, Orbit, Scale, Zap } from "lucide-react";

const NODE_ID = "natural.physics.mechanics.energy";

export default function EnergyMomentumPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const energy = context.children.find((child) => child.id.endsWith(".energy"));
  const momentum = context.children.find((child) => child.id.endsWith(".momentum"));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04100f] text-slate-100 selection:bg-emerald-300/25">
      <PhysicsBackground mode="classical" />
      <EnergyField mode="split" />

      <div className="relative z-10 mx-auto w-full max-w-[1420px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#04100f]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs.slice(2)}
            eyebrow="Transfer · storage · conservation"
            icon={Scale}
            title={<span>Energy & Momentum</span>}
            subtitle="Two complementary bookkeeping languages for mechanics. Energy tracks scalar transfer and storage; momentum tracks directional motion through interactions."
            accentRgb="45, 212, 191"
            titleClassName="font-mono text-[clamp(2.25rem,4.5vw,4.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f2fffb]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch">
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/72">Why two languages?</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">
              The same interaction can be simple in one accounting system and awkward in the other.
            </h2>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">
              Energy is a scalar, so direction disappears and transfer becomes easy to total. Momentum is a vector, so direction stays visible and collisions become easier to reason about. Neither replaces the other.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 font-mono text-[10px]">
              <LedgerTag label="Energy" value="scalar" rgb="45, 212, 191" />
              <LedgerTag label="Momentum" value="vector" rgb="96, 165, 250" />
              <LedgerTag label="Energy" value="transfer / store" rgb="250, 204, 21" />
              <LedgerTag label="Momentum" value="impulse / flow" rgb="167, 139, 250" />
            </div>
          </div>

          <DualLedger />
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-2">
          {energy ? (
            <Link href={energy.href} className="group relative overflow-hidden rounded-[30px] border border-emerald-200/[0.14] bg-emerald-400/[0.035] p-6 backdrop-blur-xl transition hover:-translate-y-0.5">
              <div className="absolute -right-14 -top-14 h-52 w-52 rounded-full bg-emerald-300/[0.06] blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[15px] border border-emerald-200/[0.18] bg-emerald-300/[0.055] text-emerald-200"><Activity size={20} /></div>
                  <ArrowRight size={16} className="text-emerald-200/65 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300/68">Path 01 · scalar accounting</div>
                <h2 className="mt-1 text-[30px] font-semibold tracking-[-0.04em] text-white">Energy</h2>
                <p className="mt-3 max-w-xl text-[12px] leading-6 text-slate-400">Work transfers energy. Motion and interactions store it in different forms. Conservation lets us compare states without reconstructing every instant between them.</p>
                <div className="mt-5 flex flex-wrap gap-2 font-mono text-[9px] text-emerald-100/55"><span>work</span><span>→</span><span>kinetic</span><span>↔</span><span>potential</span><span>→</span><span>conservation</span></div>
              </div>
            </Link>
          ) : null}

          {momentum ? (
            <Link href={momentum.href} className="group relative overflow-hidden rounded-[30px] border border-blue-200/[0.13] bg-blue-400/[0.035] p-6 backdrop-blur-xl transition hover:-translate-y-0.5">
              <div className="absolute -left-14 -bottom-14 h-52 w-52 rounded-full bg-violet-300/[0.06] blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[15px] border border-blue-200/[0.18] bg-blue-300/[0.055] text-blue-200"><MoveRight size={20} /></div>
                  <ArrowRight size={16} className="text-blue-200/65 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-300/68">Path 02 · vector accounting</div>
                <h2 className="mt-1 text-[30px] font-semibold tracking-[-0.04em] text-white">Momentum</h2>
                <p className="mt-3 max-w-xl text-[12px] leading-6 text-slate-400">Momentum keeps direction. Impulse changes momentum, and total momentum becomes especially powerful when several objects exchange pushes during a collision.</p>
                <div className="mt-5 flex flex-wrap gap-2 font-mono text-[9px] text-blue-100/55"><span>mass × velocity</span><span>→</span><span>impulse</span><span>→</span><span>system total</span><span>→</span><span>collisions</span></div>
              </div>
            </Link>
          ) : null}
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Bridge icon={Zap} title="Forces connect both" text="A force through distance transfers energy. A force through time transfers momentum." rgb="250, 204, 21" />
          <Bridge icon={Orbit} title="Systems matter" text="Conservation statements only become clear after deciding what belongs inside the system boundary." rgb="45, 212, 191" />
          <Bridge icon={Scale} title="Choose the useful ledger" text="Use the representation that preserves the information you need, then cross-check with the other when useful." rgb="96, 165, 250" />
        </section>
      </div>
    </main>
  );
}

function DualLedger() {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#061318]/72 p-5 backdrop-blur-md">
      <div className="absolute left-1/2 top-5 bottom-5 w-px bg-gradient-to-b from-transparent via-white/[0.09] to-transparent" />
      <div className="relative grid min-h-[320px] grid-cols-2 gap-7">
        <div className="flex flex-col justify-between pr-3">
          <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Energy ledger</div><div className="mt-1 text-[12px] text-slate-500">Amount without direction</div></div>
          <div className="space-y-3">
            <Reservoir label="kinetic" width="74%" rgb="45, 212, 191" />
            <Reservoir label="potential" width="48%" rgb="250, 204, 21" />
            <Reservoir label="thermal" width="30%" rgb="248, 113, 113" />
          </div>
          <div className="font-mono text-[10px] text-emerald-100/55">stores + transfers → one total</div>
        </div>

        <div className="flex flex-col justify-between pl-3">
          <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/65">Momentum stream</div><div className="mt-1 text-[12px] text-slate-500">Amount plus direction</div></div>
          <div className="space-y-5 py-4">
            <Vector width="86%" side="right" rgb="96, 165, 250" label="+p" />
            <Vector width="58%" side="left" rgb="167, 139, 250" label="−p" />
            <Vector width="42%" side="right" rgb="34, 211, 238" label="+p" />
          </div>
          <div className="font-mono text-[10px] text-blue-100/55">vectors combine → system total</div>
        </div>
      </div>
    </div>
  );
}

function Reservoir({ label, width, rgb }: { label: string; width: string; rgb: string }) {
  return <div><div className="mb-1 flex justify-between font-mono text-[9px] text-slate-600"><span>{label}</span><span>store</span></div><div className="h-3 overflow-hidden rounded-full bg-black/35"><div className="h-full rounded-full" style={{ width, background: `linear-gradient(90deg, rgba(${rgb},0.35), rgba(${rgb},0.9))`, boxShadow: `0 0 20px rgba(${rgb},0.18)` }} /></div></div>;
}

function Vector({ width, side, rgb, label }: { width: string; side: "left" | "right"; rgb: string; label: string }) {
  return <div className={`flex items-center gap-2 ${side === "left" ? "flex-row-reverse" : ""}`}><div className="h-px flex-1" style={{ maxWidth: width, background: `rgba(${rgb},0.68)`, boxShadow: `0 0 16px rgba(${rgb},0.18)` }} /><div className="h-2.5 w-2.5 rotate-45 border" style={{ borderColor: `rgba(${rgb},0.8)` }} /><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.7)` }}>{label}</span></div>;
}

function LedgerTag({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.12] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.11em] text-slate-600">{label}</div><div className="mt-1" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Bridge({ icon: Icon, title, text, rgb }: { icon: typeof Zap; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4 backdrop-blur-xl"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.72)` }}><Icon size={13} />{title}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
