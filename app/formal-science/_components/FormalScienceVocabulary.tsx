"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import VocabularyDrawer from "@/app/_components/VocabularyDrawer";
import type { VocabularyScope } from "@/app/_data/vocab/types";
import { usePagePolicy } from "@/app/_components/PagePolicyProvider";

type FormalScienceVocabularyProps = {
  scopes: VocabularyScope[];
  legacyHiddenTriggerPaths?: string[];
};

/**
 * Bridge the legacy Formal Science vocabulary drawer to node-ID page policy.
 *
 * The legacy path list remains available while branches migrate. Explicit page
 * policy wins for migrated routes without making the drawer import curriculum.
 */
export default function FormalScienceVocabulary({
  scopes,
  legacyHiddenTriggerPaths = [],
}: FormalScienceVocabularyProps) {
  const pathname = usePathname();
  const policy = usePagePolicy();
  const hideGlobalTrigger =
    policy.vocabularyTrigger === "local" || policy.vocabularyTrigger === "none";

  const hiddenTriggerPaths = useMemo(
    () =>
      hideGlobalTrigger
        ? [...legacyHiddenTriggerPaths, pathname]
        : legacyHiddenTriggerPaths,
    [hideGlobalTrigger, legacyHiddenTriggerPaths, pathname],
  );

  return (
    <VocabularyDrawer
      scopes={scopes}
      hiddenTriggerPaths={hiddenTriggerPaths}
    />
  );
}
