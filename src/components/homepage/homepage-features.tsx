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
        {scenarios.map((scenario) => (
          <div
            key={scenario.title}
            className={styles.card}
          >
              <div className={styles.statHeader}>
                <h3 className={styles.cardTitle}>
                  {scenario.disabled ? (
                    <span className={styles.cardTitleLink} aria-disabled="true">
                      {scenario.title}
                    </span>
                  ) : (
                    <Link to={scenario.href} className={styles.cardTitleLink}>
                      {scenario.title}
                    </Link>
                  )}
                </h3>
                <div className={styles.statIcon} aria-hidden="true">
                  {scenario.icon}
                </div>
              </div>
              <p className={styles.cardText}>{scenario.description}</p>
              <div className={styles.cardFooterRow}>
                {scenario.disabled ? (
                  <span className={styles.cardLinkSecondary}>В разработке</span>
                ) : (
                  <Link to={scenario.href} className={styles.cardLink}>
                    Открыть <ArrowRight style={{ width: 16, height: 16 }} />
                  </Link>
                )}
                {scenario.secondaryHref && scenario.secondaryLabel ? (
                  <Link to={scenario.secondaryHref} className={styles.cardLinkSecondary}>
                    {scenario.secondaryLabel}
                  </Link>
                ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
