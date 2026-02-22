import { EcosystemStats } from "@/components/homepage/ecosystem-stats";
import { HomepageFaq } from "@/components/homepage/homepage-faq";
import { HomepageDownloads } from "@/components/homepage/homepage-downloads";
import { HomepageFeatures } from "@/components/homepage/homepage-features";
import { NetworkMapBackground } from "@/components/homepage/network-map-background";
import links from "@/data/links.json";
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
        <section className={styles.hero} aria-label="Hero">
          <div>
            <h1 className={styles.heroTitle}>
              Meshtastic <span className={styles.heroTitleAccent}>на русском</span>
            </h1>

            <div className={styles.heroLead}>
              <p>
                MeshWorks Wiki — русскоязычная база знаний о Meshtastic: выбор устройств, прошивка и настройка ноды,
                антенны и дальность, типовые проблемы и рабочие чек‑листы.
              </p>
            </div>

            <div className={styles.ctaRow}>
              <Link className={clsx("button button--primary button--lg", styles.ctaPrimary)} to={links.getStarted}>
                С чего начать
              </Link>
              <Link className={clsx("button button--secondary button--lg", styles.ctaSecondary)} to="/catalog-devices">
                Каталог устройств
              </Link>
              <Link className={clsx("button button--secondary button--lg", styles.ctaSecondary)} to="/node-setup">
                Настроить ноду
              </Link>
            </div>

            <nav className={styles.quickLinks} aria-label="Быстрые ссылки">
              <Link to={links.docs}>Введение</Link>
              <Link to="/antennas">Антенны</Link>
              <Link to="/troubleshooting">Решение проблем</Link>
              <Link to="/community">Сообщества</Link>
            </nav>
          </div>

          <div>
            <EcosystemStats />
          </div>
        </section>

        <section className={styles.section} aria-label="Scenarios">
          <HomepageFeatures />
        </section>

        <section className={styles.section} aria-label="FAQ">
          <HomepageFaq />
        </section>

        <section className={styles.section} aria-label="Clients">
          <HomepageDownloads />
        </section>
      </main>
    </div>
  );
}
