import type { Metadata } from "next";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import MusicListeningRoomBackground from "@/app/_page-system/backgrounds/MusicListeningRoomBackground";
import MixingConsoleTopology, {
  type MixChannel,
  type MixChannelIcon,
} from "@/app/_page-system/topologies/MixingConsoleTopology";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  AudioLines,
  Disc3,
  ExternalLink,
  FileMusic,
  Mic2,
  Radio,
  SlidersVertical,
  Waves,
  type LucideIcon,
} from "lucide-react";
import MusicEvidenceLab from "./MusicEvidenceLab";
import { MUSIC_BRANCH_IDS } from "./musicModel";

const NODE_ID = "humanities.music";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Explore musical structure, acoustics, performance, history, recordings, and the evidence each representation can support.",
};

type MusicMeta = {
  question: string;
  rgb: string;
  icon: MixChannelIcon;
};

const META: Record<string, MusicMeta> = {
  "humanities.music.theory": {
    question: "How is musical structure organized?",
    rgb: "244, 114, 182",
    icon: "music",
  },
  "humanities.music.acoustics": {
    question: "How does musical sound behave physically?",
    rgb: "34, 211, 238",
    icon: "waves",
  },
  "humanities.music.performance": {
    question: "How does a performer turn structure into sound?",
    rgb: "251, 146, 60",
    icon: "mic",
  },
  "humanities.music.history-culture": {
    question: "How does music change across people, places, and technologies?",
    rgb: "167, 139, 250",
    icon: "book",
  },
  "humanities.music.recordings": {
    question: "How does captured sound become a catalog of works and editions?",
    rgb: "250, 204, 21",
    icon: "disc",
  },
};

