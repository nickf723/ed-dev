"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Apple,
  ArrowRight,
  Beef,
  Carrot,
  ChefHat,
  Droplets,
  Fish,
  Flame,
  FlaskConical,
  ShieldCheck,
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
  bestFor: string;
  watchFor: string;
  examples: readonly string[];
};

type Taste = {
  id: string;
  label: string;
  rgb: string;
  role: string;
  balance: string;
  examples: readonly string[];
};

type WorkflowStep = {
  label: string;
  note: string;
  icon: LucideIcon;
  rgb: string;
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
      "Fast surface heating creates aromatic browning while limiting how far heat penetrates into the interior.",
    controls: ["surface dryness", "pan contact", "temperature"],
    bestFor: "Foods that benefit from a browned exterior and a distinct interior texture.",
    watchFor: "Crowding, wet surfaces, or weak heat can turn searing into steaming.",
    examples: ["steak", "mushrooms", "scallops", "tofu"],
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
      "Dry oven heat gradually removes water, browns exposed surfaces, and concentrates sweetness and savory aromas.",
    controls: ["oven heat", "airflow", "surface area"],
    bestFor: "Vegetables, meats, nuts, and other foods that improve with broad dry heating.",
    watchFor: "Uneven size or blocked airflow creates uneven browning and doneness.",
    examples: ["potatoes", "chicken", "carrots", "nuts"],
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
      "Time, moisture, and moderate heat soften connective tissue while moving flavor between food and cooking liquid.",
    controls: ["liquid level", "time", "gentle heat"],
    bestFor: "Tough cuts, dense vegetables, and dishes where the cooking liquid becomes part of the result.",
    watchFor: "A hard boil can toughen proteins and reduce the liquid before the food becomes tender.",
    examples: ["short ribs", "beans", "cabbage", "chicken thighs"],
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
      "Condensing steam transfers heat efficiently without submerging food, helping delicate ingredients retain moisture.",
    controls: ["steam flow", "size", "doneness"],
    bestFor: "Delicate vegetables, fish, dumplings, grains, and preparations where moisture retention matters.",
    watchFor: "Condensation, overcooking, and tightly packed food can produce soggy or uneven results.",
    examples: ["dumplings", "broccoli", "fish", "rice"],
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
      "Cooling sets fats, gels, custards, and frozen mixtures while changing texture, aroma release, and perceived sweetness.",
    controls: ["cooling rate", "fat", "water"],
    bestFor: "Custards, doughs, gels, frozen desserts, and anything whose structure depends on temperature.",
    watchFor: "Large ice crystals, condensation, or chilling too slowly can damage texture and food safety.",
    examples: ["ice cream", "ganache", "custard", "pastry dough"],
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
      "Microorganisms transform sugars and other compounds into acids, gases, alcohols, and a larger flavor vocabulary.",
    controls: ["culture", "salt", "time"],
    bestFor: "Foods where microbes can build acidity, gas, preservation, aroma, or new texture.",
    watchFor: "Temperature, contamination, salinity, and oxygen can shift which organisms dominate the process.",
    examples: ["bread", "yogurt", "kimchi", "pickles"],
  },
];

const TASTES: readonly Taste[] = [
  {
    id: "sweet",
    label: "Sweet",
    rgb: "244, 114, 182",
    role: "Signals sugars and rounds harsh, bitter, sour, or spicy sensations.",
    balance: "Sweetness can soften sourness and bitterness, but too much can flatten savory complexity.",
    examples: ["fruit", "honey", "caramel"],
  },
  {
    id: "salty",
    label: "Salty",
    rgb: "125, 211, 252",
    role: "Signals dissolved salts and often increases the apparent intensity of other flavors.",
    balance: "Salt can reduce perceived bitterness and make otherwise muted foods taste more complete.",
    examples: ["salt", "soy sauce", "cured foods"],
  },
  {
    id: "sour",
    label: "Sour",
    rgb: "190, 242, 100",
    role: "Signals acidity and adds brightness, contrast, and salivation.",
    balance: "Sourness is especially useful against sweetness, richness, starch, and slow-cooked heaviness.",
    examples: ["citrus", "vinegar", "yogurt"],
  },
  {
    id: "bitter",
    label: "Bitter",
    rgb: "167, 139, 250",
    role: "Adds dryness, depth, and complexity through many plant compounds and browned foods.",
    balance: "Bitterness is often moderated by sweetness, salt, fat, or dilution rather than eliminated entirely.",
    examples: ["coffee", "cocoa", "greens"],
  },
  {
    id: "umami",
    label: "Umami",
    rgb: "251, 146, 60",
    role: "Signals glutamates and related savory compounds, contributing depth and mouth-filling savoriness.",
    balance: "Umami layers readily with salt, browning, fermentation, mushrooms, tomatoes, meat, and stocks.",
    examples: ["mushrooms", "tomato", "aged cheese"],
  },
];

