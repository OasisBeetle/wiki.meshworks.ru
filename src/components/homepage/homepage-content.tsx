import { EcosystemStats } from "@/components/homepage/ecosystem-stats";
import { HomepageDownloads } from "@/components/homepage/homepage-downloads";
import { HomepageFeatures } from "@/components/homepage/homepage-features";
import { NetworkMapBackground } from "@/components/homepage/network-map-background";
import { FileText } from "@/components/icons/lucide";
import Link from "@docusaurus/Link";
import React from "react";
import clsx from "clsx";
import styles from "./homepage.module.css";

export function HomePageContent() {
  return (
    <div className={clsx("meshtastic-home", styles.root)}>
      <div aria-hidden="true" className={styles.canvas}>
        <NetworkMapBackground />
      </div>

      <main className={clsx("container", styles.main)}>
        <div className={styles.slides}>
          <section className={clsx(styles.slide, styles.hero)} aria-label="Hero">
            <div>
              <h1 className={styles.heroTitle}>
                Связь без интернета.
                <br />
                <span className={styles.heroTitleAccent}>
                  Везде<span className={styles.heroTitleAccentDot}>.</span>
                </span>
              </h1>

              <div className={styles.heroLead}>
                <p>
                  MeshWorks — сообщество энтузиастов mesh‑сетей. Создаём инструменты для автономной связи, развиваем
                  покрытие, делимся знаниями.
                </p>
              </div>

              <div className={styles.ctaRow}>
                <Link
                  className={clsx("button button--primary button--lg", styles.ctaPrimary, styles.ctaButton, styles.ctaWithIcon)}
                  to="/introduction"
                >
                  <span className={styles.ctaIcon} aria-hidden="true">
                    <FileText />
                  </span>
                  База знаний
                </Link>
                <a
                  className={clsx(
                    "button button--secondary button--lg",
                    styles.ctaSecondary,
                    styles.ctaButton,
                  )}
                  href="https://t.me/meshwrks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
                <a
                  className={clsx(
                    "button button--secondary button--lg",
                    styles.ctaSecondary,
                    styles.ctaButton,
                  )}
                  href="https://www.youtube.com/@meshwrks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </div>
            </div>

            <div>
              <EcosystemStats />
            </div>
          </section>

          <section className={clsx(styles.slide, styles.section)} aria-label="Scenarios">
            <HomepageFeatures />
          </section>

          <section className={clsx(styles.slide, styles.section)} aria-label="Clients">
            <HomepageDownloads />
          </section>
        </div>
      </main>
    </div>
  );
}
