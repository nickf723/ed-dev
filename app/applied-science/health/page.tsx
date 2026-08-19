import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Apple,
  ArrowRight,
  Dumbbell,
  Globe,
  HeartPulse,
  Microscope,
  Network,
  Stethoscope,
  TestTube,
  Users,
} from "lucide-react";
import HealthBackground from "./_components/HealthBackground";
import CareNetworkLab from "./CareNetworkLab";

const NODE_ID = "applied.health";

type BranchMeta = { icon: LucideIcon; code: string; rgb: string; x: number; y: number };

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.health.nursing": { icon: HeartPulse, code: "NUR", rgb: "244,114,182", x: 18, y: 20 },
  "applied.health.public-health": { icon: Globe, code: "PH", rgb: "94,234,212", x: 82, y: 25 },
  "applied.health.epidemiology-biostatistics": { icon: Activity, code: "EPI", rgb: "125,211,252", x: 82, y: 73 },
  "applied.health.rehabilitation": { icon: Dumbbell, code: "REH", rgb: "251,191,36", x: 23, y: 54 },
  "applied.health.nutrition-dietetics": { icon: Apple, code: "NUT", rgb: "134,239,172", x: 39, y: 34 },
  "applied.health.diagnostic-sciences": { icon: Microscope, code: "DIA", rgb: "147,197,253", x: 46, y: 70 },
  "applied.health.respiratory-care": { icon: Stethoscope, code: "RESP", rgb: "103,232,249", x: 39, y: 15 },
  "applied.health.community-environmental": { icon: Users, code: "COM", rgb: "110,231,183", x: 69, y: 43 },
  "applied.health.informatics-systems": { icon: Network, code: "HIS", rgb: "192,132,252", x: 66, y: 78 },
  "applied.health.specializations": { icon: TestTube, code: "ATLAS", rgb: "253,164,175", x: 55, y: 50 },
};

