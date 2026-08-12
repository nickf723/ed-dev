"use client";

import { usePathname } from "next/navigation";
import VocabularyDrawer from "@/app/_components/VocabularyDrawer";
import type { VocabularyScope } from "@/app/_data/vocab/types";
import { usePagePolicy } from "@/app/_components/PagePolicyProvider";
import { normalizeCurriculumHref } from "@/lib/curriculum/route";

type FormalScienceVocabularyProps = {
  scopes: VocabularyScope[];
  legacyHiddenTriggerPaths?: string[];
};

/**
 * Bridge the legacy Formal Science vocabulary drawer to node-ID page policy.
 *
 * The legacy path list remains available while non-curriculum/domain routes
 * migrate. Explicit page policy wins for migrated curriculum routes without
 * making the drawer import curriculum.
 */
export default function FormalScienceVocabulary({
  scopes,
  legacyHiddenTriggerPaths = [],
}: FormalScienceVocabularyProps) {
  const pathname = usePathname();
  const normalizedPathname = normalizeCurriculumHref(pathname);
  const policy = usePagePolicy();
  const hiddenByPolicy =
    policy.vocabularyTrigger === "local" || policy.vocabularyTrigger === "none";
  const hiddenByLegacyPath = legacyHiddenTriggerPaths.some(
    (path) => normalizeCurriculumHref(path) === normalizedPathname,
  );
  const hideGlobalTrigger = hiddenByPolicy || hiddenByLegacyPath;

  return (
    <VocabularyDrawer
      scopes={scopes}
      hiddenTriggerPaths={hideGlobalTrigger ? [pathname] : []}
    />
  );
}
