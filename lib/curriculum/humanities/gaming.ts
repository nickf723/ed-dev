import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "humanities", status: "placeholder", pageKind: "unit" };
}

function active(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "humanities", status: "active", pageKind: "unit" };
}

export const GAMING_CURRICULUM: CurriculumNode = {
  id: "humanities.gaming",
  label: "Gaming",
  href: "/humanities/gaming",
  description:
    "Study games as rule systems, designed experiences, cultural artifacts, social practices, expressive media, and historical technologies across tabletop, roleplaying, digital, competitive, and experimental forms.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    active("humanities.gaming.tabletop", "Tabletop Games", "/humanities/gaming/tabletop", "Study board, card, dice, tile, miniature, dexterity, party, and abstract games through rules, information, probability, material components, social negotiation, and play culture."),
    active("humanities.gaming.rpg", "Roleplaying Games", "/humanities/gaming/rpg", "Study tabletop and live roleplaying through shared fiction, rules, character systems, improvisation, facilitation, chance, campaign structure, identity, authorship, and group play."),
    active("humanities.gaming.video", "Video Games", "/humanities/gaming/video", "Study digital games through input, simulation, feedback, interface, level/world design, audiovisual form, software affordances, platforms, communities, preservation, and play practices."),
    active("humanities.gaming.ludology", "Game Studies & Ludology", "/humanities/gaming/ludology", "Study games critically through rules, play, narrative, rhetoric, representation, players, communities, institutions, history, labor, economics, ethics, and research methods."),
    planned("humanities.gaming.design-systems", "Game Design & Systems", "/humanities/gaming/design-systems", "Study goals, rules, resources, state, actions, feedback, uncertainty, incentives, progression, difficulty, balance, emergence, iteration, playtesting, and the relationship between mechanics and experience."),
    planned("humanities.gaming.narrative-worlds", "Narrative, Characters & Worlds", "/humanities/gaming/narrative-worlds", "Study authored and emergent storytelling, quest structure, environmental narrative, dialogue, characterization, player agency, worldbuilding, procedural narrative, and the tension between story and play."),
    planned("humanities.gaming.players-communities", "Players, Communities & Competitive Play", "/humanities/gaming/players-communities", "Study cooperation, competition, social norms, fandom, modding, streaming, esports, speedrunning, accessibility communities, identity, toxicity, governance, and player-created culture."),
    planned("humanities.gaming.history-preservation", "Game History & Preservation", "/humanities/gaming/history-preservation", "Study games across historical periods and technologies, including archaeological evidence, printed and commercial games, arcades, consoles, personal computers, online play, preservation, emulation, archives, and changing player practices."),
    planned("humanities.gaming.accessibility-ethics", "Accessibility, Ethics & Responsible Design", "/humanities/gaming/accessibility-ethics", "Study accessibility, difficulty options, monetization, privacy, moderation, persuasive design, representation, labor, wellbeing, community safety, inclusion, and the responsibilities of designers and platforms."),
  ],
};
