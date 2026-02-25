import { ArrowRight, Download, Radio, SmartphoneIcon, Terminal } from "@/components/icons/lucide";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import styles from "./homepage.module.css";

interface StatItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  variant: "devices" | "setup" | "basics" | "firmware";
}

function StatItem({ icon, title, description, href, variant }: StatItemProps) {
  return (
    <Link
      to={href}
      className={clsx(
        styles.card,
        styles.statCard,
        variant === "devices" && styles.statCardDevices,
        variant === "setup" && styles.statCardSetup,
        variant === "basics" && styles.statCardBasics,
        variant === "firmware" && styles.statCardFirmware,
      )}
    >
      {variant === "devices" ? <span className={styles.ctaSweepBorder} aria-hidden="true" /> : null}
      <div className={styles.statHeader}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.statIcon} aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className={styles.cardText}>{description}</div>
      <div className={styles.cardFooter}>
        <span className={styles.cardLink}>
          Перейти <ArrowRight style={{ width: 16, height: 16 }} />
        </span>
      </div>
    </Link>
  );
}

export function EcosystemStats() {
  const bottomCards = useMemo(
    () => [
      {
        icon: <Radio />,
        title: "Основы mesh‑сетей",
        description: "Что такое mesh‑связь и как выбрать технологию.",
        href: "/introduction",
        variant: "basics" as const,
      },
      {
        icon: <Download />,
        title: "Прошивка устройств",
        description: "Установка и обновление прошивки в пару шагов.",
        href: "/node-setup/firmware",
        variant: "firmware" as const,
      },
    ],
    [],
  );

  const [bottomOrder, setBottomOrder] = useState(bottomCards);

  useEffect(() => {
    if (Math.random() < 0.5) return;
    setBottomOrder([bottomCards[1], bottomCards[0]]);
  }, [bottomCards]);

  return (
    <div className={styles.grid2}>
      <StatItem
        icon={<SmartphoneIcon />}
        title="Выбор устройств"
        description="Каталог устройств и советы под разные сценарии."
        href="/catalog-devices"
        variant="devices"
      />
      <StatItem
        icon={<Terminal />}
        title="Настройка ноды"
        description="Регион, каналы, роли и совместимость с сетью."
        href="/node-setup"
        variant="setup"
      />

      {bottomOrder.map((card) => (
        <StatItem key={card.title} {...card} />
      ))}
    </div>
  );
}
