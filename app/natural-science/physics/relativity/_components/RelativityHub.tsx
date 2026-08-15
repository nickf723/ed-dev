"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import RelativityField, { type RelativityFieldMode } from "./RelativityField";
import { ArrowRight, Gauge, Globe2, Hourglass, Orbit, type LucideIcon } from "lucide-react";

type Branch = {
  id: string;
  label: string;
  href: string;
  description?: string;
};

type Props = { branches: Branch[] };

type Presentation = {
  mode: RelativityFieldMode;
  icon: LucideIcon;
  eyebrow: string;
  question: string;
  rgb: string;
};

const PRESENTATIONS: Record<string, Presentation> = {
  "natural.physics.relativity.special": {
    mode: "special",
    icon: Hourglass,
    eyebrow: "Flat spacetime",
    question: "What must space and time become if every inertial observer measures the same light speed?",
    rgb: "245, 158, 11",
  },
  "natural.physics.relativity.general": {
    mode: "general",
    icon: Globe2,
    eyebrow: "Curved spacetime",
    question: "What if gravity is geometry rather than a force acting through space?",
    rgb: "129, 140, 248",
  },
};

export default function RelativityHub({ branches }: Props) {
  const [mode, setMode] = useState<RelativityFieldMode>("overview");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-slate-100 selection:bg-amber-300/25">
      <RelativityField mode={mode} />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-black/58 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Relativity" }]}
            eyebrow="Invariant laws · spacetime geometry"
            icon={Orbit}
            title={<span>Relativity</span>}
            subtitle="Relativity has two connected regimes: special relativity studies inertial observers in flat spacetime, while general relativity extends the framework to acceleration and gravity through curved spacetime."
            accentRgb="245, 158, 11"
            titleClassName="font-mono text-[clamp(2.5rem,5vw,5.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#fffaf0]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 rounded-[32px] border border-white/[0.08] bg-black/[0.06] p-5 backdrop-blur-[2px] sm:p-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/68">One spacetime, two questions</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] text-white">First revise measurement. Then let geometry itself become dynamic.</h2>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">Special relativity removes absolute simultaneity while preserving invariant spacetime structure. General relativity then asks how that structure responds to matter and energy.</p>
          </div>

          <div className="relative mt-8 hidden min-h-[520px] lg:block">
            <div className="absolute left-1/2 top-[8%] bottom-[8%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.13] to-transparent" />
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/[0.10] bg-black/50 text-center shadow-[0_0_70px_rgba(255,255,255,0.04)] backdrop-blur-xl">
              <Orbit size={24} className="text-white/75" />
              <strong className="mt-2 text-[11px] text-white">SPACETIME</strong>
              <span className="mt-1 font-mono text-[8px] text-slate-600">invariant structure</span>
            </div>

            {branches.map((branch, index) => {
              const presentation = PRESENTATIONS[branch.id];
              if (!presentation) return null;
              const Icon = presentation.icon;
              const leftSide = index === 0;
              return (
                <Link
                  key={branch.id}
                  href={branch.href}
                  className={`group absolute top-[19%] flex h-[62%] w-[38%] flex-col justify-between overflow-hidden rounded-[34px] border p-7 backdrop-blur-[5px] transition-transform hover:-translate-y-1 ${leftSide ? "left-[5%]" : "right-[5%]"}`}
                  style={{ borderColor: `rgba(${presentation.rgb},0.16)`, background: `linear-gradient(145deg, rgba(${presentation.rgb},0.045), rgba(0,0,0,0.20))` }}
                  onMouseEnter={() => setMode(presentation.mode)}
                  onMouseLeave={() => setMode("overview")}
                  onFocus={() => setMode(presentation.mode)}
                  onBlur={() => setMode("overview")}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.22)`, background: `rgba(${presentation.rgb},0.05)` }}><Icon size={21} /></div>
                      <ArrowRight size={17} style={{ color: `rgba(${presentation.rgb},0.72)` }} />
                    </div>
                    <div className="mt-7 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${presentation.rgb},0.72)` }}>{presentation.eyebrow}</div>
                    <h3 className="mt-2 text-[30px] font-semibold tracking-[-0.04em] text-white">{branch.label}</h3>
                    <p className="mt-4 max-w-md text-[13px] leading-6 text-slate-400">{branch.description}</p>
                  </div>
                  <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.16] p-4">
                    <div className="text-[9px] uppercase tracking-[0.12em] text-slate-600">Core question</div>
                    <p className="mt-2 text-[12px] leading-5 text-slate-300">{presentation.question}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-7 grid gap-3 lg:hidden">
            {branches.map((branch) => {
              const presentation = PRESENTATIONS[branch.id];
              if (!presentation) return null;
              const Icon = presentation.icon;
              return <Link key={branch.id} href={branch.href} className="rounded-[22px] border p-5" style={{ borderColor: `rgba(${presentation.rgb},0.15)`, background: `rgba(${presentation.rgb},0.025)` }}><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.20)` }}><Icon size={17} /></div><div className="min-w-0 flex-1"><div className="text-[9px] uppercase tracking-[0.12em]" style={{ color: `rgba(${presentation.rgb},0.68)` }}>{presentation.eyebrow}</div><strong className="block text-[15px] text-white">{branch.label}</strong></div><ArrowRight size={14} style={{ color: `rgb(${presentation.rgb})` }} /></div><p className="mt-3 text-[11px] leading-5 text-slate-500">{branch.description}</p></Link>;
            })}
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Idea icon={Gauge} title="Invariant does not mean identical coordinates" text="Observers can disagree about time intervals, lengths, and simultaneity while agreeing on deeper invariant spacetime relationships." rgb="245, 158, 11" />
          <Idea icon={Hourglass} title="Time is local to a worldline" text="A clock measures proper time along its own path through spacetime. Different paths between events can accumulate different proper times." rgb="251, 191, 36" />
          <Idea icon={Globe2} title="Gravity changes geometry" text="In general relativity, freely falling objects follow spacetime geodesics. Curvature replaces the Newtonian picture of gravity as an ordinary force." rgb="129, 140, 248" />
        </section>
      </div>
    </main>
  );
}

function Idea({ icon: Icon, title, text, rgb }: { icon: LucideIcon; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2" style={{ color: `rgba(${rgb},0.72)` }}><Icon size={13} /><span className="text-[9px] font-semibold uppercase tracking-[0.11em]">principle</span></div><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
