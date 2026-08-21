import Link from "next/link";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Building2,
  Factory,
  Landmark,
  Map,
  MoveRight,
  Network,
  Satellite,
  UsersRound,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

type Pattern =
  | "dots"
  | "routes"
  | "blocks"
  | "regions"
  | "borders"
  | "flows"
  | "gradient"
  | "grid";

type BranchMeta = {
  icon: LucideIcon;
  code: string;
  prompt: string;
  rgb: string;
  pattern: Pattern;
};

const META: Record<string, BranchMeta> = {
  "social.geography.population": {
    icon: UsersRound,
    code: "POP",
    prompt:
      "Where are people concentrated, and how does population structure differ between places?",
    rgb: "56,189,248",
    pattern: "dots",
  },
  "social.geography.migration": {
    icon: Waypoints,
    code: "MOV",
    prompt:
      "What moves people, what blocks movement, and how do routes reshape origins and destinations?",
    rgb: "167,139,250",
    pattern: "routes",
  },
  "social.geography.urban": {
    icon: Building2,
    code: "URB",
    prompt:
      "Why do settlements form where they do, and how do cities organize land, housing, work, and infrastructure?",
    rgb: "251,191,36",
    pattern: "blocks",
  },
  "social.geography.cultural": {
    icon: Network,
    code: "CUL",
    prompt:
      "How do language, belief, identity, diffusion, and memory become visible in landscapes and regions?",
    rgb: "244,114,182",
    pattern: "regions",
  },
  "social.geography.political": {
    icon: Landmark,
    code: "POL",
    prompt:
      "How do borders, territory, states, elections, and conflict organize political power across space?",
    rgb: "248,113,113",
    pattern: "borders",
  },
  "social.geography.economic": {
    icon: Factory,
    code: "ECO",
    prompt:
      "Why are production, trade, labor, logistics, and wealth distributed unevenly across locations and networks?",
    rgb: "94,234,212",
    pattern: "flows",
  },
  "social.geography.development": {
    icon: MoveRight,
    code: "DEV",
    prompt:
      "How do infrastructure, institutions, health, wealth, inequality, and opportunity vary across regions and scales?",
    rgb: "74,222,128",
    pattern: "gradient",
  },
  "social.geography.methods": {
    icon: Satellite,
    code: "GIS",
    prompt:
      "How do maps, field observations, remote sensing, spatial data, and GIS change what geographic questions can be answered?",
    rgb: "125,211,252",
    pattern: "grid",
  },
};

const SCALE = [
  ["Site", "building · parcel · intersection"],
  ["Local", "neighborhood · settlement · district"],
  ["Regional", "metro · state · corridor · cultural region"],
  ["Global", "planetary networks · migration · trade"],
] as const;

const OFFSETS = [0, 24, 8, 40, 18, 52, 30, 64] as const;

export default function GeographyLayerDeck({
  branches,
}: {
  branches: readonly CurriculumNode[];
}) {
  return (
    <nav
      aria-label="Human Geography branches"
      className="relative mt-6 overflow-hidden border border-sky-100/[0.10] bg-[#03101f]/[0.28] px-3 py-4 shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-[20px] backdrop-saturate-[1.08] sm:px-5 sm:py-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.035),transparent_33%,rgba(167,139,250,0.025)_68%,transparent)]" />
      <div className="relative mb-4 flex flex-col gap-2 border-b border-white/[0.06] pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.10em] text-sky-100/50">
            GIS light table · eight transparent readings of the same place
          </div>
          <p className="mt-1 max-w-3xl text-[13px] leading-6 text-slate-400/75">
            Layers overlap in real geographic work. Their order is visual, not a
            sequence from simple to advanced.
          </p>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-600">
          planned destinations remain visible
        </div>
      </div>

      <div className="relative hidden min-h-[790px] lg:block">
        <div className="pointer-events-none absolute inset-[4%_3%_8%_3%] rounded-[34px] border border-sky-100/[0.06] bg-[radial-gradient(circle_at_66%_44%,rgba(56,189,248,0.08),transparent_34%),linear-gradient(145deg,rgba(2,8,23,0.16),rgba(3,16,31,0.05))]" />
        <div className="absolute left-[4%] right-[190px] top-[3%]">
          {branches.map((branch, index) => (
            <LayerSheet key={branch.id} branch={branch} index={index} />
          ))}
        </div>
        <ScaleRail />
      </div>

      <div className="relative grid gap-3 sm:grid-cols-2 lg:hidden">
        {branches.map((branch, index) => (
          <MobileLayer key={branch.id} branch={branch} index={index} />
        ))}
      </div>
      <div className="relative mt-4 border-t border-white/[0.06] pt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-sky-100/35">
        layer motifs are schematic · they illustrate geographic questions, not
        measured spatial data
      </div>
    </nav>
  );
}

