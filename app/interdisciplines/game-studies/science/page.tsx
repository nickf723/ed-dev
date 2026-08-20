import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import LudologyBackground from "../LudologyBackground";
import GameTheoryWidget from "./GameTheoryWidget";
import {
  ArrowRight,
  BarChart3,
  BookOpenText,
  Dices,
  FlaskConical,
  Gauge,
  Network,
  Puzzle,
  Users,
  type LucideIcon,
} from "lucide-react";

type Lens = {
  title: string;
  cue: string;
  question: string;
  icon: LucideIcon;
  rgb: string;
};

const LENSES: readonly Lens[] = [
  {
    title: "Formal systems",
    cue: "rules · states · incentives · strategy",
    question: "What behaviors are possible or rewarded by the rule system, information structure, resources, and payoff relationships?",
    icon: Puzzle,
    rgb: "167,139,250",
  },
  {
    title: "Player behavior",
    cue: "choice · skill · learning · error · coordination",
    question: "What do players actually do, how does behavior change with experience, and which observations distinguish competing explanations?",
    icon: Users,
    rgb: "34,211,238",
  },
  {
    title: "Game telemetry",
    cue: "event log · sequence · duration · outcome",
    question: "Which traces can a game record, what do those variables leave invisible, and how should repeated observations be compared?",
    icon: BarChart3,
    rgb: "94,234,212",
  },
  {
    title: "Experience & interpretation",
    cue: "meaning · narrative · identity · culture · play",
    question: "What does an action mean to a player or community, and which questions require interpretation rather than only counting events?",
    icon: BookOpenText,
    rgb: "250,204,21",
  },
] as const;

const EXPERIMENT_MOVES = [
  ["Define the manipulation", "Change one rule, interface, information condition, reward, opponent policy, tutorial, or other factor clearly enough to describe what differs."],
  ["Choose an outcome", "Decide whether the question concerns choice, success, time, learning, retention, cooperation, error, strategy, reported experience, or another measurable result."],
  ["Preserve context", "Skill, prior knowledge, platform, social setting, accessibility, incentives, genre expectations, and repeated exposure can all change the interpretation."],
  ["Compare explanations", "A pattern in telemetry does not explain itself. Ask which alternative mechanisms could create the same observed behavior."],
] as const;

const BOUNDARIES = [
  ["A rule is not a strategy", "Rules define the legal action space; strategy describes how an agent chooses within that space."],
  ["A metric is not an experience", "Completion time, win rate, clicks, or retention can be useful outcomes without exhausting what play felt like or meant."],
  ["Optimal is model-relative", "A mathematically optimal action depends on goals, information, payoffs, assumptions, and other agents. Real players may pursue different objectives."],
  ["Interpretation still needs evidence", "Narrative or cultural analysis is not made rigorous by pretending it is quantitative. Claims should still connect visibly to texts, play practices, communities, or artifacts."],
] as const;

