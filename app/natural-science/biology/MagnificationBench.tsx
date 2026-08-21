"use client";

import { useState } from "react";
import { Microscope, Ruler } from "lucide-react";
import {
  MAGNIFICATION_SPECIMENS,
  formatBiologyInteger,
  magnificationForSpecimen,
  type MagnificationSpecimen,
  type MagnificationSpecimenKey,
} from "./biologyModel";

export default function MagnificationBench() {
  const [selectedKey, setSelectedKey] =
    useState<MagnificationSpecimenKey>("onion");
  const specimen =
    MAGNIFICATION_SPECIMENS.find((item) => item.key === selectedKey) ??
    MAGNIFICATION_SPECIMENS[0];
  const magnification = magnificationForSpecimen(specimen);
  const imageMicrometers = specimen.imageMillimeters * 1000;

  return (
    <section className="overflow-hidden rounded-[28px] border border-cyan-100/[0.12] bg-[#03110b]/65 backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/65">
            <Microscope size={14} aria-hidden="true" /> Magnification bench ·
            same quantity, same units
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(2rem,3.8vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            An enlarged image is evidence only when its scale travels with it.
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/75">
            Select a fixed teaching specimen. The bench converts the image and
            actual length to micrometers before dividing. Magnification is a
            ratio, so the units cancel.
          </p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.05] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-500">
            Current specimen
          </span>
          <strong
            className="mt-2 block text-[18px]"
            style={{ color: `rgb(${specimen.rgb})` }}
          >
            {specimen.label}
          </strong>
          <span className="mt-1 block text-[12px] text-stone-500">
            {specimen.context}
          </span>
        </div>
      </div>

      <div className="grid xl:grid-cols-[270px_minmax(0,1fr)_330px]">
        <div className="border-b border-white/[0.07] p-4 xl:border-b-0 xl:border-r">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500">
            Specimen tray
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {MAGNIFICATION_SPECIMENS.map((item) => {
              const active = item.key === specimen.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedKey(item.key)}
                  className="grid min-h-[68px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 border px-3 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
                  style={{
                    borderColor: active
                      ? `rgba(${item.rgb},0.34)`
                      : "rgba(255,255,255,0.06)",
                    background: active
                      ? `rgba(${item.rgb},0.055)`
                      : "rgba(0,0,0,0.03)",
                  }}
                >
                  <SpecimenGlyph specimen={item} compact />
                  <span>
                    <strong className="block text-[13px] text-white/85">
                      {item.label}
                    </strong>
                    <span className="mt-1 block font-mono text-[11px] text-stone-500">
                      {item.actualMicrometers} µm actual
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-[360px] items-center justify-center overflow-hidden border-b border-white/[0.07] p-6 xl:border-b-0 xl:border-r">
          <div className="relative flex h-[300px] w-full max-w-[520px] items-center justify-center border border-white/[0.07] bg-black/[0.08]">
            <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
            <SpecimenGlyph specimen={specimen} />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-stone-500">
                schematic image · not a micrograph
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px] text-cyan-100/70">
                <span className="h-px w-20 bg-cyan-100/60" />
                {specimen.imageMillimeters} mm image
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 xl:sticky xl:top-[172px] xl:self-start">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500">
            <Ruler size={13} aria-hidden="true" /> Scale ledger
          </div>
          <LedgerLine
            label="Image length"
            value={`${specimen.imageMillimeters} mm`}
          />
          <LedgerLine
            label="Convert image"
            value={`${formatBiologyInteger(imageMicrometers)} µm`}
          />
          <LedgerLine
            label="Actual length"
            value={`${specimen.actualMicrometers} µm`}
          />
          <div className="mt-5 border-t border-white/[0.08] pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-stone-500">
              image ÷ actual
            </span>
            <div className="mt-2 font-mono text-[18px] text-stone-300">
              {formatBiologyInteger(imageMicrometers)} µm ÷{" "}
              {specimen.actualMicrometers} µm
            </div>
            <strong
              className="mt-3 block text-[clamp(2.8rem,5vw,4.8rem)] leading-none tracking-[-0.06em]"
              style={{ color: `rgb(${specimen.rgb})` }}
            >
              {formatBiologyInteger(magnification)}×
            </strong>
          </div>
          <p className="mt-5 border-l border-cyan-200/25 pl-3 text-[12px] leading-5 text-stone-500">
            This gives image magnification, not microscope resolving power,
            image quality, or the specimen&apos;s taxonomic identity.
          </p>
        </div>
      </div>
    </section>
  );
}

function SpecimenGlyph({
  specimen,
  compact = false,
}: {
  specimen: MagnificationSpecimen;
  compact?: boolean;
}) {
  const size = compact ? 26 : 142;
  const common = {
    width: size,
    height: compact ? 26 : specimen.shape === "rod" ? 72 : size,
    borderColor: `rgba(${specimen.rgb},0.72)`,
    background: `rgba(${specimen.rgb},0.11)`,
    boxShadow: compact ? "none" : `0 0 50px rgba(${specimen.rgb},0.12)`,
  };

  if (specimen.shape === "brick") {
    return (
      <span
        aria-hidden="true"
        className="block rounded-[18%] border-2"
        style={{ ...common, width: compact ? 30 : 190 }}
      />
    );
  }
  if (specimen.shape === "rod") {
    return (
      <span
        aria-hidden="true"
        className="block rounded-full border-2"
        style={{ ...common, width: compact ? 30 : 210 }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`block rounded-full border-2 ${specimen.shape === "spiked" ? "outline-dashed outline-2 outline-offset-8" : ""}`}
      style={{ ...common, outlineColor: `rgba(${specimen.rgb},0.45)` }}
    />
  );
}

function LedgerLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3 flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
      <span className="text-[12px] text-stone-500">{label}</span>
      <strong className="font-mono text-[13px] text-stone-300">{value}</strong>
    </div>
  );
}
