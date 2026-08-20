import Link from "next/link";
import {
  ArrowRight,
  Brush,
  CalendarClock,
  FlaskConical,
  Layers3,
  Map,
  Pickaxe,
  ScanSearch,
  Scale,
  Sprout,
  Users,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { ARCHAEOLOGY_CURRICULUM } from "@/lib/curriculum/social/archaeology";
import CarbonDater from "./CarbonDater";
import ContextLab from "./ContextLab";
import DigBackground from "./DigBackground";

const ICONS = [
  Pickaxe,
  Layers3,
  CalendarClock,
  ScanSearch,
  Users,
  Sprout,
  Map,
  FlaskConical,
  Scale,
] as const;

const FIELD_SEQUENCE = [
  ["Locate", "survey · coordinates · feature edges"],
  ["Excavate", "controlled removal · context boundaries"],
  ["Record", "plans · sections · photos · context sheets"],
  ["Analyze", "artifacts · ecofacts · samples · dates"],
  ["Interpret", "relationships · alternatives · uncertainty"],
  ["Steward", "archives · communities · conservation · access"],
] as const;

export default function ArchaeologyPage() {
  const branches = ARCHAEOLOGY_CURRICULUM.children ?? [];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b0907] text-stone-100 selection:bg-amber-300/20">
      <DigBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(9,7,5,0.2),rgba(9,7,5,0.58)),radial-gradient(circle_at_18%_22%,rgba(245,158,11,0.055),transparent_28%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Social Sciences", href: "/social-science" },
            { label: "Anthropology", href: "/social-science/anthropology" },
            { label: "Archaeology" },
          ]}
          eyebrow="Site · Context · Object · Evidence"
          icon={Pickaxe}
          title={<span>Archaeology</span>}
          subtitle="Reconstruct past human activity from material evidence by preserving where things were found, how deposits formed, what changed them, and which interpretations the surviving relationships can actually support."
          accentRgb="245, 158, 11"
          titleClassName="font-serif text-[clamp(3.1rem,5.7vw,5.8rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-[#fff8eb]"
          iconClassName="rounded-[18px]"
          headerClassName="border-amber-200/[0.14]"
        />

        <nav className="mt-3 overflow-hidden rounded-[22px] border border-amber-200/[0.12] bg-[#14100c]/72 shadow-[0_14px_42px_rgba(0,0,0,0.18)] backdrop-blur-xl" aria-label="Archaeology curriculum">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch, index) => {
              const Icon = ICONS[index] ?? ScanSearch;
              return (
                <div
                  key={branch.id}
                  className="group relative min-h-[108px] border-b border-r border-white/[0.055] p-4 last:border-r-0"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-200/[0.13] bg-amber-300/[0.035] text-amber-300/70">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-[13px] font-semibold leading-5 text-stone-200">{branch.label}</h2>
                        <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-stone-700">planned</span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-stone-500">{branch.description}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-stone-700">
                    field branch <ArrowRight size={10} />
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,0.72fr)] xl:items-start">
          <ContextLab />

          <div className="space-y-3">
            <CarbonDater />

            <section className="rounded-[22px] border border-amber-200/[0.11] bg-[#15110d]/76 p-4 backdrop-blur-xl">
              <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-amber-300/70">Relative before absolute</div>
              <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.025em] text-stone-100">Stratigraphy is about relationships.</h2>
              <p className="mt-2 text-[12px] leading-5 text-stone-400">
                In an undisturbed depositional sequence, lower deposits are generally earlier than deposits placed above them. Archaeological sites complicate that simple pattern with cuts, fills, reuse, erosion, burrowing, cultivation, construction, and redeposition, so archaeologists record interfaces and formation processes rather than assigning ages from depth alone.
              </p>
              <div className="mt-3 space-y-1.5 font-mono text-[10px] text-stone-500">
                <div className="rounded-lg bg-[#463728] px-3 py-2">CONTEXT 101 · upper deposit</div>
                <div className="rounded-lg bg-[#654027] px-3 py-2">CONTEXT 117 · occupation deposit</div>
                <div className="rounded-lg bg-[#3b332f] px-3 py-2">CONTEXT 126 · earlier deposit</div>
                <div className="rounded-lg border border-amber-300/18 bg-black/30 px-3 py-2 text-amber-200/55">CUT 204 · interrupts earlier contexts</div>
              </div>
            </section>
          </div>
        </div>

        <section className="mt-3 rounded-[22px] border border-amber-200/[0.10] bg-[#13100c]/68 p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-amber-300/65">From fieldwork to claim</div>
              <h2 className="mt-1 text-lg font-semibold text-stone-100">Excavation destroys a context while documenting it.</h2>
            </div>
            <p className="max-w-2xl text-[11px] leading-5 text-stone-500">
              Because excavation removes deposits, notes, coordinates, drawings, photographs, samples, and collection records become part of the evidence that future researchers inherit.
            </p>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
            {FIELD_SEQUENCE.map(([label, note], index) => (
              <div key={label} className="relative overflow-hidden rounded-[15px] border border-white/[0.05] bg-white/[0.014] p-3">
                <div className="font-mono text-[9px] font-semibold text-amber-300/45">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-2 text-[13px] font-semibold text-stone-200">{label}</div>
                <div className="mt-1 text-[10px] leading-4 text-stone-500">{note}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 border-t border-white/[0.05] pt-3 text-[10px] text-stone-600">
            <Link href="/social-science/anthropology" className="rounded-lg border border-white/[0.06] bg-black/20 px-2.5 py-1.5 transition-colors hover:border-amber-200/20 hover:text-stone-300">
              Anthropology parent
            </Link>
            <Link href="/humanities/history" className="rounded-lg border border-white/[0.06] bg-black/20 px-2.5 py-1.5 transition-colors hover:border-amber-200/20 hover:text-stone-300">
              History as neighboring discipline
            </Link>
            <span className="rounded-lg border border-white/[0.05] px-2.5 py-1.5">dating does not replace context</span>
            <span className="rounded-lg border border-white/[0.05] px-2.5 py-1.5">objects are not self-interpreting</span>
          </div>
        </section>
      </div>
    </main>
  );
}
