"use client";

import HistoricalPairMap, {
  type HistoricalPairFocus,
} from "@/app/classroom/_components/lessons/HistoricalPairMap";
import {
  CENTRALIZATION_CASES,
  type CentralizationCaseId,
} from "@/app/classroom/_components/lessons/tokugawa-bourbon-model";

export type TokugawaBourbonMapFocus = "both" | CentralizationCaseId;

const STATES = [
  {
    id: "tokugawa",
    name: CENTRALIZATION_CASES.tokugawa.name,
    color: CENTRALIZATION_CASES.tokugawa.mapColor,
  },
  {
    id: "bourbon",
    name: CENTRALIZATION_CASES.bourbon.name,
    color: CENTRALIZATION_CASES.bourbon.mapColor,
  },
] as const;

export default function TokugawaBourbonMap({
  focus,
  onFocus,
}: {
  focus: TokugawaBourbonMapFocus;
  onFocus: (focus: TokugawaBourbonMapFocus) => void;
}) {
  return (
    <HistoricalPairMap
      states={STATES}
      focus={focus}
      onFocus={(nextFocus: HistoricalPairFocus) =>
        onFocus(nextFocus as TokugawaBourbonMapFocus)
      }
      ariaLabel="Interactive map showing reconstructed near-period footprints for Tokugawa Japan and Bourbon France"
      calloutTitle="Far apart · one comparison"
      calloutNote="Use the map to locate each case; use institutions to explain power"
    />
  );
}
