import Link from "@docusaurus/Link";
import { ArrowRight, FileText, Globe, MessageSquare, Terminal } from "@/components/icons/lucide";
import type React from "react";
import styles from "./homepage.module.css";

type IconComponent = (props: { className?: string }) => React.JSX.Element;

const iconMap: Record<string, IconComponent> = {
  globe: Globe,
  terminal: Terminal,
  fileText: FileText,
  message: MessageSquare,
};

interface DownloadItemData {
  title: string;
  description: string;
  href: string;
  icon: string;
}

function DownloadCard({
  title,
  description,
  href,
  icon,
}: DownloadItemData) {
  const Icon = iconMap[icon];
  const isExternal = href.startsWith("http");

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
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          Открыть (внешняя ссылка) <ArrowRight style={{ width: 16, height: 16 }} />
        </a>
      ) : (
        <Link
          to={href}
          className={styles.cardLink}
        >
          Открыть <ArrowRight style={{ width: 16, height: 16 }} />
        </Link>
      )}
    </div>
  );
}

export function HomepageDownloads() {
  const items: DownloadItemData[] = [
    {
      title: "Прошивальщик",
      description: "Прошивка Meshtastic-устройств через браузер: быстро и удобно.",
      href: "https://flasher.meshworks.ru/",
      icon: "terminal",
    },
    {
      title: "Веб‑клиент",
      description: "Клиент для управления нодами Meshtastic прямо в браузере.",
      href: "https://client.meshworks.ru/",
      icon: "globe",
    },
    {
      title: "Карта сети",
      description: "Публичная карта узлов и покрытий MeshWorks.",
      href: "https://malla.meshworks.ru/",
      icon: "globe",
    },
    {
      title: "Документация",
      description: "База знаний и инструкции: от старта до диагностики.",
      href: "/introduction",
      icon: "fileText",
    },
    {
      title: "Форум",
      description: "Обсуждения и база знаний в формате сообщества.",
      href: "https://t.me/meshwrks",
      icon: "message",
    },
  ];

  return (
    <section aria-label="Download clients">
      <div className={styles.sectionHeader}>
        <h2>Инструменты</h2>
        <p>Сервисы и площадки MeshWorks: прошивка, карта сети, документация и общение.</p>
      </div>

      <div className={styles.grid3}>
        {items.map((item) => (
          <DownloadCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
