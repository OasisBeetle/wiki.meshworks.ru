import React, { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpDown, Battery, Bluetooth, Compass, Cpu, LayoutGrid, List, MapPin, Sun, Wifi, Zap } from './icons/lucide';
import styles from './portable-catalog/PortableCopyCatalog.module.css';
import { DEVICE_CATEGORY_LABELS, DEVICE_DATA } from './portable-catalog/data';
import type { DeviceCategory, DeviceItem, DeviceTech } from './portable-catalog/types';

type CategoryFilter = DeviceCategory | 'all';
type TechFilter = DeviceTech | 'all';
type ViewMode = 'grid' | 'list';
type SortOption = 'default' | 'price-asc' | 'price-desc';

type FilterOption<T extends string> = {
  value: T;
  label: string;
  shortLabel?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
};

const CATEGORY_OPTIONS: Array<FilterOption<CategoryFilter>> = [
  { value: 'all', label: 'Все' },
  { value: 'universal', label: 'Универсальные', Icon: Compass },
  { value: 'solar', label: 'Солнечные', Icon: Sun },
  { value: 'boards', label: 'Отдельные платы', shortLabel: 'Платы', Icon: Cpu },
];

const TECH_OPTIONS: Array<FilterOption<TechFilter>> = [
  { value: 'all', label: 'Все' },
  { value: 'NRF', label: 'NRF', Icon: Battery },
  { value: 'ESP', label: 'ESP', Icon: Zap },
];

function renderOptionLabel<T extends string>(option: FilterOption<T>): ReactNode {
  const Icon = option.Icon;

  if (!option.shortLabel) {
    return (
      <>
        {Icon ? <Icon className={styles.filterIcon} aria-hidden="true" focusable="false" /> : null}
        {option.label}
      </>
    );
  }

  return (
    <>
      <span className={styles.filterLabelDesktop} aria-hidden="true">
        {Icon ? <Icon className={styles.filterIcon} aria-hidden="true" focusable="false" /> : null}
        {option.label}
      </span>
      <span className={styles.filterLabelMobile} aria-hidden="true">
        {Icon ? <Icon className={styles.filterIcon} aria-hidden="true" focusable="false" /> : null}
        {option.shortLabel}
      </span>
    </>
  );
}

function filterByTech(devices: DeviceItem[], techFilter: TechFilter): DeviceItem[] {
  if (techFilter === 'all') {
    return devices;
  }

  return devices.filter((device) => device.tech === techFilter);
}

