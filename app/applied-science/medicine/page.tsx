import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Beaker,
  BookOpenCheck,
  BrainCircuit,
  ClipboardCheck,
  HeartPulse,
  Microscope,
  Scale,
  ShieldAlert,
  Stethoscope,
  Syringe,
} from "lucide-react";
import PulseBackground from "./PulseBackground";
import AnatomyWidget from "./AnatomyWidget";
import ClinicalReasoningLab from "./ClinicalReasoningLab";

const NODE_ID = "applied.medicine";

type BranchMeta = { icon: LucideIcon; code: string; rgb: string };

const BRANCH_META: Record<string, BranchMeta> = {
  "applied.medicine.anatomy-physiology": { icon: Activity, code: "A&P", rgb: "125,211,252" },
  "applied.medicine.pathology": { icon: Microscope, code: "PATH", rgb: "248,113,113" },
  "applied.medicine.diagnostics": { icon: Beaker, code: "DX", rgb: "94,234,212" },
  "applied.medicine.pharmacology": { icon: Syringe, code: "TX", rgb: "192,132,252" },
  "applied.medicine.surgery-procedures": { icon: ShieldAlert, code: "PROC", rgb: "251,191,36" },
  "applied.medicine.clinical-reasoning": { icon: BrainCircuit, code: "CR", rgb: "45,212,191" },
  "applied.medicine.specialties": { icon: Stethoscope, code: "SPEC", rgb: "147,197,253" },
  "applied.medicine.acute-care": { icon: HeartPulse, code: "ACUTE", rgb: "251,113,133" },
  "applied.medicine.longitudinal-care": { icon: ClipboardCheck, code: "LONG", rgb: "134,239,172" },
  "applied.medicine.ethics-professionalism": { icon: Scale, code: "ETH", rgb: "253,186,116" },
};

export default function MedicinePage() {
  const { node } = requireCurriculumPageContext(NODE_ID);
  const children = node.children ?? [];

  return (
    <SceneFrame
      background={<PulseBackground />}
      className="bg-[#07100f] text-slate-100 selection:bg-teal-300/25"
      maxWidthClassName="max-w-[1680px]"
      headerBackground="rgba(7,16,15,0.56)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applied Sciences", href: "/applied-science" }, { label: "Medicine" }]}
          eyebrow="Clinical reasoning · disease · diagnosis · treatment · follow-up"
          eyebrowStyle="rule"
          icon={Stethoscope}
          title={<span>Medicine</span>}
          subtitle="Study how clinicians move from a patient's story and observed findings to working explanations, targeted tests, treatment decisions, procedures, and follow-up while tracking uncertainty, benefit, harm, evidence quality, ethics, and the changing course of illness over time."
          accentRgb="45, 212, 191"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#ecfeff]"
          headerClassName="border-teal-100/[0.10]"
        />
      }
    >
      <section className="mt-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b border-teal-100/[0.08] pb-3">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-teal-100/58">Clinical workspace</div><h2 className="mt-1 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Context, evidence, action, and response belong in the same frame.</h2></div>
          <p className="max-w-xl text-[12px] leading-5 text-slate-500">The ambient chart is deliberately synthetic. It shows the rhythm of longitudinal review without pretending to represent a real patient, validated score, diagnostic rule, or treatment pathway.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[245px_minmax(0,1fr)_255px] xl:items-start">
          <FieldIndex children={children} />
          <ClinicalReasoningLab />
          <AnatomyWidget />
        </div>
      </section>

      <section className="mt-8 border-t border-teal-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-100/54"><BookOpenCheck size={13} /> Reasoning guardrails</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Good medicine is not a single clever diagnosis. It is a revisable process with consequences.</h2></div>
          <p className="text-[13px] leading-6 text-slate-400/72">Clinical decisions combine evidence with patient context, goals, alternatives, feasibility, uncertainty, and risk. Education should make those moving parts visible instead of reducing care to one result or one algorithm.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          <Guardrail number="01" title="Represent the problem" text="Compress the case enough to reason while preserving the features that could change what matters next." />
          <Guardrail number="02" title="Keep alternatives alive" text="A favored explanation should face competing hypotheses and evidence that could weigh against it." />
          <Guardrail number="03" title="Connect action to monitoring" text="Treatment and procedures create new observations. Response, adverse effects, and trajectory can revise the working model." />
          <Guardrail number="04" title="Separate evidence from certainty" text="Tests, imaging, pathology, guidelines, and models can reduce uncertainty without erasing judgment, context, or limitations." />
        </div>
      </section>
    </SceneFrame>
  );
}

function FieldIndex({ children }: { children: readonly CurriculumNode[] }) {
  return (
    <Surface variant="open" className="overflow-hidden rounded-[26px] border-teal-100/[0.08]" style={{ background: "rgba(5,17,16,0.025)" }}>
      <div className="border-b border-white/[0.06] px-3.5 py-3"><div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-teal-100/48">Fields of medicine</div><p className="mt-1 text-[10px] leading-4 text-slate-600">Active routes open now. Planned routes stay visibly planned.</p></div>
      <div>
        {children.map((child, index) => {
          const meta = BRANCH_META[child.id] ?? { icon: Stethoscope, code: `M${index + 1}`, rgb: "148,163,184" };
          const Icon = meta.icon;
          const active = child.status === "active";
          const content = <><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span className="min-w-0 flex-1"><span className="block font-mono text-[9px] uppercase tracking-[0.05em]" style={{ color: `rgba(${meta.rgb},0.52)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] leading-4 text-white/76">{child.label}</strong></span>{active ? <ArrowRight size={11} className="text-slate-600" /> : <span className="font-mono text-[8px] uppercase text-slate-700">planned</span>}</>;
          return active ? <Link key={child.id} href={child.href ?? "#"} className="group flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 transition last:border-b-0 hover:bg-teal-200/[0.035]">{content}</Link> : <div key={child.id} aria-disabled="true" className="flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 last:border-b-0">{content}</div>;
        })}
      </div>
    </Surface>
  );
}

function Guardrail({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="grid min-h-[130px] grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:border-b-0 xl:last:border-r-0"><span className="font-mono text-[10px] text-teal-100/35">{number}</span><span><strong className="text-[12px] text-white/80">{title}</strong><span className="mt-2 block text-[11px] leading-5 text-slate-500">{text}</span></span></div>;
}
