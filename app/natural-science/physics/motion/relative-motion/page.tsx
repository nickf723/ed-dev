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
  { label: "Stand on train", platform: 5, walker: 0 },
  { label: "Cancel ground motion", platform: 5, walker: -5 },
] as const;

export default function RelativeMotionPage() {
  const [platformVelocity, setPlatformVelocity] = useState(5);
  const [walkerRelative, setWalkerRelative] = useState(-2);
  const [time, setTime] = useState(2);
  const [frame, setFrame] = useState<Frame>("ground");
  const [challengeWalker, setChallengeWalker] = useState(-3);
  const [challengeChecked, setChallengeChecked] = useState(false);

  const walkerGround = walkerRelative + platformVelocity;
  const platformGroundPosition = platformVelocity * time;
  const walkerGroundPosition = walkerGround * time;
  const walkerPlatformPosition = walkerRelative * time;

  const frameVelocity = frame === "ground" ? walkerGround : walkerRelative;
  const platformInFrame = frame === "ground" ? platformVelocity : 0;
  const visualScale = Math.max(Math.abs(platformVelocity), Math.abs(walkerRelative), Math.abs(walkerGround), 1);

  const challengePlatform = 6;
  const challengeGround = challengePlatform + challengeWalker;
  const challengeSolved = Math.abs(challengeGround) <= 0.25;

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
            subtitle="Keep one physical event fixed and change the observer who measures it."
            accentRgb="167, 139, 250"
            titleClassName="font-mono text-[clamp(2.05rem,4.5vw,4.7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#faf7ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 rounded-[26px] border border-violet-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.10em] text-violet-300/72">Phenomenon</div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">A passenger walks west down a train aisle while the train moves east. Which way is the passenger moving?</h2>
          <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-300/76">Do not answer with a formula yet. Use the frame switch below. The passenger and train do not physically change when you switch observers, but the measured velocities do.</p>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-start">
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-300/72">Reference-frame sandbox</div>
                <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-white">Switch observers. Keep the event.</h2>
              </div>
              <div className="flex rounded-full border border-white/[0.07] bg-black/[0.18] p-1">
                <FrameButton active={frame === "ground"} label="Ground observer" onClick={() => setFrame("ground")} />
                <FrameButton active={frame === "platform"} label="Train observer" onClick={() => setFrame("platform")} />
              </div>
            </div>

            <div className="relative mt-4 min-h-[340px] overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#100d20]/84 p-5">
              <div className="absolute inset-x-[8%] top-[72%] h-px bg-slate-500/35" />
              <div className="absolute left-[10%] top-[18%] font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-slate-500">observer: {frame === "ground" ? "ground" : "train"}</div>
              <div className="absolute left-[10%] right-[10%] top-[34%] rounded-[18px] border border-violet-200/[0.12] bg-violet-400/[0.035] px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3"><TrainFront size={20} className="text-violet-200/80" /><div><div className="text-[10px] uppercase tracking-[0.08em] text-slate-500">train in this frame</div><div className="mt-1 font-mono text-[14px] text-violet-100/84">{platformInFrame.toFixed(1)} m/s</div></div></div>
                  <VelocityArrow value={platformInFrame} max={visualScale} rgb="167, 139, 250" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
                  <div className="flex items-center gap-3"><MoveRight size={20} className="text-cyan-200/80" /><div><div className="text-[10px] uppercase tracking-[0.08em] text-slate-500">walker in this frame</div><div className="mt-1 font-mono text-[14px] text-cyan-100/84">{frameVelocity.toFixed(1)} m/s</div></div></div>
                  <VelocityArrow value={frameVelocity} max={visualScale} rgb="34, 211, 238" />
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
                <Readout label="walker / train" value={`${walkerRelative.toFixed(1)} m/s`} rgb="34, 211, 238" />
                <Readout label="train / ground" value={`${platformVelocity.toFixed(1)} m/s`} rgb="167, 139, 250" />
                <Readout label="walker / ground" value={`${walkerGround.toFixed(1)} m/s`} rgb="45, 212, 191" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Train velocity / ground" value={platformVelocity} min={-8} max={8} step={0.5} unit="m/s" onChange={setPlatformVelocity} />
              <Control label="Walker velocity / train" value={walkerRelative} min={-8} max={8} step={0.5} unit="m/s" onChange={setWalkerRelative} />
              <Control label="Elapsed time" value={time} min={0} max={5} step={0.1} unit="s" onChange={setTime} />
            </div>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-[170px]">
            <div className="rounded-[20px] border border-white/[0.08] bg-black/[0.12] p-4 backdrop-blur-xl">
              <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Try different events</div>
              <div className="mt-3 space-y-2">
                {PRESETS.map((preset) => (
                  <button key={preset.label} type="button" onClick={() => applyPreset(preset)} className="flex w-full items-center justify-between rounded-[14px] border border-white/[0.06] bg-white/[0.012] px-3 py-3 text-left transition hover:border-violet-200/[0.16]">
                    <span className="text-[12px] font-semibold text-white">{preset.label}</span>
                    <span className="font-mono text-[10px] text-violet-100/60">{(preset.platform + preset.walker).toFixed(1)} m/s ground</span>
                  </button>
                ))}
              </div>
            </div>
            <Summary label="Walker position / ground" value={`${walkerGroundPosition.toFixed(1)} m`} note="Where the ground observer places the walker after the same elapsed time." rgb="45, 212, 191" />
            <Summary label="Walker position / train" value={`${walkerPlatformPosition.toFixed(1)} m`} note="How far the walker has moved along the train itself." rgb="34, 211, 238" />
            <Summary label="Train position / ground" value={`${platformGroundPosition.toFixed(1)} m`} note="The train's displacement is part of the ground observer's description." rgb="167, 139, 250" />
          </aside>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-300/68">Conceptual bridge</div>
            <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.045em] text-white">Velocity is not owned by the object alone. It describes an object relative to a chosen frame.</h2>
            <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-300/76">A walker can move west relative to the train and east relative to the ground at the same instant. Nothing contradictory happened. The two observers used different reference frames.</p>
            <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-300/76">For ordinary low-speed motion, compatible relative velocities form a signed chain. Direction matters, so choosing a positive direction turns the physical story into arithmetic.</p>
          </div>
          <div className="rounded-[20px] border border-violet-200/[0.10] bg-violet-400/[0.025] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-300/68">Velocity chain</div>
            <div className="mt-3 text-[18px] text-white"><M>{"v_{W/G}=v_{W/T}+v_{T/G}"}</M></div>
            <p className="mt-3 text-[12px] leading-5 text-slate-400">Read each subscript as “first object relative to second.” The middle reference, T, links the two measurements.</p>
          </div>
        </section>

        <section className="mt-5 grid gap-3 md:grid-cols-3">
          <Principle title="Velocity needs a reference" text="A direction and speed are incomplete until the observer or reference frame is understood." rgb="167, 139, 250" />
          <Principle title="Signed velocities chain" text="Choose a positive direction, keep the signs, and add compatible relative velocities in ordinary mechanics." rgb="34, 211, 238" />
          <Principle title="Rest is frame-dependent" text="An object can be stationary in one frame and moving in another without changing the physical event." rgb="45, 212, 191" />
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="rounded-[22px] border border-amber-200/[0.10] bg-amber-300/[0.025] p-5 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/70">Common pitfall</div>
            <h3 className="mt-2 text-[21px] font-semibold text-white">Changing reference frames does not add a new force.</h3>
            <p className="mt-3 text-[14px] leading-6 text-slate-300/72">In this constant-velocity example, switching from ground to train coordinates changes measured position and velocity, not the underlying interactions. Reference frame and physical cause are different questions.</p>
          </div>
          <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.12] p-5 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-slate-500">Sign convention</div>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">If east is positive, westward velocities are negative. Reversing the sign convention changes every relevant sign consistently, not the physical answer.</p>
          </div>
        </section>

        <section className="mt-5 rounded-[24px] border border-emerald-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-emerald-300/70">Application · cancel the ground motion</div>
              <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">A train moves east at 6 m/s. Set the passenger's walking velocity so a ground observer sees the passenger momentarily at rest.</h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/72">East is positive. Adjust the walker/train velocity until the ground velocity reaches zero, then lock your choice.</p>

              <label className="mt-5 block rounded-[18px] border border-white/[0.07] bg-black/[0.16] p-4">
                <div className="flex items-center justify-between gap-3 text-[13px] text-slate-300"><span>Walker velocity / train</span><span className="font-mono text-emerald-100">{challengeWalker.toFixed(1)} m/s</span></div>
                <input type="range" min={-9} max={3} step={0.5} value={challengeWalker} onChange={(event) => { setChallengeWalker(Number(event.target.value)); setChallengeChecked(false); }} className="mt-4 w-full accent-emerald-400" aria-label="Challenge walker velocity relative to train" />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Readout label="train / ground" value={`${challengePlatform.toFixed(1)} m/s`} rgb="167, 139, 250" />
                  <Readout label="walker / ground" value={`${challengeGround.toFixed(1)} m/s`} rgb="45, 212, 191" />
                </div>
              </label>
            </div>

            <aside className="rounded-[18px] border border-white/[0.07] bg-black/[0.16] p-4">
              <button type="button" onClick={() => setChallengeChecked(true)} className="w-full rounded-[13px] border border-emerald-200/[0.18] bg-emerald-300/[0.05] px-4 py-3 text-[13px] font-semibold text-emerald-100">Lock this velocity</button>
              {challengeChecked ? (
                <div className={`mt-4 rounded-[14px] border p-4 ${challengeSolved ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
                  <strong className={`text-[13px] ${challengeSolved ? "text-emerald-200" : "text-amber-200"}`}>{challengeSolved ? "Ground motion cancelled" : challengeGround > 0 ? "Still moving east" : "Now moving west"}</strong>
                  <p className="mt-2 text-[12px] leading-5 text-slate-400">{challengeSolved ? `The passenger walks west at ${Math.abs(challengeWalker).toFixed(1)} m/s relative to the train, exactly cancelling the train's eastward 6.0 m/s.` : "Keep the sign convention and adjust the relative velocity until the two signed contributions sum to zero."}</p>
                </div>
              ) : (
                <p className="mt-4 text-[12px] leading-5 text-slate-500">Commit to a velocity when the ground-frame readout reaches zero.</p>
              )}
            </aside>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            <Link href="/natural-science/physics/motion/projectile-motion" className="text-[11px] text-slate-400 hover:text-slate-200">← Projectile Motion</Link>
            <Link href="/natural-science/physics/motion" className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.12] bg-violet-400/[0.035] px-4 py-2 text-[11px] font-semibold text-violet-100/80">Motion map <ArrowRight size={13} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function FrameButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-full px-3 py-2 text-[10px] font-semibold transition" style={{ background: active ? "rgba(167,139,250,0.12)" : "transparent", color: active ? "rgb(237,233,254)" : "rgb(100,116,139)" }}>{label}</button>;
}

