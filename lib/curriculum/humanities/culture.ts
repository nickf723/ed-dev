import type { CurriculumNode } from "@/lib/curriculum/types";

function planned(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "humanities", status: "placeholder", pageKind: "unit" };
}

function active(id: string, label: string, href: string, description: string): CurriculumNode {
  return { id, label, href, description, domainId: "humanities", status: "active", pageKind: "unit" };
}

export const CULTURE_CURRICULUM: CurriculumNode = {
  id: "humanities.culture",
  label: "Culture",
  href: "/humanities/culture",
  description:
    "Study shared practices, meanings, symbols, memories, media, traditions, everyday objects, places, identities, heritage, and cultural change without treating cultures as fixed or internally uniform.",
  domainId: "humanities",
  status: "active",
  pageKind: "hub",
  children: [
    planned("humanities.culture.cultural-studies", "Cultural Studies & Interpretation", "/humanities/culture/cultural-studies", "Study representation, identity, ideology, institutions, audiences, subcultures, power, reception, cultural production, and interpretive methods."),
    active("humanities.culture.folklore", "Folklore & Oral Tradition", "/humanities/culture/folklore", "Study stories, legends, jokes, customs, sayings, performance, vernacular creativity, transmission, variation, belief, and community memory."),
    active("humanities.culture.holidays", "Festivals, Holidays & Ritual Calendars", "/humanities/culture/holidays", "Study recurring public and private observances, seasonal calendars, commemorations, festivals, foodways, symbols, performance, memory, and changing participation."),
    planned("humanities.culture.material-everyday", "Material & Everyday Culture", "/humanities/culture/material-everyday", "Study clothing, foodways, domestic objects, design, craft, shopping, leisure, habits, spaces, technology, and the meanings attached to ordinary material life."),
    planned("humanities.culture.popular-media", "Popular Culture & Media", "/humanities/culture/popular-media", "Study film, television, music, celebrity, fandom, publishing, advertising, genres, memes, circulation, audiences, and the institutions that shape popular expression."),
    active("humanities.culture.digital", "Digital Culture", "/humanities/culture/digital", "Study online communities, platforms, memes, streaming, creator cultures, moderation, algorithms, identity performance, vernacular media, and networked participation."),
    active("humanities.culture.locations", "Cultural Places & Landscapes", "/humanities/culture/locations", "Study neighborhoods, streets, monuments, venues, markets, routes, public space, cultural districts, tourism, memory, belonging, and place-making."),
    planned("humanities.culture.heritage-memory", "Heritage, Memory & Preservation", "/humanities/culture/heritage-memory", "Study museums, archives, monuments, preservation, repatriation, commemoration, contested memory, intangible heritage, community stewardship, and what societies choose to remember."),
    planned("humanities.culture.change-circulation", "Cultural Change & Circulation", "/humanities/culture/change-circulation", "Study borrowing, remix, diffusion, migration, translation, commercialization, revival, hybridization, generational change, appropriation debates, and the movement of practices across contexts."),
  ],
};
