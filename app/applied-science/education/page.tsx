import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  ClipboardCheck,
  GraduationCap,
  Layers3,
  Users,
} from "lucide-react";
import LearningStudioBackground from "./LearningStudioBackground";
import LearningAlignmentLab from "./LearningAlignmentLab";

const NODE_ID = "applied.education";

const BRANCH_META: Record<string, { icon: LucideIcon; code: string; rgb: string }> = {
  "applied.education.learning-sciences": { icon: Brain, code: "LS", rgb: "96,165,250" },
  "applied.education.curriculum-instruction": { icon: BookOpenCheck, code: "CI", rgb: "167,139,250" },
  "applied.education.assessment": { icon: ClipboardCheck, code: "ASM", rgb: "52,211,153" },
  "applied.education.instructional-design": { icon: Layers3, code: "ID", rgb: "251,191,36" },
  "applied.education.accessibility-special-education": { icon: Users, code: "ACC", rgb: "244,114,182" },
  "applied.education.educational-technology": { icon: Layers3, code: "EDT", rgb: "125,211,252" },
  "applied.education.teaching-learning-environments": { icon: Users, code: "ENV", rgb: "134,239,172" },
  "applied.education.policy-systems": { icon: GraduationCap, code: "SYS", rgb: "253,186,116" },
  "applied.education.teacher-learning": { icon: GraduationCap, code: "TPL", rgb: "216,180,254" },
};

const LOOP = [
  { label: "Experience", note: "encounter an example, problem, explanation, model, demonstration, text, discussion, or situation", rgb: "96,165,250" },
  { label: "Practice", note: "attempt the target performance with an appropriate level of support and variation", rgb: "167,139,250" },
  { label: "Feedback", note: "compare evidence with the goal, surface errors or gaps, and decide what to revise or reinforce", rgb: "52,211,153" },
  { label: "Transfer", note: "revisit the learning in changed tasks, contexts, time intervals, representations, or combinations", rgb: "251,191,36" },
] as const;

export default function EducationPage() {
  const { node } = requireCurriculumPageContext(NODE_ID);
  const children = node.children ?? [];

  return (
    <SceneFrame
      background={<LearningStudioBackground />}
      className="bg-[#070911] text-slate-100 selection:bg-blue-300/25"
      maxWidthClassName="max-w-[1680px]"
      headerBackground="rgba(7,9,17,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Applied Sciences", href: "/applied-science" }, { label: "Education" }]}
          eyebrow="Goals · learning · instruction · evidence · feedback · systems"
          eyebrowStyle="rule"
          icon={GraduationCap}
          title={<span>Education</span>}
          subtitle="Design learning environments that connect worthwhile goals with prior knowledge, instruction, practice, feedback, assessment, accessibility, motivation, social context, technology, curriculum, and opportunities to use learning beyond the original lesson."
          accentRgb="96, 165, 250"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#eff6ff]"
          headerClassName="border-blue-100/[0.10]"
        />
      }
    >
      <section className="mt-5">
        <div className="mb-3 grid gap-3 border-b border-blue-100/[0.08] pb-3 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-blue-100/55">Learning design · primary navigation + alignment studio</div><h2 className="mt-1 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.046em] text-white">A learner can only demonstrate what the task actually gives them a chance to do.</h2></div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/social-science/psychology" label="Psychology" note="cognition · development · behavior" />
            <Neighbor href="/applied-science/computer-technology" label="Technology" note="tools · platforms · systems" />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[250px_minmax(0,1fr)] xl:items-start">
          <FieldIndex children={children} />
          <LearningAlignmentLab />
        </div>
      </section>

      <section className="mt-8 border-t border-blue-100/[0.09] pt-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-100/52">One useful learning loop</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Experience, practice, feedback, and transfer recur, overlap, and feed one another.</h2></div>
          <p className="text-[13px] leading-6 text-slate-400/72">This is a planning lens, not a universal stage theory. Learning can begin with retrieval, inquiry, explanation, observation, direct instruction, collaboration, prior experience, or other routes depending on the learner, content, goal, and setting.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-4">
          {LOOP.map((stage, index) => <LoopStage key={stage.label} stage={stage} number={`0${index + 1}`} />)}
        </div>
      </section>
    </SceneFrame>
  );
}

function FieldIndex({ children }: { children: readonly CurriculumNode[] }) {
  return (
    <Surface variant="open" className="overflow-hidden rounded-[26px] border-blue-100/[0.08]" style={{ background: "rgba(7,9,17,0.025)" }}>
      <div className="border-b border-white/[0.06] px-3.5 py-3"><div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-blue-100/48">Fields of education</div><p className="mt-1 text-[10px] leading-4 text-slate-600">The parent is active. Direct branches are planned and visible before their lessons exist.</p></div>
      <div>
        {children.map((child, index) => {
          const meta = BRANCH_META[child.id] ?? { icon: GraduationCap, code: `E${index + 1}`, rgb: "148,163,184" };
          const Icon = meta.icon;
          const active = child.status === "active";
          const content = <><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)` }}><Icon size={12} /></span><span className="min-w-0 flex-1"><span className="block font-mono text-[9px] uppercase tracking-[0.05em]" style={{ color: `rgba(${meta.rgb},0.52)` }}>{meta.code}</span><strong className="mt-0.5 block text-[11px] leading-4 text-white/76">{child.label}</strong></span>{active ? <ArrowRight size={11} className="text-slate-600" /> : <span className="font-mono text-[8px] uppercase text-slate-700">planned</span>}</>;
          return active ? <Link key={child.id} href={child.href ?? "#"} className="group flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 transition last:border-b-0 hover:bg-blue-200/[0.035]">{content}</Link> : <div key={child.id} aria-disabled="true" className="flex items-center gap-2 border-b border-white/[0.055] px-3 py-2.5 last:border-b-0">{content}</div>;
        })}
      </div>
    </Surface>
  );
}

function Neighbor({ href, label, note }: { href: string; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[68px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-2.5 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="text-[11px] font-semibold text-white/78">{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-3 text-slate-600">{note}</span><ArrowRight size={11} className="text-slate-600 transition group-hover:translate-x-1" /></span></Link>;
}

function LoopStage({ stage, number }: { stage: (typeof LOOP)[number]; number: string }) {
  return <div className="grid min-h-[142px] grid-cols-[38px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:border-b-0 xl:last:border-r-0"><span className="font-mono text-[10px]" style={{ color: `rgba(${stage.rgb},0.42)` }}>{number}</span><span><strong className="text-[12px]" style={{ color: `rgba(${stage.rgb},0.78)` }}>{stage.label}</strong><span className="mt-2 block text-[11px] leading-5 text-slate-500">{stage.note}</span></span></div>;
}
