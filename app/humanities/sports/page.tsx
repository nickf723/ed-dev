import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { SPORTS_CURRICULUM } from "@/lib/curriculum/humanities/sports";
import { ArrowRight, BookOpen, Brain, Database, Gauge, History, ShieldCheck, Trophy, Users } from "lucide-react";
import PlaybookBackground from "./PlaybookBackground";
import TacticalSpacingLab from "./TacticalSpacingLab";
import BiomechanicsLab from "./BiomechanicsLab";

const BRANCH_RGB = [
  "251,191,36",
  "244,114,182",
  "52,211,153",
  "251,146,60",
  "125,211,252",
  "192,132,252",
  "96,165,250",
  "45,212,191",
  "248,113,113",
] as const;

const PRINCIPLES = [
  ["Rules make the game", "A sport is not just movement. Rules, boundaries, scoring, equipment, officiating, and competition formats create the problem athletes are trying to solve."],
  ["Skill is adaptive", "Technique matters, but expertise also depends on perceiving changing information and selecting actions under pressure, uncertainty, fatigue, opponents, and time constraints."],
  ["Tactics are relational", "Spacing, support, matchups, tempo, deception, possession, transitions, and risk only make sense in relation to teammates, opponents, rules, and game state."],
  ["Measurement needs context", "A metric can describe part of performance without explaining why it happened. Role, opponent, sample, tactical context, selection effects, and uncertainty can change interpretation."],
  ["Training is not competition", "Practice can isolate a skill or overload a capacity, but transfer depends on how well training preserves the information, decisions, timing, and constraints that matter in performance."],
  ["Sport is cultural", "Teams, leagues, rituals, identities, media, labor, institutions, access, fandom, and history shape what competition means far beyond the scoreboard."],
] as const;

export default function SportsPage() {
  const branches = SPORTS_CURRICULUM.children ?? [];

  return (
    <SceneFrame
      background={<PlaybookBackground />}
      className="bg-[#06110d] text-slate-100 selection:bg-emerald-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(5,17,13,0.48)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Humanities", href: "/humanities" }, { label: "Sports" }]}
          eyebrow="Rules · skill · tactics · competition · culture"
          eyebrowStyle="rule"
          icon={Trophy}
          title={<span>Sports</span>}
          subtitle="Study games and athletic practices as rule-bound human performances: people learn skills, coordinate with teammates, adapt to opponents, train capacities, measure outcomes, build institutions, and attach cultural meaning to competition."
          accentRgb="52, 211, 153"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#f0fdf4]"
          headerClassName="border-emerald-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-emerald-100/[0.10] py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,13,0.42),transparent_32%,transparent_72%,rgba(6,12,16,0.34))] backdrop-blur-[2px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-emerald-200/62"><BookOpen size={14} /> Primary navigation · playbook index</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Read sport from the rules outward.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">The stadium chalkboard behind the page deliberately overlays several field and court grammars. The point is not to claim all sports are the same. It is to make visible that every sport creates a constrained space in which skill, tactics, training, measurement, institutions, and culture interact.</p>
          </div>
          <Link href="/humanities/sports/repository" className="group border border-amber-200/[0.14] bg-black/[0.07] p-4 backdrop-blur-[10px] transition hover:bg-black/[0.13]">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-amber-200/58"><Database size={12} /> Active utility</div>
            <strong className="mt-2 block text-[16px] text-white/86">Sports Repository</strong>
            <span className="mt-2 flex items-center justify-between gap-3 text-[11px] leading-5 text-slate-500">Teams, leagues, seasons, players, and other reference material.<ArrowRight size={12} className="shrink-0 transition group-hover:translate-x-1" /></span>
          </Link>
        </div>

        <div className="relative mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch, index) => {
            const rgb = BRANCH_RGB[index % BRANCH_RGB.length];
            return (
              <div key={branch.id} aria-disabled="true" className="min-h-[124px] border-b border-white/[0.06] px-4 py-4 backdrop-blur-[7px] md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.68)` }}>SP.{String(index + 1).padStart(2, "0")}</span><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">planned</span></div>
                <strong className="mt-2 block text-[14px] text-white/84">{branch.label}</strong>
                <p className="mt-2 text-[11px] leading-4 text-slate-500">{branch.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div><div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-orange-200/58">Signature instrument · tactics</div><h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">A game state is a web of relationships, not a set of isolated player dots.</h2></div>
          <p className="text-[12px] leading-5 text-slate-500">This board uses a generic invasion-game space because spacing concepts are easy to see there. The descriptions stay intentionally broad rather than declaring a single sport, formation, or doctrine to be universal.</p>
        </div>
        <TacticalSpacingLab />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px] xl:items-start">
        <div>
          <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-200/56"><Gauge size={13} /> Neighboring analytical lens · mechanics</div>
          <BiomechanicsLab />
        </div>
        <Surface variant="open" className="rounded-[28px] border-emerald-100/[0.08]" style={{ background: "rgba(4,13,10,0.025)" }}>
          <div className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">Neighboring fields</div>
            <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">Sport borrows tools without becoming those tools.</h3>
          </div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.07]">
            <Neighbor href="/natural-science/physics" icon={Gauge} label="Physics" note="forces, motion, energy, equipment" />
            <Neighbor href="/social-science/psychology" icon={Brain} label="Psychology" note="attention, motivation, stress, groups" />
            <Neighbor href="/applied-science/health" icon={Users} label="Health Sciences" note="training, rehabilitation, care, wellbeing" />
            <Neighbor href="/formal-science/data-science" icon={Database} label="Data Science" note="measurement, models, uncertainty" />
          </div>
          <p className="p-5 text-[11px] leading-5 text-slate-500">The Sports parent keeps the competitive activity itself in view: rules, skill, opponents, tactics, training, institutions, spectators, and history remain the organizing center.</p>
        </Surface>
      </section>

      <section className="mt-9 border-t border-emerald-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/56"><ShieldCheck size={13} /> Field principles · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">The scoreboard is an outcome. The subject is the system that produced it.</h2></div>
          <p className="text-[13px] leading-6 text-slate-400/70">Sports can be studied through mechanics, physiology, psychology, data, history, sociology, economics, media, ethics, law, design, and culture. No single lens is the whole game.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {PRINCIPLES.map(([term, detail], index) => <div key={term} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[10px] text-emerald-200/38">0{index + 1}</span><span><strong className="block text-[13px] text-slate-200/86">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{detail}</span></span></div>)}
        </div>
      </section>
    </SceneFrame>
  );
}

function Neighbor({ href, icon: Icon, label, note }: { href: string; icon: typeof History; label: string; note: string }) {
  return <Link href={href} className="group flex items-center gap-3 px-4 py-3 transition hover:bg-white/[0.025]"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-emerald-200/60"><Icon size={13} /></span><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/78">{label}</strong><span className="block text-[10px] text-slate-600">{note}</span></span><ArrowRight size={11} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
