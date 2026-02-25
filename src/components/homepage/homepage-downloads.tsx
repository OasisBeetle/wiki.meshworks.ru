import Link from "@docusaurus/Link";
import { ArrowRight, Download, FileText, MapPin, MessageSquare, SmartphoneIcon } from "@/components/icons/lucide";
import type React from "react";
import styles from "./homepage.module.css";

type IconComponent = (props: { className?: string }) => React.JSX.Element;

const iconMap: Record<string, IconComponent> = {
  phone: SmartphoneIcon,
  mapPin: MapPin,
  download: Download,
  fileText: FileText,
  message: MessageSquare,
};

interface DownloadItemData {
  title: string;
  description: string;
  href: string;
  icon: string;
  disabled?: boolean;
}

function DownloadCard({
  title,
  description,
  href,
  icon,
  disabled,
}: DownloadItemData) {
  const Icon = iconMap[icon];
  const isExternal = href.startsWith("http");

  const content = (
    <>
      <div className={styles.toolIconBg} aria-hidden="true">
        <Icon className={styles.toolIconSvg} />
      </div>

      <div className={styles.toolCardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{description}</p>

        <div className={styles.cardFooter}>
          {disabled ? (
            <span className={styles.cardLinkSecondary}>В разработке</span>
          ) : (
            <span className={styles.cardLink}>
              Перейти <ArrowRight style={{ width: 16, height: 16 }} />
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    disabled ? (
      <div className={`${styles.card} ${styles.cardDisabled}`} aria-disabled="true">
        {content}
      </div>
    ) : isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.card}>
        {content}
      </a>
    ) : (
      <Link to={href} className={styles.card}>
        {content}
      </Link>
    )
  );
}

export function HomepageDownloads() {
  const items: DownloadItemData[] = [
    {
      title: "Прошивальщик",
      description: "Прошивка Meshtastic-устройств через браузер: быстро и удобно.",
      href: "https://flasher.meshworks.ru/",
      icon: "download",
    },
    {
      title: "Веб‑клиент",
      description: "Клиент для управления нодами Meshtastic прямо в браузере.",
      href: "https://client.meshworks.ru/",
      icon: "phone",
    },
    {
      title: "Карта сети",
      description: "Публичная карта узлов и покрытий MeshWorks.",
      href: "https://malla.meshworks.ru/",
      icon: "mapPin",
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
      disabled: true,
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
