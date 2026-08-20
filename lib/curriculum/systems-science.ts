import type { CurriculumNode } from "@/lib/curriculum/types";

function branch(id: string, label: string, href: string, description: string): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "formal",
    status: "placeholder",
    pageKind: "unit",
  };
}

export const SYSTEMS_SCIENCE_CURRICULUM: CurriculumNode = {
  id: "formal.systems-science",
  label: "Systems Science",
  href: "/formal-science/systems-science",
  description:
    "Study organized wholes through boundaries, stocks, flows, feedback, delays, interactions, networks, dynamics, emergence, adaptation, nonlinear behavior, and models that connect local mechanisms to system-level patterns.",
  domainId: "formal",
  status: "active",
  pageKind: "hub",
  children: [
    branch(
      "formal.systems-science.general-systems",
      "General Systems Theory",
      "/formal-science/systems-science/general-systems",
      "Boundaries, components, relationships, environment, hierarchy, open and closed systems, stocks and flows, state, function, purpose, and recurring concepts used across different kinds of systems.",
    ),
    branch(
      "formal.systems-science.feedback-cybernetics",
      "Feedback & Cybernetics",
      "/formal-science/systems-science/feedback-cybernetics",
      "Reinforcing and balancing feedback, sensing, comparison, control, regulation, communication, adaptation, delays, stability, and the limits of simplified loop diagrams.",
    ),
    branch(
      "formal.systems-science.system-dynamics",
      "System Dynamics",
      "/formal-science/systems-science/system-dynamics",
      "Stocks, flows, accumulations, delays, causal feedback, differential and difference-equation models, scenario simulation, overshoot, oscillation, growth, decay, and policy resistance.",
    ),
    branch(
      "formal.systems-science.network-science",
      "Network Science",
      "/formal-science/systems-science/network-science",
      "Nodes, edges, degree, paths, centrality, communities, diffusion, robustness, multilayer networks, and the consequences of connection structure for system behavior.",
    ),
    branch(
      "formal.systems-science.agent-cellular",
      "Agent-Based & Cellular Models",
      "/formal-science/systems-science/agent-cellular",
      "How local rules, heterogeneous agents, neighborhoods, interaction, space, stochasticity, and repeated updates can generate emergent population-level patterns.",
    ),
    {
      id: "formal.systems-science.complexity-chaos",
      label: "Complexity & Emergence",
      href: "/formal-science/systems-science/complexity-chaos",
      description:
        "Emergence, self-organization, adaptation, path dependence, attractors, fractals, interacting nonlinear processes, and how system-level patterns can arise without a central controller.",
      domainId: "formal",
      status: "active",
      pageKind: "unit",
      children: [
        {
          id: "formal.systems-science.complexity-chaos.fractals",
          label: "Fractals",
          href: "/formal-science/systems-science/complexity-chaos/fractals",
          description: "Self-similarity, scaling, recursive construction, fractal dimension, and patterns generated across scales.",
          domainId: "formal",
          status: "active",
          pageKind: "lesson",
        },
      ],
    },
    {
      id: "formal.systems-science.chaos-theory",
      label: "Chaos & Nonlinear Dynamics",
      href: "/formal-science/systems-science/chaos-theory",
      description:
        "Deterministic nonlinear systems, phase space, attractors, bifurcations, sensitive dependence on initial conditions, predictability horizons, and routes from regular to chaotic behavior.",
      domainId: "formal",
      status: "active",
      pageKind: "unit",
    },
    branch(
      "formal.systems-science.resilience-adaptation",
      "Resilience, Adaptation & Regime Change",
      "/formal-science/systems-science/resilience-adaptation",
      "Disturbance, recovery, robustness, redundancy, adaptation, tipping behavior, alternate regimes, vulnerability, tradeoffs, and how system structure shapes response to change.",
    ),
  ],
};
