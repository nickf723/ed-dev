"use client";

import LivingExhibitBackground, {
  type ExhibitEnvironment,
} from "@/app/_page-system/backgrounds/LivingExhibitBackground";
import type { ZoologyEnvironment } from "./zoology-data";

export default function ZoologyBackground({
  accentRgb,
  environment,
}: {
  accentRgb: string;
  environment: ZoologyEnvironment;
}) {
  return (
    <LivingExhibitBackground
      accentRgb={accentRgb}
      environment={environment as ExhibitEnvironment}
    />
  );
}
