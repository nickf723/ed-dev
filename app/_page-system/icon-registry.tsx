import {
  ArrowRight,
  Atom,
  BookOpen,
  CircleDashed,
  Clock,
  Flame,
  Gauge,
  Globe2,
  Hourglass,
  Lightbulb,
  Map,
  Microscope,
  Network,
  Orbit,
  RefreshCw,
  Shapes,
  Sparkles,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  ArrowRight,
  Atom,
  BookOpen,
  CircleDashed,
  Clock,
  Flame,
  Gauge,
  Globe2,
  Hourglass,
  Lightbulb,
  Map,
  Microscope,
  Network,
  Orbit,
  RefreshCw,
  Shapes,
  Sparkles,
  Waves,
  Zap,
};

export const PAGE_ICON_OPTIONS = Object.keys(ICONS).sort();

export function resolvePageIcon(name: string): LucideIcon {
  return ICONS[name] ?? Shapes;
}
