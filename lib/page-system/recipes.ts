import historySource from "@/content/pages/humanities/history.json";
import physicsSource from "@/content/pages/natural/physics.json";
import { parsePageRecipe } from "@/lib/page-system/schema";

export const HISTORY_PAGE_RECIPE = parsePageRecipe(historySource);
export const PHYSICS_PAGE_RECIPE = parsePageRecipe(physicsSource);
