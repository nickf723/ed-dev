import Link from "next/link";
import { ArrowRight, Boxes, LibraryBig } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import BoardGameBrowser from "./BoardGameBrowser";
import BoardShelfBackground from "./BoardShelfBackground";

export default function BoardGameRepositoryPage() {
  const context = requireCurriculumPageContext("humanities.gaming.repository.board-games");

  return (
    <SceneFrame
      background={<BoardShelfBackground />}
      className="bg-[#080604] text-slate-100 selection:bg-amber-300/25"
      maxWidthClassName="max-w-[1500px]"
      headerBackground="rgba(8,6,4,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="Find · inspect · set up · play"
          eyebrowStyle="rule"
          icon={LibraryBig}
          title={<span>Board Game Repository</span>}
          subtitle="Search a growing shelf of board-game records. Each live specimen keeps its rules, component inventory, learning model, and playable simulation together."
          accentRgb="251, 191, 36"
          titleClassName="font-sans text-[clamp(2.7rem,5vw,5.6rem)] font-semibold leading-[0.84] tracking-[-0.062em] text-[#fffbea]"
          headerClassName="border-amber-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-amber-100/[0.10] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(23,15,4,0.28),transparent_34%,transparent_70%,rgba(7,12,17,0.24))] backdrop-blur-[4px]" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/68">
              <Boxes size={14} /> Game record anatomy
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.7vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
              A game is more than a title: it is a ruleset acting on components through player decisions.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/74">
              This first shelf favors small classic systems whose simulations can enforce the modeled rules cleanly. Larger commercial games can join later with edition-aware inventories, setup variants, and modular simulation engines.
            </p>
          </div>
          <Surface variant="open" className="rounded-[19px] border-orange-100/[0.09] p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.07em] text-orange-200/52">Current scope</div>
            <strong className="mt-2 block text-[16px] text-white">Three complete local two-player models</strong>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">No account, deck import, or remote opponent is required. Reset the table at any time and test the rules directly.</p>
          </Surface>
        </div>
      </section>

      <section className="mt-7">
        <BoardGameBrowser />
      </section>

      <section className="mt-8 border-t border-white/[0.07] pt-5">
        <Link href="/humanities/gaming/repository" className="group inline-flex items-center gap-2 text-[11px] font-semibold text-amber-100/68 hover:text-white">
          Return to the full Game Repository <ArrowRight size={12} className="transition group-hover:translate-x-1" />
        </Link>
      </section>
    </SceneFrame>
  );
}
