import type { ReactNode } from "react";
import TechnologyHub from "./TechnologyHub";
import TechnologyRouteBoundary from "./TechnologyRouteBoundary";

export default function TechnologyLayout({ children }: { children: ReactNode }) {
  return <TechnologyRouteBoundary hub={<TechnologyHub />}>{children}</TechnologyRouteBoundary>;
}
