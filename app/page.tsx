import Link from "next/link";
import { ArrowDown, ArrowRight, Network } from "lucide-react";
import { DOMAINS, DOMAIN_BY_ID } from "@/lib/domains";
import HexGrid from "./_homepage/HexGrid";
import LibraryBackground from "./_homepage/HomepageBackground";
import NetworkBackground from "./_homepage/NetworkBackground";
import WireframeBackground from "./_homepage/WireframeBackground";
import DiffractionPreview from "./_homepage/DiffractionPreview";
import { getHomepageSelections } from "./_homepage/selections";
import styles from "./_homepage/discovery.module.css";

export const metadata = {
  title: "Education Station 64 — Explore connected knowledge",
  description:
    "A curated atlas of academia. Explore interactive explanations, inspect collections, and discover how ideas connect.",
};
export default function Home() {
  const [featured, ...selections] = getHomepageSelections();
  return (
    <main className={styles.home}>
      <div className={styles.environment} aria-hidden="true">
        <NetworkBackground />
        <LibraryBackground />
        <WireframeBackground />
      </div>
      <div className={styles.content}>
        <header className={styles.header}>
          <Link href="/" className={styles.wordmark}>
            EDUCATION STATION <span>64</span>
          </Link>
          <a href="#atlas" className={styles.textLink}>
            Knowledge atlas <ArrowDown size={15} />
          </a>
        </header>
        <section className={styles.intro} aria-labelledby="welcome">
          <p className={styles.eyebrow}>A curated atlas of academia</p>
          <h1 id="welcome">
            Ideas worth
            <br />
            <em>understanding.</em>
          </h1>
          <p className={styles.introCopy}>
            Explore the patterns, principles, and discoveries that shape our
            world. See an idea. Change something. Understand why.
          </p>
        </section>
        <nav className={styles.branchRail} aria-label="Branches of knowledge">
          {DOMAINS.filter((d) => d.id !== "inter").map((domain) => {
            const Icon = domain.icon;
            return (
              <Link
                key={domain.id}
                href={domain.href}
                style={{ color: `rgb(${domain.theme.rgb})` }}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{domain.title}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            );
          })}
        </nav>
        <section className={styles.feature} aria-labelledby="featured-question">
          <div className={styles.featureCopy}>
            <p className={styles.eyebrow}>
              Featured exploration · {featured.context.node.label}
            </p>
            <h2 id="featured-question">{featured.question}</h2>
            <p>{featured.invitation}</p>
            <Link
              href={featured.context.node.href}
              className={styles.primaryLink}
            >
              {featured.action}
              <ArrowRight size={18} />
            </Link>
            <nav
              className={styles.ancestry}
              aria-label="Featured exploration ancestry"
            >
              {featured.context.breadcrumbs.slice(1, -1).map((crumb, index) => (
                <span key={crumb.href}>
                  {index > 0 && <span aria-hidden="true"> / </span>}
                  <Link href={crumb.href!}>{crumb.label}</Link>
                </span>
              ))}
            </nav>
          </div>
          <DiffractionPreview />
        </section>
        <section className={styles.selections} aria-labelledby="selected-title">
          <div className={styles.sectionHeading}>
            <h2 id="selected-title">Follow your curiosity.</h2>
            <span>Selected from the atlas</span>
          </div>
          <div className={styles.selectionGrid}>
            {selections.map((selection) => (
              <article key={selection.id} className={styles.selection}>
                <div className={styles.selectionMeta}>{selection.kind}</div>
                <p className={styles.location}>
                  {selection.context.domain.title} /{" "}
                  {selection.context.parent?.label ??
                    selection.context.node.label}
                </p>
                <h3>
                  <Link href={selection.context.node.href}>
                    {selection.question}
                  </Link>
                </h3>
                <p>{selection.invitation}</p>
                <Link
                  href={selection.context.node.href}
                  className={styles.textLink}
                >
                  {selection.action}
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section
          id="atlas"
          className={styles.atlas}
          aria-labelledby="atlas-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="atlas-title">Every idea has a place.</h2>
            <span>The knowledge atlas</span>
          </div>
          <p className={styles.atlasIntro}>
            Five branches organize the collection. Descend into a field to find
            its subjects, explanations, and tools.
          </p>
          <HexGrid />
          <Link href={DOMAIN_BY_ID.inter.href} className={styles.connections}>
            <Network size={26} aria-hidden="true" />
            <span>
              <strong>Between the branches</strong>
              <span>
                Interdisciplines traces connections across academic fields.
              </span>
            </span>
            <ArrowRight size={22} aria-hidden="true" />
          </Link>
        </section>
        <footer className={styles.footer}>
          <span>Education Station 64</span>
          <span>
            Connected knowledge. Distinct perspectives. Deeper understanding.
          </span>
        </footer>
      </div>
    </main>
  );
}
