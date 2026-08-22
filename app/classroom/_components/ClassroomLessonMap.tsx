import Link from "next/link";
import { ArrowRight, CircleDashed } from "lucide-react";
import {
  getClassroomRouteAccent,
  type ClassroomRouteAccent,
} from "@/app/classroom/_components/classroom-accents";

export type ClassroomLessonMapItem = {
  id: string;
  slug: string;
  label: string;
  title: string;
  description: string;
  status: "active" | "planned";
  href?: string;
  accent: ClassroomRouteAccent;
};

function ExpressionsBackdrop() {
  return (
    <div className="flex h-full items-center justify-center font-mono">
      <div className="rounded-[22px] border border-red-200/[0.12] bg-black/[0.16] px-5 py-4 text-[clamp(1.45rem,3.8vw,3.4rem)] font-semibold tracking-[-0.07em] text-stone-400">
        <span className="text-red-200/70">3x²</span>
        <span className="px-2 text-stone-600">−</span>
        <span className="text-orange-200/65">2x</span>
        <span className="px-2 text-stone-600">+</span>
        <span className="text-yellow-200/65">5</span>
      </div>
    </div>
  );
}

function OneStepBackdrop() {
  return (
    <div className="flex h-full items-center justify-center font-mono">
      <div className="w-[82%] max-w-[360px] text-center">
        <div className="text-[clamp(1.5rem,3.4vw,3rem)] font-semibold text-orange-100/55">
          x + 4 = 9
        </div>
        <div className="mx-auto mt-4 h-px w-full bg-orange-200/30" />
        <div className="mx-auto h-9 w-px bg-orange-200/25" />
        <div className="grid grid-cols-2 gap-8">
          <span className="h-3 rounded-full bg-orange-300/20" />
          <span className="h-3 rounded-full bg-orange-300/20" />
        </div>
      </div>
    </div>
  );
}

function TwoStepBackdrop() {
  return (
    <div className="flex h-full items-center justify-center font-mono">
      <div className="space-y-2 text-[clamp(1.05rem,2.4vw,2rem)] font-semibold text-stone-500">
        <div className="rounded-xl border border-yellow-200/[0.10] px-4 py-2">
          3x + 5 = 20
        </div>
        <div className="ml-8 rounded-xl border border-orange-200/[0.12] px-4 py-2 text-orange-100/55">
          3x = 15
        </div>
        <div className="ml-16 rounded-xl border border-red-200/[0.12] px-4 py-2 text-red-100/55">
          x = 5
        </div>
      </div>
    </div>
  );
}

function PropertiesBackdrop() {
  return (
    <div className="flex h-full items-center justify-center font-mono">
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-2 text-[clamp(1.1rem,2.7vw,2.3rem)] font-semibold">
        <span className="rounded-xl border border-violet-200/[0.16] bg-violet-300/[0.08] px-3 py-2 text-violet-100/60">
          a
        </span>
        <span className="text-stone-600">+</span>
        <span className="rounded-xl border border-pink-200/[0.16] bg-pink-300/[0.08] px-3 py-2 text-pink-100/60">
          b
        </span>
        <span className="col-span-3 text-center text-[14px] text-stone-600">
          =
        </span>
        <span className="rounded-xl border border-pink-200/[0.16] bg-pink-300/[0.08] px-3 py-2 text-pink-100/60">
          b
        </span>
        <span className="text-stone-600">+</span>
        <span className="rounded-xl border border-violet-200/[0.16] bg-violet-300/[0.08] px-3 py-2 text-violet-100/60">
          a
        </span>
      </div>
    </div>
  );
}

function NumberSystemsBackdrop() {
  return (
    <div className="flex h-full items-center justify-center font-mono font-semibold">
      <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-blue-200/[0.16] sm:h-44 sm:w-44">
        <span className="absolute left-4 top-1 text-[20px] text-blue-100/45">
          ℝ
        </span>
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-200/[0.18] sm:h-36 sm:w-36">
          <span className="absolute left-4 top-1 text-[19px] text-cyan-100/50">
            ℚ
          </span>
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-green-200/[0.18] sm:h-28 sm:w-28">
            <span className="absolute left-3 top-1 text-[18px] text-green-100/50">
              ℤ
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-200/[0.20] text-[18px] text-yellow-100/55 sm:h-16 sm:w-16">
              ℕ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WaterBackdrop() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="absolute h-36 w-36 rounded-full border border-green-100/[0.12]" />
      {[
        ["left-[20%] top-[30%]", "O"],
        ["right-[20%] top-[24%]", "H"],
        ["right-[14%] bottom-[24%]", "H"],
      ].map(([position, atom]) => (
        <span
          key={position}
          className={`absolute ${position} flex h-14 w-14 items-center justify-center rounded-full border font-mono text-[18px] font-semibold ${
            atom === "O"
              ? "border-red-200/[0.18] bg-red-300/[0.06] text-red-100/50"
              : "border-cyan-200/[0.18] bg-cyan-300/[0.06] text-cyan-100/50"
          }`}
        >
          {atom}
        </span>
      ))}
      <span className="absolute left-[31%] top-[44%] w-[35%] border-t border-dashed border-green-100/20" />
      <span className="absolute left-[34%] top-[57%] w-[31%] -rotate-[18deg] border-t border-dashed border-green-100/20" />
    </div>
  );
}

