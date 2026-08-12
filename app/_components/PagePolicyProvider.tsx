"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { normalizeCurriculumPath } from "@/lib/curriculum/route";
import type { PagePolicy } from "@/lib/page-policy";
import type { PagePolicyRouteSnapshot } from "@/lib/page-policy-snapshot";

const EMPTY_POLICY: Readonly<PagePolicy> = Object.freeze({});

type PagePolicyContextValue = {
  nodeId?: string;
  pageLabel?: string;
  policy: Readonly<PagePolicy>;
};

const EMPTY_CONTEXT: PagePolicyContextValue = {
  policy: EMPTY_POLICY,
};

const PagePolicyContext = createContext<PagePolicyContextValue>(EMPTY_CONTEXT);

type PagePolicyProviderProps = {
  children: ReactNode;
  routePolicies: PagePolicyRouteSnapshot;
};

export default function PagePolicyProvider({
  children,
  routePolicies,
}: PagePolicyProviderProps) {
  const pathname = normalizeCurriculumPath(usePathname());
  const resolved = routePolicies[pathname];
  const value: PagePolicyContextValue = resolved
    ? {
        nodeId: resolved.curriculumNodeId,
        pageLabel: resolved.pageLabel,
        policy: resolved.policy,
      }
    : EMPTY_CONTEXT;

  return (
    <PagePolicyContext.Provider value={value}>
      {children}
    </PagePolicyContext.Provider>
  );
}

export function usePagePolicy(): Readonly<PagePolicy> {
  return useContext(PagePolicyContext).policy;
}

export function usePagePolicyContext(): PagePolicyContextValue {
  return useContext(PagePolicyContext);
}
