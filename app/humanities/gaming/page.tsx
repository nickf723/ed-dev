import Link from "next/link";
import { ArrowRight, BookOpen, Gamepad2, History, Layers3, Palette, ScrollText, Users } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { GAMING_CURRICULUM } from "@/lib/curriculum/humanities/gaming";
import GamingBackground from "./GamingBackground";
import RuleSystemLab from "./RuleSystemLab";
import TimelineJumper from "./TimelineJumper";

const RGB = [
  "251,191,36",
  "52,211,153",
  "34,211,238",
  "244,114,182",
  "192,132,252",
  "96,165,250",
  "251,146,60",
  "148,163,184",
  "248,113,113",
] as const;

const PRINCIPLES = [
  ["Rules create possibility", "A rule defines what actions are legal, when they may occur, what they cost, how state changes, and what counts as progress or completion."],
  ["Players make meaning through action", "A designed system becomes play only when people interpret situations, form goals, take actions, respond to feedback, coordinate, improvise, experiment, or resist the expected use."],
  ["Uncertainty takes many forms", "Dice, shuffled cards, hidden information, simultaneous choices, unknown opponents, procedural systems, dexterity, incomplete knowledge, and human unpredictability produce different kinds of uncertainty."],
  ["Theme and mechanics interact", "Rules can support, complicate, contradict, or transform a game's fiction and representation. Neither mechanics nor story automatically explains the whole experience."],
  ["Games exist in communities", "House rules, mods, tournaments, streaming, speedrunning, fandom, accessibility practices, criticism, preservation, and social norms can reshape a game after release."],
  ["Balance is contextual", "Symmetry, fairness, strategic diversity, accessibility, difficulty, pacing, and competitive integrity are different design questions. A single balance score cannot answer all of them."],
] as const;

export default function GamingPage() {
  const branches = GAMING_CURRICULUM.children ?? [];

  return (
    <SceneFrame
      background={<GamingBackground />}
      className="bg-[#090815] text-slate-100 selection:bg-fuchsia-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(9,8,21,0.49)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Humanities", href: "/humanities" }, { label: "Gaming" }]}
          eyebrow="Rules · state · choice · feedback · players · culture"
          eyebrowStyle="rule"
          icon={Gamepad2}
          title={<span>Gaming</span>}
          subtitle="Study games as designed rule systems and lived forms of play across boards, cards, roleplaying, digital software, competitive scenes, stories, communities, technologies, and cultural history."
          accentRgb="217, 70, 239"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#fdf4ff]"
          headerClassName="border-fuchsia-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-fuchsia-100/[0.10] py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,8,21,0.44),transparent_31%,transparent_72%,rgba(6,16,22,0.36))] backdrop-blur-[2px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/62"><BookOpen size={14} /> Primary navigation · rulebook index</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">A game is a possibility machine someone can actually play.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">The table behind the page mixes an abstract board, cards, dice, pawns, a character sheet, controller, rulebook, and turn rail. Those objects belong to different game traditions, but all point toward the same design questions: what state exists now, what can a player do, what happens next, and how does the system communicate the result?</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/humanities/culture" icon={Users} label="Culture" note="communities, circulation, meaning" />
            <Neighbor href="/humanities/literature" icon={ScrollText} label="Literature" note="narrative, genre, interpretation" />
            <Neighbor href="/formal-science/computer-science" icon={Layers3} label="Computer Science" note="software, algorithms, computation" />
            <Neighbor href="/humanities/visual-arts" icon={Palette} label="Visual Arts" note="image, interface, material form" />
          </div>
        </div>

        <div className="relative mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch, index) => {
            const rgb = RGB[index % RGB.length];
            const isActive = branch.status === "active";
            const body = <><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.68)` }}>GM.{String(index + 1).padStart(2, "0")}</span><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">{isActive ? "open" : "planned"}</span></div><strong className="mt-2 block text-[14px] text-white/84">{branch.label}</strong><p className="mt-2 text-[11px] leading-4 text-slate-500">{branch.description}</p>{isActive ? <span className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: `rgba(${rgb},0.62)` }}>Open branch <ArrowRight size={10} /></span> : null}</>;
            const classes = "min-h-[145px] border-b border-white/[0.06] px-4 py-4 backdrop-blur-[7px] md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0";
            return isActive ? <Link key={branch.id} href={branch.href} className={`${classes} group transition hover:bg-white/[0.025]`}>{body}</Link> : <div key={branch.id} aria-disabled="true" className={classes}>{body}</div>;
          })}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/58">Signature instrument · rules & state</div><h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">Change one rule and an entirely different landscape of choices appears.</h2></div>
          <p className="text-[12px] leading-5 text-slate-500">The board below is deliberately abstract. It isolates the relationship among movement rules, legal transitions, action economy, blockers, reachability, and shortest paths without pretending those quantities define fun or strategic quality.</p>
        </div>
        <RuleSystemLab />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_370px] xl:items-start">
        <div>
          <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-fuchsia-200/56"><History size={13} /> Separate instrument · selected history</div>
          <TimelineJumper />
        </div>
        <Surface variant="open" className="rounded-[28px] border-fuchsia-100/[0.08]" style={{ background: "rgba(9,8,21,0.025)" }}>
          <div className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">What the timeline is for</div>
            <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">History is not a hardware upgrade tree.</h3>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">The sampler preserves the old time-jump idea while abandoning the claim that games march through one clean sequence toward a final modern form. Board games, roleplaying, physical play, arcades, consoles, computer games, online communities, and experimental forms overlap.</p>
          </div>
          <div className="border-y border-white/[0.07] px-5 py-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-cyan-200/44">Design loop</span>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
              {['State','Choice','Action','Resolution','Feedback','New state'].map((label, index, values) => <span key={label} className="flex items-center gap-2"><span className="border border-white/[0.07] bg-black/[0.04] px-2 py-1.5 text-slate-400">{label}</span>{index < values.length - 1 ? <ArrowRight size={10} className="text-slate-700" /> : null}</span>)}
            </div>
          </div>
          <p className="p-5 text-[11px] leading-5 text-slate-500">Not every game uses turns, explicit goals, winners, randomness, narrative, or competition. The vocabulary here is a toolkit, not a definition that excludes edge cases.</p>
        </Surface>
      </section>

      <section className="mt-9 border-t border-fuchsia-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/54"><Gamepad2 size={13} /> Design principles · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">The rules matter. So do the people who actually play them.</h2></div>
          <p className="text-[13px] leading-6 text-slate-400/70">Games can be studied as mathematics, software, stories, interfaces, performances, markets, communities, historical artifacts, expressive works, and social institutions. The parent keeps rules and play connected rather than choosing only one lens.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {PRINCIPLES.map(([term, detail], index) => <div key={term} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[10px] text-fuchsia-200/38">0{index + 1}</span><span><strong className="block text-[13px] text-slate-200/86">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{detail}</span></span></div>)}
        </div>
      </section>
    </SceneFrame>
  );
}

function Neighbor({ href, icon: Icon, label, note }: { href: string; icon: typeof BookOpen; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[72px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="flex items-center gap-2 text-[11px] font-semibold text-white/78"><Icon size={12} className="text-cyan-200/52" />{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-4 text-slate-600">{note}</span><ArrowRight size={10} className="text-slate-600 transition group-hover:translate-x-1" /></span></Link>;
}
