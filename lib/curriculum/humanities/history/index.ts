import type { CurriculumNode } from "@/lib/curriculum/types";

function node(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
  status: CurriculumNode["status"] = "active",
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "humanities",
    status,
    children,
  };
}

export const HISTORY_CURRICULUM: CurriculumNode = {
  ...node(
    "humanities.history",
    "History",
    "/humanities/history",
    "Study the human past through time, place, and recurring themes, then combine those lenses into historical explanations.",
    [
      node(
        "humanities.history.chronology",
        "History by Time",
        "/humanities/history/chronology",
        "Organize events by sequence, period, duration, change, continuity, and turning points.",
        [
          node(
            "humanities.history.chronology.prehistory",
            "Prehistory",
            "/humanities/history/chronology/prehistory",
            "Human history before written records, including migration, tools, subsistence, settlement, and early social life.",
          ),
          node(
            "humanities.history.chronology.antiquity",
            "Antiquity",
            "/humanities/history/chronology/antiquity",
            "Early cities, writing systems, states, empires, trade networks, and classical civilizations.",
          ),
          node(
            "humanities.history.chronology.post-classical",
            "Post-Classical Era",
            "/humanities/history/chronology/medieval",
            "Regional states, faith traditions, long-distance exchange, migration, and interconnected post-classical worlds.",
          ),
          node(
            "humanities.history.chronology.early-modern",
            "Early Modern Era",
            "/humanities/history/chronology/early-modern",
            "Expanding oceanic networks, empires, religious change, scientific transformation, and early industrial systems.",
          ),
          node(
            "humanities.history.chronology.modern",
            "Modern Era",
            "/humanities/history/chronology/modern",
            "Industrialization, nationalism, imperialism, mass politics, global conflict, decolonization, and contemporary change.",
          ),
        ],
      ),
      node(
        "humanities.history.regional",
        "History by Place",
        "/humanities/history/regional",
        "Study how environments, borders, migration, trade, and local institutions shape different historical experiences.",
        [
          node(
            "humanities.history.regional.americas",
            "The Americas",
            "/humanities/history/regional/americas",
            "Indigenous societies, migration, colonization, exchange, state formation, and regional transformation across the Western Hemisphere.",
            [
              node(
                "humanities.history.regional.americas.north-america",
                "North America",
                "/humanities/history/regional/americas/north-america",
                "The histories of Indigenous nations, colonial societies, migration, states, economies, and cultures across North America.",
                [
                  node(
                    "humanities.history.regional.americas.north-america.usa",
                    "United States",
                    "/humanities/history/regional/americas/usa",
                    "The political, social, cultural, economic, and environmental history of the United States.",
                  ),
                ],
              ),
            ],
          ),
          node(
            "humanities.history.regional.europe",
            "Europe",
            "/humanities/history/regional/europe",
            "Regional histories of Europe and its changing connections with neighboring worlds.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.regional.africa",
            "Africa",
            "/humanities/history/regional/africa",
            "The histories of African societies, states, environments, diasporas, and global connections.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.regional.asia",
            "Asia",
            "/humanities/history/regional/asia",
            "The histories of Asian societies, empires, exchange networks, technologies, and cultural traditions.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.regional.oceania",
            "Oceania",
            "/humanities/history/regional/oceania",
            "The histories of Pacific peoples, navigation, exchange, colonization, sovereignty, and environmental change.",
            undefined,
            "placeholder",
          ),
        ],
      ),
      node(
        "humanities.history.theme",
        "History by Theme",
        "/humanities/history/theme",
        "Follow recurring forces and human questions across many places and periods instead of staying inside one era or region.",
        [
          node(
            "humanities.history.theme.power",
            "Power & Government",
            "/humanities/history/theme/politics",
            "Authority, law, citizenship, states, empires, resistance, and political change across time.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.theme.conflict",
            "Conflict & Security",
            "/humanities/history/theme/military",
            "War, strategy, coercion, diplomacy, security, and the social consequences of organized violence.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.theme.exchange",
            "Trade & Exchange",
            "/humanities/history/theme/economics",
            "Production, labor, trade, money, migration, and the networks that move goods and people.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.theme.belief",
            "Belief & Culture",
            "/humanities/history/theme/culture",
            "Religion, identity, ritual, art, language, education, and shared systems of meaning.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.theme.technology",
            "Science & Technology",
            "/humanities/history/theme/science",
            "Knowledge systems, invention, infrastructure, communication, and technological change.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.theme.health",
            "Health & Disease",
            "/humanities/history/theme/medicine",
            "Disease, medicine, public health, demography, care, and the changing human body in history.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.theme.environment",
            "Environment & Climate",
            "/humanities/history/theme/environment",
            "Climate, ecology, agriculture, resources, disasters, and reciprocal change between people and environments.",
            undefined,
            "placeholder",
          ),
          node(
            "humanities.history.theme.everyday-life",
            "Everyday Life",
            "/humanities/history/theme/everyday-life",
            "Family, work, food, housing, childhood, leisure, gender, and ordinary lived experience.",
            undefined,
            "placeholder",
          ),
        ],
      ),
    ],
  ),
  pageKind: "hub",
};
