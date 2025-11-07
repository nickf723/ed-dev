// components/Sidebar.tsx
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
  const [expandFormalScience, setExpandFormalScience] = useState(
    pathname.startsWith("/formal-science"),
  );
  const [expandMath, setExpandMath] = useState(
    pathname.startsWith("/formal-science/mathematics"),
  );
  const [expandAlgebra, setExpandAlgebra] = useState(
    pathname.startsWith("/formal-science/mathematics/algebra"),
  );
  const [expandElemAlgebra, setExpandElemAlgebra] = useState(
    pathname.startsWith("/formal-science/mathematics/algebra/elementary-algebra"),
  );
  const [expandFoundations, setExpandFoundations] = useState(
    pathname.startsWith(
      "/formal-science/mathematics/algebra/elementary-algebra/foundations",
    ),
  );
  const [expandNumOps, setExpandNumOps] = useState(
    pathname.startsWith(
      "/formal-science/mathematics/algebra/elementary-algebra/foundations/num-ops",
    ),
  );

  // 🔽 FIXED: Added unique state for each new section
  const [expandNatural, setExpandNatural] = useState(
    pathname.startsWith("/natural-science"),
  );
  const [expandSocial, setExpandSocial] = useState(
    pathname.startsWith("/social-science"),
  );
  const [expandApplied, setExpandApplied] = useState(
    pathname.startsWith("/applied-science"),
  );
  const [expandHumanities, setExpandHumanities] = useState(
    pathname.startsWith("/humanities"),
  );
  const [expandInter, setExpandInter] = useState(
    pathname.startsWith("/interdisciplines"),
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 rounded-md border border-neutral-700 bg-neutral-900/80 p-2 text-neutral-300 transition hover:text-cyan-300 md:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`glass fixed left-0 top-0 z-40 h-screen border-r border-neutral-800
                  transition-all duration-300 ease-in-out
                  ${
                    open
                      ? "w-[var(--sidebar-width)] translate-x-0"
                      : "w-[var(--sidebar-width)] -translate-x-full md:translate-x-0"
                  }`}
      >
        <nav className="flex flex-col gap-2 p-4 pt-16 text-sm font-medium text-neutral-300 md:pt-6">
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
            href="/formal-science"
            active={pathname === "/formal-science"}
          >
            {/* Mathematics Dropdown */}
            <Dropdown
              label="Mathematics"
              icon={<Calculator size={14} />}
              expanded={expandMath}
              setExpanded={setExpandMath}
              href="/formal-science/mathematics"
              active={pathname === "/formal-science/mathematics"}
              nested
            >
              {/* Algebra Dropdown */}
              <Dropdown
                label="Algebra"
                icon={<FunctionSquare size={14} />}
                expanded={expandAlgebra}
                setExpanded={setExpandAlgebra}
                href="/formal-science/mathematics/algebra"
                active={pathname === "/formal-science/mathematics/algebra"}
                nested
              >
                {/* Elementary Algebra Dropdown */}
                <Dropdown
                  label="Elementary Algebra"
                  expanded={expandElemAlgebra}
                  setExpanded={setExpandElemAlgebra}
                  href="/formal-science/mathematics/algebra/elementary-algebra"
                  active={
                    pathname ===
                    "/formal-science/mathematics/algebra/elementary-algebra"
                  }
                  nested
                >
                  {/* Foundations Dropdown */}
                  <Dropdown
                    label="Foundations"
                    expanded={expandFoundations}
                    setExpanded={setExpandFoundations}
                    href="/formal-science/mathematics/algebra/elementary-algebra/foundations"
                    active={
                      pathname ===
                      "/formal-science/mathematics/algebra/elementary-algebra/foundations"
                    }
                    nested
                  >
                    {/* Numbers and Operations Dropdown */}
                    <Dropdown
                      label="Numbers and Operations"
                      expanded={expandNumOps}
                      setExpanded={setExpandNumOps}
                      href="/formal-science/mathematics/algebra/elementary-algebra/foundations/num-ops"
                      active={
                        pathname ===
                        "/formal-science/mathematics/algebra/elementary-algebra/foundations/num-ops"
                      }
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
            href="/natural-science"
            active={pathname === "/natural-science"}
          >
            {/* Placeholder for future links */}
            <span className="px-3 py-2 text-neutral-500 italic">
              (Coming Soon)
            </span>
          </Dropdown>
          {/* Social Science */}
          <Dropdown
            label="Social Science"
            icon={<BookOpen size={16} />}
            expanded={expandSocial}
            setExpanded={setExpandSocial}
            href="/social-science"
            active={pathname === "/social-science"}
          >
            {/* Placeholder for future links */}
            <span className="px-3 py-2 text-neutral-500 italic">
              (Coming Soon)
            </span>
          </Dropdown>
          {/* Applied Science */}
          <Dropdown
            label="Applied Science"
            icon={<BookOpen size={16} />}
            expanded={expandApplied}
            setExpanded={setExpandApplied}
            href="/applied-science"
            active={pathname === "/applied-science"}
          >
            {/* Placeholder for future links */}
            <span className="px-3 py-2 text-neutral-500 italic">
              (Coming Soon)
            </span>
          </Dropdown>
          {/* Humanities */}
          <Dropdown
            label="Humanities"
            icon={<BookOpen size={16} />}
            expanded={expandHumanities}
            setExpanded={setExpandHumanities}
            href="/humanities"
            active={pathname === "/humanities"}
          >
            {/* Placeholder for future links */}
            <span className="px-3 py-2 text-neutral-500 italic">
              (Coming Soon)
            </span>
          </Dropdown>
          {/* Interdisciplines */}
          <Dropdown
            label="Interdisciplines"
            icon={<BookOpen size={16} />}
            expanded={expandInter}
            setExpanded={setExpandInter}
            href="/interdisciplines"
            active={pathname === "/interdisciplines"}
          >
            {/* Placeholder for future links */}
            <span className="px-3 py-2 text-neutral-500 italic">
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
      className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
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
/* 🔹 Dropdown Component (Updated) 🔹 */
/* -------------------------------------- */
function Dropdown({
  label,
  icon,
  expanded,
  setExpanded,
  children,
  nested = false,
  href,
  active,
}: {
  label: string;
  icon?: React.ReactNode;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  children: React.ReactNode;
  nested?: boolean;
  href?: string;
  active?: boolean;
}) {
  const LabelContent = () => (
    <>
      {icon && <span className="text-cyan-400">{icon}</span>}
      {label}
    </>
  );

  const labelClasses = `flex items-center gap-2 p-2 rounded-md transition-colors ${
    active
      ? "bg-cyan-500/20 text-cyan-300"
      : "text-neutral-300 hover:text-cyan-200"
  }`;

  return (
    <div className={`transition-all ${nested ? "ml-2" : ""}`}>
      <div className="group flex w-full items-center justify-between">
        {href ? (
          <Link href={href} className={`${labelClasses} flex-grow`}>
            <LabelContent />
          </Link>
        ) : (
          // If no href, make it a non-interactive span but with same padding
          <span className={`${labelClasses} flex-grow cursor-default`}>
            <LabelContent />
          </span>
        )}
        {/* Chevron button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-md text-neutral-400 transition hover:text-cyan-300"
          aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {expanded && <div className="ml-2 flex flex-col gap-1">{children}</div>}
    </div>
  );
}