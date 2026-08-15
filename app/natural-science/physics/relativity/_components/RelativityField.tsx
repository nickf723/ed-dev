"use client";

import LensingBackground from "../LensingBackground";

export type RelativityFieldMode = "overview" | "special" | "general";

type Props = { mode?: RelativityFieldMode };

export default function RelativityField({ mode = "overview" }: Props) {
  const generalVisible = mode === "overview" || mode === "general";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(245,158,11,0.12),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(99,102,241,0.14),transparent_32%),linear-gradient(180deg,#020207,#03030a_50%,#000_100%)]" />

      {generalVisible ? <div className="absolute inset-0 opacity-95"><LensingBackground /></div> : null}

      {(mode === "overview" || mode === "special") ? (
        <>
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(251,191,36,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)", backgroundSize: "68px 68px", transform: "perspective(900px) rotateX(64deg) scale(1.5) translateY(8%)", transformOrigin: "center bottom" }} />
          <div className="absolute left-1/2 top-[12%] h-[74%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-amber-300/35 to-transparent" />
          <div className="absolute left-[18%] right-[18%] top-1/2 h-px bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent" />
          <div className="absolute left-1/2 top-[18%] h-[64%] w-[42%] -translate-x-1/2 rotate-45 border-l border-t border-amber-200/[0.13]" />
          <div className="absolute left-1/2 top-[18%] h-[64%] w-[42%] -translate-x-1/2 -rotate-45 border-r border-t border-indigo-200/[0.13]" />
        </>
      ) : null}

      {mode === "general" ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_36%,rgba(245,158,11,0.04)_52%,transparent_70%)]" />
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_54%,rgba(0,0,0,0.40)_100%)]" />
    </div>
  );
}
