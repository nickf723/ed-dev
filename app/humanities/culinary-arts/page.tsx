"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Carrot,
  ChefHat,
  Dna,
  Droplets,
  Flame,
  FlaskConical,
  HeartPulse,
  Leaf,
  Microscope,
  Snowflake,
  Sparkles,
  UtensilsCrossed,
  Wheat,
  Wind,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import CulinaryBackground from "./CulinaryBackground";

type Technique = {
  id: string;
  label: string;
  icon: LucideIcon;
  rgb: string;
  medium: string;
  energy: string;
  change: string;
  result: string;
  detail: string;
  controls: readonly string[];
};

type Flavor = {
  id: string;
  label: string;
  rgb: string;
  role: string;
  counterpoint: string;
};

type CulinaryLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  rgb: string;
  note: string;
};

const TECHNIQUES: readonly Technique[] = [
  {
    id: "sear",
    label: "Sear",
    icon: Flame,
    rgb: "251, 113, 133",
    medium: "Dry surface",
    energy: "Very high heat",
    change: "Maillard browning",
    result: "Crust + aroma",
    detail:
      "Fast surface heating creates hundreds of aromatic compounds while keeping the interior comparatively protected.",
    controls: ["surface dryness", "pan contact", "temperature"],
  },
  {
    id: "roast",
    label: "Roast",
    icon: Flame,
    rgb: "251, 146, 60",
    medium: "Hot air",
    energy: "Steady dry heat",
    change: "Browning + moisture loss",
    result: "Concentrated flavor",
    detail:
      "Longer dry heating gradually removes water, browns exposed surfaces, and concentrates sweetness and savory aromas.",
    controls: ["airflow", "exposure", "time"],
  },
  {
    id: "braise",
    label: "Braise",
    icon: Droplets,
    rgb: "96, 165, 250",
    medium: "Liquid + steam",
    energy: "Gentle heat",
    change: "Collagen conversion",
    result: "Tender + rich",
    detail:
      "Time, moisture, and moderate heat soften connective tissue and let flavor move between the cooking liquid and the food.",
    controls: ["moisture", "temperature", "time"],
  },
  {
    id: "steam",
    label: "Steam",
    icon: Wind,
    rgb: "34, 211, 238",
    medium: "Water vapor",
    energy: "Condensing heat",
    change: "Rapid moist cooking",
    result: "Clean + delicate",
    detail:
      "Condensing steam transfers heat efficiently without submerging food, preserving moisture and many delicate aromas.",
    controls: ["vapor flow", "distance", "doneness"],
  },
  {
    id: "chill",
    label: "Chill",
    icon: Snowflake,
    rgb: "129, 140, 248",
    medium: "Cold",
    energy: "Heat removal",
    change: "Setting + crystallization",
    result: "Structure + contrast",
    detail:
      "Cooling can set fats, gels, custards, and frozen mixtures while changing texture, aroma release, and perceived sweetness.",
    controls: ["temperature", "crystal size", "setting time"],
  },
  {
    id: "ferment",
    label: "Ferment",
    icon: FlaskConical,
    rgb: "163, 230, 53",
    medium: "Microbial culture",
    energy: "Time",
    change: "Biochemical conversion",
    result: "Acid + complexity",
    detail:
      "Microorganisms transform sugars and other compounds into acids, gases, alcohols, and a much larger flavor vocabulary.",
    controls: ["culture", "environment", "time"],
  },
];

const FLAVORS: readonly Flavor[] = [
  {
    id: "salt",
    label: "Salt",
    rgb: "125, 211, 252",
    role: "Amplifies flavor and changes how bitterness, sweetness, and aroma are perceived.",
    counterpoint: "Useful against blandness, excess bitterness, and watery foods.",
  },
  {
    id: "acid",
    label: "Acid",
    rgb: "190, 242, 100",
    role: "Adds brightness and contrast, especially when a dish feels heavy, flat, or overly rich.",
    counterpoint: "Often balances fat, sweetness, starch, and slow-cooked richness.",
  },
  {
    id: "fat",
    label: "Fat",
    rgb: "253, 224, 71",
    role: "Carries aroma, softens harsh edges, and creates richness, lubrication, and body.",
    counterpoint: "Often benefits from acid, bitterness, heat, or fresh aromatics.",
  },
  {
    id: "sweet",
    label: "Sweet",
    rgb: "244, 114, 182",
    role: "Provides roundness while tempering acidity, bitterness, salt, and aggressive spice.",
    counterpoint: "Useful as a balancing note even in dishes that are not desserts.",
  },
  {
    id: "bitter",
    label: "Bitter",
    rgb: "167, 139, 250",
    role: "Adds depth, dryness, and contrast through greens, char, coffee, cocoa, hops, and spices.",
    counterpoint: "Can be rounded by salt, sweetness, fat, or careful dilution.",
  },
  {
    id: "umami",
    label: "Umami",
    rgb: "251, 146, 60",
    role: "Builds savory depth through glutamates and nucleotides in aged, fermented, roasted, and protein-rich foods.",
    counterpoint: "Layers especially well with salt, browning, mushrooms, tomatoes, and stocks.",
  },
];

