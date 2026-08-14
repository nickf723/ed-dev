"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import PhysicsBackground from "../../_components/PhysicsBackground";
import { ArrowRight, Eye, MoveRight, Route, TrainFront } from "lucide-react";

type Frame = "ground" | "platform";

const PRESETS = [
  { label: "Walk with train", platform: 5, walker: 2 },
  { label: "Walk against train", platform: 5, walker: -2 },
  { label: "Stand still on train", platform: 5, walker: 0 },
  { label: "Cancel train motion", platform: 5, walker: -5 },
] as const;

export default function RelativeMotionPage() {
  const [platformVelocity, setPlatformVelocity] = useState(5);
  const [walkerRelative, setWalkerRelative] = useState(-2);
  const [time, setTime] = useState(2);
  const [frame, setFrame] = useState<Frame>("ground");
  const [answer, setAnswer] = useState<string | null>(null);

  const walkerGround = walkerRelative + platformVelocity;
  const platformGroundPosition = platformVelocity * time;
  const walkerGroundPosition = walkerGround * time;
  const walkerPlatformPosition = walkerRelative * time;

  const frameVelocity = frame === "ground" ? walkerGround : walkerRelative;
  const framePosition = frame === "ground" ? walkerGroundPosition : walkerPlatformPosition;
  const platformInFrame = frame === "ground" ? platformVelocity : 0;

  const visualScale = Math.max(Math.abs(platformVelocity), Math.abs(walkerRelative), Math.abs(walkerGround), 1);

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setPlatformVelocity(preset.platform);
    setWalkerRelative(preset.walker);
    setTime(2);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0718] text-slate-100 selection:bg-violet-300/25">
      <PhysicsBackground mode="motion" />
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[25%] h-px w-[72%] bg-gradient-to-r from-transparent via-violet-300/24 to-transparent" />
        <div className="absolute left-[20%] top-[37%] h-px w-[66%] bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#0a0718]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Motion", href: "/natural-science/physics/motion" },
              { label: "Relative Motion" },
            ]}
            eyebrow="Motion · 03 / 03"
            icon={Eye}
            title={<span>Relative Motion</span>}
            subtitle="The same object can have different measured velocities for different observers. Change the reference frame without changing the physical event."
            accentRgb="167, 139, 250"
            titleClassName="font-mono text-[clamp(2.05rem,4.5vw,4.7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#faf7ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-violet-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">How can two observers disagree about velocity and both be correct?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">
              A velocity is always measured relative to something. A passenger can move west relative to a train while still moving east relative to the ground because the train itself is moving east faster.
            </p>
          </div>
          <div className="rounded-[18px] border border-violet-200/[0.09] bg-violet-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300/62">Velocity chain</div>
            <div className="mt-3 text-[18px] text-white"><M>{"v_{W/G}=v_{W/P}+v_{P/G}"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">W = walker, P = platform, G = ground. Read each subscript as “first object relative to second.”</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">Reference-frame lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Switch observers. Keep the event.</h2>
              </div>
              <div className="flex rounded-full border border-white/[0.07] bg-black/[0.18] p-1">
                <FrameButton active={frame === "ground"} label="Ground" onClick={() => setFrame("ground")} />
                <FrameButton active={frame === "platform"} label="Platform" onClick={() => setFrame("platform")} />
              </div>
            </div>

            <div className="relative mt-4 min-h-[340px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#100d20]/84 p-5">
              <div className="absolute inset-x-[8%] top-[72%] h-px bg-slate-500/35" />
              <div className="absolute left-[10%] top-[18%] text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">observer: {frame}</div>
              <div className="absolute left-[10%] right-[10%] top-[34%] rounded-[18px] border border-violet-200/[0.12] bg-violet-400/[0.035] px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3"><TrainFront size={19} className="text-violet-200/75" /><div><div className="text-[9px] uppercase tracking-[0.10em] text-slate-600">platform in this frame</div><div className="mt-1 font-mono text-[13px] text-violet-100/80">{platformInFrame.toFixed(1)} m/s</div></div></div>
                  <VelocityArrow value={platformInFrame} max={visualScale} rgb="167, 139, 250" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
                  <div className="flex items-center gap-3"><MoveRight size={19} className="text-cyan-200/75" /><div><div className="text-[9px] uppercase tracking-[0.10em] text-slate-600">walker in this frame</div><div className="mt-1 font-mono text-[13px] text-cyan-100/80">{frameVelocity.toFixed(1)} m/s</div></div></div>
                  <VelocityArrow value={frameVelocity} max={visualScale} rgb="34, 211, 238" />
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
                <Readout label="walker / platform" value={`${walkerRelative.toFixed(1)} m/s`} rgb="34, 211, 238" />
                <Readout label="platform / ground" value={`${platformVelocity.toFixed(1)} m/s`} rgb="167, 139, 250" />
                <Readout label="walker / ground" value={`${walkerGround.toFixed(1)} m/s`} rgb="45, 212, 191" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Platform velocity / ground" value={platformVelocity} min={-8} max={8} step={0.5} unit="m/s" onChange={setPlatformVelocity} />
              <Control label="Walker velocity / platform" value={walkerRelative} min={-8} max={8} step={0.5} unit="m/s" onChange={setWalkerRelative} />
              <Control label="Elapsed time" value={time} min={0} max={5} step={0.1} unit="s" onChange={setTime} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Curated motions</div>
              <div className="mt-4 space-y-2">
                {PRESETS.map((preset) => (
                  <button key={preset.label} type="button" onClick={() => applyPreset(preset)} className="flex w-full items-center justify-between rounded-[15px] border border-white/[0.06] bg-white/[0.012] px-3 py-3 text-left transition hover:border-violet-200/[0.16]">
                    <span className="text-[11px] font-semibold text-white">{preset.label}</span>
                    <span className="font-mono text-[9px] text-violet-100/55">{(preset.platform + preset.walker).toFixed(1)} m/s ground</span>
                  </button>
                ))}
              </div>
            </div>
            <Summary label="Walker position / ground" value={`${walkerGroundPosition.toFixed(1)} m`} note="Where a ground observer places the walker after the elapsed time." rgb="45, 212, 191" />
            <Summary label="Walker position / platform" value={`${walkerPlatformPosition.toFixed(1)} m`} note="How far the walker has moved along the platform itself." rgb="34, 211, 238" />
            <Summary label="Platform position / ground" value={`${platformGroundPosition.toFixed(1)} m`} note="The platform's displacement is part of the ground observer's accounting." rgb="167, 139, 250" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Velocity needs a reference" text="“Moving at 3 m/s” is incomplete until the observer or reference frame is understood." rgb="167, 139, 250" />
          <Principle title="Relative velocities add" text="In ordinary low-speed mechanics, chain compatible relative velocities by vector addition." rgb="34, 211, 238" />
          <Principle title="Rest is frame-dependent" text="An object can be stationary in one frame and moving in another without any contradiction." rgb="45, 212, 191" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">A train moves east at 5 m/s. A passenger walks west at 5 m/s relative to the train. What does a ground observer see?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["passenger moves east at 10 m/s", "passenger is momentarily at rest", "passenger moves west at 5 m/s"].map((option) => (
              <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>
            ))}
          </div>
          {answer ? (
            <div className={`mt-4 rounded-[16px] border p-4 ${answer === "passenger is momentarily at rest" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <strong className={`text-[11px] ${answer === "passenger is momentarily at rest" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "passenger is momentarily at rest" ? "Exactly" : "Add signed velocities"}</strong>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">Taking east as positive, <M>{"v_{W/G}=(-5)+(5)=0"}</M>. The passenger still moves west relative to the train.</p>
            </div>
          ) : null}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <Link href="/natural-science/physics/motion/projectile-motion" className="text-[10px] text-slate-500 hover:text-slate-300">← Projectile Motion</Link>
            <Link href="/natural-science/physics/motion" className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.12] bg-violet-400/[0.035] px-4 py-2 text-[10px] font-semibold text-violet-100/75">Motion map <ArrowRight size={13} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function FrameButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-full px-3 py-1.5 text-[10px] font-semibold transition" style={{ background: active ? "rgba(167,139,250,0.12)" : "transparent", color: active ? "rgb(237,233,254)" : "rgb(100,116,139)" }}>{label}</button>;
}

function VelocityArrow({ value, max, rgb }: { value: number; max: number; rgb: string }) {
  const width = Math.max(0, (Math.abs(value) / max) * 110);
  return <div className="flex w-32 items-center justify-center"><div className="relative h-px" style={{ width: `${width}px`, background: `rgba(${rgb},0.72)` }}>{Math.abs(value) > 0.05 ? <span className={`absolute -top-[3px] h-1.5 w-1.5 rotate-45 border ${value >= 0 ? "right-0 border-r border-t" : "left-0 border-b border-l"}`} style={{ borderColor: `rgba(${rgb},0.80)` }} /> : <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full" style={{ background: `rgba(${rgb},0.75)` }} />}</div></div>;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <label className="block"><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-violet-100/60">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></label>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.20] px-3 py-3"><div className="text-[8px] uppercase tracking-[0.10em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[11px]" style={{ color: `rgba(${rgb},0.80)` }}>{value}</div></div>;
}

function Summary({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.12] p-4 backdrop-blur-xl"><div className="text-[9px] uppercase tracking-[0.12em] text-slate-600">{label}</div><div className="mt-2 font-mono text-[18px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{note}</p></div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
