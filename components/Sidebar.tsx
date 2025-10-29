"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/math", label: "Math" },
  { href: "/math/algebra", label: "Algebra" },
  { href: "/math/algebra/variables-expressions", label: "Variables & Expressions" },
  { href: "/math/algebra/variables", label: "Variables" },
  { href: "/glossary", label: "Glossary" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="glass p-4 w-64 h-screen fixed left-0 top-0 flex flex-col gap-2">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`p-2 rounded-lg transition-colors ${
            pathname === link.href ? "bg-cyan-500/20 text-cyan-300" : "text-neutral-300 hover:text-cyan-200"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
