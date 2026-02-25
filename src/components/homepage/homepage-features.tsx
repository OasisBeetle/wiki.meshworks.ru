import Link from "@docusaurus/Link";
import React from "react";
import { ArrowRight, GlobeIcon, Radio, Signal } from "@/components/icons/lucide";
import styles from "./homepage.module.css";

type Scenario = {
  title: string;
  description: string;
  href: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

const scenarios: Scenario[] = [
  {
    title: "Meshtastic",
    description: "Запускается за минуты. Работает на тысячах устройств. Идеально для активного покрытия.",
    href: "/introduction",
    icon: <Radio />,
  },
  {
    title: "MeshCore",
    description: "Лёгкий mesh‑стек для LoRa с упором на минимализм и автономность.",
    href: "https://github.com/meshcore-dev/MeshCore",
    icon: <Signal />,
    disabled: true,
  },
  {
    title: "Reticulum",
    description: "Сетевой стек для автономных и распределённых сетей разных типов.",
    href: "https://reticulum.network/",
    icon: <GlobeIcon />,
    disabled: true,
  },
];

export function HomepageFeatures() {
  return (
    <section aria-label="Features">
      <div className={styles.sectionHeader}>
        <h2>Технологии</h2>
        <p>Mesh‑связь может быть разной. Ниже — ключевые протоколы и стеки, с которыми работает сообщество MeshWorks.</p>
      </div>

      <div className={styles.grid3}>
        {scenarios.map((scenario) =>
          scenario.disabled ? (
            <div key={scenario.title} className={styles.card}>
              <div className={styles.statHeader}>
                <h3 className={styles.cardTitle}>
                  <span className={styles.cardTitleLink} aria-disabled="true">
                    {scenario.title}
                  </span>
                </h3>
                <div className={styles.statIcon} aria-hidden="true">
                  {scenario.icon}
                </div>
              </div>
              <p className={styles.cardText}>{scenario.description}</p>
              <div className={styles.cardFooterRow}>
                <span className={styles.cardLinkSecondary}>В разработке</span>
              </div>
            </div>
          ) : (
            <Link key={scenario.title} to={scenario.href} className={styles.card}>
              <div className={styles.statHeader}>
                <h3 className={styles.cardTitle}>{scenario.title}</h3>
                <div className={styles.statIcon} aria-hidden="true">
                  {scenario.icon}
                </div>
              </div>
              <p className={styles.cardText}>{scenario.description}</p>
              <div className={styles.cardFooterRow}>
                <span className={styles.cardLink}>
                  Перейти <ArrowRight style={{ width: 16, height: 16 }} />
                </span>
                {scenario.secondaryHref && scenario.secondaryLabel ? (
                  <span className={styles.cardLinkSecondary}>{scenario.secondaryLabel}</span>
                ) : null}
              </div>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
