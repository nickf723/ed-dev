import DomainPageHeader from "@/app/_components/DomainPageHeader";
import {
  SceneFrame,
  Surface,
  WorldWindow,
} from "@/app/_page-system/scene";
import {
  Activity,
  Brain,
  ClipboardCheck,
  Dna,
  HeartHandshake,
  Microscope,
  Network,
  Repeat2,
  Users,
  type LucideIcon,
} from "lucide-react";
import CognitiveFieldBackground from "./CognitiveFieldBackground";
import CognitionLab from "./CognitionLab";

const SCENES = [
  {
    id: "perception",
    label: "Perception",
    description: "Trace how noisy sensory evidence, organization, and context contribute to a stable interpretation.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "attention",
    label: "Attention",
    description: "Place a target among competing inputs and see how similarity, load, and useful cues change selection pressure.",
    accentRgb: "244, 114, 182",
  },
  {
    id: "memory",
    label: "Working memory",
    description: "Balance limited active capacity against rehearsal and interference while information is maintained.",
    accentRgb: "167, 139, 250",
  },
];

const BRANCHES: Array<{
  icon: LucideIcon;
  label: string;
  question: string;
  summary: string;
  rgb: string;
}> = [
  {
    icon: Brain,
    label: "Cognitive psychology",
    question: "How are perception, attention, memory, language, and reasoning organized?",
    summary: "Mental processes are studied through behavior, computational models, experiments, and converging biological evidence.",
    rgb: "167,139,250",
  },
  {
    icon: Dna,
    label: "Biological psychology",
    question: "How do nervous systems, hormones, genes, and bodies constrain behavior?",
    summary: "Explanations connect neural systems and physiology to learning, emotion, motivation, and action without reducing a person to one level alone.",
    rgb: "52,211,153",
  },
  {
    icon: Repeat2,
    label: "Developmental psychology",
    question: "How do abilities and relationships change across the lifespan?",
    summary: "Development combines maturation, learning, social interaction, culture, and historical context from infancy through aging.",
    rgb: "250,204,21",
  },
  {
    icon: Users,
    label: "Social & personality psychology",
    question: "How do situations, groups, identity, and stable differences shape behavior?",
    summary: "People respond to norms, roles, relationships, incentives, self-concepts, and individual patterns that vary across settings and time.",
    rgb: "34,211,238",
  },
  {
    icon: HeartHandshake,
    label: "Clinical & counseling psychology",
    question: "How are distress, adaptation, assessment, and treatment studied?",
    summary: "Clinical work applies evidence-based assessment and intervention while recognizing diagnosis, culture, context, and individual goals.",
    rgb: "244,114,182",
  },
  {
    icon: Microscope,
    label: "Methods & measurement",
    question: "How can invisible constructs be studied with public evidence?",
    summary: "Researchers operationalize constructs, compare conditions, estimate uncertainty, test validity, replicate results, and distinguish association from causal evidence.",
    rgb: "96,165,250",
  },
];

