import Link from "next/link";
import {
  ArrowRight,
  Building,
  Cpu,
  Hammer,
  HeartPulse,
  PenTool,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import InfrastructureBackground from "./InfrastructureBackground";

type FieldPresentation = {
  icon: LucideIcon;
  rgb: string;
  shortLabel: string;
  description: string;
  output: string;
  tags: readonly string[];
};

type AppliedField = {
  id: string;
  label: string;
  href: string;
  status?: "active" | "placeholder";
  children: readonly {
    id: string;
    label: string;
    href: string;
  }[];
} & FieldPresentation;

const PRESENTATION: Record<string, FieldPresentation> = {
  "applied.engineering": {
    icon: Hammer,
    rgb: "167, 139, 250",
    shortLabel: "Systems & machines",
    description:
      "Use mathematics and science to design structures, mechanisms, processes, and engineered systems.",
    output: "Reliable systems",
    tags: ["design", "analysis", "construction"],
  },
  "applied.technology": {
    icon: Cpu,
    rgb: "96, 165, 250",
    shortLabel: "Tools & infrastructure",
    description:
      "Turn scientific and computational knowledge into practical tools, platforms, devices, and networks.",
    output: "Working technology",
    tags: ["software", "hardware", "networks"],
  },
  "applied.industrial-design": {
    icon: PenTool,
    rgb: "251, 146, 60",
    shortLabel: "Products & interfaces",
    description:
      "Shape useful objects around human needs by balancing function, form, ergonomics, and manufacture.",
    output: "Usable products",
    tags: ["form", "ergonomics", "manufacture"],
  },
  "applied.medicine": {
    icon: HeartPulse,
    rgb: "244, 114, 182",
    shortLabel: "Health & intervention",
    description:
      "Apply biological and clinical knowledge to prevention, diagnosis, treatment, and human health.",
    output: "Better health",
    tags: ["diagnosis", "treatment", "prevention"],
  },
  "applied.architecture": {
    icon: Building,
    rgb: "251, 191, 36",
    shortLabel: "Spaces & structures",
    description:
      "Design the built environment by combining structure, material, human use, climate, and culture.",
    output: "Habitable space",
    tags: ["space", "structure", "environment"],
  },
};

const STAGES = [
  { index: "01", label: "Need", detail: "define the problem" },
  { index: "02", label: "Design", detail: "choose constraints" },
  { index: "03", label: "Prototype", detail: "make it real" },
  { index: "04", label: "Test", detail: "measure performance" },
  { index: "05", label: "Deploy", detail: "put it to work" },
] as const;

export default function AppliedSciencePage() {
  const applied = curriculumRegistry
    .allDomains()
    .find((domain) => domain.domainId === "applied");

  if (!applied) {
    throw new Error("Applied Science is missing from the curriculum registry.");
  }

  const fields: AppliedField[] = applied.children.map((node) => {
    const presentation = PRESENTATION[node.id] ?? {
      icon: Hammer,
      rgb: "167, 139, 250",
      shortLabel: "Knowledge in action",
      description: node.description ?? `Apply knowledge through ${node.label}.`,
      output: "Practical outcomes",
      tags: ["apply", "test", "build"],
    };

    return {
      id: node.id,
      label: node.label,
      href: node.href,
      status: node.status,
      children: (node.children ?? []).map((child) => ({
        id: child.id,
        label: child.label,
        href: child.href,
      })),
      ...presentation,
    };
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07060a] text-slate-100 selection:bg-violet-400/25 xl:h-screen xl:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-25 saturate-75">
        <InfrastructureBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(167,139,250,0.14),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(96,165,250,0.07),transparent_28%),linear-gradient(135deg,rgba(7,6,10,0.76),rgba(5,5,8,0.93))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-55 [background-image:linear-gradient(rgba(167,139,250,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.026)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(7,6,10,0.03),rgba(7,6,10,0.58))]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 xl:h-screen xl:min-h-0 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences" },
          ]}
          eyebrow="Design · Build · Test · Deploy"
          icon={Hammer}
          title={<span>Applied Sciences</span>}
          subtitle="Turn knowledge into things that work: systems, technologies, products, treatments, and spaces shaped by real constraints."
          accentRgb="167, 139, 250"
          titleClassName="text-[clamp(3.2rem,5.8vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-white"
          iconClassName="rounded-[18px]"
          aside={
            <div className="flex items-center gap-2 rounded-full border border-violet-300/20 bg-black/25 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-violet-200/80 backdrop-blur-md">
              <span>{fields.length} fields</span>
              <span className="text-slate-700">·</span>
              <span>knowledge → outcome</span>
            </div>
          }
        />

        <section className="relative mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[26px] border border-violet-300/18 bg-black/[0.28] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_28px_80px_rgba(0,0,0,0.30)] backdrop-blur-xl sm:p-4">
          <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1.5px)] [background-size:26px_26px]" />
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-violet-400/[0.045] blur-3xl" />

          <div className="relative grid shrink-0 gap-2 rounded-[18px] border border-white/[0.06] bg-[#09080d]/72 p-2 md:grid-cols-5">
            {STAGES.map((stage, index) => (
              <div key={stage.label} className="relative flex items-center gap-3 rounded-[13px] px-3 py-2.5">
                {index < STAGES.length - 1 ? (
                  <ArrowRight
                    size={12}
                    className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-violet-300/20 md:block"
                  />
                ) : null}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-300/15 bg-violet-400/[0.045] font-mono text-[8px] text-violet-200/70">
                  {stage.index}
                </span>
                <span className="min-w-0">
                  <strong className="block text-[11px] font-semibold text-slate-200">{stage.label}</strong>
                  <span className="mt-0.5 block text-[8px] text-slate-600">{stage.detail}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="relative mt-3 flex items-end justify-between gap-4 px-1">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-violet-300/70">Applied workbench</div>
              <p className="mt-1 text-[11px] text-slate-600">Five ways knowledge becomes intervention in the physical and human world.</p>
            </div>
            <div className="hidden font-mono text-[8px] uppercase tracking-[0.14em] text-slate-700 sm:block">choose a field to enter</div>
          </div>

          <div className="relative mt-3 grid min-h-0 flex-1 auto-rows-fr gap-3 md:grid-cols-2 xl:grid-cols-5">
            {fields.map((field, index) => (
              <AppliedFieldCard key={field.id} field={field} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AppliedFieldCard({
  field,
  index,
}: {
  field: AppliedField;
  index: number;
}) {
  const Icon = field.icon;
  const planned = field.status === "placeholder";

  return (
    <article
      className={`group relative flex min-h-[250px] flex-col overflow-hidden rounded-[20px] border p-4 backdrop-blur-md transition-all duration-300 ${planned ? "opacity-50" : "hover:-translate-y-0.5"}`}
      style={{
        borderColor: `rgba(${field.rgb},0.20)`,
        background: `linear-gradient(155deg, rgba(${field.rgb},0.085), rgba(8,8,12,0.82) 42%, rgba(7,7,10,0.72))`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.035), 0 20px 45px rgba(0,0,0,0.12)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(145deg, rgba(${field.rgb},0.12), transparent 58%)` }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{
              color: `rgb(${field.rgb})`,
              borderColor: `rgba(${field.rgb},0.32)`,
              background: `rgba(${field.rgb},0.07)`,
            }}
          >
            <Icon size={20} strokeWidth={1.55} />
          </span>
          <span className="font-mono text-[8px] text-slate-700">{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">{field.label}</h2>
          <div
            className="mt-1 font-mono text-[8px] uppercase tracking-[0.13em]"
            style={{ color: `rgba(${field.rgb},0.86)` }}
          >
            {field.shortLabel}
          </div>
          <p className="mt-3 text-[10px] leading-[18px] text-slate-500">{field.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {field.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em]"
              style={{
                color: `rgba(${field.rgb},0.78)`,
                borderColor: `rgba(${field.rgb},0.16)`,
                background: `rgba(${field.rgb},0.04)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {field.children.length > 0 ? (
          <div className="mt-4 border-t border-white/[0.06] pt-3">
            <div className="font-mono text-[7px] uppercase tracking-[0.14em] text-slate-700">Inside this field</div>
            <div className="mt-2 space-y-1.5">
              {field.children.map((child) => (
                <Link
                  key={child.id}
                  href={child.href}
                  className="flex items-center justify-between rounded-lg border border-white/[0.055] bg-white/[0.018] px-2.5 py-2 text-[9px] text-slate-500 transition-colors hover:border-white/[0.12] hover:text-slate-200"
                >
                  {child.label}
                  <ArrowRight size={10} />
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-auto border-t border-white/[0.065] pt-3">
          <div className="flex items-center justify-between gap-3">
            <span>
              <span className="block font-mono text-[7px] uppercase tracking-[0.14em] text-slate-700">Output</span>
              <strong className="mt-1 block text-[11px] font-semibold text-slate-300">{field.output}</strong>
            </span>
            {!planned ? (
              <Link
                href={field.href}
                aria-label={`Open ${field.label}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors hover:bg-white/[0.05]"
                style={{
                  color: `rgb(${field.rgb})`,
                  borderColor: `rgba(${field.rgb},0.22)`,
                }}
              >
                <ArrowRight size={13} />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
