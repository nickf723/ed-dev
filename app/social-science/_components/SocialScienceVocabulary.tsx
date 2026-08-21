"use client";

import { usePathname } from "next/navigation";
import VocabularyDrawer from "@/app/_components/VocabularyDrawer";
import { usePagePolicy } from "@/app/_components/PagePolicyProvider";
import type { VocabularyScope } from "@/app/_data/vocab/types";

export default function SocialScienceVocabulary({
  scopes,
}: {
  scopes: VocabularyScope[];
}) {
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
