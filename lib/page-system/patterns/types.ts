export type PagePatternKind =
  | "topology"
  | "widget"
  | "background"
  | "adapter"
  | "card-grammar"
  | "instrument"
  | "design-token";

export type PagePattern = {
  id: string;
  label: string;
  kind: PagePatternKind;
  description: string;
  sourcePage: string;
  scope: "global" | "domain" | "branch" | "page";
  component?: string;
  parameters: string[];
};
