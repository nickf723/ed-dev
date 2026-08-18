import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "applied", status: "placeholder", pageKind: "unit" };
}

export const MECHANICAL_ENGINEERING_CURRICULUM: CurriculumNode = {
  id: "applied.engineering.mechanical",
  label: "Mechanical Engineering",
  href: "/applied-science/engineering/mechanical",
  description:
    "Design and analyze machines and physical systems through mechanics, energy, thermal and fluid behavior, materials, mechanisms, manufacturing, controls, testing, and reliability.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    planned("applied.engineering.mechanical.mechanics-materials", "Engineering Mechanics & Solid Mechanics", "/applied-science/engineering/mechanical/mechanics-materials", "Study equilibrium, force systems, stress, strain, deformation, strength, stiffness, failure, beams, shafts, columns, and how loads move through solid components."),
    planned("applied.engineering.mechanical.dynamics-vibrations", "Dynamics & Vibrations", "/applied-science/engineering/mechanical/dynamics-vibrations", "Study motion, acceleration, momentum, rotating systems, oscillation, resonance, damping, balancing, transient response, and the dynamics of coupled mechanical systems."),
    planned("applied.engineering.mechanical.mechanisms-machine-design", "Mechanisms & Machine Design", "/applied-science/engineering/mechanical/mechanisms-machine-design", "Study gears, linkages, cams, bearings, springs, fasteners, power transmission, kinematics, component sizing, tolerances, fatigue, safety factors, and machine architecture."),
    planned("applied.engineering.mechanical.thermo-heat", "Thermodynamics & Heat Transfer", "/applied-science/engineering/mechanical/thermo-heat", "Study energy, work, heat, properties, cycles, conduction, convection, radiation, heat exchangers, engines, refrigeration, and thermal management."),
    planned("applied.engineering.mechanical.fluids", "Fluid Mechanics", "/applied-science/engineering/mechanical/fluids", "Study pressure, flow, conservation laws, viscosity, boundary layers, pipes, pumps, turbines, aerodynamics, hydraulics, and the interaction between fluids and machines."),
    planned("applied.engineering.mechanical.manufacturing", "Manufacturing & Production", "/applied-science/engineering/mechanical/manufacturing", "Study machining, forming, casting, joining, additive manufacturing, process capability, metrology, fixtures, tooling, quality, production systems, and design for manufacture and assembly."),
    planned("applied.engineering.mechanical.controls-mechatronics", "Controls, Mechatronics & Robotics", "/applied-science/engineering/mechanical/controls-mechatronics", "Integrate mechanisms with sensors, actuators, electronics, feedback, embedded control, system identification, automation, robotics, and electromechanical design."),
    planned("applied.engineering.mechanical.energy-systems", "Energy & Power Systems", "/applied-science/engineering/mechanical/energy-systems", "Study engines, turbines, compressors, power cycles, renewable systems, storage, efficiency, energy conversion, thermal-fluid infrastructure, and system-level tradeoffs."),
    planned("applied.engineering.mechanical.reliability-tribology", "Reliability, Tribology & Maintenance", "/applied-science/engineering/mechanical/reliability-tribology", "Study friction, lubrication, wear, fatigue, failure modes, reliability, condition monitoring, maintainability, service life, inspection, root-cause analysis, and lifecycle decisions."),
  ],
};
