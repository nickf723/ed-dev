"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  LayoutGrid,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Scan,
  X,
} from "lucide-react";
import { DOMAIN_BY_ID, getDomainForPath, type DomainId } from "@/lib/domains";
import type { NavigationItem, NavigationSection } from "@/lib/navigation";

const XRayConsole = dynamic(() => import("@/app/_components/XRayConsole"), {
  ssr: false,
});

type SidebarProps = {
  navigationData: NavigationSection[];
  developerToolsEnabled: boolean;
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
};

type SidebarDomain = DomainId | "meta" | "home";

const subscribeToHydration = () => () => undefined;
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

function domainRgb(domain: SidebarDomain): string {
  if (domain === "meta") return "148, 163, 184";
  if (domain === "home") return "34, 211, 238";
  return DOMAIN_BY_ID[domain]?.theme.rgb ?? "148, 163, 184";
}

export default function Sidebar({
  navigationData,
  developerToolsEnabled,
  isCollapsed,
  onCollapsedChange,
}: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [structureScanOpen, setStructureScanOpen] = useState(false);
  const activeDomain = getDomainForPath(pathname);
  const isMeta = pathname.startsWith("/glossary") || pathname.startsWith("/stage") || pathname.startsWith("/skeleton");
  const shellDomain: SidebarDomain = activeDomain?.id ?? (isMeta ? "meta" : "home");
  const shellRgb = domainRgb(shellDomain);

  const showStructureScan = developerToolsEnabled && structureScanOpen;

  const toggleMobile = () => {
    if (!isMobileOpen && isCollapsed) onCollapsedChange(false);
    setIsMobileOpen((current) => !current);
  };

  const toggleStructureScan = () => {
    if (!developerToolsEnabled) return;
    if (isCollapsed) {
      onCollapsedChange(false);
      setStructureScanOpen(true);
      return;
    }
    setStructureScanOpen((current) => !current);
  };

  const handleNavigate = () => setIsMobileOpen(false);

  return (
    <>
      <button
        onClick={toggleMobile}
        className="fixed left-4 top-4 z-50 rounded-xl border border-white/10 bg-[#07090d]/90 p-2.5 text-white shadow-xl backdrop-blur-xl md:hidden"
        type="button"
        aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
      >
        {isMobileOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      {isMobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/[0.07] bg-[#05070a]/95 shadow-[18px_0_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-[width,transform] duration-300 ease-out md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "md:w-20" : "md:w-72"}`}
      >
        <header className="relative h-20 shrink-0 border-b border-white/[0.06]">
          <Link
            href="/"
            className={`flex h-full items-center gap-3 px-5 transition-colors hover:bg-white/[0.025] ${isCollapsed ? "md:justify-center md:px-0" : ""}`}
            aria-label="Education Station 64 home"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300"
              style={{
                color: `rgb(${shellRgb})`,
                borderColor: `rgba(${shellRgb},0.34)`,
                background: `rgba(${shellRgb},0.045)`,
                boxShadow: `inset 0 0 0 1px rgba(${shellRgb},0.04)`,
              }}
            >
              <LayoutGrid size={18} />
            </span>

            <span className={`min-w-0 ${isCollapsed ? "md:hidden" : ""}`}>
              <strong className="block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Education</strong>
              <span className="mt-0.5 block text-sm font-semibold tracking-[0.08em] text-slate-100">STATION 64</span>
            </span>
          </Link>

          <button
            onClick={() => onCollapsedChange(!isCollapsed)}
            className={`absolute hidden h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/60 text-slate-500 transition-all hover:border-white/20 hover:text-white md:flex ${
              isCollapsed ? "bottom-1.5 right-1.5" : "right-3 top-1/2 -translate-y-1/2"
            }`}
            type="button"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={13} /> : <PanelLeftClose size={13} />}
          </button>
        </header>

        <nav
          className={`flex-1 overflow-y-auto py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isCollapsed ? "md:px-2" : "px-3"
          }`}
        >
          <div className="space-y-7">
            {navigationData.map((section) => (
              <section key={section.title}>
                <h2 className={`mb-2 px-3 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-700 ${isCollapsed ? "md:hidden" : ""}`}>
                  {section.title}
                </h2>

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavItem
                      key={item.href}
                      item={item}
                      currentPath={pathname}
                      isCollapsed={isCollapsed}
                      onNavigate={handleNavigate}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </nav>

        {developerToolsEnabled ? (
          <footer className={`shrink-0 border-t border-white/[0.06] bg-black/15 p-2.5 ${isCollapsed ? "md:p-2" : ""}`}>
            <button
              type="button"
              onClick={toggleStructureScan}
              title={isCollapsed ? "Structure scan" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left text-slate-500 transition-all hover:border-white/[0.08] hover:bg-white/[0.035] hover:text-slate-300 ${isCollapsed ? "md:justify-center md:px-0" : ""}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/[0.045] text-emerald-300/65">
                <Scan size={15} />
              </span>
              <span className={`min-w-0 flex-1 ${isCollapsed ? "md:hidden" : ""}`}>
                <strong className="block text-[10px] font-semibold uppercase tracking-[0.12em]">Structure scan</strong>
                <span className="mt-0.5 block text-[9px] text-slate-700">Developer view</span>
              </span>
              <ChevronDown
                size={12}
                className={`transition-transform ${showStructureScan ? "rotate-180" : ""} ${isCollapsed ? "md:hidden" : ""}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {showStructureScan && !isCollapsed ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2">
                    <XRayConsole />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </footer>
        ) : null}
      </aside>
    </>
  );
}

function NavItem({
  item,
  currentPath,
  isCollapsed,
  onNavigate,
  depth = 0,
}: {
  item: NavigationItem;
  currentPath: string;
  isCollapsed: boolean;
  onNavigate: () => void;
  depth?: number;
}) {
  const itemDomain = item.domain;
  const rgb = domainRgb(itemDomain);
  const isExactMatch = currentPath === item.href;
  const isDescendantActive = currentPath.startsWith(`${item.href}/`);
  const isActiveBranch = isExactMatch || isDescendantActive;
  const hasChildren = Boolean(item.children?.length);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const [manualExpansion, setManualExpansion] = useState<{
    path: string;
    value: boolean;
  } | null>(null);
  // The server snapshot and hydration snapshot are both collapsed. Once React
  // owns the client tree, active ancestry opens automatically. A manual choice
  // is scoped to the current path so navigation can reveal the next ancestry.
  const expanded = manualExpansion?.path === currentPath
    ? manualExpansion.value
    : hydrated && isActiveBranch;
  const isTopLevel = depth === 0;
  const Icon = item.icon === "book-open"
    ? BookOpen
    : isTopLevel && itemDomain !== "meta"
      ? DOMAIN_BY_ID[itemDomain]?.icon
      : undefined;

  const activeBackground = isTopLevel
    ? `linear-gradient(90deg, rgba(${rgb},0.12), rgba(${rgb},0.035))`
    : "rgba(255,255,255,0.055)";

  const childRailClass = depth === 0 ? "ml-5 pl-2" : depth === 1 ? "ml-3 pl-2" : "ml-2 pl-1.5";

  return (
    <div className="relative min-w-0">
      <div
        className={`group flex min-w-0 items-center rounded-xl border transition-all ${
          isTopLevel ? "min-h-11" : "min-h-8 rounded-lg"
        } ${isActiveBranch ? "text-white" : "border-transparent text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"} ${
          isCollapsed ? "md:justify-center" : ""
        }`}
        style={
          isActiveBranch
            ? {
                borderColor: isTopLevel ? `rgba(${rgb},0.22)` : "rgba(255,255,255,0.06)",
                background: activeBackground,
              }
            : undefined
        }
      >
        <Link
          href={item.href}
          onClick={onNavigate}
          title={isCollapsed || depth >= 2 ? item.label : undefined}
          className={`flex min-w-0 flex-1 items-center gap-2.5 ${isTopLevel ? "px-3 py-2.5" : "px-2.5 py-1.5"} ${
            isCollapsed ? "md:justify-center md:px-0" : ""
          }`}
        >
          {Icon ? (
            <span
              className="flex shrink-0 items-center justify-center transition-colors"
              style={{ color: isActiveBranch ? `rgb(${rgb})` : undefined }}
            >
              <Icon size={isTopLevel ? 17 : 14} />
            </span>
          ) : (
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full transition-all"
              style={{
                background: isExactMatch ? `rgb(${rgb})` : `rgba(${rgb},0.32)`,
                boxShadow: isExactMatch ? `0 0 8px rgba(${rgb},0.55)` : undefined,
              }}
            />
          )}

          <span
            className={`min-w-0 whitespace-normal break-words font-medium tracking-wide ${
              isTopLevel ? "text-[12px] leading-4" : "text-[11px] leading-4"
            } ${isExactMatch ? "text-white" : ""} ${isCollapsed ? "md:hidden" : ""}`}
          >
            {item.label}
          </span>
        </Link>

        {hasChildren ? (
          <button
            type="button"
            onClick={() => setManualExpansion({ path: currentPath, value: !expanded })}
            className={`mr-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-white/[0.05] hover:text-slate-300 ${
              isCollapsed ? "md:hidden" : ""
            }`}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
            aria-expanded={expanded}
          >
            <ChevronDown size={12} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>
        ) : null}
      </div>

      <AnimatePresence initial={false}>
        {expanded && hasChildren ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`min-w-0 overflow-hidden ${isCollapsed ? "md:hidden" : ""}`}
          >
            <div
              className={`${childRailClass} mt-1 min-w-0 space-y-0.5 border-l py-0.5`}
              style={{ borderColor: `rgba(${rgb},0.15)` }}
            >
              {item.children?.map((child) => (
                <NavItem
                  key={child.href}
                  item={child}
                  currentPath={currentPath}
                  isCollapsed={isCollapsed}
                  onNavigate={onNavigate}
                  depth={depth + 1}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
