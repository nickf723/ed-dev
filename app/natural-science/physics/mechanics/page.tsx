import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground from "../_components/PhysicsBackground";
import { Activity, ArrowRight, CircleDashed, Gauge, MoveRight, Orbit } from "lucide-react";

const THREADS = [
  {
    step: "01",
    title: "Motion",
    subtitle: "Describe change before explaining its cause.",
    question: "Where is an object, how fast is it moving, and how is that motion changing?",
    href: "/natural-science/physics/motion",
    icon: MoveRight,
    rgb: "251, 146, 60",
    status: "live",
  },
  {
    step: "02",
    title: "Forces",
    subtitle: "Explain why motion changes.",
    question: "Which interactions push, pull, constrain, or redirect a physical system?",
    href: "/natural-science/physics/mechanics/forces",
    icon: Gauge,
    rgb: "250, 204, 21",
    status: "planned",
  },
  {
    step: "03",
    title: "Energy & Momentum",
    subtitle: "Track what is transferred or conserved.",
    question: "What can we learn about a system without following every instant of its motion?",
    href: "/natural-science/physics/mechanics/energy",
    icon: Activity,
    rgb: "45, 212, 191",
    status: "planned",
  },
] as const;

export default function MechanicsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050a11] text-slate-100 selection:bg-orange-400/25">
      <PhysicsBackground mode="classical" />

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 py-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Physics", href: "/natural-science/physics" },
            { label: "Classical Physics", href: "/natural-science/physics" },
            { label: "Mechanics" },
          ]}
          eyebrow="Motion · interaction · conservation"
          icon={Orbit}
          title={<span>Mechanics</span>}
          subtitle="Study how physical systems move, what interactions change that motion, and which quantities let us compare the system before and after the change."
          accentRgb="251, 146, 60"
          titleClassName="font-mono text-[clamp(2.7rem,5vw,5.3rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#fffaf5]"
          headerClassName="border-white/[0.10]"
        />

        <section className="mt-5 rounded-[28px] border border-orange-200/[0.11] bg-black/[0.18] p-5 backdrop-blur-xl sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/70">Mechanics throughline</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.45rem)] font-semibold tracking-[-0.04em] text-white">
                Describe the change → explain the interaction → track what is conserved.
              </h2>
              <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">
                These are not three unrelated topics. Motion gives us the language, forces explain changes in motion, and energy and momentum let us reason across an entire interaction.
              </p>
            </div>

            <div className="relative hidden min-h-[210px] lg:block">
              <div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-gradient-to-r from-orange-300/15 via-yellow-300/35 to-emerald-300/15" />
              {THREADS.map((thread, index) => {
                const Icon = thread.icon;
                return (
                  <div key={thread.title} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${8 + index * 42}%` }}>
                    <div className="flex h-24 w-24 -translate-x-1/2 flex-col items-center justify-center rounded-full border bg-[#07101a]/85 text-center shadow-2xl backdrop-blur-xl" style={{ borderColor: `rgba(${thread.rgb},0.28)`, boxShadow: `0 0 55px rgba(${thread.rgb},0.10)` }}>
                      <Icon size={22} style={{ color: `rgb(${thread.rgb})` }} />
                      <span className="mt-2 text-[10px] font-semibold text-white">{thread.title.split(" ")[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-3 md:grid-cols-3">
          {THREADS.map((thread) => {
            const Icon = thread.icon;
            const card = (
              <div className="relative flex min-h-[245px] h-full flex-col overflow-hidden rounded-[24px] border p-5 backdrop-blur-xl" style={{ borderColor: `rgba(${thread.rgb},${thread.status === "live" ? "0.18" : "0.08"})`, background: `linear-gradient(145deg, rgba(${thread.rgb},${thread.status === "live" ? "0.055" : "0.018"}), rgba(3,8,14,0.72))` }}>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px]" style={{ color: `rgba(${thread.rgb},0.60)` }}>{thread.step}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${thread.rgb})`, borderColor: `rgba(${thread.rgb},0.22)`, background: `rgba(${thread.rgb},0.055)` }}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${thread.rgb},0.68)` }}>{thread.subtitle}</div>
                <h2 className={`mt-1 text-[24px] font-semibold tracking-[-0.035em] ${thread.status === "live" ? "text-white" : "text-slate-500"}`}>{thread.title}</h2>
                <p className={`mt-3 text-[12px] leading-6 ${thread.status === "live" ? "text-slate-400" : "text-slate-650"}`}>{thread.question}</p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.11em]" style={{ color: `rgba(${thread.rgb},0.58)` }}>{thread.status === "live" ? "enter thread" : "planned thread"}</span>
                  {thread.status === "live" ? <ArrowRight size={15} style={{ color: `rgb(${thread.rgb})` }} /> : <CircleDashed size={14} className="text-slate-700" />}
                </div>
              </div>
            );

            return thread.status === "live" ? (
              <Link key={thread.title} href={thread.href} className="group transition-transform hover:-translate-y-0.5">{card}</Link>
            ) : (
              <div key={thread.title} aria-disabled="true">{card}</div>
            );
          })}
        </section>

        <div className="mt-5 pb-8">
          <Link href="/natural-science/physics" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">
            ← Physics map
          </Link>
        </div>
      </div>
    </main>
  );
}
