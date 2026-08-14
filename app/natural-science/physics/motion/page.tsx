import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground from "../_components/PhysicsBackground";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { ArrowRight, Eye, MoveRight, Route, Timer, type LucideIcon } from "lucide-react";

const NODE_ID = "natural.physics.mechanics.motion";

const PRESENTATIONS: Record<string, { step: string; stage: string; question: string; specimen: string; icon: LucideIcon; rgb: string }> = {
  "natural.physics.mechanics.motion.kinematics": {
    step: "01",
    stage: "One dimension",
    question: "How can position, velocity, and acceleration describe one motion?",
    specimen: "x(t) → v(t) → a(t)",
    icon: MoveRight,
    rgb: "251, 146, 60",
  },
  "natural.physics.mechanics.motion.projectile-motion": {
    step: "02",
    stage: "Two dimensions",
    question: "How can independent horizontal and vertical motions combine into one trajectory?",
    specimen: "x(t) + y(t)",
    icon: Route,
    rgb: "34, 211, 238",
  },
  "natural.physics.mechanics.motion.relative-motion": {
    step: "03",
    stage: "Change observer",
    question: "How does measured motion depend on the chosen reference frame?",
    specimen: "vA/C = vA/B + vB/C",
    icon: Eye,
    rgb: "167, 139, 250",
  },
};

