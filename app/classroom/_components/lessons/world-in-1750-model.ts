import type { HistoricalStateId } from "@/lib/maps/historical-map-adapter";

export type StateId = HistoricalStateId;

export type Lens = "government" | "geography" | "exchange";

export type StateRecord = {
  id: StateId;
  name: string;
  shortName: string;
  region: string;
  government: string;
  geography: string;
  exchange: string;
  color: string;
  mapColor: string;
  sourceYear: 1715 | 1783;
};

export const STATES: readonly StateRecord[] = [
  {
    id: "ottoman",
    name: "Ottoman Empire",
    shortName: "Ottoman",
    region: "Southeastern Europe, West Asia & North Africa",
    government:
      "A dynastic empire governed through the sultan, court, provincial officials, and varied local arrangements.",
    geography:
      "Its territory connected the eastern Mediterranean, Black Sea, Red Sea, and overland routes between regions.",
    exchange:
      "Merchants and ports linked Mediterranean, African, Asian, and European commercial networks.",
    color: "border-blue-200/25 bg-blue-300/[0.10] text-blue-100",
    mapColor: "#60a5fa",
    sourceYear: 1715,
  },
  {
    id: "mughal",
    name: "Mughal Empire",
    shortName: "Mughal",
    region: "South Asia",
    government:
      "An imperial court governed a large, diverse population through administrators, regional elites, and taxation.",
    geography:
      "Its core included fertile plains, major cities, and access to Indian Ocean commercial routes.",
    exchange:
      "Textiles, agricultural goods, and urban markets connected the empire to wide trading networks.",
    color: "border-violet-200/25 bg-violet-300/[0.10] text-violet-100",
    mapColor: "#a78bfa",
    sourceYear: 1715,
  },
  {
    id: "qing",
    name: "Qing Empire",
    shortName: "Qing",
    region: "East and Inner Asia",
    government:
      "A large bureaucratic empire ruled by the Qing dynasty through imperial institutions and provincial administration.",
    geography:
      "Expanding territory joined densely populated agricultural regions with extensive interior frontiers.",
    exchange:
      "Large internal markets and regulated foreign trade connected China to regional and global demand.",
    color: "border-cyan-200/25 bg-cyan-300/[0.10] text-cyan-100",
    mapColor: "#22d3ee",
    sourceYear: 1783,
  },
  {
    id: "tokugawa",
    name: "Tokugawa Japan",
    shortName: "Tokugawa",
    region: "Japanese archipelago",
    government:
      "The shogunate balanced central authority with regional daimyo and required political attendance in Edo.",
    geography:
      "An island setting shaped travel, defense, internal routes, and the regulation of overseas contact.",
    exchange:
      "Foreign exchange was restricted to controlled channels, while internal commerce and cities grew.",
    color: "border-sky-200/25 bg-sky-300/[0.10] text-sky-100",
    mapColor: "#38bdf8",
    sourceYear: 1783,
  },
  {
    id: "bourbon",
    name: "Bourbon France",
    shortName: "France",
    region: "Western Europe & Atlantic world",
    government:
      "A monarchy centered authority around the crown, royal officials, and an elite political world symbolized by Versailles.",
    geography:
      "A European territorial base connected to Atlantic colonies, ports, and commercial competition.",
    exchange:
      "Domestic production and Atlantic trade tied France to colonial and maritime networks.",
    color: "border-indigo-200/25 bg-indigo-300/[0.10] text-indigo-100",
    mapColor: "#818cf8",
    sourceYear: 1715,
  },
  {
    id: "ashanti",
    name: "Asante Kingdom",
    shortName: "Asante",
    region: "West Africa",
    government:
      "A centralized kingdom coordinated constituent states through the Asantehene, councils, officials, and military power.",
    geography:
      "Its forest-region position connected gold-producing areas with inland and coastal routes.",
    exchange:
      "Gold and regional commerce supported influence within West African and Atlantic trade networks.",
    color: "border-amber-200/25 bg-amber-300/[0.10] text-amber-100",
    mapColor: "#fbbf24",
    sourceYear: 1715,
  },
] as const;

export function getState(id: StateId) {
  return STATES.find((state) => state.id === id) ?? STATES[0];
}
