"use client";

import HistoricalPairMap, {
  type HistoricalPairFocus,
} from "@/app/classroom/_components/lessons/HistoricalPairMap";
import {
  COMPARISON_EMPIRES,
  type EmpireId,
} from "@/app/classroom/_components/lessons/ottoman-mughal-model";

export type EmpireMapFocus = "both" | EmpireId;

const STATES = [
  {
    id: "ottoman",
    name: COMPARISON_EMPIRES.ottoman.name,
    color: COMPARISON_EMPIRES.ottoman.mapColor,
  },
  {
    id: "mughal",
    name: COMPARISON_EMPIRES.mughal.name,
    color: COMPARISON_EMPIRES.mughal.mapColor,
  },
] as const;

export default function EmpireComparisonMap({
  focus,
  onFocus,
}: {
  focus: EmpireMapFocus;
  onFocus: (focus: EmpireMapFocus) => void;
}) {
  return (
    <HistoricalPairMap
      states={STATES}
      focus={focus}
      onFocus={(nextFocus: HistoricalPairFocus) =>
        onFocus(nextFocus as EmpireMapFocus)
      }
      ariaLabel="Interactive comparison map showing reconstructed near-period footprints for the Ottoman and Mughal Empires"
      calloutTitle="Two connected regions"
      calloutNote="Footprint shows location—not equal control in every place"
    />
  );
}
