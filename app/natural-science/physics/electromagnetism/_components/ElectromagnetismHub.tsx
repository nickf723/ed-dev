"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import EMField, { type EMFieldMode } from "./EMField";
import {
  ArrowRight,
  BatteryCharging,
  CircleDashed,
  Gauge,
  Magnet,
  Radio,
  Sparkles,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Lesson = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status?: "active" | "placeholder";
};

type Props = {
  lessons: Lesson[];
  activeCount: number;
};

type Presentation = {
  step: string;
  mode: EMFieldMode;
  icon: LucideIcon;
  rgb: string;
  specimen: string;
  question: string;
};

const PRESENTATIONS: Record<string, Presentation> = {
  "natural.physics.electromagnetism.charge-fields": {
    step: "01",
    mode: "electric",
    icon: Zap,
    rgb: "250, 204, 21",
    specimen: "charge → field → force",
    question: "How does charge change the space around it?",
  },
  "natural.physics.electromagnetism.potential": {
    step: "02",
    mode: "potential",
    icon: Gauge,
    rgb: "167, 139, 250",
    specimen: "field ↔ potential",
    question: "How can electric interactions be described through energy per charge?",
  },
  "natural.physics.electromagnetism.circuits": {
    step: "03",
    mode: "circuits",
    icon: BatteryCharging,
    rgb: "34, 211, 238",
    specimen: "voltage → current → power",
    question: "How do charges and energy move through connected components?",
  },
  "natural.physics.electromagnetism.magnetic-fields": {
    step: "04",
    mode: "magnetic",
    icon: Magnet,
    rgb: "248, 113, 113",
    specimen: "moving charge → B",
    question: "Why does moving charge create a different kind of field?",
  },
  "natural.physics.electromagnetism.induction": {
    step: "05",
    mode: "induction",
    icon: Sparkles,
    rgb: "167, 139, 250",
    specimen: "changing flux → emf",
    question: "How can a changing magnetic field create an electric effect?",
  },
  "natural.physics.electromagnetism.waves": {
    step: "06",
    mode: "waves",
    icon: Radio,
    rgb: "232, 121, 249",
    specimen: "E ↔ B → light",
    question: "How can changing electric and magnetic fields sustain a traveling wave?",
  },
};

