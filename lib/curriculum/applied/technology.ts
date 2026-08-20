import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(id: string, label: string, href: string, description: string): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "applied",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const TECHNOLOGY_CURRICULUM: CurriculumNode = {
  id: "applied.technology",
  label: "Technology",
  href: "/applied-science/computer-technology",
  description:
    "Study practical technological systems as combinations of energy, materials, sensing, computation, communication, actuation, interfaces, manufacturing, maintenance, standards, safety, and infrastructure.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "applied.technology.computing-devices",
      "Computing Devices & Hardware",
      "/applied-science/computer-technology/computing-devices",
      "Processors, memory, storage, peripherals, device architecture, thermal management, form factors, hardware interfaces, performance, repairability, and the physical machines that execute software.",
    ),
    branch(
      "applied.technology.electronics-embedded",
      "Electronics & Embedded Systems",
      "/applied-science/computer-technology/electronics-embedded",
      "Sensors, microcontrollers, circuits, buses, firmware, power regulation, signal conditioning, embedded control, real-time constraints, and electronics integrated into larger products.",
    ),
    branch(
      "applied.technology.networks-telecom",
      "Networks & Telecommunications",
      "/applied-science/computer-technology/networks-telecom",
      "Wired and wireless links, switching, routing, radio systems, cellular networks, satellites, physical media, protocols, latency, coverage, interoperability, reliability, and communications infrastructure.",
    ),
    branch(
      "applied.technology.robotics-automation",
      "Robotics & Automation",
      "/applied-science/computer-technology/robotics-automation",
      "Sensing, control, actuation, motion, autonomy, industrial automation, machine vision, human-robot interaction, safety systems, and technologies that perform physical tasks with varying degrees of automation.",
    ),
    branch(
      "applied.technology.manufacturing-fabrication",
      "Manufacturing & Fabrication Technology",
      "/applied-science/computer-technology/manufacturing-fabrication",
      "Machining, molding, forming, casting, additive manufacturing, assembly, metrology, process control, tooling, automation, quality systems, and production at different scales.",
    ),
    branch(
      "applied.technology.energy-power",
      "Energy & Power Technology",
      "/applied-science/computer-technology/energy-power",
      "Generation, conversion, storage, power electronics, batteries, grids, charging, motors, efficiency, thermal systems, reliability, and the infrastructure that supplies usable energy.",
    ),
    branch(
      "applied.technology.transportation-mobility",
      "Transportation & Mobility Technology",
      "/applied-science/computer-technology/transportation-mobility",
      "Vehicle systems, propulsion, navigation, signaling, charging and fueling, logistics technologies, traffic systems, automation, safety, accessibility, and infrastructure for moving people and goods.",
    ),
    branch(
      "applied.technology.interfaces-assistive",
      "Interfaces & Assistive Technology",
      "/applied-science/computer-technology/interfaces-assistive",
      "Displays, controls, input devices, haptics, accessibility technologies, prosthetic and assistive devices, adaptive interfaces, ergonomics, multimodal interaction, and technologies designed around human capabilities.",
    ),
  ],
};
