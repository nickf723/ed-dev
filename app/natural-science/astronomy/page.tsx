import DomainPageHeader from "@/app/_components/DomainPageHeader";
import GalacticExpeditionBackground from "@/app/_page-system/backgrounds/GalacticExpeditionBackground";
import SceneFrame from "@/app/_page-system/scene/SceneFrame";
import WorldWindow from "@/app/_page-system/scene/WorldWindow";
import ExpeditionRouteTopology, {
  type ExpeditionStop,
} from "@/app/_page-system/topologies/ExpeditionRouteTopology";
import LightTravelTime, {
  type LightTravelExample,
} from "@/app/_page-system/widgets/LightTravelTime";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import { Telescope } from "lucide-react";
import AstronomySignalLab from "./AstronomySignalLab";

const NODE_ID = "natural.astronomy";

type AstronomyMeta = {
  scaleLabel?: string;
  icon: ExpeditionStop["icon"];
  scene: "local" | "galaxy" | "web";
  rgb: string;
  kind: "destination" | "method";
};

const META: Record<string, AstronomyMeta> = {
  "natural.astronomy.planetary": {
    scaleLabel: "worlds · moons · systems",
    icon: "orbit",
    scene: "local",
    rgb: "34, 211, 238",
    kind: "destination",
  },
  "natural.astronomy.stellar": {
    scaleLabel: "stars · formation · evolution",
    icon: "sparkles",
    scene: "local",
    rgb: "250, 204, 21",
    kind: "destination",
  },
  "natural.astronomy.galactic": {
    scaleLabel: "galaxies · structure · dynamics",
    icon: "aperture",
    scene: "galaxy",
    rgb: "52, 211, 153",
    kind: "destination",
  },
  "natural.astronomy.extragalactic": {
    scaleLabel: "populations · clusters · filaments",
    icon: "aperture",
    scene: "web",
    rgb: "192, 132, 252",
    kind: "destination",
  },
  "natural.astronomy.cosmology": {
    scaleLabel: "origin · expansion · whole universe",
    icon: "sigma",
    scene: "web",
    rgb: "244, 114, 182",
    kind: "destination",
  },
  "natural.astronomy.methods": {
    icon: "eye",
    scene: "local",
    rgb: "96, 165, 250",
    kind: "method",
  },
};

const ASTRONOMY_SCENES = [
  {
    id: "local",
    label: "Local systems",
    description: "Orbiting worlds, stellar motion, and nearby physical scale.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "galaxy",
    label: "Galactic survey",
    description: "Differential rotation, dust, lensing, and stellar populations.",
    accentRgb: "167, 139, 250",
  },
  {
    id: "web",
    label: "Cosmic web",
    description: "Clusters and filaments emerging across the largest scales.",
    accentRgb: "244, 114, 182",
  },
] as const;

const LIGHT_TIMES: LightTravelExample[] = [
  {
    id: "moon",
    label: "Moon",
    travelTime: "1.3 seconds",
    distance: "384,400 km",
    note: "The lunar surface appears as it was roughly 1.3 seconds earlier.",
    accentRgb: "203, 213, 225",
  },
  {
    id: "sun",
    label: "Sun",
    travelTime: "8 min 20 sec",
    distance: "1 astronomical unit",
    note: "Every view of the Sun is a report carried across space for more than eight minutes.",
    accentRgb: "250, 204, 21",
  },
  {
    id: "proxima",
    label: "Proxima Centauri",
    travelTime: "4.24 years",
    distance: "4.24 light-years",
    note: "The nearest star beyond the Sun is already being observed several years in its past.",
    accentRgb: "248, 113, 113",
  },
  {
    id: "andromeda",
    label: "Andromeda Galaxy",
    travelTime: "about 2.5 million years",
    distance: "about 2.5 million light-years",
    note: "Andromeda appears as it was long before our species began recording history.",
    accentRgb: "167, 139, 250",
  },
  {
    id: "cmb",
    label: "Cosmic microwave background",
    travelTime: "about 13.8 billion years",
    distance: "the early observable universe",
    note: "This oldest observable light was released when the young universe first became transparent.",
    accentRgb: "34, 211, 238",
  },
];

export default function AstronomyHub() {
  const context = requireCurriculumPageContext(NODE_ID);
  const destinations: ExpeditionStop[] = context.children
    .filter((child) => META[child.id]?.kind === "destination")
    .map((child) => {
      const meta = META[child.id];
      return {
        id: child.id,
        label: child.label,
        scaleLabel: meta.scaleLabel ?? "cosmic scale",
        summary: child.description ?? "",
        accentRgb: meta.rgb,
        icon: meta.icon,
        scene: meta.scene,
        href: child.href,
        status: child.status === "placeholder" ? "planned" : "active",
      };
    });
  const methods = context.children.find(
    (child) => META[child.id]?.kind === "method",
  );

  return (
    <SceneFrame
      background={<GalacticExpeditionBackground />}
      className="bg-[#010208] text-slate-100 selection:bg-violet-400/[0.25]"
      initialScene="local"
      maxWidthClassName="max-w-[1580px]"
      headerBackground="rgba(2,4,14,0.56)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Astronomy" },
          ]}
          eyebrow="Cosmic scale · arriving signals · physical inference"
          eyebrowStyle="dot"
          icon={Telescope}
          title={<span>Astronomy</span>}
          subtitle="Travel outward from nearby worlds to the observable universe, then follow the evidence back through light, instruments, and physical models."
          accentRgb="167, 139, 250"
          titleClassName="font-sans text-[clamp(3rem,5.8vw,6.6rem)] font-semibold leading-[0.82] tracking-[-0.068em] text-[#faf9ff]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-5">
        <WorldWindow
          eyebrow="Interactive observatory · direct branches by scale"
          title="Choose the scale of universe you want to investigate."
          description="The academic route moves from worlds and stars to galaxies, cosmic structure, and the universe as a whole. Hovering a field previews its scale in the observatory controls while the moving universe remains exposed."
          scenes={[...ASTRONOMY_SCENES]}
        >
          <ExpeditionRouteTopology
            title="Choose the scale of universe you want to investigate."
            description="The direct branches of astronomy move outward by scale."
            stops={destinations}
            presentation="world"
          />
        </WorldWindow>
      </section>

      <section className="mt-8">
        <AstronomySignalLab
          methods={
            methods
              ? {
                  href: methods.href,
                  status: methods.status,
                  description: methods.description ?? "",
                }
              : undefined
          }
        />
      </section>

      <section className="mt-8">
        <LightTravelTime examples={LIGHT_TIMES} />
      </section>
    </SceneFrame>
  );
}