function parsePrice(priceStr: string): number {
  const digits = priceStr.replace(/\D/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

function sortDevices(devices: DeviceItem[], sortOption: SortOption): DeviceItem[] {
  if (sortOption === 'default') {
    return devices;
  }

  return [...devices].sort((a, b) => {
    const priceA = parsePrice(a.price);
    const priceB = parsePrice(b.price);
    return sortOption === 'price-asc' ? priceA - priceB : priceB - priceA;
  });
}

type PurchaseConfirmState = {
  device: DeviceItem;
  open: boolean;
};

function getDeviceKey(device: DeviceItem): string {
  return `${device.title}-${device.href}`;
}

function openHrefInNewTab(href: string): void {
  window.open(href, '_blank', 'noopener,noreferrer');
}

function renderDeviceCard(
  device: DeviceItem,
  onPurchaseClick: (device: DeviceItem) => void,
  opts?: { featured?: boolean },
): ReactNode {
  const featured = Boolean(opts?.featured);
  const ctaText = device.ctaLabel ?? 'Купить';
  const videoText = device.videoLabel ?? 'Видео';

  const hasBluetooth = device.badges.some((b) => b.label.toLowerCase().includes('bluetooth') && !b.off);
  const hasWifi = device.badges.some((b) => b.label.toLowerCase().includes('wi-fi') && !b.off);
  const hasGps = device.badges.some((b) => b.label.toLowerCase().includes('gps') && !b.off);

  return (
    <article
      className={[
        styles.deviceCard,
        device.popular ? styles.deviceCardPopular : '',
        featured ? styles.deviceCardFeatured : '',
      ].join(' ')}
      key={getDeviceKey(device)}
    >
      <div className={styles.deviceMedia}>
        <img
          className={styles.deviceImage}
          src={device.image}
          alt={device.alt}
          loading="lazy"
          decoding="async"
        />
        {device.popular ? <span className={styles.popularPill}>Выбор сообщества</span> : null}
        {device.shippingLabel ? (
          <span className={[styles.shippingSticker, device.popular ? styles.shippingStickerOffset : ''].join(' ')}>
            <span className={styles.shippingStickerText}>{device.shippingLabel}</span>
          </span>
        ) : null}
        <div className={styles.techBadgeOverlay} title={`Чип: ${device.tech}`}>
          <Cpu width={14} height={14} />
          <span>{device.tech}</span>
        </div>
      </div>

      <div className={styles.deviceContent}>
        <div className={styles.deviceHeader}>
          <h3 className={styles.deviceTitle}>{device.title}</h3>
          
          <div className={styles.deviceFeatures}>
            <div className={`${styles.featureItem} ${hasBluetooth ? styles.featureActive : styles.featureInactive}`} title={hasBluetooth ? "Bluetooth есть" : "Bluetooth нет"}>
              <Bluetooth className={styles.featureIcon} />
            </div>

            <div className={`${styles.featureItem} ${hasWifi ? styles.featureActive : styles.featureInactive}`} title={hasWifi ? "Wi-Fi есть" : "Wi-Fi нет"}>
              <Wifi className={styles.featureIcon} />
            </div>

            <div className={`${styles.featureItem} ${hasGps ? styles.featureActive : styles.featureInactive}`} title={hasGps ? "GPS есть" : "GPS нет"}>
              <MapPin className={styles.featureIcon} />
            </div>
          </div>
        </div>

        <p className={styles.deviceDesc}>
          <span className={styles.deviceDescMain}>{device.descriptionLines[0]}</span>
        </p>

        <div className={styles.deviceFooter}>
          <div className={styles.price}>{device.price}</div>
          <div className={styles.deviceActions}>
            {device.purchaseConfirm ? (
              <button className={styles.cta} type="button" onClick={() => onPurchaseClick(device)} title={ctaText}>
                {ctaText}
              </button>
            ) : (
              <a className={styles.cta} href={device.href} target="_blank" rel="noopener noreferrer" title={ctaText}>
                {ctaText}
              </a>
            )}
            {device.videoHref ? (
              <a className={styles.ctaVideo} href={device.videoHref} target="_blank" rel="noopener noreferrer" title={videoText}>
                {videoText}
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
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [purchaseConfirmState, setPurchaseConfirmState] = useState<PurchaseConfirmState | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const featuredDevices = useMemo(() => {
    const all: Array<{ category: DeviceCategory; device: DeviceItem }> = [];
    (Object.keys(DEVICE_DATA) as DeviceCategory[]).forEach((category) => {
      DEVICE_DATA[category].forEach((device) => {
        if (device.popular) {
          all.push({ category, device });
        }
      });
    });

    return all.map((entry) => entry.device);
  }, []);

  const featuredKeys = useMemo(() => {
    return new Set(featuredDevices.map(getDeviceKey));
  }, [featuredDevices]);

  const visibleCategories = useMemo(() => {
    const categories: DeviceCategory[] = categoryFilter === 'all' ? ['universal', 'solar', 'boards'] : [categoryFilter];

    return categories
      .map((category) => {
        const filtered = filterByTech(DEVICE_DATA[category], techFilter)
          .filter((device) => !featuredKeys.has(getDeviceKey(device)));
        
        return {
          category,
          label: DEVICE_CATEGORY_LABELS[category],
          devices: sortDevices(filtered, sortOption),
        };
      })
      .filter((entry) => entry.devices.length > 0);
  }, [categoryFilter, techFilter, featuredKeys, sortOption]);

  useEffect(() => {
    if (!purchaseConfirmState?.open) {
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPurchaseConfirmState(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [purchaseConfirmState?.open]);

  useEffect(() => {
    if (!purchaseConfirmState?.open) {
      return;
    }

    dialogRef.current?.focus();
  }, [purchaseConfirmState?.open]);

  const onPurchaseClick = (device: DeviceItem) => {
    if (!device.purchaseConfirm) {
      openHrefInNewTab(device.href);
      return;
    }

    setPurchaseConfirmState({ device, open: true });
  };

  const closePurchaseConfirm = () => setPurchaseConfirmState(null);

  const confirmPurchase = () => {
    const href = purchaseConfirmState?.device.href;
    if (href) {
      openHrefInNewTab(href);
    }
    closePurchaseConfirm();
  };

  return (
    <section className={`${styles.catalog} ${styles.vibe} meshtastic-home`} aria-label="Каталог устройств Meshtastic">
      <div className={styles.layoutGrid}>
        <div className={styles.mainColumn}>
          {featuredDevices.length > 0 ? (
            <section className={styles.featuredSection} aria-label="Выбор сообщества">
              <header className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>Выбор сообщества</h2>
                <p className={styles.categoryMeta}>{featuredDevices.length} шт.</p>
              </header>
              <div className={styles.featuredGrid}>
                {featuredDevices.map((device) => renderDeviceCard(device, onPurchaseClick, { featured: true }))}
              </div>
            </section>
          ) : null}

          <div className={styles.controlBar}>
            <div className={styles.filterGroups}>
              <div className={`${styles.filterButtons} ${styles.filterControlChips}`} role="group" aria-label="Фильтр по типу">
                {CATEGORY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.filterButton} ${categoryFilter === option.value ? styles.filterButtonActive : ''}`}
                    type="button"
                    aria-label={option.label}
                    aria-pressed={categoryFilter === option.value}
                    onClick={() => setCategoryFilter(option.value)}
                  >
                    {renderOptionLabel(option)}
                  </button>
                ))}
              </div>
              <div className={styles.divider} />
              <div className={`${styles.filterButtons} ${styles.filterControlChips}`} role="group" aria-label="Фильтр по чипу">
                {TECH_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.filterButton} ${techFilter === option.value ? styles.filterButtonActive : ''}`}
                    type="button"
                    aria-label={option.label}
                    aria-pressed={techFilter === option.value}
                    onClick={() => setTechFilter(option.value)}
                  >
                    {renderOptionLabel(option)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.viewControls}>
              <div className={styles.sortWrapper}>
                <ArrowUpDown className={styles.sortIcon} />
                <select 
                  className={styles.sortSelect} 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  aria-label="Сортировка"
                >
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                </select>
              </div>
              
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Сетка"
                  title="Сетка"
                >
                  <LayoutGrid />
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="Список"
                  title="Список"
                >
                  <List />
                </button>
              </div>
            </div>

          </div>

          <section className={styles.helpStrip} aria-label="Что означают фильтры">
            <div className={styles.helpBlock}>
              <p className={styles.helpTitle}>Тип ноды</p>
              <ul className={styles.helpList}>
                <li className={styles.helpItem}>
                  <Compass className={styles.helpIcon} />
                  <span><strong>Универсальные</strong> - готовые переносные ноды.</span>
                </li>
                <li className={styles.helpItem}>
                  <Sun className={styles.helpIcon} />
                  <span><strong>Солнечные</strong> - автономные комплекты для стационара.</span>
                </li>
                <li className={styles.helpItem}>
                  <Cpu className={styles.helpIcon} />
                  <span><strong>Отдельные платы</strong> - DIY-платы и проекты для самостоятельной сборки.</span>
                </li>
              </ul>
            </div>

            <div className={styles.helpBlock}>
              <p className={styles.helpTitle}>Чип-платформы</p>
              <ul className={styles.helpList}>
                <li className={styles.helpItem}>
                  <Battery className={styles.helpIcon} />
                  <span><strong>NRF</strong> - ниже мощность, выше автономность, лучше для батарейных узлов.</span>
                </li>
                <li className={styles.helpItem}>
                  <Zap className={styles.helpIcon} />
                  <span><strong>ESP</strong> - выше производительность и функции, но быстрее расходует батарею.</span>
                </li>
              </ul>
            </div>
          </section>

          <div className={`${styles.devicePanels} ${viewMode === 'list' ? styles.listView : ''}`}>
            {visibleCategories.length === 0 ? (
              <p className={styles.emptyState}>Нет устройств для выбранных фильтров.</p>
            ) : (
              visibleCategories.map(({ category, label, devices }) => (
                <section key={category} className={styles.categorySection} aria-label={label}>
                  <header className={styles.categoryHeader}>
                    <h2 className={styles.categoryTitle}>{label}</h2>
                    <p className={styles.categoryMeta}>{devices.length} шт.</p>
                  </header>
                  <div className={styles.deviceGrid}>{devices.map((device) => renderDeviceCard(device, onPurchaseClick))}</div>
                </section>
              ))
            )}
          </div>
        </div>
      </div>

      {purchaseConfirmState?.open && purchaseConfirmState.device.purchaseConfirm ? (
        <div className={styles.modalOverlay} role="presentation" onMouseDown={closePurchaseConfirm}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={purchaseConfirmState.device.purchaseConfirm.title}
            tabIndex={-1}
            ref={dialogRef}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <p className={styles.modalTitle}>{purchaseConfirmState.device.purchaseConfirm.title}</p>
              <button className={styles.modalClose} type="button" onClick={closePurchaseConfirm} aria-label="Закрыть окно">
                ×
              </button>
            </div>

            <p className={styles.modalText}>{purchaseConfirmState.device.purchaseConfirm.description}</p>

            <div className={styles.modalActions}>
              <button className={styles.modalButtonSecondary} type="button" onClick={closePurchaseConfirm}>
                {purchaseConfirmState.device.purchaseConfirm.cancelLabel ?? 'Отмена'}
              </button>
              <button className={styles.modalButtonPrimary} type="button" onClick={confirmPurchase}>
                {purchaseConfirmState.device.purchaseConfirm.confirmLabel ?? 'Подтверждаю'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