function LayerSheet({
  branch,
  index,
}: {
  branch: CurriculumNode;
  index: number;
}) {
  const meta = getMeta(branch);
  const Icon = meta.icon;
  const active = branch.status === "active";
  const body = (
    <div
      className={`group relative grid min-h-[104px] grid-cols-[48px_220px_minmax(0,1fr)_42px] items-center gap-3 border bg-[#03111f]/[0.58] px-4 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.12)] backdrop-blur-[14px] transition ${
        index === 0 ? "" : "-mt-[10px]"
      } ${
        active
          ? "hover:-translate-y-1 hover:bg-[#03111f]/[0.72]"
          : "opacity-[0.64]"
      }`}
      style={{
        marginLeft: OFFSETS[index] ?? 0,
        borderColor: `rgba(${meta.rgb},0.18)`,
        zIndex: 20 + index,
      }}
    >
      <LayerPattern pattern={meta.pattern} rgb={meta.rgb} />
      <span
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-[#03111f]/80"
        style={{
          color: `rgb(${meta.rgb})`,
          borderColor: `rgba(${meta.rgb},0.28)`,
        }}
      >
        <Icon size={15} aria-hidden="true" />
      </span>
      <span className="relative z-10 rounded-[14px] bg-[#03111f]/[0.66] px-3 py-2 backdrop-blur-[16px]">
        <span
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: `rgba(${meta.rgb},0.72)` }}
        >
          {String(index + 1).padStart(2, "0")} · {meta.code} layer
        </span>
        <strong className="mt-1 block text-[15px] leading-5 text-white/90">
          {branch.label}
        </strong>
      </span>
      <span className="text-slate-300/78 relative z-10 rounded-[14px] bg-[#03111f]/[0.58] px-3 py-2 text-[12px] leading-5 backdrop-blur-[16px]">
        {meta.prompt}
      </span>
      <span className="relative z-10 flex justify-end">
        {active ? (
          <ArrowRight
            size={14}
            className="text-slate-300 transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        ) : (
          <span className="font-mono text-[10px] uppercase text-slate-600">
            plan
          </span>
        )}
      </span>
    </div>
  );

  if (active && !branch.href) {
    throw new Error(`Active Geography branch ${branch.id} requires an href.`);
  }

  return active ? (
    <Link
      href={branch.href ?? "#"}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-200/60"
    >
      {body}
    </Link>
  ) : (
    <div aria-disabled="true">{body}</div>
  );
}