export default function MotionPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const lessons = context.children.map((child, index) => ({
    child,
    presentation: PRESENTATIONS[child.id] ?? {
      step: String(index + 1).padStart(2, "0"),
      stage: child.label,
      question: child.description ?? "",
      specimen: child.label,
      icon: MoveRight,
      rgb: "251, 146, 60",
    },
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040910] text-slate-100 selection:bg-orange-400/25">
      <PhysicsBackground mode="motion" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#040910]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Position · trajectory · reference frame"
            icon={MoveRight}
            title={<span>Motion</span>}
            subtitle="Start with one-dimensional change, expand the same kinematic language into two dimensions, then learn how every measurement depends on a chosen observer."
            accentRgb="251, 146, 60"
            titleClassName="font-mono text-[clamp(2.75rem,5vw,5.3rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#fffaf7]"
            headerClassName="border-transparent"
            aside={
              <div className="rounded-full border border-orange-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-orange-100/65 backdrop-blur-md">
                {context.activeChildren.length} linked models
              </div>
            }
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-stretch">
          <div className="rounded-[28px] border border-orange-200/[0.10] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/70">Motion throughline</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.45rem)] font-semibold tracking-[-0.04em] text-white">A motion is a history measured from a frame.</h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">
              Kinematics builds the language of change. Projectile motion shows that the same language works independently along multiple axes. Relative motion reminds us that coordinates and velocities are always measurements from a chosen frame.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500">
              <span className="text-orange-200/80">describe change</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span className="text-cyan-200/75">combine axes</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span className="text-violet-200/75">change observer</span>
            </div>
          </div>

          <div className="relative min-h-[275px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#07111a]/72 p-5 backdrop-blur-sm">
            <div className="absolute inset-0 opacity-45" style={{ backgroundImage: "linear-gradient(rgba(251,146,60,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
            <svg viewBox="0 0 720 250" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
              <path d="M70 176 C205 176 235 176 325 176 C410 176 390 74 485 74 C565 74 585 128 660 128" fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="1.5" strokeDasharray="5 7" />
              <path d="M70 176 C180 176 245 176 325 176" fill="none" stroke="rgba(251,146,60,0.45)" strokeWidth="2" />
              <path d="M325 176 C408 176 397 74 485 74" fill="none" stroke="rgba(34,211,238,0.44)" strokeWidth="2" />
              <path d="M485 74 C565 74 590 128 660 128" fill="none" stroke="rgba(167,139,250,0.40)" strokeWidth="2" />
            </svg>
            <div className="relative z-10 flex h-full min-h-[235px] flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600"><span>same modeling language</span><span>growing context</span></div>
              <div className="grid gap-2 sm:grid-cols-3">
                <StageMini label="1D" value="x → v → a" rgb="251, 146, 60" />
                <StageMini label="2D" value="x(t) + y(t)" rgb="34, 211, 238" />
                <StageMini label="frame" value="observer changes" rgb="167, 139, 250" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/[0.075] p-5 backdrop-blur-sm sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/68">Learning path</div>
              <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-white">Keep the model, change what the model must handle.</h2>
            </div>
            <p className="max-w-xl text-[11px] leading-5 text-slate-500">Each lesson adds one new complication without discarding the language built before it.</p>
          </div>

          <div className="relative mt-8 hidden min-h-[330px] md:block">
            <svg viewBox="0 0 1000 300" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
              <path d="M110 180 C285 180 315 180 440 180 C560 180 535 72 675 72 C800 72 805 160 910 160" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" />
            </svg>
            {lessons.map(({ child, presentation }, index) => (
              <LessonNode key={child.id} href={child.href} label={child.label} step={presentation.step} stage={presentation.stage} question={presentation.question} specimen={presentation.specimen} icon={presentation.icon} rgb={presentation.rgb} index={index} />
            ))}
          </div>

          <div className="mt-6 space-y-2 md:hidden">
            {lessons.map(({ child, presentation }) => (
              <Link key={child.id} href={child.href} className="group flex items-center gap-3 rounded-[17px] border border-white/[0.06] bg-black/[0.12] px-4 py-3 transition hover:border-white/[0.12]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border" style={{ borderColor: `rgba(${presentation.rgb},0.20)`, color: `rgb(${presentation.rgb})`, background: `rgba(${presentation.rgb},0.045)` }}><presentation.icon size={17} /></div>
                <div className="min-w-0 flex-1"><div className="font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.62)` }}>{presentation.step} · {presentation.stage}</div><strong className="mt-0.5 block text-[12px] text-white">{child.label}</strong></div>
                <ArrowRight size={14} style={{ color: `rgba(${presentation.rgb},0.72)` }} />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Connection icon={Timer} title="One clock" text="Every coordinate component and every observer describes the same event sequence in time." rgb="251, 146, 60" />
          <Connection icon={Route} title="Multiple representations" text="Trajectories, component graphs, equations, and vectors should all agree because they encode one shared state." rgb="34, 211, 238" />
          <Connection icon={Eye} title="Chosen reference" text="Coordinates and velocities change with the frame, but the physical event being modeled does not disappear." rgb="167, 139, 250" />
        </section>

        <div className="mt-5 pb-2">
          <Link href="/natural-science/physics/mechanics" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">← Mechanics map</Link>
        </div>
      </div>
    </main>
  );
}

function LessonNode({ href, label, step, stage, question, specimen, icon: Icon, rgb, index }: { href: string; label: string; step: string; stage: string; question: string; specimen: string; icon: LucideIcon; rgb: string; index: number }) {
  const positions = [
    { left: "10%", top: "110px" },
    { left: "45%", top: "110px" },
    { left: "78%", top: "110px" },
  ];
  const pos = positions[index] ?? positions[positions.length - 1];
  return (
    <Link href={href} className="group absolute w-[230px] -translate-x-1/2" style={{ left: pos.left, top: pos.top }}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-[#08111b]/95 shadow-2xl transition-transform group-hover:scale-105" style={{ borderColor: `rgba(${rgb},0.30)`, color: `rgb(${rgb})`, boxShadow: `0 0 38px rgba(${rgb},0.11)` }}><Icon size={21} /></div>
      <div className="mt-4 font-mono text-[9px]" style={{ color: `rgba(${rgb},0.60)` }}>{step} · {stage}</div>
      <strong className="mt-1 block text-[15px] text-white">{label}</strong>
      <p className="mt-1.5 text-[10px] leading-5 text-slate-500">{question}</p>
      <div className="mt-2 font-mono text-[9px]" style={{ color: `rgba(${rgb},0.58)` }}>{specimen}</div>
    </Link>
  );
}

function StageMini({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.055] bg-black/[0.18] px-3 py-3"><div className="font-mono text-[8px] uppercase tracking-[0.11em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[11px]" style={{ color: `rgba(${rgb},0.75)` }}>{value}</div></div>;
}

function Connection({ icon: Icon, title, text, rgb }: { icon: LucideIcon; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4 backdrop-blur-xl"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.70)` }}><Icon size={13} /> {title}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
