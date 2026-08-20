import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  BookOpen,
  Building2,
  MessageCircle,
  Mic,
  Network,
  Radio,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import CommunicationCycle from "./CommunicationCycle";
import SignalWave from "./SignalWave";
import { HERO_IMAGE } from "./_assets/media";
import { VOCAB } from "./_assets/vocab";

const NODE_ID = "social.communications";

type BranchMeta = {
  icon: LucideIcon;
  channel: string;
  question: string;
  rgb: string;
  index: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "social.communications.interpersonal": {
    icon: MessageCircle,
    channel: "person ↔ person",
    question: "How do people negotiate meaning, identity, trust, conflict, and relationship in interaction?",
    rgb: "34,211,238",
    index: "01",
  },
  "social.communications.groups-organizations": {
    icon: Building2,
    channel: "team ↔ institution",
    question: "How does communication coordinate roles, leadership, culture, expertise, and collective action?",
    rgb: "94,234,212",
    index: "02",
  },
  "social.communications.media": {
    icon: Radio,
    channel: "institution → public",
    question: "How do media institutions select, frame, circulate, and represent information for large audiences?",
    rgb: "167,139,250",
    index: "03",
  },
  "social.communications.digital": {
    icon: Network,
    channel: "network ↔ network",
    question: "What changes when platforms, algorithms, interfaces, and connected audiences mediate interaction?",
    rgb: "96,165,250",
    index: "04",
  },
  "social.communications.rhetoric": {
    icon: Mic,
    channel: "message → audience",
    question: "How do evidence, framing, credibility, emotion, form, and audience shape persuasion?",
    rgb: "244,114,182",
    index: "05",
  },
  "social.communications.theory-methods": {
    icon: Search,
    channel: "question → evidence",
    question: "How can communication be modeled, measured, interpreted, compared, and studied responsibly?",
    rgb: "250,204,21",
    index: "06",
  },
};

export default function CommunicationsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<SignalWave />}
      className="bg-[#0a0b2a] text-indigo-50 selection:bg-cyan-400/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(8,9,34,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Message · channel · audience · medium · feedback · interpretation"
          eyebrowStyle="rule"
          icon={Radio}
          title={<span>Communication Studies</span>}
          subtitle="Communication is not simply information moving from A to B. People encode, interpret, negotiate, amplify, ignore, distort, and answer messages through relationships, institutions, media systems, technologies, and culture."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6.1rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#f2fdff]"
          headerClassName="border-cyan-100/[0.09]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-cyan-100/[0.12] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,45,0.22),rgba(10,11,42,0.08)_58%,transparent_84%)] backdrop-blur-[3px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.72fr)]">
          <div className="min-w-0">
            <div className="max-w-4xl px-1">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-200/72">
                <Network size={14} /> Primary navigation · communication channels
              </div>
              <h2 className="mt-2 text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
                Change the channel and the social problem changes with it.
              </h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-6 text-indigo-100/68">
                The six branches are direct peers. The labels below describe the dominant communication relationship each branch often studies, not a hierarchy from simple to advanced.
              </p>
            </div>

            <nav aria-label="Communication Studies branches" className="mt-5 grid gap-2.5">
              {context.children.map((child) => (
                <ChannelRoute key={child.id} child={child} />
              ))}
            </nav>
          </div>

          <ChannelMap />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/68">
              <Radio size={14} /> Signal-path instrument · preserved and refined
            </div>
            <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,3.3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
              A message can change before anyone disagrees with it.
            </h2>
          </div>
          <span className="max-w-md text-[12px] leading-5 text-indigo-200/50">
            Transmission models isolate useful stages, but real communication is often simultaneous, relational, culturally situated, and shaped by unequal power.
          </span>
        </div>
        <CommunicationCycle />
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
        <SignalLibrary />
        <HistoricChannel />
      </section>
    </SceneFrame>
  );
}

function ChannelRoute({ child }: { child: CurriculumNode }) {
  const meta = BRANCH_META[child.id] ?? {
    icon: MessageCircle,
    channel: "communication branch",
    question: child.description ?? "Explore this branch of communication studies.",
    rgb: "34,211,238",
    index: "--",
  };
  const Icon = meta.icon;
  const planned = child.status === "placeholder";
  const body = (
    <Surface
      variant="glass"
      className={`group relative overflow-hidden rounded-l-[16px] rounded-r-[30px] p-0 transition ${planned ? "opacity-58" : "hover:translate-x-1"}`}
      style={{
        borderColor: `rgba(${meta.rgb},${planned ? 0.08 : 0.18})`,
        background: `linear-gradient(90deg,rgba(8,13,42,0.50),rgba(${meta.rgb},0.045)_55%,rgba(5,7,27,0.08))`,
        boxShadow: planned ? undefined : `inset 3px 0 0 rgba(${meta.rgb},0.48)`,
      }}
    >
      <div className="grid min-h-[82px] gap-3 px-4 py-3 sm:grid-cols-[38px_44px_185px_minmax(0,1fr)_24px] sm:items-center sm:px-5">
        <span className="font-mono text-[11px] text-indigo-300/35">{meta.index}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.26)`, background: `rgba(${meta.rgb},0.045)` }}>
          <Icon size={17} />
        </span>
        <span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${meta.rgb},0.72)` }}>{meta.channel}</span>
          <strong className="mt-0.5 block text-[16px] font-semibold text-white">{child.label}</strong>
        </span>
        <span className="text-[12px] leading-5 text-indigo-100/56">{meta.question}</span>
        {planned ? <span className="h-2 w-2 rounded-full border border-white/[0.14]" /> : <ArrowRight size={15} className="text-white/30" />}
      </div>
    </Surface>
  );
  return planned ? <div aria-disabled="true">{body}</div> : <Link href={child.href}>{body}</Link>;
}

