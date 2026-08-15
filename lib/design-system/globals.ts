import source from "@/content/design-system/globals.json";
import { parseGlobalDesignSystem } from "@/lib/design-system/schema";

export const GLOBAL_DESIGN_SYSTEM = parseGlobalDesignSystem(source);
