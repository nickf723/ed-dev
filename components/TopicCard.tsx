// components/TopicCard.tsx
"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { ChevronRight } from "@/components/icons";

// --- Types ---
type Unit = {
  name: string;
  href: string;
  status: "In Progress" | "Planned" | "Complete";
};

//Properties
type TopicCardProps = {
  href: string;
  title: string;
  desc: string;
  Icon?: React.ElementType;
  style?: React.CSSProperties;
  className?: string;
  difficulty?: string;
  units?: Unit[];
  subtitle?: string;
};

// --- Helper Functions ---
const getStatusColor = (status: Unit["status"]) => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-400/20 text-yellow-300 border-yellow-400/30";
    case "Complete":
      return "bg-green-400/20 text-green-300 border-green-400/30";
    case "Planned":
    default:
      return "bg-neutral-700/30 text-neutral-400 border-neutral-700/50";
  }
};

// --- Main Component ---
export default function TopicCard(props: TopicCardProps) {
  const { href, title, desc, Icon, style, className = "", difficulty, units, subtitle } = props;

  // Use tilt effect on a ref, which will be applied to the root element
  const cardRef = useRef<HTMLDivElement & HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * 20;
      const rotateY = (x / rect.width - 0.5) * -20;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      card.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
      setTimeout(() => {
        if (card) card.style.transition = "";
      }, 500);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const cardStyles = { ...style } as React.CSSProperties;
  const cardClasses = `topic-card tilt group card-accent ${className} flex flex-col`;

  // --- Reusable Inner Content ---
  const CardContent = () => (
    <>
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-50 blur-3xl"
        style={{
          background:
            "linear-gradient(to top right, var(--theme-gradient-start), var(--theme-gradient-end))",
        }}
      />
      {/* Main Content Wrapper */}
      <div className="relative z-10">
        {Icon && (
          <Icon className="mb-2 h-10 w-10 text-neutral-500 transition-colors group-hover:[color:var(--theme-icon-hover)]" />
        )}
        {/* Title (conditionally a Link) */}
        {units && units.length > 0 ? (
          <Link href={href} className="text-2xl font-semibold sm:text-3xl">
            <h2
              className="bg-clip-text text-transparent"
              style={{
                background:
                  "linear-gradient(to right, var(--theme-gradient-start), var(--theme-gradient-end))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}>
              {title}
            </h2>
          </Link>
        ) : (
          <h2
            className="bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl"
            style={{
              background:
                "linear-gradient(to right, var(--theme-gradient-start), var(--theme-gradient-end))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            {title}
          </h2>
        )}
        {/* Subtitle */}
        {subtitle && (
          <p className="bg-clip-text text-transparent"
          style={{
                background:
                  "linear-gradient(to right, var(--theme-gradient-start), var(--theme-gradient-end))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}>
            {subtitle}
          </p>
        )}
        {/* Difficulty Blurb */}
        {difficulty && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-amber-300">
            {difficulty}
          </p>
        )}

        {/* Description */}
        <p className="mt-2 text-neutral-300 sm:mt-3">{desc}</p>
      </div>

      {/* Spacer to push units to the bottom */}
      <div className="flex-grow"></div>

      {/* Unit Index Section */}
      {units && units.length > 0 && (
        <div className="relative z-10 mt-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Unit Index
          </h3>
          <ul className="space-y-2">
            {units.map((unit) => (
              <li key={unit.name}>
                <Link
                  href={unit.href}
                  className={`flex items-center justify-between rounded-md p-2 transition-colors ${
                    unit.href === "#"
                      ? "cursor-not-allowed text-neutral-500"
                      : "text-neutral-200 hover:bg-neutral-800/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight size={14} />
                    {unit.name}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusColor(
                      unit.status
                    )}`}
                  >
                    {unit.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Underline accent */}
      <div
        className="absolute bottom-0 left-0 h-[25px] w-0 transition-all duration-1000 group-hover:w-full"
        style={{ backgroundColor: "var(--theme-underline)" }}
      />
    </>
  );

  // --- Conditional Rendering ---

  // If it has units, render as an <article>
  if (units && units.length > 0) {
    return (
      <article
        ref={cardRef as React.RefObject<HTMLDivElement>} // Cast ref
        className={cardClasses}
        style={cardStyles}
      >
        <CardContent />
      </article>
    );
  }

  // Otherwise, render as a single <Link>
  return (
    <Link
      ref={cardRef} // Default ref
      href={href}
      className={cardClasses}
      style={cardStyles}
    >
      <CardContent />
    </Link>
  );
}