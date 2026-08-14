import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground from "../_components/PhysicsBackground";
import { ArrowRight, CircleDashed, MoveRight, Orbit, Route } from "lucide-react";

const LESSONS = [
  {
    step: "01",
    title: "Kinematics",
    question: "How can position, displacement, velocity, and acceleration describe one motion?",
    specimen: "x(t) → v(t) → a(t)",
    href: "/natural-science/physics/motion/kinematics",
    rgb: "251, 146, 60",
    live: true,
  },
  {
    step: "02",
    title: "Projectile Motion",
    question: "How can horizontal and vertical motion be modeled independently, then recombined into one trajectory?",
    specimen: "x(t) + y(t)",
    href: "/natural-science/physics/motion/projectile-motion",
    rgb: "34, 211, 238",
    live: false,
  },
  {
    step: "03",
    title: "Relative Motion",
    question: "How does a measured velocity depend on the observer used as the reference frame?",
    specimen: "vA/B = vA − vB",
    href: "/natural-science/physics/motion/relative-motion",
    rgb: "167, 139, 250",
    live: false,
  },
] as const;

export default function MotionPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040910] text-slate-100 selection:bg-orange-400/25">
      <PhysicsBackground mode="motion" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Physics", href: "/natural-science/physics" },
            { label: "Mechanics", href: "/natural-science/physics/mechanics" },
            { label: "Motion" },
          ]}
          eyebrow="Position · velocity · acceleration"
          icon={MoveRight}
          title={<span>Motion</span>}
          subtitle="Describe change in position before asking what caused it. Motion gives mechanics its first shared language for location, time, direction, rate, and change of rate."
          accentRgb="251, 146, 60"
          titleClassName="font-mono text-[clamp(2.75rem,5vw,5.3rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#fffaf7]"
          headerClassName="border-white/[0.10]"
          aside={
            <div className="rounded-full border border-orange-200/[0.10] bg-black/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-orange-100/65 backdrop-blur-md">
              1 / 3 lessons live
            </div>
          }
        />

        <section className="mt-4 overflow-hidden rounded-[25px] border border-white/[0.08] bg-black/[0.20] p-5 backdrop-blur-2xl sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/70">Unit throughline</div>
              <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.035em] text-white">Motion is a history of position.</h2>
              <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">
                Once position is tracked against time, velocity describes how that position changes and acceleration describes how velocity changes. More complicated trajectories are built by applying that same language in more dimensions and from different reference frames.
              </p>
              <div className="mt-4 rounded-[15px] border border-white/[0.05] bg-white/[0.012] px-4 py-3 font-mono text-[12px] text-slate-400">
                locate → compare positions → measure rate → measure changing rate → combine dimensions → change frames
              </div>
            </div>

            <div className="relative min-h-[190px] overflow-hidden rounded-[20px] border border-orange-200/[0.10] bg-[#09111b]/72 p-5">
              <div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-gradient-to-r from-transparent via-slate-400/35 to-transparent" />
              <div className="absolute left-[18%] top-[calc(50%-5px)] h-2.5 w-2.5 rounded-full bg-orange-300 shadow-[0_0_25px_rgba(251,146,60,0.58)]" />
              <div className="absolute left-[42%] top-[calc(50%-5px)] h-2.5 w-2.5 rounded-full bg-orange-300/60" />
              <div className="absolute left-[70%] top-[calc(50%-5px)] h-2.5 w-2.5 rounded-full bg-orange-300/25" />
              <div className="absolute left-[18%] top-[42%] h-px w-[52%] bg-gradient-to-r from-cyan-300/70 to-transparent" />
              <div className="relative flex h-full min-h-[150px] flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600">
                  <span>same object</span>
                  <span>different times</span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="font-mono text-[11px] text-orange-200/75">position x(t)</div>
                    <div className="mt-1 text-[11px] text-slate-500">A motion becomes measurable when we choose an origin, direction, and clock.</div>
                  </div>
                  <Route size={20} className="text-cyan-300/55" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-3 px-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/68">Lessons</div>
            <p className="mt-1 text-[12px] text-slate-500">The map stays visible while we build. Live lessons open; planned lessons mark the next destinations.</p>
          </div>

          <nav aria-label="Motion lessons" className="grid gap-3 md:grid-cols-3">
            {LESSONS.map((lesson) => {
              const card = (
                <div
                  className="relative flex min-h-[218px] h-full flex-col overflow-hidden rounded-[22px] border p-5 backdrop-blur-xl"
                  style={{
                    borderColor: `rgba(${lesson.rgb},${lesson.live ? "0.16" : "0.07"})`,
                    background: `linear-gradient(145deg, rgba(${lesson.rgb},${lesson.live ? "0.055" : "0.018"}), rgba(3,8,15,0.68))`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${lesson.rgb},0.62)` }}>{lesson.step} / 03</span>
                    {lesson.live ? <ArrowRight size={15} style={{ color: `rgb(${lesson.rgb})` }} /> : <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.05] px-2.5 py-1 text-[9px] text-slate-700"><CircleDashed size={10} /> planned</span>}
                  </div>
                  <h2 className={`mt-6 text-[21px] font-semibold tracking-[-0.025em] ${lesson.live ? "text-white" : "text-slate-500"}`}>{lesson.title}</h2>
                  <p className={`mt-2 text-[12px] leading-5 ${lesson.live ? "text-slate-400" : "text-slate-700"}`}>{lesson.question}</p>
                  <div className="mt-auto pt-5 font-mono text-[12px]" style={{ color: `rgba(${lesson.rgb},${lesson.live ? "0.78" : "0.32"})` }}>{lesson.specimen}</div>
                </div>
              );

              return lesson.live ? (
                <Link key={lesson.title} href={lesson.href} className="group transition-transform hover:-translate-y-0.5">{card}</Link>
              ) : (
                <div key={lesson.title} aria-disabled="true">{card}</div>
              );
            })}
          </nav>
        </section>

        <section className="mt-4 grid gap-3 sm:grid-cols-3">
          <SmallIdea icon={Orbit} label="Reference" text="Position only means something relative to an origin and coordinate direction." rgb="96, 165, 250" />
          <SmallIdea icon={MoveRight} label="Rate" text="Velocity connects a change in position to the time over which that change occurs." rgb="251, 146, 60" />
          <SmallIdea icon={Route} label="Model" text="Graphs and equations are alternate representations of the same measured motion." rgb="45, 212, 191" />
        </section>

        <div className="mt-4 pb-8">
          <Link href="/natural-science/physics/mechanics" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">
            ← Mechanics map
          </Link>
        </div>
      </div>
    </main>
  );
}

function SmallIdea({ icon: Icon, label, text, rgb }: { icon: typeof Orbit; label: string; text: string; rgb: string }) {
  return (
    <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.16] p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.70)` }}>
        <Icon size={13} /> {label}
      </div>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}
