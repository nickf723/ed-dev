import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Archive, ArrowRight, BookOpen, Layers3, MapPin, Music, Radio, Users, WandSparkles } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import { CULTURE_CURRICULUM } from "@/lib/curriculum/humanities/culture";
import CultureStream from "./CultureStream";
import CulturalTransmissionLab from "./CulturalTransmissionLab";

const RGB = [
  "244,114,182",
  "192,132,252",
  "251,191,36",
  "251,146,60",
  "96,165,250",
  "34,211,238",
  "52,211,153",
  "148,163,184",
  "248,113,113",
] as const;

const PRINCIPLES = [
  ["Culture is shared, not uniform", "People can participate in the same practice while disagreeing about meaning, value, ownership, authenticity, or change."],
  ["Traditions change", "Repetition does not imply perfect copying. Materials, participants, settings, technologies, institutions, and interpretations can shift while continuity is still claimed."],
  ["Meaning depends on context", "An object, phrase, image, food, song, ritual, or style can carry different meanings for insiders, outsiders, institutions, markets, and later generations."],
  ["Circulation changes things", "Migration, translation, media, tourism, trade, platforms, education, and commercialization can alter who encounters a practice and how it is framed."],
  ["Power shapes visibility", "Some cultural forms are archived, funded, promoted, regulated, stigmatized, borrowed, or ignored more readily than others. Visibility is never distributed evenly."],
  ["Interpretation needs sources", "Claims about a culture should be grounded in people, artifacts, records, performances, contexts, and histories rather than stereotypes or a single representative example."],
] as const;

export default function CulturePage() {
  const branches = CULTURE_CURRICULUM.children ?? [];

  return (
    <SceneFrame
      background={<CultureStream />}
      className="bg-[#140d11] text-stone-100 selection:bg-pink-300/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(20,13,17,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Humanities", href: "/humanities" }, { label: "Culture" }]}
          eyebrow="Practice · meaning · memory · media · place · change"
          eyebrowStyle="rule"
          icon={Layers3}
          title={<span>Culture</span>}
          subtitle="Study the practices, objects, stories, media, places, memories, identities, traditions, institutions, and everyday habits through which people make shared meaning, while keeping internal diversity and change visible."
          accentRgb="244, 114, 182"
          titleClassName="font-sans text-[clamp(3rem,5.5vw,6rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#fdf2f8]"
          headerClassName="border-pink-100/[0.10]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-pink-100/[0.10] py-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,13,17,0.44),transparent_31%,transparent_72%,rgba(11,14,19,0.36))] backdrop-blur-[2px]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px] xl:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-pink-200/62"><BookOpen size={14} /> Primary navigation · commons index</div>
            <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Study culture through the things people do, make, remember, circulate, and contest.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/70">The wall behind the page is intentionally generic: posters, textiles, recipes, maps, tickets, photographs, zines, archival labels, and digital fragments. None stands in for a particular culture. Together they suggest the different kinds of evidence cultural interpretation can encounter.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Neighbor href="/social-science/anthropology" icon={Users} label="Anthropology" note="comparative social-science study" />
            <Neighbor href="/humanities/history" icon={Archive} label="History" note="change and context over time" />
            <Neighbor href="/humanities/music" icon={Music} label="Music" note="sound, practice, repertoire" />
            <Neighbor href="/humanities/visual-arts" icon={WandSparkles} label="Visual Arts" note="objects, images, making" />
          </div>
        </div>

        <div className="relative mt-5 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch, index) => {
            const rgb = RGB[index % RGB.length];
            const isActive = branch.status === "active";
            const inner = <><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.68)` }}>CU.{String(index + 1).padStart(2, "0")}</span><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-stone-600">{isActive ? "open" : "planned"}</span></div><strong className="mt-2 block text-[14px] text-white/84">{branch.label}</strong><p className="mt-2 text-[11px] leading-4 text-stone-500">{branch.description}</p>{isActive ? <span className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: `rgba(${rgb},0.62)` }}>Open branch <ArrowRight size={10} /></span> : null}</>;
            const className = "min-h-[140px] border-b border-white/[0.06] px-4 py-4 backdrop-blur-[7px] md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0";
            return isActive ? <Link key={branch.id} href={branch.href} className={`${className} group transition hover:bg-white/[0.025]`}>{inner}</Link> : <div key={branch.id} aria-disabled="true" className={className}>{inner}</div>;
          })}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-pink-200/58"><Radio size={13} /> Signature instrument · transmission</div><h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-white">Culture persists through change, not by escaping it.</h2></div>
          <p className="text-[12px] leading-5 text-stone-500">The fictional case below keeps one practice recognizable while changing its setting. The exercise is about asking better questions, not scoring authenticity or deciding whether a community has changed “too much.”</p>
        </div>
        <CulturalTransmissionLab />
      </section>

      <section className="mt-9 border-t border-pink-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div><div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/54"><MapPin size={13} /> Interpretive principles · reference, not navigation</div><h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">A culture is not a personality profile for a population.</h2></div>
          <p className="text-[13px] leading-6 text-stone-400/70">Good cultural study resists two temptations at once: reducing people to stereotypes, and pretending shared practices do not matter. The interesting work lives in variation, history, context, participation, conflict, continuity, and change.</p>
        </div>
        <div className="mt-5 grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
          {PRINCIPLES.map(([term, detail], index) => <div key={term} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] px-4 py-4 xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"><span className="font-mono text-[10px] text-pink-200/38">0{index + 1}</span><span><strong className="block text-[13px] text-stone-200/86">{term}</strong><span className="mt-1 block text-[11px] leading-5 text-stone-500">{detail}</span></span></div>)}
        </div>
      </section>
    </SceneFrame>
  );
}

function Neighbor({ href, icon: Icon, label, note }: { href: string; icon: LucideIcon; label: string; note: string }) {
  return <Link href={href} className="group flex min-h-[72px] flex-col justify-between border border-white/[0.07] bg-black/[0.055] px-3 py-3 backdrop-blur-[8px] transition hover:bg-black/[0.11]"><span className="flex items-center gap-2 text-[11px] font-semibold text-white/78"><Icon size={12} className="text-pink-200/52" />{label}</span><span className="flex items-end justify-between gap-2"><span className="text-[9px] leading-4 text-stone-600">{note}</span><ArrowRight size={10} className="text-stone-600 transition group-hover:translate-x-1" /></span></Link>;
}
