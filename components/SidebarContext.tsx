"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  // Default to false (expanded) for Server-Side Rendering
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Only check localStorage on the client after mount
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
  };

  // We ALWAYS render the Provider.
  // We use 'isMounted' to prevent layout flickering if you want, 
  // but for the context to work, the Provider must exist in the tree.
  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {/* Optional: Add a subtle fade-in or just render children directly */}
      {/* If we strictly need to avoid hydration mismatch on the sidebar width,
          we can render children, but the sidebar might "jump" from open to closed 
          if the user prefers closed. This is a common trade-off. 
          For now, simply rendering children fixes your crash. */}
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
};