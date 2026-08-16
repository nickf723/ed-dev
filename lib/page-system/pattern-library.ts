import { CHEMISTRY_LINGUISTICS_PATTERNS } from "@/lib/page-system/patterns/chemistry-linguistics";
import { MUSIC_PHILOSOPHY_PATTERNS } from "@/lib/page-system/patterns/music-philosophy";
import { TIME_ECONOMY_SPACE_PATTERNS } from "@/lib/page-system/patterns/time-economy-space";
import type { PagePattern } from "@/lib/page-system/patterns/types";
import { ZOOLOGY_PATTERNS } from "@/lib/page-system/patterns/zoology";

export type { PagePattern, PagePatternKind } from "@/lib/page-system/patterns/types";

/**
 * Reusable page grammars extracted from finished pages.
 *
 * Keep additions in small source modules under `lib/page-system/patterns/`.
 * The registry stays composable as the Foundry produces more page families.
 */
export const PAGE_PATTERN_LIBRARY: PagePattern[] = [
  ...ZOOLOGY_PATTERNS,
  ...TIME_ECONOMY_SPACE_PATTERNS,
  ...MUSIC_PHILOSOPHY_PATTERNS,
  ...CHEMISTRY_LINGUISTICS_PATTERNS,
];
