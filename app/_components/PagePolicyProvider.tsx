"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { normalizeCurriculumHref } from "@/lib/curriculum/route";
import type { PagePolicy } from "@/lib/page-policy";
import type { PagePolicyRouteSnapshot } from "@/lib/page-policy-snapshot";

const EMPTY_POLICY: Readonly<PagePolicy> = Object.freeze({});
const PagePolicyContext = createContext<Readonly<PagePolicy>>(EMPTY_POLICY);

type PagePolicyProviderProps = {
  children: ReactNode;
  routePolicies: PagePolicyRouteSnapshot;
};

export default function PagePolicyProvider({
  children,
  routePolicies,
}: PagePolicyProviderProps) {
  const pathname = normalizeCurriculumHref(usePathname());
  const policy = routePolicies[pathname] ?? EMPTY_POLICY;

  return (
    <PagePolicyContext.Provider value={policy}>
      {children}
    </PagePolicyContext.Provider>
  );
}

export function usePagePolicy(): Readonly<PagePolicy> {
  return useContext(PagePolicyContext);
}
