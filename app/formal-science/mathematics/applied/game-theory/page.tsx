import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowRight,
  BrainCircuit,
  Clock3,
  Eye,
  Handshake,
  Network,
  Scale,
  Target,
  UsersRound,
} from "lucide-react";
import PayoffMatrix from "./_components/PayoffMatrix";

const NODE_ID = "formal.mathematics.applied.game-theory";

const GAME_ANATOMY = [
  {
    icon: UsersRound,
    label: "Players",
    detail: "The decision-makers whose outcomes are being modeled. A player can represent a person, firm, state, organism, algorithm, coalition, or other strategic agent.",
    rgb: "125, 211, 252",
  },
  {
    icon: Target,
    label: "Strategies",
    detail: "The actions or contingent plans available to each player. A strategy can be a single move or a rule for acting after many possible histories.",
    rgb: "250, 204, 21",
  },
  {
    icon: Scale,
    label: "Payoffs",
    detail: "Numbers that encode each player's ranking of outcomes. Their scale matters less than the preference structure they represent.",
    rgb: "52, 211, 153",
  },
  {
    icon: Eye,
    label: "Information",
    detail: "What each player knows when acting: previous moves, private types, probabilities, signals, rules, or the choices available to others.",
    rgb: "192, 132, 252",
  },
  {
    icon: Clock3,
    label: "Timing",
    detail: "Whether choices are simultaneous, sequential, repeated, observed, hidden, or made under commitments changes the strategic structure.",
    rgb: "244, 114, 182",
  },
] as const;

const SOLUTION_IDEAS = [
  ["Best response", "A strategy that gives a player the highest payoff among their available choices, given what the other players are doing."],
  ["Dominant strategy", "A strategy that is a best response regardless of the other players' strategies. Many games do not have one."],
  ["Nash equilibrium", "A strategy profile in which no player can improve their payoff by changing only their own strategy."],
  ["Efficiency", "An equilibrium can be strategically stable without maximizing total welfare or making every player as well off as another feasible outcome."],
] as const;

const GAME_FORMS = [
  ["Zero-sum", "One player's gain is exactly another player's loss, so the total payoff is fixed across outcomes."],
  ["General-sum", "Players' interests can conflict in some dimensions and align in others, allowing competition, coordination, bargaining, or mutual benefit."],
  ["Sequential", "Players move at different times and may condition later actions on earlier choices, making credible threats and commitments important."],
  ["Repeated", "The same strategic interaction occurs again, so reputation, punishment, reciprocity, and long-run incentives can change behavior."],
  ["Incomplete information", "Players are uncertain about other players' types, preferences, information, or available actions and reason using beliefs."],
  ["Evolutionary", "Strategies spread or decline in populations according to relative performance rather than requiring perfectly calculating individual players."],
] as const;

export default function GameTheoryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090704] text-slate-100 selection:bg-amber-300/25">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_15%,rgba(251,191,36,0.12),transparent_29%),radial-gradient(circle_at_18%_84%,rgba(52,211,153,0.045),transparent_28%),linear-gradient(to_bottom,rgba(9,7,4,0.05),rgba(9,7,4,0.80)_78%,rgba(6,4,2,0.98))]" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] [background-image:linear-gradient(rgba(251,191,36,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.07)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#090704]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Players · strategies · incentives · information · equilibrium"
            eyebrowStyle="rule"
            icon={Network}
            title={<span>Game Theory</span>}
            subtitle="Game theory studies decisions whose consequences depend on other decision-makers. It formalizes players, strategies, information, timing, and payoffs so strategic incentives can be analyzed instead of guessed from isolated choices."
            accentRgb="250, 204, 21"
            titleClassName="font-sans text-[clamp(3rem,5.7vw,6.2rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fffceb]"
            headerClassName="border-amber-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-amber-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-200/58"><BrainCircuit size={13} /> Anatomy of a game</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">The same actions can imply different strategies when incentives, timing, or information change.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">Before solving a game, specify who acts, what they can choose, what each player values, what they know, and when they move. Equilibrium concepts only make sense relative to that model.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-5">
            {GAME_ANATOMY.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[220px] border-b border-white/[0.06] px-5 py-5 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                  <div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)`, background: `rgba(${item.rgb},0.035)` }}><Icon size={15} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                  <h3 className="mt-5 text-[14px] font-semibold text-white/86">{item.label}</h3>
                  <p className="mt-3 text-[10px] leading-5 text-slate-600">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-6"><PayoffMatrix /></div>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/52"><Handshake size={12} /> Solution ideas</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Equilibrium describes strategic stability, not moral goodness or collective perfection.</h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {SOLUTION_IDEAS.map(([name, detail], index) => (
                <article key={name} className="min-h-[170px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <span className="font-mono text-[8px] text-amber-200/34">0{index + 1}</span><h3 className="mt-3 text-[12px] font-semibold text-white/84">{name}</h3><p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="p-5 sm:p-6">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/50">Common game structures · reference</div>
              <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">Change the structure and the strategic logic can change with it.</h2>
            </div>
            <div className="border-t border-white/[0.07]">
              {GAME_FORMS.map(([name, detail], index) => <div key={name} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 border-b border-white/[0.055] px-4 py-3 last:border-b-0"><span className="font-mono text-[8px] text-amber-200/30">0{index + 1}</span><span><strong className="block text-[10px] text-slate-200/80">{name}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-600">{detail}</span></span></div>)}
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/social-science/economics" label="Economics" note="Markets, bargaining, incentives, auctions, and industrial organization use game-theoretic models extensively." rgb="52, 211, 153" />
          <Neighbor href="/natural-science/biology" label="Biology" note="Evolutionary game theory studies frequency-dependent strategies and population dynamics." rgb="74, 222, 128" />
          <Neighbor href="/formal-science/mathematics/applied" label="Applied Mathematics" note="Return to the broader modeling and optimization toolkit." rgb="34, 211, 238" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
