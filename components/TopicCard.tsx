"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";

type TopicCardProps = {
  href: string;
  title: string;
  desc: string;
  Icon?: React.ElementType;
  gradient: string; // e.g., "from-cyan-400 to-blue-500"
  iconHoverColor?: string; // e.g., "group-hover:text-cyan-400"
  underlineColor?: string; // e.g., "bg-cyan-400"
};

export default function TopicCard({
  href,
  title,
  desc,
  Icon,
  gradient,
  iconHoverColor = "group-hover:text-cyan-400", // Default
  underlineColor = "bg-cyan-400", // Default
}: TopicCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

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

  return (
    <Link
      ref={cardRef}
      href={href}
      className="tilt group relative block overflow-hidden rounded-3xl border border-neutral-800/70 
                 bg-neutral-900/40 p-8 transition-transform duration-200 ease-out card-accent"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Background Glow */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100
                    bg-gradient-to-tr ${gradient} blur-3xl`}
      />

      {/* Icon (for homepage) */}
      {Icon && (
        <Icon
          className={`relative z-10 mb-2 h-10 w-10 text-neutral-500 transition-colors ${iconHoverColor}`}
        />
      )}

      {/* Title */}
      <h2
        className={`relative z-10 bg-gradient-to-r ${gradient} bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl`}
      >
        {title}
      </h2>

      {/* Description */}
      <p className="relative z-10 mt-1 text-neutral-400 sm:mt-3">{desc}</p>

      {/* Underline accent */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] w-0 ${underlineColor} transition-all duration-500 group-hover:w-full`}
      />
    </Link>
  );
}