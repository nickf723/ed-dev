"use client";

import { useState } from "react";
import MainContent from "@/app/_components/MainContent";
import Sidebar from "@/app/_components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
      />
      <MainContent isCollapsed={isSidebarCollapsed}>{children}</MainContent>
    </div>
  );
}
