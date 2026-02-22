import Link from "@docusaurus/Link";
import React from "react";
import { ArrowRight, Download, GlobeIcon, SmartphoneIcon, Terminal, UsersIcon } from "@/components/icons/lucide";
import styles from "./homepage.module.css";

type Scenario = {
  title: string;
  description: string;
  href: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  icon: React.ReactNode;
};

const scenarios: Scenario[] = [
  {
    title: "Купить готовую ноду",
    description: "Подбор готовых устройств и плат под разные сценарии.",
    href: "/catalog-devices",
    icon: <SmartphoneIcon />,
  },
  {
    title: "Собрать DIY‑ноду",
    description: "Самосборка, модули и идеи для кастомных конфигураций.",
    href: "/devices/diy",
    icon: <Terminal />,
  },
  {
    title: "Прошить устройство",
    description: "Как залить прошивку Meshtastic на популярные платы.",
    href: "/node-setup/firmware",
    icon: <Download />,
  },
  {
    title: "Настроить регион и каналы",
    description: "Частоты, параметры, ключи и совместимость с сетью.",
    href: "/node-setup/configuration",
    icon: <GlobeIcon />,
  },
  {
    title: "Выбрать роль устройства",
    description: "Client/Router/Repeater и другие роли — что выбрать и зачем.",
    href: "/node-setup/roles",
    icon: <UsersIcon />,
  },
  {
    title: "Нода не работает",
    description: "Типовые ошибки и быстрые проверки перед тем, как писать в чат.",
    href: "/troubleshooting",
    secondaryHref: "/troubleshooting/not-visible",
    secondaryLabel: "Устройство не видно",
    icon: <UsersIcon />,
  },
];

export function HomepageFeatures() {
  return (
    <section aria-label="Features">
      <div className={styles.sectionHeader}>
        <h2>Сценарии и маршруты</h2>
        <p>Выберите задачу — и откройте нужный раздел, без лишнего поиска.</p>
      </div>

      <div className={styles.grid3}>
        {scenarios.map((scenario) => (
          <div
            key={scenario.title}
            className={styles.card}
          >
            <div className={styles.statHeader}>
              <h3 className={styles.cardTitle}>
                <Link to={scenario.href} className={styles.cardTitleLink}>
                  {scenario.title}
                </Link>
              </h3>
              <div className={styles.statIcon} aria-hidden="true">
                {scenario.icon}
              </div>
            </div>
            <p className={styles.cardText}>{scenario.description}</p>
            <div className={styles.cardFooterRow}>
              <Link to={scenario.href} className={styles.cardLink}>
                Открыть <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
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
