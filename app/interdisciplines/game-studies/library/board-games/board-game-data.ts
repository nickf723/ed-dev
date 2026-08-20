export type BoardGameFamily = "alignment" | "connection" | "sowing";
export type BoardGameSimulatorId = "tic-tac-toe" | "four-in-a-row" | "kalah";

export type BoardGameComponent = {
  item: string;
  quantity: string;
  purpose: string;
};

export type BoardGameRules = {
  objective: string;
  setup: readonly string[];
  turn: readonly string[];
  ending: readonly string[];
};

export type BoardGameRecord = {
  slug: string;
  title: string;
  aliases: readonly string[];
  subtitle: string;
  family: BoardGameFamily;
  familyLabel: string;
  accentRgb: string;
  players: string;
  duration: string;
  complexity: "introductory" | "light";
  summary: string;
  modelFocus: string;
  mechanics: readonly string[];
  components: readonly BoardGameComponent[];
  rules: BoardGameRules;
  simulator: BoardGameSimulatorId;
  rulesetNote: string;
};

export const BOARD_GAMES: readonly BoardGameRecord[] = [
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    aliases: ["Noughts and Crosses", "Xs and Os"],
    subtitle: "Three-in-a-row alignment game",
    family: "alignment",
    familyLabel: "Alignment",
    accentRgb: "56,189,248",
    players: "2",
    duration: "1–5 min",
    complexity: "introductory",
    summary:
      "A compact perfect-information game for examining alignment, blocking, forks, forced replies, symmetry, and solved play.",
    modelFocus:
      "Small state spaces make it possible to see how one move can create several future threats at once.",
    mechanics: ["placement", "alignment", "perfect information", "forced replies"],
    components: [
      { item: "Three-by-three board", quantity: "1", purpose: "Defines the nine legal spaces and eight possible winning lines." },
      { item: "X markers", quantity: "5", purpose: "One player's pieces; five are enough to fill every X turn in a full game." },
      { item: "O markers", quantity: "4–5", purpose: "The other player's pieces; physical sets often include a spare." },
    ],
    rules: {
      objective: "Be the first player to place three of your marks in one horizontal, vertical, or diagonal line.",
      setup: [
        "Place an empty three-by-three grid between the two players.",
        "Choose one player to use X and the other to use O. X moves first in this model.",
      ],
      turn: [
        "Place one mark in any empty space.",
        "Marks never move or leave the board after placement.",
        "Players alternate turns unless the game has already ended.",
      ],
      ending: [
        "A player wins immediately when three of their marks share a row, column, or diagonal.",
        "If all nine spaces fill without a winning line, the game is a draw.",
      ],
    },
    simulator: "tic-tac-toe",
    rulesetNote: "This page models the common three-by-three ruleset with X moving first.",
  },
  {
    slug: "four-in-a-row",
    title: "Four in a Row",
    aliases: ["Connect Four", "Four Up", "4 in a Row"],
    subtitle: "Gravity-constrained connection game",
    family: "connection",
    familyLabel: "Connection",
    accentRgb: "250,204,21",
    players: "2",
    duration: "10–20 min",
    complexity: "light",
    summary:
      "A vertical connection game where gravity constrains placement, turning support, move order, and intersecting threats into part of the strategy.",
    modelFocus:
      "A desired space may be unavailable until the spaces below it are filled, so every move changes both position and access.",
    mechanics: ["connection", "gravity", "alternating placement", "threat building"],
    components: [
      { item: "Seven-column, six-row grid", quantity: "1", purpose: "Holds pieces vertically and makes gravity part of every legal move." },
      { item: "Light player discs", quantity: "21", purpose: "One player's complete supply for a forty-two-space grid." },
      { item: "Dark player discs", quantity: "21", purpose: "The other player's complete supply." },
    ],
    rules: {
      objective: "Be the first player to connect four of your discs horizontally, vertically, or diagonally.",
      setup: [
        "Place the empty grid upright between the players.",
        "Give each player one color of disc and choose the starting player.",
      ],
      turn: [
        "Choose a column that is not full.",
        "Drop one disc into that column; it occupies the lowest empty space.",
        "Players then alternate turns.",
      ],
      ending: [
        "A player wins immediately when four or more of their discs form one continuous line.",
        "If all forty-two spaces fill without a connection of four, the game is a draw.",
      ],
    },
    simulator: "four-in-a-row",
    rulesetNote: "This page models a generic seven-column by six-row four-in-a-row ruleset; commercial editions may package the grid differently.",
  },
  {
    slug: "kalah",
    title: "Kalah",
    aliases: ["Mancala", "Kalah Mancala"],
    subtitle: "Six-pit sowing and capture game",
    family: "sowing",
    familyLabel: "Sowing",
    accentRgb: "251,146,60",
    players: "2",
    duration: "10–20 min",
    complexity: "light",
    summary:
      "A mancala-family game built around distributing stones, planning where the final stone lands, earning extra turns, and timing captures.",
    modelFocus:
      "The last stone determines the consequence of a move, so counting forward is the central planning action.",
    mechanics: ["sowing", "counting", "capture", "extra turns", "collection"],
    components: [
      { item: "Kalah board", quantity: "1", purpose: "Provides two rows of six pits and one scoring store for each player." },
      { item: "Stones or seeds", quantity: "48", purpose: "Starts four pieces in each of the twelve ordinary pits." },
    ],
    rules: {
      objective: "Collect more stones in your store than the other player collects in theirs.",
      setup: [
        "Orient the board so each player controls the six pits nearest them and the store on their right.",
        "Place four stones in each ordinary pit. Leave both stores empty.",
      ],
      turn: [
        "Choose one nonempty pit on your side, remove all its stones, and sow them one at a time into following spaces.",
        "Include your own store while sowing, but skip the opponent's store.",
        "If the last stone lands in your store, take another turn.",
        "If the last stone lands in an empty pit on your side and the opposite pit holds stones, move both the last stone and the opposite stones into your store.",
      ],
      ending: [
        "The game ends when all six pits on either player's side are empty.",
        "Move every stone remaining on the other side into that player's store.",
        "The player with more stones in their store wins; equal totals produce a draw.",
      ],
    },
    simulator: "kalah",
    rulesetNote: "Mancala names a large family of games. This page specifically models six-pit Kalah with four stones per pit.",
  },
] as const;

export function getBoardGame(slug: string): BoardGameRecord | undefined {
  return BOARD_GAMES.find((game) => game.slug === slug);
}

export function boardGameHref(slug: string): string {
  return `/humanities/gaming/repository/board-games/${slug}`;
}
