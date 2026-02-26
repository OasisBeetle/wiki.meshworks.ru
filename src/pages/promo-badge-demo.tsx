import Layout from "@theme/Layout";
import React from "react";
import styles from "./promo-badge-demo.module.css";

type Variant = {
  id: string;
  label: string;
  helper: string;
  className: string;
};

const variants: Variant[] = [
  { id: "w01", label: "БЫСТРАЯ ДОСТАВКА", helper: "Wobble: classic", className: styles.w01Classic },
  { id: "w02", label: "БЫСТРАЯ ДОСТАВКА", helper: "Wobble: glossy", className: styles.w02Glossy },
  { id: "w03", label: "EXPRESS", helper: "Wobble: neon", className: styles.w03Neon },
  { id: "w04", label: "ОТПРАВИМ СЕГОДНЯ", helper: "Wobble: paper", className: styles.w04Paper },
  { id: "w05", label: "В НАЛИЧИИ • БЫСТРО", helper: "Wobble: punch", className: styles.w05Punch },
  { id: "w06", label: "ДОСТАВКА 24/48", helper: "Wobble: gradient", className: styles.w06Gradient },
  { id: "w07", label: "БЫСТРО ДОЕДЕТ", helper: "Wobble: outline", className: styles.w07Outline },
  { id: "w08", label: "БЫСТРАЯ ДОСТАВКА", helper: "Wobble: sticker edge", className: styles.w08StickerEdge },
  { id: "w09", label: "EXPRESS", helper: "Wobble: shadow lift", className: styles.w09Lift },
  { id: "w10", label: "БЫСТРАЯ ДОСТАВКА", helper: "Wobble: split tag", className: styles.w10SplitTag },
];

function DemoCard({ label, helper, className }: Variant) {
  return (
    <div className={[styles.cardWrap, className].join(" ")}>
      <article className={styles.card} aria-label={`FakeTec V5.5 — вариант: ${helper}`}>
        <div className={styles.media}>
          <img
            className={styles.img}
            src="/img/wiki/faketec.webp"
            alt="FakeTec V5.5"
            loading="lazy"
            decoding="async"
          />
          <span className={styles.badge}>
            <span className={styles.badgeText}>{label}</span>
          </span>
          <span className={styles.variantLabel}>{helper}</span>
        </div>

        <div className={styles.body}>
          <div className={styles.kicker}>FakeTec</div>
          <h3 className={styles.name}>FakeTec V5.5</h3>
          <p className={styles.desc}>
            Компактная плата на NRF с возможностью подключения GPS и датчиков. Нужен быстрый вариант — вот он.
          </p>
          <div className={styles.footer}>
            <div className={styles.price}>≈ 2 000 ₽</div>
            <a
              className={styles.cta}
              href="https://www.avito.ru/domodedovo/telefony/faketec_v5_rev_b_meshtasticmeshcore_7914693905"
              target="_blank"
              rel="noopener noreferrer"
            >
              Avito
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function PromoBadgeDemo() {
  return (
    <Layout title="Демо выделения: БЫСТРАЯ ДОСТАВКА" description="10 разных вариантов выделения карточки FakeTec V5.5.">
      <main className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>FakeTec V5.5 — варианты выделения «БЫСТРАЯ ДОСТАВКА»</h1>
          <p className={styles.subtitle}>
            Это отдельная демо‑страница для подбора стиля. Тут 10 полностью разных вариантов плашки/выделения — можно
            выбрать понравившийся и перенести в каталог устройств.
          </p>
        </header>

        <section className={styles.grid} aria-label="Варианты выделения">
          {variants.map((variant) => (
            <DemoCard key={variant.id} {...variant} />
          ))}
        </section>
      </main>
    </Layout>
  );
}