function World1750Backdrop() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative h-40 w-40 rounded-full border border-blue-200/[0.16] bg-blue-300/[0.025] shadow-[inset_0_0_35px_rgba(96,165,250,0.05)] sm:h-48 sm:w-48">
        <div className="absolute inset-x-3 top-1/2 border-t border-blue-100/[0.13]" />
        <div className="absolute inset-y-3 left-1/2 border-l border-blue-100/[0.13]" />
        <div className="absolute inset-x-5 top-[28%] h-[44%] rounded-[50%] border border-blue-100/[0.10]" />
        {[
          "left-[24%] top-[30%]",
          "left-[55%] top-[22%]",
          "left-[65%] top-[58%]",
          "left-[33%] top-[66%]",
        ].map((position) => (
          <span
            key={position}
            className={`absolute ${position} h-2.5 w-2.5 rounded-full border border-cyan-100/30 bg-cyan-300/25 shadow-[0_0_14px_rgba(103,232,249,0.35)]`}
          />
        ))}
      </div>
    </div>
  );
}

function EvidenceBackdrop() {
  return (
    <div className="flex h-full items-center justify-center font-serif">
      <div className="w-[80%] max-w-[350px] rotate-[-2deg] rounded-[10px] border border-yellow-100/[0.13] bg-yellow-100/[0.035] px-5 py-4">
        {["the dark ovens", "folded the apron", "a new FOR LEASE sign"].map(
          (line, index) => (
            <div
              key={line}
              className={`my-2 flex items-center gap-3 text-[14px] text-yellow-50/40 ${
                index === 1 ? "translate-x-3" : ""
              }`}
            >
              <span className="font-mono text-[11px] text-yellow-200/30">
                0{index + 1}
              </span>
              <span className="bg-yellow-300/[0.07] px-1">{line}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function LessonBackdrop({ slug }: { slug: string }) {
  let visual: React.ReactNode;
  let fade =
    "bg-[linear-gradient(90deg,#06140f_0%,rgba(6,20,15,0.82)_18%,transparent_70%)]";

  switch (slug) {
    case "expressions-variables":
      visual = <ExpressionsBackdrop />;
      break;
    case "one-step-equations":
      visual = <OneStepBackdrop />;
      break;
    case "two-step-equations":
      visual = <TwoStepBackdrop />;
      break;
    case "algebraic-properties":
      visual = <PropertiesBackdrop />;
      break;
    case "number-systems":
      visual = <NumberSystemsBackdrop />;
      break;
    case "water-hydrogen-bonding":
      visual = <WaterBackdrop />;
      fade =
        "bg-[linear-gradient(90deg,#03170f_0%,rgba(3,23,15,0.82)_18%,transparent_70%)]";
      break;
    case "world-in-1750":
      visual = <World1750Backdrop />;
      fade =
        "bg-[linear-gradient(90deg,#05101c_0%,rgba(5,16,28,0.82)_18%,transparent_70%)]";
      break;
    case "evidence-inference":
      visual = <EvidenceBackdrop />;
      fade =
        "bg-[linear-gradient(90deg,#171205_0%,rgba(23,18,5,0.82)_18%,transparent_70%)]";
      break;
    default:
      visual = null;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 w-full opacity-35 sm:w-[54%] sm:opacity-70"
    >
      {visual}
      <div className={`absolute inset-0 z-10 ${fade}`} />
    </div>
  );
}

export default function ClassroomLessonMap({
  items,
  ariaLabel,
}: {
  items: readonly ClassroomLessonMapItem[];
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <ol className="space-y-3">
        {items.map((item) => {
          const live = item.status === "active" && Boolean(item.href);
          const presentation = getClassroomRouteAccent(item.accent);
          const surface = (
            <span
              className={`relative block min-h-[166px] overflow-hidden rounded-[26px] border p-5 backdrop-blur-2xl transition-[border-color,box-shadow] sm:p-6 ${presentation.border} ${
                live
                  ? `${presentation.surface} group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_24px_70px_rgba(0,0,0,0.22)]`
                  : "bg-black/[0.17]"
              }`}
            >
              <LessonBackdrop slug={item.slug} />
              <span className="relative z-20 grid min-h-[118px] gap-5 sm:grid-cols-[58px_minmax(0,1fr)_auto] sm:items-center sm:pr-[35%] lg:pr-[40%]">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border font-mono text-[12px] font-semibold ${presentation.marker} ${live ? "" : "opacity-45"}`}
                >
                  {item.label}
                </span>
                <span>
                  <strong
                    className={`block text-[clamp(1.35rem,2.8vw,2rem)] tracking-[-0.04em] ${live ? "text-stone-100" : "text-stone-500"}`}
                  >
                    {item.title}
                  </strong>
                  <span
                    className={`mt-2 block max-w-2xl text-[14px] leading-6 ${live ? "text-stone-400" : "text-stone-600"}`}
                  >
                    {item.description}
                  </span>
                </span>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${presentation.border} ${presentation.text} ${live ? "" : "opacity-35"}`}
                >
                  {live ? (
                    <ArrowRight size={17} aria-hidden="true" />
                  ) : (
                    <CircleDashed size={15} aria-hidden="true" />
                  )}
                </span>
              </span>
            </span>
          );

          return (
            <li key={item.id}>
              {live && item.href ? (
                <Link
                  href={item.href}
                  className="group block rounded-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#031912]"
                >
                  {surface}
                </Link>
              ) : (
                <div aria-disabled="true">{surface}</div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
