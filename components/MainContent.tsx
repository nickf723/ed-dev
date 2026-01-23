"use client";
import { useSidebar } from "./SidebarContext";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div 
      className={`
        min-h-screen transition-all duration-300 ease-in-out
        ${isCollapsed ? "md:pl-20" : "md:pl-72"} 
        pl-0
      `}
    >
      {children}
    </div>
  );
}