import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Apple,
  ArrowRight,
  Brain,
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

type BranchMeta = { icon: LucideIcon; code: string; rgb: string };

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.health.nursing": { icon: HeartPulse, code: "NUR", rgb: "244,114,182" },
  "applied.health.public-health": { icon: Globe, code: "PH", rgb: "94,234,212" },
  "applied.health.epidemiology-biostatistics": { icon: Activity, code: "EPI", rgb: "125,211,252" },
  "applied.health.rehabilitation": { icon: Dumbbell, code: "REH", rgb: "251,191,36" },
  "applied.health.nutrition-dietetics": { icon: Apple, code: "NUT", rgb: "134,239,172" },
  "applied.health.diagnostic-sciences": { icon: Microscope, code: "DIA", rgb: "147,197,253" },
  "applied.health.respiratory-care": { icon: Stethoscope, code: "RESP", rgb: "103,232,249" },
  "applied.health.community-environmental": { icon: Users, code: "COM", rgb: "110,231,183" },
  "applied.health.informatics-systems": { icon: Network, code: "HIS", rgb: "192,132,252" },
  "applied.health.specializations": { icon: TestTube, code: "ATLAS", rgb: "253,164,175" },
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
      <section className="mt-5">
        <div className="mb-3 grid gap-3 border-b border-teal-100/[0.08] pb-3 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-teal-100/56">Care continuum · primary navigation + signature lab</div><h2 className="mt-1 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.046em] text-white">Health is produced across encounters, professions, environments, and systems.</h2></div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/applied-science/medicine" label="Medicine" note="diagnosis · treatment · clinical reasoning" />
            <Neighbor href="/social-science/psychology" label="Psychology" note="mind · behavior · cognition" />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[250px_minmax(0,1fr)] xl:items-start">
          <FieldIndex children={children} />
          <CareNetworkLab />
        </div>
      </section>

      <section className="mt-8 border-t border-teal-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-100/52">Health-science guardrails</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">No single profession, measurement, or setting owns the whole picture.</h2></div>
          <p className="text-[13px] leading-6 text-slate-400/72">Scopes of practice, workflows, resources, access, and professional roles vary across jurisdictions and institutions. This parent maps disciplines and coordination questions, not clinical orders or individualized health advice.</p>
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

function FieldIndex({ children }: { children: readonly CurriculumNode[] }) {
  return (
    <Surface variant="open" className="overflow-hidden rounded-[26px] border-teal-100/[0.08]" style={{ background: "rgba(5,17,16,0.025)" }}>
      <div className="border-b border-white/[0.06] px-3.5 py-3"><div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-teal-100/48">Fields & professions</div><p className="mt-1 text-[10px] leading-4 text-slate-600">Active routes open now. Planned routes remain visibly planned.</p></div>
      <div>
        {children.map((child, index) => {
          const meta = BRANCH_META[child.id] ?? { icon: Activity, code: `HS${index + 1}`, rgb: "148,163,184" };
          const Icon = meta.icon;
          const active = child.status === "active";
          const content = <><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span className="min-w-0 flex-1"><span className="block font-mono text-[9px] uppercase tracking-[0.05em]" style={{ color: `rgba(${meta.rgb},0.52)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] leading-4 text-white/76">{child.label}</strong></span>{active ? <ArrowRight size={11} className="text-slate-600" /> : <span className="font-mono text-[8px] uppercase text-slate-700">planned</span>}</>;
          return active ? <Link key={child.id} href={child.href ?? "#"} className="group flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 transition last:border-b-0 hover:bg-teal-200/[0.035]">{content}</Link> : <div key={child.id} aria-disabled="true" className="flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 last:border-b-0">{content}</div>;
        })}
      </div>
    </Surface>
  );
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[68px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-2.5 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="text-[11px] font-semibold text-white/78">{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-3 text-slate-600">{note}</span><ArrowRight size={11} className="text-slate-600 transition group-hover:translate-x-1" /></span></Link>;
}

function Guardrail({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="grid min-h-[130px] grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:border-b-0 xl:last:border-r-0"><span className="font-mono text-[10px] text-teal-100/35">{number}</span><span><strong className="text-[12px] text-white/80">{title}</strong><span className="mt-2 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>;
}
