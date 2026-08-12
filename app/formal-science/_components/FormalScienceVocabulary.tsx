"use client";

import { usePathname } from "next/navigation";
import VocabularyDrawer from "@/app/_components/VocabularyDrawer";
import type { VocabularyScope } from "@/app/_data/vocab/types";
import { usePagePolicy } from "@/app/_components/PagePolicyProvider";

type FormalScienceVocabularyProps = {
  scopes: VocabularyScope[];
};

/**
 * Global Formal Science vocabulary utility driven by resolved page policy.
 * Curriculum and domain policy are resolved on the server; this client bridge
 * only decides whether the default floating trigger belongs on the current page.
 */
export default function FormalScienceVocabulary({
  scopes,
}: FormalScienceVocabularyProps) {
  const pathname = usePathname();
  const policy = usePagePolicy();
  const hideGlobalTrigger =
    policy.vocabularyTrigger === "local" || policy.vocabularyTrigger === "none";

  return (
    <VocabularyDrawer
      scopes={scopes}
      hiddenTriggerPaths={hideGlobalTrigger ? [pathname] : []}
    />
  );
}