export default function GameSciencePage() {
  return (
    <SceneFrame
      background={<LudologyBackground />}
      className="bg-[#07050d] text-slate-100 selection:bg-violet-300/25"
      maxWidthClassName="max-w-[1500px]"
      headerBackground="rgba(7,5,13,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Interdisciplines", href: "/interdisciplines" },
            { label: "Game Studies", href: "/interdisciplines/game-studies" },
            { label: "The Lab" },
          ]}
          eyebrow="Rules · players · evidence · experiments · interpretation"
          eyebrowStyle="rule"
          icon={FlaskConical}
          title={<span>Game Studies Lab</span>}
          subtitle="Study games as formal systems, behavioral environments, cultural artifacts, and sources of empirical evidence. Different questions require different kinds of proof."
          accentRgb="167, 139, 250"
          titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#faf7ff]"
          headerClassName="border-violet-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-violet-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(15,8,26,0.34),transparent_30%,transparent_70%,rgba(5,14,21,0.28))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-200/68"><Network size={14} /> Research map</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">A game can be a mathematical object, an experiment, a performance, and a cultural text at the same time.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">The mistake is not mixing methods. The mistake is asking one kind of evidence to answer a question it cannot answer. Formal analysis can prove properties of a rule model; telemetry can describe behavior; interviews can surface experience; interpretation can examine meaning and context.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/formal-science/mathematics/applied/game-theory" label="Game Theory" note="formal strategic interaction" rgb="239,68,68" />
            <Neighbor href="/social-science/psychology" label="Psychology" note="behavior · learning · cognition" rgb="96,165,250" />
            <Neighbor href="/humanities/gaming" label="Gaming" note="media · genres · practices" rgb="250,204,21" />
            <Neighbor href="/interdisciplines/game-studies/library" label="Game Library" note="specific games · rules · strategy" rgb="94,234,212" />
          </div>
        </div>

        <div className="relative mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {LENSES.map((lens) => <LensCard key={lens.title} lens={lens} />)}
        </div>
      </section>

      <section className="mt-8">
        <GameTheoryWidget />
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] xl:items-start">
        <Surface variant="glass" className="rounded-[24px] border-cyan-100/[0.09] p-5 sm:p-6" style={{ background: "rgba(5,12,18,0.16)" }}>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><Gauge size={13} /> Experimental reasoning</div>
          <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">If a design change matters, say what changed and what outcome would reveal it.</h2>
          <div className="mt-4 space-y-3">
            {EXPERIMENT_MOVES.map(([title, text], index) => (
              <div key={title} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] pb-3 last:border-b-0">
                <span className="font-mono text-[9px] text-cyan-200/42">0{index + 1}</span>
                <div><strong className="text-[13px] text-white">{title}</strong><p className="mt-1 text-[12px] leading-5 text-slate-400">{text}</p></div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface variant="open" className="rounded-[24px] border-amber-100/[0.08] p-5 sm:p-6 xl:sticky xl:top-[170px]">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/58"><Dices size={13} /> Method boundaries</div>
          <div className="mt-4 space-y-3">
            {BOUNDARIES.map(([title, text]) => <div key={title} className="rounded-[15px] border border-white/[0.06] bg-black/[0.10] p-3"><strong className="text-[12px] text-white/86">{title}</strong><p className="mt-1.5 text-[11px] leading-5 text-slate-400">{text}</p></div>)}
          </div>
        </Surface>
      </section>

      <section className="mt-8 rounded-[22px] border border-violet-100/[0.09] bg-violet-300/[0.022] p-5 backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-200/58">No fake child routes</div>
            <p className="mt-2 text-[13px] leading-6 text-slate-300/74">This lab is currently a methods surface rather than a directory. Game Theory already has a canonical home in Applied Mathematics, while mechanics, narrative, player research, and interpretation can grow here only when real curriculum routes exist.</p>
          </div>
          <Link href="/interdisciplines/game-studies" className="group flex items-center justify-between rounded-[16px] border border-white/[0.07] bg-black/[0.10] p-4 text-[12px] font-semibold text-white/80 transition hover:bg-black/[0.18]">Back to Game Studies <ArrowRight size={13} className="text-violet-200/55 transition group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </SceneFrame>
  );
}

function LensCard({ lens }: { lens: Lens }) {
  const Icon = lens.icon;
  return <div className="flex min-h-[210px] flex-col rounded-[19px] border p-4 backdrop-blur-[12px]" style={{ borderColor: `rgba(${lens.rgb},0.16)`, background: `linear-gradient(145deg,rgba(${lens.rgb},0.045),rgba(6,5,12,0.18))` }}><Icon size={17} style={{ color: `rgb(${lens.rgb})` }} /><div className="mt-4 font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${lens.rgb},0.66)` }}>{lens.cue}</div><h3 className="mt-1 text-[16px] font-semibold text-white">{lens.title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-400">{lens.question}</p></div>;
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[74px] flex-col justify-between rounded-[15px] border border-white/[0.07] bg-black/[0.08] p-3 backdrop-blur-[10px] transition hover:bg-black/[0.16]"><strong className="text-[12px] text-white/84">{label}</strong><span className="flex items-end justify-between gap-2"><span className="text-[10px] leading-4 text-slate-500">{note}</span><ArrowRight size={11} style={{ color: `rgba(${rgb},0.62)` }} className="transition group-hover:translate-x-1" /></span></Link>;
}
