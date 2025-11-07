// components/TopicCard.tsx
"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";

//Topic Card Class
type TopicCardProps = {
  href: string;
  title: string;
  desc: string;
  Icon?: React.ElementType;
  style?: React.CSSProperties;
  className?: string;
};

//Topic Card Export
export default function TopicCard({
  href,
  title,
  desc,
  Icon,
  style,
  className = "",
}: TopicCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  // Tilt effect
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
      card.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
      setTimeout(() => (card.style.transition = ""), 500);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  //Palette
  const cardStyles = {
    ...style,
  } as React.CSSProperties;

  //Display
  return (
    <Link
      ref={cardRef}
      href={href}
      className={`topic-card tilt group card-accent ${className}`}
      style={cardStyles} >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-50 blur-3xl"
        style={{
          background:
            "linear-gradient(to top right, var(--card-gradient-start), var(--card-gradient-end))",
        }}
      />

      {/* Icon (for homepage) */}
      {Icon && (
        <Icon
          className="relative z-10 mb-2 h-10 w-10 text-neutral-500 transition-colors group-hover:[color:var(--card-icon-hover)]"
        />
      )}

      {/* Title */}
      <h2
        className="relative z-10 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl"
        style={{
          background:
            "linear-gradient(to right, var(--card-gradient-start), var(--card-gradient-end))",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
        }}
      >
        {title}
      </h2>

      {/* Description */}
      <p className="relative z-10 mt-1 text-neutral-300 sm:mt-3">{desc}</p>

      {/* Underline accent */}
      <div
        className="absolute bottom-0 left-0 h-[25px] w-0 transition-all duration-1000 group-hover:w-full"
        style={{ backgroundColor: "var(--card-underline)" }}
      />
    </Link>
  );
}