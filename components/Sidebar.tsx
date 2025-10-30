"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  BookOpen,
  Calculator,
  Ruler,
  FunctionSquare,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandMath, setExpandMath] = useState(true);
  const [expandAlgebra, setExpandAlgebra] = useState(true);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-neutral-900/80 border border-neutral-700 rounded-md p-2 text-neutral-300 hover:text-cyan-300 transition md:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`glass fixed left-0 top-0 h-screen z-40 border-r border-neutral-800
                    transition-all duration-300 ease-in-out
                    ${open ? "translate-x-0 w-[var(--sidebar-width)]" : "-translate-x-full md:translate-x-0 md:w-[var(--sidebar-width)]"}`}
      >
        <nav className="flex flex-col gap-2 p-4 pt-16 md:pt-6 text-sm font-medium text-neutral-300">
          {/* Home */}
          <SidebarLink
            href="/"
            label="Home"
            icon={<Home size={16} />}
            active={pathname === "/"}
          />

          {/* Math Dropdown */}
          <Dropdown
            label="Mathematics"
            icon={<BookOpen size={16} />}
            expanded={expandMath}
            setExpanded={setExpandMath}
          >
            {/* Algebra Dropdown */}
            <Dropdown
              label="Algebra"
              icon={<Calculator size={14} />}
              expanded={expandAlgebra}
              setExpanded={setExpandAlgebra}
              nested
            >
              <SidebarLink
                href="/math/algebra/variables"
                label="Variables"
                active={pathname.startsWith("/math/algebra/variables")}
                nested
              />
              <SidebarLink
                href="/math/algebra/expressions"
                label="Expressions"
                active={pathname.startsWith("/math/algebra/expressions")}
                nested
              />
              <SidebarLink
                href="/math/algebra/equations"
                label="Equations"
                active={pathname.startsWith("/math/algebra/equations")}
                nested
              />
              
            </Dropdown>

            {/* Geometry */}
            <SidebarLink
              href="/math/geometry"
              label="Geometry"
              icon={<Ruler size={14} />}
              active={pathname.startsWith("/math/geometry")}
            />

            {/* Calculus */}
            <SidebarLink
              href="/math/calculus"
              label="Calculus"
              icon={<FunctionSquare size={14} />}
              active={pathname.startsWith("/math/calculus")}
            />
          </Dropdown>

          {/* Glossary */}
          <SidebarLink
            href="/glossary"
            label="Glossary"
            icon={<BookOpen size={16} />}
            active={pathname.startsWith("/glossary")}
          />
        </nav>
      </aside>
    </>
  );
}

/* -------------------------------------- */
/* 🔹 Reusable Sidebar Link Component */
/* -------------------------------------- */
function SidebarLink({
  href,
  label,
  icon,
  active,
  nested = false,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  nested?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        active
          ? "bg-cyan-500/20 text-cyan-300"
          : "text-neutral-300 hover:text-cyan-200"
      } ${nested ? "ml-4" : ""}`}
    >
      {icon && <span className="text-cyan-400">{icon}</span>}
      {label}
    </Link>
  );
}

/* -------------------------------------- */
/* 🔹 Dropdown Component */
/* -------------------------------------- */
function Dropdown({
  label,
  icon,
  expanded,
  setExpanded,
  children,
  nested = false,
}: {
  label: string;
  icon?: React.ReactNode;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  children: React.ReactNode;
  nested?: boolean;
}) {
  return (
    <div className={`transition-all ${nested ? "ml-2" : ""}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center w-full p-2 rounded-md hover:text-cyan-300 transition"
      >
        <span className="flex items-center gap-2">
          {icon && <span className="text-cyan-400">{icon}</span>}
          {label}
        </span>
        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>

      {expanded && <div className="ml-2 flex flex-col gap-1">{children}</div>}
    </div>
  );
}