export default function HealthHubPage() {
  const { node } = requireCurriculumPageContext(NODE_ID);
  const children = node.children ?? [];

  return (
    <SceneFrame
      background={<HealthBackground />}
      className="bg-[#07100f] text-slate-100 selection:bg-teal-300/25"
      maxWidthClassName="max-w-[1680px]"
      headerBackground="rgba(7,16,15,0.54)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applied Sciences", href: "/applied-science" }, { label: "Health Sciences" }]}
          eyebrow="Professions · prevention · rehabilitation · population · systems"
          eyebrowStyle="rule"
          icon={HeartPulse}
          title={<span>Health Sciences</span>}
          subtitle="Study health as a coordinated human and systems problem. Health sciences connect patient care, prevention, rehabilitation, nutrition, diagnostics, population measurement, community conditions, informatics, and professional collaboration across settings and time."
          accentRgb="94, 234, 212"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#ecfeff]"
          headerClassName="border-teal-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 border-y border-teal-100/[0.10] py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,18,0.26),transparent_28%,transparent_72%,rgba(6,20,18,0.22))] backdrop-blur-[5px]" />
        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div className="-mx-3 rounded-[20px] bg-[#071613]/[0.28] px-3 py-2 backdrop-blur-[20px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-teal-100/62">Primary navigation · field orientation</div>
            <h2 className="mt-1 max-w-5xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.046em] text-white">Where does a health-science question sit between a person, a population, direct care, and the systems that support both?</h2>
            <p className="mt-2 max-w-4xl text-[12px] leading-5 text-slate-400/72">The positions below are an orientation aid, not a ranking or scope-of-practice chart. Every field can cross both axes depending on setting, role, population, question, and jurisdiction.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/applied-science/medicine" label="Medicine" note="diagnosis · treatment · clinical reasoning" />
            <Neighbor href="/social-science/psychology" label="Psychology" note="mind · behavior · cognition" />
          </div>
        </div>

        <HealthOrientationMap children={children} />
      </section>

      <section className="mt-8">
        <div className="mb-3 grid gap-3 border-b border-teal-100/[0.08] pb-3 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#071613]/[0.18] px-3 py-2 backdrop-blur-[14px]"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-teal-100/56">Coordination instrument · after the field map</div><h2 className="mt-1 text-[clamp(1.55rem,2.6vw,2.45rem)] font-semibold tracking-[-0.042em] text-white">A useful handoff preserves the person, the evidence, and the next responsibility.</h2></div>
          <p className="rounded-[16px] bg-[#071613]/[0.18] px-3 py-2 text-[11px] leading-5 text-slate-500 backdrop-blur-[14px]">The fictional care-network lab keeps the task non-prescriptive: it shows how different professions and settings contribute information and continuity without pretending to issue clinical orders.</p>
        </div>
        <CareNetworkLab />
      </section>

      <section className="mt-8 border-t border-teal-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="rounded-[18px] bg-[#071613]/[0.16] px-3 py-2 backdrop-blur-[14px]"><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-100/52">Health-science guardrails · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">No single profession, measurement, or setting owns the whole picture.</h2></div>
          <p className="rounded-[16px] bg-[#071613]/[0.16] px-3 py-2 text-[13px] leading-6 text-slate-400/72 backdrop-blur-[14px]">Scopes of practice, workflows, resources, access, and professional roles vary across jurisdictions and institutions. This parent maps disciplines and coordination questions, not clinical orders or individualized health advice.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          <Guardrail number="01" title="Person before pathway" text="Care systems should preserve goals, context, language, access needs, daily life, and preferences rather than reducing a person to a service queue." />
          <Guardrail number="02" title="Roles overlap, scopes differ" text="Collaboration does not erase professional boundaries. Training, licensure, local practice, setting, and task determine who can do what." />
          <Guardrail number="03" title="Close the loop" text="A referral, result, education plan, or discharge message is not complete merely because it was sent. Responsibility and follow-up need to survive the handoff." />
          <Guardrail number="04" title="Population and individual differ" text="A population pattern can guide programs and questions without determining what is true or appropriate for a particular person." />
        </div>
      </section>
    </SceneFrame>
  );
}

function HealthOrientationMap({ children }: { children: readonly CurriculumNode[] }) {
  return (
    <nav aria-label="Health Sciences orientation map" className="relative mt-5 overflow-hidden border border-teal-100/[0.11] bg-[#071613]/[0.30] shadow-[0_30px_95px_rgba(0,0,0,0.18)] backdrop-blur-[22px] backdrop-saturate-[1.07]">
      <div className="hidden min-h-[610px] lg:block">
        <div className="pointer-events-none absolute inset-[8%_6%_10%_7%]">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-pink-200/10 via-teal-100/17 to-cyan-200/10" />
          <div className="absolute bottom-0 top-0 left-1/2 w-px bg-gradient-to-b from-rose-200/10 via-teal-100/17 to-violet-200/10" />
          <span className="absolute -left-1 top-[47%] rounded-full bg-[#071613]/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-pink-100/46 backdrop-blur-md">person / encounter</span>
          <span className="absolute -right-1 top-[47%] rounded-full bg-[#071613]/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-teal-100/46 backdrop-blur-md">population / system</span>
          <span className="absolute left-[51%] top-0 rounded-full bg-[#071613]/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-rose-100/46 backdrop-blur-md">direct support / intervention</span>
          <span className="absolute bottom-0 left-[51%] rounded-full bg-[#071613]/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-violet-100/46 backdrop-blur-md">measurement / coordination / infrastructure</span>
        </div>

        <div className="absolute inset-[9%_7%_11%_8%]">
          {children.map((child, index) => <OrientationStation key={child.id} child={child} index={index} />)}
        </div>

        <div className="absolute bottom-3 left-4 rounded-full bg-[#071613]/60 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.09em] text-teal-100/38 backdrop-blur-[14px]">orientation only · fields cross axes in real practice</div>
        <div className="absolute bottom-3 right-4 rounded-full bg-[#071613]/60 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-600 backdrop-blur-[14px]">active routes open · planned routes remain visible</div>
      </div>

      <div className="grid gap-2 p-3 sm:grid-cols-2 lg:hidden">
        {children.map((child, index) => <MobileOrientationStation key={child.id} child={child} index={index} />)}
      </div>
    </nav>
  );
}

