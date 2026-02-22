import apps from "@/data/apps.json";
import links from "@/data/links.json";
import Link from "@docusaurus/Link";
import { ArrowRight, Globe, Smartphone, Terminal } from "@/components/icons/lucide";
import type React from "react";
import styles from "./homepage.module.css";

type IconComponent = (props: { className?: string }) => React.JSX.Element;

const iconMap: Record<string, IconComponent> = {
  smartphone: Smartphone,
  globe: Globe,
  terminal: Terminal,
};

interface DownloadItemData {
  title: string;
  description: string;
  linkKey?: string;
  href?: string;
  icon: string;
}

function DownloadCard({
  title,
  description,
  linkKey,
  href,
  icon,
}: DownloadItemData) {
  const Icon = iconMap[icon];
  const url = linkKey ? links[linkKey as keyof typeof links] : href;
  const isExternal = (url ?? "").startsWith("http");

  return (
    <div className={styles.card}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardText}>{description}</p>
        </div>
        <div className={styles.downloadIcon}>
          <Icon />
        </div>
      </div>

      {isExternal ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          Открыть (внешняя ссылка) <ArrowRight style={{ width: 16, height: 16 }} />
        </a>
      ) : (
        <Link
          to={url ?? "#"}
          className={styles.cardLink}
        >
          Открыть <ArrowRight style={{ width: 16, height: 16 }} />
        </Link>
      )}
    </div>
  );
}

export function HomepageDownloads() {
  return (
    <section aria-label="Download clients">
      <div className={styles.sectionHeader}>
        <h2>Официальные клиенты Meshtastic</h2>
        <p>Приложения и веб‑клиент для управления нодами. Все кнопки ниже ведут на внешние ресурсы Meshtastic.</p>
      </div>

      <div className={styles.grid3}>
        {apps.items.map((item) => (
          <DownloadCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
