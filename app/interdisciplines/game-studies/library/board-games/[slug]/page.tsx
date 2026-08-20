import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Box, Clock3, Gamepad2, PackageOpen, Users } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import CurriculumSiblingNav from "@/app/_components/CurriculumSiblingNav";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContextByHref } from "@/lib/curriculum/page-context";
import BoardShelfBackground from "../BoardShelfBackground";
import { BOARD_GAMES, boardGameHref, getBoardGame } from "../board-game-data";
import BoardGameSimulator from "./BoardGameSimulator";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BOARD_GAMES.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getBoardGame(slug);
  if (!game) return { title: "Board game not found" };
  return {
    title: `${game.title} · Board Game Repository`,
    description: game.summary,
  };
}

export default async function BoardGameRecordPage({ params }: PageProps) {
  const { slug } = await params;
  const game = getBoardGame(slug);
  if (!game) notFound();

  const context = requireCurriculumPageContextByHref(boardGameHref(game.slug));

  return (
    <SceneFrame
      background={<BoardShelfBackground accentRgb={game.accentRgb} />}
      className="bg-[#080604] text-slate-100 selection:bg-orange-300/25"
      maxWidthClassName="max-w-[1460px]"
      headerBackground="rgba(8,6,4,0.60)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow={`${game.familyLabel} · rules · components · playable model`}
          eyebrowStyle="rule"
          icon={Gamepad2}
          title={<span>{game.title}</span>}
          subtitle={game.summary}
          accentRgb={game.accentRgb}
          titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6rem)] font-semibold leading-[0.84] tracking-[-0.064em] text-white"
          headerClassName="border-white/[0.09]"
        />
      }
    >
      <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-stretch">
        <Surface variant="glass" className="rounded-[24px] border-white/[0.09] p-5 sm:p-6" style={{ background: `linear-gradient(145deg,rgba(${game.accentRgb},0.055),rgba(0,0,0,0.12))` }}>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${game.accentRgb},0.66)` }}>Model focus</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.7rem,3vw,2.8rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">{game.modelFocus}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {game.mechanics.map((mechanic) => <span key={mechanic} className="rounded-full border border-white/[0.07] bg-black/[0.14] px-3 py-1.5 text-[11px] text-slate-400">{mechanic}</span>)}
          </div>
        </Surface>

        <div className="grid grid-cols-3 gap-2">
          <Fact icon={Users} label="Players" value={game.players} />
          <Fact icon={Clock3} label="Time" value={game.duration} />
          <Fact icon={BookOpen} label="Weight" value={game.complexity} />
        </div>
      </section>

      <nav aria-label="Game record sections" className="sticky top-[124px] z-30 mt-6 flex flex-wrap gap-2 rounded-[16px] border border-white/[0.08] bg-[#080604]/88 p-2 backdrop-blur-xl">
        <SectionAnchor href="#rules" label="Read the rules" />
        <SectionAnchor href="#components" label="What's in the box" />
        <SectionAnchor href="#simulator" label="Simulate the game" />
      </nav>

      <section id="rules" className="scroll-mt-48 mt-8 grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${game.accentRgb},0.66)` }}><BookOpen size={13} /> Rules</div>
          <h2 className="mt-2 text-[29px] font-semibold tracking-[-0.045em] text-white">How does this ruleset work?</h2>
          <p className="mt-3 text-[14px] leading-6 text-slate-400">{game.rules.objective}</p>
          <p className="mt-4 rounded-[15px] border border-white/[0.07] bg-black/[0.12] p-3 text-[11px] leading-5 text-slate-500">{game.rulesetNote}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <RuleChunk index="01" title="Set up" items={game.rules.setup} accentRgb={game.accentRgb} />
          <RuleChunk index="02" title="Take a turn" items={game.rules.turn} accentRgb={game.accentRgb} />
          <RuleChunk index="03" title="End the game" items={game.rules.ending} accentRgb={game.accentRgb} />
        </div>
      </section>

      <section id="components" className="scroll-mt-48 mt-9 border-t border-white/[0.08] pt-7">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-emerald-200/58"><PackageOpen size={13} /> Component inventory</div>
        <h2 className="mt-2 text-[29px] font-semibold tracking-[-0.045em] text-white">What is in the box?</h2>
        <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-500">Component packaging varies by edition and manufacturer. This inventory lists the functional pieces required by the modeled ruleset.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {game.components.map((component) => (
            <Surface key={component.item} variant="open" className="rounded-[18px] border-white/[0.08] p-4">
              <div className="flex items-start justify-between gap-4">
                <Box size={16} className="mt-0.5 text-emerald-200/52" />
                <span className="rounded-full border border-white/[0.07] px-2.5 py-1 font-mono text-[11px] uppercase text-slate-500">× {component.quantity}</span>
              </div>
              <strong className="mt-4 block text-[15px] text-white">{component.item}</strong>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">{component.purpose}</p>
            </Surface>
          ))}
        </div>
      </section>

      <section id="simulator" className="scroll-mt-48 mt-9 border-t border-white/[0.08] pt-7">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${game.accentRgb},0.66)` }}><Gamepad2 size={13} /> Playable rules model</div>
        <div className="mt-2 grid gap-4 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
          <h2 className="text-[clamp(2rem,3.7vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white">Simulate the game locally.</h2>
          <p className="text-[13px] leading-6 text-slate-500">This is a same-device two-player model. It enforces legal placement, captures, turn changes, win conditions, and other rules described above.</p>
        </div>
        <div className="mt-5"><BoardGameSimulator simulator={game.simulator} /></div>
      </section>

      <CurriculumSiblingNav previous={context.previousActiveSibling} parent={context.parent} next={context.nextActiveSibling} accentRgb={game.accentRgb} />
    </SceneFrame>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="flex min-h-[148px] flex-col rounded-[19px] border border-white/[0.08] bg-black/[0.14] p-3 backdrop-blur-xl">
      <Icon size={15} className="text-slate-500" />
      <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">{label}</span>
      <strong className="mt-1 text-[12px] capitalize text-white/82">{value}</strong>
    </div>
  );
}

function RuleChunk({ index, title, items, accentRgb }: { index: string; title: string; items: readonly string[]; accentRgb: string }) {
  return (
    <article className="rounded-[20px] border border-white/[0.08] bg-black/[0.13] p-4 backdrop-blur-xl">
      <div className="font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: `rgba(${accentRgb},0.52)` }}>{index}</div>
      <h3 className="mt-2 text-[17px] font-semibold text-white">{title}</h3>
      <ol className="mt-4 space-y-3">
        {items.map((item, itemIndex) => <li key={item} className="grid grid-cols-[20px_minmax(0,1fr)] gap-2 text-[12px] leading-5 text-slate-400"><span className="font-mono text-[11px] text-slate-700">{itemIndex + 1}</span><span>{item}</span></li>)}
      </ol>
    </article>
  );
}

function SectionAnchor({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="rounded-full border border-white/[0.07] bg-white/[0.015] px-3 py-2 text-[11px] font-semibold text-slate-400 transition hover:border-white/20 hover:text-white">{label}</Link>;
}
