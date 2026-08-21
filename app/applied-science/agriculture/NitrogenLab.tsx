"use client";

import { useState } from "react";
import {
  ArrowDown,
  CircleGauge,
  FlaskConical,
  Leaf,
  RotateCcw,
  Sprout,
  Wheat,
} from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import {
  CROP_SYSTEMS,
  calculateNitrogenBudget,
  type CropSystem,
  type CropSystemKey,
  type NitrogenBudget,
} from "./agricultureModel";

const SYSTEM_ICONS = {
  cereal: Wheat,
  "grain-legume": Sprout,
  cover: Leaf,
} as const;

export default function NitrogenLab() {
  const [systemKey, setSystemKey] = useState<CropSystemKey>("grain-legume");
  const [amendment, setAmendment] = useState(24);
  const [lossPressure, setLossPressure] = useState(35);
  const [residueRetention, setResidueRetention] = useState(75);

  const system =
    CROP_SYSTEMS.find((item) => item.key === systemKey) ?? CROP_SYSTEMS[0];
  const values = calculateNitrogenBudget(
    system,
    amendment,
    lossPressure,
    residueRetention
  );

  const reset = () => {
    setSystemKey("grain-legume");
    setAmendment(24);
    setLossPressure(35);
    setResidueRetention(75);
  };

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-lime-100/[0.13]"
      style={{ background: "rgba(15,20,10,0.25)" }}
    >
      <div className="grid border-b border-lime-100/[0.08] lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="p-5 sm:p-6">
          <div className="text-lime-200/62 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em]">
            <FlaskConical size={14} /> Nitrogen pathways studio · normalized
            teaching model
          </div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.047em] text-white">
            Follow nitrogen through soil, plants, fixation, harvest, residues,
            and loss pathways.
          </h3>
          <p className="text-stone-300/68 mt-3 max-w-3xl text-[14px] leading-6">
            This is a bookkeeping model, not a field recommendation. Real
            nitrogen rates and transformations depend on crop, cultivar, soil,
            weather, inoculation, organic matter, timing, fertilizer form,
            irrigation, rotation, yield, and many other conditions.
          </p>
        </div>
        <div className="border-t border-lime-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="flex items-start justify-between gap-3">
            <span>
              <span className="text-amber-200/56 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]">
                Current scenario
              </span>
              <strong className="mt-2 block text-[17px] text-white">
                {system.label}
              </strong>
              <span className="mt-1 block text-[12px] leading-5 text-stone-500">
                {system.subtitle}
              </span>
            </span>
            <button
              type="button"
              onClick={reset}
              className="flex h-9 w-9 items-center justify-center border border-white/[0.08] text-stone-500 transition hover:border-lime-200/25 hover:text-lime-200"
              aria-label="Reset nitrogen model"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div>
          <div className="grid gap-2">
            {CROP_SYSTEMS.map((item) => {
              const Icon = SYSTEM_ICONS[item.key];
              const selected = item.key === systemKey;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSystemKey(item.key)}
                  className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border px-3 py-3 text-left transition"
                  style={{
                    borderColor: selected
                      ? `rgba(${item.rgb},0.34)`
                      : "rgba(255,255,255,0.07)",
                    background: selected
                      ? `rgba(${item.rgb},0.065)`
                      : "rgba(0,0,0,0.055)",
                  }}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center border"
                    style={{
                      color: `rgb(${item.rgb})`,
                      borderColor: `rgba(${item.rgb},0.25)`,
                      background: `rgba(${item.rgb},0.04)`,
                    }}
                  >
                    <Icon size={15} />
                  </span>
                  <span>
                    <strong className="text-white/88 block text-[13px]">
                      {item.label}
                    </strong>
                    <span className="mt-1 block text-[11px] leading-4 text-stone-500">
                      {item.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 space-y-5 border-t border-white/[0.07] pt-5">
            <Control
              label="External N input"
              value={amendment}
              min={0}
              max={60}
              suffix=" units"
              onChange={setAmendment}
            />
            <Control
              label="Loss pressure"
              value={lossPressure}
              min={0}
              max={100}
              suffix="%"
              onChange={setLossPressure}
            />
            <Control
              label="Residue retained"
              value={residueRetention}
              min={0}
              max={100}
              suffix="%"
              onChange={setResidueRetention}
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <FlowDiagram system={system} values={values} />
          <div className="space-y-3">
            <Metric
              label="Mineral N remaining"
              value={values.residualMineral}
              note="current mineral pool after modeled loss exposure and plant uptake"
              rgb="125,211,252"
            />
            <Metric
              label="Plant N acquired"
              value={values.plantN}
              note={`${values.soilUptake.toFixed(0)} from soil + ${values.fixation.toFixed(0)} from illustrative fixation`}
              rgb="134,239,172"
            />
            <Metric
              label="Harvest export"
              value={values.harvestRemoval}
              note="plant N leaving the field in harvested biomass"
              rgb="251,191,36"
            />
            <Metric
              label="Retained residue N"
              value={values.retainedResidue}
              note="organic residue pathway, not immediate mineral N"
              rgb="192,132,252"
            />
            {values.shortfall > 0.5 ? (
              <Metric
                label="Modeled N shortfall"
                value={values.shortfall}
                note="unmet normalized plant demand in this toy scenario"
                rgb="248,113,113"
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid border-t border-lime-100/[0.08] md:grid-cols-3">
        <Boundary title="Legumes are not fertilizer buttons">
          Biological fixation supplies N to the plant system. Whether a legume
          increases soil N for a following crop depends on fixation, harvest
          removal, residue quantity and quality, decomposition, losses, and
          management.
        </Boundary>
        <Boundary title="Residues are delayed pathways">
          Retained plant N enters organic residues. Mineralization and
          immobilization unfold later, so this model intentionally does not dump
          retained residue straight back into the current mineral pool.
        </Boundary>
        <Boundary title="Loss is many processes">
          Leaching, denitrification, volatilization, erosion, runoff, and other
          losses respond differently to soil, water, timing, form, temperature,
          and management. One slider only represents aggregate pressure.
        </Boundary>
      </div>
    </Surface>
  );
}

function FlowDiagram({
  system,
  values,
}: {
  system: CropSystem;
  values: NitrogenBudget;
}) {
  const max = Math.max(100, values.startingMineral + values.fixation);
  const width = (value: number) =>
    `${Math.max(2, Math.min(100, (value / max) * 100))}%`;

  return (
    <div className="relative min-h-[470px] overflow-hidden border border-white/[0.07] bg-black/[0.065] p-4 backdrop-blur-[10px] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-stone-500">
            Normalized N ledger
          </span>
          <strong className="mt-1 block text-[16px] text-white">
            Track pathways, not prescriptions
          </strong>
        </span>
        <CircleGauge size={18} className="text-lime-200/44" />
      </div>

      <FlowNode
        label="Starting soil mineral + external input"
        value={values.startingMineral}
        bar={width(values.startingMineral)}
        rgb="125,211,252"
      />
      <ArrowDown size={14} className="mx-auto my-2 text-stone-600" />
      <div className="grid grid-cols-2 gap-3">
        <FlowNode
          label="Loss pathways"
          value={values.losses}
          bar={width(values.losses)}
          rgb="248,113,113"
          compact
        />
        <FlowNode
          label="Soil-derived plant uptake"
          value={values.soilUptake}
          bar={width(values.soilUptake)}
          rgb="134,239,172"
          compact
        />
      </div>

      {system.fixationPotential > 0 ? (
        <>
          <div className="my-3 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/[0.06]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-lime-200/40">
              separate biological pathway
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <FlowNode
            label="Illustrative biological fixation contribution"
            value={values.fixation}
            bar={width(values.fixation)}
            rgb="74,222,128"
          />
        </>
      ) : null}

      <ArrowDown size={14} className="mx-auto my-2 text-stone-600" />
      <FlowNode
        label="Plant N acquired"
        value={values.plantN}
        bar={width(values.plantN)}
        rgb="190,242,100"
      />
      <ArrowDown size={14} className="mx-auto my-2 text-stone-600" />
      <div className="grid grid-cols-2 gap-3">
        <FlowNode
          label="Harvest export"
          value={values.harvestRemoval}
          bar={width(values.harvestRemoval)}
          rgb="251,191,36"
          compact
        />
        <FlowNode
          label="Retained residue"
          value={values.retainedResidue}
          bar={width(values.retainedResidue)}
          rgb="192,132,252"
          compact
        />
      </div>

      <div className="mt-4 border-l-2 border-lime-200/20 pl-3 text-[12px] leading-5 text-stone-500">
        Mineral N left in soil:{" "}
        <strong className="text-sky-200/72">
          {values.residualMineral.toFixed(0)}
        </strong>{" "}
        units. Residue removed rather than retained:{" "}
        <strong className="text-stone-300/70">
          {values.removedResidue.toFixed(0)}
        </strong>{" "}
        units.
      </div>
    </div>
  );
}

function FlowNode({
  label,
  value,
  bar,
  rgb,
  compact = false,
}: {
  label: string;
  value: number;
  bar: string;
  rgb: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`border border-white/[0.065] bg-black/[0.055] ${compact ? "p-3" : "p-4"}`}
    >
      <div className="flex items-end justify-between gap-3">
        <span className="text-stone-400/72 text-[12px] leading-4">{label}</span>
        <strong
          className="font-mono text-[15px]"
          style={{ color: `rgba(${rgb},0.82)` }}
        >
          {value.toFixed(0)}
        </strong>
      </div>
      <div className="mt-3 h-1.5 bg-white/[0.05]">
        <div
          className="h-full transition-[width] duration-300"
          style={{ width: bar, background: `rgba(${rgb},0.62)` }}
        />
      </div>
    </div>
  );
}

function Control({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3 text-[12px] text-stone-400">
        <span>{label}</span>
        <strong className="text-lime-200/72 font-mono">
          {value}
          {suffix}
        </strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full accent-lime-400"
      />
    </label>
  );
}

function Metric({
  label,
  value,
  note,
  rgb,
}: {
  label: string;
  value: number;
  note: string;
  rgb: string;
}) {
  return (
    <div
      className="border-l-2 bg-black/[0.055] px-3 py-3 backdrop-blur-[8px]"
      style={{ borderColor: `rgba(${rgb},0.42)` }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-stone-400/78 text-[12px]">{label}</span>
        <strong
          className="font-mono text-[18px]"
          style={{ color: `rgba(${rgb},0.82)` }}
        >
          {value.toFixed(0)}
        </strong>
      </div>
      <p className="mt-1 text-[11px] leading-4 text-stone-600">{note}</p>
    </div>
  );
}

function Boundary({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/[0.06] px-4 py-4 md:border-b-0 md:border-r md:last:border-r-0">
      <strong className="text-stone-300/82 block text-[12px]">{title}</strong>
      <p className="mt-2 text-[11px] leading-5 text-stone-500">{children}</p>
    </div>
  );
}
