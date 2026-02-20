import React, { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import styles from './portable-catalog/PortableCopyCatalog.module.css';
import { DEVICE_CATEGORY_LABELS, DEVICE_DATA } from './portable-catalog/data';
import type { DeviceCategory, DeviceItem, DeviceTech } from './portable-catalog/types';

type CategoryFilter = DeviceCategory | 'all';
type TechFilter = DeviceTech | 'all';

type FilterOption<T extends string> = {
  value: T;
  label: string;
  shortLabel?: string;
};

const CATEGORY_OPTIONS: Array<FilterOption<CategoryFilter>> = [
  { value: 'all', label: 'Все' },
  { value: 'universal', label: '🧭 Универсальные' },
  { value: 'solar', label: '☀️ Солнечные' },
  { value: 'boards', label: '🧩 Отдельные платы', shortLabel: '🧩 Платы' },
];

const TECH_OPTIONS: Array<FilterOption<TechFilter>> = [
  { value: 'all', label: 'Все' },
  { value: 'NRF', label: '🟢 NRF' },
  { value: 'ESP', label: '⚡ ESP' },
];

function renderOptionLabel<T extends string>(option: FilterOption<T>): ReactNode {
  if (!option.shortLabel) {
    return option.label;
  }

  return (
    <>
      <span className={styles.filterLabelDesktop} aria-hidden="true">
        {option.label}
      </span>
      <span className={styles.filterLabelMobile} aria-hidden="true">
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

type PurchaseConfirmState = {
  device: DeviceItem;
  open: boolean;
};

function openHrefInNewTab(href: string): void {
  window.open(href, '_blank', 'noopener,noreferrer');
}

function renderDeviceCard(device: DeviceItem, onPurchaseClick: (device: DeviceItem) => void): ReactNode {
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
            {device.purchaseConfirm ? (
              <button className={styles.cta} type="button" onClick={() => onPurchaseClick(device)}>
                {device.ctaLabel ?? 'ЗАКАЗАТЬ НА ALIEXPRESS'}
              </button>
            ) : (
              <a className={styles.cta} href={device.href} target="_blank" rel="noopener noreferrer">
                {device.ctaLabel ?? 'ЗАКАЗАТЬ НА ALIEXPRESS'}
              </a>
            )}
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
  const [purchaseConfirmState, setPurchaseConfirmState] = useState<PurchaseConfirmState | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

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

      <div className={styles.layoutGrid}>
        <div className={styles.mainColumn}>
          <div className={styles.filterArea}>
            <div className={styles.filterGroups}>
              <div className={styles.filterGroup} role="group" aria-label="Фильтр по типу">
                <div className={`${styles.filterButtons} ${styles.filterControlChips}`}>
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
              </div>

              <div className={styles.filterGroup} role="group" aria-label="Фильтр по чипу">
                <div className={`${styles.filterButtons} ${styles.filterControlChips}`}>
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

          <div className={styles.devicePanels}>
            {visibleCategories.length === 0 ? (
              <p className={styles.emptyState}>Нет устройств для выбранных фильтров.</p>
            ) : (
              visibleCategories.map(({ category, label, devices }) => (
                <section key={category} className={styles.categorySection} aria-label={label}>
                  <div>{devices.map((device) => renderDeviceCard(device, onPurchaseClick))}</div>
                </section>
              ))
            )}
          </div>
        </div>

        <aside className={styles.sideHelp}>
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