function OrientationStation({ child, index }: { child: CurriculumNode; index: number }) {
  const meta = BRANCH_META[child.id] ?? { icon: Activity, code: `HS${index + 1}`, rgb: "148,163,184", x: 50, y: 50 };
  const Icon = meta.icon;
  const active = child.status === "active";
  const body = (
    <div className={`group absolute w-[190px] -translate-x-1/2 -translate-y-1/2 border bg-[#071613]/[0.58] px-3 py-3 shadow-[0_16px_45px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition ${active ? "hover:-translate-y-[54%] hover:bg-[#071613]/[0.70]" : "opacity-50"}`} style={{ left: `${meta.x}%`, top: `${meta.y}%`, borderColor: `rgba(${meta.rgb},0.18)` }}>
      <div className="flex items-center justify-between gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.26)`, background: `rgba(${meta.rgb},0.045)` }}><Icon size={12} /></span><span className="font-mono text-[8px] uppercase tracking-[0.07em] text-slate-600">{active ? "open" : "planned"}</span></div>
      <span className="mt-2 block font-mono text-[9px] font-semibold uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.62)` }}>{meta.code}</span>
      <strong className="mt-0.5 block text-[12px] leading-4 text-white/84">{child.label}</strong>
      {active ? <span className="mt-2 flex items-center justify-end gap-1 font-mono text-[8px] uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>open field <ArrowRight size={9} className="transition group-hover:translate-x-1" /></span> : null}
    </div>
  );
  return active ? <Link href={child.href ?? "#"}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}

function MobileOrientationStation({ child, index }: { child: CurriculumNode; index: number }) {
  const meta = BRANCH_META[child.id] ?? { icon: Activity, code: `HS${index + 1}`, rgb: "148,163,184", x: 50, y: 50 };
  const Icon = meta.icon;
  const active = child.status === "active";
  const body = <div className={`group grid min-h-[86px] grid-cols-[38px_minmax(0,1fr)_18px] gap-2 border bg-[#071613]/[0.40] px-3 py-3 backdrop-blur-[18px] ${active ? "" : "opacity-50"}`} style={{ borderColor: `rgba(${meta.rgb},0.16)` }}><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span><span className="font-mono text-[8px] uppercase tracking-[0.07em]" style={{ color: `rgba(${meta.rgb},0.58)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] text-white/82">{child.label}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-500">orientation: {meta.x < 50 ? "person-facing" : "population/system-facing"} · {meta.y < 50 ? "direct/support" : "measurement/coordination"}</span></span>{active ? <ArrowRight size={11} className="mt-2 text-slate-500 transition group-hover:translate-x-1" /> : null}</div>;
  return active ? <Link href={child.href ?? "#"}>{body}</Link> : <div aria-disabled="true">{body}</div>;
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[68px] flex-col justify-between border border-white/[0.08] bg-[#071613]/[0.34] px-3 py-2.5 backdrop-blur-[18px] transition hover:bg-[#071613]/[0.46]"><span className="text-[11px] font-semibold text-white/82">{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-3 text-slate-500">{note}</span><ArrowRight size={11} className="text-slate-500 transition group-hover:translate-x-1" /></span></Link>;
}

function Guardrail({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="grid min-h-[130px] grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] bg-[#071613]/[0.14] px-4 py-4 backdrop-blur-[12px] xl:border-r xl:border-b-0 xl:last:border-r-0"><span className="font-mono text-[10px] text-teal-100/35">{number}</span><span><strong className="text-[12px] text-white/80">{title}</strong><span className="mt-2 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>;
}
