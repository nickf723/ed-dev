import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Box,
  Briefcase,
  Building,
  Cpu,
  GraduationCap,
  Hammer,
  HeartPulse,
  Library,
  PenTool,
  Wheat,
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
    description: "Design structures, mechanisms, processes, and engineered systems from scientific principles.",
    output: "Reliable systems",
  },
  "applied.technology": {
    icon: Cpu,
    rgb: "96, 165, 250",
    shortLabel: "Tools & infrastructure",
    description: "Turn scientific and computational knowledge into practical tools, devices, platforms, and networks.",
    output: "Working technology",
  },
  "applied.materials-science": {
    icon: Box,
    rgb: "34, 211, 238",
    shortLabel: "Matter & performance",
    description: "Study and engineer materials through their structure, properties, processing, and practical use.",
    output: "Purpose-built materials",
  },
  "applied.industrial-design": {
    icon: PenTool,
    rgb: "251, 146, 60",
    shortLabel: "Products & interfaces",
    description: "Shape useful objects around human needs by balancing function, form, ergonomics, and manufacture.",
    output: "Usable products",
  },
  "applied.architecture": {
    icon: Building,
    rgb: "251, 191, 36",
    shortLabel: "Spaces & structures",
    description: "Design the built environment through structure, material, climate, culture, and human use.",
    output: "Habitable space",
  },
  "applied.medicine": {
    icon: HeartPulse,
    rgb: "244, 114, 182",
    shortLabel: "Diagnosis & treatment",
    description: "Apply biological and clinical knowledge to diagnosis, treatment, intervention, and patient care.",
    output: "Clinical care",
  },
  "applied.health": {
    icon: Activity,
    rgb: "251, 113, 133",
    shortLabel: "Health & prevention",
    description: "Explore health across physiology, prevention, care, specialization, wellness, and population outcomes.",
    output: "Healthier lives",
  },
  "applied.agriculture": {
    icon: Wheat,
    rgb: "74, 222, 128",
    shortLabel: "Cultivation & food",
    description: "Apply biological, environmental, and technical knowledge to food, cultivation, and land systems.",
    output: "Resilient food systems",
  },
  "applied.business": {
    icon: Briefcase,
    rgb: "52, 211, 153",
    shortLabel: "Organizations & value",
    description: "Coordinate people, capital, markets, operations, and information to create and sustain organizations.",
    output: "Working organizations",
  },
  "applied.education": {
    icon: GraduationCap,
    rgb: "96, 165, 250",
    shortLabel: "Learning & instruction",
    description: "Design learning environments, curriculum, assessment, and instruction around how people develop knowledge and skill.",
    output: "Effective learning",
  },
  "applied.library-science": {
    icon: Library,
    rgb: "34, 211, 238",
    shortLabel: "Knowledge organization",
    description: "Organize, preserve, retrieve, and provide access to information across collections and communities.",
    output: "Findable knowledge",
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
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70 saturate-100">
        <InfrastructureBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(167,139,250,0.12),transparent_28%),radial-gradient(circle_at_18%_82%,rgba(96,165,250,0.055),transparent_28%),linear-gradient(135deg,rgba(7,6,10,0.18),rgba(5,5,8,0.62))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-35 [background-image:linear-gradient(rgba(167,139,250,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.028)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(7,6,10,0.01),rgba(7,6,10,0.34))]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 xl:h-screen xl:min-h-0 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Applied Sciences" },
          ]}
          eyebrow="Design · Build · Test · Deploy"
          icon={Hammer}
          title={<span>Applied Sciences</span>}
          subtitle="Turn knowledge into things that work: systems, technologies, products, treatments, organizations, learning environments, information systems, materials, food, and spaces shaped by real constraints."
          accentRgb="167, 139, 250"
          titleClassName="text-[clamp(3.2rem,5.8vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-white"
          iconClassName="rounded-[18px]"
        />

        <section className="relative mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[26px] border border-violet-300/20 bg-black/[0.16] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-md sm:p-4">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1.5px)] [background-size:26px_26px]" />

          <div className="relative grid shrink-0 gap-2 rounded-[18px] border border-white/[0.07] bg-[#09080d]/58 p-2 backdrop-blur-md md:grid-cols-5">
            {STAGES.map((stage, index) => (
              <div key={stage.label} className="relative flex items-center gap-3 rounded-[13px] px-3 py-2">
                {index < STAGES.length - 1 ? (
                  <ArrowRight
                    size={12}
                    className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-violet-300/24 md:block"
                  />
                ) : null}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-violet-300/18 bg-violet-400/[0.06] font-mono text-[8px] text-violet-200/75">
                  {stage.index}
                </span>
                <span className="min-w-0">
                  <strong className="block text-[10px] font-semibold text-slate-200">{stage.label}</strong>
                  <span className="mt-0.5 block text-[7px] text-slate-600">{stage.detail}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="relative mt-3 grid min-h-0 flex-1 auto-rows-fr gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3">
            {fields.map((field, index) => (
              <AppliedFieldCard
                key={field.id}
                field={field}
                wide={index === fields.length - 1 && fields.length % 4 === 3}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AppliedFieldCard({ field, wide }: { field: AppliedField; wide: boolean }) {
  const Icon = field.icon;
  const planned = field.status === "placeholder";
  const visibleChildren = field.children.slice(0, 3);

  return (
    <article
      className={`group relative flex min-h-[132px] flex-col overflow-hidden rounded-[18px] border p-3.5 backdrop-blur-md transition-all duration-300 ${wide ? "xl:col-span-2" : ""} ${planned ? "opacity-50" : "hover:-translate-y-0.5"}`}
      style={{
        borderColor: `rgba(${field.rgb},0.24)`,
        background: `linear-gradient(150deg, rgba(${field.rgb},0.105), rgba(8,8,12,0.72) 48%, rgba(7,7,10,0.60))`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 38px rgba(0,0,0,0.10)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(145deg, rgba(${field.rgb},0.14), transparent 58%)` }}
      />

      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex items-start gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
            style={{
              color: `rgb(${field.rgb})`,
              borderColor: `rgba(${field.rgb},0.34)`,
              background: `rgba(${field.rgb},0.08)`,
            }}
          >
            <Icon size={17} strokeWidth={1.55} />
          </span>
          <div className="min-w-0 flex-1">
            <Link href={field.href} className="inline-flex max-w-full items-center gap-2">
              <h2 className="truncate text-[15px] font-semibold tracking-[-0.025em] text-white">{field.label}</h2>
              {!planned ? <ArrowRight size={11} style={{ color: `rgb(${field.rgb})` }} className="shrink-0" /> : null}
            </Link>
            <div
              className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em]"
              style={{ color: `rgba(${field.rgb},0.86)` }}
            >
              {field.shortLabel}
            </div>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-[9px] leading-4 text-slate-500">{field.description}</p>

        {visibleChildren.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {visibleChildren.map((child) => (
              <Link
                key={child.id}
                href={child.href}
                className="rounded-md border border-white/[0.07] bg-black/20 px-2 py-1 text-[7px] text-slate-500 transition-colors hover:border-white/[0.14] hover:text-slate-200"
              >
                {child.label}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <strong className="text-[9px] font-semibold text-slate-400">{field.output}</strong>
          {!planned ? (
            <Link
              href={field.href}
              aria-label={`Open ${field.label}`}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors hover:bg-white/[0.05]"
              style={{
                color: `rgb(${field.rgb})`,
                borderColor: `rgba(${field.rgb},0.24)`,
              }}
            >
              <ArrowRight size={12} />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