function MobileLayer({
  branch,
  index,
}: {
  branch: CurriculumNode;
  index: number;
}) {
  const meta = getMeta(branch);
  const Icon = meta.icon;
  const active = branch.status === "active";
  const body = (
    <div
      className={`group relative min-h-[164px] overflow-hidden border bg-[#03111f]/[0.48] px-4 py-4 backdrop-blur-[16px] ${
        active ? "" : "opacity-[0.66]"
      }`}
      style={{ borderColor: `rgba(${meta.rgb},0.18)` }}
    >
      <LayerPattern pattern={meta.pattern} rgb={meta.rgb} />
      <div className="relative z-10 flex items-start justify-between gap-2">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-[#03111f]/80"
          style={{
            color: `rgb(${meta.rgb})`,
            borderColor: `rgba(${meta.rgb},0.28)`,
          }}
        >
          <Icon size={14} aria-hidden="true" />
        </span>
        <span className="font-mono text-[10px] text-slate-600">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="relative z-10 mt-4 rounded-[14px] bg-[#03111f]/[0.66] px-3 py-3 backdrop-blur-[14px]">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.07em]"
          style={{ color: `rgba(${meta.rgb},0.68)` }}
        >
          {meta.code} layer
        </span>
        <strong className="text-white/88 mt-1 block text-[14px] leading-5">
          {branch.label}
        </strong>
        <span className="mt-2 block text-[12px] leading-5 text-slate-400">
          {meta.prompt}
        </span>
      </div>
    </div>
  );

  if (active && !branch.href) {
    throw new Error(`Active Geography branch ${branch.id} requires an href.`);
  }

  return active ? (
    <Link
      href={branch.href ?? "#"}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60"
    >
      {body}
    </Link>
  ) : (
    <div aria-disabled="true">{body}</div>
  );
}

function ScaleRail() {
  return (
    <aside className="absolute bottom-[3%] right-[2%] top-[4%] flex w-[168px] flex-col justify-end rounded-[24px] border border-sky-100/[0.08] bg-[#03111f]/[0.48] p-4 backdrop-blur-[16px]">
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-sky-100/50">
        Change scale
      </div>
      <div className="mt-4 space-y-4">
        {SCALE.map(([label, note], index) => (
          <div
            key={label}
            className="grid grid-cols-[24px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] pb-4 last:border-b-0 last:pb-0"
          >
            <span className="text-sky-100/38 font-mono text-[10px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <strong className="text-white/78 block text-[12px]">
                {label}
              </strong>
              <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                {note}
              </span>
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function getMeta(branch: CurriculumNode): BranchMeta {
  return (
    META[branch.id] ?? {
      icon: Map,
      code: "GEO",
      prompt: branch.description ?? "Explore this branch of geography.",
      rgb: "56,189,248",
      pattern: "grid",
    }
  );
}

function LayerPattern({ pattern, rgb }: { pattern: Pattern; rgb: string }) {
  if (pattern === "dots") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(circle,rgba(${rgb},0.16) 0 2px,transparent 2.5px)`,
          backgroundSize: "26px 26px",
        }}
      />
    );
  }
  if (pattern === "blocks") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(rgba(${rgb},0.09) 1px,transparent 1px),linear-gradient(90deg,rgba(${rgb},0.09) 1px,transparent 1px)`,
          backgroundSize: "34px 24px",
        }}
      />
    );
  }
  if (pattern === "regions") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          background: `radial-gradient(circle_at_22%_45%,rgba(${rgb},0.14),transparent 18%),radial-gradient(circle_at_64%_38%,rgba(${rgb},0.11),transparent 24%),radial-gradient(circle_at_82%_72%,rgba(${rgb},0.10),transparent 16%)`,
        }}
      />
    );
  }
  if (pattern === "gradient") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          background: `linear-gradient(90deg,rgba(${rgb},0.03),rgba(${rgb},0.15),rgba(${rgb},0.05) 68%,transparent)`,
        }}
      />
    );
  }
  if (pattern === "grid") {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(rgba(${rgb},0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(${rgb},0.08) 1px,transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
    );
  }
  if (pattern === "borders") {
    return (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
        viewBox="0 0 900 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M40 15l120 42 110-24 94 49 130-61 116 46 125-33 115 38"
          fill="none"
          stroke={`rgba(${rgb},0.18)`}
          strokeWidth="2"
          strokeDasharray="8 7"
        />
      </svg>
    );
  }

  const flow =
    pattern === "routes"
      ? "M20 74C160 5 270 94 398 38S646 80 880 18"
      : "M20 54C132 18 210 84 338 48S570 17 880 62";
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
      viewBox="0 0 900 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={flow} fill="none" stroke={`rgba(${rgb},0.18)`} strokeWidth="3" />
      <circle cx="160" cy="42" r="5" fill={`rgba(${rgb},0.18)`} />
      <circle cx="610" cy="45" r="5" fill={`rgba(${rgb},0.18)`} />
    </svg>
  );
}
