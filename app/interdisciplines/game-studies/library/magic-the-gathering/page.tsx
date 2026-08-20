import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  ExternalLink,
  Layers3,
  Search,
  Sparkles,
  Swords,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import ManaBackground from "./ManaBackground";
import MtgBattleSimulator from "./MtgBattleSimulator";
import MtgCardFetcher from "./MtgCardFetcher";

const PATHS = [
  {
    title: "Fundamentals & Rules",
    href: "/interdisciplines/game-studies/library/magic-the-gathering/fundamentals",
    cue: "card anatomy · zones · priority · stack · turns · formats",
    question: "How does a card become an instruction inside the larger rules engine?",
    description: "Start with the objects and procedures that make a legal game state: card parts, zones, timing, priority, the stack, turn structure, and format constraints.",
    icon: BookOpen,
    rgb: "34,211,238",
  },
  {
    title: "Strategy & Deckbuilding",
    href: "/interdisciplines/game-studies/library/magic-the-gathering/strategy",
    cue: "plans · distributions · resources · roles · adaptation",
    question: "How does a deck turn a collection of cards into a repeatable plan?",
    description: "Study strategic plans as constrained systems shaped by mana, consistency, interaction, timing windows, opposing plans, and changing game roles.",
    icon: Brain,
    rgb: "167,139,250",
  },
] as const;

export default function MTGHubPage() {
  const context = requireCurriculumPageContext("inter.game-studies.library.magic-the-gathering");

  return (
    <SceneFrame
      background={<ManaBackground />}
      className="bg-[#09050f] text-slate-100 selection:bg-violet-300/25"
      maxWidthClassName="max-w-[1500px]"
      headerBackground="rgba(9,5,15,0.60)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Rules engine · customizable system · strategic specimen"
          eyebrowStyle="rule"
          icon={Sparkles}
          title={<span>Magic: The Gathering</span>}
          subtitle="Inspect Magic as both a rules engine and a customizable strategic system. Learn how cards, zones, priority, deck construction, probability, and adaptation combine without compressing a changing game into one universal shortcut."
          accentRgb="251, 191, 36"
          titleClassName="font-sans text-[clamp(2.7rem,5vw,5.6rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fffbea]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(25,15,3,0.24),transparent_32%,transparent_68%,rgba(15,7,23,0.30))] backdrop-blur-[4px]" />
        <div className="relative">
          <div className="max-w-5xl">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/68"><Layers3 size={14} /> Two connected entry points</div>
            <h2 className="mt-2 text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">Read the engine before treating strategic patterns as laws.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">Rules establish what actions and objects mean. Strategy asks which legal actions support a plan under uncertainty. The two paths stay separate enough to be usable, but each points back to the other.</p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {PATHS.map((path) => <StudyPath key={path.href} path={path} />)}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-rose-200/58"><Swords size={13} /> Battlefield state sandbox</div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.4vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">Build and manipulate a simple board state.</h2>
          <p className="mt-3 max-w-4xl text-[13px] leading-6 text-slate-500">Search for permanent cards, place them on a shared learning battlefield, tap or remove them, and track life. This sandbox models visible state manipulation; it does not adjudicate the comprehensive Magic rules.</p>
          <div className="mt-5"><MtgBattleSimulator /></div>
        </div>

        <aside className="xl:sticky xl:top-[154px]">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><Search size={13} /> Card specimen</div>
          <p className="mb-4 mt-2 text-[12px] leading-5 text-slate-500">Pull a random card record from Scryfall and inspect its visible printed structure beside the battlefield.</p>
          <MtgCardFetcher />
        </aside>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <Surface variant="glass" className="rounded-[22px] border-white/[0.08] p-5" style={{ background: "rgba(0,0,0,0.12)" }}>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">Scope boundary</div>
          <p className="mt-2 text-[13px] leading-6 text-slate-400">Card text, format legality, ban lists, product contents, tournament policy, and comprehensive rules can change. The Fundamentals page teaches stable structural ideas; current play should still consult current official resources for the exact format and card involved.</p>
        </Surface>
        <a href="https://magic.wizards.com/en/rules" target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-[20px] border border-amber-100/[0.10] bg-amber-300/[0.025] p-5 text-[12px] font-semibold text-amber-100/72 transition hover:bg-amber-300/[0.045]">
          Current official rules <ExternalLink size={13} className="transition group-hover:translate-x-0.5" />
        </a>
      </section>
    </SceneFrame>
  );
}

function StudyPath({ path }: { path: (typeof PATHS)[number] }) {
  const Icon = path.icon;
  return (
    <Link href={path.href} className="group flex min-h-[270px] flex-col rounded-[25px] border p-5 backdrop-blur-xl transition hover:-translate-y-0.5" style={{ borderColor: `rgba(${path.rgb},0.18)`, background: `linear-gradient(145deg,rgba(${path.rgb},0.052),rgba(9,5,15,0.20))` }}>
      <div className="flex items-start justify-between gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${path.rgb})`, borderColor: `rgba(${path.rgb},0.27)`, background: `rgba(${path.rgb},0.05)` }}><Icon size={19} /></span><ArrowRight size={14} className="text-white/28 transition group-hover:translate-x-1" /></div>
      <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.07em]" style={{ color: `rgba(${path.rgb},0.68)` }}>{path.cue}</div>
      <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.035em] text-white">{path.title}</h3>
      <p className="mt-3 text-[14px] font-medium leading-6 text-slate-200/82">{path.question}</p>
      <p className="mt-3 text-[12px] leading-6 text-slate-500">{path.description}</p>
    </Link>
  );
}
