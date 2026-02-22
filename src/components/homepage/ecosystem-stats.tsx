import { ArrowRight, GlobeIcon, SmartphoneIcon, UserIcon, UsersIcon } from "@/components/icons/lucide";
import Link from "@docusaurus/Link";
import type React from "react";
import styles from "./homepage.module.css";

interface StatItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function StatItem({ icon, title, description, href }: StatItemProps) {
  return (
    <Link
      to={href}
      className={styles.card}
    >
      <div className={styles.statHeader}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.statIcon} aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className={styles.cardText}>{description}</div>
      <div className={styles.cardFooter}>
        <span className={styles.cardLink}>
          Открыть <ArrowRight style={{ width: 16, height: 16 }} />
        </span>
      </div>
    </Link>
  );
}

export function EcosystemStats() {
  return (
    <div className={styles.grid2}>
      <StatItem
        icon={<SmartphoneIcon />}
        title="С чего начать"
        description="Короткий маршрут по разделам и шагам."
        href="/start"
      />
      <StatItem
        icon={<UserIcon />}
        title="Настройка ноды"
        description="Прошивка, регион/частоты, каналы, роли."
        href="/node-setup"
      />
      <StatItem
        icon={<GlobeIcon />}
        title="Устройства"
        description="Какие бывают ноды и что выбрать."
        href="/devices"
      />
      <StatItem
        icon={<UsersIcon />}
        title="Решение проблем"
        description="Типовые ошибки и быстрые проверки."
        href="/troubleshooting"
      />
    </div>
  );
}
