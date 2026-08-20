"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import PhysicsBackground from "../../_components/PhysicsBackground";
import { ArrowRight, Crosshair, MoveRight, Route, Timer, TrendingUp } from "lucide-react";

const G = 9.81;
const SAMPLE_COUNT = 81;

const PRESETS = [
  { label: "Low + fast", speed: 16, angle: 25 },
  { label: "Balanced arc", speed: 14, angle: 45 },
  { label: "High lob", speed: 13, angle: 68 },
] as const;

export default function ProjectileMotionPage() {
  const [launchSpeed, setLaunchSpeed] = useState(14);
  const [angle, setAngle] = useState(45);
  const [timeFraction, setTimeFraction] = useState(0.42);
  const [challengeFraction, setChallengeFraction] = useState(0.34);
  const [challengeChecked, setChallengeChecked] = useState(false);

  const theta = (angle * Math.PI) / 180;
  const vx0 = launchSpeed * Math.cos(theta);
  const vy0 = launchSpeed * Math.sin(theta);
  const flightTime = (2 * vy0) / G;
  const range = vx0 * flightTime;
  const maxHeight = (vy0 * vy0) / (2 * G);
  const time = flightTime * timeFraction;
  const x = vx0 * time;
  const y = Math.max(0, vy0 * time - 0.5 * G * time * time);
  const vy = vy0 - G * time;

  const samples = useMemo(
    () =>
      Array.from({ length: SAMPLE_COUNT }, (_, index) => {
        const t = (index / (SAMPLE_COUNT - 1)) * flightTime;
        return {
          x: vx0 * t,
          y: Math.max(0, vy0 * t - 0.5 * G * t * t),
        };
      }),
    [flightTime, vx0, vy0],
  );

  const width = 780;
  const height = 320;
  const padX = 55;
  const padTop = 34;
  const padBottom = 46;
  const xSpan = Math.max(range, 1);
  const ySpan = Math.max(maxHeight, 1);
  const px = (value: number) => padX + (value / xSpan) * (width - padX * 2);
  const py = (value: number) => height - padBottom - (value / ySpan) * (height - padTop - padBottom);
  const trajectory = samples.map((point) => `${px(point.x).toFixed(1)},${py(point.y).toFixed(1)}`).join(" ");
  const projectileX = px(x);
  const projectileY = py(y);

  const challengeSpeed = 17;
  const challengeAngle = 38;
  const challengeTheta = (challengeAngle * Math.PI) / 180;
  const challengeVx = challengeSpeed * Math.cos(challengeTheta);
  const challengeVy0 = challengeSpeed * Math.sin(challengeTheta);
  const challengeFlight = (2 * challengeVy0) / G;
  const challengeTime = challengeFlight * challengeFraction;
  const challengeHeight = Math.max(0, challengeVy0 * challengeTime - 0.5 * G * challengeTime * challengeTime);
  const challengeVy = challengeVy0 - G * challengeTime;
  const challengeAtApex = Math.abs(challengeFraction - 0.5) <= 0.03;

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setLaunchSpeed(preset.speed);
    setAngle(preset.angle);
    setTimeFraction(0.42);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03101a] text-slate-100 selection:bg-cyan-300/25">
      <PhysicsBackground mode="motion" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#03101a]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Motion", href: "/natural-science/physics/motion" },
              { label: "Projectile Motion" },
            ]}
            eyebrow="Motion · 02 / 03"
            icon={Route}
            title={<span>Projectile Motion</span>}
            subtitle="Use one shared clock to uncover the two motions hidden inside a curved trajectory."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.05rem,4.5vw,4.7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#effdff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 rounded-[26px] border border-cyan-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-300/72">Phenomenon</div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">A thrown object follows a curve, but neither direction has to follow a curved rule.</h2>
          <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-300/76">Scrub through one flight below. Watch the orange horizontal velocity arrow and the violet vertical velocity arrow separately. Which one changes, and what happens to the other at the very top of the path?</p>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-start">
          <div className="rounded-[28px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.10em] text-cyan-300/72">Trajectory sandbox</div>
                <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-white">Scrub the same clock through x and y.</h2>
              </div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-1.5 font-mono text-[11px] text-slate-300">t = {time.toFixed(2)} s</div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#06131d]/84">
              <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Projectile trajectory and velocity components">
                <defs>
                  <linearGradient id="trajectoryGlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgb(251,146,60)" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="rgb(34,211,238)" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <line x1={padX} x2={width - padX} y1={height - padBottom} y2={height - padBottom} stroke="rgba(148,163,184,0.22)" strokeWidth="1" />
                <line x1={padX} x2={padX} y1={padTop} y2={height - padBottom} stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
                <polyline points={trajectory} fill="none" stroke="url(#trajectoryGlow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <line x1={projectileX} x2={projectileX} y1={projectileY} y2={height - padBottom} stroke="rgba(34,211,238,0.18)" strokeDasharray="5 6" />
                <line x1={padX} x2={projectileX} y1={projectileY} y2={projectileY} stroke="rgba(251,146,60,0.15)" strokeDasharray="5 6" />
                <circle cx={projectileX} cy={projectileY} r="8" fill="rgb(34,211,238)" fillOpacity="0.92" />
                <circle cx={projectileX} cy={projectileY} r="16" fill="none" stroke="rgba(34,211,238,0.20)" />
                <line x1={projectileX} x2={projectileX + Math.min(95, 25 + vx0 * 4)} y1={projectileY} y2={projectileY} stroke="rgba(251,146,60,0.84)" strokeWidth="2.5" />
                <line x1={projectileX} x2={projectileX} y1={projectileY} y2={projectileY - Math.max(-90, Math.min(90, vy * 5))} stroke="rgba(167,139,250,0.84)" strokeWidth="2.5" />
                <text x={padX} y={height - 15} fill="rgba(148,163,184,0.62)" fontSize="12">0 m</text>
                <text x={width - padX - 40} y={height - 15} fill="rgba(148,163,184,0.62)" fontSize="12">{range.toFixed(1)} m</text>
              </svg>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-4">
              <Readout label="horizontal velocity" value={`${vx0.toFixed(1)} m/s`} rgb="251, 146, 60" />
              <Readout label="vertical velocity" value={`${vy.toFixed(1)} m/s`} rgb="167, 139, 250" />
              <Readout label="horizontal position" value={`${x.toFixed(1)} m`} rgb="34, 211, 238" />
              <Readout label="height" value={`${y.toFixed(1)} m`} rgb="45, 212, 191" />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Launch speed" value={launchSpeed} min={5} max={24} step={0.5} unit="m/s" onChange={setLaunchSpeed} />
              <Control label="Launch angle" value={angle} min={10} max={80} step={1} unit="°" onChange={setAngle} />
              <Control label="Time through flight" value={timeFraction} min={0} max={1} step={0.01} unit="" onChange={setTimeFraction} />
            </div>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-[170px]">
            <div className="rounded-[22px] border border-white/[0.08] bg-black/[0.12] p-4 backdrop-blur-xl">
              <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-slate-400">Try different launches</div>
              <div className="mt-3 space-y-2">
                {PRESETS.map((preset) => (
                  <button key={preset.label} type="button" onClick={() => applyPreset(preset)} className="flex w-full items-center justify-between rounded-[14px] border border-white/[0.06] bg-white/[0.012] px-3 py-3 text-left transition hover:border-cyan-200/[0.16]">
                    <span className="text-[12px] font-semibold text-white">{preset.label}</span>
                    <span className="font-mono text-[10px] text-cyan-100/60">{preset.speed} m/s · {preset.angle}°</span>
                  </button>
                ))}
              </div>
            </div>
            <Summary label="Flight time" value={`${flightTime.toFixed(2)} s`} note="How long this level-ground launch remains airborne." rgb="167, 139, 250" />
            <Summary label="Range" value={`${range.toFixed(1)} m`} note="How far the unchanged horizontal component carries the projectile during that time." rgb="34, 211, 238" />
            <Summary label="Maximum height" value={`${maxHeight.toFixed(1)} m`} note="The height at the instant the vertical component changes sign." rgb="45, 212, 191" />
          </aside>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.10em] text-cyan-300/68">Conceptual bridge</div>
            <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.045em] text-white">The curve is what two independent motions look like when they share one clock.</h2>
            <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-300/76">In this ideal model there is no horizontal acceleration, so the orange velocity component stays fixed. Gravity acts vertically, so the violet component steadily decreases, reaches zero for an instant, then points downward.</p>
            <p className="mt-3 max-w-4xl text-[15px] leading-7 text-slate-300/76">The projectile does not switch from “horizontal motion” to “vertical motion.” It performs both at every moment. Their shared time coordinate is what recombines them into one trajectory.</p>
          </div>
          <div className="rounded-[20px] border border-cyan-200/[0.10] bg-cyan-400/[0.025] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-300/68">Launch decomposition</div>
            <div className="mt-3 space-y-2 text-[17px] text-white">
              <div><M>{"v_{0x}=v_0\\cos\\theta"}</M></div>
              <div><M>{"v_{0y}=v_0\\sin\\theta"}</M></div>
            </div>
            <p className="mt-3 text-[12px] leading-5 text-slate-400">These are the two starting velocities you were already watching in the sandbox.</p>
          </div>
        </section>

        <section className="mt-5 grid gap-3 md:grid-cols-2">
          <ModelCard
            icon={MoveRight}
            title="Horizontal story"
            question="What happens side to side?"
            text="With no horizontal force in the ideal model, horizontal acceleration is zero and horizontal velocity stays constant."
            formulas={["x(t)=v_{0x}t", "v_x(t)=v_{0x}"]}
            rgb="251, 146, 60"
          />
          <ModelCard
            icon={Timer}
            title="Vertical story"
            question="What happens up and down?"
            text="Gravity supplies constant downward acceleration, so vertical velocity changes linearly while vertical position changes quadratically."
            formulas={["y(t)=v_{0y}t-\\frac{1}{2}gt^2", "v_y(t)=v_{0y}-gt"]}
            rgb="167, 139, 250"
          />
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)]">
          <div className="rounded-[22px] border border-cyan-200/[0.10] bg-cyan-400/[0.025] p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-300/68"><TrendingUp size={13} /> Physics ↔ Algebra</div>
            <h2 className="mt-2 text-[22px] font-semibold text-white">Eliminate time and the trajectory itself becomes quadratic.</h2>
            <div className="mt-4 rounded-[17px] border border-white/[0.06] bg-black/[0.18] px-4 py-4 text-[16px] text-cyan-100"><M>{"y=x\\tan\\theta-\\frac{gx^2}{2v_0^2\\cos^2\\theta}"}</M></div>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">The parabola follows directly from constant horizontal velocity plus constant vertical acceleration.</p>
          </div>
          <div className="rounded-[22px] border border-amber-200/[0.10] bg-amber-300/[0.025] p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/70"><Crosshair size={13} /> Common pitfall</div>
            <h3 className="mt-2 text-[20px] font-semibold text-white">The projectile does not stop at the top.</h3>
            <p className="mt-3 text-[14px] leading-6 text-slate-300/72">Only the vertical velocity is zero there. Horizontal velocity remains nonzero, and gravity is still accelerating the projectile downward.</p>
          </div>
        </section>

        <section className="mt-5 rounded-[24px] border border-emerald-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.10em] text-emerald-300/70">Application · find the apex</div>
              <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">Fresh launch: 17 m/s at 38°. Scrub until the projectile reaches its greatest height.</h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/72">Use the height readout rather than memorizing a time fraction. Lock the moment you think is the apex, then inspect both velocity components.</p>

              <label className="mt-5 block rounded-[18px] border border-white/[0.07] bg-black/[0.16] p-4">
                <div className="flex items-center justify-between gap-3 text-[13px] text-slate-300"><span>Time through flight</span><span className="font-mono text-emerald-100">{challengeTime.toFixed(2)} s</span></div>
                <input type="range" min={0} max={1} step={0.01} value={challengeFraction} onChange={(event) => { setChallengeFraction(Number(event.target.value)); setChallengeChecked(false); }} className="mt-4 w-full accent-emerald-400" aria-label="Challenge time through flight" />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Readout label="height" value={`${challengeHeight.toFixed(2)} m`} rgb="45, 212, 191" />
                  <Readout label="horizontal position" value={`${(challengeVx * challengeTime).toFixed(2)} m`} rgb="34, 211, 238" />
                </div>
              </label>
            </div>

            <aside className="rounded-[18px] border border-white/[0.07] bg-black/[0.16] p-4">
              <button type="button" onClick={() => setChallengeChecked(true)} className="w-full rounded-[13px] border border-emerald-200/[0.18] bg-emerald-300/[0.05] px-4 py-3 text-[13px] font-semibold text-emerald-100">Lock this moment</button>
              {challengeChecked ? (
                <div className={`mt-4 rounded-[14px] border p-4 ${challengeAtApex ? "border-emerald-300/[0.18] bg-emerald-400/[0.035]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
                  <strong className={`text-[13px] ${challengeAtApex ? "text-emerald-200" : "text-amber-200"}`}>{challengeAtApex ? "Apex found" : challengeFraction < 0.5 ? "Still rising" : "Already descending"}</strong>
                  <p className="mt-2 text-[12px] leading-5 text-slate-400">{challengeAtApex ? `Vertical velocity is ${challengeVy.toFixed(2)} m/s, while horizontal velocity is still ${challengeVx.toFixed(2)} m/s.` : "Adjust the shared clock and look for the maximum height before locking again."}</p>
                </div>
              ) : (
                <p className="mt-4 text-[12px] leading-5 text-slate-500">The velocity components stay hidden until you commit to a moment.</p>
              )}
            </aside>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            <Link href="/natural-science/physics/motion/kinematics" className="text-[11px] text-slate-400 hover:text-slate-200">← Kinematics</Link>
            <Link href="/natural-science/physics/motion/relative-motion" className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.12] bg-violet-400/[0.035] px-4 py-2 text-[11px] font-semibold text-violet-100/80">Next: Relative Motion <ArrowRight size={13} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <label className="block"><div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.08em] text-slate-500"><span>{label}</span><span className="font-mono text-cyan-100/70">{value.toFixed(step < 1 ? 1 : 0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400" /></label>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-3"><div className="text-[9px] uppercase tracking-[0.07em] text-slate-500">{label}</div><div className="mt-1 font-mono text-[12px]" style={{ color: `rgba(${rgb},0.88)` }}>{value}</div></div>;
}

function Summary({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.12] p-4 backdrop-blur-xl"><div className="text-[10px] uppercase tracking-[0.08em] text-slate-500">{label}</div><div className="mt-2 font-mono text-[19px]" style={{ color: `rgba(${rgb},0.84)` }}>{value}</div><p className="mt-2 text-[12px] leading-5 text-slate-400">{note}</p></div>;
}

function ModelCard({ icon: Icon, title, question, text, formulas, rgb }: { icon: typeof MoveRight; title: string; question: string; text: string; formulas: string[]; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.12] p-5 backdrop-blur-xl"><div className="flex items-center justify-between"><div><div className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${rgb},0.72)` }}>{question}</div><h3 className="mt-1 text-[19px] font-semibold text-white">{title}</h3></div><Icon size={18} style={{ color: `rgba(${rgb},0.82)` }} /></div><p className="mt-3 text-[13px] leading-6 text-slate-400">{text}</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{formulas.map((formula) => <div key={formula} className="rounded-[13px] border border-white/[0.05] bg-black/[0.16] px-3 py-3 text-[14px] text-slate-200"><M>{formula}</M></div>)}</div></div>;
}
