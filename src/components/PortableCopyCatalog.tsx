import React, { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import styles from './portable-catalog/PortableCopyCatalog.module.css';
import { DEVICE_CATEGORY_LABELS, DEVICE_DATA } from './portable-catalog/data';
import type { DeviceCategory, DeviceItem, DeviceTech } from './portable-catalog/types';

type CategoryFilter = DeviceCategory | 'all';
type TechFilter = DeviceTech | 'all';

type FilterOption<T extends string> = {
  value: T;
  label: string;
};

const CATEGORY_OPTIONS: Array<FilterOption<CategoryFilter>> = [
  { value: 'all', label: 'Все' },
  { value: 'universal', label: '🧭 Универсальные' },
  { value: 'solar', label: '☀️ Солнечные' },
  { value: 'boards', label: '🧩 Отдельные платы' },
];

const TECH_OPTIONS: Array<FilterOption<TechFilter>> = [
  { value: 'all', label: 'Все' },
  { value: 'NRF', label: '🟢 NRF' },
  { value: 'ESP', label: '⚡ ESP' },
];

function filterByTech(devices: DeviceItem[], techFilter: TechFilter): DeviceItem[] {
  if (techFilter === 'all') {
    return devices;
  }

  return devices.filter((device) => device.tech === techFilter);
}

function renderDeviceCard(device: DeviceItem): ReactNode {
  return (
    <article className={`${styles.deviceCard} ${device.popular ? styles.deviceCardPopular : ''}`} key={`${device.title}-${device.href}`}>
      <div className={styles.deviceImageWrap}>
        <img className={styles.deviceImage} src={device.image} alt={device.alt} loading="lazy" />
      </div>

      <div className={styles.deviceBody}>
        <div className={styles.deviceMain}>
          <h3 className={styles.deviceTitle}>{device.title}</h3>

          <div className={styles.deviceSpecs}>
            <span className={styles.badge}>{`Чип: ${device.tech}`}</span>
            {device.badges.map((badge) => (
              <span className={`${styles.badge} ${badge.off ? styles.badgeOff : ''}`} key={`${device.title}-${badge.label}`}>
                {badge.label}
              </span>
            ))}
          </div>

          <p className={styles.deviceDesc}>
            <span className={styles.deviceDescMain}>{device.descriptionLines[0]}</span>
            <span className={styles.deviceDescExtra}>{device.descriptionLines[1]}</span>
          </p>
        </div>

        <div className={styles.deviceBottom}>
          <div className={styles.deviceFooter}>
            <div className={styles.price}>{device.price}</div>
          </div>

          <div className={styles.deviceActions}>
            <a className={styles.cta} href={device.href} target="_blank" rel="noopener noreferrer">
              {device.ctaLabel ?? 'ЗАКАЗАТЬ НА ALIEXPRESS'}
            </a>
            {device.videoHref ? (
              <a className={styles.ctaVideo} href={device.videoHref} target="_blank" rel="noopener noreferrer">
                {device.videoLabel ?? 'Смотреть видео'}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PortableCopyCatalog(): ReactNode {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [techFilter, setTechFilter] = useState<TechFilter>('all');
  const [isHelpDocked, setIsHelpDocked] = useState(false);
  const topRailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = topRailRef.current;
    if (!rail || typeof window === 'undefined') {
      return;
    }

    const recalcDock = () => {
      const styles = window.getComputedStyle(rail);
      const helpWidth = Number.parseFloat(styles.getPropertyValue('--device-help-width')) || 248;
      const helpGap = Number.parseFloat(styles.getPropertyValue('--device-help-gap')) || 16;
      const railBounds = rail.getBoundingClientRect();
      const availableRight = window.innerWidth - railBounds.right;
      setIsHelpDocked(availableRight >= helpWidth + helpGap);
    };

    recalcDock();

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(recalcDock) : null;
    observer?.observe(rail);
    window.addEventListener('resize', recalcDock);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', recalcDock);
    };
  }, []);

  const visibleCategories = useMemo(() => {
    const categories: DeviceCategory[] = categoryFilter === 'all' ? ['universal', 'solar', 'boards'] : [categoryFilter];

    return categories
      .map((category) => ({
        category,
        label: DEVICE_CATEGORY_LABELS[category],
        devices: filterByTech(DEVICE_DATA[category], techFilter),
      }))
      .filter((entry) => entry.devices.length > 0);
  }, [categoryFilter, techFilter]);

  return (
    <section className={styles.catalog} aria-label="Каталог устройств Meshtastic">
      <div className={styles.heroBlock}>
        <p className={styles.heroIntro}>
          <span className={styles.heroLine}>Здесь вы можете подобрать ноду под свои задачи.</span>
          <span className={styles.heroLine}>От бюджетных плат без корпуса до полноразмерных нод с клавиатурой и цветным дисплеем.</span>
          <span className={styles.heroLine}>Фильтры позволяют выбрать тип ноды и тип чипа.</span>
          <span className={`${styles.heroLine} ${styles.heroMeta}`}>
            Вопросы можно уточнить в нашем{' '}
            <a href="https://t.me/meshwrks/2751" target="_blank" rel="noopener noreferrer">
              Telegram-чате
            </a>
            .
          </span>
        </p>
      </div>

      <div className={styles.topRail} ref={topRailRef}>
        <div className={styles.filterArea}>
          <div className={styles.filterGroups}>
            <div className={styles.filterGroup} role="group" aria-label="Фильтр по типу">
              <div className={styles.filterButtons}>
                {CATEGORY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.filterButton} ${categoryFilter === option.value ? styles.filterButtonActive : ''}`}
                    type="button"
                    aria-pressed={categoryFilter === option.value}
                    onClick={() => setCategoryFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup} role="group" aria-label="Фильтр по чипу">
              <div className={styles.filterButtons}>
                {TECH_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.filterButton} ${techFilter === option.value ? styles.filterButtonActive : ''}`}
                    type="button"
                    aria-pressed={techFilter === option.value}
                    onClick={() => setTechFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className={`${styles.sideHelp} ${isHelpDocked ? styles.sideHelpDocked : ''}`}>
          <p className={styles.sideHelpTitle}>Что означают фильтры</p>
          <ul className={styles.sideHelpList}>
            <li>
              <strong>🧭 Универсальные</strong> - готовые переносные ноды.
            </li>
            <li>
              <strong>☀️ Солнечные</strong> - автономные комплекты для стационара.
            </li>
            <li>
              <strong>🧩 Отдельные платы</strong> - DIY-платы и проекты для самостоятельной сборки.
            </li>
          </ul>
          <div className={styles.sideHelpSep} />
          <p className={styles.sideHelpSubTitle}>Чип-платформы</p>
          <ul className={styles.sideHelpList}>
            <li>
              <strong>🟢 NRF</strong> - ниже мощность, выше автономность, лучше для батарейных узлов.
            </li>
            <li>
              <strong>⚡ ESP</strong> - выше производительность и функции, но быстрее расходует батарею.
            </li>
          </ul>
        </aside>
      </div>

      <div className={styles.devicePanels}>
        {visibleCategories.length === 0 ? (
          <p className={styles.emptyState}>Нет устройств для выбранных фильтров.</p>
        ) : (
          visibleCategories.map(({ category, label, devices }) => (
            <section key={category} className={styles.categorySection} aria-label={label}>
              <div>{devices.map(renderDeviceCard)}</div>
            </section>
          ))
        )}
      </div>
    </section>
  );
}
