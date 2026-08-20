import DomainPageHeader from "@/app/_components/DomainPageHeader";
import WaveformAuroraBackground from "@/app/_page-system/backgrounds/WaveformAuroraBackground";
import MusicLibrary from "../MusicLibrary";
import { Disc3 } from "lucide-react";

export default function RecordedMusicPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#09030a] text-slate-100 selection:bg-rose-400/25">
      <WaveformAuroraBackground />
      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#09030a]/78 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Humanities", href: "/humanities" },
              { label: "Music", href: "/humanities/music" },
              { label: "Recorded Music & Discography" },
            ]}
            eyebrow="Albums · releases · artists · editions · production"
            eyebrowStyle="rule"
            icon={Disc3}
            title={<span>Recorded Music</span>}
            subtitle="A recording is both a musical work and a historical artifact. Browse release groups as a collection, then inspect how creator, date, edition, production, and catalog metadata frame what you hear."
            accentRgb="244, 114, 182"
            titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-[#fff7fc]"
            headerClassName="border-white/[0.08]"
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="rounded-[28px] border border-rose-200/[0.11] bg-black/[0.11] p-5 shadow-[0_28px_95px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-200/65">A catalog is a historical structure</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">One album can have many releases without becoming many different works.</h2>
            <p className="mt-3 max-w-3xl text-[10px] leading-5 text-slate-500">MusicBrainz release groups let the page distinguish an underlying album from country-specific editions, reissues, remasters, and formats. That makes the database itself useful for thinking about musical identity.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-[28px] border border-white/[0.08] bg-black/[0.11] p-3 backdrop-blur-xl">
            <Concept label="Work" text="The underlying musical release." />
            <Concept label="Edition" text="A particular release, market, format, or reissue." />
            <Concept label="Recording" text="A captured performance of a composition." />
          </div>
        </section>

        <section className="mt-5">
          <MusicLibrary />
        </section>
      </div>
    </main>
  );
}

function Concept({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex min-h-[132px] flex-col justify-end rounded-[18px] border border-white/[0.06] bg-white/[0.012] p-3">
      <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-rose-200/60">{label}</div>
      <p className="mt-2 text-[8px] leading-4 text-slate-700">{text}</p>
    </div>
  );
}
