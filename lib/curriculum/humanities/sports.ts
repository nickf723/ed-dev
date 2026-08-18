import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "humanities", status: "placeholder", pageKind: "unit" };
}

export const SPORTS_CURRICULUM: CurriculumNode = {
  id: "humanities.sports",
  label: "Sports",
  href: "/humanities/sports",
  description:
    "Study sport through rules, skill, technique, tactics, coaching, training, psychology, biomechanics, analytics, history, culture, institutions, media, competition, and the changing relationships among athletes, teams, officials, audiences, and governing bodies.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    planned("humanities.sports.history-culture", "Sport History & Culture", "/humanities/sports/history-culture", "Study how games and athletic practices emerge, spread, professionalize, symbolize identities, organize communities, and change through politics, media, technology, labor, migration, and cultural exchange."),
    planned("humanities.sports.rules-governance", "Rules, Officiating & Governance", "/humanities/sports/rules-governance", "Study rule systems, officiating, eligibility, competition formats, governing bodies, disciplinary systems, fairness, replay/technology, rule change, and how formal constraints define a sport."),
    planned("humanities.sports.skill-technique", "Skill, Technique & Motor Performance", "/humanities/sports/skill-technique", "Study perception-action coupling, coordination, technique, timing, motor learning, practice design, variability, expertise, and the adaptation of skill to changing game conditions."),
    planned("humanities.sports.tactics-strategy", "Tactics & Strategy", "/humanities/sports/tactics-strategy", "Study spacing, positioning, tempo, matchup, deception, transition, possession, risk, game state, opponent adaptation, play design, and strategic choice under rules and uncertainty."),
    planned("humanities.sports.coaching-training", "Coaching & Training Design", "/humanities/sports/coaching-training", "Study planning, practice design, feedback, workload, progression, team preparation, athlete development, communication, selection, recovery context, and the ethical responsibilities of coaching."),
    planned("humanities.sports.psychology-team", "Sport Psychology & Team Dynamics", "/humanities/sports/psychology-team", "Study attention, confidence, stress, motivation, group roles, cohesion, leadership, communication, decision making, identity, performance environments, and psychological wellbeing in sport."),
    planned("humanities.sports.biomechanics-performance", "Biomechanics & Performance Science", "/humanities/sports/biomechanics-performance", "Apply mechanics, physiology, measurement, equipment science, and performance modeling to athletic movement while distinguishing simplified models from coaching or medical advice."),
    planned("humanities.sports.analytics", "Performance Analytics", "/humanities/sports/analytics", "Study event data, tracking, metrics, video analysis, scouting, forecasting, uncertainty, context, causal questions, model limitations, and how measurements interact with tactical and organizational decisions."),
    planned("humanities.sports.organizations-media", "Sport Organizations, Media & Events", "/humanities/sports/organizations-media", "Study leagues, clubs, events, venues, media, fandom, sponsorship, labor, scheduling, business models, governance, accessibility, and the institutions that make organized sport possible."),
  ],
};
