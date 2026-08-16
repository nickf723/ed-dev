import ZoologyAtlas from "./ZoologyAtlas";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import { GLOBAL_DESIGN_SYSTEM } from "@/lib/design-system/globals";
import {
  paletteById,
  type DesignPaletteRoles,
} from "@/lib/design-system/schema";

const NODE_ID = "natural.biology.zoology";

const FALLBACK_PALETTE: DesignPaletteRoles = {
  primary: "34, 197, 94",
  secondary: "45, 212, 191",
  tertiary: "132, 204, 22",
  quaternary: "56, 189, 248",
  success: "52, 211, 153",
  warning: "250, 204, 21",
  danger: "248, 113, 113",
  background: "3, 10, 7",
  surface: "7, 20, 14",
  text: "240, 253, 244",
  muted: "134, 166, 149",
  border: "52, 211, 153",
};

export default function ZoologyPage() {
  const context = requireCurriculumPageContext(NODE_ID);
  const palette =
    paletteById(GLOBAL_DESIGN_SYSTEM, "biology-growth")?.roles ??
    FALLBACK_PALETTE;

  return (
    <ZoologyAtlas
      palette={palette}
      branches={context.children.map((child: CurriculumNode) => ({
        id: child.id,
        label: child.label,
        href: child.href,
        description: child.description,
        status: child.status ?? "active",
      }))}
    />
  );
}
