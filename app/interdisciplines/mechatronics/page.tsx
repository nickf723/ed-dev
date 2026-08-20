import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Cpu,
  Gauge,
  Layers3,
  RotateCw,
  Wrench,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContextByHref } from "@/lib/curriculum/page-context";
import ClosedLoopWorkbench from "./ClosedLoopWorkbench";
import MechatronicsBackground from "./MechatronicsBackground";

const ROUTE = "/interdisciplines/mechatronics";

const CONTRIBUTIONS = [
  {
    label: "Mechanics",
    question: "What can the body physically do?",
    detail: "Geometry, mass, stiffness, friction, vibration, mechanisms, loads, materials, tolerances, and failure define the physical plant.",
    rgb: "74,222,128",
  },
  {
    label: "Electronics",
    question: "How are signals and power moved?",
    detail: "Sensors, conditioning, converters, drivers, power electronics, wiring, communication buses, and protection connect digital decisions to hardware.",
    rgb: "34,211,238",
  },
  {
    label: "Control",
    question: "How should error become correction?",
    detail: "Feedback, estimation, stability, dynamics, filtering, and control laws decide how aggressively the system reacts to changing state.",
    rgb: "167,139,250",
  },
  {
    label: "Software",
    question: "How is behavior sequenced and coordinated?",
    detail: "Embedded code, state machines, timing, safety logic, communication, diagnostics, and higher-level planning turn the loop into purposeful behavior.",
    rgb: "251,146,60",
  },
] as const;

const DESIGN_TRACE = [
  "Define the physical task and measurable success condition.",
  "Choose a mechanism and actuator that can satisfy the load envelope.",
  "Choose sensors that expose the state needed for feedback.",
  "Design control and embedded logic around real timing, noise, and saturation limits.",
  "Test the integrated loop under disturbance, uncertainty, wear, and failure.",
] as const;

export default function MechatronicsPage() {
  const context = requireCurriculumPageContextByHref(ROUTE);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040709] text-slate-100 selection:bg-cyan-300/25">
      <MechatronicsBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#040709]/78 px-4 pb-3 pt-4 backdrop-blur-2xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Mechanics · electronics · control · embedded software"
            eyebrowStyle="rule"
            icon={Bot}
            title={<span>Mechatronics</span>}
            subtitle="Mechatronics designs machines whose mechanics, electronics, sensing, control, and software are inseparable. The central object is not a motor or a microcontroller by itself, but a physical system that measures its own behavior and keeps correcting it."
            accentRgb="34, 211, 238"
            titleClassName="text-[clamp(2.8rem,5.4vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.06em] text-[#f3fcff]"
            headerClassName="border-cyan-100/[0.10]"
          />
        </div>

        <section className="mx-auto mt-6 max-w-[1180px]">
          <div className="grid gap-4 border-b border-cyan-100/[0.10] pb-4 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-cyan-200/65"><RotateCw size={13} /> Signature structure</div>
              <h2 className="mt-2 max-w-4xl text-[clamp(1.7rem,3.2vw,3rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">The machine becomes intelligent when action closes back into measurement.</h2>
            </div>
            <p className="text-[13px] leading-6 text-slate-400">The loop below is a conceptual map, not one universal architecture. Real machines may use many nested loops, estimators, feedforward paths, distributed controllers, and supervisory layers.</p>
          </div>

          <div className="mt-4">
            <ClosedLoopWorkbench />
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-[1180px]">
          <div className="mb-3 flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-orange-200/58"><Layers3 size={13} /> Why it is interdisciplinary</div>
          <div className="grid border-y border-white/[0.08] md:grid-cols-2 xl:grid-cols-4">
            {CONTRIBUTIONS.map((item) => (
              <article key={item.label} className="min-h-[178px] border-b border-white/[0.06] p-4 md:border-r xl:border-b-0 xl:last:border-r-0">
                <div className="font-mono text-[8px] uppercase tracking-[0.055em]" style={{ color: `rgba(${item.rgb},0.68)` }}>{item.label}</div>
                <h3 className="mt-2 text-[16px] font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-[12px] leading-5 text-slate-400">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-[1180px] border-t border-cyan-100/[0.10] pt-5">
          <div className="grid gap-5 lg:grid-cols-[270px_minmax(0,1fr)] lg:items-start">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-cyan-200/55"><Wrench size={12} /> Integration trace</div>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">Design the loop together, not as four departments handing work downstream.</h2>
            </div>
            <ol className="grid gap-2 sm:grid-cols-5">
              {DESIGN_TRACE.map((step, index) => (
                <li key={step} className="relative border border-white/[0.07] bg-black/[0.12] p-3 backdrop-blur-lg">
                  <div className="font-mono text-[8px] text-cyan-200/42">0{index + 1}</div>
                  <p className="mt-2 text-[11px] leading-5 text-slate-400">{step}</p>
                  {index < DESIGN_TRACE.length - 1 ? <ArrowRight size={12} className="absolute -right-[7px] top-1/2 z-10 hidden -translate-y-1/2 text-slate-700 sm:block" /> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-[1180px] border-t border-white/[0.08] pt-5">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_300px] md:items-start">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-orange-200/[0.18] text-orange-200/70"><Gauge size={15} /></span>
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.06em] text-slate-600">Engineering intuition</div>
                <p className="mt-1.5 max-w-3xl text-[13px] leading-6 text-slate-400">A stronger motor does not fix a noisy sensor. Better code does not remove backlash. A perfect mechanism still fails if the controller is unstable. Mechatronics is the discipline of reasoning across those interfaces.</p>
              </div>
            </div>
            <Link href="/interdisciplines" className="group border border-cyan-100/[0.10] bg-cyan-200/[0.025] p-3 transition hover:bg-cyan-200/[0.045]">
              <div className="font-mono text-[8px] uppercase tracking-[0.055em] text-cyan-200/48">Parent map</div>
              <strong className="mt-1 block text-[15px] text-white">Interdisciplines</strong>
              <span className="mt-2 flex items-center justify-between text-[11px] text-slate-500">compare overlap fields <ArrowRight size={13} className="transition group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
