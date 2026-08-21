import DomainPageHeader from "@/app/_components/DomainPageHeader";
import type { DomainHeaderCrumb } from "@/app/_components/DomainPageHeader";
import PigmentFieldBackground from "@/app/_page-system/backgrounds/PigmentFieldBackground";
import MuseumCollection from "./MuseumCollection";
import GoldenRatioComposer from "./GoldenRatioComposer";
import ChromaEngine from "./ChromaEngine";
import VisualArtsEvidenceLab from "./VisualArtsEvidenceLab";
import VisualArtsPracticeStudio, {
  type VisualArtsBranch,
} from "./VisualArtsPracticeStudio";
import {
  History,
  ImageIcon,
  Layers3,
  Palette,
  ScanEye,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

type Props = {
  breadcrumbs: readonly DomainHeaderCrumb[];
  branches: VisualArtsBranch[];
};

export default function VisualArtsHub({ breadcrumbs, branches }: Props) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b0706] text-stone-100 selection:bg-orange-400/25">
      <PigmentFieldBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1580px] px-4 pb-28 sm:px-6 xl:px-8">
        <div className="bg-[#0b0706]/78 sticky top-0 z-30 -mx-4 border-b border-white/[0.06] px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={breadcrumbs}
            eyebrow="Material · composition · image · object · context"
            eyebrowStyle="rule"
            icon={Palette}
            title={<span>Visual Arts</span>}
            subtitle="Visual art is made from material choices and encountered as images, objects, spaces, and time-based experiences. Study what the work is made from, how it is organized, how it is seen, and what changes when context changes."
            accentRgb="251, 146, 60"
            titleClassName="font-sans text-[clamp(2.9rem,5.6vw,6.3rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fff9f2]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-10">
          <VisualArtsPracticeStudio branches={branches} />
        </section>

        <section className="mt-20 grid gap-4 lg:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)]">
          <div className="rounded-[28px] border border-orange-200/[0.11] bg-black/[0.11] p-5 shadow-[0_28px_95px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-orange-200/70">
              The object before the label
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,2.9rem)] font-semibold tracking-[-0.05em] text-white">
              A work can be organized formally, materially, historically, and
              culturally at the same time.
            </h2>
            <p className="text-stone-300/82 mt-3 max-w-3xl text-[14px] leading-6">
              A painting is not only an arrangement of colors, and a sculpture
              is not only an object with dimensions. Materials, production,
              viewing conditions, representation, patronage, institutions,
              identity, and interpretation can all become part of what the work
              does.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-[28px] border border-white/[0.08] bg-black/[0.11] p-3 backdrop-blur-xl">
            <Lens
              icon={Layers3}
              label="Material"
              text="What is physically present and how was it made?"
              rgb="251, 146, 60"
            />
            <Lens
              icon={ScanEye}
              label="Form"
              text="How are color, line, space, scale, rhythm, and emphasis organized?"
              rgb="244, 63, 94"
            />
            <Lens
              icon={History}
              label="Context"
              text="What changes when maker, audience, place, institution, and history are known?"
              rgb="96, 165, 250"
            />
          </div>
        </section>

        <section className="mt-20">
          <MuseumCollection />
        </section>

        <section className="mt-20 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.11] shadow-[0_30px_105px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_450px] lg:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-rose-200/65">
                <ImageIcon size={13} /> Formal tools
              </div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">
                Use guides to compare choices, not to discover a secret recipe
                for beauty.
              </h2>
            </div>
            <p className="text-[13px] leading-6 text-stone-400">
              Composition grids and color-wheel relationships are analytical and
              generative tools. Their visual effect depends on subject, context,
              value, saturation, scale, material, and how the viewer encounters
              the work.
            </p>
          </div>
          <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-2">
            <GoldenRatioComposer />
            <ChromaEngine />
          </div>
        </section>

        <div className="mt-20">
          <VisualArtsEvidenceLab />
        </div>

        <section className="mt-20 grid gap-5 border-t border-white/[0.08] px-1 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-stone-500">
              Source & model boundary
            </div>
            <p className="mt-3 max-w-4xl text-[13px] leading-6 text-stone-500">
              Museum search records come from The Metropolitan Museum of Art.
              The page preserves provider totals, sampled results, image-rights
              fields, record links, retrieval state, and a reviewed local
              fallback. The hue instrument uses exact HSL angle arithmetic as a
              teaching model; equal angular distance does not imply equal
              perceptual distance or a universal emotional effect.
            </p>
          </div>
          <div className="flex flex-wrap content-start gap-2 md:justify-end">
            <SourceLink
              href="https://metmuseum.github.io/"
              label="The Met Collection API"
            />
            <SourceLink
              href="https://www.metmuseum.org/hubs/open-access"
              label="The Met Open Access"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function Lens({
  icon: Icon,
  label,
  text,
  rgb,
}: {
  icon: LucideIcon;
  label: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="flex min-h-[154px] flex-col justify-between rounded-[18px] border border-white/[0.06] bg-white/[0.012] p-3.5">
      <Icon size={17} style={{ color: `rgb(${rgb})` }} />
      <div>
        <div
          className="font-mono text-[10px] uppercase tracking-[0.07em]"
          style={{ color: `rgba(${rgb},0.72)` }}
        >
          {label}
        </div>
        <p className="mt-1.5 text-[12px] leading-5 text-stone-400">{text}</p>
      </div>
    </div>
  );
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover:border-orange-100/28 inline-flex items-center gap-2 rounded-full border border-orange-100/[0.11] bg-black/15 px-4 py-2.5 text-[11px] font-semibold text-orange-100/60 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/60"
    >
      {label} <ExternalLink size={12} aria-hidden="true" />
    </a>
  );
}
