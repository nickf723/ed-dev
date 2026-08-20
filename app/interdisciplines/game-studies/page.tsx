import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import LudologyBackground from "./LudologyBackground";
import {
  ArrowRight,
  BookOpen,
  Dices,
  FlaskConical,
  Gamepad2,
  Network,
  Puzzle,
  Users,
  type LucideIcon,
} from "lucide-react";

const ROUTES = [
  {
    title: "The Library",
    href: "/interdisciplines/game-studies/library",
    cue: "specific games · rules · history · strategy",
    question: "Which concrete game do you want to inspect as a specimen?",
    description: "Start with an actual game and keep the analysis attached to its rules, components, genre, history, community, and play practices.",
    icon: BookOpen,
    rgb: "250,204,21",
  },
  {
    title: "The Lab",
    href: "/interdisciplines/game-studies/science",
    cue: "formal · behavioral · telemetry · interpretive methods",
    question: "Which kind of evidence can answer the question you are asking?",
    description: "Start with a research method or analytical lens, then apply it to games without pretending one form of evidence can answer every question.",
    icon: FlaskConical,
    rgb: "167,139,250",
  },
] as const;

const OBJECTS: readonly { icon: LucideIcon; title: string; text: string; rgb: string }[] = [
  { icon: Puzzle, title: "Rules", text: "Legal actions, state transitions, information, resources, incentives, and failure or success conditions.", rgb: "167,139,250" },
  { icon: Users, title: "Players", text: "Skill, learning, strategy, cooperation, identity, accessibility, social norms, and lived play experience.", rgb: "34,211,238" },
  { icon: Gamepad2, title: "Artifacts", text: "Boards, cards, controllers, interfaces, audiovisual design, code, texts, expansions, patches, and recorded sessions.", rgb: "94,234,212" },
  { icon: Network, title: "Communities", text: "Genres, metagames, tournaments, fandoms, markets, modding, streaming, criticism, and historical circulation.", rgb: "244,114,182" },
] as const;

export default function GameStudiesPortal() {
  return (
    <SceneFrame
      background={<LudologyBackground />}
      className="bg-[#07050d] text-slate-100 selection:bg-violet-300/25"
      maxWidthClassName="max-w-[1480px]"
      headerBackground="rgba(7,5,13,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Interdisciplines", href: "/interdisciplines" },
            { label: "Game Studies" },
          ]}
          eyebrow="Games · play · systems · players · culture · evidence"
          eyebrowStyle="rule"
          icon={Dices}
          title={<span>Game Studies</span>}
          subtitle="Study games from two complementary starting points: concrete game specimens in the Library, or research methods and analytical lenses in the Lab."
          accentRgb="167, 139, 250"
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-[#faf7ff]"
          headerClassName="border-violet-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-violet-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(14,8,24,0.34),transparent_30%,transparent_70%,rgba(18,13,4,0.26))] backdrop-blur-[4px]" />
        <div className="relative">
          <div className="max-w-5xl">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-200/68">Choose the starting object</div>
            <h2 className="mt-2 text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">Do you have a game you want to study, or a question you want to investigate?</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">The split is about workflow, not competing definitions of the field. A Library specimen can be brought into the Lab, and a Lab method becomes useful only when it meets actual games, players, artifacts, or communities.</p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {ROUTES.map((route) => <PortalRoute key={route.href} route={route} />)}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58">What counts as evidence?</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">Games leave several kinds of trace, and none is the whole game.</h2>
          </div>
          <p className="text-[14px] leading-6 text-slate-400/72">A rulebook can establish legal moves. Telemetry can record actions. An interview can report experience. A tournament archive can document community practice. A critical reading can analyze representation or meaning. Good game studies keeps the evidence type attached to the claim.</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {OBJECTS.map((item) => <ObjectCard key={item.title} {...item} />)}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <Surface variant="glass" className="rounded-[22px] border-amber-100/[0.09] p-5" style={{ background: "rgba(19,13,4,0.12)" }}>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/58">Library question</div>
          <p className="mt-2 text-[14px] leading-6 text-slate-300/74">“How does Magic: The Gathering make deck construction part of strategic play?” starts from a particular game and can draw on rules, probability, history, tournament practice, and player strategy.</p>
        </Surface>
        <Surface variant="open" className="rounded-[22px] border-violet-100/[0.09] p-5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-200/58">Lab question</div>
          <p className="mt-2 text-[14px] leading-6 text-slate-300/74">“How does an opponent policy change cooperation across repeated rounds?” starts from a method and can be tested across several game structures.</p>
        </Surface>
      </section>
    </SceneFrame>
  );
}

function PortalRoute({ route }: { route: (typeof ROUTES)[number] }) {
  const Icon = route.icon;
  return (
    <Link href={route.href} className="group flex min-h-[280px] flex-col rounded-[26px] border p-5 backdrop-blur-xl transition hover:-translate-y-0.5" style={{ borderColor: `rgba(${route.rgb},0.18)`, background: `linear-gradient(145deg,rgba(${route.rgb},0.055),rgba(6,5,12,0.20))` }}>
      <div className="flex items-start justify-between gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-[15px] border" style={{ color: `rgb(${route.rgb})`, borderColor: `rgba(${route.rgb},0.28)`, background: `rgba(${route.rgb},0.045)` }}><Icon size={21} /></span><ArrowRight size={15} className="text-white/30 transition group-hover:translate-x-1" /></div>
      <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.07em]" style={{ color: `rgba(${route.rgb},0.68)` }}>{route.cue}</div>
      <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.04em] text-white">{route.title}</h3>
      <p className="mt-3 text-[15px] font-medium leading-6 text-slate-200/82">{route.question}</p>
      <p className="mt-3 text-[12px] leading-6 text-slate-400">{route.description}</p>
    </Link>
  );
}

function ObjectCard({ icon: Icon, title, text, rgb }: { icon: LucideIcon; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.10] p-4 backdrop-blur-[12px]"><Icon size={17} style={{ color: `rgb(${rgb})` }} /><strong className="mt-3 block text-[14px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-400">{text}</p></div>;
}
