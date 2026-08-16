import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LanguageSignalBackground from "@/app/_page-system/backgrounds/LanguageSignalBackground";
import CommunicationLoopTopology, { type CommunicationStage } from "@/app/_page-system/topologies/CommunicationLoopTopology";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  Brain,
  Clock3,
  Ear,
  History,
  Languages,
  Layers3,
  MessageCircle,
  Mic2,
  Sprout,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "social.linguistics";

type Meta = {
  question: string;
  rgb: string;
  icon: LucideIcon;
  position: { x: number; y: number };
};

const META: Record<string, Meta> = {
  "social.linguistics.structure": {
    question: "What system is being learned and used?",
    rgb: "132, 204, 22",
    icon: Layers3,
    position: { x: 20, y: 31 },
  },
  "social.linguistics.psycholinguistics": {
    question: "How does a mind produce and understand language in real time?",
    rgb: "167, 139, 250",
    icon: Brain,
    position: { x: 50, y: 13 },
  },
  "social.linguistics.sociolinguistics": {
    question: "How does language vary with communities, identity, power, and situation?",
    rgb: "34, 211, 238",
    icon: Users,
    position: { x: 80, y: 31 },
  },
  "social.linguistics.historical": {
    question: "How do repeated generations of use change languages over time?",
    rgb: "251, 191, 36",
    icon: History,
    position: { x: 73, y: 77 },
  },
  "social.linguistics.acquisition": {
    question: "How do learners infer a language system from experience and interaction?",
    rgb: "244, 114, 182",
    icon: Sprout,
    position: { x: 27, y: 77 },
  },
};

export default function LinguisticsPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const stages: CommunicationStage[] = context.children.map((child) => {
    const meta = META[child.id] ?? META["social.linguistics.structure"];
    return {
      id: child.id,
      label: child.label,
      question: meta.question,
      summary: child.description ?? "",
      rgb: meta.rgb,
      href: child.href,
      status: child.status === "placeholder" ? "planned" : "active",
      icon: meta.icon,
      position: meta.position,
    };
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030906] text-slate-100 selection:bg-lime-400/25">
      <LanguageSignalBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#030906]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Social Science", href: "/social-science" },
              { label: "Linguistics" },
            ]}
            eyebrow="Structure · processing · variation · acquisition · change"
            eyebrowStyle="pill"
            icon={Languages}
            title={<span>Linguistics</span>}
            subtitle="Linguistics studies language as a structured system, a cognitive process, a social practice, a learned capacity, and a changing historical object. These are different scales of the same communication loop."
            accentRgb="132, 204, 22"
            titleClassName="font-sans text-[clamp(2.9rem,5.5vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f7ffe9]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div className="rounded-[28px] border border-lime-200/[0.11] bg-black/[0.11] p-5 shadow-[0_28px_95px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-lime-200/70">The object of study</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,2.9rem)] font-semibold tracking-[-0.05em] text-white">Language is not only a dictionary plus grammar rules.</h2>
            <p className="mt-3 max-w-3xl text-[11px] leading-6 text-slate-400">A speaker turns intentions into structured signals; a listener infers structure and meaning from those signals; both draw on learned conventions that vary across groups and change across time. Linguistics studies every part of that loop.</p>
          </div>
          <div className="grid grid-cols-4 gap-2 rounded-[28px] border border-white/[0.08] bg-black/[0.11] p-3 backdrop-blur-xl">
            <SignalStep icon={Mic2} label="Produce" rgb="132, 204, 22" />
            <SignalStep icon={Waves} label="Signal" rgb="34, 211, 238" />
            <SignalStep icon={Ear} label="Perceive" rgb="167, 139, 250" />
            <SignalStep icon={MessageCircle} label="Interpret" rgb="244, 114, 182" />
          </div>
        </section>

        <section className="mt-5">
          <CommunicationLoopTopology stages={stages} />
        </section>

        <section className="mt-5 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.12] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:p-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/65"><Clock3 size={12} /> Three timescales</div>
              <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">The same language system can be studied over milliseconds, years, or centuries.</h2>
            </div>
            <p className="text-[10px] leading-5 text-slate-500">Different subfields often differ less in “topic” than in the timescale and population over which they ask the question.</p>
          </div>
          <div className="grid md:grid-cols-3">
            <TimeScale label="Milliseconds to seconds" title="Processing" text="How quickly can a listener recognize sounds, predict words, resolve ambiguity, and assemble sentence structure?" rgb="167, 139, 250" />
            <TimeScale label="Months to decades" title="Learning & variation" text="How do individuals acquire patterns, adapt to interlocutors, and participate in socially structured variation?" rgb="34, 211, 238" />
            <TimeScale label="Generations to millennia" title="Language change" text="How do repeated small variations accumulate into new sounds, words, grammatical systems, and language families?" rgb="251, 191, 36" />
          </div>
        </section>
      </div>
    </main>
  );
}

function SignalStep({ icon: Icon, label, rgb }: { icon: LucideIcon; label: string; rgb: string }) {
  return <div className="flex min-h-[132px] flex-col items-center justify-center rounded-[18px] border border-white/[0.06] bg-white/[0.012] text-center"><Icon size={16} style={{ color: `rgb(${rgb})` }} /><span className="mt-3 font-mono text-[7px] uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.62)` }}>{label}</span></div>;
}

function TimeScale({ label, title, text, rgb }: { label: string; title: string; text: string; rgb: string }) {
  return (
    <div className="min-h-[190px] border-b border-white/[0.06] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-6">
      <div className="font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.60)` }}>{label}</div>
      <h3 className="mt-4 text-[16px] font-semibold text-white">{title}</h3>
      <p className="mt-2 text-[9px] leading-5 text-slate-600">{text}</p>
    </div>
  );
}
