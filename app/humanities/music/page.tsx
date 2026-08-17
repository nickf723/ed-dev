import DomainPageHeader from "@/app/_components/DomainPageHeader";
import WaveformAuroraBackground from "@/app/_page-system/backgrounds/WaveformAuroraBackground";
import MixingConsoleTopology, {
  type MixChannel,
  type MixChannelIcon,
} from "@/app/_page-system/topologies/MixingConsoleTopology";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  AudioLines,
  Mic2,
  Radio,
  SlidersVertical,
  type LucideIcon,
} from "lucide-react";

const NODE_ID = "humanities.music";

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
    question:
      "How does captured sound become a catalog of works and editions?",
    rgb: "250, 204, 21",
    icon: "disc",
  },
};

export default function MusicPage() {
  const context = requireCurriculumPageContext(NODE_ID);
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
    <main className="relative min-h-screen overflow-x-hidden bg-[#09030a] text-slate-100 selection:bg-rose-400/25">
      <WaveformAuroraBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#09030a]/78 px-4 pb-3 pt-5 shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Humanities", href: "/humanities" },
              { label: "Music" },
            ]}
            eyebrow="Sound · structure · performance · recording · culture"
            eyebrowStyle="rule"
            icon={AudioLines}
            title={<span>Music</span>}
            subtitle="Music is organized sound, embodied performance, recorded artifact, and cultural practice at the same time. Separate those dimensions to study them, then mix them back together to understand the whole."
            accentRgb="244, 114, 182"
            titleClassName="font-sans text-[clamp(3rem,5.8vw,6.6rem)] font-semibold leading-[0.82] tracking-[-0.07em] text-[#fff7fc]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div className="rounded-[28px] border border-rose-200/[0.11] bg-black/[0.11] p-5 shadow-[0_28px_95px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-200/70">
              The central distinction
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.8rem,3.2vw,2.9rem)] font-semibold tracking-[-0.05em] text-white">
              A composition, a performance, and a recording can refer to the
              “same song” without being the same object.
            </h2>
            <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-400/74">
              Music theory studies structural relationships. Performance adds
              interpretation and embodied technique. Recording fixes one
              sounding event into a reproducible artifact. History and culture
              explain why those structures and practices mean what they do.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-[28px] border border-white/[0.08] bg-black/[0.11] p-3 backdrop-blur-xl">
            <ObjectCard
              icon={SlidersVertical}
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

        <section className="mt-5">
          <MixingConsoleTopology channels={channels} />
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-3">
          <ListeningLayer
            label="Sound"
            question="What physically reaches the ear?"
            text="Frequency, spectrum, envelope, dynamics, space, and timbre describe the acoustic signal."
            rgb="34, 211, 238"
          />
          <ListeningLayer
            label="Structure"
            question="How are musical events related?"
            text="Pitch, rhythm, harmony, phrase, form, repetition, expectation, and contrast organize the musical material."
            rgb="244, 114, 182"
          />
          <ListeningLayer
            label="Meaning"
            question="Why does this music matter here?"
            text="Genre, identity, technology, ritual, memory, economics, community, and history shape what listeners hear in the same sound."
            rgb="167, 139, 250"
          />
        </section>
      </div>
    </main>
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
    <div className="flex min-h-[160px] flex-col justify-between rounded-[18px] border border-white/[0.06] bg-white/[0.012] p-3">
      <Icon size={17} style={{ color: `rgb(${rgb})` }} />
      <div>
        <div
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
          style={{ color: `rgba(${rgb},0.68)` }}
        >
          {label}
        </div>
        <p className="mt-1.5 text-[12px] leading-5 text-slate-400/72">
          {text}
        </p>
      </div>
    </div>
  );
}

function ListeningLayer({
  label,
  question,
  text,
  rgb,
}: {
  label: string;
  question: string;
  text: string;
  rgb: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] border bg-black/[0.11] p-5 backdrop-blur-xl"
      style={{ borderColor: `rgba(${rgb},0.11)` }}
    >
      <div
        className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-[40px]"
        style={{ background: `rgba(${rgb},0.07)` }}
      />
      <div
        className="relative z-10 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
        style={{ color: `rgba(${rgb},0.65)` }}
      >
        {label}
      </div>
      <h3 className="relative z-10 mt-2 text-[18px] font-semibold text-white">
        {question}
      </h3>
      <p className="relative z-10 mt-2 text-[13px] leading-6 text-slate-400/72">
        {text}
      </p>
    </div>
  );
}
