import Link from "@docusaurus/Link";
import React from "react";
import styles from "./homepage.module.css";

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

const items: FaqItem[] = [
  {
    question: "Что такое MeshWorks?",
    answer: (
      <>
        MeshWorks — сообщество энтузиастов mesh‑сетей. Мы создаём инструменты для автономной связи, собираем базу знаний и
        помогаем запускать сети в реальных сценариях.
      </>
    ),
  },
  {
    question: "Где общаться и задавать вопросы?",
    answer: (
      <>
        Основной канал и чат —{" "}
        <a href="https://t.me/meshwrks" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
          Telegram MeshWorks
        </a>
        . Там же — анонсы, помощь новичкам и обсуждения.
      </>
    ),
  },
  {
    question: "Какие технологии используются?",
    answer: (
      <>
        В фокусе — LoRa и mesh‑протоколы (например, Meshtastic), а также альтернативные стеки для автономных сетей. Начните с{" "}
        <Link to="/introduction" className={styles.inlineLink}>
          «Введение»
        </Link>
        .
      </>
    ),
  },
  {
    question: "Нужен ли интернет или оператор?",
    answer: (
      <>
        Нет. Mesh‑связь работает без интернета и сотовой сети. Интернет может быть нужен только для карты/интеграций (по
        желанию), но сама связь от него не зависит.
      </>
    ),
  },
  {
    question: "С чего начать?",
    answer: (
      <>
        Откройте{" "}
        <Link to="/introduction" className={styles.inlineLink}>
          «С чего начать»
        </Link>
        , затем пройдите{" "}
        <Link to="/node-setup" className={styles.inlineLink}>
          «Настройку ноды»
        </Link>
        .
      </>
    ),
  },
  {
    question: "Как выбрать устройство под задачу?",
    answer: (
      <>
        Посмотрите{" "}
        <Link to="/catalog-devices" className={styles.inlineLink}>
          каталог устройств
        </Link>{" "}
        и обзор{" "}
        <Link to="/devices" className={styles.inlineLink}>
          раздела «Устройства»
        </Link>
        .
      </>
    ),
  },
  {
    question: "Как улучшить дальность?",
    answer: (
      <>
        Почти всегда решают антенна, высота установки и правильный регион/частоты. Начните с{" "}
        <Link to="/antennas" className={styles.inlineLink}>
          раздела про антенны
        </Link>
        .
      </>
    ),
  },
  {
    question: "Нода не видна / не подключается — что проверять первым делом?",
    answer: (
      <>
        Проверьте питание, прошивку, регион и каналы. Дальше — по чек‑листам{" "}
        <Link to="/troubleshooting" className={styles.inlineLink}>
          «Решение проблем»
        </Link>
        .
      </>
    ),
  },
  {
    question: "Как поддержать MeshWorks?",
    answer: (
      <>
        Если проект полезен — поддержите нас на{" "}
        <a href="https://boosty.to/meshworks" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
          Boosty
        </a>
        . Это помогает развивать инструменты и контент.
      </>
    ),
  },
  {
    question: "Цифры сообщества",
    answer: (
      <>
        YouTube — 30 000, Telegram — 8 000, Boosty — 1, всего — 38 001.
      </>
    ),
  },
  {
    question: "Где смотреть эфиры и обзоры?",
    answer: (
      <>
        Канал MeshWorks на{" "}
        <a
          href="https://www.youtube.com/@meshworks_ru?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.inlineLink}
        >
          YouTube
        </a>
        : эфиры, обзоры и руководства.
      </>
    ),
  },
];

export function HomepageFaq() {
  return (
    <section aria-label="FAQ">
      <div className={styles.sectionHeader}>
        <h2>Сообщество и ответы</h2>
        <p>Короткие ответы и ссылки на инструменты MeshWorks и разделы вики.</p>
      </div>

      <div className={styles.faqList}>
        {items.map((item) => (
          <details
            key={item.question}
            className={styles.faqDetails}
          >
            <summary className={styles.faqSummary}>
              {item.question}
            </summary>
            <div className={styles.faqAnswer}>{item.answer}</div>
          </details>
        ))}
      </div>

      <div className={styles.faqCta}>
        <a className="button button--primary" href="https://t.me/meshwrks" target="_blank" rel="noopener noreferrer">
          Перейти в Telegram MeshWorks
        </a>
      </div>
    </section>
  );
}