const CULINARY_LINKS: readonly CulinaryLink[] = [
  {
    label: "Agriculture",
    href: "/applied-science/agriculture",
    icon: Wheat,
    rgb: "74, 222, 128",
    note: "ingredients begin here",
  },
  {
    label: "Chemistry",
    href: "/natural-science/chemistry",
    icon: FlaskConical,
    rgb: "34, 211, 238",
    note: "reactions & flavor",
  },
  {
    label: "Biology",
    href: "/natural-science/biology",
    icon: Dna,
    rgb: "52, 211, 153",
    note: "tissues & microbes",
  },
  {
    label: "Botany",
    href: "/natural-science/biology/botany",
    icon: Leaf,
    rgb: "132, 204, 22",
    note: "edible plants",
  },
  {
    label: "Mycology",
    href: "/natural-science/biology/mycology",
    icon: Microscope,
    rgb: "192, 132, 252",
    note: "fungi & fermentation",
  },
  {
    label: "Culture",
    href: "/humanities/culture",
    icon: BookOpen,
    rgb: "251, 191, 36",
    note: "cuisine & tradition",
  },
  {
    label: "Health Sciences",
    href: "/applied-science/health",
    icon: HeartPulse,
    rgb: "251, 113, 133",
    note: "food & the body",
  },
  {
    label: "Business",
    href: "/applied-science/business",
    icon: Briefcase,
    rgb: "52, 211, 153",
    note: "restaurants & supply",
  },
];

