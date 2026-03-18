import React, { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpDown, Share2 } from './icons/lucide';
import styles from './antenna-catalog/PortableAntennaCatalog.module.css';
import { ANTENNA_CATEGORY_LABELS, ANTENNA_DATA } from './antenna-catalog/data';
import type { AntennaCategory, AntennaItem } from './antenna-catalog/types';

type CategoryFilter = AntennaCategory | 'all';
type SortOption = 'default' | 'price-asc' | 'price-desc';

function parsePrice(priceStr: string): number {
  const digits = priceStr.replace(/\D/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

function sortItems(items: AntennaItem[], sortOption: SortOption): AntennaItem[] {
  if (sortOption === 'default') {
    return items;
  }

  return [...items].sort((a, b) => {
    const priceA = parsePrice(a.price);
    const priceB = parsePrice(b.price);
    return sortOption === 'price-asc' ? priceA - priceB : priceB - priceA;
  });
}

function getAntennaKey(item: AntennaItem): string {
  return `${item.title}-${item.href}`;
}

function copyTextWithFallback(text: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }

  return Promise.resolve();
}

function renderCard(item: AntennaItem, copiedKey: string | null, onShareClick: (item: AntennaItem) => void): ReactNode {
  const cardKey = getAntennaKey(item);
  const shareLabel = copiedKey === cardKey ? 'Ссылка на антенну скопирована' : 'Поделиться';

  return (
    <article key={cardKey} className={styles.card}>
      <div className={styles.media}>
        <img className={styles.image} src={item.image} alt={item.alt} loading="lazy" decoding="async" />
      </div>

      <div className={styles.content}>
        <div className={styles.headingRow}>
          <h3 className={styles.title}>{item.title}</h3>
          <button
            className={styles.shareButton}
            type="button"
            aria-label={shareLabel}
            data-share-label={shareLabel}
            data-share-state={copiedKey === cardKey ? 'copied' : 'idle'}
            onClick={() => onShareClick(item)}
          >
            <Share2 className={styles.shareIcon} aria-hidden="true" focusable="false" />
          </button>
        </div>

        <div className={styles.badgeRow}>
          {item.badges.map((badge) => (
            <span key={badge} className={styles.badge}>
              {badge}
            </span>
          ))}
        </div>

        <p className={styles.desc}>{item.descriptionLines[0]}</p>

        <div className={styles.footer}>
          <div className={styles.price}>{item.price}</div>
          <a className={styles.cta} href={item.href} target="_blank" rel="noopener noreferrer">
            {item.hrefLabel ?? 'Купить'}
          </a>
        </div>
      </div>
    </article>
  );
}

export default function PortableAntennaCatalog(): ReactNode {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const resetTimerRef = useRef<number | null>(null);

  const visibleCategories = useMemo(() => {
    const categories: AntennaCategory[] = categoryFilter === 'all' ? ['portable', 'stationary', 'directional'] : [categoryFilter];

    return categories
      .map((category) => ({
        category,
        label: ANTENNA_CATEGORY_LABELS[category],
        items: sortItems(ANTENNA_DATA[category], sortOption),
      }))
      .filter((entry) => entry.items.length > 0);
  }, [categoryFilter, sortOption]);

  const onShareClick = async (item: AntennaItem) => {
    const nextKey = getAntennaKey(item);

    try {
      await copyTextWithFallback(item.href);
      setCopiedKey(nextKey);

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = window.setTimeout(() => {
        setCopiedKey((current) => (current === nextKey ? null : current));
        resetTimerRef.current = null;
      }, 2200);
    } catch {
      setCopiedKey(null);
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.catalog} aria-label="Каталог готовых антенн">
      <div className={styles.intro}>
        <h2 className={styles.introTitle}>Каталог готовых антенн для Meshtastic и LoRa</h2>
        <p className={styles.introText}>
          Подборка антенн под портативные ноды, базовые стационарные точки и направленные линки. Смотри на диапазон,
          тип разъёма, длину кабеля и сценарий установки, а не только на обещанный “усиление”.
        </p>
      </div>

      <div className={styles.controlBar}>
        <div className={styles.filterButtons} role="group" aria-label="Фильтр по типу антенны">
          <button
            className={`${styles.filterButton} ${categoryFilter === 'all' ? styles.filterButtonActive : ''}`}
            type="button"
            aria-pressed={categoryFilter === 'all'}
            onClick={() => setCategoryFilter('all')}
          >
            Все
          </button>
          {(Object.keys(ANTENNA_CATEGORY_LABELS) as AntennaCategory[]).map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${categoryFilter === category ? styles.filterButtonActive : ''}`}
              type="button"
              aria-pressed={categoryFilter === category}
              onClick={() => setCategoryFilter(category)}
            >
              {ANTENNA_CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        <label className={styles.sortWrap}>
          <ArrowUpDown aria-hidden="true" focusable="false" width={16} height={16} />
          <select className={styles.sortSelect} value={sortOption} onChange={(e) => setSortOption(e.target.value as SortOption)} aria-label="Сортировка">
            <option value="default">По умолчанию</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
          </select>
        </label>
      </div>

      {visibleCategories.length === 0 ? (
        <p className={styles.emptyState}>Нет антенн для выбранных фильтров.</p>
      ) : (
        visibleCategories.map(({ category, label, items }) => (
          <section key={category} className={styles.section} aria-label={label}>
            <header className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{label}</h3>
              <p className={styles.sectionMeta}>{items.length} шт.</p>
            </header>
            <div className={styles.grid}>{items.map((item) => renderCard(item, copiedKey, onShareClick))}</div>
          </section>
        ))
      )}
    </section>
  );
}