function VelocityArrow({ value, max, rgb }: { value: number; max: number; rgb: string }) {
  const width = Math.max(0, (Math.abs(value) / max) * 110);
  return <div className="flex w-32 items-center justify-center"><div className="relative h-px" style={{ width: `${width}px`, background: `rgba(${rgb},0.78)` }}>{Math.abs(value) > 0.05 ? <span className={`absolute -top-[3px] h-1.5 w-1.5 rotate-45 border ${value >= 0 ? "right-0 border-r border-t" : "left-0 border-b border-l"}`} style={{ borderColor: `rgba(${rgb},0.86)` }} /> : <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full" style={{ background: `rgba(${rgb},0.80)` }} />}</div></div>;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <label className="block"><div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.08em] text-slate-500"><span>{label}</span><span className="font-mono text-violet-100/70">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></label>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-3"><div className="text-[9px] uppercase tracking-[0.07em] text-slate-500">{label}</div><div className="mt-1 font-mono text-[12px]" style={{ color: `rgba(${rgb},0.88)` }}>{value}</div></div>;
}

function Summary({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.12] p-4 backdrop-blur-xl"><div className="text-[10px] uppercase tracking-[0.08em] text-slate-500">{label}</div><div className="mt-2 font-mono text-[19px]" style={{ color: `rgba(${rgb},0.84)` }}>{value}</div><p className="mt-2 text-[12px] leading-5 text-slate-400">{note}</p></div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[17px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[14px] text-white">{title}</strong><p className="mt-2 text-[12px] leading-5 text-slate-400">{text}</p></div>;
}
