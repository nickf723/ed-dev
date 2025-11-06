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
  Ruler, // Not used in new structure, but keeping import
  FunctionSquare,
} from "@/components/icons";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // State for the new nested structure
  const [expandFormalScience, setExpandFormalScience] = useState(true);
  const [expandMath, setExpandMath] = useState(true);
  const [expandAlgebra, setExpandAlgebra] = useState(true);
  const [expandElemAlgebra, setExpandElemAlgebra] = useState(true);
  const [expandFoundations, setExpandFoundations] = useState(true);
  const [expandNumOps, setExpandNumOps] = useState(true);

  // 🔽 FIXED: Added unique state for each new section
  const [expandNatural, setExpandNatural] = useState(false);
  const [expandSocial, setExpandSocial] = useState(false);
  const [expandApplied, setExpandApplied] = useState(false);
  const [expandHumanities, setExpandHumanities] = useState(false);
  const [expandInter, setExpandInter] = useState(false);

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
                  ${
                    open
                      ? "translate-x-0 w-[var(--sidebar-width)]"
                      : "-translate-x-full md:translate-x-0 md:w-[var(--sidebar-width)]"
                  }`}
      >
        <nav className="flex flex-col gap-2 p-4 pt-16 md:pt-6 text-sm font-medium text-neutral-300">
          {/* Home */}
          <SidebarLink
            href="/"
            label="Home"
            icon={<Home size={16} />}
            active={pathname === "/"}
          />

          {/* Formal Science */}
          <Dropdown
            label="Formal Science"
            icon={<BookOpen size={16} />}
            expanded={expandFormalScience}
            setExpanded={setExpandFormalScience}
          >
            {/* Mathematics Dropdown */}
            <Dropdown
              label="Mathematics"
              icon={<Calculator size={14} />}
              expanded={expandMath}
              setExpanded={setExpandMath}
              nested
            >
              {/* Algebra Dropdown */}
              <Dropdown
                label="Algebra"
                icon={<FunctionSquare size={14} />}
                expanded={expandAlgebra}
                setExpanded={setExpandAlgebra}
                nested
              >
                {/* Elementary Algebra Dropdown */}
                <Dropdown
                  label="Elementary Algebra"
                  expanded={expandElemAlgebra}
                  setExpanded={setExpandElemAlgebra}
                  nested
                >
                  {/* Foundations Dropdown */}
                  <Dropdown
                    label="Foundations"
                    expanded={expandFoundations}
                    setExpanded={setExpandFoundations}
                    nested
                  >
                    {/* Numbers and Operations Dropdown */}
                    <Dropdown
                      label="Numbers and Operations"
                      expanded={expandNumOps}
                      setExpanded={setExpandNumOps}
                      nested
                    >
                      {/* Final Link */}
                      <SidebarLink
                        href="/formal-science/mathematics/algebra/elementary-algebra/foundations/num-ops/number-systems"
                        label="Number Systems"
                        active={pathname.startsWith(
                          "/formal-science/mathematics/algebra/elementary-algebra/foundations/num-ops/number-systems",
                        )}
                        nested
                      />
                    </Dropdown>
                  </Dropdown>
                </Dropdown>
              </Dropdown>
            </Dropdown>
          </Dropdown>

          {/* Natural Science */}
          <Dropdown
            label="Natural Science"
            icon={<BookOpen size={16} />}
            expanded={expandNatural}
            setExpanded={setExpandNatural}
          >
            {/* Placeholder for future links */}
            <span className="text-neutral-500 italic px-3 py-2">
              (Coming Soon)
            </span>
          </Dropdown>
          {/* Social Science */}
          <Dropdown
            label="Social Science"
            icon={<BookOpen size={16} />}
            expanded={expandSocial}
            setExpanded={setExpandSocial}
          >
            {/* Placeholder for future links */}
            <span className="text-neutral-500 italic px-3 py-2">
              (Coming Soon)
            </span>
          </Dropdown>
          {/* Applied Science */}
          <Dropdown
            label="Applied Science"
            icon={<BookOpen size={16} />}
            expanded={expandApplied}
            setExpanded={setExpandApplied}
          >
            {/* Placeholder for future links */}
            <span className="text-neutral-500 italic px-3 py-2">
              (Coming Soon)
            </span>
          </Dropdown>
          {/* Humanities */}
          <Dropdown
            label="Humanities"
            icon={<BookOpen size={16} />}
            expanded={expandHumanities}
            setExpanded={setExpandHumanities}
          >
            {/* Placeholder for future links */}
            <span className="text-neutral-500 italic px-3 py-2">
              (Coming Soon)
            </span>
          </Dropdown>
          {/* Interdisciplines */}
          <Dropdown
            label="Interdisciplines"
            icon={<BookOpen size={16} />}
            expanded={expandInter}
            setExpanded={setExpandInter}
          >
            {/* Placeholder for future links */}
            <span className="text-neutral-500 italic px-3 py-2">
              (Coming Soon)
            </span>
          </Dropdown>
          {/* === END: New Nested Structure === */}

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