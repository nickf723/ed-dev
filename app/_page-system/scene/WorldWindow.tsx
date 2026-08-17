"use client";

import type { ReactNode } from "react";
import { Compass, ScanSearch } from "lucide-react";
import Surface from "./Surface";
import { useWorldDirector } from "./WorldDirector";

export type WorldSceneOption = {
  id: string;
  label: string;
  description: string;
  accentRgb: string;
};

export type WorldWindowDensity = "roomy" | "compact";

export default function WorldWindow({
  eyebrow,
  title,
  description,
  scenes,
  children,
  activeScene,
  onSceneChange,
  density = "roomy",
  className = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  scenes: WorldSceneOption[];
  children: ReactNode;
  activeScene?: string;
  onSceneChange?: (scene: string) => void;
  density?: WorldWindowDensity;
  className?: string;
}) {
  const director = useWorldDirector();
  const selectedScene =
    director.previewScene ?? activeScene ?? director.scene ?? "";
  const selectedOption =
    scenes.find((scene) => scene.id === selectedScene) ?? scenes[0];

  function chooseScene(scene: string) {
    if (onSceneChange) onSceneChange(scene);
    else director.pinScene(director.pinnedScene === scene ? null : scene);
  }

  if (density === "compact") {
    return (
      <section
        className={`relative isolate overflow-hidden rounded-[34px] border border-white/[0.13] bg-black/[0.08] shadow-[0_36px_130px_rgba(0,0,0,0.28)] ${className}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(2,4,12,0.42),transparent_40%,transparent_72%,rgba(2,4,12,0.52))]" />
        <div className="relative z-20 grid gap-4 p-4 lg:grid-cols-[minmax(290px,360px)_minmax(0,1fr)] lg:items-stretch sm:p-5">
          <div className="flex min-w-0 flex-col gap-3">
            <Surface variant="ghost" className="rounded-[24px] p-5">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-white/[0.64]">
                <ScanSearch size={14} /> {eyebrow}
              </div>
              <h2 className="mt-3 text-[clamp(1.8rem,3vw,3.15rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">
                {title}
              </h2>
              <p className="mt-3 text-[14px] leading-6 text-slate-200/[0.70]">
                {description}
              </p>
            </Surface>

            <Surface variant="ghost" className="flex-1 rounded-[24px] p-4">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/[0.58]">
                <Compass size={14} /> Direct the world
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {scenes.map((scene) => {
                  const active = selectedScene === scene.id;
                  const pinned =
                    director.pinnedScene === scene.id && !onSceneChange;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => chooseScene(scene.id)}
                      onMouseEnter={() => director.previewSceneById(scene.id)}
                      onMouseLeave={() => director.previewSceneById(null)}
                      onFocus={() => director.previewSceneById(scene.id)}
                      onBlur={() => director.previewSceneById(null)}
                      className={`min-h-[48px] rounded-[13px] border px-3 py-2 text-left transition ${
                        active
                          ? "bg-black/[0.32]"
                          : "border-white/[0.07] bg-black/[0.12] hover:bg-black/[0.22]"
                      }`}
                      style={{
                        borderColor: active
                          ? `rgba(${scene.accentRgb},0.34)`
                          : undefined,
                        boxShadow: active
                          ? `inset 3px 0 0 rgba(${scene.accentRgb},0.82)`
                          : undefined,
                      }}
                    >
                      <strong className="block text-[13px] leading-5 text-white/[0.88]">
                        {scene.label}
                      </strong>
                      <span
                        className="mt-1 block font-mono text-[11px] font-semibold uppercase tracking-[0.07em]"
                        style={{ color: `rgba(${scene.accentRgb},0.74)` }}
                      >
                        {pinned ? "locked" : active ? "focused" : "view"}
                      </span>
                    </button>
                  );
                })}
              </div>
              {selectedOption ? (
                <p className="mt-3 rounded-[13px] border border-white/[0.07] bg-black/[0.16] p-3 text-[12px] leading-5 text-slate-300/[0.66]">
                  {selectedOption.description}
                </p>
              ) : null}
            </Surface>
          </div>

          <div className="relative min-h-[520px] min-w-0">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative isolate overflow-hidden rounded-[38px] border border-white/[0.13] bg-black/[0.08] shadow-[0_42px_150px_rgba(0,0,0,0.30)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,12,0.30),transparent_24%,transparent_70%,rgba(2,4,12,0.55))]" />
      <div className="relative z-20 grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Surface
          variant="ghost"
          className="max-w-4xl rounded-[26px] p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-white/[0.64]">
            <ScanSearch size={14} /> {eyebrow}
          </div>
          <h2 className="mt-3 text-[clamp(2rem,4.4vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-200/[0.72]">
            {description}
          </p>
        </Surface>

        <Surface
          variant="ghost"
          className="rounded-[26px] p-4 sm:p-5"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/[0.58]">
            <Compass size={14} /> Direct the world
          </div>
          <p className="mt-2 text-[13px] leading-6 text-slate-300/[0.62]">
            {onSceneChange
              ? "Choose the biological or physical view that should organize the page."
              : "Choose a scene to hold the observatory focus in place. Select it again to return control to scrolling."}
          </p>
          <div className="mt-4 grid gap-2">
            {scenes.map((scene) => {
              const active = selectedScene === scene.id;
              const pinned =
                director.pinnedScene === scene.id && !onSceneChange;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => chooseScene(scene.id)}
                  onMouseEnter={() => director.previewSceneById(scene.id)}
                  onMouseLeave={() => director.previewSceneById(null)}
                  onFocus={() => director.previewSceneById(scene.id)}
                  onBlur={() => director.previewSceneById(null)}
                  className={`group min-h-[58px] rounded-[15px] border px-4 py-3 text-left transition ${
                    active
                      ? "bg-black/[0.30]"
                      : "border-white/[0.07] bg-black/[0.12] hover:bg-black/[0.22]"
                  }`}
                  style={{
                    borderColor: active
                      ? `rgba(${scene.accentRgb},0.34)`
                      : undefined,
                    boxShadow: active
                      ? `inset 3px 0 0 rgba(${scene.accentRgb},0.82)`
                      : undefined,
                  }}
                >
                  <span className="flex items-center justify-between gap-3">
                    <strong className="text-[14px] text-white/[0.88]">
                      {scene.label}
                    </strong>
                    <span
                      className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
                      style={{ color: `rgba(${scene.accentRgb},0.78)` }}
                    >
                      {pinned ? "locked" : active ? "focused" : "view"}
                    </span>
                  </span>
                  <span className="mt-1 block text-[12px] leading-5 text-slate-400/[0.72]">
                    {scene.description}
                  </span>
                </button>
              );
            })}
          </div>
        </Surface>
      </div>

      <div className="relative z-10 min-h-[500px] px-3 pb-3 sm:px-5 sm:pb-5">
        {children}
      </div>
    </section>
  );
}
