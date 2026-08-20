import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import BiologicalBackground from "./BiologicalBackground";
import SystemScanner from "./SystemScanner";
import {
  Activity,
  ArrowRight,
  Bone,
  Brain,
  Heart,
  Microscope,
  Network,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type SystemNode = {
  label: string;
  cue: string;
  question: string;
  icon: LucideIcon;
  rgb: string;
  href?: string;
};

const FOUNDATIONS: readonly SystemNode[] = [
  {
    label: "Cells & tissues",
    cue: "epithelial · connective · muscle · nervous tissue",
    question: "How do specialized cells assemble into tissues with distinct mechanical and physiological roles?",
    icon: Microscope,
    rgb: "244,114,182",
  },
  {
    label: "Homeostasis",
    cue: "sensor · integrator · effector · feedback",
    question: "How does the body keep internal variables within useful ranges while conditions change?",
    icon: Activity,
    rgb: "52,211,153",
  },
] as const;

const SYSTEMS: readonly SystemNode[] = [
  {
    label: "Skeletal system",
    cue: "support · protection · leverage · mineral storage",
    question: "How do bones, cartilage, joints, and living bone tissue support the body while still permitting movement and adaptation?",
    icon: Bone,
    rgb: "251,191,36",
    href: "/applied-science/medicine/anatomy-physiology/skeletal",
  },
  {
    label: "Muscular system",
    cue: "force · posture · movement · heat",
    question: "How does contractile tissue turn chemical energy into force across joints and organs?",
    icon: Activity,
    rgb: "248,113,113",
  },
  {
    label: "Cardiovascular system",
    cue: "pump · vessels · pressure · transport",
    question: "How does a closed circulation distribute gases, nutrients, signals, heat, and waste across tissues?",
    icon: Heart,
    rgb: "45,212,191",
  },
  {
    label: "Nervous system",
    cue: "sensation · integration · rapid control",
    question: "How do excitable cells detect change, communicate, and coordinate behavior across the body?",
    icon: Brain,
    rgb: "96,165,250",
  },
] as const;

const SCALE = [
  ["Cell", "specialized living unit"],
  ["Tissue", "coordinated cells + matrix"],
  ["Organ", "several tissues performing a local job"],
  ["System", "organs coordinating a broader function"],
  ["Organism", "systems regulating one another"],
] as const;

export default function AnatomyPage() {
  return (
    <SceneFrame
      background={<BiologicalBackground />}
      className="bg-[#08070b] text-slate-100 selection:bg-rose-300/25"
      maxWidthClassName="max-w-[1540px]"
      headerBackground="rgba(8,7,11,0.54)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Applied Science", href: "/applied-science" },
            { label: "Medicine", href: "/applied-science/medicine" },
            { label: "Anatomy & Physiology" },
          ]}
          eyebrow="Structure · function · region · system · regulation"
          eyebrowStyle="rule"
          icon={Activity}
          title={<span>Anatomy &amp; Physiology</span>}
          subtitle="Read the body as nested living structure: cells form tissues, tissues form organs, organs cooperate in systems, and those systems overlap in regions while regulating one another to keep the organism functioning."
          accentRgb="244, 114, 182"
          titleClassName="font-sans text-[clamp(2.6rem,5vw,5.8rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-[#fff5f8]"
          headerClassName="border-rose-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-rose-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,8,13,0.34),transparent_30%,transparent_70%,rgba(9,12,18,0.28))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-rose-200/68"><Network size={14} /> Structural scale</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">The body is nested, but function runs across the nesting.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/72">An organ belongs to a region, participates in one or more systems, contains several tissues, and depends on circulation, innervation, and regulation beyond its local boundaries. Anatomy locates the parts; physiology explains the changing relationships among them.</p>

            <div className="mt-5 grid gap-2 sm:grid-cols-5">
              {SCALE.map(([label, note], index) => (
                <div key={label} className="relative rounded-[16px] border border-white/[0.07] bg-black/[0.12] p-3 backdrop-blur-[12px]">
                  <span className="font-mono text-[9px] text-rose-200/45">0{index + 1}</span>
                  <strong className="mt-2 block text-[14px] text-white">{label}</strong>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-500">{note}</span>
                  {index < SCALE.length - 1 ? <ArrowRight size={12} className="absolute -right-[7px] top-1/2 hidden -translate-y-1/2 text-rose-200/35 sm:block" /> : null}
                </div>
              ))}
            </div>
          </div>

          <Link href="/natural-science/biology/anatomy" className="group rounded-[20px] border border-cyan-200/[0.11] bg-cyan-300/[0.025] p-4 backdrop-blur-xl transition hover:bg-cyan-300/[0.045]">
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-cyan-200/55">Neighboring biological field</div>
            <strong className="mt-2 block text-[18px] text-white">Comparative Anatomy</strong>
            <p className="mt-2 text-[12px] leading-5 text-slate-400">Study anatomical structure across organisms there. This medical branch centers the human body and clinically useful structure-function relationships.</p>
            <span className="mt-4 flex items-center justify-between text-[11px] font-semibold text-cyan-100/68">open biology anatomy <ArrowRight size={13} className="transition group-hover:translate-x-1" /></span>
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/62"><Sparkles size={14} /> Curriculum map</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.4vw,3.3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Enter the body through a functional system, while keeping the shared foundations visible.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/72">Only the Skeletal System has a live child route right now. Planned systems remain visible because they clarify the intended anatomy curriculum, but they are deliberately non-clickable.</p>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
          <Surface variant="ghost" className="rounded-[24px] p-4">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-rose-200/58">Foundations · planned</div>
            <div className="mt-3 space-y-2">
              {FOUNDATIONS.map((node) => <SystemCard key={node.label} node={node} planned />)}
            </div>
          </Surface>
          <div className="grid gap-3 md:grid-cols-2">
            {SYSTEMS.map((node) => <SystemCard key={node.label} node={node} planned={!node.href} />)}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <SystemScanner />
      </section>

      <section className="mt-8 border-t border-rose-100/[0.09] pt-5">
        <div className="grid gap-4 md:grid-cols-3">
          <Principle icon={Microscope} title="Structure constrains function" text="Shape, material, geometry, and organization make some physiological actions possible and others difficult or impossible." />
          <Principle icon={ShieldCheck} title="Systems overlap" text="A named system is an analytical grouping. Real tissues and organs are physically interwoven and physiologically interdependent." />
          <Principle icon={Activity} title="The body changes with time" text="Development, activity, injury, disease, adaptation, repair, and aging continually modify both anatomy and physiology." />
        </div>
      </section>
    </SceneFrame>
  );
}

