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
  Ruler,
  FlaskConical,
  Atom,
  Dna,
  Mountain,
  Orbit,
  Waves,
  Scale,
  Zap,
  TrendingUp,
  SquareFunction,
  GitMerge,
  Shuffle,
  BookMarked,
  Variable,
  Move,
  SquarePlus,
  Percent,
  Equal,
  LineChart,
  Puzzle,
  Baby, // <-- Added
  Network, // <-- Added
  Sigma, // <-- Added
  Brain, // <-- Added
  Flame, // <-- Added
  TreeDeciduous, // <-- Added
  SquareDivide, // <-- Added
  AlarmSmoke, // <-- Added
  SquareRadical, // <-- Added
  Tally5, // <-- Added
  GitMerge as EuclideanIcon, // <-- Added alias
  Lock, // <-- Added
  HelpCircle, // <-- Added
  Parentheses, // <-- Added
  Minus, // <-- Added
  Plus, // <-- Added
  Waypoints,
  Spline,
  SquareX,
} from "@/components/icons";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // --- EXPAND STATE ---
  const [expandFormalScience, setExpandFormalScience] = useState(
    pathname.startsWith("/formal-science")
  );
  const [expandMath, setExpandMath] = useState(
    pathname.startsWith("/formal-science/mathematics")
  );
  
  // --- Algebra States
  const [expandAlgebra, setExpandAlgebra] = useState(
    pathname.startsWith("/formal-science/mathematics/algebra")
  );
  const [expandPreAlgebra, setExpandPreAlgebra] = useState(
    pathname.startsWith("/formal-science/mathematics/algebra/pre-algebra")
  );
  const [expandElemAlgebra, setExpandElemAlgebra] = useState(
    pathname.startsWith(
      "/formal-science/mathematics/algebra/elementary-algebra"
    )
  );

  // --- Number Theory States
  const [expandNumTheory, setExpandNumTheory] = useState(
    pathname.startsWith("/formal-science/mathematics/number-theory")
  );
  const [expandNTTier0, setExpandNTTier0] = useState(
    pathname.startsWith("/formal-science/mathematics/number-theory/tier-0-foundations")
  );
  const [expandNTTier1, setExpandNTTier1] = useState(
    pathname.startsWith("/formal-science/mathematics/number-theory/elementary")
  );
  const [expandNTTier2, setExpandNTTier2] = useState(
    pathname.startsWith("/formal-science/mathematics/number-theory/middle-school")
  );
  const [expandNTTier3, setExpandNTTier3] = useState(
    pathname.startsWith("/formal-science/mathematics/number-theory/high-school")
  );
  const [expandNTTier4, setExpandNTTier4] = useState(
    pathname.startsWith("/formal-science/mathematics/number-theory/undergraduate")
  );
  const [expandNTTier5, setExpandNTTier5] = useState(
    pathname.startsWith("/formal-science/mathematics/number-theory/graduate")
  );
  const [expandNTTier6, setExpandNTTier6] = useState(
    pathname.startsWith("/formal-science/mathematics/number-theory/frontier")
  );
  
  // --- Other States
  const [expandLogic, setExpandLogic] = useState(
    pathname.startsWith("/formal-science/logic")
  );
  const [expandNatural, setExpandNatural] = useState(
    pathname.startsWith("/natural-science")
  );
  const [expandPhysics, setExpandPhysics] = useState(
    pathname.startsWith("/natural-science/physics")
  );
  const [expandMechanics, setExpandMechanics] = useState(
    pathname.startsWith("/natural-science/physics/classical-mechanics")
  );
  const [expandSocial, setExpandSocial] = useState(
    pathname.startsWith("/social-science")
  );
  const [expandApplied, setExpandApplied] = useState(
    pathname.startsWith("/applied-science")
  );
  const [expandHumanities, setExpandHumanities] = useState(
    pathname.startsWith("/humanities")
  );
  const [expandInter, setExpandInter] = useState(
    pathname.startsWith("/interdisciplines")
  );
  // --- END EXPAND STATE ---

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 rounded-md border border-neutral-700 bg-neutral-900/80 p-2 text-neutral-300 transition hover:text-red-300 md:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`scroll-bar glass fixed left-0 top-0 z-40 h-screen overflow-y-auto border-r border-neutral-800
                  transition-all duration-300 ease-in-out
                  ${
                    open
                      ? "w-[var(--sidebar-width)] translate-x-0"
                      : "w-[var(--sidebar-width)] -translate-x-full md:translate-x-0"
                  }`}
      >
        <nav className="flex flex-col gap-2 p-4 pt-16 pb-24 text-sm font-medium text-neutral-300 md:pt-6">
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
              active={pathname.startsWith("/formal-science/mathematics")}
              nested
            >
              {/* Algebra Dropdown */}
              <Dropdown
                label="Algebra"
                icon={<SquareFunction size={14} />}
                expanded={expandAlgebra}
                setExpanded={setExpandAlgebra}
                href="/formal-science/mathematics/algebra"
                active={pathname.startsWith("/formal-science/mathematics/algebra")}
                nested
              >
                {/* Pre-Algebra Dropdown */}
                <Dropdown
                  label="Pre-Algebra"
                  icon={<BookMarked size={14} />}
                  expanded={expandPreAlgebra}
                  setExpanded={setExpandPreAlgebra}
                  href="/formal-science/mathematics/algebra/pre-algebra"
                  active={pathname.startsWith(
                    "/formal-science/mathematics/algebra/pre-algebra"
                  )}
                  nested
                >
                  <SidebarLink
                    href="/formal-science/mathematics/algebra/pre-algebra/variables-expressions"
                    label="Variables & Expressions"
                    icon={<Variable size={14} />}
                    active={pathname.includes("variables-expressions")}
                    nested
                  />
                  <SidebarLink
                    href="/formal-science/mathematics/algebra/pre-algebra/ratios-rates-proportions"
                    label="Ratios, Rates & Proportions"
                    icon={<Percent size={14} />}
                    active={pathname.includes("ratios-rates-proportions")}
                    nested
                  />
                  <SidebarLink
                    href="/formal-science/mathematics/algebra/pre-algebra/equations-inequalities"
                    label="Equations & Inequalities"
                    icon={<Equal size={14} />}
                    active={pathname.includes("equations-inequalities")}
                    nested
                  />
                  <SidebarLink
                    href="/formal-science/mathematics/algebra/pre-algebra/linear-reasoning"
                    label="Linear Reasoning"
                    icon={<LineChart size={14} />}
                    active={pathname.includes("linear-reasoning")}
                    nested
                  />
                  <SidebarLink
                    href="/formal-science/mathematics/algebra/pre-algebra/structure-logic"
                    label="Structure & Logic"
                    icon={<Puzzle size={14} />}
                    active={pathname.includes("structure-logic")}
                    nested
                  />
                </Dropdown>

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
                  <span className="px-3 py-2 text-neutral-500 italic">
                    (Coming Soon)
                  </span>
                </Dropdown>
              </Dropdown>
              
              {/* --- NEW NUMBER THEORY SECTION --- */}
              <Dropdown
                label="Number Theory"
                icon={<SquarePlus size={14} />}
                expanded={expandNumTheory}
                setExpanded={setExpandNumTheory}
                href="/formal-science/mathematics/number-theory"
                active={pathname.startsWith(
                  "/formal-science/mathematics/number-theory"
                )}
                nested
              >
                {/* Tier 0 */}
                <Dropdown
                  label="Foundations"
                  icon={<Baby size={14} />}
                  expanded={expandNTTier0}
                  setExpanded={setExpandNTTier0}
                  href="/formal-science/mathematics/number-theory/foundations"
                  active={pathname.startsWith("/formal-science/mathematics/number-theory/foundations")}
                  nested
                >
                  <SidebarLink href="/formal-science/mathematics/number-theory/foundations/counting-cardinality" label="Counting & Cardinality" icon={<Tally5 size={14} />} active={pathname.includes("counting-cardinality")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/foundations/early-number-concepts" label="Early Number Concepts" icon={<Tally5 size={14} />} active={pathname.includes("early-number-concepts")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/foundations/early-operations" label="Early Operations" icon={<Plus size={14} />} active={pathname.includes("early-operations")} nested />
                </Dropdown>
                {/* Tier 1 */}
                <Dropdown
                  label="Elementary"
                  icon={<Calculator size={14} />}
                  expanded={expandNTTier1}
                  setExpanded={setExpandNTTier1}
                  href="/formal-science/mathematics/number-theory/elementary"
                  active={pathname.startsWith("/formal-science/mathematics/number-theory/elementary")}
                  nested
                >
                  <SidebarLink href="/formal-science/mathematics/number-theory/elementary/whole-number-arithmetic" label="Whole Number Arithmetic" icon={<Calculator size={14} />} active={pathname.includes("whole-number-arithmetic")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/elementary/properties-of-operations" label="Properties of Operations" icon={<Parentheses size={14} />} active={pathname.includes("properties-of-operations")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/elementary/factors-multiples" label="Factors & Multiples" icon={<SquareX size={14} />} active={pathname.includes("factors-multiples")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/elementary/divisibility" label="Divisibility" icon={<Waves size={14} />} active={pathname.includes("divisibility")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/elementary/patterns-sequences" label="Patterns & Sequences" icon={<Spline size={14} />} active={pathname.includes("patterns-sequences")} nested />
                </Dropdown>
                {/* Tier 2 */}
                <Dropdown
                  label="Middle School"
                  icon={<Network size={14} />}
                  expanded={expandNTTier2}
                  setExpanded={setExpandNTTier2}
                  href="/formal-science/mathematics/number-theory/middle-school"
                  active={pathname.startsWith("/formal-science/mathematics/number-theory/middle-school")}
                  nested
                >
                  <SidebarLink href="/formal-science/mathematics/number-theory/middle-school/integer-system" label="Integer System" icon={<Minus size={14} />} active={pathname.includes("integer-system")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/middle-school/rational-number-structure" label="Rational Structure" icon={<SquareDivide size={14} />} active={pathname.includes("rational-number-structure")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/middle-school/prime-factorization" label="Prime Factorization" icon={<TreeDeciduous size={14} />} active={pathname.includes("prime-factorization")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/middle-school/modular-thinking-light" label="Modular Thinking (Light)" icon={<AlarmSmoke size={14} />} active={pathname.includes("modular-thinking-light")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/middle-school/proportional-number-structures" label="Proportional Structures" icon={<Percent size={14} />} active={pathname.includes("proportional-number-structures")} nested />
                </Dropdown>
                {/* Tier 3 */}
                <Dropdown
                  label="High School"
                  icon={<Sigma size={14} />}
                  expanded={expandNTTier3}
                  setExpanded={setExpandNTTier3}
                  href="/formal-science/mathematics/number-theory/high-school"
                  active={pathname.startsWith("/formal-science/mathematics/number-theory/high-school")}
                  nested
                >
                  <SidebarLink href="/formal-science/mathematics/number-theory/high-school/modular-arithmetic-formal" label="Modular Arithmetic" icon={<Sigma size={14} />} active={pathname.includes("modular-arithmetic-formal")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/high-school/diophantine-equations" label="Diophantine Equations" icon={<Equal size={14} />} active={pathname.includes("diophantine-equations")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/high-school/advanced-prime-topics" label="Advanced Prime Topics" icon={<Atom size={14} />} active={pathname.includes("advanced-prime-topics")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/high-school/irrational-numbers" label="Irrational Numbers" icon={<SquareRadical size={14} />} active={pathname.includes("irrational-numbers")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/high-school/counting-combinatorics" label="Counting & Combinatorics" icon={<Tally5 size={14} />} active={pathname.includes("counting-combinatorics")} nested />
                </Dropdown>
                {/* Tier 4 */}
                <Dropdown
                  label="Undergraduate"
                  icon={<FlaskConical size={14} />}
                  expanded={expandNTTier4}
                  setExpanded={setExpandNTTier4}
                  href="/formal-science/mathematics/number-theory/undergraduate"
                  active={pathname.startsWith("/formal-science/mathematics/number-theory/undergraduate")}
                  nested
                >
                  <SidebarLink href="/formal-science/mathematics/number-theory/undergraduate/euclidean-structure" label="Euclidean Structure" icon={<EuclideanIcon size={14} />} active={pathname.includes("euclidean-structure")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/undergraduate/congruence-classes-algebra" label="Congruence Classes" icon={<Network size={14} />} active={pathname.includes("congruence-classes-algebra")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/undergraduate/multiplicative-number-theory" label="Multiplicative NT" icon={<Sigma size={14} />} active={pathname.includes("multiplicative-number-theory")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/undergraduate/quadratic-residues" label="Quadratic Residues" icon={<Waves size={14} />} active={pathname.includes("quadratic-residues")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/undergraduate/prime-distribution-theory" label="Prime Distribution" icon={<Waves size={14} />} active={pathname.includes("prime-distribution-theory")} nested />
                </Dropdown>
                {/* Tier 5 */}
                <Dropdown
                  label="Graduate"
                  icon={<Brain size={14} />}
                  expanded={expandNTTier5}
                  setExpanded={setExpandNTTier5}
                  href="/formal-science/mathematics/number-theory/graduate"
                  active={pathname.startsWith("/formal-science/mathematics/number-theory/graduate")}
                  nested
                >
                  <SidebarLink href="/formal-science/mathematics/number-theory/graduate/algebraic-number-theory" label="Algebraic NT" icon={<Brain size={14} />} active={pathname.includes("algebraic-number-theory")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/graduate/analytic-number-theory" label="Analytic NT" icon={<Spline size={14} />} active={pathname.includes("analytic-number-theory")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/graduate/modular-forms" label="Modular Forms" icon={<Network size={14} />} active={pathname.includes("modular-forms")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/graduate/elliptic-curves" label="Elliptic Curves" icon={<Waypoints size={14} />} active={pathname.includes("elliptic-curves")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/graduate/cryptographic-foundations" label="Cryptography" icon={<Lock size={14} />} active={pathname.includes("cryptographic-foundations")} nested />
                </Dropdown>
                {/* Tier 6 */}
                <Dropdown
                  label="Frontier"
                  icon={<Flame size={14} />}
                  expanded={expandNTTier6}
                  setExpanded={setExpandNTTier6}
                  href="/formal-science/mathematics/number-theory/frontier"
                  active={pathname.startsWith("/formal-science/mathematics/number-theory/frontier")}
                  nested
                >
                  <SidebarLink href="/formal-science/mathematics/number-theory/frontier/prime-problems" label="Prime Problems" icon={<Flame size={14} />} active={pathname.includes("prime-problems")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/frontier/integer-mysteries" label="Integer Mysteries" icon={<HelpCircle size={14} />} active={pathname.includes("integer-mysteries")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/frontier/combinatorial-additive" label="Combinatorial/Additive" icon={<Sigma size={14} />} active={pathname.includes("combinatorial-additive")} nested />
                  <SidebarLink href="/formal-science/mathematics/number-theory/frontier/computational-complexity" label="omputational" icon={<Network size={14} />} active={pathname.includes("computational-complexity")} nested />
                </Dropdown>
              </Dropdown>
              {/* --- END NUMBER THEORY SECTION --- */}
              
            </Dropdown>{" "}
            {/* End Mathematics Dropdown */}
            
            {/* Logic Dropdown */}
            <Dropdown
              label="Logic"
              icon={<Calculator size={14} />}
              expanded={expandLogic}
              setExpanded={setExpandLogic}
              href="/formal-science/logic"
              active={pathname === "/formal-science/logic"}
              nested
            >
              <span className="px-3 py-2 text-neutral-500 italic">
                (Coming Soon)
              </span>
            </Dropdown>{" "}
          </Dropdown>{" "}
          
          {/* Natural Science */}
          <Dropdown
            label="Natural Science"
            icon={<FlaskConical size={16} />}
            expanded={expandNatural}
            setExpanded={setExpandNatural}
            href="/natural-science"
            active={pathname === "/natural-science"}
          >
            {/* Physics */}
            <Dropdown
              label="Physics"
              icon={<Atom size={14} />}
              expanded={expandPhysics}
              setExpanded={setExpandPhysics}
              href="/natural-science/physics"
              active={pathname.startsWith("/natural-science/physics")}
              nested
            >
              <Dropdown
                label="Classical Mechanics"
                icon={<TrendingUp size={14} />}
                expanded={expandMechanics}
                setExpanded={setExpandMechanics}
                href="/natural-science/physics/classical-mechanics"
                active={pathname.startsWith(
                  "/natural-science/physics/classical-mechanics"
                )}
                nested
              >
                <SidebarLink
                  href="/natural-science/physics/classical-mechanics/kinematics"
                  label="Kinematics"
                  icon={<TrendingUp size={14} />}
                  active={pathname.startsWith(
                    "/natural-science/physics/classical-mechanics/kinematics"
                  )}
                  nested
                />
                <SidebarLink
                  href="#" // Placeholder
                  label="Dynamics"
                  icon={<Move size={14} />}
                  active={false} // No active state yet
                  nested
                />
              </Dropdown>

              <SidebarLink
                href="/natural-science/physics/electromagnetism"
                label="Electromagnetism"
                icon={<Zap size={14} />}
                active={pathname.startsWith(
                  "/natural-science/physics/electromagnetism"
                )}
                nested
              />
              <SidebarLink
                href="/natural-science/physics/thermodynamics"
                label="Thermodynamics"
                icon={<Scale size={14} />}
                active={pathname.startsWith(
                  "/natural-science/physics/thermodynamics"
                )}
                nested
              />
              <SidebarLink
                href="/natural-science/physics/waves-optics"
                label="Waves and Optics"
                icon={<Waves size={14} />}
                active={pathname.startsWith(
                  "/natural-science/physics/waves-optics"
                )}
                nested
              />
              <SidebarLink
                href="/natural-science/physics/quantum-mechanics"
                label="Quantum Mechanics"
                icon={<Orbit size={14} />}
                active={pathname.startsWith(
                  "/natural-science/physics/quantum-mechanics"
                )}
                nested
              />
              <SidebarLink
                href="/natural-science/physics/relativity"
                label="Relativity"
                icon={<GitMerge size={14} />}
                active={pathname.startsWith(
                  "/natural-science/physics/relativity"
                )}
                nested
              />
            </Dropdown>

            {/* Chemistry */}
            <SidebarLink
              href="/natural-science/chemistry"
              label="Chemistry"
              icon={<FlaskConical size={14} />}
              active={pathname.startsWith("/natural-science/chemistry")}
              nested
            />
            <SidebarLink
              href="/natural-science/biology"
              label="Biology"
              icon={<Dna size={14} />}
              active={pathname.startsWith("/natural-science/biology")}
              nested
            />
            <SidebarLink
              href="/natural-science/earth-science"
              label="Earth Science"
              icon={<Mountain size={14} />}
              active={pathname.startsWith("/natural-science/earth-science")}
              nested
            />
            <SidebarLink
              href="/natural-science/astronomy"
              label="Astronomy"
              icon={<Orbit size={14} />}
              active={pathname.startsWith("/natural-science/astronomy")}
              nested
            />
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