const WORKFLOW: readonly WorkflowStep[] = [
  {
    label: "Select",
    note: "quality · ripeness · season",
    icon: Carrot,
    rgb: "74, 222, 128",
  },
  {
    label: "Prepare",
    note: "clean · cut · portion",
    icon: ChefHat,
    rgb: "251, 191, 36",
  },
  {
    label: "Transform",
    note: "heat · moisture · time",
    icon: Flame,
    rgb: "251, 113, 133",
  },
  {
    label: "Season",
    note: "taste · aroma · contrast",
    icon: Droplets,
    rgb: "190, 242, 100",
  },
  {
    label: "Finish",
    note: "texture · temperature · plate",
    icon: Sparkles,
    rgb: "251, 146, 60",
  },
  {
    label: "Serve / Store",
    note: "timing · holding · safety",
    icon: Snowflake,
    rgb: "129, 140, 248",
  },
];

export default function CulinaryHub() {
  const [activeTechniqueId, setActiveTechniqueId] = useState("sear");
  const [activeTasteId, setActiveTasteId] = useState("sour");
  const activeTechnique = TECHNIQUES.find((item) => item.id === activeTechniqueId) ?? TECHNIQUES[0];
  const activeTaste = TASTES.find((item) => item.id === activeTasteId) ?? TASTES[0];
  const ActiveTechniqueIcon = activeTechnique.icon;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#140d08] text-stone-100 selection:bg-orange-400/25">
      <CulinaryBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_18%,rgba(251,146,60,0.13),transparent_28%),radial-gradient(circle_at_18%_84%,rgba(163,230,53,0.06),transparent_28%),linear-gradient(to_bottom,rgba(20,13,8,0.15),rgba(12,8,6,0.66))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-25 [background-image:linear-gradient(rgba(251,146,60,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.025)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden text-orange-100">
        <Apple className="absolute left-[5%] top-[35%] h-16 w-16 rotate-[-18deg] opacity-[0.035]" strokeWidth={1.1} />
        <Carrot className="absolute bottom-[9%] left-[16%] h-20 w-20 rotate-[20deg] opacity-[0.035]" strokeWidth={1.1} />
        <Fish className="absolute right-[7%] top-[28%] h-20 w-20 rotate-[-9deg] opacity-[0.035]" strokeWidth={1.1} />
        <Wheat className="absolute bottom-[8%] right-[18%] h-24 w-24 rotate-[12deg] opacity-[0.03]" strokeWidth={1.05} />
        <Beef className="absolute right-[4%] top-[62%] h-14 w-14 rotate-[18deg] opacity-[0.025]" strokeWidth={1.05} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Humanities", href: "/humanities" }, { label: "Culinary Arts" }]}
          eyebrow="Ingredient · Method · Dish · Practice"
          icon={ChefHat}
          title={<span>Culinary Arts</span>}
          subtitle="Understand what food is, what cooks do to it, how dishes are assembled, and how a kitchen works safely and deliberately."
          accentRgb="251, 146, 60"
          titleClassName="font-serif text-[clamp(3.2rem,5.8vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-[#fff8ef]"
          iconClassName="rounded-[18px]"
          headerClassName="border-orange-300/[0.16]"
        />

        <nav className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Culinary Arts map">
          <CulinaryShelf
            href="/humanities/culinary-arts/market"
            icon={Carrot}
            rgb="74, 222, 128"
            eyebrow="Ingredients"
            title="Ingredient Atlas"
            description="What food is and how ingredients behave."
          />
          <CulinaryShelf
            icon={Flame}
            eyebrow="Methods"
            title="Cooking Methods"
            description="Baking · roasting · grilling · frying · steaming · fermentation"
            planned
          />
          <CulinaryShelf
            href="/humanities/culinary-arts/recipes"
            icon={UtensilsCrossed}
            rgb="251, 146, 60"
            eyebrow="Dishes"
            title="Recipe Library"
            description="Complete preparations, dishes, and combinations."
          />
          <CulinaryShelf
            icon={ShieldCheck}
            eyebrow="Kitchen practice"
            title="Kitchen Fundamentals"
            description="Prep · knives · tools · mise en place · safety · storage"
            planned
          />
        </nav>

        <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.55fr)_minmax(380px,0.75fr)] xl:items-stretch">
          <section className="relative overflow-hidden rounded-[24px] border border-orange-200/[0.14] bg-black/[0.25] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_22px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl xl:h-[382px]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl" style={{ background: `rgba(${activeTechnique.rgb},0.08)` }} />
            <div className="relative flex h-full flex-col">
              <div className="flex h-[44px] shrink-0 items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300/70">Technique lab</div>
                  <p className="mt-1 text-[12px] text-stone-500">Change the energy pathway and the same ingredient becomes different food.</p>
                </div>
                <Sparkles size={17} className="text-orange-300/35" />
              </div>

              <div className="mt-3 grid h-14 shrink-0 grid-cols-3 gap-2 sm:grid-cols-6">
                {TECHNIQUES.map((technique) => {
                  const Icon = technique.icon;
                  const selected = technique.id === activeTechnique.id;
                  return (
                    <button
                      key={technique.id}
                      type="button"
                      onClick={() => setActiveTechniqueId(technique.id)}
                      onMouseEnter={() => setActiveTechniqueId(technique.id)}
                      className="flex h-14 min-w-0 items-center justify-center gap-2 rounded-xl border px-2 transition-colors"
                      style={{
                        color: selected ? `rgb(${technique.rgb})` : "rgb(148 138 128)",
                        borderColor: selected ? `rgba(${technique.rgb},0.38)` : "rgba(255,255,255,0.055)",
                        background: selected ? `rgba(${technique.rgb},0.08)` : "rgba(0,0,0,0.15)",
                      }}
                    >
                      <Icon size={15} strokeWidth={1.55} />
                      <span className="truncate text-[10px] font-semibold">{technique.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 grid h-[229px] min-h-0 shrink-0 gap-3 lg:grid-cols-[118px_minmax(0,1fr)_250px]">
                <div
                  className="relative flex h-full items-center justify-center overflow-hidden rounded-[18px] border"
                  style={{
                    borderColor: `rgba(${activeTechnique.rgb},0.22)`,
                    background: `radial-gradient(circle at center, rgba(${activeTechnique.rgb},0.11), rgba(8,6,5,0.82) 64%)`,
                  }}
                >
                  <div className="absolute h-24 w-24 rounded-full border" style={{ borderColor: `rgba(${activeTechnique.rgb},0.14)` }} />
                  <div className="absolute h-16 w-16 rounded-full border" style={{ borderColor: `rgba(${activeTechnique.rgb},0.24)` }} />
                  <ActiveTechniqueIcon size={34} strokeWidth={1.3} style={{ color: `rgb(${activeTechnique.rgb})` }} />
                </div>

                <div className="grid h-full min-h-0 grid-rows-[32px_48px_82px_43px] overflow-hidden rounded-[18px] border border-orange-100/[0.055] bg-black/[0.18] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="truncate text-[22px] font-semibold leading-7 tracking-[-0.035em] text-white">{activeTechnique.label}</h2>
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${activeTechnique.rgb})` }} />
                  </div>

                  <p className="line-clamp-2 self-start text-[12px] leading-5 text-stone-400">{activeTechnique.detail}</p>

                  <div className="grid min-h-0 grid-cols-2 gap-2">
                    <div className="h-full overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.015] p-2.5">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-stone-600">Best for</div>
                      <p className="mt-1 line-clamp-3 text-[11px] leading-4 text-stone-400">{activeTechnique.bestFor}</p>
                    </div>
                    <div className="h-full overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.015] p-2.5">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-stone-600">Watch for</div>
                      <p className="mt-1 line-clamp-3 text-[11px] leading-4 text-stone-400">{activeTechnique.watchFor}</p>
                    </div>
                  </div>

                  <div className="grid min-h-0 grid-cols-4 gap-2 pt-2">
                    {activeTechnique.examples.map((example) => (
                      <span
                        key={example}
                        className="flex h-8 min-w-0 items-center justify-center truncate rounded-lg border px-2 text-[10px] font-medium"
                        style={{
                          color: `rgba(${activeTechnique.rgb},0.78)`,
                          borderColor: `rgba(${activeTechnique.rgb},0.16)`,
                          background: `rgba(${activeTechnique.rgb},0.03)`,
                        }}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid h-full grid-cols-2 grid-rows-[74px_74px_65px] gap-2">
                  {[
                    ["Medium", activeTechnique.medium],
                    ["Energy", activeTechnique.energy],
                    ["Change", activeTechnique.change],
                    ["Result", activeTechnique.result],
                  ].map(([label, value]) => (
                    <div key={label} className="overflow-hidden rounded-xl border border-orange-100/[0.05] bg-orange-50/[0.012] p-3">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-stone-600">{label}</div>
                      <div className="mt-1.5 line-clamp-2 text-[11px] font-semibold leading-4 text-stone-300">{value}</div>
                    </div>
                  ))}
                  <div className="col-span-2 overflow-hidden rounded-xl border border-orange-100/[0.05] bg-black/[0.15] p-3">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-stone-600">Primary controls</div>
                    <div className="mt-2 flex h-6 flex-nowrap items-center gap-1.5 overflow-hidden">
                      {activeTechnique.controls.map((control) => (
                        <span key={control} className="shrink-0 rounded-md bg-white/[0.025] px-2 py-1 text-[10px] text-stone-400">
                          {control}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[24px] border border-orange-200/[0.10] bg-black/[0.26] p-5 backdrop-blur-xl xl:h-[382px]">
            <div className="grid h-full grid-rows-[54px_48px_minmax(0,1fr)]">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300/70">The five basic tastes</div>
                <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-stone-500">Taste is one part of flavor, alongside aroma, texture, temperature, and other sensations.</p>
              </div>

              <div className="grid h-12 grid-cols-5 gap-2">
                {TASTES.map((taste) => {
                  const selected = taste.id === activeTaste.id;
                  return (
                    <button
                      key={taste.id}
                      type="button"
                      onClick={() => setActiveTasteId(taste.id)}
                      onMouseEnter={() => setActiveTasteId(taste.id)}
                      className="h-12 rounded-xl border px-1 text-center transition-colors"
                      style={{
                        color: selected ? `rgb(${taste.rgb})` : "rgb(148 138 128)",
                        borderColor: selected ? `rgba(${taste.rgb},0.36)` : "rgba(255,255,255,0.05)",
                        background: selected ? `rgba(${taste.rgb},0.075)` : "rgba(0,0,0,0.14)",
                      }}
                    >
                      <span className="text-[10px] font-semibold">{taste.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 grid min-h-0 grid-rows-[30px_58px_68px_44px_42px] overflow-hidden rounded-[18px] border border-orange-100/[0.055] bg-orange-50/[0.012] p-4">
                <div className="flex items-start gap-2.5">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${activeTaste.rgb})` }} />
                  <h2 className="truncate text-xl font-semibold leading-7 text-white">{activeTaste.label}</h2>
                </div>

                <p className="line-clamp-2 self-start pt-2 text-[12px] leading-5 text-stone-400">{activeTaste.role}</p>

                <p className="line-clamp-2 self-start border-t border-orange-100/[0.045] pt-3 text-[11px] leading-5 text-stone-500">{activeTaste.balance}</p>

                <div className="grid h-10 grid-cols-3 gap-2 pt-1">
                  {activeTaste.examples.map((example) => (
                    <div key={example} className="flex min-w-0 items-center justify-center truncate rounded-xl border border-white/[0.05] bg-black/[0.16] px-2 text-center text-[10px] font-medium text-stone-400">
                      {example}
                    </div>
                  ))}
                </div>

                <div className="grid h-9 grid-cols-3 gap-2 pt-1">
                  {["aroma", "texture", "temperature"].map((sense) => (
                    <div key={sense} className="flex items-center justify-center rounded-lg bg-white/[0.018] px-2 text-center text-[9px] uppercase tracking-[0.08em] text-stone-600">
                      {sense}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-3 overflow-hidden rounded-[24px] border border-orange-200/[0.10] bg-black/[0.22] p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300/70">From ingredient to service</div>
              <p className="mt-1 text-[12px] text-stone-500">A dish is the result of a sequence of decisions, not just a recipe.</p>
            </div>
            <div className="text-[10px] text-stone-600">quality → preparation → transformation → perception → presentation → safety</div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
            {WORKFLOW.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="relative overflow-hidden rounded-[16px] border border-white/[0.05] bg-white/[0.015] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl border"
                      style={{
                        color: `rgb(${step.rgb})`,
                        borderColor: `rgba(${step.rgb},0.18)`,
                        background: `rgba(${step.rgb},0.04)`,
                      }}
                    >
                      <Icon size={16} strokeWidth={1.45} />
                    </span>
                    <span className="text-[9px] font-semibold text-stone-700">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold text-stone-200">{step.label}</h3>
                  <p className="mt-1 text-[10px] leading-4 text-stone-500">{step.note}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function CulinaryShelf({
  href,
  icon: Icon,
  rgb = "120, 113, 108",
  eyebrow,
  title,
  description,
  planned = false,
}: {
  href?: string;
  icon: LucideIcon;
  rgb?: string;
  eyebrow: string;
  title: string;
  description: string;
  planned?: boolean;
}) {
  const content = (
    <>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
        style={{
          color: planned ? "rgb(120 113 108)" : `rgb(${rgb})`,
          borderColor: planned ? "rgba(120,113,108,0.13)" : `rgba(${rgb},0.24)`,
          background: planned ? "rgba(120,113,108,0.03)" : `rgba(${rgb},0.055)`,
        }}
      >
        <Icon size={17} strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className="block text-[9px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: planned ? "rgb(100 94 89)" : `rgba(${rgb},0.68)` }}
        >
          {eyebrow}
        </span>
        <strong className={`mt-0.5 block text-[16px] font-semibold tracking-[-0.025em] ${planned ? "text-stone-600" : "text-white"}`}>
          {title}
        </strong>
        <span className={`mt-0.5 block truncate text-[10px] ${planned ? "text-stone-700" : "text-stone-500"}`}>{description}</span>
      </span>
      {planned ? (
        <span className="rounded-md border border-stone-700/40 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-stone-700">Planned</span>
      ) : (
        <ArrowRight size={14} style={{ color: `rgb(${rgb})` }} />
      )}
    </>
  );

  const className = `flex min-h-[76px] items-center gap-3 rounded-[18px] border px-3.5 py-3 backdrop-blur-xl ${
    planned ? "cursor-default border-stone-700/30 bg-black/[0.16]" : "transition-transform hover:-translate-y-0.5"
  }`;

  if (planned || !href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      href={href}
      className={className}
      style={{
        borderColor: `rgba(${rgb},0.20)`,
        background: `linear-gradient(135deg, rgba(${rgb},0.07), rgba(10,7,5,0.68) 58%)`,
      }}
    >
      {content}
    </Link>
  );
}