export default function PsychologyPage() {
  return (
    <SceneFrame
      background={<CognitiveFieldBackground />}
      initialScene="perception"
      className="bg-[#08040f] text-slate-100 selection:bg-pink-400/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(8,4,15,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Social Science", href: "/social-science" },
            { label: "Psychology" },
          ]}
          eyebrow="Behavior · cognition · biology · development · context · evidence"
          eyebrowStyle="pill"
          icon={Brain}
          title={<span>Psychology</span>}
          subtitle="Psychology studies behavior and mental processes across multiple levels: bodies and brains, information processing, learning histories, development, relationships, institutions, and culture."
          accentRgb="244, 114, 182"
          titleClassName="font-sans text-[clamp(2.8rem,5.3vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#fff5fb]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-4">
        <WorldWindow
          density="compact"
          eyebrow="Cognition laboratory"
          title="A mind does not passively record the world. It selects, organizes, and maintains information."
          description="Change one processing pressure at a time. The compact lab keeps the stimulus, controls, response, and interpretation together while the surrounding cognitive field mirrors the same state."
          scenes={SCENES}
        >
          <CognitionLab />
        </WorldWindow>
      </section>

      <section className="mt-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-pink-200/70">
              <Network size={14} /> Levels of explanation
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
              The same behavior can have biological, cognitive, developmental, and social explanations at once.
            </h2>
          </div>
          <Surface variant="ghost" className="rounded-[22px] p-5">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400">A good question asks</div>
            <div className="mt-3 grid gap-2">
              <Question label="What behavior or experience is being explained?" />
              <Question label="At which level is the proposed mechanism operating?" />
              <Question label="What evidence would distinguish competing accounts?" />
            </div>
          </Surface>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {BRANCHES.map((branch) => <BranchCard key={branch.label} {...branch} />)}
        </div>
      </section>

      <section className="mt-10 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
        <Surface variant="ghost" className="rounded-[24px] p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/68">
            <ClipboardCheck size={14} /> Evidence pipeline
          </div>
          <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,3.1rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">
            Psychological constructs become scientific only through observable measurements and testable comparisons.
          </h2>
          <div className="mt-5 grid gap-2 sm:grid-cols-4">
            <MethodStep number="01" label="Define" text="Specify the construct and the population." rgb="244,114,182" />
            <MethodStep number="02" label="Operationalize" text="Choose observable tasks, reports, or physiological measures." rgb="34,211,238" />
            <MethodStep number="03" label="Compare" text="Use designs that separate a hypothesis from plausible alternatives." rgb="167,139,250" />
            <MethodStep number="04" label="Replicate" text="Estimate uncertainty and test whether the pattern generalizes." rgb="52,211,153" />
          </div>
        </Surface>

        <Surface variant="glass" className="rounded-[24px] p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/68">
            <Activity size={14} /> Correlation is a clue, not a mechanism
          </div>
          <div className="mt-5 grid grid-cols-[1fr_54px_1fr] items-center gap-2 text-center">
            <CausalNode label="Sleep quality" rgb="34,211,238" />
            <span className="text-[24px] text-slate-600">↔</span>
            <CausalNode label="Attention score" rgb="244,114,182" />
          </div>
          <div className="mx-auto mt-3 h-10 w-px bg-violet-200/24" />
          <CausalNode label="Stress, schedule, health, environment…" rgb="167,139,250" />
          <p className="mt-4 text-[13px] leading-6 text-slate-300/70">
            An association may reflect direct influence, reverse influence, shared causes, measurement choices, or sampling. Strong causal claims require a design that addresses those alternatives.
          </p>
        </Surface>
      </section>
    </SceneFrame>
  );
}

function BranchCard({
  icon: Icon,
  label,
  question,
  summary,
  rgb,
}: (typeof BRANCHES)[number]) {
  return (
    <Surface variant="ghost" className="flex min-h-[245px] flex-col rounded-[22px] p-5" style={{ borderColor: `rgba(${rgb},0.15)` }}>
      <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.28)`, background: `rgba(${rgb},0.055)` }}><Icon size={18} /></span>
      <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.035em] text-white">{label}</h3>
      <strong className="mt-3 block text-[13px] leading-5 text-slate-200/82">{question}</strong>
      <p className="mt-2 text-[14px] leading-6 text-slate-400/70">{summary}</p>
      <span className="mt-auto pt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${rgb},0.70)` }}>planned branch</span>
    </Surface>
  );
}

function Question({ label }: { label: string }) {
  return (
    <div className="rounded-[12px] border border-white/[0.07] bg-black/[0.14] px-3 py-2.5 text-[13px] leading-5 text-slate-200/74">{label}</div>
  );
}

function MethodStep({
  number,
  label,
  text,
  rgb,
}: {
  number: string;
  label: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="min-h-[160px] rounded-[16px] border border-white/[0.07] bg-black/[0.14] p-4">
      <div className="font-mono text-[11px]" style={{ color: `rgba(${rgb},0.62)` }}>{number}</div>
      <h3 className="mt-4 text-[15px] font-semibold text-white">{label}</h3>
      <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{text}</p>
    </div>
  );
}

function CausalNode({ label, rgb }: { label: string; rgb: string }) {
  return (
    <div className="rounded-[14px] border px-3 py-3 text-center text-[13px] font-semibold" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.20)`, background: `rgba(${rgb},0.035)` }}>{label}</div>
  );
}
