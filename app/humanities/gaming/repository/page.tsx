import Link from "next/link";
import { ArrowRight, BookOpen, Boxes, Dices, FlaskConical, Sparkles, type LucideIcon } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import LudologyBackground from "@/app/interdisciplines/game-studies/LudologyBackground";
import GameBrowser from "@/app/interdisciplines/game-studies/library/GameBrowser";

export default function GameRepositoryPage() {
  const context = requireCurriculumPageContext("humanities.gaming.repository");

  return (
    <SceneFrame
      background={<LudologyBackground />}
      className="bg-[#07050d] text-slate-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1500px]"
      headerBackground="rgba(7,5,13,0.55)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Games · rules · histories · strategies · specimens"
          eyebrowStyle="rule"
          icon={BookOpen}
          title={<span>Game Repository</span>}
          subtitle="Use specific games as durable study objects. Read their rules, inspect their components, model their systems, and simulate play without separating entertainment from serious learning."
          accentRgb="250, 204, 21"
          titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fffbea]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,13,5,0.30),transparent_30%,transparent_70%,rgba(12,8,22,0.28))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/68"><Dices size={14} /> Specimen shelf</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">Start with an actual game, then ask what its particular system makes visible.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">A game can be studied formally, historically, strategically, socially, or interpretively. Those lenses stay attached to the concrete rules, components, and play practices of the selected game.</p>
          </div>
          <Link href="/humanities/gaming/ludology/lab" className="group rounded-[18px] border border-violet-200/[0.12] bg-violet-300/[0.025] p-4 backdrop-blur-xl transition hover:bg-violet-300/[0.045]">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-violet-200/58"><FlaskConical size={12} /> Need a method instead?</div>
            <strong className="mt-2 block text-[17px] text-white">Enter the Game Studies Lab</strong>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">Compare formal, behavioral, telemetry, historical, and interpretive methods without tying the question to one title.</p>
            <span className="mt-4 flex items-center justify-between text-[11px] font-semibold text-violet-100/72">Open lab <ArrowRight size={12} className="transition group-hover:translate-x-1" /></span>
          </Link>
        </div>
      </section>

      <section className="mt-7 grid gap-4 lg:grid-cols-2">
        <RepositoryPath href="/humanities/gaming/repository/board-games" icon={Boxes} rgb="251,146,60" cue="Collection · rules · components · simulation" title="Board Game Repository" description="Search classic board-game records, inspect each modeled ruleset and component inventory, then play a local simulation that enforces the core rules." />
        <RepositoryPath href="/humanities/gaming/repository/magic-the-gathering" icon={Sparkles} rgb="167,139,250" cue="Specimen · rules engine · deck construction" title="Magic: The Gathering" description="Read the card-and-zone rules engine, study deck construction as a constrained strategy, and manipulate a lightweight battlefield state sandbox." />
      </section>

      <section className="mt-7">
        <div className="mb-4 border-t border-white/[0.07] pt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-600">Individual specimens and planned records</div>
        <GameBrowser />
      </section>

      <section className="mt-8 border-t border-amber-100/[0.09] pt-5">
        <p className="max-w-4xl text-[12px] leading-6 text-slate-500">A planned specimen remains visible when it helps define the intended collection, but only records with substantive analysis routes are clickable. The repository can expand gradually without manufacturing placeholder destinations.</p>
      </section>
    </SceneFrame>
  );
}

function RepositoryPath({ href, icon: Icon, rgb, cue, title, description }: { href: string; icon: LucideIcon; rgb: string; cue: string; title: string; description: string }) {
  return (
    <Link href={href} className="group flex min-h-[220px] flex-col rounded-[24px] border p-5 backdrop-blur-xl transition hover:-translate-y-0.5" style={{ borderColor: `rgba(${rgb},0.14)`, background: `rgba(${rgb},0.035)` }}>
      <div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ borderColor: `rgba(${rgb},0.20)`, background: `rgba(${rgb},0.05)`, color: `rgb(${rgb})` }}><Icon size={19} /></span><ArrowRight size={14} className="text-white/30 transition group-hover:translate-x-1" /></div>
      <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.07em]" style={{ color: `rgba(${rgb},0.64)` }}>{cue}</div>
      <h2 className="mt-1 text-[25px] font-semibold tracking-[-0.04em] text-white">{title}</h2>
      <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">{description}</p>
    </Link>
  );
}
