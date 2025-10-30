"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Calculator, BookOpen } from "lucide-react";

export default function Home() {
  // 🧩  Card data
  const cards = [
    {
      title: "Mathematics",
      desc: "Patterns, logic, and structure.",
      href: "/math",
      color: "text-cyan-400",
      Icon: Calculator,
    },
    {
      title: "Glossary",
      desc: "Definitions and key terms.",
      href: "/glossary",
      color: "text-amber-400",
      Icon: BookOpen,
    },
  ];

  // 🌀 Tilt animation logic
  useEffect(() => {
    const tiltCards = document.querySelectorAll<HTMLElement>(".tilt");

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // More visible rotation and subtle zoom
      const rotateX = (y / rect.height - 0.5) * 20;
      const rotateY = (x / rect.width - 0.5) * -20;
      target.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      target.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
      setTimeout(() => (target.style.transition = ""), 500);
    };

    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    // cleanup
    return () => {
      tiltCards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // 🧱 Page layout
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="glass p-10 w-full max-w-5xl text-center border border-neutral-800/60 shadow-2xl">
        {/* Tagline */}
        <div className="flex justify-center mb-4">
          <span className="text-xs tracking-widest text-cyan-300 uppercase bg-neutral-800/50 px-3 py-1 rounded-full">
            v0.1 — prototype
          </span>
        </div>

        <h1 className="text-4xl font-bold text-cyan-400">Ed Dev Protocol</h1>
        <p className="mt-2 text-neutral-300 italic">
          Working smarter, not harder 🚀
        </p>

        {/* Card grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
          {cards.map(({ title, desc, href, color, Icon }) => (
            <Link
              key={href}
              href={href}
              className="tilt group relative overflow-hidden rounded-3xl border border-neutral-800/70 
                          bg-neutral-900/40 p-8 transition-transform duration-200 ease-out card-accent"
            >
              <Icon className="relative z-10 mb-2 h-10 w-10 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
              <h2 className={`text-2xl font-semibold gradient-text ${color}`}>
                {title}
              </h2>
              <p className="relative z-10 text-neutral-400 mt-1">{desc}</p>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
