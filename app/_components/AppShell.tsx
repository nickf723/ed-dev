"use client";

import { usePathname } from "next/navigation";
import { useState, type CSSProperties } from "react";
import MainContent from "@/app/_components/MainContent";
import MasteryDock from "@/app/_components/MasteryDock";
import Sidebar from "@/app/_components/Sidebar";
import { getDomainForPath } from "@/lib/domains";
import type { NavigationSection } from "@/lib/navigation";

type DomainThemeStyle = CSSProperties & {
  "--domain-rgb": string;
  "--domain-accent": string;
};

type AppShellProps = {
  children: React.ReactNode;
  navigationData: NavigationSection[];
};

export default function AppShell({ children, navigationData }: AppShellProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const activeDomain = getDomainForPath(pathname);
  const domainRgb = activeDomain?.theme.rgb ?? "34, 211, 238";
  const themeStyle: DomainThemeStyle = {
    "--domain-rgb": domainRgb,
    "--domain-accent": `rgb(${domainRgb})`,
  };

  return (
    <div
      className="flex min-h-screen"
      data-domain={activeDomain?.id ?? "home"}
      style={themeStyle}
    >
      <Sidebar
        navigationData={navigationData}
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
      />
      <MainContent isCollapsed={isSidebarCollapsed}>{children}</MainContent>
      <MasteryDock />
    </div>
  );
}
