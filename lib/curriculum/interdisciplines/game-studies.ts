import type { CurriculumNode } from "@/lib/curriculum/types";

function reference(
  id: string,
  label: string,
  href: string,
  description: string,
  children?: readonly CurriculumNode[],
): CurriculumNode {
  return {
    id,
    label,
    href,
    description,
    domainId: "inter",
    status: "active",
    pageKind: "reference",
    children,
  };
}

export const GAME_STUDIES_CURRICULUM: CurriculumNode = {
  id: "inter.game-studies",
  label: "Game Studies",
  href: "/interdisciplines/game-studies",
  description:
    "Study games as rule systems, designed artifacts, play practices, communities, and research objects by moving between concrete specimens and analytical methods.",
  domainId: "inter",
  status: "active",
  pageKind: "hub",
  children: [
    reference(
      "inter.game-studies.library",
      "Game Library",
      "/interdisciplines/game-studies/library",
      "Browse concrete game specimens, then inspect their rules, components, strategic pressures, histories, and playable models.",
      [
        reference(
          "inter.game-studies.library.board-games",
          "Board Games",
          "/interdisciplines/game-studies/library/board-games",
          "Search tabletop board-game records, compare rulesets and component systems, and open playable learning simulations.",
          [
            reference(
              "inter.game-studies.library.board-games.tic-tac-toe",
              "Tic-Tac-Toe",
              "/interdisciplines/game-studies/library/board-games/tic-tac-toe",
              "Inspect alignment, blocking, forced replies, and solved play on a three-by-three grid.",
            ),
            reference(
              "inter.game-studies.library.board-games.four-in-a-row",
              "Four in a Row",
              "/interdisciplines/game-studies/library/board-games/four-in-a-row",
              "Inspect gravity, alignment, threat creation, and move-order constraints on a vertical grid.",
            ),
            reference(
              "inter.game-studies.library.board-games.kalah",
              "Kalah",
              "/interdisciplines/game-studies/library/board-games/kalah",
              "Inspect sowing, capture, extra-turn, and endgame counting rules in a six-pit Kalah ruleset.",
            ),
          ],
        ),
        reference(
          "inter.game-studies.library.magic-the-gathering",
          "Magic: The Gathering",
          "/interdisciplines/game-studies/library/magic-the-gathering",
          "Study a customizable card game through card structure, zones, timing, deck construction, probability, and strategic adaptation.",
          [
            reference(
              "inter.game-studies.library.magic-the-gathering.fundamentals",
              "Fundamentals & Rules",
              "/interdisciplines/game-studies/library/magic-the-gathering/fundamentals",
              "Read cards as structured objects and follow zones, priority, the stack, turn structure, and format constraints.",
            ),
            reference(
              "inter.game-studies.library.magic-the-gathering.strategy",
              "Strategy & Deckbuilding",
              "/interdisciplines/game-studies/library/magic-the-gathering/strategy",
              "Treat a deck as a constrained plan shaped by resources, consistency, interaction, timing, and adaptation.",
            ),
          ],
        ),
      ],
    ),
    {
      id: "inter.game-studies.science",
      label: "Game Studies Lab",
      href: "/interdisciplines/game-studies/science",
      description:
        "Choose formal, behavioral, telemetry, interpretive, or historical methods that can support the claim a game-studies question requires.",
      domainId: "inter",
      status: "active",
      pageKind: "tool",
    },
  ],
};
