"use client";

import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame, Surface } from "@/app/_page-system/scene";
import {
  Aperture,
  ArrowRight,
  Brush,
  History,
  ImageIcon,
  Layers3,
  MonitorPlay,
  Palette,
  Printer,
  ScanEye,
  Shapes,
  type LucideIcon,
} from "lucide-react";
import VisualAnalysisStudio from "./VisualAnalysisStudio";
import VisualArtsBackground from "./VisualArtsBackground";

type Branch = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status: "active" | "placeholder";
};

type Props = { branches: Branch[] };

type BranchMeta = {
  icon: LucideIcon;
  question: string;
  material: string;
  rgb: string;
  index: string;
  motif: "painting" | "sculpture" | "photography" | "print" | "digital" | "history";
  shapeClass: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "humanities.visual-arts.painting": {
    icon: Brush,
    question: "How can marks, color, line, and surface organize an image?",
    material: "surface · pigment · line",
    rgb: "244,63,94",
    index: "01",
    motif: "painting",
    shapeClass: "rounded-[30px_12px_28px_14px]",
  },
  "humanities.visual-arts.sculpture": {
    icon: Shapes,
    question: "How does a work occupy, shape, or interrupt physical space?",
    material: "mass · void · material",
    rgb: "251,146,60",
    index: "02",
    motif: "sculpture",
    shapeClass: "rounded-[12px_34px_14px_30px]",
  },
  "humanities.visual-arts.photography": {
    icon: Aperture,
    question: "What changes when an image is made through a lens and exposure?",
    material: "light · lens · frame",
    rgb: "34,211,238",
    index: "03",
    motif: "photography",
    shapeClass: "rounded-[14px]",
  },
  "humanities.visual-arts.printmaking": {
    icon: Printer,
    question: "How does a matrix create repeatable images, variations, and editions?",
    material: "matrix · impression · edition",
    rgb: "250,204,21",
    index: "04",
    motif: "print",
    shapeClass: "rounded-[8px_26px_8px_26px]",
  },
  "humanities.visual-arts.digital-media": {
    icon: MonitorPlay,
    question: "What happens when an artwork changes through time, code, or interaction?",
    material: "screen · time · interaction",
    rgb: "167,139,250",
    index: "05",
    motif: "digital",
    shapeClass: "rounded-[24px]",
  },
  "humanities.visual-arts.art-history": {
    icon: History,
    question: "How do objects acquire meaning through time, place, institutions, and interpretation?",
    material: "object · evidence · context",
    rgb: "96,165,250",
    index: "06",
    motif: "history",
    shapeClass: "rounded-[14px_14px_32px_32px]",
  },
};

const PRACTICE_STEPS = [
  {
    icon: Layers3,
    label: "Choose material",
    text: "Every medium enables some actions, resists others, and carries histories of use.",
    rgb: "251,146,60",
  },
  {
    icon: ScanEye,
    label: "Organize form",
    text: "Line, color, value, texture, scale, rhythm, and space direct attention.",
    rgb: "244,63,94",
  },
  {
    icon: ImageIcon,
    label: "Make an encounter",
    text: "An image or object becomes experience through framing, site, duration, and the viewer's body.",
    rgb: "34,211,238",
  },
  {
    icon: History,
    label: "Interpret in context",
    text: "Maker, audience, institution, technology, exchange, and history alter what a work can mean.",
    rgb: "167,139,250",
  },
] as const;

export default function VisualArtsHub({ branches }: Props) {
  return (
    <SceneFrame
      background={<VisualArtsBackground />}
      className="bg-[#0b0708] text-stone-100 selection:bg-rose-400/25"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(11,7,8,0.50)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Humanities", href: "/humanities" },
            { label: "Visual Arts" },
          ]}
          eyebrow="Material · composition · image · object · encounter · context"
          eyebrowStyle="rule"
          icon={Palette}
          title={<span>Visual Arts</span>}
          subtitle="Visual art is made through material decisions and encountered as images, objects, spaces, and time-based experiences. Enter through a practice, then study how making, looking, and context reshape one another."
          accentRgb="251, 146, 60"
          titleClassName="font-sans text-[clamp(2.9rem,5.6vw,6.3rem)] font-semibold leading-[0.83] tracking-[-0.067em] text-[#fff9f2]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="relative isolate mt-5 overflow-hidden border-y border-orange-100/[0.11] py-5 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,10,0.38),rgba(8,10,14,0.12)_54%,transparent_82%)] backdrop-blur-[3px]" />
        <div className="relative">
          <div className="max-w-5xl">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-orange-200/70">
              <Palette size={14} /> Primary navigation · studio practices
            </div>
            <h2 className="mt-2 text-[clamp(2rem,4vw,4.1rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
              Choose how the work enters the world: as surface, object, image, impression, medium, or historical evidence.
            </h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/[0.72]">
              These six routes are direct children of Visual Arts. Their tools differ, but none operates alone: material choices create formal effects, viewing conditions shape experience, and context changes interpretation.
            </p>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
            <nav aria-label="Visual Arts branches" className="grid gap-3 md:grid-cols-2">
              {branches.map((branch) => (
                <PracticeRoom key={branch.id} branch={branch} />
              ))}
            </nav>
            <StudioCompass />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <VisualAnalysisStudio />
      </section>

      <section className="mt-8 border-t border-stone-100/[0.10] pt-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-100/60">
              <Layers3 size={14} /> Practice cycle · reference, not navigation
            </div>
            <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
              Making and interpretation form a loop rather than a one-way pipeline.
            </h2>
          </div>
          <p className="text-[14px] leading-6 text-stone-400/[0.74]">
            Artists revise materials after seeing formal effects. Viewers notice context after close looking. Institutions alter encounters through display, access, conservation, and classification. Each stage sends new questions back into the others.
          </p>
        </div>

        <div className="mt-5 grid border-y border-stone-100/[0.09] md:grid-cols-2 xl:grid-cols-4">
          {PRACTICE_STEPS.map((step, index) => (
            <PracticeStep key={step.label} {...step} index={index + 1} />
          ))}
        </div>
      </section>
    </SceneFrame>
  );
}

