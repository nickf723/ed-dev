"use client";

import type { ChangeEvent } from "react";
import {
  ArrowLeftRight,
  Atom,
  Boxes,
  Orbit,
  Sparkles,
  Thermometer,
} from "lucide-react";
import {
  PAIRS,
  type BondScene,
  type ElementRecord,
} from "./bonding-model";

export default function BondingControls({
  scene,
  pairId,
  bondOrder,
  domains,
  lonePairs,
  polarity,
  temperature,
  left,
  right,
  deltaEn,
  geometry,
  phaseCue,
  onPair,
  onBondOrder,
  onDomains,
  onLonePairs,
  onPolarity,
  onTemperature,
}: {
  scene: BondScene;
  pairId: string;
  bondOrder: number;
  domains: number;
  lonePairs: number;
  polarity: number;
  temperature: number;
  left: ElementRecord;
  right: ElementRecord;
  deltaEn: number;
  geometry: { name: string; angle: string };
  phaseCue: string;
  onPair: (value: string) => void;
  onBondOrder: (value: number) => void;
  onDomains: (value: number) => void;
  onLonePairs: (value: number) => void;
  onPolarity: (value: number) => void;
  onTemperature: (value: number) => void;
}) {
  return (
    <div className="mt-4">
      <PairSelector value={pairId} onChange={onPair} />
      {scene === "sharing" ? (
        <BondOrderControl value={bondOrder} onChange={onBondOrder} />
      ) : null}
      {scene === "transfer" ? (
        <TransferPanel left={left} right={right} deltaEn={deltaEn} />
      ) : null}
      {scene === "shape" ? (
        <ShapeControls
          domains={domains}
          lonePairs={lonePairs}
          onDomains={onDomains}
          onLonePairs={onLonePairs}
          geometry={geometry}
        />
      ) : null}
      {scene === "forces" ? (
        <ForceControls
          polarity={polarity}
          temperature={temperature}
          onPolarity={onPolarity}
          onTemperature={onTemperature}
          phaseCue={phaseCue}
        />
      ) : null}
    </div>
  );
}

function PairSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
      <span className="flex items-center gap-2 text-[13px] font-medium text-slate-300">
        <Atom size={14} className="text-cyan-200/70" /> Atom pair
      </span>
      <select
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value)
        }
        className="mt-3 h-10 w-full rounded-[10px] border border-white/[0.08] bg-[#071018] px-3 text-[13px] text-white outline-none"
      >
        {PAIRS.map((pair) => (
          <option key={pair.id} value={pair.id}>
            {pair.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function BondOrderControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mt-3 rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-300">
        <Orbit size={14} className="text-violet-200/70" /> Bond order
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((order) => (
          <button
            key={order}
            type="button"
            onClick={() => onChange(order)}
            className={`min-h-[40px] rounded-[10px] border text-[13px] font-semibold transition ${
              value === order
                ? "border-violet-200/[0.34] bg-violet-300/[0.08] text-violet-100"
                : "border-white/[0.07] bg-white/[0.018] text-slate-500 hover:text-white"
            }`}
          >
            {order === 1 ? "single" : order === 2 ? "double" : "triple"}
          </button>
        ))}
      </div>
    </div>
  );
}

function TransferPanel({
  left,
  right,
  deltaEn,
}: {
  left: ElementRecord;
  right: ElementRecord;
  deltaEn: number;
}) {
  const donor = left.en <= right.en ? left : right;
  const receiver = donor === left ? right : left;
  return (
    <div className="mt-3 rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-200/62">
        <ArrowLeftRight size={13} /> Transfer tendency
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
        <IonChip
          element={donor}
          charge={Math.max(1, donor.preferredCharge)}
        />
        <ArrowLeftRight size={15} className="text-amber-200/60" />
        <IonChip
          element={receiver}
          charge={Math.min(-1, receiver.preferredCharge)}
        />
      </div>
      <p className="mt-3 text-[12px] leading-5 text-slate-400/70">
        A ΔEN of {deltaEn.toFixed(2)} makes charge-separated models{" "}
        {deltaEn >= 1.7 ? "especially useful" : "possible but incomplete"}.
      </p>
    </div>
  );
}

function IonChip({
  element,
  charge,
}: {
  element: ElementRecord;
  charge: number;
}) {
  return (
    <div className="rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-3">
      <div
        className="text-[22px] font-semibold"
        style={{ color: `rgb(${element.rgb})` }}
      >
        {element.symbol}
        <sup className="text-[11px]">
          {charge > 0 ? `+${charge}` : charge}
        </sup>
      </div>
      <div className="mt-1 text-[11px] text-slate-500">{element.name}</div>
    </div>
  );
}

function ShapeControls({
  domains,
  lonePairs,
  onDomains,
  onLonePairs,
  geometry,
}: {
  domains: number;
  lonePairs: number;
  onDomains: (value: number) => void;
  onLonePairs: (value: number) => void;
  geometry: { name: string; angle: string };
}) {
  return (
    <div className="mt-3 space-y-3">
      <NumberButtons
        icon={Boxes}
        label="Electron domains"
        value={domains}
        values={[2, 3, 4, 5, 6]}
        onChange={onDomains}
      />
      <NumberButtons
        icon={Orbit}
        label="Lone pairs"
        value={lonePairs}
        values={Array.from(
          { length: Math.min(4, domains) },
          (_, index) => index,
        )}
        onChange={onLonePairs}
      />
      <div className="rounded-[13px] border border-violet-200/[0.12] bg-violet-300/[0.035] p-3">
        <div className="text-[15px] font-semibold text-white">
          {geometry.name}
        </div>
        <div className="mt-1 font-mono text-[11px] text-violet-200/68">
          idealized angle: {geometry.angle}
        </div>
      </div>
    </div>
  );
}

function NumberButtons({
  icon: Icon,
  label,
  value,
  values,
  onChange,
}: {
  icon: typeof Boxes;
  label: string;
  value: number;
  values: number[];
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-300">
        <Icon size={14} className="text-violet-200/70" /> {label}
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {values.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-[38px] rounded-[9px] border text-[13px] font-semibold transition ${
              value === option
                ? "border-violet-200/[0.34] bg-violet-300/[0.08] text-white"
                : "border-white/[0.07] bg-white/[0.018] text-slate-500 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ForceControls({
  polarity,
  temperature,
  onPolarity,
  onTemperature,
  phaseCue,
}: {
  polarity: number;
  temperature: number;
  onPolarity: (value: number) => void;
  onTemperature: (value: number) => void;
  phaseCue: string;
}) {
  return (
    <div className="mt-3 space-y-3">
      <RangeControl
        icon={Sparkles}
        label="Molecular polarity"
        value={polarity}
        suffix="%"
        onChange={onPolarity}
      />
      <RangeControl
        icon={Thermometer}
        label="Thermal agitation"
        value={temperature}
        suffix="%"
        onChange={onTemperature}
      />
      <div className="rounded-[13px] border border-pink-200/[0.12] bg-pink-300/[0.035] p-3 text-[12px] leading-5 text-slate-300/70">
        Association cue:{" "}
        <strong className="text-pink-100">{phaseCue}</strong>
      </div>
    </div>
  );
}

function RangeControl({
  icon: Icon,
  label,
  value,
  suffix,
  onChange,
}: {
  icon: typeof Sparkles;
  label: string;
  value: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
      <span className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[13px] font-medium text-slate-300">
          <Icon size={14} className="text-pink-200/70" /> {label}
        </span>
        <strong className="font-mono text-[13px] text-white">
          {value}
          {suffix}
        </strong>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(Number(event.target.value))
        }
        className="mt-3 w-full accent-pink-400"
      />
    </label>
  );
}
