import type { CurriculumNode } from "@/lib/curriculum/types";

function child(
  id: string,
  label: string,
  href: string,
  description: string,
  status: CurriculumNode["status"] = "placeholder",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "social",
    status,
    pageKind: "unit",
  };
}

/** Focused Political Science subtree used by the hub, sidebar, and future child pages. */
export const POLITICAL_SCIENCE_CURRICULUM: CurriculumNode = {
  id: "social.political-science",
  label: "Political Science",
  href: "/social-science/political-science",
  description:
    "Power, institutions, collective choice, political behavior, public policy, international relations, political economy, and the methods used to study them.",
  domainId: "social",
  status: "active",
  pageKind: "hub",
  children: [
    child(
      "social.political-science.theory",
      "Political Theory",
      "/social-science/political-science/theory",
      "Authority, justice, liberty, equality, rights, legitimacy, citizenship, obligation, and competing ideas about political order.",
    ),
    child(
      "social.political-science.comparative",
      "Comparative Politics",
      "/social-science/political-science/comparative",
      "Compare regimes, constitutions, parties, states, institutions, development paths, and patterns of political change across cases.",
    ),
    child(
      "social.political-science.institutions",
      "Political Institutions",
      "/social-science/political-science/institutions",
      "Legislatures, executives, courts, bureaucracies, constitutions, federal arrangements, electoral systems, and institutional design.",
    ),
    child(
      "social.political-science.behavior",
      "Political Behavior & Elections",
      "/social-science/political-science/behavior",
      "Voting, public opinion, participation, parties, campaigns, representation, political psychology, and collective political behavior.",
    ),
    child(
      "social.political-science.policy",
      "Public Policy & Administration",
      "/social-science/political-science/policy",
      "Agenda setting, policy design, implementation, bureaucracy, evaluation, public management, and the feedback between policy and politics.",
    ),
    child(
      "social.political-science.international-relations",
      "International Relations",
      "/social-science/political-science/international-relations",
      "War, cooperation, diplomacy, international institutions, security, trade, global governance, and relations among states and other actors.",
    ),
    child(
      "social.political-science.political-economy",
      "Political Economy",
      "/social-science/political-science/political-economy",
      "How political institutions and economic interests interact through taxation, redistribution, regulation, trade, development, and collective action.",
    ),
    child(
      "social.political-science.methods",
      "Political Methodology",
      "/social-science/political-science/methods",
      "Case comparison, surveys, experiments, causal inference, formal models, measurement, quantitative analysis, and research design.",
    ),
  ],
};