function PracticeRoom({ branch }: { branch: Branch }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["humanities.visual-arts.painting"];
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = (
    <Surface
      variant="glass"
      className={`group relative min-h-[168px] overflow-hidden p-4 transition sm:p-5 ${meta.shapeClass} ${
        planned ? "opacity-60" : "hover:-translate-y-1"
      }`}
      style={{
        borderColor: `rgba(${meta.rgb},${planned ? 0.08 : 0.20})`,
        background: `linear-gradient(145deg,rgba(13,8,10,0.58),rgba(${meta.rgb},0.045)_58%,rgba(6,7,11,0.12))`,
        boxShadow: planned ? undefined : `inset 0 3px 0 rgba(${meta.rgb},0.30)`,
      }}
    >
      <RoomMotif motif={meta.motif} rgb={meta.rgb} />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-[13px] border backdrop-blur-[10px]"
            style={{
              color: `rgb(${meta.rgb})`,
              borderColor: `rgba(${meta.rgb},0.28)`,
              background: `rgba(${meta.rgb},0.055)`,
            }}
          >
            <Icon size={18} />
          </span>
          <span className="font-mono text-[11px] text-stone-600">{meta.index}</span>
        </div>
        <div className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${meta.rgb},0.72)` }}>
          {meta.material}
        </div>
        <h3 className="mt-1 text-[19px] font-semibold text-white">{branch.label}</h3>
        <p className="mt-2 max-w-xl text-[13px] leading-5 text-stone-300/[0.72]">{meta.question}</p>
        <span className="mt-auto flex items-center justify-between pt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>
          {planned ? "planned studio" : "enter studio"}
          {!planned ? <ArrowRight size={15} className="transition group-hover:translate-x-1" /> : null}
        </span>
      </div>
    </Surface>
  );

  return planned ? <div aria-disabled="true">{body}</div> : <Link href={branch.href}>{body}</Link>;
}

function RoomMotif({ motif, rgb }: { motif: BranchMeta["motif"]; rgb: string }) {
  if (motif === "painting") {
    return (
      <div className="pointer-events-none absolute inset-0 opacity-[0.45]">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="absolute left-[34%] h-3 w-[72%] rounded-full blur-[2px]"
            style={{
              top: `${25 + index * 22}%`,
              background: `linear-gradient(90deg,rgba(${rgb},0),rgba(${rgb},${0.20 - index * 0.035}),rgba(${rgb},0))`,
              transform: `rotate(${-8 + index * 7}deg)`,
            }}
          />
        ))}
      </div>
    );
  }

  if (motif === "sculpture") {
    return (
      <svg className="pointer-events-none absolute inset-y-0 right-0 h-full w-[48%] opacity-[0.45]" viewBox="0 0 180 160" aria-hidden="true">
        <path d="M90 18 L148 52 L142 118 L82 144 L30 104 L38 43 Z" fill="none" stroke={`rgba(${rgb},0.38)`} strokeWidth="1.5" />
        <path d="M90 18 L82 144 M30 104 L148 52 M38 43 L142 118" fill="none" stroke={`rgba(${rgb},0.22)`} />
        <circle cx="90" cy="80" r="31" fill={`rgba(${rgb},0.035)`} stroke={`rgba(${rgb},0.20)`} />
      </svg>
    );
  }

  if (motif === "photography") {
    return (
      <div className="pointer-events-none absolute inset-3 opacity-[0.42]">
        <span className="absolute inset-4 border" style={{ borderColor: `rgba(${rgb},0.23)` }} />
        <span className="absolute bottom-4 left-1/2 top-4 w-px" style={{ background: `rgba(${rgb},0.11)` }} />
        <span className="absolute inset-x-4 top-1/2 h-px" style={{ background: `rgba(${rgb},0.11)` }} />
        <span className="absolute right-[16%] top-[22%] h-12 w-12 rounded-full border" style={{ borderColor: `rgba(${rgb},0.28)` }} />
      </div>
    );
  }

  if (motif === "print") {
    return (
      <div className="pointer-events-none absolute bottom-3 right-3 grid w-[42%] grid-cols-4 gap-1 opacity-[0.42]">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} className="aspect-square border" style={{ borderColor: `rgba(${rgb},${index % 5 === 0 ? 0.30 : 0.12})`, background: `rgba(${rgb},${index % 5 === 0 ? 0.06 : 0.015})` }} />
        ))}
      </div>
    );
  }

  if (motif === "digital") {
    return (
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[46%] opacity-[0.38]" style={{ backgroundImage: `linear-gradient(rgba(${rgb},0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(${rgb},0.08) 1px,transparent 1px)`, backgroundSize: "18px 18px" }}>
        <span className="absolute inset-x-0 top-[36%] h-px" style={{ background: `rgba(${rgb},0.30)`, boxShadow: `0 0 18px rgba(${rgb},0.18)` }} />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute bottom-3 right-3 h-[72%] w-[42%] opacity-40">
      {[0, 1, 2].map((index) => (
        <span key={index} className="absolute border" style={{ inset: `${index * 10}px`, borderColor: `rgba(${rgb},${0.24 - index * 0.05})` }} />
      ))}
    </div>
  );
}

function StudioCompass() {
  const questions = [
    { label: "Material", note: "What is it made from?", rgb: "251,146,60", position: "left-5 top-[20%]" },
    { label: "Form", note: "How is attention organized?", rgb: "244,63,94", position: "right-5 top-[20%] text-right" },
    { label: "Encounter", note: "How is it seen or entered?", rgb: "34,211,238", position: "left-5 bottom-[15%]" },
    { label: "Context", note: "What changes around the object?", rgb: "167,139,250", position: "right-5 bottom-[15%] text-right" },
  ] as const;

  return (
    <Surface
      variant="ghost"
      className="relative min-h-[530px] overflow-hidden rounded-[30px] border-white/[0.09]"
      style={{ background: "rgba(8,7,10,0.08)" }}
    >
      <div className="relative px-5 pt-5">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-stone-400">Shared visual questions</div>
        <p className="mt-2 max-w-sm text-[13px] leading-5 text-stone-400/[0.72]">Every studio answers these questions differently. The center changes medium; the analytical compass remains.</p>
      </div>

      <div className="absolute inset-x-5 bottom-5 top-[104px]">
        <div className="absolute left-1/2 top-1/2 h-[250px] w-[190px] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] rounded-[18px] border border-rose-100/[0.16] bg-[linear-gradient(145deg,rgba(244,63,94,0.18),rgba(251,146,60,0.09)_48%,rgba(34,211,238,0.05))] shadow-[0_30px_80px_rgba(0,0,0,0.26)] backdrop-blur-[12px]">
          <div className="absolute inset-5 border border-white/[0.10]" />
          <div className="absolute left-[22%] top-[16%] h-[64%] w-[45%] rounded-[48%_52%_38%_62%] bg-rose-300/[0.16] blur-[2px]" />
          <div className="absolute right-[12%] top-[24%] h-[54%] w-px bg-cyan-200/[0.42]" />
          <div className="absolute bottom-[15%] left-[16%] h-px w-[70%] rotate-[-18deg] bg-amber-200/[0.34]" />
        </div>

        {questions.map((question) => (
          <div key={question.label} className={`absolute ${question.position}`}>
            <div className="rounded-[13px] border px-3 py-2 backdrop-blur-[10px]" style={{ borderColor: `rgba(${question.rgb},0.18)`, background: `rgba(${question.rgb},0.045)` }}>
              <strong className="block text-[13px]" style={{ color: `rgb(${question.rgb})` }}>{question.label}</strong>
              <span className="mt-0.5 block max-w-[150px] text-[11px] leading-4 text-stone-500">{question.note}</span>
            </div>
          </div>
        ))}

        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 360 400" preserveAspectRatio="none" aria-hidden="true">
          <path d="M64 88 C112 110 120 164 151 188" fill="none" stroke="rgba(251,146,60,0.22)" />
          <path d="M298 88 C250 110 239 157 207 188" fill="none" stroke="rgba(244,63,94,0.22)" />
          <path d="M65 326 C112 292 121 244 151 217" fill="none" stroke="rgba(34,211,238,0.22)" />
          <path d="M296 326 C247 292 237 245 207 217" fill="none" stroke="rgba(167,139,250,0.22)" />
        </svg>
      </div>
    </Surface>
  );
}

function PracticeStep({
  icon: Icon,
  label,
  text,
  rgb,
  index,
}: (typeof PRACTICE_STEPS)[number] & { index: number }) {
  return (
    <article className="relative min-h-[190px] border-b border-stone-100/[0.07] px-5 py-5 last:border-b-0 md:border-r md:last:border-r-0 xl:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border backdrop-blur-[10px]" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.22)`, background: `rgba(${rgb},0.045)` }}>
          <Icon size={17} />
        </span>
        <span className="font-mono text-[11px] text-stone-600">{String(index).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.025em] text-white">{label}</h3>
      <p className="mt-2 text-[14px] leading-6 text-stone-400/[0.72]">{text}</p>
    </article>
  );
}
