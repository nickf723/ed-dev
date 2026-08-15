"use client";

import HeatBackground from "../HeatBackground";

export type ThermoFieldMode =
  | "overview"
  | "equilibrium"
  | "transfer"
  | "first-law"
  | "phase"
  | "entropy"
  | "process";

type Props = {
  mode?: ThermoFieldMode;
  intensity?: number;
  energyLevel?: number;
};

const MODE_TEMPERATURE: Record<ThermoFieldMode, number> = {
  overview: 0.4,
  equilibrium: 0.4,
  transfer: 0.56,
  "first-law": 0.5,
  phase: 0.24,
  entropy: 0.62,
  process: 0.48,
};

/**
 * Shared Thermodynamics background adapter.
 *
 * The visual engine is intentionally the original HeatBackground from the
 * first Thermodynamics overhaul. Newer lesson pages can keep using the shared
 * ThermoField API without replacing the distinctive canvas behavior that gave
 * the branch its original identity.
 */
export default function ThermoField({
  mode = "overview",
  energyLevel,
}: Props) {
  const temperature = clamp01(
    energyLevel ?? MODE_TEMPERATURE[mode],
  );

  return <HeatBackground temperature={temperature} />;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}
