// app/applied-science/materials-science/page.tsx
"use client";
import React from "react";
import { Atom, Box, FlaskConical, Hammer } from "lucide-react";

const materialsScienceSymbols = [
  "\\text{Alloy}", "\\text{Polymer}", "\\text{Crystal}", "\\text{Grain}", "\\text{MPa}", "\\text{T}", "\\Delta G", "\\text{E}",
];

const branches = [
  {
    title: "Properties of Materials",
    desc: "Studying the mechanical, electrical, thermal, and optical characteristics of various substances.",
    href: "/applied-science/materials-science/material-properties",
    Icon: FlaskConical,
    className: "theme-applied-science"
  },
  {
    title: "Structure and Bonding",
    desc: "Analyzing atomic arrangement (crystal structure) and chemical bonding to understand material behavior.",
    href: "/applied-science/materials-science/structure-bonding",
    Icon: Atom,
    className: "theme-applied-science"
  },
  {
    title: "Metals and Alloys",
    desc: "The study of metallic elements, their mixtures (alloys), and processes like heat treatment (Metallurgy).",
    href: "/applied-science/materials-science/metals-alloys",
    Icon: Hammer,
    className: "theme-applied-science"
  },
  {
    title: "Ceramics and Polymers",
    desc: "The study of inorganic non-metallic solids (ceramics) and long-chain organic molecules (polymers/plastics).",
    href: "/applied-science/materials-science/ceramics-polymers",
    Icon: Box,
    className: "theme-applied-science"
  },
];

export default function MaterialsSciencePage() {
  return (
    <main className="topic-page theme-applied-science lg:px-16">
    </main>
  );
}