export default function CulinaryHub() {
  const [activeTechniqueId, setActiveTechniqueId] = useState("sear");
  const [activeFlavorId, setActiveFlavorId] = useState("acid");

  const activeTechnique =
    TECHNIQUES.find((item) => item.id === activeTechniqueId) ?? TECHNIQUES[0];
  const activeFlavor = FLAVORS.find((item) => item.id === activeFlavorId) ?? FLAVORS[0];
  const ActiveTechniqueIcon = activeTechnique.icon;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#140d08] text-stone-100 selection:bg-orange-400/25 xl:h-screen xl:overflow-hidden">
      <CulinaryBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_18%,rgba(251,146,60,0.13),transparent_28%),radial-gradient(circle_at_18%_84%,rgba(163,230,53,0.06),transparent_28%),linear-gradient(to_bottom,rgba(20,13,8,0.15),rgba(12,8,6,0.64))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-30 [background-image:linear-gradient(rgba(251,146,60,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.025)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 xl:h-screen xl:min-h-0 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Humanities", href: "/humanities" },
            { label: "Culinary Arts" },
          ]}
          eyebrow="Ingredient · Technique · Transformation · Taste"
          icon={ChefHat}
          title={<span>Culinary Arts</span>}
          subtitle="Cook by understanding what heat, time, water, microbes, ingredients, and seasoning actually do to food."
          accentRgb="251, 146, 60"
          titleClassName="font-serif text-[clamp(3.2rem,5.8vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-[#fff8ef]"
          iconClassName="rounded-[18px]"
          headerClassName="border-orange-300/16"
        />

        <section className="mt-4 grid min-h-0 flex-1 gap-3 xl:grid-cols-12 xl:grid-rows-[minmax(0,1fr)_220px]">
          <section className="relative min-h-0 overflow-hidden rounded-[26px] border border-orange-200/16 bg-black/[0.25] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-5 xl:col-span-8">
            <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1.4px)] [background-size:24px_24px]" />
            <div
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: `rgba(${activeTechnique.rgb},0.09)` }}
            />

            <div className="relative flex h-full min-h-0 flex-col">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-orange-300/65">
                    Heat & transformation
                  </div>
                  <p className="mt-1 text-[10px] text-stone-600">
                    Change the energy pathway and the same ingredient becomes different food.
                  </p>
                </div>
                <Sparkles size={16} className="text-orange-300/35" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {TECHNIQUES.map((technique) => {
                  const Icon = technique.icon;
                  const selected = technique.id === activeTechnique.id;
                  return (
                    <button
                      key={technique.id}
                      type="button"
                      onClick={() => setActiveTechniqueId(technique.id)}
                      onMouseEnter={() => setActiveTechniqueId(technique.id)}
                      className="group flex min-w-0 flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5 transition-all"
                      style={{
                        color: selected ? `rgb(${technique.rgb})` : "rgb(120 113 108)",
                        borderColor: selected
                          ? `rgba(${technique.rgb},0.40)`
                          : "rgba(255,255,255,0.055)",
                        background: selected
                          ? `rgba(${technique.rgb},0.085)`
                          : "rgba(0,0,0,0.18)",
                      }}
                    >
                      <Icon size={15} strokeWidth={1.55} />
                      <span className="truncate font-mono text-[7px] uppercase tracking-[0.1em]">
                        {technique.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-[158px_minmax(0,1fr)]">
                <div
                  className="relative flex min-h-[155px] items-center justify-center overflow-hidden rounded-[20px] border"
                  style={{
                    borderColor: `rgba(${activeTechnique.rgb},0.22)`,
                    background: `radial-gradient(circle at center, rgba(${activeTechnique.rgb},0.12), rgba(10,7,5,0.78) 58%, rgba(7,5,4,0.86))`,
                  }}
                >
                  <div
                    className="absolute h-28 w-28 rounded-full border"
                    style={{ borderColor: `rgba(${activeTechnique.rgb},0.12)` }}
                  />
                  <div
                    className="absolute h-20 w-20 rounded-full border"
                    style={{ borderColor: `rgba(${activeTechnique.rgb},0.18)` }}
                  />
                  <div
                    className="absolute h-12 w-12 rounded-full border"
                    style={{ borderColor: `rgba(${activeTechnique.rgb},0.26)` }}
                  />
                  <ActiveTechniqueIcon
                    size={31}
                    strokeWidth={1.25}
                    style={{ color: `rgb(${activeTechnique.rgb})` }}
                  />
                  <div
                    className="absolute bottom-3 font-mono text-[7px] uppercase tracking-[0.18em]"
                    style={{ color: `rgba(${activeTechnique.rgb},0.72)` }}
                  >
                    {activeTechnique.label}
                  </div>
                </div>

                <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-2.5">
                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      ["Medium", activeTechnique.medium],
                      ["Energy", activeTechnique.energy],
                      ["Change", activeTechnique.change],
                      ["Result", activeTechnique.result],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                      >
                        <div className="font-mono text-[6px] uppercase tracking-[0.14em] text-stone-600">
                          {label}
                        </div>
                        <div className="mt-1 text-[10px] font-semibold text-stone-200">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold tracking-[-0.03em] text-white">
                        {activeTechnique.label}
                      </h2>
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: `rgb(${activeTechnique.rgb})` }}
                      />
                    </div>
                    <p className="mt-2 max-w-2xl text-[11px] leading-5 text-stone-400">
                      {activeTechnique.detail}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 font-mono text-[6px] uppercase tracking-[0.14em] text-stone-700">
                      Control
                    </span>
                    {activeTechnique.controls.map((control) => (
                      <span
                        key={control}
                        className="rounded-full border px-2 py-1 font-mono text-[6px] uppercase tracking-[0.08em]"
                        style={{
                          color: `rgba(${activeTechnique.rgb},0.78)`,
                          borderColor: `rgba(${activeTechnique.rgb},0.15)`,
                          background: `rgba(${activeTechnique.rgb},0.035)`,
                        }}
                      >
                        {control}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="grid min-h-0 gap-3 xl:col-span-4 xl:grid-rows-[auto_auto_minmax(0,1fr)]">
            <ResourceCard
              href="/humanities/culinary-arts/recipes"
              icon={UtensilsCrossed}
              rgb="251, 146, 60"
              title="Recipe Library"
              subtitle="Cook from dishes"
              description="Search the full recipe catalog by cuisine, station, ingredient, and dish name."
            />
            <ResourceCard
              href="/humanities/culinary-arts/market"
              icon={Carrot}
              rgb="74, 222, 128"
              title="Ingredient Atlas"
              subtitle="Cook from ingredients"
              description="Inspect ingredients, transformations, pairings, storage, roles, and prepared foods."
            />

            <div className="relative overflow-hidden rounded-[20px] border border-orange-200/12 bg-[#0c0806]/78 p-4 backdrop-blur-xl">
              <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-orange-300/55">
                A dish is a system
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5">
                {["ingredient", "technique", "season", "serve"].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-lg border border-white/[0.055] bg-white/[0.018] px-2 py-2 text-center"
                  >
                    <span className="block font-mono text-[6px] text-orange-300/45">
                      0{index + 1}
                    </span>
                    <span className="mt-1 block text-[7px] font-semibold uppercase tracking-[0.06em] text-stone-500">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[9px] leading-4 text-stone-600">
                Texture, aroma, temperature, flavor, presentation, and culture emerge from how the variables interact.
              </p>
            </div>
          </aside>

          <section className="relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-black/[0.26] p-4 backdrop-blur-xl xl:col-span-7">
            <div className="grid h-full gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="min-w-0">
                <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-orange-300/60">
                  Flavor balance
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {FLAVORS.map((flavor) => {
                    const selected = flavor.id === activeFlavor.id;
                    return (
                      <button
                        key={flavor.id}
                        type="button"
                        onClick={() => setActiveFlavorId(flavor.id)}
                        onMouseEnter={() => setActiveFlavorId(flavor.id)}
                        className="rounded-xl border px-2 py-2.5 text-center transition-all"
                        style={{
                          color: selected ? `rgb(${flavor.rgb})` : "rgb(120 113 108)",
                          borderColor: selected
                            ? `rgba(${flavor.rgb},0.36)`
                            : "rgba(255,255,255,0.055)",
                          background: selected
                            ? `rgba(${flavor.rgb},0.075)`
                            : "rgba(0,0,0,0.16)",
                        }}
                      >
                        <span className="font-mono text-[7px] uppercase tracking-[0.1em]">
                          {flavor.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/[0.055] bg-white/[0.015] px-2.5 py-1.5 text-[7px] text-stone-600">
                    taste
                  </span>
                  <span className="rounded-full border border-white/[0.055] bg-white/[0.015] px-2.5 py-1.5 text-[7px] text-stone-600">
                    aroma
                  </span>
                  <span className="rounded-full border border-white/[0.055] bg-white/[0.015] px-2.5 py-1.5 text-[7px] text-stone-600">
                    texture
                  </span>
                  <span className="rounded-full border border-white/[0.055] bg-white/[0.015] px-2.5 py-1.5 text-[7px] text-stone-600">
                    temperature
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.065] bg-white/[0.02] p-3.5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: `rgb(${activeFlavor.rgb})` }}
                  />
                  <h2 className="text-sm font-semibold text-white">{activeFlavor.label}</h2>
                </div>
                <p className="mt-2 text-[9px] leading-4 text-stone-400">
                  {activeFlavor.role}
                </p>
                <p className="mt-2 border-t border-white/[0.055] pt-2 text-[8px] leading-4 text-stone-600">
                  {activeFlavor.counterpoint}
                </p>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[22px] border border-amber-200/10 bg-black/[0.24] p-4 backdrop-blur-xl xl:col-span-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-amber-300/55">
                  Beyond the kitchen
                </div>
                <p className="mt-1 text-[9px] text-stone-650">
                  Follow food outward into the sciences, culture, health, and production.
                </p>
              </div>
              <ArrowRight size={13} className="text-amber-300/25" />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CULINARY_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-xl border border-white/[0.055] bg-white/[0.015] p-2.5 transition-colors hover:bg-white/[0.035]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Icon size={13} strokeWidth={1.5} style={{ color: `rgb(${item.rgb})` }} />
                      <ArrowRight
                        size={9}
                        className="text-stone-700 transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                    <div className="mt-2 truncate text-[9px] font-semibold text-stone-300">
                      {item.label}
                    </div>
                    <div className="mt-0.5 truncate font-mono text-[6px] uppercase tracking-[0.08em] text-stone-700">
                      {item.note}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function ResourceCard({
  href,
  icon: Icon,
  rgb,
  title,
  subtitle,
  description,
}: {
  href: string;
  icon: LucideIcon;
  rgb: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group relative grid min-h-[112px] grid-cols-[42px_minmax(0,1fr)_22px] items-center gap-3 overflow-hidden rounded-[20px] border p-4 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: `rgba(${rgb},0.22)`,
        background: `linear-gradient(145deg, rgba(${rgb},0.09), rgba(10,7,5,0.78) 52%, rgba(7,5,4,0.68))`,
      }}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl border"
        style={{
          color: `rgb(${rgb})`,
          borderColor: `rgba(${rgb},0.30)`,
          background: `rgba(${rgb},0.065)`,
        }}
      >
        <Icon size={18} strokeWidth={1.55} />
      </span>
      <div className="min-w-0">
        <div
          className="font-mono text-[6px] uppercase tracking-[0.13em]"
          style={{ color: `rgba(${rgb},0.76)` }}
        >
          {subtitle}
        </div>
        <h2 className="mt-1 text-base font-semibold tracking-[-0.03em] text-white">
          {title}
        </h2>
        <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-stone-600">
          {description}
        </p>
      </div>
      <ArrowRight
        size={14}
        style={{ color: `rgb(${rgb})` }}
        className="transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}
