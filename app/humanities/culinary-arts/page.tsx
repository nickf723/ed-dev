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
};

type Taste = {
  id: string;
  label: string;
  rgb: string;
  role: string;
  balance: string;
  examples: readonly string[];
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
    detail: "Fast surface heating creates aromatic browning while limiting how far heat penetrates into the interior.",
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
    detail: "Dry oven heat gradually removes water, browns exposed surfaces, and concentrates sweetness and savory aromas.",
    controls: ["oven heat", "airflow", "surface area"],
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
    detail: "Time, moisture, and moderate heat soften connective tissue while moving flavor between food and cooking liquid.",
    controls: ["liquid level", "time", "gentle heat"],
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
    detail: "Condensing steam transfers heat efficiently without submerging food, helping delicate ingredients retain moisture.",
    controls: ["steam flow", "size", "doneness"],
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
    detail: "Cooling sets fats, gels, custards, and frozen mixtures while changing texture, aroma release, and perceived sweetness.",
    controls: ["cooling rate", "fat", "water"],
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
    detail: "Microorganisms transform sugars and other compounds into acids, gases, alcohols, and a larger flavor vocabulary.",
    controls: ["culture", "salt", "time"],
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

        <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.75fr)] xl:items-stretch">
          <section className="relative overflow-hidden rounded-[24px] border border-orange-200/[0.14] bg-black/[0.25] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_22px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl xl:h-[292px]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl" style={{ background: `rgba(${activeTechnique.rgb},0.08)` }} />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-orange-300/65">Technique lab</div>
                  <p className="mt-1 text-[10px] text-stone-600">Change the energy pathway and the same ingredient becomes different food.</p>
                </div>
                <Sparkles size={15} className="text-orange-300/30" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                {TECHNIQUES.map((technique) => {
                  const Icon = technique.icon;
                  const selected = technique.id === activeTechnique.id;
                  return (
                    <button
                      key={technique.id}
                      type="button"
                      onClick={() => setActiveTechniqueId(technique.id)}
                      onMouseEnter={() => setActiveTechniqueId(technique.id)}
                      className="flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-xl border px-2 transition-colors"
                      style={{
                        color: selected ? `rgb(${technique.rgb})` : "rgb(120 113 108)",
                        borderColor: selected ? `rgba(${technique.rgb},0.38)` : "rgba(255,255,255,0.05)",
                        background: selected ? `rgba(${technique.rgb},0.08)` : "rgba(0,0,0,0.15)",
                      }}
                    >
                      <Icon size={13} strokeWidth={1.55} />
                      <span className="truncate font-mono text-[7px] uppercase tracking-[0.08em]">{technique.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 grid min-h-0 flex-1 gap-2.5 lg:grid-cols-[104px_minmax(0,1fr)_230px]">
                <div
                  className="relative flex min-h-[138px] items-center justify-center overflow-hidden rounded-[18px] border"
                  style={{
                    borderColor: `rgba(${activeTechnique.rgb},0.22)`,
                    background: `radial-gradient(circle at center, rgba(${activeTechnique.rgb},0.11), rgba(8,6,5,0.82) 64%)`,
                  }}
                >
                  <div className="absolute h-20 w-20 rounded-full border" style={{ borderColor: `rgba(${activeTechnique.rgb},0.15)` }} />
                  <div className="absolute h-12 w-12 rounded-full border" style={{ borderColor: `rgba(${activeTechnique.rgb},0.26)` }} />
                  <ActiveTechniqueIcon size={28} strokeWidth={1.3} style={{ color: `rgb(${activeTechnique.rgb})` }} />
                </div>

                <div className="min-h-0 rounded-[18px] border border-orange-100/[0.055] bg-black/[0.18] p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">{activeTechnique.label}</h2>
                    <span className="h-2 w-2 rounded-full" style={{ background: `rgb(${activeTechnique.rgb})` }} />
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[10px] leading-4 text-stone-400">{activeTechnique.detail}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {activeTechnique.controls.map((control) => (
                      <span
                        key={control}
                        className="rounded-md border px-2 py-1 font-mono text-[6px] uppercase tracking-[0.08em]"
                        style={{
                          color: `rgba(${activeTechnique.rgb},0.76)`,
                          borderColor: `rgba(${activeTechnique.rgb},0.18)`,
                          background: `rgba(${activeTechnique.rgb},0.035)`,
                        }}
                      >
                        {control}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    ["Medium", activeTechnique.medium],
                    ["Energy", activeTechnique.energy],
                    ["Change", activeTechnique.change],
                    ["Result", activeTechnique.result],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-orange-100/[0.05] bg-orange-50/[0.012] p-2.5">
                      <div className="font-mono text-[6px] uppercase tracking-[0.12em] text-stone-700">{label}</div>
                      <div className="mt-1 text-[9px] font-semibold leading-4 text-stone-300">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[24px] border border-orange-200/[0.10] bg-black/[0.26] p-4 backdrop-blur-xl xl:h-[292px]">
            <div className="flex h-full flex-col">
              <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-orange-300/65">The five basic tastes</div>
              <p className="mt-1 text-[10px] leading-4 text-stone-600">Taste is one part of flavor, alongside aroma, texture, temperature, and other sensations.</p>

              <div className="mt-3 grid grid-cols-5 gap-1.5">
                {TASTES.map((taste) => {
                  const selected = taste.id === activeTaste.id;
                  return (
                    <button
                      key={taste.id}
                      type="button"
                      onClick={() => setActiveTasteId(taste.id)}
                      onMouseEnter={() => setActiveTasteId(taste.id)}
                      className="h-10 rounded-xl border px-1 text-center transition-colors"
                      style={{
                        color: selected ? `rgb(${taste.rgb})` : "rgb(120 113 108)",
                        borderColor: selected ? `rgba(${taste.rgb},0.36)` : "rgba(255,255,255,0.05)",
                        background: selected ? `rgba(${taste.rgb},0.075)` : "rgba(0,0,0,0.14)",
                      }}
                    >
                      <span className="font-mono text-[7px] uppercase tracking-[0.08em]">{taste.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex min-h-0 flex-1 flex-col rounded-[18px] border border-orange-100/[0.055] bg-orange-50/[0.012] p-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: `rgb(${activeTaste.rgb})` }} />
                  <h2 className="text-base font-semibold text-white">{activeTaste.label}</h2>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[10px] leading-4 text-stone-400">{activeTaste.role}</p>
                <p className="mt-2 line-clamp-2 border-t border-orange-100/[0.045] pt-2 text-[9px] leading-4 text-stone-600">{activeTaste.balance}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {activeTaste.examples.map((example) => (
                    <span key={example} className="rounded-md border border-orange-100/[0.05] bg-black/20 px-2 py-1 font-mono text-[6px] uppercase tracking-[0.08em] text-stone-500">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function CulinaryShelf({
  href,
  icon: Icon,
  rgb = "148, 163, 184",
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
        className="flex h-10 w-10 items-center justify-center rounded-xl border"
        style={{
          color: planned ? "rgb(120 113 108)" : `rgb(${rgb})`,
          borderColor: planned ? "rgba(168,162,158,0.12)" : `rgba(${rgb},0.25)`,
          background: planned ? "rgba(255,255,255,0.015)" : `rgba(${rgb},0.055)`,
        }}
      >
        <Icon size={17} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <span
          className="block font-mono text-[6px] uppercase tracking-[0.14em]"
          style={{ color: planned ? "rgb(87 83 78)" : `rgba(${rgb},0.68)` }}
        >
          {eyebrow}
        </span>
        <span className={`mt-0.5 block text-[15px] font-semibold tracking-[-0.025em] ${planned ? "text-stone-500" : "text-white"}`}>{title}</span>
        <span className="mt-1 block truncate text-[8px] text-stone-600">{description}</span>
      </span>
      {planned ? (
        <span className="rounded-md border border-stone-500/[0.10] bg-white/[0.012] px-2 py-1 font-mono text-[6px] uppercase tracking-[0.10em] text-stone-700">planned</span>
      ) : (
        <ArrowRight size={12} style={{ color: `rgb(${rgb})` }} className="transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  const className = `group grid min-h-[82px] grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 rounded-[18px] border px-3.5 py-3 backdrop-blur-xl ${planned ? "cursor-default border-stone-400/[0.08] bg-white/[0.012]" : "transition-transform hover:-translate-y-0.5"}`;

  if (!href || planned) return <div className={className}>{content}</div>;

  return (
    <Link
      href={href}
      className={className}
      style={{
        borderColor: `rgba(${rgb},0.20)`,
        background: `linear-gradient(135deg, rgba(${rgb},0.075), rgba(10,7,5,0.68) 58%, rgba(7,5,4,0.56))`,
      }}
    >
      {content}
    </Link>
  );
}
