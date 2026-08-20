import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import LeylineBackground from "./LeylineBackground";
import ArchetypeTriangle from "../ArchetypeTriangle";
import ManaCurveWidget from "./ManaCurveWidget";
import {
  ArrowLeft,
  ArrowRight,
  Layers3,
  Repeat2,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const QUESTIONS = [
  ["Win condition", "What game state is the deck trying to create, and what actually converts that state into a win?"],
  ["Timing window", "Which turns or stages of the game favor the plan, and what must happen before that window closes or the opponent stabilizes?"],
  ["Consistency", "How many cards perform the necessary roles, how redundant are the effects, and how often can the deck find the pieces it needs?"],
  ["Interaction", "Which opposing threats, engines, or resources must the deck answer, race, ignore, or prevent?"],
  ["Mana", "Can the deck cast the spells it needs on the turns and colors it expects, including the demands of double-pips, splashes, ramp, and utility lands?"],
  ["Adaptation", "How does the plan change on the play or draw, after sideboarding where applicable, or against a different opposing strategy?"],
] as const;

const RESOURCES = [
  { title: "Cards", text: "Raw card count matters, but card quality, selection, virtual advantage, recursion, and whether cards line up against the opponent also matter.", rgb: "96,165,250" },
  { title: "Mana", text: "Unused mana can represent lost opportunity, but spending every mana every turn is not automatically optimal when holding interaction or preserving flexibility matters.", rgb: "34,211,238" },
  { title: "Life", text: "Life total is a resource and a loss condition. The strategic value of one life point depends on clock, matchup, board, and future lines.", rgb: "248,113,113" },
  { title: "Time / tempo", text: "A play can trade material for time, force inefficient sequencing, or create a window where a threat matters before a slower advantage comes online.", rgb: "250,204,21" },
] as const;

export default function MTGStrategyPage() {
  return (
    <SceneFrame
      background={<LeylineBackground />}
      className="bg-[#08060d] text-slate-100 selection:bg-violet-300/25"
      maxWidthClassName="max-w-[1460px]"
      headerBackground="rgba(8,6,13,0.56)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Game Studies", href: "/interdisciplines/game-studies" },
            { label: "Game Library", href: "/interdisciplines/game-studies/library" },
            { label: "Magic: The Gathering", href: "/interdisciplines/game-studies/library/magic-the-gathering" },
            { label: "Strategy" },
          ]}
          eyebrow="Plan · resources · consistency · interaction · adaptation"
          eyebrowStyle="rule"
          icon={Target}
          title={<span>MTG Strategy</span>}
          subtitle="Treat a deck as a constrained strategic plan: it needs a way to win, a resource distribution that supports that plan, enough consistency to enact it, and a way to adapt when the opponent changes the problem."
          accentRgb="167, 139, 250"
          titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#faf7ff]"
          headerClassName="border-violet-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-violet-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(15,8,24,0.34),transparent_30%,transparent_70%,rgba(12,10,4,0.24))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-200/68"><Layers3 size={14} /> Deck as system</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">A strong card does not become a strong deck merely by joining other strong cards.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">Deck construction links probabilities, mana, role coverage, synergy, interaction, threat density, format constraints, and the expected environment. Strategy then assigns roles dynamically during actual games.</p>
          </div>
          <Link href="/interdisciplines/game-studies/library/magic-the-gathering/fundamentals" className="group rounded-[18px] border border-amber-200/[0.10] bg-amber-300/[0.02] p-4 backdrop-blur-xl transition hover:bg-amber-300/[0.04]">
            <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-amber-200/58">Need the rules frame?</div>
            <strong className="mt-2 block text-[17px] text-white">Return to Fundamentals</strong>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">Review zones, timing, card anatomy, and format structure before treating strategic shortcuts as universal rules.</p>
            <span className="mt-4 flex items-center justify-between text-[11px] font-semibold text-amber-100/72">open fundamentals <ArrowRight size={12} className="transition group-hover:translate-x-1" /></span>
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <ArchetypeTriangle />
      </section>

      <section className="mt-8">
        <ManaCurveWidget />
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
        <Surface variant="glass" className="rounded-[24px] border-cyan-100/[0.09] p-5 sm:p-6" style={{ background: "rgba(5,13,18,0.14)" }}>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/58"><Scale size={13} /> Resource accounting</div>
          <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">Not every exchange is measured in cards.</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {RESOURCES.map((resource) => <div key={resource.title} className="rounded-[16px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="h-1 w-8 rounded-full" style={{ background: `rgba(${resource.rgb},0.72)` }} /><strong className="mt-3 block text-[13px] text-white">{resource.title}</strong><p className="mt-1.5 text-[11px] leading-5 text-slate-400">{resource.text}</p></div>)}
          </div>
        </Surface>

        <Surface variant="open" className="rounded-[24px] border-emerald-100/[0.08] p-5 sm:p-6 xl:sticky xl:top-[170px]">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-emerald-200/58"><Repeat2 size={13} /> Role assignment changes</div>
          <h3 className="mt-2 text-[20px] font-semibold text-white">Your deck's label does not tell you your role in every game state.</h3>
          <p className="mt-3 text-[13px] leading-6 text-slate-400">A slower deck can become the aggressor when the opponent has stronger inevitability. An aggressive deck can protect a lead instead of extending into a sweeper. Strategic labels help organize expectations, but the board, life totals, hidden information, known ranges, and future turns determine the actual decision.</p>
        </Surface>
      </section>

      <section className="mt-8 border-t border-violet-100/[0.09] pt-5">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/58"><ShieldCheck size={13} /> Deck-building questions</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {QUESTIONS.map(([title, text], index) => <div key={title} className="grid min-h-[150px] grid-cols-[30px_minmax(0,1fr)] gap-3 rounded-[17px] border border-white/[0.07] bg-black/[0.10] p-4"><span className="font-mono text-[9px] text-violet-200/42">0{index + 1}</span><div><strong className="text-[13px] text-white/86">{title}</strong><p className="mt-1.5 text-[11px] leading-5 text-slate-400">{text}</p></div></div>)}
        </div>
      </section>

      <section className="mt-8 rounded-[22px] border border-amber-100/[0.08] bg-amber-300/[0.02] p-5 backdrop-blur-xl">
        <div className="flex items-start gap-3"><Sparkles size={16} className="mt-0.5 shrink-0 text-amber-200/70" /><div><strong className="text-[13px] text-white">There is no universally optimal mana curve, land count, archetype, or sideboard plan.</strong><p className="mt-2 text-[12px] leading-6 text-slate-400">Those choices depend on format rules, card pool, deck goals, color requirements, play/draw position, metagame, matchup, mulligan decisions, and card-specific interactions. Probability can constrain a decision without making the strategic answer context-free.</p></div></div>
      </section>

      <section className="mt-7 border-t border-white/[0.07] pt-5">
        <Link href="/interdisciplines/game-studies/library/magic-the-gathering" className="group inline-flex items-center gap-2 text-[11px] font-semibold text-violet-100/70 hover:text-white"><ArrowLeft size={13} className="transition group-hover:-translate-x-1" /> Back to Magic specimen</Link>
      </section>
    </SceneFrame>
  );
}
