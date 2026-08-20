"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import MainContent from "@/app/_components/MainContent";
import MasteryDock from "@/app/_components/MasteryDock";
import PagePolicyProvider from "@/app/_components/PagePolicyProvider";
import Sidebar from "@/app/_components/Sidebar";
import { getDomainForPath } from "@/lib/domains";
import type { NavigationSection } from "@/lib/navigation";
import type { PagePolicyRouteSnapshot } from "@/lib/page-policy-snapshot";

const DEVTOOLS_SESSION_KEY = "educationstation:developer-tools";
const DEVTOOLS_DEFAULT = process.env.NODE_ENV !== "production";

type DomainThemeStyle = CSSProperties & {
  "--domain-rgb": string;
  "--domain-accent": string;
};

type AppShellProps = {
  children: React.ReactNode;
  navigationData: NavigationSection[];
  pagePolicyRoutes: PagePolicyRouteSnapshot;
};

export default function AppShell({
  children,
  navigationData,
  pagePolicyRoutes,
}: AppShellProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [developerToolsEnabled, setDeveloperToolsEnabled] = useState(DEVTOOLS_DEFAULT);
  const activeDomain = getDomainForPath(pathname);
  const domainRgb = activeDomain?.theme.rgb ?? "34, 211, 238";
  const themeStyle: DomainThemeStyle = {
    "--domain-rgb": domainRgb,
    "--domain-accent": `rgb(${domainRgb})`,
  };
  const isKnowledgeStudio = pathname === "/studio" || pathname.startsWith("/studio/");

  useEffect(() => {
    if (DEVTOOLS_DEFAULT) {
      setDeveloperToolsEnabled(true);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const requestedState = params.get("devtools");

    if (requestedState === "1") {
      window.sessionStorage.setItem(DEVTOOLS_SESSION_KEY, "1");
      setDeveloperToolsEnabled(true);
      return;
    }

    if (requestedState === "0") {
      window.sessionStorage.removeItem(DEVTOOLS_SESSION_KEY);
      setDeveloperToolsEnabled(false);
      return;
    }

    setDeveloperToolsEnabled(
      window.sessionStorage.getItem(DEVTOOLS_SESSION_KEY) === "1",
    );
  }, [pathname]);

  if (isKnowledgeStudio) return <>{children}</>;

  return (
    <PagePolicyProvider routePolicies={pagePolicyRoutes}>
      <div
        className="flex min-h-screen"
        data-domain={activeDomain?.id ?? "home"}
        data-developer-tools={developerToolsEnabled ? "true" : "false"}
        data-site-shell
        style={themeStyle}
      >
        <Sidebar
          key={developerToolsEnabled ? "developer-tools" : "learner-shell"}
          navigationData={navigationData}
          developerToolsEnabled={developerToolsEnabled}
          isCollapsed={isSidebarCollapsed}
          onCollapsedChange={setIsSidebarCollapsed}
        />
        <MainContent isCollapsed={isSidebarCollapsed}>{children}</MainContent>
        <MasteryDock />
      </div>
    </PagePolicyProvider>
  );
}