export default function MusicPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "hub") {
    throw new Error("Music must be classified as a navigation hub.");
  }

  assertBranchCoverage(context.children);

  const channels: MixChannel[] = context.children.map((child) => {
    const meta = META[child.id] ?? META["humanities.music.theory"];
    return {
      id: child.id,
      label: child.label,
      question: meta.question,
      summary: child.description ?? "",
      rgb: meta.rgb,
      href: child.href,
      status: child.status === "placeholder" ? "planned" : "active",
      icon: meta.icon,
    };
  });

  return (
    <main
      data-page-kind="hub"
      className="relative min-h-screen overflow-x-hidden bg-[#09030a] text-slate-100 selection:bg-rose-400/25"
    >
      <MusicListeningRoomBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-24 sm:px-6 xl:px-8">
        <div className="bg-[#09030a]/78 sticky top-0 z-30 -mx-4 border-b border-white/[0.06] px-4 pb-3 pt-5 shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Sound · structure · performance · recording · culture"
            eyebrowStyle="rule"
            icon={AudioLines}
            title={<span>Music</span>}
            subtitle="Music is organized sound, embodied performance, recorded artifact, and cultural practice at the same time. Separate those dimensions to study them, then mix them back together to understand the whole."
            accentRgb="244, 114, 182"
            titleClassName="font-sans text-[clamp(3rem,5.8vw,6.6rem)] font-semibold leading-[0.82] tracking-[-0.07em] text-[#fff7fc]"
            headerClassName="border-white/[0.08]"
            aside={
              <div className="grid grid-cols-3 border border-rose-100/[0.11] bg-black/20 font-mono">
                <HeaderMeasure value="5" label="branches" />
                <HeaderMeasure value="3" label="objects" bordered />
                <HeaderMeasure value="4" label="checks" />
              </div>
            }
          />
        </div>

        <section data-navigation="music-branch-mixer" className="mt-10">
          <MixingConsoleTopology channels={channels} />
        </section>

        <section className="mt-24 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <div className="rounded-[30px] border border-rose-200/[0.11] bg-[#0a030a]/45 p-6 shadow-[0_28px_95px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-8">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-200/70">
              The central distinction
            </div>
            <h2 className="mt-3 max-w-4xl text-[clamp(2rem,3.5vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              A composition, a performance, and a recording can refer to the
              “same song” without being the same object.
            </h2>
            <p className="text-slate-300/68 mt-5 max-w-3xl text-[14px] leading-7">
              Music theory studies structural relationships. Performance adds
              interpretation and embodied technique. Recording fixes one
              sounding event into a reproducible artifact. History and culture
              explain why those structures and practices mean what they do.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 rounded-[30px] border border-white/[0.08] bg-black/[0.17] p-4 backdrop-blur-xl sm:grid-cols-3 lg:grid-cols-1">
            <ObjectCard
              icon={FileMusic}
              label="Composition"
              text="A structured musical design that can survive many performances."
              rgb="244, 114, 182"
            />
            <ObjectCard
              icon={Mic2}
              label="Performance"
              text="A situated realization shaped by people, instruments, and interpretation."
              rgb="251, 146, 60"
            />
            <ObjectCard
              icon={Radio}
              label="Recording"
              text="A captured performance shaped again by microphones, editing, mixing, and media."
              rgb="34, 211, 238"
            />
          </div>
        </section>

        <section className="mt-24">
          <div className="grid gap-5 border-y border-white/[0.08] py-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div>
              <div className="text-violet-200/66 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em]">
                <SlidersVertical size={14} aria-hidden="true" /> Three listening
                layers
              </div>
              <h2 className="mt-3 max-w-5xl text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
                The same event can be described as a signal, a structure, and a
                meaningful practice.
              </h2>
            </div>
            <p className="text-slate-300/66 text-[14px] leading-7">
              These layers interact, but they do not license the same claims. A
              waveform can show amplitude through time; it cannot by itself
              establish genre, memory, or social meaning.
            </p>
          </div>
          <div className="mt-7 grid gap-4 xl:grid-cols-3">
            <ListeningLayer
              icon={Waves}
              label="Sound"
              question="What physically reaches the ear?"
              text="Frequency, spectrum, envelope, dynamics, space, and timbre describe the acoustic signal."
              rgb="34, 211, 238"
            />
            <ListeningLayer
              icon={FileMusic}
              label="Structure"
              question="How are musical events related?"
              text="Pitch, rhythm, harmony, phrase, form, repetition, expectation, and contrast organize the musical material."
              rgb="244, 114, 182"
            />
            <ListeningLayer
              icon={Mic2}
              label="Meaning"
              question="Why does this music matter here?"
              text="Genre, identity, technology, ritual, memory, economics, community, and history shape what listeners hear in the same sound."
              rgb="167, 139, 250"
            />
          </div>
        </section>

        <div className="mt-24">
          <MusicEvidenceLab />
        </div>

        <section
          data-source-boundary="music"
          className="mt-24 rounded-[30px] border border-white/[0.08] bg-black/[0.18] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
            <div>
              <div className="text-amber-100/62 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em]">
                <Disc3 size={14} aria-hidden="true" /> Repository and evidence
                boundary
              </div>
              <h2 className="mt-3 max-w-4xl text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
                Catalog records locate musical artifacts. They do not replace
                listening, notation, or historical argument.
              </h2>
              <p className="text-slate-300/66 mt-4 max-w-3xl text-[14px] leading-7">
                The Recorded Music repository searches MusicBrainz release
                groups and may show community-curated Cover Art Archive images.
                It labels live, cached, partial, empty, failed, rate-limited,
                and curated-fallback states. Metadata identifies records and
                editions; it does not stream audio, clear image rights, or prove
                claims about rhythm, harmony, timbre, or cultural meaning.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <SourceLink
                href="https://musicbrainz.org/doc/MusicBrainz_API"
                label="MusicBrainz · API"
              />
              <SourceLink
                href="https://musicbrainz.org/doc/Release_Group"
                label="MusicBrainz · Release groups"
              />
              <SourceLink
                href="https://musicbrainz.org/doc/Cover_Art_Archive"
                label="Cover Art Archive"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function assertBranchCoverage(children: readonly CurriculumNode[]) {
  const childIds = children.map((child) => child.id);
  const exactMatch =
    childIds.length === MUSIC_BRANCH_IDS.length &&
    childIds.every((id, index) => id === MUSIC_BRANCH_IDS[index]);

  if (!exactMatch) {
    throw new Error(
      `Music branch presentation must match the curriculum registry. Expected ${MUSIC_BRANCH_IDS.join(", ")}; received ${childIds.join(", ")}.`
    );
  }
}

function HeaderMeasure({
  value,
  label,
  bordered = false,
}: {
  value: string;
  label: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`min-w-[82px] px-3 py-3 text-center ${bordered ? "border-x border-rose-100/[0.10]" : ""}`}
    >
      <strong className="block text-[16px] text-rose-100/80">{value}</strong>
      <span className="mt-1 block text-[11px] uppercase tracking-[0.08em] text-slate-600">
        {label}
      </span>
    </div>
  );
}

function ObjectCard({
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
    <div className="flex min-h-[126px] items-center gap-4 rounded-[18px] border border-white/[0.07] bg-white/[0.014] p-4">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border"
        style={{
          color: `rgb(${rgb})`,
          borderColor: `rgba(${rgb},0.22)`,
          background: `rgba(${rgb},0.045)`,
        }}
      >
        <Icon size={17} aria-hidden="true" />
      </span>
      <div>
        <div
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
          style={{ color: `rgba(${rgb},0.68)` }}
        >
          {label}
        </div>
        <p className="text-slate-400/72 mt-1.5 text-[12px] leading-5">{text}</p>
      </div>
    </div>
  );
}

function ListeningLayer({
  icon: Icon,
  label,
  question,
  text,
  rgb,
}: {
  icon: LucideIcon;
  label: string;
  question: string;
  text: string;
  rgb: string;
}) {
  return (
    <div
      className="relative min-h-[250px] overflow-hidden rounded-[26px] border bg-black/[0.16] p-6 backdrop-blur-xl"
      style={{ borderColor: `rgba(${rgb},0.13)` }}
    >
      <div
        className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-[40px]"
        style={{ background: `rgba(${rgb},0.08)` }}
      />
      <span
        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[13px] border"
        style={{
          color: `rgb(${rgb})`,
          borderColor: `rgba(${rgb},0.21)`,
          background: `rgba(${rgb},0.04)`,
        }}
      >
        <Icon size={17} aria-hidden="true" />
      </span>
      <div
        className="relative z-10 mt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
        style={{ color: `rgba(${rgb},0.65)` }}
      >
        {label}
      </div>
      <h3 className="relative z-10 mt-2 text-[20px] font-semibold text-white">
        {question}
      </h3>
      <p className="text-slate-400/72 relative z-10 mt-3 text-[13px] leading-6">
        {text}
      </p>
    </div>
  );
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-rose-100/[0.12] bg-black/15 px-4 py-2.5 text-[11px] font-semibold text-rose-100/60 transition hover:border-rose-100/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60"
    >
      {label} <ExternalLink size={12} aria-hidden="true" />
    </a>
  );
}