function ChannelMap() {
  const stages = [
    { label: "Encode", note: "turn intention into an observable form", rgb: "34,211,238" },
    { label: "Transmit", note: "move through a medium and its constraints", rgb: "167,139,250" },
    { label: "Interpret", note: "construct meaning using context and expectation", rgb: "244,114,182" },
    { label: "Respond", note: "feedback changes the next message", rgb: "94,234,212" },
  ] as const;

  return (
    <Surface variant="ghost" className="relative min-h-[550px] overflow-hidden rounded-[30px] border-cyan-100/[0.09]" style={{ background: "rgba(6,8,31,0.07)" }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(34,211,238,0.08),transparent_24%)]" />
      <div className="relative p-5">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/62">Shared signal loop</div>
        <p className="mt-2 max-w-md text-[13px] leading-5 text-indigo-100/54">Different communication fields study different parts of a process that is usually recursive rather than one-way.</p>
      </div>

      <div className="absolute inset-x-5 bottom-6 top-[108px]">
        <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-100/[0.16] bg-black/[0.10] p-4 text-center backdrop-blur-[12px]">
          <span>
            <MessageCircle size={20} className="mx-auto text-cyan-200/72" />
            <strong className="mt-3 block text-[17px] text-white">Meaning</strong>
            <span className="mt-1 block text-[11px] leading-4 text-indigo-200/48">never travels without context</span>
          </span>
        </div>

        {stages.map((stage, index) => {
          const angle = -Math.PI / 2 + index * (Math.PI / 2);
          const x = 50 + Math.cos(angle) * 34;
          const y = 50 + Math.sin(angle) * 34;
          return (
            <div key={stage.label} className="absolute w-[150px] -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg,transparent,rgba(${stage.rgb},0.42),transparent)` }} />
              <strong className="mt-2 block text-center text-[13px]" style={{ color: `rgb(${stage.rgb})` }}>{stage.label}</strong>
              <span className="mt-1 block text-center text-[11px] leading-4 text-indigo-100/44">{stage.note}</span>
            </div>
          );
        })}
      </div>
    </Surface>
  );
}

function SignalLibrary() {
  return (
    <section className="border-t border-indigo-100/[0.10] pt-5">
      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-pink-200/64">
        <BookOpen size={14} /> Signal library · reference, not navigation
      </div>
      <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.045em] text-white">A small vocabulary for tracing where meaning can change.</h2>
      <div className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.08]">
        {VOCAB.slice(0, 6).map((item, index) => (
          <div key={item.id} className="grid gap-3 py-4 sm:grid-cols-[34px_170px_120px_minmax(0,1fr)] sm:items-start">
            <span className="font-mono text-[11px] text-indigo-300/30">0{index + 1}</span>
            <strong className="text-[14px] text-white/86">{item.term}</strong>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-cyan-200/50">{item.category}</span>
            <span className="text-[13px] leading-5 text-indigo-100/54">{item.def}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HistoricChannel() {
  return (
    <Surface variant="glass" className="overflow-hidden rounded-[28px] border-indigo-100/[0.10]" style={{ background: "rgba(8,9,34,0.27)" }}>
      <div className="relative h-[250px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center grayscale-[0.25]" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,42,0.08),rgba(8,9,34,0.88))]" />
        <div className="absolute inset-x-5 bottom-5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-100/58">Historical channel</div>
          <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-white">Technology changes reach, speed, storage, and who can answer.</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[13px] leading-6 text-indigo-100/58">Telephones, broadcast systems, printing, social platforms, and messaging networks do more than carry the same message faster. Each medium changes audience structure, persistence, visibility, feedback, and the institutions that control distribution.</p>
        <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-indigo-200/42">
          <span className="border-l border-cyan-200/24 pl-3">reach ↗</span>
          <span className="border-l border-violet-200/24 pl-3">feedback ↔</span>
          <span className="border-l border-pink-200/24 pl-3">persistence ⌁</span>
          <span className="border-l border-teal-200/24 pl-3">gatekeeping ◇</span>
        </div>
      </div>
    </Surface>
  );
}
