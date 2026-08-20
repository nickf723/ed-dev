import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "applied", status: "placeholder", pageKind: "unit" };
}

export const BUSINESS_CURRICULUM: CurriculumNode = {
  id: "applied.business",
  label: "Business",
  href: "/applied-science/business",
  description:
    "Study how organizations create and deliver value by coordinating customers, people, capabilities, operations, information, capital, accounting, marketing, strategy, governance, risk, and adaptation over time.",
  domainId: "applied",
  status: "active",
  pageKind: "hub",
  children: [
    {
      id: "applied.business.accounting",
      label: "Accounting",
      href: "/applied-science/business/accounting",
      description: "Record, classify, reconcile, summarize, and interpret economic events through financial statements, management accounting, controls, audit evidence, and reporting systems.",
      domainId: "applied",
      status: "active",
      pageKind: "unit",
    },
    {
      id: "applied.business.marketing",
      label: "Marketing",
      href: "/applied-science/business/marketing",
      description: "Study customers, needs, segmentation, positioning, research, product-market fit, communication, channels, pricing context, brand, acquisition, retention, and measurement.",
      domainId: "applied",
      status: "active",
      pageKind: "unit",
    },
    planned("applied.business.finance", "Finance", "/applied-science/business/finance", "Study financing, investment decisions, cash flows, risk, valuation, capital structure, working capital, financial planning, and the tradeoffs created by time and uncertainty."),
    planned("applied.business.operations", "Operations & Supply Chain", "/applied-science/business/operations", "Design and improve the processes that transform inputs into products and services through capacity, inventory, quality, sourcing, logistics, scheduling, reliability, and flow."),
    planned("applied.business.management", "Management & Organizations", "/applied-science/business/management", "Study coordination, organizational structure, leadership, teams, incentives, communication, culture, decision rights, conflict, human resources, and change."),
    planned("applied.business.strategy", "Strategy & Competitive Analysis", "/applied-science/business/strategy", "Study goals, positioning, capabilities, tradeoffs, industry structure, competitive advantage, strategic choice, execution, and adaptation under uncertainty."),
    planned("applied.business.entrepreneurship", "Entrepreneurship & Innovation", "/applied-science/business/entrepreneurship", "Explore opportunity discovery, customer problems, experiments, business models, venture formation, innovation portfolios, resource constraints, and learning under uncertainty."),
    planned("applied.business.analytics", "Business Analytics & Decision Science", "/applied-science/business/analytics", "Use data, experiments, forecasts, models, dashboards, optimization, and decision analysis while distinguishing measurement, prediction, causation, and judgment."),
    planned("applied.business.governance-risk", "Governance, Risk & Compliance", "/applied-science/business/governance-risk", "Study oversight, internal controls, enterprise risk, compliance, ethics, accountability, stakeholder obligations, resilience, and how organizations respond to failures and uncertainty."),
    planned("applied.business.international", "International Business & Trade", "/applied-science/business/international", "Study cross-border operations, sourcing, market entry, currencies, logistics, regulation, institutions, culture, geopolitical exposure, and global value chains without reducing trade to finance flows alone."),
  ],
};
