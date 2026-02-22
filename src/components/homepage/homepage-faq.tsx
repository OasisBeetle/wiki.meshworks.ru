import Link from "@docusaurus/Link";
import React from "react";
import styles from "./homepage.module.css";

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

const items: FaqItem[] = [
  {
    question: "Что такое Meshtastic?",
    answer: (
      <>
        Meshtastic — это LoRa mesh‑связь: ноды обмениваются сообщениями напрямую и могут ретранслировать их дальше.
        Начните с раздела{" "}
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
        Нет. Сеть работает без интернета и сотовой связи. Интернет может быть нужен только для карты/интеграций (по
        желанию).
      </>
    ),
  },
  {
    question: "С чего начать, если нода только куплена?",
    answer: (
      <>
        Откройте{" "}
        <Link to="/start" className={styles.inlineLink}>
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
    question: "Почему маленькая дальность и как её улучшить?",
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
];

export function HomepageFaq() {
  return (
    <section aria-label="FAQ">
      <div className={styles.sectionHeader}>
        <h2>Частые вопросы</h2>
        <p>Короткие ответы и ссылки на подробные инструкции в вики.</p>
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
        <Link className="button button--primary" to="/troubleshooting">
          Открыть раздел «Решение проблем»
        </Link>
      </div>
    </section>
  );
}