function SystemCard({ node, planned }: { node: SystemNode; planned: boolean }) {
  const Icon = node.icon;
  const body = (
    <div className={`group flex min-h-[176px] flex-col rounded-[20px] border p-4 backdrop-blur-[14px] ${planned ? "opacity-60" : "transition hover:-translate-y-0.5"}`} style={{ borderColor: `rgba(${node.rgb},0.16)`, background: `linear-gradient(145deg,rgba(${node.rgb},0.05),rgba(5,5,8,0.18))` }}>
      <div className="flex items-start justify-between gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${node.rgb})`, borderColor: `rgba(${node.rgb},0.26)`, background: `rgba(${node.rgb},0.045)` }}><Icon size={17} /></span><span className="font-mono text-[9px] uppercase tracking-[0.07em] text-slate-500">{planned ? "planned" : "open"}</span></div>
      <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${node.rgb},0.66)` }}>{node.cue}</div>
      <h3 className="mt-1 text-[18px] font-semibold text-white">{node.label}</h3>
      <p className="mt-2 text-[12px] leading-5 text-slate-400">{node.question}</p>
      {!planned ? <span className="mt-auto flex items-center justify-end gap-1 pt-3 text-[11px] font-semibold" style={{ color: `rgba(${node.rgb},0.72)` }}>open system <ArrowRight size={12} className="transition group-hover:translate-x-1" /></span> : null}
    </div>
  );
  return planned || !node.href ? <div aria-disabled="true">{body}</div> : <Link href={node.href}>{body}</Link>;
}

function Principle({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <div className="border-l border-rose-100/[0.14] bg-black/[0.10] px-4 py-4 backdrop-blur-[12px]"><Icon size={16} className="text-rose-200/65" /><strong className="mt-3 block text-[15px] text-white">{title}</strong><p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p></div>;
}
