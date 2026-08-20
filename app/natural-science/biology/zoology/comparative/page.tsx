import ComparativeLab from "./ComparativeLab";
import { GLOBAL_DESIGN_SYSTEM } from "@/lib/design-system/globals";
import { paletteById, type DesignPaletteRoles } from "@/lib/design-system/schema";

const FALLBACK: DesignPaletteRoles = {
  primary: "34, 197, 94",
  secondary: "45, 212, 191",
  tertiary: "132, 204, 22",
  quaternary: "56, 189, 248",
  success: "52, 211, 153",
  warning: "250, 204, 21",
  danger: "248, 113, 113",
  background: "3, 10, 7",
  surface: "6, 22, 15",
  text: "240, 253, 244",
  muted: "134, 166, 149",
  border: "34, 197, 94",
};

export default function ComparativeZoologyPage() {
  const palette = paletteById(GLOBAL_DESIGN_SYSTEM, "biology-growth")?.roles ?? FALLBACK;
  return <ComparativeLab palette={palette} />;
}
