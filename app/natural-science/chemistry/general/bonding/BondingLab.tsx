"use client";

import { useEffect, useMemo, useState } from "react";
import { Gauge, Network, Sparkles } from "lucide-react";
import { Surface, useWorldDirector } from "@/app/_page-system/scene";
import BondingCanvas from "./BondingCanvas";
import BondingControls from "./BondingControls";
import {
  ELEMENTS,
  PAIRS,
  clamp,
  classifyBond,
  geometryName,
  interpretation,
  resolveScene,
  sceneMetric,
  scenePrediction,
  sceneTitle,
  type CanvasDetail,
} from "./bonding-model";

export default function BondingLab() {
  const director = useWorldDirector();
  const scene = resolveScene(director.scene);
  const [pairId, setPairId] = useState("co");
  const [bondOrder, setBondOrder] = useState(1);
  const [domains, setDomains] = useState(4);
  const [lonePairs, setLonePairs] = useState(2);
  const [polarity, setPolarity] = useState(62);
  const [temperature, setTemperature] = useState(36);

  const pair = PAIRS.find((item) => item.id === pairId) ?? PAIRS[1];
  const left = ELEMENTS[pair.left];
  const right = ELEMENTS[pair.right];
  const deltaEn = Math.abs(right.en - left.en);
  const bondCharacter = classifyBond(deltaEn);
  const geometry = geometryName(
    domains,
    Math.min(lonePairs, Math.max(0, domains - 1)),
  );
  const cohesion = Math.round(
    clamp(polarity * 0.72 + (100 - temperature) * 0.28, 0, 100),
  );
  const phaseCue =
    cohesion > 70
      ? "strongly associated"
      : cohesion > 43
        ? "mobile liquid-like network"
        : "weakly associated / gas-favored";
  const detail: CanvasDetail = useMemo(
    () => ({
      left,
      right,
      deltaEn,
      bondOrder,
      domains,
      lonePairs,
      polarity,
      temperature,
      scene,
    }),
    [
      bondOrder,
      deltaEn,
      domains,
      left,
      lonePairs,
      polarity,
      right,
      scene,
      temperature,
    ],
  );

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("bonding-world:update", {
        detail: {
          deltaEn,
          bondOrder,
          domains,
          lonePairs,
          polarity,
          temperature,
          leftRgb: left.rgb,
          rightRgb: right.rgb,
        },
      }),
    );
  }, [
    bondOrder,
    deltaEn,
    domains,
    left.rgb,
    lonePairs,
    polarity,
    right.rgb,
    temperature,
  ]);

  return (
    <div className="grid h-full gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Surface variant="ghost" className="overflow-hidden rounded-[24px]">
        <div className="flex flex-col gap-2 border-b border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/68">
              <Network size={14} /> Bonding model
            </div>
            <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.035em] text-white">
              {sceneTitle(scene)}
            </h3>
          </div>
          <span className="rounded-full border border-white/[0.08] bg-black/[0.20] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-300/66">
            {pair.label} · ΔEN {deltaEn.toFixed(2)}
          </span>
        </div>

        <BondingCanvas detail={detail} />

        <div className="grid gap-2 p-3 sm:grid-cols-3">
          <Readout
            label="Bond character"
            value={bondCharacter.label}
            rgb={bondCharacter.rgb}
          />
          <Readout
            label={scene === "shape" ? "Geometry" : "Shared model"}
            value={
              scene === "shape" ? geometry.name : sceneMetric(scene, detail)
            }
            rgb="34,211,238"
          />
          <Readout
            label={scene === "forces" ? "Cohesion" : "Prediction"}
            value={
              scene === "forces"
                ? `${cohesion}%`
                : scenePrediction(scene, detail)
            }
            rgb="192,132,252"
          />
        </div>
      </Surface>

      <Surface variant="glass" className="rounded-[24px] p-4">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/68">
          <Gauge size={14} /> Model controls
        </div>
        <p className="mt-2 text-[12px] leading-5 text-slate-400/70">
          Keep the selector, response, and interpretation together. Each scene
          asks a different structural question.
        </p>

        <BondingControls
          scene={scene}
          pairId={pairId}
          bondOrder={bondOrder}
          domains={domains}
          lonePairs={lonePairs}
          polarity={polarity}
          temperature={temperature}
          left={left}
          right={right}
          deltaEn={deltaEn}
          geometry={geometry}
          phaseCue={phaseCue}
          onPair={setPairId}
          onBondOrder={setBondOrder}
          onDomains={(value) => {
            setDomains(value);
            setLonePairs((current) =>
              Math.min(current, Math.max(0, value - 1)),
            );
          }}
          onLonePairs={setLonePairs}
          onPolarity={setPolarity}
          onTemperature={setTemperature}
        />

        <div className="mt-4 rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-200/62">
            <Sparkles size={13} /> Interpretation
          </div>
          <p className="mt-2 text-[13px] leading-5 text-slate-300/72">
            {interpretation(scene, detail, geometry.name, phaseCue)}
          </p>
        </div>
      </Surface>
    </div>
  );
}

function Readout({
  label,
  value,
  rgb,
}: {
  label: string;
  value: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[13px] border border-white/[0.08] bg-black/[0.16] p-3">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
        {label}
      </div>
      <div
        className="mt-1.5 text-[14px] font-semibold"
        style={{ color: `rgb(${rgb})` }}
      >
        {value}
      </div>
    </div>
  );
}