export default function ElectromagnetismHub({ lessons, activeCount }: Props) {
  const [mode, setMode] = useState<EMFieldMode>("overview");
  const [activeId, setActiveId] = useState(lessons[0]?.id ?? "");
  const activeLesson = lessons.find((lesson) => lesson.id === activeId) ?? lessons[0];
  const activePresentation = activeLesson ? PRESENTATIONS[activeLesson.id] : undefined;

  function activate(lesson: Lesson) {
    const presentation = PRESENTATIONS[lesson.id];
    setActiveId(lesson.id);
    setMode(presentation?.mode ?? "overview");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03060b] text-slate-100 selection:bg-cyan-300/25">
      <EMField mode={mode} intensity={1.24} />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#03060b]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Electromagnetism" },
            ]}
            eyebrow="Charge · field · current · radiation"
            icon={Zap}
            title={<span>Electromagnetism</span>}
            subtitle="Follow charge from the electric field it creates, through voltage and circuits, into magnetism, induction, and finally the self-propagating electromagnetic waves we call light."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.15rem,4.8vw,5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f2feff]"
            headerClassName="border-transparent"
            aside={
              <div className="rounded-full border border-cyan-200/[0.11] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-cyan-100/65 backdrop-blur-md">
                {activeCount} / {lessons.length} lessons live
              </div>
            }
          />
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch">
          <div className="rounded-[28px] border border-cyan-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">Field throughline</div>
            <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] text-white">
              Charge creates fields. Changing fields create each other.
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">
              Electromagnetism becomes intuitive when fields come before formulas. Static charge creates electric structure. Moving charge creates magnetic structure. Once the fields can change in time, electricity and magnetism stop being separate topics and become one dynamical system.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-slate-500">
              <span className="text-yellow-200/70">charge</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span>electric field</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span>current</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span>magnetic field</span>
              <ArrowRight size={12} className="text-slate-700" />
              <span className="text-fuchsia-200/70">radiation</span>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#06101a]/44 p-5 backdrop-blur-[2px]">
            <div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-gradient-to-r from-yellow-300/40 via-cyan-300/36 via-red-300/28 to-fuchsia-300/34" />
            <div className="absolute left-[17%] top-[calc(50%-5px)] h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.55)]" />
            <div className="absolute right-[17%] top-[calc(50%-5px)] h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_30px_rgba(232,121,249,0.48)]" />
            <div className="relative z-10 flex min-h-[260px] flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600"><span>source</span><span>field evolution</span></div>
              <div className="mx-auto max-w-xl text-center">
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: activePresentation ? `rgba(${activePresentation.rgb},0.68)` : undefined }}>{activePresentation?.step ?? "field"}</div>
                <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-white">{activeLesson?.label ?? "Electromagnetic field"}</h2>
                <p className="mt-2 text-[12px] leading-6 text-slate-400">{activePresentation?.question ?? "Hover the pathway to retune the field."}</p>
                <div className="mt-4 font-mono text-[11px]" style={{ color: activePresentation ? `rgba(${activePresentation.rgb},0.72)` : undefined }}>{activePresentation?.specimen}</div>
              </div>
              <div className="text-center font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-100/38">move the pointer through the field to arc nearby nodes</div>
            </div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[34px] border border-white/[0.08] bg-black/[0.055] p-5 backdrop-blur-[2px] sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/68">Electromagnetic pathway</div><h2 className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-white">Watch one theory emerge from six linked ideas.</h2></div>
            <p className="max-w-xl text-[11px] leading-5 text-slate-500">Maxwell&apos;s equations belong at the synthesis point. First build intuition for the physical objects those equations relate.</p>
          </div>

          <div className="relative mt-8 hidden min-h-[390px] lg:block">
            <div className="absolute left-[6%] right-[6%] top-[184px] h-1 rounded-full bg-gradient-to-r from-yellow-300/26 via-cyan-300/30 via-red-300/24 to-fuchsia-300/28" />
            {lessons.map((lesson, index) => {
              const presentation = PRESENTATIONS[lesson.id];
              if (!presentation) return null;
              const Icon = presentation.icon;
              const live = lesson.status !== "placeholder";
              const top = index % 2 === 0 ? 76 : 218;
              const left = 7 + index * 17.2;
              const inner = (
                <div className="group flex w-[150px] flex-col items-center text-center">
                  <div className="flex h-17 w-17 h-[68px] w-[68px] items-center justify-center rounded-full border bg-[#060b13]/86 transition-transform group-hover:scale-105" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},${live ? "0.32" : "0.10"})`, boxShadow: live ? `0 0 38px rgba(${presentation.rgb},0.11)` : undefined }}><Icon size={21} /></div>
                  <div className="mt-3 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.58)` }}>{presentation.step}</div>
                  <strong className={`mt-1 text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{lesson.label}</strong>
                  <span className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},${live ? "0.50" : "0.24"})` }}>{presentation.specimen}</span>
                </div>
              );
              return (
                <div key={lesson.id} className="absolute -translate-x-1/2" style={{ left: `${left}%`, top }} onMouseEnter={() => activate(lesson)} onMouseLeave={() => setMode("overview")} onFocusCapture={() => activate(lesson)} onBlurCapture={() => setMode("overview")}>
                  {live ? <Link href={lesson.href}>{inner}</Link> : <div aria-disabled="true">{inner}</div>}
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-2 lg:hidden">
            {lessons.map((lesson) => {
              const presentation = PRESENTATIONS[lesson.id];
              if (!presentation) return null;
              const Icon = presentation.icon;
              const live = lesson.status !== "placeholder";
              const inner = <div className="flex items-center gap-3 rounded-[16px] border px-4 py-3" style={{ borderColor: `rgba(${presentation.rgb},${live ? "0.15" : "0.06"})`, background: `rgba(${presentation.rgb},${live ? "0.025" : "0.008"})` }}><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${presentation.rgb})`, borderColor: `rgba(${presentation.rgb},0.16)` }}><Icon size={15} /></div><div className="min-w-0 flex-1"><span className="font-mono text-[9px]" style={{ color: `rgba(${presentation.rgb},0.55)` }}>{presentation.step}</span><strong className={`block text-[12px] ${live ? "text-white" : "text-slate-600"}`}>{lesson.label}</strong></div>{live ? <ArrowRight size={14} style={{ color: `rgb(${presentation.rgb})` }} /> : <CircleDashed size={13} className="text-slate-700" />}</div>;
              return live ? <Link key={lesson.id} href={lesson.href}>{inner}</Link> : <div key={lesson.id} aria-disabled="true">{inner}</div>;
            })}
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Idea icon={Zap} title="Fields carry local information" text="A charged object responds to the electric and magnetic fields at its location. It does not need a direct line-of-action instruction from a distant source." rgb="250, 204, 21" />
          <Idea icon={Magnet} title="Electricity and magnetism are coupled" text="Static cases can look separate. Time-varying fields reveal the deeper unity: changing electric and magnetic fields generate one another." rgb="248, 113, 113" />
          <Idea icon={Waves} title="Light is an electromagnetic wave" text="Radio, microwaves, visible light, ultraviolet, X-rays, and gamma rays are the same field phenomenon at different frequencies." rgb="232, 121, 249" />
        </section>
      </div>
    </main>
  );
}

function Idea({ icon: Icon, title, text, rgb }: { icon: LucideIcon; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2" style={{ color: `rgba(${rgb},0.72)` }}><Icon size={13} /><span className="text-[9px] font-semibold uppercase tracking-[0.11em]">principle</span></div><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
