"use client";

import { useState } from "react";
import { Clock3, RadioTower, Sparkles } from "lucide-react";

export type LightTravelExample = {
  id: string;
  label: string;
  travelTime: string;
  distance: string;
  note: string;
  accentRgb: string;
};

export default function LightTravelTime({
  examples,
}: {
  examples: LightTravelExample[];
}) {
  const [selectedId, setSelectedId] = useState(examples[0]?.id ?? "");
  const selected =
    examples.find((item) => item.id === selectedId) ?? examples[0];
  if (!selected) return null;

  return (
    <section className="overflow-hidden rounded-[32px] border border-white/[0.10] bg-[#03050e]/[0.52] shadow-[0_32px_110px_rgba(0,0,0,0.30)] backdrop-blur-xl">
      <div className="border-b border-white/[0.08] p-6 sm:p-8">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/[0.70]">
          <Clock3 size={14} /> Distance is also lookback time
        </div>
        <h2 className="mt-3 text-[clamp(2rem,3.4vw,3.4rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">
          Astronomy never sees the universe “right now.”
        </h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-7 text-slate-300/[0.68]">
          Light carries a past state of every distant object. Choose a destination
          to compare the object’s distance with the age of the information arriving
          at the observer.
        </p>
      </div>

      <div className="grid lg:grid-cols-[330px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] bg-black/[0.10] p-4 lg:border-b-0 lg:border-r">
          <div className="space-y-2">
            {examples.map((item) => {
              const active = item.id === selected.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`flex min-h-[74px] w-full items-center justify-between gap-4 rounded-[15px] border px-4 py-3 text-left transition ${
                    active
                      ? "bg-white/[0.055]"
                      : "border-transparent bg-white/[0.012] hover:border-white/[0.08] hover:bg-white/[0.025]"
                  }`}
                  style={{
                    borderColor: active
                      ? `rgba(${item.accentRgb},0.24)`
                      : undefined,
                  }}
                >
                  <span className="min-w-0">
                    <strong className="block text-[14px] text-slate-100">
                      {item.label}
                    </strong>
                    <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                      {item.distance}
                    </span>
                  </span>
                  <span
                    className="shrink-0 text-right font-mono text-[11px] font-semibold"
                    style={{ color: `rgba(${item.accentRgb},0.82)` }}
                  >
                    {item.travelTime}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[390px] overflow-hidden p-5 sm:p-8">
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(circle at 15% 48%,rgba(${selected.accentRgb},0.16),transparent 25%),linear-gradient(90deg,rgba(${selected.accentRgb},0.035),transparent 68%)`,
            }}
          />

          <div className="relative z-10 grid min-h-[275px] items-center gap-7 md:grid-cols-[190px_minmax(220px,1fr)_190px]">
            <div className="text-center">
              <span
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border"
                style={{
                  color: `rgb(${selected.accentRgb})`,
                  borderColor: `rgba(${selected.accentRgb},0.28)`,
                  background: `rgba(${selected.accentRgb},0.045)`,
                  boxShadow: `0 0 64px rgba(${selected.accentRgb},0.16)`,
                }}
              >
                <Sparkles size={29} />
              </span>
              <div className="mt-4 text-[16px] font-semibold text-white">
                {selected.label}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                signal emitted
              </div>
            </div>

            <div className="relative h-28">
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-white/[0.10] via-cyan-200/[0.60] to-white/[0.10]" />
              <div className="absolute inset-x-0 top-[calc(50%_-_22px)] flex justify-between opacity-[0.45]">
                {Array.from({ length: 7 }, (_, index) => (
                  <span
                    key={index}
                    className="h-11 w-px bg-gradient-to-b from-transparent via-cyan-100/[0.45] to-transparent"
                  />
                ))}
              </div>
              <div className="light-travel-photon absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_24px_rgba(165,243,252,0.9)]" />
              <div className="absolute inset-x-0 top-[calc(50%_+_25px)] text-center font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-100/[0.72]">
                {selected.travelTime} in transit
              </div>
            </div>

            <div className="text-center">
              <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-200/[0.20] bg-cyan-300/[0.045] text-cyan-100 shadow-[0_0_48px_rgba(34,211,238,0.10)]">
                <RadioTower size={28} />
              </span>
              <div className="mt-4 text-[16px] font-semibold text-white">
                Observer
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                signal received now
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-3xl rounded-[18px] border border-white/[0.08] bg-black/[0.20] px-5 py-4 text-center">
            <p className="text-[14px] leading-6 text-slate-200/[0.70]">{selected.note}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes light-travel-photon {
          from {
            left: 0%;
          }
          to {
            left: calc(100% - 16px);
          }
        }
        .light-travel-photon {
          animation: light-travel-photon 4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .light-travel-photon {
            animation: none !important;
            left: 50%;
          }
        }
      `}</style>
    </section>
  );
}
