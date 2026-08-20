"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Braces,
  Ear,
  Layers3,
  MessageCircle,
  Mic2,
  Shapes,
  Type,
  Volume2,
  type LucideIcon,
} from "lucide-react";

const LANGUAGE_LAYER_ICONS = {
  braces: Braces,
  ear: Ear,
  message: MessageCircle,
  mic: Mic2,
  shapes: Shapes,
  type: Type,
} satisfies Record<string, LucideIcon>;

export type LanguageLayerIcon = keyof typeof LANGUAGE_LAYER_ICONS;

export type LanguageLayer = {
  id: string;
  label: string;
  unit: string;
  question: string;
  summary: string;
  rgb: string;
  href?: string;
  status?: "active" | "planned";
  icon?: LanguageLayerIcon;
};

export default function LanguageStackTopology({
  layers,
}: {
  layers: LanguageLayer[];
}) {
  const [selectedId, setSelectedId] = useState(layers[0]?.id ?? "");
  const selected =
    layers.find((layer) => layer.id === selectedId) ?? layers[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] shadow-[0_30px_100px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-lime-200/70">
            <Layers3 size={14} /> Compositional stack
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">
            Language builds larger patterns from smaller contrasts.
          </h2>
        </div>
        <p className="text-[14px] leading-6 text-slate-400/72">
          The layers interact rather than forming a one-way pipeline, but each
          introduces a different unit of analysis. Moving upward changes what
          counts as a meaningful pattern.
        </p>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_350px] sm:p-6">
        <div className="space-y-2">
          {layers.map((layer, index) => {
            const Icon = layer.icon
              ? LANGUAGE_LAYER_ICONS[layer.icon]
              : Volume2;
            const active = selected.id === layer.id;
            const width = 54 + ((index + 1) / layers.length) * 46;
            return (
              <div key={layer.id} className="relative flex justify-center pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedId(layer.id)}
                  className="group relative min-h-[98px] rounded-[18px] border px-4 py-3 text-left transition hover:-translate-y-0.5"
                  style={{
                    width: `${width}%`,
                    borderColor: `rgba(${layer.rgb},${active ? 0.32 : 0.12})`,
                    background: `linear-gradient(90deg,rgba(${layer.rgb},${active ? 0.09 : 0.025}),rgba(0,0,0,0.22))`,
                    boxShadow: active
                      ? `0 0 40px rgba(${layer.rgb},0.09)`
                      : undefined,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border"
                      style={{
                        color: `rgb(${layer.rgb})`,
                        borderColor: `rgba(${layer.rgb},0.2)`,
                      }}
                    >
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
                          style={{ color: `rgba(${layer.rgb},0.62)` }}
                        >
                          {layer.unit}
                        </span>
                        <span className="font-mono text-[10px] uppercase text-slate-500/55">
                          {layer.status === "planned" ? "planned" : "open"}
                        </span>
                      </div>
                      <strong className="mt-1 block text-[14px] text-white">
                        {layer.label}
                      </strong>
                      <span className="mt-1 block text-[12px] leading-5 text-slate-400/70">
                        {layer.question}
                      </span>
                    </div>
                  </div>
                </button>
                {index < layers.length - 1 ? (
                  <ArrowDown
                    size={13}
                    className="absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 text-white/[0.16]"
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <aside className="rounded-[22px] border border-white/[0.07] bg-white/[0.014] p-5">
          <div
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em]"
            style={{ color: `rgba(${selected.rgb},0.68)` }}
          >
            {selected.unit}
          </div>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">
            {selected.label}
          </h3>
          <p className="mt-2 text-[15px] font-medium leading-6 text-slate-200/82">
            {selected.question}
          </p>
          <p className="mt-4 text-[14px] leading-6 text-slate-400/72">
            {selected.summary}
          </p>
          <div className="mt-5 rounded-[16px] border border-white/[0.06] bg-black/[0.16] p-4 text-[13px] leading-6 text-slate-400/70">
            Higher layers depend on patterns from lower layers but are not
            reducible to a list of them. Syntax adds hierarchy to words;
            pragmatics adds context and inference to sentence meaning.
          </div>
          {selected.href && selected.status !== "planned" ? (
            <a
              href={selected.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold"
              style={{
                color: `rgb(${selected.rgb})`,
                borderColor: `rgba(${selected.rgb},0.22)`,
              }}
            >
              Open layer <ArrowRight size={14} />
            </a>
          ) : (
            <span className="mt-5 inline-block rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.09em] text-slate-500/70">
              planned layer
            </span>
          )}
        </aside>
      </div>
    </div>
  );
}
